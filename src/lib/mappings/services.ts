import { ServiceMapValue } from "./types";

export const serviceMap: Record<string, ServiceMapValue> = {
    "sinavlar": {
        category: "LANGUAGE_SCHOOL",
        title: "Sınavlar",
        title_en: "Exams",
        title_de: "Prüfungen",
        desc: "IELTS, TOEFL, SAT ve daha fazlası; global başarı için stratejik sınav hazırlık rehberliği.",
        desc_en: "IELTS, TOEFL, SAT and more; strategic exam preparation guidance for global success.",
        desc_de: "IELTS, TOEFL, SAT und mehr; strategische Prüfungsvorbereitungsberatung für globalen Erfolg.",
        categories: [
            { 
                slug: "ielts", 
                title: "IELTS", 
                title_en: "IELTS",
                title_de: "IELTS",
                desc: "Global geçerliliği olan, mülakat odaklı İngilizce yeterlilik sınavı.", 
                desc_en: "Interview-oriented English proficiency exam with global validity.",
                desc_de: "Intervieworientierter Englisch-Sprachtest mit globaler Gültigkeit.",
                iconKey: "Award" 
            },
            { 
                slug: "toefl", 
                title: "TOEFL iBT", 
                title_en: "TOEFL iBT",
                title_de: "TOEFL iBT",
                desc: "Akademik başarı için dünya çapında kabul gören internet tabanlı sınav.", 
                desc_en: "Worldwide recognized internet-based exam for academic success.",
                desc_de: "Weltweit anerkannter internetbasierter Test für akademischen Erfolg.",
                iconKey: "Globe" 
            },
            { 
                slug: "sat", 
                title: "Digital SAT", 
                title_en: "Digital SAT",
                title_de: "Digitaler SAT",
                desc: "ABD üniversite başvuruları için temel akademik yetkinlik testi.", 
                desc_en: "Basic academic competence test for US university applications.",
                desc_de: "Grundlegender akademischer Kompetenztest für US-Universitätsbewerbungen.",
                iconKey: "BookOpen" 
            },
            { 
                slug: "gre", 
                title: "GRE", 
                title_en: "GRE",
                title_de: "GRE",
                desc: "Lisansüstü eğitim başvurularında analitik ve sayısal yetenek ölçümü.", 
                desc_en: "Measurement of analytical and quantitative skills in graduate education applications.",
                desc_de: "Messung analytischer und quantitativer Fähigkeiten bei Bewerbungen für ein Postgraduiertenstudium.",
                iconKey: "GraduationCap" 
            },
            { 
                slug: "gmat", 
                title: "GMAT Focus Edition", 
                title_en: "GMAT Focus Edition",
                title_de: "GMAT Focus Edition",
                desc: "MBA ve işletme yüksek lisansı için stratejik karar verme testi.", 
                desc_en: "Strategic decision-making test for MBA and business masters.",
                desc_de: "Strategischer Entscheidungsfindungstest für MBA- und Business-Masterstudiengänge.",
                iconKey: "Briefcase" 
            }
        ]
    },
    "yurtdisi-yuksek-lisans": {
        category: "MASTER",
        title: "Yurtdışı Yüksek Lisans",
        title_en: "Master & Postgraduate",
        title_de: "Master & Postgraduiertenstudium",
        desc: "Kariyerinizi global bir boyuta taşımak için en prestijli yüksek lisans mentorluğu.",
        desc_en: "The most prestigious master's mentorship to take your career to a global dimension.",
        desc_de: "Das renommierteste Master-Mentoring, um Ihre Karriere auf eine globale Ebene zu heben.",
        categories: [
            { 
                slug: "mba",
                title: "MBA Programları", 
                title_en: "MBA Programs",
                title_de: "MBA-Programme",
                desc: "Global iş dünyasında liderlik rolleri için tasarlanmış prestijli işletme yüksek lisansı.", 
                desc_en: "Prestigious business master's designed for leadership roles in the global business world.",
                desc_de: "Renommierter Business-Master für Führungspositionen in der globalen Geschäftswelt.",
                iconKey: "Zap" 
            },
            { 
                slug: "msc",
                title: "Master of Science (MSc)", 
                title_en: "Master of Science (MSc)",
                title_de: "Master of Science (MSc)",
                desc: "Teknik ve bilimsel alanlarda derinlemesine uzmanlık sağlayan araştırma odaklı programlar.", 
                desc_en: "Research-oriented programs providing in-depth expertise in technical and scientific fields.",
                desc_de: "Forschungsorientierte Programme, die fundierte Expertise in technischen und wissenschaftlichen Bereichen vermitteln.",
                iconKey: "ShieldCheck" 
            },
            { 
                slug: "art",
                title: "Sanat & Tasarım Master", 
                title_en: "Art & Design Master",
                title_de: "Kunst & Design Master",
                desc: "Portfolyo odaklı, yaratıcı endüstrilerde sınıf atlatacak lisansüstü eğitimler.", 
                desc_en: "Portfolio-oriented graduate studies that will elevate you in creative industries.",
                desc_de: "Portfolio-orientierte Postgraduiertenstudiengänge, die Sie in der Kreativwirtschaft voranbringen.",
                iconKey: "Star" 
            }
        ]
    },
    "yurtdisi-lise": {
        category: "HIGH_SCHOOL",
        title: "Yurtdışı Lise",
        title_en: "High School Abroad",
        title_de: "Gymnasium im Ausland",
        desc: "Global bir geleceğin kapılarını, dünyanın en prestijli liselerinde aralayın.",
        desc_en: "Open the doors to a global future in the world's most prestigious high schools.",
        desc_de: "Öffnen Sie die Türen zu einer globalen Zukunft an den renommiertesten Gymnasien der Welt.",
        categories: [
            { 
                slug: "boarding", 
                title: "Klasik Yatılı Okullar (Boarding)", 
                title_en: "Classic Boarding Schools",
                title_de: "Klassische Internatsschulen",
                desc: "Harry Potter filmlerinden aşina olduğumuz, kampüs içi konaklamalı, spor ve sanatla iç içe.", 
                desc_en: "Familiar from Harry Potter films, campus residents, intertwined with sports and arts.",
                desc_de: "Bekannt aus den Harry-Potter-Filmen, Wohnen auf dem Campus, verbunden mit Sport und Kunst.",
                iconKey: "ShieldCheck" 
            },
            { 
                slug: "private-day", 
                title: "Özel Günübirlik Okullar (Private Day)", 
                title_en: "Private Day Schools",
                title_de: "Private Tagesschulen",
                desc: "Seçkin ailelerin yanında kalarak o ülkenin kültürünü günün her saati yaşama.", 
                desc_en: "Living the culture 24/7 by staying with elite host families.",
                desc_de: "Erleben Sie die Kultur rund um die Uhr bei elitären Gastfamilien.",
                iconKey: "Users" 
            },
            { 
                slug: "exchange", 
                title: "Devlet Lise Değişim (Exchange)", 
                title_en: "Public High School Exchange",
                title_de: "Staatliche Austauschprogramme",
                desc: "Amerikan Dışişleri Bakanlığı destekli kültürel değişim.", 
                desc_en: "Cultural exchange supported by the U.S. Department of State.",
                desc_de: "Kultureller Austausch, unterstützt vom US-Außenministerium.",
                iconKey: "Globe" 
            },
            { 
                slug: "ib-ap", 
                title: "IB & AP Diploma Programları", 
                title_en: "IB & AP Diploma Programs",
                title_de: "IB & AP Diplomprogramme",
                desc: "Dünyanın en iyi üniversitelerine girişte altın anahtar.", 
                desc_en: "The golden key to entering the world's best universities.",
                desc_de: "Der goldene Schlüssel zum Eintritt in die weltbesten Universitäten.",
                iconKey: "Award" 
            }
        ]
    },
    "yurtdisi-universite": {
        category: "UNIVERSITY",
        title: "Yurtdışı Üniversite",
        title_en: "University Abroad",
        title_de: "Universität im Ausland",
        desc: "Ivy League'den teknik üniversitelere, direkt yerleşim ve hazırlık programı alternatifleri.",
        desc_en: "From Ivy League to technical universities, alternatives for direct placement and foundation programs.",
        desc_de: "Von der Ivy League bis hin zu technischen Universitäten, Alternativen für Direktplatzierung und Vorbereitungsprogramme.",
        categories: [
            { 
                title: "Sıralama Odaklı (Top 100)", 
                title_en: "Ranking Oriented (Top 100)",
                title_de: "Ranking-orientiert (Top 100)",
                desc: "Ivy League, Russell Group ve dünya genelinde ilk 100'de yer alan üniversiteler.", 
                desc_en: "Ivy League, Russell Group, and universities ranked in the global top 100.",
                desc_de: "Ivy League, Russell Group und Universitäten, die in den weltweiten Top 100 gerankt sind.",
                iconKey: "Award" 
            },
            { 
                title: "Burs Garantili Programlar", 
                title_en: "Scholarship Guaranteed Programs",
                title_de: "Stipendium-Garantieprogramme",
                desc: "Akademik başarıya bağlı olarak okul ücretinden %20-%100 arası muafiyet.", 
                desc_en: "Exemption between 20%-100% of the tuition fee depending on academic success.",
                desc_de: "Befreiung von 20%-100% der Studiengebühren je nach akademischem Erfolg.",
                iconKey: "Zap" 
            },
            { 
                title: "Ücretsiz Devlet Üniversiteleri", 
                title_en: "Free Public Universities",
                title_de: "Kostenlose staatliche Universitäten",
                desc: "Almanya ve İtalya gibi ülkelerde, sadece yıllık katkı payı ile prestijli eğitim.", 
                desc_en: "Prestigious education in countries like Germany and Italy, with only an annual contribution fee.",
                desc_de: "Renommierte Ausbildung in Ländern wie Deutschland und Italien, mit nur einer jährlichen Studiengebühr.",
                iconKey: "Building2" 
            }
        ]
    },
    "yurtdisi-yaz-okullari": {
        category: "SUMMER_SCHOOL",
        title: "Yurtdışı Yaz Okulları",
        title_en: "Summer Schools Abroad",
        title_de: "Sommerschulen im Ausland",
        desc: "Dünyanın en prestijli kampüslerinde, akademik ve sosyal gelişimi birleştiren yaz programları.",
        desc_en: "Summer programs combining academic and social development on the world's most prestigious campuses.",
        desc_de: "Sommerprogramme, die akademische und soziale Entwicklung auf den renommiertesten Campus der Welt verbinden.",
        categories: [
            { 
                title: "Akademik Yaz Okulu", 
                title_en: "Academic Summer School",
                title_de: "Akademische Sommerschule",
                desc: "Üniversite kredisi kazandıran veya lise müfredatını güçlendiren yoğun akademik kamplar.", 
                desc_en: "Intensive academic camps that earn university credit or strengthen the high school curriculum.",
                desc_de: "Intensive akademische Camps, die Universitätscredits einbringen oder den Lehrplan des Gymnasiums stärken.",
                iconKey: "BookOpen" 
            },
            { 
                title: "Spor & Sanat", 
                title_en: "Sports & Arts",
                title_de: "Sport & Kunst",
                desc: "Elite kulüplerde futbol, tenis veya prestijli akademilerde görsel sanatlar.", 
                desc_en: "Football or tennis in elite clubs, or visual arts in prestigious academies.",
                desc_de: "Fußball oder Tennis in Elite-Clubs oder bildende Kunst an renommierten Akademien.",
                iconKey: "Star" 
            },
            { 
                title: "Dil & Aktivite", 
                title_en: "Language & Activity",
                title_de: "Sprache & Aktivität",
                desc: "Geleneksel yaz okulu formatında, yarım gün ders ve yarım gün kültürel gezi.", 
                desc_en: "In the traditional summer school format, half-day classes and half-day cultural tours.",
                desc_de: "Im traditionellen Sommerschulformat, halbtägiger Unterricht und halbtägige kulturelle Touren.",
                iconKey: "Palmtree" 
            }
        ]
    },
    "yurtdisi-dil-okullari": {
        category: "LANGUAGE_SCHOOL",
        title: "Yurtdışı Dil Okulları",
        title_en: "Language Schools Abroad",
        title_de: "Sprachschulen im Ausland",
        desc: "Kariyerinize global bir boyuta taşımak için en prestijli dil okulları.",
        desc_en: "The most prestigious language schools to take your career to a global dimension.",
        desc_de: "Die renommiertesten Sprachschulen, um Ihre Karriere auf eine globale Ebene zu heben.",
        categories: [
            { 
                title: "Genel İngilizce", 
                title_en: "General English",
                title_de: "Allgemeines Englisch",
                desc: "Günlük yaşamda akıcı iletişim kurmanızı sağlayacak temel dil eğitimi.", 
                desc_en: "Basic language training to provide fluent communication in daily life.",
                desc_de: "Grundlegendes Sprachtraining für flüssige Kommunikation im täglichen Leben.",
                iconKey: "Globe" 
            },
            { 
                title: "İş İngilizcesi (Business)", 
                title_en: "Business English",
                title_de: "Wirtschaftsenglisch",
                desc: "Kurumsal dünyada profesyonel sunum ve müzakere yeteneği.", 
                desc_en: "Professional presentation and negotiation skills in the corporate world.",
                desc_de: "Professionelle Präsentations- und Verhandlungsfähigkeiten in der Unternehmenswelt.",
                iconKey: "Zap" 
            },
            { 
                title: "Akademik Geçiş (Pathway)", 
                title_en: "Academic Pathway",
                title_de: "Akademischer Pathway",
                desc: "Üniversite kabulü için gereken dil seviyesine en hızlı şekilde ulaşın.", 
                desc_en: "Reach the language level required for university admission as quickly as possible.",
                desc_de: "Erreichen Sie so schnell wie möglich das für die Hochschulzulassung erforderliche Sprachniveau.",
                iconKey: "GraduationCap" 
            }
        ]
    },
    "kariyer": {
        category: "OTHER",
        title: "Kariyer",
        title_en: "Career",
        title_de: "Karriere",
        desc: "Almanya'da profesyonel bir gelecek için uzman yerleşim ve danışmanlık hizmetleri.",
        desc_en: "Expert placement and consultancy services for a professional future in Germany.",
        desc_de: "Kompetente Vermittlungs- und Beratungsleistungen für eine berufliche Zukunft in Deutschland.",
        categories: [
            { 
                slug: "yurtdisi-meslek-egitimi", 
                title: "Yurtdışı Meslek Eğitimi Danışmanlığı", 
                title_en: "Vocational Training Consultancy Abroad",
                title_de: "Beratung zur Berufsausbildung im Ausland",
                desc: "Yurtdışında mesleki eğitim (Ausbildung vb.) programları ile hem eğitim alıp hem gelir elde etmeniz için rehberlik.", 
                desc_en: "Guidance for vocational training programs abroad to study and earn an income simultaneously.",
                desc_de: "Beratung für Berufsausbildungsprogramme im Ausland, um gleichzeitig zu lernen und Geld zu verdienen.",
                iconKey: "GraduationCap",
                image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000"
            },
            { 
                slug: "uluslararasi-kariyer", 
                title: "Uluslararası Kariyer Danışmanlığı", 
                title_en: "International Career Consultancy",
                title_de: "Internationale Karriereberatung",
                desc: "Global iş dünyasında hedeflerinize ulaşmanız için stratejik kariyer planlaması ve iş arama supports.", 
                desc_en: "Strategic career planning and job search support to reach your goals in the global business world.",
                desc_de: "Strategische Karriereplanung und Unterstützung bei der Jobsuche, um Ihre Ziele in der globalen Geschäftswelt zu erreichen.",
                iconKey: "Globe",
                image: "https://images.unsplash.com/photo-1454165833767-027ee31bb267?q=80&w=2000"
            },
            { 
                slug: "profesyonel-cv", 
                title: "Profesyonel CV Oluşturma", 
                title_en: "Professional CV Creation",
                title_de: "Professionelle Lebenslauf-Erstellung",
                desc: "Uluslararası standartlara uygun, dikkat çekici ve etkili özgeçmiş ile niyet mektubu (cover letter) hazırlığı.", 
                desc_en: "Preparation of an impressive and effective CV and cover letter in accordance with international standards.",
                desc_de: "Erstellung eines beeindruckenden und effektiven Lebenslaufs und Anschreibens nach internationalen Standards.",
                iconKey: "FileText",
                image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2000"
            }
        ]
    }
};
