Mentor Career Consulting Proje Analizi: Kullanıcı Türleri ve Mock Hesaplar
Projeyi A'dan Z'ye inceledim. Veritabanı şeması, dashboard yapısı ve seed dosyalarına göre kullanıcı türlerini ve giriş bilgilerini aşağıda bulabilirsiniz.

Kullanıcı Rolleri ve Erişim Alanları
Rol	Dashboard Yolu	Açıklama
ADMIN	/dashboard/admin	Sistemin tamamına erişim, kurum/kullanıcı yönetimi ve ayarlar.
CEO	/dashboard/ceo	Üst düzey finansal raporlar, stratejik yönetim ve operasyonel takip.
ADVISOR	/dashboard/advisor	Danışman paneli. Öğrenci başvuruları, belgeler ve randevuları yönetir.
AGENCY_MANAGER	/dashboard/agency	Acenta yönetimi. Alt acentaların performansını ve komisyonlarını takip eder.
STUDENT	/dashboard	Standart öğrenci/kullanıcı paneli. Kendi profilini ve başvurularını görür.
Mock Kullanıcı Bilgileri (Geliştirme Ortamı)
Projedeki ana seed dosyasına (
prisma/seed.ts
) göre oluşturulan mock hesaplar şunlardır:

IMPORTANT

Tüm hesaplar için varsayılan şifre: password123

Ana Mock Hesaplar (mentor-cc.com)
Rol	E-posta	Şifre
Admin	admin@mentor-cc.com	password123
CEO	ceo@mentor-cc.com	password123
Danışman (Advisor)	advisor@mentor-cc.com	password123
Acenta Müdürü	agency@mentor-cc.com	password123
Öğrenci	student@mentor-cc.com	password123
Test İş Akışı Hesapları (mentor-cc.com)
Eğer 
seed-test-workflow.ts
 çalıştırıldıysa aşağıdaki hesaplar da aktif olabilir:

Rol	E-posta	Şifre
Admin	management@mentor-cc.com	password123
Danışman (Advisor)	consultant@mentor-cc.com	password123
Acenta Müdürü	global@mentor-cc.com	password123
Öğrenci	demo@mentor-cc.com	password123
Teknik Notlar
Şifreler veritabanında bcryptjs ile hashlenmiş olarak saklanmaktadır.
Kimlik doğrulama için Auth.js (NextAuth) kullanılmaktadır.
Roller 
prisma/schema.prisma
 dosyasındaki Role enum'u ile tanımlanmıştır.