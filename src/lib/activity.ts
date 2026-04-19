import { prisma } from "./prisma";

export async function logActivity({
    applicationId,
    action,
    details,
    userId,
}: {
    applicationId: string;
    action: string;
    details?: any;
    userId?: string;
}) {
    try {
        await prisma.activityLog.create({
            data: {
                applicationId,
                action,
                details: details ? JSON.stringify(details) : null,
                userId,
            },
        });
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
}
