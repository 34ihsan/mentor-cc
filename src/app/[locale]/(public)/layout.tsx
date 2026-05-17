import Header from '@/components/Header';
import Footer from '@/components/public/Footer';
import ClientWhatsAppWidget from '@/components/public/ClientWhatsAppWidget';


export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="pt-24 md:pt-[170px]">{children}</main>
            <Footer />
            <ClientWhatsAppWidget />
        </>
    );
}
