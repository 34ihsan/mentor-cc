
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Başlıyor: AI Destekli Global İçerik Zenginleştirme...');

  const countries = [
    {
      slug: 'amerika',
      shortDesc: 'Dünya eğitiminin zirvesi, inovasyon ve sınırsız kariyer fırsatlarının merkezi.',
      overview: 'Amerika Birleşik Devletleri, dünyanın en prestijli üniversitelerine ev sahipliği yapan, kültürel çeşitliliği ve akademik özgürlüğü ile tanınan lider eğitim destinasyonudur.',
      features: ['Ivy League ve Top-Tier Üniversiteler', 'OPT (Optional Practical Training) Çalışma İzni', 'Disiplinlerarası Eğitim Modeli'],
      visaInfo: 'F-1 Öğrenci vizesi için I-20 belgesi ve SEVIS ödemesi şarttır. Mülakat odaklı bir süreçtir.',
      workPermit: 'Eğitim sırasında kampüs içi haftada 20 saat, mezuniyet sonrası bölüme göre 1-3 yıl arası OPT hakkı sunulur.',
      costRange: 'Aylık $1,200 - $2,500',
      content: `
## Amerika'da Eğitim: Global Başarının Anahtarı

Amerika Birleşik Devletleri, her yıl milyonlarca uluslararası öğrenciyi ağırlayan, dünyanın en dinamik eğitim ekosistemine sahiptir. Silikon Vadisi'nden Wall Street'e kadar uzanan geniş iş ağı, öğrencilere sadece teorik bilgi değil, gerçek dünya deneyimi sunar.

### Neden Amerika?
*   **Akademik Prestij:** Dünya sıralamalarında ilk 10'da yer alan üniversitelerin çoğu ABD'dedir.
*   **Esneklik:** Bölüm değiştirme ve çift anadal imkanları en üst seviyededir.
*   **Teknoloji ve Araştırma:** En son teknoloji laboratuvarlar ve milyar dolarlık araştırma bütçeleri.

### Yaşam ve Kültür
Her eyaleti ayrı bir dünya olan Amerika'da, New York'un enerjisinden California'nın inovasyon ruhuna kadar size en uygun ortamı bulabilirsiniz. Kampüs hayatı, sosyal kulüpler ve spor etkinlikleri eğitimin ayrılmaz bir parçasıdır.
      `
    },
    {
      slug: 'avustralya',
      shortDesc: 'Yüksek yaşam kalitesi, eşsiz doğa ve dünya standartlarında modern eğitim.',
      overview: 'Avustralya, yenilikçi eğitim sistemi, güvenli şehirleri ve mezuniyet sonrası sunduğu cazip göçmenlik yolları ile öne çıkmaktadır.',
      features: ['Group of Eight Elit Üniversiteler', 'Gelişmiş Yaşam Standartları', 'Post-Study Work Visa İmkanları'],
      visaInfo: 'Subclass 500 vizesi için GTE (Genuine Temporary Entrant) şartı ve sağlık sigortası (OSHC) zorunludur.',
      workPermit: 'Uluslararası öğrencilere eğitim sırasında çalışma izni sunan en esnek ülkelerden biridir. Mezunlara 2-4 yıl arası çalışma izni verilir.',
      costRange: 'Aylık AUD 1,800 - 2,500',
      content: `
## Avustralya: Modern Eğitimin ve Kaliteli Yaşamın Adresi

Avustralya, sadece bir tatil rotası değil, aynı zamanda bilim ve inovasyon dünyasının yükselen yıldızıdır. Melbourne ve Sydney gibi şehirler, dünyanın en yaşanabilir şehirleri listesinde her zaman en üst sıralardadır.

### Akademik Mükemmellik
"Group of Eight" olarak bilinen üniversiteler, araştırma ve eğitim kalitesinde dünya lideridir. Avustralya diplomaları tüm dünyada yüksek itibar görür.

### Doğa ve Sosyal Hayat
Eğitiminizden kalan vakitlerde dünyaca ünlü plajları keşfedebilir, benzersiz vahşi yaşamı deneyimleyebilir ve çok kültürlü bir toplumun parçası olabilirsiniz. Güneşli iklimi ve enerjik insanları ile Avustralya, kendinizi evinizde hissettirir.
      `
    },
    {
      slug: 'ispanya',
      shortDesc: 'Avrupa\'nın güneşli kapısı, prestijli işletme okulları ve canlı bir kültür.',
      overview: 'İspanya, özellikle MBA ve İşletme alanında dünyanın en iyi okullarına ev sahipliği yaparken, uygun yaşam maliyetleri ve eşsiz kültürüyle dikkat çeker.',
      features: ['Dünya Çapında İşletme Okulları (IE, IESE, ESADE)', 'Uygun Yaşam Maliyetleri', 'İspanyolca Öğrenme Fırsatı'],
      visaInfo: 'Uzun süreli öğrenci vizesi için sağlık raporu, sabıka kaydı ve finansal yeterlilik sunulmalıdır.',
      workPermit: 'Haftada 30 saate kadar çalışma izni verilmektedir. Mezuniyet sonrası iş arama izni imkanları mevcuttur.',
      costRange: 'Aylık €800 - €1,200',
      content: `
## İspanya: Akdeniz Esintisinde Kaliteli Eğitim

İspanya, tarih, sanat ve modern eğitimin harmanlandığı, Avrupa'nın en popüler destinasyonlarından biridir. Madrid ve Barselona, global şirketlerin Avrupa merkezlerine ev sahipliği yaparak öğrencilere staj imkanları sunar.

### İş Dünyasında Liderlik
İspanyol işletme okulları, dünya sıralamalarında her yıl ilk 10'da yer alır. Yenilikçi girişimcilik kültürü, öğrencileri iş dünyasına hazırlar.

### Kültürel Zenginlik
Flamenko, Siesta ve eşsiz mutfağıyla İspanya, bir eğitimden çok daha fazlasını vaat eder. İspanyolca gibi dünyanın en çok konuşulan dillerinden birini yerinde öğrenmek, kariyeriniz için büyük bir avantajdır.
      `
    },
    {
      slug: 'italya',
      shortDesc: 'Moda, mimari ve sanatın beşiği; tarihi üniversitelerde modern vizyon.',
      overview: 'İtalya, dünyanın en eski üniversitelerine ev sahipliği yaparken, tasarım, mimari ve tıp alanlarında uluslararası öğrenciler için bir cazibe merkezidir.',
      features: ['Tarihi ve Köklü Üniversiteler', 'Moda ve Tasarımın Merkezi', 'Devlet Destekli Eğitim ve Burslar'],
      visaInfo: 'Universitaly üzerinden ön kayıt ve konsolosluk onayı gereklidir. Finansal kanıt esastır.',
      workPermit: 'Haftada 20 saat çalışma izni vardır. Mezuniyet sonrası iş arama izni için belirli şartlar aranır.',
      costRange: 'Aylık €700 - €1,100',
      content: `
## İtalya: İlham Verici Bir Eğitim Yolculuğu

Roma, Milano, Floransa... Her köşesi tarih kokan İtalya, öğrencilere estetik bir vizyon ve derin akademik bilgi sunar. Politecnico di Milano ve Sapienza gibi kurumlar, teknik ve sosyal bilimlerde dünya çapında otoritedir.

### Sanat ve Teknolojinin Buluşması
İtalya sadece sanat değil, aynı zamanda mühendislik ve otomotiv sektöründe de dünya devidir. "Made in Italy" markasının arkasındaki tasarım ve inovasyon ruhu, eğitim sistemine de yansımıştır.

### Yaşam Tarzı (La Dolce Vita)
İtalya'da öğrenci olmak, her gün yeni bir tarihi eser keşfetmek ve dünyanın en iyi mutfağını tatmak demektir. Uygun okul ücretleri ve burs imkanları ile İtalya, hayallerinizi gerçekleştirmeniz için kapılarını açıyor.
      `
    },
    {
        slug: 'fransa',
        shortDesc: 'Bilim ve sanatın buluştuğu nokta, Avrupa\'nın entelektüel merkezi.',
        overview: 'Fransa, yüksek standartlardaki devlet üniversiteleri ve Grande École sistemi ile öğrencilere derinlemesine bir uzmanlık kazandırır.',
        features: ['Grande École Seçkinliği', 'Akademik ve Kültürel Miras', 'Geniş Burs ve Konaklama Destekleri'],
        visaInfo: 'Campus France üzerinden online süreç yürütülür. VFS Global aracılığıyla vize başvurusu yapılır.',
        workPermit: 'Öğrenciler yasal olarak yılda 964 saat çalışma hakkına sahiptir. Mezunlara belirli şartlarla çalışma izni verilir.',
        costRange: 'Aylık €800 - €1,300',
        content: `
## Fransa: Akademik Mükemmellik ve Modern Vizyon

Fransa, Descartes'tan Marie Curie'ye uzanan bilimsel mirasıyla öğrencilerine sorgulayan ve analiz eden bir bakış açısı kazandırır. Paris'in yanısıra Lyon, Montpellier ve Toulouse gibi öğrenci dostu şehirleri ile ünlüdür.

### Eğitim Kalitesi
Fransız üniversiteleri, araştırma odaklı eğitimde dünya sıralamalarında üst sıralardadır. Özellikle Matematik, Fizik ve Ekonomi alanlarında ekol kabul edilirler.

### Öğrenci Hakları ve Destekler
Fransa, yabancı öğrencilere konaklama yardımı (CAF) ve yemekhane indirimleri gibi pek çok sosyal destek sunan nadir ülkelerden biridir.
        `
    },
    {
        slug: 'polonya',
        shortDesc: 'Avrupa\'nın kalbinde uygun fiyatlı, yüksek kaliteli ve dinamik eğitim.',
        overview: 'Polonya, hızla büyüyen ekonomisi, tarihi üniversiteleri ve ekonomik yaşam maliyetleri ile son yıllarda Türk öğrencilerin favori rotası olmuştur.',
        features: ['Ekonomik Okul Ücretleri', 'Modernize Edilmiş Eğitim Sistemi', 'Hızlı Büyüyen İş Piyasası'],
        visaInfo: 'Ulusal Vize (D Tipi) için okul kabulü, konaklama belgesi ve seyahat sigortası gereklidir.',
        workPermit: 'Tam zamanlı öğrenciler eğitim süresince ve tatillerde yasal çalışma hakkına sahiptir.',
        costRange: 'Aylık €500 - €800',
        content: `
## Polonya: Geleceğin Yükselen Yıldızı

Varşova ve Krakow gibi tarihi ve canlı şehirleriyle Polonya, öğrencilere hem kaliteli bir eğitim hem de aktif bir sosyal hayat sunar. Avrupa Birliği diploması alırken yaşam maliyetlerini minimize etmek isteyenler için idealdir.

### İngilizce Eğitim Olanakları
Polonya üniversiteleri, Tıp, Mühendislik ve İşletme alanlarında çok sayıda İngilizce program sunmaktadır. Eğitim kalitesi uluslararası standartlarda olup, diplomalar tüm dünyada tanınmaktadır.
        `
    },
    {
      slug: 'isvicre',
      shortDesc: 'Finans, teknoloji ve otelcilik eğitiminin dünya başkenti.',
      overview: 'İsviçre, ETH Zurich gibi teknik devleri ve Les Roches gibi dünyanın en iyi otelcilik okullarıyla seçkin bir eğitim sunar.',
      features: ['Lüks ve Güvenli Yaşam', 'Otelcilikte Dünya Liderliği', 'Yüksek Maaşlı Staj İmkanları'],
      visaInfo: 'Kanton bazlı onay süreci vardır. Finansal teminat miktarı yüksektir.',
      workPermit: 'Haftada 15 saat çalışma izni vardır ancak stajlar programın bir parçası olarak tam zamanlıdır.',
      costRange: 'Aylık CHF 2,000 - 3,000',
      content: `
## İsviçre: Prestijli Eğitimin Zirvesi

İsviçre, inovasyon ve hassasiyetin ülkesidir. Alp dağlarının eteğinde, dünyanın en güvenli ve temiz ortamında eğitim almak ayrıcalıktır.

### Liderlik ve Uzmanlık
İsviçre mezunları, global şirketlerde üst düzey yönetici pozisyonları için ilk tercih edilen adaylar arasındadır. Özellikle Turizm, Otelcilik, Bankacılık ve Mühendislik alanlarında benzersiz bir prestije sahiptir.
      `
    },
    {
      slug: 'malta',
      shortDesc: 'Akdeniz\'in ortasında, tatil tadında İngilizce eğitimi.',
      overview: 'Malta, kristal berraklığındaki denizi, tarihi dokusu ve uygun fiyatlı dil okullarıyla İngilizce öğrenmek isteyenler için ideal bir duraktır.',
      features: ['Ekonomik Dil Okulları', 'Güneşli İklim ve Plajlar', 'Vizesiz Seyahat (Yeşil Pasaport)'],
      visaInfo: 'Schengen vizesi prosedürleri uygulanır. Dil okulu kaydı ve konaklama onayı şarttır.',
      workPermit: '90 günü aşan eğitimlerde haftada 20 saat çalışma izni imkanı vardır.',
      costRange: 'Aylık €600 - €900',
      content: `
## Malta: İngilizce Öğrenirken Tatilin Keyfini Çıkarın

Malta, İngiliz sömürge döneminden kalan akademik mirasıyla, Avrupa'da İngilizce öğrenmek için en popüler destinasyonlardan biridir. St. Julians ve Sliema gibi şehirler, gece hayatı ve sosyal imkanlarıyla öğrencileri cezbeder.

### Neden Malta?
Malta, diğer Avrupa ülkelerine göre çok daha uygun maliyetlidir. Eğitim kalitesi uluslararası standartlarda olup, okullar genellikle modern binalarda ve denize sıfır konumdadır.
      `
    },
    {
      slug: 'hollanda',
      shortDesc: 'Yenilikçi, açık fikirli ve İngilizce dostu bir eğitim vizyonu.',
      overview: 'Hollanda, kıta Avrupa\'sında en çok İngilizce program sunan ülke olarak, modern eğitim yaklaşımları ve global iş imkanları ile öne çıkar.',
      features: ['Geniş İngilizce Program Yelpazesi', 'Yenilikçi Problem-Based Learning (PBL)', 'Global Şirketlerin Merkezi'],
      visaInfo: 'Üniversite sizin adınıza MVV (Vize) ve VVR (Oturum İzni) başvurusu yapar. Süreç oldukça hızlıdır.',
      workPermit: 'Haftada 16 saat veya yaz aylarında tam zamanlı çalışma izni vardır. Mezunlara 1 yıl "Orientation Year" izni verilir.',
      costRange: 'Aylık €900 - €1,400',
      content: `
## Hollanda: Avrupa'nın Kalbinde İnovatif Eğitim

Hollanda, yaratıcı düşünceyi ve pratik problem çözmeyi teşvik eden eğitim sistemiyle tanınır. Amsterdam, Rotterdam ve Utrecht gibi şehirler, hem tarihi dokusuyla hem de modern startup ekosistemiyle öğrencilere zengin bir ortam sunar.

### Global Kariyer Fırsatları
Philips, Shell ve Heineken gibi dünya devlerinin merkezi olan Hollanda, mezunlarına uluslararası bir kariyerin kapılarını aralar.
      `
    },
    {
      slug: 'irlanda',
      shortDesc: 'Teknoloji devlerinin merkezi, samimi ve kaliteli eğitim.',
      overview: 'İrlanda, Google, Facebook ve Apple gibi teknoloji devlerinin Avrupa merkezi olmasıyla, mezuniyet sonrası benzersiz kariyer fırsatları sunar.',
      features: ['Avrupa\'nın Teknoloji Üssü', 'Samimi ve Misafirperver Kültür', 'Mezuniyet Sonrası 1-2 Yıl Çalışma İzni'],
      visaInfo: 'İrlanda, AB üyesi olmasına rağmen Schengen bölgesi dışındadır. Özel bir öğrenci vizesi süreci vardır.',
      workPermit: 'Eğitim sırasında haftada 20 saat, tatillerde 40 saat çalışma hakkı sunulur.',
      costRange: 'Aylık €1,000 - €1,500',
      content: `
## İrlanda: Bilgi Ekonomisinin ve Kültürün Buluştuğu Ülke

İrlanda, asırlık Trinity College Dublin gibi kurumları ve modern teknoloji ekosistemi ile öğrencilere eşsiz bir denge sunar. "Emerald Isle" (Zümrüt Ada) olarak bilinen ülke, doğasıyla da büyüler.

### Kariyerinize İrlanda'da Başlayın
Dünya teknoloji devlerinin kapı komşusu olarak eğitim almak, profesyonel networkünüzü geliştirmeniz için paha biçilemez bir fırsattır.
      `
    },
    {
      slug: 'belcika',
      shortDesc: 'Avrupa\'nın siyasi ve diplomatik merkezi, kaliteli devlet üniversiteleri.',
      overview: 'Belçika, Brüksel ve Leuven gibi şehirleriyle uluslararası ilişkiler, politika ve bilim alanında dünyanın en iyi eğitim merkezlerinden biridir.',
      features: ['AB ve NATO Merkezi', 'Düşük Okul Ücretleri', 'Multikültürel Ortam'],
      visaInfo: 'Uzun süreli vize (D Tipi) için bloke hesap veya garantör belgesi şarttır.',
      workPermit: 'Haftada 20 saat çalışma izni verilmektedir.',
      costRange: 'Aylık €850 - €1,200',
      content: `
## Belçika: Diplomasinin ve Bilimin Kalbinde Eğitim

Belçika, Avrupa Birliği'nin başkenti Brüksel ile uluslararası bir vizyon sunar. KU Leuven ve Ghent University gibi kurumlar, bilimsel araştırmalarda dünya zirvesindedir.

### Avrupa'nın Kavşağı
Fransa, Almanya ve Hollanda'nın kesişim noktasında bulunan Belçika, öğrencilere tüm Avrupa'yı keşfetme ve uluslararası kurumlarda staj yapma imkanı sağlar.
      `
    }
  ];

  const nameMap = {
    'amerika': 'Amerika',
    'avustralya': 'Avustralya',
    'ispanya': 'İspanya',
    'italya': 'İtalya',
    'fransa': 'Fransa',
    'polonya': 'Polonya',
    'isvicre': 'İsviçre',
    'malta': 'Malta',
    'hollanda': 'Hollanda',
    'irlanda': 'İrlanda',
    'belcika': 'Belçika'
  };

  for (const data of countries) {
    console.log(`   📍 Güncelleniyor: ${data.slug}`);
    const name = nameMap[data.slug] || (data.slug.charAt(0).toUpperCase() + data.slug.slice(1));
    await prisma.country.upsert({
      where: { slug: data.slug },
      update: {
        shortDesc: data.shortDesc,
        overview: data.overview,
        features: data.features,
        visaInfo: data.visaInfo,
        workPermit: data.workPermit,
        costRange: data.costRange,
        content: data.content,
        active: true
      },
      create: {
        name,
        slug: data.slug,
        shortDesc: data.shortDesc,
        overview: data.overview,
        features: data.features,
        visaInfo: data.visaInfo,
        workPermit: data.workPermit,
        costRange: data.costRange,
        content: data.content,
        active: true
      }
    });
  }

  // Update Services
  const services = [
    {
      slug: 'vize',
      content: `
## Vize Danışmanlığı: Karmaşık Süreçlerde Uzman Desteği

Yurtdışında eğitim hayalinizin önündeki en kritik engel vize sürecidir. Mentor Career Consulting olarak, her ülkenin kendine özgü vize prosedürlerinde uzman kadromuzla yanınızdayız.

### Hizmet Kapsamımız
*   **Kişiye Özel Evrak Listesi:** Profilinize ve gideceğiniz ülkeye göre hazırlanmış eksiksiz dosya planı.
*   **Niyet Mektubu Desteği:** Vize memurunu ikna edecek profesyonel niyet mektubu yazımı.
*   **Mülakat Hazırlığı:** Amerika gibi mülakat gerektiren ülkeler için birebir prova seansları.
*   **Finansal Danışmanlık:** Bloke hesap, sponsorluk ve banka dökümleri konusunda doğru yönlendirme.

Sıfır hata payı ile dosyanızı hazırlıyor, vize reddi riskini minimize ediyoruz.
      `,
      seoTitle: 'Vize Danışmanlığı | Mentor Career Consulting',
      seoDescription: 'Yurtdışı eğitim vizesi süreçlerinde %98 başarı oranıyla profesyonel danışmanlık hizmeti. Amerika, Almanya, İngiltere ve Kanada vize desteği.'
    }
  ];

  for (const s of services) {
    console.log(`   🛠️ Güncelleniyor: ${s.slug}`);
    await prisma.service.update({
      where: { slug: s.slug },
      data: {
        content: s.content,
        seoTitle: s.seoTitle,
        seoDescription: s.seoDescription,
        active: true
      }
    });
  }

  console.log('✅ AI Destekli global içerik zenginleştirme tamamlandı!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
