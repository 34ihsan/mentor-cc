"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProgramPage() {
    const router = useRouter();
    const [institutions, setInstitutions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "UNDERGRADUATE",
        description: "",
        duration: "",
        price: "",
        currency: "USD",
        institutionId: "",
    });

    useEffect(() => {
        fetch("/api/institutions")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setInstitutions(data);
            })
            .catch((err) => console.error("Failed to fetch institutions:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/programs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push("/dashboard/programs");
            } else {
                alert("Program oluşturulurken hata oluştu");
            }
        } catch (error) {
            console.error("Failed to create program:", error);
            alert("Program oluşturulurken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/programs"
                    className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold">Yeni Program Ekle</h2>
                    <p className="text-[var(--text-muted)]">Sisteme yeni bir eğitim programı ekleyin</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="glass-card p-6">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Program Adı <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors"
                                placeholder="örn: Business Administration"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Kategori <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors appearance-none cursor-pointer"
                            >
                                <option value="LANGUAGE">Dil Kursu</option>
                                <option value="UNDERGRADUATE">Lisans</option>
                                <option value="POSTGRADUATE">Yüksek Lisans</option>
                                <option value="PHD">Doktora</option>
                                <option value="CERTIFICATE">Sertifika</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold mb-2">
                                Kurum <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                value={formData.institutionId}
                                onChange={(e) =>
                                    setFormData({ ...formData, institutionId: e.target.value })
                                }
                                className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors appearance-none cursor-pointer"
                            >
                                <option value="">Bir kurum seçin</option>
                                {institutions.map((inst) => (
                                    <option key={inst.id} value={inst.id}>
                                        {inst.name} - {inst.city}, {inst.country?.name || (typeof inst.country === 'string' ? inst.country : '')}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Süre</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors"
                                placeholder="örn: 2 yıl, 3 ay"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Fiyat</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Para Birimi</label>
                                <select
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                    className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="TRY">TRY</option>
                                </select>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold mb-2">Açıklama</label>
                            <textarea
                                rows={5}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="w-full p-3 border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors resize-none"
                                placeholder="Program hakkında detaylı bilgi..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-[var(--border)]">
                        <Link
                            href="/dashboard/programs"
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
