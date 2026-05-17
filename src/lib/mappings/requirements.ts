export const categoryRequirements: Record<string, { tr: string[]; en: string[]; de: string[] }> = {
    "LANGUAGE_SCHOOL": {
        tr: [
            "Pasaport Kopyası",
            "Sertifika veya Diploma (En son mezun olunan okul)",
            "Niyet Mektubu (Başvuru süreci için)",
            "Finansal Yeterlilik Belgeleri",
            "Okul Kayıt Formu"
        ],
        en: [
            "Passport Copy",
            "Certificate or Diploma (Last graduated school)",
            "Statement of Purpose (For application process)",
            "Financial Sufficiency Documents",
            "School Registration Form"
        ],
        de: [
            "Reisepass-Kopie",
            "Zertifikat oder Diplom (Zuletzt besuchte Schule)",
            "Absichtserklärung (Für den Bewerbungsprozess)",
            "Unterlagen zur finanziellen Leistungsfähigkeit",
            "Schulanmeldeformular"
        ]
    },
    "SUMMER_SCHOOL": {
        tr: [
            "Pasaport Kopyası",
            "Veli İzin Belgesi (18 yaş altı için)",
            "Sağlık ve Seyahat Sigortası",
            "Gerekli Dosya Hazırlığı",
            "Okul Kayıt ve Sağlık Beyan Formu"
        ],
        en: [
            "Passport Copy",
            "Parental Consent Form (For under 18s)",
            "Health and Travel Insurance",
            "Required Dossier Preparation",
            "School Registration and Health Declaration Form"
        ],
        de: [
            "Reisepass-Kopie",
            "Einverständniserklärung der Eltern (für unter 18-Jährige)",
            "Kranken- und Reiseversicherung",
            "Erforderliche Unterlagenvorbereitung",
            "Schulanmelde- und Gesundheitserklärungsformular"
        ]
    },
    "HIGH_SCHOOL": {
        tr: [
            "Son 3 Yılın Transkriptleri",
            "Öğretmen Referans Mektupları (İngilizce/Matematik)",
            "Dil Yeterlilik Kanıtı (ELTiS, IELTS veya Okul Sınavı)",
            "Müfretat Dışı Faaliyetler Listesi",
            "Pasaport ve Veli Muvafakatnamesi"
        ],
        en: [
            "Transcripts of the Last 3 Years",
            "Teacher Reference Letters (English/Math)",
            "Proof of Language Proficiency (ELTiS, IELTS, or School Exam)",
            "List of Extracurricular Activities",
            "Passport and Parental Consent"
        ],
        de: [
            "Zeugnisse der letzten 3 Jahre",
            "Referenzschreiben von Lehrern (Englisch/Mathematik)",
            "Nachweis von Sprachkenntnissen (ELTiS, IELTS oder Schulprüfung)",
            "Liste der außerschulischen Aktivitäten",
            "Reisepass und Einverständniserklärung der Eltern"
        ]
    },
    "UNIVERSITY": {
        tr: [
            "Lise Diploması ve Transkript",
            "Dil Yeterlilik Belgesi (IELTS 6.0+ / TOEFL 80+)",
            "Akademik Referans Mektubu (2 Adet)",
            "Niyet Mektubu (Statement of Purpose)",
            "CV / Özgeçmiş"
        ],
        en: [
            "High School Diploma and Transcript",
            "Language Proficiency Certificate (IELTS 6.0+ / TOEFL 80+)",
            "Academic Reference Letters (2 Pieces)",
            "Statement of Purpose",
            "CV / Resume"
        ],
        de: [
            "Abiturzeugnis und Notenübersicht",
            "Sprachnachweis (IELTS 6.0+ / TOEFL 80+)",
            "Akademische Referenzschreiben (2 Stück)",
            "Motivationsschreiben (Statement of Purpose)",
            "Lebenslauf / CV"
        ]
    },
    "MASTER": {
        tr: [
            "Lisans Diploması ve Transkript",
            "Dil Yeterlilik Belgesi (IELTS 6.5+ / TOEFL 90+)",
            "Akademik ve/veya Profesyonel Referanslar",
            "Niyet Mektubu (Statement of Purpose)",
            "Detaylı CV / Özgeçmiş",
            "Portfolyo (Sanat ve Mimarlık için)"
        ],
        en: [
            "Bachelor's Diploma and Transcript",
            "Language Proficiency Certificate (IELTS 6.5+ / TOEFL 90+)",
            "Academic and/or Professional References",
            "Statement of Purpose",
            "Detailed CV / Resume",
            "Portfolio (For Art and Architecture)"
        ],
        de: [
            "Bachelor-Diplom und Notenübersicht",
            "Sprachnachweis (IELTS 6.5+ / TOEFL 90+)",
            "Akademische und/oder professionelle Referenzen",
            "Motivationsschreiben (Statement of Purpose)",
            "Detaillierter Lebenslauf / CV",
            "Portfolio (für Kunst und Architektur)"
        ]
    },
    "EXAM_PREPARATION": {
        tr: [
            "Pasaport Kopyası",
            "Mevcut Dil Seviyesi Belirleme Testi",
            "Kayıt Formu"
        ],
        en: [
            "Passport Copy",
            "Current Language Level Placement Test",
            "Registration Form"
        ],
        de: [
            "Reisepass-Kopie",
            "Aktueller Spracheinstufungstest",
            "Anmeldeformular"
        ]
    }
};

