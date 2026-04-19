import {
    GraduationCap,
    Globe,
    BookOpen,
    Award,
    Briefcase,
    Clock,
    MapPin,
    CheckCircle2,
    HelpCircle,
    Plane,
    Languages,
    Sun,
    School,
    Users,
    MessageSquare,
    Target,
    ShieldCheck,
    Home,
    Trophy,
    Search,
    BadgePercent,
    Headphones
} from 'lucide-react';

export interface ProgramContent {
    title: string;
    heroImage: string;
    heroDesc: string;
    overview: string;
    advantages: {
        title: string;
        desc: string;
        icon: any;
    }[];
    destinations?: {
        name: string;
        desc: string;
        cost?: string;
        image: string;
        items?: { name: string; slug: string; subDesc?: string }[];
        link?: string;
    }[];
    process: {
        step: number;
        title: string;
        desc: string;
    }[];
    documents: string[];
    faq: {
        q: string;
        a: string;
    }[];
}

export const UNIVERSITY_DATA: Record<string, Record<string, any>> = {
    tr: {
        "almanya": {
        title: "Almanya Üniversite Eğitimi",
        heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2000",
        overview: `
            <div class="space-y-16">
                <section>
                    <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Ücretsiz ve Dünya Standartlarında Mühendislik Gücü</h2>
                    <p class="text-lg leading-relaxed text-zinc-600 font-medium">Almanya, dünyanın en gelişmiş sanayi ülkesi olarak, devlet üniversitelerinde <span class="text-secondary font-bold">ücretsiz</span> eğitim imkanıyla her yıl binlerce öğrenciyi kendine çekiyor. Sadece teknik alanlarda değil, tıp, hukuk ve sosyal bilimlerde de QS World Rankings'te ilk 100'de yer alan okullara sahiptir.</p>
                </section>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="premium-card p-10 bg-zinc-50 border border-zinc-100">
                        <h3 class="text-xl font-serif font-bold mb-6 text-primary italic flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-xs">01</span>
                            Kabul Kriterleri (Admissions)
                        </h3>
                        <ul class="space-y-4 text-sm font-medium text-zinc-500 italic">
                            <li class="flex items-start gap-3">• <span class="text-primary font-bold">YKS Şartı:</span> Türkiye'de 4 yıllık bir bölüme yerleşmiş olmak zorunludur.</li>
                            <li class="flex items-start gap-3">• <span class="text-primary font-bold">Not Ortalaması:</span> 75/100 ve üzeri (Bölüme göre NC puanı değişir).</li>
                            <li class="flex items-start gap-3">• <span class="text-primary font-bold">Dil:</span> Almanca C1/B2 (TestDaf/DSH) veya İngilizce IELTS 6.5+.</li>
                        </ul>
                    </div>
                    <div class="premium-card p-10 bg-primary text-white border-none shadow-xl">
                        <h3 class="text-xl font-serif font-bold mb-6 italic text-secondary flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-secondary text-primary flex items-center justify-center text-xs">02</span>
                            Finansal Gereksinimler
                        </h3>
                        <ul class="space-y-4 text-sm font-medium text-zinc-300 italic">
                            <li class="flex items-start gap-3">• <span class="text-secondary font-bold">Eğitim Harcı:</span> €0 - €500 (Dönemlik katkı payı).</li>
                            <li class="flex items-start gap-3">• <span class="text-secondary font-bold">Bloke Hesap:</span> €11,904 (Yıllık yaşam masrafı teminatı).</li>
                            <li class="flex items-start gap-3">• <span class="text-secondary font-bold">Çalışma İzni:</span> Yılda 140 tam / 280 yarım gün yasal çalışma hakkı.</li>
                        </ul>
                    </div>
                </div>

                <section>
                    <h3 class="text-2xl font-serif font-bold text-primary mb-8 italic">Üniversite Sistemi ve Seçim Rehberi</h3>
                    <div class="overflow-x-auto border border-zinc-100 rounded-3xl shadow-sm">
                        <table class="w-full text-left font-sans text-sm">
                            <thead class="bg-zinc-50 text-zinc-400 uppercase tracking-widest text-[10px]">
                                <tr>
                                    <th class="p-8">KURUM TİPİ</th>
                                    <th class="p-8">KARAKTERİSTİK ÖZELLİK</th>
                                    <th class="p-8">KARİYER ODAĞI</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-zinc-50 italic text-zinc-600">
                                <tr class="hover:bg-zinc-50/50 transition-colors">
                                    <td class="p-8 font-black text-primary">Technical Universities (TU)</td>
                                    <td class="p-8">Teorik ve bilimsel araştırma ağırlıklı</td>
                                    <td class="p-8">Akademisyenlik, AR-GE Direktörlüğü</td>
                                </tr>
                                <tr class="hover:bg-zinc-50/50 transition-colors">
                                    <td class="p-8 font-black text-primary">FH (Applied Sciences)</td>
                                    <td class="p-8">Pratik odaklı, endüstriyel uygulama</td>
                                    <td class="p-8">Mühendislik Yönetimi, Uygulama Uzmanlığı</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <div class="p-10 rounded-[2.5rem] bg-secondary/5 border border-secondary/20 italic">
                    <p class="text-primary font-medium leading-relaxed">
                        <strong class="text-secondary uppercase tracking-widest text-xs block mb-2">Uzman Notu:</strong>
                        Almanya'da Tıp ve Psikoloji gibi bölümlerde "Numerus Clausus" sistemi çok kritiktir. Yüksek not ortalamasının yanında <strong>TestAS</strong> sınavına girmeniz şansınızı %40 artırır.
                    </p>
                </div>
            </div>
        `,
        advantages: [
            { title: "Sıfır Eğitim Harcı", desc: "Devlet üniversitelerinde harç ödemeden dünya çapında geçerli bir diploma alın.", icon: Award },
            { title: "18 Ay İş Arama Vizesi", desc: "Mezuniyet sonrası Almanya'da kalıp kariyerinize başlama fırsatı.", icon: Briefcase },
            { title: "Mavi Kart Yolu", desc: "Mezuniyet sonrası 2 yıl çalışma şartıyla kalıcı oturum hakkı yolu.", icon: Globe }
        ],
        faq: [
            { q: "Almanya'da İngilizce bölümler var mı?", a: "Özellikle Yüksek Lisans seviyesinde yaygındır. Lisans seviyesinde seçenekler kısıtlıdır ancak özel üniversiteler geniş bir yelpaze sunar." },
            { q: "Studienkolleg nedir?", a: "Lise diploması doğrudan kabul edilmeyen öğrencilerin 1 yıl boyunca aldığı akademik hazırlık yılıdır." }
        ]
    },
    "ingiltere": {
        title: "İngiltere Üniversite Eğitimi",
        heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000",
        overview: `
            <div class="space-y-16">
                <section>
                    <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Akademik Mükemmellik ve Modern Kariyer Dünyası</h2>
                    <p class="text-lg leading-relaxed text-zinc-600 font-medium">Birleşik Krallık, dünyanın en prestijli eğitim markalarına ev sahipliği yapar. Lisans eğitiminin <span class="text-secondary font-bold">3 yıl</span>, Master eğitiminin ise <span class="text-secondary font-bold">1 yıl</span> olması, rakiplerinizden 2 yıl önce profesyonel hayata başlamanızı sağlar.</p>
                </section>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="premium-card p-10 bg-zinc-50 border border-zinc-100 text-center">
                        <span class="text-secondary font-serif text-5xl font-black italic mb-2 block">3 Yıl</span>
                        <span class="text-[10px] font-black uppercase tracking-widest text-primary">Lisans</span>
                    </div>
                    <div class="premium-card p-10 bg-zinc-50 border border-zinc-100 text-center">
                        <span class="text-secondary font-serif text-5xl font-black italic mb-2 block">1 Yıl</span>
                        <span class="text-[10px] font-black uppercase tracking-widest text-primary">Master</span>
                    </div>
                    <div class="premium-card p-10 bg-primary text-white text-center border-none">
                        <span class="text-secondary font-serif text-5xl font-black italic mb-2 block">2 Yıl</span>
                        <span class="text-[10px] font-black uppercase tracking-widest text-secondary">Çalışma İzni</span>
                    </div>
                </div>

                <section>
                    <h3 class="text-2xl font-serif font-bold text-primary mb-8 italic">Russell Group ve Kabul Standartları</h3>
                    <div class="overflow-x-auto border border-zinc-100 rounded-3xl shadow-sm">
                        <table class="w-full text-left font-sans text-sm">
                            <thead class="bg-zinc-50 text-zinc-400 uppercase tracking-widest text-[10px]">
                                <tr>
                                    <th class="p-8">GRUP / TİP</th>
                                    <th class="p-8">GPA HEDEFİ</th>
                                    <th class="p-8">IELTS SKORU</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-zinc-50 italic text-zinc-600">
                                <tr class="hover:bg-zinc-50/50 transition-colors">
                                    <td class="p-8 font-black text-primary">Russell Group (Ivy League UK)</td>
                                    <td class="p-8">85% ve üzeri</td>
                                    <td class="p-8">6.5 - 7.5</td>
                                </tr>
                                <tr class="hover:bg-zinc-50/50 transition-colors">
                                    <td class="p-8 font-black text-primary">Modern Universities</td>
                                    <td class="p-8">70% - 80%</td>
                                    <td class="p-8">6.0 - 6.5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <div class="p-10 rounded-[2.5rem] bg-zinc-50 border border-secondary/10 italic">
                    <p class="text-primary font-medium leading-relaxed">
                        <strong class="text-secondary uppercase tracking-widest text-xs block mb-2">Başvuru Notu:</strong>
                        Tüm başvurular <strong>UCAS</strong> sistemi üzerinden tek merkezden yapılır. Ocak sonu (Jan 31st) tüm genel başvurular için son tarihtir.
                    </p>
                </div>
            </div>
        `,
        advantages: [
            { title: "Prestijli Ekonomi", desc: "Mezuniyet sonrası 'Graduate Route' ile 2 yıl koşulsuz çalışma izni.", icon: Award },
            { title: "Zaman Verimliliği", desc: "Lisans ve Master toplamında 2 yıl kazanç sağlayarak işe hızlı atılın.", icon: Clock },
            { title: "Russell Group Kalitesi", desc: "Dünyanın en köklü 24 araştırma üniversitesinden birinde okuma şansı.", icon: Target }
        ],
        faq: [
            { q: "Foundation programı zorunlu mu?", a: "Lise diplomanızın tipine ve okulun gereksinimine göre değişir ancak çoğu prestijli okul MEB diplomasını 1 yıl hazırlık sonrası kabul eder." },
            { q: "Pre-Master nedir?", a: "Akademik veya dil seviyesi master için yetersiz olan öğrencilerin 1-2 dönem aldığı geçiş programıdır." }
        ]
    },
    "italya": {
        title: "İtalya Üniversite Eğitimi",
        heroImage: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2000",
        overview: `
            <div class="space-y-16">
                <section>
                    <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Tasarım, Sanat ve İngilizce Tıp Dünyası</h2>
                    <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">İtalya, Avrupa'nın hem en tarihi hem de en yenilikçi eğitim merkezlerinden biridir. Aile gelirine göre belirlenen <span class="text-secondary font-bold">DSU bursları</span> ile yıllık eğitim maliyetleri sembolik düzeylere inebilmektedir.</p>
                </section>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="premium-card p-10 bg-zinc-50 border border-zinc-100">
                        <h3 class="text-xl font-serif font-bold mb-6 text-primary italic">Merkezi Sınav Sistemi</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-zinc-50">
                                <span class="text-zinc-500 font-bold">Tıp (English)</span>
                                <span class="text-primary font-black">IMAT</span>
                            </div>
                            <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-zinc-50">
                                <span class="text-zinc-500 font-bold">Mimarlık</span>
                                <span class="text-primary font-black">TIL-A</span>
                            </div>
                            <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-zinc-50">
                                <span class="text-zinc-500 font-bold">Ekonomi / İşletme</span>
                                <span class="text-primary font-black">TOLC-E</span>
                            </div>
                        </div>
                    </div>
                    <div class="premium-card p-10 bg-secondary/5 border-none">
                        <h3 class="text-xl font-serif font-bold mb-6 italic text-primary">Burs ve Destekler (DSU)</h3>
                        <p class="text-sm text-zinc-500 mb-6 leading-relaxed italic">Aile yıllık geliri belirli bir sınırın altında olan öğrenciler için geri ödemesiz nakit burslar sunulur.</p>
                        <ul class="text-[10px] font-black text-secondary tracking-widest space-y-2 uppercase">
                            <li>• NAKİT BURS (€7,000'ya kadar)</li>
                            <li>• YEMEKHANE KARTI</li>
                            <li>• ÜCRETSİZ YURT ÖNCELİĞİ</li>
                        </ul>
                    </div>
                </div>
            </div>
        `,
        advantages: [
            { title: "Ekonomik Harçlar", desc: "Gelire göre yıllık €156 ile €3,500 arası değişen sembolik ücretler.", icon: Award },
            { title: "İngilizce Eğitim", desc: "Mühendislikten tıba, sosyal bilimlerden sanata yüzlerce İngilizce program.", icon: Globe },
            { title: "Avrupa Vizyonu", desc: "Akdeniz kültürü ile iç içe, global bir diplomaya sahip olma şansı.", icon: GraduationCap }
        ],
        faq: [
            { q: "İtalya'da tıp okumak için Türkiye sınavı gerekir mi?", a: "Hayır, sadece İtalya'da yapılan IMAT sınavında başarılı olmanız yeterlidir." }
        ]
    },
    "amerika": {
        title: "Amerika'da Üniversite Eğitimi",
        heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Hayallerin Ötesinde: Ivy League ve Liberal Arts</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Dünyanın en iyi ilk 10 üniversitesinin 8'ine ev sahipliği yapan ABD, öğrencilere sınırsız esneklik sunar. **Liberal Arts** sistemi sayesinde, ilk 2 yıl bölümünüzü seçmeden genel dersler alabilir, gerçek tutkunuzu keşfedebilirsiniz.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                    <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Kabul Kriterleri</h3>
                    <ul class="space-y-3 italic text-sm text-zinc-500 leading-relaxed">
                        <li>• GPA (Not Ortalaması): 3.0 / 4.0 ve üzeri</li>
                        <li>• SAT / ACT (Top seviye üniversiteler için)</li>
                        <li>• IELTS 6.5+ veya TOEFL 80+</li>
                        <li>• Sosyal Aktiviteler ve Niyet Mektubu</li>
                    </ul>
                </div>
                <div class="p-8 rounded-[2rem] bg-navy text-white">
                    <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">2+2 Community College</h3>
                    <p class="italic text-sm text-zinc-300 leading-relaxed">Düşük maliyetli bir başlangıç için ilk 2 yıl Community College'da okuyup, son 2 yıl için UC Berkeley, UCLA gibi dev üniversitelere transfer olabilirsiniz.</p>
                </div>
            </div>
        `,
        advantages: [
            { title: "OPT (Çalışma Hakkı)", desc: "Mezuniyet sonrası 1-3 yıl arası Amerika'da yasal çalışma izni.", icon: Briefcase },
            { title: "Dünya Lideri Kalite", desc: "Diploma ile dünyanın her yerinde öncelikli tercih edilme avantajı.", icon: Award },
            { title: "Esnek Müfredat", desc: "Ana dal (Major) ve yan dal (Minor) seçenekleri ile multidisipliner eğitim.", icon: GraduationCap }
        ],
        faq: [
            { q: "Amerika'da burs almak mümkün mü?", a: "Evet, sporcu bursları, başarı bursları ve ihtiyaca dayalı (need-based) burs seçenekleri mevcuttur." }
        ]
    },
    "kanada": {
        title: "Kanada'da Üniversite Eğitimi",
        heroImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2000",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-gold/20 underline-offset-8">Kaliteli Eğitim ve Göçmenlik Avantajları</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Kanada, eğitim kalitesi kadar sunduğu yaşam standartları ve **PGWP (Post-Graudation Work Permit)** süreciyle dikkat çeker. Öğrenciler okurken çalışabilir, mezun olduktan sonra ise Kanada'da kalıcı oturum hakkına giden yolu açabilirler.</p>

            <div class="p-8 border-l-4 border-gold bg-zinc-50 mb-12 italic">
                <h3 class="text-xl font-bold text-navy mb-2">Co-Op Programları</h3>
                <p class="text-zinc-600">Öğrenirken kazanmanızı sağlayan staj sistemidir. Bölümünüzle ilgili dev şirketlerde maaşlı çalışarak hem deneyim hem de iş bağlantısı kazanırsınız.</p>
            </div>
        `,
        advantages: [
            { title: "Oturum İzni Fırsatı", desc: "Mezuniyet sonrası 3 yıla kadar çalışma izni ve sonrası vatandaşlık yolu.", icon: Globe },
            { title: "Ekonomik Seçenekler", desc: "College sistemi ile daha uygun fiyatlı ve pratik odaklı eğitim.", icon: Award }
        ],
        faq: [
            { q: "Kanada'da dil okulu sonrası üniversite olur mu?", a: "Evet, 'Pathway' programları ile IELTS şartı aranmadan üniversitelere geçiş yapabilirsiniz." }
        ]
    },
    "polonya": {
        title: "Polonya Üniversite Eğitimi",
        heroImage: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=2000",
        overview: `
            <div class="space-y-16">
                <section>
                    <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Avrupa Birliği Diploması ve Ekonomik Başarı</h2>
                    <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">Polonya, sınavsız üniversite kabulü ve inanılmaz derecede uygun yaşam maliyetleriyle son on yılın en popüler rotasıdır. Mezuniyet sonrası alınan <span class="text-secondary font-bold">Mavi Diploma</span> tüm dünyada kapıları açar.</p>
                </section>

                <section>
                    <h3 class="text-2xl font-serif font-bold text-primary mb-8 italic">Maliyet ve Bölüm Tablosu</h3>
                    <div class="overflow-x-auto border border-zinc-100 rounded-3xl shadow-sm">
                        <table class="w-full text-left font-sans text-sm">
                            <thead class="bg-primary text-white uppercase tracking-widest text-[9px]">
                                <tr>
                                    <th class="p-8">FAKÜLTE / ALAN</th>
                                    <th class="p-8">YILLIK EĞİTİM (ORT.)</th>
                                    <th class="p-8">EĞİTİM DİLİ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-zinc-50 italic text-zinc-600">
                                <tr class="hover:bg-zinc-50/50 transition-colors">
                                    <td class="p-8 font-black text-primary">Tıp ve Sağlık Bilimleri</td>
                                    <td class="p-8">€11,000 - €14,000</td>
                                    <td class="p-8">İngilizce</td>
                                </tr>
                                <tr class="hover:bg-zinc-50/50 transition-colors">
                                    <td class="p-8 font-black text-primary">Mühendislik / IT</td>
                                    <td class="p-8">€3,500 - €4,500</td>
                                    <td class="p-8">İngilizce</td>
                                </tr>
                                <tr class="hover:bg-zinc-50/50 transition-colors">
                                    <td class="p-8 font-black text-primary">İşletme / Sosyal Bilimler</td>
                                    <td class="p-8">€2,800 - €3,500</td>
                                    <td class="p-8">İngilizce</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        `,
        advantages: [
            { title: "Sınav Şartı Yok", desc: "Sadece lise diploması ile Avrupa'nın kalbinde eğitim fırsatı.", icon: Award },
            { title: "Düşük Giderler", desc: "Aylık €600-€750 ile konforlu öğrenci yaşamı.", icon: Clock },
            { title: "Kariyer Desteği", desc: "Mezuniyet sonrası Polonya'da kalma ve çalışma izni kolaylığı.", icon: Target }
        ],
        faq: [
            { q: "Lehçe bilmek zorunda mıyım?", a: "Hayır, Lehçe bilmeden de İngilizce bölümlerde okuyabilirsiniz. Ancak günlük hayat için temel seviye önerilir." }
        ]
    },
    "macaristan": {
        title: "Macaristan Üniversite Eğitimi",
        heroImage: "https://images.unsplash.com/photo-1551433021-c74582b61bd0?q=80&w=2000",
        overview: `
            <div class="space-y-16">
                <section>
                    <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Nobel Ödüllü Akademik Gelenek</h2>
                    <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">Özellikle Tıp ve Sağlık bilimlerinde dünya markası olan Macaristan, Orta Avrupa'nın en köklü eğitim kurumlarına ev sahipliği yapar.</p>
                </section>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="premium-card p-10 bg-zinc-50 border border-zinc-100">
                        <h3 class="text-xl font-serif font-bold mb-6 text-primary italic">Öne Çıkan Fakülteler</h3>
                        <div class="space-y-4">
                            <div class="p-4 bg-white rounded-2xl flex justify-between items-center shadow-sm border border-zinc-100">
                                <span class="text-zinc-500 font-bold">Medicine</span>
                                <span class="text-secondary font-black">Semmelweis</span>
                            </div>
                            <div class="p-4 bg-white rounded-2xl flex justify-between items-center shadow-sm border border-zinc-100">
                                <span class="text-zinc-500 font-bold">Engineering</span>
                                <span class="text-secondary font-black">BME</span>
                            </div>
                        </div>
                    </div>
                    <div class="premium-card p-10 bg-primary text-white border-none flex flex-col justify-center">
                        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-2">Kabul Sistemi</span>
                        <p class="text-sm italic leading-relaxed text-zinc-300">Üniversitelerin çoğu kendi giriş sınavlarını (Entrance Exam) yapar. Biyoloji, kimya ve fizik bilgisi tıp adayları için kritiktir.</p>
                    </div>
                </div>
            </div>
        `,
        advantages: [
            { title: "Köklü Tarih", desc: "600 yılı aşan üniversite geleneği ve Nobel ödüllü akademisyenler.", icon: Award },
            { title: "AB Geçerliliği", desc: "Tam denklik sağlayan Mavi Diploma ile global kariyer.", icon: Globe },
            { title: "Ekonomik Yaşam", desc: "Budapeşte gibi metropollerde bile uygun yaşam maliyetleri.", icon: Users }
        ],
        faq: [
            { q: "Macaristan tıp sınavları zor mu?", a: "Evet, rekabetçidir. Ancak 'Pre-Medical' hazırlık yılı ile başarı oranı %90'ın üzerindedir." }
        ]
    }
    },
    en: {
        "almanya": {
            title: "University Education in Germany",
            heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2000",
            overview: `
                <div class="space-y-16">
                    <section>
                        <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Tuition-Free & World-Class Innovation</h2>
                        <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">Germany is the global powerhouse for engineering and technology, offering <span class="text-secondary font-bold">tuition-free</span> education at world-leading public universities.</p>
                    </section>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div class="premium-card p-10 bg-zinc-50 border border-zinc-100">
                            <h3 class="text-xl font-serif font-bold mb-6 text-primary italic">Financial Requirements</h3>
                            <div class="space-y-4 text-sm text-zinc-500 italic">
                                <div class="flex justify-between border-b border-zinc-100 pb-2">
                                    <span>Blocked Account</span>
                                    <span class="font-bold text-primary">€11,904 / Year</span>
                                </div>
                                <div class="flex justify-between border-b border-zinc-100 pb-2">
                                    <span>Semester Fee</span>
                                    <span class="font-bold text-primary">€200 - €500</span>
                                </div>
                            </div>
                        </div>
                        <div class="premium-card p-10 bg-primary text-white border-none flex flex-col justify-center">
                            <span class="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Work Permit</span>
                            <p class="text-sm italic leading-relaxed text-zinc-200">Students can work <span class="text-secondary font-bold">140 full days</span> per year to support their living costs.</p>
                        </div>
                    </div>
                </div>
            `,
            advantages: [
                { title: "No Tuition", desc: "Access world-class education at zero tuition cost in public universities.", icon: Award },
                { title: "18-Month Job Seek", desc: "Stay in Germany after graduation to start your professional career.", icon: Briefcase },
                { title: "Global Prestige", desc: "A degree that is respected and recognized by top employers worldwide.", icon: Globe }
            ],
            faq: [
                { q: "Is German required?", a: "Most Bachelor programs are in German, but English-taught programs are highly common at the Master level." }
            ]
        },
        "italya": {
            title: "University Education in Italy",
            heroImage: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2000",
            overview: `
                <div class="space-y-16">
                    <section>
                        <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Design, Art & English Medical Excellence</h2>
                        <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">Italy is one of Europe's most historic yet innovative educational hubs. With <span class="text-secondary font-bold">DSU Scholarships</span> based on family income, annual education costs can drop to symbolic levels.</p>
                    </section>
                </div>
            `,
            advantages: [
                { title: "Economic Tuition", desc: "Symbolic fees ranging from €156 to €3,500 based on income.", icon: Award },
                { title: "English Education", desc: "Hundreds of English programs from engineering to medicine, social sciences to art.", icon: Globe },
                { title: "European Vision", desc: "A chance to have a global degree intertwined with Mediterranean culture.", icon: GraduationCap }
            ],
            faq: [
                { q: "Is a Turkish exam required for medicine in Italy?", a: "No, you only need to be successful in the IMAT exam conducted in Italy." }
            ]
        },
        "ingiltere": {
            title: "University Education in the UK",
            heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000",
            overview: `
                <div class="space-y-16">
                    <section>
                        <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Academic Legacy & Modern Career Impact</h2>
                        <p class="text-lg leading-relaxed text-zinc-600 font-medium">Home to the world's most prestigious institutions. A <span class="text-secondary font-bold">3-year Bachelor's</span> and <span class="text-secondary font-bold">1-year Master's</span> system gets you into the workforce 2 years ahead.</p>
                    </section>

                    <section>
                        <h3 class="text-2xl font-serif font-bold text-primary mb-8 italic">Russell Group Standards</h3>
                        <div class="overflow-x-auto border border-zinc-100 rounded-3xl shadow-sm">
                            <table class="w-full text-left font-sans text-sm">
                                <thead class="bg-zinc-50 text-zinc-400 uppercase tracking-widest text-[10px]">
                                    <tr>
                                        <th class="p-8">GROUP / TYPE</th>
                                        <th class="p-8">GPA TARGET</th>
                                        <th class="p-8">IELTS SCORE</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-zinc-50 italic text-zinc-600">
                                    <tr class="hover:bg-zinc-50/50 transition-colors">
                                        <td class="p-8 font-black text-primary">Russell Group</td>
                                        <td class="p-8">85% and above</td>
                                        <td class="p-8">6.5 - 7.5</td>
                                    </tr>
                                    <tr class="hover:bg-zinc-50/50 transition-colors">
                                        <td class="p-8 font-black text-primary">Modern Universities</td>
                                        <td class="p-8">70% - 80%</td>
                                        <td class="p-8">6.0 - 6.5</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            `,
            advantages: [
                { title: "Time Efficiency", desc: "Graduate faster and save tuition/living costs for 2 additional years.", icon: Clock },
                { title: "Graduate Route", desc: "2-year unconditional post-study work permit for all international graduates.", icon: Target },
                { title: "Unmatched Prestige", desc: "Study at the cradle of academic excellence and global networking.", icon: Award }
            ],
            faq: [
                { q: "What is UCAS?", a: "The centralized application system for all UK universities. You can apply to 5 different schools simultaneously." }
            ]
        },
        "polonya": {
            title: "University Education in Poland",
            heroImage: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=2000",
            overview: `
                <div class="space-y-16">
                    <section>
                        <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">EU Degree & Economic Success</h2>
                        <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">Poland has become one of the most popular study destinations due to its high-quality education and very affordable cost of living. The <span class="text-secondary font-bold">Blue Diploma</span> received after graduation opens doors worldwide.</p>
                    </section>
                </div>
            `,
            advantages: [
                { title: "No Entrance Exam", desc: "Access education in the heart of Europe with just your high school diploma.", icon: Award },
                { title: "Low Living Costs", desc: "Enjoy a comfortable student life with €600-€750 per month.", icon: Clock },
                { title: "Career Support", desc: "Easy post-graduation residency and work permit options in Poland.", icon: Target }
            ],
            faq: [
                { q: "Is Polish language mandatory?", a: "No, you can study in numerous English-taught programs. Basic Polish is recommended for daily life." }
            ]
        },
        "macaristan": {
            title: "University Education in Hungary",
            heroImage: "https://images.unsplash.com/photo-1551433021-c74582b61bd0?q=80&w=2000",
            overview: `
                <div class="space-y-16">
                    <section>
                        <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Nobel-Winning Academic Tradition</h2>
                        <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">As a world brand particularly in Medical and Health sciences, Hungary hosts some of Central Europe's oldest and most prestigious educational institutions.</p>
                    </section>
                </div>
            `,
            advantages: [
                { title: "Deep-Rooted History", desc: "Over 600 years of university tradition and Nobel-winning academics.", icon: Award },
                { title: "EU Recognition", desc: "Build a global career with a Blue Diploma providing full equivalency.", icon: Globe },
                { title: "Affordable Living", desc: "Reasonable cost of living even in major metropolises like Budapest.", icon: Users }
            ],
            faq: [
                { q: "Are Hungarian medical exams difficult?", a: "Yes, they are competitive. However, the 'Pre-Medical' foundation year yields over a 90% success rate." }
            ]
        }
    },
    de: {
        "almanya": {
            title: "Studieren in Deutschland",
            heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2000",
            overview: `
                <div class="space-y-16">
                    <section>
                        <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Gebührenfreies Studium & Weltklasse-Innovation</h2>
                        <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">Deutschland ist das globale Zentrum für Ingenieurwesen und Technologie und bietet an erstklassigen öffentlichen Universitäten ein <span class="text-secondary font-bold">gebührenfreies</span> Studium an.</p>
                    </section>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div class="premium-card p-10 bg-zinc-50 border border-zinc-100">
                            <h3 class="text-xl font-serif font-bold mb-6 text-primary italic">Finanzielle Voraussetzungen</h3>
                            <div class="space-y-4 text-sm text-zinc-500 italic">
                                <div class="flex justify-between border-b border-zinc-100 pb-2">
                                    <span>Sperrkonto</span>
                                    <span class="font-bold text-primary">€11.904 / Jahr</span>
                                </div>
                                <div class="flex justify-between border-b border-zinc-100 pb-2">
                                    <span>Semesterbeitrag</span>
                                    <span class="font-bold text-primary">€200 - €500</span>
                                </div>
                            </div>
                        </div>
                        <div class="premium-card p-10 bg-primary text-white border-none flex flex-col justify-center">
                            <span class="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Arbeitserlaubnis</span>
                            <p class="text-sm italic leading-relaxed text-zinc-200">Studenten dürfen <span class="text-secondary font-bold">140 volle Tage</span> pro Jahr arbeiten, um ihre Lebenshaltungskosten zu decken.</p>
                        </div>
                    </div>
                </div>
            `,
            advantages: [
                { title: "Keine Studiengebühren", desc: "Weltklasse-Bildung ohne Studiengebühren an öffentlichen Universitäten.", icon: Award },
                { title: "18 Monate Jobsuche", desc: "Bleiben Sie nach dem Abschluss in Deutschland, um Ihre Karriere zu starten.", icon: Briefcase },
                { title: "Globales Prestige", desc: "Ein Abschluss, der weltweit von Top-Arbeitgebern geschätzt wird.", icon: Globe }
            ],
            faq: [
                { q: "Ist Deutsch zwingend erforderlich?", a: "Die meisten Bachelor-Studiengänge sind auf Deutsch, aber englischsprachige Master-Studiengänge sind sehr verbreitet." }
            ]
        },
        "ingiltere": {
            title: "Studieren im Vereinigten Königreich",
            heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000",
            overview: `
                <div class="space-y-16">
                    <section>
                        <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Akademisches Erbe & Karrieredurchbruch</h2>
                        <p class="text-lg leading-relaxed text-zinc-600 font-medium">Heimat der prestigeträchtigsten Institutionen der Welt. Ein <span class="text-secondary font-bold">3-jähriges Bachelor-</span> und <span class="text-secondary font-bold">1-jähriges Master-System</span> bringt Sie 2 Jahre schneller in den Arbeitsmarkt.</p>
                    </section>
                </div>
            `,
            advantages: [
                { title: "Zeiteffizienz", desc: "Schnellerer Abschluss und Ersparnis bei Studien- und Lebenshaltungskosten.", icon: Clock },
                { title: "Graduate Route", desc: "2 Jahre bedingungslose Arbeitserlaubnis nach dem Studium für alle Absolventen.", icon: Target },
                { title: "Unübertroffenes Prestige", desc: "Studieren Sie an der Wiege akademischer Exzellenz.", icon: Award }
            ],
            faq: [
                { q: "Was ist UCAS?", a: "Das zentrale Bewerbungssystem für alle britischen Universitäten." }
            ]
        },
        "italya": {
            title: "Studieren in Italien",
            heroImage: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2000",
            overview: `
                <div class="space-y-16">
                    <section>
                        <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Design, Kunst & Englische Medizin-Exzellenz</h2>
                        <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">Italien ist eines der historischsten und zugleich innovativsten Bildungszentren Europas. Mit <span class="text-secondary font-bold">DSU-Stipendien</span> können die Kosten stark sinken.</p>
                    </section>
                </div>
            `,
            advantages: [
                { title: "Günstige Gebühren", desc: "Symbolische Gebühren zwischen €156 und €3.500 je nach Einkommen.", icon: Award },
                { title: "Englische Bildung", desc: "Hunderte von englischen Programmen von Ingenieurwesen bis Medizin.", icon: Globe }
            ],
            faq: [
                { q: "Ist ein Test für Medizin erforderlich?", a: "Ja, der IMAT-Test ist für englischsprachige Medizinstudiengänge obligatorisch." }
            ]
        },
        "polonya": {
            title: "Studieren in Polen",
            heroImage: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=2000",
            overview: `
                <div class="space-y-16">
                    <section>
                        <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">EU-Abschluss & Wirtschaftlicher Erfolg</h2>
                        <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">Polen bietet eine qualitativ hochwertige Ausbildung zu sehr erschwinglichen Lebenshaltungskosten. Das <span class="text-secondary font-bold">Blaue Diplom</span> öffnet weltweit Türen.</p>
                    </section>
                </div>
            `,
            advantages: [
                { title: "Keine Aufnahmeprüfung", desc: "Studieren im Herzen Europas mit Ihrem High-School-Diplom.", icon: Award },
                { title: "Geringe Lebenshaltungskosten", desc: "Komfortables Studentenleben mit €600-€750 pro Monat.", icon: Clock }
            ],
            faq: [
                { q: "Ist Polnisch obligatorisch?", a: "Nein, es gibt zahlreiche englischsprachige Studiengänge." }
            ]
        },
        "macaristan": {
            title: "Studieren in Ungarn",
            heroImage: "https://images.unsplash.com/photo-1551433021-c74582b61bd0?q=80&w=2000",
            overview: `
                <div class="space-y-16">
                    <section>
                        <h2 class="text-4xl font-serif font-bold text-primary mb-6 italic border-b border-primary/10 pb-4">Akademische Nobelpreis-Tradition</h2>
                        <p class="text-lg leading-relaxed text-zinc-600 font-medium italic">Ungarn beherbergt einige der ältesten und prestigeträchtigsten Bildungseinrichtungen Mitteleuropas.</p>
                    </section>
                </div>
            `,
            advantages: [
                { title: "Tiefe Wurzeln", desc: "Über 600 Jahre Universitätstradition.", icon: Award },
                { title: "EU-Anerkennung", desc: "Globaler Karrierestart mit voller Gleichwertigkeit des Diploms.", icon: Globe }
            ],
            faq: [
                { q: "Sind medizinische Prüfungen schwer?", a: "Ja, aber die Erfolgsquote nach dem Vorbereitungsjahr liegt bei über 90%. " }
            ]
        }
    }
};

