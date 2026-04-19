import Header from '@/components/Header';
import Footer from '@/components/public/Footer';
import CookieConsent from '@/components/public/CookieConsent';
import WhatsAppWidget from '@/components/public/WhatsAppWidget';


export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="pt-32 md:pt-[170px]">{children}</main>
            <Footer />
            <CookieConsent />
            <WhatsAppWidget />
        </>
    );
}
