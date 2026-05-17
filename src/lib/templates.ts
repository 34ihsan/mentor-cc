export const OFFER_TEMPLATES: Record<string, any> = {
    PROFESSIONAL: {
        title: "Eğitim ve Danışmanlık Teklifi",
        content: (data: any) => `
            <div class="space-y-8 font-sans p-2">
                <div class="flex justify-between items-start border-b border-slate-200 pb-6">
                    <div>
                        <h1 class="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none mb-2">Eğitim Teklifi</h1>
                        <p class="text-xs font-bold text-primary tracking-[0.2em] uppercase">Mentor Career Consulting</p>
                    </div>
                    <div class="text-right">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tarih</p>
                        <p class="text-sm font-bold">${new Date().toLocaleDateString('tr-TR')}</p>
                    </div>
                </div>
                
                <div class="space-y-2">
                    <p class="text-sm font-medium text-slate-500 uppercase tracking-widest">Sayın</p>
                    <h2 class="text-2xl font-black text-slate-900">${data.studentName}</h2>
                    <p class="text-sm text-slate-600">Başvurunuz üzerine hazırladığımız <strong>${data.country}</strong> - <strong>${data.serviceType || 'Eğitim'}</strong> programı teklif detayları aşağıdadır.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">OKUL / KURUM</p>
                        <p class="font-black text-slate-900 dark:text-white text-lg leading-tight uppercase tracking-tighter">${data.institutionName}</p>
                        <p class="text-sm font-bold text-slate-500 mt-1">${data.city || ''}${data.city && data.country ? ', ' : ''}${data.country || ''}</p>
                    </div>
                    <div class="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">PROGRAM</p>
                        <p class="font-black text-slate-900 dark:text-white text-lg leading-tight uppercase tracking-tighter">${data.programName}</p>
                        <p class="text-sm font-bold text-primary mt-1">${data.duration || 'Standart Süre'}</p>
                    </div>
                </div>

                <div class="p-8 bg-slate-900 text-white rounded-[40px] relative overflow-hidden shadow-2xl">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16"></div>
                    <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">TOPLAM TEKLİF TUTARI</p>
                            <div class="flex items-baseline gap-2">
                                <span class="text-5xl font-black tracking-tighter">${data.price}</span>
                                <span class="text-2xl font-bold opacity-60">${data.currency}</span>
                            </div>
                        </div>
                        <div class="hidden md:block w-px h-12 bg-white/20"></div>
                        <div class="text-center md:text-right">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">SON GEÇERLİLİK</p>
                            <p class="text-lg font-bold">${data.validUntil || 'Belirtilmedi'}</p>
                        </div>
                    </div>
                </div>

                <div class="space-y-4 pt-4">
                    <h3 class="text-sm font-black uppercase tracking-[0.2em] text-slate-900 border-l-4 border-primary pl-4">HİZMET KAPSAMI</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs font-bold text-slate-600">
                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px]">✓</div>
                            Okul Kayıt ve Kabul İşlemleri
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px]">✓</div>
                            Dosya ve Başvuru Desteği
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px]">✓</div>
                            Konaklama Organizasyonu Desteği
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px]">✓</div>
                            Havalimanı Karşılama (Opsiyonel)
                        </div>
                    </div>
                </div>

                <footer class="pt-8 mt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 italic text-[10px] text-slate-400">
                    <p>© Mentor Career Consulting - Professional Education Consultancy</p>
                    <p>Bu teklif dijital olarak oluşturulmuştur ve onayınızla geçerlilik kazanır.</p>
                </footer>
            </div>
        `
    },
    LANGUAGE_SCHOOL: {
        title: "Dil Okulu Eğitim Teklifi",
        content: (data: any) => `
            <div class="space-y-6">
                <div class="flex justify-between items-start">
                    <h1 class="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Dil Okulu <br/>Önerisi</h1>
                    <div class="px-4 py-2 bg-primary/10 text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest border border-primary/20">
                        Premium Destek
                    </div>
                </div>
                
                <div class="p-6 bg-slate-50 dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">ÜCRET DETAYI</p>
                    <div class="flex items-baseline gap-2">
                        <span class="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">${data.price}</span>
                        <span class="text-xl font-bold text-slate-500">${data.currency}</span>
                    </div>
                    <p class="text-xs font-bold text-slate-400 mt-4 italic">* Kurs ve konaklama dahil tahmini tutardır.</p>
                </div>

                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">OKUL VE LOKASYON</h3>
                        <p class="font-black text-slate-900 dark:text-white text-lg leading-tight uppercase tracking-tighter">${data.institutionName}</p>
                        <p class="text-sm font-bold text-slate-500 mt-1">${data.city}, ${data.country}</p>
                    </div>
                    <div>
                        <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">PROGRAM</h3>
                        <p class="font-black text-slate-900 dark:text-white text-lg leading-tight uppercase tracking-tighter">${data.programName}</p>
                        <p class="text-sm font-bold text-primary mt-1">İntensif Dil Eğitimi</p>
                    </div>
                </div>
            </div>
        `
    },
    UNIVERSITY: {
        title: "Üniversite Akademik Eğitim Teklifi",
        content: (data: any) => `
            <div class="space-y-8">
                <header class="flex justify-between items-end border-b-2 border-slate-900 pb-6">
                    <div>
                        <h1 class="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Akademik Öneri</h1>
                        <p class="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mt-4">Kariyer Mimarı / Mentor Career</p>
                    </div>
                    <div class="text-right">
                        <p class="text-[10px] font-black text-slate-400 tracking-widest uppercase">Teklif No</p>
                        <p class="text-sm font-black tracking-widest">#MC-${Math.floor(Math.random() * 9000) + 1000}</p>
                    </div>
                </header>

                <div>
                    <p class="text-xl leading-tight">Geleceğinize yön verecek olan <br/><strong>${data.programName}</strong> programı için <span class="bg-primary/10 px-1 font-bold text-primary">${data.institutionName}</span> akademik teklifimizi sunmaktan onur duyarız.</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-6 bg-slate-900 text-white rounded-3xl relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">EĞİTİM HARCI</p>
                        <div class="flex items-baseline gap-2">
                            <span class="text-3xl font-black tracking-tighter underline decoration-primary decoration-4 underline-offset-8">${data.price}</span>
                            <span class="text-lg font-bold">${data.currency}</span>
                        </div>
                        <p class="text-[9px] text-slate-500 mt-6 mt-4">Yıllık tahmini eğitim ücretidir.</p>
                    </div>
                    <div class="p-6 border-2 border-slate-100 rounded-3xl space-y-4">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">LOKASYON</p>
                        <p class="font-black text-slate-900 text-lg leading-tight uppercase tracking-tighter">${data.city}, ${data.country}</p>
                        <hr class="border-slate-100" />
                        <p class="text-xs font-bold text-slate-500 italic">Dünya sıralamasında üst düzey akademik eğitim.</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-900 border-l-4 border-primary pl-4">DANIŞMANLIK PAKETİ</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[11px] font-bold text-slate-600 uppercase">
                        <div class="flex items-center gap-2">• Profesyonel Başvuru Yönetimi</div>
                        <div class="flex items-center gap-2">• Motivasyon Mektubu Desteği</div>
                        <div class="flex items-center gap-2">• Akademik Dosya Hazırlığı</div>
                        <div class="flex items-center gap-2">• Konaklama Rehberliği</div>
                    </div>
                </div>

                <footer class="pt-8 mt-8 border-t border-slate-100 flex justify-between items-center italic text-[10px] text-slate-400">
                    <p>© Mentor Career Uluslararası Eğitim Danışmanlığı</p>
                </footer>
            </div>
        `
    }
};

