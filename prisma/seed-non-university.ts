const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Başlıyor: Dil Okulu, Yaz Okulu ve Lise Verileri Seeding...');

  const countries = await prisma.country.findMany();
  const countryMap = {};
  countries.forEach(c => countryMap[c.slug] = c.id);

  const services = await prisma.service.findMany();
  const serviceMap = {};
  services.forEach(s => serviceMap[s.slug] = s.id);

  const nonUniData = [
    // GERMANY
    {
      countrySlug: 'almanya',
      institutions: [
        {
          name: 'Goethe-Institut Berlin',
          slug: 'goethe-berlin',
          city: 'Berlin',
          description: 'Almanya\'nın en prestijli dil okulu, resmi Almanca eğitim merkezi.',
          type: 'LANGUAGE_SCHOOL',
          serviceSlug: 'dil-okulu',
          features: ['Resmi Sertifikalı Eğitim', 'Merkezi Konum', 'Kültürel Etkinlikler'],
          tuition: { weekly: '€350 - €500' },
          programs: [
            { name: 'Intensive German Course', category: 'LANGUAGE_SCHOOL', price: 1800, duration: '4 Weeks' },
            { name: 'TestDaF Preparation', category: 'EXAM_PREPARATION', price: 650, duration: '2 Weeks' }
          ]
        },
        {
          name: 'Berlin International School',
          slug: 'berlin-int-school',
          city: 'Berlin',
          description: 'Uluslararası standartlarda eğitim veren seçkin bir lise.',
          type: 'HIGH_SCHOOL',
          serviceSlug: 'lise',
          features: ['IB Programı', 'Çok Kültürlü Ortam', 'Modern Kampüs'],
          tuition: { annual: '€15,000 - €22,000' },
          programs: [
            { name: 'IB Diploma Programme', category: 'HIGH_SCHOOL', price: 18500, duration: '2 Years' }
          ]
        }
      ]
    },
    // UK
    {
      countrySlug: 'ingiltere',
      institutions: [
        {
          name: 'Kaplan International London',
          slug: 'kaplan-london',
          city: 'London',
          description: 'Dünya çapında tanınan premium dil okulu zinciri.',
          type: 'LANGUAGE_SCHOOL',
          serviceSlug: 'dil-okulu',
          features: ['Londra Manzaralı Kampüs', 'Gelişmiş Öğrenme Teknolojisi', 'Haftalık Sosyal Program'],
          tuition: { weekly: '£300 - £450' },
          programs: [
            { name: 'General English', category: 'LANGUAGE_SCHOOL', price: 1200, duration: '4 Weeks' },
            { name: 'IELTS Intensive', category: 'EXAM_PREPARATION', price: 1500, duration: '4 Weeks' }
          ]
        },
        {
          name: 'Oxford Summer Courses',
          slug: 'oxford-summer',
          city: 'Oxford',
          description: 'Oxford University bünyesinde düzenlenen akademik yaz okulu programları.',
          type: 'SUMMER_SCHOOL',
          serviceSlug: 'yaz-okulu',
          features: ['Oxford Kolejlerinde Konaklama', 'Akademik Mentorluk', 'Tarihi Atmosfer'],
          tuition: { program: '£4,500 - £6,000' },
          programs: [
            { name: 'Business & Entrepreneurship Summer', category: 'SUMMER_SCHOOL', price: 5200, duration: '2 Weeks' }
          ]
        }
      ]
    },
    // USA
    {
      countrySlug: 'amerika',
      institutions: [
        {
          name: 'EC English New York',
          slug: 'ec-new-york',
          city: 'New York City',
          description: 'Times Square manzaralı, modern ve enerjik dil okulu.',
          type: 'LANGUAGE_SCHOOL',
          serviceSlug: 'dil-okulu',
          features: ['Times Square\'de Konum', '30+ Yaş Özel Sınıflar', 'Gökdelen Kampüsü'],
          tuition: { weekly: '$400 - $550' },
          programs: [
            { name: 'English in the City', category: 'LANGUAGE_SCHOOL', price: 2200, duration: '4 Weeks' }
          ]
        },
        {
          name: 'Phillips Academy Andover',
          slug: 'phillips-andover',
          city: 'Andover, MA',
          description: 'ABD\'nin en eski ve en prestijli özel yatılı liselerinden biri.',
          type: 'HIGH_SCHOOL',
          serviceSlug: 'lise',
          features: ['Üstün Akademik Başarı', 'Ivy League Hazırlık', 'Geniş Kampüs'],
          tuition: { annual: '$50,000 - $65,000' },
          programs: [
            { name: 'High School Diploma', category: 'HIGH_SCHOOL', price: 62000, duration: '4 Years' }
          ]
        }
      ]
    },
    // CANADA
    {
      countrySlug: 'kanada',
      institutions: [
        {
          name: 'ILSC Toronto',
          slug: 'ilsc-toronto',
          city: 'Toronto',
          description: 'Kanada\'nın en büyük ve en çeşitli program seçeneklerine sahip dil okulu.',
          type: 'LANGUAGE_SCHOOL',
          serviceSlug: 'dil-okulu',
          features: ['Kariyer Odaklı Programlar', 'Üniversite Geçiş Desteği', 'Şehir Merkezi'],
          tuition: { weekly: 'CAD 300 - 450' },
          programs: [
            { name: 'University Pathway Program', category: 'LANGUAGE_SCHOOL', price: 3800, duration: '12 Weeks' }
          ]
        }
      ]
    },
    // IRELAND
    {
      countrySlug: 'irlanda',
      institutions: [
        {
          name: 'Emerald Cultural Institute',
          slug: 'emerald-dublin',
          city: 'Dublin',
          description: 'İrlanda misafirperverliği ile yüksek eğitim standartlarını birleştiren okul.',
          type: 'LANGUAGE_SCHOOL',
          serviceSlug: 'dil-okulu',
          features: ['Yeşil Bahçeli Kampüs', 'Aile Yanı Konaklama Uzmanlığı', 'Sınav Merkezi'],
          tuition: { weekly: '€250 - €400' },
          programs: [
            { name: 'Work & Study Ireland', category: 'LANGUAGE_SCHOOL', price: 3200, duration: '25 Weeks' }
          ]
        }
      ]
    },
    // MALTA (Adding if exist in service map)
    {
      countrySlug: 'malta',
      institutions: [
        {
          name: 'EF St. Julian\'s',
          slug: 'ef-malta',
          city: 'St. Julian\'s',
          description: 'Akdeniz\'in kalbinde, deniz kıyısında tatil tadında İngilizce eğitimi.',
          type: 'LANGUAGE_SCHOOL',
          serviceSlug: 'dil-okulu',
          features: ['Özel Plaj Kulübü', 'Modern Tasarım', 'Yoğun Sosyal Yaşam'],
          tuition: { weekly: '€300 - €450' },
          programs: [
            { name: 'Summer English Intensive', category: 'SUMMER_SCHOOL', price: 1500, duration: '2 Weeks' }
          ]
        }
      ]
    },
    // FRANCE
    {
      countrySlug: 'fransa',
      institutions: [
        {
          name: 'Accord French Language School Paris',
          slug: 'accord-paris',
          city: 'Paris',
          description: 'Paris\'in kalbinde, yüksek kaliteli Fransızca eğitimi.',
          type: 'LANGUAGE_SCHOOL',
          serviceSlug: 'dil-okulu',
          features: ['Paris Şehir Merkezi', 'Resmi Sınav Merkezi', 'Kültürel Atölyeler'],
          tuition: { weekly: '€300 - €450' },
          programs: [
            { name: 'Intensive French Course', category: 'LANGUAGE_SCHOOL', price: 1600, duration: '4 Weeks' }
          ]
        }
      ]
    },
    // ITALY
    {
      countrySlug: 'italya',
      institutions: [
        {
          name: 'Scuola Leonardo da Vinci Rome',
          slug: 'leonardo-rome',
          city: 'Rome',
          description: 'İtalya\'nın en ünlü dil okulu zinciri, Roma\'nın tarihi merkezinde.',
          type: 'LANGUAGE_SCHOOL',
          serviceSlug: 'dil-okulu',
          features: ['Tarihi Bina', 'Aşçılık ve Sanat Dersleri', 'Yoğun İtalyanca'],
          tuition: { weekly: '€280 - €400' },
          programs: [
            { name: 'Italian Language & Culture', category: 'LANGUAGE_SCHOOL', price: 1100, duration: '4 Weeks' }
          ]
        }
      ]
    },
    // NETHERLANDS
    {
      countrySlug: 'hollanda',
      institutions: [
        {
          name: 'International School of Amsterdam',
          slug: 'isa-amsterdam',
          city: 'Amsterdam',
          description: 'Dünyanın ilk IB okulu, global eğitim lideri.',
          type: 'HIGH_SCHOOL',
          serviceSlug: 'lise',
          features: ['IB Öncüsü', 'Yüksek Teknolojik Altyapı', 'Global Topluluk'],
          tuition: { annual: '€20,000 - €28,000' },
          programs: [
            { name: 'Middle Years Programme', category: 'HIGH_SCHOOL', price: 22000, duration: '5 Years' }
          ]
        }
      ]
    },
    // BELGIUM
    {
      countrySlug: 'belcika',
      institutions: [
        {
          name: 'Brussels International Catholic School',
          slug: 'bics-brussels',
          city: 'Brussels',
          description: 'Brüksel\'in merkezinde, İngiliz müfredatlı seçkin bir okul.',
          type: 'HIGH_SCHOOL',
          serviceSlug: 'lise',
          features: ['İngiliz Müfredatı', 'Çift Dillilik Desteği', 'Merkezi Konum'],
          tuition: { annual: '€12,000 - €18,000' },
          programs: [
            { name: 'IGCSE Program', category: 'HIGH_SCHOOL', price: 14500, duration: '2 Years' }
          ]
        }
      ]
    },
    // AUSTRALIA
    {
      countrySlug: 'avustralya',
      institutions: [
        {
          name: 'Navitas English Sydney',
          slug: 'navitas-sydney',
          city: 'Sydney',
          description: 'Avustralya\'nın en büyük ve köklü dil eğitimi sağlayıcısı.',
          type: 'LANGUAGE_SCHOOL',
          serviceSlug: 'dil-okulu',
          features: ['Opera Binasına Yakınlık', 'Akademik Hazırlık Odaklı', 'Modern Tesisler'],
          tuition: { weekly: 'AUD 350 - 500' },
          programs: [
            { name: 'English for Academic Purposes', category: 'LANGUAGE_SCHOOL', price: 4200, duration: '10 Weeks' }
          ]
        }
      ]
    },
    // SWITZERLAND
    {
      countrySlug: 'isvicre',
      institutions: [
        {
          name: 'Institut Le Rosey',
          slug: 'le-rosey',
          city: 'Rolle',
          description: '"Kralların Okulu" olarak bilinen dünyanın en seçkin yatılı okulu.',
          type: 'HIGH_SCHOOL',
          serviceSlug: 'lise',
          features: ['İki Farklı Kampüs (Yaz/Kış)', 'Ultra-Luxury Olanaklar', 'Global Networking'],
          tuition: { annual: 'CHF 120,000+' },
          programs: [
            { name: 'International Baccalaureate', category: 'HIGH_SCHOOL', price: 125000, duration: '2 Years' }
          ]
        }
      ]
    },
    // POLAND
    {
      countrySlug: 'polonya',
      institutions: [
        {
          name: 'British International School of Warsaw',
          slug: 'bis-warsaw',
          city: 'Warsaw',
          description: 'Polonya\'da İngiliz müfredatı ile eğitim veren lider kurum.',
          type: 'HIGH_SCHOOL',
          serviceSlug: 'lise',
          features: ['İngiliz Müfredatı', 'Yüksek Üniversite Kabul Oranı', 'Gelişmiş Sanat Laboratuvarları'],
          tuition: { annual: 'PLN 80,000 - 100,000' },
          programs: [
            { name: 'A-Levels Program', category: 'HIGH_SCHOOL', price: 15000, duration: '2 Years' }
          ]
        }
      ]
    }
  ];

  for (const data of nonUniData) {
    const countryId = countryMap[data.countrySlug];
    if (!countryId) {
      console.warn(`⚠️ Ülke bulunamadı: ${data.countrySlug}, atlanıyor...`);
      continue;
    }

    for (const inst of data.institutions) {
      const serviceId = serviceMap[inst.serviceSlug];
      
      console.log(`   🏫 Kurum: ${inst.name} (${inst.type})`);

      const createdInst = await prisma.institution.upsert({
        where: { slug: inst.slug },
        update: {
          name: inst.name,
          city: inst.city,
          description: inst.description,
          countryId: countryId,
          serviceId: serviceId || null,
          features: inst.features,
          tuition: inst.tuition,
          active: true
        },
        create: {
          name: inst.name,
          slug: inst.slug,
          city: inst.city,
          description: inst.description,
          countryId: countryId,
          serviceId: serviceId || null,
          features: inst.features,
          tuition: inst.tuition,
          active: true,
          rating: 4.8
        }
      });

      for (const prog of inst.programs) {
        await prisma.program.upsert({
          where: { slug: `${inst.slug}-${prog.name.toLowerCase().replace(/ /g, '-')}` },
          update: {
            name: prog.name,
            category: prog.category,
            price: prog.price,
            duration: prog.duration,
            institutionId: createdInst.id
          },
          create: {
            name: prog.name,
            slug: `${inst.slug}-${prog.name.toLowerCase().replace(/ /g, '-')}`,
            category: prog.category,
            price: prog.price,
            duration: prog.duration,
            institutionId: createdInst.id
          }
        });
        console.log(`      🔖 Program: ${prog.name}`);
      }
    }
  }

  console.log('✅ Non-University seeding tamamlandı!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
