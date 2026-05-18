const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Başlıyor: Yurtdışı Üniversite (Lisans) İçerikleri ve Kurumlar Seeding...');

  // 1. Service: Yurtdışı Üniversite (General Info)
  const serviceSlug = 'yurtdisi-universite';
  
  let service = await prisma.service.findUnique({
    where: { slug: serviceSlug }
  });

  const generalContent = `
    <h2>Neden Yurtdışında Üniversite (Lisans) Eğitimi?</h2>
    <p>Lise mezuniyeti sonrasında üniversite eğitiminizi yurtdışında almak, hayatınızın en önemli ve ufuk açıcı kararlarından biridir. Sadece dünya çapında tanınan bir diploma almakla kalmaz, aynı zamanda farklı kültürleri yakından tanır, anadil seviyesinde yabancı dil öğrenir ve küresel bir bakış açısı kazanırsınız.</p>
    
    <h3>Yurtdışında Lisans Eğitiminin Avantajları</h3>
    <ul>
      <li><strong>Dünya Sıralamalarındaki Üniversiteler:</strong> Türkiye'deki sınav sisteminin stresinden uzaklaşarak, dünya sıralamasında (QS, THE) ilk 500'de yer alan prestijli üniversitelerde doğrudan alanınıza odaklı bir eğitim alabilirsiniz.</li>
      <li><strong>Süre ve Maliyet Avantajı:</strong> İngiltere ve İrlanda gibi ülkelerde lisans eğitimi genellikle <strong>3 yıl</strong> sürer. Almanya ve İtalya gibi bazı Avrupa ülkelerinde ise devlet üniversiteleri ücretsiz veya çok düşük harçlıdır.</li>
      <li><strong>Sınavsız Geçiş Fırsatları:</strong> Birçok ülke, Türkiye'deki YKS (Üniversite Sınavı) sonucunuza bakmaksızın, lise diploma notunuz ve dil yeterliliğiniz ile kabul vermektedir.</li>
      <li><strong>Kariyer ve Çalışma İzni:</strong> Çoğu ülke uluslararası öğrencilere mezuniyet sonrası (Post-Study Work Visa) kalıp çalışma izni vermektedir. Bu sayede eğitiminizi global bir kariyerle taçlandırabilirsiniz.</li>
      <li><strong>Çok Uluslu Çevre:</strong> Dünyanın her yerinden gelen öğrencilerle kuracağınız arkadaşlıklar, ileride uluslararası iş ağınızın (network) temelini oluşturacaktır.</li>
    </ul>

    <h3>Genel Başvuru Şartları (Lisans)</h3>
    <p>Lisans başvuruları ülkeden ülkeye değişse de, temel olarak aranan özellikler ve diplomalar şunlardır:</p>
    <ul>
      <li><strong>Lise Diploması (GPA):</strong> Lise mezuniyet notunuz (özellikle 9, 10, 11 ve 12. sınıf ortalamanız) en önemli kriterdir. İyi bir ortalama her kapıyı açar.</li>
      <li><strong>Uluslararası Diplomalar (IB, AP, A-Level):</strong> Türk lise diplomasının yanında International Baccalaureate (IB), Advanced Placement (AP) veya A-Level gibi uluslararası diplomalar almanız, dünyanın en iyi okullarına doğrudan kabul şansınızı katlar.</li>
      <li><strong>Dil Yeterliliği:</strong> İngilizce bölümler için IELTS (genellikle 6.0 - 6.5) veya TOEFL (80+) puanları istenir.</li>
      <li><strong>Hazırlık Yılı (Foundation):</strong> Eğer lise diplomanız veya akademik yeterliliğiniz doğrudan kabul için uygun değilse, 1 yıllık 'Foundation' (Üniversite Hazırlık) okuyarak hedefinize ulaşabilirsiniz.</li>
      <li><strong>Niyet ve Referans Mektupları:</strong> Neden bu bölümü okumak istediğinizi açıklayan, sosyal yönünüzü ve başarılarınızı anlatan Niyet Mektubu (Personal Statement) kabul aşamasında çok etkilidir.</li>
    </ul>

    <h3>Ne Zaman Başvurulmalı?</h3>
    <p>İdeal olan, lise 11. sınıfın yaz aylarında hazırlıklara başlamaktır. Başvurular genellikle 12. sınıfın başında (Eylül-Ekim aylarında) açılır. İngiltere'de UCAS üzerinden veya ABD için Common App üzerinden yapılan başvurularda erken hareket etmek ('Early Action/Decision') büyük avantaj sağlar.</p>
  `;

  if (service) {
    await prisma.service.update({
      where: { id: service.id },
      data: {
        content: generalContent,
        seoDescription: 'Yurtdışında üniversite (Lisans) eğitiminin avantajları, sınavsız kabul şartları, IB/AP gereksinimleri ve ülkeler hakkında kapsamlı rehber.',
      }
    });
    console.log('✅ Service "yurtdisi-universite" güncellendi.');
  } else {
    service = await prisma.service.create({
      data: {
        title: 'Yurtdışı Üniversite',
        title_en: 'Bachelor\'s Degree Abroad',
        title_de: 'Bachelorstudium im Ausland',
        slug: serviceSlug,
        active: true,
        content: generalContent,
        seoDescription: 'Yurtdışında üniversite (Lisans) eğitiminin avantajları, sınavsız kabul şartları, IB/AP gereksinimleri ve ülkeler hakkında kapsamlı rehber.',
      }
    });
    console.log('✅ Service "yurtdisi-universite" oluşturuldu.');
  }

  // 2. Countries, Contents, and Institutions
  const countriesData = [
    {
      slug: 'ingiltere',
      name: 'İngiltere',
      image: 'https://images.unsplash.com/photo-1513635269975-5969336ac1cb?q=80&w=2070',
      seoTitle: 'İngiltere Üniversite Eğitimi (Lisans) | Mentor Career Consulting',
      seoDesc: 'İngiltere\'de üniversite eğitimi, Foundation yılı, UCAS başvuru sistemi, 3 yıllık lisans programları ve fiyatlar.',
      content: `
        <h2>İngiltere'de Üniversite (Lisans) Eğitimi</h2>
        <p>Dünyanın en köklü eğitim sistemlerinden birine sahip olan İngiltere, Oxford, Cambridge, Imperial gibi devlere ev sahipliği yapar. Mükemmel bir akademik temel atmak isteyen öğrenciler için ilk tercihtir.</p>
        
        <h3>Neden İngiltere'de Üniversite?</h3>
        <ul>
            <li><strong>3 Yılda Mezuniyet:</strong> İngiltere'de lisans eğitimi (İskoçya hariç) <strong>3 yıl</strong> sürer. Bu da hem hayata bir yıl erken atılmanızı hem de yaşam masraflarından bir yıl tasarruf etmenizi sağlar.</li>
            <li><strong>Mezuniyet Sonrası Çalışma (PSW):</strong> Eğitiminizi tamamladıktan sonra İngiltere'de kalarak iş aramak ve çalışmak için <strong>2 yıllık Graduate Route vizesi</strong> alabilirsiniz.</li>
            <li><strong>Derinlemesine Eğitim:</strong> Eğitim sistemi, ilk yıldan itibaren gereksiz seçmeli dersler yerine doğrudan uzmanlık alanınıza (Major) odaklanmanızı sağlar.</li>
        </ul>

        <h3>Kabul Şartları ve Başvuru (UCAS)</h3>
        <p>İngiltere'ye başvurular merkezi bir sistem olan <strong>UCAS</strong> üzerinden yapılır.</p>
        <ul>
            <li><strong>Uluslararası Diplomalar:</strong> İngiliz üniversiteleri IB (International Baccalaureate) veya A-Level diplomalarını doğrudan kabul eder.</li>
            <li><strong>Foundation (Hazırlık) Yılı:</strong> Eğer standart Türk lisesi (MEB) diplomasına sahipseniz, İngiltere'de doğrudan 1. sınıfa başlamanız çoğu zaman mümkün değildir. Bunun yerine, 1 yıllık <strong>Foundation (Akademik Hazırlık)</strong> programına katılırsınız. Bu program sizi hem akademik İngilizce hem de okuyacağınız bölüme temel oluşturacak derslerle üniversiteye hazırlar.</li>
            <li><strong>Dil:</strong> Doğrudan giriş için IELTS UKVI 6.0 - 6.5, Foundation için ise IELTS UKVI 4.5 - 5.5 istenir.</li>
        </ul>

        <h3>Eğitim Ücretleri</h3>
        <p>Uluslararası öğrenciler için yıllık lisans harçları ortalama <strong>£15,000 ile £30,000</strong> arasındadır. Yaşam maliyeti Londra için yıllık £14,000 - £16,000 civarıdır.</p>
      `,
      institutions: [
        { name: 'University of Oxford', slug: 'university-of-oxford-uk', city: 'Oxford', desc: 'Dünyanın en eski ve prestijli üniversitelerinden biri.' },
        { name: 'Imperial College London', slug: 'imperial-college-london-uk', city: 'Londra', desc: 'Mühendislik, tıp ve bilim alanlarında dünya lideri.' },
        { name: 'UCL (University College London)', slug: 'ucl-uk', city: 'Londra', desc: 'Londra\'nın kalbinde yer alan küresel araştırma üniversitesi.' }
      ]
    },
    {
      slug: 'amerika',
      name: 'Amerika Birleşik Devletleri',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070',
      seoTitle: 'Amerika\'da Üniversite Eğitimi (Lisans) | Mentor Career Consulting',
      seoDesc: 'ABD\'de üniversite eğitimi, SAT/ACT sınavları, Ivy League kabul süreçleri ve Amerika lisans eğitimi.',
      content: `
        <h2>Amerika'da (ABD) Üniversite (Lisans) Eğitimi</h2>
        <p>Amerika, esnek eğitim sistemi, muazzam kampüs hayatı ve dünyanın en iyi üniversite sıralamalarını domine etmesiyle benzersiz bir deneyim sunar.</p>

        <h3>Neden Amerika'da Üniversite?</h3>
        <ul>
            <li><strong>Liberal Arts ve Esneklik:</strong> Amerikan sistemi size "Liberal Arts" felsefesiyle yaklaşır. İlk iki yıl (Freshman/Sophomore) farklı alanlardan dersler alarak vizyonunuzu geliştirir, 3. sınıfta (Junior) asıl bölümünüzü (Major) seçebilirsiniz. Hatta Çift Anadal (Double Major) ve Yandal (Minor) yapmak son derece yaygındır.</li>
            <li><strong>OPT ile Çalışma Fırsatı:</strong> Mezun olduktan sonra kendi alanınızda OPT (Optional Practical Training) kapsamında çalışabilirsiniz. STEM alanlarında bu süre 3 yıla çıkmaktadır.</li>
            <li><strong>Muazzam Kampüs Olanakları:</strong> Dünyanın hiçbir yerinde Amerika'daki gibi devasa spor komplekslerine, araştırma merkezlerine ve sosyal kulüplere sahip kampüsler bulamazsınız.</li>
        </ul>

        <h3>Kabul Şartları ve Başvuru (Common App)</h3>
        <ul>
            <li><strong>Lise Ortalaması:</strong> Yüksek bir lise ortalaması (tercihen 85/100 ve üzeri) şarttır.</li>
            <li><strong>SAT veya ACT Sınavları:</strong> Üniversiteye giriş için akademik yeterliliğinizi ölçen bu sınavlardan iyi skorlar almanız gerekir (Pandemi sonrası "Test-Optional" olsa da prestijli okullar için hala kritik bir avantajdır).</li>
            <li><strong>Ekstra Kürriküler Aktiviteler:</strong> Amerika sadece notlarınıza bakmaz; liderlik vasıflarınız, spor/sanat başarılarınız ve gönüllülük projeleriniz kabulde büyük rol oynar.</li>
            <li><strong>Dil:</strong> TOEFL iBT (genelde 80+), IELTS (6.5+) veya Duolingo English Test istenir.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetleri</h3>
        <p>Eğitim <strong>4 yıl</strong> sürer. Eyalet üniversiteleri (State Universities) yıllık $25,000 - $40,000, özel üniversiteler ise $50,000 - $80,000+ civarındadır. Amerika ayrıca yetenekli ve başarılı öğrencilere zengin <strong>burs imkanları</strong> (merit-based scholarships) sunan nadir ülkelerdendir.</p>
      `,
      institutions: [
        { name: 'Massachusetts Institute of Technology (MIT)', slug: 'mit-usa', city: 'Cambridge, MA', desc: 'Teknoloji ve mühendisliğin küresel zirvesi.' },
        { name: 'Stanford University', slug: 'stanford-university-usa', city: 'Stanford, CA', desc: 'Silikon Vadisi\'nin kalbinde yer alan prestijli eğitim kurumu.' },
        { name: 'Harvard University', slug: 'harvard-university-usa', city: 'Cambridge, MA', desc: 'Dünyanın en tanınan ve köklü Ivy League üniversitesi.' }
      ]
    },
    {
      slug: 'almanya',
      name: 'Almanya',
      image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=2070',
      seoTitle: 'Almanya Üniversite Eğitimi (Lisans) | Mentor Career Consulting',
      seoDesc: 'Almanya\'da ücretsiz üniversite eğitimi, Studienkolleg hazırlık yılı, TestDaF şartları ve Alman mühendislik eğitimi.',
      content: `
        <h2>Almanya'da Üniversite (Lisans) Eğitimi</h2>
        <p>Almanya, tamamen ücretsiz veya çok düşük harçlı devlet üniversiteleriyle dünyada eğitimde fırsat eşitliği sunan ender ülkelerdendir. Özellikle "Made in Germany" etiketiyle mühendislik ve teknik alanlarda tartışılmaz bir otoritedir.</p>

        <h3>Neden Almanya'da Üniversite?</h3>
        <ul>
            <li><strong>Ücretsiz Devlet Üniversiteleri:</strong> Baden-Württemberg eyaleti hariç (dönemlik 1.500 EUR), Almanya'daki devlet üniversitelerinde lisans eğitimi <strong>ücretsizdir</strong>. Sadece dönemlik 150-350 Euro idari katkı payı ödenir.</li>
            <li><strong>Mühendislik ve Teknik Üstünlük:</strong> TU9 (Almanya'nın en iyi 9 teknik üniversitesi) gibi kurumlar, dünya sanayisine ve teknolojisine yön vermektedir.</li>
            <li><strong>Mezuniyet Sonrası Mavi Kart:</strong> Mezun olduktan sonra 18 aylık iş arama vizeniz olur. İş bulduğunuzda kolaylıkla AB Mavi Kart (EU Blue Card) sahibi olabilirsiniz.</li>
        </ul>

        <h3>Kabul Şartları ve Studienkolleg</h3>
        <p>Almanya'nın kabul sistemi Türkiye'deki üniversite sınavına (YKS) doğrudan bağlıdır.</p>
        <ul>
            <li><strong>YKS Şartı:</strong> Almanya'da okuyabilmek için, Türkiye'de yapılan YKS (TYT+AYT) sınavında <strong>4 yıllık bir lisans programını kazanmış</strong> olmanız (tercih edip yerleşmeniz) şarttır. Sadece kazandığınız veya ona çok yakın eşdeğer bir bölümü Almanya'da okuyabilirsiniz.</li>
            <li><strong>Studienkolleg (Hazırlık):</strong> Türk lise diploması 12 yıllık olsa da Alman Abitur'una (13 yıl) eşdeğer sayılmaz. Bu nedenle üniversiteye başlamadan önce 1 yıllık <strong>Studienkolleg</strong> (Üniversite Hazırlık Sınıfı) okumanız gerekir. Feststellungsprüfung (FSP) sınavını geçtikten sonra lisans 1. sınıfa başlarsınız.</li>
            <li><strong>Dil:</strong> Lisans eğitimleri ağırlıklı olarak <strong>Almanca</strong>'dır. Bu nedenle TestDaF, DSH veya Goethe C1 gibi sertifikalarla ileri düzeyde (C1) Almanca kanıtlanmalıdır. (Bazı İngilizce lisans bölümleri de vardır ancak oldukça sınırlıdır).</li>
        </ul>

        <h3>Yaşam Maliyeti</h3>
        <p>Eğitim ücretsiz olsa da aylık barınma ve yaşam için ortalama 934 Euro'luk bir <strong>Bloke Hesap (Sperrkonto)</strong> gösterilmesi vize için zorunludur (Yıllık 11,208 EUR).</p>
      `,
      institutions: [
        { name: 'Technical University of Munich (TUM)', slug: 'tum-germany', city: 'Münih', desc: 'Almanya\'nın teknoloji ve inovasyon alanındaki en iyi teknik üniversitesi.' },
        { name: 'RWTH Aachen University', slug: 'rwth-aachen-germany', city: 'Aachen', desc: 'Avrupa\'nın en büyük ve saygın mühendislik fakültelerinden birine sahip.' },
        { name: 'Ludwig Maximilian University of Munich (LMU)', slug: 'lmu-munich-germany', city: 'Münih', desc: 'Sözel, sosyal bilimler ve fen bilimlerinde Almanya\'nın zirvesinde.' }
      ]
    },
    {
      slug: 'kanada',
      name: 'Kanada',
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2011',
      seoTitle: 'Kanada Üniversite Eğitimi (Lisans) | Mentor Career Consulting',
      seoDesc: 'Kanada\'da lisans eğitimi, yüksek yaşam kalitesi, PGWP ile mezuniyet sonrası göçmenlik ve Kanada üniversiteleri.',
      content: `
        <h2>Kanada'da Üniversite (Lisans) Eğitimi</h2>
        <p>Kuzey Amerika standartlarında eğitim kalitesini, güvenli şehirler, muazzam bir doğa ve dünyanın en kapsayıcı göçmen politikalarıyla birleştiren Kanada, lisans eğitimi için mükemmel bir alternatiftir.</p>

        <h3>Neden Kanada'da Üniversite?</h3>
        <ul>
            <li><strong>Göçmenlik (PR) Fırsatı:</strong> Kanada'da 4 yıllık bir lisans programını tamamladığınızda <strong>3 yıllık PGWP (Post-Graduation Work Permit)</strong> alırsınız. Bu süre zarfında edindiğiniz Kanada iş tecrübesi, size <strong>Kalıcı Oturum (Permanent Residency)</strong> hakkı elde etmenin kapılarını sonuna kadar açar.</li>
            <li><strong>Eğitim Standartları:</strong> University of Toronto, UBC, McGill gibi dünya devleri Kanada'da yer almaktadır ve diplomaları ABD diplomalarıyla aynı saygınlıktadır.</li>
            <li><strong>Co-op Programları:</strong> Kanada'daki birçok üniversite "Co-operative education" (Co-op) sunar. Bu, eğitiminizin bir veya birkaç döneminde maaşlı profesyonel tam zamanlı staj yapmanızı sağlar. Mezun olmadan önce harika bir CV'ye sahip olursunuz.</li>
        </ul>

        <h3>Kabul Şartları</h3>
        <ul>
            <li><strong>Lise Diploması:</strong> İyi bir lise not ortalaması (genelde 80/100 ve üzeri) şarttır. Matematik, Fizik gibi derslerin notları (özellikle mühendislik okuyacaksanız) yakından incelenir.</li>
            <li><strong>İngilizce veya Fransızca:</strong> IELTS'ten 6.5 (her banttan en az 6.0) veya eşdeğeri TOEFL iBT skoru istenir. Quebec eyaletindeki okullar (örn. Montreal Üniversitesi) Fransızca yeterlilik isteyebilir.</li>
            <li><strong>Üniversite Sınavı Gerekmez:</strong> Kanada üniversiteleri Türkiye'deki YKS sonucunuza veya yerleşme belgenize bakmazlar. Tamamen lise başarılarınız üzerinden değerlendirilirsiniz.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Eğitim <strong>4 yıl</strong> (bazı Co-op programlarında 5 yıl) sürmektedir. Yıllık okul harçları ortalama <strong>25,000 CAD ile 50,000 CAD</strong> arasında değişir. Yaşam maliyetleri için yıllık 15,000 - 20,000 CAD bütçe ayrılmalıdır.</p>
      `,
      institutions: [
        { name: 'University of Toronto', slug: 'university-of-toronto-canada', city: 'Toronto', desc: 'Kanada\'nın en yüksek sıralamalı ve en çok tercih edilen üniversitesi.' },
        { name: 'University of British Columbia (UBC)', slug: 'ubc-canada', city: 'Vancouver', desc: 'Doğal güzelliklerle çevrili, küresel araştırma ve inovasyon merkezi.' },
        { name: 'McGill University', slug: 'mcgill-university-canada', city: 'Montreal', desc: 'Kuzey Amerika\'nın en prestijli eğitim kurumlarından.' }
      ]
    },
    {
      slug: 'isvicre',
      name: 'İsviçre',
      image: 'https://images.unsplash.com/photo-1527668752968-14ce50523471?q=80&w=2070',
      seoTitle: 'İsviçre Üniversite Eğitimi (Lisans) | Mentor Career Consulting',
      seoDesc: 'İsviçre\'de lisans eğitimi, ETH Zürih kabul şartları, düşük harçlı İsviçre üniversiteleri ve yaşam şartları.',
      content: `
        <h2>İsviçre'de Üniversite (Lisans) Eğitimi</h2>
        <p>İsviçre; refah seviyesi, muhteşem Alp doğası ve Albert Einstein gibi bilim insanlarını yetiştirmiş dünyaca ünlü okullarıyla öne çıkar.</p>

        <h3>Neden İsviçre'de Üniversite?</h3>
        <ul>
            <li><strong>Küresel İtibar:</strong> ETH Zürih ve EPFL gibi üniversiteler mühendislik alanında dünya sıralamasında sürekli ilk 15'te yer almaktadır.</li>
            <li><strong>Düşük Eğitim Ücretleri:</strong> Şaşırtıcı bir şekilde, bu kadar prestijli bir eğitim uluslararası öğrencilere sadece <strong>dönemlik 750 - 1500 CHF</strong> gibi son derece komik rakamlara sunulmaktadır (Devlet okulları).</li>
            <li><strong>Güvenlik ve Kalite:</strong> Dünyanın en güvenli ve yaşam standardı en yüksek ülkelerinden biridir.</li>
        </ul>

        <h3>Kabul Şartları</h3>
        <p>İsviçre'de devlet üniversitelerine lisans başvurusu oldukça zordur.</p>
        <ul>
            <li><strong>YKS Şartı:</strong> Türkiye'de 4 yıllık denk bir üniversite bölümünü kazanmış (yerleşmiş) olmanız gereklidir.</li>
            <li><strong>Lise Diploması:</strong> İsviçre, standart MEB lise diplomasını doğrudan kabul etmez. Genellikle İsviçre'nin zorlu giriş sınavını (ECUS) geçmeniz veya IB, AP gibi uluslararası diplomalarla yüksek skorlar (örn. IB'den 38+ puan) almanız şarttır.</li>
            <li><strong>Dil:</strong> Lisans programlarının büyük çoğunluğu bulunduğu kantonun dilindedir (Almanca, Fransızca veya İtalyanca). C1 seviyesinde dil belgesi zorunludur. (İngilizce lisans programları genellikle özel işletme/otelcilik okullarında bulunur ve ücretleri oldukça yüksektir).</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Eğitim genellikle <strong>3 yıl</strong> sürer. Okul ücreti yıllık yaklaşık 1.500 - 3.000 CHF olsa da, İsviçre dünyanın en pahalı ülkesidir. Aylık yaşam maliyeti <strong>1.600 - 2.500 CHF</strong> (Yıllık ortalama 25.000 CHF) civarındadır.</p>
      `,
      institutions: [
        { name: 'ETH Zurich', slug: 'eth-zurich-switzerland', city: 'Zürih', desc: 'Einstein\'ın okulu. Dünyanın en iyi mühendislik üniversitelerinden.' },
        { name: 'EPFL', slug: 'epfl-switzerland', city: 'Lozan', desc: 'Frankofon bölgesinin lider teknoloji ve bilim enstitüsü.' },
        { name: 'University of Zurich', slug: 'university-of-zurich-switzerland', city: 'Zürih', desc: 'İsviçre\'nin en büyük ve çok yönlü araştırma üniversitesi.' }
      ]
    },
    {
      slug: 'avustralya',
      name: 'Avustralya',
      image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2065',
      seoTitle: 'Avustralya Üniversite Eğitimi (Lisans) | Mentor Career Consulting',
      seoDesc: 'Avustralya\'da lisans eğitimi, Go8 üniversiteleri, öğrenciyken çalışma izni ve yüksek yaşam standartları.',
      content: `
        <h2>Avustralya'da Üniversite (Lisans) Eğitimi</h2>
        <p>Avustralya, muhteşem iklimi, rahat yaşam tarzı ve "Group of Eight" (Go8) adlı seçkin üniversiteler grubuyla hem kaliteli bir eğitim hem de eşsiz bir yaşam deneyimi sunar.</p>

        <h3>Neden Avustralya'da Üniversite?</h3>
        <ul>
            <li><strong>Eğitim Sistemi:</strong> Pratige ve araştırmaya dayalı, öğrenci dostu modern bir eğitim sistemi vardır. Melbourne ve Sidney gibi şehirler defalarca 'Öğrenci Dostu Şehirler' listesinde zirveye oynamıştır.</li>
            <li><strong>Öğrenciyken Çalışma:</strong> Öğrenciler eğitim süresince 15 günde 48 saat, tatillerde ise tam zamanlı çalışma hakkına sahiptir. Avustralya asgari ücreti dünya ortalamasının çok üzerindedir.</li>
            <li><strong>Mezuniyet Sonrası Vize (PSW):</strong> Lisans mezunlarına genellikle <strong>2 yıl</strong> süreyle Avustralya'da kalarak çalışma ve yaşama izni verilir. Gerekli şartları sağlayanlar kalıcı oturuma (PR) başvurabilir.</li>
        </ul>

        <h3>Kabul Şartları</h3>
        <ul>
            <li><strong>Lise Diploması & Foundation:</strong> Eğer IB veya A-Level gibi uluslararası bir diplomanız yoksa, standart lise diplomasıyla doğrudan üniversite 1. sınıfa başlama şansınız düşüktür. Genellikle 1 yıllık "Foundation" (Akademik Hazırlık) yılı veya "Diploma" (Üniversite 1. sınıfa denk) programı okunur.</li>
            <li><strong>Dil:</strong> Doğrudan giriş için IELTS 6.5, Foundation için IELTS 5.5 - 6.0 yeterlidir.</li>
            <li><strong>Üniversite Sınavı (YKS):</strong> İstenmez. Akademik başarılarınız lise notlarınız (veya IB/A-Level) üzerinden değerlendirilir.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Lisans eğitimi genelde <strong>3 yıl</strong> (mühendislik gibi bazı alanlarda 4 yıl) sürer. Okul ücretleri yıllık <strong>30,000 AUD ile 50,000 AUD</strong> arasındadır. Yıllık yaşam maliyetleri için Avustralya Devleti ortalama 24,505 AUD göstermenizi bekler.</p>
      `,
      institutions: [
        { name: 'University of Melbourne', slug: 'university-of-melbourne-australia', city: 'Melbourne', desc: 'Avustralya\'nın kültürel başkentinde yer alan köklü eğitim kurumu.' },
        { name: 'University of Sydney', slug: 'university-of-sydney-australia', city: 'Sidney', desc: 'Avustralya\'nın ilk üniversitesi ve küresel araştırma lideri.' },
        { name: 'UNSW Sydney', slug: 'unsw-sydney-australia', city: 'Sidney', desc: 'Mühendislik, teknoloji ve işletme alanında bölgenin en güçlü okullarından.' }
      ]
    },
    {
      slug: 'belcika',
      name: 'Belçika',
      image: 'https://images.unsplash.com/photo-1566804825838-89240407fcf8?q=80&w=1974',
      seoTitle: 'Belçika Üniversite Eğitimi (Lisans) | Mentor Career Consulting',
      seoDesc: 'Belçika\'da üniversite eğitimi, Avrupa Birliği merkezinde İngilizce lisans okuma fırsatları, uygun eğitim ücretleri.',
      content: `
        <h2>Belçika'da Üniversite (Lisans) Eğitimi</h2>
        <p>Avrupa'nın kalbinde, AB'nin ve sayısız uluslararası organizasyonun merkezinde yer alan Belçika, yüksek kaliteli eğitimi uygun fiyatlara sunan gizli bir hazinedir.</p>

        <h3>Neden Belçika'da Üniversite?</h3>
        <ul>
            <li><strong>Stratejik Konum:</strong> Brüksel, Antwerp ve Gent gibi şehirlerdeki çok kültürlü yapı, dil pratikleri ve dev kurumlarda staj imkanları sunar.</li>
            <li><strong>Uygun Fiyatlı Eğitim:</strong> Eğitim standartları İngiltere düzeyinde olmasına rağmen, yıllık eğitim harçları son derece caziptir.</li>
            <li><strong>İngilizce Lisans Programları:</strong> Özellikle son yıllarda İşletme, Ekonomi, Mühendislik Teknolojileri, İletişim gibi alanlarda %100 İngilizce açılan lisans programları hızla artmıştır.</li>
            <li><strong>Mezuniyet Sonrası (Orientation Year):</strong> Mezun olduktan sonra Belçika'da kalıp iş aramak için 1 yıllık "Search Year" vizesi alma hakkı getirilmiştir.</li>
        </ul>

        <h3>Kabul Şartları</h3>
        <ul>
            <li><strong>Lise Diploması:</strong> Türkiye lise diplomaları kabul edilmektedir. İyi bir not ortalaması ve özellikle bölüme yönelik derslerden (Örn: Matematik) yüksek notlar alınmış olması önemlidir.</li>
            <li><strong>YKS veya Ek Sınavlar:</strong> Belçika'da bazı prestijli üniversiteler (örneğin KU Leuven) Türk lise diplomasının yanında Türkiye'deki <strong>YKS sonucunda o bölümü veya benzerini kazanmış olma</strong> şartı veya kendi iç sınavlarına girme şartı arayabilmektedir.</li>
            <li><strong>Dil:</strong> İngilizce programlar için IELTS 6.5 veya TOEFL iBT 80-90 arası bir skor beklenir.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Avrupa (Bologna) standartlarına uygun olarak eğitim <strong>3 yıl</strong> sürmektedir. AB dışından gelen (Türk) öğrenciler için yıllık eğitim harçları ortalama <strong>1.500 EUR ile 7.000 EUR</strong> arasındadır. Yaşam maliyetleri (konaklama dahil) aylık 900 - 1.200 Euro arasıdır.</p>
      `,
      institutions: [
        { name: 'KU Leuven', slug: 'ku-leuven-belgium', city: 'Leuven', desc: 'Avrupa\'nın en yenilikçi ve en saygın araştırma üniversitelerinden biri.' },
        { name: 'Ghent University', slug: 'ghent-university-belgium', city: 'Gent', desc: 'Tarihi bir öğrenci şehrinde kaliteli İngilizce lisans programları sunar.' },
        { name: 'Vrije Universiteit Brussel (VUB)', slug: 'vub-belgium', city: 'Brüksel', desc: 'Avrupa\'nın başkentinde uluslararası ve açık fikirli bir kurum.' }
      ]
    },
    {
      slug: 'hollanda',
      name: 'Hollanda',
      image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2070',
      seoTitle: 'Hollanda Üniversite Eğitimi (Lisans) | Mentor Career Consulting',
      seoDesc: 'Hollanda\'da lisans eğitimi, Applied Sciences vs Research Universities ayrımı, İngilizce programlar ve Search Year vizesi.',
      content: `
        <h2>Hollanda'da Üniversite (Lisans) Eğitimi</h2>
        <p>Hollanda, İngilizce konuşulan ülkeler dışında en fazla ve en kaliteli İngilizce lisans programını sunan ülkedir. İnteraktif eğitim modeli ve yüksek mezun istihdam oranıyla öne çıkar.</p>

        <h3>Neden Hollanda'da Üniversite?</h3>
        <ul>
            <li><strong>%100 İngilizce Programlar:</strong> Neredeyse her bölümde İngilizce eğitim alabilirsiniz ve sokaktaki halkın %95'i akıcı İngilizce konuşur.</li>
            <li><strong>İki Farklı Üniversite Türü:</strong> 
                <br/>1- <strong>Araştırma Üniversiteleri (Research Universities):</strong> Teorik akademik araştırma odaklıdır (Örn: UvA, Erasmus, TU Delft).
                <br/>2- <strong>Uygulamalı Bilimler Üniversiteleri (Applied Sciences - HBO):</strong> Sektörel hazırlık, meslek ve staj odaklıdır.
            </li>
            <li><strong>Search Year Vizesi:</strong> Mezun olduktan sonra iş aramak ve Hollanda'da kariyerinize başlamak için 1 yıllık vize (Orientation Year) verilir.</li>
        </ul>

        <h3>Kabul Şartları</h3>
        <p>İstenen belgeler okumak istediğiniz okul türüne göre değişir:</p>
        <ul>
            <li><strong>Research Universities (Araştırma):</strong> Standart MEB lise diplomasını doğrudan kabul <strong>etmezler</strong>. Girebilmek için IB, AP (en az 3 veya 4 AP dersi) gibi uluslararası diplomalar gerekir ya da Türkiye'de üniversite sınavını kazanıp 1 yıl Türkiye'de üniversite okuduktan sonra Hollanda 1. sınıfa yatay geçiş/başvuru yapılabilir. Veya 'Foundation' yılı okunmalıdır.</li>
            <li><strong>Applied Sciences (Uygulamalı):</strong> Standart MEB lise diplomalarını genellikle kabul ederler. Lise ortalaması önemlidir.</li>
            <li><strong>Dil:</strong> IELTS 6.0 (Applied) ile 6.5/7.0 (Research) arasında bir skor beklenir.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Araştırma üniversiteleri <strong>3 yıl</strong>, Uygulamalı bilimler üniversiteleri ise <strong>4 yıl</strong> sürer. Yıllık okul harçları uluslararası öğrenciler için ortalama <strong>10,000 EUR ile 16,000 EUR</strong> arasındadır. Hollanda'daki genel konut krizinden dolayı erken konaklama ayarlamak elzemdir, aylık yaşam maliyeti 1.000 - 1.500 Euro arasındadır.</p>
      `,
      institutions: [
        { name: 'University of Amsterdam (UvA)', slug: 'uva-netherlands', city: 'Amsterdam', desc: 'Avrupa\'nın en prestijli araştırma üniversitelerinden biri.' },
        { name: 'Delft University of Technology (TU Delft)', slug: 'tu-delft-netherlands', city: 'Delft', desc: 'Mühendislik, tasarım ve teknolojide global bir otorite.' },
        { name: 'Erasmus University Rotterdam', slug: 'erasmus-university-netherlands', city: 'Rotterdam', desc: 'İşletme ve ekonomi alanında dünyanın en iyi işletme okullarından birine (RSM) sahiptir.' }
      ]
    },
    {
      slug: 'irlanda',
      name: 'İrlanda',
      image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=2071',
      seoTitle: 'İrlanda Üniversite Eğitimi (Lisans) | Mentor Career Consulting',
      seoDesc: 'İrlanda\'da lisans eğitimi, İngilizce konuşulan ortam, teknoloji şirketlerinde çalışma fırsatları ve eğitim sistemi.',
      content: `
        <h2>İrlanda'da Üniversite (Lisans) Eğitimi</h2>
        <p>Anadili İngilizce olan, güvenli, sıcakkanlı ve Avrupa'nın Silikon Vadisi konumundaki İrlanda, lisans eğitimi için parlayan bir yıldızdır.</p>

        <h3>Neden İrlanda'da Üniversite?</h3>
        <ul>
            <li><strong>Küresel Teknoloji Üssü:</strong> Google, Facebook (Meta), Apple, Microsoft, LinkedIn, Twitter, Pfizer gibi devlerin EMEA (Avrupa) merkezleri buradadır. Öğrenciler için inanılmaz staj ve iş fırsatları sunar.</li>
            <li><strong>Mezuniyet Sonrası Çalışma İzni:</strong> Lisans (Level 8 Honours Degree) mezunlarına İrlanda'da iş aramak ve kalmak için <strong>1 yıllık çalışma izni (Third Level Graduate Scheme)</strong> verilir.</li>
            <li><strong>Eğitim Kalitesi:</strong> Üniversite sayısı az ama özdür. Trinity College Dublin, UCD gibi kurumlar dünyanın en saygın okulları listesindedir.</li>
        </ul>

        <h3>Kabul Şartları</h3>
        <ul>
            <li><strong>Lise Diploması:</strong> İrlanda, standart Türk lise diplomasını kabul edebilmektedir. Ancak prestijli okullar (TCD, UCD vb.) çok yüksek not ortalaması (genelde 85-90 ve üstü) veya İngiltere'deki gibi "Foundation" (Akademik hazırlık) yılı okumanızı isteyebilir.</li>
            <li><strong>Uluslararası Diplomalar:</strong> IB veya A-Level dereceleri doğrudan ve kolay kabul almanızı sağlar.</li>
            <li><strong>Dil:</strong> IELTS'ten 6.0 - 6.5 skoru, PTE veya Duolingo English Test (DET) puanları kabul edilir.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>İrlanda'da lisans (Honours Bachelor Degree) eğitimi genellikle <strong>3 veya 4 yıl</strong> sürer. Yıllık harçlar <strong>12,000 EUR ile 25,000 EUR</strong> arasında değişmektedir. Dublin'de kira maliyetleri yüksektir, aylık yaşam masrafları konaklama ile birlikte yaklaşık 1.200 - 1.600 Euro'yu bulmaktadır.</p>
      `,
      institutions: [
        { name: 'Trinity College Dublin (TCD)', slug: 'trinity-college-dublin-ireland', city: 'Dublin', desc: 'İrlanda\'nın en prestijli, tarihi ve yüksek sıralamalı üniversitesi.' },
        { name: 'University College Dublin (UCD)', slug: 'ucd-ireland', city: 'Dublin', desc: 'İrlanda\'nın "Global Üniversitesi", devasa kampüsü ve endüstri bağlantılarıyla ünlü.' },
        { name: 'University of Galway', slug: 'university-of-galway-ireland', city: 'Galway', desc: 'Kültürel zenginliğin ortasında modern araştırmalara yön veren okul.' }
      ]
    },
    {
      slug: 'polonya',
      name: 'Polonya',
      image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=2069',
      seoTitle: 'Polonya Üniversite Eğitimi (Lisans) | Mentor Career Consulting',
      seoDesc: 'Polonya\'da uygun maliyetli lisans eğitimi, sınavsız kabul, İngilizce tıp ve mühendislik, ve Avrupa\'da yaşam.',
      content: `
        <h2>Polonya'da Üniversite (Lisans) Eğitimi</h2>
        <p>Ekonomik fiyatlara yüksek standartlarda Avrupa eğitimi almak isteyen Türk öğrenciler için Polonya son yılların en çok tercih edilen destinasyonudur.</p>

        <h3>Neden Polonya'da Üniversite?</h3>
        <ul>
            <li><strong>Çok Düşük Maliyetler:</strong> Yıllık eğitim harçları ve yaşam maliyetleri, Türkiye'deki vakıf (özel) üniversitelerinden hatta çoğu zaman devlet üniversitelerindeki büyükşehir yaşamından daha uygun veya eşdeğerdir.</li>
            <li><strong>Sınavsız Avrupa Eğitimi:</strong> Türkiye'deki üniversite sınavına (YKS) girmeden, sadece lise diplomanız ile Avrupa Birliği'nde İngilizce üniversite okuyabilirsiniz.</li>
            <li><strong>Geniş Bölüm Seçeneği:</strong> Tıp, Diş Hekimliği, Eczacılık, Psikoloji, Mimarlık, Yazılım Mühendisliği gibi gözde bölümlerin tamamı <strong>%100 İngilizce</strong> olarak sunulur.</li>
            <li><strong>Schengen Vizesi:</strong> Eğitiminiz boyunca Schengen bölgesindeki tüm ülkelerde serbestçe seyahat edebilirsiniz. Mezuniyet sonrası tüm AB'de geçerli bir diplomanız olur.</li>
        </ul>

        <h3>Kabul Şartları</h3>
        <ul>
            <li><strong>Lise Diploması:</strong> Lise mezunu olmanız başvurunuz için yeterlidir. Türkiye'deki sınav sonucunuza bakılmaz. Ancak Tıp, Mühendislik gibi teknik alanlar için lisedeki Matematik, Biyoloji, Kimya notlarınızın yüksek olması avantajdır (Ayrıca bazı bölümler mülakat veya giriş sınavı yapabilir).</li>
            <li><strong>Dil:</strong> İngilizce seviyenizin <strong>B2</strong> olması istenir. (Genellikle IELTS 6.0 veya eşdeğeri). Eğer İngilizceniz yetersizse, üniversitelerin bünyesindeki 1 yıllık <strong>İngilizce Hazırlık (Foundation/Language Course)</strong> programlarına katılıp ardından 1. sınıfa geçebilirsiniz.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Eğitimler bölüme göre (Mühendislikler 3.5-4 yıl, İktisadi bilimler 3 yıl, Tıp 6 yıl) değişmektedir. Yıllık eğitim ücretleri <strong>2.000 EUR ile 4.500 EUR</strong> arasındadır (Tıp/Diş Hekimliği programları yıllık 11.000 - 15.000 EUR civarıdır). Polonya'da barınma (yurt vb.) ve aylık yaşam masrafları 500 - 800 Euro ile çok ekonomiktir.</p>
      `,
      institutions: [
        { name: 'University of Warsaw', slug: 'university-of-warsaw-poland', city: 'Varşova', desc: 'Polonya\'nın en büyük ve prestijli devlet üniversitesi.' },
        { name: 'Warsaw University of Technology', slug: 'warsaw-university-of-technology-poland', city: 'Varşova', desc: 'Mühendislik ve teknoloji eğitiminde Orta Avrupa\'nın lideri.' },
        { name: 'Jagiellonian University', slug: 'jagiellonian-university-poland', city: 'Krakow', desc: 'Kopernik\'in de okuduğu, Avrupa\'nın en eski üniversitelerinden biri.' }
      ]
    }
  ];

  for (const countryData of countriesData) {
    // 1. Check if Country exists
    let country = await prisma.country.findUnique({
      where: { slug: countryData.slug }
    });

    if (!country) {
      console.log(`⚠️ Ülke bulunamadı: ${countryData.name}, yeni oluşturuluyor...`);
      country = await prisma.country.create({
        data: {
          name: countryData.name,
          name_en: countryData.name,
          name_de: countryData.name,
          slug: countryData.slug,
          active: true,
          image: countryData.image,
        }
      });
    }

    // 2. Create or Update CountryServiceContent
    const existingContent = await prisma.countryServiceContent.findFirst({
      where: {
        countryId: country.id,
        serviceId: service.id
      }
    });

    if (existingContent) {
      await prisma.countryServiceContent.update({
        where: { id: existingContent.id },
        data: {
          content: countryData.content,
          seoTitle: countryData.seoTitle,
          seoDesc: countryData.seoDesc,
          image: countryData.image,
        }
      });
      console.log(`✅ ${countryData.name} lisans (üniversite) içerikleri güncellendi.`);
    } else {
      await prisma.countryServiceContent.create({
        data: {
          countryId: country.id,
          serviceId: service.id,
          content: countryData.content,
          seoTitle: countryData.seoTitle,
          seoDesc: countryData.seoDesc,
          image: countryData.image,
        }
      });
      console.log(`✅ ${countryData.name} lisans (üniversite) içerikleri oluşturuldu.`);
    }

    // 3. Create Institutions for this country
    if (countryData.institutions && countryData.institutions.length > 0) {
      for (const instData of countryData.institutions) {
        let existingInst = await prisma.institution.findUnique({
          where: { slug: instData.slug }
        });

        if (!existingInst) {
          await prisma.institution.create({
            data: {
              name: instData.name,
              slug: instData.slug,
              city: instData.city,
              description: instData.desc,
              countryId: country.id,
              serviceId: service.id,
              active: true,
              isFeatured: true
            }
          });
          console.log(`   🎓 Kurum Eklendi: ${instData.name} (${countryData.name})`);
        } else {
          // just update relationships if needed
          await prisma.institution.update({
            where: { id: existingInst.id },
            data: {
              countryId: country.id,
              serviceId: service.id,
              description: instData.desc
            }
          });
          console.log(`   🔄 Kurum Güncellendi: ${instData.name} (${countryData.name})`);
        }
      }
    }
  }

  console.log('🎉 Yurtdışı Üniversite (Lisans) ve Kurumlar Seed işlemi başarıyla tamamlandı!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
