const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function main() {
    console.log("Using SMTP Settings:");
    console.log("Host:", process.env.SMTP_HOST);
    console.log("Port:", process.env.SMTP_PORT);
    console.log("Secure:", process.env.SMTP_SECURE);
    console.log("User:", process.env.SMTP_USER);
    console.log("Pass Length:", process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0);

    try {
        console.log("\nVerifying SMTP connection...");
        await transporter.verify();
        console.log("✅ SMTP Connection is verified and ready!");

        console.log("\nAttempting to send a test email...");
        const info = await transporter.sendMail({
            from: `"Mentor Career Test" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // Send to self
            subject: "Mentor Career SMTP Test",
            text: "Hello! If you are reading this, the SMTP configuration is working perfectly.",
            html: "<b>Hello!</b> If you are reading this, the SMTP configuration is working perfectly."
        });

        console.log("✅ Test email sent successfully!");
        console.log("Message ID:", info.messageId);

    } catch (error) {
        console.error("❌ SMTP Error occurred:");
        console.error(error);
    }
}

main();