// Backwards compatibility for now
export const UNIVERSITY_COUNTRIES_DATA = UNIVERSITY_DATA.tr;

export const PROGRAM_DATA_TR: Record<string, ProgramContent> = {
    "yurtdisi-universite": {
        title: "Yurtdışında Üniversite Eğitimi",
        heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000",
        heroDesc: "Oxford'dan Harvard'a, geleceğin liderleri arasına katılın. Sınavsız geçiş ve burs imkanlarıyla global bir kariyer inşa edin.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Akademik Mükemmeliyet ve Global Gelecek</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">StarEducation ile yurtdışında üniversite eğitimi, sadece bir diploma değil, sınırları olmayan bir kariyerin anahtarıdır. QS World Rankings'te ilk 500'de yer alan üniversitelerde, hayallerinizdeki eğitimi almanız için profesyonel mentorluk sağlıyoruz.</p>
            
            <h2 class="text-3xl font-serif font-bold text-navy mb-10 italic underline underline-offset-8 decoration-gold/50">Akademik Giriş Gereksinimleri</h2>
            <div class="overflow-x-auto mb-12 border border-gold/10 rounded-2xl shadow-premium">
                <table class="w-full text-left font-sans text-sm">
                    <thead class="bg-navy text-gold uppercase tracking-[0.2em] text-[10px]">
                        <tr>
                            <th class="p-6">Ülke</th>
                            <th class="p-6">Min. Not Ortalaması (GPA)</th>
                            <th class="p-6">Dil Yeterliliği</th>
                            <th class="p-6">Giriş Şartı / Sınav</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gold/5 italic text-zinc-600">
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold text-navy">Almanya</td>
                            <td class="p-4">75 / 100</td>
                            <td class="p-4 text-gold">TestDaf 4 / IELTS 6.5</td>
                            <td class="p-4 font-bold">YKS Yerleşme Şartı</td>
                        </tr>
                        <tr class="bg-zinc-50 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold text-navy">İngiltere</td>
                            <td class="p-4">80 / 100</td>
                            <td class="p-4 text-gold">IELTS 6.0 - 6.5</td>
                            <td class="p-4">Doğrudan Kabul / Foundation</td>
                        </tr>
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold text-navy">Hollanda</td>
                            <td class="p-4">80 / 100</td>
                            <td class="p-4 text-gold">IELTS 6.5 / TOEFL 90</td>
                            <td class="p-4">Research / Applied Sciences</td>
                        </tr>
                        <tr class="bg-zinc-50 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold text-navy">Amerika / Kanada</td>
                            <td class="p-4">3.0 / 4.0</td>
                            <td class="p-4 text-gold">TOEFL 80+ / IELTS 6.5</td>
                            <td class="p-4">SAT/ACT Opsiyonel</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-10 rounded-[2.5rem] bg-zinc-950 text-white shadow-2xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-gold/20 transition-all duration-700"></div>
                    <h3 class="text-2xl font-serif font-bold mb-6 italic text-gold">Ivy League & Oxbridge Premium</h3>
                    <p class="text-zinc-400 leading-relaxed mb-6 italic">Dünyanın en prestijli okulları için 2 yıl öncesinden başlayan stratejik hazırlık programımız: Portfolyo tasarımı, ders dışı aktiviteler ve mülakat simülasyonları.</p>
                    <ul class="space-y-3 text-sm text-zinc-300">
                        <li>• Kişiye Özel Akademik Roadmap</li>
                        <li>• Essay / Niyet Mektubu Editörlüğü</li>
                        <li>• Yaz Okulu ve Staj Planlaması</li>
                    </ul>
                </div>
                <div class="p-10 rounded-[2.5rem] bg-gold text-white shadow-2xl">
                    <h3 class="text-2xl font-serif font-bold mb-6 italic">Tahmini Ücretler (Yıllık)</h3>
                    <ul class="space-y-4 font-serif italic text-lg">
                        <li class="flex justify-between border-b border-white/20 pb-2"><span>Almanya (Devlet)</span> <span class="font-bold">€0 - €1,500</span></li>
                        <li class="flex justify-between border-b border-white/20 pb-2"><span>İngiltere</span> <span class="font-bold">£15,000+</span></li>
                        <li class="flex justify-between border-b border-white/20 pb-2"><span>Polonya / Macaristan</span> <span class="font-bold">€3,500+</span></li>
                        <li class="flex justify-between border-b border-white/20 pb-2"><span>ABD / Kanada</span> <span class="font-bold">$25,000+</span></li>
                    </ul>
                </div>
            </div>
        `,
        advantages: [
            { title: "Sınavsız Kabul", desc: "Lise not ortalamanız ve dil yeterliliğinizle dünyanın en iyi 500 üniversitesine doğrudan giriş şansı.", icon: GraduationCap },
            { title: "Global Kariyer", desc: "Mezuniyet sonrası 2-3 yıl arası çalışma izinleri ile global şirketlerde kariyer başlangıcı.", icon: Briefcase },
            { title: "Burs Danışmanlığı", desc: "Akademik başarı ve yetenek bazlı burs seçenekleri ile eğitim maliyetlerini minimize etme.", icon: Award },
            { title: "Kişisel Gelişim", desc: "Farklı kültürlerde, özgüveni yüksek ve vizyoner bir dünya vatandaşı olarak yetişme fırsatı.", icon: Trophy }
        ],
        destinations: [
            {
                name: "İngiltere (UK)",
                desc: "3 yıllık lisans ve 1 yıllık master programları ile zamandan tasarruf edin. Graduate Route ile 2 yıl koşulsuz çalışma hakkı sunar.",
                cost: "£15,000 - £28,000 / yıl",
                image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800",
                items: [
                    { name: "University of Oxford", slug: "university-of-oxford", subDesc: "Tutorial sistemi ile dünyanın 1 numarası." },
                    { name: "University of Cambridge", slug: "university-of-cambridge", subDesc: "Bilimsel araştırmanın küresel merkezi." },
                    { name: "UCL / Imperial College", slug: "ucl", subDesc: "Londra'nın merkezinde dünya devi okullar." }
                ]
            },
            {
                name: "Hollanda",
                desc: "Avrupa'da en fazla İngilizce program sunan ülke. Research (Araştırma) ve Applied Sciences (Uygulamalı Bilimler) seçenekleri ile pratik eğitim.",
                cost: "€8,000 - €15,000 / yıl",
                image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=800",
                items: [
                    { name: "University of Amsterdam", slug: "uva", subDesc: "Her yıl ilk 50'de yer alan Hollanda lideri." },
                    { name: "Delft University of Technology", slug: "delft", subDesc: "Mühendislik ve mimarlıkta dünya markası." },
                    { name: "Eindhoven / Tilburg", slug: "tilburg", subDesc: "İş dünyası ve teknoloji odaklı eğitim." }
                ]
            },
            {
                name: "Amerika (USA)",
                desc: "Ivy League prestiji ve Liberal Arts esnekliği. STEM bölümlerinde 3 yıla varan OPT (çalışma izni) avantajı.",
                cost: "$25,000 - $65,000 / yıl",
                image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800",
                items: [
                    { name: "Stanford / Harvard / MIT", slug: "stanford", subDesc: "Geleceğin liderlerinin yetiştiği Ivy League ve Top okullar." },
                    { name: "University of California (UC)", slug: "ucla", subDesc: "Dünyanın en iyi devlet üniversitesi sistemi." }
                ]
            },
            {
                name: "Almanya",
                desc: "Mühendislik ve teknolojinin anavatanı. Devlet üniversitelerinde ücretsiz eğitim ve mezuniyet sonrası 18 ay iş arama vizesi.",
                cost: "€0 - €1,500 / yıl",
                image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800",
                items: [
                    { name: "TU Munich / RWTH Aachen", slug: "tum", subDesc: "Avrupa'nın en iyi teknik üniversiteleri." },
                    { name: "Heidelberg University", slug: "heidelberg", subDesc: "Tıpta küresel otorite." }
                ]
            }
        ],
        process: [
            { step: 1, title: "Best-Fit Analizi", desc: "Akademik CV, bütçe ve hedefleriniz doğrultusunda en doğru üniversite listesini oluşturuyoruz." },
            { step: 2, title: "Portfolyo & Essay", desc: "Niyet mektubu ve portfolyonuzu profesyonel editörlerimizle en etkileyici hale getiriyoruz." },
            { step: 3, title: "Kabul Yönetimi", desc: "Üniversite kabullerini yönetiyor, burs başvurularınızı takip ediyoruz." },
            { step: 4, title: "Vize & Uyum", desc: "Vize sürecini yönetiyor ve yurtdışındaki ilk gününüzde yanınızda oluyoruz." }
        ],
        documents: [
            "Lise Diploması / Transkript",
            "IELTS / TOEFL Skor Belgesi",
            "Niyet Mektubu (Personal Statement)",
            "Akademik Referans Mektupları",
            "Banka Hesap Dökümleri"
        ],
        faq: [
            { q: "Sınavsız üniversite mümkün mü?", a: "Evet, özellikle Avrupa'daki çoğu okul ve Kanada'daki tüm okullar sadece lise başarınıza bakarak kabul eder." },
            { q: "YÖK denkliği var mı?", a: "StarEducation olarak sadece tanınan ve akredite okullarla çalışıyoruz, denklik süreçlerinizi destekliyoruz." }
        ]
    },


    "yurtdisi-dil-okullari": {
        title: "Yurtdışı Dil Okulları",
        heroImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000",
        heroDesc: "Oxford'dan New York'a, dili yerinde yaşayarak öğrenin. Star Education ile global bir vizyon ve akıcı bir gelecek inşa edin.",
        overview: `
            <div class="space-y-24">
                <!-- Giriş Bölümü -->
                <section>
                    <h2 class="text-4xl md:text-5xl font-serif font-bold text-navy mb-10 italic hover:text-gold transition-all duration-500 underline decoration-gold/10 underline-offset-[12px]">Akademik Hedeflerinize Yerinde Ulaşın</h2>
                    <p class="text-xl leading-relaxed text-zinc-600 font-serif italic border-l-2 border-gold/20 pl-8">Star Education, eğitim hedeflerinize en uygun dili öğrenmeniz veya çalıştığınız sektörde en sık kullanılan dili profesyonel düzeyde kavrayabilmeniz için, dünya genelindeki seçkin yurt dışı dil okullarıyla iş birliği yapıyor. Bu okullarda uzman eğitmenlerden ders alarak, dil bilgisi becerilerinizi doğru ve etkili bir şekilde geliştirebilir ve aynı zamanda bulunduğunuz ülkenin kültürünü deneyimleyebilirsiniz.</p>
                </section>

                <!-- Öne Çıkan Bilgiler -->
                <div class="flex flex-col xl:flex-row gap-6 mb-12">
                    <div class="flex-1 p-8 sm:p-10 rounded-[2.5rem] bg-navy text-white shadow-premium relative overflow-hidden group">
                        <div class="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-all duration-1000"></div>
                        <h3 class="text-2xl font-serif font-bold mb-6 italic text-gold relative z-10">Yurtdışı Dil Okulu Fiyatları</h3>
                        <p class="text-zinc-300 leading-relaxed mb-8 italic opacity-90 relative z-10">Seçtiğiniz ülke, okul kalitesi ve eğitim süresine göre değişen fiyatlar; İngiltere ve Amerika gibi popüler ülkelerde daha yüksek olabilirken, Malta ve Güney Afrika gibi ülkelerde daha uygun bütçelerle kaliteli eğitim mümkündür.</p>
                        <div class="flex items-center gap-4 py-4 px-6 bg-white/5 rounded-2xl border border-white/10 italic text-sm text-gold/90 relative z-10">
                            <span>Fiyatlar haftalık, aylık veya yıllık programlara göre güncellenmektedir.</span>
                        </div>
                    </div>
                    <div class="flex-1 p-8 sm:p-10 rounded-[2.5rem] bg-zinc-50 border border-gold/10 shadow-premium flex flex-col justify-center">
                        <h3 class="text-2xl font-serif font-bold mb-6 italic text-navy">Başvuru Takvimi</h3>
                        <div class="space-y-4">
                            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 py-3 border-b border-zinc-200">
                                <span class="font-bold text-navy italic">Genel Dil Programları</span>
                                <span class="text-xs text-zinc-500 font-black uppercase tracking-widest">Her Pazartesi</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 py-3 border-b border-zinc-200">
                                <span class="font-bold text-navy italic">Akademik Dönem</span>
                                <span class="text-xs text-zinc-500 font-black uppercase tracking-widest">Ocak / Eylül</span>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 py-3">
                                <span class="font-bold text-navy italic">Sınav Hazırlık</span>
                                <span class="text-xs text-zinc-500 font-black uppercase tracking-widest">Aylık Başlangıç</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ülkeler Bölümü -->
                <div class="space-y-32">
                    <div class="flex items-center gap-6 mb-16">
                        <div class="h-[1px] flex-grow bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
                        <h3 class="text-3xl font-serif font-bold text-primary italic tracking-tight">Popüler Ülkeler ve Detaylar</h3>
                        <div class="h-[1px] flex-grow bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
                    </div>

                    <!-- İngiltere -->
                    <div class="group">
                        <h4 class="text-2xl font-serif font-bold text-navy mb-6 flex items-center gap-4 italic group-hover:text-gold transition-colors">
                            <span class="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-sm not-italic font-bold text-gold shadow-sm">UK</span>
                            İngiltere Dil Okulları
                        </h4>
                        <div class="grid md:grid-cols-3 gap-8 items-start">
                            <div class="md:col-span-2 space-y-4">
                                <p class="text-zinc-600 leading-relaxed italic pr-10">İngiltere, tarihi, kültürel zenginliği ve yüksek eğitim standartlarıyla İngilizce öğrenmek isteyenlerin ilk tercihlerinden biridir. Burada bulunan dil okulları, kaliteli bir eğitim ve öğrencilere sunduğu zengin sosyal olanaklarla bilinir.</p>
                                <ul class="grid grid-cols-2 gap-3 text-sm italic text-zinc-500">
                                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-gold"></span> Londra: Metropolün kalbi</li>
                                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-gold"></span> Oxford: Akademik köken</li>
                                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-gold"></span> Cambridge: Geleneksel eğitim</li>
                                    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-gold"></span> Brighton: Deniz ve huzur</li>
                                </ul>
                            </div>
                            <div class="bg-zinc-50 p-8 rounded-3xl border border-gold/5 italic text-center">
                                <span class="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Başlangıç Fiyatı</span>
                                <span class="text-3xl font-bold text-navy">£220</span>
                                <span class="text-zinc-400 text-sm ml-1">/ hafta</span>
                            </div>
                        </div>
                    </div>

                    <!-- Amerika -->
                    <div class="group">
                        <h4 class="text-2xl font-serif font-bold text-navy mb-6 flex items-center gap-4 italic group-hover:text-gold transition-colors">
                            <span class="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-sm not-italic font-bold text-gold shadow-sm">US</span>
                            Amerika Dil Okulları
                        </h4>
                        <div class="grid md:grid-cols-3 gap-8 items-start">
                            <div class="md:col-span-2 space-y-4">
                                <p class="text-zinc-600 leading-relaxed italic pr-10">Amerika, eğitim çeşitliliği ve öğrenciler için sunduğu kariyer olanaklarıyla ünlüdür. Birçok farklı eyalet seçeneğiyle, hem metropollerde hem de daha sakin bölgelerde dil eğitimi alabilirsiniz.</p>
                                <p class="text-sm italic font-bold text-gold">New York, Boston ve Los Angeles en çok tercih edilen şehirlerdir.</p>
                            </div>
                            <div class="bg-zinc-50 p-8 rounded-3xl border border-gold/5 italic text-center md:order-first">
                                <span class="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Başlangıç Fiyatı</span>
                                <span class="text-3xl font-bold text-navy">$300</span>
                                <span class="text-zinc-400 text-sm ml-1">/ hafta</span>
                            </div>
                        </div>
                    </div>

                    <!-- Kanada -->
                    <div class="group">
                        <h4 class="text-2xl font-serif font-bold text-navy mb-6 flex items-center gap-4 italic group-hover:text-gold transition-colors">
                            <span class="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-sm not-italic font-bold text-gold shadow-sm">CA</span>
                            Kanada Dil Okulları
                        </h4>
                        <div class="grid md:grid-cols-3 gap-8 items-start">
                            <div class="md:col-span-2 space-y-4">
                                <p class="text-zinc-600 leading-relaxed italic pr-10">Kanada, kaliteli eğitimi ve güler yüzlü insanlarıyla bilinir. Ayrıca, göçmenlik olanakları ve çalışma izinleriyle de çok sayıda uluslararası öğrenciyi kendine çeker. Toronto ve Vancouver, dil eğitimi için en popüler merkezlerdir.</p>
                            </div>
                            <div class="bg-zinc-50 p-8 rounded-3xl border border-gold/5 italic text-center">
                                <span class="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Başlangıç Fiyatı</span>
                                <span class="text-3xl font-bold text-navy">C$280</span>
                                <span class="text-zinc-400 text-sm ml-1">/ hafta</span>
                            </div>
                        </div>
                    </div>

                    <!-- Diğer Ülkeler Grid -->
                    <div class="grid md:grid-cols-2 gap-12">
                        <!-- İrlanda -->
                        <div class="border-l-4 border-gold/20 pl-8 py-4">
                            <h5 class="text-xl font-serif font-bold text-navy mb-4 italic">İrlanda Dil Okulları</h5>
                            <p class="text-zinc-600 text-sm italic leading-relaxed mb-4">Küçük bir ülke olmasına rağmen, İrlanda, yüksek ses düzeyli üniversiteleri ve dil okullarıyla bilinir. Dublin, canlı kültürel yapısıyla öğrenciler için harika bir yerdir.</p>
                            <span class="text-gold font-black text-[10px] uppercase tracking-widest">Fiyat: €180 / hafta</span>
                        </div>
                        <!-- Malta -->
                        <div class="border-l-4 border-gold/20 pl-8 py-4">
                            <h5 class="text-xl font-serif font-bold text-navy mb-4 italic">Malta Dil Okulları</h5>
                            <p class="text-zinc-600 text-sm italic leading-relaxed mb-4">Malta, hem eğitim hem de bir tatil atmosferi sunmasıyla popülerdir. Sahil şeridi ve sosyal hayatı ile dil öğrenirken eğlenmek isteyenler için birebirdir.</p>
                            <span class="text-gold font-black text-[10px] uppercase tracking-widest">Fiyat: €150 / hafta</span>
                        </div>
                        <!-- Güney Afrika -->
                        <div class="border-l-4 border-gold/20 pl-8 py-4">
                            <h5 class="text-xl font-serif font-bold text-navy mb-4 italic">Güney Afrika Dil Okulları</h5>
                            <p class="text-zinc-600 text-sm italic leading-relaxed mb-4">Güney Afrika, uygun maliyetli kaliteli bir eğitim arayanlar için cazip bir seçenektir. Cape Town gibi şehirler, doğal güzellikleriyle de öne çıkar.</p>
                            <span class="text-gold font-black text-[10px] uppercase tracking-widest">Fiyat: $200 / hafta</span>
                        </div>
                        <!-- Dubai -->
                        <div class="border-l-4 border-gold/20 pl-8 py-4">
                            <h5 class="text-xl font-serif font-bold text-navy mb-4 italic">Dubai Dil Okulları</h5>
                            <p class="text-zinc-600 text-sm italic leading-relaxed mb-4">Dubai, vize kolaylıkları ve modern yaşamıyla bilinir. Ayrıca, mezuniyet sonrası iş imkanları bakımından da birçok avantaj sunmaktadır.</p>
                            <span class="text-gold font-black text-[10px] uppercase tracking-widest">Fiyat: $250 / hafta</span>
                        </div>
                    </div>
                </div>
            </div>
        `,
        advantages: [
            { title: "20 Yıllık Tecrübe", desc: "Sektördeki 20 yılı aşkın deneyimimizle dünyanın en seçkin okullarında şeffaf ödeme garantili eğitim.", icon: ShieldCheck },
            { title: "Ücretsiz Danışmanlık", desc: "Okul başvurusu ve vize dosya hazırlığı için herhangi bir ek hizmet ücreti talep etmiyoruz.", icon: Users },
            { title: "Sürekli Destek", desc: "Eğitim sürecinizin başından sonuna kadar ihtiyaç duyduğunuz her an yanınızda oluyoruz.", icon: Headphones },
            { title: "Ziyaret Edilmiş Okullar", desc: "Tüm danışmanlarımız çalıştığımız okulları bizzat ziyaret ederek size en doğru bilgileri sunar.", icon: School }
        ],
        destinations: [
            {
                name: "İngiltere",
                desc: "İngilizce'nin anavatanı. Tarihi dokusu ve yüksek eğitim kalitesiyle en popüler destinasyon.",
                cost: "£220 - £450 / hafta",
                image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=800",
                items: [
                    { name: "Londra", slug: "#", subDesc: "Metropol hayatının kalbinde eğitim." },
                    { name: "Oxford / Cambridge", slug: "#", subDesc: "Akademik geleneğin zirvesi." }
                ]
            },
            {
                name: "Amerika",
                desc: "Dünyanın her yerinden gelen öğrencilerle Amerikan kültürünü ve dilini yerinde deneyimleyin.",
                cost: "$300 - $600 / hafta",
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800",
                items: [
                    { name: "New York / Boston", slug: "#", subDesc: "Doğu Yakası'nın prestijli okulları." },
                    { name: "Los Angeles", slug: "#", subDesc: "Batı Yakası'nın enerjik kampüsleri." }
                ]
            },
            {
                name: "Kanada",
                desc: "Güvenli şehirleri ve çift dilli eğitim fırsatıyla (İngilizce/Fransızca) ideal bir seçim.",
                cost: "CAD 280 - 550 / hafta",
                image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800",
                items: [
                    { name: "Toronto / Vancouver", slug: "#", subDesc: "Modern ve çok kültürlü yaşam." }
                ]
            },
            {
                name: "İrlanda",
                desc: "Güler yüzlü halkı ve doğal güzellikleriyle samimi bir eğitim atmosferi sunar.",
                cost: "€180 - €350 / hafta",
                image: "https://images.unsplash.com/photo-1590089415225-401eb6b98689?q=80&w=800",
                items: [
                    { name: "Dublin", slug: "#", subDesc: "Teknoloji ve kültürün buluşma noktası." }
                ]
            },
            {
                name: "Malta",
                desc: "Akdeniz ikliminde ekonomik ve tatil tadında dil eğitimi alternatifleri.",
                cost: "€150 - €300 / hafta",
                image: "https://images.unsplash.com/photo-1518548366961-755e10080829?q=80&w=800"
            },
            {
                name: "Dubai",
                desc: "Uluslararası iş dünyasına açılmak ve vize kolaylığıyla İngilizce öğrenmek isteyenler için.",
                cost: "$250 - $500 / hafta",
                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800"
            },
            {
                name: "Avustralya",
                desc: "Doğa harikaları ve çok kültürlü yapısıyla kaliteli eğitim kurumlarının adresi.",
                cost: "AUD 300 - 550 / hafta",
                image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800"
            },
            {
                name: "Almanya",
                desc: "Almanca öğrenmek isteyenler için Berlin ve Münih gibi şehirlerde en doğru tercih.",
                cost: "€200 - €400 / hafta",
                image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800"
            },
            {
                name: "İspanya",
                desc: "Hem dili hem de İspanya'nın zengin kültürünü keşfedebileceğiniz canlı programlar.",
                cost: "€180 - €350 / hafta",
                image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=800"
            },
            {
                name: "İtalya",
                desc: "Tarihin ve sanatın kalbinde İtalyanca öğrenirken İtalyan yaşam tarzını keşfedin.",
                cost: "€200 - €400 / hafta",
                image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800"
            },
            {
                name: "Fransa",
                desc: "Paris ve Nice gibi şehirlerde Fransızca öğrenirken benzersiz bir kültür deneyimi yaşayın.",
                cost: "€250 - €450 / hafta",
                image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800"
            },
            {
                name: "Güney Afrika",
                desc: "Vahşi yaşam ve doğa turları eşliğinde İngilizceyi doğal çevrede öğrenin.",
                cost: "$200 - $350 / hafta",
                image: "https://images.unsplash.com/photo-1547427139-3c5217d77dd5?q=80&w=800"
            }
        ],
        process: [
            { step: 1, title: "Hedef Analizi", desc: "Size en uygun program, ülke, şehir ve okulu tecrübeli danışmanlarımızla birlikte seçiyoruz." },
            { step: 2, title: "Kayıt & Vize", desc: "Uzman danışmanlarımızla birlikte vize başvurunuzu en profesyonel şekilde hazırlıyoruz." },
            { step: 3, title: "Ödeme & Uyum", desc: "Okul, konaklama ve uçak bileti ödemelerinizi sorunsuz yaparak gidiş oryantasyonunuzu tamamlıyoruz." },
            { step: 4, title: "Başlangıç", desc: "Yurtdışı dil okulu programınıza Star Education farkıyla güvenle başlıyorsunuz." }
        ],
        documents: [
            "Pasaport",
            "Biyometrik Fotoğraf",
            "Diploma veya Öğrenci Belgesi",
            "Finansal Yeterlilik Belgeleri (Sponsor Evrakları)"
        ],
        faq: [
            { q: "Yurtdışında okurken çalışabilir miyim?", a: "İrlanda, Dubai, Malta ve Avustralya gibi ülkelerde alacağınız eğitimin süresine göre yarı zamanlı çalışma izni alabilirsiniz." },
            { q: "Dil okulu seçerken nelere dikkat etmeliyim?", a: "Seçtiğiniz ülkenin vize politikası, şehrin maliyeti ve okulun akreditasyonları en kritik noktalardır. Danışmanlarımız bu konuda sizi yönlendirecektir." },
            { q: "Konaklama seçenekleri nelerdir?", a: "Okulların sunduğu aile yanı, yurt veya öğrenci evi seçeneklerinin yanı sıra Airbnb veya özel kiralama konularında da destek veriyoruz." },
            { q: "Vize başvurusu nasıl yapılıyor?", a: "Her ülkenin kriteri farklıdır. Tüm dosya hazırlığınız ve randevu süreciniz profesyonel ekibimiz tarafından yürütülmektedir." }
        ]
    },
    "yurtdisi-yaz-okullari": {
        title: "Yurtdışı Yaz Okulları ve Kamplar",
        heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000",
        heroDesc: "Dünyanın en iyi üniversitelerinde unutulmaz bir yaz deneyimi.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Akademik Prestij ve Sosyal Gelişim Dolu Bir Yaz</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">7-17 yaş grubu öğrencilerimiz için yaz tatilini, akademik ve sosyal bir gelişim fırsatına dönüştürüyoruz. StarEducation Yaz Okulları ile çocuğunuz; Londra, New York, Toronto gibi güvenli şehirlerde, Yale, UCLA, Oxford gibi prestijli üniversite kampüslerinde eğitim alma ayrıcalığını yaşar.</p>
            
            <div class="p-8 rounded-[2rem] bg-gold/5 border border-gold/10 mb-12">
                <h3 class="text-xl font-serif font-bold mb-6 text-navy italic">Yaz Okulu Paket Ücretleri (2 Hafta)</h3>
                <div class="overflow-x-auto border border-gold/10 rounded-2xl shadow-sm bg-white">
                    <table class="w-full text-left font-sans text-sm">
                        <thead class="bg-navy text-gold uppercase tracking-[0.2em] text-[10px]">
                            <tr>
                                <th class="p-6">Program Türü</th>
                                <th class="p-6">Lokasyon</th>
                                <th class="p-6">Tahmini Paket Ücret</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gold/5 italic text-zinc-600">
                            <tr class="hover:bg-gold/5 transition-colors">
                                <td class="p-6 font-bold text-navy">Klasik Yaz Okulu</td>
                                <td class="p-6">Londra / Oxford</td>
                                <td class="p-6 text-gold font-bold">£1,800 - £3,200</td>
                            </tr>
                            <tr class="bg-zinc-50 hover:bg-gold/10 transition-colors">
                                <td class="p-6 font-bold text-navy">Yoğun İngilizce</td>
                                <td class="p-6">New York / Boston</td>
                                <td class="p-6 text-gold font-bold">$2,500 - $4,500</td>
                            </tr>
                            <tr class="hover:bg-gold/5 transition-colors">
                                <td class="p-6 font-bold text-navy">Akademik/STEM Kampları</td>
                                <td class="p-6">Yale / Toronto</td>
                                <td class="p-6 text-gold font-bold">$3,500 - $6,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="mt-4 text-[10px] uppercase tracking-widest text-zinc-400 text-center italic">* Paket ücretlere genellikle eğitim, konaklama, yemekler ve tüm aktiviteler dahildir.</p>
            </div>
        `,
        advantages: [
            { title: "Kampüs Deneyimi", desc: "Harvard, Oxford, Toronto Üniversitesi gibi rüya okulların kampüslerinde konaklayarak akademik havayı soluma şansı.", icon: School },
            { title: "Özgüven Gelişimi", desc: "Kendi sorumluluğunu alma, farklı kültürlerle iletişim kurma ve tek başına seyahat etme becerileri ile karakter gelişimi.", icon: Sun },
            { title: "Aktivite Dolu Program", desc: "Sabah ders, öğleden sonra gezi ve spor, akşamları sosyal aktiviteler. Sıkılmaya zaman bulamayacakları dolu dolu bir yaz.", icon: Trophy },
            { title: "7/24 Güvenlik", desc: "Havalimanı karşılamasından uğurlamaya kadar her an eğitmen ve grup liderleri gözetiminde, maksimum güvenlik protokolleri.", icon: ShieldCheck }
        ],
        destinations: [
            {
                name: "İngiltere Yaz Okulları",
                desc: "Harry Potter atmosferinde, tarihi kolejlerde eğitim. Londra, Cambridge, Oxford ve Brighton en popüler merkezlerdir. Futbol okulları (Chelsea, Arsenal) ve Binicilik kampları seçenekleri de mevcuttur.",
                cost: "£1,800 - £3,000 / 2 Hafta",
                image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=800",
                items: [
                    { name: "Oxford Summer Courses", slug: "#", subDesc: "Oxford Üniversitesi kolejlerinde akademik yoğunluklu programlar." },
                    { name: "Studio Cambridge", slug: "#", subDesc: "1954'ten beri hizmet veren, en köklü ve güvenilir yaz okullarından biri." },
                    { name: "Embassy Summer", slug: "#", subDesc: "Londra merkezli, aktivite ve gezi ağırlıklı eğlenceli kamplar." }
                ]
            },
            {
                name: "Amerika Yaz Kampları",
                desc: "Büyük kampüsler, sınırsız enerji. Ivy League üniversitelerinde (Yale, Columbia) akademik yaz okullarının yanı sıra, Kaliforniya'da sörf ve sinema kampları, Florida'da NASA uzay kampları gibi benzersiz seçenekler sunar.",
                cost: "$3,000 - $5,000 / 2 Hafta",
                image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800",
                items: [
                    { name: "Yale Young Global Scholars", slug: "#", subDesc: "Üstün yetenekli öğrenciler için liderlik ve akademik program." },
                    { name: "Nike Sports Camps", slug: "#", subDesc: "Profesyonel koçlar eşliğinde basketbol, tenis ve yüzme kampları." },
                    { name: "FLS International", slug: "#", subDesc: "Boston ve Los Angeles'ta üniversite kampüslerinde dil eğitimi." }
                ]
            },
            {
                name: "Kanada Doğa ve Şehir",
                desc: "Doğa ile iç içe, güvenli eğitim. Toronto ve Vancouver'da; University of Toronto veya UBC kampüslerinde konaklamalı, kayak turları ve doğa gezileri içeren, teknolojiden uzaklaşıp sosyalleşmeye odaklanan programlar.",
                cost: "CAD 3,500 - 5,000 / 2 Hafta",
                image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=800",
                items: [
                    { name: "Bodwell High School", slug: "#", subDesc: "Vancouver'da, Pasifik okyanusu kıyısında lise hazırlık kampı." },
                    { name: "ILAC Teen Camp", slug: "#", subDesc: "Dünyanın en çok ödül alan dil okulunun butik yaz programı." }
                ]
            }
        ],
        process: [
            { step: 1, title: "Program Belirleme", desc: "Öğrencinin yaşına, ilgi alanına (Spor, Sanat, Kodlama) ve İngilizce seviyesine en uygun kampı aile ile birlikte seçiyoruz." },
            { step: 2, title: "Kayıt ve Yer Ayırtma", desc: "Popüler yaz okulları erken dolduğu için Ocak-Mart aylarında kaydı tamamlıyor ve yerimizi garantiliyoruz." },
            { step: 3, title: "Resmi İşlemler", desc: "18 yaş altı vize prosedürleri, noter onaylı muvafakatname (aile izin yazısı) ve sağlık formlarını eksiksiz hazırlıyoruz." },
            { step: 4, title: "Güvenli Uçuş", desc: "Refakatçi hostes (UM) eşliğinde öğrencimizi uçağa bindiriyor, indiğinde okul yetkililerince karşılandığından emin oluyoruz." }
        ],
        documents: [
            "Pasaport",
            "Muvafakatname (Noter Onaylı)",
            "Vukuatlı Nüfus Kayıt Örneği",
            "Okuldan Öğrenci Belgesi",
            "Sağlık Raporu (Okul formuna işlenir)"
        ],
        faq: [
            { q: "Çocuğumun güvenliği nasıl sağlanıyor?", a: "Öğrencilerimiz 7/24 grup liderleri ve güvenlik personeli gözetimindedir. Kampüs dışına izinsiz çıkış kesinlikle yasaktır. Sağlık personeli kampüste hazır bulunur." },
            { q: "Yemekler Türk damak tadına uygun mu?", a: "Uluslararası okullar olduğu için açık büfe sisteminde her kültüre uygun (vejetaryen, helal, glutensiz vb.) seçenekler sunulur. Alerji durumları önceden okula bildirilir." },
            { q: "Cep telefonu kullanımı serbest mi?", a: "Derslerde telefon toplanır veya yasaktır. Ancak akşamları ve serbest zamanlarda ailenizle görüntülü görüşme yapabilirsiniz. Adaptasyon için aşırı iletişimi önermiyoruz." }
        ]
    },
    "yurtdisi-lise": {
        title: "Yurtdışında Lise Eğitimi",
        heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000",
        heroDesc: "Dünya vatandaşı olmaya lisede başlayın. Global vizyon kazanmak için en doğru zaman.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Dünya Vatandaşlığına Lise Yıllarında İlk Adım</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Yurtdışında lise eğitimi, öğrencilerin akademik gelişimlerini global ölçekte şekillendiren, dil becerilerini ileri seviyeye taşıyan ve dünya standartlarında üniversitelere açılan kapıları aralayan bir eğitim yolculuğudur. İngiltere’de **A Level**, Kanada’da **OSSD**, Amerika’da **AP & Honors** veya dünya genelinde **IB Diploma** gibi programlarla hedeflerinize ulaşın.</p>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div class="lg:col-span-2 p-8 rounded-[2rem] bg-navy text-white relative overflow-hidden">
                    <h3 class="text-xl font-serif font-bold mb-6 italic text-gold">Tahmini Yıllık Eğitim Maliyetleri</h3>
                    <div class="overflow-x-auto border border-gold/20 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <table class="w-full text-left font-sans text-sm">
                            <thead class="text-gold/50 uppercase tracking-[0.2em] text-[10px]">
                                <tr>
                                    <th class="p-6">Ülke</th>
                                    <th class="p-6">Program Türü</th>
                                    <th class="p-6 text-right">Yıllık Ücret</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gold/10 italic text-zinc-100">
                                <tr class="hover:bg-white/5 transition-colors text-xs">
                                    <td class="p-4 font-bold">İngiltere</td>
                                    <td class="p-4">A Level / IB (Boarding)</td>
                                    <td class="p-4 text-right text-gold">£45k – £65k</td>
                                </tr>
                                <tr class="hover:bg-white/5 transition-colors text-xs">
                                    <td class="p-4 font-bold">Kanada</td>
                                    <td class="p-4">OSSD (Devlet/Özel)</td>
                                    <td class="p-4 text-right text-gold">30k – 45k CAD</td>
                                </tr>
                                <tr class="hover:bg-white/5 transition-colors text-xs">
                                    <td class="p-4 font-bold">Amerika</td>
                                    <td class="p-4">AP / High School Diploma</td>
                                    <td class="p-4 text-right text-gold">45k – 75k USD</td>
                                </tr>
                                <tr class="hover:bg-white/5 transition-colors text-xs">
                                    <td class="p-4 font-bold">İrlanda</td>
                                    <td class="p-4">Leaving Certificate</td>
                                    <td class="p-4 text-right text-gold">€25k – €40k</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                    <h3 class="text-xl font-serif font-bold mb-6 text-navy italic">Kabul Şartları</h3>
                    <ul class="space-y-6">
                        <li class="flex gap-4">
                            <span class="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-xs shrink-0">1</span>
                            <div>
                                <p class="font-bold text-navy text-sm italic">Akademik Geçmiş</p>
                                <p class="text-xs text-zinc-500 mt-1">Son 3 yıla ait not dökümleri (Transkript).</p>
                            </div>
                        </li>
                        <li class="flex gap-4">
                            <span class="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-xs shrink-0">2</span>
                            <div>
                                <p class="font-bold text-navy text-sm italic">Dil Yeterliliği</p>
                                <p class="text-xs text-zinc-500 mt-1">Okul sınavı veya ELTiS sertifikası.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        `,
        advantages: [
            { title: "Global Kariyer", desc: "Dünyanın en iyi üniversitelerine daha lise yıllarında kabul alma şansınızı %80 artırın.", icon: Globe },
            { title: "Üst Düzey Dil Eğitimi", desc: "Eğitimi anadil seviyesinde alarak İngilizce, Fransızca veya Almanca'yı kusursuz kullanın.", icon: Languages },
            { title: "Akademik Disiplin", desc: "IB, A Level veya AP gibi sistemlerle kendi ilgi alanınızda erkenden uzmanlaşmaya başlayın.", icon: Target },
            { title: "Burs İmkanları", desc: "Akademik başarı, spor veya sanat yeteneklerinizle eğitim maliyetini %100'e kadar düşürün.", icon: Award }
        ],
        destinations: [
            {
                name: "Kanada Liseleri",
                desc: "Dünyanın en yaşanabilir ülkesinde, devlet gözetiminde güvenli ve yüksek standartlı bir eğitim deneyimi yaşayın. PISA skorlarında zirvedeki Kanada liseleri, mezuniyet sonrası üniversitelere sınavsız geçiş imkanı sunar.",
                cost: "30.000 CAD / Yıl'dan itibaren",
                image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=800",
                items: [
                    { name: "Toronto District Schools", slug: "#", subDesc: "Kanada'nın en büyük ve çeşitli okul bölgesi." },
                    { name: "Vancouver School Board", slug: "#", subDesc: "Ilıman iklim ve akademik başarı odaklı okullar." }
                ]
            },
            {
                name: "İngiltere (Boarding)",
                desc: "Geleneksel 'Yatılı Okul' kültürü. Cambridge ve Oxford gibi okullara gitmenin en prestijli yolu olan A-Level sistemi ile eğitim alın. Kampüs içi 7/24 güvenlik ve akademik destek sağlanır.",
                cost: "£45.000 / Yıl'dan itibaren",
                image: "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?q=80&w=800",
                items: [
                    { name: "CATS Colleges", slug: "#", subDesc: "Cambridge, Londra ve Canterbury'de modern kolejler." },
                    { name: "D'Overbroeck's Oxford", slug: "#", subDesc: "Oxford'da, akademik başarısı çok yüksek ödüllü okul." }
                ]
            }
        ],
        process: [
            { step: 1, title: "Profil Analizi", desc: "Öğrencinin notları, ilgi alanları ve ailenin bütçesi değerlendirilerek stratejik bir plan oluşturulur." },
            { step: 2, title: "Okul Seçimi", desc: "Uygun lise programı, konaklama tipi ve hedef ülke/şehir belirlenerek aday okullar listelenir." },
            { step: 3, title: "Başvuru Yönetimi", desc: "Transkript, motivasyon mektubu ve referanslar eksiksiz hazırlanarak okula sunulur." },
            { step: 4, title: "Kabul & Mülakat", desc: "Okul kabulü sonrası gerekiyorsa mülakat hazırlığı yapılır ve kesin kayıt işlemleri tamamlanır." },
            { step: 5, title: "Ücret Ödemesi", desc: "Okulun talep ettiği depozito ve kayıt ücretleri güvenli ödeme kanallarıyla gerçekleştirilir." },
            { step: 6, title: "Vize Süreci", desc: "StarEducation uzmanlığıyla vize dosyanız titizlikle hazırlanarak başvuru yapılır." },
            { step: 7, title: "Oryantasyon", desc: "Uçuş öncesi seyahat, konaklama ve karşılama detayları içeren kapsamlı bilgilendirme yapılır." }
        ],
        documents: [
            "Son 3 Yılın Karnesi / Transkript",
            "Referans Mektubu (Öğretmenlerinizden)",
            "Motivasyon Mektubu (Neden yurtdışında okumak istiyorsunuz?)",
            "Pasaport",
            "Uluslararası Dil Belgesi (Varsa)",
            "Sağlık Raporu & Aşı Kartı"
        ],
        faq: [
            { q: "Online yurtdışı lise eğitimi var mı?", a: "Evet, bazı ülkelerde online lise programları bulunmaktadır. Ancak kampüs deneyimi, dil gelişimi ve kültürel adaptasyon açısından yüz yüze eğitim çok daha avantajlıdır." },
            { q: "Liseyi yurtdışında okumak için ne yapmalıyım?", a: "Öncelikle hedef ülke ve program belirlenir. Ardından okul başvurusu, seviye tespit sınavı, mülakat ve kabul süreci tamamlanır." },
            { q: "Yurtdışında lise okumak için ne gerekli?", a: "Genel olarak öğrenciden transkript (not dökümü), öğrenci belgesi, referans mektubu ve pasaport talep edilir." },
            { q: "Yurtdışında lise okumak için ne kadar para lazım?", a: "Yıllık maliyetler ülkeye göre 30.000 CAD ile 180.000 CHF arasında değişmektedir. Burslarla maliyetler düşürülebilir." },
            { q: "Yurtdışında lise eğitimi kaç yıldır?", a: "Genellikle 4 yıldır, ancak geçiş yapılan sınıfa (10, 11 veya 12) göre süre değişebilir." }
        ]
    },
    "yurtdisi-yuksek-lisans": {
        title: "Yurtdışı Yüksek Lisans Programları",
        heroImage: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=2000",
        heroDesc: "Kariyerinizi global bir boyuta taşımak için en prestijli yüksek lisans mentorluğu.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Kariyerinizi Global Bir Boyuta Taşıyın</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Yurt dışında yüksek lisans derecesi, profesyonel yetkinliğinizi global arenada kanıtlamanın en prestijli yoludur. StarEducation olarak, **İngiltere'den Kanada'ya, Almanya'dan Dubai'ye** uzanan geniş partner ağımızla hayalinizdeki lisansüstü eğitime giden yolu açıyoruz.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-8 rounded-[2rem] bg-gold/5 border border-gold/10">
                    <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Neden Master?</h3>
                    <ul class="space-y-4 text-sm text-zinc-600 italic">
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></div>
                            Spesifik bir alanda uzmanlaşarak CV'nizi öne çıkarın.
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></div>
                            Mezuniyet sonrası çalışma izinleri ile global tecrübe kazanın.
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></div>
                            Uluslararası network ile kariyerinize yön verin.
                        </li>
                    </ul>
                </div>
                <div class="p-8 rounded-[2rem] bg-navy text-white">
                    <h3 class="text-xl font-serif font-bold mb-4 text-gold italic">Hazırlık Programları</h3>
                    <p class="text-xs text-zinc-300 mb-6 font-sans">Eksiklerinizi tamamlamak için tasarlanmış özel köprü programlar:</p>
                    <div class="space-y-4">
                        <div class="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p class="font-bold text-sm text-gold italic">Foundation</p>
                            <p class="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">Lisans Hazırlık</p>
                        </div>
                        <div class="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p class="font-bold text-sm text-gold italic">Pre-Master</p>
                            <p class="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">Yüksek Lisans Hazırlık</p>
                        </div>
                    </div>
                </div>
            </div>

            <p class="mt-10 mb-6 font-serif italic text-navy font-bold text-center">StarEducation 20 yılı aşkın tecrübesiyle, akademik yolculuğunuza en uygun lokasyonu ve üniversiteyi saptamanız için profesyonel mentorluk sunar.</p>
        `,
        advantages: [
            { title: "Uzmanlaşma", desc: "Genel bilgiden sıyrılıp, sektörün ihtiyaç duyduğu spesifik alanlarda derinleşin.", icon: BookOpen },
            { title: "Global Kariyer", desc: "Mezuniyet sonrası çalışma vizesi (PSW) ile döviz bazlı gelir elde edin.", icon: Briefcase },
            { title: "Alan Değişikliği", desc: "'Conversion' programları ile farklı bir alana (örn: Yazılım, MBA) geçiş yapabilirsiniz.", icon: Target },
            { title: "Giriş Kolaylığı", desc: "Foundation ve Pre-master seçenekleri ile akademik eksiklerinizi tamamlayın.", icon: Award }
        ],
        destinations: [
            {
                name: "Programı Sunan Okullar",
                desc: "Dünya çapında prestijli partner okullarımızla hedeflerinize ulaşın.",
                cost: "Farklı bütçelere uygun seçenekler",
                image: "https://images.unsplash.com/photo-1523050853063-bd80e2924522?q=80&w=800",
                items: [
                    { name: "Brunel University", slug: "#", subDesc: "İngiltere - Uxbridge" },
                    { name: "Middlesex University", slug: "#", subDesc: "İngiltere - Londra" },
                    { name: "Oxford Brookes University", slug: "#", subDesc: "İngiltere - Oxford" },
                    { name: "Queen Mary University", slug: "#", subDesc: "İngiltere - Londra" },
                    { name: "Kingston University", slug: "#", subDesc: "İngiltere - Londra (Foundation)" },
                    { name: "Georgian College", slug: "#", subDesc: "Kanada - Barrie (Pre-master)" }
                ]
            }
        ],
        process: [
            { step: 1, title: "Akademik Analiz", desc: "Not ortalamanız, dil seviyeniz ve kariyer hedeflerinize göre en uygun programı seçiyoruz." },
            { step: 2, title: "Evrakların Hazırlanması", desc: "Diploma, transkript ve dil skorları gibi gerekli belgeleri eksiksiz şekilde düzenliyoruz." },
            { step: 3, title: "Stratejik Başvuru", desc: "StarEducation uzmanlığıyla Niyet ve Referans mektuplarınızı hazırlayıp başvurunuzu yapıyoruz." },
            { step: 4, title: "Vize ve Konaklama", desc: "Kabul sonrası vize sürecinizi yönetiyor ve konaklama organizasyonunuzu yapıyoruz." }
        ],
        documents: [
            "Lisans Diploması",
            "IELTS, Duolingo ya da TOEFL sonuçları",
            "GMAT/GRE sonuçları (Bazı bölümler için)",
            "Portfolyo (Sanat, tasarım vb. için)",
            "CV / Özgeçmiş",
            "Niyet Mektubu",
            "Referans Mektubu"
        ],
        faq: [
            { q: "Foundation ve Pre-master ücretleri nedir?", a: "Kuruma ve ülkeye göre yıllık 2.500 ile 25.000 EUR/USD arasında değişmektedir." },
            { q: "Alan dışı yüksek lisans yapabilir miyim?", a: "Evet, özellikle 'conversion' programları veya pre-master ile farklı alanlara geçiş mümkündür." },
            { q: "Çalışma izni var mı?", a: "Pek çok ülkede yüksek lisans süresince yarı zamanlı, mezuniyet sonrası ise tam zamanlı çalışma hakkı tanınır." }
        ]
    },
    "denklik": {
        title: "Diploma Denklik ve Tanıma",
        heroImage: "https://images.unsplash.com/photo-1589330694653-93d04739eb38?q=80&w=2000",
        heroDesc: "Yurtdışı diplomanızın Türkiye'de tanınması ve global geçerliliği için profesyonel rehberlik.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Akademik Geleceğinizi Türkiye'de Resmileştirin</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Yurtdışı diplomanızın Türkiye'de tanınması ve profesyonel geçerliliği için uzman rehberliği sağlıyoruz. StarEducation olarak, **YÖK**, **Anabin** ve **ZAB** sistemleri üzerinden üniversitenizin statüsünü analiz ediyor, dosya hazırlığından başvuru takibine kadar yanınızda oluyoruz.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-8 rounded-[2rem] bg-gold/5 border border-gold/10">
                    <h3 class="text-xl font-serif font-bold mb-6 text-navy italic">Kimler İçin Gereklidir?</h3>
                    <ul class="space-y-4">
                        <li class="flex items-start gap-3 italic text-sm text-zinc-600">
                            <CheckCircle2 class="text-gold shrink-0 mt-0.5" size={16} />
                            <span>Kamu kurumlarında veya devlet kadrolarında çalışmak isteyenler.</span>
                        </li>
                        <li class="flex items-start gap-3 italic text-sm text-zinc-600">
                            <CheckCircle2 class="text-gold shrink-0 mt-0.5" size={16} />
                            <span>Doktor, mühendis veya avukat gibi düzenlenmiş meslek sahipleri.</span>
                        </li>
                        <li class="flex items-start gap-3 italic text-sm text-zinc-600">
                            <CheckCircle2 class="text-gold shrink-0 mt-0.5" size={16} />
                            <span>Lisansüstü eğitimine Türkiye'deki üniversitelerde devam etmek isteyenler.</span>
                        </li>
                    </ul>
                </div>
                <div class="p-8 rounded-[2rem] bg-navy text-white relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 opacity-10">
                        <Award size={120} />
                    </div>
                    <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Stratejik Analiz</h3>
                    <p class="text-xs text-zinc-300 leading-relaxed font-sans italic">Hatalı başvurular 2 yıla varan gecikmelere neden olabilir. Uzmanlarımız başvuru öncesi üniversitenizin "H+" statüsünü kontrol ederek başarı ihtimalinizi maksimize eder.</p>
                </div>
            </div>
        `,
        advantages: [
            { title: "ZAB & Anabin Analizi", desc: "Üniversitenizin ve bölümünüzün H+ statüsünde olup olmadığını önceden analiz ediyoruz.", icon: Search },
            { title: "Dosya Hazırlığı", desc: "Eksik belge riskini ortadan kaldırarak, mevzuata uygun profesyonel dosya hazırlıyoruz.", icon: ShieldCheck },
            { title: "Süreç Takibi", desc: "YÖK sistemindeki başvurunuzu düzenli takip ediyor ve güncellemeleri size iletiyoruz.", icon: Clock },
            { title: "STS Danışmanlığı", desc: "Seviye Tespit Sınavı (STS) gereken durumlarda kaynak ve strateji desteği sağlıyoruz.", icon: Award }
        ],
        destinations: [
            {
                name: "Diploma Denklik Destinasyonları",
                desc: "Mezun olduğunuz ülkeye göre denklik süreçleri farklılık gösterebilir. Popüler ülkeler için özel rehberlerimizi inceleyin.",
                cost: "Ücretsiz Ön Değerlendirme",
                image: "https://images.unsplash.com/photo-1523050853063-bd80e2924522?q=80&w=800",
                items: [
                    { name: "İngiltere Diploma Denklik", slug: "/denklik/ingiltere", subDesc: "Yüksek kabul oranlı İngiltere mezuniyetleri için özel süreç." },
                    { name: "Amerika Diploma Denklik", slug: "/denklik/amerika", subDesc: "ABD üniversitelerinden alınan diplomaların YÖK sistemindeki karşılığı." },
                    { name: "Almanya Diploma Denklik", slug: "/denklik/almanya", subDesc: "Alman eğitim sistemi ve denklik kriterleri." },
                    { name: "Kanada Diploma Denklik", slug: "/denklik/kanada", subDesc: "Kanada mezunları için denklik ve tanıma rehberi." },
                    { name: "İsviçre Diploma Denklik", slug: "/denklik/isvicre", subDesc: "İsviçre kanton okulları ve üniversite denklik süreci." },
                    { name: "Avustralya Diploma Denklik", slug: "/denklik/avustralya", subDesc: "Avustralya diplomaları için Türkiye'de tanınma şartları." },
                    { name: "Belçika Diploma Denklik", slug: "/denklik/belcika", subDesc: "Belçika üniversitelerinden mezunlar için adım adım rehber." },
                    { name: "Hollanda Diploma Denklik", slug: "/denklik/hollanda", subDesc: "Hollanda diplomalarının YÖK denkliği." },
                    { name: "İrlanda Diploma Denklik", slug: "/denklik/irlanda", subDesc: "İrlanda yükseköğretim sistemi ve denklik." },
                    { name: "Polonya Diploma Denklik", slug: "/denklik/polonya", subDesc: "Polonya üniversiteleri için denklik prosedürleri." }
                ]
            }
        ],
        process: [
            { step: 1, title: "Ön İnceleme", desc: "Mezun olduğunuz üniversitenin tanınırlığını ve diplomanızın denklik şansını analiz ediyoruz." },
            { step: 2, title: "Belge Toplama", desc: "Transkript, apostil ve noter onaylı tercüme süreçlerinizi koordine ediyoruz." },
            { step: 3, title: "Online Başvuru", desc: "YÖK e-denklik sistemi üzerinden online başvurunuzu hatasız gerçekleştiriyoruz." },
            { step: 4, title: "Fiziki Teslim & Takip", desc: "Gerekli belgelerin YÖK'e elden teslimi ve komisyon kararının takibini yapıyoruz." }
        ],
        documents: [
            "T.C. Kimlik Kartı / Pasaport",
            "Diploma veya Mezuniyet Belgesi (Orijinal)",
            "Noter Onaylı Türkçe Tercümeler",
            "Resmi Transkript (Kapalı Zarf)",
            "Apostil Onayları"
        ],
        faq: [
            { q: "Denklik süreci ne kadar sürer?", a: "Evrakların eksiksiz olması durumunda komisyon değerlendirmesi genellikle 3-6 ay sürmektedir." },
            { q: "STS (Seviye Tespit Sınavı) nedir?", a: "Eğitim düzeyi Türkiye ile tam eşleşmeyen veya tıp gibi uzmanlık gerektiren alanlarda YÖK sınav şartı getirebilir." },
            { q: "Doğrudan tanıma (Equivalency) nedir?", a: "Dünya sıralamasında ilk 400'de yer alan üniversitelerden mezun olanlar genellikle daha hızlı onay alırlar." }
        ]
    },
    "kariyer": {
        title: "Yurtdışı Kariyer ve Ausbildung",
        heroImage: "https://images.unsplash.com/photo-1521737711867-e3b904787ce7?q=80&w=2000",
        heroDesc: "Almanya ve Avrupa'da profesyonel kariyerinize ilk adımı atın. Ausbildung, Chancenkarte ve uzmanlık süreçlerinde yanınızdayız.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Global Kariyer Yolculuğunuz Başlıyor</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Özellikle Almanya'nın Nitelikli İşgücü Yasası ile açılan kapılarda, StarEducation olarak sadece bir danışman değil, Avrupa'daki yeni hayatınızın mimarı oluyoruz. **Ausbildung**, **Chancenkarte** ve **Mavi Kart** süreçlerinde 20 yıllık tecrübemizle yanınızdayız.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div class="group p-8 rounded-[2rem] bg-white border border-gold/10 hover:border-gold/30 transition-all duration-500 shadow-sm hover:shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full group-hover:bg-gold/10 transition-colors"></div>
                    <h4 class="font-serif font-bold text-xl text-navy mb-4 italic">Mesleki Eğitim (Ausbildung)</h4>
                    <p class="text-sm text-zinc-500 leading-relaxed italic">Hem sahada çalışıp maaş alacağınız hem de okulda teorik eğitim göreceğiniz ikili sistemde (Dual System) yerinizi hazırlıyoruz.</p>
                </div>
                <div class="group p-8 rounded-[2rem] bg-white border border-gold/10 hover:border-gold/30 transition-all duration-500 shadow-sm hover:shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-navy/5 rounded-bl-full group-hover:bg-navy/10 transition-colors"></div>
                    <h4 class="font-serif font-bold text-xl text-navy mb-4 italic">Profesyonel Yerleştirme</h4>
                    <p class="text-sm text-zinc-500 leading-relaxed italic">Doktorlar, Mühendisler ve IT uzmanları için mesleki denklik (Anerkennung) ve Alman standartlarında CV/Mülakat mentorluğu sunuyoruz.</p>
                </div>
            </div>

            <div class="p-8 rounded-[3rem] bg-navy text-white mb-12 relative overflow-hidden">
                <div class="absolute right-0 bottom-0 opacity-10 blur-xl w-64 h-64 bg-gold rounded-full translate-x-1/2 translate-y-1/2"></div>
                <h3 class="text-2xl font-serif font-bold mb-6 italic text-gold">Hangi Alanlarda Uzmanız?</h3>
                <p class="mb-8 text-zinc-300 italic text-sm">Sağlık (Doktor, Hemşire, Fizyoterapist), Mühendislik, Bilişim ve Zanaat alanlarında kapsamlı işe yerleştirme hizmeti sunuyoruz.</p>
                <div class="flex flex-wrap gap-3">
                    <span class="px-4 py-2 rounded-full border border-gold/20 text-gold text-[10px] uppercase tracking-widest bg-gold/5">Sağlık</span>
                    <span class="px-4 py-2 rounded-full border border-gold/20 text-gold text-[10px] uppercase tracking-widest bg-gold/5">Mühendislik</span>
                    <span class="px-4 py-2 rounded-full border border-gold/20 text-gold text-[10px] uppercase tracking-widest bg-gold/5">Bilişim</span>
                    <span class="px-4 py-2 rounded-full border border-gold/20 text-gold text-[10px] uppercase tracking-widest bg-gold/5">Zanaat</span>
                </div>
            </div>
        `,
        advantages: [
            { title: "Birebir İş Eşleşmesi", desc: "Partner işe alım ajanslarımız ve Alman işveren ağımızla sizi doğru pozisyonla buluşturuyoruz.", icon: Users },
            { title: "Anerkennung Desteği", desc: "Alman makamlarından alınan 'Defizitbescheid' (Eksiklik Belgesi) analizi ve tam denklik süreç yönetimi.", icon: ShieldCheck },
            { title: "Dil ve Adaptasyon", desc: "Almanca öğreniminden, Almanya'daki bürokratik kayıtlara (Anmeldung, Sigorta) kadar her adımda mentorluk.", icon: Globe },
            { title: "Hukuki Danışmanlık", desc: "Nitelikli işgücü yasası kapsamındaki vizelerin (16d, 18, 19c) hatasız yönetimi.", icon: Award }
        ],
        destinations: [
            {
                name: "Almanya Kariyer Paketleri",
                desc: "Mesleğinize ve hedefinize özel tasarlanan kariyer yol haritalarımız.",
                cost: "Bireysel Analize Göre",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
                items: [
                    { name: "Blue Card (Mavi Kart) Danışmanlığı", slug: "#", subDesc: "Yüksek maaşlı profesyoneller için hızlı oturum." },
                    { name: "Tıp Doktoru Denklik (Approbation)", slug: "#", subDesc: "FSP ve KP sınav süreçleri için mentorluk." },
                    { name: "Mühendislik ve IT İşe Yerleştirme", slug: "#", subDesc: "Global Alman şirketlerinde kariyer fırsatları." },
                    { name: "Hemşirelik ve Sağlık Ausbildung", slug: "#", subDesc: "Lise mezunları için maaşlı eğitim ve kariyer." }
                ]
            }
        ],
        process: [
            { step: 1, title: "Nitelik Analizi", desc: "Diplomanızın, dil seviyenizin ve iş tecrübenizin Alman yasalarına uygunluğunu ölçüyoruz." },
            { step: 2, title: "Belge ve Denklik", desc: "ZAB veya ilgili Eyalet Müdürlüklerinden mesleki denklik başvurunuzu başlatıyoruz." },
            { step: 3, title: "İş Arama & Mülakat", desc: "Alman standartlarında CV/Önyazı hazırlıyor ve Alman işverenlerle mülakatlarınızı organize ediyoruz." },
            { step: 4, title: "Vize ve Yerleşim", desc: "Sözleşme sonrası vize randevunuzu alıyor, Almanya'ya vardığınızda ev bulma ve adaptasyon desteği sağlıyoruz." }
        ],
        documents: [
            "Diploma ve Transkript",
            "Mesleki Deneyim Belgeleri (SGK Dökümü)",
            "Dil Sertifikası (Telc, Goethe, ÖSD)",
            "Alman Standartlarında CV (Europass/Lebenslauf)",
            "Pasaport"
        ],
        faq: [
            { q: "Ausbildung için yaş sınırı var mı?", a: "Yasal olarak bir yaş sınırı yoktur, ancak 18-30 yaş arası kabul şansı en yüksektir." },
            { q: "Mezun olur olmaz işe başlayabilir miyim?", a: "Düzenlenmiş meslekler (Tıp, Eğitim vb.) hariç, doğrudan iş sözleşmesi ile Blue Card başvurusu yapabilirsiniz." },
            { q: "Almanca bilmeden gidebilir miyim?", a: "Yazılım gibi IT alanlarında İngilizce yeterlidir ancak çoğu meslek için en az B1/B2 Almanca aranmaktadır." }
        ]
    },
    "egitim-koclugu": {
        title: "Eğitim Koçluğu & Kariyer Planlaması",
        heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000",
        heroDesc: "Akademik hedeflerinizi belirleyin, global geleceğinizi bilimsel verilerle inşa edin.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Geleceğinizi Tesadüflere Bırakmayın</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Star Education Consulting olarak, sadece bir okul başvurusu yapmıyoruz; sizin için 5, 10 yıllık bir stratejik yol haritası çiziyoruz. Eğitim koçluğu sürecimiz, öğrencinin akademik yetkinliklerini, kişisel ilgi alanlarını ve küresel piyasa trendlerini bir araya getirerek en doğru kararı vermesini sağlar.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                    <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Neden Eğitim Koçluğu?</h3>
                    <ul class="space-y-3 italic text-sm text-zinc-500 leading-relaxed">
                        <li>• Doğru ülkede doğru bölüm seçimi</li>
                        <li>• Kişisel yetenek ve eğilim analizi</li>
                        <li>• CV hazırlama ve motivasyon mektubu mentorluğu</li>
                        <li>• Kariyer hedeflerine yönelik akademik planlama</li>
                    </ul>
                </div>
                <div class="p-8 rounded-[2rem] bg-navy text-white">
                    <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Koçluk Sürecimiz</h3>
                    <ul class="space-y-3 italic text-sm text-zinc-300 leading-relaxed">
                        <li>• 1-on-1 Mentörlük Görüşmeleri</li>
                        <li>• Akademik Takvim Takibi</li>
                        <li>• Portfolyo ve Başvuru Yönetimi</li>
                        <li>• Network ve Staj Yönlendirmesi</li>
                    </ul>
                </div>
            </div>
        `,
        advantages: [
            { title: "Bilimsel Yaklaşım", desc: "Kişisellik ve veri analizi temelli kariyer rotası.", icon: Target },
            { title: "Global Bakış", desc: "Sektörel trendlerin analizi ile geleceğin mesleklerine odaklanma.", icon: Globe },
            { title: "Uçtan Uca Destek", desc: "Başvuru anından mezuniyet sonrasına kadar yanınızdayız.", icon: Users },
            { title: "Zaman Yönetimi", desc: "Başvuru süreçlerini hatasız ve zamanında yönetiyoruz.", icon: Clock }
        ],
        process: [
            { step: 1, title: "Tanışma & Analiz", desc: "Öğrencinin akademik geçmişini ve hedeflerini dinliyoruz." },
            { step: 2, title: "Hedef Belirleme", desc: "Ülke, üniversite ve bölüm seçeneklerini daraltıyoruz." },
            { step: 3, title: "Stratejik Hazırlık", desc: "Sınav hazırlığı, CV ve portfolyo çalışmalarına başlıyoruz." },
            { step: 4, title: "Başvuru & İcracı Takip", desc: "Kabul sonrası kayıt ve vize süreçlerini yönetiyoruz." }
        ],
        documents: [
            "Lise/Üniversite Transkriptleri",
            "Referans Mektupları",
            "Kişisel Niyet Mektubu (Statement of Purpose)",
            "Sınav Sonuç Belgeleri (IELTS, TOEFL vb.)",
            "Ödüller ve Sertifikalar"
        ],
        faq: [
            { q: "Koçluk süreci ne kadar sürer?", a: "Genellikle lise 10. sınıftan başlar, üniversite mezuniyetine kadar devam edebilir; minimum 6 aylık bir hazırlık süreci önerilir." },
            { q: "Hangi ülkeler için geçerli?", a: "İngiltere, Amerika, Kanada, Almanya ve İrlanda başta olmak üzere tüm global destinasyonlar için koçluk sağlıyoruz." },
            { q: "Online hizmet veriyor musunuz?", a: "Evet, tüm koçluk ve danışmanlık görüşmelerimizi yüksek verimlilikle online platformlar üzerinden gerçekleştiriyoruz." }
        ]
    },
    "ielts": {
        title: "IELTS Hazırlık ve Kayıt Danışmanlığı",
        heroImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2000",
        heroDesc: "Akademik ve profesyonel dünyada kapıları açan anahtar. IELTS skorunuzu global standartlara taşıyoruz.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-gold/20 underline-offset-8">Dünyanın En Popüler Dil Sınavı</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">IELTS (International English Language Testing System), İngiltere, Kanada, Avustralya ve İrlanda başta olmak üzere dünya genelinde en çok kabul gören dil yeterlilik sınavıdır. StarEducation olarak, skorunuzu yükseltmek için sınav stratejileri ve başvuru desteği sunuyoruz.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                    <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Sınav Formatı</h3>
                    <ul class="space-y-3 italic text-sm text-zinc-500">
                        <li>• Listening (30 dk)</li>
                        <li>• Reading (60 dk)</li>
                        <li>• Writing (60 dk)</li>
                        <li>• Speaking (11-14 dk)</li>
                    </ul>
                </div>
                <div class="p-8 rounded-[2rem] bg-navy text-white shadow-xl relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 opacity-10">
                        <Award size={100} />
                    </div>
                    <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Skor ve Geçerlilik</h3>
                    <p class="text-sm text-zinc-300 italic mb-4">0-9 aralığında bant sistemi ile puanlanır. Akademik ve Genel Eğitim modülleri bulunur. Sertifika geçerliliği 2 yıldır.</p>
                </div>
            </div>
        `,
        advantages: [
            { title: "Evrensel Kabul", desc: "11.000'den fazla kurum ve vize dairesi tarafından %100 kabul görür.", icon: Globe },
            { title: "Sınav Stratejileri", desc: "Zaman yönetimi ve soru tiplerine özel tekniklerle skorunuzu garantiye alın.", icon: Target },
            { title: "Esnek Format", desc: "Kağıt tabanlı veya bilgisayarlı sınav seçenekleri ile konforunuza göre girin.", icon: CheckCircle2 }
        ],
        process: [
            { step: 1, title: "Seviye Belirleme", desc: "Mevcut İngilizce seviyenizi analiz ediyor, hedef skorunuzu belirliyoruz." },
            { step: 2, title: "Hedef Analizi", desc: "Başvuracağınız okulun minimum skor gereksinimlerini belirliyoruz." },
            { step: 3, title: "Stratejik Hazırlık", desc: "Zayıf olunan alanlarda (genelde Speaking/Writing) yoğunlaşan çalışma planı oluşturuyoruz." },
            { step: 4, title: "Resmi Kayıt", desc: "StarEducation danışmanlığı ile sınav tarihinizi ve merkezinizi rezerve ediyoruz." }
        ],
        documents: ["Pasaport / Kimlik", "Sınav Ücreti Dekontu"],
        faq: [
            { q: "IELTS Academic mi yoksa General mı almalıyım?", a: "Üniversite ve yüksek lisans başvuruları için 'Academic' modülü zorunludur." }
        ]
    },
    "toefl": {
        title: "TOEFL iBT Hazırlık ve Strateji",
        heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000",
        heroDesc: "ABD ve Kanada'nın altın standardı. Akademik İngilizcenizi dijital dünyada kanıtlayın.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-gold/20 underline-offset-8">Akademik Dijital Yeterlilik</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">TOEFL iBT (Test of English as a Foreign Language), özellikle Kuzey Amerika üniversitelerinde birincil kabul kriteridir. Tamamen bilgisayar tabanlı olan bu sınavda, kampüs hayatına uygun akademik dil yetkinliği ölçülür.</p>
            
            <div class="p-8 rounded-[2rem] bg-zinc-50 border border-gold/10 mb-12">
                <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Neden TOEFL?</h3>
                <p class="text-sm text-zinc-500 italic leading-relaxed">Amerikan eğitim sistemine (Ivy League dahil) en uyumlu sınavdır. Konuşma bölümünde bir insan yerine bilgisayara konuşmak, sınav heyecanını yönetmek isteyen adaylar için avantaj olabilir.</p>
            </div>
        `,
        advantages: [
            { title: "ABD & Kanada Odaklı", desc: "Amerikan üniversitelerine başvuracak adaylar için en prestijli sınavdır.", icon: School },
            { title: "Dijital Konfor", desc: "Geleneksel kağıt-kalem yerine bilgisayar üzerinden hızlı ve güvenli sınav deneyimi.", icon: Globe },
            { title: "Yapay Zeka Destekli", desc: "Objektif puanlama kriterleri ile dil seviyenizin doğru analizi.", icon: Target }
        ],
        process: [
            { step: 1, title: "Mock Test", desc: "Başlangıç seviyenizi belirlemek için deneme sınavı yapıyoruz." },
            { step: 2, title: "Teknik Eğitim", desc: "Note-taking ve Integrated Writing/Speaking tekniklerini öğretiyoruz." },
            { step: 3, title: "Başvuru Yönetimi", desc: "Skor raporlarınızın üniversitelere gönderimini organize ediyoruz." }
        ],
        documents: ["Pasaport", "Kredi Kartı (Kayıt için)"],
        faq: [
            { q: "Sınav kaç saat sürüyor?", a: "2024 güncellemeleri ile TOEFL iBT artık yaklaşık 2 saat sürmektedir." }
        ]
    },
    "sat": {
        title: "SAT (Scholastic Aptitude Test) Mentorluğu",
        heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000",
        heroDesc: "Ivy League ve Amerikan üniversiteleri için akademik pasaportunuz. Analitik zekanızı küresel ölçekte gösterin.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-gold/20 underline-offset-8">Akademik Başarının Sayısal Ölçütü</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">SAT, ABD'de lisans eğitimi almak isteyen her öğrencinin karşısına çıkan, matematik ve sözel analiz yeteneğini ölçen prestijli bir sınavdır. Yüksek SAT skoru, sadece kabul değil, aynı zamanda ciddi burs imkanları da sağlar.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div class="p-6 rounded-3xl bg-navy text-white italic">
                    <span class="text-gold font-bold block mb-2">SAT Reading & Writing</span>
                    <p class="text-xs text-zinc-400">Okuduğunu anlama, mantıksal çıkarım ve dil bilgisi.</p>
                </div>
                <div class="p-6 rounded-3xl bg-navy text-white italic">
                    <span class="text-gold font-bold block mb-2">SAT Mathematics</span>
                    <p class="text-xs text-zinc-400">Cebir, problem çözme ve veri analizi yetkinliği.</p>
                </div>
            </div>
        `,
        advantages: [
            { title: "Burs Avantajı", desc: "Yüksek skorlar, akademik burs (Merit-based) alma şansınızı %60 artırır.", icon: Award },
            { title: "Global Prestij", desc: "Dünyanın en iyi okulllarının ortak dili olan analitik yetkinlik belgesi.", icon: Trophy },
            { title: "Dijital SAT", desc: "Yeni format ile daha kısa metinler ve adaptif sınav yapısı avantajı.", icon: Clock }
        ],
        process: [
            { step: 1, title: "Teşhis Sınavı", desc: "Matematik ve İngilizce analiz kapasitenizi ölçüyoruz." },
            { step: 2, title: "Özel Planlama", desc: "Hedeflenen üniversiteye göre puan artış stratejisi belirliyoruz." },
            { step: 3, title: "Zaman Yönetimi", desc: "Soru başına saniyelerin önemli olduğu sınavda hız stratejileri." }
        ],
        documents: ["Photo ID", "College Board Hesabı"],
        faq: [
            { q: "SAT Test-Optional okullarda gerekli mi?", a: "Pek çok prestijli okul artık SAT skorunu tekrar zorunlu hale getirmektedir veya burs için kesinlikle istemektedir." }
        ]
    },
    "gre-gmat": {
        title: "GRE & GMAT Hazırlık Stratejileri",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
        heroDesc: "Dünyanın en iyi işletme ve mühendislik fakültelerine giden yol. Sayısal ve sözel yetkinliğinizi en üst seviyeye çıkarın.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Lisansüstü Kabulün Zirvesi</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Ivy League ve Top 50 üniversiteler için GRE ve GMAT skorları hayati önem taşır. GMAT işletme (MBA) odaklıyken, GRE daha geniş bir akademik yelpazeye hitap eder. StarEducation ile doğru sınavı seçin ve hedefinize ulaşın.</p>
            <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-gold/10 mb-12 italic">
                <h4 class="font-bold text-navy mb-4">GMAT Focus Edition</h4>
                <p class="text-sm text-zinc-500">Modern iş dünyası için tasarlanan yeni format; Veri Analizi, Nicel Akıl Yürütme ve Sözel Muhakeme bölümlerine odaklanır.</p>
            </div>
        `,
        advantages: [
            { title: "MBA Prestiji", desc: "GMAT Focus Edition ile modern iş dünyasına uygun yetkinlik kanıtı.", icon: Briefcase },
            { title: "Akademik Kariyer", desc: "GRE skoru ile master ve doktora kabullerinde fark yaratın.", icon: GraduationCap },
            { title: "Veri Analitiği", desc: "Yüksek sayısal skorlarla analitik kapasitenizi belgeleyin.", icon: Target }
        ],
        process: [
            { step: 1, title: "Sınav Seçimi", desc: "Alanınıza ve okulunuza göre GRE mi yoksa GMAT mi almanız gerektiğini belirliyoruz." },
            { step: 2, title: "Konu Hakimiyeti", desc: "Kritik akıl yürütme ve ileri düzey matematik stratejileri sunuyoruz." },
            { step: 3, title: "Soru Bankası Desteği", desc: "En güncel ve zorlayıcı soru tipleri ile pratik yapıyoruz." }
        ],
        documents: ["Resmi Transkript", "Pasaport"],
        faq: [
            { q: "Hangi sınav daha zor?", a: "GMAT daha çok sayısal ve lojik odaklıyken, GRE daha zengin bir kelime dağarcığı ve sözel analiz bekler." }
        ]
    },
    "mcat": {
        title: "MCAT (Medical College Admission Test) Danışmanlığı",
        heroImage: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=2000",
        heroDesc: "Geleceğin doktorları için Amerika ve Kanada'da tıbbi kariyerin ilk adımı.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-gold/20 underline-offset-8">Tıp Eğitiminin Altın Anahtarı</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">MCAT, Amerika ve Kanada'da tıp fakültesine girmek isteyen öğrenciler için geliştirilmiş oldukça zorlu ve kapsamlı bir sınavdır. Biyoloji, kimya, psikoloji ve eleştirel analiz becerilerini ölçer.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div class="p-6 rounded-[2rem] bg-navy text-white text-xs italic">
                    Biyolojik Sistemler ve Kimyasal Temeller
                </div>
                <div class="p-6 rounded-[2rem] bg-gold text-white text-xs italic">
                    Davranışsal Temeller ve Analitik Muhakeme
                </div>
            </div>
        `,
        advantages: [
            { title: "Tıbbi Kariyer", desc: "Kuzey Amerika'da tıp eğitimi için kaçınılmaz ve zorunlu bir adımdır.", icon: Award },
            { title: "Bilimsel Temel", desc: "Fen bilimleri konusundaki derinliğinizi ve analitik kapasitenizi kanıtlar.", icon: ShieldCheck },
            { title: "Analitik Derinlik", desc: "Karmaşık tıbbi metinleri analiz etme ve çözümleme yetisi.", icon: Target }
        ],
        process: [
            { step: 1, title: "Pre-Med Planlama", desc: "Sınav öncesi gerekli derslerin (prerequisites) tamamlanması." },
            { step: 2, title: "Stratejik Zamanlama", desc: "Sınavın ne zaman alınması gerektiğine dair akademik takvim planı." },
            { step: 3, title: "Sınav Simülasyonu", desc: "7 saatlik bu zorlu maraton için dayanıklılık ve hız çalışmaları." }
        ],
        documents: ["Bilimsel Transkript", "Kayıt Belgeleri"],
        faq: [
            { q: "Sınav ne kadar sürüyor?", a: "Sınav molalarla birlikte yaklaşık 7.5 saatlik bir maratondur." }
        ]
    },
    "pte": {
        title: "PTE Academic Hazırlık",
        heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000",
        heroDesc: "Hızlı, dijital ve tarafsız. İngilizce yeterliliğinizi 48 saatte belgeleyin.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Yapay Zeka Tabanlı Dil Analizi</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">PTE Academic, sonuçların hızı ve bilgisayar tabanlı objektif puanlamasıyla öne çıkar. İngiltere, Avustralya ve Yeni Zelanda vizeleri ile birçok global üniversite tarafından kabul edilir.</p>
        `,
        advantages: [
            { title: "Hızlı Sonuç", desc: "Sertifikanız genellikle 48 saat içinde e-posta adresinizde olur.", icon: Clock },
            { title: "Objektif Puanlama", desc: "Yapay zeka sistemi sayesinde insan kaynaklı hata riski sıfırdır.", icon: Target },
            { title: "Vize Dostu", desc: "Göçmenlik ve vize başvuruları için güvenilir ve hızlı çözüm.", icon: CheckCircle2 }
        ],
        process: [
            { step: 1, title: "Algoritma Eğitimi", desc: "Sınavın değerlendirme algoritmasına uygun cevaplama tekniklerini öğretiyoruz." },
            { step: 2, title: "Yoğun Hazırlık", desc: "Kısa sürede yüksek skor hedefleyen adaylar için hızlandırılmış paketler." }
        ],
        documents: ["Kimlik / Pasaport"],
        faq: [
            { q: "PTE nerede kabul edilir?", a: "İngiltere'deki tüm üniversiteler ve Avustralya göçmenlik bürosu tarafından kabul edilir." }
        ]
    }
};

export const DENKLIK_DATA: Record<string, Record<string, any>> = {
    tr: {
        "ingiltere": {
        title: "İngiltere Diploma Denklik",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">İngiltere Diploma Denklik Süreci</h2>
            <p class="mb-6">Birleşik Krallık (İngiltere, İskoçya, Galler, Kuzey İrlanda) üniversiteleri, dünya sıralamalarında en üst sıralarda yer aldığı için YÖK tarafından genellikle doğrudan tanınmaktadır. Ancak mezuniyet sonrası Türkiye'de mesleğinizi icra edebilmek için resmi denklik belgesi almanız şarttır.</p>
            <p class="mb-6">İngiltere'den alınan diplomaların denkliği, özellikle 'Level' sistemine (NQF/QCF) göre değerlendirilir. Lisans (Bachelor's) ve Yüksek Lisans (Master's) dereceleri için farklı prosedürler uygulanabilmektedir.</p>
            
            <h3 class="text-2xl font-serif font-bold text-navy mb-4 mt-8 italic">Dikkat Edilmesi Gerekenler:</h3>
            <ul class="space-y-4 mb-10 italic">
                <li class="pl-8 relative"><span class="absolute left-0 top-1 text-gold">✓</span> <strong>Süre Şartı:</strong> Lisans eğitiminin en az 3 yıl (veya hızlandırılmış programlarda kredi tamamlanmış olması), Yüksek Lisansın en az 1 tam yıl sürmüş olması beklenir.</li>
                <li class="pl-8 relative"><span class="absolute left-0 top-1 text-gold">✓</span> <strong>Apostil:</strong> İngiltere'deki eğitim belgelerinizin (Degree Certificate, Transcript) mutlaka UK Legalisation Office tarafından apostillenmiş olması gerekir.</li>
            </ul>
        `,
        advantages: [
            { title: "Hızlı Onay", desc: "Top 400 listesindeki İngiliz üniversiteleri genellikle sınavsız (STS) onay alır.", icon: "Target" },
            { title: "Global Prestij", desc: "İngiltere diploması, Türkiye'deki iş dünyasında en yüksek kabul oranına sahiptir.", icon: "Award" }
        ],
        process: [
            { step: 1, title: "Belgelerin UK'de Onaylanması", desc: "Diploma ve transkriptin Birleşik Krallık makamlarınca resmileştirilmesi." },
            { step: 2, title: "Tercüme ve Noter", desc: "Belgelerin Türkiye'de yeminli tercüme ve noter onayı yapılması." },
            { step: 3, title: "YÖK Başvurusu", desc: "Online ön başvuru ve fiziki evrak teslimi." }
        ],
        faq: [
        ]
    }
    },
    en: {
        "ingiltere": {
            title: "UK Diploma Equivalency",
            overview: `
                <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">UK Diploma Equivalency Process</h2>
                <div class="p-8 rounded-[2rem] bg-zinc-50 border border-gold/10 mb-8 italic text-zinc-600">
                    <p class="text-lg">UK universities are generally directly recognized by YÖK since they are top-ranked globally. However, you must obtain an official equivalency certificate to practice your profession in Turkey.</p>
                </div>
            `,
            advantages: [
                { title: "Fast Approval", desc: "British universities in the Top 400 list usually get approval without exams (STS).", icon: Target }
            ],
            process: [
                { step: 1, title: "Apostille in UK", desc: "Official legalization of documents by UK authorities." }
            ],
            faq: []
        },
        "amerika": {
            title: "USA Diploma Equivalency",
            overview: `
                <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">USA Education Recognition</h2>
                <p class="mb-8 text-lg text-zinc-600">U.S. degrees represent global excellence. Recognition by YÖK involves verifying regional accreditation (e.g., MSCHE, NECHE).</p>
            `,
            advantages: [
                { title: "Top Ranking Advantage", desc: "Ivy League and Tier 1 universities enjoy prestige in evaluation.", icon: Award }
            ],
            process: [
                { step: 1, title: "Federal Apostille", desc: "Documents must be authenticated at the state or federal level." }
            ],
            faq: []
        }
    }
};

