"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDocumentRequirementsAction(countryId?: string, serviceId?: string, programId?: string) {
    try {
        const requirements = await prisma.documentRequirement.findMany({
            where: {
                OR: [
                    { countryId },
                    { serviceId },
                    { programId }
                ]
            }
        });
        return { success: true, data: requirements };
    } catch (error) {
        console.error("Failed to fetch document requirements:", error);
        return { success: false, error: "Failed to fetch requirements" };
    }
}

export async function createDocumentRequirementAction(data: {
    name: string;
    description?: string;
    isRequired: boolean;
    countryId?: string;
    serviceId?: string;
    programId?: string;
}) {
    try {
        const requirement = await prisma.documentRequirement.create({
            data
        });
        revalidatePath("/dashboard/admin/settings");
        return { success: true, data: requirement };
    } catch (error) {
        console.error("Failed to create document requirement:", error);
        return { success: false, error: "Failed to create requirement" };
    }
}
