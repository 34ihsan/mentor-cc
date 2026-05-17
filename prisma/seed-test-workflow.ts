import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("Creating workflow test users for mentor-cc.com...");

    const users = [
        { 
            email: "management@mentor-cc.com", 
            name: "Mentor Career Management", 
            role: "ADMIN" as const 
        },
        { 
            email: "consultant@mentor-cc.com", 
            name: "Senior Education Consultant", 
            role: "ADVISOR" as const 
        },
        { 
            email: "global@mentor-cc.com", 
            name: "Global Agency Partner", 
            role: "AGENCY_MANAGER" as const 
        },
        { 
            email: "demo@mentor-cc.com", 
            name: "Demo Student Account", 
            role: "STUDENT" as const 
        },
    ];

    for (const { email, name, role } of users) {
        const hashedPassword = await hash("password123", 12);
        
        await prisma.user.upsert({
            where: { email },
            update: { 
                name, 
                role,
                password: hashedPassword 
            },
            create: {
                email,
                name,
                role,
                password: hashedPassword,
            },
        });
        console.log(`- Upserted: ${email} (${role})`);
    }

    console.log("Workflow test seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
