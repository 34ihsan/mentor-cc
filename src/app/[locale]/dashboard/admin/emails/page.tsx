import { setRequestLocale } from "next-intl/server";
import ClientPage from "./ClientPage";

export const metadata = {
    title: "E-posta Yönetimi | Mentor Career",
    description: "Kullanıcılara e-posta gönderimi yapın.",
};

export default function EmailsPage({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale);
    
    return <ClientPage />;
}
