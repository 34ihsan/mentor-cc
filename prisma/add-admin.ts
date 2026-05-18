import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = "info@mentor-cc.com";
    const name = "Mentor Career Consulting Info";
    const role = "ADMIN";
    const password = "password123"; // Varsayılan şifre. İlk girişten sonra güncellenebilir.

    console.log(`Admin kullanıcısı ekleniyor/güncelleniyor: ${email}...`);
    const hashedPassword = await hash(password, 12);
    
    const user = await prisma.user.upsert({
        where: { email },
        update: { name, role },
        create: {
            email,
            name,
            role,
            password: hashedPassword,
        },
    });

    console.log("Admin kullanıcısı başarıyla eklendi/güncellendi:", {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    });
}

main()
    .catch((e) => {
        console.error("Hata:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
