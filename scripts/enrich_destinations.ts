
import { PrismaClient, Category } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Enriching country data for USA, Canada, Australia, Netherlands, UK, and Poland...');

  // 1. Update UK (İngiltere)
  await prisma.country.update({
    where: { slug: 'ingiltere' },
    data: {
      capital: 'Londra',
      currency: 'GBP (£)',
      language: 'İngilizce',
      population: '67 Milyon',
      shortDesc: 'Dünya standartlarında eğitim kalitesi ve köklü akademik mirasın merkezi.',
      overview: 'İngiltere, yüzyıllardır süregelen akademik mükemmellik geleneği ile öğrencilere sadece bir diploma değil, küresel bir vizyon sunar.',
      visaInfo: 'T4 Öğrenci Vizesi gereklidir. Puan tabanlı bir sistem uygulanmaktadır.',
      workPermit: 'Mezuniyet sonrası 2 yıl çalışma izni (Graduate Route) imkanı.',
      costRange: '15,000 - 30,000 GBP (Yıllık)',
      isFeatured: true,
    },
  });

  // 2. Update Poland (Polonya)
  await prisma.country.update({
    where: { slug: 'polonya' },
    data: {
      capital: 'Varşova',
      currency: 'PLN (Zloty)',
      language: 'Lehçe (Eğitim dili genellikle İngilizce)',
      population: '38 Milyon',
      shortDesc: 'Ekonomik eğitim maliyetleri ve prestijli üniversiteleri ile Avrupa\'nın parlayan yıldızı.',
      overview: 'Polonya, Bolonya Süreci\'ne uygun eğitimi ve zengin kültürel mirası ile uluslararası öğrenciler için ideal bir destinasyondur.',
      visaInfo: 'AB dışı öğrenciler için D Tipi Öğrenci Vizesi gereklidir.',
      workPermit: 'Öğrenciler için part-time, mezuniyet sonrası tam zamanlı çalışma hakkı.',
      costRange: '3,000 - 8,000 EUR (Yıllık)',
      isFeatured: true,
    },
  });

  // 3. Update USA (Amerika)
  await prisma.country.update({
    where: { slug: 'amerika' },
    data: {
      capital: 'Washington D.C.',
      currency: 'USD ($)',
      language: 'İngilizce',
      population: '331 Milyon',
      shortDesc: 'Dünyanın en prestijli üniversiteleri ve sınırsız kariyer fırsatları.',
      overview: 'Amerika Birleşik Devletleri, akademik mükemmeliyet ve inovasyonun küresel merkezidir.',
      visaInfo: 'F-1 Öğrenci Vizesi gereklidir. SEVIS kaydı ve mülakat süreci mevcuttur.',
      workPermit: 'OPT (Optional Practical Training) ile 1-3 yıl çalışma hakkı.',
      costRange: '25,000 - 60,000 USD (Yıllık)',
      isFeatured: true,
    },
  });

  // 4. Update Canada (Kanada)
  await prisma.country.update({
    where: { slug: 'kanada' },
    data: {
      capital: 'Ottawa',
      currency: 'CAD ($)',
      language: 'İngilizce, Fransızca',
      population: '38 Milyon',
      shortDesc: 'Güvenli, misafirperver ve yüksek yaşam standartlarına sahip eğitim dünyası.',
      overview: 'Kanada, kaliteli eğitimi ve mezuniyet sonrası sunduğu göçmenlik yolları ile öne çıkar.',
      visaInfo: 'Study Permit gereklidir. CAQ (Quebec için) ve GIC (opsiyonel) süreçleri vardır.',
      workPermit: 'PGWP (Post-Graduation Work Permit) ile 3 yıla kadar çalışma hakkı.',
      costRange: '20,000 - 40,000 CAD (Yıllık)',
      isFeatured: true,
    },
  });

  // 5. Update Australia (Avustralya)
  await prisma.country.update({
    where: { slug: 'avustralya' },
    data: {
      capital: 'Canberra',
      currency: 'AUD ($)',
      language: 'İngilizce',
      population: '25 Milyon',
      shortDesc: 'Güneşli iklim, modern şehirler ve üst düzey akademik standartlar.',
      overview: 'Avustralya, araştırma odaklı üniversiteleri ve eşsiz doğal güzellikleri ile ideal bir eğitim rotasıdır.',
      visaInfo: 'Subclass 500 Öğrenci Vizesi gereklidir. GTE şartlarını karşılamalıdır.',
      workPermit: 'Temporary Graduate Visa (Subclass 485) ile çalışma imkanı.',
      costRange: '25,000 - 45,000 AUD (Yıllık)',
      isFeatured: true,
    },
  });

  // 6. Update Netherlands (Hollanda)
  await prisma.country.update({
    where: { slug: 'hollanda' },
    data: {
      capital: 'Amsterdam',
      currency: 'EUR (€)',
      language: 'Felemenkçe, İngilizce',
      population: '17 Milyon',
      shortDesc: 'İngilizce eğitimde Avrupa lideri ve inovatif araştırma merkezi.',
      overview: 'Hollanda, uygun maliyetli kaliteli eğitimi ve uluslararası ortamı ile fark yaratır.',
      visaInfo: 'AB dışı öğrenciler için MVV ve VVR (Oturum İzni) süreçleri okullar tarafından yönetilir.',
      workPermit: 'Search Year (Zoekjaar) ile mezuniyet sonrası 1 yıl çalışma hakkı.',
      costRange: '8,000 - 20,000 EUR (Yıllık)',
      isFeatured: true,
    },
  });

  // Institutions common template logic
  const institutions = [
    // UK
    { name: "King's College London", slug: "kings-college-london", countrySlug: "ingiltere", city: "Londra", serviceSlug: "universite", description: "Londra'nın kalbinde yer alan, araştırma odaklı köklü bir üniversite.", website: "https://www.kcl.ac.uk", programs: [{ name: "Global Business (MSc)", slug: "kcl-gb-msc", category: "MASTER" as Category, price: 32000, currency: "GBP", duration: "1 Year" }] },
    { name: "University of Manchester", slug: "university-of-manchester", countrySlug: "ingiltere", city: "Manchester", serviceSlug: "universite", description: "Lider araştırma üniversitesi.", website: "https://www.manchester.ac.uk", programs: [{ name: "Engineering (BEng)", slug: "mcr-eng-beng", category: "UNIVERSITY" as Category, price: 26000, currency: "GBP", duration: "3 Years" }] },
    // USA
    { name: "Harvard University", slug: "harvard-university", countrySlug: "amerika", city: "Cambridge", serviceSlug: "universite", description: "Dünyanın en prestijli akademik kurumu.", website: "https://www.harvard.edu", programs: [{ name: "MBA", slug: "harvard-mba", category: "MASTER" as Category, price: 75000, currency: "USD", duration: "2 Years" }] },
    { name: "MIT", slug: "mit-university", countrySlug: "amerika", city: "Cambridge", serviceSlug: "universite", description: "Teknoloji ve bilim devrimi merkezi.", website: "https://www.mit.edu", programs: [{ name: "Computer Science (BSc)", slug: "mit-cs-bsc", category: "UNIVERSITY" as Category, price: 55000, currency: "USD", duration: "4 Years" }] },
    // Canada
    { name: "University of Toronto", slug: "university-of-toronto", countrySlug: "kanada", city: "Toronto", serviceSlug: "universite", description: "Kanada'nın bir numaralı araştırma üniversitesi.", website: "https://www.utoronto.ca", programs: [{ name: "Data Science (MSc)", slug: "uoft-ds-msc", category: "MASTER" as Category, price: 35000, currency: "CAD", duration: "2 Years" }] },
    { name: "McGill University", slug: "mcgill-university", countrySlug: "kanada", city: "Montreal", serviceSlug: "universite", description: "Kanada'nın Harvard'ı olarak bilinir.", website: "https://www.mcgill.ca", programs: [{ name: "Architecture (BSc)", slug: "mcgill-arch-bsc", category: "UNIVERSITY" as Category, price: 30000, currency: "CAD", duration: "4 Years" }] },
    // Australia
    { name: "University of Sydney", slug: "university-of-sydney", countrySlug: "avustralya", city: "Sydney", serviceSlug: "universite", description: "Avustralya'nın en eski ve prestijli üniversitesi.", website: "https://www.sydney.edu.au", programs: [{ name: "Medicine (MD)", slug: "usyd-med-md", category: "MASTER" as Category, price: 45000, currency: "AUD", duration: "4 Years" }] },
    // Netherlands
    { name: "University of Amsterdam", slug: "university-of-amsterdam", countrySlug: "hollanda", city: "Amsterdam", serviceSlug: "universite", description: "Avrupa'nın en iyi iletişim ve medya üniversitesi.", website: "https://www.uva.nl", programs: [{ name: "Social Sciences (BSc)", slug: "uva-social-bsc", category: "UNIVERSITY" as Category, price: 12000, currency: "EUR", duration: "3 Years" }] },
    // Poland
    { name: "University of Warsaw", slug: "university-of-warsaw", countrySlug: "polonya", city: "Varşova", serviceSlug: "universite", description: "Polonya'nın en büyük ve prestijli üniversitesi.", website: "https://www.uw.edu.pl", programs: [{ name: "Psychology (MA)", slug: "uw-psych-ma", category: "MASTER" as Category, price: 4500, currency: "EUR", duration: "5 Years" }] }
  ];

  const countries = await prisma.country.findMany();
  const countriesMap = Object.fromEntries(countries.map(c => [c.slug, c.id]));
  
  const services = await prisma.service.findMany();
  const servicesMap = Object.fromEntries(services.map(s => [s.slug, s.id]));

  for (const inst of institutions) {
    const { programs, countrySlug, serviceSlug, ...instData } = inst;
    const countryId = countriesMap[countrySlug];
    const serviceId = servicesMap[serviceSlug];

    if (!countryId || !serviceId) {
      console.warn(`Skipping ${instData.name}: Missing country or service.`);
      continue;
    }

    await prisma.institution.upsert({
      where: { slug: instData.slug },
      update: { ...instData, countryId, serviceId },
      create: {
        ...instData,
        countryId,
        serviceId,
        active: true,
        isFeatured: true,
        image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2000",
        programs: {
          create: programs.map(p => ({
            ...p,
            description: `${p.name} program at ${instData.name}.`
          }))
        }
      }
    });
  }

  console.log('Expansion enrichment complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