// Backwards compatibility
export const DENKLIK_COUNTRIES_DATA = DENKLIK_DATA.tr;


export const PROGRAM_DATA_EN: Record<string, ProgramContent> = {
    "yurtdisi-universite": {
        title: "University Education Abroad",
        heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000",
        heroDesc: "Join the leaders of the future, from Oxford to Harvard. Build a global career with entrance without exams and scholarship opportunities.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Shaping the Leaders of Tomorrow</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">University education abroad with StarEducation is more than just a degree—it's a gateway to a borderless life. Whether you aim for the historic halls of **Oxford**, the innovation hubs of **MIT**, or the tuition-free public universities of **Germany**, we provide the strategic roadmap to your success.</p>
            
            <h2 class="text-3xl font-serif font-bold text-navy mb-10 italic underline underline-offset-8 decoration-gold/50">Global Academic Entry Standards</h2>
            <div class="overflow-x-auto mb-12 border border-gold/10 rounded-2xl shadow-premium">
                <table class="w-full text-left font-sans text-sm">
                    <thead class="bg-navy text-gold uppercase tracking-[0.2em] text-[10px]">
                        <tr>
                            <th class="p-6">Destination</th>
                            <th class="p-6">Min. GPA</th>
                            <th class="p-6">Language Proficiency</th>
                            <th class="p-6">Key Requirement</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gold/5 italic text-zinc-600">
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold text-navy">Germany</td>
                            <td class="p-4">3.0 / 4.0</td>
                            <td class="p-4 text-gold font-bold">TestDaf 4 / IELTS 6.5</td>
                            <td class="p-4">Academic Recognition</td>
                        </tr>
                        <tr class="bg-zinc-50 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold text-navy">United Kingdom</td>
                            <td class="p-4">3.2 / 4.0</td>
                            <td class="p-4 text-gold font-bold">IELTS 6.0 - 7.0</td>
                            <td class="p-4">Direct or Foundation</td>
                        </tr>
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold text-navy">USA / Canada</td>
                            <td class="p-4">2.8 - 3.8 / 4.0</td>
                            <td class="p-4 text-gold font-bold">TOEFL 80+ / IELTS 6.5</td>
                            <td class="p-4">Holistic Review</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-10 rounded-[2.5rem] bg-zinc-950 text-white shadow-2xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-gold/20 transition-all duration-700"></div>
                    <h3 class="text-2xl font-serif font-bold mb-6 italic text-gold">Elite Admissions Circle</h3>
                    <p class="text-zinc-400 leading-relaxed mb-6 italic text-sm">Our elite program for Ivy League, Oxbridge, and Top 50 universities. Strategic planning starts 2 years in advance: Portfolio design, unique extracurriculars, and interview mastery.</p>
                </div>
                <div class="p-10 rounded-[2.5rem] bg-gold text-white shadow-2xl relative">
                    <h3 class="text-2xl font-serif font-bold mb-6 italic">Estimated Annual Tuition</h3>
                    <ul class="space-y-4 font-serif italic text-lg opacity-90">
                        <li class="flex justify-between border-b border-white/20 pb-2"><span>Germany (Public)</span> <span class="font-bold">€0 - €1,500</span></li>
                        <li class="flex justify-between border-b border-white/20 pb-2"><span>UK / Ireland</span> <span class="font-bold">£15,000+</span></li>
                        <li class="flex justify-between border-b border-white/20 pb-2"><span>Europe (Central)</span> <span class="font-bold">€4,000+</span></li>
                    </ul>
                </div>
            </div>
        `,
        advantages: [
            { title: "No Exam Entry", desc: "Gain admission to the world's top 500 universities based on your high school merits and language skills.", icon: GraduationCap },
            { title: "Global Career Post-Study", desc: "Benefit from 2-3 years work permits in the UK, USA, and Canada after graduation.", icon: Briefcase },
            { title: "Scholarship Mastery", desc: "Access merit-based and talent-based scholarships to minimize your educational investment.", icon: Award },
            { title: "Future-Proof Vision", desc: "Become a global citizen with high self-confidence and a borderless professional network.", icon: Trophy }
        ],
        destinations: [
            {
                name: "United Kingdom (UK)",
                desc: "World-class education tradition. Save time with 3-year bachelor's degrees and gain 2 years of post-study work rights.",
                cost: "£14,000 - £25,000 / year",
                image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800",
                link: "/en/yurtdisi-universite/uk",
                items: [
                    { name: "University of Oxford", slug: "university-of-oxford", subDesc: "The world's best. Tutorial system and college life." },
                    { name: "University of Cambridge", slug: "university-of-cambridge", subDesc: "Heart of science and technology." }
                ]
            },
            {
                name: "Germany",
                desc: "The land of engineering and discipline. Tuition-free education at world-renowned public universities.",
                cost: "€500 - €1,500 / year",
                image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800",
                link: "/en/yurtdisi-universite/germany",
                items: [
                    { name: "TU Munich", slug: "tum", subDesc: "Europe's innovation hub." },
                    { name: "RWTH Aachen", slug: "rwth-aachen", subDesc: "Global leader in mechanical engineering." }
                ]
            }
        ],
        process: [
            { step: 1, title: "Discovery", desc: "We analyze your academic background and goals to create a 'Best Fit' university list." },
            { step: 2, title: "Application", desc: "Professional management of your SOP, CV, and application forms to ensure error-free submission." },
            { step: 3, title: "Acceptance", desc: "Managing university offers and securing your spot." },
            { step: 4, title: "Visa & Beyond", desc: "Expert visa dossier preparation and arrival support to start your new life." }
        ],
        documents: [
            "High School Diploma",
            "Official Transcript (English)",
            "IELTS / TOEFL Certificate",
            "Passport",
            "Statement of Purpose (SOP)",
            "2 Academic References",
            "Resume / CV"
        ],
        faq: [
            { q: "Can I study for free in Europe?", a: "Yes, specifically in Germany, public universities offer tuition-free education for qualified international students." },
            { q: "Is the diploma recognized globally?", a: "We only work with accredited and highly ranked universities, ensuring your degree is recognized worldwide." }
        ]
    },
    "yurtdisi-dil-okullari": {
        title: "Language Schools Abroad",
        heroImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000",
        heroDesc: "Live the language. Be a local, not a tourist. Professional language training in the world's most vibrant cities.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Master the Language, Master the World</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">The most effective way to master a language is total immersion. At StarEducation, we partner with 250+ prestigious schools in 14 countries to offer you more than just a course—it's a 24/7 cultural and professional transformation.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-10 rounded-[2.5rem] bg-navy text-white shadow-2xl relative overflow-hidden group">
                    <h3 class="text-2xl font-serif font-bold mb-6 italic text-gold">Work & Study Excellence</h3>
                    <p class="text-zinc-300 leading-relaxed mb-6 italic text-sm">Gain legal work rights while studying. Fund your education and practice 'Business English' in real-world professional environments.</p>
                    <ul class="space-y-3 text-xs text-gold/80 font-bold uppercase tracking-widest">
                        <li>• Ireland: 25 Weeks Study + 2 Months Work</li>
                        <li>• Dubai: Easy Visa + Unlimited Work Rights</li>
                        <li>• Australia: Long Term Study & Work</li>
                    </ul>
                </div>
                <div class="p-10 rounded-[2.5rem] bg-zinc-50 border border-gold/10 shadow-xl">
                    <h3 class="text-2xl font-serif font-bold mb-6 italic text-navy">Specialized Tracks</h3>
                    <ul class="space-y-4 text-xs italic text-zinc-600">
                        <li class="flex items-start gap-3"><CheckCircle2 class="text-gold shrink-0" size={14} /> <span><strong>Exam Success:</strong> Guaranteed score strategies for IELTS, TOEFL, and Cambridge.</span></li>
                        <li class="flex items-start gap-3"><CheckCircle2 class="text-gold shrink-0" size={14} /> <span><strong>Executive Language:</strong> Tailored terminology for Law, Medicine, and Global Business.</span></li>
                        <li class="flex items-start gap-3"><CheckCircle2 class="text-gold shrink-0" size={14} /> <span><strong>30+ Exclusivity:</strong> Network with professionals in your age group in dedicated centers.</span></li>
                    </ul>
                </div>
            </div>

            <h2 class="text-3xl font-serif font-bold text-navy mb-10 italic underline underline-offset-8 decoration-gold/50">Global Package Estimates</h2>
            <div class="overflow-x-auto mb-12 border border-gold/10 rounded-2xl shadow-premium">
                <table class="w-full text-left font-sans text-sm">
                    <thead class="bg-navy text-gold uppercase tracking-[0.2em] text-[10px]">
                        <tr>
                            <th class="p-6">Location</th>
                            <th class="p-6">Duration</th>
                            <th class="p-6">Estimated Tuition</th>
                            <th class="p-6">Work Rights</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gold/5 italic text-zinc-600">
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold text-navy">Ireland (Dublin)</td>
                            <td class="p-4">25 Weeks</td>
                            <td class="p-4 text-gold font-bold">€3,400 - €4,900</td>
                            <td class="p-4">Yes (20h/week)</td>
                        </tr>
                        <tr class="bg-zinc-50 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold text-navy">Malta (St. Julians)</td>
                            <td class="p-4">12 Weeks</td>
                            <td class="p-4 text-gold font-bold">€2,600 - €3,800</td>
                            <td class="p-4">Yes (After 90 days)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
        advantages: [
            { title: "20 Years of Global Trust", desc: "Benefit from our two decades of experience with transparent payment guarantees at elite schools.", icon: ShieldCheck },
            { title: "Economic Excellence", desc: "Access premium education at local prices with exclusive group discounts and scholarships.", icon: BadgePercent },
            { title: "24/7 On-Site Support", desc: "From airport pickup to accommodation support, our team is with you every step of the way.", icon: Headphones },
            { title: "Zero Agency Fees", desc: "Professional school placement and visa counseling at no additional cost to you.", icon: Users }
        ],
        destinations: [
            {
                name: "United Kingdom",
                desc: "The home of the English language. Prestigious schools in London, Cambridge, and Oxford.",
                cost: "£200 - £450 / week",
                image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=800",
                items: [
                    { name: "EC English", slug: "#", subDesc: "Modern campuses in prime locations." },
                    { name: "Kaplan International", slug: "#", subDesc: "Academic focus with specialized exam prep." }
                ]
            }
        ],
        process: [
            { step: 1, title: "Selection", desc: "Finding the best school and city based on your level and budget." },
            { step: 2, title: "Registration", desc: "Securing your spot and accommodation." },
            { step: 3, title: "Visa Support", desc: "Professional preparation of your visa application." }
        ],
        documents: ["Passport", "Academic Transcript", "Sponsor Documents"],
        faq: [
            { q: "How long does it take to learn?", a: "Usually, one level takes 8-10 weeks. For fluency, we recommend at least 24 weeks." }
        ]
    },
    "yurtdisi-yaz-okullari": {
        title: "Summer Schools & Camps",
        heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000",
        heroDesc: "Unforgettable summer experiences at the world's best universities. Academic and social growth for ages 7-17.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Academic Prestige & Summer Adventure</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Transform your child's summer into an elite period of academic and social transformation. With StarEducation, students aged 7-17 experience life at premier global hubs—from historic **Oxford** and **Cambridge** colleges to the tech-forward campuses of **UCLA** and **Yale**.</p>
            
            <div class="p-8 rounded-[2rem] bg-gold/5 border border-gold/10 mb-12">
                <h3 class="text-xl font-serif font-bold mb-6 text-navy italic">Why Choose Academic Summer Camp?</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col gap-2">
                        <span class="text-gold font-bold text-xl font-serif">A+</span>
                        <p class="text-xs text-zinc-500 italic">Experience university life early and boost academic confidence.</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-gold font-bold text-xl font-serif">24/7</span>
                        <p class="text-xs text-zinc-500 italic">Full supervision by certified school staff and our global coordinators.</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-gold font-bold text-xl font-serif">100+</span>
                        <p class="text-xs text-zinc-500 italic">Meet peers from over 100 nationalities and build a global network.</p>
                    </div>
                </div>
            </div>
        `,
        advantages: [
            { title: "Dream Campus Life", desc: "Live and learn at the world's most prestigious university campuses safely.", icon: School },
            { title: "Skill Discovery", desc: "Specialized tracks in Robotics, Coding, Arts, or Professional Sports.", icon: Target },
            { title: "Full Safety Custody", desc: "From flight pick-up to campus residents, safety is our absolute priority.", icon: ShieldCheck },
            { title: "Language Immersion", desc: "Rapid fluency through continuous social interaction and specialized classes.", icon: Languages }
        ],
        destinations: [
            {
                name: "UK Summer Programs",
                desc: "Harry Potter atmosphere in historic colleges. Sports and academic options.",
                cost: "£1,800 - £3,000 / 2 Weeks",
                image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=800",
                items: [
                    { name: "Oxford Summer Courses", slug: "#", subDesc: "High academic intensity in historic colleges." }
                ]
            }
        ],
        process: [
            { step: 1, title: "Planning", desc: "Choosing the camp based on age, interests, and safety requirements." }
        ],
        documents: ["Passport", "Parental Consent", "Health Forms"],
        faq: []
    },
    "yurtdisi-lise": {
        title: "High School Education Abroad",
        heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000",
        heroDesc: "Start your global journey at the high school level. Secure your place in top universities early.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Global Citizenship Begins at High School</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Studying high school abroad is the ultimate strategic move for elite university admissions. Master your field early through **A-Levels** in the UK, **AP/Honors** in the USA, or the prestigious **IB Diploma** worldwide with StarEducation's expert placement.</p>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div class="lg:col-span-2 p-8 rounded-[2rem] bg-navy text-white relative overflow-hidden">
                    <h3 class="text-xl font-serif font-bold mb-6 italic text-gold">Annual Fee Benchmarks</h3>
                    <div class="overflow-x-auto border border-gold/20 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <table class="w-full text-left font-sans text-sm">
                            <thead class="text-gold/50 uppercase tracking-[0.2em] text-[10px]">
                                <tr>
                                    <th class="p-6">Country</th>
                                    <th class="p-6">Curriculum</th>
                                    <th class="p-6 text-right">Tuition (Boarding)</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gold/10 italic text-zinc-100">
                                <tr class="hover:bg-white/5 transition-colors text-xs">
                                    <td class="p-4 font-bold">United Kingdom</td>
                                    <td class="p-4">A Level / IB</td>
                                    <td class="p-4 text-right text-gold">£45k – £65k</td>
                                </tr>
                                <tr class="hover:bg-white/5 transition-colors text-xs">
                                    <td class="p-4 font-bold">Canada</td>
                                    <td class="p-4">OSSD (Public/Private)</td>
                                    <td class="p-4 text-right text-gold">30k – 45k CAD</td>
                                </tr>
                                <tr class="hover:bg-white/5 transition-colors text-xs">
                                    <td class="p-4 font-bold">USA</td>
                                    <td class="p-4">AP / Diploma</td>
                                    <td class="p-4 text-right text-gold">45k – 75k USD</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                    <h3 class="text-xl font-serif font-bold mb-6 text-navy italic">Primary Entry Reqs</h3>
                    <ul class="space-y-6">
                        <li class="flex gap-4 italic text-sm text-zinc-600">
                            <CheckCircle2 class="text-gold shrink-0 mt-0.5" size={16} />
                            <div><strong>Academic Merit:</strong> Last 3 years of school transcripts.</div>
                        </li>
                        <li class="flex gap-4 italic text-sm text-zinc-600">
                            <CheckCircle2 class="text-gold shrink-0 mt-0.5" size={16} />
                            <div><strong>Proficiency:</strong> ELTiS or school-specific test scores.</div>
                        </li>
                    </ul>
                </div>
            </div>
        `,
        advantages: [
            { title: "High-Tier Admission", desc: "Boost your Top 50 university acceptance chance by up to 80% with a global diploma.", icon: Award },
            { title: "Native Fluency", desc: "Master English, French, or German at a native-speaker level in an academic context.", icon: Languages },
            { title: "Early Specialization", desc: "Focus on your future major through IB, A-Level, or AP specialized subjects.", icon: Target },
            { title: "Global Network", desc: "Form lifelong bonds with tomorrow's leaders from all continents.", icon: Globe }
        ],
        destinations: [
            {
                name: "Canada High Schools",
                desc: "Voted safest for international students. Excellent public and private options.",
                cost: "CAD 30,000+ / Year",
                image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=800",
                items: [
                    { name: "Toronto District Schools", slug: "#", subDesc: "Diverse and high-standard public education." }
                ]
            }
        ],
        process: [
            { step: 1, title: "Profile Analysis", desc: "Evaluating goals and academic history for the right fit." }
        ],
        documents: ["Transcripts", "Teacher References", "Passport"],
        faq: []
    },
    "yurtdisi-yuksek-lisans": {
        title: "Master's & Postgraduate Programs",
        heroImage: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=2000",
        heroDesc: "Take your career to a global level with prestigious postgraduate mentorship.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Elevate Your Career Trajectory</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">A Master's degree abroad is the ultimate step towards global professional authority. At StarEducation, we specialize in high-ROI programs that provide not just a diploma, but long-term residency and high-currency earning potential through **Post-Study Work** permits.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-8 rounded-[2rem] bg-gold/5 border border-gold/10 italic">
                    <h3 class="text-xl font-serif font-bold mb-4 text-navy">Foundation & Conversion</h3>
                    <p class="text-sm text-zinc-600 leading-relaxed mb-6">Want to switch fields or need to boost your GPA? Pathway/Pre-Master programs in the UK and USA bridge the gap between your current status and Top 100 university requirements.</p>
                </div>
                <div class="p-8 rounded-[2rem] bg-navy text-white relative overflow-hidden group">
                    <div class="absolute -right-4 -bottom-4 opacity-10 blur-xl w-32 h-32 bg-gold rounded-full"></div>
                    <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Post-Study Rights</h3>
                    <ul class="space-y-3 text-xs text-zinc-300">
                        <li>• UK: 2 Years Work Rights (Graduate Route)</li>
                        <li>• Germany: 18 Months Job Hunt Visa</li>
                        <li>• USA: up to 3 Years OPT (STEM)</li>
                    </ul>
                </div>
            </div>
        `,
        advantages: [
            { title: "Deep Specialization", desc: "Transition from general knowledge to niche industry authority in global centers.", icon: BookOpen },
            { title: "Professional Residency", desc: "Leverage global work permits to start your career in the UK, Europe, or North America.", icon: Briefcase },
            { title: "Strategic Network", desc: "Join an elite international alumni network of corporate and academic leaders.", icon: Trophy },
            { title: "Career ROI", desc: "Experience rapid ROI through competitive global salaries and expert placement.", icon: BadgePercent }
        ],
        process: [
            { step: 1, title: "Strategy", desc: "Aligning your undergraduate degree with the best-ranking Master's options." }
        ],
        documents: ["Bachelor's Degree", "Official Transcript", "IELTS/TOEFL", "Resume", "SOP"],
        faq: []
    },
    "denklik": {
        title: "Degree Recognition & Equivalency",
        heroImage: "https://images.unsplash.com/photo-1589330694653-93d04739eb38?q=80&w=2000",
        heroDesc: "Professional guidance for the recognition and validity of your international degrees.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Official Global Degree Recognition</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Ensure your international qualifications are fully recognized in Turkey and globally. StarEducation provides expert technical analysis through **YÖK**, **ZAB**, and **Anabin** databases to guarantee the legal validity of your academic achievements.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-8 rounded-[2rem] bg-zinc-50 border border-gold/10">
                    <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Who Needs Equivalency?</h3>
                    <ul class="space-y-3 text-xs italic text-zinc-600">
                        <li class="flex items-center gap-2"><CheckCircle2 class="text-gold" size={14} /> Candidates for public sector roles in Turkey.</li>
                        <li class="flex items-center gap-2"><CheckCircle2 class="text-gold" size={14} /> Regulated professionals (Doctors, Engineers, Lawyers).</li>
                        <li class="flex items-center gap-2"><CheckCircle2 class="text-gold" size={14} /> Those pursuing local postgraduate research.</li>
                    </ul>
                </div>
                <div class="p-8 rounded-[2rem] bg-navy text-white shadow-xl relative overflow-hidden">
                    <Award class="absolute -right-4 -bottom-4 opacity-10" size={100} />
                    <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Elite Fast-Track</h3>
                    <p class="text-xs text-zinc-300 italic leading-relaxed">Graduates from Top 400 global universities often benefit from expedited 'Recognition' protocols. We manage all technical filings to leverage these advantages.</p>
                </div>
            </div>
        `,
        advantages: [
            { title: "ZAB & Anabin Intel", desc: "Pre-verify your university status to avoid multi-year bureaucratic delays.", icon: Search },
            { title: "Premium Filing", desc: "Flawless dossier preparation in compliance with the latest global legal standards.", icon: ShieldCheck },
            { title: "Status Tracking", desc: "Active monitoring of your application through the official e-equivalency systems.", icon: Clock },
            { title: "Legal Assurance", desc: "Strategic advice for 'Level Detection Exams' (STS) where mandatory.", icon: Award }
        ],
        process: [
            { step: 1, title: "Verification", desc: "Authenticating university recognition in international databases." }
        ],
        documents: ["Original Diploma", "Apostilles", "Official Translations"],
        faq: []
    },
    "kariyer": {
        title: "International Career & Ausbildung",
        heroImage: "https://images.unsplash.com/photo-1521737711867-e3b904787ce7?q=80&w=2000",
        heroDesc: "Your bridge to professional life in Germany and Europe. Experts in vocational training and specialist placement.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Architecting Your European Career</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Unlock the potential of the European labor market. Leveraging Germany's **Chancenkarte** and the new Skilled Immigration Act, StarEducation connects you with elite employers and high-demand vocational training (Ausbildung) pathways.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="group p-8 rounded-[3rem] bg-white border border-gold/10 hover:border-gold/30 transition-all shadow-sm hover:shadow-xl relative overflow-hidden">
                    <h4 class="font-serif font-bold text-xl text-navy mb-4 italic">Vocational Training (Ausbildung)</h4>
                    <p class="text-sm text-zinc-500 leading-relaxed italic">The unique Dual System: Earn a competitive monthly salary while you learn your craft in world-class German companies.</p>
                </div>
                <div class="group p-8 rounded-[3rem] bg-navy text-white shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-bl-full"></div>
                    <h4 class="font-serif font-bold text-xl text-gold mb-4 italic">Professional Placement</h4>
                    <p class="text-sm text-zinc-300 leading-relaxed italic">Targeted recruitment for Doctors, Engineers, and IT specialists. We manage your Anerkennung (recognition) and mentorship.</p>
                </div>
            </div>
        `,
        advantages: [
            { title: "Direct Employer Match", desc: "Access our exclusive network of German and European hiring agencies.", icon: Users },
            { title: "Full Recognition Support", desc: "Step-by-step guidance for professional licensure (Approbation, etc.) in Europe.", icon: ShieldCheck },
            { title: "Language Mentor", desc: "Strategic plans to reach the required B1/B2/C1 levels for professional practice.", icon: Globe },
            { title: "Legal Visa Strategy", desc: "Expert handling of Skilled Worker, EU Blue Card, and Opportunity Card visas.", icon: Award }
        ],
        process: [
            { step: 1, title: "Qualification Scan", desc: "Evaluating your background against European labor market needs." }
        ],
        documents: ["Diploma", "Experience Records", "Language Certificates"],
        faq: []
    },
    "ielts": {
        title: "IELTS Preparation & Counseling",
        heroImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2000",
        heroDesc: "The key to unlocking global opportunities. We elevate your IELTS score to meet world-class standards.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-gold/20 underline-offset-8">The World's Preeminent Language Test</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">IELTS is the premier choice for students targeting the UK, Canada, Australia, and Ireland. At StarEducation, we provide professional strategy and application support to ensure you reach your target band score with precision.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                    <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Exam Architecture</h3>
                    <ul class="space-y-3 italic text-sm text-zinc-500">
                        <li>• Listening (30 min)</li>
                        <li>• Reading (60 min)</li>
                        <li>• Writing (60 min)</li>
                        <li>• Speaking (11-14 min)</li>
                    </ul>
                </div>
                <div class="p-8 rounded-[2rem] bg-navy text-white shadow-xl relative overflow-hidden">
                    <div class="absolute -right-4 -bottom-4 opacity-10">
                        <Award size={100} />
                    </div>
                    <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Scoring & Validity</h3>
                    <p class="text-sm text-zinc-300 italic mb-4">Graded on a 0-9 band system. Academic and General Training modules available. Valid for 2 years.</p>
                </div>
            </div>
        `,
        advantages: [
            { title: "Universal Acceptance", desc: "Accepted by over 11,000 institutions and visa offices worldwide.", icon: Globe },
            { title: "Score Optimization", desc: "Master time management and specific question types with our experts.", icon: Target },
            { title: "Flexible Delivery", desc: "Choose between paper-based or computer-delivered formats for your comfort.", icon: CheckCircle2 }
        ],
        process: [
            { step: 1, title: "Diagnostic Analysis", desc: "Evaluating your current level and defining your target score." },
            { step: 2, title: "Strategic Roadmap", desc: "Developing a study plan focused on your specific growth areas (typically Writing/Speaking)." },
            { step: 3, title: "Official Booking", desc: "Securing your test date and preferred venue through our partner network." }
        ],
        documents: ["Passport / ID", "Payment Confirmation"],
        faq: [
            { q: "Academic or General Training?", a: "For university and Master's admissions, the 'Academic' module is mandatory." }
        ]
    },
    "toefl": {
        title: "TOEFL iBT Strategy Hub",
        heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000",
        heroDesc: "The gold standard for the US and Canada. Prove your academic English in the digital world.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-gold/20 underline-offset-8">Academic Digital Proficiency</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">TOEFL iBT is the primary credential for students aiming at prestigious US and Canadian institutions. This computer-based exam mirrors real-world campus scenarios, ensuring your readiness for elite academic environments.</p>
            
            <div class="p-8 rounded-[2rem] bg-zinc-50 border border-gold/10 mb-12">
                <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Why TOEFL?</h3>
                <p class="text-sm text-zinc-500 italic leading-relaxed">It is the most compatible exam for the American education system (including Ivy League). For candidates who prefer speaking to a computer rather than a person, the format can be a significant advantage in managing exam anxiety.</p>
            </div>
        `,
        advantages: [
            { title: "US & Canada Focused", desc: "Highly preferred by Ivy League and Tier 1 institutions.", icon: School },
            { title: "Digital Comfort", desc: "A streamlined, secure computer-based testing experience.", icon: Globe },
            { title: "AI-Powered Scoring", desc: "Objective evaluation criteria for an accurate reflection of your skills.", icon: Target }
        ],
        process: [
            { step: 1, title: "Initial Assessment", desc: "Pinpointing your strengths and weaknesses through an authentic mock test." },
            { step: 2, title: "Integrated Skills", desc: "Focused training on integrated Writing and speaking tasks." },
            { step: 3, title: "Score Reporting", desc: "Organizing the official transmission of your scores to target universities." }
        ],
        documents: ["Passport", "Credit Card (for registration)"],
        faq: [
            { q: "How long is the test?", a: "With the latest 2024 updates, TOEFL iBT now takes approximately 2 hours." }
        ]
    },
    "sat": {
        title: "SAT (Scholastic Aptitude Test) Mentorship",
        heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000",
        heroDesc: "Your academic passport to Ivy League and prestige US universities. Showcase your analytical depth globally.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-gold/20 underline-offset-8">Measuring Academic Potential</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">The SAT is a globally recognized admissions test used by prestigious US colleges to measure analytical and critical thinking. A high score is often the differentiator for elite admissions and merit-based scholarships.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div class="p-6 rounded-3xl bg-navy text-white italic">
                    <span class="text-gold font-bold block mb-2">SAT Reading & Writing</span>
                    <p class="text-xs text-zinc-400">Reading comprehension, logical inference, and grammar mastery.</p>
                </div>
                <div class="p-6 rounded-3xl bg-navy text-white italic">
                    <span class="text-gold font-bold block mb-2">SAT Mathematics</span>
                    <p class="text-xs text-zinc-400">Algebra, problem solving, and advanced data analysis.</p>
                </div>
            </div>
        `,
        advantages: [
            { title: "Scholarship Leverage", desc: "High scores significantly increase your eligibility for merit-based financial aid.", icon: Award },
            { title: "Global Prestige", desc: "Showcase your analytical depth to the world's most selective schools.", icon: Trophy },
            { title: "Enhanced Digital Format", desc: "Benefiting from a shorter, more adaptive exam structure.", icon: Clock }
        ],
        process: [
            { step: 1, title: "Metric Analysis", desc: "Deep-diving into your mathematical and verbal analytical capacity." },
            { step: 2, title: "Tactical Execution", desc: "Strategic time-management and advanced problem-solving techniques." },
            { step: 3, title: "Honing Speed", desc: "Drilling speed strategies where every second is critical for higher scoring." }
        ],
        documents: ["Photo ID", "College Board Account"],
        faq: [
            { q: "Is SAT still relevant with test-optional policies?", a: "Yes, elite institutions are returning to mandatory SAT requirements, and it remains critical for scholarships." }
        ]
    },
    "gre-gmat": {
        title: "GRE & GMAT Elite Strategies",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
        heroDesc: "The path to the world's premier business and engineering schools. Maximize your quantitative and verbal authority.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Advanced Graduate Admissions</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">For Ivy League Graduate programs and top-tier MBAs, GRE and GMAT scores are non-negotiable markers of authority. StarEducation helps you choose the right path and master the complexity of these elite exams.</p>
            <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-gold/10 mb-12 italic">
                <h4 class="font-bold text-navy mb-4">GMAT Focus Edition</h4>
                <p class="text-sm text-zinc-500">Designed for the modern business world; focusing on Data Insights, Quantitative Reasoning, and Verbal Reasoning.</p>
            </div>
        `,
        advantages: [
            { title: "Business Logic (GMAT)", desc: "Tailored for success in high-stakes MBA and management environments.", icon: Briefcase },
            { title: "Academic Rigor (GRE)", desc: "Universal recognition for Master's and PhD programs across all fields.", icon: GraduationCap },
            { title: "Quantitative Depth", desc: "Demonstrate superior analytical intelligence to global selectors.", icon: Target }
        ],
        process: [
            { step: 1, title: "Exam Selection", desc: "Determining the best fit based on your target program and skills." },
            { step: 2, title: "Strategic Preparation", desc: "Mastering complex reasoning and data-intensive tasks." },
            { step: 3, title: "Advanced Question Bank", desc: "Practicing with the most challenging and current question types." }
        ],
        documents: ["Official Transcripts", "Passport"],
        faq: [
            { q: "Which one is right for me?", a: "GMAT is preferred for MBA/Business, while GRE is more versatile for academic research and diverse Master's degrees." }
        ]
    },
    "mcat": {
        title: "MCAT (Medical College Admission Test) Hub",
        heroImage: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=2000",
        heroDesc: "The first step toward a prestigious medical career in North America.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-gold/20 underline-offset-8">Scientific Excellence for Medicine</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">The MCAT is a highly competitive exam required for admission to medical schools in the US and Canada. It rigorously tests biology, chemistry, and behavioral sciences alongside critical reasoning.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-center">
                <div class="p-6 rounded-[2rem] bg-navy text-white text-xs italic">
                    Biological Systems & Chemical Foundations
                </div>
                <div class="p-6 rounded-[2rem] bg-gold text-white text-xs italic">
                    Behavioral Foundations & Analytical Reasoning
                </div>
            </div>
        `,
        advantages: [
            { title: "Pre-Med Authority", desc: "Mandatory for all medical doctor (MD) aspirants in the US and Canada.", icon: Award },
            { title: "Scientific Mastery", desc: "Prove your depth in core sciences and analytical precision.", icon: ShieldCheck },
            { title: "Analytical Depth", desc: "The ability to analyze and deconstruct complex medical texts.", icon: Target }
        ],
        process: [
            { step: 1, title: "Pre-Med Checklist", desc: "Verifying all scientific prerequisites are met before the exam." },
            { step: 2, title: "Strategic Timing", desc: "Academic calendar planning for when to ideally take the exam." },
            { step: 3, title: "Endurance Prep", desc: "Training for the 7.5-hour digital testing marathon." }
        ],
        documents: ["Science Transcripts", "Registration Files"],
        faq: [
            { q: "How long is the test?", a: "Including breaks, the MCAT marathon lasts approximately 7.5 hours." }
        ]
    },
    "pte": {
        title: "PTE Academic Mastery",
        heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000",
        heroDesc: "Fast, digital, and unbiased. English proficiency certificate in 48 hours.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">AI-Driven Language Intelligence</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">PTE Academic is the fastest way to prove your English proficiency. Recognized by the UK and Australian governments for visas, it offers an objective, AI-scored testing experience.</p>
        `,
        advantages: [
            { title: "Urgent Reliability", desc: "Typically receive your results within 48 hours of testing.", icon: Clock },
            { title: "Objective AI Results", desc: "Eliminating human bias with advanced machine-learning scoring.", icon: Target },
            { title: "Visa Integration", desc: "Seamless recognition for global immigration and work permits.", icon: CheckCircle2 }
        ],
        process: [
            { step: 1, title: "Algorithm Focus", desc: "Learning to bridge the gap between human speech and AI detection standards." },
            { step: 2, title: "Intensive Sprints", desc: "Accelerated preparation for candidates needing high scores in minimal time." }
        ],
        documents: ["Photo ID / Passport"],
        faq: [
            { q: "Is PTE accepted for UK visas?", a: "Yes, it is 100% accepted for all Tiers of UK student and work visas." }
        ]
    }
};

