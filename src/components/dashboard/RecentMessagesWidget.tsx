"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getRecentMessagesAction } from "@/app/actions/message-actions";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

export default function RecentMessagesWidget() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            const result = await getRecentMessagesAction(5);
            if (result.success) setMessages(result.data || []);
            setLoading(false);
        };
        fetchMessages();
    }, []);

    if (loading) return (
        <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
        </div>
    );

    return (
        <div className="premium-card overflow-hidden h-fit flex flex-col">
            <div className="p-8 border-b border-zinc-50 flex items-center justify-between">
                <div>
                    <span className="text-[9px] font-black text-secondary uppercase tracking-[0.3em] mb-1 block">İletişim Ünitesi</span>
                    <h3 className="text-sm font-bold text-primary flex items-center gap-3">
                        <MessageSquare size={18} className="text-secondary" />
                        Son Mesajlar
                    </h3>
                </div>
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-[8px] font-black text-zinc-400">
                            +
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-2 space-y-1">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 opacity-20 gap-3 mt-4">
                        <div className="w-10 h-10 rounded-full border-2 border-dashed border-zinc-300" />
                        <p className="text-[9px] font-black uppercase tracking-widest text-center">
                            MesaJ Bulunmuyor
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <Link 
                            key={msg.id} 
                            href={`/dashboard/applications/${msg.applicationId}`}
                            className="block group"
                        >
                            <div className="flex gap-4 p-4 rounded-xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100">
                                <div className="w-12 h-12 rounded-lg border border-zinc-100 bg-white shadow-sm flex items-center justify-center font-serif font-bold italic text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shrink-0">
                                    {msg.sender.name.charAt(0)}
                                </div>
                                <div className="min-w-0 flex-1 pt-1">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <p className="text-[11px] font-black text-primary truncate pr-2 uppercase tracking-tight">
                                            {msg.sender.name}
                                        </p>
                                        <span className="text-[8px] font-mono font-bold text-zinc-400 whitespace-nowrap">
                                            {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true, locale: tr })}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-zinc-500 line-clamp-1 font-serif italic">
                                        "{msg.content}"
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 mt-auto">
                <Link 
                    href="/dashboard/messages" 
                    className="text-[10px] font-black text-zinc-400 hover:text-primary uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors group"
                >
                    MESAJLAR MERKEZİ 
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-secondary" />
                </Link>
            </div>
        </div>
    );
}
