import { Category } from "@prisma/client";

export interface ServiceCategory {
    slug?: string;
    title: string;
    title_en?: string;
    desc: string;
    desc_en?: string;
    iconKey: string;
}

export interface ServiceMapValue {
    category: Category;
    title: string;
    title_en?: string;
    desc: string;
    desc_en?: string;
    categories?: ServiceCategory[];
}

export const serviceMap: Record<string, ServiceMapValue> = {
    "denklik": {
        category: "LANGUAGE_SCHOOL",
        title: "Denklik İşlemleri",
        title_en: "Diploma Equivalency",
        desc: "Yurtdışı diplomanızın Türkiye'de tanınması için profesyonel rehberlik.",
        desc_en: "Professional guidance for the recognition of your international diploma in Turkey.",
    },
    "yurtdisi-yuksek-lisans": {
        category: "MASTER",
        title: "Yurtdışı Yüksek Lisans",
        title_en: "Master & Postgraduate",
        desc: "Kariyerinizi global bir boyuta taşımak için en prestijli yüksek lisans mentorluğu.",
        desc_en: "The most prestigious master's mentorship to take your career to a global dimension.",
        categories: [
            { 
                title: "MBA Programları", 
                title_en: "MBA Programs",
                desc: "Global iş dünyasında liderlik rolleri için tasarlanmış prestijli işletme yüksek lisansı.", 
                desc_en: "Prestigious business master's designed for leadership roles in the global business world.",
                iconKey: "Zap" 
            },
            { 
                title: "Master of Science (MSc)", 
                title_en: "Master of Science (MSc)",
                desc: "Teknik ve bilimsel alanlarda derinlemesine uzmanlık sağlayan araştırma odaklı programlar.", 
                desc_en: "Research-oriented programs providing in-depth expertise in technical and scientific fields.",
                iconKey: "ShieldCheck" 
            },
            { 
                title: "Sanat & Tasarım Master", 
                title_en: "Art & Design Master",
                desc: "Portfolyo odaklı, yaratıcı endüstrilerde sınıf atlatacak lisansüstü eğitimler.", 
                desc_en: "Portfolio-oriented graduate studies that will elevate you in creative industries.",
                iconKey: "Star" 
            }
        ]
    },
    "yurtdisi-lise": {
        category: "HIGH_SCHOOL",
        title: "Yurtdışı Lise",
        title_en: "High School Abroad",
        desc: "Global bir geleceğin kapılarını, dünyanın en prestijli liselerinde aralayın.",
        desc_en: "Open the doors to a global future in the world's most prestigious high schools.",
        categories: [
            { 
                slug: "boarding", 
                title: "Klasik Yatılı Okullar (Boarding)", 
                title_en: "Classic Boarding Schools",
                desc: "Harry Potter filmlerinden aşina olduğumuz, kampüs içi konaklamalı, spor ve sanatla iç içe.", 
                desc_en: "Familiar from Harry Potter films, campus residents, intertwined with sports and arts.",
                iconKey: "ShieldCheck" 
            },
            { 
                slug: "private-day", 
                title: "Özel Günübirlik Okullar (Private Day)", 
                title_en: "Private Day Schools",
                desc: "Seçkin ailelerin yanında kalarak o ülkenin kültürünü 7/24 yaşama.", 
                desc_en: "Living the culture 24/7 by staying with elite host families.",
                iconKey: "Users" 
            },
            { 
                slug: "exchange", 
                title: "Devlet Lise Değişim (Exchange)", 
                title_en: "Public High School Exchange",
                desc: "Amerikan Dışişleri Bakanlığı destekli kültürel değişim.", 
                desc_en: "Cultural exchange supported by the U.S. Department of State.",
                iconKey: "Globe" 
            },
            { 
                slug: "ib-ap", 
                title: "IB & AP Diploma Programları", 
                title_en: "IB & AP Diploma Programs",
                desc: "Dünyanın en iyi üniversitelerine girişte altın anahtar.", 
                desc_en: "The golden key to entering the world's best universities.",
                iconKey: "Award" 
            }
        ]
    },
    "yurtdisi-universite": {
        category: "UNIVERSITY",
        title: "Yurtdışı Üniversite",
        title_en: "University Abroad",
        desc: "Ivy League'den teknik üniversitelere, direkt yerleşim ve hazırlık programı alternatifleri.",
        desc_en: "From Ivy League to technical universities, alternatives for direct placement and foundation programs.",
        categories: [
            { 
                title: "Sıralama Odaklı (Top 100)", 
                title_en: "Ranking Oriented (Top 100)",
                desc: "Ivy League, Russell Group ve dünya genelinde ilk 100'de yer alan üniversiteler.", 
                desc_en: "Ivy League, Russell Group, and universities ranked in the global top 100.",
                iconKey: "Award" 
            },
            { 
                title: "Burs Garantili Programlar", 
                title_en: "Scholarship Guaranteed Programs",
                desc: "Akademik başarıya bağlı olarak okul ücretinden %20-%100 arası muafiyet.", 
                desc_en: "Exemption between 20%-100% of the tuition fee depending on academic success.",
                iconKey: "Zap" 
            },
            { 
                title: "Ücretsiz Devlet Üniversiteleri", 
                title_en: "Free Public Universities",
                desc: "Almanya ve İtalya gibi ülkelerde, sadece yıllık katkı payı ile prestijli eğitim.", 
                desc_en: "Prestigious education in countries like Germany and Italy, with only an annual contribution fee.",
                iconKey: "Building2" 
            }
        ]
    },
    "yurtdisi-yaz-okullari": {
        category: "SUMMER_SCHOOL",
        title: "Yurtdışı Yaz Okulları",
        title_en: "Summer Schools Abroad",
        desc: "Dünyanın en prestijli kampüslerinde, akademik ve sosyal gelişimi birleştiren yaz programları.",
        desc_en: "Summer programs combining academic and social development on the world's most prestigious campuses.",
        categories: [
            { 
                title: "Akademik Yaz Okulu", 
                title_en: "Academic Summer School",
                desc: "Üniversite kredisi kazandıran veya lise müfredatını güçlendiren yoğun akademik kamplar.", 
                desc_en: "Intensive academic camps that earn university credit or strengthen the high school curriculum.",
                iconKey: "BookOpen" 
            },
            { 
                title: "Spor & Sanat", 
                title_en: "Sports & Arts",
                desc: "Elite kulüplerde futbol, tenis veya prestijli akademilerde görsel sanatlar.", 
                desc_en: "Football or tennis in elite clubs, or visual arts in prestigious academies.",
                iconKey: "Star" 
            },
            { 
                title: "Dil & Aktivite", 
                title_en: "Language & Activity",
                desc: "Geleneksel yaz okulu formatında, yarım gün ders ve yarım gün kültürel gezi.", 
                desc_en: "In the traditional summer school format, half-day classes and half-day cultural tours.",
                iconKey: "Palmtree" 
            }
        ]
    },
    "yurtdisi-dil-okullari": {
        category: "LANGUAGE_SCHOOL",
        title: "Yurtdışı Dil Okulları",
        title_en: "Language Schools Abroad",
        desc: "Kariyerinize global bir boyuta taşımak için en prestijli dil okulları.",
        desc_en: "The most prestigious language schools to take your career to a global dimension.",
        categories: [
            { 
                title: "Genel İngilizce", 
                title_en: "General English",
                desc: "Günlük yaşamda akıcı iletişim kurmanızı sağlayacak temel dil eğitimi.", 
                desc_en: "Basic language training to provide fluent communication in daily life.",
                iconKey: "Globe" 
            },
            { 
                title: "İş İngilizcesi (Business)", 
                title_en: "Business English",
                desc: "Kurumsal dünyada profesyonel sunum ve müzakere yeteneği.", 
                desc_en: "Professional presentation and negotiation skills in the corporate world.",
                iconKey: "Zap" 
            },
            { 
                title: "Akademik Geçiş (Pathway)", 
                title_en: "Academic Pathway",
                desc: "Üniversite kabulü için gereken dil seviyesine en hızlı şekilde ulaşın.", 
                desc_en: "Reach the language level required for university admission as quickly as possible.",
                iconKey: "GraduationCap" 
            }
        ]
    },
    "kariyer": {
        category: "OTHER",
        title: "Kariyer",
        title_en: "Career",
        desc: "Almanya'da profesyonel bir gelecek için uzman yerleşim ve danışmanlık hizmetleri.",
        desc_en: "Expert placement and consultancy services for a professional future in Germany.",
        categories: [
            { 
                slug: "yurtdisi-meslek-egitimi", 
                title: "Yurtdışı Meslek Eğitimi Danışmanlığı", 
                title_en: "Vocational Training Consultancy Abroad",
                desc: "Yurtdışında mesleki eğitim (Ausbildung vb.) programları ile hem eğitim alıp hem gelir elde etmeniz için rehberlik.", 
                desc_en: "Guidance for vocational training programs abroad to study and earn an income simultaneously.",
                iconKey: "GraduationCap" 
            },
            { 
                slug: "uluslararasi-kariyer", 
                title: "Uluslararası Kariyer Danışmanlığı", 
                title_en: "International Career Consultancy",
                desc: "Global iş dünyasında hedeflerinize ulaşmanız için stratejik kariyer planlaması ve iş arama desteği.", 
                desc_en: "Strategic career planning and job search support to reach your goals in the global business world.",
                iconKey: "Globe" 
            },
            { 
                slug: "profesyonel-cv", 
                title: "Profesyonel CV Oluşturma", 
                title_en: "Professional CV Creation",
                desc: "Uluslararası standartlara uygun, dikkat çekici ve etkili özgeçmiş ile niyet mektubu (cover letter) hazırlığı.", 
                desc_en: "Preparation of an impressive and effective CV and cover letter in accordance with international standards.",
                iconKey: "FileText" 
            },
            { 
                slug: "vize-belge-hazirlik", 
                title: "Vize Belge Hazırlık Rehberliği", 
                title_en: "Visa Document Preparation Guidance",
                desc: "Çalışma, eğitim veya fırsat kartı gibi vize süreçlerinizde eksiksiz ve doğru dosya hazırlama danışmanlığı.", 
                desc_en: "Consultancy for complete and accurate file preparation in your visa processes such as work, education, or opportunity card.",
                iconKey: "CheckSquare" 
            }
        ]
    },
    "egitim-koclugu": {
        category: "OTHER",
        title: "Eğitim Koçluğu",
        title_en: "Education Coaching",
        desc: "Akademik hedeflerinize ulaşmanız için kişiselleştirilmiş mentorluk ve strategy desteği.",
        desc_en: "Personalized mentorship and strategy support to reach your academic goals.",
    },
};

