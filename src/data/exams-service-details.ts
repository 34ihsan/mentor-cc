import { UniversityServiceDetail } from "../lib/mappings/types";

export type ExamServiceDetail = UniversityServiceDetail;

export const examsServiceDetails: Record<string, ExamServiceDetail> = {
  global: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Uluslararası Sınav Hazırlık ve Danışmanlık</h2>
      <p class="mb-6">Yurt dışı eğitim ve kariyer hedeflerinize ulaşmanızda en kritik basamaklardan biri, uluslararası geçerliliği olan dil ve akademik yeterlilik sınavlarıdır. Mentor Career Consulting olarak, başarınızı şansa bırakmıyoruz.</p>
      <p class="mb-6">IELTS, TOEFL gibi dil yeterlilik sınavlarından SAT, GRE, GMAT gibi akademik yetkinlik sınavlarına kadar geniş bir yelpazede danışmanlık sağlıyoruz. Sınav formatları, stratejik hazırlık yöntemleri ve başvuru süreçlerinde uzman ekibimizle yanınızdayız.</p>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">International Exam Preparation and Consultancy</h2>
      <p class="mb-6">One of the most critical steps in achieving your study abroad and career goals is international language and academic proficiency exams. As Mentor Career Consulting, we do not leave your success to chance.</p>
      <p class="mb-6">We provide consultancy across a wide range of exams, from language proficiency exams like IELTS and TOEFL to academic competency exams like SAT, GRE, and GMAT. We are with you with our expert team in exam formats, strategic preparation methods, and application processes.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Internationale Prüfungsvorbereitung und Beratung</h2>
      <p class="mb-6">Einer der kritischsten Schritte zur Erreichung Ihrer Auslandsstudien- und Karriereziele sind international anerkannte Sprach- und akademische Eignungsprüfungen. Als Mentor Career Consulting überlassen wir Ihren Erfolg nicht dem Zufall.</p>
      <p class="mb-6">Wir beraten Sie in einem breiten Spektrum von Prüfungen, von Sprachnachweisen wie IELTS und TOEFL bis hin zu akademischen Kompetenzprüfungen wie SAT, GRE und GMAT. Unser Expertenteam begleitet Sie bei Prüfungsformaten, strategischen Vorbereitungsmethoden und Bewerbungsprozessen.</p>
    `,
    advantages: [
      { title: "Uzman Eğitmen Kadrosu", desc: "Sınav formatlarına hakim, deneyimli ve sertifikalı eğitmenlerle çalışma imkanı." },
      { title: "Kişiselleştirilmiş Program", desc: "Eksiklerinize odaklanan, hedefinize yönelik özel çalışma planları." },
      { title: "Güncel Materyaller", desc: "En yeni sınav soruları ve simülasyon testleriyle gerçekçi hazırlık." }
    ],
    advantages_en: [
      { title: "Expert Instructor Staff", desc: "Opportunity to work with experienced and certified instructors who master exam formats." },
      { title: "Personalized Program", desc: "Special study plans focusing on your deficiencies and oriented towards your goals." },
      { title: "Up-to-date Materials", desc: "Realistic preparation with the latest exam questions and simulation tests." }
    ],
    advantages_de: [
      { title: "Experten-Lehrpersonal", desc: "Möglichkeit der Zusammenarbeit mit erfahrenen und zertifizierten Lehrkräften, die die Prüfungsformate beherrschen." },
      { title: "Personalisiertes Programm", desc: "Spezielle Studienpläne, die sich auf Ihre Defizite konzentrieren und an Ihren Zielen orientiert sind." },
      { title: "Aktuelle Materialien", desc: "Realistische Vorbereitung mit den neuesten Prüfungsfragen und Simulationstests." }
    ],
    process: [
      { title: "Seviye Belirleme", desc: "Mevcut durumunuzun analizi ve hedef puanın belirlenmesi." },
      { title: "Stratejik Planlama", desc: "Sınav tarihine göre yoğunlaştırılmış veya düzenli çalışma programı." },
      { title: "Deneme Sınavları", desc: "Zaman yönetimi ve stres kontrolü için periyodik simülasyonlar." },
      { title: "Başvuru Desteği", desc: "Sınav kaydı ve sonuçların üniversitelere gönderilmesi süreci." }
    ],
    process_en: [
      { title: "Level Determination", desc: "Analysis of your current status and determination of the target score." },
      { title: "Strategic Planning", desc: "Intensive or regular study program according to the exam date." },
      { title: "Mock Exams", desc: "Periodic simulations for time management and stress control." },
      { title: "Application Support", desc: "Exam registration and the process of sending results to universities." }
    ],
    process_de: [
      { title: "Einstufung", desc: "Analyse Ihres aktuellen Standes und Festlegung des Zielergebnisses." },
      { title: "Strategische Planung", desc: "Intensives oder reguläres Studienprogramm je nach Prüfungstermin." },
      { title: "Probeklausuren", desc: "Periodische Simulationen für Zeitmanagement und Stresskontrolle." },
      { title: "Bewerbungsunterstützung", desc: "Prüfungsanmeldung und Versand der Ergebnisse an die Universitäten." }
    ],
    faq: [
      { q: "Hangi sınava girmeliyim?", a: "Bu, hedeflediğiniz ülkeye, üniversiteye ve bölüme göre değişir. Danışmanlarımız size en uygun sınavı belirleyecektir." },
      { q: "Sınav hazırlığı ne kadar sürer?", a: "Mevcut seviyeniz ve hedef puanınıza bağlı olarak genellikle 2-6 ay arası sürer." }
    ],
    faq_en: [
      { q: "Which exam should I take?", a: "This depends on the country, university, and department you are targeting. Our consultants will determine the most suitable exam for you." },
      { q: "How long does exam preparation take?", a: "Depending on your current level and target score, it usually takes 2-6 months." }
    ],
    faq_de: [
      { q: "Welche Prüfung sollte ich ablegen?", a: "Dies hängt von dem Land, der Universität und dem Fachbereich ab, den Sie anstreben. Unsere Berater ermitteln die für Sie am besten geeignete Prüfung." },
      { q: "Wie lange dauert die Prüfungsvorbereitung?", a: "Abhängig von Ihrem aktuellen Niveau und Ihrem Zielergebnis dauert es in der Regel 2-6 Monate." }
    ]
  },
  ielts: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">IELTS: Global Geçerliliği Olan İngilizce Testi</h2>
      <p class="mb-6">IELTS (International English Language Testing System), dünya çapında en çok tercih edilen İngilizce yeterlilik sınavıdır. Akademik ve Genel Eğitim olmak üzere iki modülü bulunur.</p>
      <p class="mb-6">İngiltere, Avustralya, Kanada ve Yeni Zelanda'daki üniversiteler ve göçmenlik büroları tarafından standart olarak kabul edilir. Sınav; Dinleme, Okuma, Yazma ve Konuşma bölümlerinden oluşur.</p>

      <h3 class="text-2xl font-serif font-bold text-navy mb-4 mt-8 italic">Neden IELTS?</h3>
      <ul class="space-y-4 mb-10 italic text-zinc-600">
          <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Geniş Kabul:</strong> 140'tan fazla ülkede 11.000'den fazla kurum tarafından tanınır.</li>
          <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Yüz Yüze Konuşma:</strong> Konuşma testi, gerçek bir sınav görevlisi ile yapılır, bu da daha doğal bir etkileşim sağlar.</li>
      </ul>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">IELTS: Globally Valid English Test</h2>
      <p class="mb-6">IELTS (International English Language Testing System) is the most preferred English proficiency exam worldwide. It has two modules: Academic and General Training.</p>
      <p class="mb-6">It is accepted as a standard by universities and immigration offices in the UK, Australia, Canada, and New Zealand. The exam consists of Listening, Reading, Writing, and Speaking sections.</p>

      <h3 class="text-2xl font-serif font-bold text-navy mb-4 mt-8 italic">Why IELTS?</h3>
      <ul class="space-y-4 mb-10 italic text-zinc-600">
          <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Wide Acceptance:</strong> Recognized by more than 11,000 institutions in more than 140 countries.</li>
          <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Face-to-Face Speaking:</strong> The speaking test is conducted with a real examiner, providing a more natural interaction.</li>
      </ul>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">IELTS: Global gültiger Englischtest</h2>
      <p class="mb-6">IELTS (International English Language Testing System) ist die weltweit am meisten bevorzugte Englischprüfung. Sie besteht aus zwei Modulen: Academic und General Training.</p>
      <p class="mb-6">Sie wird standardmäßig von Universitäten anerkannt. Die Prüfung besteht aus den Bereichen Listening, Reading, Writing und Speaking.</p>

      <h3 class="text-2xl font-serif font-bold text-navy mb-4 mt-8 italic">Warum IELTS?</h3>
      <ul class="space-y-4 mb-10 italic text-zinc-600">
          <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Breite Anerkennung:</strong> Anerkannt von mehr als 11.000 Institutionen in über 140 Ländern.</li>
          <li class="pl-8 relative"><span class="absolute left-0 top-1 text-secondary">✓</span> <strong>Persönliches Gespräch:</strong> Der Sprachtest wird mit einem echten Prüfer durchgeführt, was eine natürlichere Interaktion ermöglicht.</li>
      </ul>
    `,
    advantages: [
      { title: "Esnek Format", desc: "Kağıt üzerinde veya bilgisayarlı sınav seçeneği sunar." },
      { title: "Hızlı Sonuç", desc: "Bilgisayarlı sınav sonuçları 3-5 gün içinde açıklanır." },
      { title: "Eğitim ve Kariyer", desc: "Üniversite kabulleri ve profesyonel kariyer başvuruları için geçerlidir." }
    ],
    advantages_en: [
      { title: "Flexible Format", desc: "Offers paper-based or computer-delivered exam options." },
      { title: "Fast Results", desc: "Computer-delivered exam results are announced within 3-5 days." },
      { title: "Education and Career", desc: "Valid for both university admissions and professional career applications." }
    ],
    advantages_de: [
      { title: "Flexibles Format", desc: "Bietet papierbasierte oder computergestützte Prüfungsoptionen an." },
      { title: "Schnelle Ergebnisse", desc: "Ergebnisse der computergestützten Prüfung liegen innerhalb von 3-5 Tagen vor." },
      { title: "Bildung und Karriere", desc: "Gültig sowohl für Hochschulzulassungen als auch für berufliche Karrieremöglichkeiten." }
    ],
    process: [
      { title: "Modül Seçimi", desc: "Hedefe göre Akademik veya Genel Eğitim modülünün belirlenmesi." },
      { title: "Sınav Kaydı", desc: "Uygun tarih ve merkez için resmi kayıt işlemlerinin yapılması." },
      { title: "Hazırlık Kursu", desc: "Stratejik soru çözüm teknikleri ve zaman yönetimi eğitimi." },
      { title: "Sonuç Takibi", desc: "TRF belgesinin alınması ve kurumlara raporlanması." }
    ],
    process_en: [
      { title: "Module Selection", desc: "Determining the Academic or General Training module based on the goal." },
      { title: "Exam Registration", desc: "Official registration for the appropriate date and center." },
      { title: "Preparation Course", desc: "Strategic question-solving techniques and time management training." },
      { title: "Result Tracking", desc: "Obtaining the TRF document and reporting to institutions." }
    ],
    process_de: [
      { title: "Modulauswahl", desc: "Festlegung des Moduls Academic oder General Training basierend auf dem Ziel." },
      { title: "Prüfungsanmeldung", desc: "Offizielle Anmeldung für den passenden Termin und das Prüfungszentrum." },
      { title: "Vorbereitungskurs", desc: "Strategische Techniken zur Aufgabenlösung und Zeitmanagement-Training." },
      { title: "Ergebnisverfolgung", desc: "Erhalt des TRF-Dokuments und Berichterstattung an Institutionen." }
    ],
    faq: [
      { q: "IELTS geçerlilik süresi ne kadardır?", a: "IELTS sonuçları 2 yıl boyunca geçerlidir." },
      { q: "Kaç kez sınava girebilirim?", a: "Sınava giriş sayısında herhangi bir kısıtlama yoktur." }
    ],
    faq_en: [
      { q: "How long is the IELTS validity period?", a: "IELTS results are valid for 2 years." },
      { q: "How many times can I take the exam?", a: "There is no restriction on the number of exam entries." }
    ],
    faq_de: [
      { q: "Wie lange ist die IELTS-Gültigkeitsdauer?", a: "IELTS-Ergebnisse sind 2 Jahre lang gültig." },
      { q: "Wie oft kann ich die Prüfung ablegen?", a: "Es gibt keine Beschränkung für die Anzahl der Prüfungsteilnahmen." }
    ],
    structure: `
      <ul class="space-y-4">
        <li><strong>Listening (30 dk):</strong> 4 bölüm, 40 soru. Günlük ve akademik konuşmalar.</li>
        <li><strong>Reading (60 dk):</strong> 3 metin, 40 soru. Analitik okuma ve anlama.</li>
        <li><strong>Writing (60 dk):</strong> 2 görev. Grafik yorumlama ve akademik kompozisyon.</li>
        <li><strong>Speaking (11-14 dk):</strong> Birebir mülakat. Kendini ifade etme yeteneği.</li>
      </ul>
    `,
    structure_en: `
      <ul class="space-y-4">
        <li><strong>Listening (30 min):</strong> 4 sections, 40 questions. Daily and academic conversations.</li>
        <li><strong>Reading (60 min):</strong> 3 texts, 40 questions. Analytical reading and comprehension.</li>
        <li><strong>Writing (60 min):</strong> 2 tasks. Data interpretation and academic essay.</li>
        <li><strong>Speaking (11-14 min):</strong> One-on-one interview. Ability to express oneself.</li>
      </ul>
    `,
    structure_de: `
      <ul class="space-y-4">
        <li><strong>Hörverstehen (30 Min.):</strong> 4 Abschnitte, 40 Fragen. Alltags- und akademische Gespräche.</li>
        <li><strong>Leseverstehen (60 Min.):</strong> 3 Texte, 40 Fragen. Analytisches Lesen und Verstehen.</li>
        <li><strong>Schreiben (60 Min.):</strong> 2 Aufgaben. Dateninterpretation und akademischer Aufsatz.</li>
        <li><strong>Sprechen (11-14 Min.):</strong> Persönliches Interview. Fähigkeit, sich auszudrücken.</li>
      </ul>
    `,
    scoring: `
      <p>IELTS 1.0 ile 9.0 arasında bir puanlama sistemi kullanır. Her bölümden alınan puanların ortalaması genel skoru belirler.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Hedef Skorlar:</strong> Lisans için genellikle 6.0-6.5, yüksek lisans için 6.5-7.5 arası beklenir.
      </div>
    `,
    scoring_en: `
      <p>IELTS uses a scoring system between 1.0 and 9.0. The average of the scores obtained from each section determines the overall score.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Target Scores:</strong> Generally 6.0-6.5 for undergraduate, 6.5-7.5 for graduate programs.
      </div>
    `,
    scoring_de: `
      <p>IELTS verwendet ein Bewertungssystem zwischen 1,0 und 9,0. Der Durchschnitt der in jedem Bereich erzielten Ergebnisse ergibt die Gesamtpunktzahl.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Zielwerte:</strong> In der Regel 6,0-6,5 für Bachelor-Studiengänge, 6,5-7,5 für Master-Studiengänge.
      </div>
    `
  },
  toefl: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">TOEFL iBT: Akademik İngilizce Standardı</h2>
      <p class="mb-6">TOEFL (Test of English as a Foreign Language), özellikle ABD ve Kanada'daki üniversitelerin en çok tercih ettiği dil sınavıdır. Akademik ortamdaki İngilizceyi kullanma ve anlama yeteneğinizi ölçer.</p>
      <p class="mb-6">İnternet üzerinden yapılan iBT (internet-Based Test) formatı, dünya genelinde en yaygın kullanılan versiyondur. Okuma, Dinleme, Konuşma ve Yazma becerilerinin entegre bir şekilde ölçülmesine dayanır.</p>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">TOEFL iBT: Academic English Standard</h2>
      <p class="mb-6">TOEFL (Test of English as a Foreign Language) is the most preferred language exam, especially by universities in the USA and Canada. It measures your ability to use and understand English in an academic environment.</p>
      <p class="mb-6">The iBT (internet-Based Test) format is the most widely used version worldwide. It is based on measuring Reading, Listening, Speaking, and Writing skills in an integrated way.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">TOEFL iBT: Standard für akademisches Englisch</h2>
      <p class="mb-6">TOEFL (Test of English as a Foreign Language) ist der am meisten bevorzugte Sprachtest, insbesondere von Universitäten in den USA und Kanada. Er misst Ihre Fähigkeit, Englisch im akademischen Umfeld anzuwenden und zu verstehen.</p>
      <p class="mb-6">Das iBT-Format (internet-Based Test) ist die weltweit am weitesten verbreitete Version. Es basiert auf der integrierten Messung von Lese-, Hör-, Sprech- und Schreibfertigkeiten.</p>
    `,
    advantages: [
      { title: "ABD Odaklı Kabul", desc: "ABD'deki üniversitelerin %90'ından fazlası tarafından öncelikli olarak kabul edilir." },
      { title: "Kapsamlı Değerlendirme", desc: "Becerilerin bir arada kullanıldığı gerçekçi akademik senaryolar sunar." },
      { title: "Geniş Sınav Ağı", desc: "Dünyanın hemen her yerinde sık aralıklarla sınav merkezleri bulunur." }
    ],
    advantages_en: [
      { title: "US Focused Admission", desc: "Primarily accepted by more than 90% of universities in the USA." },
      { title: "Comprehensive Assessment", desc: "Offers realistic academic scenarios where skills are used together." },
      { title: "Wide Exam Network", desc: "Exam centers are available at frequent intervals almost everywhere in the world." }
    ],
    advantages_de: [
      { title: "USA-orientierte Zulassung", desc: "Wird vorrangig von mehr als 90 % der Universitäten in den USA anerkannt." },
      { title: "Umfassende Bewertung", desc: "Bietet realistische akademische Szenarien, in denen Fertigkeiten kombiniert angewendet werden." },
      { title: "Breites Prüfungsnetzwerk", desc: "Prüfungszentren stehen fast überall auf der Welt in kurzen Abständen zur Verfügung." }
    ],
    process: [
      { title: "Sınav Stratejisi", desc: "Entegre görevlere yönelik not alma ve sentezleme teknikleri." },
      { title: "Kaynak Temini", desc: "ETS onaylı resmi hazırlık rehberleri ve dijital kaynaklar." },
      { title: "Simülasyon Testleri", desc: "Tam zamanlı deneme sınavları ile sınav atmosferine uyum." },
      { title: "Skor Raporlama", desc: "Sonuçların doğrudan hedef kurumlara gönderilmesi." }
    ],
    process_en: [
      { title: "Exam Strategy", desc: "Note-taking and synthesis techniques for integrated tasks." },
      { title: "Resource Provision", desc: "ETS approved official preparation guides and digital resources." },
      { title: "Simulation Tests", desc: "Adaptation to the exam atmosphere with full-time mock exams." },
      { title: "Score Reporting", desc: "Direct submission of results to target institutions." }
    ],
    process_de: [
      { title: "Prüfungsstrategie", desc: "Notiz- und Synthesetechniken für integrierte Aufgabenstellungen." },
      { title: "Ressourcenbereitstellung", desc: "Offizielle, von ETS zugelassene Vorbereitungsleitfäden und digitale Ressourcen." },
      { title: "Simulationstests", desc: "Anpassung an die Prüfungsatmosphäre durch ganztägige Probeklausuren." },
      { title: "Ergebnismeldung", desc: "Direkte Übermittlung der Ergebnisse an die Zielinstitutionen." }
    ],
    faq: [
      { q: "TOEFL iBT kaç puan üzerinden değerlendirilir?", a: "Sınav toplam 120 puan üzerinden değerlendirilir (her bölüm 30 puan)." },
      { q: "Sınav süresi ne kadardır?", a: "Yeni formatıyla yaklaşık 2 saat sürmektedir." }
    ],
    faq_en: [
      { q: "How is TOEFL iBT scored?", a: "The exam is scored out of a total of 120 points (30 points for each section)." },
      { q: "How long is the exam duration?", a: "With its new format, it takes approximately 2 hours." }
    ],
    faq_de: [
      { q: "Wie wird der TOEFL iBT bewertet?", a: "Die Prüfung wird mit insgesamt 120 Punkten bewertet (30 Punkte pro Bereich)." },
      { q: "Wie lange dauert die Prüfung?", a: "Im neuen Format dauert sie etwa 2 Stunden." }
    ],
    structure: `
      <ul class="space-y-4">
        <li><strong>Reading (35 dk):</strong> Akademik metinleri anlama. 20 soru.</li>
        <li><strong>Listening (36 dk):</strong> Kampüs konuşmaları ve dersler. 28 soru.</li>
        <li><strong>Speaking (16 dk):</strong> 4 görev üzerinden konuşma performansı.</li>
        <li><strong>Writing (29 dk):</strong> 2 görev; Akademik tartışma ve entegre yazım.</li>
      </ul>
    `,
    structure_en: `
      <ul class="space-y-4">
        <li><strong>Reading (35 min):</strong> Understanding academic texts. 20 questions.</li>
        <li><strong>Listening (36 min):</strong> Campus conversations and lectures. 28 questions.</li>
        <li><strong>Speaking (16 min):</strong> 4 tasks measuring speaking performance.</li>
        <li><strong>Writing (29 min):</strong> 2 tasks; Academic discussion and integrated writing.</li>
      </ul>
    `,
    structure_de: `
      <ul class="space-y-4">
        <li><strong>Leseverstehen (35 Min.):</strong> Verständnis akademischer Texte. 20 Fragen.</li>
        <li><strong>Hörverstehen (36 Min.):</strong> Campus-Gespräche und Vorlesungen. 28 Fragen.</li>
        <li><strong>Sprechen (16 Min.):</strong> 4 Aufgaben zur Messung der Sprechleistung.</li>
        <li><strong>Schreiben (29 Min.):</strong> 2 Aufgaben; Akademische Diskussion und integriertes Schreiben.</li>
      </ul>
    `,
    scoring: `
      <p>TOEFL iBT 0 ile 120 puan arasındadır. Her 4 bölüm 30 puan üzerinden değerlendirilir.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Not:</strong> MyBest® Scores özelliği ile son 2 yıldaki en yüksek bölüm puanlarınız birleştirilebilir.
      </div>
    `,
    scoring_en: `
      <p>TOEFL iBT is scored between 0 and 120 points. Each of the 4 sections is evaluated out of 30 points.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Note:</strong> With the MyBest® Scores feature, your highest section scores from the last 2 years can be combined.
      </div>
    `,
    scoring_de: `
      <p>TOEFL iBT wird zwischen 0 und 120 Punkten bewertet. Jeder der 4 Abschnitte wird mit maximal 30 Punkten bewertet.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Hinweis:</strong> Mit der Funktion MyBest® Scores können Ihre höchsten Teilergebnisse aus den letzten 2 Jahren kombiniert werden.
      </div>
    `
  },
  sat: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Digital SAT: ABD'de Üniversite Giriş Anahtarı</h2>
      <p class="mb-6">SAT (Scholastic Assessment Test), ABD'deki kolej ve üniversitelere lisans başvurularında kullanılan en yaygın standart sınavdır. Öğrencilerin lise bilgilerini ve üniversitedeki başarı potansiyelini ölçer.</p>
      <p class="mb-6">Artık tamamen dijital formatta yapılan SAT, Okuma-Yazma ve Matematik bölümlerinden oluşur. Eleştirel düşünme ve problem çözme yeteneklerini ön plana çıkarır.</p>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Digital SAT: Key to University Entrance in the USA</h2>
      <p class="mb-6">SAT (Scholastic Assessment Test) is the most common standardized exam used for undergraduate applications to colleges and universities in the USA. It measures students' high school knowledge and their potential for success in university.</p>
      <p class="mb-6">Now conducted entirely in digital format, the SAT consists of Reading-Writing and Mathematics sections. It emphasizes critical thinking and problem-solving abilities.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Digitaler SAT: Schlüssel zum Hochschulzugang in den USA</h2>
      <p class="mb-6">Der SAT (Scholastic Assessment Test) ist die am weitesten verbreitete standardisierte Prüfung für Bachelor-Bewerbungen an Colleges und Universitäten in den USA. Er misst das Highschool-Wissen der Schüler und ihr Erfolgspotenzial an der Universität.</p>
      <p class="mb-6">Der SAT wird nun vollständig in digitalem Format durchgeführt und besteht aus den Bereichen Reading-Writing und Mathematics. Er stellt kritisches Denken und Problemlösungsfähigkeiten in den Vordergrund.</p>
    `,
    advantages: [
      { title: "Burs İmkanları", desc: "Yüksek SAT skorları, prestijli üniversitelerden akademik burs alma şansını artırır." },
      { title: "Global Başvuru", desc: "Sadece ABD değil, dünya genelindeki birçok seçkin üniversite tarafından kabul edilir." },
      { title: "Dijital Kolaylık", desc: "Adaptif test yapısı ile kişiye özel zorluk seviyesi ve daha kısa sınav süresi sunar." }
    ],
    advantages_en: [
      { title: "Scholarship Opportunities", desc: "High SAT scores increase the chance of receiving academic scholarships from prestigious universities." },
      { title: "Global Application", desc: "Accepted by many elite universities not only in the USA but worldwide." },
      { title: "Digital Convenience", desc: "Offers personalized difficulty levels and shorter exam times with an adaptive test structure." }
    ],
    advantages_de: [
      { title: "Stipendienmöglichkeiten", desc: "Hohe SAT-Ergebnisse erhöhen die Chancen auf akademische Stipendien an renommierten Universitäten." },
      { title: "Globale Bewerbung", desc: "Wird nicht nur in den USA, sondern von vielen Elite-Universitäten weltweit anerkannt." },
      { title: "Digitaler Komfort", desc: "Bietet personalisierte Schwierigkeitsgrade und kürzere Prüfungszeiten durch eine adaptive Teststruktur." }
    ],
    process: [
      { title: "Matematik Temeli", desc: "Cebir, problem çözme ve veri analizi konularında uzmanlaşma." },
      { title: "Eleştirel Okuma", desc: "Zorlayıcı metinleri anlama ve analiz etme becerisinin geliştirilmesi." },
      { title: "Bluebook Uygulaması", desc: "Resmi dijital sınav arayüzü ile pratik yapma." },
      { title: "Zaman Yönetimi", desc: "Her bölüm için ayrılan süreyi en verimli şekilde kullanma stratejileri." }
    ],
    process_en: [
      { title: "Math Foundation", desc: "Specialization in algebra, problem solving, and data analysis." },
      { title: "Critical Reading", desc: "Developing the ability to understand and analyze challenging texts." },
      { title: "Bluebook App", desc: "Practicing with the official digital exam interface." },
      { title: "Time Management", desc: "Strategies to use the time allocated for each section most efficiently." }
    ],
    process_de: [
      { title: "Mathematische Grundlagen", desc: "Spezialisierung in den Bereichen Algebra, Problemlösung und Datenanalyse." },
      { title: "Kritisches Lesen", desc: "Entwicklung der Fähigkeit, anspruchsvolle Texte zu verstehen und zu analysieren." },
      { title: "Bluebook-App", desc: "Üben mit der offiziellen digitalen Prüfungsoberfläche." },
      { title: "Zeitmanagement", desc: "Strategien zur effizientesten Nutzung der für jeden Bereich vorgesehenen Zeit." }
    ],
    faq: [
      { q: "SAT kaç puan üzerinden hesaplanır?", a: "Sınav toplam 1600 puan üzerinden değerlendirilir (her bölüm 800 puan)." },
      { q: "Sınav ne sıklıkla yapılır?", a: "Uluslararası öğrenciler için yılda genellikle 7 kez düzenlenir." }
    ],
    faq_en: [
      { q: "How is SAT scored?", a: "The exam is scored out of a total of 1600 points (800 points for each section)." },
      { q: "How often is the exam held?", a: "For international students, it is usually held 7 times a year." }
    ],
    faq_de: [
      { q: "Wie wird der SAT bewertet?", a: "Die Prüfung wird mit insgesamt 1600 Punkten bewertet (800 Punkte pro Bereich)." },
      { q: "Wie oft findet die Prüfung statt?", a: "Für internationale Studierende findet sie in der Regel 7 Mal pro Jahr statt." }
    ],
    structure: `
      <ul class="space-y-4">
        <li><strong>Reading & Writing (64 dk):</strong> İki modül halinde sunulan, metin analizi ve dil bilgisi soruları.</li>
        <li><strong>Mathematics (70 dk):</strong> İki modül. Hesap makinesi kullanımına izin verilen cebir ve veri analizi soruları.</li>
      </ul>
    `,
    structure_en: `
      <ul class="space-y-4">
        <li><strong>Reading & Writing (64 min):</strong> Text analysis and grammar questions presented in two modules.</li>
        <li><strong>Mathematics (70 min):</strong> Two modules. Algebra and data analysis questions where calculator use is permitted.</li>
      </ul>
    `,
    structure_de: `
      <ul class="space-y-4">
        <li><strong>Lesen & Schreiben (64 Min.):</strong> Textanalyse- und Grammatikfragen, die in zwei Modulen präsentiert werden.</li>
        <li><strong>Mathematik (70 Min.):</strong> Zwei Module. Fragen zur Algebra und Datenanalyse, bei denen die Verwendung eines Taschenrechners erlaubt ist.</li>
      </ul>
    `,
    scoring: `
      <p>SAT puanı 400 ile 1600 arasındadır. İki ana bölümün her biri 800 puan üzerinden değerlendirilir.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Önemli:</strong> Yanlış cevaplar doğru cevapları etkilemez; bu nedenle tüm soruların işaretlenmesi önerilir.
      </div>
    `,
    scoring_en: `
      <p>The SAT score is between 400 and 1600. Each of the two main sections is evaluated out of 800 points.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Important:</strong> Wrong answers do not affect correct answers; therefore, it is recommended to mark all questions.
      </div>
    `,
    scoring_de: `
      <p>Die SAT-Punktzahl liegt zwischen 400 und 1600. Jeder der beiden Hauptbereiche wird mit maximal 800 Punkten bewertet.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Wichtig:</strong> Falsche Antworten haben keinen Einfluss auf richtige Antworten; daher wird empfohlen, alle Fragen zu markieren.
      </div>
    `
  },
  gre: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">GRE: Lisansüstü Eğitimin Küresel Standardı</h2>
      <p class="mb-6">GRE (Graduate Record Examinations), mühendislikten sosyal bilimlere kadar geniş bir yelpazede yüksek lisans ve doktora başvuruları için gereklidir. Analitik yazma, sözel akıl yürütme ve sayısal yetenekleri ölçer.</p>
      <p class="mb-6">Dünya çapında binlerce lisansüstü okul ve işletme okulu tarafından kabul edilir. Adayların soyut düşünme yeteneğini ve karmaşık verileri yorumlama becerisini test eder.</p>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">GRE: Global Standard of Graduate Education</h2>
      <p class="mb-6">GRE (Graduate Record Examinations) is required for master's and doctoral applications across a wide range, from engineering to social sciences. It measures analytical writing, verbal reasoning, and quantitative abilities.</p>
      <p class="mb-6">Accepted by thousands of graduate and business schools worldwide. It tests candidates' abstract thinking ability and skill in interpreting complex data.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">GRE: Globaler Standard der Graduiertenausbildung</h2>
      <p class="mb-6">Das GRE (Graduate Record Examinations) wird für Master- und Promotionsbewerbungen in einem breiten Spektrum benötigt, von den Ingenieur- bis hin zu den Sozialwissenschaften. Es misst analytisches Schreiben, sprachliches logisches Denken und quantitative Fähigkeiten.</p>
      <p class="mb-6">Wird von Tausenden von Graduiertenschulen und Business Schools weltweit anerkannt. Es testet das abstrakte Denkvermögen der Bewerber und ihre Fähigkeit, komplexe Daten zu interpretieren.</p>
    `,
    advantages: [
      { title: "Çok Yönlü Kabul", desc: "Mühendislik, temel bilimler ve sosyal bilimler programları için birincil şarttır." },
      { title: "Esnek Sınav Formatı", desc: "Bölümler arası geçiş imkanı sunan kullanıcı dostu sınav arayüzü." },
      { title: "MBA Seçeneği", desc: "Artık birçok prestijli işletme okulu (MBA) tarafından GMAT alternatifi olarak kabul edilir." }
    ],
    advantages_en: [
      { title: "Versatile Acceptance", desc: "Primary requirement for engineering, basic sciences, and social sciences programs." },
      { title: "Flexible Exam Format", desc: "User-friendly exam interface offering the possibility of moving between sections." },
      { title: "MBA Option", desc: "Now accepted by many prestigious business schools (MBA) as an alternative to GMAT." }
    ],
    advantages_de: [
      { title: "Vielseitige Anerkennung", desc: "Grundvoraussetzung für Programme in Ingenieurwesen, Grundlagenwissenschaften und Sozialwissenschaften." },
      { title: "Flexibles Prüfungsformat", desc: "Benutzerfreundliche Prüfungsoberfläche, die den Wechsel zwischen den Bereichen ermöglicht." },
      { title: "MBA-Option", desc: "Wird mittlerweile von vielen renommierten Business Schools (MBA) als Alternative zum GMAT anerkannt." }
    ],
    process: [
      { title: "Sözel Akıl Yürütme", desc: "Karmaşık metin analizi ve ileri düzey kelime bilgisi çalışmaları." },
      { title: "Sayısal Yetenek", desc: "Geometri, aritmetik ve veri yorumlama konularında hız kazanma." },
      { title: "Analitik Yazma", desc: "Argüman oluşturma ve eleştirel analiz kompozisyon teknikleri." },
      { title: "Skor Seçimi (ScoreSelect)", desc: "En iyi sonuçlarınızı üniversitelere gönderme özgürlüğü." }
    ],
    process_en: [
      { title: "Verbal Reasoning", desc: "Complex text analysis and advanced vocabulary studies." },
      { title: "Quantitative Ability", desc: "Gaining speed in geometry, arithmetic, and data interpretation." },
      { title: "Analytical Writing", desc: "Argument construction and critical analysis essay techniques." },
      { title: "ScoreSelect", desc: "Freedom to send your best results to universities." }
    ],
    process_de: [
      { title: "Sprachliches logisches Denken", desc: "Analyse komplexer Texte und fortgeschrittene Vokabelstudien." },
      { title: "Quantitative Fähigkeiten", desc: "Schnelligkeit in Geometrie, Arithmetik und Dateninterpretation gewinnen." },
      { title: "Analytisches Schreiben", desc: "Argumentationsaufbau und Techniken für kritische Analyse-Essays." },
      { title: "ScoreSelect", desc: "Freiheit, Ihre besten Ergebnisse an die Universitäten zu senden." }
    ],
    faq: [
      { q: "GRE puanı kaç yıl geçerlidir?", a: "Sınav sonuçları 5 yıl boyunca geçerliliğini korur." },
      { q: "Sınav ne kadar sürer?", a: "Kısaltılmış yeni formatıyla yaklaşık 1 saat 58 dakika sürmektedir." }
    ],
    faq_en: [
      { q: "How long is the GRE score valid?", a: "Exam results remain valid for 5 years." },
      { q: "How long is the exam duration?", a: "With its shortened new format, it takes approximately 1 hour and 58 minutes." }
    ],
    faq_de: [
      { q: "Wie lange ist das GRE-Ergebnis gültig?", a: "Prüfungsergebnisse behalten 5 Jahre lang ihre Gültigkeit." },
      { q: "Wie lange dauert die Prüfung?", a: "Mit dem verkürzten neuen Format dauert sie etwa 1 Stunde und 58 Minuten." }
    ],
    structure: `
      <ul class="space-y-4">
        <li><strong>Analytical Writing (30 dk):</strong> Bir kompozisyon görevi. Eleştirel düşünme ve akademik yazım.</li>
        <li><strong>Verbal Reasoning (41 dk):</strong> İki bölüm. Kelime bilgisi, okuma ve anlama becerileri.</li>
        <li><strong>Quantitative Reasoning (47 dk):</strong> İki bölüm. Temel matematik kavramları ve veri analizi.</li>
      </ul>
    `,
    structure_en: `
      <ul class="space-y-4">
        <li><strong>Analytical Writing (30 min):</strong> One essay task. Critical thinking and academic writing.</li>
        <li><strong>Verbal Reasoning (41 min):</strong> Two sections. Vocabulary, reading, and comprehension skills.</li>
        <li><strong>Quantitative Reasoning (47 min):</strong> Two sections. Basic math concepts and data analysis.</li>
      </ul>
    `,
    structure_de: `
      <ul class="space-y-4">
        <li><strong>Analytisches Schreiben (30 Min.):</strong> Eine Essay-Aufgabe. Kritisches Denken und akademisches Schreiben.</li>
        <li><strong>Sprachliches logisches Denken (41 Min.):</strong> Zwei Abschnitte. Vokabelwissen, Lese- und Verständnisfertigkeiten.</li>
        <li><strong>Quantitatives logisches Denken (47 Min.):</strong> Zwei Abschnitte. Grundlegende mathematische Konzepte und Datenanalyse.</li>
      </ul>
    `,
    scoring: `
      <p>Sözel ve Sayısal bölümler 130-170 puan arasında, Yazma bölümü ise 0-6 puan arasında değerlendirilir.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>İpucu:</strong> ScoreSelect® hizmeti ile sadece en iyi skorunuzu kurumlara gönderebilirsiniz.
      </div>
    `,
    scoring_en: `
      <p>Verbal and Quantitative sections are scored between 130-170, and the Writing section is scored between 0-6 points.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Tip:</strong> With the ScoreSelect® service, you can choose to send only your best score to institutions.
      </div>
    `,
    scoring_de: `
      <p>Die sprachlichen und quantitativen Abschnitte werden mit 130-170 Punkten bewertet, der Bereich Schreiben mit 0-6 Punkten.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Tipp:</strong> Mit dem ScoreSelect®-Service können Sie wählen, nur Ihr bestes Ergebnis an die Institutionen zu senden.
      </div>
    `
  },
  gmat: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">GMAT Focus Edition: İş Dünyasının Liderlik Testi</h2>
      <p class="mb-6">GMAT (Graduate Management Admission Test), dünya genelindeki işletme okullarının (MBA) adayları değerlendirmek için kullandığı altın standarttır. Sayısal, Sözel ve Veri Analizi bölümlerinden oluşur.</p>
      <p class="mb-6">GMAT Focus Edition, iş dünyasının değişen ihtiyaçlarına göre optimize edilmiş daha kısa ve odaklanmış bir sınav deneyimi sunar. Adayların stratejik düşünme ve kritik karar verme yeteneklerini ölçer.</p>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">GMAT Focus Edition: Leadership Test of the Business World</h2>
      <p class="mb-6">GMAT (Graduate Management Admission Test) is the gold standard used by business schools (MBA) worldwide to evaluate candidates. It consists of Quantitative, Verbal, and Data Insights sections.</p>
      <p class="mb-6">GMAT Focus Edition offers a shorter and more focused exam experience optimized according to the changing needs of the business world. It measures candidates' strategic thinking and critical decision-making abilities.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">GMAT Focus Edition: Führungstest der Geschäftswelt</h2>
      <p class="mb-6">Der GMAT (Graduate Management Admission Test) ist der Goldstandard, den Business Schools (MBA) weltweit zur Bewertung von Kandidaten verwenden. Er besteht aus den Bereichen Quantitative, Verbal und Data Insights.</p>
      <p class="mb-6">Die GMAT Focus Edition bietet eine kürzere und fokussiertere Prüfungserfahrung, die auf die sich ändernden Bedürfnisse der Geschäftswelt optimiert ist. Sie misst das strategische Denken und die kritischen Entscheidungsfähigkeiten der Kandidaten.</p>
    `,
    advantages: [
      { title: "En İyi MBA Okulları", desc: "Harvard, Stanford, INSEAD gibi dev okullara girişte en güçlü silahtır." },
      { title: "Veri Odaklılık", desc: "Yeni formatı ile iş hayatında çok kritik olan veri analizi becerisini ön plana çıkarır." },
      { title: "Soru İnceleme ve Değiştirme", desc: "Cevap verdiğiniz soruları inceleme ve belirli sayıda değiştirme hakkı tanır." }
    ],
    advantages_en: [
      { title: "Top MBA Schools", desc: "The strongest weapon for entering giant schools like Harvard, Stanford, and INSEAD." },
      { title: "Data Focus", desc: "With its new format, it emphasizes data analysis skill, which is very critical in business life." },
      { title: "Question Review and Edit", desc: "Allows you to review questions you've answered and edit a specific number of them." }
    ],
    advantages_de: [
      { title: "Top-MBA-Schulen", desc: "Die stärkste Waffe für den Zugang zu Top-Schulen wie Harvard, Stanford und INSEAD." },
      { title: "Datenfokus", desc: "Mit dem neuen Format betont er die Fähigkeit zur Datenanalyse, die in der Geschäftswelt von entscheidender Bedeutung ist." },
      { title: "Fragenprüfung und -änderung", desc: "Ermöglicht es Ihnen, bereits beantwortete Fragen zu überprüfen und eine bestimmte Anzahl davon zu ändern." }
    ],
    process: [
      { title: "Quantitative Reasoning", desc: "Matematiksel mantık ve problem çözme hızı çalışmaları." },
      { title: "Verbal Reasoning", desc: "Eleştirel akıl yürütme ve okuduğunu anlama yetkinliği." },
      { title: "Data Insights", desc: "Grafik, tablo ve karmaşık verileri yorumlama teknikleri." },
      { title: "Bölüm Seçimi", desc: "Sınav bölümlerinin sırasını kişisel tercihinize göre belirleme stratejisi." }
    ],
    process_en: [
      { title: "Quantitative Reasoning", desc: "Mathematical logic and problem-solving speed studies." },
      { title: "Verbal Reasoning", desc: "Critical reasoning and reading comprehension competency." },
      { title: "Data Insights", desc: "Techniques for interpreting graphics, tables, and complex data." },
      { title: "Section Selection", desc: "Strategy to determine the order of exam sections according to your personal preference." }
    ],
    process_de: [
      { title: "Quantitative Reasoning", desc: "Mathematische Logik und Studien zur Problemlösungsgeschwindigkeit." },
      { title: "Verbal Reasoning", desc: "Kritisches Denken und Leseverständniskompetenz." },
      { title: "Data Insights", desc: "Techniken zur Interpretation von Grafiken, Tabellen und komplexen Daten." },
      { title: "Abschnittsauswahl", desc: "Strategie zur Festlegung der Reihenfolge der Prüfungsabschnitte nach Ihren persönlichen Vorlieben." }
    ],
    faq: [
      { q: "GMAT Focus kaç puan üzerinden hesaplanır?", a: "Sınav 205 ile 805 puan arasında 10'luk artışlarla puanlanır." },
      { q: "Sınava ne sıklıkla girilebilir?", a: "Yılda en fazla 5 kez ve ömür boyu toplam 8 kez girme hakkı vardır." }
    ],
    faq_en: [
      { q: "How is GMAT Focus scored?", a: "The exam is scored between 205 and 805 in 10-point increments." },
      { q: "How often can the exam be taken?", a: "You have the right to enter a maximum of 5 times a year and a total of 8 times in your lifetime." }
    ],
    faq_de: [
      { q: "Was ist der Punktebereich des GMAT Focus?", a: "Die Punktzahlen liegen zwischen 205 und 805." },
      { q: "Wie oft kann ich den GMAT ablegen?", a: "Sie können ihn bis zu 5 Mal pro Jahr und insgesamt 8 Mal in Ihrem Leben ablegen." }
    ],
    structure: `
      <ul class="space-y-4">
        <li><strong>Quantitative Reasoning (45 dk):</strong> 21 soru. Veri yeterliliği ve problem çözme.</li>
        <li><strong>Verbal Reasoning (45 dk):</strong> 23 soru. Eleştirel akıl yürütme ve okuduğunu anlama.</li>
        <li><strong>Data Insights (45 dk):</strong> 20 soru. Çok kaynaklı veri analizi ve grafik yorumlama.</li>
      </ul>
    `,
    structure_en: `
      <ul class="space-y-4">
        <li><strong>Quantitative Reasoning (45 min):</strong> 21 questions. Data sufficiency and problem solving.</li>
        <li><strong>Verbal Reasoning (45 min):</strong> 23 questions. Critical reasoning and reading comprehension.</li>
        <li><strong>Data Insights (45 min):</strong> 20 questions. Multi-source data analysis and graphics interpretation.</li>
      </ul>
    `,
    structure_de: `
      <ul class="space-y-4">
        <li><strong>Quantitatives logisches Denken (45 Min.):</strong> 21 Fragen. Datensuffizienz und Problemlösung.</li>
        <li><strong>Sprachliches logisches Denken (45 Min.):</strong> 23 Fragen. Kritisches Denken und Leseverständnis.</li>
        <li><strong>Data Insights (45 Min.):</strong> 20 Fragen. Datenanalyse aus mehreren Quellen und Grafikinterpretation.</li>
      </ul>
    `,
    scoring: `
      <p>GMAT Focus puanı 205 ile 805 arasındadır. Tüm bölümler puanlamaya dahil edilir.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Yenilik:</strong> Artık yanlış cevapları gözden geçirme ve her bölümde 3 soruya kadar cevap değiştirme hakkınız var.
      </div>
    `,
    scoring_en: `
      <p>The GMAT Focus score is between 205 and 805. All sections are included in the scoring.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Innovation:</strong> You now have the right to review wrong answers and change answers for up to 3 questions in each section.
      </div>
    `,
    scoring_de: `
      <p>Die GMAT Focus-Punktzahl liegt zwischen 205 und 805. Alle Abschnitte fließen in die Bewertung ein.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Neuerung:</strong> Sie haben nun das Recht, falsche Antworten zu überprüfen und Antworten für bis zu 3 Fragen in jedem Abschnitt zu ändern.
      </div>
    `
  },
  pte: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">PTE Academic: Hızlı ve Yapay Zeka Destekli Dil Sınavı</h2>
      <p class="mb-6">PTE (Pearson Test of English) Academic, bilgisayar tabanlı, yapay zeka tarafından puanlanan ve sonuçları çok kısa sürede açıklanan bir dil sınavıdır. Üniversite kabulleri ve profesyonel kariyer başvuruları için dünya genelinde kabul görür.</p>
      <p class="mb-6">Geleneksel sınavlara göre daha esnek randevu imkanları ve stres faktörünü azaltan sınav yapısı ile adaylar arasında popülerliği hızla artmaktadır.</p>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">PTE Academic: Fast and AI-Powered Language Exam</h2>
      <p class="mb-6">PTE (Pearson Test of English) Academic is a computer-based language exam scored by AI, with results announced in a very short time. It is accepted worldwide for university admissions and professional career applications.</p>
      <p class="mb-6">Its popularity is increasing rapidly among candidates due to more flexible appointment opportunities compared to traditional exams and an exam structure that reduces stress factors.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">PTE Academic: Schneller und KI-gestützter Sprachtest</h2>
      <p class="mb-6">PTE (Pearson Test of English) Academic ist eine computergestützte Sprachprüfung, die von einer KI bewertet wird und deren Ergebnisse innerhalb kürzester Zeit bekannt gegeben werden. Sie wird weltweit für Universitätszulassungen und berufliche Karrieremöglichkeiten anerkannt.</p>
      <p class="mb-6">Dank flexiblerer Termine im Vergleich zu herkömmlichen Prüfungen und einer Prüfungsstruktur, die Stressfaktoren reduziert, nimmt die Beliebtheit bei den Bewerbern schnell zu.</p>
    `,
    advantages: [
      { title: "Hızlı Sonuç", desc: "Sınav sonuçları genellikle 48 saat içinde, hatta bazen aynı gün açıklanır." },
      { title: "Objektif Puanlama", desc: "Yapay zeka tabanlı değerlendirme ile insani hatalar ve önyargılar ortadan kalkar." },
      { title: "Global Geçerlilik", desc: "Binlerce kurum tarafından kabul edilir." }
    ],
    advantages_en: [
      { title: "Fast Results", desc: "Exam results are usually announced within 48 hours, sometimes even on the same day." },
      { title: "Objective Scoring", desc: "Human errors and biases are eliminated with AI-based assessment." },
      { title: "Global Validity", desc: "Accepted by thousands of institutions." }
    ],
    advantages_de: [
      { title: "Schnelle Ergebnisse", desc: "Prüfungsergebnisse werden in der Regel innerhalb von 48 Stunden, manchmal sogar am selben Tag, bekannt gegeben." },
      { title: "Objektive Bewertung", desc: "Menschliche Fehler und Voreingenommenheit werden durch die KI-basierte Bewertung ausgeschlossen." },
      { title: "Globale Gültigkeit", desc: "Wird von Tausenden von Institutionen anerkannt." }
    ],
    process: [
      { title: "Sınav Formatı", desc: "Tek oturumda tamamlanan 2 saatlik yoğunlaştırılmış sınav yapısı." },
      { title: "Hazırlık Materyalleri", desc: "Pearson'ın resmi interaktif hazırlık platformları ve mobil uygulamaları." },
      { title: "Pratik Testleri", desc: "Gerçek sınav arayüzü ile birebir aynı olan deneme sınavları." },
      { title: "Randevu Alma", desc: "Yılın 365 günü, sınavdan 24 saat öncesine kadar randevu alabilme kolaylığı." }
    ],
    process_en: [
      { title: "Exam Format", desc: "A 2-hour condensed exam structure completed in a single session." },
      { title: "Preparation Materials", desc: "Pearson's official interactive preparation platforms and mobile applications." },
      { title: "Practice Tests", desc: "Mock exams identical to the actual exam interface." },
      { title: "Booking", desc: "Ease of booking 365 days a year, up to 24 hours before the exam." }
    ],
    process_de: [
      { title: "Prüfungsformat", desc: "Eine 2-stündige, komprimierte Prüfungsstruktur, die in einer einzigen Sitzung abgeschlossen wird." },
      { title: "Vorbereitungsmaterialien", desc: "Die offiziellen interaktiven Vorbereitungsplattformen und mobilen Apps von Pearson." },
      { title: "Übungstests", desc: "Probeklausuren, die identisch mit der tatsächlichen Prüfungsoberfläche sind." },
      { title: "Terminbuchung", desc: "Einfache Buchung an 365 Tagen im Jahr, bis zu 24 Stunden vor der Prüfung." }
    ],
    faq: [
      { q: "PTE Academic puanı ne kadar geçerlidir?", a: "PTE sonuçları genellikle 2 yıl geçerlidir." },
      { q: "Sınava kaç kez girebilirim?", a: "Herhangi bir sınır yoktur, ancak iki sınav arasında en az 5 gün olmalıdır." }
    ],
    faq_en: [
      { q: "How long is the PTE Academic score valid?", a: "PTE results are generally valid for 2 years." },
      { q: "How many times can I take the exam?", a: "There is no limit, but there must be at least 5 days between two exams." }
    ],
    faq_de: [
      { q: "Wie lange ist das PTE Academic-Ergebnis gültig?", a: "PTE-Ergebnisse sind in der Regel 2 Jahre lang gültig." },
      { q: "Wie oft kann ich die Prüfung ablegen?", a: "Es gibt keine Beschränkung, es müssen jedoch mindestens 5 Tage zwischen zwei Prüfungen liegen." }
    ],
    structure: `
      <ul class="space-y-4">
        <li><strong>Speaking & Writing (54-67 dk):</strong> Kişisel tanıtım, yüksek sesle okuma, özetleme ve kompozisyon.</li>
        <li><strong>Reading (29-30 dk):</strong> Boşluk doldurma, çoktan seçmeli sorular ve paragraf sıralama.</li>
        <li><strong>Listening (30-43 dk):</strong> Özetleme, dikte ve sesli kayıtları yorumlama.</li>
      </ul>
    `,
    structure_en: `
      <ul class="space-y-4">
        <li><strong>Speaking & Writing (54-67 min):</strong> Personal introduction, reading aloud, summarizing, and essay.</li>
        <li><strong>Reading (29-30 min):</strong> Fill in the blanks, multiple choice questions, and paragraph ordering.</li>
        <li><strong>Listening (30-43 min):</strong> Summarizing, dictation, and interpreting audio recordings.</li>
      </ul>
    `,
    structure_de: `
      <ul class="space-y-4">
        <li><strong>Sprechen & Schreiben (54-67 Min.):</strong> Persönliche Vorstellung, Vorlesen, Zusammenfassen und Essay.</li>
        <li><strong>Lesen (29-30 Min.):</strong> Lückentexte, Multiple-Choice-Fragen und Absatzordnung.</li>
        <li><strong>Hören (30-43 Min.):</strong> Zusammenfassen, Diktat und Interpretation von Audioaufnahmen.</li>
      </ul>
    `,
    scoring: `
      <p>PTE Global Scale of English baz alınarak 10 ile 90 puan arasında değerlendirilir.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Avantaj:</strong> Tüm beceriler (dil bilgisi, akıcılık, telaffuz vb.) yapay zeka tarafından saniyeler içinde analiz edilir.
      </div>
    `,
    scoring_en: `
      <p>PTE is scored between 10 and 90 points based on the Global Scale of English.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Advantage:</strong> All skills (grammar, fluency, pronunciation, etc.) are analyzed by AI in seconds.
      </div>
    `,
    scoring_de: `
      <p>PTE wird basierend auf der Global Scale of English mit 10 bis 90 Punkten bewertet.</p>
      <div class="mt-4 p-4 bg-white/10 rounded-xl">
        <strong>Vorteil:</strong> Alle Fertigkeiten (Grammatik, Flüssigkeit, Aussprache usw.) werden in Sekundenschnelle von der KI analysiert.
      </div>
    `
  },
  cambridge: {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Cambridge English: Ömür Boyu Geçerli Dil Sertifikası</h2>
      <p class="mb-6">Cambridge English sınavları (B2 First, C1 Advanced, C2 Proficiency), İngilizce dil yeteneğinizi kanıtlayan ve geçerlilik süresi dolmayan en prestijli belgelerden biridir. Cambridge Üniversitesi tarafından düzenlenen bu sınavlar, dünya genelinde 25.000'den fazla kurum tarafından tanınır.</p>
      <p class="mb-6">Akademik eğitimin yanı sıra profesyonel iş dünyasında da büyük saygınlığa sahip olan bu sınavlar, dil becerilerinizi derinlemesine ölçer ve pratik kullanım yeteneğinizi geliştirir.</p>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Cambridge English: Lifetime Valid Language Certificate</h2>
      <p class="mb-6">Cambridge English exams (B2 First, C1 Advanced, C2 Proficiency) are among the most prestigious documents proving your English language ability and never expire. Organized by the University of Cambridge, these exams are recognized by more than 25,000 institutions worldwide.</p>
      <p class="mb-6">In addition to academic education, these exams, which have great prestige in the professional business world, measure your language skills in depth and improve your practical usage ability.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Cambridge English: Lebenslang gültiges Sprachzertifikat</h2>
      <p class="mb-6">Cambridge English Prüfungen (B2 First, C1 Advanced, C2 Proficiency) gehören zu den prestigeträchtigsten Dokumenten zum Nachweis Ihrer Englischkenntnisse und laufen nie ab. Diese von der Universität Cambridge organisierten Prüfungen werden von mehr als 25.000 Institutionen weltweit anerkannt.</p>
      <p class="mb-6">Zusätzlich zur akademischen Ausbildung messen diese Prüfungen, die in der professionellen Geschäftswelt ein hohes Ansehen genießen, Ihre Sprachkenntnisse in der Tiefe und verbessern Ihre praktischen Anwendungsfähigkeiten.</p>
    `,
    advantages: [
      { title: "Ömür Boyu Geçerlilik", desc: "Sertifikalarınızın süresi asla dolmaz, bir kez almanız yeterlidir." },
      { title: "Derinlemesine Ölçüm", desc: "Dil bilgisini sadece test etmekle kalmaz, doğru kullanımı da ölçer." },
      { title: "Global Saygınlık", desc: "Avrupa başta olmak üzere dünya çapındaki seçkin üniversitelerce tercih edilir." }
    ],
    advantages_en: [
      { title: "Lifetime Validity", desc: "Your certificates never expire, you only need to get them once." },
      { title: "In-depth Measurement", desc: "It doesn't just test grammar, it also measures correct usage." },
      { title: "Global Prestige", desc: "Preferred by elite universities worldwide, especially in Europe." }
    ],
    advantages_de: [
      { title: "Lebenslange Gültigkeit", desc: "Ihre Zertifikate laufen nie ab, Sie müssen sie nur einmal erwerben." },
      { title: "Tiefgehende Messung", desc: "Es wird nicht nur die Grammatik getestet, sondern auch die korrekte Anwendung gemessen." },
      { title: "Globales Prestige", desc: "Bevorzugt von Elite-Universitäten weltweit, insbesondere in Europa." }
    ],
    process: [
      { title: "Seviye Analizi", desc: "Hedeflenen sertifika düzeyinin (B2, C1, C2) belirlenmesi." },
      { title: "Kapsamlı Eğitim", desc: "Okuma, yazma, dinleme ve konuşma becerilerinin eş zamanlı gelişimi." },
      { title: "Eşli Mülakat Pratiği", desc: "Konuşma sınavı için ikili etkileşim ve senaryo çalışmaları." },
      { title: "Sınav Oturumu", desc: "Kağıt tabanlı veya bilgisayarlı sınav seçenekleri ile uygulama." }
    ],
    process_en: [
      { title: "Level Analysis", desc: "Determining the targeted certificate level (B2, C1, C2)." },
      { title: "Comprehensive Training", desc: "Simultaneous development of reading, writing, listening, and speaking skills." },
      { title: "Paired Interview Practice", desc: "Dual interaction and scenario studies for the speaking exam." },
      { title: "Exam Session", desc: "Application with paper-based or computer-delivered exam options." }
    ],
    process_de: [
      { title: "Niveauanalyse", desc: "Festlegung des angestrebten Zertifikatsniveaus (B2, C1, C2)." },
      { title: "Umfassendes Training", desc: "Gleichzeitige Entwicklung der Lese-, Schreib-, Hör- und Sprechfertigkeiten." },
      { title: "Paarweises Interview-Training", desc: "Interaktions- und Szenariostudien zu zweit für die Sprechprüfung." },
      { title: "Prüfungssitzung", desc: "Durchführung mit papierbasierten oder computergestützten Prüfungsoptionen." }
    ],
    faq: [
      { q: "Sınavlar ne kadar süreyle geçerlidir?", a: "Cambridge sertifikalarının son kullanma tarihi yoktur, ömür boyu geçerlidir." },
      { q: "Hangi seviyeden başlamalıyım?", a: "Uzmanlarımız mevcut seviyenizi belirleyerek size en uygun sertifika hedefini belirleyecektir." }
    ],
    faq_en: [
      { q: "How long are the exams valid?", a: "Cambridge certificates have no expiration date and are valid for life." },
      { q: "Which level should I start from?", a: "Our experts will determine your current level and set the most suitable certificate goal for you." }
    ],
    faq_de: [
      { q: "Wie lange sind die Prüfungen gültig?", a: "Cambridge-Zertifikate haben kein Ablaufdatum und sind lebenslang gültig." },
      { q: "Auf welchem Niveau sollte ich beginnen?", a: "Unsere Experten ermitteln Ihr aktuelles Niveau und legen das am besten geeignete Zertifikatsziel für Sie fest." }
    ],
    structure: `
      <ul class="space-y-4">
        <li><strong>Reading & Use of English (90 dk):</strong> Metin analizi ve derinlemesine gramer bilgisi.</li>
        <li><strong>Writing (90 dk):</strong> Makale, mektup veya rapor yazımı.</li>
        <li><strong>Listening (40 dk):</strong> Çeşitli bağlamlarda dinleme ve anlama.</li>
        <li><strong>Speaking (15 dk):</strong> Başka bir aday ile eşleşerek yapılan mülakat.</li>
      </ul>
    `,
    structure_en: `
      <ul class="space-y-4">
        <li><strong>Reading & Use of English (90 min):</strong> Text analysis and in-depth grammar knowledge.</li>
        <li><strong>Writing (90 min):</strong> Writing articles, letters, or reports.</li>
        <li><strong>Listening (40 min):</strong> Listening and understanding in various contexts.</li>
        <li><strong>Speaking (15 min):</strong> Interview conducted by pairing with another candidate.</li>
      </ul>
    `,
    structure_de: `
      <ul class="space-y-4">
        <li><strong>Lesen & Use of English (90 Min.):</strong> Textanalyse und fundierte Grammatikkenntnisse.</li>
        <li><strong>Schreiben (90 Min.):</strong> Schreiben von Artikeln, Briefen oder Berichten.</li>
        <li><strong>Hören (40 Min.):</strong> Hören und Verstehen in verschiedenen Kontexten.</li>
        <li><strong>Sprechen (15 Min.):</strong> Interview, das paarweise mit einem anderen Kandidaten durchgeführt wird.</li>
      </ul>
    `,
    scoring: `
      <p>Cambridge English Scale sistemi kullanılır. 160 ile 230+ arası puanlarla seviyeniz (B2, C1, C2) tescil edilir.</p>
    `,
    scoring_en: `
      <p>The Cambridge English Scale system is used. Your level (B2, C1, C2) is certified with scores between 160 and 230+.</p>
    `,
    scoring_de: `
      <p>Es wird das System der Cambridge English Scale verwendet. Ihr Niveau (B2, C1, C2) wird mit Punktzahlen zwischen 160 und 230+ zertifiziert.</p>
    `
  }
};
