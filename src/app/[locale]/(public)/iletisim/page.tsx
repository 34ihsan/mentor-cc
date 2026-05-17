import { prisma } from '@/lib/prisma';
import ContactForm from '@/components/public/ContactForm';
import { Mail, Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Contact' });
    
    let config: any = null;
    try {
        const settings = await prisma.settings.findUnique({
            where: { key: 'site_config' }
        });
        if (settings && settings.value) {
            config = JSON.parse(settings.value);
        }
    } catch (error) {
        console.error('Failed to fetch contact config:', error);
    }

    // Fallback values
    const contact = config?.contact || {
        phone: "+44 7501 412151",
        email: "info@mentor-cc.com"
    };

    const hours = config?.workingHours || {
        weekdays: "09:00 - 18:00",
        saturday: "10:00 - 14:00"
    };

    return (
        <main className="bg-background min-h-screen text-navy selection:bg-primary selection:text-white">
            {/* Header Section */}
            <section className="bg-zinc-50 border-b border-zinc-100 overflow-hidden relative">
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />
                </div>
                
                <div className="container-content py-24 md:py-32 relative z-10">
                    <div className="max-w-3xl">
                        <div className="section-label">
                            {t('label')}
                        </div>
                        <SafeHTMLContent 
                            as="h1" 
                            className="text-fluid-h1 font-serif font-bold text-primary mb-8 italic" 
                            html={t.raw('title')} 
                        />
                        <p className="text-fluid-p text-zinc-600 border-l-2 border-secondary pl-8 max-w-2xl leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Collaboration Section */}
            <section className="section-padding bg-zinc-50 border-t border-zinc-100">
                <div className="container-content text-center">
                    <div className="max-w-4xl mx-auto">
                        <SafeHTMLContent 
                            as="h2" 
                            className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 italic" 
                            html={t.raw('collaborationTitle')} 
                        />
                        <p className="text-fluid-p text-zinc-600 leading-relaxed">
                            {t('collaborationDesc')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Info and Form Section */}
            <section id="contact-form" className="section-padding">
                <div className="container-content">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                        
                        {/* Left: Contact Details */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <SafeHTMLContent 
                                    as="h2" 
                                    className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6 italic" 
                                    html={t.raw('officeTitle')} 
                                />
                                <p className="text-zinc-600 mb-10 leading-relaxed text-lg">
                                    {t('officeDesc')}
                                </p>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                                    {/* WhatsApp Card */}
                                    <div className="premium-card p-8 group">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                            </svg>
                                        </div>
                                        <h3 className="font-serif font-bold text-primary text-xl mb-2 italic">WhatsApp</h3>
                                        <a href="https://wa.me/447501412151" target="_blank" rel="noopener noreferrer" className="text-secondary font-bold text-lg hover:text-emerald-500 transition-colors">
                                            {t('whatsappCta')}
                                        </a>
                                    </div>

                                    {/* Email Card */}
                                    <div className="premium-card p-8 group">
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-50 text-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-serif font-bold text-primary text-xl mb-2 italic">{t('email')}</h3>
                                        <a href={`mailto:${contact.email}`} className="text-secondary font-bold text-lg hover:text-primary transition-colors">
                                            {contact.email}
                                        </a>
                                    </div>

                                    {/* Working Hours Card */}
                                    <div className="premium-card p-8 bg-zinc-50/50 border-dashed sm:col-span-2 lg:col-span-1">
                                        <div className="flex items-start gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white border border-secondary/20 flex items-center justify-center text-secondary shrink-0">
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif font-bold text-primary text-xl mb-3 italic">{t('workingHours')}</h3>
                                                <div className="text-zinc-600 space-y-1 text-sm">
                                                    <p><span className="text-primary font-bold not-italic">{t('weekdays')}:</span> {hours.weekdays}</p>
                                                    <p><span className="text-primary font-bold not-italic">{t('saturday')}:</span> {hours.saturday}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="premium-card p-8 md:p-12 shadow-2xl shadow-primary/5 bg-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                                <ContactForm title={t('formTitle')} showServiceSelect={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