export const BRANDING_ASSETS = {
    LOGO: '/Services/Stareducation.png',
    SERVICES: {
        'yurtdisi-universite': '/Services/Stareducation_Universities.jpeg',
        'yurtdisi-lise': '/Services/Stareducation_Highschool.jpeg',
        'yurtdisi-yaz-okullari': '/Services/Stareducation_Summerschool.jpeg',
        'yurtdisi-dil-okullari': '/Services/Stareducation_Languageschool.jpeg',
    },
    HERO_OVERRIDES: {
        'yurtdisi-lise': '/Services/lise.png',
        'yurtdisi-dil-okullari': '/Services/dilokulu.png',
        'yurtdisi-yaz-okullari': '/Services/Stareducation_Summerschool.jpeg',
        'yurtdisi-universite': '/Services/universite.png',
        'yurtdisi-yuksek-lisans': '/Services/master.png',
    }
};

export const countryMap: Record<string, { title: string; title_en?: string; image: string }> = {
    ingiltere: {
        title: "İngiltere",
        title_en: "United Kingdom",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200",
    },
    amerika: {
        title: "Amerika",
        title_en: "USA",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1200",
    },
    almanya: {
        title: "Almanya",
        title_en: "Germany",
        image: "https://images.unsplash.com/photo-1599946347341-6cd394a630fe?q=80&w=1200", // Brandenburg Gate
    },
    kanada: {
        title: "Kanada",
        title_en: "Canada",
        image: "https://images.unsplash.com/photo-1503614472666-ef35779a4ed5?q=80&w=1200",
    },
    isvicre: {
        title: "İsviçre",
        title_en: "Switzerland",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200",
    },
    avustralya: {
        title: "Avustralya",
        title_en: "Australia",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200",
    },
    belcika: {
        title: "Belçika",
        title_en: "Belgium",
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200",
    },
    hollanda: {
        title: "Hollanda",
        title_en: "Netherlands",
        image: "https://images.unsplash.com/photo-1512470876302-972faa2ab9af?q=80&w=1200",
    },
    irlanda: {
        title: "İrlanda",
        title_en: "Ireland",
        image: "https://images.unsplash.com/photo-1590089415225-401cd6f9ad43?q=80&w=1200",
    },
    polonya: {
        title: "Polonya",
        title_en: "Poland",
        image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=1200",
    },
    italya: {
        title: "İtalya",
        title_en: "Italy",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200",
    },
    macaristan: {
        title: "Macaristan",
        title_en: "Hungary",
        image: "https://images.unsplash.com/photo-1551867633-194f125bddfa?q=80&w=1200",
    },
};

