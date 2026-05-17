import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function HakkimizdaPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations('About');
  const commonT = await getTranslations('Common');

  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <div className="mb-12">
        <span className="text-primary font-black tracking-[0.3em] uppercase text-xs block mb-4">
          {t('heritageLabel')}
        </span>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-tight mb-8">
          {commonT('title')}
        </h1>
        
        <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12 border-l-4 border-primary pl-8 py-2">
          {t('heroSubtitle')}
        </p>
      </div>

      <section className="prose prose-slate max-w-none space-y-12">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-4">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            {t('mission')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed italic">
            {t('missionDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          <div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">
              {t('vision')}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {t('visionDesc')}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">
              {t('teamTitle')}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {t('teamSummary')}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 p-12 rounded-[40px] text-white shadow-2xl relative overflow-hidden mt-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 leading-none">
              {t('ctaTitle')}
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl">
              {t('ctaSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/iletisim" 
                className="px-8 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform"
              >
                {t('getCounseling')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
