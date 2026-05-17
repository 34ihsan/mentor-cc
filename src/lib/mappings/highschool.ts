import { HighSchoolCategoryValue } from "./types";

export const highSchoolCategoryMap: Record<string, HighSchoolCategoryValue> = {
    "boarding": {
        title: "Klasik Yatılı Okullar (Boarding)",
        title_en: "Classic Boarding Schools",
        title_de: "Klassische Internatsschulen",
        desc: "Harry Potter filmlerinden aşina olduğumuz, kampüs içi konaklamalı eğitim kurumları. Akademik disiplin ve sosyal gelişimin zirvesi.",
        desc_en: "Campus-based educational institutions familiar from the Harry Potter films. The pinnacle of academic discipline and social development.",
        desc_de: "Vom Campus aus geführte Bildungseinrichtungen, die aus den Harry-Potter-Filmen bekannt sind. Der Höhepunkt akademischer Disziplin und sozialer Entwicklung.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200",
            intro: "Boarding School geleneği, sadece akademik başarıyı değil, karakter gelişimini de önceler. Öğrencilerimiz, dünyanın en prestijli üniversitelerine hazırlanırken aynı zamanda bağımsız yaşam becerileri ve küresel bir network kazanırlar. Mentor Career olarak, öğrencinin profiline en uygun akademik ve sosyal çevreyi sunan okulları birlikte seçiyoruz.",
            intro_en: "The Boarding School tradition prioritizes not only academic success but also character development. Our students gain independent living skills and a global network while preparing for the world's most prestigious universities. As Mentor Career, we select schools that offer the most suitable academic and social environment for the student's profile.",
            intro_de: "Die Internatstradition legt nicht nur Wert auf akademischen Erfolg, sondern auch auf die Charakterentwicklung. Unsere Schüler erwerben Fähigkeiten zum selbstständigen Leben und ein globales Netzwerk, während sie sich auf die renommiertesten Universitäten der Welt vorbereiten. Als Mentor Career wählen wir Schulen aus, die das am besten geeignete akademische und soziale Umfeld für das Profil des Schülers bieten.",
            stats: [
                { value: "%99", label: "Üniversite Başarısı", label_en: "University Success", label_de: "Studienerfolg" },
                { value: "10:1", label: "Eğitmen Oranı", label_en: "Teacher Ratio", label_de: "Lehrerquote" },
                { value: "24/7", label: "Kampüs Yaşamı", label_en: "Campus Life", label_de: "Campusleben" },
            ],
            costEstimates: [
                { region: "UK", usdPerYear: 38000, local: "£30,000-£45,000" },
                { region: "US", usdPerYear: 55000, local: "$45,000-$70,000" },
                { region: "Switzerland", usdPerYear: 90000, local: "CHF 60,000-120,000" },
            ],
            ageRange: "13-18",
            acceptanceRate: "10-30% (elit okullar için) - 40-70% (genel yatılı okullar)",
            dataSources: [
                { label: "Independent Schools Council (UK)", url: "https://www.isc.co.uk" },
                { label: "National Association of Independent Schools (US)", url: "https://www.nais.org" }
            ],
            features: [
                "24/7 Yüksek Güvenlik ve Uzman Pedagojik Gözetim",
                "Konforlu ve Modern Kampüs İçi Konaklama İmkanları",
                "Olimpik Yüzme Havuzları, Binicilik ve Profesyonel Sanat Atölyeleri",
                "Dünya Sıralamasındaki Üniversitelerle Köklü Akademik Bağlar",
                "Küçük Sınıf Mevcutları ve Birebir Akademik Mentorluk",
                "Liderlik ve Sosyal Sorumluluk Odaklı Kulüpler",
                "Uluslararası Çeşitlilik ve Global Arkadaşlık Ağı",
            ],
            features_en: [
                "24/7 High Security and Expert Pedagogical Supervision",
                "Comfortable and Modern On-Campus Accommodation Facilities",
                "Olympic Swimming Pools, Equestrianism, and Professional Art Workshops",
                "Strong Academic Links with World-Ranked Universities",
                "Small Class Sizes and One-on-One Academic Mentoring",
                "Leadership and Social Responsibility Focused Clubs",
                "International Diversity and Global Friendship Network",
            ],
            features_de: [
                "Sicherheit rund um die Uhr und fachkundige pädagogische Aufsicht",
                "Komfortable und moderne Unterbringungsmöglichkeiten auf dem Campus",
                "Olympische Schwimmbecken, Reiten und professionelle Kunstwerkstätten",
                "Starke akademische Verbindungen zu weltweit führenden Universitäten",
                "Kleine Klassengrößen und individuelle akademische Betreuung",
                "Auf Führung und soziale Verantwortung ausgerichtete Clubs",
                "Internationale Vielfalt und globales Freundschaftsnetzwerk",
            ],
            matchKeyword: "Boarding",
            advantages: [
                { title: "Kesintisiz Güvenli Kampüs", desc: "Öğrencilerin eğitim, spor ve sosyal hayatlarını bir arada geçirdiği tam korumalı kampüs ortamı." },
                { title: "Elit Network", desc: "Geleceğin liderleri ve global iş dünyasının çocuklarıyla kurulan ömür boyu sürecek dostluklar." },
                { title: "Bireysel Gelişim", desc: "Kendi ayakları üzerinde durmayı öğreten, sorumluluk bilincini geliştiren yatılı okul kültürü." },
            ],
            advantages_en: [
                { title: "24/7 Secure Campus", desc: "A fully protected campus environment where students spend their education, sports, and social lives together." },
                { title: "Elite Network", desc: "Lifelong friendships established with future leaders and the children of the global business world." },
                { title: "Individual Development", desc: "A boarding school culture that teaches how to stand on one's own feet and develops a sense of responsibility." },
            ],
            advantages_de: [
                { title: "Sicherer Campus rund um die Uhr", desc: "Eine vollgeschützte Campus-Umgebung, in der die Schüler ihre Ausbildung, ihren Sport und ihr soziales Leben gemeinsam verbringen." },
                { title: "Elitäres Netzwerk", desc: "Lebenslange Freundschaften mit zukünftigen Führungspersönlichkeiten und Kindern der globalen Geschäftswelt." },
                { title: "Individuelle Entwicklung", desc: "Eine Internatskultur, die lehrt, auf eigenen Füßen zu stehen und das Verantwortungsbewusstsein fördert." },
            ],
            process: [
                { title: "Okul ve Profil Analizi", desc: "Öğrencinin akademik geçmişi, ilgi alanları ve bütçesine en uygun okulların listelenmesi." },
                { title: "Portfolyo Hazırlığı", desc: "Referans mektupları, niyet mektubu ve sanatsal/sportif başarıların belgelenmesi." },
                { title: "Mülakat ve Kabul", desc: "Okul yetkilileri ile yapılacak görüşmelere hazırlık ve kabul sürecinin takibi." },
                { title: "Kayıt ve Oryantasyon", desc: "Eğitim kayıtsi işlemleri ve kampüs hayatına geçiş öncesi bilgilendirme seminerleri." },
            ],
            process_en: [
                { title: "School and Profile Analysis", desc: "Listing the schools most suitable for the student's academic background, interests, and budget." },
                { title: "Portfolio Preparation", desc: "Documentation of reference letters, letters of intent, and artistic/sporty achievements." },
                { title: "Interview and Admission", desc: "Preparation for meetings with school officials and monitoring the admission process." },
                { title: "Enrollment and Orientation", desc: "Educational enrollment procedures and information seminars before transitioning to campus life." },
            ],
            process_de: [
                { title: "Schul- und Profilanalyse", desc: "Auflistung der Schulen, die am besten zum akademischen Hintergrund, den Interessen und dem Budget des Schülers passen." },
                { title: "Portfolio-Vorbereitung", desc: "Dokumentation von Empfehlungsschreiben, Motivationsschreiben sowie künstlerischen/sportlichen Leistungen." },
                { title: "Interview und Zulassung", desc: "Vorbereitung auf Treffen mit Schulvertretern und Überwachung des Zulassungsprozesses." },
                { title: "Genehmigung und Orientierung", desc: "Bildungsgenehmigungsverfahren und Informationsseminare vor dem Übergang in das Campusleben." },
            ],
            faq: [
                { q: "Boarding okullarında tatillerde ne yapılıyor?", a: "Uzun tatillerde öğrenciler evlerine dönebilir veya okulun düzenlediği gezi programlarına katılabilirler." },
                { q: "Akademik destek sağlanıyor mu?", a: "Evet, her öğrencinin akademik başarısını takip eden 'house parent' ve ders öğretmenleri kampüste mevcuttur." },
            ],
            faq_en: [
                { q: "What is done during holidays in boarding schools?", a: "During long holidays, students can return home or participate in trip programs organized by the school." },
                { q: "Is academic support provided?", a: "Yes, 'house parents' and subject teachers who monitor each student's academic success are available on campus." },
            ],
            faq_de: [
                { q: "Was wird in den Ferien in Internatsschulen unternommen?", a: "In den langen Ferien können die Schüler nach Hause zurückkehren oder an von der Schule organisierten Ausflugsprogrammen teilnehmen." },
                { q: "Wird akademische Unterstützung angeboten?", a: "Ja, auf dem Campus stehen 'Hauseltern' und Fachlehrer zur Verfügung, die den akademischen Erfolg jedes Schülers überwachen." },
            ]
        }
    },
    "private-day": {
        title: "Özel Günübirlik Okullar (Private Day)",
        title_en: "Private Day Schools",
        title_de: "Private Tagesschulen",
        desc: "Seçkin ailelerin yanında kalarak o ülkenin kültürünü her an yaşama ve yerel hayata tam entegrasyon şansı sunan prestijli kolejler.",
        desc_en: "Prestigious colleges offering the chance to experience the country's culture 24/7 by staying with elite host families and full integration into local life.",
        desc_de: "Renommierte Colleges, die die Möglichkeit bieten, die Kultur des Landes rund um die Uhr zu erleben, indem sie bei elitären Gastfamilien übernachten und sich vollständig in das lokale Leben integrieren.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
            intro: "Private Day School programı, akademik kalitesi yüksek özel okullarda eğitim alırken, özenle seçilmiş ailelerin yanında kalarak kültürel daldırma (immersion) yaşamanızı sağlar. Bu program, hem özel okul disiplini hem de sıcak bir aile ortamı arayan öğrenciler için idealdir. Mentor Career, aile seçiminden okul uyumuna kadar tüm süreci titizlikle denetler.",
            intro_en: "The Private Day School program allows you to experience cultural immersion while studying at high-quality private schools and staying with carefully selected families. This program is ideal for students seeking both private school discipline and a warm family environment. Mentor Career meticulously supervises the entire process from family selection to school adjustment.",
            intro_de: "Das Private Day School-Programm ermöglicht es Ihnen, in die Kultur einzutauchen, während Sie an qualitativ hochwertigen Privatschulen studieren und bei sorgfältig ausgewählten Familien übernachten. Dieses Programm ist ideal für Schüler, die sowohl die Disziplin einer Privatschule als auch ein warmes Familienumfeld suchen. Mentor Career überwacht sorgfältig den gesamten Prozess von der Familienwahl bis zur Schulanpassung.",
            stats: [
                { value: "%95", label: "Aile Memnuniyeti", label_en: "Family Satisfaction", label_de: "Familienzufriedenheit" },
                { value: "15:1", label: "Sınıf Mevcudu", label_en: "Class Size", label_de: "Klassengröße" },
                { value: "Profesyonel", label: "Yerel Destek", label_en: "Local Support", label_de: "Lokale Unterstützung" },
            ],
            costEstimates: [
                { region: "UK/Europe", usdPerYear: 18000, local: "€15,000-€25,000" },
                { region: "US (Private Day)", usdPerYear: 25000, local: "$18,000-$35,000" }
            ],
            ageRange: "11-18",
            acceptanceRate: "30-60% (okula göre değişir)",
            dataSources: [
                { label: "Independent Schools Council (UK)", url: "https://www.isc.co.uk" },
                { label: "Council for American Private Education", url: "https://www.nacubo.org" }
            ],
            features: [
                "Güvenlik Taramasından Geçmiş Seçkin ve Sıcak Aile Yanı Konaklama",
                "Yerel Kültürü Yaşayarak ve Günlük Hayatın İçinde Konuşarak Öğrenme",
                "Boarding Okullarına Göre Daha Ekonomik ve Esnek Bütçe Seçenekleri",
                "Merkezi Şehir İçi veya Huzurlu Banliyö Lokasyon Alternatifleri",
                "Amerikan veya Kanada Lise Diploması ile Üniversiteye Hazırlık",
                "Okul Sonrası Yerel Kulüplere ve Toplumsal Etkinliklere Katılım",
                "Öğrencinin Beslenme ve Kişisel İhtiyaçlarına Duyarlı Aile Eşleşmesi",
            ],
            features_en: [
                "Elite and Warm Host Family Accommodation with Background Checks",
                "Learning Local Culture by Living and Speaking within Daily Life",
                "More Economical and Flexible Budget Options than Boarding Schools",
                "Central City or Peaceful Suburban Location Alternatives",
                "Preparation for University with a US or Canadian High School Diploma",
                "Participation in Local After-School Clubs and Community Events",
                "Family Matching Sensitive to Student's Dietary and Personal Needs",
            ],
            features_de: [
                "Unterbringung bei elitären und herzlichen Gastfamilien mit Sicherheitsüberprüfung",
                "Lokale Kultur durch Erleben und Sprechen im täglichen Leben lernen",
                "Günstigere und flexiblere Budgetoptionen als Internatsschulen",
                "Zentrale Stadt- oder friedliche Vorort-Standortalternativen",
                "Vorbereitung auf die Universität mit einem US- oder kanadischen Highschool-Diplom",
                "Teilnahme an lokalen außerschulischen Clubs und Gemeinschaftsveranstaltungen",
            ],
            matchKeyword: "Private",
            advantages: [
                { title: "Kültürel Entegrasyon", desc: "Yerel bir aile ile yaşayarak dili ve kültürü en doğal haliyle öğrenme fırsatı." },
                { title: "Özel Okul Standartları", desc: "Küçük sınıflar, modern laboratuvarlar ve yüksek akademik başarı odaklı eğitim." },
                { title: "Esneklik ve Destek", desc: "Öğrencinin ihtiyacına göre şekillenen aile ortamı ve okul seçimi özgürlüğü." },
            ],
            process: [
                { title: "Okul Başvurusu", desc: "Hedeflenen şehir ve okullara akademik başvuruların yapılması." },
                { title: "Aile Eşleşmesi", desc: "Öğrencinin hobileri, alerjileri ve tercihleri doğrultusunda aile profillerinin sunulması." },
                { title: "Kayıt ve Hazırlık", desc: "Kayıt randevusu, uçak bileti ve varış sonrası transfer organizasyonu." },
                { title: "Saha Desteği", desc: "Eğitim süresi boyunca öğrenciye destek verecek yerel koordinatör ataması." },
            ],
            faq: [
                { q: "Aileler nasıl seçiliyor?", a: "Tüm aileler adli sicil kaydı taraması, ev ziyareti ve referans kontrolünden geçmektedir." },
                { q: "Aile ile sorun yaşanırsa ne olur?", a: "Yerel koordinatörümüz sorunu çözmek için devreye girer, gerekirse aile değişikliği yapılır." },
            ]
        }
    },
    "exchange": {
        title: "Devlet Lise Değişim (Exchange)",
        title_en: "Public High School Exchange",
        title_de: "Staatliche Austauschprogramme",
        desc: "Amerikan Dışişleri Bakanlığı destekli kültürel değişim programları ile dünyanın kapılarını aralayın. Gönüllü ailelerin yanında kalarak gerçek bir yerel gibi yaşayın.",
        desc_en: "Open the doors of the world with cultural exchange programs supported by the U.S. Department of State. Live like a true local by staying with volunteer families.",
        desc_de: "Öffnen Sie die Türen zur Welt mit Kulturaustauschprogrammen, die vom US-Außenministerium unterstützt werden. Leben Sie wie ein echter Einheimischer, indem Sie bei Gastfamilien wohnen.",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1629360035258-2ccb13aa3679?auto=format&fit=crop&q=80&w=1200",
            intro: `
                <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Lise Değişim Programları: Kültür Elçisi Olmaya Hazır Mısınız?</h2>
                <p class="mb-6">Lise değişim programları (Exchange), öğrencilerin yurt dışındaki bir devlet lisesinde akademik bir yıl veya dönem geçirerek hem dil becerilerini mükemmelleştirdikleri hem de farklı bir kültürü en içten şekilde deneyimledikleri programlardır.</p>
                <p class="mb-6">Özellikle Amerika'daki J-1 programı, gönüllü host ailelerin yanında kalarak Amerikan lise hayatını bir yerel gibi yaşama şansı sunar. Bu deneyim, öğrencilere ömür boyu sürecek global bir vizyon ve eşsiz bir özgüven kazandırır.</p>

                <h3 class="text-2xl font-serif font-bold text-navy mb-4 mt-8 italic">Programın Öne Çıkan Özellikleri:</h3>
                <ul class="space-y-4 mb-10 italic text-zinc-600">
                    <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Devlet Destekli:</strong> Amerikan Dışişleri Bakanlığı onaylı, en ekonomik yurtdışı lise seçeneği.</li>
                    <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Gönüllü Aileler:</strong> Güvenlik taramasından geçmiş, sizi kendi çocukları gibi ağırlayacak host aileler.</li>
                </ul>
            `,
            intro_en: `
                <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">High School Exchange: Ready to Become a Cultural Ambassador?</h2>
                <p class="mb-6">High school exchange programs allow students to spend an academic year or semester in a public high school abroad, perfecting their language skills and experiencing a different culture in the most authentic way.</p>
                <p class="mb-6">Especially the J-1 program in the USA offers the chance to live American high school life like a local by staying with volunteer host families. This experience provides students with a lifelong global vision and unique self-confidence.</p>

                <h3 class="text-2xl font-serif font-bold text-navy mb-4 mt-8 italic">Program Highlights:</h3>
                <ul class="space-y-4 mb-10 italic text-zinc-600">
                    <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>State-Supported:</strong> The most economical study abroad option, approved by the U.S. Department of State.</li>
                    <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Volunteer Families:</strong> Host families who have passed security checks and will welcome you as one of their own.</li>
                </ul>
            `,
            intro_de: `
                <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Highschool-Austausch: Bereit, ein Kulturbotschafter zu werden?</h2>
                <p class="mb-6">Highschool-Austauschprogramme ermöglichen es Schülern, ein akademisches Jahr oder ein Semester an einer staatlichen Highschool im Ausland zu verbringen, ihre Sprachkenntnisse zu perfektionieren und eine andere Kultur auf authentischste Weise zu erleben.</p>
                <p class="mb-6">Insbesondere das J-1-Programm in den USA bietet die Möglichkeit, das amerikanische Highschool-Leben wie ein Einheimischer zu erleben, indem man bei freiwilligen Gastfamilien wohnt. Diese Erfahrung verleiht den Schülern eine lebenslange globale Vision und ein einzigartiges Selbstvertrauen.</p>

                <h3 class="text-2xl font-serif font-bold text-navy mb-4 mt-8 italic">Programm-Highlights:</h3>
                <ul class="space-y-4 mb-10 italic text-zinc-600">
                    <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Staatlich gefördert:</strong> Die kostengünstigste Option für einen Auslandsaufenthalt, genehmigt vom US-Außenministerium.</li>
                    <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Freiwillige Familien:</strong> Gastfamilien, die Sicherheitsüberprüfungen bestanden haben und Sie wie ein eigenes Familienmitglied aufnehmen werden.</li>
                </ul>
            `,
            stats: [
                { value: "J-1/F-1", label: "Kayıt Kategorileri", label_en: "Enrollment Categories", label_de: "Enrollmentkategorien" },
                { value: "15-18", label: "Yaş Aralığı", label_en: "Age Range", label_de: "Altersspanne" },
                { value: "%100", label: "Kültürel Uyum", label_en: "Cultural Integration", label_de: "Kulturelle Integration" },
                { value: "50+", label: "Eyalet Seçeneği", label_en: "State Options", label_de: "Bundesstaat-Optionen" },
            ],
            costEstimates: [
                { region: "US (Exchange)", usdPerYear: 8000, local: "$6,000-$12,000 (program ücreti)" },
                { region: "Other countries", usdPerYear: 3000, local: "€2,500-€5,000 (lojistik ve yerel harcamalar)" }
            ],
            ageRange: "15-18 (genelde 10-12. sınıflar)",
            acceptanceRate: "Program tipine göre değişir; J-1 sponsorlu programlarda başvuru kriterleri katı olabilir (20-60%)",
            dataSources: [
                { label: "U.S. Department of State - Exchange Visitor Program", url: "https://j1enrollment.state.gov" },
                { label: "AFS Intercultural Programs", url: "https://afs.org" }
            ],
            features: [
                "En Ekonomik Yurt Dışı Lise Seçeneği (Devlet Teşviki ile)",
                "Amerikan Dışişleri Bakanlığı Resmi Onaylı Program Standartları",
                "Gönüllü ve Özenle Seçilmiş Host Aile Yanında Tam Güvenli Konaklama",
                "Tam Akademik Yıl veya Dönemlik Esnek Alternatifler",
                "24/7 Yerel Koordinatör, Danışman ve Acil Durum Hattı Desteği",
                "Uluslararası Başarı Belgesi, Sertifikası ve Diploma Kazanımı İmkanı",
                "Dil Yeterliliği ve Kültürel Hazırlık Oryantasyon Seminerleri",
                "Üniversite Başvurularında 'Kültür Elçisi' Statüsü Avantajı",
            ],
            features_en: [
                "Most Economical Study Abroad Option (with Government Incentive)",
                "Official U.S. Department of State Approved Program Standards",
                "Fully Secure Accommodation with Volunteer and Carefully Selected Host Families",
                "Flexible Full Academic Year or Semester Alternatives",
                "24/7 Local Coordinator, Consultant, and Emergency Line Support",
                "International Achievement Certificate, Certification, and Diploma Opportunity",
                "Language Proficiency and Cultural Preparation Orientation Seminars",
                "Advantage of 'Cultural Ambassador' Status in University Applications",
            ],
            features_de: [
                "Kostengünstigste Option für ein Auslandsstudium (mit staatlichem Anreiz)",
                "Offizielle, vom US-Außenministerium genehmigte Programmstandards",
                "Vollständig sichere Unterbringung bei freiwilligen und sorgfältig ausgewählten Gastfamilien",
                "Flexible Alternativen für ein volles akademisches Jahr oder ein Semester",
                "24/7 Unterstützung durch lokale Koordinatoren, Berater und Notrufleitungen",
                "Internationales Leistungszertifikat, Zertifizierung und die Möglichkeit eines Diploms",
                "Orientierungsseminare zur Sprachkompetenz und kulturellen Vorbereitung",
                "Vorteil des Status eines 'Kulturbotschafters' bei Universitätsbewerbungen",
            ],
            matchKeyword: "Exchange",
            advantages: [
                { title: "Kültürel Derinlik", desc: "Bir yabancı gibi değil, bir yerel gibi yaşayarak o ülkenin diline ve kültürüne tam hakimiyet sağlarsınız." },
                { title: "Maliyet Avantajı", desc: "Devlet destekli programlar sayesinde özel okulların çok daha altında bir bütçe ile yurt dışında eğitim alabilirsiniz." },
                { title: "Gelecek Yatırımı", desc: "Üniversite başvurularında 'Exchange' öğrencisi olmak, sorumluluk sahibi ve dünyaya açık bir birey olduğunuzun en büyük kanıtıdır." },
            ],
            advantages_en: [
                { title: "Cultural Depth", desc: "You gain full mastery of the language and culture by living like a local, not just a visitor." },
                { title: "Cost Advantage", desc: "Thanks to state-supported programs, you can study abroad with a budget significantly lower than private schools." },
                { title: "Future Investment", desc: "Being an 'Exchange' student in university applications is the greatest proof of being responsible and open to the world." },
            ],
            advantages_de: [
                { title: "Kulturelle Tiefe", desc: "Sie erlangen die volle Beherrschung der Sprache und Kultur, indem Sie wie ein Einheimischer leben, nicht nur wie bir Besucher." },
                { title: "Kostenvorteil", desc: "Dank staatlich geförderter Programme können Sie im Ausland mit einem Budget studieren, das deutlich unter dem von Privatschulen liegt." },
                { title: "Zukunftsinvestition", desc: "Ein 'Exchange'-Student bei Universitätsbewerbungen zu sein, ist der beste Beweis dafür, verantwortungsbewusst und weltoffen zu sein." },
            ],
            process: [
                { title: "Başvuru ve Mülakat", desc: "Dil yeterliliğinizin ölçülmesi ve programa uygunluğunuzun belirlenmesi için yapılan ilk görüşmeler." },
                { title: "Dosya Hazırlığı", desc: "Akademik geçmişiniz, sağlık raporlarınız ve kendinizi anlatan tanıtım dosyasının oluşturulması." },
                { title: "Aile ve Okul Yerleşimi", desc: "Profilinize en uygun gönüllü host ailenin ve bölgedeki devlet lisesinin belirlenmesi." },
                { title: "Kayıt ve Oryantasyon", desc: "J-1 kayıt süreci yönetimi ve gitmeden önce alacağınız kapsamlı hazırlık eğitimleri." },
            ],
            process_en: [
                { title: "Application and Interview", desc: "Initial meetings to measure your language proficiency and determine your suitability for the program." },
                { title: "Dossier Preparation", desc: "Creation of a presentation file containing your academic background, health reports, and self-introduction." },
                { title: "Family and School Placement", desc: "Determining the volunteer host family and public high school in the region that best fits your profile." },
                { title: "Enrollment and Orientation", desc: "Management of the J-1 enrollment process and comprehensive preparatory training before departure." },
            ],
            process_de: [
                { title: "Bewerbung und Interview", desc: "Erste Gespräche zur Messung Ihrer Sprachkenntnisse und zur Feststellung Ihrer Eignung für das Programm." },
                { title: "Erstellung der Unterlagen", desc: "Erstellung einer Präsentationsdatei mit Ihrem akademischen Hintergrund, Gesundheitsberichten und einer Selbstvorstellung." },
                { title: "Familien- und Schulplatzierung", desc: "Bestimmung der freiwilligen Gastfamilie und der staatlichen Highschool in der Region, die am besten zu Ihrem Profil passt." },
                { title: "Genehmigung und Orientierung", desc: "Verwaltung des J-1-Genehmigungverfahrens und umfassende Vorbereitungsschulungen vor der Abreise." },
            ],
            faq: [
                { q: "Exchange programı için not ortalaması önemli mi?", a: "Evet, genellikle son 3 yılın ortalamasının 70 ve üzeri olması beklenir; ancak bireysel yetenekler de değerlendirilir." },
                { q: "Gideceğim eyaleti seçebilir miyim?", a: "Standart J-1 programında yerleşimler aile eşleşmesine göredir, ancak ek ücretlerle bölge tercihi yapılabilen opsiyonlar mevcuttur." },
                { q: "Program sonunda diploma alabilir miyim?", a: "Eğer 12. sınıfı yurt dışında okuyorsanız ve okulun gerekliliklerini yerine getiriyorsanız diploma alma şansınız yüksektir." },
            ],
            faq_en: [
                { q: "Is the GPA important for the exchange program?", a: "Yes, usually an average of 70 and above for the last 3 years is expected; however, individual talents are also evaluated." },
                { q: "Can I choose the state I will go to?", a: "In the standard J-1 program, placements are based on family matching, but options are available where regional preferences can be made with additional fees." },
                { q: "Can I get a diploma at the end of the program?", a: "If you are studying 12th grade abroad and meet the school's requirements, there is a high chance of getting a diploma." },
            ],
            faq_de: [
                { q: "Ist der Notendurchschnitt für das Austauschprogramm wichtig?", a: "Ja, in der Regel wird ein Durchschnitt von 70 und mehr in den letzten 3 Jahren erwartet; es werden jedoch auch individuelle Talente bewertet." },
                { q: "Kann ich den Bundesstaat wählen, in den ich gehe?", a: "Im Standard-J-1-Programm basieren die Platzierungen auf der Familienzusammenführung, es gibt jedoch Optionen, bei denen gegen Aufpreis regionale Präferenzen geäußert werden können." },
                { q: "Kann ich am Ende des Programms ein Diplom erhalten?", a: "Wenn Sie die 12. Klasse im Ausland besuchen und die Anforderungen der Schule erfüllen, besteht eine gute Chance, ein Diplom zu erhalten." },
            ]
        }
    },
    "ib-ap": {
        title: "IB & AP Diploma Programları",
        title_en: "IB & AP Diploma Programs",
        title_de: "IB & AP Diplomprogramme",
        desc: "Dünyanın en iyi üniversitelerine girişte altın anahtar niteliği taşıyan, akademik olarak zorlayıcı ve ödüllendirici müfredatlar.",
        desc_en: "Academically challenging and rewarding curricula that serve as a golden key to entering the world's best universities.",
        desc_de: "Akademisch anspruchsvolle und lohnende Lehrpläne, die als goldener Schlüssel zum Eintritt in die weltbesten Universitäten dienen.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200",
        details: {
            heroImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200",
            intro: "International Baccalaureate (IB) ve Advanced Placement (AP) programları, lise seviyesinde üniversite düzeyinde dersler almanızı sağlayan, akademik olarak en prestijli müfredatlardır. Bu diplomalar, Harvard ve Oxford gibi üniversitelerden kabul almanızı ve burs kazanmanızı kolaylaştırır. Mentor Career uzmanlığı ile akademik yol haritanızı en baştan doğru çiziyoruz.",
            intro_en: "International Baccalaureate (IB) and Advanced Placement (AP) programs are the most prestigious academic curricula that allow you to take university-level courses at the high school level. These diplomas make it easier to get accepted and win scholarships from universities like Harvard and Oxford. With Mentor Career expertise, we draw your academic roadmap correctly from the start.",
            intro_de: "International Baccalaureate (IB) und Advanced Placement (AP) Programme sind die angesehensten akademischen Lehrpläne, die es Ihnen ermöglichen, Kurse auf Universitätsniveau bereits in der High School zu belegen. Diese Diplome erleichtern die Zulassung und den Erhalt von Stipendien an Universitäten wie Harvard und Oxford. Mit der Expertise von Mentor Career erstellen wir von Anfang an Ihren akademischen Fahrplan richtig.",
            stats: [
                { value: "Global", label: "Geçerlilik", label_en: "Validity", label_de: "Gültigkeit" },
                { value: "Kredi", label: "Üniv. Saydırma", label_en: "Credit Transfer", label_de: "Anrechnung" },
                { value: "Elit", label: "Akademik Seviye", label_en: "Academic Level", label_de: "Akademisches Niveau" },
                { value: "60+", label: "Ülke Tanınırlığı", label_en: "Country Recognition", label_de: "Länderanerkennung" },
            ],
            costEstimates: [
                { region: "IB Diploma Programme (school fees)", usdPerYear: 18000, local: "$12,000-$25,000 (okula göre değişir)" },
                { region: "AP (course fees)", usdPerYear: 2000, local: "$500-$3,000 (sınav ve ders materyalleri)" }
            ],
            ageRange: "16-19 (yıl bazında 11-13 sınıflar)",
            acceptanceRate: "IB programına giriş okula göre değişir (selective - 20-60%)",
            dataSources: [
                { label: "International Baccalaureate Organization (IBO)", url: "https://ibo.org" },
                { label: "College Board - Advanced Placement", url: "https://apcentral.collegeboard.org" }
            ],
            features: [
                "Üst Düzey Eleştirel Düşünme, Yazma ve Araştırma Odaklı Eğitim",
                "Üniversite Birinci Sınıf Temel Derslerinden Muafiyet ve Kredi Kazanımı",
                "Global Üniversite Kabullerinde ve Burs Başvurularında En Büyük Avantaj",
                "Zengin, Çok Yönlü ve Kariyer Hedeflerine Uygun Ders Seçenekleri",
                "Theory of Knowledge (TOK), CAS ve Extended Essay (EE) Mentorluğu",
                "Uluslararası Bakalorya Standartlarında Global Sınav Hazırlığı",
                "Akademik Portfolyo Gelişimi ve Kariyer Danışmanlığı Desteği",
            ],
            features_en: [
                "High-Level Critical Thinking, Writing, and Research-Oriented Education",
                "Exemption from University Freshman Core Courses and Credit Acquisition",
                "Greatest Advantage in Global University Admissions and Scholarship Applications",
                "Rich, Versatile Course Options Suitable for Career Goals",
                "Theory of Knowledge (TOK), CAS, and Extended Essay (EE) Mentoring",
                "Global Exam Preparation in International Baccalaureate Standards",
                "Academic Portfolio Development and Career Counseling Support",
            ],
            features_de: [
                "Kritisches Denken, Schreiben und forschungsorientierte Bildung auf hohem Niveau",
                "Befreiung von Grundkursen im ersten Studienjahr und Erwerb von Leistungspunkten",
                "Größter Vorteil bei weltweiten Hochschulzulassungen und Stipendienbewerbungen",
                "Vielfältige, vielseitige Kursoptionen, die für Karriereziele geeignet sind",
                "Betreuung für Theory of Knowledge (TOK), CAS und Extended Essay (EE)",
                "Globale Prüfungsvorbereitung nach International Baccalaureate Standards",
                "Unterstützung bei der Entwicklung des akademischen Portfolios und der Berufsberatung",
            ],
            matchKeyword: "IB",
            advantages: [
                { title: "Akademik Rigor", desc: "Üniversite düzeyinde ders içeriği ile lisans eğitimine en güçlü hazırlık." },
                { title: "Üniversite Kredisi", desc: "Yüksek sınav skorları ile üniversitede ders muafiyeti ve kredi kazanımı." },
                { title: "Global Prestij", desc: "Dünyanın en seçkin üniversiteleri tarafından altın standart kabul edilen diploma." },
            ],
            process: [
                { title: "Akademik Değerlendirme", desc: "Öğrencinin mevcut not ortalaması ve yeteneklerine göre doğru programın seçimi." },
                { title: "Ders Seçimi Stratejisi", desc: "Üniversite hedeflerine uygun High Level (HL) ve Standard Level (SL) derslerinin belirlenmesi." },
                { title: "Kayıt ve Mentorluk", desc: "IB/AP okullarına kayıt süreci ve akademik takvim boyunca mentorluk desteği." },
                { title: "Sınav ve Üniversite Başvurusu", desc: "Final sınavları sonrası skorların üniversite kabullerine yansıtılması." },
            ],
            faq: [
                { q: "IB ve AP arasındaki fark nedir?", a: "IB bütünsel bir diploma programıyken, AP tekil ders bazlı sınavlara odaklanan bir sistemdir." },
                { q: "IB diploması her ülkede geçerli mi?", a: "Evet, IB diploması dünya genelinde 150'den fazla ülkede tanınan en prestijli belgedir." },
            ]
        }
    }
};
