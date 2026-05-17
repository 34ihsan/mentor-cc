export const careerServiceDetails: Record<string, any> = {
  global: {
    title: "Yurtdışı Kariyer ve Ausbildung",
    heroDesc: "Almanya ve Avrupa'da profesyonel kariyerinize ilk adımı atın. Ausbildung, Chancenkarte ve uzmanlık süreçlerinde yanınızdayız.",
    overview: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Küresel Kariyer Fırsatları</h2>
            <p class="mb-6">Globalleşen dünyada kariyer sınırları ortadan kalkıyor. Özellikle Almanya'nın yeni nitelikli işgücü yasası ile beraber, diploma denkliği olan uzmanlar ve mesleki eğitim (Ausbildung) almak isteyen gençler için benzersiz fırsatlar sunulmaktadır. Mentor Career olarak, sadece bir danışman değil, Avrupa'daki yeni hayatınızın mimarı oluyoruz.</p>
            
            <h3 class="text-2xl font-serif font-bold text-navy mb-6 mt-10 italic underline underline-offset-8 decoration-secondary/">Hizmetlerimiz</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div class="p-6 bg-white border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3 italic">Yurtdışı Meslek Eğitimi Danışmanlığı</h4>
                    <p class="text-sm opacity-80 mb-4">Özellikle Almanya gibi ülkelerde uygulanan ikili mesleki eğitim (Ausbildung vb.) sistemlerine dahil olmanız için tam destek sağlıyoruz. Hem sahada pratik yapıp hem de okulda teorik eğitim alarak uzmanlaşabilir ve eğitim süresince gelir elde edebilirsiniz.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3 italic">Uluslararası Kariyer Danışmanlığı</h4>
                    <p class="text-sm opacity-80 mb-4">Global iş gücü piyasasına adım atmak isteyen profesyoneller için kariyer yol haritası çiziyoruz. Sektörel hedef pazar analizi, uygun pozisyonların tespiti ve hedeflenen ülkenin iş kültürü hakkında stratejik rehberlik sunuyoruz.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3 italic">Profesyonel CV Oluşturma</h4>
                    <p class="text-sm opacity-80 mb-4">Başvurularınızın öne çıkması için uluslararası standartlara (Europass vb.) uygun, profesyonel, akılda kalıcı ve deneyimlerinizi en iyi şekilde yansıtan özgeçmiş (CV) ve ülkeye özel niyet mektubu (cover letter) hazırlıyoruz.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3 italic">Kayıt Belge Hazırlık Rehberliği</h4>
                    <p class="text-sm opacity-80 mb-4">Çalışma kayıtsi, mavi kart veya fırsat kartı gibi süreçleriniz için gerekli olan tüm belgelerin eksiksiz, konsolosluk standartlarına uygun ve hatasız bir şekilde dosyalanması sürecini yönetiyoruz.</p>
                </div>
            </div>

            <h3 class="text-2xl font-serif font-bold text-navy mb-4 italic">Hangi Alanlarda Uzmanız?</h3>
            <p class="mb-6">Özellikle Sağlık (Doktor, Hemşire, Fizyoterapist), Mühendislik, Bilişim ve Zanaat (Ustalık Gerektiren İşler) alanlarında kapsamlı bir 'Anerkennung' (Mesleki Denklik) ve işe yerleştirme hizmeti sunuyoruz.</p>
        `,
    overview_en: `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Career Without Borders</h2>
            <p class="mb-6">Global career boundaries are disappearing. With Germany's new Skilled Immigration Act, unique opportunities are available for specialists with degree recognition and young people seeking vocational training (Ausbildung). We act as the architects of your new life in Europe.</p>
            
            <h3 class="text-2xl font-serif font-bold text-navy mb-6 mt-10 italic underline underline-offset-8 decoration-secondary/">Our Career Services</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div class="p-6 bg-white border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3 italic">Vocational Training (Ausbildung)</h4>
                    <p class="text-sm opacity-80 mb-4">Full support for entering dual vocational training systems in Germany. Combine practical work with theoretical school education while earning a monthly salary during your studies.</p>
                </div>
                <div class="p-6 bg-white border border-gold/10 shadow-sm hover:shadow-md transition-shadow">
                    <h4 class="font-serif font-bold text-xl text-navy mb-3 italic">Global Talent Placement</h4>
                    <p class="text-sm opacity-80 mb-4">For professionals entering the global workforce. We provide target market analysis, position identification, and strategic guidance on local corporate culture.</p>
                </div>
            </div>

            <h3 class="text-2xl font-serif font-bold text-navy mb-4 italic">High-Demand Sectors</h3>
            <p class="mb-6">We specialize in Healthcare (Doctors, Nurses, Physiotherapists), Engineering, IT, and Skilled Trades. We provide comprehensive 'Anerkennung' management and job placement services.</p>
        `,
    advantages: [
      { title: "Birebir İş Eşleşmesi", desc: "Partner işe alım ajanslarımız ve Alman işveren ağımızla sizi doğru pozisyonla buluşturuyoruz." },
      { title: "Anerkennung Desteği", desc: "Alman makamlarından alınan 'Defizitbescheid' (Eksiklik Belgesi) analizi ve tam denklik süreç yönetimi." },
      { title: "Dil ve Adaptasyon", desc: "Almanca öğreniminden, Almanya'daki bürokratik kayıtlara (Anmeldung, Sigorta) kadar her adımda mentorluk." }
    ],
    advantages_en: [
      { title: "Direct Job Matching", desc: "Connecting you with verified employers through our recruitment network." },
      { title: "Anerkennung Support", desc: "Expert management of the ZAB and regional authority recognition paths." },
      { title: "Language & Adaptation", desc: "Mentorship for reaching professional German levels and local registration (Anmeldung)." }
    ],
    process: [
      { title: "Nitelik Analizi", desc: "Diplomanızın, dil seviyenizin ve iş tecrübenizin Alman yasalarına uygunluğunu ölçüyoruz." },
      { title: "Belge ve Denklik", desc: "ZAB veya ilgili Eyalet Müdürlüklerinden mesleki denklik başvurunuzu başlatıyoruz." },
      { title: "İş Arama & Mülakat", desc: "Alman standartlarında CV/Önyazı hazırlıyor ve Alman işverenlerle mülakatlarınızı organize ediyoruz." }
    ],
    process_en: [
      { title: "Qualification Audit", desc: "Measuring your degree, language level, and experience against host country laws." },
      { title: "Recognition Filing", desc: "Applying for equivalency with the relevant state or federal authorities." },
      { title: "Interviews", desc: "Organizing interviews with employers and optimizing your professional profile." }
    ]
  },
  "profesyonel-cv": {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Profesyonel CV ve Niyet Mektubu Hazırlığı</h2>
      <p class="mb-6 text-lg text-zinc-700">Küresel iş piyasasında, özellikle de Almanya ve Avrupa'da işe alım süreçleri oldukça standartize edilmiştir. İlk izleniminiz olan CV ve niyet mektubunuz (Cover Letter), binlerce aday arasından sıyrılmanızı sağlayan en kritik araçtır.</p>
      <p class="mb-6">Mentor Career olarak, sadece bir özgeçmiş hazırlamıyoruz; sizin profesyonel hikayenizi, hedeflerinizi ve yetkinliklerinizi uluslararası standartlarda (Europass, ATS-Friendly) en etkili şekilde sunuyoruz. Alman iş kültüründe "Lebenslauf" ve "Anschreiben" olarak bilinen bu belgeler, kayıt ve iş başvurularınızın temel taşıdır.</p>
      <div class="bg-zinc-50 p-8 rounded-3xl border border-zinc-100 my-10">
        <h3 class="text-xl font-serif font-bold text-primary mb-4 italic">Neden Profesyonel Destek Almalısınız?</h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <span class="text-secondary mt-1">✓</span>
            <span><strong>ATS Uyumluluğu:</strong> Büyük şirketlerin kullandığı otomatik aday takip sistemlerinden başarıyla geçecek anahtar kelime optimizasyonu.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-secondary mt-1">✓</span>
            <span><strong>Alman Standartları:</strong> Fotoğraf yerleşiminden imza formatına kadar Alman iş piyasasının beklediği tüm normlara uygunluk.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-secondary mt-1">✓</span>
            <span><strong>Etkileyici Niyet Mektubu:</strong> Sizi diğerlerinden ayıran motivasyonunuzu profesyonel ve ikna edici bir dille ifade eden özel içerik.</span>
          </li>
        </ul>
      </div>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Professional CV and Cover Letter Preparation</h2>
      <p class="mb-6 text-lg text-zinc-700">In the global job market, especially in Germany and Europe, recruitment processes are highly standardized. Your CV and Cover Letter, which are your first impression, are the most critical tools that allow you to stand out among thousands of candidates.</p>
      <p class="mb-6">As Mentor Career, we don't just prepare a resume; we present your professional story, goals, and competencies in the most effective way according to international standards (Europass, ATS-Friendly). These documents, known as "Lebenslauf" and "Anschreiben" in German business culture, are the foundation of your enrollment and job applications.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Professionelle Lebenslauf- und Anschreiben-Erstellung</h2>
      <p class="mb-6 text-lg text-zinc-700">Auf dem globalen Arbeitsmarkt, insbesondere in Deutschland und Europa, sind die Rekrutierungsprozesse hochgradig standardisiert. Ihr Lebenslauf und Ihr Anschreiben sind der erste Eindruck und das wichtigste Instrument, um aus Tausenden von Bewerbern hervorzustechen.</p>
      <p class="mb-6">Als Mentor Career erstellen wir nicht nur einen Lebenslauf; wir präsentieren Ihre berufliche Geschichte, Ihre Ziele und Ihre Kompetenzen auf die effektivste Weise nach internationalen Standards (Europass, ATS-Friendly). Diese in der deutschen Geschäftskultur als "Lebenslauf" und "Anschreiben" bekannten Dokumente sind die Grundlage für Ihre Genehmigungs- und Jobanträge.</p>
    `,
    advantages: [
      { title: "Kişiselleştirilmiş İçerik", desc: "Hazır şablonlar yerine, sizin deneyimlerinize özel olarak kurgulanan özgün anlatım." },
      { title: "ATS Dostu Tasarım", desc: "Dijital tarama sistemlerine uyumlu, okunabilirliği yüksek modern mizanpaj." },
      { title: "Dil ve Gramer Kontrolü", desc: "Almanca ve İngilizce başvurularda hatasız, akıcı ve profesyonel terminoloji kullanımı." }
    ],
    process: [
      { title: "Ön Görüşme", desc: "Kariyer hedefleriniz, deneyimleriniz ve başvurmak istediğiniz pozisyonlar analiz edilir." },
      { title: "Veri Toplama", desc: "Mevcut belgeleriniz incelenir ve eksik bilgiler profesyonel mülakat yöntemiyle tamamlanır." },
      { title: "Taslak Hazırlığı", desc: "İlk taslaklar hazırlanır ve niyet mektubu sizin motivasyonunuzla şekillendirilir." },
      { title: "Final Teslim", desc: "Geri bildirimlerinizle son hali verilen belgeler, hem PDF hem de düzenlenebilir formatta teslim edilir." }
    ],
    faq: [
      { q: "CV hazırlığı ne kadar sürer?", a: "Tüm veriler toplandıktan sonra genellikle 3-5 iş günü içerisinde final belgeleriniz teslim edilir." },
      { q: "Hangi dillerde hazırlık yapıyorsunuz?", a: "Profesyonel ekibimizle Türkçe, İngilizce ve Almanca dillerinde hizmet sunmaktayız." },
      { q: "ATS uyumlu ne demek?", a: "Aday Takip Sistemleri (Applicant Tracking Systems), CV'nizi otomatik tarayan yazılımlardır. Bizim tasarımlarımız bu sistemlerin en iyi puanı vermesi için optimize edilmiştir." }
    ]
  },
  "kayit-belge-hazirlik": {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Kayıt Dosyası ve Belge Hazırlık Rehberliği</h2>
      <p class="mb-6 text-lg text-zinc-700">Kayıt başvurularında en sık karşılaşılan ret sebebi, eksik veya yanlış hazırlanan belgelerdir. Özellikle Almanya kayıt süreçleri (Ulusal Kayıt - Tip D), titiz bir dosya düzeni ve tutarlı bir evrak seti gerektirir.</p>
      <p class="mb-6">Mentor Career olarak, çalışma izni, eğitim kayıtsi, aile birleşimi veya fırsat kartı gibi farklı kategorilerde, büyükelçiliklerin ve konsoloslukların güncel beklentilerine tam uyumlu bir dosya hazırlamanızı sağlıyoruz. Sürecin her adımında evraklarınızın kontrolünü yapıyor ve olası riskleri minimize ediyoruz.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div class="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
          <h4 class="font-bold text-primary mb-2 italic">Stratejik Danışmanlık</h4>
          <p class="text-sm text-zinc-600">Sadece belge toplamak değil, başvurunuzun amacını güçlendiren ek belgeler ve açıklamalarla dosyanızı zenginleştiriyoruz.</p>
        </div>
        <div class="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
          <h4 class="font-bold text-primary mb-2 italic">Hata Denetimi</h4>
          <p class="text-sm text-zinc-600">Formlardaki küçük bir hatanın bile ret sebebi olabileceği bilinciyle, her satırı titizlikle kontrol ediyoruz.</p>
        </div>
      </div>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Enrollment File and Document Preparation Guidance</h2>
      <p class="mb-6 text-lg text-zinc-700">The most common reason for rejection in enrollment applications is missing or incorrectly prepared documents. Especially German enrollment processes (National Enrollment - Type D) require a meticulous file order and a consistent set of documents.</p>
      <p class="mb-6">As Mentor Career, we ensure that you prepare a file that is fully compliant with the current expectations of embassies and consulates in different categories such as work permit, education enrollment, family reunification or opportunity card.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Genehmigungakte und Leitfaden zur Dokumentenvorbereitung</h2>
      <p class="mb-6 text-lg text-zinc-700">Der häufigste Grund für eine Ablehnung bei Genehmigunganträgen sind fehlende oder falsch vorbereitete Dokumente. Insbesondere deutsche Genehmigungsverfahren (Nationales Genehmigung - Typ D) erfordern eine sorgfältige Aktenordnung und einen konsistenten Satz von Dokumenten.</p>
    `,
    advantages: [
      { title: "Güncel Bilgi", desc: "Sürekli değişen konsolosluk mevzuatlarını ve ek evrak taleplerini anlık takip ediyoruz." },
      { title: "Süreç Yönetimi", desc: "Randevu alımından dosya teslimine kadar tüm takvimi sizin adınıza planlıyoruz." },
      { title: "Yüksek Başarı Oranı", desc: "Profesyonelce hazırlanmış dosyalarla kayıt onay şansınızı maksimize ediyoruz." }
    ],
    process: [
      { title: "Profil Analizi", desc: "Hangi kayıt türüne başvurmanız gerektiği ve profilinizin uygunluğu belirlenir." },
      { title: "Checklist Paylaşımı", desc: "Başvuru türünüze özel, güncel ve detaylı evrak listesi sizinle paylaşılır." },
      { title: "Belge İnceleme", desc: "Hazırladığınız her evrak uzmanlarımızca tek tek kontrol edilir, gerekirse rekayıt istenir." },
      { title: "Dosya Tanzimi", desc: "Evraklar konsolosluğun istediği sırada dizilir, formlar doldurulur ve başvuruya hazır hale getirilir." }
    ],
    faq: [
      { q: "Başvuru garantisi veriyor musunuz??", a: "Kabul onayı tamamen konsolosluk yetkisindedir; ancak biz dosyanızın hatasız olmasıyla onay şansınızı en üst seviyeye çıkarıyoruz." },
      { q: "Randevu işlemlerini siz mi yapıyorsunuz?", a: "Evet, iDATA veya ilgili aracı kurumlar üzerinden randevu süreçlerinizi biz yönetiyoruz." },
      { q: "Motive mektubu neden önemli?", a: "Almanya gibi ülkeler, seyahat amacınızı kendi dilinizle ve ikna edici bir şekilde açıklamanızı bekler. Bu mektup dosyanın ruhudur." }
    ]
  },
  "yurtdisi-meslek-egitimi": {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Almanya'da Ausbildung (Mesleki Eğitim) Danışmanlığı</h2>
      <p class="mb-6 text-lg text-zinc-700">Almanya'nın dünyaca ünlü "Dualer Ausbildung" (İkili Mesleki Eğitim) sistemi, bir yandan teorik eğitim alırken diğer yandan bir şirkette çalışarak maaş kazanmanıza olanak tanır. Bu sistem, Almanya'da kalıcı bir kariyer ve oturum izni için en sağlam yollardan biridir.</p>
      <p class="mb-6">Hemşirelikten bilişime, gastronomiden teknik uzmanlıklara kadar 300'den fazla branşta sunulan bu eğitimler, lise mezunu olan veya kariyer değiştirmek isteyen gençler için eşsiz fırsatlar sunar. Mentor Career olarak, doğru branş seçiminden işveren mülakatlarına kadar tüm süreci sizinle yürütüyoruz.</p>
      <div class="bg-secondary/5 border-l-4 border-secondary p-8 rounded-r-3xl my-10">
        <h3 class="text-xl font-serif font-bold text-primary mb-4 italic">Ausbildung Avantajları</h3>
        <ul class="space-y-4">
          <li class="flex items-start gap-4">
            <div class="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
            <span><strong>Maaşlı Eğitim:</strong> Eğitim süresince aylık 900€ - 1300€ arasında değişen maaş alırsınız.</span>
          </li>
          <li class="flex items-start gap-4">
            <div class="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
            <span><strong>İş Garantisi:</strong> Mezuniyet sonrası %95 oranında aynı şirkette veya sektörde hemen işbaşı imkanı.</span>
          </li>
          <li class="flex items-start gap-4">
            <div class="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
            <span><strong>Oturum İzni:</strong> Eğitim bittiğinde çalışma iznine geçiş ve ardından kalıcı oturum hakkı.</span>
          </li>
        </ul>
      </div>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Ausbildung (Vocational Training) Consultancy in Germany</h2>
      <p class="mb-6 text-lg text-zinc-700">Germany's world-famous "Dualer Ausbildung" (Dual Vocational Training) system allows you to receive theoretical education while working at a company and earning a salary. This system is one of the most solid paths for a permanent career and residence permit in Germany.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Ausbildung (Berufsausbildung) Beratung in Deutschland</h2>
      <p class="mb-6 text-lg text-zinc-700">Deutschlands weltberühmtes System der „Dualen Ausbildung“ ermöglicht es Ihnen, eine theoretische Ausbildung zu erhalten, während Sie gleichzeitig in einem Unternehmen arbeiten und ein Gehalt verdienen.</p>
    `,
    advantages: [
      { title: "Garantili Yerleşim", desc: "Güçlü networkümüz ile profilinize uygun Alman işverenlerle doğrudan bağlantı." },
      { title: "Dil Desteği", desc: "Ausbildung için gereken B1/B2 dil seviyesine ulaşmanız için eğitim planlaması." },
      { title: "Bürokratik Takip", desc: "Denklik (Anerkennung) ve kayıt süreçlerinin hatasız yönetimi." }
    ],
    process: [
      { title: "Mesleki Yönelim", desc: "Yetenekleriniz ve piyasa ihtiyacına göre en doğru branş seçilir." },
      { title: "Dil Hazırlığı", desc: "Belirlenen branşın gerektirdiği dil sertifikası süreci başlatılır." },
      { title: "Eşleştirme", desc: "Almanya'daki partner kurumlarımız ve işverenlerle mülakatlar organize edilir." },
      { title: "Kayıt ve Yerleşim", desc: "Sözleşmeniz alındıktan sonra kayıt başvurusu ve Almanya'da konaklama ayarlanır." }
    ],
    faq: [
      { q: "Yaş sınırı var mı?", a: "Genellikle 18-30 yaş arası tercih edilse de, bazı branşlarda 30 yaş üstü adaylar için de fırsatlar mevcuttur." },
      { q: "Eğitim kaç yıl sürer?", a: "Branşa göre genellikle 2.5 ile 3.5 yıl arasında değişmektedir." },
      { q: "Lise mezunu olmam yeterli mi?", a: "Evet, lise diploması temel şarttır. Ancak bazı teknik bölümlerde meslek lisesi veya üniversite terk/mezun durumu avantaj sağlar." }
    ]
  },
  "uluslararasi-kariyer": {
    overview: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Uluslararası Kariyer ve İş Arama Danışmanlığı</h2>
      <p class="mb-6 text-lg text-zinc-700">Global dünyada kariyer yapmak, sadece bir iş başvurusu yapmaktan çok daha fazlasıdır. Doğru strateji, güçlü bir kişisel marka ve hedeflenen ülkenin iş kültürü hakkında derin bilgi gerektirir.</p>
      <p class="mb-6">Mentor Career, özellikle beyaz yakalı profesyonellerin ve uzman teknisyenlerin global kariyer basamaklarını tırmanmasına rehberlik eder. LinkedIn profil optimizasyonundan mülakat koçluğuna, maaş pazarlığından kontrat incelemesine kadar 360 derece yanınızdayız.</p>
      <div class="bg-zinc-950 text-white p-10 rounded-[3rem] my-10 relative overflow-hidden">
        <div class="relative z-10">
          <h3 class="text-2xl font-serif font-bold mb-6 italic text-secondary">Hizmet Kapsamımız</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 class="font-bold mb-2">Stratejik Planlama</h4>
              <p class="text-zinc-400 text-sm italic">Hedef pazar analizi ve yetkinliklerinize en uygun pozisyonların tespiti.</p>
            </div>
            <div>
              <h4 class="font-bold mb-2">Digital Presence</h4>
              <p class="text-zinc-400 text-sm italic">LinkedIn ve global iş portallarında görünürlüğünüzü artıracak profesyonel profil yönetimi.</p>
            </div>
            <div>
              <h4 class="font-bold mb-2">Mülakat Koçluğu</h4>
              <p class="text-zinc-400 text-sm italic">Video mülakatlar ve panel görüşmeleri için simülasyonlar ve teknik hazırlık.</p>
            </div>
            <div>
              <h4 class="font-bold mb-2">Networking</h4>
              <p class="text-zinc-400 text-sm italic">Gizli iş piyasasına (Hidden Job Market) erişim için bağlantı kurma stratejileri.</p>
            </div>
          </div>
        </div>
        <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
    `,
    overview_en: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">International Career and Job Search Consultancy</h2>
      <p class="mb-6 text-lg text-zinc-700">Building a career in the global world is much more than just applying for a job. It requires the right strategy, a strong personal brand, and deep knowledge of the business culture of the target country.</p>
    `,
    overview_de: `
      <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">Internationale Karriere- und Jobsuche-Beratung</h2>
      <p class="mb-6 text-lg text-zinc-700">Eine Karriere in der globalen Welt aufzubauen ist viel mehr als nur eine Bewerbung um einen Job. Es erfordert die richtige Strategie, eine starke persönliche Marke und fundierte Kenntnisse der Geschäftskultur des Ziellandes.</p>
    `,
    advantages: [
      { title: "Uzman Mentorluk", desc: "Avrupa iş piyasasında deneyimli danışmanlarla birebir çalışma imkanı." },
      { title: "Kişisel Markalama", desc: "Sizi rakiplerinizden ayıracak benzersiz bir profesyonel kimlik oluşturma." },
      { title: "Uçtan Uca Destek", desc: "İş arama sürecinden ilk iş gününüze kadar her aşamada danışmanlık." }
    ],
    process: [
      { title: "Yetenek Audit", desc: "Mevcut yetkinlikleriniz, dilleriniz ve başarılarınız detaylıca raporlanır." },
      { title: "Hedef Belirleme", desc: "Kariyer beklentilerinize göre en uygun ülkeler ve şirket segmentleri seçilir." },
      { title: "Uygulama", desc: "Optimize edilmiş belgelerle stratejik başvurular yapılır ve ağ oluşturma süreci başlar." },
      { title: "Kontrat ve Onboarding", desc: "Gelen tekliflerin değerlendirilmesi, pazarlık süreci ve işe başlangıç desteği." }
    ],
    faq: [
      { q: "Hangi ülkeler için danışmanlık veriyorsunuz?", a: "Başta Almanya olmak üzere tüm Avrupa ülkeleri, Kanada ve Körfez ülkeleri odak alanımızdır." },
      { q: "İş garantisi veriyor musunuz?", a: "Hayır, ancak başvurularınızın mülakata dönüşme oranını ve mülakatlardaki başarı şansınızı ciddi oranda artırıyoruz." },
      { q: "Hizmet süresi ne kadar?", a: "İhtiyacınıza göre tek seferlik danışmanlıktan, 6 aylık kapsamlı paketlere kadar farklı seçeneklerimiz mevcuttur." }
    ]
  }
};
