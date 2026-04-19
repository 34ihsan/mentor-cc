"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Building2, Globe, MapPin, FileText } from "lucide-react";
import Link from "next/link";

export default function NewInstitutionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        country: "",
        description: "",
        website: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/institutions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push("/dashboard/institutions");
            } else {
                alert("Kurum oluşturulurken hata oluştu");
            }
        } catch (error) {
            console.error("Failed to create institution:", error);
            alert("Kurum oluşturulurken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/institutions"
                    className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold">Yeni Kurum Ekle</h2>
                    <p className="text-[var(--text-muted)]">Sisteme yeni bir eğitim kurumu ekleyin</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="glass-card p-6">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold mb-2">
                                <div className="flex items-center gap-2">
                                    <Building2 size={16} />
                                    Kurum Adı <span className="text-red-500">*</span>
                                </div>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors"
                                placeholder="örn: Harvard University"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    Şehir <span className="text-red-500">*</span>
                                </div>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors"
                                placeholder="örn: Boston"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                <div className="flex items-center gap-2">
                                    <Globe size={16} />
                                    Ülke <span className="text-red-500">*</span>
                                </div>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors"
                                placeholder="örn: USA"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold mb-2">
                                <div className="flex items-center gap-2">
                                    <Globe size={16} />
                                    Website
                                </div>
                            </label>
                            <input
                                type="url"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors"
                                placeholder="https://www.example.com"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold mb-2">
                                <div className="flex items-center gap-2">
                                    <FileText size={16} />
                                    Açıklama
                                </div>
                            </label>
                            <textarea
                                rows={5}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors resize-none"
                                placeholder="Kurum hakkında detaylı bilgi..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-[var(--border)]">
                        <Link
                            href="/dashboard/institutions"
                            className="px-6 py-2 border border-[var(--border)] rounded-lg font-semibold hover:bg-[var(--background)] transition-colors"
                        >
                            İptal
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="premium-btn flex items-center gap-2 px-6"
                        >
                            <Save size={18} />
                            {loading ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
