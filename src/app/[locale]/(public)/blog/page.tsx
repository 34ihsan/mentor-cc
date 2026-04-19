import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { Calendar, Clock, ArrowRight, Image as ImageIcon, Search, Tag, ArrowUpRight } from 'lucide-react';
import MotionWrapper from '@/components/public/MotionWrapper';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

interface Props {
    params: Promise<{ locale: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stareducon.co.uk';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Blog' });
    
    return {
        title: t('title').replace(/<[^>]*>?/gm, ''),
        description: t('label') + ' - StarEducation Akademik Perspektif',
        alternates: {
            canonical: `${BASE_URL}/blog`
        }
    };
}

export default async function BlogArchivePage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Blog' });
    const navbarT = await getTranslations({ locale, namespace: 'Navbar' });

    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: {
            author: {
                select: { name: true }
            }
        }
    });

    return (
        <main className="min-h-screen bg-white">
            <BreadcrumbSchema items={[
                { name: navbarT('home'), url: '/' },
                { name: navbarT('blog'), url: '/blog' },
            ]} />

            {/* Premium Archive Hero */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#B4943E]/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <MotionWrapper>
                            <span className="inline-block px-6 py-2 rounded-full border border-[#B4943E]/20 bg-[#B4943E]/5 text-[#B4943E] font-bold uppercase tracking-[0.3em] text-[10px] mb-8">
                                {t('label')}
                            </span>
                            <SafeHTMLContent
                                as="h1"
                                className="text-6xl md:text-8xl font-serif font-black text-slate-900 tracking-tighter leading-[0.9] italic mb-10"
                                html={t.raw('title')}
                            />
                            <p className="text-xl text-slate-500 font-serif italic max-w-2xl leading-relaxed">
                                {posts.length > 0 
                                    ? `Akademik başarı ve global eğitim dünyasındaki en yeni gelişmeleri, ${posts.length} stratejik analiz ile keşfedin.` 
                                    : t('empty')}
                            </p>
                        </MotionWrapper>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                            {posts.map((post, idx) => (
                                <MotionWrapper key={post.id} delay={idx * 0.1}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="group flex flex-col bg-slate-50/50 border border-slate-100 p-4 rounded-[3rem] hover:bg-white hover:shadow-2xl hover:border-slate-200 transition-all duration-700 h-full"
                                    >
                                        <div className="aspect-[4/5] bg-slate-200 relative overflow-hidden rounded-[2.5rem] mb-10">
                                            {post.image ? (
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <ImageIcon size={64} strokeWidth={0.5} />
                                                </div>
                                            )}
                                            
                                            {/* Minimalist Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                            
                                            <div className="absolute top-8 right-8">
                                                <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 shadow-xl scale-0 group-hover:scale-100 transition-transform duration-500">
                                                    <ArrowUpRight size={20} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col flex-1 px-6 pb-10">
                                            <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-[0.2em]">
                                                <div className="flex items-center gap-2">
                                                    <Tag size={12} className="text-[#B4943E]" />
                                                    <span>{post.category || t('categoryDefault')}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={12} className="text-slate-300" />
                                                    <span>{new Date(post.createdAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}</span>
                                                </div>
                                            </div>
                                            
                                            <h3 className="text-3xl font-serif font-medium text-slate-900 leading-tight mb-8 group-hover:text-slate-600 transition-colors duration-500 italic">
                                                {post.title}
                                            </h3>
                                            
                                            {post.excerpt && (
                                                <p className="text-slate-500 text-sm line-clamp-3 font-serif italic mb-10 opacity-70 group-hover:opacity-100 transition-opacity">
                                                    {post.excerpt}
                                                </p>
                                            )}

                                            <div className="mt-auto pt-10 border-t border-slate-100 flex items-center justify-between">
                                                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] group-hover:text-[#B4943E] transition-colors">
                                                    {t('readMore')}
                                                </span>
                                                <div className="flex items-center gap-2 text-slate-300 group-hover:text-[#B4943E] transition-all">
                                                    <div className="w-8 h-[1px] bg-current transition-all group-hover:w-12" />
                                                    <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </MotionWrapper>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32">
                            <div className="inline-block p-16 lg:p-24 border border-dashed border-slate-200 rounded-[4rem]">
                                <ImageIcon size={48} className="text-slate-200 mx-auto mb-8" strokeWidth={0.5} />
                                <p className="text-slate-400 font-serif italic text-xl">{t('empty')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
