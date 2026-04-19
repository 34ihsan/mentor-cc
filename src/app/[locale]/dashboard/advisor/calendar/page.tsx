"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar as CalendarIcon,
    Clock,
    Plus,
    Users,
    Video,
    CalendarDays,
    X
} from "lucide-react";
import { toast } from "sonner";

export default function AdvisorCalendar() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newAppt, setNewAppt] = useState({ title: "", startTime: "", endTime: "", type: "ONLINE" });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/advisor/calendar");
            if (res.ok) {
                const data = await res.json();
                setAppointments(data);
            }
        } catch (error) {
            toast.error("Randevular yüklenemedi");
        } finally {
            setLoading(false);
        }
    };

    const handleAddAppointment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/advisor/calendar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAppt)
            });
            if (res.ok) {
                toast.success("Randevu oluşturuldu");
                setIsAdding(false);
                setNewAppt({ title: "", startTime: "", endTime: "", type: "ONLINE" });
                fetchAppointments();
            }
        } catch (error) {
            toast.error("Randevu oluşturulamadı");
        }
    };

    return (
        <div className="space-y-10 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-2">
                        <CalendarIcon size={12} />
                        Planlama ve Zaman Yönetimi
                    </div>
                    <h1 className="text-4xl font-serif italic text-secondary mb-2">Ajanda</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
                        <Plus size={18} />
                        RANDEVU EKLE
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    <div className="premium-card p-8 min-h-[500px]">
                        {loading ? (
                            <div className="flex items-center justify-center h-64"><Clock className="animate-spin text-primary" /></div>
                        ) : (
                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Yaklaşan Görüşmeler</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {appointments.map((appt) => (
                                        <motion.div
                                            key={appt.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-5 bg-zinc-50 border border-zinc-100 rounded-3xl flex items-center justify-between group hover:border-primary transition-all"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="p-4 bg-white shadow-sm rounded-2xl text-primary">
                                                    {appt.type === "VIDEO" ? <Video size={20} /> : <Users size={20} />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-primary">{appt.title}</p>
                                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                                                        {new Date(appt.startTime).toLocaleString("tr", { day: 'numeric', month: 'long', hour: "2-digit", minute: "2-digit" })} • {appt.type}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-black px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 tracking-widest">ONAYLI</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {appointments.length === 0 && (
                                        <div className="text-center py-20 text-zinc-400">
                                            <CalendarDays size={48} className="mx-auto mb-4" />
                                            <p className="font-black uppercase tracking-widest text-xs">Kayıtlı randevu bulunamadı</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="premium-card p-8 bg-primary text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300 mb-2">Haftalık Doluluk</h3>
                            <h2 className="text-4xl font-serif italic text-secondary mb-4">%{(appointments.length * 15 > 100 ? 100 : appointments.length * 15)}</h2>
                            <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${appointments.length * 15}%` }}
                                    className="h-full bg-secondary rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdding(false)} className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
                        <motion.form
                            onSubmit={handleAddAppointment}
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md bg-white p-8 rounded-[32px] shadow-2xl space-y-6"
                        >
                            <div className="flex items-center justify-between mb-2 pb-4 border-b border-zinc-100">
                                <h3 className="text-2xl font-serif italic text-secondary">Yeni Randevu</h3>
                                <button type="button" onClick={() => setIsAdding(false)} className="text-zinc-400 hover:text-primary transition-colors"><X size={20} /></button>
                            </div>
                            <div className="space-y-4">
                                <input required placeholder="Başlık" className="w-full bg-zinc-50 text-primary p-4 rounded-2xl outline-none border border-transparent focus:border-secondary transition-colors text-sm font-bold" value={newAppt.title} onChange={e => setNewAppt({ ...newAppt, title: e.target.value })} />
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">Başlangıç Zamanı</label>
                                        <input required type="datetime-local" className="w-full bg-zinc-50 text-primary p-4 rounded-2xl text-xs uppercase font-bold outline-none focus:border-secondary transition-colors border border-transparent" value={newAppt.startTime} onChange={e => setNewAppt({ ...newAppt, startTime: e.target.value, endTime: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">Tip</label>
                                        <select className="w-full bg-zinc-50 text-primary p-4 rounded-2xl text-xs font-bold outline-none focus:border-secondary transition-colors border border-transparent cursor-pointer" value={newAppt.type} onChange={e => setNewAppt({ ...newAppt, type: e.target.value })}>
                                            <option value="ONLINE">ONLINE (Sesli)</option>
                                            <option value="VIDEO">VIDEO (Görüntülü)</option>
                                            <option value="OFFICE">OFFICE (Yüz Yüze)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full btn-primary py-4">OLUŞTUR</button>
                        </motion.form>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