export interface ExamDetailStructure {
    title: string;
    title_en?: string;
    desc: string;
    desc_en?: string;
}

export interface ExamMapValue {
    title: string;
    title_en?: string;
    desc: string;
    desc_en?: string;
    image: string;
    details?: {
        heroImage: string;
        intro: string;
        intro_en?: string;
        structure: ExamDetailStructure[];
        scoring: string;
        scoring_en?: string;
        features: string[];
        features_en?: string[];
    };
}

export const examMap: Record<string, ExamMapValue> = {
    "ielts": {
        title: "IELTS",
        desc: "International English Language Testing System. İngiltere, Avustralya ve Kanada başta olmak üzere tüm dünyada kabul gören en popüler dil yeterlilik sınavı.",
        desc_en: "International English Language Testing System. The most popular language proficiency exam accepted worldwide, especially in the UK, Australia, and Canada.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1200",
            intro: "IELTS (International English Language Testing System), 140'tan fazla ülkede 11.000'den fazla kurum tarafından kabul edilen, dünyanın en prestijli İngilizce dil yeterlilik sınavıdır.",
            intro_en: "IELTS (International English Language Testing System) is the world's most prestigious English language proficiency exam, accepted by more than 11,000 institutions in over 140 countries.",
            structure: [
                { 
                    title: "Listening (Dinleme)", 
                    title_en: "Listening",
                    desc: "30 dakika + 10 dakika kontrol süresi. 4 bölümden ve 40 sorudan oluşur." ,
                    desc_en: "30 minutes + 10 minutes transfer time. Consists of 4 sections and 40 questions.",
                },
                { 
                    title: "Reading (Okuma)", 
                    title_en: "Reading",
                    desc: "60 dakika. 3 uzun ve kompleks metinden oluşan 40 soruluk bir bölümdür.",
                    desc_en: "60 minutes. A section consisting of 3 long and complex texts with 40 questions.",
                },
                { 
                    title: "Writing (Yazma)", 
                    title_en: "Writing",
                    desc: "60 dakika. Task 1: Grafik raporlama. Task 2: Akademik kompozisyon.",
                    desc_en: "60 minutes. Task 1: Data reporting. Task 2: Academic essay.",
                },
                { 
                    title: "Speaking (Konuşma)", 
                    title_en: "Speaking",
                    desc: "11-14 dakika. Bir sınav uzmanı ile birebir yüz yüze yapılan mülakattır.",
                    desc_en: "11-14 minutes. A one-on-one face-to-face interview with an examiner.",
                }
            ],
            scoring: "Her bölüm 1-9 arasında puanlanır (Band Score). Genel Skor bu dört bölümün ortalamasıdır.",
            scoring_en: "Each section is scored between 1-9 (Band Score). The Overall Score is the average of these four sections.",
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
        }
    },
    "toefl": {
        title: "TOEFL iBT",
        desc: "Test of English as a Foreign Language. Özellikle Amerika üniversiteleri tarafından tercih edilen sınav.",
        desc_en: "Test of English as a Foreign Language. The exam preferred especially by American universities.",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
            intro: "TOEFL iBT, dünya çapında 150'den fazla ülkede kabul gören, %100 internet tabanlı akademik İngilizce sınavıdır.",
            intro_en: "TOEFL iBT is a 100% internet-based academic English exam accepted in more than 150 countries worldwide.",
            structure: [
                { 
                    title: "Reading (Okuma)", 
                    title_en: "Reading",
                    desc: "54-72 dakika. 3 veya 4 akademik okuma parçası.",
                    desc_en: "54-72 minutes. 3 or 4 academic reading passages.",
                },
                { 
                    title: "Listening (Dinleme)", 
                    title_en: "Listening",
                    desc: "41-57 dakika. Ders anlatımları ve kampüs diyalogları.",
                    desc_en: "41-57 minutes. Lectures and campus dialogues.",
                },
                { 
                    title: "Speaking (Konuşma)", 
                    title_en: "Speaking",
                    desc: "17 dakika. 4 görev (1 bağımsız, 3 entegre).",
                    desc_en: "17 minutes. 4 tasks (1 independent, 3 integrated).",
                },
                { 
                    title: "Writing (Yazma)", 
                    title_en: "Writing",
                    desc: "50 dakika. 2 görev. Entegre ve akademik tartışma.",
                    desc_en: "50 minutes. 2 tasks. Integrated and academic discussion.",
                }
            ],
            scoring: "Sınav 0-120 puan aralığında değerlendirilir. Her bir bölüm 0-30 puan arasındadır.",
            scoring_en: "The exam is evaluated in the 0-120 point range. Each section is between 0-30 points.",
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
        }
    }
};

