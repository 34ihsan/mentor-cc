export interface ExamData {
    id: string;
    title: string;
    shortTitle: string;
    description: string;
    heroImage: string;
    overview: string;
    format: {
        duration: string;
        sections: {
            name: string;
            desc: string;
            time?: string;
        }[];
    };
    scoring: string;
    validity: string;
    cost: string;
    dates: string;
    whyTake: string[];
}

export const exams: Record<string, ExamData> = {
    'toefl': {
        id: 'toefl',
        title: 'TOEFL iBT (Test of English as a Foreign Language)',
        shortTitle: 'TOEFL',
        description: 'Özellikle ABD üniversitelerinde yaygın olarak kabul edilen akademik İngilizce sınavıdır.',
        heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
        overview: 'TOEFL iBT, Educational Testing Service (ETS) tarafından uygulanmaktadır. Akademik odaklıdır ve bilgisayar tabanlı yapısı sayesinde dijital sınav formatına alışkın adaylar için avantaj sağlayabilir.',
        format: {
            duration: '2 saat',
            sections: [
                { name: 'Reading', desc: 'Akademik metinleri okuma ve anlama.', time: '35 dk' },
                { name: 'Listening', desc: 'Ders ve kampüs konuşmalarını anlama.', time: '36 dk' },
                { name: 'Speaking', desc: 'Bilgisayar üzerinden kayıt yapılarak sesli yanıt.', time: '16 dk' },
                { name: 'Writing', desc: 'Akademik Discussion ve Integrated görevleri.', time: '29 dk' }
            ]
        },
        scoring: 'Toplam 120 puan üzerinden değerlendirilir.',
        validity: '2 Yıl',
        cost: 'Yaklaşık 157 USD',
        dates: 'Haftada bir veya daha sık',
        whyTake: [
            'ABD’de lisans veya yüksek lisans başvurusu yapacak adaylar için altın standarttır.',
            'Akademik odaklı İngilizce yeterliliğini belgelemek isteyenler için idealdir.',
            'Dünya çapında 12.000’den fazla kurum tarafından kabul edilir.'
        ]
    },
    'ielts': {
        id: 'ielts',
        title: 'IELTS (International English Language Testing System)',
        shortTitle: 'IELTS',
        description: 'İngiltere, Kanada, Avustralya ve Yeni Zelanda başta olmak üzere göçmenlik ve eğitim için en popüler sınavdır.',
        heroImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop',
        overview: 'IELTS, dünya genelinde en yaygın kabul gören İngilizce yeterlilik sınavlarından biridir. Sınav; British Council, IDP Education ve Cambridge Assessment English iş birliğiyle düzenlenmektedir. Özellikle konuşma bölümünün birebir yapılması nedeniyle iletişim becerilerini doğrudan ölçen bir sınavdır.',
        format: {
            duration: '2 saat 45 dakika',
            sections: [
                { name: 'Listening', desc: '4 bölüm, 40 soru. Çeşitli aksanlarda konuşmalar.', time: '30 dk' },
                { name: 'Reading', desc: '3 uzun metin, 40 soru.', time: '60 dk' },
                { name: 'Writing', desc: '2 görev (Grafik yorumlama/Mektup + Kompozisyon)', time: '60 dk' },
                { name: 'Speaking', desc: 'Sınav görevlisi ile yüz yüze mülakat.', time: '11-14 dk' }
            ]
        },
        scoring: '0-9 arası band sistemi uygulanır.',
        validity: '2 Yıl',
        cost: 'Yaklaşık 4500-5000 TL',
        dates: 'Ayda 4-5 kez',
        whyTake: [
            'İngiltere, Avustralya, Kanada ve Avrupa’da eğitim almak isteyenler için birincil tercihtir.',
            'Göçmenlik veya kayıt başvurusu (UKVI) için zorunlu olabilir.',
            'Kağıt veya bilgisayar üzerinden alınabilir.'
        ]
    },
    'sat': {
        id: 'sat',
        title: 'SAT (Scholastic Aptitude Test)',
        shortTitle: 'SAT',
        description: 'ABD’de lisans eğitimi başvurularında kullanılan standart bir sınavdır.',
        heroImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
        overview: 'SAT, College Board tarafından düzenlenmektedir. Birçok üniversite test-optional politika uygulasa da yüksek SAT puanı, özellikle burs başvurularında önemli avantaj sağlayabilir.',
        format: {
            duration: '2 saat 14 dakika',
            sections: [
                { name: 'Reading & Writing', desc: 'Kısa metinler üzerinden analiz ve dil bilgisi.', time: '64 dk' },
                { name: 'Math', desc: 'Cebir, problem çözme ve veri analizi.', time: '70 dk' }
            ]
        },
        scoring: '400–1600 puan aralığındadır.',
        validity: '5 Yıl (Genelde kabul edilen)',
        cost: 'Yaklaşık 60-100 USD (+ Uluslararası ücretler)',
        dates: 'Yılda 7 kez',
        whyTake: [
            'ABD’de lisans eğitimi hedefleyen öğrenciler için en önemli sınavdır.',
            'Akademik başarı ve analitik düşünme becerilerini göstermek isteyen adaylar içindir.',
            'Burs başvurularında rekabet avantajı sağlar.'
        ]
    },
    'pte': {
        id: 'pte',
        title: 'PTE Academic (Pearson Test of English)',
        shortTitle: 'PTE Academic',
        description: 'Tamamen bilgisayar tabanlı ve yapay zeka destekli değerlendirme sistemine sahip bir İngilizce yeterlilik sınavıdır.',
        heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
        overview: 'PTE Academic, Pearson PLC tarafından uygulanmaktadır. Sonuçlar genellikle birkaç gün içinde açıklandığı için acil başvuru yapacak adaylar için büyük avantajdır.',
        format: {
            duration: '2 saat 15 dakika',
            sections: [
                { name: 'Speaking & Writing', desc: 'Entegre dil becerileri testi.', time: '54-67 dk' },
                { name: 'Reading', desc: 'Okuma ve boşluk doldurma soruları.', time: '29-30 dk' },
                { name: 'Listening', desc: 'Dikte ve dinleme odaklı sorular.', time: '30-43 dk' }
            ]
        },
        scoring: '10–90 arası puanlanır.',
        validity: '2 Yıl',
        cost: 'Yaklaşık 190-210 USD',
        dates: 'Yıl boyunca neredeyse her gün',
        whyTake: [
            'Hızlı sonuç almak isteyen (48-72 saatte) adaylar içindir.',
            'İngiltere ve Avustralya kayıt/eğitim başvurularında %100 kabul edilir.',
            'Yapay zeka tabanlı puanlama sayesinde daha objektif sonuçlar sunar.'
        ]
    },
    'gre': {
        id: 'gre',
        title: 'GRE (Graduate Record Examination)',
        shortTitle: 'GRE',
        description: 'Yüksek lisans ve doktora programlarına başvuruda kullanılan uluslararası bir sınavdır.',
        heroImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2070&auto=format&fit=crop',
        overview: 'GRE, Educational Testing Service (ETS) tarafından düzenlenmektedir. Mühendislikten sosyal bilimlere kadar geniş bir yelpazede akademik kariyer planlayanlar için tasarlanmıştır.',
        format: {
            duration: '1 saat 58 dakika',
            sections: [
                { name: 'Verbal Reasoning', desc: 'Akademik kelime ve okuma becerileri.', time: '41 dk' },
                { name: 'Quantitative Reasoning', desc: 'Sayısal akıl yürütme ve veri analitiği.', time: '47 dk' },
                { name: 'Analytical Writing', desc: 'Eleştirel düşünce ve akademik yazım.', time: '30 dk' }
            ]
        },
        scoring: 'Verbal: 130–170, Math: 130–170, Writing: 0–6.',
        validity: '5 Yıl',
        cost: 'Yaklaşık 220 USD',
        dates: 'Yıl boyunca her ay',
        whyTake: [
            'ABD ve Avrupa’da yüksek lisans/doktora yapmak isteyenler içindir.',
            'Mühendislik, fen bilimleri ve sosyal bilimler alanında kariyer hedeflerine güç katar.',
            'Sayısal bölümlerde Quantitative skoru büyük önem taşır.'
        ]
    },
    'gmat': {
        id: 'gmat',
        title: 'GMAT Focus Edition',
        shortTitle: 'GMAT',
        description: 'İşletme ve MBA programlarına başvuran adaylar için tasarlanmış bir sınavdır.',
        heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop',
        overview: 'GMAT, Graduate Management Admission Council (GMAC) tarafından uygulanmaktadır. focus Edition ile birlikte daha analitik ve iş dünyasına odaklı bir yapıya bürünmüştür.',
        format: {
            duration: '2 saat 15 dakika',
            sections: [
                { name: 'Quantitative', desc: 'Veri yeterliliği ve problem çözme.', time: '45 dk' },
                { name: 'Verbal', desc: 'Eleştirel akıl yürütme ve okuma anlama.', time: '45 dk' },
                { name: 'Data Insights', desc: 'Grafik ve tablo analizi, veri sentezi.', time: '45 dk' }
            ]
        },
        scoring: '205–805 aralığındadır.',
        validity: '5 Yıl',
        cost: 'Yaklaşık 275 USD',
        dates: 'Yıl boyunca her ay',
        whyTake: [
            'MBA ve işletme yüksek lisans programlarına başvuran adaylar içindir.',
            'Yönetim, finans ve strateji alanında kariyer hedefleyenler için kritiktir.',
            'Üst düzey işletme okullarında birincil değerlendirme kriteridir.'
        ]
    },
    'cambridge': {
        id: 'cambridge',
        title: 'Cambridge English Sınavları (B2 First, C1 Advanced, C2 Proficiency)',
        shortTitle: 'Cambridge',
        description: 'Uluslararası geçerliliğe sahip ve süresiz geçerli sertifikalar sunan sınavlardır.',
        heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
        overview: 'Cambridge English sınavları, Cambridge Assessment English tarafından düzenlenmektedir. Diğer sınavların aksine sunulan sertifikaların geçerlilik süresi dolmaz.',
        format: {
            duration: 'Yaklaşık 3.5 - 4 saat',
            sections: [
                { name: 'Reading & Use of English', desc: 'Gramer ve kelime kullanım derinliği.', time: '90 dk' },
                { name: 'Writing', desc: 'Mektup, rapor ve essay yazımı.', time: '90 dk' },
                { name: 'Listening', desc: 'Akademik ve genel dinleme parçaları.', time: '40 dk' },
                { name: 'Speaking', desc: 'Başka bir aday ile eşleşerek mülakat.', time: '15 dk' }
            ]
        },
        scoring: 'Cambridge English Scale (160-230+).',
        validity: 'Ömür Boyu',
        cost: 'Sınava göre 200-250 USD',
        dates: 'Yılda belirli dönemlerde',
        whyTake: [
            'Sertifikaları ömür boyu (süresiz) geçerlidir.',
            'Avrupa’da güçlü akademik itibara ve kabul oranına sahiptir.',
            'Akademik ve profesyonel (iş dünyası) kullanım için uygundur.'
        ]
    }
};
