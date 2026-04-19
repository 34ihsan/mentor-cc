
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    try {
        const session = await auth();
        // Check if user is authenticated
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return new NextResponse("No file uploaded", { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const relativeUploadDir = `/uploads/${new Date().getFullYear()}/${new Date().getMonth() + 1}`;
        const uploadDir = join(process.cwd(), "public", relativeUploadDir);

        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            console.error("Error creating directory", e);
        }

        // Clean filename and add unique ID
        const uniqueSuffix = randomUUID().slice(0, 8);
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "");
        const filename = `${uniqueSuffix}-${originalName}`;

        const finalPath = join(uploadDir, filename);

        await writeFile(finalPath, buffer);

        const fileUrl = `${relativeUploadDir}/${filename}`;

        return NextResponse.json({ url: fileUrl });
    } catch (error) {
        console.error("Upload error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
