# Mentor Career Consulting - Detaylı Kullanım Rehberi 🚀

Bu rehber, Mentor Career Consulting platformunun dashboard yapısını, kullanıcı rollerini ve özellikle yönetici (Admin) işlemlerini detaylı bir şekilde açıklamaktadır.

---

## 1. Dashboard ve Navigasyon Yapısı

Mentor Career Consulting Dashboard'u, her rol için özelleştirilmiş bir deneyim sunar. Ekranın sol tarafındaki **Kenar Çubuğu (Sidebar)** ana navigasyon merkezinizdir.

### 1.1. Genel Bileşenler
- **Üst Panel (Header)**: Aktif kullanıcı adınızı, rolünüzü ve sistemin çevrimiçi durumunu gösterir.
- **Sidebar**: Rolünüze göre filtrelenmiş menü öğelerini içerir.
- **Profil Kartı**: Sol alt köşede yer alır, oturum kapatma ve hesap ayarlarına hızlı erişim sağlar.

---

## 2. Kullanıcı Rolleri ve Yetki Matrisi

Platformda 5 ana kullanıcı rolü tanımlanmıştır:

| Rol | Dashboard Yolu | Temel Odak Noktası |
| :--- | :--- | :--- |
| **ADMIN** | `/dashboard/admin` | Sistem ayarları, kullanıcı yönetimi, içerik (okul/kurs) düzenleme. |
| **CEO** | `/dashboard/ceo` | Finansal raporlar, ekip performansı ve üst düzey operasyonel takip. |
| **ADVISOR** | `/dashboard/advisor` | Öğrenci başvuruları, belge onayları ve görüşme takvimi. |
| **STUDENT** | `/dashboard` | Program arama, belge yükleme ve başvuru durumu takibi. |
| **AGENCY** | `/dashboard/agency` | Alt acenta öğrenci takibi ve komisyon yönetimi. |

---

## 3. Yönetici (Admin) ve İçerik Düzenleme Rehberi

Admin rolü, platformun tüm içeriğini yönetme (ekleme, silme, güncelleme) yetkisine sahiptir.

### 3.1. Kullanıcı Yönetimi (User CRM)
**Erişim**: `Dashboard > Kullanıcılar`

- **Yeni Kullanıcı Ekleme**: "YENİ KULLANICI EKLE" butonu ile sisteme yeni danışman, acenta veya yönetici tanımlayabilirsiniz.
- **Rol Atama**: Mevcut kullanıcıların rollerini (STUDENT, ADVISOR vb.) düzenleyebilirsiniz.
- **Hiyerarşi Yönetimi**: Bir danışmanın hangi yöneticiye bağlı olduğunu veya bir öğrencinin hangi danışmana atandığını kontrol edebilirsiniz.

### 3.2. Okul ve Kurum Yönetimi (Institutions)
**Erişim**: `Dashboard > Kurumlar`

Bu bölüm platformun "beyni"dir. Okulları ve dil okullarını buradan yönetirsiniz.
- **Düzenleme (Edit)**: Mevcut bir okulun yanındaki kalem simgesine tıklayarak düzenleme panelini açabilirsiniz.
- **Terminoloji Uyumu**: Sistem, seçtiğiniz kategoriye göre (Üniversite, Dil Okulu, Sınav Merkezi) başlıkları otomatik uyarlar.
- **Zengin İçerik**: Okul açıklamaları için gelişmiş yazı editörü (WYSIWYG) kullanılır. Resim ve logo yüklemeleri sürükle-bırak desteklidir.
- **Metadata (Ek Bilgiler)**: "IELTS Puanı", "GPA", "Konaklama Tipi" gibi teknik detayları dinamik satırlar halinde ekleyebilirsiniz.

### 3.3. Program ve Kurs Yönetimi
**Erişim**: `Dashboard > Programlar`

Okullara bağlı olan spesifik bölümleri (Örn: İşletme Yüksek Lisansı, Almanca A1 Kursu) buradan yönetirsiniz. Fiyatlar, süreler ve kategoriler bu alanda tanımlanır.

### 3.4. Ülke ve Hizmet Yönetimi
**Erişim**: `Dashboard > Ülkeler` ve `Dashboard > Hizmetler`

Platformdaki ana kategorileri yönetmenizi sağlar. Her ülkenin vize bilgileri, yaşam maliyetleri ve tanıtım içerikleri bu bölümden güncellenir.

---

## 4. Özel Fonksiyonlar ve Otomasyonlar

### 4.1. Fiyat Tarayıcı (Harvester)
Admin panelindeki kurumlar listesinde, her okulun yanında bir **Yenile (Refresh)** simgesi bulunur.
- **Nasıl Çalışır?**: Sisteme tanımlanan okul web sitesi üzerinden güncel fiyatları otomatik tarayıp veritabanına işler.
- **Durum Takibi**: Fiyatların en son ne zaman güncellendiğini ve başarı durumunu (SUCCESS/FAILED) panelden görebilirsiniz.

### 4.2. Blog ve Duyurular
Platformun ön yüzünde (Ana sayfa/Blog) görünen tüm haberleri ve duyuruları yönetebilirsiniz. 
- **Duyuru Hedefleme**: Belirli duyuruları sadece öğrencilere veya sadece danışmanlara görünecek şekilde kısıtlayabilirsiniz.

---

## 5. İş Akışı Örneği (Nasıl Yapılır?)

### Soru: Yeni bir okulun fiyatlarını nasıl güncellerim?
1. **Giriş**: Admin hesabıyla dashboard'a gidin.
2. **Navigasyon**: Sol menüden "KURUMLAR" sekmesine tıklayın.
3. **Seçim**: İlgili okulu listede bulun veya arama çubuğunu kullanın.
4. **Eylem**: Okul kartının sağ altındaki "Refresh (Yenile)" butonuna basın.
5. **Sonuç**: Sistem arka planda web sitesine erişir ve fiyatları güncelleyip size bildirim verir.

---

> [!TIP]
> **Dashboard Gücü**: Sistemdeki tüm tablolar (Kullanıcılar, Başvurular vb.) anlık arama ve filtreleme destekler. Büyük veri setlerinde hızlı işlem yapmak için üstteki arama çubuklarını kullanmayı unutmayın.