export interface HighSchoolCategoryValue {
    title: string;
    title_en?: string;
    desc: string;
    desc_en?: string;
    image: string;
    details?: {
        heroImage: string;
        intro: string;
        intro_en?: string;
        stats?: { value: string; label: string; label_en?: string }[];
        features?: string[];
        features_en?: string[];
        matchKeyword?: string;
    };
}

export const highSchoolCategoryMap: Record<string, HighSchoolCategoryValue> = {
    "boarding": {
        title: "Klasik Yatılı Okullar (Boarding)",
        title_en: "Classic Boarding Schools",
        desc: "Harry Potter filmlerinden aşina olduğumuz, kampüs içi konaklamalı eğitim kurumları.",
        desc_en: "Campus-based educational institutions familiar from the Harry Potter films.",
        image: "https://images.unsplash.com/photo-1541339907198-e08759df93f3?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1622397333309-3056042db26a?q=80&w=1200",
            intro: "Boarding School geleneği, sadece akademik başarıyı değil, karakter gelişimini de önceler.",
            intro_en: "The Boarding School tradition prioritizes not only academic success but also character development.",
            stats: [
                { value: "%99", label: "Üniversite Başarısı", label_en: "University Success" },
                { value: "10:1", label: "Eğitmen Oranı", label_en: "Teacher Ratio" }
            ],
            features: [
                "24/7 Güvenlik ve Pedagojik Gözetim",
                "Kampüs İçi Konaklama",
                "Seçkin Sanat ve Spor Tesisleri",
                "Dünya Üniversiteleriyle Güçlü Bağlar"
            ],
            features_en: [
                "24/7 Security and Pedagogical Supervision",
                "On-Campus Accommodation",
                "Exclusive Art and Sports Facilities",
                "Strong Connections with World Universities"
            ],
            matchKeyword: "Boarding"
        }
    },
    "private-day": {
        title: "Özel Günübirlik Okullar (Private Day)",
        title_en: "Private Day Schools",
        desc: "Seçkin ailelerin yanında kalarak o ülkenin kültürünü 7/24 yaşama ve yerel hayata tam entegrasyon şansı sunan prestijli kolejler.",
        desc_en: "Prestigious colleges offering the chance to experience the country's culture 24/7 by staying with elite host families and full integration into local life.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200", 
        details: {
            heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200", 
            intro: "Private Day School programı, akademik kalitesi yüksek özel okullarda eğitim alırken, özenle seçilmiş ailelerin yanında kalarak kültürel daldırma (immersion) yaşamanızı sağlar. Bu program, hem özel okul disiplini hem de sıcak bir aile ortamı arayan öğrenciler için idealdir.",
            intro_en: "The Private Day School program allows you to experience cultural immersion while studying at high-quality private schools and staying with carefully selected families. This program is ideal for students seeking both private school discipline and a warm family environment.",
            stats: [
                { value: "%95", label: "Aile Memnuniyeti", label_en: "Family Satisfaction" },
                { value: "15:1", label: "Sınıf Mevcudu", label_en: "Class Size" },
                { value: "7/24", label: "Yerel Destek", label_en: "Local Support" }
            ],
            features: [
                "Güvenlik Taramasından Geçmiş Seçkin Aile Yanı",
                "Yerel Kültürü Yaşayarak ve Konuşarak Öğrenme",
                "Boarding Okullarına Göre Daha Ekonomik",
                "Şehir İçi veya Banliyö Lokasyon Seçenekleri",
                "Amerikan/Kanada Lise Diploması İmkanı"
            ],
            features_en: [
                "Elite Host Families with Background Checks",
                "Learning Local Culture by Living and Speaking",
                "More Economical Than Boarding Schools",
                "City or Suburban Location Options",
                "US/Canada High School Diploma Opportunity"
            ],
            matchKeyword: "Private Day"
        }
    },
    "exchange": {
        title: "Devlet Lise Değişim (Exchange)",
        title_en: "Public High School Exchange",
        desc: "Amerikan Dışişleri Bakanlığı destekli J-1 gibi programlarla, kültür elçisi olarak gidilen, bütçe dostu ve macera dolu bir yıl.",
        desc_en: "A budget-friendly and adventurous year as a cultural ambassador with programs like J-1 supported by the U.S. Department of State.",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200", 
        details: {
            heroImage: "https://images.unsplash.com/photo-1529390003361-8419828c3937?q=80&w=1200", 
            intro: "Exchange programları, gençlerin 'Kültür Elçisi' olarak yurt dışında bir yıl geçirmelerini sağlayan, devlet destekli ve yüksek prestijli kültürel değişim programlarıdır. Öğrenciler, gönüllü ailelerin yanında kalarak devlet liselerine gider ve o ülkenin bir vatandaşı gibi yaşar.",
            intro_en: "Exchange programs are state-supported and highly prestigious cultural exchange programs that allow young people to spend a year abroad as 'Cultural Ambassadors'. Students stay with volunteer families, attend public high schools, and live like a citizen of that country.",
            stats: [
                { value: "J-1", label: "Resmi Vize Statüsü", label_en: "Official Visa Status" },
                { value: "1 Yıl", label: "Program Süresi", label_en: "Program Duration" },
                { value: "%100", label: "Kültürel Değişim", label_en: "Cultural Exchange" }
            ],
            features: [
                "En Ekonomik Yurt Dışı Lise Seçeneği",
                "Amerikan Dışişleri Bakanlığı Resmi Programı",
                "İngilizce Seviyesinde Mükemmelleşme",
                "Kendi Ayakları Üzerinde Durma Becerisi",
                "Ömür Boyu Sürecek Uluslararası Dostluklar"
            ],
            features_en: [
                "Most Economical Study Abroad Option",
                "Official U.S. Department of State Program",
                "Perfection in English Language Skills",
                "Independence and Life Skills",
                "Lifelong International Friendships"
            ],
            matchKeyword: "Exchange"
        }
    },
    "ib-ap": {
        title: "IB & AP Diploma Programları",
        title_en: "IB & AP Diploma Programs",
        desc: "Dünyanın en iyi üniversitelerine girişte altın anahtar niteliği taşıyan, akademik olarak zorlayıcı ve ödüllendirici müfredatlar.",
        desc_en: "Academically challenging and rewarding curricula that serve as a golden key to entering the world's best universities.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200", 
        details: {
            heroImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200", 
            intro: "International Baccalaureate (IB) ve Advanced Placement (AP) programları, lise seviyesinde üniversite düzeyinde dersler almanızı sağlayan, akademik olarak en prestijli müfredatlardır. Bu diplomalar, Harvard ve Oxford gibi üniversitelerden kabul almanızı ve burs kazanmanızı kolaylaştırır.",
            intro_en: "International Baccalaureate (IB) and Advanced Placement (AP) programs are the most prestigious academic curricula that allow you to take university-level courses at the high school level. These diplomas make it easier to get accepted and win scholarships from universities like Harvard and Oxford.",
            stats: [
                { value: "Global", label: "Geçerlilik", label_en: "Validity" },
                { value: "Kredi", label: "Üniv. Saydırma", label_en: "Credit Transfer" },
                { value: "Elit", label: "Akademik Seviye", label_en: "Academic Level" }
            ],
            features: [
                "Eleştirel Düşünme ve Araştırma Odaklı Eğitim",
                "Üniversite Birinci Sınıf Derslerinden Muafiyet",
                "Global Üniversite Kabullerinde Büyük Avantaj",
                "Zengin ve Çok Yönlü Ders Seçenekleri",
                "Theory of Knowledge (TOK) ve Extended Essay (EE)"
            ],
            features_en: [
                "Critical Thinking and Research-Oriented Education",
                "Exemption from Freshman University Courses",
                "Major Advantage in Global University Admissions",
                "Rich and Versatile Course Options",
                "Theory of Knowledge (TOK) and Extended Essay (EE)"
            ],
            matchKeyword: "IB"
        }
    }
};