export const CONTRACT_TEMPLATES: Record<string, any> = {
    STUDENT_CONTRACT_2026: {
        title: "Öğrenci Sözleşmesi 2026",
        content: (data: any) => `
            <div class="font-sans text-[11px] leading-relaxed p-8 max-w-4xl mx-auto text-black bg-white">
                <header class="flex justify-between items-start mb-10 border-b border-slate-200 pb-6">
                    <div class="space-y-1">
                        <p class="font-bold">info@mentor-cc.com</p>
                        <p class="font-bold underline">www.mentor-cc.com</p>
                        <p class="text-slate-600 font-medium">85 Great Portland Street, First Floor, W1W 7LT,</p>
                        <p class="text-slate-600 font-medium">London, United Kingdom</p>
                        <p class="text-[9px] text-slate-400">Mentor Career Consulting Ltd, Company Number: 12767873</p>
                    </div>
                </header>

                <div class="text-center mb-10">
                    <h1 class="text-2xl font-black uppercase tracking-widest text-black">Mentor Career</h1>
                    <h2 class="text-xl font-serif italic text-slate-800 mt-2 underline">ÖĞRENCİ SÖZLEŞMESİ 2026</h2>
                </div>

                <div class="space-y-8">
                    <section>
                        <h3 class="font-black border-b border-black/10 pb-1 mb-3">MADDE 1 - TARAFLAR</h3>
                        <p class="mb-4 text-justify">İş bu sözleşme, bir tarafta “London, UK” merkezli faaliyet gösteren “Mentor Career” (Aşağıda kısaca “Mentor Career” olarak anılacaktır), diğer tarafta da;</p>
                        
                        <div class="grid grid-cols-2 gap-x-12 gap-y-3 pl-4 border-l-2 border-slate-200">
                            <p><strong>Adı-Soyadı :</strong> ${data.studentName || '................................'}</p>
                            <p><strong>Uyruk :</strong> ${data.nationality || 'TC'}</p>
                            <p><strong>Veli Adı :</strong> ${data.parentName || '................................'}</p>
                            <p><strong>ID/Pasaport No :</strong> ${data.passportId || '................................'}</p>
                            <p><strong>Cep Telefonu :</strong> ${data.phone || '................................'}</p>
                            <p><strong>E-posta Adresi :</strong> ${data.studentEmail || '................................'}</p>
                            <p><strong>Doğum Tarihi :</strong> ${data.birthDate || '................................'}</p>
                            <p><strong>İkamet Adresi :</strong> ${data.address || '................................................................'}</p>
                        </div>
                        <p class="mt-4 text-justify">Adresinde mukim kişi (Aşağıda kısaca öğrenci olarak anılacaktır) arasında ayrıntıları aşağıda belirtilen hususlarda yapılmıştır.</p>
                    </section>

                    <section>
                        <h3 class="font-black border-b border-black/10 pb-1 mb-3">MADDE 2 – ALINACAK HİZMETE İLİŞKİN BİLGİLER</h3>
                        <div class="space-y-3 pl-4 border-l-2 border-gold/30">
                            <p><strong>Sözleşme Tarihi :</strong> ${data.date || new Date().toLocaleDateString('tr-TR')}</p>
                            <p><strong>Tercih Edilen Paket :</strong> ${data.serviceType || '................................'}</p>
                            <p><strong>Ücret :</strong> ${data.price} ${data.currency}</p>
                            <p><strong>Kayıt Hedeflenen Ülke :</strong> ${data.country || '................................'}</p>
                            <p><strong>Hedeflenen Program :</strong> ${data.programName || '................................'}</p>
                            <p><strong>Başlangıç Tarihi :</strong> Ekim 2026 Dönemi</p>
                            <p><strong>Başvuru Yapılacak Eğitim Kurumlarının ve Programların Adı:</strong></p>
                            <ol class="list-decimal pl-8 space-y-1">
                                <li>${data.institutionName || '................................'}</li>
                                <li>................................................................</li>
                                <li>................................................................</li>
                            </ol>
                        </div>
                    </section>

                    <section>
                        <h3 class="font-black border-b border-black/10 pb-1 mb-3">MADDE 3 – HİZMET BEDELİ VE BİLGİLERİ</h3>
                        <div class="space-y-4">
                            <div>
                                <p class="font-bold underline mb-2 italic">Hizmet Bedeline Dahil Olan Normal Servisler</p>
                                <ul class="list-disc pl-8">
                                    <li>Eğitim paketleri şeklinde EK-1’de verilecektir.</li>
                                </ul>
                            </div>
                            <div>
                                <p class="font-bold underline mb-2 italic">Hizmet Bedeline Dahil Olmayan Masraflar</p>
                                <ul class="list-disc pl-8 grid grid-cols-2 gap-x-8">
                                    <li>Okul kayıt başvuru ücretleri</li>
                                    <li>Kargo ücretleri</li>
                                    <li>Sınav ücretleri</li>
                                    <li>Pasaport masrafları</li>
                                    <li>Okul eğitim ücretleri</li>
                                    <li>Yurtdışı eğitim sağlık sigorta ücreti</li>
                                    <li>Resmi başvuru ve harç masrafları</li>
                                    <li>Uçak bileti ve havaalanı transfer masrafları</li>
                                    <li>Konaklama, yemek ve günlük masraflar</li>
                                    <li>Ekstra sağlık harcamaları</li>
                                    <li class="col-span-2 text-[10px] text-slate-500 italic">Tercüme, noter, akreditasyon, apostil vb. masraflar</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 class="font-black border-b border-black/10 pb-1 mb-3 uppercase">MADDE 4 – TARAFLARIN YÜKÜMLÜLÜKLERİ</h3>
                        <div class="space-y-4 text-justify pr-4">
                            <p>1. “Mentor Career” öğrenciyi ülke, şehir ve program alternatifleri hakkında eksikosiz bilgilendirmeyi ve en doğru tercihi yapmasını sağlamayı taahhüt eder.</p>
                            <p>2. Okul başvuruları ilgili ülke mevzuatına uygun hazırlanır. Gerekli dil seviyesine ulaşma sorumluluğu tamamen öğrenciye aittir.</p>
                            <p>3. Gerekli tüm belgeler (diploma, transkript vb.) öğrenci tarafından eksiksiz ve zamanında teslim edilmelidir.</p>
                            <p>4. “Mentor Career” başvuruların eksiksiz yapılmasını sağlar ancak kabul garantisi vermez. En az 3 üniversiteye başvuru yapılacaktır.</p>
                            <p>5. Konaklama talepleri imkanlar dahilinde ek ücretle ayarlanır; kesin garanti verilemez.</p>
                            <p>6. Başvuru ve dosya danışmanlığı profesyonelce sunulur (Pakete dahil değilse ek ücrete tabidir) ancak onay yetkisi ilgili resmi makamlardadır.</p>
                            <p>7. Kurum aracı olması hasebiyle, okul veya resmi makam reddinden dolayı “Mentor Career” sorumlu tutulamaz.</p>
                            <p>8. Öğrenci başvuru sonucunu 2 iş günü içinde bildirmekle yükümlüdür.</p>
                            <p>9. Hizmet bedeli; ilk ödeme sözleşme anında, kalan miktar başvuru onayından sonra peşin ödenmelidir.</p>
                            <p>10. Eksik belge tesliminden kaynaklanan aksamalarda ücret iadesi yapılmaz.</p>
                            <p>11. İlave belge temini öğrenci ve velisinin sorumluluğundadır.</p>
                            <p>12. Kabul sonrası vazgeçme durumunda danışmanlık ücreti ve geri ödemesiz bedeller iade edilmez.</p>
                            <p>13. Mücbir sebepler (ölüm, hastalık, savaş, pandemi vb.) durumunda kurum prosedürleri uygulanır.</p>
                            <p>14. Sağlık sigortası zorunludur. Yaptırılmamasından doğan masraflar öğrenciye aittir.</p>
                            <p>15. Öğrenci, gidilen ülkenin yasalarına ve kurum kurallarına uymakla yükümlüdür.</p>
                            <p>16. “Mentor Career” sorunların çözümünde azami gayret göstermeyi taahhüt eder.</p>
                            <p>17. Başvuru onaylandıktan sonra feragat durumunda ücret iade edilmez.</p>
                            <p>18. Anlaşma imza ile yürürlüğe girer, yükümlülükler bitince sona erer.</p>
                            <p>19. Uyuşmazlıklarda öncelik iyi niyetli uzlaşmadır. Uzlaşma olmazsa Yerel Mahkemeler yetkilidir.</p>
                            <p>20. Başvuru reddi durumunda iade sadece Pre Paket kapsamında (%30) ve belge ibrazıyla yapılır.</p>
                            <p>21. Adres değişiklikleri 14 iş günü içinde bildirilmelidir.</p>
                            <p>22. İş bu sözleşme iki nüsha halinde hazırlanmıştır.</p>
                        </div>
                    </section>

                    <div class="mt-16 pt-10 border-t-2 border-slate-200 space-y-12">
                        <p class="text-[10px] italic leading-relaxed font-black mb-8 text-slate-600">Yukarıda beyan edilen bilgileri tam olarak okuyup anladığımı, herhangi bir yanlış beyandan kaynaklanan durumda Mentor Career’in başvurumu iptal etme hakkı olduğunu kabul ediyorum. Bu kontrat 5 sayfadan ibarettir.</p>
                        
                        <div class="grid grid-cols-2 gap-20">
                            <div class="space-y-6">
                                <p class="font-black underline uppercase text-black">ÖĞRENCİNİN / VELİNİN</p>
                                <div class="space-y-2">
                                    <p><strong>İsim :</strong> ${data.studentName || '................................'}</p>
                                    <p><strong>Tarih :</strong> ${data.date}</p>
                                    <div class="h-24 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center italic text-slate-300 font-serif">İmza</div>
                                </div>
                            </div>
                            <div class="space-y-6">
                                <p class="font-black underline uppercase text-black">Mentor Career ADINA</p>
                                <div class="space-y-2">
                                    <p><strong>İsim :</strong> Yılmaz Sunar</p>
                                    <p><strong>Tarih :</strong> ................................</p>
                                    <div class="h-24 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center">
                                        <p class="text-[8px] font-black uppercase text-slate-400">Mentor Career OFFICIAL</p>
                                        <p class="font-serif italic text-slate-200">Authorized Signature</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer class="mt-20 pt-10 border-t border-slate-100 font-sans">
                    {/* Contact info footer simplified */}
                    <div class="text-center text-[9px] text-slate-400 border-t border-slate-50 pt-6">
                        <p>85 Great Portland Street, First Floor, London, UK | www.mentor-cc.com</p>
                        <p class="mt-2 opacity-100 uppercase tracking-widest font-black text-slate-300 italic">Temsilcilikler</p>
                    </div>
                </footer>
            </div>
        `
    }
};

