
export interface FAQItem {
    question: string;
    answer: string;
}

export interface ServiceExtra {
    faqs: FAQItem[];
    cta: {
        title: string;
        description: string;
        buttonText: string;
    };
}

export const serviceExtras: Record<string, ServiceExtra> = {
    "yurtdisi-dil-okullari": {
        faqs: [
            {
                question: "Dil kursuna her yaşta gidilebilir mi?",
                answer: "Evet! Dil okullarında her yaş grubuna uygun sınıflar bulunur. Bazı okullar 30+, 40+ veya 50+ yaş grupları için özel 'Executive' veya 'Leisure' sınıfları açmaktadır."
            },
            {
                question: "Yurt dışında dil okuluna giderken çalışma iznim olur mu?",
                answer: "İrlanda (25 hafta üzeri), Avustralya ve Dubai gibi belirli ülkelerde dil eğitimi alırken yasal çalışma izni hakkınız bulunmaktadır. Detaylar için danışmanlarımıza ulaşın."
            },
            {
                question: "Konaklamada hangi seçenekler daha avantajlı?",
                answer: "Kültür daldırması ve daha ekonomik olması nedeniyle 'Aile Yanı' (Homestay) popülerdir. Daha bağımsız olmak isteyenler için öğrenci rezidansları ve paylaşımlı daire opsiyonları da mevcuttur."
            },
            {
                question: "Yurtdışı Dil Okulu Seçiminde Nelere Dikkat Etmeliyim?",
                answer: "Seçtiğiniz dil okulunun bulunduğu ülke, şehir ve sunduğu programların (Genel, İş, Akademik) sizin hedeflerinize uygun olup olmadığına dikkat etmelisiniz. Mentor Career danışmanları okulun kalitesi, konumu ve sunduğu sosyal imkanlar konusunda size en iyi rehberliği sağlar."
            },
            {
                question: "Dosya Hazırlığı Süreci Nasıl İlerler?",
                answer: "Her ülkenin başvuru kriterleri farklıdır. Mentor Career olarak, niyet mektubunuzun yazılmasından dosya hazırlığına ve mülakat simülasyonuna kadar tüm süreci sizin adınıza profesyonelce yönetiyoruz."
            }
        ],
        cta: {
            title: "Sınırlı Kontenjanlar",
            description: "Dünyanın Seni Bekliyor! Daha fazla beklemeyin. Bugün atacağınız bir adım, tüm hayatınızı değiştirebilir. Uzman kadromuzla yanınızdayız.",
            buttonText: "ÜCRETSİZ RANDEVU AL"
        }
    },
    "yurtdisi-universite": {
        faqs: [
            { question: "Yurtdışı Üniversite Yatay Geçiş Nasıl Olur?", answer: "Türkiye'deki ya da başka bir ülkedeki üniversite eğitiminizin bir kısmını tamamladıktan sonra, aldığınız dersleri saydırarak yurtdışındaki bir üniversiteye geçiş yapabilirsiniz. Ancak kabul tamamen karşı üniversitenin inisiyatifindedir." },
            { question: "Yurtdışında üniversite okumak için ne gerekli?", answer: "Temel şartlar lise diploması (veya mezuniyet durum belgesi) ve not dökümü (transkript). Ek olarak İngilizce yeterliliğiniz (IELTS/TOEFL) ve niyet mektubunuz gerekmektedir." },
            { question: "Yurtdışında üniversite okumak için hangi sınavlara girmek gerekir?", answer: "Ülkeye göre değişmekle birlikte genellikle IELTS, TOEFL, SAT veya ACT gibi dil ve akademik yeterlilik sınavları istenir." },
            { question: "Yurtdışında üniversite okumak pahalı mı?", answer: "Avrupa'daki birçok ülkede eğitim ücretsiz veya Türkiye'deki vakıf üniversitelerinden daha ekonomiktir. Ayrıca Amerika ve Kanada'da çeşitli burs imkanları bulunmaktadır." },

            { question: "Yurtdışında üniversite okurken çalışma izni alabilir miyim?", answer: "Evet, birçok ülke uluslararası öğrencilere eğitim süresince yarı zamanlı (haftada 20 saat) ve tatillerde tam zamanlı çalışma hakkı tanımaktadır." },
            { question: "Mezun olduktan sonra yurtdışında kalabilir miyim?", answer: "Amerika'da OPT, İngiltere'de Graduate Route, Kanada'da PGWP gibi programlar ile mezuniyet sonrası 1 ila 3 yıl arasında yasal çalışma ve kalma hakkı elde edebilirsiniz." },
            { question: "Hangi ülkelerde sınavsız üniversite var?", answer: "İngiltere, İrlanda, Kanada, Amerika, Polonya, Macaristan gibi ülkeler Türkiye'deki üniversite sınavı (YKS) şartı aramaksızın doğrudan lise diploması ile öğrenci kabul etmektedir." }
        ],
        cta: {
            title: "Akademik Başarıya Odaklanın",
            description: "Hayalinizdeki üniversiteye giden yolda yanınızdayız. Uzman danışmanlarımızla eğitiminizi planlayın.",
            buttonText: "ÜCRETSİZ DANIŞMANLIK AL"
        }
    },
    "yurtdisi-yuksek-lisans": {
        faqs: [
            {
                question: "Yüksek lisans için iş tecrübesi şart mı?",
                answer: "Birçok program için şart olmasa da özellikle MBA ve bazı profesyonel yüksek lisans programları 2-3 yıl iş tecrübesi arayabilmektedir."
            }
        ],
        cta: {
            title: "Kariyerinizde Devrim Yapın",
            description: "Küresel ölçekte tanınan bir diploma ile kariyerinizi bir üst seviyeye taşıyın.",
            buttonText: "DANIŞMANA DANIŞIN"
        }
    },
    "yurtdisi-lise": {
        faqs: [
            { question: "Online yurtdışı lise eğitimi var mı?", answer: "Evet, bazı ülkelerde online lise programları bulunmaktadır. Ancak kampüs deneyimi, dil gelişimi ve kültürel adaptasyon açısından yüz yüze eğitim çok daha avantajlıdır." },
            { question: "Liseyi yurtdışında okumak için ne yapmalıyım?", answer: "Öncelikle hedef ülke ve program belirlenir. Ardından okul başvurusu, seviye tespit sınavı, mülakat ve kabul süreci tamamlanır." },
            { question: "Yurtdışında lise okumak için ne gerekli?", answer: "Genel olarak öğrenciden transkript (not dökümü), öğrenci belgesi, referans mektubu ve pasaport talep edilir." },
            { question: "Yurtdışında lise okumak için ne kadar para lazım?", answer: "Yıllık maliyetler ülkeye göre 30.000 CAD ile 180.000 CHF arasında değişmektedir. Burslarla maliyetler düşürülebilir." },
            { question: "Yurtdışında lise eğitimi kaç yıldır?", answer: "Genellikle 4 yıldır, ancak geçiş yapılan sınıfa (10, 11 veya 12) göre süre değişebilir." },
            { question: "Çocuğum İngilizce bilmiyor, yine de okuyabilir mi?", answer: "Evet, çoğu lise İngilizce seviyesi yeterli olmayanlar için ESL / hazırlık programları sunar." },
            { question: "10. veya 11. sınıftan yurtdışına geçiş yapılır mı?", answer: "Evet, yapılabilir. Birçok okul ara sınıflardan öğrenci kabul etmektedir." },
            { question: "IB mi A Level mı daha iyi?", answer: "IB çok yönlü bir yapı sunarken, A Level alan uzmanlaşması odaklıdır. Hedef üniversiteye göre seçim yapılmalıdır." },

        ],
        cta: {
            title: "Geleceğiniz İçin Bugün Adım Atın",
            description: "Çocuğunuzun eğitim hayatında global bir fark yaratmak için uzman danışmanlarımızla hemen iletişime geçin.",
            buttonText: "ÜCRETSİZ DANIŞMANLIK AL"
        }
    },
    "yurtdisi-yaz-okullari": {
        faqs: [
            {
                question: "Yaz okulları hangi yaş gruplarına hitap eder?",
                answer: "Genellikle 7-17 yaş arası çocuk ve gençler için tasarlanmıştır. Ancak bazı merkezlerde 18+ yetişkin yaz programları da mevcuttur."
            }
        ],
        cta: {
            title: "Unutulmaz Bir Yaz Geçirin",
            description: "Eğlence ve eğitimi birleştiren yaz kampı programlarımızla çocuklarınıza dünyayı tanıtın.",
            buttonText: "BİLGİ ALIN"
        }
    }
};
