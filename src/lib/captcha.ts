export async function verifyReCaptcha(token: string | undefined) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    // reCAPTCHA secret key tanımlı değilse doğrulamayı atla (geliştirme modu)
    if (!secretKey) {
        console.warn("RECAPTCHA_SECRET_KEY is not defined. Skipping reCAPTCHA validation.");
        return true;
    }

    // Secret key varsa token zorunlu
    if (!token) return false;

    try {
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
            { method: "POST" }
        );
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error("reCAPTCHA verification error:", error);
        return false;
    }
}
