const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Başlıyor: Yurtdışı Lise İçerikleri ve Kurumlar Seeding...');

  // 1. Service: Yurtdışı Lise
  const serviceSlug = 'yurtdisi-lise';
  
  let service = await prisma.service.findUnique({
    where: { slug: serviceSlug }
  });

  const generalContent = `
    <h2>Yurtdışında Lise Eğitimi ile Geleceğinize Yön Verin</h2>
    <p>Küreselleşen dünyada erken yaşta uluslararası bir deneyim kazanmak, vizyoner ve başarılı bir birey olmanın en önemli adımlarından biridir. Yurtdışında lise eğitimi, sadece yabancı dili anadil seviyesine taşımakla kalmaz, aynı zamanda farklı kültürleri tanıma, bağımsız karar alabilme ve dünyanın en iyi üniversitelerine doğrudan geçiş yapma şansı sunar.</p>
    
    <h3>Neden Yurtdışında Lise?</h3>
    <ul>
      <li><strong>Dünyanın En İyi Üniversitelerine Doğrudan Geçiş:</strong> Amerika, İngiltere, Kanada veya İsviçre'de lise okuyan öğrenciler, Harvard, Oxford, MIT gibi dev üniversitelere başvuru süreçlerinde (özellikle IB ve AP diplomaları sayesinde) büyük bir avantaj elde ederler.</li>
      <li><strong>Mükemmel Yabancı Dil Hakimiyeti:</strong> Erken yaşta yaşanılan kültürel daldırma (immersion) ile İngilizce (veya gidilen ülkenin dili) bir ders olmaktan çıkıp yaşamın kendisi haline gelir.</li>
      <li><strong>Karakter ve Özgüven Gelişimi:</strong> Kendi ayakları üzerinde durmayı öğrenen öğrenciler; liderlik, problem çözme ve zaman yönetimi becerilerini en üst seviyeye çıkarırlar.</li>
      <li><strong>Küresel Bir Vizyon ve Network:</strong> Dünyanın farklı ülkelerinden gelen yaşıtlarıyla aynı sıraları paylaşan öğrenciler, ömür boyu sürecek global bir arkadaşlık ağı kurarlar.</li>
    </ul>

    <h3>Eğitim Seçenekleri</h3>
    <p>Öğrencilerimizin karakterine, bütçesine ve hedeflerine göre 4 temel yurtdışı lise eğitim seçeneği sunmaktayız:</p>
    <ul>
      <li><strong>Boarding Schools (Klasik Yatılı Okullar):</strong> 7/24 eğitimin devam ettiği, güvenlikli kampüslerde, hem akademik hem de spor/sanat alanlarında mükemmeliyet sunan seçkin okullardır.</li>
      <li><strong>Private Day Schools (Özel Günübirlik Okullar):</strong> Prestijli özel okullarda eğitim alırken, okul tarafından titizlikle seçilmiş seçkin ailelerin yanında kalarak kültürel bir deneyim yaşama imkanı sunar.</li>
      <li><strong>Exchange (Devlet Lise Değişim Programları):</strong> J-1 gibi devlet destekli vizelerle, gönüllü ailelerin yanında kalınan, ekonomik ve kültürel etkileşimi en üst düzeyde olan programlardır.</li>
      <li><strong>IB & AP Diploma Programları:</strong> Lise yıllarında üniversite seviyesinde dersler alarak (Advanced Placement) veya uluslararası geçerliliği olan bir bitirme diploması (International Baccalaureate) elde ederek elit üniversitelerin kapılarını aralayan akademik programlardır.</li>
    </ul>

    <h3>Ne Zaman Harekete Geçmeli?</h3>
    <p>Yurtdışı lise programlarında kontenjanlar çok erken dolar ve kabul süreçleri (mülakat, dil sınavı, referans mektupları vb.) uzun sürer. Bu nedenle, hedeflenen başlangıç tarihinden en az <strong>9 ile 12 ay önce</strong> işlemlere başlamak hayati önem taşır.</p>
  `;

  if (service) {
    await prisma.service.update({
      where: { id: service.id },
      data: {
        content: generalContent,
        seoDescription: 'Yurtdışında lise eğitimi, Boarding, Private Day, Exchange ve IB/AP programları ile dünyanın en iyi üniversitelerine geçiş avantajları.',
      }
    });
    console.log('✅ Service "yurtdisi-lise" güncellendi.');
  } else {
    service = await prisma.service.create({
      data: {
        title: 'Yurtdışı Lise',
        title_en: 'High School Abroad',
        title_de: 'High School im Ausland',
        slug: serviceSlug,
        active: true,
        content: generalContent,
        seoDescription: 'Yurtdışında lise eğitimi, Boarding, Private Day, Exchange ve IB/AP programları ile dünyanın en iyi üniversitelerine geçiş avantajları.',
      }
    });
    console.log('✅ Service "yurtdisi-lise" oluşturuldu.');
  }

  const requiredCountries = [
    { slug: 'ingiltere', name: 'İngiltere' },
    { slug: 'amerika', name: 'Amerika Birleşik Devletleri' },
    { slug: 'isvicre', name: 'İsviçre' },
    { slug: 'kanada', name: 'Kanada' }
  ];

  const countryMap = new Map();
  for (const c of requiredCountries) {
    let country = await prisma.country.findUnique({ where: { slug: c.slug } });
    if (!country) {
      country = await prisma.country.create({
        data: { name: c.name, slug: c.slug, active: true }
      });
    }
    countryMap.set(c.slug, country.id);
  }

  // 2. Institutions and Programs
  const institutionsData = [
    {
      name: 'Phillips Exeter Academy',
      slug: 'phillips-exeter-academy-usa',
      city: 'Exeter, NH',
      desc: 'Amerika nın en prestijli ve tarihi boarding (yatılı) okullarından biri.',
      countrySlug: 'amerika',
      programs: ['Boarding', 'AP']
    },
    {
      name: 'Eton College',
      slug: 'eton-college-uk',
      city: 'Windsor',
      desc: 'İngiltere nin en köklü ve ünlü erkek yatılı okulu.',
      countrySlug: 'ingiltere',
      programs: ['Boarding', 'A-Level']
    },
    {
      name: 'Institut Le Rosey',
      slug: 'le-rosey-switzerland',
      city: 'Rolle',
      desc: 'Dünyanın en elit yatılı okulu. İki farklı kampüsü bulunmaktadır.',
      countrySlug: 'isvicre',
      programs: ['Boarding', 'IB']
    },
    {
      name: 'The Dalton School',
      slug: 'the-dalton-school-usa',
      city: 'New York, NY',
      desc: 'New York un göbeğinde, dünyanın en iyi eğitim veren Private Day liselerinden biridir.',
      countrySlug: 'amerika',
      programs: ['Private Day', 'AP']
    },
    {
      name: 'St. Pauls School',
      slug: 'st-pauls-school-uk',
      city: 'Londra',
      desc: 'Londra da bulunan köklü bir Private Day (Özel Günübirlik) okuludur.',
      countrySlug: 'ingiltere',
      programs: ['Private Day', 'A-Level']
    },
    {
      name: 'USA Public High School Exchange (J-1)',
      slug: 'usa-public-exchange-program',
      city: 'USA',
      desc: 'Amerikan Dışişleri Bakanlığı destekli kültürel değişim (Exchange) programı.',
      countrySlug: 'amerika',
      programs: ['Exchange']
    },
    {
      name: 'Canada Public High School Exchange',
      slug: 'canada-public-exchange-program',
      city: 'Canada',
      desc: 'Kanada lise değişim programı ile güvenli bir ortamda lise eğitimi alma fırsatı.',
      countrySlug: 'kanada',
      programs: ['Exchange']
    },
    {
      name: 'International School of Geneva',
      slug: 'ecolint-switzerland',
      city: 'Cenevre',
      desc: 'Dünyanın en eski uluslararası okulu ve IB programının doğduğu yerdir.',
      countrySlug: 'isvicre',
      programs: ['IB', 'Private Day']
    },
    {
      name: 'United World Colleges (UWC)',
      slug: 'uwc-global',
      city: 'Global',
      desc: 'Dünya çapında kampüsleriyle öğrencilere sadece IB diploması sunan elit bir okuldur.',
      countrySlug: 'ingiltere',
      programs: ['IB', 'Boarding']
    }
  ];

  for (const instData of institutionsData) {
    let existingInst = await prisma.institution.findUnique({
      where: { slug: instData.slug }
    });

    const cId = countryMap.get(instData.countrySlug);

    if (!existingInst) {
      existingInst = await prisma.institution.create({
        data: {
          name: instData.name,
          slug: instData.slug,
          city: instData.city,
          description: instData.desc,
          countryId: cId,
          serviceId: service.id,
          active: true,
          isFeatured: true
        }
      });
      console.log('   Kurum Eklendi: ' + instData.name);
    } else {
      await prisma.institution.update({
        where: { id: existingInst.id },
        data: {
          countryId: cId,
          serviceId: service.id,
          description: instData.desc
        }
      });
      console.log('   Kurum Guncellendi: ' + instData.name);
    }

    for (const progName of instData.programs) {
      const progSlug = instData.slug + '-' + progName.toLowerCase().replace(/\\s+/g, '-');
      let existingProg = await prisma.program.findUnique({
        where: { slug: progSlug }
      });

      if (!existingProg) {
        await prisma.program.create({
          data: {
            name: progName,
            slug: progSlug,
            category: 'HIGH_SCHOOL',
            institutionId: existingInst.id
          }
        });
      }
    }
  }

  console.log('Yurtdisi Lise (High School) Seed islemi basariyla tamamlandi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
