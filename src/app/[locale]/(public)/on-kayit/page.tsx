import { getTranslations } from "next-intl/server";
import AcademicEvaluationForm from "@/components/public/AcademicEvaluationForm";
import MotionWrapper from "@/components/public/MotionWrapper";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    return {
        title: locale === 'tr' ? 'Akademik Değerlendirme & Ön Kayıt' : 'Academic Evaluation & Pre-Registration',
        description: locale === 'tr' 
            ? 'Geleceğinizi uzmanlarımızla planlayın. Ücretsiz akademik değerlendirme formunu doldurun.' 
            : 'Plan your future with our experts. Fill out the free academic evaluation form.'
    };
}

export default async function EvaluationPage({ params }: PageProps) {
    const p = await params;
    const locale = p.locale;
    const t = await getTranslations('EvaluationForm');

    return (
        <div className="bg-zinc-50 min-h-screen selection:bg-secondary selection:text-white">

            
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-navy skew-y-6 -translate-y-1/2 z-0" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <MotionWrapper>
                        <div className="text-center mb-20">
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 italic tracking-tight">
                                {locale === 'tr' ? 'Akademik Değerlendirme' : 'Academic Evaluation'}
                            </h1>
                            <p className="text-zinc-400 text-xl font-serif max-w-2xl mx-auto italic leading-relaxed">
                                {locale === 'tr' 
                                    ? 'Global eğitim yolculuğunuzda en doğru adımı atmanız için size özel bir strateji oluşturuyoruz. Ücretsiz değerlendirme formunu doldurarak ilk adımı atın.'
                                    : 'We create a custom strategy for you to take the right step in your global education journey. Take the first step by filling out the free evaluation form.'}
                            </p>
                        </div>
                    </MotionWrapper>

                    <AcademicEvaluationForm />
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Ücretsiz Analiz', desc: 'Akademik geçmişinizin uzmanlarımız tarafından ücretsiz incelenmesi.', icon: '01' },
                            { title: 'Kişisel Rota', desc: 'Hedeflerinize ve bütçenize en uygun ülke ve okul seçenekleri.', icon: '02' },
                            { title: 'Hızlı Dönüş', desc: 'Formu doldurduktan sonra 24 saat içinde ilk analiz raporu.', icon: '03' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-6 items-start">
                                <span className="text-4xl font-serif font-black text-secondary/20 italic">{item.icon}</span>
                                <div>
                                    <h4 className="text-lg font-serif font-bold text-navy italic mb-2">{item.title}</h4>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
}
