import { UniversityServiceDetail } from "@/lib/mappings/types";

export const languageSchoolServiceDetails: Record<string, UniversityServiceDetail> = {
  global: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Yurtdışı Dil Okulları: Kariyerinizde Global Bir Sıçrama Yapın</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium italic">Dil öğrenmek sadece yeni kelimeler kazanmak değil, dünyayı farklı bir perspektifle algılamaktır. Mentor Career olarak, sizi sadece bir sınıfa değil; o dili yaşayan, soluyan ve her anında tecrübe edeceğiniz bir atmosfere davet ediyoruz. Geleneksel metodolojilerin ötesine geçin, global bir networkün parçası olun.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div class="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-premium hover:shadow-2xl transition-all group">
              <div class="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all">
                  <span class="text-2xl">🗣️</span>
              </div>
              <h3 class="text-xl font-bold mb-3 text-navy italic">Uzmanlaşmış Eğitimler</h3>
              <p class="text-sm text-zinc-500 italic">IELTS/TOEFL gibi sınav merkezlerinde eğitim alarak hedefinize doğrudan ulaşın.</p>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-premium hover:shadow-2xl transition-all group">
              <div class="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all">
                  <span class="text-2xl">🤝</span>
              </div>
              <h3 class="text-xl font-bold mb-3 text-navy italic">Global Network</h3>
              <p class="text-sm text-zinc-500 italic">Dünya çapındaki şirketlerle iş birliği yapan okullarda profesyonel çevrenizi genişletin.</p>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-premium hover:shadow-2xl transition-all group">
              <div class="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-all">
                  <span class="text-2xl">🎓</span>
              </div>
              <h3 class="text-xl font-bold mb-3 text-navy italic">Akademik Köprü</h3>
              <p class="text-sm text-zinc-500 italic">Pre-Sessional ve Akademik İngilizce desteği ile üniversite kapılarını aralayın.</p>
          </div>
      </div>

      <div class="p-10 rounded-[3rem] bg-navy text-white relative overflow-hidden mb-16 shadow-2xl">
          <div class="absolute top-0 right-0 p-10 opacity-10">
              <span class="text-8xl">🗝️</span>
          </div>
          <h3 class="text-2xl font-serif font-bold mb-4 italic text-gold">Dil Eğitiminde Mentor Career Gücü</h3>
          <p style="color: #ffffff !important; font-size: 1.125rem !important;" class="leading-relaxed italic mb-8 font-medium">
            Hukuk İngilizcesinden Tıp İngilizcesine, Yönetici programlarından (Platinum) aile-çocuk kamplarına kadar her yaşa ve kariyere özel çözümler sunuyoruz. Biz sadece kayıt ofisi değiliz; sizin için bir 'Gelecek Tasarımcısıyız'.
          </p>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-6 !text-base font-bold">
              <li style="color: #ffffff !important;" class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                IELTS Sınav Merkezlerinde Yerinde Eğitim
              </li>
              <li style="color: #ffffff !important;" class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                Global Şirketlerle Doğrudan Network İmkanı
              </li>
              <li style="color: #ffffff !important;" class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                Akademik İngilizce ve Pre-Sessional Desteği
              </li>
              <li style="color: #ffffff !important;" class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                Kariyer Odaklı Platinum ve İş İngilizcesi
              </li>
              <li style="color: #ffffff !important;" class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                Üniversite Pathway ve Kabul Garantili Yollar
              </li>
              <li style="color: #ffffff !important;" class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                Mesai Saatleri İçerisinde Kesintisiz Öğrenci ve Veli Destek Hattı
              </li>
          </ul>
      </div>
    `,
    advantages: [
      { title: "Kültürel Tam Otomatik", desc: "Dili sadece sınıfta değil, markette, kafede ve sosyal yaşamda doğal akışıyla öğrenin." },
      { title: "Küresel Network", desc: "Dünyanın her yerinden profesyoneller ve öğrencilerle tanışarak vizyonunuzu genişletin." },
      { title: "Hızlı İlerleme", desc: "Yoğunlaştırılmış programlar ve tam zamanlı o dile maruz kalma (immersion) ile Türkiye'deki eğitimin 3 katı hızda sonuç alın." },
      { title: "Kariyer Artısı", desc: "Uluslararası geçerliliği olan sertifikalar ve yabancı dilde akıcılık ile özgeçmişinizi güçlendirin." }
    ],
    process: [
      { title: "Ücretsiz İhtiyaç Analizi", desc: "Dil seviyeniz, süreniz ve gitmek istediğiniz şehir üzerine detaylı bir strateji toplantısı." },
      { title: "Okul ve Program Seçimi", desc: "Bütçenize ve beklentilerinize uygun, akreditasyonu tam partner okullardan tekliflerin alınması." },
      { title: "Kayıt ve Başvuru Süreçleri", desc: "Kayıt formlarının doldurulması ve kabul belgesinin getirilmesi sürecinin yönetimi." },
      { title: "Oryantasyon ve Uçuş", desc: "Konaklama detayları, havaalanı transferi ve gittiğiniz şehirdeki yaşam hakkında kapsamlı brifing." }
    ],
    faq: [
      { q: "Dil eğitimi için belirli bir yaş sınırı var mı?", a: "Hayır, yetişkin programları genellikle 16-18 yaşından başlar ve her yaştan öğrenciye açıktı. 30+, 40+ ve 50+ gibi özel yaş grupları için sınıflarımız da mevcuttur." },
      { q: "Hangi konaklama seçenekleri sunuluyor?", a: "Aile yanı (kültürel immersion için ideal), öğrenci rezidansları (sosyallik için ideal), paylaşımlı daireler veya otel seçenekleri mevcuttur." },
      { q: "Eğitim sırasında çalışma iznim olacak mı?", a: "İrlanda, Avustralya ve Dubai gibi belirli ülkelerde uzun dönem dil eğitimi alan öğrencilere yasal çalışma izni tanınmaktadır." }
    ]
  },
  ingiltere: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İngiltere: Dil Eğitiminin Anavatanı</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium">İngilizceyi doğduğu topraklarda, Oxford'un tarihi havasında veya Londra'nın kozmopolit ritminde öğrenin. İngiltere, her yıl yüz binlerce öğrenciye ev sahipliği yapan, kalitesi tescilli okullarıyla dünya standartlarında bir deneyim sunar.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Bölgesel Çeşitlilik</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Londra'nın enerjisinden Cambridge'in sükunetine, Brighton'ın sahil havasından Manchester'ın dinamizmine kadar size uygun bir şehir mutlaka var.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• British Council Akreditasyonlu Okullar</li>
                  <li>• Zengin Sosyal ve Kültürel Programlar</li>
                  <li>• Her Seviyeye Uygun Genel ve Yoğun Kurslar</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Kariyer ve Sınav Odaklılık</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">IELTS hazırlık kurslarından İş İngilizcesine, Hukuk veya Tıp İngilizcesi gibi spesifik alanlara kadar uzmanlaşmış eğitimler sizi bekliyor.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• IELTS Sınav Merkezlerinde Eğitim</li>
                  <li>• Global Şirketlerle Network İmkanı</li>
                  <li>• Akademik İngilizce ve Pre-Sessional Desteği</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "Saf Aksan ve Kültür", desc: "İngiliz kültürünü yerinde tanıyarak en prestijli aksanlardan birini öğrenme şansı." },
      { title: "Zengin Okul Seçenekleri", desc: "Bütçe dostu butik okullardan, dünyanın en lüks dil akademilerine kadar geniş portföy." },
      { title: "Kolay Ulaşım", desc: "Türkiye'ye yakınlığı ve her gün düzenlenen onlarca uçuş ile en erişilebilir destinasyon." }
    ],
    process: [
      { title: "Lokasyon Analizi", desc: "Karakterinize ve bütçenize en uygun İngiliz şehrinin belirlenmesi." },
      { title: "Okul Kaydı", desc: "Kısa süreli (6 ay) veya uzun süreli (11 ay) program kaydınızın yapılması." }
    ],
    faq: [
      { q: "İngiltere'de dil eğitimi alırken çalışabilir miyim?", a: "Maalesef İngiltere'de dil okulu öğrencilerine yasal çalışma izni verilmemektedir." }
    ],
    universities: [
      {
        name: "Kaplan International - London",
        slug: "kaplan-london",
        detailedDescription: "Londra'nın kalbinde, son teknoloji sınıfları ve K+ öğrenme sistemiyle donatılmış, dünyanın en prestijli dil okullarından biridir.",
        highlights: ["K+ Hibrit Öğrenme Sistemi", "Leicester Square Yakınlığı", "Zengin Sosyal Aktivite Programı"],
        departments: ["Genel İngilizce", "IELTS Hazırlık", "İş İngilizcesi"]
      },
      {
        name: "EC English - London",
        slug: "ec-english-london",
        detailedDescription: "Euston Station'ın hemen yanında, modern binası ve yenilikçi eğitim metodolojisiyle Londra'nın en popüler okullarından biri.",
        highlights: ["Şehir Merkezi Lokasyonu", "30+ Yaş Özel Bölümü", "Interaktif Beyaz Tahta Teknolojisi"],
        departments: ["Genel İngilizce", "IELTS Hazırlık", "Şehirde İngilizce"]
      },
      {
        name: "Kings Education - Oxford",
        slug: "kings-education-oxford",
        detailedDescription: "Akademik derinliği ile bilinen, üniversite kampüsü konforunda eğitim sunan köklü bir kurum.",
        highlights: ["Geniş Kampüs Olanakları", "Akademik Pathway Programları", "Sakin ve Odaklı Eğitim"],
        departments: ["Yoğun İngilizce", "Cambridge Sınav Hazırlık", "Sanat ve Tasarım İngilizcesi"]
      },
      {
        name: "St Giles - London Central",
        slug: "st-giles-london",
        detailedDescription: "1955'ten beri hizmet veren, Londra'nın en köklü ve güvenilir dil okullarından biri.",
        highlights: ["Çatı Bahçesi ve Kafe", "Akademik Başarı Odaklılık", "Yüksek Öğretmen Kalitesi"],
        departments: ["Genel İngilizce", "Öğretmen Eğitimi (CELTA)", "Platin Kurslar (Yöneticiler için)"]
      }
    ]
  },
  malta: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Malta: Güneş, Deniz ve İngilizce</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium">Akdeniz'in kalbinde, tatil konforunda bir eğitim deneyimine ne dersiniz? Malta, ekonomik fiyatları ve yıl boyu süren güneşli havasıyla dil eğitiminin en popüler duraklarından biridir.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Ekonomik ve Erişilebilir</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Diğer İngilizce konuşulan ülkelere göre çok daha uygun yaşam maliyetleri ve okul ücretleri sunar. Özellikle uzun dönem eğitimler için rakipsizdir.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Her Bütçeye Uygun Paket Programlar</li>
                  <li>• Tatil ve Eğitimin Mükemmel Dengesi</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Sosyal ve Dinamik</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Avrupa'nın her yerinden gelen öğrencilerle her an İngilizce konuşacağınız, sosyal aktivitelerle dolu bir ada yaşamı sizi bekliyor.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• St. Julians ve Sliema gibi Popüler Merkezler</li>
                  <li>• Okul Rezidanslarında Uluslararası Ortam</li>
                  <li>• Akşam Aktiviteleri ve Şehir Gezileri</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "Uygun Maliyet", desc: "Eğitim ve konaklama dahil paketlerde en ekonomik seçenekler." },
      { title: "Yaşam Tarzı", desc: "Sadece bir kurs değil, Akdeniz kültürünü iliklerinize kadar hissedeceğiniz bir serüven." }
    ],
    process: [
      { title: "Paket Seçimi", desc: "Eğitim + Konaklama + Transfer dahil ekonomik paketlerin incelenmesi." },
      { title: "Kayıt İşlemleri", desc: "Hızlı kayıt ve kabul belgesi tedariği." }
    ],
    faq: [
      { q: "Malta'da dil eğitimi alırken çalışabilir miyim?", a: "Evet, 13 hafta ve üzeri eğitim alan öğrenciler, 90. günden sonra haftalık 20 saat yasal çalışma iznine sahip olurlar." }
    ],
    universities: [
      {
        name: "ESE - European School of English",
        slug: "ese-malta",
        detailedDescription: "Malta'nın en prestijli ve ödüllü okulu. St. Julians'ın merkezinde kendi rezidansı ve sosyal kulübüyle tam bir topluluk hissi sunar.",
        highlights: ["Eaquals ve IALC Akreditasyonu", "Kendi Beach Club Erişimi", "Premium Şehir Merkezi Rezidansı"],
        departments: ["Genel İngilizce", "IELTS Hazırlık", "Akademik Yıl"]
      },
      {
        name: "EC English - Malta",
        slug: "ec-malta",
        detailedDescription: "EC'nin global genel merkezi olan bu kampüs, adanın en modern tesislerine sahiptir ve 30+ yaş grubu için özel bir bölüme ev sahipliği yapar.",
        highlights: ["Global EC Genel Merkezi", "Özel 30+ Yaş Bölümü", "Interaktif Eğitim Teknolojisi"],
        departments: ["Şehirde İngilizce", "İş İngilizcesi", "Yoğun Kurslar"]
      },
      {
        name: "Kaplan International - Malta",
        slug: "kaplan-malta",
        detailedDescription: "Kaplan kalitesini Akdeniz'in güneşiyle buluşturan okul, özellikle akademik başarı odaklı öğrenciler için idealdir.",
        highlights: ["K+ Öğrenme Sistemi", "Modern Okul Binası", "Sliema'da Harika Lokasyon"],
        departments: ["Genel İngilizce", "Sınav Hazırlık", "Akademik Sömestir"]
      }
    ]
  },
  irlanda: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İrlanda: Samimiyetin ve Kariyerin Merkezi</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium">Gülen yüzlü insanları, yemyeşil doğası ve 'Work and Study' imkanıyla İrlanda, son yılların en trend dil eğitimi destinasyonudur. Dublin'in tarihi sokaklarında İngilizcenizi geliştirirken, aynı zamanda çalışma hayatını deneyimleyebilirsiniz.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Work and Study İmkanı</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">25 hafta ve üzeri dil eğitimi alan öğrencilere haftalık 20 saat yasal çalışma izni verilir. Bu sayede hem dilinizi geliştirir hem de yaşam maliyetlerinizi karşılayabilirsiniz.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Minimum 25 Hafta Kayıt Gerekliliği</li>
                  <li>• Eğitim Sonrası 2 Ay Tatil/Çalışma Süresi</li>
                  <li>• Global Teknoloji Devlerinin (Google, Meta) Merkezi</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Kültürel Derinlik</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Pub kültürü, edebiyat mirası ve eşsiz doğasıyla İrlanda, öğrencilere sadece dil değil, zengin bir yaşam kültürü vaat eder.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Samimi ve Yardımsever İrlanda Halkı</li>
                  <li>• Dublin, Cork ve Galway Seçenekleri</li>
                  <li>• Müzik ve Festival Dolu Sosyal Yaşam</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "Çalışma İzni", desc: "Dil eğitimi alırken para kazanma ve iş tecrübesi edinme fırsatı." },
      { title: "Uluslararası Ortam", desc: "Avrupa'nın teknoloji üssü olması sebebiyle çok çeşitli bir öğrenci profili." },
      { title: "Güvenli ve Huzurlu", desc: "Dünyanın en güvenli ülkelerinden biri olarak öğrenci dostu atmosfer." }
    ],
    process: [
      { title: "Okul ve Şehir Kararı", desc: "Çalışma izni odaklı 25 haftalık programların analizi." },
      { title: "GNIB/IRP Bilgilendirmesi", desc: "İrlanda'ya varış sonrası oturum izni ve çalışma prosedürleri desteği." }
    ],
    faq: [
      { q: "İrlanda'da ne kadar kazanabilirim?", a: "Öğrenciler genellikle asgari ücretle (saatlik ~12.70€) işler bulabilirler, bu da aylık yaşam giderlerinin büyük kısmını karşılar." }
    ],
    universities: [
      {
        name: "EC English - Dublin",
        slug: "ec-dublin",
        detailedDescription: "Dublin'in merkezinde, taze ve modern tasarımıyla dikkat çeken okul, yüksek öğrenci memnuniyetiyle bilinir.",
        highlights: ["Şehir Merkezi Konumu", "Ücretsiz Dil Atölyeleri", "30+ Yaş Özel Sınıfları"],
        departments: ["Genel İngilizce", "Şehirde İngilizce", "IELTS Hazırlık"]
      },
      {
        name: "Kaplan International - Dublin",
        slug: "kaplan-dublin",
        detailedDescription: "Liffey Nehri kıyısında, Temple Bar'ın hemen yanı başında modern ve teknolojik bir dil okulu deneyimi.",
        highlights: ["K+ Eğitim Metodu", "Akademik Yıl Programları", "Zengin Sosyal Aktiviteler"],
        departments: ["Yoğun İngilizce", "İş İngilizcesi", "IELTS Hazırlık"]
      },
      {
        name: "Emerald Cultural Institute",
        slug: "emerald-dublin",
        detailedDescription: "Akademik derinliği ve köklü geçmişiyle İrlanda'nın en saygın eğitim kurumlarından biri.",
        highlights: ["Yüksek Akademik Standartlar", "Özel Bahçeli Kampüs", "Liderlik Programları"],
        departments: ["Akademik İngilizce", "Sınav Hazırlık", "Öğretmen Eğitimi"]
      }
    ]
  },
  amerika: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Amerika Birleşik Devletleri: Sınırsız Fırsatlar</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium">Amerikan rüyasını yerinde yaşayın. New York'un gökdelenleri arasında veya California'nın güneşli sahillerinde İngilizcenizi geliştirirken, dünyanın en dinamik kültürünü keşfedin.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademik ve Kariyer Odaklı</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">TOEFL hazırlık kursları ve üniversite yerleştirme servisleriyle Amerika'da akademik kariyerin ilk adımını atın.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Her Eyalette Farklı Deneyim</li>
                  <li>• Kampüs İçi Dil Okulu Seçenekleri</li>
                  <li>• Yoğun TOEFL ve GMAT Hazırlık</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Global Network</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Dünyanın her yerinden gelen hırslı öğrencilerle tanışarak küresel bir vizyon kazanın.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• New York, Miami, San Francisco Seçenekleri</li>
                  <li>• İş İngilizcesinde Dünya Standartları</li>
                  <li>• Prestijli Sertifika Programları</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "Kültürel Çeşitlilik", desc: "Dünyanın 'erime potası' olan ABD'de her milletten insanla iletişim kurma şansı." },
      { title: "Üniversite Kampüsleri", desc: "Bazı dil okullarımız doğrudan üniversite kampüslerinde yer alarak gerçek bir Amerikan kolej hayatı sunar." },
      { title: "Aksan Çeşitliliği", desc: "Global iş dünyasında en çok kabul gören Amerikan aksanına hakimiyet." }
    ],
    process: [
      { title: "Eyalet ve Şehir Seçimi", desc: "Beklentilerinize uygun yaşam tarzına sahip eyaletin belirlenmesi." },
      { title: "I-20 Belgesi ve Kayıt", desc: "Eğitiminiz için gerekli olan I-20 belgenizin okuldan getirilmesi." }
    ],
    faq: [
      { q: "Amerika'da dil eğitimi alırken çalışabilir miyim?", a: "Öğrenci statüsüyle dil eğitimi alanların yasal çalışma izni bulunmamaktadır; ancak kampüs içi bazı işler için istisnalar olabilir." }
    ],
    universities: [
      {
        name: "Kaplan International - USA",
        slug: "kaplan-usa",
        detailedDescription: "New York, Los Angeles, Boston gibi metropollerde, ikonik lokasyonlarda ve üniversite kampüslerinde eğitim imkanı.",
        highlights: ["K+ Hibrit Öğrenme Sistemi", "Üniversite Yerleştirme Servisi", "İkonik Şehir Lokasyonları"],
        departments: ["Genel İngilizce", "TOEFL Hazırlık", "GMAT/GRE Hazırlık"]
      },
      {
        name: "Kings Education - USA",
        slug: "kings-usa",
        detailedDescription: "Özellikle üniversite transfer programları ve akademik başarıya odaklanan öğrenciler için butik ve kaliteli bir seçenek.",
        highlights: ["Küçük Sınıf Mevcutları", "Üniversite Kampüsü Deneyimi", "Kişiselleştirilmiş Danışmanlık"],
        departments: ["Akademik İngilizce", "Üniversite Pathway", "Sanat ve Sinema İngilizcesi"]
      },
      {
        name: "EC English - USA",
        slug: "ec-usa",
        detailedDescription: "Amerika'nın en popüler şehirlerinde, modern ve teknolojik sınıflarda dinamik bir eğitim anlayışı.",
        highlights: ["Dinamik Eğitim Metodu", "Turuncu Halı Karşılaması", "30+ Yaş Seçenekleri"],
        departments: ["Yoğun İngilizce", "Şehirde İngilizce", "İş İngilizcesi"]
      },
      {
        name: "ELS Language Centers - USA",
        slug: "els-usa",
        detailedDescription: "Amerika genelinde 50'den fazla lokasyonuyla üniversite yerleştirme odaklı en geniş ağa sahip kurum.",
        highlights: ["Üniversite Kampüsü Deneyimi", "600+ Partner Üniversite", "Hızlı Kabul Süreçleri"],
        departments: ["Akademik İngilizce", "Sınav Hazırlık", "Gençlik Kampları"]
      }
    ]
  },
  kanada: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Kanada: Kaliteli Eğitim ve Huzur</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium">Doğa harikaları ve dünyanın en yaşanabilir şehirleriyle Kanada, hem İngilizce hem de Fransızca öğrenmek isteyenler için eşsiz bir destinasyondur.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Eğitim Sonrası Fırsatlar</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Kanada'da dil eğitimi, kolej ve üniversite başvuruları için en güvenilir basamaktır.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Pathway (Üniversite Hazırlık) Uzmanlığı</li>
                  <li>• Sınavsız Kolej Geçiş İmkanları</li>
                  <li>• Çok Kültürlü ve Hoşgörülü Toplum</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Şehir Seçenekleri</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Toronto'nun finans merkezi havasından Vancouver'ın doğa tutkusuna kadar her zevke hitap eden şehirler.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Toronto, Vancouver, Montreal Seçenekleri</li>
                  <li>• Güvenli ve Modern Şehir Yaşamı</li>
                  <li>• Fransızca Eğitimi (Montreal)</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "Ekonomik Kur Avantajı", desc: "USD ve GBP'ye göre daha avantajlı olan Kanada Doları ile bütçe dostu eğitim." },
      { title: "Pathway Başarısı", desc: "Dil okulu sonrası Kanada'da kolej eğitimi alarak göçmenlik yolunda adım atma şansı." },
      { title: "Güvenlik", desc: "Dünyanın en düşük suç oranlarına sahip, öğrenci dostu atmosfer." }
    ],
    process: [
      { title: "Hedef Analizi", desc: "Eğitim sonrası Kanada'da kalma planınıza göre en uygun ilin seçilmesi." },
      { title: "Kayıt ve CAQ (Quebec için)", desc: "Seçilen okula kayıt ve gerekli eyalet onaylarının alınması." }
    ],
    faq: [
      { q: "Kanada'da dil okulu okurken çalışabilir miyim?", a: "Hayır, sadece dil eğitimi alan öğrencilerin yasal çalışma izni yoktur; ancak dil+kolej paketlerinde kolej aşamasında çalışma izni başlar." }
    ],
    universities: [
      {
        name: "Kaplan International - Canada",
        slug: "kaplan-canada",
        detailedDescription: "Toronto ve Vancouver'da, Kanada'nın en yaşanabilir şehirlerinin kalbinde premium dil eğitimi.",
        highlights: ["Merkezi Lokasyonlar", "K+ Öğrenme Teknolojisi", "Zengin Sosyal Aktiviteler"],
        departments: ["Genel İngilizce", "IELTS Hazırlık", "Akademik Sömestir"]
      },
      {
        name: "ILSC Language Schools - Canada",
        slug: "ilsc-canada",
        detailedDescription: "Öğrencilerin kendi derslerini seçebildiği esnek müfredatı ve geniş sosyal aktivite ağıyla Kanada'nın lider okulu.",
        highlights: ["Kişiselleştirilmiş Müfredat", "Pathway Uzmanlığı", "Çok Kültürlü Atmosfer"],
        departments: ["Seçmeli Dil Dersleri", "İş İngilizcesi", "Fransızca (Montreal)"]
      },
      {
        name: "EC English - Canada",
        slug: "ec-canada",
        detailedDescription: "Toronto, Vancouver ve Montreal'de modern kampüsleri ile global eğitim standartlarını sunan seçkin kurum.",
        highlights: ["Yenilikçi Sınıf Tasarımı", "Yüksek Öğrenci Memnuniyeti", "Pathway Desteği"],
        departments: ["Yoğun İngilizce", "Akademik Hazırlık", "Sınav Hazırlık"]
      },
      {
        name: "St Giles - Vancouver",
        slug: "st-giles-vancouver",
        detailedDescription: "Kanada'nın en güzel şehirlerinden birinde, butik ve yüksek kaliteli eğitim arayanlar için ideal.",
        highlights: ["Butik Okul Ortamı", "Kişiye Özel İlgi", "Harika Şehir Konumu"],
        departments: ["Genel İngilizce", "Platin Kurslar", "Öğretmen Eğitimi"]
      }
    ]
  },
  avustralya: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Avustralya: Eğitim ve Kariyerin Zirvesi</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium">Dünyanın en yüksek yaşam kalitesine sahip ülkelerinden biri olan Avustralya, hem dil öğrenip hem de yasal olarak çalışmak isteyenlerin bir numaralı tercihidir.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Yasal Çalışma İzni</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Avustralya'da dil eğitimi alan tüm öğrenciler, haftalık 24 saat (yeni düzenleme ile) yasal çalışma iznine sahiptir.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Eğitim Alırken Para Kazanma Şansı</li>
                  <li>• Yüksek Asgari Ücret Avantajı</li>
                  <li>• Global İş Deneyimi</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Eşsiz Doğa ve İklim</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Sörf sahilleri, egzotik doğası ve modern şehirleriyle hayatınızın macerasına hazır olun.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Sydney, Melbourne, Brisbane Seçenekleri</li>
                  <li>• Yıl Boyu Ilıman İklim</li>
                  <li>• Dünyanın En Mutlu İnsanları</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "Çalışma ve Eğitim", desc: "Eğitim maliyetlerini çıkarabileceğiniz ve birikim yapabileceğiniz yasal çalışma hakkı." },
      { title: "Yüksek Eğitim Kalitesi", desc: "Dünya sıralamasında üst sıralarda yer alan üniversitelerin dil merkezleri." },
      { title: "Gelecek Planı", desc: "Eğitim sonrası yüksek lisans ve göçmenlik yolları için güçlü bir başlangıç." }
    ],
    process: [
      { title: "Süre ve Şehir Planlaması", desc: "Çalışma izni ve eğitim başarısı için ideal sürenin (genelde 24 hafta+) belirlenmesi." },
      { title: "Sağlık Sigortası (OSHC)", desc: "Avustralya'nın zorunlu tuttuğu öğrenci sağlık sigortasının organize edilmesi." }
    ],
    faq: [
      { q: "Avustralya'da ne kadar kazanabilirim?", a: "Saatlik asgari ücret yaklaşık 23.23 AUD civarındadır, bu da yaşam masraflarınızı rahatlıkla karşılamanızı sağlar." }
    ],
    universities: [
      {
        name: "Kaplan International - Australia",
        slug: "kaplan-australia",
        detailedDescription: "Sydney, Melbourne, Brisbane ve Perth'de, Avustralya'nın en iyi lokasyonlarında premium eğitim.",
        highlights: ["İş Bulma Desteği", "K+ Öğrenme Sistemi", "Modern Tesisler"],
        departments: ["Genel İngilizce", "IELTS Hazırlık", "İş İngilizcesi"]
      },
      {
        name: "ILSC Language Schools - Australia",
        slug: "ilsc-australia",
        detailedDescription: "Avustralya genelindeki geniş kampüs ağı ve esnek ders seçimleriyle öğrencilerin favorisi.",
        highlights: ["Esnek Müfredat", "Barista ve Kafe Kursları", "Güçlü Pathway Ağı"],
        departments: ["İş İngilizcesi", "Sınav Hazırlık", "Kreatif Dil Kursları"]
      },
      {
        name: "EC English - Australia",
        slug: "ec-australia",
        detailedDescription: "Modern ve enerjik kampüsleri ile Avustralya'da dil öğrenimini bir keyfe dönüştürüyor.",
        highlights: ["Dinamik Sosyal Program", "Ücretsiz Dil Atölyeleri", "Pathway Ortaklıkları"],
        departments: ["Yoğun İngilizce", "Akademik Amaçlı İngilizce", "Şehirde İngilizce"]
      }
    ]
  },
  almanya: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Almanya: Almancanın Kalbine Yolculuk</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium">Dünyanın en güçlü ekonomilerinden birinin kapısını aralayın. Almanya'da dil eğitimi, sadece bir dil öğrenmek değil, aynı zamanda kariyer ve eğitim dünyasında devasa bir avantaj elde etmektir.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akademik Hazırlık</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Alman üniversitelerinde ücretsiz eğitim hedefleyenler için TestDaF veya Goethe sertifikası odaklı yoğun hazırlık kursları mevcuttur.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Üniversite Onaylı Dil Okulları</li>
                  <li>• Şartlı Kabul (Conditional Admission) Desteği</li>
                  <li>• Disiplinli ve Sistematik Eğitim Anlayışı</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Kültür ve Teknoloji</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Berlin'in sanat dolu sokaklarından Münih'in teknoloji üslerine kadar, Almancayı en modern haliyle yaşayarak öğrenin.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Berlin, Frankfurt, Münih Seçenekleri</li>
                  <li>• Sanayi ve Mühendislik Şehirlerinde Network</li>
                  <li>• Avrupa'nın Merkezinde Konum Avantajı</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "Üniversiteye Geçiş", desc: "Almancayı yerinde öğrenerek Alman üniversitelerinin kapısını aralayın." },
      { title: "Kariyer Gücü", desc: "İş dünyasında İngilizceden sonra en çok aranan 2. dili uzmanından öğrenin." },
      { title: "Disiplinli Müfredat", desc: "Goethe standartlarında, sonuç odaklı ve hızlı ilerleyen eğitim sistemleri." }
    ],
    process: [
      { title: "Seviye Belirleme", desc: "Mevcut Almanca bilginizin analizi ve hedef sertifikaya göre planlama." },
      { title: "Şartlı Kabul (Opsiyonel)", desc: "Üniversite eğitimi düşünenler için ön kayıt işlemlerinin organize edilmesi." },
      { title: "Kayıt ve Finansal Hazırlık", desc: "Almanya'da eğitim için gerekli olan finansal ve idari dosyanın hazırlanması." }
    ],
    faq: [
      { q: "Almanya dil okulu eğitimi sırasında çalışabilir miyim?", a: "Standart dil okulu programları genellikle çalışma izni vermez; ancak üniversite hazırlık (şartlı kabul) süreçlerinde belirli çalışma hakları doğabilir." },
      { q: "Ne kadar sürede Almanca öğrenebilirim?", a: "Sıfırdan B2/C1 seviyesine gelmek, yoğun programlarla genellikle 9-12 ay sürmektedir." }
    ],
    universities: [
      {
        name: "DID Deutsch-Institut - Berlin",
        slug: "did-berlin",
        detailedDescription: "Almanya'nın en köklü dil okulu. Üniversite hazırlık ve TestDaF sınav başarısında rakipsiz.",
        highlights: ["Üniversite Yerleştirme Servisi", "Resmi TestDaF Merkezi", "Yüksek Akademik Disiplin"],
        departments: ["Yoğun Almanca", "Üniversite Hazırlık", "İş Almancası"]
      },
      {
        name: "Kaplan (Alpadia) - Germany",
        slug: "alpadia-germany",
        detailedDescription: "Kaplan grubunun bir parçası olan Alpadia, Berlin ve Freiburg'da modern ve interaktif Almanca eğitimi sunar.",
        highlights: ["Kaplan Eğitim Standartları", "Modern ve Şık Kampüsler", "Zengin Aktivite Programı"],
        departments: ["Genel Almanca", "Sınav Hazırlık (TELC)", "Yaz Kampları"]
      },
      {
        name: "Eurocentres - Germany",
        slug: "eurocentres-germany",
        detailedDescription: "Global eğitim standartlarını Alman disipliniyle buluşturan, öğrenci odaklı prestijli bir kurum.",
        highlights: ["Kişiselleştirilmiş Öğrenme Planı", "Geniş Uluslararası Karma", "Modern Altyapı"],
        departments: ["Akademik Almanca", "İş Almancası", "Kültür Programları"]
      }
    ]
  },
  hollanda: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Hollanda: İngilizce Konuşan Avrupa</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium">Hollanda, ana dili İngilizce olmadığı halde İngilizce yeterliliğinin en yüksek olduğu ülkelerden biridir. Akademik ve profesyonel gelişim için Avrupa'nın en ideal merkezidir.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Uluslararası Akademik Ortam</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Amsterdam ve Rotterdam gibi şehirlerde İngilizce eğitimi alırken, Avrupa'nın en prestijli üniversitelerinin havasını soluyun.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Yüksek İngilizce Hakimiyeti</li>
                  <li>• Master Öncesi Dil Hazırlık</li>
                  <li>• Global Şirketlerin Avrupa Üssü</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Kültür ve Entegrasyon</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Bisiklet kültürü, tarihi kanalları ve özgürlükçü yapısıyla Hollanda'da dil öğrenmek bir yaşam tarzı değişimidir.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• Amsterdam ve Utrecht Seçenekleri</li>
                  <li>• Kolay Ulaşım ve Konaklama</li>
                  <li>• Multikültürel Sosyal Yapı</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "İngilizce Hakimiyeti", desc: "Sokaktaki herkesin İngilizce bildiği bir ortamda dili pratik etme şansı." },
      { title: "Kariyer Basamağı", desc: "Eğitim sonrası Avrupa'daki iş fırsatları için stratejik bir lokasyon." },
      { title: "Merkezi Konum", desc: "Hızlı tren ağları ile tüm Avrupa'yı keşfetme imkanı." }
    ],
    process: [
      { title: "Program Analizi", desc: "IELTS hazırlık veya akademik İngilizce programlarının değerlendirilmesi." },
      { title: "Konaklama Planı", desc: "Öğrenci evleri ve paylaşımlı daire seçeneklerinin organize edilmesi." }
    ],
    faq: [
      { q: "Hollanda'da dil okulu okurken çalışabilir miyim?", a: "Uzun dönem programlarda belirli şartlar dahilinde çalışma izni imkanları bulunmaktadır." },
      { q: "Hollanda pahalı mı?", a: "Yaşam maliyetleri İngiltere'ye benzerdir; ancak ulaşım ve yemek konularında ekonomik alternatifler boldur." }
    ],
    universities: [
      {
        name: "Kaplan International - Amsterdam",
        slug: "kaplan-amsterdam",
        detailedDescription: "Amsterdam'ın kalbinde, modern ve akademik odaklı bir eğitim sunan premium kurum. Hollanda'nın yüksek İngilizce hakimiyeti ile birleşen bu eğitim, size Avrupa'nın kapılarını açar.",
        highlights: ["Şehir Merkezi Lokasyonu", "Akademik Yol Haritası", "K+ Eğitim Sistemi"],
        departments: ["Genel İngilizce", "IELTS Hazırlık", "İş İngilizcesi"]
      },
      {
        name: "EC English - Amsterdam (30+)",
        slug: "ec-amsterdam",
        detailedDescription: "Özellikle profesyoneller ve 30 yaş üstü öğrenciler için tasarlanmış, Hollanda'nın iş dünyasıyla iç içe bir eğitim deneyimi.",
        highlights: ["Profesyonel Network", "Modern Sınıf Tasarımı", "Merkezi Lokasyon"],
        departments: ["İş İngilizcesi", "Yoğun Kurslar", "Executive Programlar"]
      }
    ]
  },
  ispanya: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">İspanya: İspanyolcanın Tutkusu</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium">Dünyanın en çok konuşulan dillerinden birini, doğduğu topraklarda öğrenin. İspanya, sıcak iklimi ve enerjik kültürüyle dil eğitimini bir festivale dönüştürür.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Akdeniz Yaşamı</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Barselona ve Madrid gibi dünya şehirlerinde, dilinizi geliştirirken hayatın her anından keyif alın.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• Cervantes Enstitüsü Onaylı Okullar</li>
                  <li>• Kültürel Atölyeler (Dans, Yemek, Sanat)</li>
                  <li>• Sosyal ve Dışa Dönük Yaşam</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Global Dil Gücü</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">500 milyondan fazla insanın konuştuğu İspanyolca ile Latin Amerika'dan ABD'ye kadar devasa bir coğrafyada kapıları açın.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• DELE Hazırlık Kursları</li>
                  <li>• İş İspanyolcası Uzmanlığı</li>
                  <li>• Üniversite Hazırlık Programları</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "Hızlı Öğrenme", desc: "Sıcakkanlı İspanyollarla her an pratik yaparak dili doğal akışında öğrenme şansı." },
      { title: "Düşük Yaşam Maliyeti", desc: "Diğer Avrupa ülkelerine göre daha ekonomik yemek ve sosyal yaşam masrafları." },
      { title: "Kültürel Zenginlik", desc: "Tarihi miras, sanat müzeleri ve eşsiz bir gastronomi deneyimi." }
    ],
    process: [
      { title: "Şehir ve Okul Seçimi", desc: "Karakterinize uygun İspanyol şehrinin ve akredite okulların belirlenmesi." },
      { title: "NIE Başvurusu", desc: "İspanya'da oturum ve yasal işlemler için gerekli olan kimlik numarası süreci." }
    ],
    faq: [
      { q: "İspanya'da dil okulu okurken çalışabilir miyim?", a: "Haftalık 30 saate kadar çalışma izni veren yeni düzenlemeler mevcuttur (belirli akademik şartlara bağlı)." },
      { q: "Hangi şehri seçmeliyim?", a: "Kozmopolit bir hava için Madrid, deniz ve sanat için Barselona, daha geleneksel bir İspanya için Valencia idealdir." }
    ],
    universities: [
      {
        name: "Enforex - Barcelona",
        slug: "enforex-barcelona",
        detailedDescription: "İspanya'nın en büyük dil okulu ağının amiral gemisi. Modern binası ve geniş öğrenci kitlesiyle dikkat çeker.",
        highlights: ["Geniş Sosyal Programlar", "DELE Sınav Merkezi", "Çok Kültürlü Ortam"],
        departments: ["Genel İspanyolca", "Kültür ve Dil", "Üniversite Hazırlık"]
      },
      {
        name: "Don Quijote - Madrid",
        slug: "don-quijote-madrid",
        detailedDescription: "Madrid'in tarihi merkezinde, butik ve yüksek kaliteli eğitim sunan prestijli bir kurum.",
        highlights: ["Kişiye Özel İlgi", "Tarihi Konum", "Yüksek Eğitim Kalitesi"],
        departments: ["Yoğun İspanyolca", "İş İspanyolcası", "DELE Hazırlık"]
      }
    ]
  },
  fransa: {
    overview: `
      <h2 class="text-4xl font-serif font-bold text-navy mb-8 italic underline decoration-secondary underline-offset-8">Fransa: Sanatın ve Diplomasinin Dili</h2>
      <p class="mb-8 text-lg leading-relaxed text-zinc-600 font-medium">Fransızca öğrenmek, sadece bir dil bilmek değil, dünya çapında geçerli bir prestij kazanmaktır. Paris'ten Nice sahillerine kadar Fransa, dil eğitimini bir yaşam sanatı (Art de Vivre) olarak sunar.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
              <h3 class="text-xl font-serif font-bold mb-4 text-navy italic">Kültürel Immersion</h3>
              <p class="text-sm text-zinc-500 leading-relaxed italic mb-4">Fransız mutfağını, modasını ve tarihini yerinde deneyimleyerek dili tüm derinliğiyle öğrenin.</p>
              <ul class="space-y-2 text-sm text-zinc-500 italic">
                  <li>• FLE Akreditasyonlu Okullar</li>
                  <li>• Gastronomi ve Moda Kurslarıyla Kombin</li>
                  <li>• Tarihi ve Sanatsal Geziler</li>
              </ul>
          </div>
          <div class="p-8 rounded-[2.5rem] bg-navy text-white shadow-premium">
              <h3 class="text-xl font-serif font-bold mb-4 italic text-gold">Akademik ve Kariyer</h3>
              <p class="text-sm text-zinc-300 leading-relaxed italic mb-4">Fransız üniversitelerinde eğitim almayı hedefleyenler için yoğun DELF/DALF hazırlık programları.</p>
              <ul class="space-y-2 text-sm text-zinc-300 italic">
                  <li>• DELF/DALF Sınav Hazırlığı</li>
                  <li>• Uluslararası Kurumlarda Fransızca Avantajı</li>
                  <li>• Akademik Yazım ve Sunum Kursları</li>
              </ul>
          </div>
      </div>
    `,
    advantages: [
      { title: "Küresel Geçerlilik", desc: "5 kıtada konuşulan ve diplomasi dili olan Fransızca ile kariyerinizde fark yaratın." },
      { title: "Zengin Şehir Seçenekleri", desc: "Paris'in büyüsünden, Lyon'un gastronomi dünyasına, Nice'in güneşli sahillerine kadar geniş yelpaze." },
      { title: "Eğitim Sonrası Başarı", desc: "Fransız yüksek öğretim sistemine geçiş için gerekli olan dil yeterliliğini yerinde kazanın." }
    ],
    process: [
      { title: "Hedef Belirleme", desc: "Akademik, profesyonel veya hobi odaklı hedeflerinize göre program seçimi." },
      { title: "Campus France Başvurusu", desc: "Fransa'nın özel akademik başvuru süreci (Campus France) için profesyonel dosya hazırlığı." },
      { title: "Konaklama Organizasyonu", desc: "Aile yanı, yurt veya paylaşımlı daire seçeneklerinin ayarlanması." }
    ],
    faq: [
      { q: "Fransa'da dil eğitimi alırken çalışabilir miyim?", a: "Uzun dönem programlarda kayıtlı öğrenciler için yıllık belirli saat sınırı dahilinde çalışma izni mevcuttur." },
      { q: "DELF sınavına girmem şart mı?", a: "Şart değildir; ancak Fransız üniversitelerine başvurmayı planlıyorsanız resmi sertifika gereklidir." }
    ],
    universities: [
      {
        name: "France Langue - Paris",
        slug: "france-langue-paris",
        detailedDescription: "Paris'in ikonik semtlerinde, Fransız kültürünü ve dilini en iyi şekilde yansıtan modern bir dil okulu.",
        highlights: ["Merkezi Konumlar", "Fransızca ve Gastronomi", "Yüksek Başarı Oranı"],
        departments: ["Genel Fransızca", "DELF/DALF Hazırlık", "Moda ve Dil"]
      },
      {
        name: "EC English - French Courses",
        slug: "ec-french",
        detailedDescription: "EC'nin küresel standartlarını Fransızca eğitimine taşıyan, modern ve yenilikçi yaklaşımlı merkezler.",
        highlights: ["Interaktif Eğitim", "30+ Yaş Programları", "Uluslararası Ortam"],
        departments: ["Yoğun Fransızca", "İş Fransızcası", "Şehirde Fransızca"]
      },
      {
        name: "Kaplan International - French",
        slug: "kaplan-french",
        detailedDescription: "Kaplan'ın akademik derinliğini Fransızca öğrenimine taşıyan özel partnerlikler ve programlar.",
        highlights: ["Yüksek Eğitim Kalitesi", "Akademik Takip Sistemi", "Kültürel Entegrasyon"],
        departments: ["Genel Fransızca", "Üniversite Hazırlık", "Sınav Hazırlık"]
      }
    ]
  }
};
