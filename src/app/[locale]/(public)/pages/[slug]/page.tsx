import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Hero from "@/components/public/Hero";

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await prisma.page.findUnique({
        where: { slug },
        include: { author: { select: { name: true } } }
    });

    if (!page || !page.published) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <Hero
                title={page.title}
                subtitle="Mentor Career ile eğitim yolculuğunuzu şekillendirin."
                ctaText="İletişime Geçin"
                ctaHref="/iletisim"
                backgroundImage={page.image || "/images/hero-education-global.png"}
                height="md"
            />

            {/* Content Section */}
            <section className="section-padding bg-background">
                <div className="max-w-4xl mx-auto px-6 md:px-10">
                    <div className="prose-premium max-w-none leading-relaxed">
                        <div
                            className="premium-page-content text-zinc-600 font-sans text-lg md:text-xl lg:leading-loose"
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    </div>

                    {/* Page Meta */}
                    <div className="mt-20 pt-10 border-t border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span>Son Güncelleme: {new Date(page.updatedAt).toLocaleDateString("tr-TR")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span>Yazar: {page.author.name}</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
