import { UniversityServiceDetail } from "@/lib/mappings";

export const universityServiceDetails: Record<string, UniversityServiceDetail> =
  {
    global_university: {
      overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Küresel Geleceğin Kapıları</h2>
            <p class="mb-6">Mentor Career ile yurt dışında üniversite eğitimi, sadece bir diploma değil, sınırların olmadığı bir hayatın kapısını aralamaktır. İngiltere'de 3 yılda mezun olup kariyere erken atılabilir, Amerika'da 'Liberal Arts' sistemiyle yeteneklerinizi keşfedebilir veya Almanya'da ücretsiz mühendislik eğitimi alabilirsiniz.</p>
            
            <h2 class="text-3xl font-serif font-bold text-navy mb-10 italic underline underline-offset-8 decoration-secondary/">Akademik Kabul Şartları (Ülke Bazlı)</h2>
            <div class="overflow-x-auto mb-10 border border-gold/10 shadow-sm">
                <table class="w-full text-left font-sans text-sm">
                    <thead class="bg-navy text-gold uppercase tracking-widest text-[10px]">
                        <tr>
                            <th class="p-6">Ülke</th>
                            <th class="p-6">Min. Not Ortalaması</th>
                            <th class="p-6">Dil Yeterliliği</th>
                            <th class="p-6">Giriş Şartı / Sınav</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gold/5 italic">
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">Almanya</td>
                            <td class="p-4">75 / 100</td>
                            <td class="p-4 text-gold">TestDaf 4 / IELTS 6.5</td>
                            <td class="p-4 font-bold text-navy">Üni. Yerleşme Şartı</td>
                        </tr>
                        <tr class="bg-gold/5 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold">İngiltere</td>
                            <td class="p-4">80 / 100</td>
                            <td class="p-4 text-gold">IELTS 6.0 - 6.5</td>
                            <td class="p-4">Doğrudan / Foundation</td>
                        </tr>
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">İtalya</td>
                            <td class="p-4">70 / 100</td>
                            <td class="p-4 text-gold">IELTS 6.0 / B2 İngilizce</td>
                            <td class="p-4">Merkezi Sınavlar (IMAT vb.)</td>
                        </tr>
                        <tr class="bg-gold/5 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold">Polonya / Macaristan</td>
                            <td class="p-4">65 / 100</td>
                            <td class="p-4 text-gold">IELTS 5.5 - 6.0</td>
                            <td class="p-4">Sınavsız / Mülakat</td>
                        </tr>
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">ABD / Kanada</td>
                            <td class="p-4">2.5 - 3.5 / 4.0</td>
                            <td class="p-4 text-gold">TOEFL 80+ / IELTS 6.5</td>
                            <td class="p-4">SAT/ACT Opsiyonel</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    `,
      overview_en: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Doors to a Global Future</h2>
            <p class="mb-6">University education abroad with Mentor Career is not just a diploma, but opening the door to a life without borders. You can graduate in 3 years in the UK and start your career early, discover your talents with the 'Liberal Arts' system in the USA, or receive free engineering education in Germany.</p>
            
            <h2 class="text-3xl font-serif font-bold text-navy mb-10 italic underline underline-offset-8 decoration-secondary/">Academic Entry Requirements (By Country)</h2>
            <div class="overflow-x-auto mb-10 border border-gold/10 shadow-sm">
                <table class="w-full text-left font-sans text-sm">
                    <thead class="bg-navy text-gold uppercase tracking-widest text-[10px]">
                        <tr>
                            <th class="p-6">Country</th>
                            <th class="p-6">Min. GPA</th>
                            <th class="p-6">Language Proficiency</th>
                            <th class="p-6">Entry Requirement / Exam</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gold/5 italic">
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">Germany</td>
                            <td class="p-4">75 / 100</td>
                            <td class="p-4 text-gold">TestDaf 4 / IELTS 6.5</td>
                            <td class="p-4 font-bold text-navy">University Placement Req.</td>
                        </tr>
                        <tr class="bg-gold/5 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold">United Kingdom</td>
                            <td class="p-4">80 / 100</td>
                            <td class="p-4 text-gold">IELTS 6.0 - 6.5</td>
                            <td class="p-4">Direct Entry / Foundation</td>
                        </tr>
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">Italy</td>
                            <td class="p-4">70 / 100</td>
                            <td class="p-4 text-gold">IELTS 6.0 / B2 English</td>
                            <td class="p-4">Centralized Exams (IMAT etc.)</td>
                        </tr>
                        <tr class="bg-gold/5 hover:bg-gold/10 transition-colors">
                            <td class="p-4 font-bold">Poland / Hungary</td>
                            <td class="p-4">65 / 100</td>
                            <td class="p-4 text-gold">IELTS 5.5 - 6.0</td>
                            <td class="p-4">No Exam / Interview</td>
                        </tr>
                        <tr class="hover:bg-gold/5 transition-colors">
                            <td class="p-4 font-bold">USA / Canada</td>
                            <td class="p-4">2.5 - 3.5 / 4.0</td>
                            <td class="p-4 text-gold">TOEFL 80+ / IELTS 6.5</td>
                            <td class="p-4">SAT/ACT Optional</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    `,
      advantages: [
        {
          title: "Sınavsız Geçiş",
          desc: "Türkiye'deki sınav puanı stresi olmadan, sadece lise başarınızla dünya devlerine kapı açın.",
        },
        {
          title: "Küresel Kariyer",
          desc: "Mezuniyet sonrası İngiltere, ABD ve Kanada gibi ülkelerde çalışma izni alarak kariyerinize başlayın.",
        },
        {
          title: "Ekonomik Seçenekler",
          desc: "Almanya'da ücretsiz eğitimden, ABD'deki burs imkanlarına kadar her bütçeye uygun çözümler.",
        },
      ],
      advantages_en: [
        {
          title: "Direct Acceptance",
          desc: "No exam stress. Secure placement in top 500 universities based on your GPA and language proficiency.",
        },
        {
          title: "Career Path",
          desc: "Gain post-study work permits (2-3 years) in the UK, USA, and Canada to build your global career.",
        },
        {
          title: "Cost Friendly",
          desc: "From free education in Germany to scholarship opportunities in the US, premium education is accessible.",
        },
      ],
      process: [
        {
          title: "Keşif ve Analiz",
          desc: "Akademik geçmişiniz ve hedeflerinize en uygun üniversite listesini oluşturuyoruz.",
        },
        {
          title: "Başvuru Yönetimi",
          desc: "Niyet mektubunuzdan referanslarınıza kadar tüm dosyanızı hatasız hazırlıyoruz.",
        },
        {
          title: "Kabul ve Kayıt",
          desc: "Üniversite kabulünüz sonrası kayıt işlemlerinizi kurum standartlarında düzenliyoruz.",
        },
      ],
      process_en: [
        {
          title: "Discovery",
          desc: "We analyze your academic background and goals to create a 'Best Fit' university list.",
        },
        {
          title: "Application",
          desc: "Professional management of your SOP, CV, and application forms to ensure error-free submission.",
        },
        {
          title: "Acceptance",
          desc: "Managing university offers and securing your spot.",
        },
      ],
      faq: [
        {
          q: "Yurt dışında üniversite okumak için sınav şart mı?",
          a: "Pek çok ülkede (Polonya, Macaristan, İtalya'nın bazı bölümleri) Türkiye'deki YKS sınav şartı aranmazken, Almanya gibi ülkelerde YKS sonucu gerekmektedir.",
        },
        {
          q: "Maliyetler ne kadardır?",
          a: "Almanya'da eğitim ücretsizdir (yıllık 300-500€ katkı payı), İngiltere ve ABD'de ise okul ücretleri 10.000£ - 40.000$ arasında değişebilir.",
        },
      ],
      faq_en: [
        {
          q: "Is an entrance exam required to study abroad?",
          a: "While many countries (Poland, Hungary, some parts of Italy) do not require a central exam from Turkey, countries like Germany require university placement results.",
        },
        {
          q: "What are the costs?",
          a: "Education is free in Germany (contribution fee of 300-500€ per year), while in the UK and USA, tuition fees range between 10.000£ and 40.000$.",
        },
      ],
      faq_de: [
        {
          q: "Ist eine Aufnahmeprüfung für ein Studium im Ausland erforderlich?",
          a: "In vielen Ländern (Polen, Ungarn, Teile Italiens) ist keine zentrale Prüfung aus der Türkei erforderlich, während Länder wie Deutschland die Ergebnisse einer Hochschulplatzierung verlangen.",
        },
        {
          q: "Wie hoch sind die Kosten?",
          a: "In Deutschland ist das Studium kostenlos (Semesterbeitrag von 300-500€ pro Jahr), während in Großbritannien und den USA die Studiengebühren zwischen 10.000£ und 40.000$ liegen.",
        },
      ],
    },
    global_masters: {
      overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Lisansüstü Başarı ve Kariyer Gelişimi</h2>
            <p class="mb-6">Yurt dışında yüksek lisans yaparak alanınızda uzmanlaşın. İngiltere, Almanya veya ABD'de profesyonel çalışma hakları kazanın ve uluslararası endüstri liderleriyle ağ kurun. İster akademik derinlik ister profesyonel ilerleme arıyor olun, sizin için doğru yolu buluyoruz.</p>

            <h3 class="text-2xl font-serif font-bold text-navy mb-10 italic underline underline-offset-8 decoration-secondary/">Mükemmelliğe Köprü: Foundation & Pre-Master</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Pre-Master Programları</h4>
                    <p class="text-sm opacity-80">Not ortalaması veya dil yeterliliği konusunda eksikleri olan öğrencilerin, yüksek lisansa başlamadan önce akademik açıklarını kapatmalarını sağlar. Bu programlar, başarıyla tamamlandığında prestijli üniversitelere girişi garanti eder.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Profesyonel Uzmanlaşma</h4>
                    <p class="text-sm opacity-80">Londra, Berlin veya Toronto gibi küresel pazarlarda rekabet etmek için gereken sektörel terminolojiyi ve endüstri odaklı becerileri kazanın.</p>
                </div>
            </div>
    `,
      overview_en: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Postgraduate Success & Career Growth</h2>
            <p class="mb-6">Specialize in your field with a Master's degree abroad. Gain professional work rights in the UK, Germany, or the USA and network with international industry leaders. Whether you seek academic depth or professional advancement, we have the right track for you.</p>

            <h3 class="text-2xl font-serif font-bold text-navy mb-10 italic underline underline-offset-8 decoration-secondary/">Bridge to Excellence: Foundation & Pre-Master</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Pre-Master Programs</h4>
                    <p class="text-sm opacity-80">Ideal for students who need to bridge the gap in their GPA or language proficiency before starting a full Master's degree. These programs guarantee entry to prestigious universities upon successful completion.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Professional Specialization</h4>
                    <p class="text-sm opacity-80">Gain the specific terminology and industry-relevant skills required to compete in global markets like London, Berlin, or Toronto.</p>
                </div>
            </div>
    `,
      advantages: [
        {
          title: "Derin Uzmanlaşma",
          desc: "Genel bilgilerden sıyrılıp endüstriye özel derin uzmanlık kazanın.",
        },
        {
          title: "Global Kariyer",
          desc: "Mezuniyet sonrası çalışma izinlerinden yararlanın ve dövizle kazanmaya başlayın.",
        },
        {
          title: "Alan Değiştirme",
          desc: "Farklı alanlardan (örn. IT veya İşletme) yüksek lisansa geçiş imkanı sunan 'Conversion' programları.",
        },
      ],
      advantages_en: [
        {
          title: "Deep Specialization",
          desc: "Move beyond general knowledge to industry-specific expertise.",
        },
        {
          title: "Global Career",
          desc: "Benefit from Post-Study Work (PSW) permits and earn in foreign currency.",
        },
        {
          title: "Conversion Options",
          desc: "Switch fields (e.g., to Data Science or MBA) with specialized conversion tracks.",
        },
      ],
      process: [
        {
          title: "Stratejik Planlama",
          desc: "Lisans diplomanıza en uygun ve kariyer hedeflerinizi destekleyen bölümleri belirliyoruz.",
        },
        {
          title: "Dosya Güçlendirme",
          desc: "Özellikle rekabetçi programlar için niyet mektubunuzu ve portfolyonuzu optimize ediyoruz.",
        },
        {
          title: "Başvuru ve Takip",
          desc: "Tüm yazışmaları ve belge doğrulamalarını sizin adınıza yönetiyoruz.",
        },
      ],
      process_en: [
        {
          title: "Strategy",
          desc: "Aligning your undergraduate degree with the best-ranking Master's options.",
        },
        {
          title: "Portfolio/SOP",
          desc: "Crafting a compelling narrative to secure admission in competitive programs.",
        },
        {
          title: "Application",
          desc: "Managing all institutional correspondence and document verification.",
        },
      ],
      faq: [
        {
          q: "Lisans bölümümden farklı bir alanda yüksek lisans yapabilir miyim?",
          a: "Evet, özellikle İngiltere ve ABD'de 'Conversion' programları ile alan değişikliği mümkündür.",
        },
        {
          q: "Yüksek lisans yaparken çalışabilir miyim?",
          a: "Pek çok ülkede haftada 20 saat yasal çalışma izniniz bulunmaktadır.",
        },
      ],
      faq_en: [
        {
          q: "Can I do a Master's in a different field than my Bachelor's?",
          a: "Yes, field changes are possible through 'Conversion' programs, especially in the UK and USA.",
        },
        {
          q: "Can I work while doing my Master's?",
          a: "In many countries, you have a legal right to work up to 20 hours per week.",
        },
      ],
      faq_de: [
        {
          q: "Kann ich einen Master in einem anderen Fach als meinen Bachelor machen?",
          a: "Ja, Fachwechsel sind durch 'Conversion'-Programme möglich, insbesondere in Großbritannien und den USA.",
        },
        {
          q: "Kann ich während meines Masterstudiums arbeiten?",
          a: "In vielen Ländern haben Sie das gesetzliche Recht, bis zu 20 Stunden pro Woche zu arbeiten.",
        },
      ],
    },
    global_masters_mba: {
      overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Global Liderlik İçin MBA</h2>
            <p class="mb-6">MBA (Master of Business Administration), kariyerini üst düzey yöneticiliğe taşımak isteyen profesyoneller için altın standarttır. Global iş ağlarına erişim sağlayın ve stratejik yönetim becerilerinizi geliştirin.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Networking</h4>
                    <p class="text-sm opacity-80">Dünya çapındaki liderlerle ve vizyoner girişimcilerle bağlantı kurun. MBA, sadece bir diploma değil, ömür boyu sürecek profesyonel bir ağdır.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Stratejik Liderlik</h4>
                    <p class="text-sm opacity-80">Karar alma süreçlerinde veri odaklı ve stratejik düşünme yetisi kazanın. Modern iş dünyasının karmaşık sorunlarına yenilikçi çözümler üretin.</p>
                </div>
            </div>
      `,
      overview_en: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">MBA for Global Leadership</h2>
            <p class="mb-6">The MBA (Master of Business Administration) is the gold standard for professionals looking to elevate their careers to executive levels. Gain access to global business networks and develop your strategic management skills.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Networking</h4>
                    <p class="text-sm opacity-80">Connect with global leaders and visionary entrepreneurs. An MBA is not just a degree, but a lifelong professional network.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Strategic Leadership</h4>
                    <p class="text-sm opacity-80">Gain the ability to think strategically and data-driven in decision-making processes. Create innovative solutions to complex problems in the modern business world.</p>
                </div>
            </div>
      `,
      advantages: [
        { title: "Yönetici Networking", desc: "Küresel ölçekte güçlü bir profesyonel çevre edinin." },
        { title: "Maaş Artışı", desc: "MBA mezunları genellikle mezuniyet sonrası belirgin bir gelir artışı yaşarlar." },
        { title: "Girişimcilik", desc: "Kendi işinizi kurmak için gereken tüm stratejik araçları öğrenin." }
      ],
      advantages_en: [
        { title: "Executive Networking", desc: "Build a powerful professional circle on a global scale." },
        { title: "Salary Growth", desc: "MBA graduates often experience a significant increase in income post-graduation." },
        { title: "Entrepreneurship", desc: "Learn all the strategic tools needed to start your own business." }
      ],
      process: [
        { title: "Profil Analizi", desc: "İş deneyiminizi ve akademik geçmişinizi en iyi MBA programlarıyla eşleştiriyoruz." },
        { title: "GMAT/GRE Desteği", desc: "Gereken sınavlar için hazırlık stratejileri geliştiriyoruz." },
        { title: "Mülakat Hazırlığı", desc: "Prestijli okulların mülakatları için simülasyonlar yapıyoruz." }
      ],
      process_en: [
        { title: "Profile Analysis", desc: "Matching your work experience and academic background with the best MBA programs." },
        { title: "GMAT/GRE Support", desc: "Developing preparation strategies for the required exams." },
        { title: "Interview Prep", desc: "Conducting simulations for interviews with prestigious schools." }
      ],
      faq: [
        { q: "İş deneyimi şart mı?", a: "Çoğu prestijli MBA programı 2-5 yıl arası iş deneyimi bekler, ancak 'Early Career' programları da mevcuttur." },
        { q: "MBA mi Yüksek Lisans mı?", a: "Yöneticilik hedefliyorsanız MBA, belirli bir teknik alanda derinleşmek istiyorsanız MSc tercih etmelisiniz." }
      ],
      faq_en: [
        { q: "Is work experience required?", a: "Most prestigious MBA programs expect 2-5 years of work experience, but 'Early Career' programs are also available." },
        { q: "MBA or Master's?", a: "Choose MBA if you aim for management; choose MSc if you want to deepen in a specific technical field." }
      ]
    },
    global_masters_msc: {
      overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Teknik Uzmanlık: Master of Science (MSc)</h2>
            <p class="mb-6">MSc programları, mühendislik, veri bilimi, ekonomi ve temel bilimlerde derinlemesine teknik bilgi sağlar. Araştırma odaklı yaklaşımıyla sizi endüstrinin en karmaşık teknik rollerine hazırlar.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Araştırma ve İnovasyon</h4>
                    <p class="text-sm opacity-80">En yeni teknolojiler ve metodolojilerle çalışarak alanınızdaki sınırları zorlayın. Laboratuvarlar ve araştırma merkezlerinde deneyim kazanın.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Analitik Derinlik</h4>
                    <p class="text-sm opacity-80">Karmaşık verileri analiz etme, problem çözme ve bilimsel raporlama konularında uzmanlaşın.</p>
                </div>
            </div>
      `,
      overview_en: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Technical Expertise: Master of Science (MSc)</h2>
            <p class="mb-6">MSc programs provide in-depth technical knowledge in engineering, data science, economics, and basic sciences. With a research-oriented approach, they prepare you for the most complex technical roles in the industry.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Research & Innovation</h4>
                    <p class="text-sm opacity-80">Push the boundaries in your field by working with the latest technologies and methodologies. Gain experience in labs and research centers.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Analytical Depth</h4>
                    <p class="text-sm opacity-80">Specialize in analyzing complex data, problem-solving, and scientific reporting.</p>
                </div>
            </div>
      `,
      advantages: [
        { title: "Teknik Uzmanlık", desc: "Alanınızdaki en güncel teknik becerilere ve araçlara hakim olun." },
        { title: "Akademik Kariyer", desc: "Doktora (PhD) programları için en güçlü temeli oluşturun." },
        { title: "Ar-Ge Fırsatları", desc: "Küresel şirketlerin araştırma-geliştirme departmanlarında tercih edilen aday olun." }
      ],
      advantages_en: [
        { title: "Technical Mastery", desc: "Master the most up-to-date technical skills and tools in your field." },
        { title: "Academic Path", desc: "Build the strongest foundation for PhD programs." },
        { title: "R&D Opportunities", desc: "Become a preferred candidate for research and development departments of global companies." }
      ],
      process: [
        { title: "Bölüm Seçimi", desc: "İlgi alanınıza ve lisans eğitiminize en uygun uzmanlık dalını belirliyoruz." },
        { title: "Akademik Portfolyo", desc: "Projeleriniz ve araştırmalarınızla öne çıkan bir başvuru dosyası hazırlıyoruz." },
        { title: "Lab & Araştırma Bağlantısı", desc: "Üniversitelerin araştırma olanaklarını ve hoca profillerini analiz ediyoruz." }
      ],
      process_en: [
        { title: "Specialization Choice", desc: "Determining the specialization branch that best suits your interests and Bachelor's education." },
        { title: "Academic Portfolio", desc: "Preparing an application file that highlights your projects and research." },
        { title: "Lab & Research Connection", desc: "Analyzing research facilities and professor profiles of universities." }
      ],
      faq: [
        { q: "MSc için GPA ne kadar önemli?", a: "MSc programları akademik başarıya MBA'den daha fazla önem verir; yüksek GPA bir avantajdır." },
        { q: "Tezli mi Tezsiz mi?", a: "Akademi düşünüyorsanız tezli, sektöre hızlı giriş yapmak istiyorsanız tezsiz programlar önerilir." }
      ],
      faq_en: [
        { q: "How important is GPA for MSc?", a: "MSc programs place more emphasis on academic success than MBA; a high GPA is a significant advantage." },
        { q: "Thesis or Non-Thesis?", a: "Thesis programs are recommended if you consider academia; non-thesis if you want a quick entry into the industry." }
      ]
    },
    global_masters_art: {
      overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Yaratıcı Vizyon: Sanat ve Tasarım Master</h2>
            <p class="mb-6">Yaratıcılığınızı global bir platformda sergileyin. Tasarım, moda, mimarlık ve güzel sanatlarda portfolyonuzu uluslararası standartlara taşıyın.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Stüdyo Odaklı Eğitim</h4>
                    <p class="text-sm opacity-80">Dünyaca ünlü tasarımcılarla ve sanatçılarla stüdyo ortamında bizzat çalışma şansı yakalayın.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Global Sergi ve Portfolyo</h4>
                    <p class="text-sm opacity-80">İşlerinizi Londra, Milano veya Paris gibi sanat başkentlerinde sergileme ve profesyonel bir portfolyo oluşturma imkanı.</p>
                </div>
            </div>
      `,
      overview_en: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Creative Vision: Master of Arts & Design</h2>
            <p class="mb-6">Showcase your creativity on a global platform. Bring your portfolio in design, fashion, architecture, and fine arts up to international standards.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Studio-Based Learning</h4>
                    <p class="text-sm opacity-80">Get the chance to work personally in a studio environment with world-renowned designers and artists.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3">Global Exhibition & Portfolio</h4>
                    <p class="text-sm opacity-80">Opportunity to exhibit your work in art capitals like London, Milan, or Paris and build a professional portfolio.</p>
                </div>
            </div>
      `,
      advantages: [
        { title: "Yaratıcı Network", desc: "Global moda evleri, galeriler ve tasarım ofisleri ile bağlantı kurun." },
        { title: "Uluslararası Sergi", desc: "Mezuniyet projelerinizle global sanat sahnesinde yer alın." },
        { title: "Tasarım Kültürü", desc: "Farklı kültürlerin tasarım dillerini yerinde öğrenin." }
      ],
      advantages_en: [
        { title: "Creative Network", desc: "Connect with global fashion houses, galleries, and design studios." },
        { title: "International Exhibition", desc: "Take your place on the global art scene with your graduation projects." },
        { title: "Design Culture", desc: "Learn the design languages of different cultures on-site." }
      ],
      process: [
        { title: "Portfolyo Kürasyonu", desc: "Mevcut işlerinizi en iyi şekilde sunacak profesyonel bir portfolyo hazırlıyoruz." },
        { title: "Sanatsal Mentorluk", desc: "Başvuru sürecinde vizyonunuzu geliştirecek mentorluk desteği sağlıyoruz." },
        { title: "Vize ve Konaklama", desc: "Sanat okullarının yoğun vize süreçlerini profesyonelce yönetiyoruz." }
      ],
      process_en: [
        { title: "Portfolio Curation", desc: "Preparing a professional portfolio that presents your current work in the best possible way." },
        { title: "Artistic Mentorship", desc: "Providing mentorship support to enhance your vision during the application process." },
        { title: "Visa & Accommodation", desc: "Professionally managing the intensive visa processes of art schools." }
      ],
      faq: [
        { q: "Portfolyo şart mı?", a: "Sanat ve tasarım programlarının %90'ı görsel veya işitsel bir portfolyo talep eder." },
        { q: "Dil şartı esnek mi?", a: "Sanat okullarında yetenek ön planda olsa da, temel bir dil yeterliliği (IELTS 6.0+) genellikle istenir." }
      ],
      faq_en: [
        { q: "Is a portfolio required?", a: "90% of art and design programs require a visual or auditory portfolio." },
        { q: "Is the language requirement flexible?", a: "While talent is paramount in art schools, a basic language proficiency (IELTS 6.0+) is usually required." }
      ]
    },

    almanya: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Almanya: Mühendislik ve İnovasyonun Küresel Üssü</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Almanya, dünyanın en gelişmiş sanayi ve teknoloji ülkelerinden biri olarak, öğrencilere devlet üniversitelerinde <strong>ücretsiz</strong> eğitim imkanı sunar. Sadece bir diploma değil, küresel iş dünyasında kapıları sonuna kadar açan "Made in Germany" prestijine sahip olursunuz.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Küresel Konum ve Gelecek</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Almanya, yüksek öğretim sistemindeki "Dual Eğitim" modeliyle teoriyi pratikle birleştiren dünya lideridir. <strong>Industry 4.0</strong> kavramının doğduğu yer olarak, özellikle yapay zeka, yeşil enerji ve ileri imalat teknolojilerinde geleceğin veri ve inovasyon merkezidir.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Mühendislikte Dünya İlk 3</li>
                  <li>• Araştırma & Geliştirme (Ar-Ge) Odağı</li>
                  <li>• Avrupa'nın Ekonomik Lokomotifi</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">İş Dünyası ve Kariyer</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Mezunlar; Mercedes, BMW, Siemens, SAP ve BASF gibi küresel devlerin yanı sıra, dünya lideri olan "Gizli Şampiyon" (Mittelstand) şirketlerinde kariyer yapma şansına sahiptir.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Mezuniyet Sonrası 18 Ay İş Arama İzni</li>
                  <li>• Dünyanın En Güçlü Ekonomik Entegrasyonu</li>
                  <li>• Yüksek Başlangıç Maaşları</li>
              </ul>
          </div>
      </div>

      <div class="p-8 rounded-3xl bg-gold/5 border border-gold/10 mb-12">
          <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Eğitim Sistemi ve Kabul</h3>
          <p class="text-sm text-zinc-600 leading-relaxed">Alman üniversite sistemi, akademik özgürlük ve derin araştırma üzerine kuruludur. Devlet üniversitelerinde harç yoktur, sadece sosyal katkı payı ödenir. Başvuru için Türkiye'de 4 yıllık bir bölüme yerleşmiş olmak temel şarttır.</p>
      </div>
    `,
      overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-secondary/ underline-offset-8">Free and World-Class Education in Germany</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Germany, as one of the world's most advanced industrial and technological countries, offers **free** education to students at public universities. It has world-leading universities not only in engineering but also in medicine, law, and social sciences.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Academic Requirements</h3>
              <ul class="space-y-3 italic text-sm text-zinc-500 leading-relaxed">
                  <li>• University placement in home country</li>
                  <li>• High School GPA of 75+ (recommended)</li>
                  <li>• German C1/B2 or English IELTS 6.5+</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2rem] bg-navy text-white">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Financial Requirements</h3>
              <ul class="space-y-3 italic text-sm text-zinc-300 leading-relaxed">
                  <li>• Annual tuition: €200 - €500 (per semester)</li>
                  <li>• Blocked Account: €11,904 (2024 current)</li>
                  <li>• Work Permit: 140 full days per year</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic underline decoration-secondary/ underline-offset-8">Kostenlose und erstklassige Ausbildung in Deutschland</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Deutschland bietet als eines der fortschrittlichsten Industrie- und Technologieländer der Welt Studierenden an staatlichen Universitäten eine **kostenlose** Ausbildung an. Es verfügt über weltweit führende Universitäten nicht nur im Ingenieurwesen, sondern auch in Medizin, Jura und Sozialwissenschaften.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademische Voraussetzungen</h3>
              <ul class="space-y-3 italic text-sm text-zinc-500 leading-relaxed">
                  <li>• Hochschulzugangsberechtigung (HZB)</li>
                  <li>• Notenschnitt von 75+ (empfohlen)</li>
                  <li>• Deutsch C1/B2 oder Englisch IELTS 6.5+</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2rem] bg-navy text-white">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Finanzielle Voraussetzungen</h3>
              <ul class="space-y-3 italic text-sm text-zinc-300 leading-relaxed">
                  <li>• Jährliche Gebühr: €200 - €500 (Semesterbeitrag)</li>
                  <li>• Sperrkonto: €11.904 (Stand 2024)</li>
                  <li>• Arbeitserlaubnis: 140 volle Tage pro Jahr</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Ücretsiz Eğitim",
          desc: "Devlet üniversitelerinde harç ödemeden dünya çapında geçerli bir diploma sahibi olun.",
        },
        {
          title: "18 Aylık Çalışma İzni",
          desc: "Mezuniyet sonrası Almanya'da kalarak kariyerinize başlama fırsatı.",
        },
        {
          title: "Yaşam Standartları",
          desc: "Öğrenciler için indirimli ulaşım ve sosyal imkanlar.",
        },
      ],
      advantages_en: [
        {
          title: "Free Education",
          desc: "Get a globally valid diploma without paying tuition fees at public universities.",
        },
        {
          title: "18-Month Work Permit",
          desc: "Opportunity to stay in Germany after graduation and start your career.",
        },
        {
          title: "Living Standards",
          desc: "Discounted transportation and social facilities for students.",
        },
      ],
      advantages_de: [
        {
          title: "Kostenloses Studium",
          desc: "Erhalten Sie ein weltweit gültiges Diplom ohne Studiengebühren an staatlichen Universitäten.",
        },
        {
          title: "18-monatige Arbeitserlaubnis",
          desc: "Möglichkeit, nach dem Abschluss in Deutschland zu bleiben und Ihre Karriere zu starten.",
        },
        {
          title: "Lebensstandard",
          desc: "Ermäßigte Transportmittel und soziale Einrichtungen für Studierende.",
        },
      ],
      process: [
        {
          title: "Ön Değerlendirme",
          desc: "Lise diplomanızın ve transkriptinizin Alman sistemine uygunluk analizi.",
        },
        {
          title: "Dil Eğitimi",
          desc: "Almanca veya İngilizce dil yeterliliğinin sağlanması.",
        },
        {
          title: "Kayıt İşlemleri",
          desc: "Bloke hesap ve kayıt dosyalarınızın profesyonelce hazırlanması.",
        },
      ],
      process_en: [
        {
          title: "Pre-Evaluation",
          desc: "Analysis of your high school diploma and transcript for compatibility with the German system.",
        },
        {
          title: "Language Training",
          desc: "Ensuring German or English language proficiency.",
        },
        {
          title: "Enrollment Process",
          desc: "Professional preparation of the blocked account and enrollment file.",
        },
      ],
      process_de: [
        {
          title: "Vorbewertung",
          desc: "Analyse Ihres Abiturs und Zeugnisses auf Kompatibilität mit dem deutschen System.",
        },
        {
          title: "Sprachtraining",
          desc: "Sicherstellung der deutschen oder englischen Sprachkenntnisse.",
        },
        {
          title: "Einschreibungsantrag",
          desc: "Professionelle Vorbereitung des Sperrkontos und der Genehmigungsunterlagen.",
        },
      ],
      faq: [
        {
          q: "Almanya'da İngilizce bölümler var mı?",
          a: "Evet, özellikle Master seviyesinde %100 İngilizce programlar oldukça yaygındır.",
        },
        {
          q: "Studienkolleg nedir?",
          a: "Lise diploması Abitur ile denk değilse geçilmesi gereken 1 yıllık hazırlık yılıdır.",
        },
      ],
      faq_en: [
        {
          q: "Are there English programs in Germany?",
          a: "Yes, especially at the Master's level, 100% English programs are common.",
        },
        {
          q: "What is Studienkolleg?",
          a: "It's a 1-year preparatory year if the high school diploma is not equivalent to Abitur.",
        },
      ],
      faq_de: [
        {
          q: "Gibt es englischsprachige Studiengänge?",
          a: "Ja, besonders auf Masterebene sind 100% englischsprachige Programme verbreitet.",
        },
        {
          q: "Was ist das Studienkolleg?",
          a: "Ein einjähriges Vorbereitungsjahr, falls das Reifezeugnis nicht dem Abitur entspricht.",
        },
      ],
      universities: [
        {
          slug: "tum-munich",
          name: "Technical University of Munich (TUM)",
          ranking: "#1 in Germany",
          worldRanking: "#37 Global",
          annualTuition: "Free (Social Fee: €85/sem)",
          highlights: [
            "Mühendislik ve Teknoloji Lideri",
            "Girişimcilik Odaklı",
            "Sanayi İşbirlikleri",
          ],
          departments: ["Makine Mühendisliği", "Bilişim", "İşletme", "Fizik"],
          detailedDescription: `
          <div class="space-y-8">
            <p class="text-lg leading-relaxed text-zinc-600">Technical University of Munich (TUM), Avrupa'nın en iyi teknik üniversitelerinden biri olarak kabul edilir. "Girişimci Üniversite" vizyonuyla, akademik mükemmelliği pratik uygulama ve teknoloji transferiyle birleştirir.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <span class="block text-2xl font-bold text-navy mb-1">17</span>
                <span class="text-xs text-zinc-500 uppercase tracking-widest">Nobel Ödülü</span>
              </div>
              <div class="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <span class="block text-2xl font-bold text-navy mb-1">%34</span>
                <span class="text-xs text-zinc-500 uppercase tracking-widest">Uluslararası Öğrenci</span>
              </div>
              <div class="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <span class="block text-2xl font-bold text-navy mb-1">800+</span>
                <span class="text-xs text-zinc-500 uppercase tracking-widest">Startup Yılda</span>
              </div>
            </div>
            <h3 class="text-2xl font-serif font-bold text-navy italic">Neden TUM?</h3>
            <p class="text-zinc-600">TUM, BMW, Siemens ve Audi gibi devlerle olan yakın işbirlikleri sayesinde öğrencilerine benzersiz staj ve kariyer imkanları sunar. Münih'teki teknoloji ekosisteminin merkezinde yer alan üniversite, özellikle yapay zeka ve havacılık alanlarında dünya lideridir.</p>
          </div>
        `,
        },
        {
          slug: "lmu-munich",
          name: "LMU Munich",
          ranking: "#2 in Germany",
          worldRanking: "#54 Global",
          annualTuition: "Free (Social Fee: €85/sem)",
          highlights: [
            "Köklü Geçmiş",
            "Araştırma Odaklı",
            "Sosyal Bilimlerde Öncü",
          ],
          departments: ["Tıp", "Hukuk", "Ekonomi", "Psikoloji"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Ludwig Maximilian University of Munich (LMU), 1472 yılında kurulmuş olup Avrupa'nın en prestijli araştırma üniversitelerinden biridir. Rönesans'tan günümüze uzanan entelektüel bir gelenekle, tıp ve doğa bilimlerinden sosyal bilimlere kadar geniş bir yelpazede dünya lideridir.</p>
            <p class="text-zinc-600">Üniversite, 43 Nobel Ödülü sahibi mezunu ve akademisyeni ile akademik mükemmeliyetin simgesidir. Münih'in kalbinde yer alan kampüsü, öğrencilere zengin bir kültürel ve akademik yaşam sunar.</p>
          </div>
        `,
        },
        {
          slug: "heidelberg-university",
          name: "Heidelberg University",
          ranking: "#3 in Germany",
          worldRanking: "#87 Global",
          annualTuition: "€1,500 / sem (Non-EU)",
          highlights: [
            "Almanya'nın En Eski Üniversitesi",
            "Tıp ve Yaşam Bilimleri",
          ],
          departments: ["Tıp", "Biyobilimler", "Felsefe", "Hukuk"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">1386 yılında kurulan Ruprecht Karls University Heidelberg, Almanya'nın en eski üniversitesidir. Tıp, biyoloji ve genetik alanlarında dünya çapında bir otorite olarak kabul edilen üniversite, "Alman Mükemmeliyet Üniversitesi" unvanına sahiptir.</p>
            <p class="text-zinc-600">Romantik şehriyle bütünleşen kampüs, Nobel ödüllü araştırmacıların yetiştiği ilham verici bir ortam sunar. Özellikle kanser araştırmaları ve yaşam bilimlerinde Avrupa'nın en önemli merkezlerinden biridir.</p>
          </div>
        `,
        },
        {
          slug: "rwth-aachen",
          name: "RWTH Aachen University",
          ranking: "Elite Technical",
          worldRanking: "#106 Global",
          annualTuition: "Free (Social Fee: €300/sem)",
          highlights: [
            "Avrupa'nın En İyi Mühendislik Okullarından",
            "Sanayi Devleriyle Ortaklık",
          ],
          departments: [
            "Makine Mühendisliği",
            "Elektrik-Elektronik",
            "İnşaat Mühendisliği",
            "Bilgisayar Bilimleri",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">RWTH Aachen University, Almanya'nın "MIT'si" olarak bilinir. Mühendislik ve teknoloji alanında sanayi ile olan derin bağları sayesinde, mezunları küresel otomotiv ve teknoloji şirketleri tarafından en çok tercih edilen mühendislerdir.</p>
            <p class="text-zinc-600">Aachen şehri, Belçika ve Hollanda sınırında yer alarak öğrencilere çok uluslu bir vizyon kazandırır. Üniversitenin devasa kampüsü, en son teknolojiye sahip laboratuvarlar ve test merkezleriyle donatılmıştır.</p>
          </div>
        `,
        },
        {
          slug: "humboldt-berlin",
          name: "Humboldt University of Berlin",
          ranking: "Elite Research",
          worldRanking: "#120 Global",
          annualTuition: "Free (Social Fee: €315/sem)",
          highlights: [
            "Modern Üniversite Modelinin Kurucusu",
            "Sosyal Bilimlerde Dünya Devlerinden",
          ],
          departments: ["Sosyal Bilimler", "Beşeri Bilimler", "Tıp", "Tarım"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Humboldt Üniversitesi, modern araştırma üniversitesi modelinin (Humboldtian model) doğduğu yerdir. Albert Einstein ve Max Planck gibi dâhilerin eğitim gördüğü bu kurum, Berlin'in merkezinde entelektüel bir devdir.</p>`,
        },
        {
          slug: "fu-berlin",
          name: "Free University of Berlin",
          ranking: "Global Research",
          worldRanking: "#98 Global",
          annualTuition: "Free (Social Fee: €312/sem)",
          highlights: [
            "Uluslararası Ağların Merkezi",
            "Siyaset Biliminde Zirve",
          ],
          departments: [
            "Siyaset Bilimi",
            "Uluslararası İlişkiler",
            "Edebiyat",
            "Doğa Bilimleri",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Soğuk Savaş döneminde özgür akademik düşünceyi savunmak için kurulan FU Berlin, bugün uluslararası işbirlikleri ve disiplinlerarası araştırmalarıyla tanınan küresel bir prestij noktasıdır.</p>`,
        },
        {
          slug: "kit-karlsruhe",
          name: "Karlsruhe Institute of Technology (KIT)",
          ranking: "Technical Leader",
          worldRanking: "#119 Global",
          annualTuition: "€1,500 / sem (Non-EU)",
          highlights: [
            "Almanya'nın En İyi Bilişim Üniversitesi",
            "İnovasyon ve Girişimcilik",
          ],
          departments: [
            "Bilgisayar Mühendisliği",
            "Fizik",
            "Enerji Teknolojileri",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">KIT, mühendislik ve bilişim alanında Almanya'nın en güçlü kurumlarından biridir. Bir araştırma merkezi ve bir üniversitenin birleşimi olan KIT, öğrencilere gerçek dünya projelerinde yer alma imkanı sunar.</p>`,
        },
        {
          slug: "uni-bonn",
          name: "University of Bonn",
          ranking: "#9 in Germany",
          worldRanking: "#239 Global",
          annualTuition: "Free (Social Fee: €300/sem)",
          highlights: [
            "Ekonomi ve Matematikte Dünya Çapında",
            "Sürdürülebilirlik Araştırmaları",
          ],
          departments: ["Matematik", "Ekonomi", "Fizik", "Coğrafya"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Bonn Üniversitesi, özellikle matematik ve ekonomi alanlarında kazandığı Nobel ödülleriyle ünlüdür. Birleşmiş Milletler kuruluşlarına ev sahipliği yapan Bonn'da, küresel meselelere odaklı bir eğitim sunar.</p>`,
        },
        {
          slug: "uni-freiburg",
          name: "University of Freiburg",
          ranking: "Top Research",
          worldRanking: "#189 Global",
          annualTuition: "€1,500 / sem (Non-EU)",
          highlights: [
            "Beşeri Bilimlerde Güçlü Gelenek",
            "Yaşam Bilimleri Laboratuvarları",
          ],
          departments: ["Tıp", "Hukuk", "Biyoloji", "Çevre Bilimleri"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Kara Ormanlar'ın kıyısında yer alan Freiburg Üniversitesi, tıp ve hukuk alanlarındaki köklü geçmişiyle bilinir. Sürdürülebilirlik ve çevre bilimi konularında Almanya'nın "Yeşil Başkenti" olan şehirle bütünleşik bir eğitim sunar.</p>`,
        },
        {
          slug: "tu-berlin",
          name: "Technical University of Berlin (TU Berlin)",
          ranking: "Top Technical",
          worldRanking: "#154 Global",
          annualTuition: "Free (Social Fee: €310/sem)",
          highlights: [
            "Mühendislik ve Mimarlıkta Öncü",
            "Berlin Teknoloji Ekosistemi",
          ],
          departments: [
            "Makine Mühendisliği",
            "Mimarlık",
            "Bilgisayar Bilimleri",
            "Ulaşım",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">TU Berlin, başkentin kalbinde yer alan, inovasyonun ve startup kültürünün merkezinde bir universitydir. Özellikle havacılık, uzay ve enerji sistemleri araştırmalarında küresel bir prestije sahiptir.</p>`,
        },
        {
          slug: "uni-goettingen",
          name: "University of Göttingen",
          ranking: "Classic Excellence",
          worldRanking: "#232 Global",
          annualTuition: "Free (Social Fee: €350/sem)",
          highlights: [
            "Matematik ve Fiziğin Tarihi Merkezi",
            "40+ Nobel Ödülü",
          ],
          departments: ["Matematik", "Fizik", "Biyoloji", "Tarım"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Gauss, Riemann ve Hilbert gibi devlerin izinde eğitim veren Göttingen, matematik ve doğa bilimlerinin tarihi başkentidir. Bugün de biyolojik çeşitlilik ve tarım bilimlerinde Avrupa'nın en önemli merkezlerindendir.</p>`,
        },
        {
          slug: "uni-hamburg",
          name: "University of Hamburg",
          ranking: "Comprehensive Research",
          worldRanking: "#205 Global",
          annualTuition: "Free (Social Fee: €330/sem)",
          highlights: [
            "İklim ve Deniz Araştırmalarında Lider",
            "Kozmopolit Kampüs",
          ],
          departments: ["Hukuk", "Ekonomi", "İklim Bilimi", "Medya"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Almanya'nın en büyük liman şehrinde yer alan Hamburg Üniversitesi, iklim değişikliği ve okyanus araştırmalarında dünya lideridir. Medya ve hukuk bölümleri ise ulusal düzeyde en prestijli programlar arasındadır.</p>`,
        },
        {
          slug: "goethe-frankfurt",
          name: "Goethe University Frankfurt",
          ranking: "Finance Hub",
          worldRanking: "#301 Global",
          annualTuition: "Free (Social Fee: €360/sem)",
          highlights: ["Finans ve Ekonomide Zirve", "Modern Hukuk Eğitimi"],
          departments: ["Finans", "Ekonomi", "Hukuk", "Psikoloji"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Frankfurt, Avrupa'nın finans kalbidir ve Goethe Üniversitesi bu ekosistemin tam merkezindedir. Avrupa Merkez Bankası ve dev bankalarla olan işbirlikleri, öğrencilere eşsiz kariyer kapıları açar.</p>`,
        },
        {
          slug: "uni-tuebingen",
          name: "University of Tübingen",
          ranking: "Top Medical & Humanities",
          worldRanking: "#213 Global",
          annualTuition: "€1,500 / sem (Non-EU)",
          highlights: [
            "Tıp ve İlahiyat Alanında Dünya Markası",
            "Yapay Zeka ve Cyber Valley",
          ],
          departments: ["Tıp", "İlahiyat", "Felsefe", "Bilgisayar Bilimleri"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Tübingen, klasik bilimlerdeki derinliğini modern yapay zeka araştırmalarıyla birleştiren bir "Bilim Şehri"dir. Cyber Valley projesi ile Amazon ve Google gibi devlerin araştırma partneridir.</p>`,
        },
        {
          slug: "tu-dresden",
          name: "Technical University of Dresden",
          ranking: "Excellence University",
          worldRanking: "#193 Global",
          annualTuition: "Free (Social Fee: €280/sem)",
          highlights: [
            "Mikroelektronikte Avrupa'nın Kalbi",
            "Mükemmeliyet Grubu Üyesi",
          ],
          departments: [
            "Elektrik-Elektronik",
            "Malzeme Bilimi",
            "Bilgisayar Bilimleri",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Dresden, "Silicon Saxony" olarak bilinen teknoloji bölgesinin kalbidir. TU Dresden, mikroelektronik ve nano-teknoloji alanlarında Avrupa'nın en gelişmiş laboratuvarlarına ev sahipliği yapar.</p>`,
        },
        {
          slug: "uni-mannheim",
          name: "University of Mannheim",
          ranking: "#1 in Business/Economics",
          worldRanking: "#454 Global",
          annualTuition: "€1,500 / sem (Non-EU)",
          highlights: [
            "Almanya'nın En İyi İşletme Okulu",
            "Ekonomide Tartışmasız Lider",
          ],
          departments: ["İşletme", "Ekonomi", "Siyaset Bilimi", "Psikoloji"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Mannheim Üniversitesi, "Almanya'nın Harvard'ı" olarak adlandırılan işletme programıyla ünlüdür. Barok sarayı içinde yer alan kampüsü, Avrupa'nın en prestijli ekonomi diplomasını sunar.</p>`,
        },
        {
          slug: "uni-cologne",
          name: "University of Cologne",
          ranking: "Top Comprehensive",
          worldRanking: "#285 Global",
          annualTuition: "Free (Social Fee: €310/sem)",
          highlights: ["Devasa Öğrenci Ağı", "Ekonomi ve Hukukta Öncü"],
          departments: ["Ekonomi", "Hukuk", "Eğitim", "Psikoloji"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Köln Üniversitesi, 50.000'den fazla öğrencisiyle Almanya'nın en büyük akademik merkezlerinden biridir. Medya ve ticaret şehri Köln'ün sağladığı geniş staj imkanları, mezunlarına büyük avantaj sağlar.</p>`,
        },
        {
          slug: "uni-muenster",
          name: "University of Münster",
          ranking: "Top Research",
          worldRanking: "#320 Global",
          annualTuition: "Free (Social Fee: €305/sem)",
          highlights: [
            "Hukuk ve Sosyal Bilimlerde Güçlü",
            "Bisiklet Şehri Kampüsü",
          ],
          departments: ["Hukuk", "İlahiyat", "Kimya", "İletişim Bilimleri"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Münster, Almanya'nın "Öğrenci Şehri" olarak bilinir. Üniversite, özellikle kimya ve nanobilim alanlarında son yıllarda büyük atılımlar yaparak Avrupa'nın en önemli araştırma merkezlerinden biri haline gelmiştir.</p>`,
        },
        {
          slug: "charite-berlin",
          name: "Charité – Universitätsmedizin Berlin",
          ranking: "#1 in Medicine (Europe)",
          worldRanking: "#12 Global (Medicine)",
          annualTuition: "Free (Social Fee: €315/sem)",
          highlights: [
            "Avrupa'nın En Büyük Tıp Fakültesi",
            "Nobel Ödüllü Tıp Tarihi",
          ],
          departments: [
            "Tıp",
            "Diş Hekimliği",
            "Nörobilim",
            "Moleküler Biyoloji",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Charité, Berlin'in ve Avrupa'nın tıp alanındaki amiral gemisidir. Dünyanın en gelişmiş araştırma hastanelerinden biri olarak, tıp öğrencilerinin en üst düzey klinik eğitimi almasını sağlar.</p>`,
        },
        {
          slug: "uni-ulm",
          name: "Ulm University",
          ranking: "Top Young University",
          worldRanking: "#351 Global",
          annualTuition: "€1,500 / sem (Non-EU)",
          highlights: [
            "Einstein'ın Doğduğu Şehir",
            "Tıp ve Mühendislik Entegrasyonu",
          ],
          departments: ["Tıp", "Elektrik Mühendisliği", "Matematik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Ulm Üniversitesi, nispeten genç bir kurum olmasına rağmen tıp ve mühendislik alanındaki başarılarıyla dünya sıralamalarında hızla yükselmektedir. Sanayi şehri Ulm'ün teknoloji parklarıyla iç içe bir eğitim modeli sunar.</p>`,
        },
      ],
    },
    ingiltere: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İngiltere: Akademik Mükemmellik ve Küresel Liderlik</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Dünyanın en prestijli üniversitelerine ev sahipliği yapan İngiltere, yüzyıllara dayanan akademik geleneği modern inovasyonla birleştirir. 3 yıllık lisans ve 1 yıllık yüksek lisans sistemiyle zaman ve maliyet avantajı sunar.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Küresel Prestij</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Oxford ve Cambridge gibi kurumlarla dünya sıralamalarını domine eden İngiltere, araştırma kalitesi ve mezun istihdam edilebilirliğinde küresel liderdir.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Dünya İlk 10'da 4 Üniversite</li>
                  <li>• Küresel Diplomasi ve Hukuk Merkezi</li>
                  <li>• Nobel Ödülü Rekortmeni</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Kariyer ve Finans</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Londra (The City), dünyanın en büyük finans merkezi olarak mezunlara eşsiz kariyer kapıları açar. FinTech, yapay zeka ve yaratıcı endüstrilerde bir numaradır.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Mezuniyet Sonrası 2 Yıl Çalışma İzni</li>
                  <li>• Global Network ve İş Bağlantıları</li>
                  <li>• Yüksek Yatırım Getirisi (ROI)</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">UK: Academic Excellence and Global Leadership</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Home to the world's most prestigious universities, the UK combines centuries of academic tradition with modern innovation. Its 3-year bachelor's and 1-year master's systems offer significant time and cost advantages.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Global Prestige</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">With institutions like Oxford and Cambridge dominating world rankings, the UK is a global leader in research quality and graduate employability.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• 4 Universities in World Top 10</li>
                  <li>• Global Center for Diplomacy and Law</li>
                  <li>• Nobel Prize Record Holder</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Career and Finance</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">London (The City), as the world's largest financial center, opens unmatched career doors for graduates. It is number one in FinTech, AI, and creative industries.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• 2-Year Post-Study Work Enrollment</li>
                  <li>• Global Network and Business Connections</li>
                  <li>• High Return on Investment (ROI)</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Großbritannien: Akademische Exzellenz und Globale Führung</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Großbritannien beherbergt die renommiertesten Universitäten der Welt und verbindet jahrhundertealte akademische Tradition mit moderner Innovation. Die 3-jährigen Bachelor- und 1-jährigen Master-Systeme bieten Zeit- und Kostenvorteile.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Globales Ansehen</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Mit Institutionen wie Oxford und Cambridge, die die Weltranglisten dominieren, ist Großbritannien weltweit führend in Forschungsqualität und Beschäftigungsfähigkeit von Absolventen.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• 4 Universitäten unter den Top 10 weltweit</li>
                  <li>• Globales Zentrum für Diplomatie und Recht</li>
                  <li>• Rekordhalter bei Nobelpreisen</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Karriere und Finanzen</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">London (The City), als weltweit größtes Finanzzentrum, eröffnet Absolventen beispiellose Karrierechancen. Es ist führend in FinTech, KI und Kreativwirtschaft.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• 2 Jahre Arbeitserlaubnis nach dem Studium</li>
                  <li>• Globales Netzwerk und Geschäftsverbindungen</li>
                  <li>• Hohe Kapitalrendite (ROI)</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Zaman Tasarrufu",
          desc: "3 yıllık lisans ve 1 yıllık master ile hayata 2 yıl önce atılın.",
        },
        {
          title: "Graduate Route",
          desc: "Mezuniyet sonrası 2 yıl İngiltere'de çalışma ve kalma izni.",
        },
        {
          title: "Global Prestij",
          desc: "Dünyanın en tanınmış markalarında kapıları açan bir diploma.",
        },
      ],
      advantages_en: [
        {
          title: "Time Efficiency",
          desc: "Start your career 2 years earlier with a 3-year bachelor's and 1-year master's.",
        },
        {
          title: "Graduate Route",
          desc: "2-year post-study work and stay permit in the UK.",
        },
        {
          title: "Global Prestige",
          desc: "A degree that opens doors at the world's most recognized brands.",
        },
      ],
      advantages_de: [
        {
          title: "Zeiteffizienz",
          desc: "Starten Sie Ihre Karriere 2 Jahre früher mit einem 3-jährigen Bachelor und 1-jährigen Master.",
        },
        {
          title: "Graduate Route",
          desc: "2 Jahre Arbeits- und Aufenthaltserlaubnis nach dem Studium in Großbritannien.",
        },
        {
          title: "Globales Prestige",
          desc: "Ein Abschluss, der Türen bei den weltweit bekanntesten Marken öffnet.",
        },
      ],
      process: [
        {
          title: "UCAS Başvurusu",
          desc: "Merkezi sistem üzerinden üniversite tercihlerinin yapılması.",
        },
        {
          title: "Kabul ve CAS",
          desc: "Üniversite kabulü ve kayıt için gerekli CAS belgesinin alımı.",
        },
        {
          title: "Kayıt ve Yerleşim",
          desc: "Tier 4 öğrenci kayıtsi ve konaklama organizasyonu.",
        },
      ],
      process_en: [
        {
          title: "UCAS Application",
          desc: "Making university choices through the central system.",
        },
        {
          title: "Admission and CAS",
          desc: "Receiving university acceptance and the CAS document required for enrollment.",
        },
        {
          title: "Enrollment and Relocation",
          desc: "Tier 4 student enrollment and accommodation organization.",
        },
      ],
      process_de: [
        {
          title: "UCAS-Bewerbung",
          desc: "Auswahl der Universitäten über das zentrale System.",
        },
        {
          title: "Zulassung und CAS",
          desc: "Erhalt der Universitätszulassung und des für das Genehmigung erforderlichen CAS-Dokuments.",
        },
        {
          title: "Genehmigung und Umzug",
          desc: "Tier-4-Studentengenehmigung und Unterkunftsorganisation.",
        },
      ],
      faq: [
        {
          q: "UCAS nedir?",
          a: "İngiltere'deki tüm üniversite başvurularının yapıldığı merkezi sistemdir.",
        },
        {
          q: "Foundation gerekli mi?",
          a: "Bazı lise diplomaları için 1 yıllık hazırlık eğitimi gerekebilir.",
        },
      ],
      faq_en: [
        {
          q: "What is UCAS?",
          a: "It is the central system through which all university applications in the UK are made.",
        },
        {
          q: "Is Foundation necessary?",
          a: "A 1-year foundation program may be required for some high school diplomas.",
        },
      ],
      faq_de: [
        {
          q: "Was ist UCAS?",
          a: "Es ist das zentrale System, über das alle Universitätsbewerbungen in Großbritannien eingereicht werden.",
        },
        {
          q: "Ist ein Foundation-Kurs notwendig?",
          a: "Für einige Abiturzeugnisse kann ein einjähriger Vorbereitungskurs erforderlich sein.",
        },
      ],
      universities: [
        {
          slug: "university-of-oxford",
          name: "University of Oxford",
          ranking: "#1 in UK",
          worldRanking: "#3 Global",
          annualTuition: "£28,000 - £45,000",
          highlights: [
            "Dünyanın En Eski İngilizce Eğitim Veren Üniversitesi",
            "Liderlik ve Araştırma Merkezi",
          ],
          departments: ["Hukuk", "Siyaset Bilimi", "Tıp", "Edebiyat"],
          detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">Oxford Üniversitesi, 1096 yılına kadar uzanan geçmişiyle İngilizce konuşulan dünyanın en eski üniversitesidir. Kolej sistemi (Collegiate System) sayesinde öğrencilere hem devasa bir üniversitenin imkanlarını hem de küçük, samimi bir akademik topluluğun desteğini sunar.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-5 bg-navy/5 rounded-2xl border border-navy/10">
                <h4 class="font-bold text-navy mb-2 italic">Akademik Miras</h4>
                <p class="text-sm text-zinc-500">72 Nobel Ödülü, 30'dan fazla dünya lideri ve sayısız bilim insanı Oxford koridorlarında yetişmiştir.</p>
              </div>
              <div class="p-5 bg-gold/5 rounded-2xl border border-gold/10">
                <h4 class="font-bold text-navy mb-2 italic">Tutorial Sistemi</h4>
                <p class="text-sm text-zinc-500">Haftalık birebir veya iki kişilik küçük grup dersleriyle dünyanın en yoğun ve etkili eğitim metoduna sahiptir.</p>
              </div>
            </div>
          </div>
        `,
        },
        {
          slug: "university-of-cambridge",
          name: "University of Cambridge",
          ranking: "#2 in UK",
          worldRanking: "#2 Global",
          annualTuition: "£24,000 - £40,000",
          highlights: [
            "Bilimsel İnovasyonun Merkezi",
            "Nobel Ödüllü Akademisyenler",
          ],
          departments: ["Matematik", "Fizik", "Mühendislik", "Biyobilimler"],
          detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">Cambridge, bilim dünyasını değiştiren keşiflerin (DNA'nın yapısı, yerçekimi kanunu, elektronun keşfi) merkezidir. Akademik titizliği ve araştırma derinliğiyle dünyanın en seçkin zihinlerini bir araya getirir.</p>
            <p class="text-zinc-600">Silikon Fen (Silicon Fen) olarak bilinen teknoloji bölgesinin kalbinde yer alması, öğrencilere ileri teknoloji ve biyoteknoloji sektörleriyle doğrudan temas imkanı sağlar.</p>
          </div>
        `,
        },
        {
          slug: "imperial-college-london",
          name: "Imperial College London",
          ranking: "#3 in UK",
          worldRanking: "#6 Global",
          annualTuition: "£35,000 - £40,000",
          highlights: [
            "STEM Odaklı Mükemmellik",
            "Londra'nın Merkezinde Teknoloji Üssü",
          ],
          departments: ["Mühendislik", "Tıp", "İşletme", "Doğa Bilimleri"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Sadece bilim, mühendislik, tıp ve işletme alanlarına odaklanan Imperial, bu disiplinlerde dünyanın en iyileri arasındadır. Londra'nın merkezindeki konumu, küresel sanayi ve teknoloji devleriyle iç içe bir eğitim sunar.</p>
            <p class="text-zinc-600">Girişimcilik laboratuvarları ve inovasyon merkezleriyle öğrencilerini sadece çalışan değil, geleceğin teknoloji kurucuları olarak yetiştirir.</p>
          </div>
        `,
        },
        {
          slug: "ucl-london",
          name: "UCL (University College London)",
          ranking: "Global Elite",
          worldRanking: "#9 Global",
          annualTuition: "£25,000 - £35,000",
          highlights: [
            "Londra'nın Küresel Üniversitesi",
            "Disiplinlerarası Araştırma",
          ],
          departments: ["Mimarlık", "Eğitim", "Ekonomi", "Psikoloji"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Londra'nın tam kalbinde yer alan UCL, disiplinlerarası çalışmayı teşvik eden yapısıyla bilinir. Mimarlıktan tıp fakültesine kadar birçok alanda dünya sıralamalarında ilk 10'da yer alır.</p>
            <p class="text-zinc-600">"London's Global University" sloganıyla, dünyanın dört bir yanından gelen en yetenekli öğrencilere kapılarını açan, çeşitliliği ve akademik özgürlüğü savunan bir kurumdur.</p>
          </div>
        `,
        },
        {
          slug: "university-of-edinburgh",
          name: "University of Edinburgh",
          ranking: "Scotland's Pride",
          worldRanking: "#22 Global",
          annualTuition: "£23,000 - £32,000",
          highlights: [
            "Aydınlanma Dönemi Mirası",
            "Yapay Zeka ve Veri Bilimi Lideri",
          ],
          departments: ["Bilişim", "Tıp", "Veterinerlik", "Felsefe"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">İskoçya'nın başkentinde yer alan Edinburgh Üniversitesi, yapay zeka alanında Avrupa'nın en eski ve en güçlü merkezlerinden biridir. Tarihi dokusuyla modern teknolojiyi harmanlar.</p>`,
        },
        {
          slug: "university-of-manchester",
          name: "University of Manchester",
          ranking: "North Powerhouse",
          worldRanking: "#32 Global",
          annualTuition: "£20,000 - £28,000",
          highlights: ["Grafenin Doğduğu Yer", "Sanayi İşbirlikleri"],
          departments: [
            "Fizik",
            "Kimya Mühendisliği",
            "İşletme",
            "Sosyal Bilimler",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Manchester, endüstri devriminin doğduğu şehirde, sanayi ile en güçlü bağlara sahip üniversitelerden biridir. 25 Nobel ödüllü mezunu ile araştırma odaklı bir devdir.</p>`,
        },
        {
          slug: "kings-college-london",
          name: "King's College London",
          ranking: "Healthcare Leader",
          worldRanking: "#40 Global",
          annualTuition: "£25,000 - £33,000",
          highlights: [
            "Tıp ve Hukukta Dünya Markası",
            "Londra'nın Merkezinde Prestij",
          ],
          departments: ["Tıp", "Hukuk", "Savaş Etüdleri", "Diş Hekimliği"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Thames Nehri kıyısındaki kampüsleriyle King's, özellikle sağlık bilimleri ve uluslararası ilişkiler alanlarında dünyanın en saygın kurumları arasındadır.</p>`,
        },
        {
          slug: "lse-london",
          name: "LSE (London School of Economics)",
          ranking: "#1 in Social Sciences",
          worldRanking: "#45 Global",
          annualTuition: "£24,000 - £30,000",
          highlights: ["Ekonomi ve Politika Devleri", "Küresel Liderler Ağı"],
          departments: ["Ekonomi", "Siyaset Bilimi", "Finans", "Sosyoloji"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">LSE, sosyal bilimler alanında dünyada Harvard ve Oxford ile yarışan tek kurumdur. Mezunları arasında çok sayıda devlet başkanı ve Nobel ödüllü ekonomist bulunur.</p>`,
        },
        {
          slug: "university-of-warwick",
          name: "University of Warwick",
          ranking: "Top Business & Math",
          worldRanking: "#67 Global",
          annualTuition: "£21,000 - £29,000",
          highlights: [
            "Warwick Business School (WBS)",
            "Matematiksel Araştırma",
          ],
          departments: ["İşletme", "Matematik", "Ekonomi", "İstatistik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Warwick, modern kampüsü ve işletme dünyasıyla olan sıkı bağlarıyla tanınır. WBS, dünya çapında en prestijli işletme okullarından biri olarak kabul edilir.</p>`,
        },
        {
          slug: "university-of-bristol",
          name: "University of Bristol",
          ranking: "Research Excellence",
          worldRanking: "#55 Global",
          annualTuition: "£22,000 - £30,000",
          highlights: [
            "Yaratıcı Endüstriler ve Teknoloji",
            "İngiltere'nin En Sevilen Öğrenci Şehri",
          ],
          departments: ["Mühendislik", "Coğrafya", "Tıp", "Film ve TV"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Bristol, mühendislik ve yaratıcı sanatları birleştiren yenilikçi yapısıyla bilinir. Şehrin teknoloji ekosistemi, mezunlar için zengin fırsatlar sunar.</p>`,
        },
        {
          slug: "university-of-glasgow",
          name: "University of Glasgow",
          ranking: "Ancient Excellence",
          worldRanking: "#76 Global",
          annualTuition: "£20,000 - £27,000",
          highlights: [
            "Harry Potter Stilinde Kampüs",
            "Bilimsel Keşiflerin Merkezi",
          ],
          departments: ["Veterinerlik", "Tıp", "Hukuk", "Mühendislik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">1451'de kurulan Glasgow, İngiltere'nin en eski 4. üniversitesidir. Adam Smith gibi isimlerin yetiştiği bu kurum, araştırma kalitesiyle dünya devidir.</p>`,
        },
        {
          slug: "university-of-southampton",
          name: "University of Southampton",
          ranking: "#1 in Engineering",
          worldRanking: "#81 Global",
          annualTuition: "£21,000 - £28,000",
          highlights: [
            "Okyanus ve Yer Bilimleri Lideri",
            "Elektronik ve Bilgisayar Bilimleri",
          ],
          departments: [
            "Elektronik",
            "Okyanus Bilimi",
            "Mühendislik",
            "Gemi İnşası",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Southampton, özellikle havacılık ve denizcilik mühendisliği alanlarında İngiltere'nin amiral gemisidir. Dünyanın en iyi okyanus bilimleri merkezlerinden birine sahiptir.</p>`,
        },
        {
          slug: "university-of-birmingham",
          name: "University of Birmingham",
          ranking: "Classic Red Brick",
          worldRanking: "#84 Global",
          annualTuition: "£20,000 - £26,000",
          highlights: ["İlk Kampüs Üniversitesi", "Geniş Sanayi Ortaklıkları"],
          departments: ["Fizik", "Kimya", "İşletme", "Eğitim"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Birmingham, araştırma odaklı eğitim anlayışıyla bilinen bir "Red Brick" üniversitesidir. Kampüsü, öğrencilere tam bir şehir içinde şehir deneyimi sunar.</p>`,
        },
        {
          slug: "university-of-sheffield",
          name: "University of Sheffield",
          ranking: "Top Engineering",
          worldRanking: "#104 Global",
          annualTuition: "£21,000 - £28,000",
          highlights: [
            "İleri İmalat Araştırma Merkezi (AMRC)",
            "Siyaset ve Gazetecilik",
          ],
          departments: [
            "Makine Mühendisliği",
            "Gazetecilik",
            "Siyaset",
            "Mimarlık",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Sheffield, Boeing ve Rolls-Royce gibi devlerle ortak yürüttüğü AMRC merkezi ile imalat teknolojilerinde dünya lideridir.</p>`,
        },
        {
          slug: "university-of-leeds",
          name: "University of Leeds",
          ranking: "Comprehensive Research",
          worldRanking: "#75 Global",
          annualTuition: "£20,000 - £26,000",
          highlights: ["Geniş Bölüm Seçenekleri", "Aktif Öğrenci Birliği"],
          departments: [
            "Ulaşım Çalışmaları",
            "Gıda Bilimi",
            "İşletme",
            "Medya",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Leeds, Birleşik Krallık'ın en büyük üniversitelerinden biridir. Özellikle ulaşım sistemleri ve gıda bilimleri alanlarında dünya çapında otoritedir.</p>`,
        },
        {
          slug: "university-of-nottingham",
          name: "University of Nottingham",
          ranking: "Global Campus",
          worldRanking: "#100 Global",
          annualTuition: "£20,000 - £27,000",
          highlights: ["Uluslararası Kampüs Ağı", "Eczacılık ve Veterinerlik"],
          departments: ["Eczacılık", "Tarım", "Hukuk", "Mühendislik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Nottingham, Çin ve Malezya'daki kampüsleriyle gerçek bir global üniversitedir. Eczacılık ve tarım bilimlerinde İngiltere'nin en iyileri arasındadır.</p>`,
        },
        {
          slug: "queen-mary-london",
          name: "Queen Mary University of London",
          ranking: "Research Power",
          worldRanking: "#145 Global",
          annualTuition: "£22,000 - £28,000",
          highlights: ["Tıp ve Diş Hekimliği", "Hukuk ve Finans"],
          departments: [
            "Hukuk",
            "Tıp (Barts)",
            "Diş Hekimliği",
            "İngiliz Dili",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Doğu Londra'nın kalbinde yer alan Queen Mary, özellikle Russell Group üyesi olması ve Barts tıp fakültesi ile tanınan prestijli bir kurumdur.</p>`,
        },
        {
          slug: "newcastle-university",
          name: "Newcastle University",
          ranking: "Excellence in North",
          worldRanking: "#110 Global",
          annualTuition: "£20,000 - £26,000",
          highlights: ["Tıp ve Yaşlanma Araştırmaları", "Sürdürülebilirlik"],
          departments: ["Tıp", "Mimarlık", "Deniz Bilimleri", "Biyobilimler"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Newcastle, tıp ve diş hekimliği alanındaki başarılarının yanı sıra, sürdürülebilir kalkınma odaklı araştırmalarıyla öne çıkar.</p>`,
        },
        {
          slug: "lancaster-university",
          name: "Lancaster University",
          ranking: "Consistent Top 10 UK",
          worldRanking: "#122 Global",
          annualTuition: "£20,000 - £25,000",
          highlights: ["Yüksek Öğrenci Memnuniyeti", "İşletme ve Fizik"],
          departments: ["İşletme", "Fizik", "Çevre Bilimleri", "Tiyatro"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Lancaster, öğrenci deneyimi ve mezun istihdam edilebilirliği konularında sürekli olarak İngiltere'nin ilk 10'unda yer alan bir "kolej" üniversitesidir.</p>`,
        },
        {
          slug: "university-of-bath",
          name: "University of Bath",
          ranking: "Best for Careers",
          worldRanking: "#148 Global",
          annualTuition: "£21,000 - £26,000",
          highlights: ["Mimarlık ve Mühendislik", "Üst Düzey Spor Tesisleri"],
          departments: [
            "İşletme",
            "Mimarlık",
            "Makine Mühendisliği",
            "Psikoloji",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Bath, özellikle mimarlık ve işletme alanlarında İngiltere'nin en seçici üniversitelerinden biridir. Mezunları, kariyerlerine en yüksek başlangıç maaşlarıyla başlayanlar arasındadır.</p>`,
        },
      ],
    },
    italya: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İtalya: Tasarım, Mimarlık ve Tıbbın Tarihi Merkezi</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Avrupa'nın sanat ve bilim mirasını omuzlayan İtalya, özellikle İngilizce tıp (IMAT), mimarlık ve moda tasarımı alanlarında dünya lideridir. Aile gelirine dayalı harç sistemi ve geniş burs imkanlarıyla (DSU) kaliteli eğitimi erişilebilir kılar.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Küresel Marka Değeri</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">"Made in Italy" sadece ürünlerde değil, eğitimde de bir prestij simgesidir. Mimarlık ve moda dünyasının kalbinde, tarihin içinde eğitim alırken küresel bir networkün parçası olursunuz.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• İngilizce Tıp (IMAT) Öncüsü</li>
                  <li>• Tasarım ve Modada Dünya Başkenti</li>
                  <li>• Avrupa'nın En Eski Üniversiteleri</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Ekonomi ve Kariyer</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Lüks tüketim, otomotiv ve endüstriyel tasarımda dünya devlerine (Ferrari, Gucci, Eni) ev sahipliği yapan İtalya, mezunlarına yaratıcı endüstrilerde eşsiz kapılar açar.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Yıllık €5,000 - €7,000 Geri Ödemesiz Burs (DSU)</li>
                  <li>• Gelire Göre Düşük Harç Sistemi</li>
                  <li>• Avrupa Birliği'nde Serbest Dolaşım ve Kariyer</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Italy: The Historic Center of Design, Architecture, and Medicine</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Carrying Europe's artistic and scientific heritage, Italy is a global leader in English-taught medicine (IMAT), architecture, and fashion design. Its income-based tuition system and generous scholarships (DSU) make world-class education accessible.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Global Brand Value</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">"Made in Italy" is not just a label for products; it's a symbol of prestige in education. Study in the heart of history and fashion while becoming part of a global network.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• English-Taught Medicine (IMAT) Pioneer</li>
                  <li>• Global Capital of Design and Fashion</li>
                  <li>• Europe's Oldest Universities</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Economy and Career</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Home to global giants in luxury, automotive, and industrial design (Ferrari, Gucci, Eni), Italy opens unique doors in creative industries for its graduates.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• €5,000 - €7,000 Annual Non-Refundable Scholarship (DSU)</li>
                  <li>• Low Tuition Fees Based on Income</li>
                  <li>• Free Movement and Career in the EU</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Italien: Das historische Zentrum für Design, Architektur und Medizin</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Als Träger des künstlerischen und wissenschaftlichen Erbes Europas ist Italien weltweit führend in den Bereichen englischsprachige Medizin (IMAT), Architektur und Modedesign. Das einkommensabhängige Gebührensystem und die großzügigen Stipendien (DSU) machen eine erstklassige Ausbildung zugänglich.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Globaler Markenwert</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">"Made in Italy" ist nicht nur ein Label für Produkte; es ist ein Symbol für Prestige in der Bildung. Studieren Sie im Herzen von Geschichte und Mode und werden Sie Teil eines globalen Netzwerks.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Pionier der englischsprachigen Medizin (IMAT)</li>
                  <li>• Globale Hauptstadt für Design und Mode</li>
                  <li>• Älteste Universitäten Europas</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Wirtschaft und Karriere</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Italien ist die Heimat globaler Giganten in den Bereichen Luxus, Automobil und Industriedesign (Ferrari, Gucci, Eni) und öffnet seinen Absolventen einzigartige Türen in kreativen Branchen.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• 5.000 € - 7.000 € jährliches, nicht rückzahlbares Stipendium (DSU)</li>
                  <li>• Niedrige Studiengebühren basierend auf dem Einkommen</li>
                  <li>• Freizügigkeit und Karriere in der EU</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Burs İmkânları",
          desc: "Aile gelirine bağlı olarak yıllık €7,000'ya varan DSU devlet bursları.",
        },
        {
          title: "Ekonomik Harçlar",
          desc: "Devlet üniversitelerinde harçlar yıllık €156 - €3,500 arasındadır.",
        },
        {
          title: "İngilizce Programlar",
          desc: "Tıptan mühendisliğe, tasarımdan ekonomiye 500'den fazla İngilizce bölüm.",
        },
      ],
      advantages_en: [
        {
          title: "Scholarship Opportunities",
          desc: "DSU state scholarships up to €7,000 per year based on family income.",
        },
        {
          title: "Affordable Tuition",
          desc: "Tuition fees at public universities range between €156 - €3,500 annually.",
        },
        {
          title: "English Programs",
          desc: "Over 500 English-taught departments from medicine to engineering and design.",
        },
      ],
      advantages_de: [
        {
          title: "Stipendienmöglichkeiten",
          desc: "DSU-Staatsstipendien von bis zu 7.000 € pro Jahr, basierend auf dem Familieneinkommen.",
        },
        {
          title: "Erschwingliche Gebühren",
          desc: "Die Studiengebühren an staatlichen Universitäten liegen jährlich zwischen 156 € und 3.500 €.",
        },
        {
          title: "Englischsprachige Programme",
          desc: "Über 500 englischsprachige Studiengänge von Medizin bis Ingenieurwesen und Design.",
        },
      ],
      process: [
        {
          title: "IMAT / TOLC / TIL",
          desc: "Tıp, ekonomi veya mühendislik giriş sınavlarına hazırlık.",
        },
        {
          title: "Universitaly",
          desc: "İtalyan konsolosluğu ve üniversiteler için resmi ön kayıt süreci.",
        },
        {
          title: "Dichiarazione di Valore",
          desc: "Diploma denklik ve akademik onay işlemlerinin takibi.",
        },
      ],
      process_en: [
        {
          title: "IMAT / TOLC / TIL",
          desc: "Preparation for medical, economic, or engineering entrance exams.",
        },
        {
          title: "Universitaly",
          desc: "Official pre-registration process for the Italian consulate and universities.",
        },
        {
          title: "Declaration of Value",
          desc: "Tracking diploma equivalence and academic approval processes.",
        },
      ],
      process_de: [
        {
          title: "IMAT / TOLC / TIL",
          desc: "Vorbereitung auf medizinische, wirtschaftliche oder ingenieurwissenschaftliche Aufnahmeprüfungen.",
        },
        {
          title: "Universitaly",
          desc: "Offizieller Voranmeldungsprozess für das italienische Konsulat und die Universitäten.",
        },
        {
          title: "Wertigkeitserklärung",
          desc: "Nachverfolgung der Diplom-Gleichwertigkeit und akademischer Genehmigungsprozesse.",
        },
      ],
      faq: [
        {
          q: "IMAT sınavı nedir?",
          a: "İtalya'da devlet üniversitelerinde İngilizce tıp okumak için gereken tek ve merkezi sınavdır.",
        },
      ],
      faq_en: [
        {
          q: "What is the IMAT exam?",
          a: "It is the only central exam required for studying English-taught medicine at public universities in Italy.",
        },
      ],
      faq_de: [
        {
          q: "Was ist die IMAT-Prüfung?",
          a: "Es ist die einzige zentrale Prüfung, die für ein englischsprachiges Medizinstudium an staatlichen Universitäten in Italien erforderlich ist.",
        },
      ],
      universities: [
        {
          slug: "sapienza-rome",
          name: "Sapienza University of Rome",
          ranking: "#1 in Italy",
          worldRanking: "#124 Global",
          annualTuition: "€156 - €2,800 (Income based)",
          highlights: [
            "Avrupa'nın En Büyük Üniversitesi",
            "Klasik Bilimlerde Dünya Birincisi",
          ],
          departments: ["Arkeoloji", "Fizik", "Tıp", "Hukuk"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">1303 yılında kurulan Sapienza, Avrupa'nın en büyük ve İtalya'nın en prestijli üniversitelerinden biridir. Roma'nın kalbinde yer alan kampüsü, binlerce yıllık akademik geleneği modern araştırmalarla birleştirir.</p>
            <p class="text-zinc-600">Özellikle Klasik Çalışmalar ve Arkeoloji alanında dünya birincisi olan Sapienza, fizik ve tıp alanındaki başarılarıyla da küresel otoritedir. Nobel ödüllü Giorgio Parisi gibi dâhilerin yetiştiği bir bilim yuvasıdır.</p>
          </div>
        `,
        },
        {
          slug: "polimi",
          name: "Politecnico di Milano",
          ranking: "Top Design & Engineering",
          worldRanking: "#123 Global",
          annualTuition: "€800 - €3,900",
          highlights: [
            "Tasarım ve Mimarlıkta Dünya Markası",
            "Endüstriyel Bağlantılar",
          ],
          departments: [
            "Mimarlık",
            "Endüstriyel Tasarım",
            "Mühendislik",
            "Şehir Bölge Planlama",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Politecnico di Milano, İtalya'nın en iyi teknik üniversitesidir. Milano'nun tasarım ve moda başkenti olması, bu üniversiteyi mimarlık ve endüstriyel tasarım alanında dünyanın en çok tercih edilen okullarından biri yapar.</p>
            <p class="text-zinc-600">Ferrari, Lamborghini ve Leonardo gibi sanayi devleriyle olan ortak projeleri, mühendislik öğrencilerine mezun olmadan profesyonel bir vizyon kazandırır.</p>
          </div>
        `,
        },
        {
          slug: "bocconi",
          name: "Bocconi University",
          ranking: "#1 in Business",
          worldRanking: "Top 10 in Finance",
          annualTuition: "€14,000 - €16,000",
          highlights: [
            "Avrupa'nın En İyi İşletme Okullarından",
            "Küresel Network",
          ],
          departments: ["Finans", "Yönetim", "Ekonomi", "Veri Bilimi"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Bocconi, ekonomi ve işletme eğitiminde Avrupa'nın "Ivy League"i olarak kabul edilir. Milano'da yer alan bu özel üniversite, dünya finans sektörünün ve lüks yönetiminin en önemli insan kaynağı merkezidir.</p>
            <p class="text-zinc-600">Geniş burs imkanları ve partner olduğu yüzlerce global şirketle, mezunlarına uluslararası kariyer basamaklarını hızla tırmanma şansı sunar.</p>
          </div>
        `,
        },
        {
          slug: "university-of-bologna",
          name: "University of Bologna (UNIBO)",
          ranking: "Historic Excellence",
          worldRanking: "#154 Global",
          annualTuition: "€156 - €3,000",
          highlights: [
            "Batı Dünyasının En Eski Üniversitesi",
            "Bologna Süreci'nin Doğduğu Yer",
          ],
          departments: ["Tıp", "Hukuk", "Uluslararası İlişkiler", "Edebiyat"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">1088'de kurulan UNIBO, Batı dünyasının en eski sürekli eğitim veren üniversitesidir. Tarihi dokusu ve akademik prestijiyle, öğrencilere İtalya'nın entelektüel kalbinde eğitim fırsatı sunar.</p>`,
        },
        {
          slug: "university-of-padua",
          name: "University of Padua (UNIPD)",
          ranking: "Scientific Legacy",
          worldRanking: "#219 Global",
          annualTuition: "€2,500",
          highlights: ["Galileo'nun Kürsüsü", "Tıpta Köklü Gelenek"],
          departments: ["Tıp", "Psikoloji", "Mühendislik", "Fizik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Padua Üniversitesi, tıp ve astronomi tarihindeki devrim niteliğindeki keşiflerin adresidir. Bugün de psikoloji ve tıp alanında İtalya'nın en çok tercih edilen üniversiteleri arasındadır.</p>`,
        },
        {
          slug: "university-of-milan",
          name: "University of Milan (Statale)",
          ranking: "Top Research",
          worldRanking: "#276 Global",
          annualTuition: "€156 - €2,400",
          highlights: [
            "Yaşam Bilimleri ve Hukukta Lider",
            "Milano'nun Kalbinde",
          ],
          departments: ["Tıp", "Hukuk", "Eczacılık", "Siyaset Bilimi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Milano Devlet Üniversitesi, özellikle sosyal bilimler ve yaşam bilimlerindeki araştırmalarıyla Avrupa'nın önde gelen akademik ağlarına (LERU) üyedir.</p>`,
        },
        {
          slug: "politecnico-di-torino",
          name: "Polytechnic University of Turin (POLITO)",
          ranking: "Engineering Giant",
          worldRanking: "#252 Global",
          annualTuition: "€2,600",
          highlights: ["Otomotiv Mühendisliğinde Zirve", "Teknoloji Odağı"],
          departments: [
            "Otomotiv Mühendisliği",
            "Mimarlık",
            "Bilişim",
            "Enerji",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">POLITO, İtalya'nın sanayi merkezi Torino'da otomotiv ve havacılık sektörleriyle iç içe bir eğitim modeli sunar. Mühendislikte Avrupa'nın en saygın kurumlarından biridir.</p>`,
        },
        {
          slug: "university-of-pisa",
          name: "University of Pisa",
          ranking: "Mathematics Powerhouse",
          worldRanking: "#349 Global",
          annualTuition: "€2,400",
          highlights: ["Galileo'nun Şehri", "Fizik ve Matematikte Lider"],
          departments: [
            "Fizik",
            "Matematik",
            "Bilgisayar Bilimleri",
            "Biyoloji",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Pisa Üniversitesi, özellikle temel bilimlerdeki derinliğiyle tanınır. Birçok Fields ve Nobel ödüllü bilim insanının yolunun geçtiği bir kurumdur.</p>`,
        },
        {
          slug: "vita-salute-san-raffaele",
          name: "Vita-Salute San Raffaele University",
          ranking: "Top Private Medicine",
          worldRanking: "#401 Global",
          annualTuition: "€15,000 - €20,000",
          highlights: ["İleri Tıp Araştırmaları", "Klinik Deneyim Odağı"],
          departments: ["Tıp", "Diş Hekimliği", "Psikoloji"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Milano'da yer alan bu butik üniversite, tıp ve sağlık bilimlerinde İtalya'nın en prestijli özel kurumudur. Hastane ile iç içe kampüsü, öğrencilere üst düzey klinik tecrübe sağlar.</p>`,
        },
        {
          slug: "university-of-florence",
          name: "University of Florence",
          ranking: "Humanities & Arts",
          worldRanking: "#358 Global",
          annualTuition: "€156 - €2,500",
          highlights: ["Rönesans Şehrinde Eğitim", "Sanat Tarihi ve Mimarlık"],
          departments: ["Mimarlık", "Ekonomi", "Tarım", "Sanat Tarihi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Floransa Üniversitesi, sanatın ve mimarinin doğduğu şehirde, öğrencilerine ilham verici bir akademik atmosfer sunar.</p>`,
        },
      ],
    },
    amerika: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">ABD: Küresel Eğitimin Zirvesi ve Fırsatlar Diyarı</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Dünyanın en iyi 10 üniversitesinden 8'ine ev sahipliği yapan Amerika Birleşik Devletleri, akademik mükemmelliğin, inovasyonun ve küresel liderliğin merkezidir. Ivy League prestijinden teknoloji devlerinin kalbindeki kampüslere kadar, ABD diploması tüm dünyada kapıları açan en güçlü anahtardır.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademik Özgürlük ve Esneklik</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">ABD eğitim sistemi, "Liberal Arts" geleneği ile öğrencilere ana dalını seçmeden önce farklı disiplinleri keşfetme özgürlüğü tanır. Interdisipliner çalışma kültürü, geleceğin kompleks problemlerine çözüm üreten liderler yetiştirir.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Dünya İlk 100'de 50+ Üniversite</li>
                  <li>• Esnek Ana Dal ve Yan Dal Seçenekleri</li>
                  <li>• Devasa Araştırma Fonları ve Laboratuvarlar</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">İş Dünyası ve İnovasyon</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Silicon Valley, Wall Street ve Hollywood gibi sektörlerin kalbinde yer alan kampüsler, öğrencilere staj ve networking için eşsiz imkanlar sunar. STEM mezunları için 3 yıla kadar çalışma izni (OPT) mevcuttur.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• OPT (Optional Practical Training) Hakkı</li>
                  <li>• Küresel Şirketlerle Doğrudan Bağlantı</li>
                  <li>• Girişimcilik ve Startup Kültürü</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">USA: The Pinnacle of Global Education</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Home to 8 of the world's top 10 universities, the United States is the hub of academic excellence, innovation, and global leadership. From Ivy League prestige to campuses in the heart of tech giants, a US degree is the most powerful key to global opportunities.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Academic Freedom and Flexibility</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">The US education system, with its "Liberal Arts" tradition, gives students the freedom to explore different disciplines before choosing their major. This interdisciplinary culture raises leaders who solve complex future problems.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• 50+ Universities in the World Top 100</li>
                  <li>• Flexible Major and Minor Options</li>
                  <li>• Massive Research Funds and Laboratories</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Business and Innovation</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Campuses located in the heart of industries like Silicon Valley, Wall Street, and Hollywood offer students unique opportunities for internships and networking. Post-study work permits (OPT) are available for up to 3 years for STEM graduates.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• OPT (Optional Practical Training) Rights</li>
                  <li>• Direct Connection with Global Companies</li>
                  <li>• Entrepreneurship and Startup Culture</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">USA: Der Gipfel der globalen Bildung</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Als Heimat von 8 der weltweit 10 besten Universitäten sind die Vereinigten Staaten das Zentrum für akademische Exzellenz, Innovation und globale Führung. Vom Prestige der Ivy League bis hin zu Campus-Standorten im Herzen von Tech-Giganten ist ein US-Abschluss der stärkste Schlüssel zu globalen Möglichkeiten.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademische Freiheit und Flexibilität</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Das US-Bildungssystem gibt den Studierenden mit seiner "Liberal Arts"-Tradition die Freiheit, verschiedene Disziplinen zu erkunden, bevor sie sich für ihr Hauptfach entscheiden. Diese interdisziplinäre Kultur bringt Führungspersönlichkeiten hervor, die komplexe Probleme der Zukunft lösen.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Über 50 Universitäten unter den Top 100 weltweit</li>
                  <li>• Flexible Haupt- und Nebenfachoptionen</li>
                  <li>• Massive Forschungsmittel und Labore</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Wirtschaft und Innovation</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Campus-Standorte im Herzen von Branchen wie dem Silicon Valley, der Wall Street und Hollywood bieten den Studierenden einzigartige Möglichkeiten für Praktika und Networking. Für MINT-Absolventen gibt es Arbeitserlaubnisse nach dem Studium (OPT) für bis zu 3 Jahre.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• OPT-Rechte (Optional Practical Training)</li>
                  <li>• Direkte Verbindung zu globalen Unternehmen</li>
                  <li>• Unternehmertum und Startup-Kultur</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "OPT (Çalışma Hakkı)",
          desc: "Mezuniyet sonrası 1-3 yıl arası Amerika'da yasal çalışma izni.",
        },
        {
          title: "Dünya Lideri Kalite",
          desc: "Global iş piyasasında en çok tercih edilen diploma prestiji.",
        },
        {
          title: "Esnek Müfredat",
          desc: "Ana dal ve yan dal seçenekleri ile zengin eğitim.",
        },
      ],
      advantages_en: [
        {
          title: "OPT (Work Rights)",
          desc: "Legal work permit in America for 1-3 years after graduation.",
        },
        {
          title: "World-Leading Quality",
          desc: "Diploma prestige most preferred in the global job market.",
        },
        {
          title: "Flexible Curriculum",
          desc: "Rich education with major and minor options.",
        },
      ],
      advantages_de: [
        {
          title: "OPT (Arbeitsrechte)",
          desc: "Gesetzliche Arbeitserlaubnis in Amerika für 1-3 Jahre nach dem Abschluss.",
        },
        {
          title: "Weltweit führende Qualität",
          desc: "Diplom-Prestige, das auf dem globalen Arbeitsmarkt am meisten bevorzugt wird.",
        },
        {
          title: "Flexibler Lehrplan",
          desc: "Reiche Ausbildung mit Haupt- und Nebenfachoptionen.",
        },
      ],
      process: [
        {
          title: "Dosya Hazırlığı",
          desc: "Common App üzerinden başvuru dosyasının oluşturulması.",
        },
        {
          title: "I-20 ve Kayıt",
          desc: "Okul kabulü sonrası F-1 kayıt süreci yönetimi.",
        },
        {
          title: "Gidiş Oryantasyonu",
          desc: "ABD'deki yaşam ve akademik sistem hakkında bilgilendirme.",
        },
      ],
      process_en: [
        {
          title: "File Preparation",
          desc: "Creating the application file via Common App.",
        },
        {
          title: "I-20 and Enrollment",
          desc: "Management of the F-1 enrollment process after school acceptance.",
        },
        {
          title: "Pre-Departure Orientation",
          desc: "Briefing on life in the USA and the academic system.",
        },
      ],
      process_de: [
        {
          title: "Dateivorbereitung",
          desc: "Erstellung der Bewerbungsunterlagen über Common App.",
        },
        {
          title: "I-20 und Genehmigung",
          desc: "Verwaltung des F-1-Genehmigungsprozesses nach der Schulzulassung.",
        },
        {
          title: "Orientierung vor der Abreise",
          desc: "Einweisung in das Leben in den USA und das akademische System.",
        },
      ],
      faq: [
        {
          q: "Burs imkanı var mı?",
          a: "Evet, akademik, sportif ve ihtiyaca dayalı (Need-based) birçok burs mevcuttur.",
        },
      ],
      faq_en: [
        {
          q: "Are there scholarship opportunities?",
          a: "Yes, many academic, athletic, and need-based scholarships are available.",
        },
      ],
      faq_de: [
        {
          q: "Gibt es Stipendienmöglichkeiten?",
          a: "Ja, es gibt viele akademische, sportliche und bedarfsorientierte (Need-based) Stipendien.",
        },
      ],
      universities: [
        {
          slug: "mit",
          name: "Massachusetts Institute of Technology (MIT)",
          ranking: "#1 Global",
          worldRanking: "#1 Worldwide",
          annualTuition: "$59,000 - $65,000",
          highlights: ["Dünyanın Teknoloji Üssü", "İnovasyon ve Girişimcilik"],
          departments: ["Yapay Zeka", "Havacılık", "Fizik", "Ekonomi"],
          detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">MIT, bilim ve teknoloji alanında dünyanın tartışmasız lideridir. Boston'daki kampüsü, geleceği şekillendiren buluşların merkezidir. "Mens et Manus" (Akıl ve El) mottosuyla teorik bilgiyi pratik uygulamayla birleştirir.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div class="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <span class="block text-xl font-bold text-navy">100+</span>
                <span class="text-[10px] text-zinc-400 uppercase">Nobel Ödülü</span>
              </div>
              <div class="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <span class="block text-xl font-bold text-navy">#1</span>
                <span class="text-[10px] text-zinc-400 uppercase">QS World Ranking</span>
              </div>
              <div class="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <span class="block text-xl font-bold text-navy">$30K+</span>
                <span class="text-[10px] text-zinc-400 uppercase">Yıllık Araştırma Fonu</span>
              </div>
            </div>
          </div>
        `,
        },
        {
          slug: "stanford",
          name: "Stanford University",
          ranking: "#2 Global",
          worldRanking: "#2 Worldwide",
          annualTuition: "$60,000 - $70,000",
          highlights: ["Silicon Valley'nin Kalbi", "Girişimci Ekosistem"],
          departments: [
            "Bilgisayar Bilimleri",
            "İşletme",
            "Hukuk",
            "Mühendislik",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Silicon Valley'nin kalbinde yer alan Stanford, girişimcilik ve interdisipliner eğitimde dünya lideridir. Google, Yahoo, Nike ve Instagram gibi devlerin kurucuları bu kampüsten çıkmıştır.</p>
            <p class="text-zinc-600">Üniversite, öğrencilerine sadece akademik bilgi değil, aynı zamanda fikirlerini ticari başarılara dönüştürebilecekleri devasa bir network ve sermaye erişimi sunar.</p>
          </div>
        `,
        },
        {
          slug: "harvard",
          name: "Harvard University",
          ranking: "#1 in USA (Ivy League)",
          worldRanking: "#4 Worldwide",
          annualTuition: "$55,000 - $65,000",
          highlights: ["Küresel Liderlik", "Prestijli Mezun Ağı"],
          departments: ["Hukuk", "Tıp", "İşletme (MBA)", "Siyaset"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Harvard, dünyanın en eski ve en saygın üniversitelerinden biri olup, küresel liderler yetiştirme geleneğine sahiptir. Ivy League üyesi olan üniversite, dünyanın en büyük akademik kütüphanesine ev sahipliği yapar.</p>
            <p class="text-zinc-600">Mezunları arasında 8 ABD başkanı ve sayısız devlet lideri bulunan Harvard, diplomasi ve hukuk alanında dünyanın "altın standardı"dır.</p>
          </div>
        `,
        },
        {
          slug: "caltech",
          name: "California Institute of Technology (Caltech)",
          ranking: "Top Science",
          worldRanking: "#10 Global",
          annualTuition: "$60,000 - $63,000",
          highlights: [
            "NASA Jet Propulsion Lab Yönetimi",
            "Küçük Ama Dev Etki",
          ],
          departments: ["Astronomi", "Kimya", "Jeoloji", "Fizik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Caltech, az sayıda öğrenciyle bilim dünyasında devasa etkiler yaratan bir kurumdur. NASA'nın Jet İtki Laboratuvarı'nı (JPL) yönetmesi, uzay bilimlerinde onu rakipsiz kılar.</p>`,
        },
        {
          slug: "university-of-chicago",
          name: "University of Chicago",
          ranking: "Elite Research",
          worldRanking: "#11 Global",
          annualTuition: "$62,000 - $66,000",
          highlights: ["Chicago Ekonomi Okulu", "Derin Teorik Eğitim"],
          departments: ["Ekonomi", "Sosyoloji", "Matematik", "Fizik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UChicago, akademik titizliği ve "Chicago Okulu" olarak bilinen ekonomi teorileriyle ünlüdür. Sorgulayıcı düşünceyi merkeze alan benzersiz bir eğitim modeline sahiptir.</p>`,
        },
        {
          slug: "upenn",
          name: "University of Pennsylvania (UPenn)",
          ranking: "#1 in Business",
          worldRanking: "#12 Global",
          annualTuition: "$60,000 - $65,000",
          highlights: ["Wharton School", "Disiplinlerarası Yaklaşım"],
          departments: ["İşletme", "Finans", "Hemşirelik", "Hukuk"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Wharton İşletme Okulu ile dünya finansının merkezinde yer alan UPenn, Benjamin Franklin tarafından kurulan köklü bir Ivy League üniversitesidir.</p>`,
        },
        {
          slug: "princeton",
          name: "Princeton University",
          ranking: "#1 in USA Rankings",
          worldRanking: "#17 Global",
          annualTuition: "$57,000 - $61,000",
          highlights: ["Saf Bilim ve Beşeri Bilimler", "Eşsiz Lisans Eğitimi"],
          departments: [
            "Matematik",
            "Uluslararası İlişkiler",
            "Fizik",
            "Klasik Bilimler",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Princeton, özellikle lisans eğitimine verdiği önem ve "senior thesis" geleneğiyle bilinir. Araştırma gücünü samimi bir kampüs ortamıyla birleştirir.</p>`,
        },
        {
          slug: "yale",
          name: "Yale University",
          ranking: "Law & Arts Leader",
          worldRanking: "#16 Global",
          annualTuition: "$62,000 - $65,000",
          highlights: ["Yale Law School", "Sanat ve Drama Merkezi"],
          departments: ["Hukuk", "Drama", "Siyaset Bilimi", "Müzik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Yale, hukuk ve beşeri bilimlerde dünyanın en iyisidir. Tarihi kampüsü ve "Residential College" sistemiyle öğrencilerine zengin bir entelektüel hayat sunar.</p>`,
        },
        {
          slug: "cornell",
          name: "Cornell University",
          ranking: "Ivy Innovation",
          worldRanking: "#13 Global",
          annualTuition: "$63,000 - $66,000",
          highlights: ["Mühendislik ve Tarım", "Teknik ve Sanatsal Denge"],
          departments: [
            "Havacılık",
            "Otel Yönetimi",
            "Bilgisayar Bilimleri",
            "Tarım",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Cornell, Ivy League içinde teknik ve uygulamalı bilimlere en çok önem veren üniversitedir. Otel yönetimi ve mühendislikte dünya çapında prestije sahiptir.</p>`,
        },
        {
          slug: "columbia",
          name: "Columbia University",
          ranking: "NYC Global Hub",
          worldRanking: "#23 Global",
          annualTuition: "$65,000 - $68,000",
          highlights: ["New York City'nin Kalbinde", "Gazetecilik ve Pulitzer"],
          departments: [
            "Gazetecilik",
            "Hukuk",
            "İşletme",
            "Uluslararası İlişkiler",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">New York City'de yer alan Columbia, öğrencilerine dünya diplomasisinin ve finansının merkezinde staj ve kariyer kapıları açar.</p>`,
        },
        {
          slug: "johns-hopkins",
          name: "Johns Hopkins University",
          ranking: "#1 in Medicine Research",
          worldRanking: "#28 Global",
          annualTuition: "$60,000 - $63,000",
          highlights: ["Tıp ve Halk Sağlığı", "En Yüksek Araştırma Bütçesi"],
          departments: [
            "Tıp",
            "Halk Sağlığı",
            "Biyomedikal Mühendisliği",
            "Uluslararası İlişkiler",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Johns Hopkins, özellikle pandemi döneminde tüm dünyanın takip ettiği veri merkezi ve tıp fakültesi ile sağlık bilimlerinde dünya otoritesidir.</p>`,
        },
        {
          slug: "uc-berkeley",
          name: "UC Berkeley",
          ranking: "#1 Public University",
          worldRanking: "#10 Global",
          annualTuition: "$44,000 - $48,000",
          highlights: ["Akademik Özgürlük ve Aktivizm", "Mühendislik Devleri"],
          departments: [
            "Mühendislik",
            "Kimya",
            "Bilgisayar Bilimleri",
            "Ekonomi",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Berkeley, dünyanın en iyi devlet üniversitesidir. Silicon Valley'e yakınlığı ve teknoloji devrimindeki rolüyle mühendislerin rüya okuludur.</p>`,
        },
        {
          slug: "ucla",
          name: "UCLA",
          ranking: "Top Public & Media",
          worldRanking: "#29 Global",
          annualTuition: "$42,000 - $46,000",
          highlights: ["Sinema ve Televizyon", "Spor ve Akademik Başarı"],
          departments: ["Sinema", "Psikoloji", "Mühendislik", "Ekonomi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Los Angeles'ta yer alan UCLA, sinemadan tıbba kadar geniş bir yelpazede world lideridir. Mezunları Hollywood ve teknoloji sektöründe en çok tercih edilenler arasındadır.</p>`,
        },
        {
          slug: "nyu",
          name: "New York University (NYU)",
          ranking: "Urban Innovation",
          worldRanking: "#38 Global",
          annualTuition: "$58,000 - $62,000",
          highlights: ["Tisch School of the Arts", "Global Network Kampüsleri"],
          departments: ["Sinema", "Finans (Stern)", "Hukuk", "Felsefe"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Kampüsü Manhattan ile bütünleşen NYU, dünyada en çok uluslararası öğrenciye sahip olan üniversitelerden biridir. Stern İşletme Okulu finansın merkezidir.</p>`,
        },
        {
          slug: "university-of-michigan",
          name: "University of Michigan",
          ranking: "Public Ivy",
          worldRanking: "#33 Global",
          annualTuition: "$55,000 - $59,000",
          highlights: ["Mühendislik ve Tıp", "Devasa Mezun Ağı"],
          departments: [
            "Mühendislik",
            "İşletme (Ross)",
            "Tıp",
            "Siyaset Bilimi",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Ann Arbor'da yer alan Michigan, araştırma ve spor kültürünün en güçlü olduğu "Public Ivy" üniversitesidir. Devasa mezun ağı, kariyer basamaklarında büyük avantaj sağlar.</p>`,
        },
        {
          slug: "northwestern",
          name: "Northwestern University",
          ranking: "Top Journalism & Business",
          worldRanking: "#47 Global",
          annualTuition: "$62,000 - $65,000",
          highlights: [
            "Kellogg School of Management",
            "Medill School of Journalism",
          ],
          departments: ["Gazetecilik", "İşletme", "Mühendislik", "İletişim"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Chicago yakınlarındaki Northwestern, özellikle pazarlama, işletme ve gazetecilik alanlarında dünyanın en iyi programlarına sahiptir.</p>`,
        },
        {
          slug: "cmu",
          name: "Carnegie Mellon University (CMU)",
          ranking: "#1 in CS",
          worldRanking: "#52 Global",
          annualTuition: "$60,000 - $63,000",
          highlights: ["Robotik ve Yapay Zeka", "Bilgisayar Bilimleri Lideri"],
          departments: ["Bilgisayar Bilimleri", "Robotik", "Drama", "HCI"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">CMU, bilgisayar bilimleri ve robotik dendiğinde dünyada akla gelen ilk isimdir. Teknolojiyi sanatla (Drama) birleştiren benzersiz bir yapıya sahiptir.</p>`,
        },
        {
          slug: "duke",
          name: "Duke University",
          ranking: "Southern Ivy",
          worldRanking: "#57 Global",
          annualTuition: "$60,000 - $64,000",
          highlights: ["Biyomedikal Mühendisliği", "Prestijli Hukuk ve Tıp"],
          departments: ["Biyomedikal", "Hukuk", "Tıp", "Kamu Politikası"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Kuzey Karolina'da yer alan Duke, akademik mükemmelliği ve ikonik kampüsüyle "Güney'in Ivy League'i" olarak adlandırılır.</p>`,
        },
        {
          slug: "ut-austin",
          name: "University of Texas at Austin",
          ranking: "Tech Emerging Hub",
          worldRanking: "#58 Global",
          annualTuition: "$40,000 - $45,000",
          highlights: [
            "Hızla Büyüyen Teknoloji Ekosistemi",
            "İşletme ve Mühendislik",
          ],
          departments: [
            "İşletme",
            "Mühendislik",
            "Bilgisayar Bilimleri",
            "Jeofizik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Austin'in yeni teknoloji başkenti olmasıyla UT Austin, teknoloji devlerinin en çok yetenek aradığı üniversite haline gelmiştir.</p>`,
        },
        {
          slug: "georgia-tech",
          name: "Georgia Institute of Technology",
          ranking: "Top Public Engineering",
          worldRanking: "#97 Global",
          annualTuition: "$31,000 - $35,000",
          highlights: [
            "Endüstriyel Mühendislikte Dünya #1",
            "Teknoloji Odaklı Müfredat",
          ],
          departments: [
            "Endüstri Mühendisliği",
            "Havacılık",
            "Yazılım",
            "Kimya Mühendisliği",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Georgia Tech, uygun maliyetli ama dünya çapında prestijli bir mühendislik eğitimi sunar. Endüstri mühendisliğinde yıllardır dünyanın zirvesindedir.</p>`,
        },
      ],
    },

    kanada: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Kanada: Kariyer, Göçmenlik ve Güvenli Gelecek</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Dünyanın en yaşanılabilir ülkeleri listesinde her zaman zirvede yer alan Kanada, mezuniyet sonrası sunduğu 3 yıla kadar çalışma izni ve göçmenlik yollarıyla uluslararası öğrencilerin bir numaralı tercihidir. Eğitim kalitesi ve hoşgörülü toplumuyla eşsiz bir deneyim sunar.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Kariyer ve Co-Op</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Kanada eğitim sisteminin en güçlü yanı olan <strong>Co-Op</strong> programları sayesinde, henüz öğrenciyken alanınızda ücretli olarak çalışabilir ve mezuniyet öncesi iş tecrübesi edinebilirsiniz.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Ücretli Staj (Co-Op) İmkanları</li>
                  <li>• Mezuniyet Sonrası Çalışma İzni (PGWP)</li>
                  <li>• Kalıcı Oturum (PR) Başvuru Avantajı</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Global Teknoloji Üssü</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Toronto ve Vancouver, Kuzey Amerika'nın en hızlı büyüyen teknoloji merkezleridir. Yapay zeka, oyun geliştirme ve temiz enerji alanında dünya devlerine komşu olursunuz.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Toronto - Yeni Silikon Vadisi</li>
                  <li>• Montreal - Global Yapay Zeka Merkezi</li>
                  <li>• Güçlü Doğal Kaynaklar ve Enerji Sektörü</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Canada: Career, Immigration, and a Secure Future</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">As one of the world's most livable countries, Canada is the top choice for international students due to its post-graduation work permits of up to 3 years and various immigration pathways. It offers a unique experience with its educational quality and tolerant society.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Career and Co-Op</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Thanks to the <strong>Co-Op</strong> programs, the strongest aspect of the Canadian education system, you can work for pay in your field while still a student and gain work experience before graduation.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Paid Internship (Co-Op) Opportunities</li>
                  <li>• Post-Graduation Work Permit (PGWP)</li>
                  <li>• Permanent Residency (PR) Application Advantage</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Global Tech Hub</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Toronto and Vancouver are the fastest-growing tech centers in North America. You will be neighbors with global giants in artificial intelligence, game development, and clean energy.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Toronto - The New Silicon Valley</li>
                  <li>• Montreal - Global AI Hub</li>
                  <li>• Strong Natural Resources and Energy Sector</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Kanada: Karriere, Einwanderung und eine sichere Zukunft</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Als eines der lebenswertesten Länder der Welt ist Kanada aufgrund seiner Arbeitserlaubnis nach dem Studium von bis zu 3 Jahren und seiner Einwanderungsmöglichkeiten die erste Wahl für internationale Studierende. Es bietet ein einzigartiges Erlebnis mit seiner Bildungsqualität und toleranten Gesellschaft.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Karriere und Co-Op</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Dank der <strong>Co-Op</strong>-Programme, dem stärksten Aspekt des kanadischen Bildungssystems, können Sie bereits während des Studiums in Ihrem Fachbereich bezahlt arbeiten und vor dem Abschluss Arbeitserfahrung sammeln.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Bezahlte Praktikumsmöglichkeiten (Co-Op)</li>
                  <li>• Arbeitserlaubnis nach dem Studium (PGWP)</li>
                  <li>• Vorteil bei der Beantragung der dauerhaften Aufenthaltserlaubnis (PR)</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Globales Tech-Zentrum</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Toronto und Vancouver sind die am schnellsten wachsenden Tech-Zentren in Nordamerika. Sie werden Nachbarn von globalen Giganten in den Bereichen künstliche Intelligenz, Spieleentwicklung und saubere Energie sein.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Toronto - Das neue Silicon Valley</li>
                  <li>• Montreal - Globaler KI-Hub</li>
                  <li>• Starke natürliche Ressourcen und Energiesektor</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Co-Op Programları",
          desc: "Eğitim süresince alanında ücretli iş tecrübesi edinme şansı.",
        },
        {
          title: "PR Yolu",
          desc: "Kanada diploması ile kalıcı oturum (Permanent Residency) başvurusu avantajı.",
        },
        {
          title: "Yaşam Kalitesi",
          desc: "Dünyanın en güvenli ve hoşgörülü toplumlarından birinde yaşam.",
        },
      ],
      advantages_en: [
        {
          title: "Co-Op Programs",
          desc: "Chance to gain paid work experience in your field during education.",
        },
        {
          title: "PR Pathway",
          desc: "Advantage of applying for Permanent Residency with a Canadian degree.",
        },
        {
          title: "Quality of Life",
          desc: "Life in one of the safest and most tolerant societies in the world.",
        },
      ],
      advantages_de: [
        {
          title: "Co-Op-Programme",
          desc: "Chance, während der Ausbildung bezahlte Arbeitserfahrung in Ihrem Fachbereich zu sammeln.",
        },
        {
          title: "PR-Weg",
          desc: "Vorteil bei der Beantragung einer dauerhaften Aufenthaltserlaubnis mit einem kanadischen Abschluss.",
        },
        {
          title: "Lebensqualität",
          desc: "Leben in einer der sichersten und tolerantesten Gesellschaften der Welt.",
        },
      ],
      process: [
        {
          title: "Okul Kabulü (LOA)",
          desc: "Üniversiteden resmi kabul mektubunun alınması.",
        },
        {
          title: "CAQ / Study Permit",
          desc: "Quebec için CAQ ve genel Kanada öğrenci kayıtsi işlemleri.",
        },
        {
          title: "Yerleşim",
          desc: "Konaklama ve havaalanı karşılama organizasyonu.",
        },
      ],
      process_en: [
        {
          title: "School Admission (LOA)",
          desc: "Receiving the official Letter of Acceptance from the university.",
        },
        {
          title: "CAQ / Study Permit",
          desc: "CAQ for Quebec and general Canada student enrollment processes.",
        },
        {
          title: "Settlement",
          desc: "Organization of accommodation and airport greeting.",
        },
      ],
      process_de: [
        {
          title: "Schulzulassung (LOA)",
          desc: "Erhalt des offiziellen Zulassungsbescheids der Universität.",
        },
        {
          title: "CAQ / Study Permit",
          desc: "CAQ für Quebec und allgemeine kanadische Genehmigungverfahren.",
        },
        {
          title: "Ansiedlung",
          desc: "Organisation von Unterkunft und Flughafenempfang.",
        },
      ],
      faq: [
        {
          q: "Kanada'da okurken çalışabilir miyim?",
          a: "Evet, kampüs içi ve dışı haftalık 20 saat çalışma izniniz bulunmaktadır.",
        },
      ],
      faq_en: [
        {
          q: "Can I work while studying in Canada?",
          a: "Yes, you have a 20-hour weekly work permit on and off campus.",
        },
      ],
      faq_de: [
        {
          q: "Kann ich während des Studiums in Kanada arbeiten?",
          a: "Ja, Sie haben eine wöchentliche Arbeitserlaubnis von 20 Stunden auf und außerhalb des Campus.",
        },
      ],
      universities: [
        {
          slug: "university-of-toronto",
          name: "University of Toronto",
          ranking: "#1 in Canada",
          worldRanking: "#21 Global",
          annualTuition: "CAD$45,000 - $65,000",
          highlights: [
            "Kanada'nın En İyi Üniversitesi",
            "Küresel Araştırma Lideri",
          ],
          departments: [
            "Bilgisayar Bilimleri",
            "Tıp",
            "Mühendislik",
            "İşletme (Rotman)",
          ],
          detailedDescription: `
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-zinc-600">Toronto Üniversitesi (UofT), Kanada'nın akademik amiral gemisidir. İnsülinin keşfi ve kök hücre araştırmalarının doğduğu yer olan üniversite, bilimsel inovasyonda dünya devidir.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-5 bg-navy/5 rounded-2xl border border-navy/10">
                <h4 class="font-bold text-navy mb-2 italic">Global Hub</h4>
                <p class="text-sm text-zinc-500">Dünyanın en multikültürel şehri Toronto'nun kalbinde, global bir networkün parçası olursunuz.</p>
              </div>
              <div class="p-5 bg-gold/5 rounded-2xl border border-gold/10">
                <h4 class="font-bold text-navy mb-2 italic">Rotman School</h4>
                <p class="text-sm text-zinc-500">İşletme ve finans alanında Kanada'nın en iyi mezunlarını yetiştiren prestijli bir merkezdir.</p>
              </div>
            </div>
          </div>
        `,
        },
        {
          slug: "mcgill-university",
          name: "McGill University",
          ranking: "#2 in Canada",
          worldRanking: "#30 Global",
          annualTuition: "CAD$30,000 - $55,000",
          highlights: ["Kanada'nın Harvard'ı", "Tıp ve Hukukta Efsane"],
          departments: ["Tıp", "Hukuk", "Müzik", "Psikoloji"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Montreal'in kalbinde yer alan McGill, Kanada'nın en köklü ve uluslararası alanda en çok tanınan üniversitesidir. Özellikle tıp ve hukuk alanlarında dünya standartlarını belirler.</p>
            <p class="text-zinc-600">Üniversite, Kanada başbakanlarından Nobel ödüllü bilim insanlarına kadar sayısız lider yetiştirmiş bir entelektüel merkezdir.</p>
          </div>
        `,
        },
        {
          slug: "ubc",
          name: "University of British Columbia (UBC)",
          ranking: "#3 in Canada",
          worldRanking: "#34 Global",
          annualTuition: "CAD$40,000 - $55,000",
          highlights: [
            "En Güzel Kampüs",
            "Sürdürülebilirlik ve Doğa Bilimleri",
          ],
          departments: [
            "Çevre Bilimleri",
            "Uluslararası İlişkiler",
            "İşletme",
            "Ormancılık",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Pasifik Okyanusu kıyısındaki muazzam kampüsüyle UBC, sürdürülebilirlik ve çevre bilimlerinde dünya lideridir. Vancouver'ın teknoloji ve ticaret ekosistemiyle iç içedir.</p>
            <p class="text-zinc-600">Mezuniyet sonrası Vancouver'daki global teknoloji şirketlerinde (Microsoft, Amazon, SAP) kariyer fırsatları oldukça yüksektir.</p>
          </div>
        `,
        },
        {
          slug: "university-of-waterloo",
          name: "University of Waterloo",
          ranking: "#1 in Co-op",
          worldRanking: "#112 Global",
          annualTuition: "CAD$35,000 - $60,000",
          highlights: [
            "Dünyanın En Büyük Co-op Programı",
            "Matematik ve Bilgisayar Bilimleri Lideri",
          ],
          departments: [
            "Yazılım Mühendisliği",
            "Matematik",
            "Aktüerya",
            "Kuantum Bilişim",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Waterloo, Kanada'nın teknoloji başkentidir. Co-op sistemi sayesinde öğrenciler eğitimleri sırasında Google, Facebook gibi devlerde maaşlı staj yaparak mezuniyet öncesi iş tecrübesi edinirler.</p>`,
        },
        {
          slug: "mcmaster-university",
          name: "McMaster University",
          ranking: "Research Powerhouse",
          worldRanking: "#98 Global",
          annualTuition: "CAD$35,000 - $50,000",
          highlights: [
            "Sağlık Bilimlerinde Dünya Lideri",
            "Probleme Dayalı Öğrenme (PBL)",
          ],
          departments: [
            "Tıp",
            "Sağlık Bilimleri",
            "Malzeme Mühendisliği",
            "Nükleer Fizik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Hamilton'da yer alan McMaster, özellikle tıp ve sağlık bilimlerinde kanıta dayalı tıp modelinin öncüsüdür. Kanada'nın en yoğun araştırma yapan üniversitelerinden biridir.</p>`,
        },
        {
          slug: "university-of-alberta",
          name: "University of Alberta",
          ranking: "Top in Energy & AI",
          worldRanking: "#111 Global",
          annualTuition: "CAD$28,000 - $45,000",
          highlights: [
            "Yapay Zeka Araştırmaları",
            "Enerji ve Petrol Mühendisliği",
          ],
          departments: [
            "Yapay Zeka",
            "Paleontoloji",
            "Enerji Sistemleri",
            "Eczacılık",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Edmonton'da bulunan UofA, yapay zeka araştırmalarında (Amii) dünya çapında bir merkezdir. Kanada'nın enerji sektörüne en çok lider yetiştiren kurumudur.</p>`,
        },
        {
          slug: "western-university",
          name: "Western University",
          ranking: "Elite Business",
          worldRanking: "#114 Global",
          annualTuition: "CAD$35,000 - $50,000",
          highlights: ["Ivey Business School", "Klinik Tıp ve Psikoloji"],
          departments: [
            "İşletme",
            "Psikoloji",
            "Mühendislik",
            "Sağlık Bilimleri",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Western, özellikle Ivey Business School ile dünya çapında tanınır. "Case method" eğitim modeliyle yöneticilik ve liderlik vasıflarını ön plana çıkarır.</p>`,
        },
        {
          slug: "university-of-ottawa",
          name: "University of Ottawa",
          ranking: "Top Bilingual",
          worldRanking: "#177 Global",
          annualTuition: "CAD$32,000 - $48,000",
          highlights: [
            "Dünyanın En Büyük İki Dilli Üniversitesi",
            "Siyaset ve Hukuk Merkezi",
          ],
          departments: [
            "Hukuk",
            "Uluslararası İlişkiler",
            "Kamu Yönetimi",
            "Tıp",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Başkent Ottawa'da yer alan üniversite, federal hükümet ve elçiliklere olan yakınlığıyla siyaset ve hukuk öğrencileri için eşsiz bir konumdadır.</p>`,
        },
        {
          slug: "queens-university",
          name: "Queen's University",
          ranking: "Prestigious Heritage",
          worldRanking: "#209 Global",
          annualTuition: "CAD$35,000 - $55,000",
          highlights: ["Güçlü Mezun Networkü", "İşletme ve Mühendislik"],
          departments: [
            "Commerce (İşletme)",
            "Madencilik Mühendisliği",
            "Eğitim",
            "Fizik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Kingston'da bulunan Queen's, Kanada'nın en eski üniversitelerinden biridir. Smith School of Business programı, ülkenin en prestijli işletme diplomalarından birini sunar.</p>`,
        },
        {
          slug: "university-of-calgary",
          name: "University of Calgary",
          ranking: "Innovation Leader",
          worldRanking: "#182 Global",
          annualTuition: "CAD$25,000 - $40,000",
          highlights: ["Enerji ve Girişimcilik", "Modern Kampüs"],
          departments: [
            "Kinesiyoloji",
            "Mühendislik",
            "İşletme (Haskayne)",
            "Veterinerlik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Calgary, Kanada'nın enerji başkentidir. Üniversite, sanayi ile olan sıkı bağları ve yüksek mezun istihdam oranıyla öne çıkar.</p>`,
        },
        {
          slug: "simon-fraser-university",
          name: "Simon Fraser University (SFU)",
          ranking: "#1 Comprehensive",
          worldRanking: "#318 Global",
          annualTuition: "CAD$30,000 - $45,000",
          highlights: ["Disiplinlerarası Eğitim", "Yenilikçi Müfredat"],
          departments: [
            "Kriminoloji",
            "Etkileşimli Teknolojiler",
            "İşletme",
            "İletişim",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Vancouver'da yer alan SFU, yenilikçi yapısı ve topluma dokunan araştırmalarıyla bilinir. Kanada'nın en iyi "comprehensive" (kapsamlı) üniversitesi seçilmiştir.</p>`,
        },
        {
          slug: "university-of-victoria",
          name: "University of Victoria (UVic)",
          ranking: "Top Ocean Science",
          worldRanking: "#322 Global",
          annualTuition: "CAD$28,000 - $38,000",
          highlights: ["Okyanus ve Yer Bilimleri", "Yaratıcı Yazarlık"],
          departments: [
            "Okyanus Bilimi",
            "Mühendislik",
            "Hukuk",
            "Güzel Sanatlar",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Vancouver Adası'nda yer alan UVic, iklim değişikliği ve okyanus araştırmalarında dünya lideridir. Eşsiz doğasıyla ilham verici bir kampüs sunar.</p>`,
        },
        {
          slug: "dalhousie-university",
          name: "Dalhousie University",
          ranking: "Atlantic Canada Leader",
          worldRanking: "#272 Global",
          annualTuition: "CAD$25,000 - $40,000",
          highlights: ["Deniz Bilimleri", "Tıp ve Tarım"],
          departments: [
            "Okyanus Çalışmaları",
            "Tıp",
            "Deniz Hukuku",
            "Mühendislik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Halifax'ta yer alan Dalhousie, Doğu Kanada'nın en büyük araştırma üniversitesidir. Denizcilik ve okyanus teknolojilerinde küresel bir merkezdir.</p>`,
        },
        {
          slug: "york-university",
          name: "York University",
          ranking: "Arts & Law Giant",
          worldRanking: "#353 Global",
          annualTuition: "CAD$30,000 - $42,000",
          highlights: ["Schulich Business School", "Osgoode Hall Law School"],
          departments: ["Hukuk", "İşletme", "Psikoloji", "Sinema"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Toronto'daki York, Kanada'nın en iyi hukuk (Osgoode) ve işletme (Schulich) okullarından ikisine ev sahipliği yapar. Sosyal adalet ve kapsayıcılıkta öncüdür.</p>`,
        },
        {
          slug: "university-of-guelph",
          name: "University of Guelph",
          ranking: "#1 in Veterinary",
          worldRanking: "#486 Global",
          annualTuition: "CAD$28,000 - $38,000",
          highlights: ["Veterinerlik ve Gıda Bilimi", "Yaşam Bilimleri"],
          departments: [
            "Veteriner Hekimlik",
            "Tarım",
            "Gıda Bilimi",
            "Biyoloji",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Guelph, tarım ve veterinerlik bilimlerinde Kanada'nın tartışmasız lideridir. Gıda güvenliği ve sürdürülebilirlik konularında dünya çapında projeler yürütür.</p>`,
        },
        {
          slug: "concordia-university",
          name: "Concordia University",
          ranking: "Top Arts & Design",
          worldRanking: "#387 Global",
          annualTuition: "CAD$25,000 - $40,000",
          highlights: ["Sinema ve Tasarım", "İşletme (John Molson)"],
          departments: [
            "Güzel Sanatlar",
            "İşletme",
            "Yazılım Mühendisliği",
            "Gazetecilik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Montreal'in kozmopolit yapısını yansıtan Concordia, yaratıcı endüstriler ve pratik odaklı mühendislik eğitiminde çok güçlüdür.</p>`,
        },
        {
          slug: "carleton-university",
          name: "Carleton University",
          ranking: "Journalism Leader",
          worldRanking: "#601 Global",
          annualTuition: "CAD$28,000 - $42,000",
          highlights: ["Gazetecilik ve Kamu İşleri", "Havacılık Mühendisliği"],
          departments: [
            "Gazetecilik",
            "Uluslararası İlişkiler",
            "Endüstriyel Tasarım",
            "Mühendislik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Ottawa'da bulunan Carleton, Kanada'nın ilk gazetecilik okuluna ev sahipliği yapar. Kamu yönetimi ve politika konularında başkentin kalbinde eğitim verir.</p>`,
        },
        {
          slug: "university-of-manitoba",
          name: "University of Manitoba",
          ranking: "Prairie Research",
          worldRanking: "#601 Global",
          annualTuition: "CAD$20,000 - $35,000",
          highlights: ["Tıp ve Mühendislik", "Uygun Maliyetli Eğitim"],
          departments: ["Tıp", "Mühendislik", "Ziraat", "Mimarlık"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Winnipeg'de yer alan üniversite, Batı Kanada'nın en eski araştırma kurumudur. Uygun yaşam maliyetleri ve kaliteli eğitimiyle bilinir.</p>`,
        },
        {
          slug: "university-of-saskatchewan",
          name: "University of Saskatchewan",
          ranking: "Global Food Security",
          worldRanking: "#340 Global",
          annualTuition: "CAD$20,000 - $35,000",
          highlights: ["Tarım ve Su Güvenliği", "Tıp Araştırmaları"],
          departments: ["Tarım", "Toksikoloji", "Veterinerlik", "Biyomedikal"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Saskatoon'da bulunan üniversite, dünya gıda güvenliği ve su kaynakları araştırmalarında küresel bir otoritedir.</p>`,
        },
        {
          slug: "universite-laval",
          name: "Université Laval",
          ranking: "Historic Francophone",
          worldRanking: "#441 Global",
          annualTuition: "CAD$22,000 - $35,000",
          highlights: [
            "Kuzey Amerika'nın En Eski Fransızca Üniversitesi",
            "Kuzey Çalışmaları",
          ],
          departments: ["Hukuk", "Ormancılık", "Tıp", "Kuzey Araştırmaları"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Quebec City'de yer alan Laval, Fransızca eğitim almak isteyenler için tarihi ve prestijli bir kaledir. Arktik araştırmalarında dünya lideridir.</p>`,
        },
        {
          slug: "queens-university",
          name: "Queen's University",
          ranking: "#1 in Social Impact",
          worldRanking: "#209 Global",
          annualTuition: "CAD$32,000 - $55,000",
          highlights: [
            "Kingston'un Tarihi Mirası",
            "İşletme ve Mühendislik Gücü",
          ],
          departments: ["İşletme", "Mühendislik", "Hukuk", "Tıp"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Queen's, Kanada'nın en eski ve prestijli üniversitelerinden biridir. Özellikle Smith Business School ile finans dünyasında çok güçlü bir networke sahiptir.</p>`,
        },
        {
          slug: "simon-fraser-university",
          name: "Simon Fraser University (SFU)",
          ranking: "Top Comprehensive",
          worldRanking: "#318 Global",
          annualTuition: "CAD$30,000 - $45,000",
          highlights: [
            "Vancouver'ın İnovasyon Üssü",
            "Disiplinlerarası Eğitim",
          ],
          departments: [
            "Bilişim",
            "İletişim",
            "Kriminoloji",
            "Sürdürülebilirlik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">SFU, Kanada'nın en yenilikçi üniversitelerinden biridir. Vancouver'ın teknoloji ekosistemiyle entegre kampüsü, öğrencilere zengin staj imkanları sunar.</p>`,
        },
        {
          slug: "university-of-victoria",
          name: "University of Victoria (UVic)",
          ranking: "Ocean Science Leader",
          worldRanking: "#322 Global",
          annualTuition: "CAD$28,000 - $40,000",
          highlights: ["Okyanus Bilimleri", "En İyi Co-op Programları"],
          departments: [
            "Deniz Bilimleri",
            "Hukuk",
            "Mühendislik",
            "Güzel Sanatlar",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UVic, okyanus bilimleri ve iklim değişikliği araştırmalarında dünya çapında bir liderdir. Kanada'nın en kapsamlı Co-op (eğitim+staj) programlarından birine sahiptir.</p>`,
        },
      ],
    },
    polonya: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Polonya: Avrupa'nın Akademik ve Ekonomik Yükselen Yıldızı</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Avrupa Birliği'nin en hızlı büyüyen ekonomilerinden biri olan Polonya, dünya standartlarında eğitimi, düşük yaşam maliyetleri ve sınavsız kabul imkanlarıyla uluslararası öğrenciler için cazibe merkezidir. "Mavi Diploma" avantajı ile mezunlarına tüm Avrupa'da kariyer kapılarını açar.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Eğitim ve Yaşam Dengesi</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Polonya, diğer AB ülkelerine kıyasla %50'ye varan daha düşük yaşam maliyetleri sunarken, eğitim kalitesinden ödün vermez. Varşova ve Krakow gibi şehirler, dinamik öğrenci hayatıyla tanınır.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Sınavsız Üniversite Kabulü</li>
                  <li>• Ekonomik Yaşam ve Konaklama</li>
                  <li>• İngilizce Eğitim Seçenekleri</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Kariyer ve Teknoloji</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Google, Samsung ve Intel gibi devlerin Ar-Ge merkezlerine ev sahipliği yapan Polonya, özellikle mühendislik ve IT mezunları için yüksek istihdam oranına sahiptir.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• AB Genelinde Geçerli Mavi Diploma</li>
                  <li>• Global Şirketlerde Staj İmkanı</li>
                  <li>• Mezuniyet Sonrası Çalışma İzni</li>
              </ul>
          </div>
      </div>

      <div class="overflow-x-auto mb-12 border border-gold/10 rounded-2xl">
          <table class="w-full text-left text-sm">
              <thead class="bg-navy text-gold uppercase tracking-widest text-[10px]">
                  <tr>
                      <th class="p-6">Bölüm</th>
                      <th class="p-6">Yıllık Ücret</th>
                      <th class="p-6">Eğitim Dili</th>
                  </tr>
              </thead>
              <tbody class="divide-y divide-gold/5 italic text-zinc-600">
                  <tr>
                      <td class="p-6 font-bold text-navy">Mühendislik / İşletme</td>
                      <td class="p-6">€3,000 - €4,500</td>
                      <td class="p-6">İngilizce</td>
                  </tr>
                  <tr>
                      <td class="p-6 font-bold text-navy">Tıp / Diş Hekimliği</td>
                      <td class="p-6">€11,000 - €14,000</td>
                      <td class="p-6">İngilizce</td>
                  </tr>
              </tbody>
          </table>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Poland: Europe's Academic and Economic Rising Star</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">As one of the fastest-growing economies in the EU, Poland offers world-class education, low living costs, and open admission policies. With the "Blue Diploma" advantage, graduates can launch careers across all of Europe.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Education and Life Balance</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Poland offers up to 50% lower living costs compared to other EU countries without compromising on quality. Cities like Warsaw and Krakow are known for their dynamic student life.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Admission Without Exams</li>
                  <li>• Economical Living and Accommodation</li>
                  <li>• English-Taught Programs</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Career and Technology</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Home to R&D centers for giants like Google, Samsung, and Intel, Poland has high employment rates, especially for engineering and IT graduates.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• EU-Wide Valid Blue Diploma</li>
                  <li>• Internship Opportunities in Global Companies</li>
                  <li>• Post-Graduation Work Permit</li>
              </ul>
          </div>
      </div>

      <div class="overflow-x-auto mb-12 border border-gold/10 rounded-2xl">
          <table class="w-full text-left text-sm">
              <thead class="bg-navy text-gold uppercase tracking-widest text-[10px]">
                  <tr>
                      <th class="p-6">Department</th>
                      <th class="p-6">Annual Fee</th>
                      <th class="p-6">Language of Instruction</th>
                  </tr>
              </thead>
              <tbody class="divide-y divide-gold/5 italic text-zinc-600">
                  <tr>
                      <td class="p-6 font-bold text-navy">Engineering / Business</td>
                      <td class="p-6">€3,000 - €4,500</td>
                      <td class="p-6">English</td>
                  </tr>
                  <tr>
                      <td class="p-6 font-bold text-navy">Medicine / Dentistry</td>
                      <td class="p-6">€11,000 - €14,000</td>
                      <td class="p-6">English</td>
                  </tr>
              </tbody>
          </table>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Polen: Europas akademischer und wirtschaftlicher aufsteigender Stern</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Als eine der am schnellsten wachsenden Volkswirtschaften in der EU bietet Polen erstklassige Ausbildung, niedrige Lebenshaltungskosten und offene Zulassungsrichtlinien. Mit dem Vorteil des "Blauen Diploms" können Absolventen Karrieren in ganz Europa starten.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Bildung und Lebensbalance</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Polen bietet im Vergleich zu anderen EU-Ländern bis zu 50 % niedrigere Lebenshaltungskosten ohne Qualitätsverlust. Städte wie Warschau und Krakau sind für ihr dynamisches Studentenleben bekannt.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Zulassung ohne Prüfungen</li>
                  <li>• Wirtschaftliches Wohnen und Unterbringung</li>
                  <li>• Englischsprachige Programme</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Karriere und Technologie</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Polen beheimatet Forschungs- und Entwicklungszentren von Giganten wie Google, Samsung und Intel und weist eine hohe Beschäftigungsquote auf, insbesondere für Absolventen in den Bereichen Ingenieurwesen und IT.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• EU-weit gültiges Blaues Diplom</li>
                  <li>• Praktikumsmöglichkeiten in globalen Unternehmen</li>
                  <li>• Arbeitserlaubnis nach dem Studium</li>
              </ul>
          </div>
      </div>

      <div class="overflow-x-auto mb-12 border border-gold/10 rounded-2xl">
          <table class="w-full text-left text-sm">
              <thead class="bg-navy text-gold uppercase tracking-widest text-[10px]">
                  <tr>
                      <th class="p-6">Fachbereich</th>
                      <th class="p-6">Jährliche Gebühr</th>
                      <th class="p-6">Unterrichtssprache</th>
                  </tr>
              </thead>
              <tbody class="divide-y divide-gold/5 italic text-zinc-600">
                  <tr>
                      <td class="p-6 font-bold text-navy">Ingenieurwesen / BWL</td>
                      <td class="p-6">3.000 € - 4.500 €</td>
                      <td class="p-6">Englisch</td>
                  </tr>
                  <tr>
                      <td class="p-6 font-bold text-navy">Medizin / Zahnmedizin</td>
                      <td class="p-6">11.000 € - 14.000 €</td>
                      <td class="p-6">Englisch</td>
                  </tr>
              </tbody>
          </table>
      </div>
    `,
      advantages: [
        {
          title: "Sınavsız Kabul",
          desc: "Türkiye'de sınav şartı aranmadan doğrudan lise diploması ile başvuru.",
        },
        {
          title: "Mavi Diploma",
          desc: "Tüm AB ülkelerinde ve Türkiye'de (YÖK) doğrudan tanınan diploma.",
        },
        {
          title: "Ekonomik Maliyetler",
          desc: "Yıllık €3,000'dan başlayan harçlar ve uygun yaşam giderleri.",
        },
      ],
      advantages_en: [
        {
          title: "No Exam Admission",
          desc: "Application directly with a high school diploma without entrance exams.",
        },
        {
          title: "Blue Diploma",
          desc: "Diploma recognized across all EU countries and Turkey (YÖK).",
        },
        {
          title: "Economical Costs",
          desc: "Tuition fees starting from €3,000 per year and affordable living expenses.",
        },
      ],
      advantages_de: [
        {
          title: "Zulassung ohne Prüfung",
          desc: "Bewerbung direkt mit dem Abitur ohne Aufnahmeprüfungen.",
        },
        {
          title: "Blaues Diplom",
          desc: "In allen EU-Ländern und der Türkei (YÖK) anerkanntes Diplom.",
        },
        {
          title: "Wirtschaftliche Kosten",
          desc: "Studiengebühren ab 3.000 € pro Jahr und erschwingliche Lebenshaltungskosten.",
        },
      ],
      process: [
        {
          title: "Okul Seçimi & Kabul",
          desc: "Bölüm tercihi ve kabul mektubunun (Acceptance) alınması.",
        },
        {
          title: "Kayıt ve Apostil",
          desc: "Kayıt dosyasının hazırlanması ve evrakların resmi onay süreçleri.",
        },
        {
          title: "Oturum Kartı",
          desc: "Polonya'ya varış sonrası geçici oturum kartı (Karta Pobytu) başvurusu.",
        },
      ],
      process_en: [
        {
          title: "School Selection & Admission",
          desc: "Choosing the department and receiving the Acceptance Letter.",
        },
        {
          title: "Enrollment and Apostille",
          desc: "Preparation of the enrollment file and official approval processes for documents.",
        },
        {
          title: "Residence Card",
          desc: "Application for a temporary residence card (Karta Pobytu) after arrival in Poland.",
        },
      ],
      process_de: [
        {
          title: "Schulauswahl & Zulassung",
          desc: "Wahl des Fachbereichs und Erhalt des Zulassungsbescheids.",
        },
        {
          title: "Genehmigung und Apostille",
          desc: "Vorbereitung der Genehmigungsunterlagen und offizielle Genehmigungsprozesse für Dokumente.",
        },
        {
          title: "Aufenthaltskarte",
          desc: "Beantragung einer befristeten Aufenthaltskarte (Karta Pobytu) nach der Ankunft in Polen.",
        },
      ],
      faq: [
        {
          q: "Polonya'da tıp okumak mümkün mü?",
          a: "Evet, Polonya tıp ve diş hekimliği eğitiminde İngilizce programlarıyla oldukça popülerdir.",
        },
      ],
      faq_en: [
        {
          q: "Is it possible to study medicine in Poland?",
          a: "Yes, Poland is very popular for medicine and dentistry education with its English programs.",
        },
      ],
      faq_de: [
        {
          q: "Ist es möglich, in Polen Medizin zu studieren?",
          a: "Ja, Polen ist für Medizin- und Zahnmedizinstudien mit seinen englischsprachigen Programmen sehr beliebt.",
        },
      ],
      universities: [
        {
          slug: "university-of-warsaw",
          name: "University of Warsaw",
          ranking: "#1 in Poland",
          worldRanking: "#262 Global",
          annualTuition: "€2,500 - €4,500",
          highlights: [
            "Başkentin En Köklü Okulu",
            "Siyaset ve Sosyal Bilimlerde Öncü",
          ],
          departments: [
            "Uluslararası İlişkiler",
            "Fizik",
            "Ekonomi",
            "Psikoloji",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Varşova Üniversitesi, Polonya'nın sadece en büyük değil, aynı zamanda en prestijli akademik kurumudur. UNESCO listesindeki tarihi kampüsü, modern araştırma merkezleriyle birleşir.</p>
            <p class="text-zinc-600">Özellikle matematik ve sosyal bilimler alanında dünya çapında mezunlar veren üniversite, Polonya'nın entelektüel kalbidir.</p>
          </div>
        `,
        },
        {
          slug: "warsaw-university-of-technology",
          name: "Warsaw University of Technology",
          ranking: "Top Engineering",
          worldRanking: "#501 Global",
          annualTuition: "€3,000 - €5,000",
          highlights: [
            "Teknik Eğitimde Lider",
            "Havacılık ve Yazılım Uzmanlığı",
          ],
          departments: [
            "Havacılık Mühendisliği",
            "Yazılım Mühendisliği",
            "İnşaat",
            "Elektronik",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Orta Avrupa'nın en iyi teknik üniversitelerinden biri olan Varşova Teknik, mühendislik alanında mükemmeliyet merkezidir. Sanayi ile olan iş birlikleri sayesinde öğrencilerine geniş staj imkanları sunar.</p>
            <p class="text-zinc-600">Üniversitenin havacılık ve uzay bilimleri fakültesi, Avrupa'nın en saygın programları arasındadır.</p>
          </div>
        `,
        },
        {
          slug: "jagiellonian-university",
          name: "Jagiellonian University",
          ranking: "Historic Elite",
          worldRanking: "#304 Global",
          annualTuition: "€4,000 - €12,000 (Medical focus)",
          highlights: [
            "Avrupa'nın En Eski Üniversitelerinden",
            "Tıp Eğitiminde Dünya Markası",
          ],
          departments: ["Tıp", "Hukuk", "Felsefe", "Biyoteknoloji"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Krakow'un tarihi dokusuyla iç içe olan Jagiellonian Üniversitesi, 1364 yılında kurulmuştur. Kopernik ve Papa II. Ioannes Paulus gibi isimlerin mezun olduğu bu okul, yaşayan bir tarihtir.</p>
            <p class="text-zinc-600">Tıp fakültesi (Collegium Medicum), İngilizce tıp eğitimi almak isteyen uluslararası öğrenciler için Avrupa'daki en popüler destinasyonlardan biridir.</p>
          </div>
        `,
        },
        {
          slug: "wroclaw-university-of-science-and-technology",
          name: "Wroclaw University of Science and Technology",
          ranking: "Tech Powerhouse",
          worldRanking: "#801 Global",
          annualTuition: "€2,500 - €4,000",
          highlights: ["Modern Mühendislik", "IT ve Otomasyon Lideri"],
          departments: [
            "Bilgisayar Bilimleri",
            "Mekanik",
            "Elektrik",
            "Yönetim",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Wroclaw, Polonya'nın teknoloji üssü olarak bilinir. Üniversite, robotik ve bilgisayar bilimlerinde pratik odaklı eğitimiyle Google ve Nokia gibi devlerin ana yetenek kaynağıdır.</p>`,
        },
        {
          slug: "agh-university",
          name: "AGH University of Science and Technology",
          ranking: "Mining & Tech Leader",
          worldRanking: "#801 Global",
          annualTuition: "€2,000 - €3,500",
          highlights: ["Uygulamalı Bilimler", "Madencilik ve Malzeme Bilimi"],
          departments: [
            "Enerji Mühendisliği",
            "Malzeme Bilimi",
            "Jeoloji",
            "İletişim",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Krakow'da yer alan AGH, Polonya'nın en dinamik teknik üniversitelerinden biridir. Özellikle enerji, madencilik ve modern malzeme teknolojilerinde uzmanlaşmıştır.</p>`,
        },
        {
          slug: "adam-mickiewicz-university",
          name: "Adam Mickiewicz University",
          ranking: "Academic Excellence",
          worldRanking: "#701 Global",
          annualTuition: "€2,000 - €3,500",
          highlights: ["Güçlü Sosyal Bilimler", "Dil ve Edebiyat Merkezi"],
          departments: [
            "İngiliz Filolojisi",
            "Biyoloji",
            "Kimya",
            "Siyaset Bilimi",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Poznan'da bulunan üniversite, Polonya'nın en büyük üçüncü üniversitesidir. Özellikle beşeri bilimler ve doğa bilimleri alanındaki araştırmalarıyla tanınır.</p>`,
        },
        {
          slug: "kozminski-university",
          name: "Kozminski University",
          ranking: "Top Business School",
          worldRanking: "Triple Crown Accredited",
          annualTuition: "€4,000 - €6,000",
          highlights: ["Financial Times Listesinde", "Küresel İşletme Eğitimi"],
          departments: [
            "Uluslararası İşletme",
            "Finans",
            "Yönetim",
            "Pazarlama",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Kozminski, Orta ve Doğu Avrupa'nın en iyi özel işletme okuludur. EQUIS, AMBA ve AACSB akreditasyonlarına sahip olan nadir okullardan biridir.</p>`,
        },
        {
          slug: "medical-university-of-warsaw",
          name: "Medical University of Warsaw",
          ranking: "Top Medical",
          worldRanking: "#801 Global",
          annualTuition: "€11,000 - €15,000",
          highlights: ["Tıp ve Diş Hekimliği", "Modern Klinik Eğitim"],
          departments: [
            "Tıp",
            "Diş Hekimliği",
            "Eczacılık",
            "Sağlık Bilimleri",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Polonya'nın başkentinde yer alan bu tıp üniversitesi, en son teknolojiyle donatılmış hastaneleri ve uluslararası öğretim kadrosuyla kaliteli bir tıp eğitimi sunar.</p>`,
        },
        {
          slug: "university-of-wroclaw",
          name: "University of Wroclaw",
          ranking: "Classic Excellence",
          worldRanking: "#801 Global",
          annualTuition: "€2,000 - €4,000",
          highlights: ["Nobel Ödüllü Geçmiş", "Sanat ve Bilim"],
          departments: [
            "Tarih",
            "Hukuk",
            "Gazetecilik",
            "Uluslararası İlişkiler",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Tarih boyunca 9 Nobel ödülü kazanmış kişiye ev sahipliği yapmış olan bu üniversite, derin akademik kökleri ve canlı öğrenci ortamıyla Wroclaw'ın kalbidir.</p>`,
        },
        {
          slug: "gdansk-university-of-technology",
          name: "Gdansk University of Technology",
          ranking: "Research University",
          worldRanking: "#801 Global",
          annualTuition: "€2,500 - €4,000",
          highlights: ["Gemi İnşa ve Denizcilik", "Ekolojik Mühendislik"],
          departments: [
            "Gemi İnşa Mühendisliği",
            "Mimarlık",
            "Çevre Mühendisliği",
            "Fizik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Baltık Denizi kıyısında yer alan Gdansk Teknik, özellikle denizcilik teknolojileri ve mimarlık alanında Polonya'nın en saygın okullarından biridir.</p>`,
        },
      ],
    },
    macaristan: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Macaristan: Orta Avrupa'nın Bilim ve Tıp Merkezi</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Avrupa'nın kalbinde yer alan Macaristan, özellikle tıp, diş hekimliği ve veterinerlik gibi sağlık bilimlerinde asırlık bir eğitim geleneğine sahiptir. Nobel ödüllü bilim insanlarının yetiştiği bu topraklar, yüksek standartlarda eğitimi ekonomik yaşam koşullarıyla birleştirir.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademik Miras</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Macar üniversiteleri, Avrupa'nın en eski ve en prestijli kurumları arasında yer alır. Özellikle teknik ve medikal alanlarda verilen diplomalar dünya genelinde yüksek saygınlığa sahiptir.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Global Geçerli Tıp Diplomaları</li>
                  <li>• Güçlü Mühendislik Gelenekleri</li>
                  <li>• Nobel Ödüllü Araştırma Ortamı</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Ekonomik Yaşam</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Diğer AB ülkelerine kıyasla konaklama ve günlük yaşam maliyetleri oldukça düşüktür. Öğrenciler, bütçelerini zorlamadan kaliteli bir Avrupa deneyimi yaşarlar.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Düşük Harç ve Yaşam Giderleri</li>
                  <li>• Güvenli ve Kozmopolit Şehirler</li>
                  <li>• AB Genelinde Geçerli Mavi Diploma</li>
              </ul>
          </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Öne Çıkan Bölümler</h3>
              <ul class="space-y-3 text-sm text-zinc-600 italic font-bold">
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> Tıp ve Diş Hekimliği</li>
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> Veterinerlik</li>
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> Mimarlık ve Mühendislik</li>
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> Uluslararası İşletme</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-secondary/5 border border-secondary/10 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Kabul Şartları</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Macaristan üniversiteleri, medikal ve teknik bölümler için kendi giriş sınavlarını uygular. Yeterli olmayan öğrenciler için bir yıllık "Foundation" eğitimi zorunludur.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Lise Diploması & Transkript</li>
                  <li>• İngilizce Yeterlilik (IELTS/TOEFL)</li>
                  <li>• Üniversite Giriş Sınavı (Medikal/Teknik)</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Hungary: Central Europe's Center for Science and Medicine</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">With a centuries-old tradition in medical sciences, Hungary offers high-quality education in medicine, dentistry, and veterinary studies. It combines Nobel-winning academic standards with highly affordable living costs.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Academic Heritage</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Hungarian universities are among the oldest and most prestigious in Europe. Diplomas, especially in technical and medical fields, have high global recognition.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Globally Valid Medical Diplomas</li>
                  <li>• Strong Engineering Traditions</li>
                  <li>• Nobel Prize Research Environment</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Economic Life</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Compared to other EU countries, accommodation and daily living costs are very low. Students enjoy a high-quality European experience without breaking the budget.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Low Tuition and Living Costs</li>
                  <li>• Safe and Cosmopolitan Cities</li>
                  <li>• EU-Wide Valid Blue Diploma</li>
              </ul>
          </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Featured Programs</h3>
              <ul class="space-y-3 text-sm text-zinc-600 italic font-bold">
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> Medicine and Dentistry</li>
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> Veterinary Medicine</li>
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> Architecture and Engineering</li>
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> International Business</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-secondary/5 border border-secondary/10 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Admission Requirements</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Hungarian universities apply their own entrance exams for medical and technical departments. A one-year "Foundation" education is mandatory for students who are not sufficient.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• High School Diploma & Transcript</li>
                  <li>• English Proficiency (IELTS/TOEFL)</li>
                  <li>• University Entrance Exam (Medical/Technical)</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Ungarn: Zentraleuropas Zentrum für Wissenschaft und Medizin</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Mit einer jahrhundertealten Tradition in den medizinischen Wissenschaften bietet Ungarn eine hochwertige Ausbildung in Medizin, Zahnmedizin und Veterinärmedizin. Es kombiniert Nobelpreis-gekrönte akademische Standards mit sehr erschwinglichen Lebenshaltungskosten.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademisches Erbe</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Ungarische Universitäten gehören zu den ältesten und prestigeträchtigsten in Europa. Diplome, insbesondere in technischen und medizinischen Bereichen, genießen weltweit hohe Anerkennung.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Weltweit gültige medizinische Diplome</li>
                  <li>• Starke Ingenieurtraditionen</li>
                  <li>• Nobelpreis-Forschungsumfeld</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Wirtschaftliches Leben</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Im Vergleich zu anderen EU-Ländern sind die Kosten für Unterkunft und das tägliche Leben sehr niedrig. Studierende genießen eine hochwertige europäische Erfahrung, ohne das Budget zu sprengen.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Niedrige Studien- und Lebenshaltungskosten</li>
                  <li>• Sichere und kosmopolitische Städte</li>
                  <li>• EU-weit gültiges Blaues Diplom</li>
              </ul>
          </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Ausgewählte Programme</h3>
              <ul class="space-y-3 text-sm text-zinc-600 italic font-bold">
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> Medizin und Zahnmedizin</li>
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> Tiermedizin</li>
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> Architektur und Ingenieurwesen</li>
                  <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span> International Business</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-secondary/5 border border-secondary/10 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Zulassungsvoraussetzungen</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Ungarische Universitäten führen eigene Aufnahmeprüfungen für medizinische und technische Fachbereiche durch. Eine einjährige "Foundation"-Ausbildung ist für Studierende, die nicht ausreichen, obligatorisch.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Abiturzeugnis & Transkript</li>
                  <li>• Englischkenntnisse (IELTS/TOEFL)</li>
                  <li>• Hochschulaufnahmeprüfung (Medizin/Technik)</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Tıp Eğitiminde Lider",
          desc: "Avrupa'nın en iyi tıp fakülteleri ve İngilizce tıp eğitimi.",
        },
        {
          title: "Ekonomik Seçenekler",
          desc: "Düşük yaşam maliyetleri ve rekabetçi harç ücretleri.",
        },
        {
          title: "Kültürel Zenginlik",
          desc: "Tarihi Budapeşte şehri ve merkezi Avrupa konumu.",
        },
      ],
      advantages_en: [
        {
          title: "Leader in Medical Education",
          desc: "Top medical faculties in Europe and English-taught medicine.",
        },
        {
          title: "Economical Options",
          desc: "Low living costs and competitive tuition fees.",
        },
        {
          title: "Cultural Richness",
          desc: "Historic city of Budapest and a central European location.",
        },
      ],
      advantages_de: [
        {
          title: "Führend in der medizinischen Ausbildung",
          desc: "Erstklassige medizinische Fakultäten in Europa und englischsprachige Medizin.",
        },
        {
          title: "Wirtschaftliche Optionen",
          desc: "Niedrige Lebenshaltungskosten und wettbewerbsfähige Studiengebühren.",
        },
        {
          title: "Kultureller Reichtum",
          desc: "Die historische Stadt Budapest und eine zentrale europäische Lage.",
        },
      ],
      process: [
        {
          title: "Girişim Sınavları",
          desc: "Üniversitelerin kendi medikal veya teknik sınavlarına hazırlık.",
        },
        {
          title: "Kayıt ve Yerleşim",
          desc: "D tipi öğrenci kayıtsi ve yurt/konaklama organizasyonu.",
        },
        {
          title: "Oturum İzni",
          desc: "Macaristan'a varış sonrası resmi kayıt ve oturum işlemleri.",
        },
      ],
      process_en: [
        {
          title: "Entrance Exams",
          desc: "Preparation for the universities' own medical or technical exams.",
        },
        {
          title: "Enrollment and Settlement",
          desc: "D-type student enrollment and dormitory/accommodation organization.",
        },
        {
          title: "Residence Permit",
          desc: "Official registration and residence procedures after arrival in Hungary.",
        },
      ],
      process_de: [
        {
          title: "Aufnahmeprüfungen",
          desc: "Vorbereitung auf die hochschuleigenen medizinischen oder technischen Prüfungen.",
        },
        {
          title: "Genehmigung und Ansiedlung",
          desc: "D-Genehmigung für Studierende und Organisation von Wohnheimen/Unterkünften.",
        },
        {
          title: "Aufenthaltstitel",
          desc: "Offizielle Registrierung und Aufenthaltsverfahren nach der Ankunft in Ungarn.",
        },
      ],
      faq: [
        {
          q: "Hazırlık programları var mı?",
          a: "Evet, hem tıp hem de mühendislik için Pre-Medical ve Pre-Engineering programları mevcuttur.",
        },
      ],
      faq_en: [
        {
          q: "Are there preparatory programs?",
          a: "Yes, Pre-Medical and Pre-Engineering programs are available for both medicine and engineering.",
        },
      ],
      faq_de: [
        {
          q: "Gibt es Vorbereitungsprogramme?",
          a: "Ja, Pre-Medical- und Pre-Engineering-Programme sind sowohl für Medizin als auch für Ingenieurwesen verfügbar.",
        },
      ],
      universities: [
        {
          slug: "semmelweis-university",
          name: "Semmelweis University",
          ranking: "Top Medical",
          worldRanking: "#201-250 Global",
          annualTuition: "€16,000 - €18,500",
          highlights: ["Tıp ve Sağlıkta Bölgesel Lider", "250 Yıllık Tarih"],
          departments: ["Tıp", "Diş Hekimliği", "Eczacılık", "Fizyoterapi"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Budapeşte'nin kalbinde yer alan Semmelweis Üniversitesi, Orta Avrupa'nın tıp ve sağlık bilimleri alanındaki lider araştırma merkezidir. Adını tıp dünyasında çığır açan Ignaz Semmelweis'tan alır.</p>
            <p class="text-zinc-600">Uluslararası öğrenci nüfusunun en yoğun olduğu üniversitelerden biri olup, diplomaları tüm AB ve ABD'de yüksek tanınırlığa sahiptir.</p>
          </div>
        `,
        },
        {
          slug: "elte-budapest",
          name: "Eötvös Loránd University (ELTE)",
          ranking: "#1 in Hungary",
          worldRanking: "#501 Global",
          annualTuition: "€3,000 - €8,500",
          highlights: [
            "Bilim ve Beşeri Bilimlerde Zirve",
            "Nobel Ödüllü Mezunlar",
          ],
          departments: [
            "Psikoloji",
            "Bilgisayar Bilimleri",
            "Uluslararası İlişkiler",
            "Fizik",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">1635 yılında kurulan ELTE, Macaristan'ın en prestijli devlet üniversitesidir. Nobel ödüllü pek çok bilim insanının yetiştiği okul, temel bilimlerde dünya çapında bir saygınlığa sahiptir.</p>
            <p class="text-zinc-600">Beşeri bilimlerden bilişim teknolojilerine kadar geniş bir yelpazede İngilizce eğitim seçenekleri sunar.</p>
          </div>
        `,
        },
        {
          slug: "budapest-university-of-technology-and-economics",
          name: "Budapest University of Tech (BME)",
          ranking: "Top Engineering",
          worldRanking: "#701 Global",
          annualTuition: "€3,500 - €5,000",
          highlights: ["Mühendislikte Mükemmeliyet", "Merkezi Konum"],
          departments: [
            "İnşaat Mühendisliği",
            "Mimarlık",
            "Makine Mühendisliği",
            "Kimya",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">BME, Avrupa'nın en eski teknik üniversitelerinden biridir. Özellikle mimarlık ve mühendislik alanındaki diploması, küresel endüstride yüksek bir prestije sahiptir.</p>`,
        },
        {
          slug: "university-of-debrecen",
          name: "University of Debrecen",
          ranking: "Top in Research",
          worldRanking: "#601 Global",
          annualTuition: "€5,000 - €17,000 (Medical focus)",
          highlights: ["En Geniş Program Yelpazesi", "Uluslararası Kampüs"],
          departments: ["Tıp", "Mühendislik", "Ziraat Bilimleri", "İşletme"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Debrecen Üniversitesi, Macaristan'ın en büyük ikinci araştırma üniversitesidir. Özellikle tıp ve doğa bilimlerinde sunduğu yüksek standartlardaki İngilizce programlarıyla bilinir.</p>`,
        },
        {
          slug: "university-of-szeged",
          name: "University of Szeged",
          ranking: "Sunlight City Excellence",
          worldRanking: "#601 Global",
          annualTuition: "€4,000 - €16,000",
          highlights: ["Araştırma Odaklı Eğitim", "Tıp ve Yaşam Bilimleri"],
          departments: ["Tıp", "Biyoloji", "Bilgisayar Bilimleri", "Hukuk"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Macaristan'ın en iyi araştırma üniversitelerinden biri olan Szeged, özellikle Nobel ödüllü Albert Szent-Györgyi'nin keşiflerine ev sahipliği yapmasıyla ünlüdür.</p>`,
        },
        {
          slug: "university-of-pecs",
          name: "University of Pécs",
          ranking: "Historic Heritage",
          worldRanking: "#701 Global",
          annualTuition: "€5,000 - €15,000",
          highlights: [
            "Macaristan'ın En Eski Üniversitesi",
            "Sanat ve Tıp Bir Arada",
          ],
          departments: [
            "Tıp",
            "Psikoloji",
            "Müzik ve Görsel Sanatlar",
            "Mimarlık",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">1367 yılında kurulan Pécs Üniversitesi, tarihi dokusu ve multikültürel öğrenci yaşamıyla dikkat çeker. Tıp ve diş hekimliği programları oldukça popülerdir.</p>`,
        },
        {
          slug: "corvinus-university-of-budapest",
          name: "Corvinus University of Budapest",
          ranking: "Elite Business",
          worldRanking: "Top in Economics",
          annualTuition: "€3,000 - €6,000",
          highlights: ["İşletme ve Ekonomide Lider", "Siyaset ve Sosyoloji"],
          departments: [
            "Uluslararası İşletme",
            "Uygulamalı Ekonomi",
            "Sosyoloji",
            "Yönetim",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Corvinus, Macaristan'ın işletme ve ekonomi alanındaki en prestijli okuludur. Finans ve uluslararası ilişkiler mezunları, global şirketlerde üst düzey pozisyonlarda yer alır.</p>`,
        },
        {
          slug: "mate-university",
          name: "MATE University (Szent István)",
          ranking: "Agricultural Leader",
          worldRanking: "#1001 Global",
          annualTuition: "€2,500 - €4,500",
          highlights: ["Tarım ve Veterinerlik", "Sürdürülebilir Kalkınma"],
          departments: [
            "Veteriner Hekimlik",
            "Bahçe Bitkileri",
            "Gıda Bilimi",
            "Peyzaj Mimarlığı",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Gödöllő'de yer alan üniversite, tarım ve yaşam bilimlerinde Avrupa'nın önde gelen merkezlerinden biridir. Veterinerlik fakültesi dünya çapında saygındır.</p>`,
        },
        {
          slug: "obuda-university",
          name: "Óbuda University",
          ranking: "Tech Innovation",
          worldRanking: "#1201 Global",
          annualTuition: "€3,000 - €4,500",
          highlights: ["Bilişim ve Robotik", "Uygulamalı Mühendislik"],
          departments: [
            "Bilişim",
            "Robotik Mühendisliği",
            "Elektrik Mühendisliği",
            "İşletme",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Óbuda Üniversitesi, teknik inovasyon ve pratik eğitim anlayışıyla sanayi ile iç içe bir eğitim modeli sunar.</p>`,
        },
        {
          slug: "university-of-miskolc",
          name: "University of Miskolc",
          ranking: "Industrial Heritage",
          worldRanking: "#1201 Global",
          annualTuition: "€2,500 - €4,000",
          highlights: ["Ağır Sanayi ve Teknik Uzmanlık", "Geniş Kampüs"],
          departments: [
            "Makine Mühendisliği",
            "Yer Bilimleri",
            "Malzeme Mühendisliği",
            "Hukuk",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Miskolc, geleneksel teknik eğitimi modern araştırmalarla birleştiren, özellikle mühendislik ve yer bilimlerinde güçlü bir üniversitedir.</p>`,
        },
      ],
    },
    irlanda: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İrlanda: Avrupa'nın Teknoloji Üssü ve İngilizce Eğitim</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Google, Meta, Apple ve Microsoft gibi dünya devlerinin Avrupa merkezlerine ev sahipliği yapan İrlanda, mezunlarına benzersiz kariyer fırsatları sunar. İngilizce ana dili olan bir ülkede, güvenli ve prestijli bir eğitim deneyimi yaşarsınız.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Kariyer ve İstihdam</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">İrlanda, "Silicon Docks" bölgesiyle Avrupa'nın teknoloji kalbidir. Mezuniyet sonrası sunulan çalışma izinleri, öğrencilerin bu global devlerde kariyerlerine başlamasını sağlar.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Mezuniyet Sonrası 1-2 Yıl Çalışma İzni</li>
                  <li>• Dünya Devlerine Doğrudan Erişim</li>
                  <li>• Güçlü Yazılım ve Finans Sektörü</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Akademik Prestij</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Oxford ve Cambridge geleneğine benzer köklü üniversiteleriyle İrlanda, araştırma odaklı ve inovatif bir müfredat sunar.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Trinity College Dublin (Dünya Top 100)</li>
                  <li>• İngilizce Ana Dilde Eğitim</li>
                  <li>• Global Geçerliliği Olan Diplomalar</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Ireland: Europe's Tech Hub and English-Speaking Education</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Home to the European headquarters of giants like Google and Apple, Ireland offers unmatched career paths. In a safe, English-speaking environment, you will receive a prestigious education with global recognition.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Career and Employment</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Ireland, with its "Silicon Docks," is the tech heart of Europe. Post-study work permits allow students to start their careers at these global giants.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• 1-2 Year Post-Study Work Permit</li>
                  <li>• Direct Access to Global Giants</li>
                  <li>• Strong Software and Finance Sector</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Academic Prestige</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">With prestigious universities similar to the Oxford and Cambridge traditions, Ireland offers a research-oriented and innovative curriculum.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Trinity College Dublin (World Top 100)</li>
                  <li>• English-Medium Education</li>
                  <li>• Globally Recognized Diplomas</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Irland: Europas Technologiezentrum und englischsprachige Bildung</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Als Standort der europäischen Hauptquartiere von Giganten wie Google und Apple bietet Irland unvergleichliche Karrierewege. In einer sicheren, englischsprachigen Umgebung erhalten Sie eine prestigeträchtige Ausbildung mit weltweiter Anerkennung.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Karriere und Beschäftigung</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Irland ist mit seinen "Silicon Docks" das Technologieherz Europas. Arbeitserlaubnisse nach dem Studium ermöglichen es den Studierenden, ihre Karriere bei diesen globalen Giganten zu beginnen.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• 1-2 Jahre Arbeitserlaubnis nach dem Studium</li>
                  <li>• Direkter Zugang zu globalen Giganten</li>
                  <li>• Starker Software- und Finanzsektor</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Akademisches Ansehen</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Mit prestigeträchtigen Universitäten in der Tradition von Oxford und Cambridge bietet Irland einen forschungsorientierten und innovativen Lehrplan.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Trinity College Dublin (Weltweit Top 100)</li>
                  <li>• Englischsprachige Ausbildung</li>
                  <li>• Weltweit anerkannte Diplome</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Çalışma İzni",
          desc: "Mezuniyet sonrası İrlanda'da kalıp tecrübe edinme fırsatı.",
        },
        {
          title: "Dil Avantajı",
          desc: "İngilizcenin ana dil olduğu bir ülkede doğal dil pratiği.",
        },
        {
          title: "Teknoloji Odaklılık",
          desc: "Sektörle iç içe, inovatif ve modern eğitim modelleri.",
        },
      ],
      advantages_en: [
        {
          title: "Work Permit",
          desc: "Opportunity to stay and gain experience in Ireland after graduation.",
        },
        {
          title: "Language Advantage",
          desc: "Natural language practice in a country where English is the native language.",
        },
        {
          title: "Tech Focused",
          desc: "Innovative and modern educational models integrated with the industry.",
        },
      ],
      advantages_de: [
        {
          title: "Arbeitserlaubnis",
          desc: "Möglichkeit, nach dem Abschluss in Irland zu bleiben und Erfahrungen zu sammeln.",
        },
        {
          title: "Sprachvorteil",
          desc: "Natürliche Sprachpraxis in einem Land, in dem Englisch die Muttersprache ist.",
        },
        {
          title: "Technologieorientiert",
          desc: "Innovative und moderne Bildungsmodelle, die in die Industrie integriert sind.",
        },
      ],
      process: [
        {
          title: "Program Seçimi",
          desc: "Akademik profilinize uygun university ve bölüm tespiti.",
        },
        {
          title: "Kayıt Hazırlığı",
          desc: "İrlanda kayıtsi için gerekli finansal ve akademik dosya yönetimi.",
        },
        {
          title: "Kariyer Planlama",
          desc: "Staj ve mezuniyet sonrası iş imkanları hakkında rehberlik.",
        },
      ],
      process_en: [
        {
          title: "Program Selection",
          desc: "Identification of university and department suitable for your academic profile.",
        },
        {
          title: "Enrollment Preparation",
          desc: "Management of the financial and academic file required for the Ireland enrollment.",
        },
        {
          title: "Career Planning",
          desc: "Guidance on internship and post-graduation job opportunities.",
        },
      ],
      process_de: [
        {
          title: "Programmauswahl",
          desc: "Identifizierung der für Ihr akademisches Profil geeigneten Universität und Abteilung.",
        },
        {
          title: "Genehmigungsvorbereitung",
          desc: "Verwaltung der für das Irland-Genehmigung erforderlichen finanziellen und akademischen Unterlagen.",
        },
        {
          title: "Karriereplanung",
          desc: "Beratung zu Praktikums- und Jobmöglichkeiten nach dem Abschluss.",
        },
      ],
      faq: [
        {
          q: "İrlanda'da kayıt süreci nasıldır?",
          a: "Finansal yeterlilik ve akademik kabulün net olduğu durumlarda kayıt süreci şeffaf ilerler.",
        },
      ],
      faq_en: [
        {
          q: "How is the enrollment process in Ireland?",
          a: "The enrollment process is transparent when financial sufficiency and academic admission are clear.",
        },
      ],
      faq_de: [
        {
          q: "Wie ist der Genehmigungsprozess in Irland?",
          a: "Der Genehmigungsprozess ist transparent, wenn die finanzielle Leistungsfähigkeit und die akademische Zulassung geklärt sind.",
        },
      ],
      universities: [
        {
          slug: "trinity-college-dublin",
          name: "Trinity College Dublin (TCD)",
          ranking: "#1 in Ireland",
          worldRanking: "#81 Global",
          annualTuition: "€18,000 - €26,000",
          highlights: ["Tarihi Miras", "İrlanda'nın En Prestijli Okulu"],
          departments: ["Edebiyat", "Tıp", "Hukuk", "Bilgisayar Bilimleri"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">1592 yılında kurulan Trinity College Dublin, İrlanda'nın akademik kalbidir. Dublin'in merkezindeki ikonik kampüsü ve "Book of Kells"e ev sahipliği yapan kütüphanesiyle dünya çapında bir üne sahiptir.</p>
            <p class="text-zinc-600">Araştırma yoğunluklu eğitimi ve global networkü sayesinde mezunları, dünyanın her yerinde kapıları sonuna kadar açan bir diplomaya sahip olurlar.</p>
          </div>
        `,
        },
        {
          slug: "ucd",
          name: "University College Dublin (UCD)",
          ranking: "#2 in Ireland",
          worldRanking: "#171 Global",
          annualTuition: "€16,000 - €25,000",
          highlights: [
            "Geniş Kampüs Olanakları",
            "İşletme ve Mühendislikte Lider",
          ],
          departments: ["İşletme", "Mühendislik", "Tarım", "Veterinerlik"],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">UCD, İrlanda'nın en büyük üniversitesidir. Özellikle Smurfit Business School ile işletme alanında "Triple Crown" akreditasyonuna sahip dünya çapında bir merkezdir.</p>
            <p class="text-zinc-600">Modern kampüsü, devasa spor tesisleri ve 140'tan fazla ülkeden gelen öğrenci kitlesiyle tam bir global köydür.</p>
          </div>
        `,
        },
        {
          slug: "university-of-galway",
          name: "University of Galway",
          ranking: "Top Research",
          worldRanking: "#289 Global",
          annualTuition: "€15,000 - €23,000",
          highlights: [
            "Yaşam Bilimleri ve Sanat Merkezi",
            "Atlantik Kıyısında Kampüs",
          ],
          departments: [
            "Tıp",
            "Biyomedikal Mühendisliği",
            "Sanat",
            "Deniz Bilimleri",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">İrlanda'nın batı kıyısında, kültürel başkent Galway'de yer alan üniversite, özellikle tıbbi cihaz teknolojilerinde küresel bir mükemmeliyet merkezidir.</p>
            <p class="text-zinc-600">Şehrin dinamik ve sanatsal ruhu üniversitenin eğitim anlayışına da yansımış olup, yaratıcılık ve bilim burada iç içedir.</p>
          </div>
        `,
        },
        {
          slug: "university-college-cork",
          name: "University College Cork (UCC)",
          ranking: "Sustainability Leader",
          worldRanking: "#292 Global",
          annualTuition: "€16,000 - €22,000",
          highlights: [
            "Yeşil Bayrak Ödüllü İlk Üniversite",
            "Gıda Bilimi ve Hukuk",
          ],
          departments: ["Gıda Bilimi", "Hukuk", "Tıp", "Mikrobiyoloji"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UCC, İrlanda'nın güneyinde, Cork şehrinde yer alır. Sürdürülebilirlik alanında dünya çapında bir model olan üniversite, özellikle gıda teknolojileri ve tıp alanında çok güçlüdür.</p>`,
        },
        {
          slug: "dublin-city-university",
          name: "Dublin City University (DCU)",
          ranking: "Innovation Leader",
          worldRanking: "#436 Global",
          annualTuition: "€14,000 - €18,000",
          highlights: ["Girişimci Üniversite", "İş Dünyası ile Sıkı Bağlar"],
          departments: [
            "İletişim",
            "Veri Analitiği",
            "İşletme",
            "Eğitim Bilimleri",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">DCU, modern yapısı ve "yarına hazır" mezunlar yetiştirme vizyonuyla bilinir. İrlanda'nın Silikon rıhtımlarına (Silicon Docks) olan yakınlığı, öğrencilere muazzam bir ağ sağlar.</p>`,
        },
        {
          slug: "university-of-limerick",
          name: "University of Limerick (UL)",
          ranking: "Best Student Experience",
          worldRanking: "#426 Global",
          annualTuition: "€14,000 - €19,000",
          highlights: ["En Büyük Co-op Programı", "Spor Bilimlerinde Zirve"],
          departments: [
            "Havacılık Mühendisliği",
            "Spor Bilimleri",
            "Müzik ve Dans",
            "Yazılım",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UL, İrlanda'nın en yüksek istihdam oranına sahip üniversitelerinden biridir. Geniş kampüsü ve sanayi odaklı eğitim modeliyle pratik bilgiye önem veren öğrenciler için idealdir.</p>`,
        },
        {
          slug: "maynooth-university",
          name: "Maynooth University",
          ranking: "Fastest Growing",
          worldRanking: "#801 Global",
          annualTuition: "€13,500 - €16,000",
          highlights: [
            "Beşeri Bilimlerde Güçlü",
            "Eski ve Modernin Buluştuğu Kampüs",
          ],
          departments: [
            "Antropoloji",
            "Psikoloji",
            "Bilgisayar Bilimleri",
            "Tarih",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Dublin'e yakınlığı ve huzurlu akademik ortamıyla bilinen Maynooth, özellikle beşeri bilimler ve teorik fizik gibi alanlarda uluslararası saygınlığa sahiptir.</p>`,
        },
        {
          slug: "rcsi-dublin",
          name: "Royal College of Surgeons (RCSI)",
          ranking: "Specialized Excellence",
          worldRanking: "#201-250 Global",
          annualTuition: "€25,000 - €55,000 (Medical focus)",
          highlights: ["Sadece Sağlık Bilimleri", "Global Klinik Deneyim"],
          departments: ["Tıp", "Eczacılık", "Diş Hekimliği", "Fizyoterapi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">RCSI, dünyanın her yerinden gelen tıp öğrencilerine yönelik özel bir sağlık bilimleri üniversitesidir. Mezunları dünya çapında en prestijli hastanelerde görev alır.</p>`,
        },
        {
          slug: "tu-dublin",
          name: "Technological University Dublin",
          ranking: "Industry Focused",
          worldRanking: "#801 Global",
          annualTuition: "€12,500 - €15,500",
          highlights: [
            "İrlanda'nın İlk Teknolojik Üniversitesi",
            "Uygulamalı Sanat ve Bilim",
          ],
          departments: ["Gastronomi", "Mimarlık", "Bilişim", "Ürün Tasarımı"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">TU Dublin, pratik odaklı eğitimi ve sektörle olan organik bağlarıyla bilinir. Şehrin kalbindeki kampüsleri öğrencilere zengin bir şehir hayatı sunar.</p>`,
        },
        {
          slug: "nci-dublin",
          name: "National College of Ireland (NCI)",
          ranking: "Career Oriented",
          worldRanking: "Specialized Center",
          annualTuition: "€10,000 - €14,000",
          highlights: [
            "Veri Bilimi ve İK'da Uzmanlık",
            "Finans Bölgesi Kalbinde",
          ],
          departments: [
            "Veri Bilimi",
            "İnsan Kaynakları",
            "Bulut Bilişim",
            "Pazarlama",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Dublin Finans Merkezi'nin (IFSC) kalbinde yer alan NCI, özellikle iş dünyasının ihtiyaç duyduğu teknik ve yönetsel becerileri kazandırmada uzmanlaşmıştır.</p>`,
        },
        {
          slug: "atu-ireland",
          name: "Atlantic Technological University",
          ranking: "Regional Power",
          worldRanking: "Newly Formed Elite",
          annualTuition: "€10,000 - €13,000",
          highlights: [
            "Kuzeybatı İrlanda'nın Yeni Gücü",
            "Mühendislik ve Tasarım",
          ],
          departments: [
            "Makine Mühendisliği",
            "Tasarım",
            "Biyomedikal",
            "İşletme",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">ATU, İrlanda'nın batı ve kuzeybatısındaki çoklu kampüs yapısıyla, yerel sanayi ile iç içe, yenilikçi ve erişilebilir bir eğitim modeli sunar.</p>`,
        },
        {
          slug: "mtu-ireland",
          name: "Munster Technological University",
          ranking: "South Ireland Tech",
          worldRanking: "#1001 Global",
          annualTuition: "€11,000 - €14,000",
          highlights: ["Cork ve Kerry'de Güçlü Varlık", "Sanat ve Teknoloji"],
          departments: [
            "Müzik",
            "Yazılım Mühendisliği",
            "İşletme Bilgi Sistemleri",
            "Tasarım",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">MTU, özellikle teknoloji ve yaratıcı sanatları birleştiren programlarıyla bilinir. Bölgesel ekonomiye yön veren mezunlar yetiştirir.</p>`,
        },
        {
          slug: "setu-ireland",
          name: "South East Technological University",
          ranking: "Innovation Engine",
          worldRanking: "#1001 Global",
          annualTuition: "€10,500 - €13,500",
          highlights: ["Güneydoğu'nun Eğitim Merkezi", "Spor ve Bilişim"],
          departments: [
            "Spor Yönetimi",
            "Bilişim Teknolojileri",
            "Mühendislik",
            "Pazarlama",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Waterford ve Carlow'da kampüsleri bulunan SETU, bölgedeki global teknoloji ve ilaç şirketleriyle derin iş birliklerine sahiptir.</p>`,
        },
        {
          slug: "shannon-college",
          name: "Shannon College of Hotel Mgmt",
          ranking: "#1 in Hospitality",
          worldRanking: "Elite Hospitality",
          annualTuition: "€15,000 - €18,000",
          highlights: [
            "%100 İşe Yerleştirme",
            "Dünya Çapında Otelcilik Kariyeri",
          ],
          departments: ["Otel Yönetimi", "Girişimcilik", "Turizm"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">University of Galway'in bir parçası olan Shannon College, dünyanın en iyi otelcilik okullarından biridir. Mezunları global lüks otel zincirlerinde yönetici olur.</p>`,
        },
        {
          slug: "dcu-st-patricks",
          name: "St Patrick's College (DCU)",
          ranking: "Top Education",
          worldRanking: "Specialized Hub",
          annualTuition: "€12,000 - €15,000",
          highlights: ["Eğitimde Mükemmeliyet", "Öğretmenlik Kariyeri"],
          departments: ["Eğitim", "Özel Eğitim", "İlköğretim"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">DCU bünyesindeki bu kolej, İrlanda'nın eğitim fakültesi olarak bilinir ve en nitelikli eğitimcileri yetiştirme geleneğine sahiptir.</p>`,
        },
        {
          slug: "mary-immaculate-college",
          name: "Mary Immaculate College (MIC)",
          ranking: "Prestigious Arts",
          worldRanking: "Specialized",
          annualTuition: "€11,000 - €14,000",
          highlights: ["Limerick'te Eğitim ve Sanat", "Butik Kampüs Deneyimi"],
          departments: ["Edebiyat", "Psikoloji", "Eğitim Bilimleri", "Tiyatro"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">MIC, sıcak kampüs atmosferi ve sosyal bilimlerdeki başarısıyla bilinen, Limerick'te yer alan saygın bir yükseköğretim kurumudur.</p>`,
        },
        {
          slug: "griffith-college-ireland",
          name: "Griffith College",
          ranking: "Top Private",
          worldRanking: "Award Winning",
          annualTuition: "€10,000 - €15,000",
          highlights: [
            "Hukuk ve Gazetecilik",
            "Dublin'in Kalbinde Tarihi Bina",
          ],
          departments: ["Hukuk", "Moda Tasarımı", "Gazetecilik", "Bilgi İşlem"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Griffith College, İrlanda'nın en büyük özel yükseköğretim kurumudur. Özellikle hukuk ve tasarım alanındaki ödüllü programlarıyla tanınır.</p>`,
        },
        {
          slug: "dbs-dublin",
          name: "Dublin Business School (DBS)",
          ranking: "Leading Business",
          worldRanking: "Practical Focus",
          annualTuition: "€10,000 - €13,000",
          highlights: [
            "İşletme ve Finans Uzmanlığı",
            "Kariyer Odaklı Müfredat",
          ],
          departments: ["Muhasebe", "Psikoloji", "Pazarlama", "Veri Bilimi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">DBS, Dublin'in merkezinde, çalışan profesyonellere ve uluslararası öğrencilere yönelik pratik ve endüstri odaklı işletme eğitimi sunar.</p>`,
        },
        {
          slug: "dkit-ireland",
          name: "Dundalk Institute of Tech (DkIT)",
          ranking: "Strong Industry Links",
          worldRanking: "#1001 Global",
          annualTuition: "€10,000 - €12,500",
          highlights: [
            "Sınır Bölgesinde İnovasyon",
            "Bilişim ve Yaratıcı Medya",
          ],
          departments: [
            "Yaratıcı Medya",
            "Mühendislik",
            "Sağlık ve Bilim",
            "İşletme",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Dublin ve Belfast arasındaki stratejik konumuyla DkIT, öğrencilerine iki büyük şehre ve geniş bir sanayi ağına erişim imkanı sunar.</p>`,
        },
        {
          slug: "iadt-dublin",
          name: "Institute of Art, Design & Tech",
          ranking: "Top Creative",
          worldRanking: "Specialized Hub",
          annualTuition: "€12,000 - €15,000",
          highlights: ["Sinema ve Medya Sanatları", "Girişimci Yaratıcılık"],
          departments: [
            "Film Prodüksiyonu",
            "Animasyon",
            "Uygulamalı Psikoloji",
            "Görsel Sanatlar",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Iadt, İrlanda'nın tek sanat, tasarım ve teknoloji odaklı enstitüsüdür. Özellikle National Film School'a ev sahipliği yapmasıyla bilinir.</p>`,
        },
      ],
    },
    isvicre: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İsviçre: Prestij, Bilim ve Misafirperverliğin Zirvesi</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Dünyanın en yüksek yaşam standartlarına ev sahipliği yapan İsviçre, akademik dünyada "Altın Standart" olarak kabul edilir. CERN gibi global merkezlere komşu olan üniversiteleriyle bilimde, EHL gibi okullarıyla otelcilikte dünya birincisidir.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Bilim ve İnovasyon</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">ETH Zurich ve EPFL gibi kurumlar, Nobel ödülleri ve teknolojik patentlerde dünya sıralamalarını domine eder. Bilimin sınırlarının zorlandığı bir ortamda eğitim alırsınız.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Avrupa'nın En İyi Teknik Üniversiteleri</li>
                  <li>• Global Ar-Ge Projelerine Katılım</li>
                  <li>• İleri Mühendislik ve Kuantum Laboratuvarları</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Lüks Yönetimi ve Otelcilik</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">İsviçre, modern otelcilik ve lüks marka yönetiminin doğduğu yerdir. Sektörle iç içe, maaşlı staj imkanlarıyla profesyonel dünyaya adım atarsınız.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• #1 Hospitality Eğitimi</li>
                  <li>• Yüksek Maaşlı Staj Olanakları</li>
                  <li>• Diplomatik ve Finansal Network</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Switzerland: The Pinnacle of Prestige, Science, and Hospitality</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Home to the world's highest living standards, Switzerland is considered the "Gold Standard" in academia. With universities adjacent to global hubs like CERN and world-leading schools like EHL in hospitality, it offers a premier global education.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Science and Innovation</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Institutions like ETH Zurich and EPFL dominate world rankings in Nobel prizes and patents. You study in an environment where the boundaries of science are pushed.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Best Technical Universities in Europe</li>
                  <li>• Participation in Global R&D Projects</li>
                  <li>• Advanced Engineering and Quantum Labs</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Luxury Management and Hospitality</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Switzerland is the birthplace of modern hospitality and luxury brand management. Step into the professional world with paid internship opportunities integrated with the industry.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• #1 Hospitality Education</li>
                  <li>• High-Paid Internship Opportunities</li>
                  <li>• Diplomatic and Financial Network</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Schweiz: Der Gipfel von Prestige, Wissenschaft und Gastfreundschaft</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Die Schweiz beheimatet den höchsten Lebensstandard der Welt und gilt in der akademischen Welt als "Goldstandard". Mit Universitäten in der Nähe von globalen Zentren wie dem CERN und weltweit führenden Hotelfachschulen wie der EHL bietet sie eine erstklassige globale Ausbildung.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Wissenschaft und Innovation</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Institutionen wie die ETH Zürich und die EPFL dominieren die Weltranglisten bei Nobelpreisen und Patenten. Sie studieren in einem Umfeld, in dem die Grenzen der Wissenschaft verschoben werden.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Beste technische Universitäten in Europa</li>
                  <li>• Teilnahme an globalen F&E-Projekten</li>
                  <li>• Fortgeschrittene Ingenieur- und Quantenlabore</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Luxusmanagement und Hotellerie</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Die Schweiz ist die Geburtsstätte der modernen Hotellerie und des Luxusmarkenmanagements. Treten Sie mit bezahlten Praktikumsmöglichkeiten, die in die Branche integriert sind, in die Berufswelt ein.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• #1 Hotelfachausbildung</li>
                  <li>• Hochbezahlte Praktikumsmöglichkeiten</li>
                  <li>• Diplomatisches und finanzielles Netzwerk</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Maksimum Prestij",
          desc: "Dünyanın en seçkin kurumlarından birinden mezun olma ayrıcalığı.",
        },
        {
          title: "Maaşlı Stajlar",
          desc: "Özellikle otelcilik ve işletme bölümlerinde yüksek gelirli staj fırsatları.",
        },
        {
          title: "Global Kariyer",
          desc: "BM, WHO ve dünya devlerinin merkezinde stratejik konum.",
        },
      ],
      advantages_en: [
        {
          title: "Maximum Prestige",
          desc: "The privilege of graduating from one of the most elite institutions in the world.",
        },
        {
          title: "Paid Internships",
          desc: "High-income internship opportunities, especially in hospitality and business.",
        },
        {
          title: "Global Career",
          desc: "Strategic location at the center of the UN, WHO, and global giants.",
        },
      ],
      advantages_de: [
        {
          title: "Maximales Prestige",
          desc: "Das Privileg, einen Abschluss an einer der elitärsten Institutionen der Welt zu machen.",
        },
        {
          title: "Bezahlte Praktika",
          desc: "Hochbezahlte Praktikumsmöglichkeiten, insbesondere im Hotelgewerbe und in der Wirtschaft.",
        },
        {
          title: "Globale Karriere",
          desc: "Strategische Lage im Zentrum von UN, WHO und globalen Giganten.",
        },
      ],
      process: [
        {
          title: "Titiz Dosya Hazırlığı",
          desc: "Akademik başarı ve motivasyon mektubu odaklı başvuru süreci.",
        },
        {
          title: "Kayıt ve Mülakat",
          desc: "İsviçre kantonlarına göre değişen kayıt ve mülakat yönetimi.",
        },
        {
          title: "Finansal Planlama",
          desc: "İsviçre'nin yaşam maliyetlerine uygun bütçe ve konaklama desteği.",
        },
      ],
      process_en: [
        {
          title: "Meticulous File Preparation",
          desc: "Application process focused on academic success and motivation letters.",
        },
        {
          title: "Enrollment and Interview",
          desc: "Enrollment and interview management varying according to Swiss cantons.",
        },
        {
          title: "Financial Planning",
          desc: "Budget and accommodation support suitable for Switzerland's cost of living.",
        },
      ],
      process_de: [
        {
          title: "Sorgfältige Unterlagenvorbereitung",
          desc: "Bewerbungsprozess mit Fokus auf akademischen Erfolg und Motivationsschreiben.",
        },
        {
          title: "Genehmigung und Vorstellungsgespräch",
          desc: "Genehmigungs- und Interviewmanagement, das je nach Schweizer Kanton variiert.",
        },
        {
          title: "Finanzplanung",
          desc: "Budget- und Unterkunftsunterstützung passend zu den Lebenshaltungskosten in der Schweiz.",
        },
      ],
      faq: [
        {
          q: "Dil şartları nelerdir?",
          a: "Kantona göre (Almanca, Fransızca veya İtalyanca) değişmekle birlikte, birçok seçkin master programı İngilizcedir.",
        },
      ],
      faq_en: [
        {
          q: "What are the language requirements?",
          a: "Requirements vary by canton (German, French, or Italian), but many elite master's programs are in English.",
        },
      ],
      faq_de: [
        {
          q: "Wie sind die Sprachanforderungen?",
          a: "Die Anforderungen variieren je nach Kanton (Deutsch, Französisch oder Italienisch), aber viele Elite-Masterstudiengänge werden auf Englisch angeboten.",
        },
      ],
      universities: [
        {
          slug: "eth-zurich",
          name: "ETH Zurich",
          ranking: "#1 in Continental Europe",
          worldRanking: "#7 Global",
          annualTuition: "CHF 1,500 (Semester Fees)",
          highlights: [
            "Einstein'ın Mezun Olduğu Okul",
            "Bilim ve Mühendislikte Zirve",
          ],
          departments: [
            "Fizik",
            "Matematik",
            "Bilgisayar Bilimleri",
            "Makine Mühendisliği",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">ETH Zurich, bilim ve teknoloji alanında dünyanın en saygın kurumlarından biridir. Albert Einstein dahil 20'den fazla Nobel ödüllü bilim insanına ev sahipliği yapmış olan üniversite, inovasyonun küresel merkezidir.</p>
            <p class="text-zinc-600">Düşük eğitim harçlarına rağmen sunduğu devasa araştırma bütçeleri ve laboratuvar imkanlarıyla, teknik eğitimde ulaşılabilecek en üst noktadır.</p>
          </div>
        `,
        },
        {
          slug: "ehl-hospitality",
          name: "EHL Hospitality Business School",
          ranking: "#1 in Hospitality",
          worldRanking: "#1 Worldwide",
          annualTuition: "CHF 35,000 - 45,000",
          highlights: ["Otelcilikte Dünya Lideri", "Profesyonel Network"],
          departments: [
            "Otel Yönetimi",
            "Lüks Marka Yönetimi",
            "Ağırlama İşletmeciliği",
            "Mutfak Sanatları",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">1893'te kurulan EHL, ağırlama ve lüks yönetimi eğitiminde dünyanın tartışmasız bir numarasıdır. Lozan'da yer alan okul, öğrencilerine sadece bir diploma değil, küresel lüks sektörünün kapılarını açan bir anahtar sunar.</p>
            <p class="text-zinc-600">Uygulamalı eğitim modeli ve zorunlu staj programları sayesinde mezunları, dünyanın en prestijli otel ve markalarında yönetici pozisyonlarına doğrudan yerleşir.</p>
          </div>
        `,
        },
        {
          slug: "epfl-lausanne",
          name: "EPFL",
          ranking: "Top Technical",
          worldRanking: "#36 Global",
          annualTuition: "CHF 1,500",
          highlights: [
            "Yenilikçi Mühendislik",
            "Cenevre Gölü Kıyısında Modern Kampüs",
          ],
          departments: [
            "Yapay Zeka",
            "Mimarlık",
            "Yaşam Bilimleri",
            "Mikroteknik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Lozan Federal Teknoloji Enstitüsü (EPFL), özellikle disiplinlerarası araştırmalar ve girişimcilikle tanınır. Kampüsü, Avrupa'nın en dinamik teknoloji ekosistemlerinden biridir.</p>`,
        },
        {
          slug: "university-of-zurich",
          name: "University of Zurich (UZH)",
          ranking: "Largest in Switzerland",
          worldRanking: "#91 Global",
          annualTuition: "CHF 1,600",
          highlights: ["Tıp ve Hukukta Güçlü", "Nobel Geleneği"],
          departments: ["Tıp", "Hukuk", "Ekonomi", "Viroloji"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UZH, İsviçre'nin en büyük üniversitesidir. Özellikle tıp ve moleküler biyoloji alanındaki araştırmalarıyla küresel bir prestije sahiptir.</p>`,
        },
        {
          slug: "university-of-st-gallen",
          name: "University of St. Gallen (HSG)",
          ranking: "Top Business in Europe",
          worldRanking: "#1 in Strategy & Management",
          annualTuition: "CHF 6,000 - 10,000",
          highlights: ["İşletme ve Finansın Merkezi", "Seçkin Mezun Ağı"],
          departments: [
            "Strateji ve Uluslararası Yönetim",
            "Finans",
            "Hukuk",
            "Ekonomi",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">HSG, Avrupa'nın en iyi işletme okullarından biri olarak kabul edilir. Mezunları, İsviçre ve Avrupa bankacılık ve finans sektörünün temel taşlarını oluşturur.</p>`,
        },
        {
          slug: "university-of-geneva",
          name: "University of Geneva (UNIGE)",
          ranking: "International Hub",
          worldRanking: "#128 Global",
          annualTuition: "CHF 1,000",
          highlights: [
            "Diplomasi ve Uluslararası İlişkiler",
            "CERN İş Birliği",
          ],
          departments: [
            "Uluslararası İlişkiler",
            "Fizik",
            "Astrobiyoloji",
            "Tercümanlık",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">BM ve çok sayıda uluslararası organizasyonun merkezinde yer alan UNIGE, diplomasi ve küresel yönetim alanında eğitim almak için dünyadaki en stratejik noktadır.</p>`,
        },
        {
          slug: "university-of-basel",
          name: "University of Basel",
          ranking: "Oldest in Switzerland",
          worldRanking: "#136 Global",
          annualTuition: "CHF 1,700",
          highlights: ["Yaşam Bilimleri ve Kimya", "Kültürel Miras"],
          departments: ["Kimya", "İlaç Bilimleri", "Teoloji", "Nanobilim"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">1460'ta kurulan Basel Üniversitesi, özellikle ilaç endüstrisiyle (Roche, Novartis) olan sıkı bağları sayesinde yaşam bilimlerinde dünya lideridir.</p>`,
        },
        {
          slug: "university-of-bern",
          name: "University of Bern",
          ranking: "Capital Excellence",
          worldRanking: "#126 Global",
          annualTuition: "CHF 1,600",
          highlights: ["Uzay Araştırmaları", "Sürdürülebilirlik"],
          departments: [
            "Uzay Bilimleri",
            "İklim Değişikliği",
            "Hukuk",
            "Eczacılık",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Başkent Bern'de yer alan üniversite, özellikle Ay'a giden ilk güneş rüzgarı deneyi gibi uzay araştırmalarındaki başarılarıyla tanınır.</p>`,
        },
        {
          slug: "university-of-lausanne",
          name: "University of Lausanne (UNIL)",
          ranking: "Top Social Sciences",
          worldRanking: "#203 Global",
          annualTuition: "CHF 1,200",
          highlights: [
            "Kriminoloji ve Spor Yönetimi",
            "Göl Kıyısında Akademik Hayat",
          ],
          departments: [
            "Kriminoloji",
            "Spor Bilimleri",
            "Biyoloji",
            "Psikoloji",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Lozan Üniversitesi, sosyal bilimler ve yaşam bilimlerindeki disiplinlerarası yaklaşımıyla öne çıkar. Olimpiyat Komitesi'ne yakınlığıyla spor yönetiminde öncüdür.</p>`,
        },
        {
          slug: "glion-institute",
          name: "Glion Institute of Higher Education",
          ranking: "Elite Hospitality",
          worldRanking: "#4 Hospitality",
          annualTuition: "CHF 35,000 - 45,000",
          highlights: ["Lüks Hizmet Uzmanlığı", "Kişiselleştirilmiş Eğitim"],
          departments: [
            "Lüks Ağırlama Yönetimi",
            "Girişimcilik",
            "Etkinlik Yönetimi",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Glion, dünya çapında lüks konaklama ve deneyim yönetimi alanında uzmanlaşmış butik ve son derece prestijli bir kurumdur.</p>`,
        },
      ],
    },
    avustralya: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Avustralya: Küresel Eğitim ve Eşsiz Kariyer Yolları</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Dünyanın en yaşanabilir şehirlerine ev sahipliği yapan Avustralya, "Group of Eight" (Go8) üniversiteleriyle küresel akademik mükemmeliyet sunar. Mezuniyet sonrası sağlanan 4 yıla kadar çalışma izniyle, kariyerine uluslararası düzeyde başlamak isteyenler için vazgeçilmez bir adrestir.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Kariyer Odaklılık</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Avustralya eğitim sistemi, öğrencilerin mezun olmadan iş dünyasına hazır olmasını hedefler. Sektörel stajlar ve pratik uygulama dersleri eğitimin ayrılmaz parçasıdır.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Post-Study Work Enrollment (2-4 Yıl)</li>
                  <li>• Okurken Haftalık 24 Saat Çalışma İzni</li>
                  <li>• Yüksek İstihdam Oranları</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Yaşam ve Doğa</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Sydney, Melbourne ve Brisbane gibi metropollerde güneşli bir iklim ve güvenli bir ortamda eğitim alırsınız. Modern kampüs imkanlarıyla öğrenci hayatı zirvededir.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Dünyanın En Güvenli Ülkelerinden Biri</li>
                  <li>• Modern ve İleri Teknoloji Kampüsler</li>
                  <li>• Multikültürel ve Hoşgörülü Toplum</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Australia: Global Education and Unique Career Paths</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Hosting some of the world's most livable cities, Australia offers academic excellence through the "Group of Eight" (Go8) universities. With post-study work permits up to 4 years, it is a premier destination for building an international career.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Career Focus</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">The Australian education system aims to have students ready for the business world before they even graduate. Industry internships and practical application courses are an integral part of education.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Post-Study Work Enrollment (2-4 Years)</li>
                  <li>• 24-Hour Weekly Work Permit While Studying</li>
                  <li>• High Employment Rates</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Life and Nature</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">You study in a sunny climate and safe environment in metropolises like Sydney, Melbourne, and Brisbane. Student life is at its peak with modern campus facilities.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• One of the Safest Countries in the World</li>
                  <li>• Modern and High-Tech Campuses</li>
                  <li>• Multicultural and Tolerant Society</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Australien: Globale Bildung und einzigartige Karrierewege</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Australien beheimatet einige der lebenswertesten Städte der Welt und bietet durch die "Group of Eight" (Go8) Universitäten akademische Exzellenz. Mit Arbeitserlaubnissen nach dem Studium von bis zu 4 Jahren ist es ein erstklassiges Ziel für den Aufbau einer internationalen Karriere.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Karrierefokus</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Das australische Bildungssystem zielt darauf ab, dass die Studierenden bereits vor ihrem Abschluss bereit für die Geschäftswelt sind. Branchenpraktika und praktische Anwendungskurse sind integraler Bestandteil der Ausbildung.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Arbeitsgenehmigung nach dem Studium (2-4 Jahre)</li>
                  <li>• Wöchentliche Arbeitserlaubnis von 24 Stunden während des Studiums</li>
                  <li>• Hohe Beschäftigungsquoten</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Leben und Natur</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Sie studieren in einem sonnigen Klima und einer sicheren Umgebung in Metropolen wie Sydney, Melbourne und Brisbane. Das Studentenleben ist mit modernen Campuseinrichtungen auf dem Höhepunkt.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Eines der sichersten Länder der Welt</li>
                  <li>• Moderne und hochtechnologische Campusse</li>
                  <li>• Multikulturelle und tolerante Gesellschaft</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Çalışma Hakları",
          desc: "Eğitim sırasında ve sonrasında sunulan geniş çalışma izinleri.",
        },
        {
          title: "Go8 Prestiji",
          desc: "Avustralya'nın en iyi 8 üniversitesinden dünya çapında geçerli diploma.",
        },
        {
          title: "Yaşam Standartları",
          desc: "Güvenli, güneşli ve yüksek refah seviyesine sahip yaşam.",
        },
      ],
      advantages_en: [
        {
          title: "Work Rights",
          desc: "Extensive work permits offered during and after education.",
        },
        {
          title: "Go8 Prestige",
          desc: "World-renowned degree from Australia's top 8 universities.",
        },
        {
          title: "Living Standards",
          desc: "Safe, sunny life with a high level of prosperity.",
        },
      ],
      advantages_de: [
        {
          title: "Arbeitsrechte",
          desc: "Umfangreiche Arbeitserlaubnisse, die während und nach der Ausbildung angeboten werden.",
        },
        {
          title: "Go8-Prestige",
          desc: "Weltweit anerkannter Abschluss von Australiens Top-8-Universitäten.",
        },
        {
          title: "Lebensstandard",
          desc: "Sicheres, sonniges Leben mit hohem Wohlstandsniveau.",
        },
      ],
      process: [
        {
          title: "GTE Değerlendirmesi",
          desc: "Kayıt için 'Genuine Student' kriterlerinin analizi ve hazırlanması.",
        },
        {
          title: "Okul Kabulü",
          desc: "Transcript ve IELTS/PTE skorları ile merkezi başvuru yönetimi.",
        },
        {
          title: "Kayıt ve Yerleşim",
          desc: "Avustralya öğrenci kayıtsi ve ilk varış desteği.",
        },
      ],
      process_en: [
        {
          title: "GTE Assessment",
          desc: "Analysis and preparation of 'Genuine Student' criteria for enrollment.",
        },
        {
          title: "School Admission",
          desc: "Centralized application management with transcripts and IELTS/PTE scores.",
        },
        {
          title: "Enrollment and Settlement",
          desc: "Australian student enrollment and first arrival support.",
        },
      ],
      process_de: [
        {
          title: "GTE-Bewertung",
          desc: "Analyse und Vorbereitung der 'Genuine Student'-Kriterien für das Genehmigung.",
        },
        {
          title: "Schulzulassung",
          desc: "Zentralisierte Bewerbungsverwaltung mit Transkripten und IELTS/PTE-Ergebnissen.",
        },
        {
          title: "Genehmigung und Ansiedlung",
          desc: "Australisches Studentengenehmigung und Unterstützung bei der ersten Ankunft.",
        },
      ],
      faq: [
        {
          q: "Kayıt süreci ne kadar sürer?",
          a: "Genellikle 4-8 hafta arasında değişen şeffaf bir değerlendirme süreci vardır.",
        },
      ],
      faq_en: [
        {
          q: "How long does the enrollment process take?",
          a: "There is a transparent evaluation process that generally varies between 4-8 weeks.",
        },
      ],
      faq_de: [
        {
          q: "Wie lange dauert das Genehmigungverfahren?",
          a: "Es gibt ein transparentes Bewertungsverfahren, das in der Regel zwischen 4 und 8 Wochen dauert.",
        },
      ],
      universities: [
        {
          slug: "university-of-melbourne",
          name: "University of Melbourne",
          ranking: "#1 in Australia",
          worldRanking: "#14 Global",
          annualTuition: "AUD 35,000 - 50,000",
          highlights: ["Akademik Mükemmeliyet", "Geniş Araştırma Fonları"],
          departments: ["Tıp", "Hukuk", "Mühendislik", "İşletme"],
        },
        {
          slug: "unsw-sydney",
          name: "UNSW Sydney",
          ranking: "Top Engineering",
          worldRanking: "#19 Global",
          annualTuition: "AUD 38,000 - 48,000",
          highlights: ["Teknoloji ve İnovasyon Odağı", "Girişimci Mezunlar"],
          departments: ["Mühendislik", "Güneş Enerjisi", "Yazılım", "Finans"],
        },
      ],
    },
    belcika: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Belçika: Avrupa'nın Kalbinde Ekonomik ve Prestijli Eğitim</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Avrupa Birliği ve NATO'nun merkezi olan Belçika, uluslararası ilişkiler, politika ve mühendislik alanlarında dünya çapında prestijli üniversitelere sahiptir. Devlet üniversitelerinde sunduğu ekonomik eğitim imkanıyla, yüksek kaliteyi erişilebilir kılar.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Stratejik Konum</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Brüksel'in kalbinde eğitim alırken, AB kurumlarına doğrudan erişim sağlar ve uluslararası staj imkanlarından yararlanırsınız. Diplomasi ve ekonomi dünyasına en yakın adrestir.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Avrupa Birliği Başkentinde Eğitim</li>
                  <li>• Çok Dilli ve Kültürel Ortam</li>
                  <li>• Uluslararası Organizasyonlara Yakınlık</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Ekonomik Avantaj</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Belçika üniversiteleri, dünya sıralamalarında üst sıralarda yer almasına rağmen, yıllık harçlar diğer batı ülkelerine göre oldukça ekonomiktir.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Rekabetçi Yıllık Harçlar</li>
                  <li>• Mavi Diploma ve AB Geçerliliği</li>
                  <li>• Güçlü Mühendislik ve Bilim Altyapısı</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Belgium: Affordable and Prestigious Education in the Heart of Europe</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">As the seat of the EU and NATO, Belgium offers world-renowned education in international relations, politics, and engineering. Its public universities provide top-tier academic standards at highly competitive costs.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Strategic Location</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">While studying in the heart of Brussels, you have direct access to EU institutions and benefit from international internship opportunities. It is the closest address to the world of diplomacy and economy.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Education in the Capital of the European Union</li>
                  <li>• Multilingual and Cultural Environment</li>
                  <li>• Proximity to International Organizations</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Economic Advantage</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Although Belgian universities are ranked high in world rankings, annual tuitions are quite economical compared to other western countries.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Competitive Annual Tuitions</li>
                  <li>• Blue Diploma and EU Validity</li>
                  <li>• Strong Engineering and Science Infrastructure</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Belgien: Erschwingliche und renommierte Bildung im Herzen Europas</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Als Sitz der EU und der NATO bietet Belgien eine weltberühmte Ausbildung in internationalen Beziehungen, Politik und Ingenieurwesen. Seine öffentlichen Universitäten bieten erstklassige akademische Standards zu äußerst wettbewerbsfähigen Kosten.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Strategische Lage</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Während Ihres Studiums im Herzen von Brüssel haben Sie direkten Zugang zu den EU-Institutionen und profitieren von internationalen Praktikumsmöglichkeiten. Es ist die direkteste Adresse zur Welt der Diplomatie und Wirtschaft.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Bildung in der Hauptstadt der Europäischen Union</li>
                  <li>• Mehrsprachiges und kulturelles Umfeld</li>
                  <li>• Nähe zu internationalen Organisationen</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Wirtschaftlicher Vorteil</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Obwohl belgische Universitäten in den Weltranglisten weit oben stehen, sind die jährlichen Studiengebühren im Vergleich zu anderen westlichen Ländern recht günstig.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Wettbewerbsfähige jährliche Studiengebühren</li>
                  <li>• Blaues Diplom und EU-Gültigkeit</li>
                  <li>• Starke Ingenieur- und Wissenschaftsinfrastruktur</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Ekonomik Eğitim",
          desc: "Dünya standartlarında eğitim, yıllık €1,000 - €4,500 arası harçlarla sunulur.",
        },
        {
          title: "Stratejik Kariyer",
          desc: "AB kurumları ve uluslararası şirketlerde staj ve iş imkanı.",
        },
        {
          title: "Merkezi Konum",
          desc: "Avrupa'nın tüm başkentlerine hızlı ulaşım ve gezi imkanı.",
        },
      ],
      advantages_en: [
        {
          title: "Economic Education",
          desc: "World-class education is offered with annual tuitions between €1,000 - €4,500.",
        },
        {
          title: "Strategic Career",
          desc: "Internship and job opportunities in EU institutions and international companies.",
        },
        {
          title: "Central Location",
          desc: "Fast access and travel opportunities to all capitals of Europe.",
        },
      ],
      advantages_de: [
        {
          title: "Wirtschaftliche Bildung",
          desc: "Weltklasse-Bildung wird mit jährlichen Studiengebühren zwischen 1.000 € und 4.500 € angeboten.",
        },
        {
          title: "Strategische Karriere",
          desc: "Praktikums- und Jobmöglichkeiten in EU-Institutionen und internationalen Unternehmen.",
        },
        {
          title: "Zentrale Lage",
          desc: "Schneller Zugang und Reisemöglichkeiten in alle Hauptstädte Europas.",
        },
      ],
      process: [
        {
          title: "Denklik ve Kayıt",
          desc: "Diploma denkliği ve üniversite merkezi kayıt süreçleri.",
        },
        {
          title: "Kayıt Dosyası",
          desc: "Belçika konsolosluğu kayıt mülakatı ve evrak hazırlığı.",
        },
        {
          title: "Oryantasyon",
          desc: "Konaklama ve şehir hayatına adaptasyon desteği.",
        },
      ],
      process_en: [
        {
          title: "Equivalency and Enrollment",
          desc: "Diploma equivalency and university central enrollment processes.",
        },
        {
          title: "Enrollment File",
          desc: "Belgium consulate enrollment interview and document preparation.",
        },
        {
          title: "Orientation",
          desc: "Accommodation and city life adaptation support.",
        },
      ],
      process_de: [
        {
          title: "Gleichwertigkeit und Einschreibung",
          desc: "Diplom-Gleichwertigkeit und zentrale Einschreibungsverfahren der Universität.",
        },
        {
          title: "Genehmigung-Akte",
          desc: "Genehmigung-Interview bei der belgischen Botschaft und Dokumentenvorbereitung.",
        },
        {
          title: "Orientierung",
          desc: "Unterstützung bei der Unterkunft und Anpassung an das Stadtleben.",
        },
      ],
      faq: [
        {
          q: "Hangi dilde eğitim veriliyor?",
          a: "Fransızca ve Flamanca ana dillerin yanı sıra birçok İngilizce program mevcuttur.",
        },
      ],
      faq_en: [
        {
          q: "In which language is the education provided?",
          a: "In addition to French and Flemish as primary languages, many English programs are available.",
        },
      ],
      faq_de: [
        {
          q: "In welcher Sprache wird die Ausbildung angeboten?",
          a: "Zusätzlich zu Französisch und Flämisch als Primärsprachen sind viele englischsprachige Programme verfügbar.",
        },
      ],
      universities: [
        {
          slug: "ku-leuven",
          name: "KU Leuven",
          ranking: "#1 in Belgium",
          worldRanking: "#45 Global",
          annualTuition: "€1,250 - €4,500",
          highlights: [
            "Avrupa'nın En Yenilikçi Üniversitesi",
            "Köklü Akademik Gelenek",
          ],
          departments: [
            "Mühendislik",
            "Felsefe",
            "Ekonomi",
            "Psikoloji",
            "Hukuk",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">1425 yılında kurulan KU Leuven, Avrupa'nın en eski ve en prestijli üniversitelerinden biridir. Reuters tarafından üst üste "Avrupa'nın En Yenilikçi Üniversitesi" seçilen kurum, teknoloji ve temel bilimlerde dünya devidir.</p>
            <p class="text-zinc-600">Leuven şehri, üniversite ile iç içe geçmiş bir kampüs şehri atmosferine sahiptir. Mezunları, AB kurumlarından küresel teknoloji şirketlerine kadar çok geniş bir ağda üst düzey görevler alır.</p>
          </div>
        `,
        },
        {
          slug: "ghent-university",
          name: "Ghent University",
          ranking: "Top Research",
          worldRanking: "#95 Global",
          annualTuition: "€1,500 - €3,500",
          highlights: [
            "Biyoteknoloji ve Veterinerlikte Öncü",
            "Araştırma Odaklı",
          ],
          departments: [
            "Veterinerlik",
            "Biyoteknoloji",
            "Sanat",
            "Hukuk",
            "Siyaset Bilimi",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Ghent Üniversitesi, "Dare to Think" mottosuyla özgür düşünceyi ve bilimsel cesareti temsil eder. Özellikle yaşam bilimleri, veterinerlik ve tarım alanlarında dünya sıralamalarında en üst basamaklarda yer alır.</p>
            <p class="text-zinc-600">Ghent'in tarihi ve canlı atmosferinde eğitim alan öğrenciler, güçlü bir araştırma altyapısı ve uluslararası bir akademik topluluğun parçası olurlar.</p>
          </div>
        `,
        },
        {
          slug: "uclouvain",
          name: "Université Catholique de Louvain (UCLouvain)",
          ranking: "Top French-Speaking",
          worldRanking: "#180 Global",
          annualTuition: "€2,500 - €4,175",
          highlights: ["Disiplinlerarası Araştırma", "Güçlü Mezun Ağı"],
          departments: ["Mühendislik", "İşletme (LSM)", "Ekonomi", "Tıp"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UCLouvain, Belçika'nın Fransızca konuşulan bölgesindeki en büyük ve en prestijli üniversitedir. Özellikle Louvain School of Management ile işletme alanında Avrupa çapında tanınır.</p>`,
        },
        {
          slug: "vub-brussels",
          name: "Vrije Universiteit Brussel (VUB)",
          ranking: "Urban Innovation",
          worldRanking: "#251 Global",
          annualTuition: "€1,250 - €3,850",
          highlights: [
            "Brüksel'in Merkezinde",
            "İngilizce Program Çeşitliliği",
          ],
          departments: [
            "Bilişim",
            "Mühendislik",
            "Sosyal Bilimler",
            "Avrupa Çalışmaları",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">VUB, Brüksel'in kalbinde, Avrupa Birliği kurumlarına komşu bir konumda yer alır. "Özgür Sorgulama" ilkesiyle, öğrencilerine eleştirel bir bakış açısı kazandırır.</p>`,
        },
        {
          slug: "ulb-brussels",
          name: "Université Libre de Bruxelles (ULB)",
          ranking: "Global Perspective",
          worldRanking: "#189 Global",
          annualTuition: "€2,500 - €4,175",
          highlights: ["Nobel Ödüllü Akademisyenler", "Multikültürel Kampüs"],
          departments: ["Fizik", "Hukuk", "Siyaset Bilimi", "Mühendislik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">ULB, kurulduğu günden bu yana laiklik ve özgür düşünceyi savunmuştur. Fizik alanındaki Solvay Konferansları ile bilim tarihine adını yazdırmış bir kurumdur.</p>`,
        },
        {
          slug: "university-of-antwerp",
          name: "University of Antwerp",
          ranking: "Top Young University",
          worldRanking: "#248 Global",
          annualTuition: "€1,250 - €3,500",
          highlights: ["Lojistik ve Ekonomi Odağı", "Girişimci Kampüs"],
          departments: ["Lojistik", "Ekonomi", "Eczacılık", "Siyaset Bilimi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Dünyanın en büyük limanlarından birine ev sahipliği yapan Anvers'te, lojistik ve denizcilik ekonomisi alanında uzmanlaşmak isteyenler için bir numaralı adrestir.</p>`,
        },
        {
          slug: "university-of-liege",
          name: "University of Liège",
          ranking: "Aerospace Hub",
          worldRanking: "#450 Global",
          annualTuition: "€1,000 - €3,000",
          highlights: [
            "Uzay ve Havacılık Araştırmaları",
            "Geniş Fakülte Yelpazesi",
          ],
          departments: ["Havacılık", "Veterinerlik", "Biyoloji", "Hukuk"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Liège Üniversitesi, havacılık ve uzay teknolojilerinde Belçika'nın merkezidir. Kendi bünyesindeki teknoparkı ile sanayi işbirliğinde öncüdür.</p>`,
        },
        {
          slug: "hasselt-university",
          name: "Hasselt University",
          ranking: "Innovation Driven",
          worldRanking: "#480 Global",
          annualTuition: "€1,100 - €2,500",
          highlights: ["Küçük Sınıflar, Büyük Projeler", "İstatistik ve Bilim"],
          departments: ["Veri Bilimi", "İşletme", "Biyomedikal", "Mühendislik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Hasselt Üniversitesi, modern ve dinamik eğitim modeliyle tanınır. Özellikle istatistik ve veri bilimi programları uluslararası düzeyde takdir edilmektedir.</p>`,
        },
        {
          slug: "umons",
          name: "University of Mons (UMONS)",
          ranking: "Quality Education",
          worldRanking: "#550 Global",
          annualTuition: "€1,000 - €2,500",
          highlights: ["Mühendislikte Güçlü Gelenek", "Uygulamalı Bilimler"],
          departments: ["Mühendislik", "Eczacılık", "Ekonomi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UMONS, mühendislik fakültesi (Polytech Mons) ile tanınan, Belçika'nın sanayi geçmişine ve geleceğine yön veren köklü bir kurumdur.</p>`,
        },
        {
          slug: "vesalius-college",
          name: "Vesalius College (Brussels)",
          ranking: "Elite Private",
          worldRanking: "Specialized Hub",
          annualTuition: "€14,000 - €16,000",
          highlights: ["Amerikan Stil Eğitim", "%100 İngilizce"],
          departments: [
            "Uluslararası İlişkiler",
            "İşletme",
            "Küresel Güvenlik",
            "Hukuk",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Brüksel'de tamamen İngilizce eğitim veren Vesalius College, özellikle uluslararası hukuk ve küresel yönetişim alanlarında butik ve prestijli bir eğitim sunar.</p>`,
        },
      ],
    },
    hollanda: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Hollanda: İnovatif Eğitim ve Küresel Kariyerin Merkezi</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Kıta Avrupası'nda en fazla İngilizce programa sahip olan Hollanda, "Problem-Based Learning" (PBL) sistemiyle öğrencilerine pratik ve çözüm odaklı bir eğitim sunar. Hoşgörülü toplum yapısı ve güçlü ekonomisiyle uluslararası öğrenciler için ideal bir destinasyondur.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademik Sistem</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Hollanda üniversiteleri, araştırma üniversiteleri (WO) ve uygulamalı bilimler üniversiteleri (HBO) olarak ikiye ayrılır. Her iki sistem de yüksek istihdam odaklıdır.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• İngilizce Program Çeşitliliği</li>
                  <li>• Araştırma ve Uygulama Dengesi</li>
                  <li>• Interaktif Sınıf Ortamları</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Kariyer Fırsatları</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Hollanda, mezunlarına sunduğu "Orientation Year" (İş Arama Yılı) ile yetenekli gençlerin ülkede kalarak global şirketlerde çalışmasını teşvik eder.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Mezuniyet Sonrası 1 Yıl İş Arama İzni</li>
                  <li>• Lojistik, Su ve Enerji Sektörlerinde Lider</li>
                  <li>• Startup Dostu Ekosistem</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Netherlands: Center for Innovative Education and Global Careers</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">With the highest number of English-taught programs in Continental Europe, the Netherlands uses the "Problem-Based Learning" (PBL) system. Its tolerant society and robust economy make it an ideal destination for international students.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Academic System</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Dutch universities are divided into research universities (WO) and universities of applied sciences (HBO). Both systems are highly employment-oriented.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Variety of English Programs</li>
                  <li>• Balance of Research and Practice</li>
                  <li>• Interactive Classroom Environments</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Career Opportunities</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">The Netherlands encourages talented youth to stay and work in global companies with the "Orientation Year" provided to its graduates.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• 1-Year Job Search Permit After Graduation</li>
                  <li>• Leader in Logistics, Water, and Energy Sectors</li>
                  <li>• Startup-Friendly Ecosystem</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Niederlande: Zentrum für innovative Bildung und globale Karrieren</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Mit der höchsten Anzahl an englischsprachigen Programmen in Kontinentaleuropa nutzen die Niederlande das System des "Problem-Based Learning" (PBL). Ihre tolerante Gesellschaft und die robuste Wirtschaft machen sie zu einem idealen Ziel für internationale Studierende.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademisches System</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Niederländische Universitäten unterteilen sich in Forschungsuniversitäten (WO) und Fachhochschulen (HBO). Beide Systeme sind stark beschäftigungsorientiert.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Vielfalt an englischsprachigen Programmen</li>
                  <li>• Ausgewogenheit von Forschung und Praxis</li>
                  <li>• Interaktive Unterrichtsumgebungen</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Karrieremöglichkeiten</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Die Niederlande ermutigen talentierte Jugendliche mit dem für Absolventen angebotenen "Orientierungsjahr", im Land zu bleiben und in globalen Unternehmen zu arbeiten.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• 1-jährige Arbeitserlaubnis nach dem Abschluss</li>
                  <li>• Führend in den Sektoren Logistik, Wasser und Energie</li>
                  <li>• Startup-freundliches Ökosystem</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Zengin İngilizce Seçenekler",
          desc: "Neredeyse tüm yüksek lisans bölümleri İngilizce olarak sunulur.",
        },
        {
          title: "Uluslararası Tanınırlık",
          desc: "Hollanda üniversiteleri dünya sıralamalarında ilk 200'de yoğunlaşmıştır.",
        },
        {
          title: "Orientation Year",
          desc: "Mezunlara Hollanda'da iş bulmaları için verilen 1 yıllık özel izin.",
        },
      ],
      advantages_en: [
        {
          title: "Rich English Options",
          desc: "Almost all master's programs are offered in English.",
        },
        {
          title: "International Recognition",
          desc: "Dutch universities are concentrated in the top 200 of world rankings.",
        },
        {
          title: "Orientation Year",
          desc: "A special 1-year permit given to graduates to find work in the Netherlands.",
        },
      ],
      advantages_de: [
        {
          title: "Reichhaltige englische Optionen",
          desc: "Fast alle Masterstudiengänge werden auf Englisch angeboten.",
        },
        {
          title: "Internationale Anerkennung",
          desc: "Niederländische Universitäten sind in den Top 200 der Weltrangliste konzentriert.",
        },
        {
          title: "Orientierungsjahr",
          desc: "Ein spezielles 1-Jahres-Genehmigung für Absolventen, um Arbeit in den Niederlanden zu finden.",
        },
      ],
      process: [
        {
          title: "Studielink Kaydı",
          desc: "Hollanda'nın merkezi üniversite başvuru sistemi üzerinden kayıt.",
        },
        {
          title: "Kabul ve Kayıt",
          desc: "MVV ve oturum izni süreçlerinin okul tarafından yönetilmesi.",
        },
        {
          title: "Konaklama",
          desc: "Hollanda'daki kısıtlı konaklama imkanları için erken başvuru desteği.",
        },
      ],
      process_en: [
        {
          title: "Studielink Registration",
          desc: "Registration through the central university application system of the Netherlands.",
        },
        {
          title: "Admission and Enrollment",
          desc: "Management of MVV and residence permit processes by the school.",
        },
        {
          title: "Accommodation",
          desc: "Early application support for limited accommodation facilities in the Netherlands.",
        },
      ],
      process_de: [
        {
          title: "Studielink-Registrierung",
          desc: "Registrierung über das zentrale Universitätsbewerbungssystem der Niederlande.",
        },
        {
          title: "Zulassung und Genehmigung",
          desc: "Verwaltung von MVV- und Aufenthaltserlaubnisverfahren durch die Schule.",
        },
        {
          title: "Unterkunft",
          desc: "Unterstützung bei der frühzeitigen Bewerbung für begrenzte Unterkunftsmöglichkeiten in den Niederlanden.",
        },
      ],
      faq: [
        {
          q: "Hollanda'da üniversite harçları ne kadardır?",
          a: "AB dışı öğrenciler için yıllık €8,000 - €20,000 arasında değişmektedir.",
        },
      ],
      faq_en: [
        {
          q: "How much are university tuitions in the Netherlands?",
          a: "For non-EU students, it varies between €8,000 - €20,000 per year.",
        },
      ],
      faq_de: [
        {
          q: "Wie hoch sind die Universitätsgebühren in den Niederlanden?",
          a: "Für Nicht-EU-Studierende variieren sie zwischen 8.000 € und 20.000 € pro Jahr.",
        },
      ],
      universities: [
        {
          slug: "university-of-amsterdam",
          name: "University of Amsterdam (UvA)",
          ranking: "#1 in Netherlands",
          worldRanking: "#55 Global",
          annualTuition: "€10,000 - €16,000",
          highlights: ["Medya ve İletişimde Dünya Birincisi", "Araştırma Gücü"],
          departments: [
            "İletişim",
            "Psikoloji",
            "Hukuk",
            "Ekonomi",
            "Yapay Zeka",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">University of Amsterdam (UvA), Avrupa'nın en büyük ve en köklü araştırma üniversitelerinden biridir. Özellikle Medya ve İletişim Çalışmaları alanında yıllardır dünya birincisi olan UvA, akademik mükemmelliğiyle tanınır.</p>
            <p class="text-zinc-600">Amsterdam'ın kalbine yayılan kampüsleri, öğrencilere Avrupa'nın en kozmopolit şehrinde benzersiz bir yaşam ve network imkanı sunar.</p>
          </div>
        `,
        },
        {
          slug: "tu-delft",
          name: "Delft University of Technology (TU Delft)",
          ranking: "Top Engineering",
          worldRanking: "#47 Global",
          annualTuition: "€15,000 - €21,000",
          highlights: [
            "Mühendislik ve Mimarlıkta Global Marka",
            "İnovasyon Üssü",
          ],
          departments: [
            "Havacılık Mühendisliği",
            "Mimarlık",
            "İnşaat",
            "Endüstriyel Tasarım",
            "Kuantum Bilimi",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">TU Delft, mühendislik ve mimarlık alanında dünyanın "MIT"si olarak kabul edilir. İnovasyon odaklı kampüsü, teknoparkları ve son teknoloji laboratuvarlarıyla mühendislik rüyasının gerçeğe dönüştüğü yerdir.</p>
            <p class="text-zinc-600">Su yönetimi, havacılık ve sürdürülebilir enerji projelerinde küresel bir otorite olan üniversite, mezunlarını geleceğin dünyasını inşa edecek liderler olarak yetiştirir.</p>
          </div>
        `,
        },
        {
          slug: "erasmus-rotterdam",
          name: "Erasmus University Rotterdam",
          ranking: "Business Giant",
          worldRanking: "#176 Global",
          annualTuition: "€9,500 - €18,500",
          highlights: [
            "İşletme ve Ekonomide Avrupa Lideri",
            "RSM Business School",
          ],
          departments: [
            "İşletme (RSM)",
            "Ekonomi",
            "Kamu Yönetimi",
            "Sağlık Bilimleri",
            "Hukuk",
          ],
          detailedDescription: `
          <div class="space-y-4">
            <p class="text-lg leading-relaxed text-zinc-600">Erasmus Üniversitesi Rotterdam, özellikle Rotterdam School of Management (RSM) ile işletme dünyasında küresel bir prestije sahiptir. Ekonomi ve ekonometri alanlarında Avrupa'nın en güçlü programlarını sunar.</p>
            <p class="text-zinc-600">Rotterdam'ın bir ticaret ve lojistik merkezi olması, öğrencilere iş dünyasıyla iç içe bir eğitim ve mezuniyet sonrası hızlı istihdam avantajı sağlar.</p>
          </div>
        `,
        },
        {
          slug: "utrecht-university",
          name: "Utrecht University",
          ranking: "Research Excellence",
          worldRanking: "#107 Global",
          annualTuition: "€10,500 - €15,000",
          highlights: [
            "Sürdürülebilirlik ve Toplum Bilimleri",
            "Nobel Ödüllü Akademisyenler",
          ],
          departments: [
            "Yer Bilimleri",
            "Hukuk",
            "Veterinerlik",
            "Beşeri Bilimler",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Utrecht Üniversitesi, özellikle sürdürülebilir kalkınma ve toplum bilimleri alanındaki araştırmalarıyla tanınır. İnovatif eğitim modelleriyle öğrencilerine disiplinlerarası bir vizyon katar.</p>`,
        },
        {
          slug: "leiden-university",
          name: "Leiden University",
          ranking: "Historic Elite",
          worldRanking: "#126 Global",
          annualTuition: "€11,000 - €17,000",
          highlights: [
            "Hollanda'nın En Eski Üniversitesi",
            "Hukuk ve Diplomasi Merkezi",
          ],
          departments: [
            "Uluslararası Hukuk",
            "Siyaset Bilimi",
            "Asya Çalışmaları",
            "Fizik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">1575'te kurulan Leiden, Hollanda'nın akademik kalbidir. Lahey (The Hague) kampüsü ile uluslararası hukuk ve diplomasi öğrencilerinin dünya genelindeki ilk tercihidir.</p>`,
        },
        {
          slug: "wageningen-university",
          name: "Wageningen University & Research (WUR)",
          ranking: "#1 in Agriculture",
          worldRanking: "#1 Worldwide (Agriculture)",
          annualTuition: "€12,000 - €19,000",
          highlights: [
            "Gıda ve Tarımda Dünya Birincisi",
            "Sürdürülebilirlik Lideri",
          ],
          departments: ["Gıda Teknolojisi", "Çevre Bilimleri", "Biyoteknoloji"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">WUR, tarım, gıda ve çevre bilimleri dendiğinde dünyada akla gelen ilk isimdir. "Food Valley"nin kalbinde, küresel gıda krizine çözüm üreten bilim insanları yetiştirir.</p>`,
        },
        {
          slug: "tue-eindhoven",
          name: "Eindhoven University of Technology (TU/e)",
          ranking: "High-Tech Leader",
          worldRanking: "#124 Global",
          annualTuition: "€15,000 - €18,000",
          highlights: ["Brainport Region Merkezi", "Endüstriyel İş Birliği"],
          departments: [
            "Yazılım Mühendisliği",
            "Elektrik Mühendisliği",
            "Veri Bilimi",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">TU/e, Avrupa'nın teknoloji üssü olan Eindhoven'da, Philips ve ASML gibi devlerle omuz omuza çalışır. Mühendislik eğitiminde pratik uygulama ve sanayi entegrasyonu zirvededir.</p>`,
        },
        {
          slug: "university-of-groningen",
          name: "University of Groningen",
          ranking: "Global Top 100",
          worldRanking: "#75 Global",
          annualTuition: "€9,000 - €15,000",
          highlights: [
            "Geniş İngilizce Program Yelpazesi",
            "Aktif Öğrenci Hayatı",
          ],
          departments: [
            "Astronomi",
            "Ekonomi",
            "Uluslararası Hukuk",
            "Psikoloji",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Groningen, köklü geçmişi ve modern eğitim yaklaşımıyla tanınır. Şehrin her dört sakininden birinin öğrenci olması, burayı gerçek bir "öğrenci şehri" yapar.</p>`,
        },
        {
          slug: "maastricht-university",
          name: "Maastricht University",
          ranking: "Most International",
          worldRanking: "#127 Global",
          annualTuition: "€10,000 - €16,000",
          highlights: ["Problem-Based Learning (PBL)", "Avrupa'nın Kalbinde"],
          departments: ["Uluslararası İşletme", "Avrupa Hukuku", "Nörobilim"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Maastricht, PBL eğitim modeliyle öğrencilerine çözüm odaklı düşünmeyi öğretir. Avrupa Birliği sınırlarının kesiştiği noktada, son derece kozmopolit bir ortam sunar.</p>`,
        },
        {
          slug: "vu-amsterdam",
          name: "Vrije Universiteit Amsterdam (VU)",
          ranking: "Societal Impact",
          worldRanking: "#207 Global",
          annualTuition: "€10,500 - €15,500",
          highlights: [
            "Toplumsal Değer Odaklı",
            "Zuidas Finans Merkezi Yanında",
          ],
          departments: [
            "Sağlık Bilimleri",
            "İşletme",
            "İlahiyat",
            "Bilgisayar Bilimleri",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">VU Amsterdam, akademik başarıyı toplumsal fayda ile birleştirir. Amsterdam'ın modern finans merkezi Zuidas'a komşu olması, mezunları için büyük bir iş avantajıdır.</p>`,
        },
      ],
    },

    ispanya: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İspanya: İşletme, Sanat ve Akdeniz Ruhu</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Dünyanın en iyi işletme okullarına ev sahipliği yapan İspanya, güneşli iklimi, zengin kültürel mirası ve uygun yaşam maliyetleriyle eğitim için ideal bir destinasyondur. İspanyolca öğrenme ve Akdeniz'in kalbinde kariyer yapma fırsatı sunar.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Küresel İşletme Eğitimi</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">IE, IESE ve ESADE gibi okullar, dünya MBA ve işletme sıralamalarında sürekli olarak ilk 10'da yer alır. Global bir yönetici olma yolundaki en prestijli duraktır.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Dünyanın En İyi İşletme Okulları</li>
                  <li>• İnovatif ve Girişimci Müfredat</li>
                  <li>• Küresel CEO Networkü</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Kültür ve Yaşam</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Madrid, Barselona ve Valencia gibi şehirler, öğrencilere düşük bütçelerle yüksek standartlı bir sosyal yaşam sunar. Tarih ve modernite iç içedir.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Uygun Konaklama ve Yaşam Masrafları</li>
                  <li>• Dünyanın En Çok Konuşulan 2. Dili</li>
                  <li>• Sanat ve Mimari Mirası</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Spain: Business, Art, and the Mediterranean Spirit</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Home to world-renowned business schools, Spain offers a sunny climate, rich heritage, and affordable living. It's the perfect place to learn Spanish and build a career in the heart of the Mediterranean.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Global Business Education</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Schools like IE, IESE, and ESADE are consistently ranked in the top 10 in world MBA and business rankings. It is the most prestigious stop on the path to becoming a global executive.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• World's Best Business Schools</li>
                  <li>• Innovative and Entrepreneurial Curriculum</li>
                  <li>• Global CEO Network</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Culture and Life</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Cities like Madrid, Barcelona, and Valencia offer students a high-standard social life on low budgets. History and modernity are intertwined.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Affordable Accommodation and Living Costs</li>
                  <li>• The World's 2nd Most Spoken Language</li>
                  <li>• Artistic and Architectural Heritage</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Spanien: Wirtschaft, Kunst und der Geist des Mittelmeers</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Spanien beheimatet weltberühmte Wirtschaftshochschulen und bietet ein sonniges Klima, ein reiches Erbe und erschwingliches Wohnen. Es ist der perfekte Ort, um Spanisch zu lernen und eine Karriere im Herzen des Mittelmeers aufzubauen.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Globale Wirtschaftsausbildung</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Schulen wie IE, IESE und ESADE rangieren in den weltweiten MBA- und Wirtschaftswelt-Rankings regelmäßig unter den Top 10. Es ist die prestigeträchtigste Station auf dem Weg zum globalen Manager.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Die besten Business Schools der Welt</li>
                  <li>• Innovatives und unternehmerisches Curriculum</li>
                  <li>• Globales CEO-Netzwerk</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Kultur und Leben</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Städte wie Madrid, Barcelona und Valencia bieten den Studierenden ein hochwertiges soziales Leben bei geringen Budgets. Geschichte und Moderne sind miteinander verflochten.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Erschwingliche Unterkunfts- und Lebenshaltungskosten</li>
                  <li>• Die zweitmeistgesprochene Sprache der Welt</li>
                  <li>• Künstlerisches und architektonisches Erbe</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Elit İşletme Okulları",
          desc: "Global iş dünyasında en yüksek geçerliliğe sahip diplomalar.",
        },
        {
          title: "Ekonomik Yaşam",
          desc: "Batı Avrupa'ya kıyasla çok daha uygun kira ve gıda maliyetleri.",
        },
        {
          title: "Dil ve Kültür",
          desc: "İspanyolca öğrenerek küresel bir yetkinlik kazanma şansı.",
        },
      ],
      advantages_en: [
        {
          title: "Elite Business Schools",
          desc: "Degrees with the highest validity in the global business world.",
        },
        {
          title: "Economic Life",
          desc: "Much more affordable rent and food costs compared to Western Europe.",
        },
        {
          title: "Language and Culture",
          desc: "Chance to gain a global competence by learning Spanish.",
        },
      ],
      advantages_de: [
        {
          title: "Elite-Business-Schools",
          desc: "Abschlüsse mit höchster Gültigkeit in der globalen Geschäftswelt.",
        },
        {
          title: "Wirtschaftliches Leben",
          desc: "Viel günstigere Miet- und Verpflegungskosten im Vergleich zu Westeuropa.",
        },
        {
          title: "Sprache und Kultur",
          desc: "Chance, durch das Erlernen der spanischen Sprache eine globale Kompetenz zu erlangen.",
        },
      ],
      process: [
        {
          title: "Homologasyon",
          desc: "Lise diplomasının İspanyol eğitim sistemine resmi denkliğinin alınması.",
        },
        {
          title: "EBAU / Üniversite Sınavı",
          desc: "Devlet üniversiteleri için gerekli sınav giriş ve hazırlık süreci.",
        },
        {
          title: "Kayıt Dosyası",
          desc: "İspanya konsolosluğu için akademik ve finansal dosya yönetimi.",
        },
      ],
      process_en: [
        {
          title: "Homologation",
          desc: "Obtaining official equivalency of high school diploma in the Spanish education system.",
        },
        {
          title: "EBAU / University Exam",
          desc: "Exam entry and preparation process required for public universities.",
        },
        {
          title: "Enrollment File",
          desc: "Academic and financial file management for the Spanish consulate.",
        },
      ],
      process_de: [
        {
          title: "Homologation",
          desc: "Erhalt der offiziellen Gleichwertigkeit des Abiturs im spanischen Bildungssystem.",
        },
        {
          title: "EBAU / Universitätsprüfung",
          desc: "Prüfungsanmeldung und Vorbereitungsprozess für öffentliche Universitäten.",
        },
        {
          title: "Genehmigung-Akte",
          desc: "Akademisches und finanzielles Aktenmanagement für das spanische Konsulat.",
        },
      ],
      faq: [
        {
          q: "İngilizce bölümler var mı?",
          a: "Özellikle özel üniversitelerde ve işletme okullarında İngilizce programlar oldukça yaygındır.",
        },
      ],
      faq_en: [
        {
          q: "Are there English departments?",
          a: "English programs are quite common, especially in private universities and business schools.",
        },
      ],
      faq_de: [
        {
          q: "Gibt es englischsprachige Fachbereiche?",
          a: "Englischsprachige Programme sind recht verbreitet, insbesondere an privaten Universitäten und Business Schools.",
        },
      ],
      universities: [
        {
          slug: "ie-university",
          name: "IE University",
          ranking: "#1 in Spain (Business)",
          worldRanking: "#1 in Europe (IE Business School)",
          annualTuition: "€21,000 - €30,000",
          highlights: [
            "İnovasyon ve Girişimcilik Lideri",
            "Modern ve Küresel Kampüs",
          ],
          departments: [
            "İşletme",
            "Uluslararası İlişkiler",
            "Mimarlık",
            "Hukuk",
          ],
          detailedDescription: `<p>IE University, girişimcilik ve teknoloji odaklı eğitim modeli ile dünya çapında tanınan bir eğitim kurumudur.</p>`,
        },
        {
          slug: "university-of-barcelona",
          name: "University of Barcelona",
          ranking: "#1 in Spain",
          worldRanking: "#164 Global",
          annualTuition: "€3,000 - €6,000",
          highlights: [
            "Katalonya'nın En Büyük Araştırma Merkezi",
            "Tıp ve Bilimde Zirve",
          ],
          departments: ["Tıp", "Biyoloji", "Ekonomi", "Tarih"],
          detailedDescription: `<p>Barselona Üniversitesi, İspanya'nın en kapsamlı akademik kurumlarından biri olup, bilimsel araştırmalarda öncüdür.</p>`,
        },
        {
          slug: "complutense-madrid",
          name: "Complutense University of Madrid",
          ranking: "Historic Elite",
          worldRanking: "#171 Global",
          annualTuition: "€2,500 - €5,500",
          highlights: [
            "Başkentin Köklü Akademik Mirası",
            "Siyaset ve Hukukta Güçlü",
          ],
          departments: ["Siyaset Bilimi", "Hukuk", "Eczacılık", "Sanat"],
          detailedDescription: `<p>Complutense, İspanya'nın en eski üniversitelerinden biridir ve Madrid'in kalbinde devasa bir kampüse sahiptir.</p>`,
        },
        {
          slug: "autonomous-university-of-madrid",
          name: "Autonomous University of Madrid (UAM)",
          ranking: "#1 in Spain (State)",
          worldRanking: "#199 Global",
          annualTuition: "€2,500 - €5,000",
          highlights: ["Bilimsel Araştırma Lideri", "Siyaset ve Hukuk"],
          departments: ["Fizik", "Hukuk", "Biyomedikal", "Siyaset Bilimi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UAM, Madrid'in bilimsel araştırma kapasitesi en yüksek devlet üniversitesidir. Nobel ödüllü mezunları ve güçlü akademik kadrosuyla tanınır.</p>`,
        },
        {
          slug: "pompeu-fabra-university",
          name: "Pompeu Fabra University (UPF)",
          ranking: "Top Economics",
          worldRanking: "#201 Global",
          annualTuition: "€3,000 - €6,000",
          highlights: ["Ekonomi ve İşletmede Mükemmeliyet", "Modern Kampüs"],
          departments: ["Ekonomi", "İşletme", "İletişim", "Veri Bilimi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UPF, Barselona'da butik ve yüksek kaliteli eğitim anlayışıyla, özellikle ekonomi alanında dünya çapında bir markadır.</p>`,
        },
        {
          slug: "university-of-navarra",
          name: "University of Navarra",
          ranking: "Top Private Uni",
          worldRanking: "#253 Global",
          annualTuition: "€10,000 - €18,000",
          highlights: ["İşletme ve Tıp Gücü", "Yüksek İstihdam Oranı"],
          departments: ["Tıp", "İşletme (IESE)", "İletişim", "Mimarlık"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Navarra, İspanya'nın en iyi özel üniversitesidir. Özellikle tıp ve IESE Business School ile küresel prestije sahiptir.</p>`,
        },
        {
          slug: "university-of-valencia",
          name: "University of Valencia",
          ranking: "Historic Research",
          worldRanking: "#401 Global",
          annualTuition: "€2,000 - €4,500",
          highlights: ["Akdeniz'in Bilim Merkezi", "Eczacılık ve Kimya"],
          departments: ["Eczacılık", "Kimya", "Ekonomi", "Hukuk"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Valencia Üniversitesi, köklü geçmişini modern araştırmalarla birleştiren, İspanya'nın en canlı öğrenci şehirlerinden birindedir.</p>`,
        },
        {
          slug: "carlos-iii-madrid",
          name: "Universidad Carlos III de Madrid (UC3M)",
          ranking: "Top Internationalized",
          worldRanking: "#319 Global",
          annualTuition: "€3,000 - €6,000",
          highlights: ["İngilizce Program Bolluğu", "Siyaset ve Mühendislik"],
          departments: [
            "Ekonomi",
            "Mühendislik",
            "Uluslararası İlişkiler",
            "İşletme",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UC3M, İspanya'da İngilizce eğitim veren program sayısının en yüksek olduğu, uluslararası vizyonu çok güçlü bir devlet üniversitesidir.</p>`,
        },
        {
          slug: "upc-barcelona",
          name: "Universitat Politècnica de Catalunya (UPC)",
          ranking: "Top Technical Spain",
          worldRanking: "#354 Global",
          annualTuition: "€3,000 - €6,500",
          highlights: ["Mimarlık ve Mühendislik", "Avrupa'nın Teknoloji Üssü"],
          departments: [
            "Mimarlık",
            "İnşaat Mühendisliği",
            "Yazılım",
            "Havacılık",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">UPC, teknik eğitim ve mimarlıkta İspanya'nın amiral gemisidir. Barselona'nın tasarım kültürüyle iç içedir.</p>`,
        },
        {
          slug: "university-of-granada",
          name: "University of Granada",
          ranking: "Erasmus Capital",
          worldRanking: "#401 Global",
          annualTuition: "€1,500 - €3,000",
          highlights: ["En Popüler Erasmus Destinasyonu", "Bilişim Bilimleri"],
          departments: [
            "Bilgisayar Bilimleri",
            "Tercümanlık",
            "Tıp",
            "Arkeoloji",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Granada Üniversitesi, tarihi dokusu ve Avrupa'nın en yoğun öğrenci sirkülasyonuyla eşsiz bir deneyim sunar.</p>`,
        },
      ],
    },
    fransa: {
      overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Fransa: Akademik Mükemmellik ve Kültürel Mirasın Zirvesi</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Fransa, dünya standartlarındaki 'Grandes Écoles' sistemi ve köklü devlet üniversiteleriyle uluslararası öğrenciler için benzersiz akademik fırsatlar sunar. Sanatın, modanın, mühendisliğin ve siyaset biliminin küresel merkezi olan Fransa, diplomasıyla tüm dünyada saygınlık kazanmanızı sağlar.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademik Prestij</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Fransa, özellikle matematik, fizik ve işletme alanlarında dünya sıralamalarını domine eder. 'Grandes Écoles' mezunları, küresel şirketlerin ve devlet kurumlarının en üst düzey mevkilerinde yer alır.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Dünya İlk 100'de Güçlü Temsiliyet</li>
                  <li>• Nobel ve Fields Madalyası Rekortmeni</li>
                  <li>• Sanat ve Tasarımda Global Otorite</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Ekonomi ve Kariyer</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Fransız hükümeti, uluslararası öğrencilerin eğitim maliyetlerinin büyük bir kısmını sübvanse eder. Mezuniyet sonrası sunulan iş arama izni (APS/VLS-TS) ile Avrupa'nın kalbinde kariyer yapma şansı yakalarsınız.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Yıllık €2,770 - €3,770 Devlet Harcı</li>
                  <li>• Mezunlara 1 Yıl İş Arama İzni</li>
                  <li>• Küresel Şirketlerle Doğrudan Bağlantı</li>
              </ul>
          </div>
      </div>
    `,
      overview_en: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">France: The Pinnacle of Academic Excellence and Cultural Heritage</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">France offers unique academic opportunities with its world-class 'Grandes Écoles' system and prestigious public universities. As a global hub for art, fashion, engineering, and political science, a French degree guarantees worldwide respect and recognition.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Academic Prestige</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">France dominates world rankings especially in mathematics, physics, and business. Graduates of 'Grandes Écoles' hold top-level positions in global companies and government agencies.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Strong Representation in the World Top 100</li>
                  <li>• Record Holder for Nobel and Fields Medals</li>
                  <li>• Global Authority in Art and Design</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Economy and Career</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">The French government subsidizes a large part of the education costs for international students. With the job search permit (APS/VLS-TS) offered after graduation, you catch the chance to build a career in the heart of Europe.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Annual State Fees of €2,770 - €3,770</li>
                  <li>• 1-Year Job Search Permit for Graduates</li>
                  <li>• Direct Connection with Global Companies</li>
              </ul>
          </div>
      </div>
    `,
      overview_de: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Frankreich: Der Gipfel akademischer Exzellenz und kulturellen Erbes</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600">Frankreich bietet mit seinem erstklassigen "Grandes Écoles"-System und seinen angesehenen öffentlichen Universitäten einzigartige akademische Möglichkeiten. Als globales Zentrum für Kunst, Mode, Ingenieurwesen und Politikwissenschaft garantiert ein französischer Abschluss weltweiten Respekt und Anerkennung.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademisches Prestige</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Frankreich dominiert die Weltranglisten insbesondere in den Bereichen Mathematik, Physik und Wirtschaft. Absolventen der "Grandes Écoles" bekleiden Spitzenpositionen in globalen Unternehmen und Regierungsbehörden.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Starke Vertretung in den Top 100 der Welt</li>
                  <li>• Rekordhalter bei Nobelpreisen und Fields-Medaillen</li>
                  <li>• Globale Autorität in Kunst und Design</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Wirtschaft und Karriere</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Die französische Regierung subventioniert einen großen Teil der Bildungskosten für internationale Studierende. Mit der nach dem Abschluss angebotenen Arbeitsuchgenehmigung (APS/VLS-TS) erhalten Sie die Chance, eine Karriere im Herzen Europas aufzubauen.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Jährliche staatliche Gebühren von 2.770 € - 3.770 €</li>
                  <li>• 1-jährige Arbeitsuchgenehmigung für Absolventen</li>
                  <li>• Direkte Verbindung zu globalen Unternehmen</li>
              </ul>
          </div>
      </div>
    `,
      advantages: [
        {
          title: "Devlet Sübvansiyonu",
          desc: "Eğitim maliyetlerinin büyük kısmı devlet tarafından karşılanır.",
        },
        {
          title: "Kariyer İmkanı",
          desc: "Mezuniyet sonrası Fransa'da kalarak iş arama ve çalışma hakkı.",
        },
        {
          title: "Global Prestij",
          desc: "HEC, Sorbonne ve Polytechnique gibi dünya devi markalarda eğitim.",
        },
      ],
      advantages_en: [
        {
          title: "State Subsidy",
          desc: "Most of the education costs are covered by the state.",
        },
        {
          title: "Career Opportunity",
          desc: "Right to stay and search for work in France after graduation.",
        },
        {
          title: "Global Prestige",
          desc: "Education at world-renowned brands like HEC, Sorbonne, and Polytechnique.",
        },
      ],
      advantages_de: [
        {
          title: "Staatliche Subvention",
          desc: "Die meisten Bildungskosten werden vom Staat getragen.",
        },
        {
          title: "Karrieremöglichkeit",
          desc: "Recht auf Aufenthalt und Jobsuche in Frankreich nach dem Abschluss.",
        },
        {
          title: "Globales Prestige",
          desc: "Ausbildung bei weltbekannten Marken wie HEC, Sorbonne und Polytechnique.",
        },
      ],
      process: [
        {
          title: "Campus France",
          desc: "Fransız hükümetinin resmi portalı üzerinden merkezi başvuru süreci.",
        },
        {
          title: "Dil ve Dosya",
          desc: "DELF/DALF veya İngilizce yeterlilik ile akademik dosyanın hazırlanması.",
        },
        {
          title: "Kayıt ve CAF",
          desc: "Öğrenci kaydı ve konaklama yardımı (CAF) başvurularının yönetimi.",
        },
      ],
      process_en: [
        {
          title: "Campus France",
          desc: "Centralized application process through the official portal of the French government.",
        },
        {
          title: "Language and File",
          desc: "Preparation of the academic file with DELF/DALF or English proficiency.",
        },
        {
          title: "Enrollment and CAF",
          desc: "Management of student enrollment and housing allowance (CAF) applications.",
        },
      ],
      process_de: [
        {
          title: "Campus France",
          desc: "Zentralisiertes Bewerbungsverfahren über das offizielle Portal der französischen Regierung.",
        },
        {
          title: "Sprache und Akte",
          desc: "Vorbereitung der akademischen Akte mit DELF/DALF oder Englischkenntnissen.",
        },
        {
          title: "Genehmigung und CAF",
          desc: "Verwaltung von Genehmigunganträgen für Studierende und Wohngeldanträgen (CAF).",
        },
      ],
      faq: [
        {
          q: "Fransızca bilmek şart mı?",
          a: "Hayır, işletme ve mühendislik gibi alanlarda çok sayıda İngilizce program mevcuttur.",
        },
      ],
      faq_en: [
        {
          q: "Is knowing French a requirement?",
          a: "No, there are many English programs available in fields such as business and engineering.",
        },
      ],
      faq_de: [
        {
          q: "Ist Französischkenntnis eine Voraussetzung?",
          a: "Nein, es gibt viele englischsprachige Programme in Bereichen wie Wirtschaft und Ingenieurwesen.",
        },
      ],
      universities: [
        {
          slug: "psl-university",
          name: "PSL Research University",
          ranking: "#1 in France",
          worldRanking: "#24 Global",
          annualTuition: "€2,770 - €3,770 (State)",
          highlights: ["Nobel Fabrikası", "Interdisipliner Araştırma"],
          departments: ["Fizik", "Astronomi", "Ekonomi", "Güzel Sanatlar"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">PSL (Paris Sciences et Lettres), Fransa'nın en seçkin akademik kurumlarının birleşmesiyle oluşmuş, dünya çapında bir araştırma devidir.</p>`,
        },
        {
          slug: "sorbonne-university",
          name: "Sorbonne University",
          ranking: "Historic Elite",
          worldRanking: "#59 Global",
          annualTuition: "€2,770 - €3,770 (State)",
          highlights: ["Avrupa'nın En Eski Üniversitesi", "Paris'in Kalbinde"],
          departments: ["Tıp", "Beşeri Bilimler", "Deniz Bilimleri", "Bilişim"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Sorbonne, yüzyıllardır süregelen akademik geleneğiyle bilimin ve sanatın merkezi olmaya devam eden, Fransa'nın en ikonik üniversitesidir.</p>`,
        },
        {
          slug: "paris-polytechnique",
          name: "Institut Polytechnique de Paris",
          ranking: "Top Engineering",
          worldRanking: "#38 Global",
          annualTuition: "€12,000 - €18,000",
          highlights: ["Askeri Disiplin ve Bilim", "Elite Engineering"],
          departments: ["Matematik", "Yapay Zeka", "Enerji", "Veri Bilimi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">École Polytechnique liderliğindeki bu enstitü, Fransa'nın en parlak mühendislerini yetiştiren, dünyanın en seçici okullarından biridir.</p>`,
        },
        {
          slug: "paris-saclay",
          name: "Université Paris-Saclay",
          ranking: "#1 in Mathematics",
          worldRanking: "#15 Global",
          annualTuition: "€2,770 - €3,770 (State)",
          highlights: [
            "Avrupa'nın Silikon Vadisi",
            "Matematik ve Fizik Lideri",
          ],
          departments: ["Matematik", "Fizik", "Tıp", "Yazılım Mühendisliği"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Paris-Saclay, özellikle matematik alanında dünya birincisi olmasıyla tanınan, Fransa'nın teknoloji ve bilim üssüdür.</p>`,
        },
        {
          slug: "ens-lyon",
          name: "École Normale Supérieure de Lyon",
          ranking: "Academic Elite",
          worldRanking: "#184 Global",
          annualTuition: "€2,770 (State)",
          highlights: ["Bilim İnsanı Yetiştirme Odağı", "Butik Eğitim"],
          departments: ["Biyoloji", "Matematik", "Edebiyat", "Sosyoloji"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">ENS Lyon, geleceğin akademisyenlerini ve araştırmacılarını yetiştiren, son derece seçici ve prestijli bir kurumdur.</p>`,
        },
        {
          slug: "paris-cite",
          name: "Université Paris Cité",
          ranking: "Medical Powerhouse",
          worldRanking: "#155 Global",
          annualTuition: "€2,770 - €3,770 (State)",
          highlights: ["Tıp ve Diş Hekimliğinde Lider", "Paris Merkezli"],
          departments: ["Tıp", "Psikoloji", "Hukuk", "Genetik"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Paris Cité, sağlık bilimleri ve beşeri bilimlerde Fransa'nın en kapsamlı ve başarılı üniversitelerinden biridir.</p>`,
        },
        {
          slug: "sciences-po",
          name: "Sciences Po",
          ranking: "#2 in World (Politics)",
          worldRanking: "#2 in Political Science",
          annualTuition: "€10,000 - €18,000",
          highlights: ["Dünya Liderlerinin Okulu", "Uluslararası İlişkiler"],
          departments: [
            "Siyaset Bilimi",
            "Uluslararası İlişkiler",
            "Kamu Yönetimi",
            "Hukuk",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Sciences Po, siyaset bilimi ve uluslararası ilişkiler alanında dünyanın en iyi ikinci üniversitesi olarak kabul edilir.</p>`,
        },
        {
          slug: "ponts-paristech",
          name: "École des Ponts ParisTech",
          ranking: "Oldest Engineering School",
          worldRanking: "#192 Global",
          annualTuition: "€3,000 - €5,000",
          highlights: ["Sürdürülebilir Kalkınma", "Mühendislik ve Ekonomi"],
          departments: ["İnşaat Mühendisliği", "Ekonomi", "Çevre", "Endüstri"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Dünyanın ilk mühendislik okulu olan Ponts ParisTech, altyapı ve ekonomi alanlarında küresel bir markadır.</p>`,
        },
        {
          slug: "grenoble-alpes",
          name: "Université Grenoble Alpes",
          ranking: "Tech & Innovation",
          worldRanking: "#294 Global",
          annualTuition: "€2,770 - €3,770 (State)",
          highlights: ["Alplerin Eteklerinde Bilim", "İnovasyon Ekosistemi"],
          departments: [
            "Fizik",
            "Bilgisayar Bilimleri",
            "Yerküre Bilimleri",
            "Mühendislik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Grenoble Alpes, mikro ve nanoteknoloji alanında Avrupa'nın en önemli merkezlerinden biridir.</p>`,
        },
        {
          slug: "aix-marseille",
          name: "Aix-Marseille University",
          ranking: "Top Research Hub",
          worldRanking: "#201 Global",
          annualTuition: "€2,770 - €3,770 (State)",
          highlights: [
            "Akdeniz'in En Büyük Üniversitesi",
            "Geniş Araştırma Fonları",
          ],
          departments: ["Tıp", "Hukuk", "Ekonomi", "Fen Bilimleri"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Aix-Marseille, disiplinlerarası çalışmaları ve Akdeniz bölgesindeki akademik liderliğiyle öne çıkar.</p>`,
        },
        {
          slug: "university-of-bordeaux",
          name: "University of Bordeaux",
          ranking: "Scientific Excellence",
          worldRanking: "#270 Global",
          annualTuition: "€2,770 - €3,770 (State)",
          highlights: ["Sağlık ve Yaşam Bilimleri", "Güçlü Endüstri Bağları"],
          departments: ["Tıp", "Nörobilim", "Arkeoloji", "Şarapçılık Bilimi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Bordeaux Üniversitesi, özellikle nörobilim ve tıp alanındaki araştırmalarıyla uluslararası alanda saygın bir yere sahiptir.</p>`,
        },
        {
          slug: "university-of-montpellier",
          name: "University of Montpellier",
          ranking: "Historic Medicine",
          worldRanking: "#141 Global (Ecology)",
          annualTuition: "€2,770 - €3,770 (State)",
          highlights: ["Dünyanın En Eski Tıp Fakültesi", "Ekoloji ve Çevre"],
          departments: ["Tıp", "Hukuk", "Ekoloji", "Eczacılık"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Montpellier Üniversitesi, 13. yüzyıldan beri süregelen tıp eğitimi geleneğiyle bilimin kadim kalesidir.</p>`,
        },
        {
          slug: "university-of-strasbourg",
          name: "University of Strasbourg",
          ranking: "Chemistry Leader",
          worldRanking: "#101 Global (Chemistry)",
          annualTuition: "€2,770 - €3,770 (State)",
          highlights: ["Nobel Ödüllü Kimya Araştırmaları", "Avrupa'nın Kalbi"],
          departments: ["Kimya", "Biyoloji", "Hukuk", "Uluslararası İlişkiler"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Strasbourg Üniversitesi, kimya alanındaki Nobel ödülleri ve Avrupa kurumlarına olan yakınlığıyla bilinir.</p>`,
        },
        {
          slug: "insa-lyon",
          name: "INSA Lyon",
          ranking: "Top Engineering School",
          worldRanking: "#401 Global",
          annualTuition: "€3,000 - €6,000",
          highlights: ["İnsancıl Mühendislik", "Sanayi İş Birlikleri"],
          departments: ["Bilişim", "İnşaat Mühendisliği", "Elektrik", "Enerji"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">INSA Lyon, Fransa'nın en büyük mühendislik okulu olup, öğrencilerine hem teknik hem de sosyal yetkinlikler kazandırır.</p>`,
        },
        {
          slug: "toulouse-1-capitole",
          name: "Université Toulouse 1 Capitole",
          ranking: "Economics Powerhouse",
          worldRanking: "#21 in Economics",
          annualTuition: "€2,770 - €3,770 (State)",
          highlights: ["Toulouse School of Economics", "Hukuk ve İşletme"],
          departments: ["Ekonomi", "Hukuk", "İşletme", "Yönetim"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Toulouse 1 Capitole, özellikle ekonomi (TSE) ve hukuk alanında Avrupa'nın en iddialı kurumlarından biridir.</p>`,
        },
        {
          slug: "hec-paris",
          name: "HEC Paris",
          ranking: "#1 in Europe (Business)",
          worldRanking: "#1 in Management",
          annualTuition: "€25,000 - €35,000",
          highlights: ["Global İş Dünyası Lideri", "Elite Alumni Network"],
          departments: ["İşletme", "Finans", "Pazarlama", "Stratejik Yönetim"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">HEC Paris, işletme eğitiminde Avrupa'nın tartışmasız bir numarasıdır. Dünyanın en büyük CEO'larının yetiştiği bir okuldur.</p>`,
        },
        {
          slug: "essec-business-school",
          name: "ESSEC Business School",
          ranking: "Top Global Business",
          worldRanking: "#6 in Management",
          annualTuition: "€20,000 - €30,000",
          highlights: ["İnovasyon ve Tasarım Odağı", "Global Kampüsler"],
          departments: [
            "Lüks Marka Yönetimi",
            "İşletme",
            "Finans",
            "Veri Analitiği",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">ESSEC, lüks marka yönetimi ve uluslararası işletme alanında dünyanın en iyi okulları arasında yer alır.</p>`,
        },
        {
          slug: "paris-dauphine",
          name: "Université Paris-Dauphine",
          ranking: "Finance & Management Elite",
          worldRanking: "#301 Global",
          annualTuition: "€5,000 - €12,000",
          highlights: ["Karar Bilimleri", "İş Dünyası ile Entegre"],
          departments: ["Finans", "Uygulamalı Matematik", "İşletme", "Ekonomi"],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">Dauphine, finans ve yönetim bilimlerinde Fransa'nın en seçkin devlet-üniversite modelidir.</p>`,
        },
        {
          slug: "skema-business-school",
          name: "SKEMA Business School",
          ranking: "Global Business School",
          worldRanking: "#25 in Management",
          annualTuition: "€18,000 - €25,000",
          highlights: ["5 Kıtada Kampüs", "Dijital Dönüşüm"],
          departments: [
            "Uluslararası İşletme",
            "Finans",
            "Proje Yönetimi",
            "Girişimcilik",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">SKEMA, küresel kampüs yapısıyla öğrencilerine dünyanın farklı bölgelerinde eğitim ve kariyer imkanı sunar.</p>`,
        },
        {
          slug: "emlyon-business-school",
          name: "emlyon business school",
          ranking: "Entrepreneurial Spirit",
          worldRanking: "#12 in Management",
          annualTuition: "€20,000 - €28,000",
          highlights: ["Girişimcilik ve Erken Kariyer", "Lyon Merkezli"],
          departments: [
            "İşletme",
            "Dijital Pazarlama",
            "Girişimcilik",
            "Lüks Yönetimi",
          ],
          detailedDescription: `<p class="text-lg leading-relaxed text-zinc-600">emlyon, "makers" kültürüyle öğrencilerini hızla değişen iş dünyasına girişimci bir vizyonla hazırlar.</p>`,
        },
      ],
    },
  };
