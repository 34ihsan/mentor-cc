'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Shield, FileText, Globe, AlertTriangle, Scale, Lock, Mail } from 'lucide-react';

const sections = [
    {
        id: 'taraflar',
        icon: FileText,
        title: 'Taraflar ve Sözleşmenin Konusu',
        content: `
            <p>Bu Kullanım Şartları ("Şartlar"), StarEducation Yurt Dışı Eğitim Danışmanlığı A.Ş. ("StarEducation", "biz" veya "şirket") ile <strong>www.stareducon.co.uk</strong> adresini ve bağlı tüm alt domainleri ("Platform") ziyaret eden veya kullanan gerçek ya da tüzel kişiler ("Kullanıcı") arasında kurulan yasal bir sözleşmeyi oluşturur.</p>
            <p>Platformu kullandığınız anda bu Şartları okumuş, anlamış ve kabul etmiş sayılırsınız. Bu Şartları kabul etmiyorsanız Platformu kullanmamanızı tavsiye ederiz.</p>
            <h4>Şirket Bilgileri</h4>
            <ul>
                <li><strong>Ticaret Unvanı:</strong> StarEducation Yurt Dışı Eğitim Danışmanlık</li>
                <li><strong>E-posta:</strong> info@stareducon.co.uk</li>
            </ul>
        `
    },
    {
        id: 'hizmet-kapsami',
        icon: Globe,
        title: 'Hizmet Kapsamı ve Niteliği',
        content: `
            <p>StarEducation, aşağıda belirtilen danışmanlık hizmetlerini sunan lisanslı bir eğitim danışmanlık firmasıdır:</p>
            <ul>
                <li>Yurt dışı lise, ön lisans, lisans ve lisansüstü eğitim danışmanlığı</li>
                <li>Dil okulu ve yaz okulu program seçimi ve başvuru yönetimi</li>
                <li>Vize ve denklik süreci hakkında bilgilendirme</li>
                <li>Yurt dışı eğitim burslarına yönlendirme</li>
                <li>Eğitim materyalleri, rehberler ve dijital içerik sunumu</li>
            </ul>
            <h4>Hizmet Sınırlamaları</h4>
            <p>Platformda yer alan tüm içerikler yalnızca <strong>genel bilgilendirme</strong> amaçlıdır. StarEducation:</p>
            <ul>
                <li>Üniversite veya okul kabulünü garanti etmez.</li>
                <li>Vize onayını garanti etmez; nihai karar ilgili ülkenin yetkili makamına aittir.</li>
                <li>Üçüncü taraf okul ve kurumların politikalarından doğan değişikliklerden sorumlu değildir.</li>
                <li>Platform üzerinden erişilen harici web sitelerinin içeriğinden sorumlu tutulamaz.</li>
            </ul>
        `
    },
    {
        id: 'kullanici-yukumlulukler',
        icon: Shield,
        title: 'Kullanıcı Yükümlülükleri ve Yasaklar',
        content: `
            <p>Platform kullanıcıları aşağıdaki kurallara uymayı kabul eder:</p>
            <h4>Genel Yükümlülükler</h4>
            <ul>
                <li>Platforma yalnızca yasal amaçlarla erişmek ve kullanmak.</li>
                <li>Kişisel bilgilerini doğru ve eksiksiz girmek; yanıltıcı bilgi sunmamak.</li>
                <li>Kayıt yaptırmaları halinde hesap bilgilerini korumak ve yetkisiz kullanımı derhal bildirmek.</li>
                <li>Platform üzerinden iletilen mesaj ve taleplerde saygılı bir dil kullanmak.</li>
            </ul>
            <h4>Yasaklanan Faaliyetler</h4>
            <p>Kullanıcılar kesinlikle aşağıdaki eylemleri gerçekleştirmemelidir:</p>
            <ul>
                <li>Platformun teknik altyapısına zarar verecek her türlü saldırı, zararlı yazılım yükleme veya botla veri çekme (scraping).</li>
                <li>Fikri mülkiyet haklarına aykırı içerik kopyalanması, yayılması veya değiştirilmesi.</li>
                <li>Başka kullanıcıların kimliğini taklit etmek veya sahte hesap oluşturmak.</li>
                <li>Yasadışı, ayrımcı veya taciz niteliğinde içerik iletmek veya paylaşmak.</li>
                <li>Platformun kaynaklarını aşırı tüketecek otomatik erişim araçları kullanmak.</li>
                <li>İzinsiz ticari reklam ve promosyon yapmak.</li>
            </ul>
            <p>StarEducation, bu kurallara aykırı davranan kullanıcıların erişimini yasal yollara başvurma hakkını saklı tutarak tek taraflı olarak kısıtlama veya sonlandırma hakkına sahiptir.</p>
        `
    },
    {
        id: 'fikri-mulkiyet',
        icon: Lock,
        title: 'Fikri Mülkiyet Hakları',
        content: `
            <p>Platform üzerinde yer alan tüm içerikler — metin, grafik, logo, ikon, görsel, ses kaydı, dijital indirme, veri derlemeleri ve yazılım dahil — StarEducation'un mülkiyetindedir ve <strong>5846 sayılı Fikir ve Sanat Eserleri Kanunu</strong> ile uluslararası telif hukuku kapsamında koruma altındadır.</p>
            <h4>İzin Verilen Kullanım</h4>
            <ul>
                <li>Kişisel, ticari olmayan amaçlarla Platform içerikleri görüntülenebilir ve yazdırılabilir.</li>
                <li>Sosyal medya paylaşımlarında kısmi alıntı ve kaynak göstererek atıf yapılabilir.</li>
            </ul>
            <h4>Yasaklanan Kullanım</h4>
            <ul>
                <li>Platform içeriklerinin ticari amaçla çoğaltılması, dağıtılması veya yayınlanması yasaktır.</li>
                <li>StarEducation markası, logosu ve ticari unvanı yazılı izin alınmadan kullanılamaz.</li>
                <li>İçeriklerin değiştirilerek veya uyarlanarak yeniden yayınlanması izne tabidir.</li>
            </ul>
            <p>Fikri mülkiyet ihlali fark ettiğinizde lütfen <strong>info@stareducon.co.uk</strong> adresiyle iletişime geçiniz.</p>
        `
    },
    {
        id: 'sorumluluk-sinirlamasi',
        icon: AlertTriangle,
        title: 'Sorumluluk Sınırlaması ve Feragatname',
        content: `
            <p>StarEducation, yürürlükteki mevzuatın izin verdiği azami ölçüde aşağıdaki konularda sorumluluk kabul etmez:</p>
            <h4>Dolaylı Zararlar</h4>
            <p>Platform kullanımından kaynaklanan gelir kaybı, veri kaybı, itibar kaybı veya fırsat kaybı dahil her türlü dolaylı ya da öngörülemeyen zararlardan StarEducation sorumlu tutulamaz.</p>
            <h4>Üçüncü Taraf Hizmetleri</h4>
            <p>Platform üzerinde yer alan bağlantılar üzerinden erişilen üçüncü taraf web sitelerinin içeriği, gizlilik politikaları veya hizmetlerinden doğan zararlardan StarEducation sorumlu değildir.</p>
            <h4>Teknik Aksaklıklar</h4>
            <p>Sunucu kesintileri, siber saldırılar, iletişim altyapısındaki arızalar veya mücbir sebepler nedeniyle oluşan hizmet kesintilerinden doğan zararlardan StarEducation sorumlu tutulamaz.</p>
            <h4>Okul ve Vize Kararları</h4>
            <p>Danışmanlık sürecimiz sonucunda yapılan başvuruların okul tarafından kabul edilip edilmeyeceği tamamen ilgili eğitim kurumunun takdirindedir. Vize kararları ise tamamen ilgili ülkenin konsolosluğunun yetkisindedir. StarEducation, bu kararları etkileme veya garanti etme imkânına sahip değildir.</p>
        `
    },
    {
        id: 'gizlilik',
        icon: Shield,
        title: 'Gizlilik ve Kişisel Veri İşleme',
        content: `
            <p>Kişisel verilerinizin işlenmesine ilişkin ayrıntılı bilgi için lütfen ayrı bir sayfa olarak hazırladığımız aşağıdaki politika belgelerimizi inceleyiniz:</p>
            <ul>
                <li><strong><a href="/kvkk" style="color: #C9A84C;">KVKK & GDPR/DSGVO Aydınlatma Metni</a></strong> — Kişisel verilerinizin hangi amaçlarla, hangi hukuki dayanaklara göre ve ne süreyle işlendiğini ayrıntılı biçimde açıklar.</li>
                <li><strong><a href="/cookies" style="color: #C9A84C;">Çerez (Cookie) Politikası</a></strong> — Platformda kullanılan çerez türleri, amaçları ve yönetim yöntemleri hakkında bilgi sunar.</li>
            </ul>
            <p>Kişisel verilerinizin işlenmesine rıza gösterip göstermediğinizi ve varsa tercihlerinizi aşağıdaki adres üzerinden her zaman güncelleyebilirsiniz:</p>
            <ul>
                <li><strong>E-posta:</strong> info@stareducon.co.uk</li>
            </ul>
        `
    },
    {
        id: 'degisiklikler',
        icon: FileText,
        title: 'Değişiklikler ve Güncellemeler',
        content: `
            <p>StarEducation, bu Kullanım Şartlarını önceden haber vermeksizin değiştirme hakkını saklı tutar. Değişiklikler Platformda yayınlandığı tarihte yürürlüğe girer.</p>
            <p>Önemli değişiklikler söz konusu olduğunda kayıtlı kullanıcılar e-posta yoluyla veya Platform üzerinden bilgilendirilir. Değişiklik sonrası Platformu kullanmaya devam etmeniz, güncellenmiş Şartları kabul ettiğiniz anlamına gelir.</p>
            <p>Bu sayfanın en üstünde yer alan <strong>"Son Güncelleme"</strong> tarihi, Şartların geçerli versiyonuna ilişkin bilgi verir. Önceki versiyonlara erişim talep etmek için <strong>info@stareducon.co.uk</strong> ile iletişime geçebilirsiniz.</p>
        `
    },
    {
        id: 'uyusmazlik',
        icon: Scale,
        title: 'Uyuşmazlık Çözümü ve Uygulanacak Hukuk',
        content: `
            <p>Bu Şartlar, Türkiye Cumhuriyeti kanunlarına tabi olup, bu Şartlardan doğacak her türlü uyuşmazlıkta <strong>İstanbul Mahkemeleri ve İcra Daireleri</strong> yetkilidir.</p>
            <h4>Önce Müzakere</h4>
            <p>Her iki taraf da yargı yoluna başvurmadan önce ihtilafı müzakere yoluyla çözmeye çalışmayı taahhüt eder. Kullanıcılar şikayetlerini öncelikli olarak <strong>info@stareducon.co.uk</strong> adresine iletebilir.</p>
            <h4>Tüketici Hakları</h4>
            <p>Tüketici sıfatını haiz kullanıcılar, uyuşmazlık çözümü için ilgili <strong>Tüketici Hakem Heyeti</strong> veya <strong>Tüketici Mahkemelerine</strong> de başvurabilir.</p>
            <h4>Uluslararası Kullanıcılar</h4>
            <p>Avrupa Birliği'nde ikamet eden kullanıcılar, anlaşmazlıklarını <strong>AB Online Uyuşmazlık Çözüm Platformu (ODR)</strong> aracılığıyla da çözüme kavuşturabilir: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style="color: #C9A84C;">ec.europa.eu/consumers/odr</a></p>
        `
    },
    {
        id: 'iletisim',
        icon: Mail,
        title: 'İletişim ve Yasal Bildirimler',
        content: `
            <p>Bu Kullanım Şartlarına ilişkin soru, yorum veya bildirimleriniz için aşağıdaki kanallardan bizimle iletişime geçebilirsiniz:</p>
            <ul>
                <li><strong>Genel İletişim:</strong> info@stareducon.co.uk</li>
                <li><strong>Hukuki Bildirimler:</strong> info@stareducon.co.uk</li>
                <li><strong>KVKK / Veri Koruma:</strong> info@stareducon.co.uk</li>
            </ul>
            <p class="mt-6 text-sm italic text-gray-500">Yasal bildirimler yalnızca yazılı olarak ve yukarıda belirtilen hukuki bildirim kanalı üzerinden yapılması halinde geçerli sayılacaktır.</p>
        `
    }
];