export const categoryRequirements: Record<string, { tr: string[]; en: string[] }> = {
    "LANGUAGE_SCHOOL": {
        tr: [
            "Pasaport Kopyası",
            "Sertifika veya Diploma (En son mezun olunan okul)",
            "Niyet Mektubu (Bazı vize türleri için)",
            "Finansal Yeterlilik Belgeleri",
            "Okul Kayıt Formu"
        ],
        en: [
            "Passport Copy",
            "Certificate or Diploma (Last graduated school)",
            "Statement of Purpose (For some visa types)",
            "Financial Sufficiency Documents",
            "School Registration Form"
        ]
    },
    "SUMMER_SCHOOL": {
        tr: [
            "Pasaport Kopyası",
            "Veli İzin Belgesi (18 yaş altı için)",
            "Sağlık ve Seyahat Sigortası",
            "Vize Başvuru Formları",
            "Okul Kayıt ve Sağlık Beyan Formu"
        ],
        en: [
            "Passport Copy",
            "Parental Consent Form (For under 18s)",
            "Health and Travel Insurance",
            "Visa Application Forms",
            "School Registration and Health Declaration Form"
        ]
    },
    "HIGH_SCHOOL": {
        tr: [
            "Son 3 Yılın Transkriptleri",
            "Öğretmen Referans Mektupları (İngilizce/Matematik)",
            "Dil Yeterlilik Kanıtı (ELTiS, IELTS veya Okul Sınavı)",
            "Müfretat Dışı Faaliyetler Listesi",
            "Pasaport ve Veli Muvafakatnamesi"
        ],
        en: [
            "Transcripts of the Last 3 Years",
            "Teacher Reference Letters (English/Math)",
            "Proof of Language Proficiency (ELTiS, IELTS, or School Exam)",
            "List of Extracurricular Activities",
            "Passport and Parental Consent"
        ]
    },
    "UNIVERSITY": {
        tr: [
            "Lise Diploması ve Transkript",
            "Dil Yeterlilik Belgesi (IELTS 6.0+ / TOEFL 80+)",
            "Akademik Referans Mektubu (2 Adet)",
            "Niyet Mektubu (Statement of Purpose)",
            "CV / Özgeçmiş"
        ],
        en: [
            "High School Diploma and Transcript",
            "Language Proficiency Certificate (IELTS 6.0+ / TOEFL 80+)",
            "Academic Reference Letters (2 Pieces)",
            "Statement of Purpose",
            "CV / Resume"
        ]
    },
    "MASTER": {
        tr: [
            "Lisans Diploması ve Transkript",
            "Dil Yeterlilik Belgesi (IELTS 6.5+ / TOEFL 90+)",
            "Akademik ve/veya Profesyonel Referanslar",
            "Niyet Mektubu (Statement of Purpose)",
            "Detaylı CV / Özgeçmiş",
            "Portfolyo (Sanat ve Mimarlık için)"
        ],
        en: [
            "Bachelor's Diploma and Transcript",
            "Language Proficiency Certificate (IELTS 6.5+ / TOEFL 90+)",
            "Academic and/or Professional References",
            "Statement of Purpose",
            "Detailed CV / Resume",
            "Portfolio (For Art and Architecture)"
        ]
    },
    "EXAM_PREPARATION": {
        tr: [
            "Pasaport Kopyası",
            "Mevcut Dil Seviyesi Belirleme Testi",
            "Kayıt Formu"
        ],
        en: [
            "Passport Copy",
            "Current Language Level Placement Test",
            "Registration Form"
        ]
    }
};

