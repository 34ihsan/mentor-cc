const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Başlıyor: TÜM Kurum İçeriklerini Toplu Zenginleştirme...');

  const institutions = await prisma.institution.findMany({
    include: { country: true }
  });

  const specificData = {
    'imperial-college-london-uk': {
      description: 'Bilim, mühendislik, tıp ve işletme alanlarında dünya lideri olan Imperial College London, inovasyonun ve teknik mükemmelliğin küresel merkezidir.',
      content: `
## Imperial College London: Geleceğin Teknolojisini Şekillendiren Güç

Imperial College London, sadece İngiltere'nin değil, dünyanın en prestijli bilim ve teknoloji odaklı üniversitelerinden biridir. Londra'nın kalbinde, South Kensington'da yer alan üniversite, bilimsel keşiflerin ve mühendislik harikalarının doğduğu yerdir.

### Neden Imperial College?
*   **Teknik Üstünlük:** Mühendislik ve fen bilimleri alanında dünya sıralamalarında sürekli ilk 10'da yer alır.
*   **Araştırma Odaklı Eğitim:** Öğrenciler, daha lisans seviyesindeyken çığır açan araştırma projelerine dahil olma şansı bulurlar.
*   **Endüstri Bağlantıları:** Global teknoloji devleri ve finans kurumlarıyla olan sıkı işbirlikleri, mezunlara benzersiz kariyer kapıları açar.

### Kampüs Hayatı ve Konum
South Kensington kampüsü; Science Museum, Natural History Museum ve Victoria & Albert Museum gibi dünya çapındaki müzelerin hemen yanındadır. Bu stratejik konum, öğrencilere hem akademik hem de kültürel anlamda rakipsiz bir ortam sunar.
      `,
      campusLife: {
        facilities: "En Son Teknoloji Laboratuvarlar, Gelişmiş Bilgi İşlem Merkezi, South Kensington Kampüsü",
        activities: "Imperial Enterprise Lab, 300+ Topluluk, Yıllık Bilim Festivali"
      }
    },
    'university-of-oxford': {
      description: 'Dünyanın en eski ve en saygın üniversitelerinden biri olan Oxford, asırlık geleneği modern araştırma vizyonuyla birleştirir.',
      content: `
## University of Oxford: Akademik Mirasın ve Entelektüel Derinliğin Merkezi

Oxford Üniversitesi, 1096 yılına uzanan tarihiyle İngilizce konuşulan dünyanın en eski üniversitesidir. Eşsiz "College" sistemi ile öğrencilerine hem bireysel hem de topluluk odaklı bir eğitim sunar.

### Eğitim Modeli: Tutorial Sistemi
Oxford'un başarısının sırrı, öğrencilerin haftalık olarak alanında uzman profesörlerle birebir veya küçük gruplar halinde yaptığı "tutorial" dersleridir. Bu sistem, eleştirel düşünme ve derinlemesine analiz yeteneğini en üst seviyeye çıkarır.

### Şehir ve Kampüs
Oxford şehri, "Rüyalar Gören Kuleler" (City of Dreaming Spires) olarak bilinir. Tarihi kütüphaneler (Bodleian), görkemli kolej binaları ve yeşil parklar, öğrencilere büyüleyici bir atmosfer sunar.
      `
    },
    'mit-university': {
      description: 'Dünyanın teknoloji ve inovasyon motoru. MIT, bilimsel sınırları zorlayan ve geleceği bugünden inşa edenlerin okuludur.',
      content: `
## Massachusetts Institute of Technology (MIT): İnovasyonun Küresel Üssü

MIT, bilim ve teknolojinin insanlık yararına geliştirilmesi misyonuyla hareket eden, dünyanın tartışmasız en iyi teknik üniversitesidir.

### Problem Çözme Odaklı Kültür
MIT'de eğitim, teorik bilginin pratik problem çözme yeteneğiyle birleştiği "Mens et Manus" (Akıl ve El) felsefesine dayanır. Öğrenciler, dünyanın en karmaşık sorunlarına çözüm üretmek üzere yetiştirilir.

### Girişimcilik ve Başarı
Mezunlarının kurduğu şirketlerin toplam cirosu, dünyanın en büyük ekonomileriyle yarışacak düzeydedir. MIT, sadece bir okul değil, aynı zamanda devasa bir girişimcilik ekosistemidir.
      `
    }
  };

  for (const inst of institutions) {
    let updateData = {};

    if (specificData[inst.slug]) {
      // Use specific high-quality data
      updateData = specificData[inst.slug];
    } else {
      // Generate template based on category
      const typeLabel = inst.name.includes('University') || inst.name.includes('Üniversite') || inst.name.includes('College') ? 'üniversite' : 'kurum';
      const city = inst.city || (inst.country ? inst.country.name : '');
      
      updateData = {
        description: `${inst.name}, ${city} bölgesinde yer alan, öğrencilerine yüksek standartlarda eğitim ve gelişim fırsatları sunan seçkin bir ${typeLabel}dir.`,
        content: `
## ${inst.name}: ${city}'de Eğitim ve Gelecek

${inst.name}, modern eğitim yaklaşımları ve güçlü akademik kadrosuyla öğrencilerini geleceğe hazırlar. ${city} şehrinin sunduğu avantajlarla birleşen eğitim programımız, her öğrencinin potansiyelini en üst düzeye çıkarmayı hedefler.

### Öne Çıkan Özellikler
*   **Kaliteli Eğitim:** Uluslararası standartlarda müfredat ve uzman kadro.
*   **Modern Kampüs:** En son teknolojilerle donatılmış derslikler ve sosyal alanlar.
*   **Kariyer Desteği:** Mezuniyet sonrası iş dünyasına geçişte profesyonel rehberlik.

### Neden ${inst.name}?
Burada sadece bir diploma değil, aynı zamanda global bir vizyon kazanırsınız. Farklı kültürlerden gelen öğrencilerle bir arada eğitim alarak dünya vatandaşı olma yolunda önemli adımlar atarsınız.
        `,
        campusLife: {
          facilities: "Kütüphane, Sosyal Alanlar, Ücretsiz Wi-Fi, Etüt Salonları",
          activities: "Öğrenci Kulüpleri, Spor Turnuvaları, Kültürel Geziler"
        }
      };
    }

    // Only update if current content is empty or generic (optional safety)
    // For this task, user wants everything enriched, so we overwrite.
    
    console.log(`   📝 Zenginleştiriliyor: ${inst.slug} (${inst.name})`);
    await prisma.institution.update({
      where: { id: inst.id },
      data: {
        description: updateData.description,
        content: updateData.content,
        campusLife: updateData.campusLife,
        active: true
      }
    });
  }

  console.log('\n✅ TÜM kurumlar başarıyla zenginleştirildi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
