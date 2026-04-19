"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
    Save,
    User as UserIcon,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Lock,
    Camera,
    ShieldCheck,
    Bell,
    Globe,
    CreditCard,
    ChevronRight,
    Sparkles,
    Settings,
    Activity,
    Shield,
    Palette,
    Languages,
    Users
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        birthdate: "",
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (session?.user) {
            fetchProfile();
        }
    }, [session]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/api/users/${session?.user?.id}`);
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.profile?.phone || "",
                    address: data.profile?.address || "",
                    birthdate: data.profile?.birthdate
                        ? new Date(data.profile.birthdate).toISOString().split("T")[0]
                        : "",
                });
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/users/${session?.user?.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await update(); // Refresh session
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/users/${session?.user?.id}/password`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            if (response.ok) {
                setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                setShowPasswordChange(false);
            }
        } catch (error) {
            console.error("Failed to change password:", error);
        } finally {
            setLoading(false);
        }
    };

    const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "CEO";

    const tabs = [
        { id: "profile", label: "Profil Bilgileri", icon: UserIcon },
        { id: "security", label: "Güvenlik & Şifre", icon: ShieldCheck },
        { id: "notifications", label: "Bildirim Ayarları", icon: Bell },
        { id: "appearance", label: "Görünüm", icon: Palette },
        ...(isAdmin ? [{ id: "system", label: "Sistem Ayarları", icon: Settings }] : []),
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-2">
                        <Settings size={12} />
                        Hesap Kontrol Paneli
                    </div>
                    <h1 className="text-4xl font-serif italic text-secondary mb-2">Ayarlar ve Tercihler</h1>
                    <p className="text-zinc-500 font-medium mt-1">Hesabınızı, güvenliğinizi ve uygulama deneyiminizi buradan yönetin.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="premium-card p-3 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                    ? "bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02]"
                                    : "hover:bg-zinc-50 text-zinc-500 hover:text-primary"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                                    <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                                </div>
                                <ChevronRight size={14} className={`transition-all ${activeTab === tab.id ? "opacity-100 rotate-90" : "opacity-0"}`} />
                            </button>
                        ))}
                    </div>

                    {/* Status Card */}
                    <div className="glass-card p-6 border-white/40 shadow-lg shadow-blue-900/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Hesap Durumu</p>
                                <p className="text-sm font-black text-slate-900 uppercase">Doğrulanmış Üye</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-500">
                                <span>Profil Doluluk Oranı</span>
                                <span className="text-slate-900">%85</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    className="h-full bg-slate-950"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {activeTab === "profile" && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="premium-card p-10 px-10"
                            >
                                <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-100">
                                    <div>
                                        <h3 className="text-2xl font-serif italic text-secondary mb-1">Profil Bilgileri</h3>
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Kişisel envanterinizi güncel tutun</p>
                                    </div>
                                    <UserIcon size={24} className="text-zinc-200" />
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest px-1">Tam İsim</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-2xl outline-none focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5 transition-all text-sm font-bold text-slate-950"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">E-posta (Salt Okunur)</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                disabled
                                                className="w-full bg-slate-100/50 border border-slate-200 p-3.5 rounded-2xl outline-none text-sm font-bold text-slate-400 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest px-1">Telefon Numarası</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-2xl outline-none focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5 transition-all text-sm font-bold text-slate-950"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest px-1">Doğum Tarihi</label>
                                            <input
                                                type="date"
                                                value={formData.birthdate}
                                                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-2xl outline-none focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5 transition-all text-sm font-bold text-slate-950"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest px-1">Adres</label>
                                            <textarea
                                                rows={3}
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-2xl outline-none focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5 transition-all text-sm font-bold text-slate-950 resize-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-6 border-t border-slate-100">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-10 py-4 bg-slate-950 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
                                        >
                                            {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === "security" && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="premium-card p-10 px-10"
                            >
                                <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-100">
                                    <div>
                                        <h3 className="text-2xl font-serif italic text-secondary mb-1">Güvenlik ve Erişim</h3>
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Hesap güvenliğinizi optimize edin</p>
                                    </div>
                                    <Lock size={24} className="text-zinc-200" />
                                </div>

                                <div className="space-y-10">
                                    <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-xl bg-white shadow-sm text-slate-950 border border-slate-100">
                                                <ShieldCheck size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-950">İki Faktörlü Doğrulama (2FA)</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Henüz aktif değil</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all shadow-lg shadow-slate-900/5">
                                            ETKİNLEŞTİR
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Şifre Değiştirme</h4>
                                        <form onSubmit={handlePasswordChange} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest px-1">Mevcut Şifre</label>
                                                    <input
                                                        type="password"
                                                        value={passwordData.currentPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-2xl outline-none focus:border-slate-950 text-sm font-bold text-slate-950"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest px-1">Yeni Şifre</label>
                                                    <input
                                                        type="password"
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-2xl outline-none focus:border-slate-950 text-sm font-bold text-slate-950"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest px-1">Yeni Şifre Tekrar</label>
                                                    <input
                                                        type="password"
                                                        value={passwordData.confirmPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-2xl outline-none focus:border-slate-950 text-sm font-bold text-slate-950"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="px-8 py-3 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all shadow-lg shadow-slate-900/5 disabled:opacity-50"
                                                >
                                                    {loading ? "GÜNCELLENİYOR..." : "ŞİFREYİ GÜNCELLE"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "appearance" && (
                            <motion.div
                                key="appearance"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="premium-card p-10 px-10"
                            >
                                <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-100">
                                    <div>
                                        <h3 className="text-2xl font-serif italic text-secondary mb-1">Görünüm ve Tema</h3>
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Arayüz deneyiminizi kişiselleştirin</p>
                                    </div>
                                    <Palette size={24} className="text-zinc-200" />
                                </div>

                                <div className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 rounded-3xl border-2 border-slate-950 bg-white shadow-xl flex flex-col items-center gap-4 cursor-pointer group">
                                            <div className="w-full h-24 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden p-2">
                                                <div className="w-full h-4 bg-slate-200 rounded-full mb-2" />
                                                <div className="w-2/3 h-4 bg-slate-100 rounded-full" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-black text-slate-950 uppercase tracking-tight">Açık Tema</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Sistem Varsayılanı</p>
                                            </div>
                                        </div>
                                        <div className="p-6 rounded-3xl border border-slate-100 bg-slate-900 flex flex-col items-center gap-4 cursor-not-allowed opacity-40 grayscale group">
                                            <div className="w-full h-24 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden p-2">
                                                <div className="w-full h-4 bg-slate-700 rounded-full mb-2" />
                                                <div className="w-2/3 h-4 bg-slate-800 rounded-full" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-black text-white uppercase tracking-tight">Koyu Tema</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Yakında</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Dil Seçimi</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="p-4 flex items-center justify-between bg-slate-50 border-2 border-slate-950 rounded-2xl">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg">🇹🇷</span>
                                                    <span className="text-xs font-black text-slate-950">Türkçe</span>
                                                </div>
                                                <ShieldCheck size={16} className="text-slate-950" />
                                            </button>
                                            <button className="p-4 flex items-center justify-between bg-white border border-slate-100 rounded-2xl opacity-50 cursor-not-allowed">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg">🇺🇸</span>
                                                    <span className="text-xs font-black text-slate-950">English</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "notifications" && (
                            <motion.div
                                key="notifications"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="premium-card p-10 px-10"
                            >
                                <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-100">
                                    <div>
                                        <h3 className="text-2xl font-serif italic text-secondary mb-1">Bildirim Tercihleri</h3>
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Hangi durumlarda bilgi almak istediğinizi seçin</p>
                                    </div>
                                    <Bell size={24} className="text-zinc-200" />
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { title: "E-Posta Bildirimleri", desc: "Yeni mesaj ve başvuru güncellemeleri mail olarak iletilir.", active: true },
                                        { title: "Sistem Duyuruları", desc: "Önemli güncellemeler ve kampanya bilgileri.", active: true },
                                        { title: "Pazarlama Duyuruları", desc: "Yeni programlar ve fırsatlar hakkında bilgiler.", active: false },
                                        { title: "Hizmet Güncellemeleri", desc: "Bakım ve teknik gelişim bildirimleri.", active: true }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                                            <div className="max-w-[80%]">
                                                <p className="text-sm font-black text-slate-950">{item.title}</p>
                                                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tight">{item.desc}</p>
                                            </div>
                                            <div className={`w-12 h-6 rounded-full relative transition-colors ${item.active ? 'bg-slate-950' : 'bg-slate-200'}`}>
                                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${item.active ? 'right-1' : 'left-1'}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "system" && isAdmin && (
                            <motion.div
                                key="system"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="premium-card p-10 px-10"
                            >
                                <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-100">
                                    <div>
                                        <h3 className="text-2xl font-serif italic text-secondary mb-1">Yönetici Paneli</h3>
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Sistem geneli konfigürasyon ve kayıtlar</p>
                                    </div>
                                    <Shield size={24} className="text-zinc-200" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { title: "Sistem Ayarları", icon: Settings, link: "/dashboard/admin/settings/general", desc: "Genel opsiyonlar ve site ayarları" },
                                        { title: "Bölge Yönetimi", icon: MapPin, link: "/dashboard/admin/settings/regions", desc: "Ofisler ve çalışma bölgeleri" },
                                        { title: "Kritik Kayıtlar", icon: Activity, link: "/dashboard/admin/logs", desc: "Sistem üzerindeki tüm hareket dökümleri" },
                                        { title: "Ekip Yetkilendirme", icon: Users, link: "/dashboard/ceo/users", desc: "Rol bazlı yetki matrisi yönetimi" }
                                    ].map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={() => router.push(item.link)}
                                            className="p-6 flex items-start gap-4 bg-white border border-slate-100 rounded-3xl hover:border-slate-950 hover:shadow-xl transition-all text-left group"
                                        >
                                            <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-slate-950 transition-colors">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-950 uppercase tracking-tight">{item.title}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 leading-tight">{item.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
