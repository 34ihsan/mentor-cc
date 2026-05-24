import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function showMenu() {
    console.log("\n=============================================");
    console.log("   MENTOR-CC VERİTABANI YÖNETİM VE RECOVERY ARACI");
    console.log("=============================================");
    console.log("1. Tüm Kullanıcıların E-posta Onaylarını Tamamla (emailVerified = NOW)");
    console.log("2. En Son Şifre Sıfırlama Taleplerini ve Linklerini Listele");
    console.log("3. Belirli Bir Kullanıcının Şifresini Doğrudan Güncelle");
    console.log("4. Tüm Kayıtlı Kullanıcıları Listele");
    console.log("5. Çıkış");
    console.log("=============================================");
}

async function verifyAllUsers() {
    console.log("\n⏳ Tüm kullanıcıların e-posta doğrulama durumları güncelleniyor...");
    try {
        const result = await prisma.user.updateMany({
            where: { emailVerified: null },
            data: { emailVerified: new Date() }
        });
        console.log(`✅ İşlem tamamlandı! Toplam ${result.count} kullanıcının e-postası doğrulandı.`);
    } catch (error) {
        console.error("❌ Hata oluştu:", error);
    }
}

async function listResetTokens() {
    console.log("\n⏳ Aktif şifre sıfırlama talepleri taranıyor...");
    try {
        const users = await prisma.user.findMany({
            where: {
                resetToken: { not: null }
            },
            select: {
                email: true,
                name: true,
                resetToken: true,
                resetTokenExpiry: true
            }
        });

        if (users.length === 0) {
            console.log("ℹ️ Şu anda aktif bir şifre sıfırlama talebi (token) bulunmamaktadır.");
            return;
        }

        console.log(`\n🔑 Toplam ${users.length} aktif sıfırlama talebi bulundu:`);
        for (const u of users) {
            const isExpired = u.resetTokenExpiry ? new Date() > u.resetTokenExpiry : true;
            const status = isExpired ? "⚠️ SÜRESİ DOLMUŞ" : "✅ AKTİF";
            const resetLink = `https://www.mentor-cc.com/auth/reset-password?token=${u.resetToken}`;
            
            console.log(`---------------------------------------------`);
            console.log(`Kullanıcı: ${u.name || "İsimsiz"} (${u.email})`);
            console.log(`Durum: ${status}`);
            console.log(`Geçerlilik: ${u.resetTokenExpiry ? u.resetTokenExpiry.toLocaleString() : 'Belirsiz'}`);
            console.log(`Sıfırlama Linki: ${resetLink}`);
        }
        console.log(`---------------------------------------------`);
    } catch (error) {
        console.error("❌ Hata oluştu:", error);
    }
}

async function changeUserPassword(email: string, plainPassword: string) {
    if (!email || !plainPassword) {
        console.log("❌ E-posta ve şifre boş bırakılamaz.");
        return;
    }
    
    console.log(`\n⏳ ${email} kullanıcısının şifresi güncelleniyor...`);
    try {
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
        if (!user) {
            console.log("❌ Belirtilen e-posta adresine ait bir kullanıcı bulunamadı.");
            return;
        }

        const hashedPassword = await bcrypt.hash(plainPassword, 12);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                emailVerified: new Date() // Şifre değiştirirken e-postayı da doğrula
            }
        });

        console.log(`✅ Şifre başarıyla '${plainPassword}' olarak güncellendi ve hesap doğrulandı!`);
    } catch (error) {
        console.error("❌ Hata oluştu:", error);
    }
}

async function listAllUsers() {
    console.log("\n⏳ Tüm kullanıcılar listeleniyor...");
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                emailVerified: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });

        console.log(`\n👥 Toplam ${users.length} Kayıtlı Kullanıcı:`);
        console.log(`ID | Rol | E-posta | İsim | E-posta Onay Durumu | Kayıt Tarihi`);
        console.log(`---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`);
        for (const u of users) {
            const verified = u.emailVerified ? `✅ (${u.emailVerified.toLocaleDateString()})` : "❌ Onaylanmamış";
            console.log(`- ${u.id} | ${u.role} | ${u.email} | ${u.name || "-"} | ${verified} | ${u.createdAt.toLocaleDateString()}`);
        }
        console.log(`---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`);
    } catch (error) {
        console.error("❌ Hata oluştu:", error);
    }
}

async function main() {
    const args = process.argv.slice(2);
    
    // Command line args check (non-interactive friendly)
    if (args.length > 0) {
        const action = args[0];
        if (action === "--verify-all") {
            await verifyAllUsers();
        } else if (action === "--list-resets") {
            await listResetTokens();
        } else if (action === "--change-pass" && args[1] && args[2]) {
            await changeUserPassword(args[1], args[2]);
        } else if (action === "--list-users") {
            await listAllUsers();
        } else {
            console.log("Geçersiz parametre. Kullanım:");
            console.log("npx tsx scratch/recovery-helper.ts --verify-all");
            console.log("npx tsx scratch/recovery-helper.ts --list-resets");
            console.log("npx tsx scratch/recovery-helper.ts --change-pass <email> <yeni_sifre>");
            console.log("npx tsx scratch/recovery-helper.ts --list-users");
        }
        await prisma.$disconnect();
        return;
    }

    // Default: menu and prompt
    await showMenu();
    console.log("\nLütfen komut satırından çalıştırmak için parametreleri kullanın:");
    console.log("  1. Tümünü Doğrula:   npx tsx scratch/recovery-helper.ts --verify-all");
    console.log("  2. Talepleri Listele:npx tsx scratch/recovery-helper.ts --list-resets");
    console.log("  3. Şifre Değiştir:   npx tsx scratch/recovery-helper.ts --change-pass email@adres.com yeniSifre123");
    console.log("  4. Üyeleri Listele:  npx tsx scratch/recovery-helper.ts --list-users");
    
    await prisma.$disconnect();
}

main();
