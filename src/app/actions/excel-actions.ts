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
            message: `${data.length} kayıt güvenli bir şekilde sıraya alındı. Veri işleme arka planda devam edecek.` 
        };
    } catch (error: any) {
        console.error("Excel import error:", error);
        return { success: false, error: "Dosya işlenirken bir güvenlik hatası veya veri hatası oluştu." };
    }
}
