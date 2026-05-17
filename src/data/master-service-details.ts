export interface MasterUniversity {
  slug: string;
  name: string;
  ranking: string;
  worldRanking: string;
  annualTuition: string;
  highlights: string[];
  departments: string[];
  detailedDescription: string;
}

export interface MasterServiceDetail {
  overview: string;
  advantages: { title: string; desc: string }[];
  process: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  universities?: MasterUniversity[];
}

export const masterServiceDetails: Record<string, MasterServiceDetail> = {
  italya: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">İtalya'da Yüksek Lisans: Sanat, Tasarım ve Bilimin Merkezi</h2>
      <p class="mb-6">İtalya, Avrupa'nın en köklü üniversitelerine ev sahipliği yaparken, son yıllarda İngilizce master programlarındaki artışla uluslararası öğrenciler için bir cazibe merkezi haline gelmiştir. Tasarım, moda, mimarlık ve mühendislik alanlarında dünya lideri olan İtalya, aynı zamanda tıp ve sosyal bilimlerde de üst düzey eğitim sunar.</p>
      <p class="mb-6">Üniversiteler genellikle devlet (università statale) ve özel (università privata) olarak ikiye ayrılır. İngilizce sunulan program sayısı her geçen gün artmaktadır, bu da İtalyanca bilmeyen öğrenciler için büyük bir avantajdır.</p>
      <p class="mb-6">Mentor Career olarak, Universitaly ön kayıt süreci, portfolyo hazırlığı (tasarım alanları için), burs başvuruları (DSU vb.) ve kayıt danışmanlığı konularında kapsamlı destek sunuyoruz.</p>
    `,
    advantages: [
      { title: "Dünya Çapında Prestij", desc: "Politecnico di Milano, Sapienza ve Bocconi gibi küresel çapta tanınan kurumlardan mezuniyet." },
      { title: "Ekonomik Eğitim", desc: "Devlet üniversitelerinde harçlar aile gelirine göre düzenlenir ve birçok Avrupa ülkesine göre çok daha uygundur." },
      { title: "Geniş Burs İmkanları", desc: "DSU (Diritto allo Studio Universitario) gibi bölgesel burslar ile hem harç indirimi hem de nakit desteği sağlanabilir." },
      { title: "Kültürel ve Tarihi Zenginlik", desc: "Eğitim alırken Avrupa medeniyetinin beşiğinde yaşama ve sanatla iç içe olma fırsatı." }
    ],
    process: [
      { title: "Program ve Üniversite Seçimi", desc: "Akademik geçmişinize and kariyer hedeflerinize en uygun İngilizce programların belirlenmesi." },
      { title: "Universitaly Ön Kayıt", desc: "İtalya Eğitim Bakanlığı portalı üzerinden resmi ön kayıt işlemlerinin başlatılması." },
      { title: "Başvuru ve Kabul", desc: "Gerekli belgelerin (transkript, dil belgesi, portfolyo vb.) hazırlanarak üniversitelere sunulması." },
      { title: "Kayıt ve DOV", desc: "Kayıt başvurusu için gerekli olan Dichiarazione di Valore (Değer Beyanı) veya CIMEA sertifikasının alınması." }
    ],
    faq: [
      { q: "İngilizce programlar var mı?", a: "Evet, özellikle yüksek lisans düzeyinde yüzlerce program %100 İngilizce olarak sunulmaktadır." },
      { q: "İtalya'da master süresi ne kadardır?", a: "Yüksek lisans programları (Laurea Magistrale) genellikle 2 yıl sürer; bazı özel master programları 1 yıl olabilir." },
      { q: "Eğitim harçları ne kadar?", a: "Devlet üniversitelerinde yıllık harçlar genellikle 150€ ile 3.500€ arasında değişir." },
      { q: "Çalışma izni var mı?", a: "Öğrencilerin haftada 20 saate kadar yasal çalışma izni bulunmaktadır." }
    ],
    universities: [
      {
        slug: "bocconi-master",
        name: "Bocconi University",
        ranking: "#1 in Italy (Business)",
        worldRanking: "#4 in World (Finance)",
        annualTuition: "€14,000 - €16,000",
        highlights: ["Finans ve Yönetim Lideri", "Global Networking"],
        departments: ["International Management", "Finance", "Data Science", "Luxury Management"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Bocconi Üniversitesi, işletme, ekonomi ve hukuk alanlarında Avrupa'nın en prestijli eğitim kurumlarından biri olarak kabul edilir. Milano'nun dinamik atmosferinde yer alan okul, öğrencilerine sadece teorik bilgi değil, aynı zamanda küresel iş dünyasıyla derin bir ağ kurma fırsatı sunar.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 group hover:border-gold/30 transition-colors">
                <h4 class="font-serif font-bold text-primary mb-3 italic flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gold"></span>
                  Küresel İş Ağı
                </h4>
                <p class="text-sm text-zinc-500 leading-relaxed">Milano'nun finans merkezi olması sayesinde öğrenciler, master eğitimleri sırasında dünya devi şirketlerle doğrudan projeler geliştirme ve staj yapma imkanı bulurlar.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 group hover:border-gold/30 transition-colors">
                <h4 class="font-serif font-bold text-primary mb-3 italic flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gold"></span>
                  Akademik Uzmanlık
                </h4>
                <p class="text-sm text-zinc-500 leading-relaxed">Özellikle Finans ve MBA programları, Financial Times sıralamalarında dünya çapında ilk 10'da yer alarak mezunlarının küresel pazarda en çok tercih edilen adaylar olmasını sağlar.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "polimi-master",
        name: "Politecnico di Milano",
        ranking: "#1 in Italy (Engineering)",
        worldRanking: "#13 in Civil Engineering",
        annualTuition: "€3,500 - €3,900",
        highlights: ["Teknik Mükemmeliyet", "Tasarım Odaklı Mühendislik"],
        departments: ["Architecture", "Industrial Design", "Mechanical Engineering", "Smart Cities"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Politecnico di Milano, mühendislik ve tasarım dünyasında bir inovasyon merkezidir. İtalya'nın en büyük teknik üniversitesi olarak, geleceğin teknolojilerini şekillendiren liderler yetiştirir.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Teknolojik Altyapı</h4>
                <p class="text-sm text-zinc-500">Avrupa'nın en gelişmiş laboratuvarlarına ev sahipliği yapan okul, öğrencilere yapay zeka, sürdürülebilir mimari ve havacılık gibi alanlarda ileri düzey araştırma imkanları sunar.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Tasarım Mirası</h4>
                <p class="text-sm text-zinc-500">Milano Tasarım Haftası'nın ana duraklarından biri olan okul, estetik ve mühendisliği harmanlayarak dünyaca ünlü tasarımcılar mezun eder.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "sapienza-master",
        name: "Sapienza University of Rome",
        ranking: "#1 in Classics",
        worldRanking: "#124 Global",
        annualTuition: "€2,500 - €3,000",
        highlights: ["Tarihi Miras", "Kapsamlı Araştırma Alanları"],
        departments: ["Space Engineering", "Archaeology", "Cybersecurity", "Public Health"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Sapienza University of Rome, Avrupa'nın en eski ve köklü üniversitelerinden biridir. Roma'nın kalbinde yer alan kampüs, öğrencilerine tarihin ve modern bilimin iç içe geçtiği eşsiz bir atmosfer sunar.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Akademik Derinlik</h4>
                <p class="text-sm text-zinc-500">Klasik dillerden uzay mühendisliğine kadar geniş bir yelpazede sunulan master programları, araştırmacı ruhlu öğrenciler için idealdir.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Kültürel Başkent</h4>
                <p class="text-sm text-zinc-500">Roma'nın sunduğu sınırsız müze, kütüphane ve arşiv olanakları, özellikle sosyal bilimler ve sanat alanındaki master öğrencilerine paha biçilemez kaynaklar sağlar.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "bologna-master",
        name: "University of Bologna",
        ranking: "Oldest University in the West",
        worldRanking: "#154 Global",
        annualTuition: "€2,500 - €3,500",
        highlights: ["900 Yıllık Akademik Gelenek", "Avrupa Eğitim Sisteminin Beşiği"],
        departments: ["International Relations", "Advanced Automotive Engineering", "Law", "Food Safety"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Bologna Üniversitesi, Batı dünyasının en eski üniversitesi olarak "Alma Mater Studiorum" unvanını taşır. Dokuz asırlık tecrübesiyle, geleneği modern inovasyonla harmanlayan bir dünya okuludur.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Hukuk ve Diplomasi</h4>
                <p class="text-sm text-zinc-500">Üniversite, hukuk bilimlerinin doğduğu yer olması sebebiyle uluslararası hukuk ve siyaset programlarında dünya çapında otorite kabul edilir.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Otomotiv İnovasyonu</h4>
                <p class="text-sm text-zinc-500">Motor Valley'nin kalbinde yer alan okul, Ferrari ve Lamborghini gibi devlerle iş birliği içinde yüksek performanslı araç mühendisliği eğitimi sunar.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "padua-master",
        name: "University of Padua",
        ranking: "#1 in Science (Italy)",
        worldRanking: "#219 Global",
        annualTuition: "€2,600 - €3,200",
        highlights: ["Bilimsel Devrimin Merkezi", "Galileo'nun Kürsüsü"],
        departments: ["Astrophysics", "Human Rights", "Management Engineering", "Forest Science"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Padua Üniversitesi, bilim tarihinde devrim yaratan isimlerin yetiştiği kutsal bir akademik topraktır. 1222'den beri süregelen bilimsel merak, bugün en modern araştırma projeleriyle devam etmektedir.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Bilimsel Miras</h4>
                <p class="text-sm text-zinc-500">Astrofizik ve tıp gibi temel bilimlerdeki uzmanlığı, öğrencilere Avrupa'nın en gelişmiş araştırma tesislerinde çalışma imkanı tanır.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">İnsan Hakları</h4>
                <p class="text-sm text-zinc-500">Sosyal adalet ve uluslararası insan hakları alanındaki İngilizce master programları, küresel kurumlar tarafından yüksek takdirle karşılanır.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "milan-master",
        name: "University of Milan (Statale)",
        ranking: "#1 in Health & Science",
        worldRanking: "#276 Global",
        annualTuition: "€2,000 - €3,500",
        highlights: ["Biyoteknoloji ve Sağlık Lideri", "Milano'nun Akademik Dinamizmi"],
        departments: ["Bioinformatics", "Molecular Biotechnology", "Political Science", "Economics"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Statale di Milano, fen bilimleri ve tıp alanında İtalya'nın en güçlü devlet üniversitesidir. Milano'nun akademik dinamizmini yansıtan okul, araştırma odaklı master programlarıyla fark yaratır.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Yaşam Bilimleri</h4>
                <p class="text-sm text-zinc-500">Moleküler biyoloji ve biyoinformatik alanındaki programlar, Avrupa'nın önde gelen sağlık kuruluşlarıyla koordineli yürütülür.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Ekonomik Politika</h4>
                <p class="text-sm text-zinc-500">Siyaset bilimi ve ekonomi master programları, öğrencileri uluslararası organizasyonlarda ve kamu yönetiminde kilit roller üstlenmeye hazırlar.</p>
              </div>
            </div>
          </div>`
      }
    ]
  },
  fransa: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Fransa'da Yüksek Lisans: Mükemmellik ve İnovasyon</h2>
      <p class="mb-6">Fransa, dünya standartlarındaki 'Grandes Écoles' sistemi ve köklü devlet üniversiteleriyle uluslararası öğrenciler için benzersiz akademik fırsatlar sunar. Özellikle işletme, mühendislik, sanat ve siyaset bilimi alanlarında küresel bir otoritedir.</p>
      <p class="mb-6">Eğitim sistemi 'LMD' (Lisans, Master, Doktora) yapısına dayanır ve diplomalar tüm dünyada yüksek tanınırlığa sahiptir. İngilizce eğitim veren programların sayısı hızla artmaktadır, bu da Fransa'yı küresel bir eğitim üssü haline getirmektedir.</p>
      <p class="mb-6">Mentor Career, Campus France başvuru süreci, burs olanakları (Eiffel vb.) ve konaklama asistanlığı konularında uzman danışmanlık sağlar.</p>
    `,
    advantages: [
      { title: "Akademik Üstünlük", desc: "HEC Paris, INSEAD ve Sorbonne gibi dünya sıralamalarında üst düzeyde yer alan kurumlarda eğitim." },
      { title: "Devlet Desteği", desc: "Fransız hükümeti, uluslararası öğrencilerin eğitim maliyetlerinin büyük bir kısmını sübvanse eder." },
      { title: "Kariyer İmkanları", desc: "Mezuniyet sonrası sunulan 'recherche d'emploi' (iş arama) izni ile Fransa'da kariyer yapma şansı." },
      { title: "Uluslararası Ortam", desc: "Dünyanın her yerinden gelen öğrencilerle zengin bir kültürel çeşitlilik ve network ağı." }
    ],
    process: [
      { title: "Campus France Kaydı", desc: "Fransa'daki eğitim başvurularının merkezi olan Campus France platformu üzerinden sürecin yönetilmesi." },
      { title: "Dosya Hazırlığı", desc: "Niyet mektubu, özgeçmiş ve akademik referansların Fransız standartlarına uygun şekilde düzenlenmesi." },
      { title: "Mülakat Hazırlığı", desc: "Campus France yetkilileriyle yapılacak mülakatlar için stratejik hazırlık desteği." },
      { title: "Konaklama ve Sigorta", desc: "Kabul sonrası öğrenci konaklaması (CROUS veya özel) ve sosyal güvenlik kayıt süreçleri." }
    ],
    faq: [
      { q: "İngilizce master var mı?", a: "Evet, özellikle işletme, mühendislik ve fen bilimlerinde çok sayıda İngilizce program mevcuttur." },
      { q: "Eğitim maliyetleri nasıldır?", a: "Devlet üniversitelerinde harçlar yıllık yaklaşık 2.700€ - 3.700€ civarındadır; özel okullarda ise daha yüksektir." },
      { q: "Fransızca öğrenmek zorunlu mu?", a: "Program İngilizce olsa bile, günlük yaşam ve iş imkanları için temel düzeyde Fransızca önerilir." },
      { q: "Burs imkanları nelerdir?", a: "Eiffel Mükemmeliyet Bursu ve üniversitelerin kendi başarı bursları en popüler seçeneklerdir." }
    ],
    universities: [
      {
        slug: "hec-paris-master",
        name: "HEC Paris",
        ranking: "#1 in Europe (Business)",
        worldRanking: "#1 in Marketing",
        annualTuition: "€25,000 - €35,000",
        highlights: ["Dünya Lideri İşletme Eğitimi", "Elite Alumni Network"],
        departments: ["Strategic Management", "International Finance", "Marketing", "Sustainability"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              HEC Paris, dünya çapında işletme eğitiminin zirvesi olarak kabul edilir. Avrupa'nın "CEO fabrikası" olarak bilinen okul, küresel iş liderlerini yetiştirme konusunda benzersiz bir geçmişe sahiptir.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Liderlik Gelişimi</h4>
                <p class="text-sm text-zinc-500">Master programları, öğrencileri sadece teknik olarak değil, aynı zamanda etik ve vizyoner birer lider olarak hazırlar. Kariyer merkezi, global danışmanlık ve finans devleriyle doğrudan bağlantılıdır.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Küresel Alunni Ağı</h4>
                <p class="text-sm text-zinc-500">Fortune 500 şirketlerinin CEO'larının en çok mezun olduğu okul olması, öğrencilere mezuniyet sonrası eşsiz bir networking ve kariyer basamağı gücü sağlar.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "sorbonne-master",
        name: "Sorbonne University",
        ranking: "#1 in France (Arts & Humanities)",
        worldRanking: "#43 Global",
        annualTuition: "€3,770 (State regulated)",
        highlights: ["Yüzyıllık Akademik Gelenek", "Merkezi Paris Kampüsü"],
        departments: ["Quantum Physics", "Computer Science", "History of Art", "Literature"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Sorbonne, bilim ve beşeri bilimlerde Fransa'nın en ikonik kurumudur. Yüzyıllardır süregelen akademik mükemmeliyet geleneği, Paris'in kalbinde modern araştırmalarla buluşur.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Kültürel Miras</h4>
                <p class="text-sm text-zinc-500">Sanat tarihi, felsefe ve edebiyat alanındaki master programları, dünyanın en zengin arşivlerine ve kütüphanelerine doğrudan erişim sunar.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Bilimsel Atılım</h4>
                <p class="text-sm text-zinc-500">Kuantum fiziği ve bilgisayar bilimlerinde, Avrupa'nın en önemli araştırma projelerine ev sahipliği yaparak geleceğin bilim insanlarını yetiştirir.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "polytechnique-master",
        name: "École Polytechnique",
        ranking: "#1 in Engineering",
        worldRanking: "#2 in Employer Reputation",
        annualTuition: "€12,000 - €15,000",
        highlights: ["Askeri Disiplin ve Bilim", "İleri Matematik ve Fizik"],
        departments: ["Artificial Intelligence", "Renewable Energy", "Mathematics and Finance", "Aerospace"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              "X" lakabıyla bilinen École Polytechnique, Fransa'nın en seçkin mühendislik okuludur. Askeri kökenli disiplini, en üst düzey matematik ve fizik eğitimiyle birleştirerek teknik elitler yetiştirir.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Teknik Liderlik</h4>
                <p class="text-sm text-zinc-500">Öğrenciler, karmaşık mühendislik problemlerini çözme ve büyük ölçekli teknoloji projelerini yönetme becerisi kazanırlar.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Endüstriyel Güç</h4>
                <p class="text-sm text-zinc-500">Havacılık, savunma ve enerji sektöründeki dünya devleriyle olan yakın bağları, mezunlarına en üst düzey iş fırsatları sunar.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "insead-master",
        name: "INSEAD",
        ranking: "#1 in World (MBA)",
        worldRanking: "#2 Global (Business)",
        annualTuition: "€35,000 - €50,000",
        highlights: ["The Business School for the World", "Küresel Liderlik Ağı"],
        departments: ["Management", "Finance", "Entrepreneurship", "Digital Transformation"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              INSEAD, "Dünyanın İşletme Okulu" mottosuyla, gerçekten küresel bir perspektife sahip olan tek kurumdur. Fontainebleau'daki kampüsü, dünyanın her yerinden gelen vizyoner zihinlerin buluşma noktasıdır.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Global Mobilite</h4>
                <p class="text-sm text-zinc-500">Master programları, öğrencilere farklı kültürlerde iş yapma ve yönetme esnekliği kazandırarak gerçek bir dünya vatandaşı yapar.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Stratejik Vizyon</h4>
                <p class="text-sm text-zinc-500">Dijital dönüşüm ve girişimcilik odaklı müfredatı, mezunların değişen iş dünyasında lider kalmasını sağlar.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "sciences-po-master",
        name: "Sciences Po",
        ranking: "#2 in World (Politics)",
        worldRanking: "#3 in Social Policy",
        annualTuition: "€14,000 - €19,000",
        highlights: ["Siyaset Bilimi Otoritesi", "Uluslararası İlişkiler Merkezi"],
        departments: ["International Security", "Public Policy", "International Development", "Human Rights"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Sciences Po, sosyal bilimler ve siyaset alanında dünya çapında bir referans noktasıdır. Paris'in kalbinde yer alan okul, dünya diplomasisine yön veren kadroların yetiştiği bir ocaktır. Mezunları arasında devlet başkanları, diplomatlar ve uluslararası kurum yöneticileri yer alır.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Diplomatik Güç</h4>
                <p class="text-sm text-zinc-500">Master programları, uluslararası güvenlik ve kamu politikası alanlarında derinlemesine uzmanlık ve pratik analiz yeteneği kazandırır.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Küresel Forum</h4>
                <p class="text-sm text-zinc-500">Dünya liderlerinin konferanslar verdiği kampüs, öğrencilere uluslararası ilişkilerde bizzat gözlem yapma ve network kurma imkanı sunar.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "psl-master",
        name: "PSL University",
        ranking: "#1 in France",
        worldRanking: "#24 Global",
        annualTuition: "€3,770 (State regulated)",
        highlights: ["Disiplinlerarası Araştırma", "Paris'in En Seçkin Kurumu"],
        departments: ["Cognitive Science", "Astrophysics", "Life Sciences", "Philosophy"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              PSL, Paris'in en prestijli eğitim ve araştırma kurumlarının bir araya gelmesiyle oluşmuş bir akademik devdir. Nobel ödüllü kadrosuyla, bilimin her alanında sınırları zorlar.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Bilişsel Bilimler</h4>
                <p class="text-sm text-zinc-500">Yaşam bilimlerinden felsefeye kadar uzanan disiplinlerarası master programları, öğrencilere benzersiz bir entelektüel derinlik sunar.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Astronomi ve Fizik</h4>
                <p class="text-sm text-zinc-500">Paris Gözlemevi gibi köklü kurumlarla olan bağı sayesinde astrofizik alanında dünyanın en ileri araştırma imkanlarını sağlar.</p>
              </div>
            </div>
          </div>`
      }
    ]
  },
  ispanya: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">İspanya'da Yüksek Lisans: Dinamik ve Vizyoner Eğitim</h2>
      <p class="mb-6">İspanya, MBA ve işletme alanında dünyanın en prestijli okullarına (IE, IESE, ESADE) ve köklü kamu üniversitelerine ev sahipliği yapar. Dinamik yaşam tarzı, güneşli iklimi ve zengin kültürüyle eğitim için en çok tercih edilen ülkelerden biridir.</p>
      <p class="mb-6">İspanya'da yüksek lisans programları genellikle 1 yıl (60 ECTS) veya 2 yıl (120 ECTS) sürer. Hem profesyonel odaklı 'Master Propio' hem de akademik odaklı 'Master Oficial' seçenekleri mevcuttur.</p>
      <p class="mb-6">Mentor Career olarak, üniversite seçimi, denklik (homologación), kayıt süreci ve İspanya'daki yerleşim işlemlerinizde yanınızdayız.</p>
    `,
    advantages: [
      { title: "Global İş Dünyası", desc: "Özellikle MBA ve işletme alanında dünya lideri olan okullarda eğitim ve staj imkanı." },
      { title: "Uygulamalı Eğitim", desc: "Sektörle iç içe, proje tabanlı ve pratik odaklı yüksek lisans müfredatları." },
      { title: "Yaşam Kalitesi", desc: "Uygun yaşam maliyetleri, sosyal hayat ve Avrupa'nın en yaşanabilir şehirlerinde eğitim." },
      { title: "Dil Avantajı", desc: "İngilizce eğitim alırken dünyanın en çok konuşulan dillerinden biri olan İspanyolca'yı öğrenme fırsatı." }
    ],
    process: [
      { title: "Program Tespiti", desc: "Kariyer hedeflerinize uygun 'Oficial' veya 'Propio' master programlarının belirlenmesi." },
      { title: "Denklik ve Kayıt", desc: "Lisans diplomasının İspanya standartlarına uygunluğu ve üniversite kayıt işlemlerinin yönetimi." },
      { title: "Kayıt İşlemleri", desc: "İspanya konsoloslukları üzerinden uzun dönem öğrenci kaydı sürecinin takibi." },
      { title: "NIE ve Yerleşim", desc: "İspanya'ya varışta yabancı kimlik numarası (NIE) alımı ve yerel kayıt işlemleri." }
    ],
    faq: [
      { q: "Master süresi ne kadardır?", a: "Çoğu yüksek lisans programı yoğun bir müfredatla 1 akademik yıl (9-12 ay) sürer." },
      { q: "İngilizce eğitim yaygın mı?", a: "Evet, özellikle Madrid ve Barselona gibi büyük şehirlerde İngilizce program seçeneği çok fazladır." },
      { q: "Konaklama masrafları ne kadardır?", a: "Şehre göre değişmekle birlikte, paylaşımlı evlerde odalar 400€ - 800€ arası değişebilir." },
      { q: "Mezuniyet sonrası çalışma izni var mı?", a: "Evet, mezunlar iş aramak için 1 yıla kadar oturum izni uzatma hakkına sahip olabilirler." }
    ],
    universities: [
      {
        slug: "ie-university-master",
        name: "IE University",
        ranking: "#1 in Spain (Business)",
        worldRanking: "#1 in Online MBA",
        annualTuition: "€25,000 - €32,000",
        highlights: ["İnovasyon ve Teknoloji Odaklı", "Madrid'in Modern Yüzü"],
        departments: ["Business Analytics", "Digital Marketing", "International Relations", "Entrepreneurship"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              IE University, girişimcilik ve teknoloji entegrasyonu konusunda dünya lideridir. Madrid'in kalbindeki dikey kampüsüyle, geleceğin dijital ekonomisine yön veren liderler yetiştirir.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Girişimcilik Ekosistemi</h4>
                <p class="text-sm text-zinc-500">Öğrencilerin %25'inden fazlası kendi girişimlerini başlatır. IE, Silikon Vadisi modellerini Avrupa eğitimiyle harmanlayan eşsiz bir 'Venture Lab' deneyimi sunar.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Teknoloji ve İnovasyon</h4>
                <p class="text-sm text-zinc-500">Yapay zeka, büyük veri ve dijital dönüşüm, tüm master programlarının müfredatına entegre edilmiştir. Sektör liderleriyle ortak yürütülen projeler, mezunlara anında istihdam sağlar.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "uam-master",
        name: "Autonomous University of Madrid (UAM)",
        ranking: "#1 in Spain (General)",
        worldRanking: "#200 Global",
        annualTuition: "€3,000 - €5,000",
        highlights: ["Güçlü Araştırma Odaklılık", "Prestijli Akademik Kadro"],
        departments: ["Molecular Biosciences", "Theoretical Physics", "Legal Sciences", "Modern Languages"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              UAM, bilimsel araştırmada İspanya'nın en başarılı devlet üniversitelerinden biridir. Birçok önde gelen bilim insanı ve siyasetçinin mezun olduğu kurum, akademik disipliniyle tanınır.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Bilimsel Araştırma Üssü</h4>
              <ul class="space-y-3">
                <li class="flex items-center gap-3 text-zinc-600">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  İspanya Ulusal Araştırma Konseyi (CSIC) ile yakın işbirliği.
                </li>
                <li class="flex items-center gap-3 text-zinc-600">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Biyoteknoloji ve fizik alanında Avrupa'nın en iyi laboratuvarları.
                </li>
              </ul>
            </div>
          </div>`
      },
      {
        slug: "esade-master",
        name: "ESADE Business School",
        ranking: "#1 in Social Impact",
        worldRanking: "#4 in MSc in Management",
        annualTuition: "€28,000 - €33,000",
        highlights: ["Barselona'nın Kalbinde", "Sosyal Sorumluluk ve Etik"],
        departments: ["Finance", "Global Strategic Management", "Innovation & Entrepreneurship"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Barselona merkezli ESADE, sosyal etki ve iş dünyası etiği konularındaki öncü yaklaşımıyla tanınan, dünyanın en iyi işletme okullarından biridir.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Uluslararası Deneyim</h4>
                <p class="text-sm text-zinc-500">Programlar, 100'den fazla ülkeden gelen öğrencilerle %90'ın üzerinde uluslararası çeşitliliğe sahiptir. Global Study Tour imkanları sunar.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Kariyer Hızlandırıcı</h4>
                <p class="text-sm text-zinc-500">Mezunların %94'ü, program bitiminden sonraki 3 ay içinde global şirketlerde üst düzey pozisyonlara yerleşmektedir.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "iese-master",
        name: "IESE Business School",
        ranking: "#1 in World (Executive Education)",
        worldRanking: "#3 Global (MBA)",
        annualTuition: "€35,000 - €45,000",
        highlights: ["Global Liderlik Gelişimi", "Vaka Çalışması Yöntemi"],
        departments: ["MBA", "Management", "Finance", "Leadership"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              IESE Business School, yönetici eğitimi ve MBA alanında dünyanın en iyileri arasındadır. İnsan odaklı liderlik ve vaka çalışmaları üzerine kurulu eğitimiyle bilinir.
            </p>
            <div class="p-8 bg-zinc-900 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Global Liderlik Vizyonu</h4>
              <p class="text-zinc-400 mb-6 italic">"Liderlik bir hizmettir." felsefesiyle hareket eden IESE, öğrencilerini sadece kar odaklı değil, toplumsal fayda sağlayan yöneticiler olarak yetiştirir.</p>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-zinc-800 rounded-2xl">
                  <div class="text-2xl font-bold text-primary">#1</div>
                  <div class="text-xs text-zinc-500 uppercase tracking-wider">Executive Education</div>
                </div>
                <div class="p-4 bg-zinc-800 rounded-2xl">
                  <div class="text-2xl font-bold text-primary">5+</div>
                  <div class="text-xs text-zinc-500 uppercase tracking-wider">Global Kampüs</div>
                </div>
              </div>
            </div>
          </div>`
      },
      {
        slug: "upf-master",
        name: "Pompeu Fabra University (UPF)",
        ranking: "#1 in Economics (Spain)",
        worldRanking: "#186 Global",
        annualTuition: "€4,000 - €7,000",
        highlights: ["Ekonomi ve Sosyal Bilimlerde Lider", "Barselona'nın Modern Yüzü"],
        departments: ["Economics & Finance", "Data Science", "Public Policy", "International Relations"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              UPF, sosyal bilimler ve ekonomi alanında Avrupa'nın en saygın genç üniversitelerinden biridir. Barselona merkezli kurum, güçlü araştırma çıktılarıyla tanınr.
            </p>
            <div class="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">Ekonomide Avrupa Ekolü</h4>
              <p class="text-zinc-600 text-sm">Barcelona School of Economics (BSE) ile işbirliği içinde sunulan programlar, mezunlarını dünya bankaları ve araştırma enstitülerine hazırlar.</p>
            </div>
          </div>`
      },
      {
        slug: "ub-master",
        name: "University of Barcelona (UB)",
        ranking: "#1 in Spain (General)",
        worldRanking: "#164 Global",
        annualTuition: "€3,000 - €6,000",
        highlights: ["Araştırma Devleri", "Zengin Akademik Yelpaze"],
        departments: ["Biomedicine", "Artificial Intelligence", "Clinical Psychology", "Global Business"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Barselona Üniversitesi, İspanya'nın bilimsel üretimde lider kurumudur. Kapsamlı master programları, teorik derinliği pratik araştırma olanaklarıyla birleştirir.
            </p>
            <p class="text-zinc-600">İspanya'nın en geniş kütüphane ve araştırma ağına sahip olan UB, biyomedikal ve yapay zeka araştırmalarında Avrupa'nın öncü merkezlerinden biridir.</p>
          </div>`
      }
    ]
  },
  ingiltere: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">İngiltere'de Yüksek Lisans: Akademik Mükemmellik ve Hızlı İstihdam</h2>
      <p class="mb-6">İngiltere, kısa süreli (genellikle 1 yıl) master programları, güçlü akademik kadrosu ve küresel tanınırlığıyla uluslararası öğrenciler için tercih edilen bir destinasyondur. Programlar araştırma odaklı (MRes, MSc) veya uygulamalı (MSc, MA) olabilir.</p>
      <p class="mb-6">Öne çıkan alanlar: finans, veri bilimi, yapay zeka, işletme (MBA/MA), hukuk ve sağlık yönetimi. Üniversiteler endüstri ortaklıkları sayesinde staj ve proje tabanlı eğitim sunar.</p>
      <p class="mb-6">Mentor Career, hedef üniversite seçimi, kişiselleştirilmiş başvuru paketleri (SOP, CV, referanslar) ve burs başvurularında baştan sona destek sağlar. Graduate Route sonrası iş pazarına entegrasyon için yerel network ve mülakat hazırlığı sunuyoruz.</p>
    `,
    advantages: [
      { title: "Hızlı Tamamlama", desc: "Birçok program 9-12 ay sürerek eğitim maliyetinizi ve süresini azaltır." },
      { title: "Graduate Route & İş Deneyimi", desc: "Mezuniyet sonrası 2 yıla kadar çalışma izni ile İngiltere iş pazarına giriş imkanı." },
      { title: "Burs Olanakları", desc: "Chevening, üniversite bursları ve departman bazlı fonlar ile finansal destek sağlanabilir." },
      { title: "Kariyer Hizmetleri", desc: "Üniversite kariyer merkezleri ve iş fuarları ile iş bağlantıları kolaylaşır." }
    ],
    process: [
      { title: "Hedef Belirleme", desc: "Akademik ve kariyer hedeflerinize göre program düzeyi (taught/research), şehir ve üniversite belirlenir." },
      { title: "Başvuru Paketinin Hazırlanması", desc: "Özgeçmiş, niyet mektubu (SOP), iki referans ve transkriptlerin üniversite formatına uygun hale getirilmesi." },
      { title: "Burs & CAS", desc: "Burs başvuruları yönetilir; kabul sonrası CAS (Confirmation of Acceptance for Studies) alınması ve kayıt başvurusu için gerekli belgeler düzenlenir." },
      { title: "Kabul ve Yerleştirme", desc: "Konaklama, kayıt ve oryantasyon süreçlerinde destek sağlanır; mezuniyet sonrası iş arama stratejileri oluşturulur." }
    ],
    faq: [
      { q: "Master programları ne kadar sürer?", a: "Müfredat ve program tipine göre genelde 9-12 ay (taught) veya 12-24 ay (research) sürer." },
      { q: "Graduate Route ile ne kadar kalabilirim?", a: "Master mezunları için genellikle 2 yıl çalışma izni verilir; doktora mezunları daha uzun süre alabilir." },
      { q: "Burs almak için ne yapmalıyım?", a: "Akademik notlar, güçlü referanslar ve etkili bir SOP ile erken başvuru burs şansını artırır." },
      { q: "İngiltere'de iş bulma şansı nasıl?", a: "Sektöre ve bölgeye göre değişir; Londra, Manchester ve Cambridge gibi merkezlerde daha yüksek fırsatlar bulunur." }
    ],
    universities: [
      {
        slug: "oxford-master",
        name: "University of Oxford",
        ranking: "#1 in UK",
        worldRanking: "#3 Global",
        annualTuition: "£28,000 - £45,000",
        highlights: ["Dünya Lideri Akademik Prestij", "Kolej Sistemi"],
        departments: ["Global Health Science", "Public Policy (Blavatnik)", "MBA", "AI & Robotics"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Oxford, akademik mükemmelliğin küresel simgesidir. Master programları, dünyanın en zeki zihinlerini bir araya getirerek yarının liderlerini ve bilim insanlarını yetiştirir.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Kolej Geleneği ve Mentorluk</h4>
              <p class="text-zinc-400 text-sm leading-relaxed">
                Oxford'da eğitim sadece dersliklerle sınırlı değildir. 800 yıllık kolej sistemi, öğrencilere disiplinlerarası bir entelektüel topluluk ve dünyaca ünlü profesörlerle birebir çalışma (tutorial) imkanı sunar.
              </p>
            </div>
          </div>`
      },
      {
        slug: "lse-master",
        name: "London School of Economics (LSE)",
        ranking: "#1 in London (Social Sciences)",
        worldRanking: "#6 in Social Sciences",
        annualTuition: "£24,000 - £34,000",
        highlights: ["Küresel Siyaset ve Finans Merkezi", "Londra'nın Kalbi"],
        departments: ["Economics", "International Relations", "Finance", "Data Science"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              LSE, sosyal bilimler alanında dünyanın en etkili kurumlarından biridir. Mezunları, dünya diplomasisi ve finans piyasalarında en üst düzey mevkilerde yer alır.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Politika ve Ekonomi Odağı</h4>
                <p class="text-sm text-zinc-500">Dünya liderlerinin ve Nobel ödüllü ekonomistlerin yetiştiği LSE, global sorunlara çözüm üreten bir düşünce kuruluşu gibi çalışır.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Global Networking</h4>
                <p class="text-sm text-zinc-500">Londra'nın merkezindeki konumu, öğrencileri City of London ve devlet kurumlarıyla doğrudan temas halinde tutar.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "imperial-master",
        name: "Imperial College London",
        ranking: "#1 in UK (Science & Tech)",
        worldRanking: "#6 Global",
        annualTuition: "£30,000 - £38,000",
        highlights: ["İleri Teknoloji ve Tıp", "İnovasyon Odaklı"],
        departments: ["Advanced Computing", "Health Data Analytics", "MBA", "Structural Engineering"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Imperial College, bilim, mühendislik ve tıp alanlarında İngiltere'nin teknoloji üssüdür. Araştırma odaklı master programları, endüstriyel devrimlerin öncüsü olmayı hedefler.
            </p>
            <div class="p-8 bg-primary/5 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">STEM Liderliği</h4>
              <p class="text-zinc-600">Imperial, girişimci bilim insanları için bir kuluçka merkezidir. Teknoloji transfer ofisleri ve 'Enterprise Lab', öğrenci projelerini ticari başarılara dönüştürür.</p>
            </div>
          </div>`
      },
      {
        slug: "cambridge-master",
        name: "University of Cambridge",
        ranking: "#1 in UK (Academic)",
        worldRanking: "#2 Global",
        annualTuition: "£32,000 - £50,000",
        highlights: ["800 Yıllık Akademik Miras", "Kolej Sistemi ve Mentorluk"],
        departments: ["Theoretical Physics", "International Law", "Bioscience", "Economics"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Cambridge Üniversitesi, dünya bilim tarihini yazan isimlerin yetiştiği bir efsanedir. Master programları, birebir mentorluk ve derinlemesine araştırma imkanlarıyla benzersizdir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3 italic">Silikon Fen (Silicon Fen)</h4>
              <p class="text-sm text-zinc-500">Cambridge'in çevresindeki teknoloji ekosistemi, özellikle yapay zeka ve biyoteknoloji öğrencileri için dünyanın en yoğun araştırma-geliştirme ağını sunar.</p>
            </div>
          </div>`
      },
      {
        slug: "ucl-master",
        name: "University College London (UCL)",
        ranking: "#1 in London (Research)",
        worldRanking: "#9 Global",
        annualTuition: "£26,000 - £36,000",
        highlights: ["Disiplinlerarası Araştırma", "Londra'nın Global Üniversitesi"],
        departments: ["Education (IOE)", "Architecture (Bartlett)", "Artificial Intelligence", "Neuroscience"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              UCL, Londra'nın kalbinde yer alan, araştırma odaklı bir dünya üniversitesidir. Özellikle eğitim ve mimarlık fakülteleri dünya sıralamalarında sürekli olarak bir numaradır.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Disiplinlerarası Yaklaşım</h4>
              <p class="text-zinc-400 text-sm italic">"Londra'nın Global Üniversitesi" sloganıyla hareket eden UCL, karmaşık küresel sorunlara farklı disiplinleri birleştirerek çözümler arar.</p>
            </div>
          </div>`
      },
      {
        slug: "kcl-master",
        name: "King's College London",
        ranking: "#1 in Health & Law",
        worldRanking: "#40 Global",
        annualTuition: "£25,000 - £35,000",
        highlights: ["Hukuk ve Tıp Otoritesi", "Merkezi Londra Konumu"],
        departments: ["International Peace & Security", "Digital Humanities", "Clinical Neuroscience", "Global Health"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              King's College, hukuk ve sağlık bilimlerindeki prestijiyle bilinir. Londra'nın siyasi ve hukuki merkezlerine yakınlığı, öğrencilere eşsiz networking fırsatları sunar.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">Tıp ve Sosyal Bilimler Köprüsü</h4>
              <p class="text-zinc-600 text-sm">King's, dünyaca ünlü hastaneleri ve politika enstitüleri ile teorik eğitimi saha deneyimiyle kusursuz bir şekilde birleştirir.</p>
            </div>
          </div>`
      }
    ]
  },
  amerika: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Amerika'da Yüksek Lisans: Araştırma, Ağlar ve Kariyer İmkanları</h2>
      <p class="mb-6">ABD, disiplinler arası araştırma merkezleri, güçlü endüstri ortaklıkları ve mezunlara sunulan kapsamlı staj imkanları ile öne çıkar. Master programları genellikle 1-2 yıl arası sürer ve hem akademik hem de profesyonel odaklı seçenekler sunar.</p>
      <p class="mb-6">Öne çıkan alanlar: bilgisayar bilimi, veri bilimi, finans, mühendislik, biyoteknoloji. Üniversitelerde research assistant (RA) ve teaching assistant (TA) pozisyonları ile hem deneyim kazanılır hem de burs sağlanabilir.</p>
      <p class="mb-6">Mentor Career, okul sıralama stratejisi, güçlü CV/SOP hazırlanması, asistanlık başvuruları ve finansal destek planlamasında yardımcı olur.</p>
    `,
    advantages: [
      { title: "Geniş Araştırma Ağları", desc: "Önde gelen laboratuvarlar, araştırma projeleri ve fon kaynaklarına erişim." },
      { title: "Asistanlık ve Burslar", desc: "RA/TA pozisyonları ile öğrenim ücretlerinde indirim ve maaş desteği sağlanabilir." },
      { title: "Kariyer ve Staj Olanakları", desc: "Kariyer fuarları ve sektör iş birlikleri ile staj ve iş imkanı." },
      { title: "OPT & STEM", desc: "Uygun lisansüstü programlar için OPT ve STEM uzatmalarıyla çalışma süreleri artırılabilir." }
    ],
    process: [
      { title: "Hedef ve Finansman Planı", desc: "Araştırma hedefleri, okul listesi ve finansman (burs/asistanlık) stratejisi belirlenir." },
      { title: "Sınav ve Belgeler", desc: "Gerekli sınavlar (GRE/GMAT/TOEFL) ve güçlü referans mektuplarının hazırlanması." },
      { title: "Asistanlık Başvuruları", desc: "Departmanlara doğrudan RA/TA başvuruları yapılması ve proje eşleştirmesi." },
      { title: "Kayıt ve Yerleşim", desc: "Kabul sonrası I-20 alınması, öğrenci kaydı ve yerleşim desteği sağlanması." }
    ],
    faq: [
      { q: "Master programları ne kadar sürer?", a: "Program türüne göre 1 ila 2 yıl arasında değişir; bazı araştırma programları daha uzun olabilir." },
      { q: "Asistanlık nasıl alınır?", a: "Departmanlarla doğrudan iletişim ve güçlü referanslarla RA/TA pozisyonları için başvurulur." },
      { q: "OPT süresi nedir?", a: "Genellikle 12 ay; STEM alanındaki mezunlar için 24 aya kadar uzatma mümkündür." },
      { q: "Burs şansı nasıl artırılır?", a: "Araştırma deneyimi, yayınlar ve güçlü referanslar burs şansını artırır." }
    ],
    universities: [
      {
        slug: "mit-master",
        name: "Massachusetts Institute of Technology (MIT)",
        ranking: "#1 Global",
        worldRanking: "#1 Worldwide",
        annualTuition: "$55,000 - $60,000",
        highlights: ["Teknolojinin Zirvesi", "İnovasyon ve Girişimcilik"],
        departments: ["Computer Science", "Logistics & Supply Chain", "MBA (Sloan)", "Media Arts & Sciences"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              MIT, bilim ve teknolojinin geleceğinin şekillendiği yerdir. Master programları, öğrencileri sadece teknik uzmanlar olarak değil, küresel sorunlara teknolojik çözümler üreten vizyonerler olarak hazırlar.
            </p>
            <div class="p-8 bg-zinc-900 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Mens et Manus (Zihin ve El)</h4>
              <p class="text-zinc-400 text-sm leading-relaxed">
                MIT'nin temel felsefesi olan "Zihin ve El", teorik bilginin pratik uygulamayla birleşmesini savunur. Laboratuvar ortamı, dünyanın en gelişmiş araştırma olanaklarını öğrencilerin hizmetine sunar.
              </p>
            </div>
          </div>`
      },
      {
        slug: "harvard-master",
        name: "Harvard University",
        ranking: "#1 in Ivy League",
        worldRanking: "#4 Global",
        annualTuition: "$52,000 - $65,000",
        highlights: ["Küresel Liderlik", "Prestijli Mezun Ağı"],
        departments: ["Public Policy (Kennedy School)", "Law (LLM)", "MBA", "Public Health"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Harvard, gücün ve bilginin merkezidir. Master programları, mezunlarını küresel ölçekte değişim yaratacak liderler olarak konumlandırır.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Ivy League Network</h4>
              <p class="text-zinc-600">Harvard diploması, dünyanın her yerinde kapıları açan bir anahtar gibidir. Mezuniyet sonrası sunulan ömür boyu süren mezunlar ağı, kariyerinizde size eşsiz bir avantaj sağlar.</p>
            </div>
          </div>`
      },
      {
        slug: "stanford-master",
        name: "Stanford University",
        ranking: "#1 in Silicon Valley",
        worldRanking: "#2 Global",
        annualTuition: "$55,000 - $62,000",
        highlights: ["Girişimcilik ve Teknoloji", "Silicon Valley Network"],
        departments: ["Electrical Engineering", "Computer Science", "Business (GSB)", "Management Science"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Stanford, inovasyonun ve startup kültürünün kalbidir. Teknoloji devleriyle olan organik bağı, master öğrencilerine eşsiz bir kariyer sıçraması sağlar.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Girişimci Zihin Yapısı</h4>
                <p class="text-sm text-zinc-500">Stanford Master öğrencileri, fikirlerini ticarileştirmek için üniversitenin geniş yatırımcı ve mentor ağından yararlanır.</p>
              </div>
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Multidisipliner Araştırma</h4>
                <p class="text-sm text-zinc-500">Hukuktan tıbba, mühendislikten sanata kadar tüm fakülteler arasındaki bariyerler kalkmıştır, bu da inovasyonu tetikler.</p>
              </div>
            </div>
          </div>`
      },
      {
        slug: "berkeley-master",
        name: "University of California, Berkeley",
        ranking: "#1 Public University",
        worldRanking: "#10 Global",
        annualTuition: "$32,000 - $45,000",
        highlights: ["Akademik Özgürlük ve Sosyal Etki", "Nobel Fabrikası"],
        departments: ["Computer Science", "Public Policy", "Engineering", "Environmental Design"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              UC Berkeley, dünyanın en iyi devlet üniversitesidir. Bilimsel araştırmadaki liderliği ve sosyal adalet odaklı akademik yaklaşımıyla global bir otoritedir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">İnovasyon ve Erişim</h4>
              <p class="text-zinc-600 text-sm">Berkeley, Silikon Vadisi'ne yetenek gönderen ana kaynaklardan biri olmasının yanı sıra, toplumsal dönüşüm için teknolojiyi kullanma vizyonuyla öne çıkar.</p>
            </div>
          </div>`
      },
      {
        slug: "columbia-master",
        name: "Columbia University",
        ranking: "#1 in NYC",
        worldRanking: "#23 Global",
        annualTuition: "$58,000 - $70,000",
        highlights: ["Manhattan'ın Kalbinde", "Ivy League Prestiji"],
        departments: ["Journalism", "International Affairs", "Data Science", "Actuarial Science"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Manhattan'da yer alan Columbia, öğrencilerini dünyanın finans, medya ve uluslararası ilişkiler merkezinin tam ortasına yerleştirir.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Şehir Bir Kampüs</h4>
              <p class="text-zinc-400 text-sm">New York şehri, Columbia öğrencilerinin laboratuvarıdır. Birleşmiş Milletler'den Wall Street'e kadar her yer bir adım uzağınızdadır.</p>
            </div>
          </div>`
      },
      {
        slug: "yale-master",
        name: "Yale University",
        ranking: "#1 in Law & Arts",
        worldRanking: "#16 Global",
        annualTuition: "$50,000 - $65,000",
        highlights: ["Liderlik ve Devlet Yönetimi", "Yüzyıllık Kütüphane ve Arşiv"],
        departments: ["Global Affairs", "Law (LLM)", "Management", "Environmental Management"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic font-serif">
              Yale, entelektüel derinliği ve liderlik geleneğiyle tanınır. Master programları, öğrencilerini küresel ölçekte politika yapıcılar ve vizyoner yöneticiler olarak yetiştirir.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Akademik Miras</h4>
              <p class="text-zinc-600">Yale, disiplinlerarası bir eğitim modelini benimser. Hukuk ve küresel meselelerdeki otoritesi, mezunlarına dünya sahnesinde güçlü bir yer sağlar.</p>
            </div>
          </div>`
      }
    ]
  },
  almanya: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Almanya'da Yüksek Lisans: Endüstri ile Entegrasyon</h2>
      <p class="mb-6">Almanya, mühendislik, üretim ve Ar-Ge odaklı master programlarıyla, güçlü sanayi işbirlikleri ve yüksek istihdam oranları sunar. Devlet üniversitelerinde birçok program düşük veya hiç harç gerektirmez; uygulamalı yüksek lisans programları (praktikum içeren) ve sanayi sponsorluklu projeler yaygındır.</p>
      <p class="mb-6">Mentor Career, Uni-Assist süreci, Anabin kontrolleri, dil sınavlarına hazırlık ve şirket bağlantıları konusunda destek sağlar. Mezunlar için Blue Card ve çalışma izni planlaması yapıyoruz.</p>
    `,
    advantages: [
      { title: "Düşük Eğitim Maliyeti", desc: "Birçok devlet üniversitesinde öğrenim harçları düşük veya yoktur; yaşam maliyetleri şehre göre değişir." },
      { title: "Staj & Endüstri Bağlantıları", desc: "Sanayi ortaklı projeler ve staj imkanları ile mezuniyet sonrası işe geçiş kolaylaşır." },
      { title: "Nitelikli Göçmenlik", desc: "Blue Card ve nitelikli göçmenlik yolları ile mezunlara uzun dönem fırsatlar sunulur." },
      { title: "Araştırma İmkanları", desc: "Teknoloji transfer ofisleri ve AR-GE fonları ile projeler desteklenir." }
    ],
    process: [
      { title: "Uygunluk ve Anabin Kontrolü", desc: "Diplomanın Anabin'de değerlendirilmesi ve program gereksinimlerinin kontrol edilmesi." },
      { title: "Başvuru ve Dil Hazırlığı", desc: "Uni-Assist veya doğrudan başvuru belgelerinin hazırlanması; TestDaF/DSH ya da İngilizce yeterlilik belgeleri." },
      { title: "Staj & Proje Eşleştirme", desc: "Departman bazlı staj ilanları ve sanayi projelerine yönlendirme." },
      { title: "Kayıt ve Yerleşim", desc: "Kabul sonrası oturum ve çalışma izinleri, sağlık sigortası ve konaklama desteği." }
    ],
    faq: [
      { q: "Ücretler nasıl?", a: "Devlet üniversitelerinde çoğu program düşük harçlıdır; bazı İngilizce programlar ücret talep edebilir." },
      { q: "Almanca bilmek zorunlu mu?", a: "Bazı programlar Almanca ister; ancak birçok teknik ve işletme programı İngilizce sunulmaktadır." },
      { q: "Blue Card için şartlar nelerdir?", a: "Mesleğe ve maaşa bağlı olarak, yüksek nitelikli iş sözleşmesi ve diploma gereklidir." },
      { q: "Staj bulma nasıl?", a: "Üniversite kariyer merkezleri, şirket fuarları ve akademik projeler aracılığıyla staj imkanları sağlanır." }
    ],
    universities: [
      {
        slug: "tum-master",
        name: "Technical University of Munich (TUM)",
        ranking: "#1 in Germany",
        worldRanking: "#37 Global",
        annualTuition: "€0 - €4,000",
        highlights: ["Mühendislik Devleri", "Sanayi İşbirlikleri"],
        departments: ["Informatics", "Automotive Engineering", "Management & Technology", "Aerospace"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              TUM, Almanya'nın "Girişimci Üniversitesi" olarak bilinir. Avrupa'nın en iyi teknik üniversiteleri arasında yer alan kurum, sanayi ile akademik dünyayı kusursuz bir şekilde birleştirir.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Endüstriyel Devlerle Ortaklık</h4>
                <p class="text-sm text-zinc-500">BMW, Siemens ve Audi gibi global devlerle yürütülen ortak projeler, öğrencilere henüz mezun olmadan profesyonel bir ağ kazandırır.</p>
              </div>
              <div class="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Yüksek İstihdam</h4>
                <p class="text-sm text-zinc-400">Münih'in teknoloji ekosisteminin merkezinde yer alan TUM, mezunlarına Avrupa'nın en yüksek maaşlı iş kapılarını aralar.</p>
              </div>
            </div>
          </div>`

      },
      {
        slug: "lmu-master",
        name: "Ludwig Maximilian University of Munich (LMU)",
        ranking: "#1 in Humanities & Law",
        worldRanking: "#54 Global",
        annualTuition: "€0 (Semester fees only)",
        highlights: ["Bilimsel Mükemmeliyet", "Münih'in Akademik Kalbi"],
        departments: ["Neuroscience", "Economics", "Theoretical Physics", "Statistics"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              LMU, Avrupa'nın en saygın ve köklü araştırma üniversitelerinden biridir. Bilimsel mükemmeliyet odağı, üniversiteyi akademik kariyer hedefleyenler için bir dünya otoritesi haline getirir.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Bilimsel Derinlik</h4>
              <p class="text-zinc-600 leading-relaxed">
                Nörobilimden ekonomiye kadar geniş bir yelpazede sunulan master programları, öğrencilere en son araştırmalara doğrudan katılım imkanı sağlar. Münih'in zengin akademik çevresi bu deneyimi taçlandırır.
              </p>
            </div>
          </div>`

      },
      {
        slug: "heidelberg-master",
        name: "Heidelberg University",
        ranking: "Germany's Oldest University",
        worldRanking: "#87 Global",
        annualTuition: "€3,000 (Non-EU students)",
        highlights: ["Tıp ve Yaşam Bilimleri Lideri", "Tarihi ve Bilimsel Miras"],
        departments: ["Molecular Biosciences", "Translational Medical Research", "Law", "Philosophy"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 font-serif italic">
              1386 yılında kurulan Heidelberg, Almanya'nın en eski ve prestijli üniversitesidir. Tıp ve yaşam bilimlerindeki küresel liderliğiyle bir bilim mabedi olarak kabul edilir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-bold text-primary mb-2">Tıbbi Otorite</h4>
              <p class="text-sm text-zinc-600">Moleküler biyoloji ve translasyonel tıp alanındaki master programları, dünyaca ünlü araştırma enstitüleriyle entegre bir şekilde yürütülmektedir.</p>
            </div>
          </div>`

      },
      {
        slug: "rwth-aachen-master",
        name: "RWTH Aachen University",
        ranking: "#1 in Mechanical Engineering",
        worldRanking: "#106 Global",
        annualTuition: "€0 (Semester fees only)",
        highlights: ["Avrupa'nın Teknoloji Üssü", "Mühendislikte Liderlik"],
        departments: ["Automotive Engineering", "Data Science", "Metallurgical Engineering", "Robotics"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              RWTH Aachen, mühendislik ve teknoloji alanında Avrupa'nın "Silikon Vadisi"ne en yakın karşılığıdır. Sanayi ile olan derin bağları, mezunlarına iş dünyasında mutlak bir öncelik sağlar.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Mühendislikte Liderlik</h4>
              <p class="text-zinc-400 text-sm">Otomotivden robotiğe kadar her alanda devrim niteliğinde araştırmalar yürüten RWTH, öğrencilerini küresel teknoloji liderleri olarak yetiştirir.</p>
            </div>
          </div>`

      },
      {
        slug: "tu-berlin-master",
        name: "TU Berlin",
        ranking: "#1 in Innovation",
        worldRanking: "#154 Global",
        annualTuition: "€0 (Semester fees only)",
        highlights: ["Berlin'in Teknoloji Kalbi", "Startup Ekosistemi"],
        departments: ["Information Systems", "Architecture", "Renewable Energy Systems", "Civil Engineering"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Berlin Teknik Üniversitesi (TU Berlin), Almanya'nın kalbinde inovasyonun ve startup ekosisteminin motoru görevini görür. Sürdürülebilirlik ve dijital dönüşüm odaklı vizyonuyla öne çıkar.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">İnovasyon Merkezi</h4>
              <p class="text-sm text-zinc-600">Berlin'in dinamik startup ortamı, TU Berlin öğrencileri için devasa bir uygulama alanı sunar. Enerji ve bilişim sistemlerinde lider master programları mevcuttur.</p>
            </div>
          </div>`

      },
      {
        slug: "humboldt-berlin-master",
        name: "Humboldt University of Berlin",
        ranking: "#1 in Humanities",
        worldRanking: "#120 Global",
        annualTuition: "€0 (Semester fees only)",
        highlights: ["Modern Eğitim Sisteminin Kurucusu", "Bilimsel Derinlik"],
        departments: ["European History", "Theoretical Physics", "Law & Society", "Neurosciences"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic">
              Humboldt Üniversitesi, Wilhelm von Humboldt tarafından kurulan modern eğitim sisteminin beşiğidir. Sosyal bilimlerdeki derinliği, dünya çapında akademisyenler yetiştirir.
            </p>
            <div class="bg-primary/5 p-6 rounded-3xl">
              <h4 class="font-serif font-bold text-primary mb-2">Akademik Miras</h4>
              <p class="text-sm text-zinc-600">Fizikten hukuka kadar her alanda "araştırma ve öğretimin birliği" ilkesini savunan Humboldt, öğrencilere üst düzey bir entelektüel derinlik sunar.</p>
            </div>
          </div>`

      }
    ]
  },
  kanada: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Kanada'da Yüksek Lisans: Eğitim, Araştırma ve Göçmenlik Rotası</h2>
      <p class="mb-6">Kanada, yüksek kaliteli üniversiteleri, araştırma olanakları ve mezuniyet sonrası çalışma izni (PGWP) ile uluslararası öğrenciler için cazip bir hedeftir. Başta Toronto, Vancouver, Montreal olmak üzere teknoloji ve sağlık sektörlerinde güçlü iş piyasaları vardır.</p>
      <p class="mb-6">Mentor Career, program seçimi, ECA işlemleri, burs ve PGWP stratejileri ile öğrencileri göçmenlik hedeflerine göre yönlendirir.</p>
    `,
    advantages: [
      { title: "PGWP ile İş Deneyimi", desc: "Mezuniyet sonrası çalışma izni sayesinde Kanada iş piyasasında değerli deneyim elde edilir." },
      { title: "Göçmenlik Fırsatları", desc: "Express Entry, PNP ve iş deneyimi ile kalıcı oturum şansı artar." },
      { title: "Araştırma ve Asistanlık", desc: "Üniversitelerde RA/TA pozisyonları ve burs imkanları bulunur." },
      { title: "Kaliteli Yaşam", desc: "Güvenli şehirler ve sosyal hizmetler ile yüksek yaşam kalitesi sunulur." }
    ],
    process: [
      { title: "Program & Eyalet Seçimi", desc: "CRS puanınızı maksimize edecek eyalet ve program tercihlerinin belirlenmesi." },
      { title: "Başvuru Hazırlığı", desc: "Transkript, CV, SOP, referanslar ve dil belgelerinin hazırlanması; burs başvuruları." },
      { title: "Kabul & PGWP Planı", desc: "Kabul sonrası PGWP sürecine göre çalışma izni ve göçmenlik planının oluşturulması." },
      { title: "Yerleşim Desteği", desc: "Konaklama, sağlık sigortası ve başlangıç desteği sağlanır." }
    ],
    faq: [
      { q: "PGWP nedir ve ne kadar sürer?", a: "Program süresine bağlı olarak 8 aydan 3 yıla kadar verilebilir; yüksek lisanslar genelde 1-2 yıllık PGWP alır." },
      { q: "ECA gerekli mi?", a: "Göçmenlik başvurularında genellikle ECA talep edilebilir; üniversite başvurularında ise çoğunlukla gerekmez." },
      { q: "Burs nasıl bulunur?", a: "Departman bazlı burslar, araştırma pozisyonları ve şehir bazlı destek programları mevcuttur; erken başvuru önemlidir." },
      { q: "Part-time çalışma mümkün mü?", a: "Öğrenci statüsünde yarı zamanlı çalışma imkanı vardır; sınırlar kayıt türüne göre değişir." }
    ],
    universities: [
      {
        slug: "university-of-toronto-master",
        name: "University of Toronto",
        ranking: "#1 in Canada",
        worldRanking: "#21 Global",
        annualTuition: "CAD$35,000 - $55,000",
        highlights: ["Global Araştırma Gücü", "Toronto'nun Finans Merkezi"],
        departments: ["Applied Computing", "Finance (Rotman)", "Public Policy", "Engineering"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Toronto Üniversitesi, Kanada'nın akademik amiral gemisidir. Rotman School of Management ve Vector Institute gibi merkezleriyle teknoloji ve finans dünyasının en büyük yetenek sağlayıcısıdır.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Küresel Araştırma Gücü</h4>
                <p class="text-sm text-zinc-500">Yapay zekadan biyomedikal mühendisliğe kadar, U of T global inovasyonun tam kalbinde yer alır.</p>
              </div>
              <div class="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Kariyer Merkezi</h4>
                <p class="text-sm text-zinc-400">Toronto'nun finans merkezi ile olan yakınlığı, öğrencilere dünya standartlarında networking fırsatları sunar.</p>
              </div>
            </div>
          </div>`

      },
      {
        slug: "mcgill-master",
        name: "McGill University",
        ranking: "#2 in Canada",
        worldRanking: "#30 Global",
        annualTuition: "CAD$28,000 - $45,000",
        highlights: ["Tıbbi ve Bilimsel Mükemmeliyet", "Montreal'in Kozmopolit Yapısı"],
        departments: ["Neurology", "International Management", "Law", "Sustainability"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Montreal'de bulunan McGill, "Kanada'nın Harvard'ı" olarak bilinir. Özellikle tıp, hukuk ve işletme alanındaki master programları küresel ölçekte en seçkinler arasındadır.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Uluslararası Prestij</h4>
              <p class="text-zinc-600 leading-relaxed italic">
                McGill, araştırmacı ruhlu öğrencilere kozmopolit bir ortamda dünya standartlarında bir eğitim sunar. Mezuniyet sonrası global kariyer kapıları ardına kadar açılır.
              </p>
            </div>
          </div>`

      },
      {
        slug: "ubc-master",
        name: "University of British Columbia (UBC)",
        ranking: "#3 in Canada",
        worldRanking: "#34 Global",
        annualTuition: "CAD$25,000 - $40,000",
        highlights: ["Sürdürülebilirlik Lideri", "Asya-Pasifik Kapısı"],
        departments: ["Data Science", "Clean Energy Engineering", "Oceanography", "Architecture"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              UBC, Vancouver'ın doğal güzelliğiyle iç içe bir dünya üniversitesidir. Sürdürülebilirlik ve pasifik ekonomisi odaklı araştırmalarıyla master öğrencileri için eşsiz bir vizyon sunar.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3 italic">Sürdürülebilirlik Lideri</h4>
              <p class="text-sm text-zinc-600">Yeşil teknoloji ve çevre politikaları konusunda dünyanın en iyi laboratuvarlarına sahip olan UBC, geleceğin liderlerini yetiştirir.</p>
            </div>
          </div>`

      },
      {
        slug: "waterloo-master",
        name: "University of Waterloo",
        ranking: "#1 in Innovation (Canada)",
        worldRanking: "#112 Global",
        annualTuition: "CAD$30,000 - $45,000",
        highlights: ["Co-op ve Uygulamalı Eğitim", "Kuantum ve Kriptografi Lideri"],
        departments: ["Artificial Intelligence", "Computational Mathematics", "Nanotechnology", "Cybersecurity"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Waterloo, teknoloji ve inovasyonda Kanada'nın Silikon Vadisi olarak bilinir. Master programları, sanayi ile iç içe co-op imkanlarıyla mezuniyet sonrası iş garantisi sunar.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Co-op ve Uygulama</h4>
              <p class="text-zinc-400 text-sm">Kuantum bilgisayarlardan siber güvenliğe kadar ileri teknoloji alanlarında dünya lideri olan Waterloo, pratik becerileri akademik derinlikle birleştirir.</p>
            </div>
          </div>`

      },
      {
        slug: "montreal-master",
        name: "University of Montreal",
        ranking: "#1 Francophone Research University",
        worldRanking: "#111 Global",
        annualTuition: "CAD$22,000 - $35,000",
        highlights: ["Yapay Zeka (Mila) Merkezi", "Frankofon Kültür ve Bilim"],
        departments: ["Artificial Intelligence", "Public Health", "Law", "Pharmacy"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Montreal Üniversitesi, dünyanın en büyük yapay zeka araştırma laboratuvarlarından biri olan Mila'ya ev sahipliği yapar. Bilimsel derinliği ve Frankofon mirasıyla benzersizdir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">Yapay Zeka ve Bilim</h4>
              <p class="text-sm text-zinc-600">Yapay zeka ve sağlık bilimlerinde küresel bir otorite olan kurum, öğrencilere Avrupa ve Kuzey Amerika vizyonunu bir arada sunar.</p>
            </div>
          </div>`

      },
      {
        slug: "alberta-master",
        name: "University of Alberta",
        ranking: "#1 in Energy Research",
        worldRanking: "#101 Global",
        annualTuition: "CAD$20,000 - $30,000",
        highlights: ["Enerji ve Sağlık Bilimleri", "Burs İmkanları"],
        departments: ["Petroleum Engineering", "Oncology", "Forestry", "Rehabilitation Medicine"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic">
              Alberta Üniversitesi, enerji kaynakları ve tıp alanındaki araştırmalarıyla tanınır. Edmonton merkezli üniversite, yüksek lisans öğrencilerine geniş burs ve araştırma fonları sağlar.
            </p>
            <div class="bg-primary/5 p-6 rounded-3xl">
              <h4 class="font-serif font-bold text-primary mb-2 italic">Enerji ve İnovasyon</h4>
              <p class="text-sm text-zinc-600">Özellikle sürdürülebilir enerji ve onkoloji araştırmalarında dünya çapında bir merkez olan Alberta, geleceğin araştırmacıları için büyük fırsatlar barındırır.</p>
            </div>
          </div>`

      }
    ]
  },
  isvicre: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">İsviçre'de Yüksek Lisans: Araştırma, Finans ve İnovasyon</h2>
      <p class="mb-6">İsviçre, ETH Zurich, EPFL ve diğer önde gelen üniversiteleri ile mühendislik, veri bilimi ve finans alanlarında yüksek lisans için üst düzey fırsatlar sunar. Üniversiteler güçlü sektör bağlantılarına sahip olup, araştırma fonları geniştir.</p>
      <p class="mb-6">Mentor Career, akademik başvurular, doktora projeleri, kanton bazlı çalışma izinleri ve yeminli tercüme süreçlerinde destek sağlar. Ayrıca uluslararası öğrenciler için yaşam maliyeti ve burs danışmanlığı sunuyoruz.</p>
    `,
    advantages: [
      { title: "Üst Düzey Araştırma", desc: "Büyük araştırma projeleri ve fonlara erişim; laboratuvar imkanları." },
      { title: "Finans & Danışmanlık", desc: "Zürih ve Cenevre merkezlerinde finans ve danışmanlık sektörlerine erişim." },
      { title: "Kanton Destekleri", desc: "Kanton bazlı burslar ve işe yerleştirme programları." },
      { title: "Çokdillilik", desc: "Almanca/Fransızca/İngilizce dillerinde eğitim seçenekleri." }
    ],
    process: [
      { title: "Program ve Danışman Bulma", desc: "Araştırma/proje odaklı programlar için danışman ve proje eşleştirmesi." },
      { title: "Burs & Fon Başvurusu", desc: "Üniversite ve kanton kayıtlı burslara başvuru süreçlerinin yönetimi." },
      { title: "Kayıt ve Kanton İzinleri", desc: "Öğrenci kayıtsi ve mezuniyet sonrası kanton bazlı çalışma izni süreçlerinin takibi." },
      { title: "Konaklama ve Entegrasyon", desc: "Yerleşim, sağlık sigortası ve yerel kayıtlarda destek." }
    ],
    faq: [
      { q: "İngilizce programlar var mı?", a: "Birçok yüksek lisans programı İngilizce sunulmakta, özellikle yüksek lisans/doktora düzeyinde." },
      { q: "Yaşam maliyeti ne kadar?", a: "İsviçre Avrupa'nın en yüksek yaşam maliyetlerine sahip; burs ve kanton destekleri bu yükü azaltabilir." },
      { q: "Mezuniyet sonrası iş bulma?", a: "Kanton bazlı iş arama izinleri ve güçlü endüstri iş birlikleri sayesinde yüksek ihtimalle iş bulunur." },
      { q: "Burs şansı nedir?", a: "Araştırma projeleri ve doktora bursları rekabetçidir ancak mevcuttur; güçlü proje önerisi gerektirir." }
    ],
    universities: [
      {
        slug: "eth-zurich-master",
        name: "ETH Zurich",
        ranking: "#1 in Continental Europe",
        worldRanking: "#7 Global",
        annualTuition: "CHF 1,500 - 2,000 (Semester based)",
        highlights: ["Teknoloji ve Bilimde Dünya Devi", "Einstein'ın Okulu"],
        departments: ["Quantum Engineering", "Cybersecurity", "Robotics", "Physics"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 font-serif">
              ETH Zurich, bilim ve teknoloji alanında dünyanın en iyi üniversitelerinden biridir. Nobel ödüllü onlarca bilim insanın yetiştiği bu kurum, master öğrencilerine en ileri teknoloji laboratuvarlarda araştırma yapma şansı verir.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Bilimsel Mükemmeliyet</h4>
                <p class="text-sm text-zinc-500">Kuantum mühendisliğinden robotiğe kadar, ETH Zurich küresel teknoloji standartlarını belirler.</p>
              </div>
              <div class="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 class="font-serif font-bold text-primary mb-3 italic">İsviçre Hassasiyeti</h4>
                <p class="text-sm text-zinc-400">Akademik disiplin ve sanayi ile olan simbiyotik bağları, mezunlarına teknoloji devlerinde liderlik koltuğu sağlar.</p>
              </div>
            </div>
          </div>`

      },
      {
        slug: "unisg-master",
        name: "University of St. Gallen (HSG)",
        ranking: "#1 in Management (Europe)",
        worldRanking: "#1 in Strategy & Management",
        annualTuition: "CHF 6,000 - 8,000",
        highlights: ["İşletme ve Ekonomide Avrupa Lideri", "Güçlü Finans Ağı"],
        departments: ["Strategy & International Management", "Banking & Finance", "Economics", "Law & Economics"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              St. Gallen, işletme ve ekonomi alanında Avrupa'nın en prestijli okuludur. Mezunları, dünya finans ve danışmanlık sektörünün en tepesinde yer alan isimlerdir.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">İşletme Eliti</h4>
              <p class="text-zinc-600 leading-relaxed italic">
                HSG'nin stratejik yönetim ve finans programları, küresel iş dünyasında "altın standart" olarak kabul edilir. Güçlü mezun ağı, kariyer basamaklarını hızla tırmanmanızı sağlar.
              </p>
            </div>
          </div>`

      },
      {
        slug: "epfl-master",
        name: "EPFL (École Polytechnique Fédérale de Lausanne)",
        ranking: "#1 in Engineering (Continental Europe)",
        worldRanking: "#36 Global",
        annualTuition: "CHF 1,500 - 2,000",
        highlights: ["İsviçre'nin İnovasyon Üssü", "Leman Gölü Kıyısında Bilim"],
        departments: ["Data Science", "Neuro-Engineering", "Computer Science", "Sustainable Energy"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              EPFL, teknoloji ve mühendislik alanında Avrupa'nın en dinamik kurumlarından biridir. Özellikle veri bilimi ve yapay zeka alanındaki araştırmaları küresel düzeydedir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3 italic">İnovasyon Üssü</h4>
              <p class="text-sm text-zinc-600">Leman Gölü kıyısında, bilim ve sanatın kesiştiği EPFL, master öğrencilerine disiplinlerarası bir vizyon ve girişimci bir ruh aşılar.</p>
            </div>
          </div>`

      },
      {
        slug: "uzh-master",
        name: "University of Zurich",
        ranking: "#1 in Finance (Switzerland)",
        worldRanking: "#91 Global",
        annualTuition: "CHF 1,500 - 2,500",
        highlights: ["Nobel Ödüllü Araştırma", "Zürih'in Finans Gücü"],
        departments: ["Banking & Finance", "Informatics", "Life Sciences", "Law"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic">
              Zürih Üniversitesi, Avrupa'nın önde gelen araştırma kurumlarından biridir. Zürih'in finans merkezi konumu, bankacılık ve finans masterı yapan öğrencilere benzersiz fırsatlar sunar.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Finansal Otorite</h4>
              <p class="text-zinc-400 text-sm">Nobel ödüllü bilimsel mirası ve modern finansal araçlara erişimiyle UZH, akademik derinliği profesyonel başarıyla taçlandırır.</p>
            </div>
          </div>`

      },
      {
        slug: "unige-master",
        name: "University of Geneva",
        ranking: "#1 in International Law",
        worldRanking: "#128 Global",
        annualTuition: "CHF 1,000 - 2,000",
        highlights: ["Uluslararası Kurumların Kalbi", "Küresel Diplomasi Merkezi"],
        departments: ["International Relations", "Global Health", "Finance", "Sustainable Development"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Cenevre Üniversitesi, BM ve diğer uluslararası kuruluşların kalbinde yer alır. Uluslararası ilişkiler ve hukuk alanındaki master programları, küresel diplomasi kariyeri için idealdir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">Küresel Diplomasi</h4>
              <p class="text-sm text-zinc-600">Uluslararası hukukun ve diplomasinin kalbinde eğitim alarak, dünya sahnesinde aktif rol oynayacak bir ağ ve bilgi birikimi edinin.</p>
            </div>
          </div>`

      }
    ]
  },
  irlanda: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">İrlanda'da Yüksek Lisans: Teknoloji ve İnovasyonun Kalbi</h2>
      <p class="mb-6">İrlanda, Google, Apple, Facebook ve Microsoft gibi dünya devi teknoloji şirketlerinin Avrupa merkezlerine ev sahipliği yapmasıyla "Avrupa'nın Silikon Vadisi" olarak anılır. Güvenli, arkadaş canlısı ve tamamen İngilizce konuşulan bir ortamda yüksek lisans yapmak isteyen öğrenciler için ideal bir destinasyondur.</p>
      <p class="mb-6">İrlanda üniversiteleri (Trinity College Dublin, UCD vb.) dünya sıralamalarında üst basamaklarda yer alır. Master programları genellikle 1 yıl sürer ve yoğun, endüstri odaklı bir eğitim sunar.</p>
      <p class="mb-6">Mentor Career, üniversite başvuruları, kişiselleştirilmiş niyet mektubu hazırlığı, kayıt süreci ve mezuniyet sonrası çalışma izni başvurularında tam destek sağlamaktadır.</p>
    `,
    advantages: [
      { title: "Teknoloji ve İş Dünyası", desc: "Global teknoloji ve ilaç şirketlerine yakınlık, staj ve networking imkanları." },
      { title: "Mezuniyet Sonrası Çalışma", desc: "Yüksek lisans mezunlarına sunulan 2 yıllık 'Third Level Graduate Scheme' ile iş arama izni." },
      { title: "Anadil İngilizce", desc: "Avrupa'da anadili İngilizce olan nadir ülkelerden biri olması sebebiyle dil bariyerinin olmaması." },
      { title: "Yüksek İstihdam Oranı", desc: "İrlanda'nın dinamik ekonomisi sayesinde mezunların kısa sürede iş bulma potansiyeli." }
    ],
    process: [
      { title: "Üniversite ve Alan Seçimi", desc: "Kariyer hedeflerinize ve mezuniyet sonrası iş imkanlarına göre stratejik program seçimi." },
      { title: "Başvuru Paketinin Oluşturulması", desc: "Akademik transkriptler, niyet mektubu (SOP) ve referansların İrlanda standartlarına göre hazırlanması." },
      { title: "Kayıt Danışmanlığı", desc: "İrlanda öğrenci kaydı için finansal kanıtlar ve gerekli dökümanların titizlikle hazırlanması." },
      { title: "Yerleşim ve Oryantasyon", desc: "Konaklama bulma, GNIB (Garda) kaydı ve İrlanda'daki yaşama uyum desteği." }
    ],
    faq: [
      { q: "İrlanda'da master süresi ne kadardır?", a: "Çoğu yüksek lisans programı tam zamanlı olarak 1 takvim yılı (12 ay) sürer." },
      { q: "Eğitim maliyetleri nasıldır?", a: "Uluslararası öğrenciler için harçlar yıllık 10.000€ ile 25.000€ arasında değişmektedir." },
      { q: "Mezuniyet sonrası kalabilir miyim?", a: "Evet, master mezunları 2 yıl boyunca İrlanda'da tam zamanlı çalışma hakkına sahiptir." },
      { q: "İngilizce yeterlilik şartı nedir?", a: "Genellikle IELTS 6.5 veya dengi bir skor talep edilir." }
    ],
    universities: [
      {
        slug: "tcd-master",
        name: "Trinity College Dublin",
        ranking: "#1 in Ireland",
        worldRanking: "#81 Global",
        annualTuition: "€15,000 - €25,000",
        highlights: ["Tarihi ve Akademik Prestij", "Dublin'in Kalbi"],
        departments: ["Digital Marketing", "Computer Science", "Creative Writing", "Global Business"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              1592'de kurulan Trinity College, İrlanda'nın en köklü ve saygın üniversitesidir. Dublin'in merkezindeki tarihi kampüsü, akademik derinlik ve modern teknolojinin mükemmel bir birleşimidir.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Tarihi Miras</h4>
                <p class="text-sm text-zinc-500">Yüzyıllık kütüphanesi ve akademik geleneğiyle Trinity, Avrupa'nın en prestijli eğitim kurumlarından biridir.</p>
              </div>
              <div class="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Teknoloji Merkezi</h4>
                <p class="text-sm text-zinc-400">Dublin'in "Silicon Docks" bölgesine komşu olan kampüs, global teknoloji devleriyle doğrudan etkileşim imkanı sunar.</p>
              </div>
            </div>
          </div>`

      },
      {
        slug: "ucd-master",
        name: "University College Dublin (UCD)",
        ranking: "#1 in Employer Reputation",
        worldRanking: "#171 Global",
        annualTuition: "€14,000 - €22,000",
        highlights: ["İş Dünyası ile Güçlü Bağlar", "Uluslararası Kampüs"],
        departments: ["Business Analytics", "Food Science", "International Relations", "Engineering"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              UCD, mezunlarının istihdam edilebilirliği konusunda İrlanda'nın lideridir. Smurfit Graduate Business School, dünya çapında akredite edilmiş seçkin bir işletme okuludur.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Kariyer Odaklı</h4>
              <p class="text-zinc-600 leading-relaxed">
                UCD'nin endüstri odaklı master programları, öğrencilere gerçek dünya vaka çalışmaları ve kapsamlı bir networking ağı sunarak profesyonel hayata hazırlar.
              </p>
            </div>
          </div>`

      },
      {
        slug: "ucc-master",
        name: "University College Cork (UCC)",
        ranking: "#1 in Sustainability",
        worldRanking: "#292 Global",
        annualTuition: "€13,000 - €20,000",
        highlights: ["Sürdürülebilirlik ve Gıda Bilimi", "Yeşil Kampüs"],
        departments: ["Food Science", "Cybersecurity", "Marine Biology", "Digital Humanities"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              UCC, gıda bilimleri ve sürdürülebilirlik alanında dünya lideridir. Cork şehrinin dinamik yapısı, teknoloji ve ilaç sanayi ile olan bağları öğrencilere geniş fırsatlar sunar.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3 italic">Sürdürülebilirlik Lideri</h4>
              <p class="text-sm text-zinc-600">Yeşil kampüsü ve çevre dostu araştırmalarıyla UCC, sürdürülebilir gelecek için inovatif çözümler üreten master programları sunar.</p>
            </div>
          </div>`

      },
      {
        slug: "dcu-master",
        name: "Dublin City University (DCU)",
        ranking: "#1 in Ireland (Innovation)",
        worldRanking: "#430 Global",
        annualTuition: "€12,000 - €18,000",
        highlights: ["Modern ve Yenilikçi", "Girişimcilik Odaklı"],
        departments: ["Computing", "Data Analytics", "Electronic Engineering", "Journalism"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic">
              DCU, İrlanda'nın en genç ve dinamik üniversitelerinden biridir. Endüstriyle olan yakın iş birlikleri ve teknoloji odaklı master programlarıyla tanınır.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Yenilikçi Vizyon</h4>
              <p class="text-zinc-400 text-sm">Girişimciliği odağına alan DCU, öğrencilerine startup ekosisteminde ve global teknoloji şirketlerinde fark yaratacak yetkinlikler kazandırır.</p>
            </div>
          </div>`

      },
      {
        slug: "galway-master",
        name: "University of Galway",
        ranking: "#1 in MedTech",
        worldRanking: "#289 Global",
        annualTuition: "€13,000 - €19,000",
        highlights: ["Medikal Teknoloji Merkezi", "Vahşi Atlantik Yolu"],
        departments: ["Biomedical Engineering", "Software Design", "Data Science", "Human Rights Law"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Galway Üniversitesi, Avrupa'nın MedTech başkentinde yer alır. Özellikle biyomedikal mühendislik ve yazılım tasarımı alanındaki programları dünya çapında talep görür.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">Medikal Teknoloji</h4>
              <p class="text-sm text-zinc-600">Vahşi Atlantik Yolu üzerindeki bu tarihi kampüs, en ileri sağlık teknolojilerini yaratıcı ve araştırmacı bir yaklaşımla harmanlar.</p>
            </div>
          </div>`

      }
    ]
  },
  avustralya: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Avustralya'da Yüksek Lisans: Araştırma, Endüstri ve Göçmenlik</h2>
      <p class="mb-6">Avustralya, güçlü araştırma altyapısı ve mezuniyet sonrası göç yolları ile uluslararası öğrenciler için stratejik bir hedeftir. Üniversiteler uygulamalı stajlar, endüstri ortaklıkları ve CRICOS kayıtlı programlar sunar.</p>
      <p class="mb-6">Mentor Career, CRICOS doğrulaması, kayıt başvuruları, OSHC düzenlemeleri ve Skilled Migration stratejileri konusunda tam destek sağlar. Ayrıca mesleki değerlendirme (Skills Assessment) süreçlerinde yol gösteriyoruz.</p>
    `,
    advantages: [
      { title: "Mezuniyet Sonrası Göç", desc: "Temporary Graduate enrollment ve skilled migration yolları ile kalıcılık planları yapılabilir." },
      { title: "Endüstri Bağlantıları", desc: "Staj ve proje tabanlı eğitimle işverenlerle doğrudan temas imkanı." },
      { title: "Araştırma Fonları", desc: "Üniversiteler araştırma bursları ve fonlar sağlar; doktora yolu açık olabilir." },
      { title: "Yaşam Kalitesi", desc: "Güçlü sosyal altyapı ve öğrenci destek hizmetleri." }
    ],
    process: [
      { title: "Program Seçimi ve CRICOS", desc: "CRICOS kayıtlı programların tespiti ve göçmenlikle uyumlu seçimlerin yapılması." },
      { title: "Başvuru ve Kayıt", desc: "Kabul süreci, OSHC ve öğrenci kaydı belgelerinin hazırlanması." },
      { title: "Skills Assessment & Denklik", desc: "Mesleğe özel değerlendirmelerin (VETASSESS, Engineers Australia vb.) yönetimi." },
      { title: "Mezuniyet Sonrası Planlama", desc: "Temporary Graduate enrollment sonrası kalıcılık ve iş arama stratejileri." }
    ],
    faq: [
      { q: "Temporary Graduate enrollment nedir?", a: "Mezunlara belirli süreyle çalışma hakkı veren kayıt türüdür; süresi programa göre değişir." },
      { q: "CRICOS neden önemlidir?", a: "Uluslararası öğrenciler için kayıtlı programların güvence altına alınmasını sağlar." },
      { q: "Skills Assessment gerekli mi?", a: "Bazı meslekler ve kayıt türleri için mesleki değerlendirme zorunludur." },
      { q: "Burs şansı var mı?", a: "Araştırma bursları ve üniversite destekleri mevcuttur; erken başvuru fayda sağlar." }
    ],
    universities: [
      {
        slug: "unimelb-master",
        name: "University of Melbourne",
        ranking: "#1 in Australia",
        worldRanking: "#14 Global",
        annualTuition: "AUD$35,000 - $50,000",
        highlights: ["Araştırma Mükemmeliyeti", "Melbourne'un Kültürel Merkezi"],
        departments: ["Education", "Law", "Medicine", "Engineering"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 font-serif">
              Melbourne Üniversitesi, Avustralya'nın en yüksek dereceli araştırma kurumudur. Global işbirlikleri ve inovasyon odaklı master programlarıyla öğrencilerini küresel liderliğe hazırlar.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Araştırma Mükemmeliyeti</h4>
                <p class="text-sm text-zinc-500">Tıp, hukuk ve mühendislik alanındaki araştırmalarıyla dünya çapında otorite kabul edilir.</p>
              </div>
              <div class="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Melbourne Vizyonu</h4>
                <p class="text-sm text-zinc-400">Avustralya'nın kültür başkentinde, akademik derinlik ve modern yaşamın mükemmel dengesini keşfedin.</p>
              </div>
            </div>
          </div>`

      },
      {
        slug: "usyd-master",
        name: "University of Sydney",
        ranking: "#2 in Australia",
        worldRanking: "#19 Global",
        annualTuition: "AUD$38,000 - $48,000",
        highlights: ["Kariyer ve İstihdam Lideri", "İkonik Kampüs"],
        departments: ["MBA", "Health Sciences", "Architecture", "Project Management"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Sydney Üniversitesi, mezun istihdam edilebilirliği konusunda dünya liderlerinden biridir. Sanayiye yakın kampüsü ve uygulamalı eğitim modeliyle bilinir.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Kariyer ve İstihdam</h4>
              <p class="text-zinc-600 leading-relaxed">
                İkonik kampüsü ve güçlü endüstri bağlantılarıyla Sydney, öğrencilerine mezuniyet sonrası global şirketlerde öncelikli kariyer fırsatları sunar.
              </p>
            </div>
          </div>`

      },
      {
        slug: "anu-master",
        name: "Australian National University (ANU)",
        ranking: "#1 in Research (Australia)",
        worldRanking: "#34 Global",
        annualTuition: "AUD$35,000 - $45,000",
        highlights: ["Ulusal Araştırma Merkezi", "Politika ve Diplomasi Otoritesi"],
        departments: ["International Relations", "Quantum Computing", "Public Policy", "Strategic Studies"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              ANU, Avustralya'nın başkenti Canberra'da yer alan, araştırma odaklı en seçkin üniversitesidir. Uluslararası ilişkiler ve stratejik araştırmalar alanında global bir liderdir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3 italic">Politika ve Diplomasi</h4>
              <p class="text-sm text-zinc-600">Başkentte yer almanın avantajıyla, uluslararası politika ve kamu yönetimi alanında en yetkin uzmanlarla çalışma şansı yakalayın.</p>
            </div>
          </div>`

      },
      {
        slug: "unsw-master",
        name: "UNSW Sydney",
        ranking: "#1 in Engineering (Australia)",
        worldRanking: "#19 Global",
        annualTuition: "AUD$40,000 - $52,000",
        highlights: ["Mühendislik ve İşletme Gücü", "İnovasyon Kampüsü"],
        departments: ["Renewable Energy Engineering", "Data Science", "Finance", "Advanced Materials"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic">
              UNSW Sydney, mühendislik ve teknoloji alanında Avustralya'nın öncü kurumudur. Sürdürülebilir enerji ve kuantum araştırmalarındaki başarısıyla tanınır.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Teknoloji ve İnovasyon</h4>
              <p class="text-zinc-400 text-sm">İnovasyon kampüsü ve modern laboratuvarlarıyla UNSW, öğrencilerini geleceğin teknolojilerini tasarlayan mühendisler olarak yetiştirir.</p>
            </div>
          </div>`

      },
      {
        slug: "uq-master",
        name: "University of Queensland (UQ)",
        ranking: "#1 in Environmental Science",
        worldRanking: "#43 Global",
        annualTuition: "AUD$32,000 - $44,000",
        highlights: ["Bilimsel Keşif Merkezi", "Brisbane'in Eşsiz Kampüsü"],
        departments: ["Biotechnology", "Agriculture", "Environmental Management", "Mining Engineering"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              UQ, bilimsel keşif ve çevresel araştırmalar konusunda dünya çapında bir otoritedir. Geniş kampüsü ve modern araştırma tesisleriyle master öğrencileri için mükemmel bir ortam sunar.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">Çevresel Bilimler</h4>
              <p class="text-sm text-zinc-600">Biyoteknoloji ve sürdürülebilirlik alanındaki programlarıyla UQ, küresel sorunlara bilimsel çözümler üreten liderler yetiştirir.</p>
            </div>
          </div>`

      }
    ]
  },
  belcika: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Belçika'da Yüksek Lisans: Avrupa Ağları ve Çokdillilik</h2>
      <p class="mb-6">Belçika, Brüksel merkezli AB kurumlarına yakınlığı, çokdilli eğitim ortamı ve uluslararası programları ile öne çıkar. Hukuk, kamu politikası, uluslararası ilişkiler ve Avrupa çalışmaları alanlarında güçlü akademik programlar mevcuttur.</p>
      <p class="mb-6">Mentor Career, bölge (Flandre/Wallonie/Brüksel) seçimi, dil gereksinimleri, UNICAF ve Erasmus+ fırsatları konusunda öğrencilere rehberlik eder.</p>
    `,
    advantages: [
      { title: "AB ve Uluslararası Kurumlara Erişim", desc: "Brüksel'e yakınlık sayesinde staj ve iş olanakları artar." },
      { title: "Çokdilli Eğitim", desc: "Hollandaca, Fransızca ve İngilizce program seçenekleri ile esneklik." },
      { title: "Erasmus & Değişim", desc: "Erasmus programları ve uluslararası değişim fırsatları." },
      { title: "Kariyer Fırsatları", desc: "AB kurumları ve sivil toplum kuruluşlarıyla iş imkanı." }
    ],
    process: [
      { title: "Bölgeye Göre Üniversite Seçimi", desc: "Flandre (Hollandaca), Wallonie (Fransızca) veya Brüksel (çokdilli) tercihi yapılır." },
      { title: "Dil ve Belgeler", desc: "Program diline göre dil belgeleri, transkript ve referansların hazırlanması." },
      { title: "Değişim ve Burs Başvuruları", desc: "Erasmus+, UNICAF ve üniversite bursları için başvuruların yapılması." },
      { title: "Staj ve Network", desc: "AB kurumları ve sivil toplum kuruluşlarıyla bağlantı kurma desteği." }
    ],
    faq: [
      { q: "Hangi dil tercih edilmeli?", a: "Hedef sektöre göre; AB kurumları için İngilizce avantaj sağlar, yerel iş için bölge dilini bilmek faydalıdır." },
      { q: "Erasmus fırsatı var mı?", a: "Evet, birçok program Erasmus değişim imkanları sunar." },
      { q: "Burs nasıl bulunur?", a: "Üniversite bursları, AB destekleri ve departman fonları araştırılmalıdır." },
      { q: "Mezuniyet sonrası imkanlar?", a: "AB kurumları ve Brüksel merkezli şirketlerde staj ve istihdam imkanları yüksektir." }
    ],
    universities: [
      {
        slug: "kuleuven-master",
        name: "KU Leuven",
        ranking: "#1 in Belgium",
        worldRanking: "#45 Global",
        annualTuition: "€1,000 - €7,000",
        highlights: ["Avrupa'nın En Yenilikçi Üniversitesi", "Köklü Tarih"],
        departments: ["Artificial Intelligence", "Bioscience Engineering", "Economics", "Philosophy"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              KU Leuven, Avrupa'nın en eski ve en yenilikçi üniversitelerinden biridir. Özellikle teknoloji transferi ve disiplinlerarası araştırmalarda dünya çapında bir modeldir.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">İnovasyon Lideri</h4>
                <p class="text-sm text-zinc-500">Reuters tarafından defalarca Avrupa'nın en yenilikçi üniversitesi seçilen kurum, AR-GE odaklı master programları sunar.</p>
              </div>
              <div class="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Akademik Miras</h4>
                <p class="text-sm text-zinc-400">1425 yılından bu yana gelen akademik disiplin, modern teknolojilerle birleşerek benzersiz bir eğitim sunar.</p>
              </div>
            </div>
          </div>`

      },
      {
        slug: "ugent-master",
        name: "Ghent University",
        ranking: "#2 in Belgium",
        worldRanking: "#84 Global",
        annualTuition: "€1,000 - €6,000",
        highlights: ["Yaşam Bilimleri ve Veterinerlikte Öncü", "Araştırma Odaklı"],
        departments: ["Veterinary Science", "Agro-food Technology", "Law", "Marine Sciences"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Ghent Üniversitesi, bilimsel bağımsızlık ve toplumsal bağlılık ilkeleriyle eğitim verir. Yaşam bilimleri alanındaki master programları küresel ölçekte en iyiler arasındadır.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Yaşam Bilimleri Otoritesi</h4>
              <p class="text-zinc-600 leading-relaxed">
                Biyoteknolojiden veterinerliğe kadar geniş bir yelpazede araştırma odaklı eğitim sunan Ghent, öğrencilerini bilim dünyasının ön saflarına yerleştirir.
              </p>
            </div>
          </div>`

      },
      {
        slug: "ulb-master",
        name: "Université Libre de Bruxelles (ULB)",
        ranking: "#1 in Social Sciences (Brussels)",
        worldRanking: "#189 Global",
        annualTuition: "€1,000 - €4,500",
        highlights: ["Uluslararası Diplomasi Merkezi", "Özgür Düşünce Geleneği"],
        departments: ["International Relations", "European Studies", "Public Health", "Political Science"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              ULB, Avrupa'nın kalbi Brüksel'de yer alan çok kültürlü bir araştırma üniversitesidir. AB kurumlarına yakınlığı, özellikle siyaset bilimi ve uluslararası ilişkiler öğrencileri için eşsiz staj fırsatları sunar.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3 italic">Uluslararası Diplomasi</h4>
              <p class="text-sm text-zinc-600">Avrupa Birliği'nin merkezinde eğitim alarak, küresel politika ve diplomasi dünyasında aktif bir network oluşturun.</p>
            </div>
          </div>`

      },
      {
        slug: "vub-master",
        name: "Vrije Universiteit Brussel (VUB)",
        ranking: "#1 in Engineering & Tech (Brussels)",
        worldRanking: "#251 Global",
        annualTuition: "€1,000 - €5,000",
        highlights: ["İnovasyon ve Girişimcilik", "Kentsel ve Global Bağlantılar"],
        departments: ["Computer Science", "Photonics", "Business Engineering", "Structural Engineering"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic">
              VUB, teknoloji ve inovasyon odaklı yaklaşımıyla bilinen dinamik bir üniversitedir. Brüksel'in uluslararası ekosistemiyle olan bağı, öğrencilere küresel bir vizyon kazandırır.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Kentsel ve Global Bağlantılar</h4>
              <p class="text-zinc-400 text-sm">Fotonikten iş mühendisliğine kadar teknik alanlarda uzmanlaşan VUB, Brüksel'in kozmopolit yapısını akademik bir avantaja dönüştürür.</p>
            </div>
          </div>`

      },
      {
        slug: "antwerp-master",
        name: "University of Antwerp",
        ranking: "#1 in Young Universities (Belgium)",
        worldRanking: "#280 Global",
        annualTuition: "€1,000 - €5,800",
        highlights: ["Lojistik ve İşletme Merkezi", "Kariyer Odaklı Eğitim"],
        departments: ["Global Supply Chain Management", "Applied Economics", "Infectious Diseases", "Sustainable Development"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Antwerp Üniversitesi, lojistik ve ticaretin Avrupa merkezinde yer alır. Özellikle tedarik zinciri yönetimi ve uygulamalı ekonomi alanındaki master programları sanayi ile iç içedir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">Lojistik ve Ticaret</h4>
              <p class="text-sm text-zinc-600">Avrupa'nın en büyük ikinci limanına ev sahipliği yapan şehirde, global ticaretin kalbinde pratik ve teorik eğitimi birleştirin.</p>
            </div>
          </div>`

      }
    ]
  },
  hollanda: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Hollanda'da Yüksek Lisans: Araştırma, Yenilik ve Uluslararası Ağlar</h2>
      <p class="mb-6">Hollanda, İngilizce programların yaygınlığı, araştırma odaklı üniversiteleri ve güçlü sektör iş birlikleri ile uluslararası öğrenciler için cazip bir hedeftir. Özellikle mühendislik, işletme ve çevre bilimleri alanlarında öne çıkar.</p>
      <p class="mb-6">Mentor Career, Studielink başvuruları, dil gereksinimleri, burs ve sektör bağlantıları konusunda destek sunar; üniversite bazlı proje fonlarına erişim konusunda rehberlik ederiz.</p>
    `,
    advantages: [
      { title: "İngilizce Program Çeşitliliği", desc: "Birçok master programı tamamen İngilizce olarak sunulur, bu da giriş bariyerini düşürür." },
      { title: "Araştırma ve Yenilik", desc: "Üniversitelerde uygulamalı projeler, startup ve KOBİ iş birlikleri yaygındır." },
      { title: "Mezuniyet Sonrası İmkanlar", desc: "Hollanda, mezunlara iş arama ve kayıt kolaylıkları sağlar." },
      { title: "Burs ve Destekler", desc: "Üniversite ve hükümet destekli burslar mevcuttur; araştırma projeleri fon sağlar." }
    ],
    process: [
      { title: "Studielink ve Başvuru", desc: "Studielink portalı ile üniversite başvuruları, gerekli belgelerin yüklenmesi." },
      { title: "Dil ve Akademik Evraklar", desc: "IELTS/TOEFL veya Hollanda dilleri için gereken belgelerin hazırlanması; transkriptlerin değerlendirilmesi." },
      { title: "Burs Başvuruları", desc: "Üniversite ve dış burs programları için erken başvuru stratejileri." },
      { title: "Yerleştirme ve İş Ağı", desc: "Kariyer ofisleri ile iş ağı kurma ve staj imkanlarının takibi." }
    ],
    faq: [
      { q: "Programlar İngilizce mi?", a: "Evet; birçok yüksek lisans programı İngilizce sunulmaktadır." },
      { q: "Mezuniyet sonrası kayıt imkanı var mı?", a: "Evet, mezunlara belirli süre iş arama ve çalışma imkanı tanınır." },
      { q: "Burs bulma şansı nasıl?", a: "Akademik başarı ve erken başvuru burs şansını artırır; bazı programlar proje fonu sağlar." },
      { q: "Konaklama kolay mı?", a: "Üniversiteler öğrenciler için rehberlik sağlar ancak büyük şehirlerde erken arama önemlidir." }
    ],
    universities: [
      {
        slug: "tudelft-master",
        name: "Delft University of Technology (TU Delft)",
        ranking: "#1 in Netherlands (Engineering)",
        worldRanking: "#47 Global",
        annualTuition: "€15,000 - €20,000",
        highlights: ["Mühendislik ve Mimarlıkta Dünya Devi", "İnovasyon Kampüsü"],
        departments: ["Aerospace Engineering", "Architecture", "Water Management", "Sustainable Energy"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 font-serif">
              TU Delft, teknik eğitimde dünyanın en saygın kurumlarından biridir. Geleceğin şehirlerini ve teknolojilerini tasarlayan master programlarıyla tanınır.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Teknik Dominans</h4>
                <p class="text-sm text-zinc-500">Havacılıktan su yönetimine kadar, Delft global mühendislik projelerinin merkez üssüdür.</p>
              </div>
              <div class="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 class="font-serif font-bold text-primary mb-3 italic">İnovasyon Kampüsü</h4>
                <p class="text-sm text-zinc-400">Startup ekosistemi ve sanayi ortaklıkları, öğrencilere mezuniyet öncesi profesyonel yetkinlik kazandırır.</p>
              </div>
            </div>
          </div>`

      },
      {
        slug: "uva-master",
        name: "University of Amsterdam (UvA)",
        ranking: "#1 in Netherlands (General)",
        worldRanking: "#53 Global",
        annualTuition: "€14,000 - €19,000",
        highlights: ["Medya ve İletişimde Dünya Birincisi", "Amsterdam'ın Kalbinde"],
        departments: ["Communication Science", "AI", "Psychology", "Sociology"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              UvA, sosyal bilimler ve dijital teknolojilerde Avrupa'nın akademik kalbidir. Amsterdam'ın yaratıcı atmosferiyle bütünleşmiş bir eğitim sunar.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Medya ve İletişim</h4>
              <p class="text-zinc-600 leading-relaxed italic">
                İletişim bilimlerinde dünya birincisi olan UvA, dijital çağın gereksinimlerine göre şekillenmiş, disiplinlerarası bir eğitim modeli sunar.
              </p>
            </div>
          </div>`

      },
      {
        slug: "eur-master",
        name: "Erasmus University Rotterdam",
        ranking: "#1 in Business & Economics (NL)",
        worldRanking: "#72 Global",
        annualTuition: "€12,000 - €18,000",
        highlights: ["Ekonomi ve Sağlık Yönetimi Lideri", "Modern ve Profesyonel Odak"],
        departments: ["Supply Chain Management", "Global Markets", "Health Economics", "Finance"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Erasmus Üniversitesi Rotterdam, ekonomi ve işletme alanında dünya çapında bir otoritedir. Rotterdam Limanı'nın sağladığı ticari dinamizm, öğrencilere eşsiz vaka çalışmaları ve kariyer yolları sunar.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3 italic">Ekonomik Otorite</h4>
              <p class="text-sm text-zinc-600">Tedarik zinciri yönetiminden finansa kadar, Erasmus mezunları global iş dünyasının en çok aranan profesyonelleridir.</p>
            </div>
          </div>`

      },
      {
        slug: "leiden-master",
        name: "Leiden University",
        ranking: "#1 in Law & Humanities (NL)",
        worldRanking: "#126 Global",
        annualTuition: "€13,000 - €17,500",
        highlights: ["Köklü Hukuk Geleneği", "Uluslararası Adalet Şehri"],
        departments: ["International Law", "Air and Space Law", "Cyber Security", "Archaeology"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic">
              1575'te kurulan Leiden, Hollanda'nın en eski üniversitesidir. Lahey'deki kampüsüyle uluslararası hukuk ve diplomasi alanında dünyanın en önemli eğitim merkezlerinden biridir.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Hukuk ve Diplomasi</h4>
              <p class="text-zinc-400 text-sm">Uluslararası adalet şehri Lahey'in kalbinde, dünya çapında hukukçular ve diplomatlarla bir arada eğitim alma ayrıcalığını yaşayın.</p>
            </div>
          </div>`

      },
      {
        slug: "utrecht-master",
        name: "Utrecht University",
        ranking: "#1 in Research (Netherlands)",
        worldRanking: "#107 Global",
        annualTuition: "€15,000 - €21,000",
        highlights: ["Disiplinlerarası Bilimsel Yaklaşım", "Öğrenci Dostu Tarihi Şehir"],
        departments: ["Life Sciences", "Sustainability Management", "Artificial Intelligence", "Geoscience"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Utrecht Üniversitesi, bilimsel araştırmadaki derinliği ve yenilikçi eğitim modelleriyle tanınır. Yaşam bilimleri ve sürdürülebilirlik alanındaki master programları dünya lideridir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">Bilimsel Araştırma</h4>
              <p class="text-sm text-zinc-600">Disiplinlerarası yaklaşımıyla Utrecht, öğrencilerine karmaşık toplumsal sorunlara bilimsel çözümler üretecek yetkinlik kazandırır.</p>
            </div>
          </div>`

      }
    ]
  },
  polonya: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Polonya'da Yüksek Lisans: Uygun Maliyet, AB Geçerliliği ve Hızlı Kabul</h2>
      <p class="mb-6">Polonya, ekonomik eğitim maliyetleri, İngilizce program seçenekleri ve Avrupa diploma geçerliliği ile çekici bir yüksek lisans destinasyonudur. Özellikle tıp, eczacılık, mühendislik ve bilişim alanlarında kaliteli programlar sunar.</p>
      <p class="mb-6">Mentor Career, üniversite seçimi, yeminli tercüme, başvuru ve kayıt süreçlerinde adım adım destek sağlar; ayrıca burs ve konaklama seçeneklerini araştırır.</p>
    `,
    advantages: [
      { title: "Çok Uygun Maliyet", desc: "Öğrenim ve yaşam maliyetleri Avrupa ortalamasının altındadır; öğrenciler için ekonomik seçenekler mevcuttur." },
      { title: "AB Tanınırlığı", desc: "Bologna süreci sayesinde dereceler Avrupa'da tanınır ve hareketlilik kolaydır." },
      { title: "Hızlı Kabul", desc: "Bazı programlarda hızlı değerlendirme ve döngülerle kabul sağlanır." },
      { title: "İngilizce Programlar", desc: "Birçok alanda İngilizce program seçeneği bulunmaktadır." }
    ],
    process: [
      { title: "Program Araştırması", desc: "Alanınıza en uygun üniversitelerin ve programların listelenmesi." },
      { title: "Evrak Hazırlığı", desc: "Transkript, diploma, referanslar ve yeminli tercümelerin hazırlanması; apostil işleri." },
      { title: "Kabul ve Konaklama", desc: "Resmi kabul işlemleri, konaklama seçeneklerinin araştırılması ve öğrenci kaydı başvurusu." },
      { title: "Entegrasyon Desteği", desc: "Yerel kayıt, banka hesabı, sağlık sigortası ve oryantasyon desteği." }
    ],
    faq: [
      { q: "Eğitim maliyeti nedir?", a: "Devlet ve ücretli programlar arasında değişir; genel olarak maliyetler Batı Avrupa'ya göre daha düşüktür." },
      { q: "Diploma AB'de geçerli mi?", a: "Evet, Bologna sürecine dahil üniversitelerin diplomaları AB'de genellikle tanınır." },
      { q: "İngilizce program var mı?", a: "Çok sayıda lisansüstü program İngilizce sunulmaktadır; program bazlı kontrol önemlidir." },
      { q: "Konaklama kolay mı?", a: "Üniversitelerin öğrenci yurtları ve özel konaklama seçenekleri bulunmaktadır; erken başvuru önerilir." }
    ],
    universities: [
      {
        slug: "uw-master",
        name: "University of Warsaw",
        ranking: "#1 in Poland",
        worldRanking: "#262 Global",
        annualTuition: "€2,000 - €4,500",
        highlights: ["Polonya'nın En Prestijli Kurumu", "Sosyal Bilimlerde Güçlü"],
        departments: ["International Relations", "Archaeology", "Physics", "Philosophy"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Varşova Üniversitesi, Polonya'nın akademik ve entelektüel merkezidir. Geniş İngilizce program yelpazesiyle uluslararası öğrenciler için kapı niteliğindedir.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Akademik Prestij</h4>
                <p class="text-sm text-zinc-500">Polonya'nın en iyi üniversitesi olarak kabul edilen kurum, sosyal ve fen bilimlerinde global standartlarda eğitim sunar.</p>
              </div>
              <div class="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Kariyer Fırsatları</h4>
                <p class="text-sm text-zinc-400">Başkentte yer almanın avantajıyla, uluslararası şirketler ve diplomatik misyonlarla iç içe bir eğitim deneyimi yaşayın.</p>
              </div>
            </div>
          </div>`

      },
      {
        slug: "agh-master",
        name: "AGH University of Science and Technology",
        ranking: "Top Technical University",
        worldRanking: "#801 Global",
        annualTuition: "€2,500 - €3,500",
        highlights: ["Mühendislik ve Madencilik Lideri", "Modern Laboratuvarlar"],
        departments: ["Mining Engineering", "Cybersecurity", "Energy Engineering", "Materials Science"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              AGH, Krakow'un teknik ve inovasyon üssüdür. Sanayi ile olan yakın bağları, mühendislik masterı yapan öğrencilere kariyerlerinde büyük avantaj sağlar.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Teknik Mükemmeliyet</h4>
              <p class="text-zinc-600 leading-relaxed italic">
                Modern laboratuvarları ve endüstri odaklı projeleriyle AGH, öğrencilerini siber güvenlikten enerji mühendisliğine kadar geleceğin uzmanları olarak hazırlar.
              </p>
            </div>
          </div>`

      },
      {
        slug: "uj-master",
        name: "Jagiellonian University",
        ranking: "#2 in Poland",
        worldRanking: "#304 Global",
        annualTuition: "€2,500 - €5,000",
        highlights: ["650 Yıllık Akademik Miras", "Krakow'un Entelektüel Kalbi"],
        departments: ["International Relations", "Molecular Biotechnology", "Polish Studies", "Medicine"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              1364'te kurulan Jagiellonian, Avrupa'nın en eski üniversitelerinden biridir. Krakow'un tarihi dokusuyla birleşen köklü akademik geleneği, master öğrencilerine eşsiz bir vizyon katar.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3 italic">650 Yıllık Miras</h4>
              <p class="text-sm text-zinc-600">Kopernik ve Papa II. John Paul gibi isimlerin mezun olduğu bu kurumda, tarihin derinliğiyle modern bilimi harmanlayın.</p>
            </div>
          </div>`

      },
      {
        slug: "pw-master",
        name: "Warsaw University of Technology",
        ranking: "#1 in Engineering (Poland)",
        worldRanking: "#501 Global",
        annualTuition: "€3,000 - €5,500",
        highlights: ["Teknik Mükemmeliyet", "Merkezi Konum"],
        departments: ["Power Engineering", "Robotics", "Telecommunications", "Civil Engineering"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic">
              Varşova Teknik Üniversitesi, Polonya'nın mühendislik alanındaki lideridir. Modern araştırma tesisleri ve endüstri odaklı müfredatıyla teknik kariyer için idealdir.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Mühendislik Lideri</h4>
              <p class="text-zinc-400 text-sm">Robotikten telekomünikasyona kadar her alanda teknik mükemmeliyeti odağına alan kurum, mezunlarına Avrupa çapında iş garantisi sunar.</p>
            </div>
          </div>`

      },
      {
        slug: "uwr-master",
        name: "University of Wroclaw",
        ranking: "#1 in Southwest Poland",
        worldRanking: "#801 Global",
        annualTuition: "€2,000 - €3,500",
        highlights: ["Nobel Ödüllü Geçmiş", "Uluslararası Araştırma Odağı"],
        departments: ["Theoretical Physics", "Biotechnology", "European Studies", "Geography"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Wroclaw Üniversitesi, Nobel ödüllü mezunlarıyla tanınan, araştırmayı odağına alan bir kurumdur. Şehrin dinamik ve genç nüfusuyla birleşen eğitim kalitesi dikkat çekicidir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">Bilimsel Derinlik</h4>
              <p class="text-sm text-zinc-600">Teorik fizikten biyoteknolojiye kadar bilimsel sınırları zorlayan araştırmalarıyla Wroclaw, akademik merakı olan öğrenciler için idealdir.</p>
            </div>
          </div>`

      }
    ]
  },
  macaristan: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Macaristan'da Yüksek Lisans: Orta Avrupa'nın Bilim Merkezi</h2>
      <p class="mb-6">Macaristan, köklü akademik geçmişi, Nobel ödüllü bilim insanları ve modern eğitim altyapısı ile uluslararası öğrenciler için cazip bir yüksek lisans merkezidir. Özellikle tıp, eczacılık, mühendislik ve müzik alanlarında dünya çapında bir üne sahiptir.</p>
      <p class="mb-6">Budapeşte gibi tarihi ve kültürel açıdan zengin şehirlerde, oldukça ekonomik yaşam maliyetleri ile kaliteli bir Avrupa eğitimi alma şansı sunar. Diplomalar tüm AB ülkelerinde ve dünyada tanınmaktadır.</p>
      <p class="mb-6">Mentor Career olarak, üniversite giriş sınavlarına hazırlık, Stipendium Hungaricum burs başvuruları ve kayıt işlemlerinizde profesyonel destek sunuyoruz.</p>
    `,
    advantages: [
      { title: "Ekonomik Eğitim ve Yaşam", desc: "Batı Avrupa ülkelerine göre çok daha uygun harç ücretleri ve yaşam maliyetleri." },
      { title: "AB Geçerliliği", desc: "Macaristan üniversitelerinden alınan diplomaların tüm Avrupa Birliği'nde doğrudan geçerli olması." },
      { title: "Burs Olanakları", desc: "Stipendium Hungaricum gibi kapsamlı devlet bursları ile ücretsiz eğitim ve yaşam desteği imkanı." },
      { title: "Köklü Akademik Gelenek", desc: "Yüzlerce yıllık geçmişe sahip, bilimsel araştırmaya önem veren üniversiteler." }
    ],
    process: [
      { title: "Akademik Planlama", desc: "Öğrencinin geçmişine uygun, İngilizce eğitim veren en iyi programların belirlenmesi." },
      { title: "Başvuru ve Sınav Süreci", desc: "Üniversite başvurularının yapılması ve gerekiyorsa giriş sınavlarının organize edilmesi." },
      { title: "Burs Başvurusu", desc: "Macar hükümet bursları için gerekli belgelerin hazırlanması ve mülakat simülasyonları." },
      { title: "Kayıt ve Kayıt", desc: "Öğrenci kayıtsi dökümantasyonu ve üniversiteye kesin kayıt işlemlerinin tamamlanması." }
    ],
    faq: [
      { q: "Macaristan'da eğitim dili nedir?", a: "Birçok üniversitede uluslararası öğrenciler için %100 İngilizce eğitim veren programlar mevcuttur." },
      { q: "Master programları ne kadar sürer?", a: "Genellikle 1.5 veya 2 yıl (3-4 sömestr) sürmektedir." },
      { q: "Yıllık eğitim ücretleri ne kadardır?", a: "Bölüme göre değişmekle birlikte genellikle 3.000€ ile 8.000€ arasındadır." },
      { q: "Hazırlık programları var mı?", a: "Evet, hem dil hem de akademik ön hazırlık için 'Foundation' programları yaygındır." }
    ],
    universities: [
      {
        slug: "elte-master",
        name: "Eötvös Loránd University (ELTE)",
        ranking: "#1 in Hungary",
        worldRanking: "#501 Global",
        annualTuition: "€3,000 - €5,000",
        highlights: ["Nobel Ödüllü Gelenek", "Budapeşte'nin En Büyük Okulu"],
        departments: ["Computer Science", "Psychology", "Law", "International Relations"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              ELTE, Macaristan'ın bilimsel mirasını taşıyan en prestijli kurumudur. Budapeşte'nin kalbindeki kampüsleri, master öğrencilerine zengin bir akademik ve kültürel hayat sunar.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Bilimsel Miras</h4>
                <p class="text-sm text-zinc-500">Nobel ödüllü bilim insanlarının yetiştiği ELTE, teorik ve uygulamalı bilimlerde Orta Avrupa'nın lideridir.</p>
              </div>
              <div class="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 class="font-serif font-bold text-primary mb-3 italic">Budapeşte Yaşamı</h4>
                <p class="text-sm text-zinc-400">Tarihi kampüsleri ve canlı öğrenci hayatıyla, eğitiminizi unutulmaz bir kültürel deneyimle birleştirin.</p>
              </div>
            </div>
          </div>`

      },
      {
        slug: "bme-master",
        name: "Budapest University of Technology and Economics (BME)",
        ranking: "Top Engineering",
        worldRanking: "#701 Global",
        annualTuition: "€4,000 - €6,000",
        highlights: ["Teknik Eğitimde Mükemmeliyet", "Mühendislik ve Ekonomi Entegrasyonu"],
        departments: ["Mechanical Engineering", "Civil Engineering", "Architecture", "Economics"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              BME, Orta Avrupa'nın en saygın teknik üniversitelerinden biridir. Mühendislik ve mimarlık alanındaki master programları, dünya çapında kabul gören yüksek standartlara sahiptir.
            </p>
            <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h4 class="text-xl font-serif font-bold text-primary mb-4 italic">Teknik Mükemmeliyet</h4>
              <p class="text-zinc-600 leading-relaxed italic">
                Mühendislik ve ekonomiyi entegre eden eğitim modeliyle BME, öğrencilerini global teknoloji projelerinde liderlik edecek yetkinliğe ulaştırır.
              </p>
            </div>
          </div>`

      },
      {
        slug: "corvinus-master",
        name: "Corvinus University of Budapest",
        ranking: "#1 in Economics (Hungary)",
        worldRanking: "#801 Global",
        annualTuition: "€3,500 - €6,500",
        highlights: ["İşletme ve Ekonomide Liderlik", "Dinamik Kariyer Ağı"],
        departments: ["International Management", "Finance", "Business Analytics", "Political Science"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Corvinus, Macaristan'ın ekonomi ve sosyal bilimler alanındaki amiral gemisidir. Budapeşte'nin merkezindeki kampüsüyle, geleceğin yöneticilerini ve ekonomistlerini yetiştirir.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3 italic">İş Dünyası Liderliği</h4>
              <p class="text-sm text-zinc-600">Güçlü kariyer ağı ve global işbirlikleriyle Corvinus, mezunlarına finans ve yönetim dünyasının kapılarını açar.</p>
            </div>
          </div>`

      },
      {
        slug: "unideb-master",
        name: "University of Debrecen",
        ranking: "#1 in Medical & Health",
        worldRanking: "#601 Global",
        annualTuition: "€5,000 - €9,000",
        highlights: ["Sağlık Bilimleri Otoritesi", "Kampüs Hayatı"],
        departments: ["Public Health", "Molecular Biology", "Food Safety", "Nursing"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600 italic">
              Debrecen Üniversitesi, tıp ve sağlık bilimleri alanındaki araştırmalarıyla tanınır. Kapsamlı kampüsü ve uluslararası öğrenci topluluğuyla ideal bir eğitim ortamı sunar.
            </p>
            <div class="bg-zinc-900 p-8 rounded-3xl text-white">
              <h4 class="text-xl font-serif font-bold mb-4 italic text-primary">Sağlık Bilimleri Otoritesi</h4>
              <p class="text-zinc-400 text-sm">Moleküler biyolojiden halk sağlığına kadar geniş bir yelpazede, en son tıbbi teknolojilerle donatılmış laboratuvarlarda uzmanlaşın.</p>
            </div>
          </div>`

      },
      {
        slug: "u-szeged-master",
        name: "University of Szeged",
        ranking: "#1 in Science Research",
        worldRanking: "#601 Global",
        annualTuition: "€3,500 - €7,000",
        highlights: ["Bilimsel Derinlik", "Öğrenci Şehri Szeged"],
        departments: ["Computer Science", "Biology", "Philosophy", "European Studies"],
        detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">
              Szeged Üniversitesi, bilimsel araştırmadaki başarılarıyla Macaristan'ın en saygın kurumlarından biridir. Szeged şehrinin huzurlu ve akademik atmosferi öğrenciler için büyük bir avantajdır.
            </p>
            <div class="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h4 class="font-serif font-bold text-primary mb-3">Bilimsel Derinlik</h4>
              <p class="text-sm text-zinc-600">Bilgisayar bilimlerinden felsefeye kadar her alanda araştırmayı odağına alan kurum, öğrencilerine derinlemesine bir akademik vizyon sunar.</p>
            </div>
          </div>`

      }
    ]
  }
};