const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('✨ Başlıyor: Kurum İçeriklerini Zenginleştirme...');

  const enrichmentData = [
    {
      slug: 'utoronto',
      description: 'Dünya sıralamasında ilk 25\'te yer alan University of Toronto, Kanada\'nın araştırma ve inovasyon merkezidir. Üç farklı kampüsüyle öğrencilerine eşsiz bir akademik derinlik sunar.',
      content: `
## University of Toronto: Geleceğin Liderlerini Şekillendiren Akademik Mükemmellik

Toronto Üniversitesi (UofT), sadece Kanada'nın değil, dünyanın en saygın eğitim kurumlarından biridir. 1827 yılında kurulan üniversite, kurulduğu günden bu yana bilim, sanat, tıp ve mühendislik alanlarında devrim niteliğinde çalışmalara ev sahipliği yapmıştır.

### Neden University of Toronto?
*   **Global Tanınırlık:** QS World University Rankings ve THE gibi listelerde sürekli olarak ilk 25 içerisinde yer alır.
*   **İnovasyonun Kalbi:** İnsülinin keşfinden kök hücre araştırmalarına kadar pek çok önemli buluşun merkezidir.
*   **Kariyer Olanakları:** Toronto, Kuzey Amerika'nın en büyük üçüncü teknoloji ve finans merkezi olması sebebiyle öğrencilere staj ve iş imkanları sunar.

### Kampüs Hayatı
Üç ana kampüsü (St. George, Mississauga, Scarborough) ile her öğrenciye farklı bir deneyim sunar. Tarihi binaları, devasa kütüphaneleri ve 800'den fazla öğrenci kulübü ile sadece eğitim değil, sosyal bir yaşam alanı sağlar.

### Bölüm Seçenekleri
Mühendislikten beşeri bilimlere, bilgisayar bilimlerinden işletmeye kadar 700'den fazla lisans programı mevcuttur. Her bir program, alanında uzman akademisyenler tarafından yürütülür.
      `,
      campusLife: {
        facilities: "10+ Kütüphane, Olimpik Havuz, Sanat Galerileri",
        clubs: "800+ Öğrenci Kulübü",
        events: "Haftalık Seminerler, Kariyer Günleri, Uluslararası Kültür Festivalleri"
      }
    },
    {
      slug: 'goethe-berlin',
      description: 'Goethe-Institut, Almanca öğrenmek isteyenler için dünya genelinde altın standarttır. Berlin\'in kalbindeki kampüsünde hem dili hem de kültürü yaşayarak öğrenirsiniz.',
      content: `
## Goethe-Institut Berlin: Almanca Öğrenmenin En Profesyonel Yolu

Berlin'in merkezinde, Alexanderplatz'a sadece birkaç dakika mesafede yer alan Goethe-Institut, Almanca dil eğitiminde dünyanın bir numaralı kurumudur. 

### Eğitim Metodolojimiz
Goethe-Institut, dili sadece bir ders olarak değil, bir iletişim aracı olarak öğretir. Modern sınıflarımızda uygulanan iletişimsel metotlar sayesinde öğrencilerimiz kısa sürede akıcı bir şekilde konuşmaya başlar.

### Berlin'de Yaşam ve Öğrenim
Kursunuz devam ederken Berlin'in tarihi ve kültürel atmosferini keşfedeceksiniz. Okulumuzun düzenlediği gezi programları ile Berlin Duvarı, Müzeler Adası gibi ikonik noktaları ziyaret ederken Almancanızı pratik yapma şansı bulacaksınız.

### Sertifikalar
Burada alacağınız sertifikalar (A1-C2), Almanya'daki tüm üniversiteler ve işverenler tarafından resmi olarak tanınmaktadır.
      `,
      campusLife: {
        facilities: "Mediathek (Multimedya Kütüphanesi), Kafeterya, Kablosuz İnternet",
        activities: "Şehir Gezileri, Film Akşamları, Dil Değişim Programları",
        location: "Berlin Mitte, Mitte bölgesinin kalbinde"
      }
    },
    {
      slug: 'le-rosey',
      description: 'İsviçre\'nin ve dünyanın en seçkin özel okulu. Institut Le Rosey, "Kralların Okulu" olarak bilinir ve her yıl sadece en nitelikli öğrencileri kabul eder.',
      content: `
## Institut Le Rosey: Sınır Tanımayan Bir Eğitim Deneyimi

1880 yılında kurulan Le Rosey, dünyanın en pahalı ve en prestijli yatılı okulu unvanına sahiptir. Okulun en büyük özelliği, kış aylarında Gstaad'daki kayak merkezine taşınan benzersiz çift kampüs sistemidir.

### Akademik Mükemmellik
Öğrencilerimiz International Baccalaureate (IB) veya French Baccalaureate programlarından birini seçebilirler. Sınıf mevcutları ortalama 10 kişidir ve öğretmen-öğrenci oranı 1:5'tir.

### Sosyal ve Sportif Olanaklar
Okul bünyesinde özel yat kulübü, binicilik merkezi ve profesyonel konser salonu bulunmaktadır. Öğrencilerimiz akademik başarının yanı sıra sanat ve spor alanında da en üst düzeyde desteklenir.

### Global Bir Ağ
Rosey mezunları (Roséens), dünyanın en etkili aileleri, devlet liderleri ve iş insanlarından oluşan özel bir global topluluğun parçası olurlar.
      `,
      campusLife: {
        facilities: "Binicilik Merkezi, Yat Kulübü, 30+ Tenis Kortu",
        residence: "7/24 Gözetimli Ultra-Lüks Yurtlar",
        sports: "Kayak, Binicilik, Yelken, Golf"
      }
    },
    {
      slug: 'eth-zurich',
      description: 'Albert Einstein\'ın okulu olarak bilinen ETH Zurich, mühendislik ve teknoloji alanında kıta Avrupa\'sının bir numaralı üniversitesidir.',
      content: `
## ETH Zurich: Bilimin Sınırlarını Zorlayan Teknoloji Üniversitesi

Zürih Federal Teknoloji Enstitüsü (ETH Zurich), dünya çapında mühendislik, fen bilimleri ve teknoloji eğitiminin zirvesidir. 21 Nobel ödüllü mezunu ve hocasıyla bilim tarihine yön vermiştir.

### Araştırma ve İnovasyon
ETH, en son teknolojiye sahip laboratuvarları ve devasa bütçeli araştırma projeleriyle öğrencilerine geleceğin teknolojilerini tasarlama fırsatı sunar. Özellikle Robotik, Yapay Zeka ve Sürdürülebilir Enerji alanlarında dünya lideridir.

### Eğitim Sistemi
Eğitim dili lisansta Almanca ağırlıklı olsa da, yüksek lisans ve doktora seviyesinde neredeyse tüm bölümler İngilizcedir. Okul, akademik disiplin ve pratik uygulamanın harmanlandığı zorlu ama bir o kadar da ödüllendirici bir sistem sunar.

### Zürih'te Yaşam
Dünyanın en yaşanabilir şehirlerinden biri olan Zürih'te, Alplerin eteğinde ve göl kıyısında eğitim görmek, öğrencilere eşsiz bir yaşam kalitesi sağlar.
      `,
      campusLife: {
        facilities: "Avrupa'nın En Büyük Kütüphane Ağı, Spor Kompleksleri, Öğrenci Girişimcilik Merkezi",
        events: "Polyball, Kariyer Fuarı, Bilim Geceleri"
      }
    },
    {
      slug: 'kaplan-london',
      description: 'Londra\'nın simge yapısı The Shard manzaralı, modern ve ileri teknoloji ile donatılmış premium dil okulu deneyimi.',
      content: `
## Kaplan International London: Şehrin Kalbinde İngilizce

Kaplan International London, Londra Bridge bölgesindeki modern binasıyla öğrencilerine şehrin merkezinde prestijli bir eğitim sunar.

### Neden Kaplan?
*   **K+ Learning System:** Kaplan'a özel harmanlanmış eğitim modeli ile ders içi ve ders dışı öğrenme birleşir.
*   **Merkezi Konum:** Borough Market ve London Bridge'e yürüme mesafesinde.
*   **Global Karma:** 100'den fazla ülkeden gelen öğrencilerle gerçek bir uluslararası ortam.

### Programlar
Genel İngilizce'den IELTS hazırlığa, İş İngilizcesi'nden yoğun programlara kadar her seviyeye uygun kurslar mevcuttur.
      `,
      campusLife: {
        facilities: "Sosyal Alanlar, Öğrenci Salonu, Kütüphane",
        activities: "London Eye Gezileri, Pub Geceleri, Hafta Sonu Cambridge/Oxford Turları"
      }
    },
    {
      slug: 'harvard-university',
      description: 'Dünyanın en prestijli üniversitesi olan Harvard, akademik mükemmelliğin ve global liderliğin sembolüdür.',
      content: `
## Harvard University: Bilginin ve Liderliğin Zirvesi

1636 yılında kurulan Harvard University, Amerika Birleşik Devletleri'nin en eski ve dünyanın en tanınmış yükseköğrenim kurumudur. Cambridge, Massachusetts'te yer alan üniversite, yüzyıllardır dünya tarihine yön veren liderler yetiştirmiştir.

### Neden Harvard?
*   **Akademik Miras:** 160'tan fazla Nobel ödüllü mezunu ve hocasıyla bilim dünyasının zirvesindedir.
*   **Network Gücü:** Harvard mezunları, iş dünyasından siyasete kadar her alanda dünyanın en etkili ağını oluşturur.
*   **Kütüphane Sistemi:** Dünyanın en büyük akademik kütüphane sistemine ev sahipliği yapar.

### Kampüs ve Sosyal Yaşam
Harvard Yard'ın tarihi atmosferi, öğrencilere ilham verici bir çalışma ortamı sunar. Üniversite bünyesindeki müzeler, tiyatrolar ve spor tesisleri, eğitimin sadece sınıflarla sınırlı kalmadığını kanıtlar.
      `
    },
    {
      slug: 'ucl-london-new',
      description: 'Londra\'nın kalbinde yer alan UCL, disiplinlerarası araştırma ve eğitimde dünya lideridir.',
      content: `
## University College London (UCL): Londra'nın Global Üniversitesi

UCL, 1826 yılında "Londra'nın Üniversitesi" sloganıyla kurulmuş, İngiltere'nin en büyük ve en prestijli araştırma kurumlarından biridir.

### Global Bir Bakış Açısı
UCL öğrencileri, 150'den fazla ülkeden gelen arkadaşlarıyla birlikte çok kültürlü bir ortamda eğitim görürler. Okul, özellikle Tıp, Mimarlık (The Bartlett) ve Eğitim (IOE) alanlarında dünya sıralamalarında 1. veya 2. sıradadır.

### Bloomsbury'nin Kalbinde
British Museum'a yürüme mesafesinde olan UCL kampüsü, öğrencilere Londra'nın sunduğu tüm akademik ve sosyal kaynaklara doğrudan erişim sağlar.
      `
    },
    {
      slug: 'sorbonne-paris',
      description: 'Fransa\'nın en köklü ve saygın üniversitesi olan Sorbonne, beşeri bilimler ve fen bilimlerinde Avrupa\'nın kalbidir.',
      content: `
## Sorbonne University: Tarih ve Bilimin Buluşma Noktası

Paris'in simgelerinden biri olan Sorbonne, Avrupa'nın en eski üniversitelerinden biridir. Geleneksel akademik disiplini modern araştırma teknikleriyle birleştirir.

### Neden Sorbonne?
*   **Entelektüel Miras:** Descartes'tan Marie Curie'ye kadar pek çok büyük isim Sorbonne koridorlarından geçmiştir.
*   **Paris Deneyimi:** Latin Quarter'ın kalbinde eğitim görmek, bir öğrencinin sahip olabileceği en estetik deneyimlerden biridir.
*   **Fransız Akademik Kültürü:** Öğrenciler, Fransa'nın derin akademik kültürünü ve entelektüel tartışma ortamını ilk elden deneyimlerler.
      `
    },
    {
      slug: 'sapienza-rome',
      description: 'Roma\'nın kalbinde, Avrupa\'nın en büyük üniversitelerinden biri olan Sapienza, 700 yıllık bir geleneği geleceğe taşır.',
      content: `
## Sapienza University of Rome: Ebedi Şehrin Akademik Gücü

Sapienza, 1303 yılında kurulan köklü geçmişiyle İtalya'nın ve Avrupa'nın en önemli eğitim merkezlerinden biridir.

### Geniş Bölüm Yelpazesi
Klasik arkeolojiden havacılık mühendisliğine kadar çok geniş bir program çeşitliliği sunar. Özellikle Klasik Çalışmalar alanında dünya çapında 1 numaradır.

### Roma'da Öğrenci Olmak
Roma, açık hava müzesi niteliğindeki yapısıyla öğrencilere ilham verir. Sapienza öğrencileri, tarihle iç içe bir kampüs hayatı yaşarken İtalyan kültürünü ve mutfağını derinlemesine tanıma fırsatı bulurlar.
      `
    }
  ];

  for (const data of enrichmentData) {
    console.log(`   📝 Güncelleniyor: ${data.slug}`);
    await prisma.institution.update({
      where: { slug: data.slug },
      data: {
        description: data.description,
        content: data.content,
        campusLife: data.campusLife,
        active: true
      }
    });
  }

  console.log('✅ İçerik zenginleştirme tamamlandı!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