export const countryServiceRequirements: Record<string, Record<string, { tr: string[]; en: string[]; de: string[] }>> = {
    "dil-okullari": {
        "ingiltere": {
            tr: [
                "Pasaport Kopyası",
                "Short-term Study Enrollment (6-11 ay) veya Standard Visitor Enrollment (<6 ay)",
                "Niyet Mektubu (SOP) - Neden İngiltere?",
                "Banka Hesap Dökümü (Son 3-6 ay)",
                "Muvafakatname (18 yaş altı için)"
            ],
            en: [
                "Passport Copy",
                "Short-term Study Enrollment (6-11 months) or Standard Visitor Enrollment (<6 months)",
                "Statement of Purpose (SOP) - Why UK?",
                "Bank Statement (Last 3-6 months)",
                "Parental Consent (For under 18s)"
            ],
            de: [
                "Reisepass-Kopie",
                "Short-term Study Enrollment (6-11 Monate) oder Standard Visitor Enrollment (<6 Monate)",
                "Absichtserklärung (SOP) - Warum Großbritannien?",
                "Bankauszug (Letzte 3-6 Monate)",
                "Einverständniserklärung der Eltern (für unter 18-Jährige)"
            ]
        },
        "amerika": {
            tr: [
                "Pasaport Kopyası (En az 6 ay geçerli)",
                "I-20 Belgesi Başvurusu için Banka Mektubu",
                "F-1 Öğrenci Statüsü Gereksinimleri",
                "Sponsor Mektubu (Finansal destekçi varsa)",
                "SEVIS Ödeme Dekontu"
            ],
            en: [
                "Passport Copy (Valid for at least 6 months)",
                "Bank Letter for I-20 Form Application",
                "F-1 Student Status Requirements",
                "Sponsor Letter (If there is a financial supporter)",
                "SEVIS Payment Receipt"
            ],
            de: [
                "Reisepass-Kopie (Mindestens 6 Monate gültig)",
                "Bankbescheinigung für den I-20-Formularantrag",
                "Anforderungen für den F-1 Studentenstatus",
                "Sponsorenbrief (falls ein finanzieller Unterstützer vorhanden ist)",
                "SEVIS-Zahlungsbeleg"
            ]
        },
        "kanada": {
            tr: [
                "Pasaport Kopyası",
                "Study Permit (>6 ay) veya Visitor Enrollment (<6 ay)",
                "Provincial Attestation Letter (PAL/TAL) - Gerekliyse",
                "Biyometrik Veri Kaydı",
                "Kanada Kayıt Başvuru Formu (IMM 1294)"
            ],
            en: [
                "Passport Copy",
                "Study Permit (>6 months) or Visitor Enrollment (<6 months)",
                "Provincial Attestation Letter (PAL/TAL) - If required",
                "Biometric Data Registration",
                "Canada Enrollment Process Form (IMM 1294)"
            ],
            de: [
                "Reisepass-Kopie",
                "Studienerlaubnis (>6 Monate) oder Besuchergenehmigung (<6 Monate)",
                "Provincial Attestation Letter (PAL/TAL) - falls erforderlich",
                "Biometrische Datenerfassung",
                "Kanada-Genehmigungantragsformular (IMM 1294)"
            ]
        },
        "irlanda": {
            tr: [
                "Pasaport Kopyası",
                "Stamp 2 Kayıtsi (25 hafta üzeri programlar için)",
                "€6,665 Finansal Yeterlilik Kanıtı",
                "Özel Sağlık Sigortası (İrlanda standartlarında)",
                "%85 Devam Zorunluluğu Taahhüdü"
            ],
            en: [
                "Passport Copy",
                "Stamp 2 Enrollment (For programs over 25 weeks)",
                "€6,665 Proof of Financial Sufficiency",
                "Private Health Insurance (Irish standards)",
                "85% Attendance Requirement Commitment"
            ],
            de: [
                "Reisepass-Kopie",
                "Vizatyp Stamp 2 (für Programme über 25 Wochen)",
                "€6.665 Nachweis der finanziellen Leistungsfähigkeit",
                "Private Krankenversicherung (irische Standards)",
                "Verpflichtung zur Anwesenheitsquote von 85 %"
            ]
        },
        "avustralya": {
            tr: [
                "Pasaport Kopyası",
                "Student Enrollment (Subclass 500)",
                "Genuine Student (GS) Gereksinimi Kanıtı",
                "Banka Dökümü (Yıllık yaşam maliyeti + okul ücreti)",
                "OSHC (Denizaşırı Öğrenci Sağlık Sigortası)"
            ],
            en: [
                "Passport Copy",
                "Student Enrollment (Subclass 500)",
                "Proof of Genuine Student (GS) Requirement",
                "Bank Statement (Annual living cost + school fee)",
                "OSHC (Overseas Student Health Cover)"
            ],
            de: [
                "Reisepass-Kopie",
                "Studentengenehmigung (Unterklasse 500)",
                "Nachweis der Genuine Student (GS) Anforderung",
                "Bankauszug (jährliche Lebenshaltungskosten + Schulgebühr)",
                "OSHC (Auslandskrankenversicherung für Studenten)"
            ]
        },
        "malta": {
            tr: [
                "Pasaport Kopyası",
                "Schengen Kayıtsi Gereksinimleri",
                "Okul Kabul Belgesi",
                "Finansal Yeterlilik (Günlük min. harcama kanıtı)",
                "Uçak Bileti ve Konaklama Onayı"
            ],
            en: [
                "Passport Copy",
                "Schengen Enrollment Requirements",
                "School Acceptance Letter",
                "Financial Sufficiency (Proof of min. daily spending)",
                "Flight Ticket and Accommodation Confirmation"
            ],
            de: [
                "Reisepass-Kopie",
                "Schengen-Genehmigung-Anforderungen",
                "Schulannahmeschreiben",
                "Finanzielle Leistungsfähigkeit (Nachweis über tägliche Mindestausgaben)",
                "Flugticket und Unterkunftsbestätigung"
            ]
        }
    },
    "yurtdisinda-universite": {
        "almanya": {
            tr: [
                "Lise Diploması (YKS Yerleşme Belgesi veya ÖSYM Sonuç Belgesi)",
                "Studienkolleg (Düz lise mezunları için 1 yıllık hazırlık eğitimi)",
                "Sperrkonto (Bloke Hesap - 2026 itibariyle güncel tutar)",
                "Almanca (TestDaF/DSH/Goethe C1) veya İngilizce IELTS 6.5+",
                "Bedingte Zulassung (Şartlı Kabul) - Dil eğitimi sırasında yer garanti",
                "VPD (Uni-assist üzerinden not dönüşüm belgesi)"
            ],
            en: [
                "High School Diploma (YKS Placement Result or OSYM Result Document)",
                "Studienkolleg (1-year preparatory education for standard high school graduates)",
                "Sperrkonto (Blocked Account - Current amount as of 2026)",
                "German (TestDaF/DSH/Goethe C1) or English IELTS 6.5+",
                "Bedingte Zulassung (Conditional Admission) - Guaranteed spot during language training",
                "VPD (Grade conversion document via Uni-assist)"
            ],
            de: [
                "Abiturzeugnis (YKS-Einstufungsergebnis oder OSYM-Ergebnisdokument)",
                "Studienkolleg (1-jähriges Vorbereitungsstudium für Absolventen von Standard-High-Schools)",
                "Sperrkonto (Blockkonto - Stand 2026)",
                "Deutsch (TestDaF/DSH/Goethe C1) oder Englisch IELTS 6.5+",
                "Bedingte Zulassung - Garantierter Studienplatz während des Sprachkurses",
                "VPD (Vorprüfungsdokumentation über Uni-assist)"
            ]
        },
        "ingiltere": {
            tr: [
                "Lise Diploması ve Transkript",
                "IELTS UKVI (Academic) Belgesi",
                "UCAS Başvuru Formu ve Personal Statement",
                "Referans Mektubu (Lise öğretmeninden)",
                "Banka Bakiyesi (Eğitim + Yaşam payı - 28 gün kuralı)"
            ],
            en: [
                "High School Diploma and Transcript",
                "IELTS UKVI (Academic) Certificate",
                "UCAS Application Form and Personal Statement",
                "Reference Letter (From a high school teacher)",
                "Bank Balance (Tuition + Living allowance - 28-day rule)"
            ],
            de: [
                "Abiturzeugnis und Notenübersicht",
                "IELTS UKVI (Academic) Zertifikat",
                "UCAS-Antragsformular und Motivationsschreiben (Personal Statement)",
                "Referenzschreiben (von einem Lehrer)",
                "Bankguthaben (Studiengebühren + Lebenshaltungskosten - 28-Tage-Regel)"
            ]
        },
        "kanada": {
            tr: [
                "Lise Diploması ve Transkript (GPA 80+ tercih edilir)",
                "IELTS 6.5 veya TOEFL 90+",
                "Study Permit ve PAL Sertifikası",
                "Banka Hesap Hareketleri (Min. 1 yıl)",
                "Ekstra Faaliyetler ve Sertifikalar"
            ],
            en: [
                "High School Diploma and Transcript (GPA 80+ preferred)",
                "IELTS 6.5 or TOEFL 90+",
                "Study Permit and PAL Certificate",
                "Bank Account Activities (Min. 1 year)",
                "Extracurricular Activities and Certificates"
            ],
            de: [
                "Abiturzeugnis und Notenübersicht (GPA 80+ bevorzugt)",
                "IELTS 6.5 oder TOEFL 90+",
                "Studienerlaubnis und PAL-Zertifikat",
                "Bankkontobewegungen (mind. 1 Jahr)",
                "Außerschulische Aktivitäten und Zertifikate"
            ]
        },
        "hollanda": {
            tr: [
                "Lise Diploması (VWO Dengi)",
                "Studielink Kayıt Onayı",
                "IELTS 6.0+ / TOEFL 80+",
                "Banka Bakiyesi Kanıtı",
                "Konaklama Ön Rezervasyonu (Kritik önemde)"
            ],
            en: [
                "High School Diploma (VWO Equivalent)",
                "Studielink Registration Confirmation",
                "IELTS 6.0+ / TOEFL 80+",
                "Proof of Bank Balance",
                "Accommodation Pre-reservation (Critical importance)"
            ],
            de: [
                "Abiturzeugnis (VWO-Äquivalent)",
                "Studielink-Anmeldebestätigung",
                "IELTS 6.0+ / TOEFL 80+",
                "Nachweis des Bankguthabens",
                "Vorreservierung einer Unterkunft (von entscheidender Bedeutung)"
            ]
        },
        "amerika": {
            tr: [
                "Lise Diploması ve Resmi Transkript",
                "IELTS 6.5 / TOEFL 80+ / Duolingo 110+",
                "SAT/ACT Skoru (Opsiyonel ama önerilir)",
                "Finansal Yeterlilik Belgesi (I-20 için)",
                "2 Adet Akademik Referans"
            ],
            en: [
                "High School Diploma and Official Transcript",
                "IELTS 6.5 / TOEFL 80+ / Duolingo 110+",
                "SAT/ACT Score (Optional but recommended)",
                "Financial Sufficiency Document (For I-20)",
                "2 Academic References"
            ],
            de: [
                "Abiturzeugnis und offizielle Notenübersicht",
                "IELTS 6.5 / TOEFL 80+ / Duolingo 110+",
                "SAT/ACT-Ergebnis (optional, aber empfohlen)",
                "Unterlagen zur finanziellen Leistungsfähigkeit (für I-20)",
                "2 akademische Referenzen"
            ]
        },
        "avustralya": {
            tr: [
                "Lise Diploması ve Transkript",
                "IELTS 6.0+ (Academic)",
                "OSHC Sağlık Sigortası",
                "GTE (Genuine Temporary Entrant) Formu",
                "Banka Dökümü (Yıllık gider karşılandığına dair)"
            ],
            en: [
                "High School Diploma and Transcript",
                "IELTS 6.0+ (Academic)",
                "OSHC Health Insurance",
                "GTE (Genuine Temporary Entrant) Form",
                "Bank Statement (Proof that annual expenses are met)"
            ],
            de: [
                "Abiturzeugnis und Notenübersicht",
                "IELTS 6.0+ (Academic)",
                "OSHC-Krankenversicherung",
                "GTE-Formular (Genuine Temporary Entrant)",
                "Bankauszug (Nachweis, dass die jährlichen Ausgaben gedeckt sind)"
            ]
        }
    },
    "yuksek-lisans": {
        "polonya": {
            tr: [
                "Lisans Diploması ve Transkript (Apostilli)",
                "İngilizce Yeterlilik (IELTS 6.0-6.5)",
                "Hague Sözleşmesi Gereği Apostil Onayı",
                "Tıbbi Sağlık Sertifikası",
                "Diploma Denklik Dilekçesi (Gerekli durumlarda)"
            ],
            en: [
                "Bachelor's Diploma and Transcript (Apostilled)",
                "English Proficiency (IELTS 6.0-6.5)",
                "Apostille Approval as per Hague Convention",
                "Medical Health Certificate",
                "Diploma Recognition Petition (If necessary)"
            ],
            de: [
                "Bachelor-Diplom und Notenübersicht (mit Apostille)",
                "Englischkenntnisse (IELTS 6.0-6.5)",
                "Apostille-Genehmigung gemäß Haager Übereinkommen",
                "Ärztliches Gesundheitszeugnis",
                "Antrag auf Anerkennung des Diploms (falls erforderlich)"
            ]
        },
        "hollanda": {
            tr: [
                "Lisans Diploması (İlgili alanda)",
                "Niyet Mektubu ve CV",
                "Orientation Year (Zoekjaar) Başvuru Bilgilendirmesi",
                "İngilizce Yeterlilik (IELTS 6.5+)",
                "Banka Hesap Bakiyesi Kanıtı"
            ],
            en: [
                "Bachelor's Diploma (In the relevant field)",
                "Statement of Purpose and CV",
                "Orientation Year (Zoekjaar) Application Information",
                "English Proficiency (IELTS 6.5+)",
                "Proof of Bank Balance"
            ],
            de: [
                "Bachelor-Diplom (im relevanten Fachbereich)",
                "Motivationsschreiben und Lebenslauf",
                "Informationen zum Orientierungsjahr (Zoekjaar)",
                "Englischkenntnisse (IELTS 6.5+)",
                "Nachweis des Bankguthabens"
            ]
        },
        "amerika": {
            tr: [
                "Lisans Diploması (GPA 3.0+)",
                "IELTS 7.0 / TOEFL 100+ / Duolingo 120+",
                "GRE veya GMAT (Programına göre)",
                "3 Adet Akademik/Profesyonel Referans",
                "Sebebi Ziyaret (SOP) ve CV"
            ],
            en: [
                "Bachelor's Diploma (GPA 3.0+)",
                "IELTS 7.0 / TOEFL 100+ / Duolingo 120+",
                "GRE or GMAT (Depending on the program)",
                "3 Academic/Professional References",
                "Statement of Purpose (SOP) and CV"
            ],
            de: [
                "Bachelor-Diplom (GPA 3.0+)",
                "IELTS 7.0 / TOEFL 100+ / Duolingo 120+",
                "GRE oder GMAT (je nach Studiengang)",
                "3 akademische/professionelle Referenzen",
                "Motivationsschreiben (SOP) und Lebenslauf"
            ]
        },
        "ingiltere": {
            tr: [
                "Lisans Diploması ve Transkript",
                "IELTS UKVI (Min 6.5)",
                "Niyet Mektubu (Kariyer hedefleri odaklı)",
                "Referans Mektupları (2 adet)",
                "Banka Bakiyesi (Ülkeden çıkış garantisi)"
            ],
            en: [
                "Bachelor's Diploma and Transcript",
                "IELTS UKVI (Min 6.5)",
                "Statement of Purpose (Focus on career goals)",
                "Reference Letters (2 pieces)",
                "Bank Balance (Guarantee of exit from the country)"
            ],
            de: [
                "Bachelor-Diplom und Notenübersicht",
                "IELTS UKVI (Min. 6.5)",
                "Motivationsschreiben (fokussiert auf Karriereziele)",
                "Referenzschreiben (2 Stück)",
                "Bankguthaben (Garantie für die Ausreise aus dem Land)"
            ]
        },
        "italya": {
            tr: [
                "Lisans Diploması ve Transkript",
                "CIMEA veya Dichiarazione di Valore (DOV)",
                "Universitaly Kaydı",
                "Dil Belgesi (İngilizce B2 veya İtalyanca B2)",
                "Burs Başvurusu için ISEE-Parificato Belgesi"
            ],
            en: [
                "Bachelor's Diploma and Transcript",
                "CIMEA or Dichiarazione di Valore (DOV)",
                "Universitaly Registration",
                "Language Certificate (English B2 or Italian B2)",
                "ISEE-Parificato Document for Scholarship Application"
            ],
            de: [
                "Bachelor-Diplom und Notenübersicht",
                "CIMEA oder Dichiarazione di Valore (DOV)",
                "Universitaly-Anmeldung",
                "Sprachzertifikat (Englisch B2 oder Italienisch B2)",
                "ISEE-Parificato-Dokument für den Stipendienantrag"
            ]
        }
    },
    "yurtdisinda-lise": {
        "isvicre": {
            tr: [
                "Son 3 Yılın Karneleri / Transkript",
                "Mülakat (Online veya Yüz yüze)",
                "Giriş Sınavları (Okula özel)",
                "Veli İzin Belgesi ve Muvafakatname",
                "Dil Seviye Belgesi (İngilizce/Fransızca/Almanca)"
            ],
            en: [
                "Report Cards / Transcript of the Last 3 Years",
                "Interview (Online or Face-to-Face)",
                "Entrance Exams (School-specific)",
                "Parental Consent and Muvafakatname",
                "Language Level Certificate (English/French/German)"
            ],
            de: [
                "Zeugnisse / Notenübersichten der letzten 3 Jahre",
                "Gespräch (online oder persönlich)",
                "Aufnahmeprüfungen (schulspezifisch)",
                "Einverständniserklärung der Eltern",
                "Sprachzertifikat (Englisch/Französisch/Deutsch)"
            ]
        },
        "ingiltere": {
            tr: [
                "Lise Transkripti",
                "IELTS UKVI (Akademik)",
                "A-Level veya GCSE Seçimi Taahhüdü",
                "Guardian (Vasi) Atama Belgesi",
                "Pasaport ve Başvuru Belgeleri"
            ],
            en: [
                "High School Transcript",
                "IELTS UKVI (Academic)",
                "A-Level or GCSE Selection Commitment",
                "Guardian Appointment Certificate",
                "Passport and Application Documents"
            ],
            de: [
                "High-School-Notenübersicht",
                "IELTS UKVI (Akademisch)",
                "Zusage für die A-Level- oder GCSE-Wahl",
                "Vormundbestellung (Guardian)",
                "Reisepass- und Bewerbungsunterlagen"
            ]
        },
        "amerika": {
            tr: [
                "ELTiS Sınav Skoru (Exchange için)",
                "Sponsor ve Finansal Formlar",
                "SLEP veya Okulun Kendi Sınavı",
                "Aşı Takvimi ve Sağlık Formları",
                "Veli Muvafakatnamesi"
            ],
            en: [
                "ELTiS Exam Score (For Exchange)",
                "Sponsor and Financial Forms",
                "SLEP or School's Own Exam",
                "Vaccination Schedule and Health Forms",
                "Parental Consent"
            ],
            de: [
                "ELTiS-Testergebnis (für Austauschschüler)",
                "Sponsoren- und Finanzformulare",
                "SLEP oder schuleigene Prüfung",
                "Impfpass und Gesundheitsformulare",
                "Einverständniserklärung der Eltern"
            ]
        },
        "kanada": {
            tr: [
                "Transkript ve Mezuniyet Belgesi",
                "Study Permit ve CAQ (Quebec için gerekliyse)",
                "Vasi (Custodian) Tayini",
                "Ev Sahibi Aile (Homestay) Formları",
                "Öğrenci Niyet Mektubu"
            ],
            en: [
                "Transcript and Diploma",
                "Study Permit and CAQ (If required for Quebec)",
                "Custodian Appointment",
                "Homestay Forms",
                "Student Statement of Purpose"
            ],
            de: [
                "Notenübersicht and Diplom",
                "Studienerlaubnis und CAQ (falls für Quebec erforderlich)",
                "Bestellung eines Custodian (Vormund)",
                "Homestay-Formulare (Gastfamilie)",
                "Motivationsschreiben des Schülers"
            ]
        }
    }
};
