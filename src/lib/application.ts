import { prisma } from "./prisma";
import { categoryRequirements, countryServiceRequirements, serviceMap } from "./mappings";

export async function getRequiredDocuments(applicationId: string, locale: string = 'tr') {
    const lang = locale === 'en' ? locale : 'tr';
    
    const application = await prisma.application.findUnique({
        where: { id: applicationId },
        include: {
            program: {
                include: {
                    institution: {
                        include: {
                            service: true,
                            country: true
                        }
                    }
                }
            }
        }
    });

    if (!application?.program) return [];

    const service = application.program.institution?.service;
    let docs: any[] = [];

    // 1. Try from Service model (Directly from DB)
    if (service?.requiredDocuments) {
        try {
            docs = JSON.parse(service.requiredDocuments);
        } catch (e) {
            console.error("Failed to parse requiredDocuments from Service:", e);
        }
    }

    // 2. If empty, try from Country-Service Mappings
    if (docs.length === 0) {
        let countrySlug = application.program.institution?.country?.slug?.toLowerCase();
        const category = application.program.category;
        const serviceKey = Object.keys(serviceMap).find(key => serviceMap[key].category === category);

        // Special handling for Exam Prep scenarios
        if (category === "EXAM_PREPARATION") {
            const progInfo = (application.program.name + " " + application.program.slug).toLowerCase();
            if (progInfo.includes("ielts")) countrySlug = "ielts";
            else if (progInfo.includes("toefl")) countrySlug = "toefl";
            else if (progInfo.includes("sat")) countrySlug = "sat";
        }

        if (serviceKey && countrySlug && countryServiceRequirements[serviceKey]?.[countrySlug]) {
            const raw = countryServiceRequirements[serviceKey][countrySlug];
            const localizedList = raw[lang] || raw['tr'];
            docs = localizedList.map(name => ({ name, required: true }));
        }
    }

    // 3. If still empty, try from Category Mappings
    if (docs.length === 0 && application.program.category) {
        const raw = categoryRequirements[application.program.category];
        if (raw) {
            const localizedList = raw[lang] || raw['tr'];
            docs = localizedList.map(name => ({ name, required: true }));
        }
    }

    return docs;
}

export async function checkApplicationCompleteness(applicationId: string) {
    const required = await getRequiredDocuments(applicationId);
    if (required.length === 0) return true;

    const uploaded = await prisma.document.findMany({
        where: {
            applicationId,
            status: "APPROVED"
        }
    });

    const uploadedNames = uploaded.map(d => d.name);
    return required.every((req: any) => !req.required || uploadedNames.includes(req.name));
}
