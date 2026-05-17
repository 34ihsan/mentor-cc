"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

export async function processExcelImportAction(formData: FormData) {
    const session = await auth();
    if (session?.user.role !== "ADMIN" && session?.user.role !== "CEO") {
        return { success: false, error: "Yetkisiz erişim" };
    }

    const file = formData.get("file") as File;
    if (!file) {
        return { success: false, error: "Dosya yüklenemedi" };
    }

    // Basic MIME type check
    if (!file.type.includes("spreadsheetml") && !file.type.includes("excel")) {
        return { success: false, error: "Sadece Excel dosyaları (.xlsx, .xls) kabul edilmektedir." };
    }

    try {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        // Security: Ensure the .tmp directory is safe and isolated
        const tmpDir = path.join(process.cwd(), ".tmp");
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }

        // Add a timestamp and user ID to the filename to prevent collision/hijacking
        const timestamp = new Date().getTime();
        const safeFileName = `import_${session.user.id}_${timestamp}.json`;
        const importPath = path.join(tmpDir, safeFileName);
        
        fs.writeFileSync(importPath, JSON.stringify(data, null, 2));

        // SECURITY REMOVAL: Unused child_process 'exec' removed.
        
        return { 
            success: true, 
            count: data.length, 
            fileName: safeFileName,
            message: `${data.length} kayıt güvenli bir şekilde yüklendi. İşlemeye hazır.` 
        };
    } catch (error: any) {
        console.error("Excel import error:", error);
        return { success: false, error: "Dosya işlenirken bir hata oluştu." };
    }
}

export async function processImportedFileAction(fileName: string) {
    const session = await auth();
    if (session?.user.role !== "ADMIN" && session?.user.role !== "CEO") {
        return { success: false, error: "Yetkisiz erişim" };
    }

    const tmpDir = path.join(process.cwd(), ".tmp");
    const filePath = path.join(tmpDir, fileName);

    if (!fs.existsSync(filePath)) {
        return { success: false, error: "Dosya bulunamadı." };
    }

    try {
        const rawData = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(rawData);
        let createdCount = 0;
        let skippedCount = 0;

        for (const item of data) {
            const name = item["İsim"] || item["Name"] || item["Kurum Adı"];
            const website = item["Web Sitesi"] || item["Website"] || item["Web"];
            const categoryName = item["Kategori"] || item["Category"];
            const countryName = item["Ülke"] || item["Country"];
            const city = item["Şehir"] || item["City"] || "Belirtilmemiş";

            if (!name) {
                skippedCount++;
                continue;
            }

            // Find or skip category/country
            const service = await prisma.service.findFirst({
                where: { title: { contains: categoryName, mode: 'insensitive' } }
            });

            const country = await prisma.country.findFirst({
                where: { name: { contains: countryName, mode: 'insensitive' } }
            });

            const slug = name.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

            await prisma.institution.upsert({
                where: { slug },
                update: {
                    website: website || undefined,
                    city: city,
                    countryId: country?.id,
                    serviceId: service?.id,
                },
                create: {
                    name,
                    slug,
                    city,
                    website,
                    countryId: country?.id,
                    serviceId: service?.id,
                    active: true,
                    harvestStatus: "IDLE"
                }
            });
            createdCount++;
        }

        // Cleanup
        fs.unlinkSync(filePath);

        return { 
            success: true, 
            message: `${createdCount} kurum başarıyla oluşturuldu/güncellendi. ${skippedCount} kayıt atlandı.`,
            count: createdCount
        };
    } catch (error: any) {
        console.error("Processing error:", error);
        return { success: false, error: "Veri işlenirken bir hata oluştu." };
    }
}

