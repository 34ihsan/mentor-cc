const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Başlıyor: Kapsamlı Üniversite ve Bölüm Verileri Seeding...');

  // Services
  const undergradSlug = 'yurtdisi-universite';
  const mastersSlug = 'yurtdisi-yuksek-lisans';

  const undergradService = await prisma.service.findUnique({ where: { slug: undergradSlug } });
  const mastersService = await prisma.service.findUnique({ where: { slug: mastersSlug } });

  if (!undergradService || !mastersService) {
    console.error('❌ Hata: Gerekli servisler (yurtdisi-universite, yurtdisi-yuksek-lisans) veritabanında bulunamadı!');
    return;
  }

  const universityData = [
    {
      country: 'Almanya',
      slug: 'almanya',
      image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=2070',
      institutions: [
        {
          name: 'Humboldt University of Berlin',
          slug: 'humboldt-berlin',
          city: 'Berlin',
          rank: '#120 QS',
          rating: 4.7,
          desc: 'Berlin\'in kalbinde, bilim ve beşeri bilimler alanında köklü bir geçmişe sahip.',
          stats: { students: '35,000+', intlStudents: '18%', staff: '2,500+' },
          features: ['Nobel Ödüllü Mezunlar', 'Disiplinlerarası Araştırma', 'Tarihi Kampüs'],
          tuition: { eu: 'Free', international: 'Free (Semester fee ~€315)' },
          accommodation: { options: 'Studentenwerk Dorms, Private flatshares', cost: '€400 - €700/mo' },
          programs: [
            { name: 'Bachelor of Computer Science', level: 'UNIVERSITY', price: 0, duration: '3 Years' },
            { name: 'Master of Data Science', level: 'MASTER', price: 0, duration: '2 Years' }
          ]
        },
        {
          name: 'Technical University of Munich (TUM)',
          slug: 'tum-munich-new',
          city: 'Münih',
          rank: '#37 QS',
          rating: 4.9,
          desc: 'Avrupa\'nın en iyi teknik üniversitelerinden biri, teknoloji ve inovasyon merkezi.',
          stats: { students: '50,000+', intlStudents: '35%', staff: '10,000+' },
          features: ['Girişimcilik Odağı', 'Sanayi İşbirlikleri (BMW, Siemens)', 'Modern Laboratuvarlar'],
          tuition: { eu: 'Free', international: '€2,000 - €6,000 per semester (New regulation)' },
          accommodation: { options: 'University dorms, Private rentals', cost: '€600 - €1,000/mo' },
          programs: [
            { name: 'B.Sc. Mechanical Engineering', level: 'UNIVERSITY', price: 0, duration: '3.5 Years' },
            { name: 'M.Sc. Robotics, Cognition, Intelligence', level: 'MASTER', price: 0, duration: '2 Years' }
          ]
        }
      ]
    },
    {
      country: 'İngiltere',
      slug: 'ingiltere',
      image: 'https://images.unsplash.com/photo-1513635269975-5969336ac1cb?q=80&w=2070',
      institutions: [
        {
          name: 'University College London (UCL)',
          slug: 'ucl-london-new',
          city: 'Londra',
          rank: '#9 QS',
          rating: 4.8,
          desc: 'Londra\'nın küresel üniversitesi, çok disiplinli araştırma lideri.',
          stats: { students: '45,000+', intlStudents: '48%', staff: '13,000+' },
          features: ['Dünya Çapında Sıralama', 'Merkezi Konum', 'Geniş Bölüm Yelpazesi'],
          tuition: { eu: '£9,250', international: '£25,000 - £35,000' },
          accommodation: { options: 'UCL Halls, Private Student Halls', cost: '£800 - £1,400/mo' },
          programs: [
            { name: 'BSc Economics', level: 'UNIVERSITY', price: 28000, duration: '3 Years' },
            { name: 'MSc Business Analytics', level: 'MASTER', price: 35000, duration: '1 Year' }
          ]
        },
        {
          name: 'University of Manchester',
          slug: 'manchester-uni',
          city: 'Manchester',
          rank: '#32 QS',
          rating: 4.6,
          desc: 'İngiltere\'nin en büyük tek kampüslü üniversitesi, sanayi devriminin doğduğu şehirde.',
          stats: { students: '40,000+', intlStudents: '30%', staff: '12,000+' },
          features: ['Güçlü Mezun Ağı', 'Kariyer Hizmetleri', 'Canlı Şehir Hayatı'],
          tuition: { eu: '£9,250', international: '£22,000 - £30,000' },
          accommodation: { options: 'University residences, Private rentals', cost: '£500 - £900/mo' },
          programs: [
            { name: 'BEng Civil Engineering', level: 'UNIVERSITY', price: 26000, duration: '3 Years' },
            { name: 'MA International Relations', level: 'MASTER', price: 24000, duration: '1 Year' }
          ]
        }
      ]
    },
    {
      country: 'Amerika',
      slug: 'amerika',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070',
      institutions: [
        {
          name: 'New York University (NYU)',
          slug: 'nyu-new-york',
          city: 'New York',
          rank: '#38 QS',
          rating: 4.7,
          desc: 'Şehirle iç içe, duvarları olmayan bir üniversite deneyimi.',
          stats: { students: '52,000+', intlStudents: '25%', staff: '19,000+' },
          features: ['Global Network', 'Tisch School of Arts', 'Wall Street Bağlantıları'],
          tuition: { local: '$60,000', international: '$60,000' },
          accommodation: { options: 'On-campus dorms, Brooklyn/Manhattan rentals', cost: '$1,500 - $3,000/mo' },
          programs: [
            { name: 'BA Psychology', level: 'UNIVERSITY', price: 58000, duration: '4 Years' },
            { name: 'Master of Public Administration', level: 'MASTER', price: 62000, duration: '2 Years' }
          ]
        },
        {
          name: 'University of California, Berkeley',
          slug: 'uc-berkeley',
          city: 'Berkeley, CA',
          rank: '#10 QS',
          rating: 4.9,
          desc: 'Dünyanın en iyi devlet üniversitesi, özgür düşüncenin merkezi.',
          stats: { students: '42,000+', intlStudents: '20%', staff: '15,000+' },
          features: ['Bilimsel Araştırma Zirvesi', 'Silikon Vadisi Yakınlığı', 'Zengin Kampüs Kültürü'],
          tuition: { inState: '$15,000', international: '$45,000' },
          accommodation: { options: 'Co-ops, Dorms, Private apartments', cost: '$1,200 - $2,500/mo' },
          programs: [
            { name: 'B.S. Electrical Engineering & CS', level: 'UNIVERSITY', price: 44000, duration: '4 Years' },
            { name: 'Master of Information & Data Science', level: 'MASTER', price: 48000, duration: '20 Months' }
          ]
        }
      ]
    },
    {
      country: 'Kanada',
      slug: 'kanada',
      image: 'https://images.unsplash.com/photo-1503614472666-ef35779a4ed5?q=80&w=1200',
      institutions: [
        {
          name: 'University of Toronto',
          slug: 'utoronto',
          city: 'Toronto',
          rank: '#21 QS',
          rating: 4.9,
          desc: 'Kanada\'nın en prestijli araştırma üniversitesi, inovasyonun kalbi.',
          stats: { students: '97,000+', intlStudents: '25%', staff: '20,000+' },
          features: ['Dünya Çapında Araştırma Liderliği', 'Zengin Kütüphane Kaynakları', 'Global Kariyer Fırsatları'],
          tuition: { domestic: 'CAD 6,100', international: 'CAD 45,000 - 60,000' },
          accommodation: { options: 'University residences, Off-campus housing', cost: 'CAD 1,200 - 2,000/mo' },
          programs: [
            { name: 'Bachelor of Computer Science', level: 'UNIVERSITY', price: 58000, duration: '4 Years' },
            { name: 'Master of Applied Computing', level: 'MASTER', price: 62000, duration: '16 Months' }
          ]
        }
      ]
    },
    {
      country: 'İsviçre',
      slug: 'isvicre',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200',
      institutions: [
        {
          name: 'ETH Zurich',
          slug: 'eth-zurich',
          city: 'Zürih',
          rank: '#7 QS',
          rating: 4.9,
          desc: 'Bilim ve teknolojide dünya lideri, Einstein\'ın okulu.',
          stats: { students: '24,000+', intlStudents: '40%', staff: '6,000+' },
          features: ['Sayısal Bilimlerde Mükemmeliyet', 'İnovasyon ve Girişimcilik', 'Alplerin Kalbinde Teknoloji'],
          tuition: { domestic: 'CHF 730', international: 'CHF 730 per semester' },
          accommodation: { options: 'Student housing, Private flatshares', cost: 'CHF 800 - 1,500/mo' },
          programs: [
            { name: 'B.Sc. Computer Science', level: 'UNIVERSITY', price: 1500, duration: '3 Years' },
            { name: 'M.Sc. Cyber Security', level: 'MASTER', price: 1500, duration: '2 Years' }
          ]
        }
      ]
    },
    {
      country: 'Avustralya',
      slug: 'avustralya',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200',
      institutions: [
        {
          name: 'University of Melbourne',
          slug: 'unimelb',
          city: 'Melbourne',
          rank: '#14 QS',
          rating: 4.8,
          desc: 'Avustralya\'nın en iyi üniversitesi, Melbourne Modeli ile eğitim.',
          stats: { students: '54,000+', intlStudents: '44%', staff: '9,000+' },
          features: ['Araştırma Odaklı Eğitim', 'Kültürel Çeşitlilik', 'Dünyanın En Yaşanabilir Şehri'],
          tuition: { domestic: 'AUD 9,000', international: 'AUD 35,000 - 50,000' },
          accommodation: { options: 'Residential colleges, Student apartments', cost: 'AUD 1,500 - 2,500/mo' },
          programs: [
            { name: 'Bachelor of Biomedicine', level: 'UNIVERSITY', price: 42000, duration: '3 Years' },
            { name: 'Master of Engineering', level: 'MASTER', price: 48000, duration: '2 Years' }
          ]
        }
      ]
    },
    {
      country: 'Belçika',
      slug: 'belcika',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200',
      institutions: [
        {
          name: 'KU Leuven',
          slug: 'kuleuven',
          city: 'Leuven',
          rank: '#61 QS',
          rating: 4.7,
          desc: 'Avrupa\'nın en inovatif üniversitesi, zengin tarih ve bilim.',
          stats: { students: '60,000+', intlStudents: '20%', staff: '12,000+' },
          features: ['İnovasyon Lideri', 'Avrupa\'nın Kalbinde', 'Uygun Harç Ücretleri'],
          tuition: { eu: '€1,092', international: '€1,092 - €7,000' },
          accommodation: { options: 'University residence, Private studios', cost: '€400 - €800/mo' },
          programs: [
            { name: 'Bachelor of Business Administration', level: 'UNIVERSITY', price: 2000, duration: '3 Years' },
            { name: 'Master of Statistics', level: 'MASTER', price: 4000, duration: '2 Years' }
          ]
        }
      ]
    },
    {
      country: 'Hollanda',
      slug: 'hollanda',
      image: 'https://images.unsplash.com/photo-1512470876302-972faa2ab9af?q=80&w=1200',
      institutions: [
        {
          name: 'University of Amsterdam (UvA)',
          slug: 'uva-amsterdam',
          city: 'Amsterdam',
          rank: '#53 QS',
          rating: 4.8,
          desc: 'Sosyal bilimlerde dünya çapında lider, modern ve dinamik.',
          stats: { students: '41,000+', intlStudents: '30%', staff: '6,000+' },
          features: ['Güçlü Sosyal Bilimler', 'Kanal Şehri Yaşamı', 'Uluslararası Ortam'],
          tuition: { eu: '€2,314', international: '€10,000 - €20,000' },
          accommodation: { options: 'University housing (limited), Private sector', cost: '€600 - €1,200/mo' },
          programs: [
            { name: 'BSc Psychology', level: 'UNIVERSITY', price: 12000, duration: '3 Years' },
            { name: 'MSc Communication Science', level: 'MASTER', price: 18000, duration: '1 Year' }
          ]
        }
      ]
    },
    {
      country: 'İrlanda',
      slug: 'irlanda',
      image: 'https://images.unsplash.com/photo-1590089415225-401cd6f9ad43?q=80&w=1200',
      institutions: [
        {
          name: 'Trinity College Dublin',
          slug: 'trinity-dublin',
          city: 'Dublin',
          rank: '#81 QS',
          rating: 4.7,
          desc: 'İrlanda\'nın en eski ve prestijli üniversitesi.',
          stats: { students: '18,000+', intlStudents: '28%', staff: '3,000+' },
          features: ['Tarihi Kütüphane', 'Oscar Wilde Mezuniyeti', 'Teknoloji Merkezi (Silicon Docks)'],
          tuition: { eu: '€5,000 - €8,000', international: '€20,000 - €26,000' },
          accommodation: { options: 'Trinity Halls, Private rentals', cost: '€700 - €1,300/mo' },
          programs: [
            { name: 'Bachelor in Law (LLB)', level: 'UNIVERSITY', price: 22000, duration: '4 Years' },
            { name: 'M.Sc. Computer Science', level: 'MASTER', price: 25000, duration: '1 Year' }
          ]
        }
      ]
    },
    {
      country: 'Polonya',
      slug: 'polonya',
      image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=1200',
      institutions: [
        {
          name: 'University of Warsaw',
          slug: 'uni-warsaw',
          city: 'Varşova',
          rank: '#262 QS',
          rating: 4.4,
          desc: 'Polonya\'nın en büyük üniversitesi, uygun maliyetli kaliteli eğitim.',
          stats: { students: '40,000+', intlStudents: '12%', staff: '7,000+' },
          features: ['Merkezi Avrupa Konumu', 'Düşük Yaşam Maliyeti', 'Köklü Bilim Geleneği'],
          tuition: { local: 'Free', international: '€2,000 - €4,000' },
          accommodation: { options: 'Student dorms, Private apartments', cost: '€250 - €500/mo' },
          programs: [
            { name: 'B.Sc. Finance & Accounting', level: 'UNIVERSITY', price: 3000, duration: '3 Years' },
            { name: 'Master in International Relations', level: 'MASTER', price: 3500, duration: '2 Years' }
          ]
        }
      ]
    },
    {
      country: 'İtalya',
      slug: 'italya',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2070',
      institutions: [
        {
          name: 'Politecnico di Milano',
          slug: 'polimi-milan',
          city: 'Milano',
          rank: '#123 QS',
          rating: 4.6,
          desc: 'Mühendislik, Mimarlık ve Tasarım alanında İtalya\'nın lideri.',
          stats: { students: '47,000+', intlStudents: '15%', staff: '1,500+' },
          features: ['Moda ve Tasarım Başkenti', 'İngilizce Programlar', 'Tarihi ve Modern Kampüsler'],
          tuition: { local: '€900 - €3,900', international: '€3,900 (Flat fee)' },
          accommodation: { options: 'Residence halls, Private rentals', cost: '€500 - €900/mo' },
          programs: [
            { name: 'Bachelor in Architectural Design', level: 'UNIVERSITY', price: 3900, duration: '3 Years' },
            { name: 'Master in Space Engineering', level: 'MASTER', price: 3900, duration: '2 Years' }
          ]
        },
        {
          name: 'Sapienza University of Rome',
          slug: 'sapienza-rome',
          city: 'Roma',
          rank: '#134 QS',
          rating: 4.5,
          desc: 'Avrupa\'nın en büyük üniversitelerinden biri, tarihin ve bilimin buluşma noktası.',
          stats: { students: '115,000+', intlStudents: '10%', staff: '8,000+' },
          features: ['Geniş Akademik Yelpaze', 'Roma\'nın Merkezinde', 'Klasik Çalışmalarda Dünya 1.si'],
          tuition: { local: '€1,000 - €3,000', international: '€1,000 - €3,000' },
          accommodation: { options: 'Private rentals, Church-run hostels', cost: '€400 - €800/mo' },
          programs: [
            { name: 'B.Sc. Nursing', level: 'UNIVERSITY', price: 1500, duration: '3 Years' },
            { name: 'M.Sc. Artificial Intelligence', level: 'MASTER', price: 2500, duration: '2 Years' }
          ]
        }
      ]
    },
    {
      country: 'Fransa',
      slug: 'fransa',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073',
      institutions: [
        {
          name: 'Sorbonne University',
          slug: 'sorbonne-paris',
          city: 'Paris',
          rank: '#59 QS',
          rating: 4.7,
          desc: 'Dünyanın en prestijli beşeri bilimler ve fen bilimleri üniversitelerinden biri.',
          stats: { students: '55,000+', intlStudents: '20%', staff: '6,400+' },
          features: ['Tarihi Miras', 'Paris\'in Kalbinde', 'Nobel ve Fields Madalyalı Akademisyenler'],
          tuition: { local: '€170 - €243', international: '€2,770 - €3,770' },
          accommodation: { options: 'CROUS Dorms, Private Studios', cost: '€700 - €1,200/mo' },
          programs: [
            { name: 'Licence en Philosophie', level: 'UNIVERSITY', price: 2770, duration: '3 Years' },
            { name: 'Master en Physique', level: 'MASTER', price: 3770, duration: '2 Years' }
          ]
        }
      ]
    }
  ];

  for (const countryData of universityData) {
    // 1. Create/Update Country
    let country = await prisma.country.findUnique({ where: { slug: countryData.slug } });
    if (!country) {
      country = await prisma.country.create({
        data: {
          name: countryData.country,
          slug: countryData.slug,
          image: countryData.image,
          active: true
        }
      });
      console.log(`🌍 Ülke oluşturuldu: ${countryData.country}`);
    }

    for (const inst of countryData.institutions) {
      // 2. Create/Update Institution
      const instSlug = inst.slug;
      
      // Determine service based on first program or default to undergrad
      const serviceId = undergradService.id;

      const institution = await prisma.institution.upsert({
        where: { slug: instSlug },
        update: {
          city: inst.city,
          rank: inst.rank,
          rating: inst.rating,
          description: inst.desc,
          stats: inst.stats,
          features: inst.features,
          tuition: inst.tuition,
          accommodation: inst.accommodation,
          countryId: country.id,
          serviceId: serviceId,
          active: true
        },
        create: {
          name: inst.name,
          slug: instSlug,
          city: inst.city,
          rank: inst.rank,
          rating: inst.rating,
          description: inst.desc,
          stats: inst.stats,
          features: inst.features,
          tuition: inst.tuition,
          accommodation: inst.accommodation,
          countryId: country.id,
          serviceId: serviceId,
          active: true
        }
      });
      console.log(`   🎓 Kurum: ${inst.name}`);

      // 3. Create Programs
      for (const prog of inst.programs) {
        const progSlug = `${instSlug}-${prog.name.toLowerCase().replace(/ /g, '-').replace(/\./g, '')}`;
        await prisma.program.upsert({
          where: { slug: progSlug },
          update: {
            category: prog.level,
            price: prog.price,
            duration: prog.duration,
            institutionId: institution.id
          },
          create: {
            name: prog.name,
            slug: progSlug,
            category: prog.level,
            price: prog.price,
            duration: prog.duration,
            institutionId: institution.id
          }
        });
        console.log(`      📚 Program: ${prog.name}`);
      }
    }
  }

  console.log('✅ Seeding tamamlandı!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
