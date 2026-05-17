
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/utils/slugify";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const body = await req.json();
        const { 
            title, title_en, title_de, 
            content, content_en, content_de, 
            image, imageSettings, icon, 
            allowsTargeting, active, 
            seoTitle, seoTitle_en, seoTitle_de, 
            seoDescription, seoDescription_en, seoDescription_de, 
            slug 
        } = body;

        const updateData: any = {
            title, title_en, title_de,
            content, content_en, content_de,
            image, imageSettings,
            icon, allowsTargeting, active,
            seoTitle, seoTitle_en, seoTitle_de,
            seoDescription, seoDescription_en, seoDescription_de
        };

        if (slug) {
            updateData.slug = slug;
        } else if (title) {
            updateData.slug = slugify(title);
        }

        const service = await prisma.service.update({
            where: { id },
            data: updateData
        });

        // Clear caches
        revalidatePath(`/programlar/${service.slug}`);
        revalidatePath('/dashboard/admin/services');
        revalidatePath('/'); // For navigation

        return NextResponse.json(service);
    } catch (error) {
        console.error("[SERVICE_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        // Check for dependencies
        const service = await prisma.service.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { institutions: true }
                }
            }
        });

        if (!service) {
            return new NextResponse("Service not found", { status: 404 });
        }

        if (service._count.institutions > 0) {
            return new NextResponse(
                `Bu hizmete bağlı ${service._count.institutions} kurum bulunmaktadır. Önce kurumları başka bir kategoriye taşıyın veya silin.`,
                { status: 400 }
            );
        }

        await prisma.service.delete({
            where: { id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error("[SERVICE_DELETE_ERROR]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
