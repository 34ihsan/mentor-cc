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
    Activity
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [activeTab, setActiveTab] = useState("general");
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

    const tabs = [
        { id: "general", label: "Genel Bilgiler", icon: UserIcon },
        { id: "security", label: "Güvenlik", icon: ShieldCheck },
        { id: "notifications", label: "Bildirimler", icon: Bell },
        { id: "billing", label: "Ödemeler", icon: CreditCard },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <div className="flex items-center gap-2 text-[#003366] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Settings size={12} />
                        Hesap ve Kişiselleştirme
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900">Profil Ayarları</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Navigation & Status Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* User Hero Card */}
                    <div className="glass-card p-8 border-white/40 shadow-2xl shadow-blue-900/5 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Sparkles size={64} className="text-[var(--primary)]" />
                        </div>

                        <div className="relative inline-block mb-6">
                            <div className="w-32 h-32 mx-auto rounded-[40px] bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-2xl shadow-blue-900/10 overflow-hidden relative group/avatar">
                                <UserIcon size={48} className="text-black group-hover/avatar:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                    <Camera size={24} className="text-white" />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-500 border-4 border-white dark:border-slate-800 flex items-center justify-center text-white shadow-lg">
                                <ShieldCheck size={18} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-black tracking-tighter text-slate-900 mb-1">
                                {session?.user?.name || "Kullanıcı"}
                            </h3>
                            <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">
                                {session?.user?.role || "STUDENT"}
                            </p>
                            <div className="flex items-center justify-center gap-4 py-4 px-6 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div className="text-center flex-1">
                                    <p className="text-[10px] font-black text-slate-900 uppercase mb-1">Hesap Türü</p>
                                    <p className="text-xs font-black text-[#003366] uppercase">Premium</p>
                                </div>
                                <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-800" />
                                <div className="text-center flex-1">
                                    <p className="text-[10px] font-black text-slate-900 uppercase mb-1">Durum</p>
                                    <p className="text-xs font-black text-emerald-600 uppercase">Aktif</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Navigation Tabs */}
                    <div className="glass-card p-2 border-white/40 shadow-xl shadow-blue-900/5 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${activeTab === tab.id
                                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-white"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                                    <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                                </div>
                                <ChevronRight size={14} className={activeTab === tab.id ? "opacity-100" : "opacity-0"} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Content Area */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {activeTab === "general" && (
                            <motion.div
                                key="general"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="glass-card p-10 border-white/40 shadow-2xl shadow-blue-900/5"
                            >
                                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
                                    <div>
                                        <h3 className="text-xl font-black tracking-tighter text-slate-900 mb-1">Kişisel Envanter</h3>
                                        <p className="text-xs text-slate-900 font-medium tracking-tight">Profil bilgileriniz bütün servislerde görünür kalacaktır.</p>
                                    </div>
                                    <Activity size={24} className="text-slate-100 dark:text-slate-800" />
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest px-1">Tam İsim</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black group-focus-within:text-[var(--primary)] transition-colors">
                                                    <UserIcon size={16} />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 pl-11 rounded-2xl outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold"
                                                    placeholder="Adınız Soyadınız"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-slate-900 dark:text-white">
                                            <label className="text-[10px] font-black uppercase tracking-widest px-1">E-posta Adresi</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none opacity-50">
                                                    <Mail size={16} />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    disabled
                                                    className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-3.5 pl-11 rounded-2xl outline-none cursor-not-allowed text-sm font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest px-1">İletişim Hattı</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black group-focus-within:text-[var(--primary)] transition-colors">
                                                    <Phone size={16} />
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 pl-11 rounded-2xl outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold"
                                                    placeholder="+90 555 123 4567"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest px-1">Doğum Tarihi</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black group-focus-within:text-[var(--primary)] transition-colors">
                                                    <Calendar size={16} />
                                                </div>
                                                <input
                                                    type="date"
                                                    value={formData.birthdate}
                                                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 pl-11 rounded-2xl outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest px-1">Lokasyon / Adres Bilgisi</label>
                                            <div className="relative group">
                                                <div className="absolute top-4 left-4 pointer-events-none text-black group-focus-within:text-[var(--primary)] transition-colors">
                                                    <MapPin size={16} />
                                                </div>
                                                <textarea
                                                    rows={4}
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 pl-11 rounded-2xl outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold resize-none"
                                                    placeholder="Mevcut ikamet adresinizi giriniz..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-8 border-t border-slate-100 dark:border-slate-800">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={loading}
                                            className="premium-btn flex items-center gap-3 px-10 py-4 shadow-xl shadow-blue-900/10"
                                        >
                                            <Save size={18} />
                                            <span className="text-xs font-black uppercase tracking-[0.2em]">{loading ? "KAYDEDİLİYOR" : "PROFİLİ GÜNCELLE"}</span>
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === "security" && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="glass-card p-10 border-white/40 shadow-2xl shadow-blue-900/5"
                            >
                                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
                                    <div>
                                        <h3 className="text-xl font-black tracking-tighter text-slate-900 mb-1">Güvenlik ve Erişim</h3>
                                        <p className="text-xs text-slate-900 font-medium tracking-tight">Hesabınızın güvenliğini üst düzeyde tutun.</p>
                                    </div>
                                    <Lock size={24} className="text-slate-100 dark:text-slate-800" />
                                </div>

                                <div className="space-y-10">
                                    <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-[var(--primary)]">
                                                    <ShieldCheck size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">İki Faktörlü Doğrulama</p>
                                                    <p className="text-[10px] text-slate-900 dark:text-white font-bold uppercase tracking-widest mt-0.5">Önerilen Güvenlik Katmanı</p>
                                                </div>
                                            </div>
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm"
                                            >
                                                AKTİFLEŞTİR
                                            </motion.button>
                                        </div>
                                    </div>

                                    {!showPasswordChange ? (
                                        <div className="flex items-center justify-between p-2">
                                            <div>
                                                <p className="text-sm font-black text-slate-800 dark:text-white">Giriş Şifresi</p>
                                                <p className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest mt-1">Son güncelleme: 3 ay önce</p>
                                            </div>
                                            <button
                                                onClick={() => setShowPasswordChange(true)}
                                                className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.2em] border-b-2 border-blue-500/0 hover:border-blue-500 transition-all pb-1"
                                            >
                                                ŞİFREYİ DEĞİŞTİR
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handlePasswordChange} className="space-y-6 pt-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest px-1">Mevcut Şifre</label>
                                                    <input
                                                        type="password"
                                                        value={passwordData.currentPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest px-1">Yeni Şifre</label>
                                                    <input
                                                        type="password"
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest px-1">Şifre Tekrar</label>
                                                    <input
                                                        type="password"
                                                        value={passwordData.confirmPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 rounded-2xl outline-none focus:border-[var(--primary)] text-sm font-bold"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswordChange(false)}
                                                    className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-white transition-all"
                                                >
                                                    İPTAL
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="premium-btn px-8 py-3 rounded-2xl shadow-lg shadow-blue-900/10 text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    ŞİFREYİ GÜNCELLE
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
