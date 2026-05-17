"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
    Clock, 
    User as UserIcon, 
    School, 
    ChevronRight, 
    MoreHorizontal,
    GripVertical,
    Calendar,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface ApplicationKanbanProps {
    applications: any[];
    onStatusChange: (id: string, newStatus: string) => Promise<void>;
}

const statusColumns = [
    { id: "DRAFT", label: "Taslak", color: "bg-slate-500" },
    { id: "DOCS_PENDING", label: "Belge Bekleniyor", color: "bg-amber-500" },
    { id: "UNDER_REVIEW", label: "İncelemede", color: "bg-blue-500" },
    { id: "OFFER_SENT", label: "Teklif Gönderildi", color: "bg-purple-500" },
    { id: "CONTRACT_SIGNED", label: "Sözleşme Onaylandı", color: "bg-emerald-500" },
    { id: "COMPLETED", label: "Tamamlandı", color: "bg-[#003366]" },
];

export default function ApplicationKanban({ applications, onStatusChange }: ApplicationKanbanProps) {
    const [draggedId, setDraggedId] = useState<string | null>(null);

    const handleDragStart = (id: string) => {
        setDraggedId(id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = async (status: string) => {
        if (!draggedId) return;
        
        const app = applications.find(a => a.id === draggedId);
        if (app && app.status !== status) {
            try {
                await onStatusChange(draggedId, status);
                toast.success(`Durum güncellendi: ${status}`);
            } catch (error) {
                toast.error("Güncelleme başarısız oldu");
            }
        }
        setDraggedId(null);
    };

    return (
        <div className="flex gap-6 overflow-x-auto pb-8 min-h-[700px] scrollbar-hide">
            {statusColumns.map((column) => {
                const columnApps = applications.filter(app => app.status === column.id);
                
                return (
                    <div 
                        key={column.id}
                        className="flex-shrink-0 w-[320px] flex flex-col gap-4"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(column.id)}
                    >
                        {/* Column Header */}
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${column.color} shadow-[0_0_8px_rgba(0,0,0,0.2)]`} />
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                    {column.label}
                                </h3>
                                <span className="bg-zinc-100 text-zinc-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {columnApps.length}
                                </span>
                            </div>
                            <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>

                        {/* Column Content */}
                        <div className={`flex-1 rounded-2xl p-3 transition-colors duration-300 ${draggedId ? 'bg-zinc-100/50 outline-2 outline-dashed outline-zinc-200 outline-offset-2' : 'bg-transparent'}`}>
                            <div className="flex flex-col gap-3">
                                <AnimatePresence mode="popLayout">
                                    {columnApps.map((app) => (
                                        <motion.div
                                            key={app.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            draggable
                                            onDragStart={() => handleDragStart(app.id)}
                                            className="group bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all cursor-grab active:cursor-grabbing relative overflow-hidden"
                                        >
                                            {/* Decoration */}
                                            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${column.color.replace('bg-', 'from-')}/5 to-transparent rounded-bl-full transform translate-x-4 -translate-y-4 transition-transform group-hover:scale-150`} />

                                            <div className="flex flex-col gap-4 relative z-10">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                                                        <Clock size={10} />
                                                        {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                                                    </div>
                                                    <GripVertical size={14} className="text-zinc-300 group-hover:text-zinc-400" />
                                                </div>

                                                <div>
                                                    <h4 className="font-bold text-zinc-900 group-hover:text-primary transition-colors line-clamp-1">
                                                        {app.student?.name || "İsimsiz Öğrenci"}
                                                    </h4>
                                                    <p className="text-[10px] font-medium text-zinc-500 mt-0.5 truncate">
                                                        {app.student?.email}
                                                    </p>
                                                </div>

                                                <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100/50 group-hover:bg-white group-hover:border-primary/10 transition-colors">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <School size={12} className="text-secondary" />
                                                        <span className="text-[11px] font-bold text-zinc-700 truncate">
                                                            {app.program?.institution?.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                                                        <span className="text-[10px] font-medium text-zinc-500 truncate">
                                                            {app.program?.name}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-2 border-t border-zinc-50">
                                                    <div className="flex -space-x-2">
                                                        <div className="w-6 h-6 rounded-lg bg-zinc-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-zinc-600">
                                                            {app.student?.name?.charAt(0)}
                                                        </div>
                                                        {app.consultant && (
                                                            <div className="w-6 h-6 rounded-lg bg-primary border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm" title={`Danışman: ${app.consultant.name}`}>
                                                                {app.consultant.name?.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Link 
                                                        href={`/dashboard/applications/${app.id}`}
                                                        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors"
                                                    >
                                                        Detaylar
                                                        <ArrowRight size={12} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {columnApps.length === 0 && (
                                    <div className="h-24 border-2 border-dashed border-zinc-100 rounded-2xl flex items-center justify-center">
                                        <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Boş</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