export const PROGRAM_DATA_DE: Record<string, ProgramContent> = {
    "yurtdisi-universite": {
        title: "Universitätsstudium im Ausland",
        heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000",
        heroDesc: "Schließen Sie sich den Führungskräften der Zukunft an, von Oxford bis Harvard. Starten Sie Ihre globale Karriere mit prüfungsfreiem Zugang und Stipendienmöglichkeiten.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Türen zu einer globalen Zukunft</h2>
            <p class="mb-6">Ein Universitätsstudium im Ausland mit StarEducation ist nicht nur ein Diplom, sondern das Öffnen der Tür zu einem Leben ohne Grenzen. Sie können Ihren Abschluss in 3 Jahren im Vereinigten Königreich machen und früher in den Beruf einsteigen, Ihre Talente im 'Liberal Arts'-System der USA entdecken oder eine kostenlose Ingenieursausbildung in Deutschland erhalten.</p>
            
            <h2 class="text-3xl font-serif font-bold text-navy mb-10 italic underline underline-offset-8 decoration-gold/50">Akademische Zulassungsvoraussetzungen</h2>
            <div class="overflow-x-auto mb-10 border border-gold/10 shadow-sm">
                <table class="w-full text-left font-sans text-sm">
                    <thead class="bg-navy text-gold uppercase tracking-widest text-[10px]">
                        <tr>
                            <th class="p-6">Land</th>
                            <th class="p-6">Min. Notenschnitt</th>
                            <th class="p-6">Sprachnachweis</th>
                            <th class="p-6">Voraussetzung / Prüfung</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gold/5 italic">
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">Deutschland</td>
                            <td class="p-4">75 / 100</td>
                            <td class="p-4 text-gold">TestDaf 4 / IELTS 6.5</td>
                            <td class="p-4 font-bold text-navy">Hochschulzugang Ber.</td>
                        </tr>
                        <tr class="bg-gold/5 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold">Großbritannien</td>
                            <td class="p-4">80 / 100</td>
                            <td class="p-4 text-gold">IELTS 6.0 - 6.5</td>
                            <td class="p-4">Direktaufnahme / Foundation</td>
                        </tr>
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">Italien</td>
                            <td class="p-4">70 / 100</td>
                            <td class="p-4 text-gold">IELTS 6.0 / B2 Englisch</td>
                            <td class="p-4">Aufnahmeprüfungen (IMAT etc.)</td>
                        </tr>
                        <tr class="bg-gold/5 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold">Polen / Ungarn</td>
                            <td class="p-4">65 / 100</td>
                            <td class="p-4 text-gold">IELTS 5.5 - 6.0</td>
                            <td class="p-4">Keine Prüfung / Interview</td>
                        </tr>
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">USA / Kanada</td>
                            <td class="p-4">2.5 - 3.5 / 4.0</td>
                            <td class="p-4">SAT / ACT Optional</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-3xl font-serif font-bold text-navy mb-10 italic underline underline-offset-8 decoration-gold/50">Geschätzte Studiengebühren (Jährlich)</h2>
            <div class="overflow-x-auto mb-10 border border-gold/10 shadow-sm">
                <table class="w-full text-left font-sans text-sm">
                    <thead class="bg-navy text-gold uppercase tracking-widest text-[10px]">
                        <tr>
                            <th class="p-6">Land</th>
                            <th class="p-6">Studiengebühr (Jährlich)</th>
                            <th class="p-6">Lebenshaltungskosten (Monatlich)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gold/5 italic">
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">Deutschland</td>
                            <td class="p-4 text-gold font-bold">Kostenlos (Staatlich)</td>
                            <td class="p-4">€950 - €1.200 / Monat</td>
                        </tr>
                        <tr class="bg-gold/5 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold">Großbritannien</td>
                            <td class="p-4 text-gold font-bold">£14.000 - £28.000</td>
                            <td class="p-4">£1.100 - £1.600 / Monat</td>
                        </tr>
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">Polen / Ungarn</td>
                            <td class="p-4 text-gold font-bold">€3.500 - €8.000</td>
                            <td class="p-4">€600 - €850 / Monat</td>
                        </tr>
                        <tr class="bg-gold/5 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold">USA / Kanada</td>
                            <td class="p-4 text-gold font-bold">$22.000 - $55.000</td>
                            <td class="p-4">$1.200 - $2.500 / Monat</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
        advantages: [
            { title: "Direkte Akzeptanz", desc: "Kein Prüfungsstress. Platzierung an Top-500-Universitäten basierend auf Notenschnitt und Sprachniveau.", icon: Globe },
            { title: "Karrierepfad", desc: "Arbeitsvisum nach dem Studium (2-3 Jahre) in UK, USA und Kanada zum Aufbau Ihrer globalen Karriere.", icon: Briefcase },
            { title: "Kostengünstig", desc: "Von der kostenlosen Ausbildung in Deutschland bis hin zu Stipendien in den USA ist erstklassige Bildung zugänglich.", icon: Users }
        ],
        destinations: [
            {
                name: "Großbritannien (UK)",
                desc: "Weltklasse-Bildungstradition. Sparen Sie Zeit mit 3-jährigen Bachelor-Abschlüssen und erhalten Sie 2 Jahre Arbeitsrecht nach dem Studium.",
                cost: "£14.000 - £25.000 / Jahr",
                image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800",
                items: [
                    { name: "Universität Oxford", slug: "university-of-oxford", subDesc: "Die weltbeste Universität. Tutorial-System und College-Leben." },
                    { name: "Universität Cambridge", slug: "university-of-cambridge", subDesc: "Herz der Wissenschaft und Technologie." }
                ]
            },
            {
                name: "Deutschland",
                desc: "Das Land des Ingenieurwesens und der Disziplin. Kostenlose Ausbildung an weltberühmten staatlichen Universitäten.",
                cost: "€500 - €1.500 / Jahr",
                image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800",
                items: [
                    { name: "TU München", slug: "tum", subDesc: "Europas Innovationszentrum." },
                    { name: "RWTH Aachen", slug: "rwth-aachen", subDesc: "Weltweit führend im Maschinenbau." }
                ]
            }
        ],
        process: [
            { step: 1, title: "Analyse", desc: "Wir analysieren Ihren akademischen Hintergrund und Ihre Ziele, um die perfekte Universitätsliste zu erstellen." },
            { step: 2, title: "Bewerbung", desc: "Professionelles Management Ihres Motivationsschreibens, Lebenslaufs und der Bewerbungsformulare." },
            { step: 3, title: "Annahme", desc: "Verwaltung von Hochschulangeboten und Sicherung Ihres Platzes." },
            { step: 4, title: "Visum & Mehr", desc: "Vorbereitung des Visumsantrags und Unterstützung bei der Ankunft, um Ihr neues Leben zu beginnen." }
        ],
        documents: [
            "Abiturzeugnis / Schulabschluss",
            "Offizielles Transkript (Englisch/Deutsch)",
            "IELTS / TOEFL Zertifikat",
            "Reisepass",
            "Motivationsschreiben (SOP)",
            "2 Akademische Referenzen",
            "Lebenslauf / CV"
        ],
        faq: [
            { q: "Kann ich in Europa kostenlos studieren?", a: "Ja, vor allem in Deutschland bieten staatliche Universitäten qualifizierten internationalen Studierenden eine gebührenfreie Ausbildung an." },
            { q: "Ist das Diplom weltweit anerkannt?", a: "Wir arbeiten nur mit akkreditierten und hochrangigen Universitäten zusammen, um sicherzustellen, dass Ihr Abschluss weltweit anerkannt wird." }
        ]
    },
    "yurtdisi-dil-okullari": {
        title: "Sprachschulen im Ausland",
        heroImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000",
        heroDesc: "Leben Sie die Sprache. Professionelles Training in den lebendigsten Städten der Welt.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Akademische Sprach-Immersion</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Lernen Sie Englisch in London, New York oder Malta durch tägliches Eintauchen. Bei StarEducation finden wir das perfekte Programm für Ihre Ziele.</p>
        `,
        advantages: [
            { title: "Praxisorientiert", desc: "Sofortige Anwendung in realen Situationen.", icon: MessageSquare },
            { title: "Akkreditiert", desc: "Wir arbeiten ausschließlich mit zertifizierten Qualitätsschulen.", icon: ShieldCheck }
        ],
        process: [
            { step: 1, title: "Auswahl", desc: "Wir finden die beste Schule basierend auf Ihrem Budget." }
        ],
        documents: ["Reisepass"],
        faq: []
    },
    "yurtdisi-yaz-okullari": {
        title: "Sommerferien & Camps",
        heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000",
        heroDesc: "Unvergessliche Sommererlebnisse an den besten Universitäten der Welt. Für 7-17 Jährige.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Akademisches Prestige & Sommerabenteuer</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Verwandeln Sie den Sommer Ihres Kindes in eine Zeit des akademischen und sozialen Wachstums. Mit StarEducation erleben Schüler im Alter von 7-17 Jahren das Leben an erstklassigen globalen Standorten—von Oxford bis Yale.</p>
            
            <div class="p-8 rounded-[2rem] bg-gold/5 border border-gold/10 mb-12">
                <h3 class="text-xl font-serif font-bold mb-6 text-navy italic">Warum ein akademisches Sommercamp?</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col gap-2">
                        <span class="text-gold font-bold text-xl font-serif">A+</span>
                        <p class="text-xs text-zinc-500 italic">Frühzeitiges Kennenlernen des Universitätslebens.</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-gold font-bold text-xl font-serif">24/7</span>
                        <p class="text-xs text-zinc-500 italic">Vollständige Betreuung durch zertifiziertes Personal.</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-gold font-bold text-xl font-serif">100+</span>
                        <p class="text-xs text-zinc-500 italic">Kontakte zu Gleichaltrigen aus über 100 Nationen.</p>
                    </div>
                </div>
            </div>
        `,
        advantages: [
            { title: "Campus-Erfahrung", desc: "Leben und lernen Sie an den am meisten besuchten Universitätsstandorten.", icon: School },
            { title: "Sicherheit", desc: "Sicherheit ist unsere oberste Priorität bei jeder Aktivität.", icon: ShieldCheck },
            { title: "Talentförderung", desc: "Spezialisierte Kurse für Coding, Kunst oder Sport.", icon: Target },
            { title: "Sprachfortschritt", desc: "Schnelle Fortschritte durch tägliche soziale Interaktion.", icon: Languages }
        ],
        process: [],
        documents: ["Reisepass", "Einverständniserklärung"],
        faq: []
    },

    "yurtdisi-lise": {
        title: "Schulaustausch & High School im Ausland",
        heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000",
        heroDesc: "Der beste Grundstein für eine weltweite Karriere. Starten Sie bereits während der Schulzeit.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Globale Bürgerschaft beginnt in der High School</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Ein High-School-Jahr im Ausland ist der ultimative strategische Schritt für Zulassungen an Elite-Universitäten. Bereiten Sie sich optimal vor mit A-Levels, AP oder dem IB Diploma.</p>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div class="p-8 rounded-[2rem] bg-navy text-white relative overflow-hidden">
                    <h3 class="text-xl font-serif font-bold mb-6 italic text-gold">Programmschwerpunkte</h3>
                    <ul class="space-y-4 text-xs text-zinc-300">
                        <li class="flex items-center gap-2 font-bold text-gold">• Großbritannien (Boarding Schools)</li>
                        <li class="flex items-center gap-2">• Kanada (Public & Private)</li>
                        <li class="flex items-center gap-2">• USA (F-1 & J-1 Programme)</li>
                    </ul>
                </div>
                <div class="p-8 rounded-[2rem] bg-zinc-50 border border-gold/10 italic">
                    <h3 class="text-xl font-serif font-bold mb-4 text-navy">Akademische Vorteile</h3>
                    <p class="text-sm text-zinc-500 leading-relaxed italic">Internationale Abschlüsse erhöhen die Zulassungschancen an Top-50 Universitäten weltweit um bis zu 80%.</p>
                </div>
            </div>
        `,
        advantages: [
            { title: "Akademischer Vorteil", desc: "Höhere Zulassungsraten für Top-Universitäten nach einem Auslandsabschluss.", icon: Award },
            { title: "Native Fluency", desc: "Beherrschen Sie Englisch oder Deutsch auf Muttersprachler-Niveau.", icon: Languages },
            { title: "Charakterbildung", desc: "Entwickeln Sie Unabhängigkeit und globale Visionen.", icon: Globe },
            { title: "Elite-Netzwerk", desc: "Bilden Sie lebenslange Freundschaften mit den Führungskräften von morgen.", icon: Users }
        ],
        process: [],
        documents: ["Zeugnisse", "Referenzen"],
        faq: []
    },

    "yurtdisi-yuksek-lisans": {
        title: "Master & Postgraduale Programme",
        heroImage: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=2000",
        heroDesc: "Heben Sie Ihre Karriere auf ein globales Niveau mit prestigeträchtiger postgradualer Betreuung.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic hover:text-gold transition-colors duration-500 underline decoration-gold/20 underline-offset-8">Beschleunigen Sie Ihren Karriereweg</h2>
            <p class="mb-8 text-lg leading-relaxed text-zinc-600">Ein Master-Abschluss im Ausland ist der ultimative Schritt zur globalen beruflichen Autorität. Wir spezialisieren uns auf Programme mit hohem ROI und Arbeitsrechten nach dem Studium (PSW).</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="p-8 rounded-[2rem] bg-gold/5 border border-gold/10 italic">
                    <h3 class="text-xl font-serif font-bold mb-4 text-navy">Pathway & Konversion</h3>
                    <p class="text-sm text-zinc-600 leading-relaxed mb-6">Möchten Sie das Fachgebiet wechseln oder Ihren Notenschnitt verbessern? Bridge-Programme ebnen Ihnen den Weg.</p>
                </div>
                <div class="p-8 rounded-[2rem] bg-navy text-white shadow-xl relative overflow-hidden">
                    <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">PSW Rechte</h3>
                    <ul class="space-y-3 text-xs text-zinc-300">
                        <li>• UK: 2 Jahre Arbeitsrecht</li>
                        <li>• Deutschland: 18 Monate Jobsuche</li>
                        <li>• Kanada: bis zu 3 Jahre PGWP</li>
                    </ul>
                </div>
            </div>
        `,
        advantages: [
            { title: "Spezialisierung", desc: "Entwickeln Sie tiefgehendes Fachwissen in globalen Wirtschaftszentren.", icon: BookOpen },
            { title: "Globale Karriere", desc: "Nutzen Sie Arbeitsgenehmigungen, um Ihre Karriere im Ausland zu starten.", icon: Briefcase },
            { title: "Prestige", desc: "Profitieren Sie vom Ansehen international renommierter Institutionen.", icon: Award },
            { title: "Netzwerk", desc: "Treten Sie einem globalen Alumni-Netzwerk bei.", icon: Users }
        ],
        process: [],
        documents: ["Bachelor-Abschluss", "Transkript", "Sprachzertifikat", "Lebenslauf"],
        faq: []
    },
    "denklik": {
        title: "Anerkennung & Gleichwertigkeit",
        heroImage: "https://images.unsplash.com/photo-1589330694653-93d04739eb38?q=80&w=2000",
        heroDesc: "Professionelle Unterstützung bei der Anerkennung Ihrer internationalen Abschlüsse.",
        overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Anerkennungs-Service</h2>
            <p class="mb-6">Wir unterstützen Sie bei YÖK-, ZAB- und Anabin-Verfahren für Bachelor- und Masterabschlüsse.</p>
        `,
        advantages: [
            { title: "ZAB & Anabin Analyse", desc: "Wir prüfen den H+ Status Ihrer Universität vorab.", icon: Search },
            { title: "Unterlagenvorbereitung", desc: "Wir bereiten professionelle, gesetzeskonforme Dossiers vor.", icon: ShieldCheck }
        ],
        process: [
            { step: 1, title: "Vorabprüfung", desc: "Wir analysieren die Anerkennung Ihrer Universität." }
        ],
        documents: ["Original Diplom", "Apostille", "Beglaubigte Übersetzungen"],
        faq: []
    }
};

export const getProgramData = (slug: string, locale: string): ProgramContent | undefined => {
    const dataMap: Record<string, Record<string, ProgramContent>> = {
        tr: PROGRAM_DATA_TR,
        en: PROGRAM_DATA_EN,
        de: PROGRAM_DATA_DE
    };
    
    const localeData = dataMap[locale] || dataMap.tr;
    return localeData[slug] || dataMap.tr[slug];
};

export const getDenklikCountryData = (countrySlug: string, locale: string) => {
    const localeData = DENKLIK_DATA[locale] || DENKLIK_DATA.tr;
    return localeData[countrySlug] || (DENKLIK_DATA.tr ? DENKLIK_DATA.tr[countrySlug] : null);
};

export const getUniversityCountryData = (countrySlug: string, locale: string) => {
    const localeData = UNIVERSITY_DATA[locale] || UNIVERSITY_DATA.tr;
    return localeData[countrySlug] || (UNIVERSITY_DATA.tr ? UNIVERSITY_DATA.tr[countrySlug] : null);
};

