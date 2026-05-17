"use client";

import { useState } from "react";
import { Lock, Send, User, MessageSquare, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { sendInternalNoteAction } from "@/app/actions/internal-note-actions";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface Note {
    id: string;
    content: string;
    createdAt: Date;
    label?: string;
    sender: {
        name: string | null;
        role: string;
    };
}

interface InternalNotesProps {
    applicationId: string;
    initialNotes: Note[];
}

export default function InternalNotes({ applicationId, initialNotes }: InternalNotesProps) {
    const [notes, setNotes] = useState(initialNotes);
    const [newNote, setNewNote] = useState("");
    const [label, setLabel] = useState("GENEL");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!newNote.trim()) return;
        setLoading(true);
        try {
            const res = await sendInternalNoteAction(applicationId, newNote, label);
            if (res.success) {
                // In a real app we'd fetch or use the returned data
                // For now just optimistic update if we have enough info
                setNewNote("");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[500px] premium-card bg-zinc-900 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent/20 text-accent">
                        <Lock size={18} />
                    </div>
                    <div>
                        <h3 className="text-white font-serif italic text-lg">Dahili Notlar</h3>
                        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Sadece ekip görebilir</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {["GENEL", "EVRAK", "VİZE", "ÖDEME"].map((l) => (
                        <button
                            key={l}
                            onClick={() => setLabel(l)}
                            className={`px-3 py-1 rounded-full text-[8px] font-black tracking-tighter transition-all ${
                                label === l ? "bg-white text-zinc-900" : "bg-white/5 text-zinc-500 hover:bg-white/10"
                            }`}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {notes.map((note, i) => (
                    <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-2"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                                    <User size={12} className="text-white/50" />
                                </div>
                                <span className="text-[10px] font-bold text-white/70">{note.sender.name}</span>
                                <span className="text-[8px] font-black bg-white/5 text-zinc-500 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                    {note.sender.role}
                                </span>
                            </div>
                            <span className="text-[8px] text-zinc-600 font-bold">
                                {format(new Date(note.createdAt), "dd MMM HH:mm", { locale: tr })}
                            </span>
                        </div>
                        <div className="relative p-4 rounded-2xl bg-white/5 border border-white/5 group">
                            <div className="absolute -top-2 right-4 px-2 py-0.5 rounded-md bg-zinc-800 border border-white/5 text-[8px] font-black text-accent flex items-center gap-1">
                                <Tag size={8} />
                                {note.label}
                            </div>
                            <p className="text-sm text-zinc-300 leading-relaxed">{note.content}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-6 bg-zinc-900/80 border-t border-white/5">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Bir not ekleyin..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white/20 transition-all"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="p-3 rounded-2xl bg-accent text-white hover:bg-accent/80 transition-all disabled:opacity-50"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
