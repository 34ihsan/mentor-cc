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

  const translationMap: Record<string, { en: string; de: string }> = {
    // Services
    "Denklik": { en: "Equivalency", de: "Gleichwertigkeit" },
    "Master & Yüksek Lisans": { en: "Master & Postgraduate", de: "Master & Postgraduierte" },
    "Lise Eğitimi": { en: "High School Education", de: "Gymnasiale Ausbildung" },
    "Yurtdışı Üniversite": { en: "University Education Abroad", de: "Universitätsstudium im Ausland" },
    "Yaz Okulları": { en: "Summer Schools", de: "Sommerschulen" },
    "Dil Okulu": { en: "Language School", de: "Sprachschule" },

    // HeroSlides
    "Yurtdışı Üniversite Eğitimi": { en: "University Education Abroad", de: "Studium im Ausland" },
    "Global arenada akademik prestijin kapılarını stratejik rehberliğimizle aralayın. En iyi üniversitelere kusursuz başvuru süreci.": { en: "Open the doors to academic prestige in the global arena with our strategic guidance. A seamless application process to the best universities.", de: "Öffnen Sie mit unserer strategischen Beratung die Türen zu akademischem Prestige im globalen Umfeld. Ein reibungsloser Bewerbungsprozess für die besten Universitäten." },
    "Yurtdışı Yüksek Lisans & MBA": { en: "Master's & MBA Abroad", de: "Master & MBA im Ausland" },
    "Akademik derinlik ve profesyonel ağınızı dünya standartlarında bir lisansüstü eğitimi ile zirveye taşıyın.": { en: "Bring your academic depth and professional network to the top with a world-class postgraduate education.", de: "Bringen Sie Ihre akademische Tiefe und Ihr berufliches Netzwerk mit einem erstklassigen Aufbaustudium an die Spitze." },
    "Almanya'da Kariyer & Ausbildung": { en: "Career & Vocational Training in Germany", de: "Karriere & Ausbildung in Deutschland" },
    "Avrupa'nın kalbinde mesleki uzmanlık ve profesyonel gelecek. Maaşlı eğitim ve iş garantili kariyer yolculuğu.": { en: "Vocational expertise and a professional future in the heart of Europe. Paid training and a career journey with a job guarantee.", de: "Fachliche Expertise und eine berufliche Zukunft im Herzen Europas. Bezahlte Ausbildung und eine Karrierereise mit Arbeitsplatzgarantie." },
    "Yurtdışı Lise & Boarding School": { en: "High School & Boarding School Abroad", de: "Gymnasium & Internat im Ausland" },
    "Geleceğin liderleri için prestijli yatılı okullarda global bir temel. IB ve AP programları ile elite üniversitelere hazırlık.": { en: "A global foundation in prestigious boarding schools for the leaders of the future. Preparation for elite universities with IB and AP programs.", de: "Ein globales Fundament in renommierten Internaten für die Führungskräfte der Zukunft. Vorbereitung auf Eliteuniversitäten mit IB- und AP-Programmen." },
    "Global Dil Eğitimi & Kültür": { en: "Global Language Education & Culture", de: "Globale Sprachbildung & Kultur" },
    "Dili en doğal ortamında, dünyanın en ilham verici şehirlerinde yaşayarak öğrenin. Lokal deneyim, global vizyon.": { en: "Learn the language in its most natural environment, living in the world's most inspiring cities. Local experience, global vision.", de: "Lernen Sie die Sprache in ihrer natürlichsten Umgebung und leben Sie in den inspirierendsten Städten der Welt. Lokale Erfahrung, globale Vision." },
    "Akademik Yaz Okulları": { en: "Academic Summer Schools", de: "Akademische Sommerschulen" },
    "Dünyanın en saygın kampüslerinde akademik gelişim ve unutulmaz bir yaz deneyimi. Bir yazda hayatınızı değiştirin.": { en: "Academic development and an unforgettable summer experience on the world's most respected campuses. Change your life in one summer.", de: "Akademische Weiterentwicklung und ein unvergessliches Sommererlebnis auf den angesehensten Campussen der Welt. Verändern Sie Ihr Leben in einem Sommer." },
    "Akademik Denklik Uzmanlığı": { en: "Academic Equivalency Expertise", de: "Akademische Anerkennungsexpertise" },
    "Global diplomalarınızın resmiyetini profesyonel rehberliğimizle koruyun. Stratejik dosya yönetimi ve tam süreç takibi.": { en: "Protect the official status of your global diplomas with our professional guidance. Strategic file management and full process tracking.", de: "Schützen Sie den offiziellen Status Ihrer globalen Diplome mit unserer professionellen Anleitung. Strategisches Dateimanagement und vollständige Prozessverfolgung." },
    "Geleceğinizi Yurtdışında İnşa Edin": { en: "Build Your Future Abroad", de: "Bauen Sie Ihre Zukunft im Ausland auf" },
    "Profesyonel eğitim danışmanlığı ile hayallerinizdeki üniversiteye bir adım daha yaklaşın.": { en: "Get one step closer to your dream university with professional education consultancy.", de: "Kommen Sie Ihrer Wunschuniversität mit einer professionellen Bildungsberatung einen Schritt näher." },
    "Global Kariyer Yolculuğu": { en: "Global Career Journey", de: "Globale Karrierereise" },
    "Dünyanın en iyi üniversitelerinde eğitim alma fırsatını kaçırmayın.": { en: "Don't miss the opportunity to study at the world's best universities.", de: "Verpassen Sie nicht die Gelegenheit, an den besten Universitäten der Welt zu studieren." },

    // Countries
    "Malta": { en: "Malta", de: "Malta" },
    "Belçika": { en: "Belgium", de: "Belgien" },
    "Almanya": { en: "Germany", de: "Deutschland" },
    "Hollanda": { en: "Netherlands", de: "Niederlande" },
    "Italya": { en: "Italy", de: "Italien" },
    "İrlanda": { en: "Ireland", de: "Irland" },
    "Amerika": { en: "USA", de: "USA" },
    "İngiltere": { en: "UK", de: "Vereinigtes Königreich" },
    "Avustralya": { en: "Australia", de: "Australien" },
    "Polonya": { en: "Poland", de: "Polen" },
    "Kanada": { en: "Canada", de: "Kanada" },
    
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
    
    // Page Overviews
    "Malta, hem tatil yapıp hem İngilizce öğrenmek isteyenler için mükemmeldir. Deniz, güneş ve eğlenceli aktivitelerle dolu paket programlar sunulur.": { en: "Malta is perfect for those who want to both have a holiday and learn English. Package programs full of sea, sun and fun activities are offered.", de: "Malta ist perfekt für diejenigen, die sowohl Urlaub machen als auch Englisch lernen möchten. Es werden Paketprogramme voller Meer, Sonne und lustigen Aktivitäten angeboten." },
    "Almanya, devlet üniversitelerinde eğitimin ücretsiz olması (sadece harç ödenir) ve teknik alanlardaki (Mühendislik vb.) üstünlüğü ile bilinir. İngilizce bölüm seçenekleri de artmaktadır.": { en: "Germany is known for its free education in public universities (only tuition fees are paid) and its superiority in technical fields (Engineering, etc.). English department options are also increasing.", de: "Deutschland ist bekannt für sein kostenloses Studium an staatlichen Universitäten (es fallen nur Semesterbeiträge an) und seine Überlegenheit in technischen Bereichen (Ingenieurwesen etc.). Auch die englischsprachigen Fachbereichsangebote nehmen zu." },
    "Hollanda, uygun maliyetli kaliteli eğitimi ve uluslararası ortamı ile fark yaratır.": { en: "The Netherlands makes a difference with its affordable quality education and international environment.", de: "Die Niederlande zeichnen sich durch ihre erschwingliche Bildungsqualität und ihr internationales Umfeld aus." },
    "İtalya, dünyanın en eski üniversitelerine ev sahipliği yapar. Özellikle Mimarlık, Tıp, Moda ve Tasarım alanlarında İngilizce eğitim seçenekleri çoktur. Devlet üniversiteleri ekonomiktir.": { en: "Italy is home to the world's oldest universities. There are many English education options, especially in the fields of Architecture, Medicine, Fashion and Design. Public universities are economical.", de: "Italien beheimatet die ältesten Universitäten der Welt. Vor allem in den Bereichen Architektur, Medizin, Mode und Design gibt es viele englischsprachige Bildungsangebote. Staatliche Universitäten sind preiswert." },
    "İrlanda, özellikle Dublin, teknoloji devlerinin Avrupa merkezi olmasıyla dikkat çeker. 25 hafta ve üzeri kayıtlarda yasal çalışma izni sunması en büyük avantajıdır.": { en: "Ireland, especially Dublin, attracts attention as the European headquarter of technology giants. Its biggest advantage is that it offers a legal work permit for registrations of 25 weeks or more.", de: "Irland, insbesondere Dublin, zieht die Aufmerksamkeit als europäischer Hauptsitz von Technologiegiganten auf sich. Sein größter Vorteil ist, dass es für Anmeldungen ab 25 Wochen eine legale Arbeitserlaubnis bietet." },
    "Amerika Birleşik Devletleri, akademik mükemmeliyet ve inovasyonun küresel merkezidir.": { en: "The United States of America is the global center for academic excellence and innovation.", de: "Die Vereinigten Staaten von Amerika sind das globale Zentrum für akademische Exzellenz und Innovation." },
    "İngiltere, yüzyıllardır süregelen akademik mükemmellik geleneği ile öğrencilere sadece bir diploma değil, küresel bir vizyon sunar.": { en: "With its centuries-old tradition of academic excellence, England offers students not just a diploma, but a global vision.", de: "Mit seiner jahrhundertelangen Tradition akademischer Exzellenz bietet England seinen Studenten nicht nur ein Diplom, sondern eine globale Vision." },
    "Avustralya, araştırma odaklı üniversiteleri ve eşsiz doğal güzellikleri ile ideal bir eğitim rotasıdır.": { en: "With its research-oriented universities and unique natural beauties, Australia is an ideal educational route.", de: "Australien ist mit seinen forschungsorientierten Universitäten und einzigartigen Naturschönheiten eine ideale Bildungsroute." },
    "Polonya, Bolonya Süreci'ne uygun eğitimi ve zengin kültürel mirası ile uluslararası öğrenciler için ideal bir destinasyondur.": { en: "With its education in line with the Bologna Process and its rich cultural heritage, Poland is an ideal destination for international students.", de: "Mit seiner Ausbildung im Einklang mit dem Bologna-Prozess und seinem reichen kulturellen Erbe ist Polen ein ideales Ziel für internationale Studenten." },
    "Kanada, kaliteli eğitimi ve mezuniyet sonrası sunduğu göçmenlik yolları ile öne çıkar.": { en: "Canada stands out for its high quality education and the immigration pathways it offers after graduation.", de: "Kanada zeichnet sich durch seine erstklassige Ausbildung und die Einwanderungsmöglichkeiten aus, die es nach dem Abschluss bietet." }
  };

  const getTranslation = (text: string | null | undefined, lang: 'en' | 'de') => {
    if (!text) return null;
    if (translationMap[text]) return translationMap[text][lang];
    return null;
  };

  // Restore HeroSlide
  for (const item of backupData.HeroSlide) {
    await prisma.heroSlide.create({
      data: {
        ...item,
        title_en: getTranslation(item.title, 'en'),
        title_de: getTranslation(item.title, 'de'),
        subtitle_en: getTranslation(item.subtitle, 'en'),
        subtitle_de: getTranslation(item.subtitle, 'de'),
      }
    });
  }

  // Restore Service
  for (const item of backupData.Service) {
    await prisma.service.create({
      data: {
        ...item,
        title_en: getTranslation(item.title, 'en'),
        title_de: getTranslation(item.title, 'de'),
        content_en: getTranslation(item.content, 'en'),
        content_de: getTranslation(item.content, 'de'),
        seoTitle_en: getTranslation(item.seoTitle, 'en'),
        seoTitle_de: getTranslation(item.seoTitle, 'de'),
        seoDescription_en: getTranslation(item.seoDescription, 'en'),
        seoDescription_de: getTranslation(item.seoDescription, 'de'),
      }
    });
  }

  // Restore Country
  for (const item of backupData.Country) {
    await prisma.country.create({
      data: {
        ...item,
        name_en: getTranslation(item.name, 'en'),
        name_de: getTranslation(item.name, 'de'),
        shortDesc_en: getTranslation(item.shortDesc, 'en'),
        shortDesc_de: getTranslation(item.shortDesc, 'de'),
        overview_en: getTranslation(item.overview, 'en'),
        overview_de: getTranslation(item.overview, 'de'),
        visaInfo_en: getTranslation(item.visaInfo, 'en'),
        visaInfo_de: getTranslation(item.visaInfo, 'de'),
        workPermit_en: getTranslation(item.workPermit, 'en'),
        workPermit_de: getTranslation(item.workPermit, 'de'),
        costRange_en: getTranslation(item.costRange, 'en'),
        costRange_de: getTranslation(item.costRange, 'de'),
      }
    });
  }

  // Restore Institution
  for (const item of backupData.Institution) {
    await prisma.institution.create({
      data: {
        ...item,
        description_en: getTranslation(item.description, 'en'),
        description_de: getTranslation(item.description, 'de'),
        content_en: getTranslation(item.content, 'en'),
        content_de: getTranslation(item.content, 'de'),
      }
    });
  }

  // Restore Program
  for (const item of backupData.Program) {
    await prisma.program.create({
      data: {
        ...item,
        name_en: getTranslation(item.name, 'en'),
        name_de: getTranslation(item.name, 'de'),
        description_en: getTranslation(item.description, 'en'),
        description_de: getTranslation(item.description, 'de'),
        content_en: getTranslation(item.content, 'en'),
        content_de: getTranslation(item.content, 'de'),
        duration_en: getTranslation(item.duration, 'en'),
        duration_de: getTranslation(item.duration, 'de'),
      }
    });
  }

  // Restore CountryServiceContent
  for (const item of backupData.CountryServiceContent) {
    await prisma.countryServiceContent.create({
      data: {
        ...item,
        content_en: getTranslation(item.content, 'en'),
        content_de: getTranslation(item.content, 'de'),
      }
    });
  }

  console.log('Restoration and initial translation completed!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
