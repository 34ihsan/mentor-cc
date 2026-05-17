import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const backupPath = path.join(process.cwd(), '.tmp', 'db_backup.json');
  if (!fs.existsSync(backupPath)) {
    console.error('Backup file not found at .tmp/db_backup.json');
    return;
  }
  const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

  // Clean the database before restoring to avoid unique constraint violations
  console.log('Cleaning database...');
  await prisma.countryServiceContent.deleteMany();
  await prisma.program.deleteMany();
  await prisma.institution.deleteMany();
  await prisma.country.deleteMany();
  await prisma.service.deleteMany();
  await prisma.heroSlide.deleteMany();

  const translationMap: Record<string, { en: string; de: string }> = {
    // Services Titles
    "Denklik": { en: "Equivalency", de: "Gleichwertigkeit" },
    "Master & Yüksek Lisans": { en: "Master & Postgraduate", de: "Master & Postgraduierte" },
    "Lise Eğitimi": { en: "High School Education", de: "Gymnasiale Ausbildung" },
    "Yurtdışı Üniversite": { en: "University Education Abroad", de: "Universitätsstudium im Ausland" },
    "Yaz Okulları": { en: "Summer Schools", de: "Sommerschulen" },
    "Dil Okulu": { en: "Language School", de: "Sprachschule" },
    "Vize Danışmanlığı": { en: "Visa Consultancy", de: "Visum-Beratung" },
    "Mesleki Denklik & Kariyer": { en: "Vocational Recognition & Career", de: "Berufliche Anerkennung & Karriere" },

    // HeroSlides Titles
    "Yurtdışı Üniversite Eğitimi": { en: "University Education Abroad", de: "Studium im Ausland" },
    "Yüksek Lisans ve Master": { en: "Master's & MBA Abroad", de: "Master & MBA im Ausland" },
    "Dil Okulları ve Dil Eğitimi": { en: "Global Language Education & Culture", de: "Globale Sprachbildung & Kultur" },
    "Yurtdışı Lise Eğitimi": { en: "High School & Boarding School Abroad", de: "Gymnasium & Internat im Ausland" },
    "Yurtdışı Yaz Okulları": { en: "Academic Summer Schools", de: "Akademische Sommerschulen" },
    "Mesleki Denklik ve Kariyer": { en: "Academic Equivalency Expertise", de: "Akademische Anerkennungsexpertise" },

    // HeroSlides Subtitles
    "Dünyanın en iyi üniversitelerinde lisans eğitimi alarak geleceğinizi garantiye alın.": { 
      en: "Secure your future by getting undergraduate education in the world's best universities.", 
      de: "Sichern Sie Ihre Zukunft durch ein Bachelor-Studium an den besten Universitäten der Welt." 
    },
    "Global kariyer yolculuğunuzda uzmanlaşın. Avrupa ve Amerika'da saygın yüksek lisans programları.": { 
      en: "Specialize in your global career journey. Respectable master's programs in Europe and America.", 
      de: "Spezialisieren Sie sich auf Ihrer globalen Karrierereise. Angesehene Masterprogramme in Europa und Amerika." 
    },
    "İngilizce, Almanca ve daha fazlası. Dilinizi yerinde, en iyi okullarda öğrenin.": { 
      en: "English, German and more. Learn your language on-site, in the best schools.", 
      de: "Englisch, Deutsch und mehr. Lernen Sie Ihre Sprache vor Ort in den besten Schulen." 
    },
    "Çocuğunuzun geleceğine erken yatırım yapın. Uluslararası standartlarda lise eğitimi.": { 
      en: "Invest early in your child's future. High school education at international standards.", 
      de: "Investieren Sie frühzeitig in die Zukunft Ihres Kindes. Gymnasiale Ausbildung nach internationalen Standards." 
    },
    "Eğlenceli ve öğretici bir yaz tatili. Çocuklar ve gençler için global kamp programları.": { 
      en: "A fun and educational summer vacation. Global camp programs for children and youth.", 
      de: "Ein unterhaltsamer und lehrreicher Sommerurlaub. Globale Campprogramme für für Kinder und Jugendliche." 
    },
    "Almanya ve Avrupa'da diplomanızı tanıtalım, mesleğinizi icra etmeye başlayın.": { 
      en: "Let us recognize your diploma in Germany and Europe, start practicing your profession.", 
      de: "Lassen Sie uns Ihr Diplom in Deutschland und Europa anerkennen, beginnen Sie mit der Ausübung Ihres Berufs." 
    },

    // Denklik Service Content (Full HTML)
    "\n            <h2 class=\"text-3xl font-serif font-bold text-navy mb-6 italic\">Uluslararası Diploma Denklik ve Tanıma</h2>\n            <p class=\"mb-6\">Sahip olduğunuz diploma ve sertifikaların hedef ülkede (Almanya, İngiltere, ABD vb.) tanınması, oradaki karşılığı olan diplomalarla eşdeğer olduğunun tespit edilmesi sürecinde uzman danışmanlığımızla yanınızdayız.</p>\n            <p class=\"mb-6\">Denklik süreci, mesleğinizi yurt dışında icra edebilmeniz, çalışma izni alabilmeniz ve iş hayatına doğrudan giriş yapabilmeniz için en kritik adımdır. Mentor Career Consulting olarak, Almanya için ZAB ve Anabin, İngiltere için UK ENIC (NARIC) gibi otoriteler üzerinden sürecinizi profesyonelce yönetiyoruz.</p>\n            <h3 class=\"text-2xl font-serif font-bold text-navy mb-4 mt-8 italic\">Denklik Hizmetimiz Size Neler Kazandırır?</h3>\n            <ul class=\"space-y-4 mb-10 italic\">\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> Mesleğinizi yurt dışında yasal olarak icra etme hakkı.</li>\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> Diplomalarınızın hedef ülke standartlarında tescil edilmesi.</li>\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> İş arama ve çalışma vizesi süreçlerinde tam uyumluluk.</li>\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> Kariyerinize yurt dışında kaldığınız yerden, kendi uzmanlık alanınızda devam etme şansı.</li>\n            </ul>\n        ": {
      en: "\n            <h2 class=\"text-3xl font-serif font-bold text-navy mb-6 italic\">International Diploma Equivalency and Recognition</h2>\n            <p class=\"mb-6\">We are by your side with our expert consultancy during the process of recognizing your diplomas and certificates in the target country (Germany, UK, USA, etc.) and determining their equivalence with the corresponding diplomas there.</p>\n            <p class=\"mb-6\">The equivalency process is the most critical step for you to practice your profession abroad, obtain a work permit, and directly enter professional life. As Mentor Career Consulting, we professionally manage your process through authorities such as ZAB and Anabin for Germany, and UK ENIC (NARIC) for the UK.</p>\n            <h3 class=\"text-2xl font-serif font-bold text-navy mb-4 mt-8 italic\">What Does Our Equivalency Service Gain You?</h3>\n            <ul class=\"space-y-4 mb-10 italic\">\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> The right to legally practice your profession abroad.</li>\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> Registration of your diplomas according to the target country standards.</li>\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> Full compliance in job search and work visa processes.</li>\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> The chance to continue your career abroad from where you left off, in your own area of expertise.</li>\n            </ul>\n        ",
      de: "\n            <h2 class=\"text-3xl font-serif font-bold text-navy mb-6 italic\">Internationale Diplomanerkennung und Gleichwertigkeit</h2>\n            <p class=\"mb-6\">Wir stehen Ihnen mit unserer Expertenberatung bei der Anerkennung Ihrer Diplome und Zertifikate im Zielland (Deutschland, Großbritannien, USA etc.) und der Feststellung der Gleichwertigkeit mit den entsprechenden dortigen Diplomen zur Seite.</p>\n            <p class=\"mb-6\">Das Anerkennungsverfahren ist der wichtigste Schritt, um Ihren Beruf im Ausland ausüben zu können, eine Arbeitserlaubnis zu erhalten und direkt in das Berufsleben einzusteigen. Als Mentor Career Consulting verwalten wir Ihren Prozess professionell über Behörden wie ZAB und Anabin für Deutschland sowie UK ENIC (NARIC) für Großbritannien.</p>\n            <h3 class=\"text-2xl font-serif font-bold text-navy mb-4 mt-8 italic\">Was bringt Ihnen unser Anerkennungsservice?</h3>\n            <ul class=\"space-y-4 mb-10 italic\">\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> Das Recht, Ihren Beruf im Ausland legal auszuüben.</li>\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> Registrierung Ihrer Diplome nach den Standards des Ziellandes.</li>\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> Volle Übereinstimmung in Arbeitsplatzsuche und Arbeitsvisum-Prozessen.</li>\n                <li class=\"pl-8 relative\"><span class=\"absolute left-0 top-1 text-gold\">✓</span> Die Chance, Ihre Karriere im Ausland dort fortzusetzen, wo Sie aufgehört haben, in Ihrem eigenen Fachgebiet.</li>\n            </ul>\n        "
    },

    // Countries
    "Malta": { en: "Malta", de: "Malta" },
    "Belçika": { en: "Belgium", de: "Belgien" },
    "Almanya": { en: "Germany", de: "Deutschland" },
    "Hollanda": { en: "Netherlands", de: "Niederlande" },
    "İtalya": { en: "Italy", de: "Italien" },
    "Italya": { en: "Italy", de: "Italien" },
    "İrlanda": { en: "Ireland", de: "Irland" },
    "Amerika": { en: "USA", de: "USA" },
    "İngiltere": { en: "UK", de: "United Kingdom" },
    "Avustralya": { en: "Australia", de: "Australia" },
    "Polonya": { en: "Poland", de: "Polen" },
    "Kanada": { en: "Canada", de: "Kanada" },
    "İspanya": { en: "Spain", de: "Spanien" },
    "Fransa": { en: "France", de: "Frankreich" },
    
    "Schengen vizesi gereklidir. Yeşil pasaporta vize yoktur.": { en: "Schengen visa is required. No visa for green passport.", de: "Schengen-Visum ist erforderlich. Kein Visum für den grünen Pass." },
    "Haftalık €600 - €1,000 (Her şey dahil)": { en: "Weekly €600 - €1,000 (All inclusive)", de: "Wöchentlich 600 € - 1.000 € (Alles inklusive)" },
    "Yılda 120 tam gün veya 240 yarım gün çalışma izni. Mezuniyet sonrası 18 ay iş arama izni.": { en: "Working permit for 120 full days or 240 half days per year. 18 months job search permit after graduation.", de: "Arbeitserlaubnis für 120 volle Tage oder 240 halbe Tage pro Jahr. 18 Monate Arbeitssucherlaubnis nach dem Abschluss." },
    "Ücretsiz veya çok düşük ücretli, yüksek mühendislik eğitimi.": { en: "Free or very low cost, high quality engineering education.", de: "Kostenlose oder sehr kostengünstige, hochwertige Ingenieurausbildung." },

    "İngilizce eğitimde Avrupa lideri ve inovatif araştırma merkezi.": { en: "European leader in English education and innovative research center.", de: "Europäischer Marktführer in englischer Bildung und innovatives Forschungszentrum." },
    "Tarih, sanat, moda ve mimarlık alanında öncü.": { en: "Pioneer in history, art, fashion and architecture.", de: "Pionier in Geschichte, Kunst, Mode und Architektur." },
    "Sıcakkanlı insanlar, eşsiz doğa ve çalışma izni avantajı.": { en: "Warm people, unique nature and work permit advantage.", de: "Herzliche Menschen, einzigartige Natur und Arbeitserlaubnis-Vorteil." },
    "Dünyanın en prestijli üniversiteleri ve sınırsız kariyer fırsatları.": { en: "The world's most prestigious universities and unlimited career opportunities.", de: "Die renommiertesten Universitäten der Welt und unbegrenzte Karrierechancen." },
    "Dünya standartlarında eğitim kalitesi ve köklü akademik mirasın merkezi.": { en: "The center of world-class education quality and deep-rooted academic heritage.", de: "Das Zentrum für erstklassige Bildungsqualität und tief verwurzeltes akademisches Erbe." },
    "Güneşli iklim, modern şehirler ve üst düzey akademik standartlar.": { en: "Sunny climate, modern cities and top-level academic standards.", de: "Sonniges Klima, moderne Städte und akademische Standards auf höchstem Niveau." },
    "Ekonomik eğitim maliyetleri ve prestijli üniversiteleri ile Avrupa'nın parlayan yıldızı.": { en: "The shining star of Europe with economic education costs and prestigious universities.", de: "Der leuchtende Stern Europas mit wirtschaftlichen Bildungskosten und renommierten Universitäten." },
    "Güvenli, misafirperver ve yüksek yaşam standartlarına sahip eğitim dünyası.": { en: "A safe, hospitable education world with high standards of living.", de: "Eine sichere, gastfreundliche Bildungswelt mit hohem Lebensstandard." },
    
    // Country Short Descriptions
    "Akdeniz'in ortasında, tatil tadında İngilizce eğitimi.": { en: "English education in the middle of the Mediterranean, like a holiday.", de: "Englischunterricht inmitten des Mittelmeers, wie ein Urlaub." },
    "Avrupa'nın ekonomi ve mühendislik devinde kariyer odaklı bir eğitim deneyimi.": { en: "A career-oriented educational experience in Europe's economic and engineering giant.", de: "Eine karriereorientierte Bildungserfahrung im Wirtschafts- und Ingenieurriesen Europas." },
    "Akademik geleneğin modern inovasyonla buluştuğu global eğitim merkezi.": { en: "Global education center where academic tradition meets modern innovation.", de: "Globales Bildungszentrum, in dem akademische Tradition auf moderne Innovation trifft." },
    "Güvenli, çok kültürlü ve göçmen dostu yapısıyla geleceğinizi inşa edeceğiniz ülke.": { en: "The country where you will build your future with its safe, multicultural and immigrant-friendly structure.", de: "Das Land, in dem Sie Ihre Zukunft mit seiner sicheren, multikulturellen und einwanderungsfreundlichen Struktur aufbauen werden." },
    "Yenilikçi, açık fikirli ve İngilizce dostu bir eğitim vizyonu.": { en: "An innovative, open-minded and English-friendly educational vision.", de: "Eine innovative, aufgeschlossene und englischfreundliche Bildungsvision." },
    "Avrupa'nın güneşli kapısı, prestijli işletme okulları ve canlı bir kültür.": { en: "Europe's sunny gate, prestigious business schools and a vibrant culture.", de: "Europas sonniges Tor, renommierte Business Schools und eine lebendige Kultur." },
    "Bilim ve sanatın buluştuğu nokta, Avrupa'nın entelektüel merkezi.": { en: "The point where science and art meet, the intellectual center of Europe.", de: "Der Treffpunkt von Wissenschaft und Kunst, das intellektuelle Zentrum Europas." },
    "Avrupa'nın kalbinde uygun fiyatlı, yüksek kaliteli ve dinamik eğitim.": { en: "Affordable, high-quality and dynamic education in the heart of Europe.", de: "Erschwingliche, qualitativ hochwertige und dynamische Bildung im Herzen Europas." }
  };

  const getTranslation = (item: any, field: string, lang: 'en' | 'de') => {
    const text = item[field];
    if (!text) return null;
    
    // 1. Try translation map
    if (translationMap[text]) return translationMap[text][lang];
    
    // 2. Try map with trimmed text (common for HTML)
    const trimmedText = text.trim();
    if (translationMap[trimmedText]) return translationMap[trimmedText][lang];

    // 3. Fallback to existing translation in backup if present
    const existingField = `${field}_${lang}`;
    if (item[existingField]) return item[existingField];
    
    return null;
  };

  console.log('Restoring HeroSlides...');
  for (const item of backupData.HeroSlide) {
    await prisma.heroSlide.create({
      data: {
        ...item,
        title_en: getTranslation(item, 'title', 'en'),
        title_de: getTranslation(item, 'title', 'de'),
        subtitle_en: getTranslation(item, 'subtitle', 'en'),
        subtitle_de: getTranslation(item, 'subtitle', 'de'),
      }
    });
  }

  console.log('Restoring Services...');
  for (const item of backupData.Service) {
    await prisma.service.create({
      data: {
        ...item,
        title_en: getTranslation(item, 'title', 'en'),
        title_de: getTranslation(item, 'title', 'de'),
        content_en: getTranslation(item, 'content', 'en'),
        content_de: getTranslation(item, 'content', 'de'),
        seoTitle_en: getTranslation(item, 'seoTitle', 'en'),
        seoTitle_de: getTranslation(item, 'seoTitle', 'de'),
        seoDescription_en: getTranslation(item, 'seoDescription', 'en'),
        seoDescription_de: getTranslation(item, 'seoDescription', 'de'),
      }
    });
  }

  console.log('Restoring Countries...');
  for (const item of backupData.Country) {
    await prisma.country.create({
      data: {
        ...item,
        name_en: getTranslation(item, 'name', 'en'),
        name_de: getTranslation(item, 'name', 'de'),
        shortDesc_en: getTranslation(item, 'shortDesc', 'en'),
        shortDesc_de: getTranslation(item, 'shortDesc', 'de'),
        overview_en: getTranslation(item, 'overview', 'en'),
        overview_de: getTranslation(item, 'overview', 'de'),
        visaInfo_en: getTranslation(item, 'visaInfo', 'en'),
        visaInfo_de: getTranslation(item, 'visaInfo', 'de'),
        workPermit_en: getTranslation(item, 'workPermit', 'en'),
        workPermit_de: getTranslation(item, 'workPermit', 'de'),
        costRange_en: getTranslation(item, 'costRange', 'en'),
        costRange_de: getTranslation(item, 'costRange', 'de'),
      }
    });
  }

  console.log('Restoring Institutions...');
  for (const item of (backupData.Institution || [])) {
    await prisma.institution.create({
      data: {
        ...item,
        description_en: getTranslation(item, 'description', 'en'),
        description_de: getTranslation(item, 'description', 'de'),
        content_en: getTranslation(item, 'content', 'en'),
        content_de: getTranslation(item, 'content', 'de'),
      }
    });
  }

  console.log('Restoring Programs...');
  for (const item of (backupData.Program || [])) {
    await prisma.program.create({
      data: {
        ...item,
        name_en: getTranslation(item, 'name', 'en'),
        name_de: getTranslation(item, 'name', 'de'),
        description_en: getTranslation(item, 'description', 'en'),
        description_de: getTranslation(item, 'description', 'de'),
        content_en: getTranslation(item, 'content', 'en'),
        content_de: getTranslation(item, 'content', 'de'),
        duration_en: getTranslation(item, 'duration', 'en'),
        duration_de: getTranslation(item, 'duration', 'de'),
      }
    });
  }

  console.log('Restoring CountryServiceContents...');
  for (const item of (backupData.CountryServiceContent || [])) {
    await prisma.countryServiceContent.create({
      data: {
        ...item,
        content_en: getTranslation(item, 'content', 'en'),
        content_de: getTranslation(item, 'content', 'de'),
      }
    });
  }

  console.log('Restoration and translation completed successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