export default function TermsPage() {
    const [openSection, setOpenSection] = useState<string | null>('taraflar');

    return (
        <main className="bg-background min-h-screen text-navy selection:bg-gold selection:text-white">
            {/* Hero Section */}
            <section className="bg-slate-50 py-32 relative overflow-hidden border-b border-gold/10">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                    <div className="absolute top-16 right-16 w-64 h-64 rounded-full border border-gold/5 opacity-40" />
                    <div className="absolute bottom-8 left-1/4 w-96 h-96 rounded-full border border-gold/5 opacity-20" />
                    {/* Legal ornament */}
                    <div className="absolute right-0 top-0 h-full w-1/3 opacity-[0.03]">
                        <div className="w-full h-full border-l border-navy transform rotate-3 scale-110" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-px bg-gold" />
                            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">YASAL BELGELER</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-navy mb-8 italic leading-tight">
                            Kullanım <span className="gold-text not-italic">Şartları</span>
                        </h1>
                        <p className="text-lg text-slate-600 font-serif italic border-l border-gold pl-8 max-w-3xl leading-relaxed">
                            StarEducation platformunu kullanarak aşağıdaki hüküm ve koşulları kabul etmiş sayılırsınız.
                            Bu belge, taraflar arasındaki hukuki ilişkiyi düzenleyen bağlayıcı bir sözleşmedir.
                        </p>

                        <div className="mt-12 flex flex-wrap gap-6">
                            <div className="bg-navy/5 border border-navy/10 px-6 py-3 text-slate-500 text-xs font-mono tracking-widest">
                                Son Güncelleme: 16 Mart 2026
                            </div>
                            <div className="bg-gold/10 border border-gold/20 px-6 py-3 text-gold text-xs font-bold uppercase tracking-widest">
                                Türk Hukuku Uyumlu · GDPR Uyumlu
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Navigation */}
            <section className="bg-white border-b border-gold/10 py-8 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Bölümler:</span>
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    setOpenSection(s.id);
                                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                                className={`text-[10px] font-bold uppercase tracking-widest transition-all px-3 py-1.5 border ${openSection === s.id ? 'border-gold text-gold bg-gold/5' : 'border-transparent text-slate-400 hover:text-navy hover:border-slate-200'}`}
                            >
                                {s.title.split(' ')[0]}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-[1fr_300px] gap-20 items-start">

                        {/* Accordion Sections */}
                        <div className="space-y-4" id="content">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                const isOpen = openSection === section.id;
                                return (
                                    <div
                                        key={section.id}
                                        id={section.id}
                                        className={`border transition-all duration-500 ${isOpen ? 'border-gold/30 shadow-xl' : 'border-gold/10 hover:border-gold/20'} bg-white`}
                                    >
                                        <button
                                            onClick={() => setOpenSection(isOpen ? null : section.id)}
                                            className="w-full flex items-center justify-between p-8 text-left group"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={`w-12 h-12 border flex items-center justify-center transition-all duration-500 ${isOpen ? 'border-gold bg-gold text-white' : 'border-gold/20 text-gold group-hover:border-gold/50'}`}>
                                                    <Icon size={18} />
                                                </div>
                                                <h2 className={`text-lg font-serif font-bold italic transition-colors ${isOpen ? 'text-navy' : 'text-slate-600 group-hover:text-navy'}`}>
                                                    {section.title}
                                                </h2>
                                            </div>
                                            <ChevronDown
                                                size={20}
                                                className={`text-gold/50 transition-transform duration-500 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {isOpen && (
                                            <div className="px-8 pb-10 border-t border-gold/10">
                                                <div
                                                    className="pt-8 prose prose-slate max-w-none
                                                        prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-serif prose-p:italic prose-p:mb-4
                                                        prose-h4:text-navy prose-h4:font-bold prose-h4:font-serif prose-h4:italic prose-h4:mt-8 prose-h4:mb-4 prose-h4:text-lg
                                                        prose-ul:space-y-2 prose-li:text-slate-600 prose-li:font-serif prose-li:italic
                                                        prose-strong:text-navy prose-strong:not-italic
                                                        prose-a:text-gold prose-a:no-underline hover:prose-a:underline"
                                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Sidebar */}
                        <div className="sticky top-28 space-y-8">

                            {/* Document Info */}
                            <div className="bg-slate-50 border border-gold/10 p-8 relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-24 h-24 border-l border-b border-gold/5 opacity-50" />
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-6 h-px bg-gold" />
                                    <span className="text-gold text-[9px] font-bold uppercase tracking-[0.3em]">Belge Bilgisi</span>
                                </div>
                                <div className="space-y-4 text-sm font-serif italic">
                                    <div className="flex justify-between text-slate-500 border-b border-gold/5 pb-3">
                                        <span>Versiyon</span>
                                        <span className="text-gold font-bold not-italic">v2.1</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 border-b border-gold/5 pb-3">
                                        <span>Geçerlilik</span>
                                        <span className="text-navy text-xs not-italic">Süresiz</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 border-b border-gold/5 pb-3">
                                        <span>Jurisdiksiyon</span>
                                        <span className="text-navy text-xs not-italic">Türkiye / AB</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 pb-3">
                                        <span>Dil</span>
                                        <span className="text-navy text-xs not-italic">Türkçe (Asıl)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Related Docs */}
                            <div className="bg-white border border-gold/10 p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-6 h-px bg-gold" />
                                    <span className="text-gold text-[9px] font-bold uppercase tracking-[0.3em]">İlgili Belgeler</span>
                                </div>
                                {[
                                    { href: '/kvkk', label: 'KVKK & GDPR Politikası', desc: 'Veri işleme esasları' },
                                    { href: '/cookies', label: 'Çerez Politikası', desc: 'Cookie yönetimi' },
                                    { href: '/iletisim', label: 'İletişim', desc: 'Resmi başvurular' },
                                ].map((doc) => (
                                    <Link
                                        key={doc.href}
                                        href={doc.href}
                                        className="flex items-start gap-4 group py-3 border-b border-slate-100 last:border-0"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0 group-hover:scale-125 transition-all" />
                                        <div>
                                            <p className="text-navy text-sm font-bold group-hover:text-gold transition-colors">{doc.label}</p>
                                            <p className="text-slate-400 text-xs font-serif italic">{doc.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Contact CTA */}
                            <div className="bg-slate-50 border border-gold/10 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-6 h-px bg-gold" />
                                    <span className="text-gold text-[9px] font-bold uppercase tracking-[0.3em]">Sorularınız mı var?</span>
                                </div>
                                <p className="text-slate-600 text-sm font-serif italic mb-6 leading-relaxed">
                                    Kullanım Şartları hakkında sorularınız için hukuk ekibimizle iletişime geçebilirsiniz.
                                </p>
                                <Link
                                    href="mailto:info@stareducon.co.uk"
                                    className="flex items-center gap-3 text-gold font-bold text-[11px] uppercase tracking-[0.3em] group"
                                >
                                    <Mail size={14} />
                                    info@stareducon.co.uk
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Disclaimer */}
            <section className="py-16 bg-slate-50 border-t border-gold/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-12 h-12 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                            <Scale size={20} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold italic text-navy text-lg mb-3">Genel Yasal Uyarı</h3>
                            <p className="text-slate-500 text-sm font-serif italic leading-relaxed max-w-4xl">
                                Bu doküman yalnızca bilgilendirme amacıyla hazırlanmıştır ve bireysel hukuki tavsiye niteliği taşımaz.
                                Şartlara ilişkin herhangi bir belirsizlik durumunda Türkçe metni esas alınır.
                                StarEducation, işbu Şartları yürürlükteki mevzuata uygun biçimde her zaman güncelleme hakkını saklı tutar.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-6">
                                <Link href="/kvkk" className="text-gold text-xs font-bold uppercase tracking-[0.3em] hover:underline">KVKK Politikası</Link>
                                <span className="text-gold/30">·</span>
                                <Link href="/cookies" className="text-gold text-xs font-bold uppercase tracking-[0.3em] hover:underline">Çerez Politikası</Link>
                                <span className="text-gold/30">·</span>
                                <Link href="/iletisim" className="text-gold text-xs font-bold uppercase tracking-[0.3em] hover:underline">İletişim</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
