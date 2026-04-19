import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, User, Clock, ArrowLeft, Share2, School, GraduationCap, MapPin, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { Metadata } from "next";
import { formatPremiumContent } from "@/utils/text";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getRelatedInstitutionsAction } from "@/app/actions/link-actions";
import MotionWrapper from "@/components/public/MotionWrapper";

interface Props {
    params: Promise<{ slug: string; locale: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stareducon.co.uk';

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
        include: { author: { select: { name: true } } }
    });

    if (!post) return { title: "Sayfa Bulunamadı" };

    const description = post.content.substring(0, 160).replace(/<[^>]*>?/gm, '');
    const canonical = `${BASE_URL}/blog/${post.slug}`;

    return {
        title: post.title,
        description,
        authors: [{ name: post.author?.name || 'StarEducation' }],
        openGraph: {
            type: 'article',
            url: canonical,
            title: post.title,
            description,
            publishedTime: post.createdAt.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            authors: [post.author?.name || 'StarEducation'],
            section: post.category || 'Eğitim',
            images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description,
            images: post.image ? [post.image] : [],
        },
        alternates: { canonical },
    };
}

export default async function BlogPostPage(props: Props) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const isPreview = searchParams.preview === "true";
    let showDraft = false;

    // Admin check for draft preview
    if (isPreview) {
        try {
            const session = await auth();
            if (session?.user?.role === "ADMIN") {
                showDraft = true;
            }
        } catch (error) {
            console.error("Auth check failed during preview:", error);
        }
    }

    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
        include: {
            author: {
                select: { name: true }
            }
        }
    });

    if (!post) {
        notFound();
    }

    // Access control
    if (!post.published && !showDraft) {
        notFound();
    }

    const description = post.content.substring(0, 160).replace(/<[^>]*>?/gm, '');
    const canonical = `${BASE_URL}/blog/${post.slug}`;
    const { institutions: relatedInstitutions = [] } = await getRelatedInstitutionsAction(params.slug);

    return (
        <article className="min-h-screen bg-white text-zinc-950 selection:bg-zinc-900 selection:text-white">
            {/* Structured Data */}
            <ArticleSchema
                title={post.title}
                description={description}
                url={canonical}
                image={post.image || undefined}
                publishedAt={post.createdAt.toISOString()}
                modifiedAt={post.updatedAt.toISOString()}
                authorName={post.author?.name || 'StarEducation Editörü'}
                category={post.category || 'Yurtdışı Eğitim'}
            />
            <BreadcrumbSchema items={[
                { name: 'Ana Sayfa', url: BASE_URL },
                { name: 'Blog', url: `${BASE_URL}/blog` },
                { name: post.title, url: canonical },
            ]} />

            {/* Cinematic Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-zinc-950">
                <div className="absolute inset-0">
                    {post.image && (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover opacity-60 scale-105"
                            sizes="100vw"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950 z-10" />
                </div>

                <div className="relative container mx-auto px-6 z-20 h-full flex flex-col justify-end pb-24">
                    <MotionWrapper className="max-w-6xl">
                        <div className="flex flex-wrap items-center gap-6 mb-10">
                            <Link
                                href={`/${params.locale}/blog`}
                                className="group flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-zinc-950 transition-all duration-500"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Blog Arşivi
                            </Link>

                            <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
                                <span className="px-4 py-1 rounded-full bg-zinc-100/10 text-zinc-300">
                                    {post.category || "ANALİZ"}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                        </div>

                        <h1 className="text-[min(10vw,100px)] font-serif font-medium text-white mb-10 tracking-tight leading-[0.9]">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-5">
                            <div className="w-12 h-px bg-white/20" />
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Star Education Strateji Merkezi</p>
                        </div>
                    </MotionWrapper>
                </div>
            </section>

            {/* Article Content Area */}
            <section className="relative px-6 -mt-24 pb-32 z-30">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        
                        {/* Main Article Body */}
                        <div className="lg:col-span-8 lg:col-start-3">
                            <MotionWrapper className="bg-white p-12 md:p-24 rounded-[3rem] shadow-2xl border border-zinc-100">
                                <div className="max-w-3xl mx-auto">
                                    <div className="w-12 h-1 bg-zinc-900 mb-16 rounded-full" />
                                    
                                    <div
                                        className="prose-premium prose-zinc lg:prose-xl italic text-zinc-600 leading-[1.8] font-serif"
                                        dangerouslySetInnerHTML={{ __html: formatPremiumContent(post.content || "", post.title) }}
                                    />

                                    {/* Article Footer */}
                                    <div className="mt-24 pt-12 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-px bg-zinc-200" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                                                Kaynak: Star Education Strateji Merkezi
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-8">
                                            <button className="flex items-center gap-3 text-zinc-900 font-bold text-[10px] uppercase tracking-widest hover:text-zinc-500 transition-all group">
                                                <Share2 size={16} className="group-hover:rotate-12 transition-transform" />
                                                Paylaş
                                            </button>
                                            <Link 
                                                href={`/${params.locale}/iletisim`}
                                                className="px-8 py-3 rounded-full bg-zinc-950 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                                            >
                                                Danışmanlık Al
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </MotionWrapper>

                            {/* Related Institutions Grid */}
                            {relatedInstitutions.length > 0 && (
                                <MotionWrapper delay={0.2} className="mt-32 space-y-12">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-900 shadow-sm">
                                            <School size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-serif font-medium text-zinc-900 italic">İlgili Kurumlar</h3>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Stratejik Eğitim Entegrasyonu</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {relatedInstitutions.map((inst: any) => (
                                            <Link 
                                                key={inst.id} 
                                                href={`/${params.locale}/kurumsal/kurumlar/${inst.slug}`}
                                                className="group p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:border-zinc-300 hover:shadow-2xl transition-all duration-700"
                                            >
                                                <div className="flex items-start justify-between mb-8">
                                                    <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                                                        <MapPin size={12} className="text-zinc-900" />
                                                        {inst.city}, {inst.country?.name}
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-white border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white transition-all duration-500">
                                                        <ChevronRight size={16} />
                                                    </div>
                                                </div>
                                                <h4 className="text-2xl font-serif font-medium text-zinc-900 mb-6 italic group-hover:text-zinc-600 transition-colors leading-tight">
                                                    {inst.name}
                                                </h4>
                                                <div className="flex items-center gap-3 pt-6 border-t border-zinc-200/60">
                                                    <div className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse" />
                                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Akademik Uyum Mevcut</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </MotionWrapper>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
