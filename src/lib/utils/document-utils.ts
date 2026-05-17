
import { categoryRequirements, countryServiceRequirements } from "@/lib/mappings/requirements";
import { Category } from "@prisma/client";

export function getRequiredDocuments(category: Category, countrySlug?: string, serviceSlug?: string) {
    let requirements: string[] = [];

    // 1. Get base requirements for the category
    if (categoryRequirements[category]) {
        requirements = [...categoryRequirements[category].tr];
    }

    // 2. Add country-specific requirements if available
    if (countrySlug && serviceSlug && countryServiceRequirements[serviceSlug]?.[countrySlug]) {
        const countryReqs = countryServiceRequirements[serviceSlug][countrySlug].tr;
        // Merge without duplicates
        requirements = Array.from(new Set([...requirements, ...countryReqs]));
    }

    return requirements;
}

export function checkDocumentStatus(requiredDoc: string, uploadedDocs: any[]) {
    // Normalizing for better matching (lowercase, trim)
    const normalize = (s: string) => s.toLowerCase().trim();
    const normalizedRequired = normalize(requiredDoc);

    const found = uploadedDocs.find(doc => {
        const normalizedUploaded = normalize(doc.name);
        // Simple heuristic: if the uploaded name contains the required name or vice versa
        return normalizedUploaded.includes(normalizedRequired) || normalizedRequired.includes(normalizedUploaded);
    });

    if (!found) return "MISSING";
    return found.status; // PENDING, APPROVED, REJECTED
}
