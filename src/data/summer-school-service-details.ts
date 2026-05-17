import { UniversityServiceDetail } from "@/lib/mappings/types";

export const summerSchoolServiceDetails: Record<string, UniversityServiceDetail> = {
  global: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Yurtdışı Yaz Okulları: Sınırları Aşan Bir Macera</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">Sıkıcı ders kitaplarını bir kenara bırakın! Mentor Career ile dünyanın en prestijli kampüslerinde, dil öğrenmeyi unutulmaz bir keşif yolculuğuna dönüştürüyoruz. Çocuğunuz sadece bir dil kursuna gitmiyor; küresel dostluklar kuracağı, yeteneklerini dünya sahnesinde sergileyeceği ve özgüvenini zirveye taşıyacağı bir vizyon programına dahil oluyor.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div class="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-premium hover:shadow-2xl transition-all group">
              <div class="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all">
                  <span class="text-2xl">🌍</span>
              </div>
              <h3 class="text-xl font-bold mb-3 text-navy italic">Global Vizyon</h3>
              <p class="text-sm text-zinc-500 italic">50'den fazla ülkeden gelen yaşıtlarla bir arada yaşayarak gerçek bir dünya vatandaşı olma yolunda ilk adımı atın.</p>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-premium hover:shadow-2xl transition-all group">
              <div class="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all">
                  <span class="text-2xl">⚽</span>
              </div>
              <h3 class="text-xl font-bold mb-3 text-navy italic">Aktif Gelişim</h3>
              <p class="text-sm text-zinc-500 italic">Profesyonel koçlar eşliğinde tenis, futbol, binicilik veya kodlama gibi hobi ve yetenek odaklı uzmanlıklar.</p>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-premium hover:shadow-2xl transition-all group">
              <div class="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-all">
                  <span class="text-2xl">🛡️</span>
              </div>
              <h3 class="text-xl font-bold mb-3 text-navy italic">Güvenli Gelecek</h3>
              <p class="text-sm text-zinc-500 italic">Tam denetlenen kampüslerde, kayıt sürecinden eve dönüşe kadar Mentor Career'un koruyucu şemsiyesi altındasınız.</p>
          </div>
      </div>

      <div class="p-10 rounded-[3rem] bg-navy text-white relative overflow-hidden mb-16 shadow-2xl">
          <div class="absolute top-0 right-0 p-10 opacity-10">
              <span class="text-8xl">✨</span>
          </div>
          <h3 class="text-3xl font-serif font-bold mb-6 italic text-gold">Çocuğunuzun Geleceği İçin Sadece Bir Kayıt Ofisinden Çok Daha Fazlasıyız</h3>
          <p class="text-xl leading-relaxed italic mb-8 font-semibold" style="color: white !important;">
            Bizim için her çocuk, doğru ortamda parlamayı bekleyen bir yıldızdır. Mentor Career olarak, çocuğunuzun güvenliğini, konforunu ve bireysel gelişimini operasyonel bir süreçten öte, bir emanet olarak görüyoruz. 24 saat kesintisiz ulaşılabilirlik, dünya çapında akredite edilmiş seçkin okul portföyümüz ve kayıt işlemlerinden ilk uçuşa, kampüsteki ilk arkadaşlıktan eve dönüşteki o gurur dolu gülümsemeye kadar her an yanındayız. Bu yaz, çocuğunuz için sadece bir tatil değil; hayata bakışını değiştirecek, global bir özgüven kazanacağı gerçek bir dönüm noktası olacak.
          </p>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg font-bold" style="color: white !important;">
            <li class="flex items-center gap-4" style="color: white !important;">
              <span class="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy text-sm shadow-lg">✓</span>
              Butik ve Kişiselleştirilmiş Danışmanlık
            </li>
            <li class="flex items-center gap-4" style="color: white !important;">
              <span class="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy text-sm shadow-lg">✓</span>
              En Prestijli ve Güvenli Okul Portföyü
            </li>
            <li class="flex items-center gap-4" style="color: white !important;">
              <span class="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy text-sm shadow-lg">✓</span>
              Mesai Saatleri İçerisinde Kesintisiz Veli İletişimi
            </li>
            <li class="flex items-center gap-4" style="color: white !important;">
              <span class="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-navy text-sm shadow-lg">✓</span>
              Kayıt ve Seyahat Organizasyonu
            </li>
          </ul>
      </div>
    `,
    advantages: [
      { title: "Kültürel Entegrasyon", desc: "Çocuğunuz farklı kültürlerden gelen arkadaşlarıyla vizyonunu genişletir." },
      { title: "Dil Pratiği", desc: "Sınıf dışında, doğal ortamda ve eğlenceli aktivitelerle anadili gibi konuşma fırsatı." },
      { title: "Özgüven Gelişimi", desc: "Aileden uzakta, güvenli bir ortamda kendi ayakları üzerinde durmayı öğrenme." },
      { title: "Yetenek Keşfi", desc: "Sanat, spor, liderlik veya teknoloji kamplarıyla gizli yetenekleri ortaya çıkarma." }
    ],
    process: [
      { title: "İhtiyaç Analizi", desc: "Çocuğunuzun ilgi alanları, yaş grubu ve dil seviyesine uygun kamp alternatiflerinin sunulması." },
      { title: "Okul ve Program Seçimi", desc: "Sadece dil eğitimi değil, aynı zamanda aktivite içeriği güçlü, akredite okullara karar verilmesi." },
      { title: "Kayıt ve Lojistik", desc: "Okul kaydı, uçak bileti, havaalanı transferi ve sağlık sigortası gibi tüm lojistiğin planlanması." },
      { title: "Oryantasyon ve Takip", desc: "Gidiş öncesi detaylı brifing ve kamp süresince aile ile düzenli iletişim." }
    ],
    faq: [
      { q: "Yaz okulları hangi yaş gruplarını kapsıyor?", a: "Genellikle 8-17 yaş aralığındaki öğrenciler için özel programlar sunulmaktadır." },
      { q: "Çocuğumun güvenliği nasıl sağlanıyor?", a: "Anlaşmalı okullarımızın tamamı yüksek güvenlikli ve denetimli kampüsler olup, grup liderleri sürekli çocukların yanındadır." },
      { q: "Program süreleri ne kadardır?", a: "Genellikle 2 haftadan başlayıp 8 haftaya kadar esnek seçenekler mevcuttur." },
      { q: "Aileler yaz okullarına katılabilir mi?", a: "Evet, bazı kurumların sunduğu 'Aile ve Çocuk Programları' ile ebeveynler de kendi yaş gruplarında eğitim alabilir." }
    ]
  },
  ingiltere: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İngiltere: Kraliyet Havasında Yaz Okulu</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">Harry Potter filmlerinden fırlamış gibi duran tarihi kampüslerde eğitim almak her çocuğun hayalidir. İngiltere, yaz okulu denince akla gelen ilk ve en prestijli ülkedir.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Tarihi Kampüsler</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Oxford veya Cambridge üniversitelerinin veya köklü yatılı okulların tarihi atmosferinde İngilizce eğitimi.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Prestijli Boarding School Deneyimi</li>
                  <li>• Zengin Tarihi Geziler (Londra, Stonehenge)</li>
                  <li>• Geleneksel İngiliz Kültürü</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Özel İlgi Kampları</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Sadece İngilizce değil, çocuğunuzun tutkularına yönelik özel içerikler.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Chelsea, Arsenal gibi Kulüplerle Futbol Kampları</li>
                  <li>• STEM, Kodlama ve Robotik</li>
                  <li>• Sanat, Drama ve Liderlik Kampları</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "Eğitim Geleneği", desc: "Dünyanın en köklü ve disiplinli eğitim sisteminde dil öğrenme şansı." },
      { title: "Zengin Sosyal Program", desc: "Londra, Brighton ve Oxford gibi ikonik şehirlere düzenlenen kapsamlı geziler." },
      { title: "Aksan Avantajı", desc: "İngilizcenin doğduğu topraklarda, en saf haliyle dil pratiği yapma imkanı." }
    ],
    process: [
      { title: "Program Analizi", desc: "Öğrencinin yaşına ve ilgi alanına göre Londra merkezi veya kapalı kampüs seçimi." },
      { title: "Seyahat Hazırlığı", desc: "Uçuş detayları ve havaalanı karşılama (UM hizmeti) organizasyonunun yapılması." }
    ],
    faq: [
      { q: "Konaklama seçenekleri nelerdir?", a: "Genellikle yurt (residance) veya aile yanı seçenekleri sunulmaktadır." }
    ],
    universities: [
      {
        name: "University of Oxford Summer Schools",
        slug: "oxford-summer",
        ranking: "Dünya Lideri",
        highlights: ["Tarihi Kolej Binaları", "Akademik Odaklı Programlar", "Global Networking"],
        departments: ["General English", "Business & Leadership", "Medicine Prep", "Engineering"],
        detailedDescription: "Oxford'un tarihi kolejlerinde, dünyanın en parlak gençleriyle bir araya gelin."
      },
      {
        name: "Bell St Albans",
        slug: "bell-st-albans",
        ranking: "Premium Accreditation",
        highlights: ["Kapalı Güvenli Kampüs", "Geniş Spor Alanları", "Proje Odaklı Eğitim"],
        departments: ["Young Explorer", "Summer Explorer", "IELTS Prep"],
        detailedDescription: "Kırsal alanda, güvenli ve tamamen öğrencilere özel bir kampüs deneyimi."
      },
      {
        name: "CATS Canterbury / London",
        slug: "cats-college",
        ranking: "Elite College",
        highlights: ["Akademik Hazırlık", "Modern Tesisler", "Merkezi Lokasyon"],
        departments: ["Pre-A Level", "IB Introduction", "Fashion & Design", "Coding"],
        detailedDescription: "Geleceğin üniversite adayları için tasarlanmış yüksek standartlı akademik kamplar."
      }
    ]
  },
  amerika: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Amerika: Sınırsız Enerji ve Keşif</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">New York'un gökdelenleri, Florida'nın plajları veya Kaliforniya'nın sörf kültürü... Amerika yaz okulları, enerjisi yüksek, sosyal ve eğlence odaklı bir deneyim arayan gençler için mükemmeldir.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Üniversite Atmosferi</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">UCLA, Harvard veya MIT gibi dünyaca ünlü üniversite kampüslerinde geleceğe dair bir vizyon kazanma fırsatı.</p>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Aktivite Zenginliği</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Disneyland, Universal Studios gezileri, sörf dersleri ve Amerikan yaşam tarzını yansıtan sosyal programlar.</p>
          </div>
      </div>
    `,
    advantages: [
      { title: "Vizyon Genişletici", desc: "Dünyanın en büyük ekonomisini ve kültür endüstrisini yerinde tanıma." },
      { title: "Kampüs Yaşamı", desc: "Amerikan üniversitelerinin devasa ve teknolojik kampüslerinde yaşama şansı." },
      { title: "Kültürel Çeşitlilik", desc: "Gerçek bir 'melting pot' ortamında onlarca farklı milletten arkadaş edinme." }
    ],
    process: [
      { title: "Program Eşleştirme", desc: "Eyalet seçimi ve aktivite yoğunluğunun öğrenci beklentisine göre ayarlanması." },
      { title: "Uçuş ve Transfer", desc: "Uzun mesafe uçuşlarda refakatçi hizmeti ve kampüs transferlerinin planlanması." }
    ],
    faq: [
      { q: "Konaklama güvenliği nasıl sağlanıyor?", a: "Tüm üniversite kampüslerinde 24 saat güvenlik ve danışman öğretmenler bulunur." }
    ],
    universities: [
      {
        name: "UCLA Summer Sessions",
        slug: "ucla-summer",
        ranking: "Public University Leader",
        highlights: ["Los Angeles Güneşi", "İkonik Kampüs", "Sinema ve Teknoloji Atölyeleri"],
        departments: ["English Immersion", "Digital Media", "Sustainability", "US Culture"],
        detailedDescription: "Kaliforniya'nın en prestijli üniversitesinde unutulmaz bir Amerikan yazı geçirin."
      },
      {
        name: "Columbia University Programs",
        slug: "columbia-summer",
        ranking: "Ivy League",
        highlights: ["New York'un Kalbi", "Akademik Prestij", "Global Liderlik"],
        departments: ["Critical Thinking", "Social Sciences", "Creative Writing"],
        detailedDescription: "New York City'de, Ivy League standartlarında bir eğitim ve kültür deneyimi."
      },
      {
        name: "EF San Diego / New York",
        slug: "ef-america",
        ranking: "Global Education Leader",
        highlights: ["Özel Kampüs Tesisleri", "Yoğun Aktivite Takvimi", "Modern Sınıflar"],
        departments: ["Interactive English", "Surfing & Sports", "American History"],
        detailedDescription: "Öğrencilerin konforu ve eğlencesi için özel olarak tasarlanmış butik kampüsler."
      }
    ]
  },
  kanada: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Kanada: Güvenli ve Doğayla İç İçe Yaz Okulu</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">Dünyanın en yaşanabilir ülkelerinden biri olan Kanada, güvenli ortamı, misafirperver halkı ve muhteşem doğasıyla yaz okulu için en ideal seçeneklerden biridir.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Çok Kültürlü Yapı</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Toronto, Vancouver veya Montreal gibi şehirlerde, ayrımcılıktan uzak, herkesin kabul gördüğü bir sosyal ortam.</p>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Macera ve Doğa</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Niagara Şelaleleri, Rocky Dağları gezileri ve kano gibi doğa sporlarıyla zenginleşen programlar.</p>
          </div>
      </div>
    `,
    advantages: [
      { title: "Maksimum Güvenlik", desc: "Dünya suç oranlarının en düşük olduğu ülkelerden birinde huzurlu eğitim." },
      { title: "Ekonomik Kur Avantajı", desc: "Amerika'ya kıyasla daha uygun maliyetli ama aynı kalitede eğitim fırsatı." },
      { title: "İki Dil Seçeneği", desc: "İngilizce'nin yanı sıra Montreal bölgesinde Fransızca eğitim imkanı." }
    ],
    process: [
      { title: "Bölge Seçimi", desc: "Doğu mu (Toronto/Ottawa) yoksa Batı mı (Vancouver)? Hedefe uygun rotanın çizilmesi." }
    ],
    faq: [],
    universities: [
      {
        name: "University of Toronto (UofT) Summer",
        slug: "uoft-summer",
        ranking: "Kanada'nın 1 Numarası",
        highlights: ["Merkezi Lokasyon", "Prestijli Diploma", "Niagara Gezileri"],
        departments: ["General English", "Academic Prep", "Youth Leadership"],
        detailedDescription: "Kanada'nın en köklü üniversitesinde, Toronto'nun enerjisiyle iç içe bir eğitim."
      },
      {
        name: "ILAC Vancouver / Toronto",
        slug: "ilac-summer",
        ranking: "Award Winning School",
        highlights: ["Sosyal Aktivite Lideri", "Modern Şehir Kampüsleri", "Butik Hizmet"],
        departments: ["Social English", "Exam Prep", "University Pathway Introduction"],
        detailedDescription: "Eğlence ve dil eğitimini en iyi harmanlayan, Kanada'nın ödüllü dil okulu zinciri."
      }
    ]
  },
  almanya: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Almanya: Disiplin, Kültür ve Almanca Gelişimi</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">Avrupa'nın lokomotifi Almanya, sadece Almanca öğrenmek için değil, aynı zamanda mühendislik, sanat ve tarihle iç içe bir yaz geçirmek için mükemmel bir destinasyondur.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademik Ciddiyet</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Gelecekte Almanya'da üniversite eğitimi almayı düşünen gençler için ideal bir ön hazırlık süreci.</p>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Şehir ve Doğa</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Berlin'in kozmopolit yapısı veya Bavyera'nın masalsı şatoları arasında seçim yapma imkanı.</p>
          </div>
      </div>
    `,
    advantages: [
      { title: "Üniversite Hazırlığı", desc: "Alman eğitim sistemini yerinde tanıyarak gelecek planlarını şekillendirme." },
      { title: "Merkezi Konum", desc: "Hafta sonu gezileriyle çevre Avrupa ülkelerini ziyaret etme kolaylığı." },
      { title: "Yüksek Standart", desc: "Modern sınıflar, disiplinli eğitim ve kaliteli konaklama imkanları." }
    ],
    process: [
      { title: "Seviye Belirleme", desc: "Öğrencinin Almanca seviyesine (A1-C1) en uygun kursun seçilmesi." },
      { title: "Kayıt ve Sigorta", desc: "Kayıt işlemleri ve Almanya'ya özel sağlık sigortası süreçlerinin takibi." }
    ],
    faq: [
      { q: "Hiç Almanca bilmeyen çocuklar katılabilir mi?", a: "Evet, başlangıç seviyesinden itibaren her seviyeye uygun sınıflar mevcuttur." }
    ],
    universities: [
      {
        name: "DID Deutsch-Institut Berlin / Munich",
        slug: "did-summer",
        ranking: "Premium Language Provider",
        highlights: ["Residance Konaklama", "Yoğun Almanca Kursları", "Merkezi Şehir Gezileri"],
        departments: ["Junior German", "Standard German", "Summer Intensive"],
        detailedDescription: "Almanya'nın en büyük şehirlerinde Almancayı yaşayarak öğrenin."
      },
      {
        name: "Humboldt-Institut Lindenberg / Bad Schussenried",
        slug: "humboldt-summer",
        ranking: "Intensive Specialist",
        highlights: ["Tam Zamanlı Gözetim", "Küçük Sınıf Mevcudu", "Doğa Aktiviteleri"],
        departments: ["Academic German", "German for Kids", "Winter & Summer Programs"],
        detailedDescription: "Yatılı okul konseptinde, Almancayı en hızlı geliştirebileceğiniz yoğun programlar."
      }
    ]
  },
  malta: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Malta: Akdeniz Güneşi Altında İngilizce</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">Akdeniz'in kalbinde, her köşesi tarih kokan ve yılın büyük bölümü güneşli olan Malta, tatil ve dil eğitimini birleştirmek isteyenler için vazgeçilmezdir.</p>
    `,
    advantages: [
      { title: "Ekonomik Seçenek", desc: "İngiltere ve Amerika'ya göre çok daha uygun bütçeli yaz okulu programları." },
      { title: "Deniz ve Güneş", desc: "Ders dışı zamanlarda plaj aktiviteleri, tekne turları ve su sporları imkanı." },
      { title: "Kozmopolit Ortam", desc: "Küçük bir adada dünyanın her yerinden gelen öğrencilerle samimi bir etkileşim." }
    ],
    process: [
      { title: "Okul Seçimi", desc: "St. Julians, Sliema veya daha sakin bölgelerdeki okulların karşılaştırılması." },
      { title: "Ulaşım Planı", desc: "Uçuş detayları ve havaalanı-kampüs transferlerinin koordine edilmesi." }
    ],
    faq: [],
    universities: [
      {
        name: "EC Malta Young Learners",
        slug: "ec-malta-summer",
        ranking: "Global Chain Excellence",
        highlights: ["4 Yıldızlı Otel Konaklama", "Beach Club Erişimi", "Geniş Aktivite Havuzu"],
        departments: ["General English", "Fun Activities", "Cultural Tours"],
        detailedDescription: "St. Paul's Bay bölgesinde, güvenli ve lüks bir yaz kampı deneyimi."
      },
      {
        name: "ESE - European School of English",
        slug: "ese-malta-summer",
        ranking: "Top Rated in Malta",
        highlights: ["Kendi Kampüs Alanı", "Modern Tesisler", "Uluslararası Karma"],
        departments: ["Junior Camp", "Teen Camp", "Family Programs"],
        detailedDescription: "Malta'nın en köklü dil okullarından birinde, her yaş grubuna özel ayrılmış programlar."
      }
    ]
  },
  isvicre: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İsviçre: Elit Eğitim ve Alplerde Macera</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">İsviçre yaz okulları, dünyanın en prestijli yatılı okullarının ev sahipliğinde, en üst düzey konfor ve eğitim kalitesini arayan aileler için tasarlanmıştır.</p>
    `,
    advantages: [
      { title: "Ultra-Premium Standart", desc: "Dünyanın en pahalı ve seçkin yatılı okullarında konaklama ve eğitim." },
      { title: "Çok Dillilik", desc: "Aynı kampüs içinde İngilizce, Fransızca, Almanca veya İtalyanca seçme şansı." },
      { title: "Benzersiz Doğa", desc: "Alp Dağları'nın temiz havasında trekking, kayak ve dağ sporları aktiviteleri." }
    ],
    process: [
      { title: "Okul Portföyü Sunumu", desc: "Le Rosey, Beau Soleil gibi 'High-End' kurumların tanıtımı ve başvuru süreci." },
      { title: "Kayıt ve Lojistik", desc: "Kayıt işlemleri ve özel karşılama hizmetlerinin organize edilmesi." }
    ],
    faq: [
      { q: "İsviçre yaz okulları neden daha pahalı?", a: "Sunulan tesis kalitesi, yemek standartları ve eğitmen-öğrenci oranı dünya ortalamasının çok üzerindedir." }
    ],
    universities: [
      {
        name: "Les Elfes International",
        slug: "les-elfes",
        ranking: "Premier Alpine Camp",
        highlights: ["Verbier'de Dağ Kampı", "Liderlik Atölyeleri", "Profesyonel Spor Koçları"],
        departments: ["Language Course", "Outdoor Sports", "Leadership Training"],
        detailedDescription: "İsviçre Alpleri'nin kalbinde, macera ve eğitimi birleştiren efsanevi bir kamp."
      },
      {
        name: "Swiss Education Group (SEG) Summer",
        slug: "seg-summer",
        ranking: "Hospitality Leader",
        highlights: ["Gourmet Yemekler", "Otelcilik ve Sanat Odaklı", "Muhteşem Göl Manzarası"],
        departments: ["Culinary Arts", "Hotel Management Intro", "Creative Arts"],
        detailedDescription: "Geleceğin şefleri ve yöneticileri için, lüks otel standartlarında bir yaz deneyimi."
      }
    ]
  },
  irlanda: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İrlanda: Samimiyet ve Edebiyatın Başkenti</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">Yeşil Ada İrlanda, misafirperverliği, güvenli şehirleri ve köklü edebiyat geleneğiyle gençlerin İngilizce pratiği yapması için harika bir adrestir.</p>
    `,
    advantages: [
      { title: "Sıcak Sosyal Ortam", desc: "İrlandalıların samimi yapısı sayesinde öğrenciler çekinmeden dil pratiği yapar." },
      { title: "Güvenli Şehirler", desc: "Dublin ve Cork gibi şehirlerin huzurlu ve yönetilebilir ölçekte olması." }
    ],
    process: [
      { title: "Okul ve Aile Seçimi", desc: "Konaklama kalitesine ve okulun sunduğu sosyal programlara göre eşleştirme." }
    ],
    faq: [
      { q: "İrlanda'da hava çok yağmurlu mu?", a: "Yaz ayları genellikle ılıman ve değişken olsa da aktiviteler her hava koşuluna göre planlanır." }
    ],
    universities: [
      {
        name: "Emerald Cultural Institute Dublin",
        slug: "emerald-summer",
        ranking: "Irish Quality Leader",
        highlights: ["Üniversite Kampüsü Kullanımı", "Zengin İrlanda Kültür Gezileri", "Akademik Disiplin"],
        departments: ["Standard English", "University Pathway", "English + Tech"],
        detailedDescription: "Dublin'in seçkin kolej kampüslerinde, köklü bir eğitim kurumunun güvencesiyle yaz okulu."
      },
      {
        name: "Apollo Language Centre",
        slug: "apollo-summer",
        ranking: "Award Winning Boutique",
        highlights: ["Ödüllü Sosyal Programlar", "Modern Tesisler", "Yüksek Veli Memnuniyeti"],
        departments: ["Next Gen Program", "English + Horse Riding", "English + Rugby"],
        detailedDescription: "Gençler için özel olarak tasarlanmış, dinamik ve modern bir dil eğitim merkezi."
      }
    ]
  },
  fransa: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Fransa: Sanat, Gastronomi ve Fransızca</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">Fransızca öğrenmek veya geliştirmek isteyen gençler için Fransa; Paris'in büyüleyiciliğinden Fransız Rivierası'nın ışıltısına kadar benzersiz seçenekler sunar.</p>
    `,
    advantages: [
      { title: "Kültürel Derinlik", desc: "Dünya mirası müzeler, tarihi yapılar ve Fransız yaşam tarzını yerinde keşif." },
      { title: "Gastronomi Deneyimi", desc: "Eğitim süresince Fransız mutfağının en seçkin lezzetlerini tatma şansı." },
      { title: "Akademik Prestij", desc: "Gelecekte Fransa'da eğitim almayı planlayanlar için kritik bir ilk adım." }
    ],
    process: [
      { title: "Bölge Seçimi", desc: "Paris mi, Nice mi, yoksa şatolar bölgesi mi? Öğrencinin ilgisine göre rota." }
    ],
    faq: [
      { q: "Fransızca bilmeden gidilebilir mi?", a: "Evet, başlangıç seviyesindeki öğrenciler için de programlar mevcuttur." }
    ],
    universities: [
      {
        name: "Centre International d'Antibes (CIA)",
        slug: "cia-france",
        ranking: "Leading French School",
        highlights: ["Nice ve Antibes'te Kampüsler", "Deniz Kenarı Konaklama", "Yoğun Aktivite"],
        departments: ["Standard French", "Intensive French", "DELF Prep"],
        detailedDescription: "Fransız Rivierası'nda, güneş ve denizi Fransızca eğitimiyle birleştiren lider okul."
      },
      {
        name: "Accord Language School Paris",
        slug: "accord-paris",
        ranking: "Paris Premier Provider",
        highlights: ["Merkezi Paris Lokasyonu", "Kültürel Atölyeler", "Moda ve Sanat Gezileri"],
        departments: ["French for Teens", "Summer Campus", "Family Courses"],
        detailedDescription: "Işıklar şehri Paris'in kalbinde, köklü ve modern bir eğitim deneyimi."
      }
    ]
  },
  ispanya: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İspanya: Enerjik, Renkli ve Akdenizli</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">İspanyolca dünyada en çok konuşulan dillerden biridir. İspanya yaz okulları, enerjik atmosferi ve sosyal yoğunluğuyla gençlere unutulmaz bir yaz vaat eder.</p>
    `,
    advantages: [
      { title: "Sosyal Yaşam", desc: "İspanyol kültürünün neşeli ve dışa dönük yapısıyla kolayca kaynaşma." },
      { title: "İspanyolca Pratiği", desc: "Okul dışında da yerel halkla sürekli iletişim kurma şansı." },
      { title: "Spor ve Eğlence", desc: "Futbol (Real Madrid/Barca kampları), dans ve plaj voleybolu gibi zengin aktiviteler." }
    ],
    process: [
      { title: "Şehir Tercihi", desc: "Madrid, Barselona veya Malaga gibi popüler destinasyonlar arasından seçim." }
    ],
    faq: [
      { q: "İngilizce yaz okulları da var mı?", a: "Evet, bazı uluslararası okullar İspanya'da İngilizce eğitim ve sosyal programlar sunmaktadır." }
    ],
    universities: [
      {
        name: "Enforex / Don Quijote Summer Camps",
        slug: "enforex-summer",
        ranking: "Spanish School Leader",
        highlights: ["Karma Kampüs (İspanyol Öğrencilerle)", "Spor Odaklı", "Tam Zamanlı Gözetim"],
        departments: ["Spanish Lessons", "Multi-Activity", "Specific Sports (Football, Tennis)"],
        detailedDescription: "İspanya'nın birçok şehrinde, İspanyol gençlerle bir arada eğitim alma ayrıcalığı."
      },
      {
        name: "Real Madrid Foundation Football Camp",
        slug: "real-madrid-camp",
        ranking: "World Class Sports Camp",
        highlights: ["Profesyonel Antrenörler", "Stadyum Turu", "Beslenme ve Taktik Eğitimi"],
        departments: ["Football Training", "Leadership", "Spanish/English Classes"],
        detailedDescription: "Dünyanın en büyük kulübünün tesislerinde, hayallerindeki futbol eğitimini al."
      }
    ]
  }
};
