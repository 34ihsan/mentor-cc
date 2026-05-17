"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Video, MapPin, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AppointmentSchedulerProps {
    applicationId: string;
    studentName: string;
    advisorName: string;
}

export default function AppointmentScheduler({ applicationId, studentName, advisorName }: AppointmentSchedulerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("ONLINE");
    const [loading, setLoading] = useState(false);

    const handleSchedule = async () => {
        setLoading(true);
        // In a real app, call a server action to save the appointment
        setTimeout(() => {
            setLoading(false);
            setIsOpen(false);
            alert("Görüşme başarıyla planlandı!");
        }, 1500);
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
                <CalendarIcon size={14} />
                Görüşme Planla
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[32px] p-8 z-[101] shadow-2xl"
                        >
                            <h3 className="text-2xl font-serif italic text-secondary mb-6 text-center">Görüşme Planla</h3>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 mb-6">
                                    <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                                        <span>Öğrenci</span>
                                        <span>Danışman</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold text-primary">
                                        <span>{studentName}</span>
                                        <span>{advisorName}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Tarih</label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/20 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Saat</label>
                                        <input
                                            type="time"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Görüşme Türü</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setType("ONLINE")}
                                            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                                type === "ONLINE" ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white border-zinc-100 text-zinc-400 hover:border-zinc-200"
                                            }`}
                                        >
                                            <Video size={14} />
                                            Online
                                        </button>
                                        <button
                                            onClick={() => setType("OFFLINE")}
                                            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                                type === "OFFLINE" ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white border-zinc-100 text-zinc-400 hover:border-zinc-200"
                                            }`}
                                        >
                                            <MapPin size={14} />
                                            Ofis
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSchedule}
                                    disabled={loading || !date || !time}
                                    className="w-full mt-6 bg-secondary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary/90 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <CheckCircle2 size={18} />
                                            Randevuyu Kaydet
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
