const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Başlıyor: Ülke İçeriklerini Zenginleştirme...');

  const countryEnrichment = [
    {
      slug: 'almanya',
      shortDesc: 'Avrupa\'nın ekonomi ve mühendislik devinde kariyer odaklı bir eğitim deneyimi.',
      overview: 'Almanya, yüksek eğitim standartları, ücretsiz devlet üniversiteleri ve mezuniyet sonrası sunduğu geniş kariyer olanakları ile uluslararası öğrencilerin ilk tercihidir.',
      features: ['Ücretsiz Devlet Üniversiteleri', 'Mühendislik ve Teknoloji Liderliği', '18 Ay Mezuniyet Sonrası Çalışma İzni'],
      visaInfo: 'Öğrenci vizesi için genellikle bloke hesap (Sperrkonto) veya sponsorluk belgesi gereklidir. Kabul mektubu ile konsolosluğa başvurulur.',
      workPermit: 'Öğrenciler yılda 120 tam gün veya 240 yarım gün çalışma hakkına sahiptir. Mezuniyet sonrası 18 aya kadar iş arama vizesi verilir.',
      costRange: 'Aylık €900 - €1,200 (Yaşam giderleri dahil)'
    },
    {
      slug: 'ingiltere',
      shortDesc: 'Akademik geleneğin modern inovasyonla buluştuğu global eğitim merkezi.',
      overview: 'İngiltere, Oxford ve Cambridge gibi asırlık kurumları, kısa süreli yüksek lisans programları ve Londra gibi dünya başkentleri ile eşsiz bir vizyon sunar.',
      features: ['1 Yıllık Hızlı Master Programları', 'Dünya Sıralamasında İlk 100\'de 20+ Üniversite', 'Global İş Ağı'],
      visaInfo: 'Student Visa (eski Tier 4) için CAS belgesi ve finansal yeterlilik kanıtı gereklidir. Puan tabanlı sistem uygulanır.',
      workPermit: 'Mezuniyet sonrası Graduate Route ile 2 yıl (Doktora için 3 yıl) İngiltere\'de kalma ve çalışma hakkı sağlanır.',
      costRange: 'Aylık £1,100 - £1,600'
    },
    {
      slug: 'kanada',
      shortDesc: 'Güvenli, çok kültürlü ve göçmen dostu yapısıyla geleceğinizi inşa edeceğiniz ülke.',
      overview: 'Kanada, kaliteli eğitim sistemi, doğası ve sunduğu kalıcı oturum imkanları ile son yılların en popüler destinasyonudur.',
      features: ['PGWP (Post-Graduation Work Permit)', 'Kalıcı Oturum (PR) İmkanları', 'Güvenli ve Huzurlu Yaşam'],
      visaInfo: 'Study Permit başvurusu için IRCC üzerinden online başvuru yapılır. Biyometrik veri ve finansal kanıt şarttır.',
      workPermit: 'Eğitim sırasında haftada 20 saat çalışma izni vardır. Eğitim sonrası program süresine göre 3 yıla kadar çalışma izni alınabilir.',
      costRange: 'Aylık CAD 1,500 - 2,200'
    }
  ];

  for (const data of countryEnrichment) {
    console.log(`   📍 Güncelleniyor: ${data.slug}`);
    await prisma.country.update({
      where: { slug: data.slug },
      data: {
        shortDesc: data.shortDesc,
        overview: data.overview,
        features: data.features,
        visaInfo: data.visaInfo,
        workPermit: data.workPermit,
        costRange: data.costRange
      }
    });
  }

  console.log('✅ Ülke içerikleri zenginleştirildi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
