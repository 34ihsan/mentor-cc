const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Başlıyor: Yurtdışı Yüksek Lisans İçerikleri Seeding...');

  // 1. Service: Yurtdışı Yüksek Lisans (General Info)
  const serviceSlug = 'yurtdisi-yuksek-lisans';
  
  let service = await prisma.service.findUnique({
    where: { slug: serviceSlug }
  });

  const generalContent = `
    <h2>Neden Yurtdışında Yüksek Lisans?</h2>
    <p>Küreselleşen dünyada, yurtdışında yüksek lisans (Master) yapmak sadece akademik bir başarı değil, aynı zamanda kariyerinizi uluslararası bir seviyeye taşımanın en etkili yollarından biridir. Farklı kültürleri tanımak, yabancı dil becerilerinizi anadil seviyesine çıkarmak ve global bir network (ağ) oluşturmak, uluslararası vizyonunuzu genişletecektir.</p>
    
    <h3>Yurtdışında Yüksek Lisansın Avantajları</h3>
    <ul>
      <li><strong>Global Kariyer Fırsatları:</strong> Dünyaca tanınan prestijli üniversitelerden alınan diplomalar, çok uluslu şirketlerde iş bulma şansınızı büyük ölçüde artırır.</li>
      <li><strong>Eğitim Süresi:</strong> Türkiye'de yüksek lisans genellikle 2 yıl sürerken, İngiltere gibi ülkelerde 1 yılda tamamlanabilir, bu da size zaman kazandırır.</li>
      <li><strong>Yabancı Dil:</strong> Eğitim dili genellikle İngilizce olduğundan, mesleki yabancı dilinizi mükemmelleştirirsiniz. Ayrıca Almanya, İtalya veya Fransa gibi ülkelerde eğitim alarak ikinci bir yabancı dil öğrenebilirsiniz.</li>
      <li><strong>Çalışma İzni (Post-Study Work Visa):</strong> Birçok ülke (İngiltere, Amerika, Kanada, Almanya, Avustralya) mezuniyet sonrası uluslararası öğrencilere 1 ile 3 yıl arasında değişen sürelerde çalışma ve oturum izni hakkı sunmaktadır.</li>
      <li><strong>Uluslararası Network:</strong> Dünyanın dört bir yanından gelen öğrencilerle birlikte eğitim alarak, gelecekteki kariyeriniz için çok değerli bir profesyonel ağ kurarsınız.</li>
    </ul>

    <h3>Genel Başvuru Şartları</h3>
    <p>Üniversitelere ve ülkelere göre değişiklik göstermekle birlikte, yurtdışı yüksek lisans başvurularında genellikle istenen temel belgeler şunlardır:</p>
    <ul>
      <li><strong>Lisans Diploması ve Transkript:</strong> Not ortalamanız (GPA) genellikle başvuru sürecinde en belirleyici faktörlerden biridir. İyi bir ortalama, kabul alma şansınızı artırır.</li>
      <li><strong>Dil Yeterlilik Belgesi:</strong> IELTS, TOEFL veya PTE gibi uluslararası geçerliliği olan İngilizce dil sınavlarından alınan skorlar.</li>
      <li><strong>Niyet Mektubu (Statement of Purpose):</strong> Neden o üniversiteyi ve bölümü seçtiğinizi, akademik ve profesyonel hedeflerinizi anlatan etkili bir mektup.</li>
      <li><strong>Referans Mektupları (Letters of Recommendation):</strong> Genellikle akademisyenlerinizden veya profesyonel yöneticilerinizden alınan 2 adet referans mektubu.</li>
      <li><strong>CV (Özgeçmiş):</strong> Eğitim geçmişiniz, iş/staj deneyimleriniz, projeleriniz ve başarılarınızı içeren detaylı bir özgeçmiş.</li>
      <li><strong>Sınav Skorları (Gerekiyorsa):</strong> Özellikle ABD ve Kanada'da bazı programlar (Mühendislik, İşletme) için GRE veya GMAT sınav sonuçları istenebilir.</li>
      <li><strong>Portfolyo:</strong> Mimarlık, sanat, tasarım gibi bölümler için geçmiş çalışmalarınızı içeren bir dosya.</li>
    </ul>

    <h3>Başvuru Süreci Ne Zaman Başlar?</h3>
    <p>Yurtdışı üniversite başvuruları genellikle akademik dönemin başlamasından 9-12 ay önce açılır. Örneğin, Eylül ayında başlayacak bir yüksek lisans programı için başvurular bir önceki yılın Ekim/Kasım aylarında başlar. Erken başvuru yapmak, hem kabul şansınızı hem de burs/konaklama bulma ihtimalinizi artırır.</p>

    <h3>Neden Mentor Career Consulting?</h3>
    <p>Mentor Career Consulting olarak, uzman danışman kadromuzla hedeflerinize ve bütçenize en uygun ülke, üniversite ve bölüm seçiminden; niyet mektubunuzun profesyonelce hazırlanmasına, vize sürecinden konaklama ayarlanmasına kadar A'dan Z'ye tüm süreçte yanınızdayız.</p>
  `;

  if (service) {
    await prisma.service.update({
      where: { id: service.id },
      data: {
        content: generalContent,
        seoDescription: 'Yurtdışında yüksek lisans (Master) eğitiminin avantajları, başvuru şartları, ülkeler ve eğitim maliyetleri hakkında en kapsamlı rehber.',
      }
    });
    console.log('✅ Service "yurtdisi-yuksek-lisans" güncellendi.');
  } else {
    service = await prisma.service.create({
      data: {
        title: 'Yurtdışı Yüksek Lisans',
        title_en: 'Master\'s Degree Abroad',
        title_de: 'Masterstudium im Ausland',
        slug: serviceSlug,
        active: true,
        content: generalContent,
        seoDescription: 'Yurtdışında yüksek lisans (Master) eğitiminin avantajları, başvuru şartları, ülkeler ve eğitim maliyetleri hakkında en kapsamlı rehber.',
      }
    });
    console.log('✅ Service "yurtdisi-yuksek-lisans" oluşturuldu.');
  }

  // 2. Countries and Contents
  const countriesData = [
    {
      slug: 'ingiltere',
      name: 'İngiltere',
      image: 'https://images.unsplash.com/photo-1513635269975-5969336ac1cb?q=80&w=2070',
      seoTitle: 'İngiltere Yurtdışı Yüksek Lisans | Mentor Career Consulting',
      seoDesc: 'İngiltere\'de yüksek lisans eğitimi, avantajları, başvuru şartları, üniversiteler, fiyatlar ve Post-Study Work vizesi hakkında her şey.',
      content: `
        <h2>İngiltere'de Yüksek Lisans (Master) Eğitimi</h2>
        <p>İngiltere (Birleşik Krallık), köklü eğitim geleneği, dünya sıralamasında üst sıralarda yer alan prestijli üniversiteleri ve öğrencilere sunduğu benzersiz fırsatlarla yurtdışı yüksek lisans eğitiminde dünyanın en popüler destinasyonlarından biridir.</p>
        
        <h3>Neden İngiltere'de Yüksek Lisans?</h3>
        <ul>
            <li><strong>1 Yılda Mezuniyet:</strong> Birçok ülkede yüksek lisans eğitimi 2 yıl sürerken, İngiltere'de (Tezli) yüksek lisans programları genellikle <strong>1 yıl (12 ay)</strong> sürmektedir. Bu durum hem zaman tasarrufu sağlar hem de yaşam maliyetlerini yarı yarıya düşürür.</li>
            <li><strong>Mezuniyet Sonrası Çalışma İzni (Graduate Route Visa):</strong> İngiltere'de yüksek lisansını başarıyla tamamlayan uluslararası öğrenciler, mezuniyetten sonra İngiltere'de kalıp tam zamanlı çalışabilmeleri için <strong>2 yıllık çalışma izni (Post-Study Work Visa)</strong> hakkı elde ederler.</li>
            <li><strong>Prestijli Diplomalar:</strong> Oxford, Cambridge, Imperial College, UCL, LSE gibi dünyanın en iyi üniversitelerine ev sahipliği yapan İngiltere, özgeçmişinizde ömür boyu değer taşıyacak uluslararası geçerliliği olan bir diploma sunar.</li>
            <li><strong>Çeşitlilik ve Kültür:</strong> Londra başta olmak üzere İngiltere şehirleri, dünyanın dört bir yanından gelen çok kültürlü bir öğrenci popülasyonuna sahiptir.</li>
        </ul>

        <h3>Kabul ve Başvuru Şartları</h3>
        <p>İngiltere üniversitelerine başvuru süreci oldukça rekabetçidir. Temel gereksinimler şunlardır:</p>
        <ul>
            <li><strong>Not Ortalaması (GPA):</strong> Genellikle 4.00 üzerinden en az 2.50 ve üzeri bir lisans ortalaması beklenir. Russell Group üniversiteleri için bu oran 3.00 ve üzeri olabilir.</li>
            <li><strong>İngilizce Yeterliliği:</strong> IELTS sınavından genellikle genel skor olarak 6.5 (her alt bölümden en az 6.0) istenmektedir. PTE Akademik veya TOEFL da kabul gören sınavlardandır. (Yeterli dil skoru olmayanlar için 'Pre-Sessional English' kursları sunulmaktadır).</li>
            <li><strong>Niyet ve Referans Mektupları:</strong> Kendinizi ve akademik hedeflerinizi doğru ifade ettiğiniz güçlü bir Personal Statement (Niyet Mektubu) kabul sürecinde kritik bir rol oynar. Ayrıca en az 2 adet akademik referans mektubu gereklidir.</li>
        </ul>

        <h3>Eğitim ve Yaşam Maliyetleri</h3>
        <p>Yüksek lisans eğitim ücretleri seçilen üniversite, bölüm ve şehre göre değişiklik gösterir. Ortalama eğitim ücretleri yıllık <strong>£15,000 ile £30,000</strong> arasındadır. Yaşam maliyetleri (konaklama, yeme-içme, ulaşım) Londra'da yıllık ortalama £14,000 - £16,000, Londra dışındaki şehirlerde ise £10,000 - £12,000 civarındadır.</p>

        <h3>Popüler Bölümler</h3>
        <p>İşletme (MBA), Finans, Veri Bilimi (Data Science), Yapay Zeka, Pazarlama, Hukuk (LLM), Mühendislik Yönetimi, Mimarlık ve Psikoloji uluslararası öğrencilerin en çok tercih ettiği bölümler arasındadır.</p>
      `
    },
    {
      slug: 'amerika',
      name: 'Amerika Birleşik Devletleri',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070',
      seoTitle: 'Amerika (ABD) Yurtdışı Yüksek Lisans | Mentor Career Consulting',
      seoDesc: 'ABD\'de yüksek lisans (Master) eğitimi, başvuru şartları, GRE/GMAT, OPT çalışma izni ve Amerika üniversiteleri hakkında detaylı rehber.',
      content: `
        <h2>Amerika'da (ABD) Yüksek Lisans (Master) Eğitimi</h2>
        <p>Dünyanın en yenilikçi teknoloji devlerine, Wall Street gibi finans merkezlerine ve Ivy League olarak bilinen dünyanın en saygın üniversitelerine ev sahipliği yapan Amerika Birleşik Devletleri, yüksek lisans eğitimi için eşsiz bir akademik deneyim sunar.</p>

        <h3>Neden Amerika'da Yüksek Lisans?</h3>
        <ul>
            <li><strong>Akademik Mükemmellik:</strong> Dünya sıralamasında (QS, THE, ARWU) ilk 100'de en çok üniversitesi bulunan ülkedir. AR-GE'ye ve inovasyona ayrılan bütçeler olağanüstü seviyededir.</li>
            <li><strong>OPT Çalışma İzni (Optional Practical Training):</strong> Eğitiminiz bitiminde size kendi alanınızda Amerika'da çalışma hakkı veren OPT imkanı vardır. Normal programlar için 1 yıl olan bu süre, <strong>STEM (Bilim, Teknoloji, Mühendislik, Matematik)</strong> onaylı programlardan mezun olanlar için <strong>3 yıla (36 ay)</strong> kadar uzatılmaktadır. Bu da H1-B çalışma vizesine geçiş için mükemmel bir basamaktır.</li>
            <li><strong>Esnek Eğitim Sistemi:</strong> Disiplinlerarası geçişlerin daha kolay olduğu, seçmeli ders havuzunun çok geniş olduğu pragmatik bir eğitim sistemi vardır.</li>
            <li><strong>Asistanlık ve Burs Olanakları:</strong> Özellikle araştırma üniversitelerinde Teaching Assistantship (TA) veya Research Assistantship (RA) gibi pozisyonlarla hem okul ücretinizi karşılayabilir hem de maaş alabilirsiniz.</li>
        </ul>

        <h3>Kabul ve Başvuru Şartları</h3>
        <ul>
            <li><strong>Lisans Ortalaması (GPA):</strong> Genellikle minimum 2.75 veya 3.00 ve üzeri GPA talep edilir.</li>
            <li><strong>Dil Skoru:</strong> TOEFL iBT'den 80+, IELTS'ten 6.5+ skor beklenir.</li>
            <li><strong>Sınavlar (GRE/GMAT):</strong> Mühendislik ve fen bilimleri için <strong>GRE</strong>, işletme/finans (MBA vb.) için <strong>GMAT</strong> sınav sonuçları sıkça istenir. (Pandemi sonrası bazı üniversiteler bu şartı esnetmiştir).</li>
            <li><strong>Evraklar:</strong> Özgeçmiş (Resume), Niyet Mektubu (Statement of Purpose) ve 3 adet Referans Mektubu (Letters of Recommendation).</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Amerika'da yüksek lisans eğitimleri genellikle <strong>1.5 ila 2 yıl</strong> sürmektedir. Yıllık eğitim ücretleri devlet üniversitelerinde $15,000 - $35,000 arasında değişirken, özel üniversitelerde $40,000 ile $80,000+ seviyelerine çıkabilmektedir. Yaşam maliyetleri de şehirden şehre (örneğin New York vs Teksas) büyük farklılık gösterir, yıllık $15,000 - $25,000 arasında bütçe planlanmalıdır.</p>
      `
    },
    {
      slug: 'almanya',
      name: 'Almanya',
      image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=2070',
      seoTitle: 'Almanya Yurtdışı Yüksek Lisans | Mentor Career Consulting',
      seoDesc: 'Almanya\'da ücretsiz/düşük ücretli yüksek lisans, İngilizce master programları, kabul şartları ve 18 aylık mezuniyet sonrası çalışma izni rehberi.',
      content: `
        <h2>Almanya'da Yüksek Lisans (Master) Eğitimi</h2>
        <p>Almanya, ücretsiz veya çok düşük harçlı devlet üniversiteleri, dünya çapında bilinen güçlü mühendislik/teknoloji ekosistemi ve Avrupa'nın en büyük ekonomisi olması sebebiyle uluslararası öğrenciler için Avrupa'daki en cazip ülkelerden biridir.</p>

        <h3>Neden Almanya'da Yüksek Lisans?</h3>
        <ul>
            <li><strong>Eğitim Ücretleri:</strong> Almanya'daki devlet üniversitelerinin büyük çoğunluğunda eğitim <strong>ücretsizdir</strong> (Sadece dönemlik 150-350 Euro arasında idari bir katkı payı ödenir). Baden-Württemberg eyaletindeki devlet üniversitelerinde ise uluslararası öğrenciler için dönemlik harç ücreti 1.500 Euro'dur.</li>
            <li><strong>İngilizce Eğitim Seçeneği:</strong> Sadece Almanca değil, Almanya'da 1000'den fazla program <strong>tamamen İngilizce</strong> olarak sunulmaktadır. (Özellikle mühendislik, bilgisayar bilimleri ve işletme alanlarında).</li>
            <li><strong>Çalışma İzni (Post-Study Work):</strong> Mezun olduktan sonra uluslararası öğrencilere, iş bulmaları ve çalışmaları için <strong>18 aylık çalışma ve oturum izni</strong> hakkı verilir. Bu süreçte kendi alanınızda iş bularak EU Blue Card'a (Mavi Kart) geçiş yapabilirsiniz.</li>
            <li><strong>Avrupa'nın Kalbi:</strong> Almanya'da okurken Schengen vizesi avantajıyla tüm Avrupa'yı kolayca gezebilir, global otomotiv, yazılım ve endüstri devlerinde (Siemens, BMW, SAP vb.) staj yapma fırsatı bulabilirsiniz.</li>
        </ul>

        <h3>Kabul ve Başvuru Şartları</h3>
        <p>Almanya üniversiteleri başvurularda oldukça kuralcıdır. Lisans eğitimi ile yüksek lisans alanının <strong>birebir uyumlu</strong> olması (Credit matching) beklenir.</p>
        <ul>
            <li><strong>GPA (Not Ortalaması):</strong> Alman not sistemine göre (1 en yüksek, 4 en düşük) genellikle 2.5 ve daha iyi bir ortalama (Türk sisteminde yaklaşık 2.50 - 3.00 / 4.00) beklenir. Teknik üniversiteler (TU9) için daha yüksek ortalamalar gerekebilir.</li>
            <li><strong>Dil Skoru:</strong> İngilizce bölümler için IELTS 6.5 veya TOEFL iBT 80+, Almanca bölümler için TestDaF (TDN 4) veya DSH 2 sertifikası istenir.</li>
            <li><strong>Kredi Uyumu:</strong> Lisans transkriptinizdeki derslerin, başvurulan yüksek lisans programının gereksinimleriyle (AKTS/ECTS kredisi bazında) örtüşmesi şarttır.</li>
        </ul>

        <h3>Eğitim Süresi ve Yaşam Maliyetleri</h3>
        <p>Yüksek lisans genellikle <strong>1.5 - 2 yıl (3-4 sömestr)</strong> sürer. Almanya Hükümeti, öğrenci vizesi için <strong>Bloke Hesap (Sperrkonto)</strong> açılmasını talep eder. 2024 yılı itibariyle bir yıllık bloke hesap tutarı <strong>11,208 Euro</strong>'dur (Aylık 934 Euro). Bu miktar bir öğrencinin konaklama, yeme-içme, sigorta gibi tüm temel aylık giderlerini karşılayacak şekilde hesaplanmıştır.</p>
      `
    },
    {
      slug: 'kanada',
      name: 'Kanada',
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2011',
      seoTitle: 'Kanada Yurtdışı Yüksek Lisans | Mentor Career Consulting',
      seoDesc: 'Kanada\'da master ve yüksek lisans eğitimi. Üniversiteler, PGWP çalışma izni, göçmenlik fırsatları ve başvuru şartları hakkında bilmeniz gerekenler.',
      content: `
        <h2>Kanada'da Yüksek Lisans (Master) Eğitimi</h2>
        <p>Kanada, son derece güvenli ve refah seviyesi yüksek yaşam standartları, göçmen dostu politikaları ve Kuzey Amerika kalitesindeki üst düzey üniversiteleri ile eğitim sonrası göçmenliği hedefleyen öğrenciler için bir numaralı tercihtir.</p>

        <h3>Neden Kanada'da Yüksek Lisans?</h3>
        <ul>
            <li><strong>PGWP (Post-Graduation Work Permit):</strong> Kanada'nın en büyük avantajı mezuniyet sonrası sunduğu çalışma iznidir. 2 yıllık bir yüksek lisans programını tamamlayan öğrenciler, <strong>3 yıla kadar çalışma izni (PGWP)</strong> alabilirler.</li>
            <li><strong>Göçmenlik Yolu (PR):</strong> Kanada, nitelikli eğitimli gençlere çok değer verir. Kanada'da yüksek lisans yapmak ve PGWP ile çalışmak, <strong>Kalıcı Oturum (Permanent Residency - PR)</strong> almak için en güçlü ve garanti yollardan biridir. Express Entry sisteminde çok yüksek puan avantajı sağlar.</li>
            <li><strong>Yüksek Eğitim Kalitesi:</strong> University of Toronto, UBC, McGill gibi dünya çapında prestijli devlet üniversitelerine sahiptir. Diplomalar uluslararası alanda saygındır.</li>
            <li><strong>Öğrenciyken Çalışma İzni:</strong> Eğitiminiz boyunca haftada 20 saat yarı zamanlı (part-time), tatillerde ise tam zamanlı yasal çalışma hakkınız bulunur.</li>
        </ul>

        <h3>Kabul ve Başvuru Şartları</h3>
        <p>Kanada üniversitelerinde yüksek lisans (Master) kabulleri oldukça rekabetçi ve kontenjanlar sınırlıdır. Özellikle araştırma odaklı (thesis-based) master programları profesörlerden onay ('supervisor' bulma) gerektirebilir.</p>
        <ul>
            <li><strong>GPA (Not Ortalaması):</strong> Son iki yılınızın (junior ve senior yılları) veya genel ortalamanızın genellikle B+ (yaklaşık 3.00/4.00) ve üzeri olması beklenir.</li>
            <li><strong>Dil Skoru:</strong> IELTS akademik sınavından genel 6.5 skor (her banttan en az 6.0) veya TOEFL iBT'den 80-90+ istenir.</li>
            <li><strong>Evraklar:</strong> 2-3 akademik referans, etkili bir niyet mektubu, CV ve proje/araştırma tabanlı bölümler için bir "Research Proposal" (Araştırma Önerisi).</li>
            <li><strong>Alternatif:</strong> Master kabulü zor veya pahalı gelen öğrenciler için, benzer göçmenlik/çalışma izni avantajları sunan 1-2 yıllık <strong>Post-Graduate Certificate (Kolej Sertifika)</strong> programları mükemmel bir alternatiftir.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Yüksek lisans programları genellikle <strong>1 ile 2 yıl</strong> arasında sürer. Kanada'da eğitim ücretleri ABD'ye kıyasla daha uygundur. Yıllık uluslararası öğrenci harçları <strong>15,000 CAD ile 35,000 CAD</strong> arasında değişmektedir. Yıllık yaşam maliyetleri ise ortalama 15,000 - 20,000 CAD civarındadır.</p>
      `
    },
    {
      slug: 'isvicre',
      name: 'İsviçre',
      image: 'https://images.unsplash.com/photo-1527668752968-14ce50523471?q=80&w=2070',
      seoTitle: 'İsviçre Yurtdışı Yüksek Lisans | Mentor Career Consulting',
      seoDesc: 'İsviçre\'de yüksek lisans eğitimi, ETH Zürih ve EPFL gibi prestijli okullar, İngilizce master programları ve yaşam maliyetleri.',
      content: `
        <h2>İsviçre'de Yüksek Lisans (Master) Eğitimi</h2>
        <p>İsviçre, çarpıcı doğası, dünyadaki en yenilikçi ekonomilerden biri olması ve ETH Zürih, EPFL gibi mühendislik ve bilim alanında dünyanın zirvesindeki üniversitelere ev sahipliği yapmasıyla elit bir eğitim destinasyonudur.</p>

        <h3>Neden İsviçre'de Yüksek Lisans?</h3>
        <ul>
            <li><strong>Üst Düzey Üniversiteler:</strong> ETH Zürih, EPFL, Zürih Üniversitesi ve Cenevre Üniversitesi gibi kurumlar Nobel ödüllü mezunları ve devasa araştırma bütçeleri ile dünya sıralamalarında en üstlerdedir.</li>
            <li><strong>Çok Düşük Eğitim Ücretleri:</strong> Şaşırtıcı bir şekilde, İsviçre devlet üniversitelerinin birçoğunda (ETH ve EPFL dahil) eğitim ücretleri uluslararası öğrenciler için bile oldukça düşüktür. Yıllık harç ücretleri sadece <strong>1.500 ile 3.000 CHF</strong> arasındadır.</li>
            <li><strong>Global Merkezler:</strong> BM (Birleşmiş Milletler), WHO, CERN, Nestle, Novartis, Roche, UBS gibi yüzlerce uluslararası kuruluş ve dev şirketlerin genel merkezleri buradadır. Network ağınızı global şirketlerde kurabilirsiniz.</li>
            <li><strong>İngilizce Programlar:</strong> Lisans eğitimi genellikle lokal dilde (Almanca/Fransızca) olsa da, yüksek lisans programlarının çok büyük bir bölümü <strong>tamamen İngilizce</strong>'dir.</li>
            <li><strong>Çalışma İzni:</strong> Mezun olduktan sonra iş aramak için genellikle <strong>6 aylık</strong> bir kalma süresi tanınır. Bir iş bulunduğunda çalışma izni alınabilir.</li>
        </ul>

        <h3>Kabul ve Başvuru Şartları</h3>
        <ul>
            <li><strong>GPA (Not Ortalaması):</strong> Dünya çapında rekabet olduğundan yüksek bir akademik ortalama (3.00 ve üzeri) beklenmektedir.</li>
            <li><strong>Dil Yeterliliği:</strong> İngilizce programlar için IELTS 6.5 - 7.0 veya TOEFL 90-100+ seviyesinde İngilizce bilgisi şarttır.</li>
            <li><strong>Bölüm Uyumu:</strong> Almanya'da olduğu gibi, lisans eğitiminiz ile başvurulan master programı arasında ciddi bir kredi ve müfredat uyumu aranır.</li>
        </ul>

        <h3>Yaşam Maliyetleri</h3>
        <p>Eğitim harçları çok düşük olsa da, İsviçre dünyanın <strong>yaşam maliyeti en yüksek</strong> ülkelerinden biridir. Bir öğrencinin konaklama, yemek, sigorta ve ulaşım için aylık ortalama <strong>1.600 - 2.200 CHF</strong> (yıllık ortalama 20.000 - 25.000 CHF) arasında bir bütçeye ihtiyacı olacaktır.</p>
      `
    },
    {
      slug: 'avustralya',
      name: 'Avustralya',
      image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2065',
      seoTitle: 'Avustralya Yurtdışı Yüksek Lisans | Mentor Career Consulting',
      seoDesc: 'Avustralya\'da yüksek lisans (Master), 2 ile 4 yıl arası çalışma izni (PSW), Group of Eight üniversiteleri ve kabul şartları.',
      content: `
        <h2>Avustralya'da Yüksek Lisans (Master) Eğitimi</h2>
        <p>Avustralya, rahat yaşam tarzı, güneşli iklimi, inanılmaz doğası ve "Group of Eight" olarak bilinen dünyanın en iyi üniversitelerine sahip olması ile uluslararası öğrenciler için eşsiz bir tecrübe sunmaktadır.</p>

        <h3>Neden Avustralya'da Yüksek Lisans?</h3>
        <ul>
            <li><strong>Cömert Mezuniyet Sonrası Çalışma İzni (PSW Visa):</strong> Avustralya'nın en büyük cazibesi mezuniyet sonrası çalışma haklarıdır. Yüksek lisans mezunları genellikle <strong>2 yıldan 3 yıla kadar</strong>, araştırmaya dayalı (Research) master yapanlar veya belirli bölgesel şehirlerde (Perth, Adelaide vb.) okuyanlar <strong>4 yıla kadar çalışma ve oturum izni</strong> (Temporary Graduate Visa - Subclass 485) alabilirler.</li>
            <li><strong>Öğrenciyken Yüksek Kazanç:</strong> Öğrencilerin iki haftada bir 48 saat çalışma izni vardır. Avustralya dünyadaki en yüksek asgari ücretlerden birine sahip olduğu için, öğrenciler part-time çalışarak yaşam masraflarının önemli bir kısmını karşılayabilirler.</li>
            <li><strong>Göçmenlik (PR):</strong> Çalışma vizeniz süresince mesleki deneyim elde ederek Avustralya Kalıcı Oturum (Permanent Residency) puan sisteminde avantaj sağlayabilir ve göçmenlik başvurusunda bulunabilirsiniz.</li>
            <li><strong>Esnek Başvuru:</strong> Avustralya üniversiteleri Şubat ve Temmuz olmak üzere yılda genellikle iki büyük başlangıç (intake) dönemi sunar.</li>
        </ul>

        <h3>Kabul ve Başvuru Şartları</h3>
        <ul>
            <li><strong>GPA (Not Ortalaması):</strong> Bölümden bölüme değişmekle birlikte genellikle 2.50 ve üzeri ortalama kabul için yeterli olabilmektedir. G8 üniversiteleri için bu gereksinim daha yüksek olabilir.</li>
            <li><strong>Dil Yeterliliği:</strong> Genellikle IELTS 6.5 (her banttan minimum 6.0) veya eşdeğeri PTE Akademik / TOEFL skorları istenir.</li>
            <li><strong>Work Experience (İş Tecrübesi):</strong> Özellikle MBA programları ve bazı yönetim programları için 2-3 yıllık tam zamanlı iş tecrübesi istenebilir.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Programlar genellikle <strong>1.5 veya 2 yıl</strong> sürer. Yıllık eğitim ücretleri <strong>30,000 AUD ile 50,000 AUD</strong> arasında değişmektedir. Yaşam masrafları (konaklama, yemek vb.) için Avustralya hükümetinin belirlediği yıllık referans tutar ortalama 24,505 AUD'dir.</p>
      `
    },
    {
      slug: 'belcika',
      name: 'Belçika',
      image: 'https://images.unsplash.com/photo-1566804825838-89240407fcf8?q=80&w=1974',
      seoTitle: 'Belçika Yurtdışı Yüksek Lisans | Mentor Career Consulting',
      seoDesc: 'Belçika\'da İngilizce master programları, KU Leuven ve Ghent Üniversitesi, eğitim maliyetleri ve başvuru şartları hakkında rehber.',
      content: `
        <h2>Belçika'da Yüksek Lisans (Master) Eğitimi</h2>
        <p>Avrupa Birliği'nin, NATO'nun ve birçok çok uluslu şirketin merkezine (Brüksel) ev sahipliği yapan Belçika, stratejik konumu ve yüksek kaliteli eğitim kurumlarıyla uluslararası öğrenciler için cazip bir destinasyondur.</p>

        <h3>Neden Belçika'da Yüksek Lisans?</h3>
        <ul>
            <li><strong>Kaliteli ve Uygun Fiyatlı Eğitim:</strong> KU Leuven, Ghent Üniversitesi gibi dünya çapında (ilk 100'de yer alan) saygın üniversitelerde okuma imkanı. Üstelik eğitim ücretleri İngiltere ve ABD gibi ülkelere kıyasla çok daha uygundur.</li>
            <li><strong>Geniş İngilizce Program Seçeneği:</strong> Resmi dilleri Flemenkçe, Fransızca ve Almanca olmasına rağmen, yüksek lisans programlarının büyük bir kısmı uluslararası öğrenciler için %100 İngilizce verilmektedir.</li>
            <li><strong>Mezuniyet Sonrası Arama Yılı (Orientation Year):</strong> 2021 yılında yürürlüğe giren yasaya göre, Belçika'da yüksek lisans eğitimini tamamlayan yabancı öğrenciler iş aramak veya kendi şirketlerini kurmak için <strong>1 yıllık oturum ve çalışma izni (Search Year / Orientation Year)</strong> hakkına sahiptir.</li>
            <li><strong>Network Fırsatları:</strong> Brüksel'in "Avrupa'nın Başkenti" olması, uluslararası stajlar, diplomatik kurumlar ve sivil toplum kuruluşlarında kariyer fırsatları yaratır.</li>
        </ul>

        <h3>Kabul ve Başvuru Şartları</h3>
        <ul>
            <li><strong>GPA (Not Ortalaması):</strong> İyi bir akademik lisans derecesi. Transkriptin program müfredatına uygunluğu sıkı şekilde incelenir.</li>
            <li><strong>Dil Skoru:</strong> Genellikle IELTS 6.5 veya TOEFL iBT 79-90 arası bir skor beklenir.</li>
            <li><strong>GMAT/GRE:</strong> Özellilkle işletme, ekonomi ve finans master programlarında iyi bir GMAT veya GRE skoru istenebilmektedir.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Programlar genellikle <strong>1 yıl (60 ECTS) veya 2 yıl (120 ECTS)</strong> sürmektedir. AB dışından gelen (Türk) öğrenciler için yıllık eğitim harçları üniversiteye göre değişmekle birlikte genellikle <strong>1.500 EUR ile 7.000 EUR</strong> arasındadır. Yaşam maliyetleri (konaklama, yemek vs.) için aylık 900 - 1.200 Euro arası bir bütçe yeterli olmaktadır.</p>
      `
    },
    {
      slug: 'hollanda',
      name: 'Hollanda',
      image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2070',
      seoTitle: 'Hollanda Yurtdışı Yüksek Lisans | Mentor Career Consulting',
      seoDesc: 'Hollanda\'da yüksek lisans (Master), İngilizce program bolluğu, Search Year (Zoekjaar) vizesi, başvuru süreçleri ve yaşam.',
      content: `
        <h2>Hollanda'da Yüksek Lisans (Master) Eğitimi</h2>
        <p>Hollanda, anakonuşanı İngilizce olmayan ülkeler arasında İngilizce seviyesi en yüksek olan ülke olarak bilinir. Yenilikçi, liberal ve pratik odaklı eğitim sistemiyle her yıl on binlerce uluslararası öğrenciyi çeker.</p>

        <h3>Neden Hollanda'da Yüksek Lisans?</h3>
        <ul>
            <li><strong>İngilizce Program Bolluğu:</strong> Hollanda üniversiteleri, Avrupa kıtasındaki en fazla İngilizce yüksek lisans programı sunan kurumlardır. Günlük hayatta herkes çok akıcı İngilizce konuştuğu için lokal dili bilmeden yaşamak çok kolaydır.</li>
            <li><strong>Zoekjaar (Orientation Year) Vizesi:</strong> Mezun olduktan sonra, Hollanda hükümeti öğrencilere iş bulmaları için <strong>1 yıllık çalışma izni (Orientation Year / Zoekjaar)</strong> verir. Bu süre zarfında çalışma izni olmaksızın serbestçe çalışabilir ve sponsor bir şirket bulduğunuzda "Highly Skilled Migrant" (Yüksek Nitelikli Göçmen) statüsüne geçebilirsiniz.</li>
            <li><strong>Problem Dayalı Öğrenim (PBL):</strong> Eğitim sistemi ezberden ziyade grup çalışmalarına, gerçek dünya senaryolarına ve eleştirel düşünceye dayalıdır (Problem Based Learning).</li>
            <li><strong>Research vs. Applied Sciences:</strong> Teorik araştırma odaklı 'Araştırma Üniversiteleri' (Research Universities - örn. UvA, TU Delft) ile pratik ve kariyere hazırlık odaklı 'Uygulamalı Bilimler Üniversiteleri' (Universities of Applied Sciences) gibi iki farklı kurum seçeneği vardır.</li>
        </ul>

        <h3>Kabul ve Başvuru Şartları</h3>
        <ul>
            <li><strong>GPA ve Transkript:</strong> Araştırma üniversiteleri yüksek not ortalaması (genelde 3.00 ve üstü) ve bölüm uyumu ister.</li>
            <li><strong>Dil Yeterliliği:</strong> Minimum IELTS 6.5, ancak prestijli üniversitelerin bazı bölümleri (Hukuk, Medya vb.) 7.0 veya 7.5 dahi isteyebilir.</li>
            <li><strong>Hazırlık Yılı (Pre-Master):</strong> Eğer lisans altyapınız başvurulan master programı için yetersiz bulunursa, 6 ay ile 1 yıl arası süren 'Pre-master' programlarına şartlı kabul alabilirsiniz.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Yüksek lisanslar genellikle <strong>1 veya 2 yıl</strong> sürer. AB dışı öğrenciler için yıllık üniversite harçları yaklaşık <strong>12,000 EUR ile 20,000 EUR</strong> arasındadır. Hollanda'daki en büyük zorluk konaklamadır (housing crisis); aylık yaşam masrafları konaklama dahil 1.000 - 1.500 Euro arasındadır.</p>
      `
    },
    {
      slug: 'irlanda',
      name: 'İrlanda',
      image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=2071',
      seoTitle: 'İrlanda Yurtdışı Yüksek Lisans | Mentor Career Consulting',
      seoDesc: 'İrlanda\'da yüksek lisans eğitimi, teknoloji şirketleri kariyeri, 2 yıllık çalışma izni (Post-Study Work), eğitim ücretleri ve Trinity College.',
      content: `
        <h2>İrlanda'da Yüksek Lisans (Master) Eğitimi</h2>
        <p>"Avrupa'nın Silikon Vadisi" olarak anılan İrlanda, misafirperver kültürü, tamamen İngilizce konuşulan bir ülke olması ve teknoloji/ilaç devlerinin Avrupa merkezlerine ev sahipliği yapmasıyla son yılların yükselen yıldızıdır.</p>

        <h3>Neden İrlanda'da Yüksek Lisans?</h3>
        <ul>
            <li><strong>Kariyer Olanakları (Tech Hub):</strong> Google, Apple, Meta (Facebook), Microsoft, Intel, Pfizer gibi devlerin Avrupa genel merkezleri Dublin, Cork veya Galway'dedir. Öğrenciler için muazzam bir teknoloji ve iş ağı sunar.</li>
            <li><strong>2 Yıllık Çalışma İzni:</strong> İrlanda'da yüksek lisans (Level 9 programları) bitiren uluslararası öğrenciler, mezuniyet sonrası iş aramak ve çalışmak için <strong>2 yıllık (24 ay) Third Level Graduate Scheme vizesi</strong> alırlar.</li>
            <li><strong>Eğitim Dili ve Süresi:</strong> Ana dili İngilizce olan güvenli bir ülkedir ve yüksek lisans programları genellikle tıpkı İngiltere gibi <strong>1 yıl</strong> sürmektedir.</li>
            <li><strong>Öğrenci Çalışma İzni:</strong> Eğitim dönemi boyunca haftada 20 saat, tatil dönemlerinde ise haftada 40 saat yasal çalışma hakkınız bulunur.</li>
        </ul>

        <h3>Kabul ve Başvuru Şartları</h3>
        <ul>
            <li><strong>GPA (Not Ortalaması):</strong> İrlanda üniversiteleri genellikle "2.2 Honours" seviyesinde (Türk sisteminde yaklaşık 2.50/4.00 ve üzeri) bir lisans ortalaması bekler. TCD, UCD gibi prestijli kurumlar "2.1 Honours" (yaklaşık 2.80-3.00 ve üstü) isteyebilir.</li>
            <li><strong>Dil Yeterliliği:</strong> Genellikle genel skor olarak IELTS 6.5 istenir. Duolingo English Test (DET) de İrlanda'daki pek çok üniversite tarafından kabul edilmektedir.</li>
            <li><strong>Niyet Mektubu (Personal Statement):</strong> Kariyer hedeflerinizi programa nasıl bağladığınızı anlatan etkili bir mektup çok önemlidir.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Eğitimler <strong>12 ay (1 yıl)</strong> sürer. Yıllık eğitim harçları bölüme ve üniversiteye göre <strong>13,000 EUR ile 25,000 EUR</strong> arasında değişmektedir. Dublin'de konaklama maliyetleri yüksek olup, aylık ortalama yaşam masrafı (konaklama dahil) 1.200 - 1.600 Euro civarındadır. Eğitim öncesinde vize alabilmek için bankada en az 10.000 Euro yaşam masrafı gösterilmelidir.</p>
      `
    },
    {
      slug: 'polonya',
      name: 'Polonya',
      image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=2069',
      seoTitle: 'Polonya Yurtdışı Yüksek Lisans | Mentor Career Consulting',
      seoDesc: 'Polonya\'da ekonomik yüksek lisans, İngilizce master programları, Avrupa\'da ucuz yaşam ve çalışma imkanları.',
      content: `
        <h2>Polonya'da Yüksek Lisans (Master) Eğitimi</h2>
        <p>Polonya, yüksek kaliteli Avrupa eğitimi arayan ancak bütçesi sınırlı olan uluslararası öğrenciler için Doğu ve Orta Avrupa'daki en ideal ve popüler ülkedir.</p>

        <h3>Neden Polonya'da Yüksek Lisans?</h3>
        <ul>
            <li><strong>Ekonomik Eğitim ve Yaşam:</strong> Polonya'nın en büyük avantajı uygun maliyetleridir. Yıllık eğitim harçları birçok Avrupa ülkesinin ve hatta Türkiye'deki vakıf üniversitelerinin altındadır. Yaşam maliyetleri de oldukça düşüktür.</li>
            <li><strong>İngilizce Programlar:</strong> Varşova Üniversitesi, Jagiellonian Üniversitesi, Varşova Teknoloji Üniversitesi gibi saygın kurumlarda İngilizce dilinde 400'den fazla master programı bulunmaktadır.</li>
            <li><strong>Schengen Vizesi:</strong> Polonya vizesi ile tüm Avrupa ülkelerine seyahat edebilir, Avrupa kültürünü deneyimleyebilirsiniz.</li>
            <li><strong>Mezuniyet Sonrası Çalışma İzni:</strong> Polonya'daki bir yükseköğretim kurumundan tam zamanlı mezun olan uluslararası öğrenciler, <strong>çalışma iznine (work permit) ihtiyaç duymadan</strong> tam zamanlı çalışabilirler ve oturum izni alabilirler.</li>
        </ul>

        <h3>Kabul ve Başvuru Şartları</h3>
        <p>Polonya üniversitelerinin kabul şartları Batı Avrupa'ya göre nispeten daha esnektir.</p>
        <ul>
            <li><strong>Lisans Diploması:</strong> Ortalama bir GPA (2.00 ve üzeri) kabul için çoğu zaman yeterli olabilmektedir.</li>
            <li><strong>İngilizce Yeterliliği:</strong> B2 seviyesinde İngilizce beklenir. IELTS (genellikle 6.0), TOEIC veya TOEFL kabul edilir. Bazı üniversiteler kendi yaptıkları online dil sınavları (veya Skype mülakatları) ile de öğrenci kabul edebilmektedir.</li>
            <li><strong>Belge Onayı:</strong> Diplomanızın ve transkriptinizin apostilli olması ve Lehçe veya İngilizceye çevrilmiş olması gerekmektedir.</li>
        </ul>

        <h3>Eğitim Süresi ve Maliyetler</h3>
        <p>Yüksek lisans programları genellikle <strong>1.5 ile 2 yıl (3-4 sömestr)</strong> sürer. Yıllık okul ücretleri ortalama <strong>2.000 EUR ile 4.500 EUR</strong> arasındadır. Yaşam maliyetleri (yurt veya paylaşımlı ev, yemek, ulaşım) oldukça makuldür ve aylık ortalama 500 - 800 Euro ile rahatça yaşanabilmektedir.</p>
      `
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
          title: countryData.name,
          title_en: countryData.name, // Fallback if necessary
          title_de: countryData.name,
          slug: countryData.slug,
          active: true,
          image: countryData.image,
        }
      });
    } else if (!country.image) {
      // update image if missing
      await prisma.country.update({
        where: { id: country.id },
        data: { image: countryData.image }
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
      console.log(`✅ ${countryData.name} içerikleri güncellendi.`);
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
      console.log(`✅ ${countryData.name} içerikleri oluşturuldu.`);
    }
  }

  console.log('🎉 Yurtdışı Yüksek Lisans Seed işlemi başarıyla tamamlandı!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