export const countryServiceRequirements: Record<string, Record<string, { tr: string[]; en: string[] }>> = {
    "dil-okullari": {
        "ingiltere": {
            tr: [
                "Pasaport Kopyası",
                "Short-term Study Visa (6-11 ay) veya Standard Visitor Visa (<6 ay)",
                "Niyet Mektubu (SOP) - Neden İngiltere?",
                "Banka Hesap Dökümü (Son 3-6 ay)",
                "Muvafakatname (18 yaş altı için)"
            ],
            en: [
                "Passport Copy",
                "Short-term Study Visa (6-11 months) or Standard Visitor Visa (<6 months)",
                "Statement of Purpose (SOP) - Why UK?",
                "Bank Statement (Last 3-6 months)",
                "Parental Consent (For under 18s)"
            ]
        },
        "amerika": {
            tr: [
                "Pasaport Kopyası (En az 6 ay geçerli)",
                "I-20 Belgesi Başvurusu için Banka Mektubu",
                "F-1 Öğrenci Vizesi Gereksinimleri",
                "Sponsor Mektubu (Finansal destekçi varsa)",
                "SEVIS Ödeme Dekontu"
            ],
            en: [
                "Passport Copy (Valid for at least 6 months)",
                "Bank Letter for I-20 Form Application",
                "F-1 Student Visa Requirements",
                "Sponsor Letter (If there is a financial supporter)",
                "SEVIS Payment Receipt"
            ]
        },
        "kanada": {
            tr: [
                "Pasaport Kopyası",
                "Study Permit (>6 ay) veya Visitor Visa (<6 ay)",
                "Provincial Attestation Letter (PAL/TAL) - Gerekliyse",
                "Biyometrik Veri Kaydı",
                "Kanada Vize Başvuru Formu (IMM 1294)"
            ],
            en: [
                "Passport Copy",
                "Study Permit (>6 months) or Visitor Visa (<6 months)",
                "Provincial Attestation Letter (PAL/TAL) - If required",
                "Biometric Data Registration",
                "Canada Visa Application Form (IMM 1294)"
            ]
        },
        "irlanda": {
            tr: [
                "Pasaport Kopyası",
                "Stamp 2 Vizesi (25 hafta üzeri programlar için)",
                "€6,665 Finansal Yeterlilik Kanıtı",
                "Özel Sağlık Sigortası (İrlanda standartlarında)",
                "%85 Devam Zorunluluğu Taahhüdü"
            ],
            en: [
                "Passport Copy",
                "Stamp 2 Visa (For programs over 25 weeks)",
                "€6,665 Proof of Financial Sufficiency",
                "Private Health Insurance (Irish standards)",
                "85% Attendance Requirement Commitment"
            ]
        },
        "avustralya": {
            tr: [
                "Pasaport Kopyası",
                "Student Visa (Subclass 500)",
                "Genuine Student (GS) Gereksinimi Kanıtı",
                "Banka Dökümü (Yıllık yaşam maliyeti + okul ücreti)",
                "OSHC (Denizaşırı Öğrenci Sağlık Sigortası)"
            ],
            en: [
                "Passport Copy",
                "Student Visa (Subclass 500)",
                "Proof of Genuine Student (GS) Requirement",
                "Bank Statement (Annual living cost + school fee)",
                "OSHC (Overseas Student Health Cover)"
            ]
        },
        "malta": {
            tr: [
                "Pasaport Kopyası",
                "Schengen Vizesi Gereksinimleri",
                "Okul Kabul Belgesi",
                "Finansal Yeterlilik (Günlük min. harcama kanıtı)",
                "Uçak Bileti ve Konaklama Onayı"
            ],
            en: [
                "Passport Copy",
                "Schengen Visa Requirements",
                "School Acceptance Letter",
                "Financial Sufficiency (Proof of min. daily spending)",
                "Flight Ticket and Accommodation Confirmation"
            ]
        }
    },
    "yurtdisinda-universite": {
        "almanya": {
            tr: [
                "Lise Diploması (YKS Yerleşme Belgesi veya ÖSYM Sonuç Belgesi)",
                "Studienkolleg (Düz lise mezunları için 1 yıllık hazırlık eğitimi)",
                "Sperrkonto (Bloke Hesap - 2026 itibariyle güncel tutar)",
                "Almanca (TestDaF/DSH/Goethe C1) veya İngilizce IELTS 6.5+",
                "Bedingte Zulassung (Şartlı Kabul) - Dil eğitimi sırasında yer garanti",
                "VPD (Uni-assist üzerinden not dönüşüm belgesi)"
            ],
            en: [
                "High School Diploma (YKS Placement Result or OSYM Result Document)",
                "Studienkolleg (1-year preparatory education for standard high school graduates)",
                "Sperrkonto (Blocked Account - Current amount as of 2026)",
                "German (TestDaF/DSH/Goethe C1) or English IELTS 6.5+",
                "Bedingte Zulassung (Conditional Admission) - Guaranteed spot during language training",
                "VPD (Grade conversion document via Uni-assist)"
            ]
        },
        "ingiltere": {
            tr: [
                "Lise Diploması ve Transkript",
                "IELTS UKVI (Academic) Belgesi",
                "UCAS Başvuru Formu ve Personal Statement",
                "Referans Mektubu (Lise öğretmeninden)",
                "Banka Bakiyesi (Eğitim + Yaşam payı - 28 gün kuralı)"
            ],
            en: [
                "High School Diploma and Transcript",
                "IELTS UKVI (Academic) Certificate",
                "UCAS Application Form and Personal Statement",
                "Reference Letter (From a high school teacher)",
                "Bank Balance (Tuition + Living allowance - 28-day rule)"
            ]
        },
        "kanada": {
            tr: [
                "Lise Diploması ve Transkript (GPA 80+ tercih edilir)",
                "IELTS 6.5 veya TOEFL 90+",
                "Study Permit ve PAL Sertifikası",
                "Banka Hesap Hareketleri (Min. 1 yıl)",
                "Ekstra Faaliyetler ve Sertifikalar"
            ],
            en: [
                "High School Diploma and Transcript (GPA 80+ preferred)",
                "IELTS 6.5 or TOEFL 90+",
                "Study Permit and PAL Certificate",
                "Bank Account Activities (Min. 1 year)",
                "Extracurricular Activities and Certificates"
            ]
        },
        "hollanda": {
            tr: [
                "Lise Diploması (VWO Dengi)",
                "Studielink Kayıt Onayı",
                "IELTS 6.0+ / TOEFL 80+",
                "Banka Bakiyesi Kanıtı",
                "Konaklama Ön Rezervasyonu (Kritik önemde)"
            ],
            en: [
                "High School Diploma (VWO Equivalent)",
                "Studielink Registration Confirmation",
                "IELTS 6.0+ / TOEFL 80+",
                "Proof of Bank Balance",
                "Accommodation Pre-reservation (Critical importance)"
            ]
        },
        "amerika": {
            tr: [
                "Lise Diploması ve Resmi Transkript",
                "IELTS 6.5 / TOEFL 80+ / Duolingo 110+",
                "SAT/ACT Skoru (Opsiyonel ama önerilir)",
                "Finansal Yeterlilik Belgesi (I-20 için)",
                "2 Adet Akademik Referans"
            ],
            en: [
                "High School Diploma and Official Transcript",
                "IELTS 6.5 / TOEFL 80+ / Duolingo 110+",
                "SAT/ACT Score (Optional but recommended)",
                "Financial Sufficiency Document (For I-20)",
                "2 Academic References"
            ]
        },
        "avustralya": {
            tr: [
                "Lise Diploması ve Transkript",
                "IELTS 6.0+ (Academic)",
                "OSHC Sağlık Sigortası",
                "GTE (Genuine Temporary Entrant) Formu",
                "Banka Dökümü (Yıllık gider karşılandığına dair)"
            ],
            en: [
                "High School Diploma and Transcript",
                "IELTS 6.0+ (Academic)",
                "OSHC Health Insurance",
                "GTE (Genuine Temporary Entrant) Form",
                "Bank Statement (Proof that annual expenses are met)"
            ]
        }
    },
    "yuksek-lisans": {
        "polonya": {
            tr: [
                "Lisans Diploması ve Transkript (Apostilli)",
                "İngilizce Yeterlilik (IELTS 6.0-6.5)",
                "Hague Sözleşmesi Gereği Apostil Onayı",
                "Tıbbi Sağlık Sertifikası",
                "Diploma Denklik Dilekçesi (Gerekli durumlarda)"
            ],
            en: [
                "Bachelor's Diploma and Transcript (Apostilled)",
                "English Proficiency (IELTS 6.0-6.5)",
                "Apostille Approval as per Hague Convention",
                "Medical Health Certificate",
                "Diploma Recognition Petition (If necessary)"
            ]
        },
        "hollanda": {
            tr: [
                "Lisans Diploması (İlgili alanda)",
                "Niyet Mektubu ve CV",
                "Orientation Year (Zoekjaar) Başvuru Bilgilendirmesi",
                "İngilizce Yeterlilik (IELTS 6.5+)",
                "Banka Hesap Bakiyesi Kanıtı"
            ],
            en: [
                "Bachelor's Diploma (In the relevant field)",
                "Statement of Purpose and CV",
                "Orientation Year (Zoekjaar) Application Information",
                "English Proficiency (IELTS 6.5+)",
                "Proof of Bank Balance"
            ]
        },
        "amerika": {
            tr: [
                "Lisans Diploması (GPA 3.0+)",
                "IELTS 7.0 / TOEFL 100+ / Duolingo 120+",
                "GRE veya GMAT (Programına göre)",
                "3 Adet Akademik/Profesyonel Referans",
                "Sebebi Ziyaret (SOP) ve CV"
            ],
            en: [
                "Bachelor's Diploma (GPA 3.0+)",
                "IELTS 7.0 / TOEFL 100+ / Duolingo 120+",
                "GRE or GMAT (Depending on the program)",
                "3 Academic/Professional References",
                "Statement of Purpose (SOP) and CV"
            ]
        },
        "ingiltere": {
            tr: [
                "Lisans Diploması ve Transkript",
                "IELTS UKVI (Min 6.5)",
                "Niyet Mektubu (Kariyer hedefleri odaklı)",
                "Referans Mektupları (2 adet)",
                "Banka Bakiyesi (Ülkeden çıkış garantisi)"
            ],
            en: [
                "Bachelor's Diploma and Transcript",
                "IELTS UKVI (Min 6.5)",
                "Statement of Purpose (Focus on career goals)",
                "Reference Letters (2 pieces)",
                "Bank Balance (Guarantee of exit from the country)"
            ]
        },
        "italya": {
            tr: [
                "Lisans Diploması ve Transkript",
                "CIMEA veya Dichiarazione di Valore (DOV)",
                "Universitaly Kaydı",
                "Dil Belgesi (İngilizce B2 veya İtalyanca B2)",
                "Burs Başvurusu için ISEE-Parificato Belgesi"
            ],
            en: [
                "Bachelor's Diploma and Transcript",
                "CIMEA or Dichiarazione di Valore (DOV)",
                "Universitaly Registration",
                "Language Certificate (English B2 or Italian B2)",
                "ISEE-Parificato Document for Scholarship Application"
            ]
        }
    },
    "yurtdisinda-lise": {
        "isvicre": {
            tr: [
                "Son 3 Yılın Karneleri / Transkript",
                "Mülakat (Online veya Yüz yüze)",
                "Giriş Sınavları (Okula özel)",
                "Veli İzin Belgesi ve Muvafakatname",
                "Dil Seviye Belgesi (İngilizce/Fransızca/Almanca)"
            ],
            en: [
                "Report Cards / Transcript of the Last 3 Years",
                "Interview (Online or Face-to-Face)",
                "Entrance Exams (School-specific)",
                "Parental Consent and Muvafakatname",
                "Language Level Certificate (English/French/German)"
            ]
        },
        "ingiltere": {
            tr: [
                "Lise Transkripti",
                "IELTS UKVI (Akademik)",
                "A-Level veya GCSE Seçimi Taahhüdü",
                "Guardian (Vasi) Atama Belgesi",
                "Pasaport ve Vize Belgeleri"
            ],
            en: [
                "High School Transcript",
                "IELTS UKVI (Academic)",
                "A-Level or GCSE Selection Commitment",
                "Guardian Appointment Certificate",
                "Passport and Visa Documents"
            ]
        },
        "amerika": {
            tr: [
                "ELTiS Sınav Skoru (Exchange için)",
                "Sponsor ve Finansal Formlar",
                "SLEP veya Okulun Kendi Sınavı",
                "Aşı Takvimi ve Sağlık Formları",
                "Veli Muvafakatnamesi"
            ],
            en: [
                "ELTiS Exam Score (For Exchange)",
                "Sponsor and Financial Forms",
                "SLEP or School's Own Exam",
                "Vaccination Schedule and Health Forms",
                "Parental Consent"
            ]
        },
        "kanada": {
            tr: [
                "Transkript ve Mezuniyet Belgesi",
                "Study Permit ve CAQ (Quebec için gerekliyse)",
                "Vasi (Custodian) Tayini",
                "Ev Sahibi Aile (Homestay) Formları",
                "Öğrenci Niyet Mektubu"
            ],
            en: [
                "Transcript and Diploma",
                "Study Permit and CAQ (If required for Quebec)",
                "Custodian Appointment",
                "Homestay Forms",
                "Student Statement of Purpose"
            ]
        }
    }
};

