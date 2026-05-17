import { ExamMapValue } from "./types";

export const examMap: Record<string, ExamMapValue> = {
    "ielts": {
        title: "IELTS",
        desc: "International English Language Testing System. İngiltere, Avustralya ve Kanada başta olmak üzere tüm dünyada kabul gören en popüler dil yeterlilik sınavı.",
        desc_en: "International English Language Testing System. The most popular language proficiency exam accepted worldwide, especially in the UK, Australia, and Canada.",
        desc_de: "International English Language Testing System. Die weltweit am weitesten verbreitete Sprachprüfung, die vor allem in Großbritannien, Australien und Kanada anerkannt wird.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1200",
            intro: "IELTS (International English Language Testing System), 140'tan fazla ülkede 11.000'den fazla kurum tarafından kabul edilen, dünyanın en prestijli İngilizce dil yeterlilik sınavıdır.",
            intro_en: "IELTS (International English Language Testing System) is the world's most prestigious English language proficiency exam, accepted by more than 11,000 institutions in over 140 countries.",
            intro_de: "IELTS (International English Language Testing System) ist die weltweit renommierteste Englisch-Sprachprüfung, die von mehr als 11.000 Institutionen in über 140 Ländern anerkannt wird.",
            structure: [
                { 
                    title: "Listening (Dinleme)", 
                    title_en: "Listening",
                    title_de: "Hörverstehen",
                    desc: "30 dakika + 10 dakika kontrol süresi. 4 bölümden ve 40 sorudan oluşur." ,
                    desc_en: "30 minutes + 10 minutes transfer time. Consists of 4 sections and 40 questions.",
                    desc_de: "30 Minuten + 10 Minuten Übertragungszeit. Besteht aus 4 Abschnitten und 40 Fragen."
                },
                { 
                    title: "Reading (Okuma)", 
                    title_en: "Reading",
                    title_de: "Leseverstehen",
                    desc: "60 dakika. 3 uzun ve kompleks metinden oluşan 40 soruluk bir bölümdür.",
                    desc_en: "60 minutes. A section consisting of 3 long and complex texts with 40 questions.",
                    desc_de: "60 Minuten. Ein Abschnitt, der aus 3 langen und komplexen Texten mit 40 Fragen besteht."
                },
                { 
                    title: "Writing (Yazma)", 
                    title_en: "Writing",
                    title_de: "Schreiben",
                    desc: "60 dakika. Task 1: Grafik raporlama. Task 2: Akademik kompozisyon.",
                    desc_en: "60 minutes. Task 1: Data reporting. Task 2: Academic essay.",
                    desc_de: "60 Minuten. Aufgabe 1: Datenberichterstattung. Aufgabe 2: Akademischer Aufsatz."
                },
                { 
                    title: "Speaking (Konuşma)", 
                    title_en: "Speaking",
                    title_de: "Sprechen",
                    desc: "11-14 dakika. Bir sınav uzmanı ile birebir yüz yüze yapılan mülakattır.",
                    desc_en: "11-14 minutes. A one-on-one face-to-face interview with an examiner.",
                    desc_de: "11-14 Minuten. Ein persönliches Gespräch mit einem Prüfer."
                }
            ],
            scoring: "Her bölüm 1-9 arasında puanlanır (Band Score). Genel Skor bu dört bölümün ortalamasıdır.",
            scoring_en: "Each section is scored between 1-9 (Band Score). The Overall Score is the average of these four sections.",
            scoring_de: "Jeder Abschnitt wird mit 1-9 Punkten bewertet (Band Score). Die Gesamtpunktzahl ist der Durchschnitt dieser vier Abschnitte.",
            features: [
                "Eski Sınav Examiner'ları ile Birebir Speaking Provaları",
                "Kişiye Özel Essay Analizleri ve Geri Bildirimler",
                "Ücretsiz Resmi Cambridge Materyalleri"
            ],
            features_en: [
                "One-on-one Speaking Rehearsals with Former Examiners",
                "Personalized Essay Analysis and Feedback",
                "Free Official Cambridge Materials"
            ],
            features_de: [
                "Einzelgesprächstrainings mit ehemaligen Prüfern",
                "Personalisierte Aufsatzanalyse und Feedback",
                "Kostenlose offizielle Cambridge-Materialien"
            ]
        }
    },
    "sat": {
        title: "Digital SAT",
        desc: "Scholastic Assessment Test. ABD'deki üniversitelere lisans başvurularında kullanılan standart sınav.",
        desc_en: "Scholastic Assessment Test. The standardized exam used for undergraduate applications to universities in the USA.",
        desc_de: "Scholastic Assessment Test. Die standardisierte Prüfung für Bachelor-Bewerbungen an Universitäten in den USA.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200",
            intro: "Digital SAT, eleştirel düşünme ve problem çözme yeteneklerini ölçen, ABD üniversite kabulleri ve bursları için kritik bir sınavdır.",
            intro_en: "Digital SAT is a critical exam for US university admissions and scholarships, measuring critical thinking and problem-solving abilities.",
            intro_de: "Der digitale SAT ist eine entscheidende Prüfung für Zulassungen und Stipendien an US-Universitäten und misst kritisches Denken und Problemlösungsfähigkeiten.",
            structure: [
                { title: "Reading & Writing", title_en: "Reading & Writing", title_de: "Lesen & Schreiben", desc: "64 dakika. Kısa metinler ve dil bilgisi analizleri." },
                { title: "Math", title_en: "Math", title_de: "Mathematik", desc: "70 dakika. Cebir ve veri analizi odaklı sorular." }
            ],
            scoring: "400-1600 puan aralığındadır.",
            scoring_en: "Scored between 400-1600 points.",
            scoring_de: "Bewertet im Bereich von 400-1600 Punkten.",
            features: [
                "Bluebook Uygulaması ile Pratik",
                "Adaptif Sınav Yapısı",
                "Yılda 7 Kez Uygulanır"
            ],
            features_en: [
                "Practice with Bluebook App",
                "Adaptive Exam Structure",
                "Held 7 Times a Year"
            ],
            features_de: [
                "Üben mit der Bluebook-App",
                "Adaptive Prüfungsstruktur",
                "Findet 7 Mal im Jahr statt"
            ]
        }
    },
    "gre": {
        title: "GRE",
        desc: "Graduate Record Examinations. Yüksek lisans ve doktora başvuruları için küresel standart.",
        desc_en: "Graduate Record Examinations. The global standard for master's and doctoral applications.",
        desc_de: "Graduate Record Examinations. Der globale Standard für Master- und Promotionsbewerbungen.",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200",
            intro: "GRE, mühendislikten sosyal bilimlere kadar geniş bir yelpazede akademik yetkinliği ölçen lisansüstü giriş sınavıdır.",
            intro_en: "GRE is a graduate entrance exam measuring academic competence across a wide range from engineering to social sciences.",
            intro_de: "GRE ist eine Aufnahmeprüfung für Postgraduierte, die die akademische Kompetenz in einem breiten Spektrum von Ingenieurwesen bis Sozialwissenschaften misst.",
            structure: [
                { title: "Verbal Reasoning", title_en: "Verbal Reasoning", title_de: "Sprachliches logisches Denken", desc: "Akademik kelime ve okuma becerileri." },
                { title: "Quantitative Reasoning", title_en: "Quantitative Reasoning", title_de: "Quantitatives logisches Denken", desc: "Sayısal akıl yürütme ve veri analitiği." },
                { title: "Analytical Writing", title_en: "Analytical Writing", title_de: "Analytisches Schreiben", desc: "Eleştirel düşünce ve akademik yazım." }
            ],
            scoring: "Sözel/Sayısal: 130-170, Yazma: 0-6.",
            scoring_en: "Verbal/Quant: 130-170, Writing: 0-6.",
            scoring_de: "Sprachlich/Quant: 130-170, Schreiben: 0-6.",
            features: [
                "ScoreSelect Özelliği",
                "5 Yıl Geçerlilik Süresi",
                "Esnek Bölüm Geçişleri"
            ],
            features_en: [
                "ScoreSelect Feature",
                "5 Years Validity Period",
                "Flexible Section Transitions"
            ],
            features_de: [
                "ScoreSelect-Funktion",
                "5 Jahre Gültigkeitsdauer",
                "Flexible Wechsel zwischen den Abschnitten"
            ]
        }
    },
    "gmat": {
        title: "GMAT Focus Edition",
        desc: "Graduate Management Admission Test. İşletme ve MBA programları için altın standart.",
        desc_en: "Graduate Management Admission Test. The gold standard for business and MBA programs.",
        desc_de: "Graduate Management Admission Test. Der Goldstandard für Business- und MBA-Programme.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200",
            intro: "GMAT Focus Edition, işletme okullarının adayları değerlendirmek için kullandığı, analitik ve stratejik düşünme odaklı bir sınavdır.",
            intro_en: "GMAT Focus Edition is an exam focused on analytical and strategic thinking, used by business schools to evaluate candidates.",
            intro_de: "Die GMAT Focus Edition ist eine Prüfung, die sich auf analytisches und strategisches Denken konzentriert und von Business Schools zur Bewertung von Kandidaten eingesetzt wird.",
            structure: [
                { title: "Quantitative Reasoning", title_en: "Quantitative Reasoning", title_de: "Quantitatives logisches Denken", desc: "Matematiksel mantık ve problem çözme." },
                { title: "Verbal Reasoning", title_en: "Verbal Reasoning", title_de: "Sprachliches logisches Denken", desc: "Eleştirel akıl yürütme ve okuduğunu anlama." },
                { title: "Data Insights", title_en: "Data Insights", title_de: "Dateneinblicke", desc: "Karmaşık veri yorumlama teknikleri." }
            ],
            scoring: "205-805 puan aralığındadır.",
            scoring_en: "Scored between 205-805 points.",
            scoring_de: "Bewertet im Bereich von 205-805 Punkten.",
            features: [
                "Soru İnceleme ve Değiştirme Hakkı",
                "Veri Analizi Odaklı Yeni Yapı",
                "Ömür Boyu 8 Kez Giriş Hakkı"
            ],
            features_en: [
                "Question Review and Edit Right",
                "New Structure Focused on Data Analysis",
                "8 Times Entry Right in Lifetime"
            ],
            features_de: [
                "Recht zur Überprüfung und Änderung von Fragen",
                "Neue Struktur mit Fokus auf Datenanalyse",
                "8 Mal Teilnahmeberechtigung im Leben"
            ]
        }
    },
    "toefl": {
        title: "TOEFL iBT",
        desc: "Test of English as a Foreign Language. Özellikle Amerika üniversiteleri tarafından tercih edilen sınav.",
        desc_en: "Test of English as a Foreign Language. The exam preferred especially by American universities.",
        desc_de: "Test of English as a Foreign Language. Die vor allem von amerikanischen Universitäten bevorzugte Prüfung.",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
            intro: "TOEFL iBT, dünya çapında 150'den fazla ülkede kabul gören, %100 internet tabanlı akademik İngilizce sınavıdır.",
            intro_en: "TOEFL iBT is a 100% internet-based academic English exam accepted in more than 150 countries worldwide.",
            intro_de: "TOEFL iBT ist eine zu 100 % internetbasierte akademische Englischprüfung, die in mehr her als 150 Ländern weltweit anerkannt wird.",
            structure: [
                { title: "Reading", title_en: "Reading", title_de: "Lesen", desc: "Akademik metinleri okuma ve anlama." },
                { title: "Listening", title_en: "Listening", title_de: "Hören", desc: "Ders anlatımları ve kampüs diyalogları." },
                { title: "Speaking", title_en: "Speaking", title_de: "Sprechen", desc: "4 görev (1 bağımsız, 3 entegre)." },
                { title: "Writing", title_en: "Writing", title_de: "Schreiben", desc: "Entegre ve akademik tartışma." }
            ],
            scoring: "Sınav 0-120 puan aralığındadır. Her bir bölüm 0-30 puan arasındadır.",
            scoring_en: "Scored between 0-120 points. Each section is 0-30 points.",
            scoring_de: "Bewertet im Bereich von 0-120 Punkten. Jeder Abschnitt liegt zwischen 0-30 Punkten.",
            features: [
                "ETS Sertifikalı Eğitmen Kadrosu",
                "Yapay Zeka Destekli Speaking Analizi",
                "TOEFL iBT Simülasyon Laboratuvarı"
            ],
            features_en: [
                "ETS Certified Instructor Staff",
                "AI-Powered Speaking Analysis",
                "TOEFL iBT Simulation Lab"
            ],
            features_de: [
                "ETS-zertifiziertes Dozententeam",
                "KI-gestützte Sprechanalyse",
                "TOEFL iBT Simulationslabor"
            ]
        }
    },
    "pte": {
        title: "PTE Academic",
        desc: "Pearson Test of English. Yapay zeka tabanlı, hızlı sonuçlanan İngilizce yeterlilik sınavı.",
        desc_en: "Pearson Test of English. AI-based English proficiency exam with fast results.",
        desc_de: "Pearson Test of English. KI-basierte Englischprüfung mit schnellen Ergebnissen.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
            intro: "PTE Academic, hızlı sonuç alma ve objektif puanlama arayan adaylar için ideal, bilgisayar tabanlı bir dil sınavıdır.",
            intro_en: "PTE Academic is a computer-based language exam ideal for candidates seeking fast results and objective scoring.",
            intro_de: "PTE Academic ist eine computergestützte Sprachprüfung, die ideal für Kandidaten ist, die schnelle Ergebnisse und eine objektive Bewertung suchen.",
            structure: [
                { title: "Speaking & Writing", title_en: "Speaking & Writing", title_de: "Sprechen & Schreiben", desc: "Entegre dil becerileri testi." },
                { title: "Reading", title_en: "Reading", title_de: "Lesen", desc: "Okuma ve boşluk doldurma." },
                { title: "Listening", title_en: "Listening", title_de: "Hören", desc: "Dikte ve dinleme odaklı sorular." }
            ],
            scoring: "10-90 puan aralığındadır.",
            scoring_en: "Scored between 10-90 points.",
            scoring_de: "Bewertet im Bereich von 10-90 Punkten.",
            features: [
                "48 Saatte Sonuç Açıklama",
                "Yapay Zeka Destekli Puanlama",
                "Geniş Sınav Merkezi Ağı"
            ],
            features_en: [
                "Results in 48 Hours",
                "AI-Powered Scoring",
                "Wide Network of Exam Centers"
            ],
            features_de: [
                "Ergebnisse in 48 Stunden",
                "KI-gestützte Bewertung",
                "Breites Netz von Prüfungszentren"
            ]
        }
    },
    "cambridge": {
        title: "Cambridge English",
        desc: "B2 First, C1 Advanced ve C2 Proficiency gibi ömür boyu geçerli sertifikalar sunan prestijli sınavlar.",
        desc_en: "Prestigious exams offering lifelong certificates such as B2 First, C1 Advanced, and C2 Proficiency.",
        desc_de: "Renommierte Prüfungen mit lebenslang gültigen Zertifikaten wie B2 First, C1 Advanced und C2 Proficiency.",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200",
            intro: "Cambridge English sınavları, dünya çapında binlerce kurum tarafından kabul edilen, ömür boyu geçerli dil yeterlilik sertifikalarıdır.",
            intro_en: "Cambridge English exams are lifelong language proficiency certificates accepted by thousands of institutions worldwide.",
            intro_de: "Cambridge English Prüfungen sind lebenslang gültige Sprachzertifikate, die von Tausenden von Institutionen weltweit anerkannt werden.",
            structure: [
                { title: "Reading & Use of English", title_en: "Reading & Use of English", title_de: "Lesen & Sprachgebrauch", desc: "Dil bilgisi ve kelime kullanımı." },
                { title: "Writing", title_en: "Writing", title_de: "Schreiben", desc: "Kompozisyon ve rapor yazımı." },
                { title: "Listening", title_en: "Listening", title_de: "Hören", desc: "Dinleme ve anlama." },
                { title: "Speaking", title_en: "Speaking", title_de: "Sprechen", desc: "Karşılıklı konuşma ve mülakat." }
            ],
            scoring: "Cambridge English Scale (160-230+) üzerinden puanlanır.",
            scoring_en: "Scored on the Cambridge English Scale (160-230+).",
            scoring_de: "Bewertet auf der Cambridge English Scale (160-230+).",
            features: [
                "Süresiz Geçerlilik",
                "Akademik ve Profesyonel Kabul",
                "Cambridge Üniversitesi Güvencesi"
            ],
            features_en: [
                "Indefinite Validity",
                "Academic and Professional Acceptance",
                "University of Cambridge Assurance"
            ],
            features_de: [
                "Unbefristete Gültigkeit",
                "Akademische und berufliche Anerkennung",
                "Sicherheit der Universität Cambridge"
            ]
        }
    }
};
