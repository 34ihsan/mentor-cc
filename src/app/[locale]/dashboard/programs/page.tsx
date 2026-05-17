"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, BookOpen, Clock, Tag, Plus, Edit, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProgramsPage() {
    const { data: session } = useSession();
    const [programs, setPrograms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("ALL");

    const canManage = session?.user?.role === "ADMIN" || session?.user?.role === "CEO" || session?.user?.role === "AGENCY_MANAGER";

    useEffect(() => {
        fetchPrograms();
    }, [category]);

    const fetchPrograms = () => {
        const url = category !== "ALL"
            ? `/api/programs?category=${category}`
            : "/api/programs";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setPrograms(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu programı silmek istediğinizden emin misiniz?")) return;

        try {
            const response = await fetch(`/api/programs/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchPrograms();
            }
        } catch (error) {
            console.error("Failed to delete program:", error);
        }
    };

    const filtered = programs.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.institution?.name.toLowerCase().includes(search.toLowerCase())
    );

    const categories = [
        { value: "ALL", label: "Hepsi" },
        { value: "LANGUAGE", label: "Dil Kursu" },
        { value: "UNDERGRADUATE", label: "Lisans" },
        { value: "POSTGRADUATE", label: "Yüksek Lisans" },
        { value: "PHD", label: "Doktora" },
        { value: "CERTIFICATE", label: "Sertifika" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Eğitim Programları</h2>
                    <p className="text-[var(--text-muted)]">Tüm kategorilerdeki güncel eğitim seçenekleri.</p>
                </div>
                {canManage && (
                    <Link href="/dashboard/programs/new" className="premium-btn flex items-center gap-2">
                        <Plus size={20} />
                        Yeni Program
                    </Link>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="glass-card p-4 flex gap-4 items-center flex-1">
                    <Search className="text-[var(--text-muted)]" size={20} />
                    <input
                        type="text"
                        placeholder="Program veya okul adı ara..."
                        className="bg-transparent border-none outline-none flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="glass-card p-4 flex gap-4 items-center min-w-[200px]">
                    <Filter className="text-[var(--text-muted)]" size={20} />
                    <select
                        className="bg-transparent border-none outline-none flex-1 appearance-none cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">Yükleniyor...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filtered.map(p => (
                        <div key={p.id} className="glass-card p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all group">
                            <div className="w-full md:w-32 h-32 bg-slate-50 rounded-xl flex items-center justify-center text-[var(--primary)] shrink-0">
                                <BookOpen size={40} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold group-hover:text-[var(--primary)] transition-colors">{p.name}</h3>
                                    <p className="text-lg font-bold text-[var(--primary)]">
                                        {p.price > 0 ? `${p.price} ${p.currency}` : "Ücretsiz"}
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-[var(--text-muted)] mb-4">{p.institution?.name}</p>

                                <div className="flex flex-wrap gap-4 mt-auto">
                                    <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                                        <Clock size={14} />
                                        <span>{p.duration || "Belirtilmedi"}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                                        <Tag size={14} />
                                        <span className="bg-blue-50 text-[var(--primary)] px-2 py-0.5 rounded uppercase font-bold text-[10px]">
                                            {p.category.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button className="premium-btn text-xs py-2 flex-1">Hemen Başvur</button>
                                    {canManage && (
                                        <>
                                            <Link
                                                href={`/dashboard/programs/${p.id}/edit`}
                                                className="p-2 border border-[var(--border)] rounded-lg hover:bg-[var(--background)] transition-all"
                                            >
                                                <Edit size={16} className="text-[var(--primary)]" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="p-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
