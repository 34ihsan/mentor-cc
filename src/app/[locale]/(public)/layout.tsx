import Header from '@/components/Header';
import Footer from '@/components/public/Footer';
import ClientWhatsAppWidget from '@/components/public/ClientWhatsAppWidget';
import { prisma } from '@/lib/prisma';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    let siteConfig = null;
    try {
        const settings = await prisma.settings.findUnique({
            where: { key: 'site_config' }
        });
        if (settings && settings.value) {
            siteConfig = JSON.parse(settings.value);
        }
    } catch (error) {
        console.error('Failed to fetch site config in layout:', error);
    }

    return (
        <>
            <Header siteConfig={siteConfig} />
            <main className="pt-24 md:pt-[170px]">{children}</main>
            <Footer siteConfig={siteConfig} />
            <ClientWhatsAppWidget />
        </>
    );
}
