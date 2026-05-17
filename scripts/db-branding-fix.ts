import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Starting branding migration in database (Star Education -> Mentor Career)...");
  
  // Find users with legacy emails or names
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: "stareducation" } },
        { email: { contains: "stareducon" } },
        { name: { contains: "Star Education" } },
        { name: { contains: "StarEducation" } }
      ]
    }
  });

  console.log(`Found ${users.length} users with legacy branding.`);

  for (const user of users) {
    let newEmail = user.email;
    let newName = user.name;

    if (newEmail) {
      newEmail = newEmail.replace(/stareducation\.com/gi, "mentor-cc.com")
                         .replace(/stareducon\.co\.uk/gi, "mentor-cc.com")
                         .replace(/stareducon/gi, "mentorcc");
    }

    if (newName) {
      newName = newName.replace(/Star Education Consulting/gi, "Mentor Career Consulting")
                       .replace(/Star Education/gi, "Mentor Career")
                       .replace(/StarEducation/gi, "MentorCareer");
    }
    
    if (newEmail !== user.email || newName !== user.name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          email: newEmail, 
          name: newName 
        }
      });
      console.log(`Updated: ${user.name} (${user.email}) -> ${newName} (${newEmail})`);
    }
  }
  
  console.log(`Done. Updated ${users.length} users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
