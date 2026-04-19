"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Send, 
    Paperclip, 
    X, 
    User, 
    Check, 
    CheckCheck, 
    Clock,
    FileIcon,
    MoreVertical
} from "lucide-react";
import { sendMessageAction, getMessagesAction, markAsReadAction } from "@/app/actions/message-actions";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface ChatWindowProps {
    currentUser: any;
    otherUser: {
        id: string;
        name: string;
        role: string;
    } | null;
    applicationId?: string;
    onClose?: () => void;
}

export default function ChatWindow({ currentUser, otherUser, applicationId, onClose }: ChatWindowProps) {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (otherUser) {
            loadMessages();
            // Polling for new messages every 10 seconds (simplest way without WebSockets)
            const interval = setInterval(loadMessages, 10000);
            return () => clearInterval(interval);
        }
    }, [otherUser, applicationId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const loadMessages = async () => {
        if (!otherUser) return;
        const result = await getMessagesAction(otherUser.id, applicationId);
        if (result.success) {
            setMessages(result.data || []);
            // Mark unread messages as read
            result.data?.forEach(msg => {
                if (!msg.isRead && msg.receiverId === currentUser.id) {
                    markAsReadAction(msg.id);
                }
            });
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !otherUser) return;

        const content = newMessage.trim();
        setNewMessage("");

        const result = await sendMessageAction({
            content,
            receiverId: otherUser.id,
            applicationId: applicationId
        });

        if (result.success) {
            loadMessages();
        } else {
            alert(result.error);
        }
    };

    if (!otherUser) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="flex flex-col w-full h-[600px] max-h-[80vh] bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
        >
            {/* Header */}
            <div className="p-5 border-b border-slate-50 dark:border-slate-900 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white font-black text-sm">
                        {otherUser.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{otherUser.name}</h3>
                        <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{otherUser.role}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors">
                        <MoreVertical size={18} />
                    </button>
                    {onClose && (
                        <button onClick={onClose} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-colors">
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Messages Area */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20 dark:bg-slate-950/20"
            >
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 py-20 text-center">
                        <MessageSquare className="w-12 h-12 mb-4 text-slate-950" />
                        <p className="text-xs font-black uppercase tracking-widest">Henüz mesaj yok.<br/>İlk mesajı siz gönderin.</p>
                    </div>
                ) : (
                    messages.map((msg, i) => {
                        const isMine = msg.senderId === currentUser.id;
                        return (
                            <motion.div 
                                key={msg.id}
                                initial={{ opacity: 0, x: isMine ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                                    <div className={`
                                        p-4 rounded-3xl text-sm font-bold shadow-sm
                                        ${isMine 
                                            ? 'bg-[var(--primary)] text-white rounded-br-none' 
                                            : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 rounded-bl-none'}
                                    `}>
                                        {msg.content}
                                        
                                        {msg.fileName && (
                                            <div className="mt-3 p-3 rounded-2xl bg-black/10 flex items-center gap-3">
                                                <FileIcon size={16} />
                                                <a href={msg.fileUrl} target="_blank" className="text-xs underline truncate max-w-[150px]">{msg.fileName}</a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-1.5 flex items-center gap-1.5 px-2">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                                            {format(new Date(msg.createdAt), 'HH:mm', { locale: tr })}
                                        </span>
                                        {isMine && (
                                            msg.isRead 
                                                ? <CheckCheck size={10} className="text-[var(--primary)]" /> 
                                                : <Check size={10} className="text-slate-300" />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white dark:bg-slate-950 border-t border-slate-50 dark:border-slate-900">
                <form onSubmit={handleSend} className="flex items-center gap-3">
                    <button type="button" className="p-3 text-slate-400 hover:text-[var(--primary)] transition-colors">
                        <Paperclip size={20} />
                    </button>
                    <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Mesajınızı yazın..."
                        className="flex-1 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-4 px-6 text-sm font-black text-slate-900 dark:text-white outline-none focus:ring-2 ring-[var(--primary)]/20 transition-all placeholder:text-slate-400"
                    />
                    <button 
                        type="submit"
                        disabled={!newMessage.trim()}
                        className={`
                            p-4 rounded-2xl transition-all
                            ${newMessage.trim() 
                                ? 'bg-[var(--primary)] text-white shadow-xl shadow-blue-500/20' 
                                : 'bg-slate-100 text-slate-300'}
                        `}
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </motion.div>
    );
}

function MessageSquare(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    )
}
