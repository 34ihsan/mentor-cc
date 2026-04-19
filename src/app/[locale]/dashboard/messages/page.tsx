"use client";

import { useState, useEffect, useRef } from "react";
import {
    Send,
    MessageSquare,
    User as UserIcon,
    Search,
    MoreVertical,
    Paperclip,
    Smile,
    ChevronLeft,
    Clock,
    Sparkles,
    CheckCircle2,
    FileText,
    Download,
    Loader2,
    Link as LinkIcon,
    Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Message {
    id: string;
    content: string;
    fileUrl?: string | null;
    fileName?: string | null;
    createdAt: string;
    isRead: boolean;
    sender: {
        id: string;
        name: string | null;
        email: string;
    };
    receiver: {
        id: string;
        name: string | null;
        email: string;
    };
    applicationId?: string | null;
    application?: {
        id: string;
        program: {
            name: string;
        };
    };
}

export default function MessagesPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [search, setSearch] = useState("");
    const [userSearchQuery, setUserSearchQuery] = useState("");
    const [contacts, setContacts] = useState<any[]>([]);
    const [primaryContact, setPrimaryContact] = useState<any>(null);
    const [showUserSearch, setShowUserSearch] = useState(false);
    const [uploading, setUploading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchMessages();
        fetchContacts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 3000); // Check every 3 seconds for a real-time experience
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, selectedConversation]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch("/api/messages");
            if (response.ok) {
                const data = await response.json();
                setMessages(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchContacts = async () => {
        try {
            const response = await fetch("/api/messages/contacts");
            if (response.ok) {
                const data = await response.json();
                if (data.primaryContact) setPrimaryContact(data.primaryContact);
                if (data.contacts) setContacts(data.contacts);
            }
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
        }
    };

    // Robust Auto-selection Effect
    useEffect(() => {
        if (!selectedConversation && primaryContact && session?.user?.role) {
            if (session.user.role === "STUDENT" || session.user.role === "AGENCY_MANAGER") {
                setSelectedConversation(primaryContact.id);
            }
        }
    }, [primaryContact, session, selectedConversation]);

    const handleSendMessage = async (receiverId: string, options: { content: string, fileUrl?: string, fileName?: string, applicationId?: string }) => {
        if (!options.content.trim() && !options.fileUrl) return;

        const { content, fileUrl, fileName, applicationId } = options;

        // Optimistic update
        const tempId = Math.random().toString();
        const optimisticMsg: any = {
            id: tempId,
            content,
            fileUrl,
            fileName,
            createdAt: new Date().toISOString(),
            sender: { id: session?.user?.id, name: session?.user?.name, email: session?.user?.email },
            receiver: { id: receiverId },
        };
        setMessages(prev => [...prev, optimisticMsg]);

        try {
            const response = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content,
                    receiverId,
                    applicationId: applicationId || null,
                    fileUrl: fileUrl || null,
                    fileName: fileName || null,
                }),
            });

            if (!response.ok) {
                toast.error("Mesaj gönderilemedi");
                setMessages(prev => prev.filter(m => m.id !== tempId));
            } else {
                fetchMessages();
            }
        } catch (error) {
            toast.error("Mesaj gönderilemedi");
            setMessages(prev => prev.filter(m => m.id !== tempId));
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await fetch("/api/messages", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messageId: id }),
            });
            setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const markConversationAsRead = async (otherId: string) => {
        const unreadIds = messages
            .filter(m => m.receiver.id === session?.user?.id && m.sender.id === otherId && !m.isRead)
            .map(m => m.id);

        if (unreadIds.length === 0) return;

        try {
            // Ideally, we'd have a markAllAsRead endpoint, but we can do it individually or improve API
            // I added markAllAsRead support in API earlier, let's use it if applicable
            // For now, let's mark the most recent one or the whole conversation
            const msg = messages.find(m => m.sender.id === otherId && m.receiver.id === session?.user?.id);
            if (!msg?.applicationId) {
                // Fallback to individual for now if no app context
                for (const id of unreadIds) {
                    await markAsRead(id);
                }
                return;
            }

            await fetch("/api/messages", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    applicationId: msg.applicationId,
                    markAllAsRead: true
                }),
            });

            setMessages(prev => prev.map(m =>
                (m.sender.id === otherId && m.receiver.id === session?.user?.id)
                    ? { ...m, isRead: true }
                    : m
            ));
        } catch (error) {
            console.error("Failed to mark conversation as read:", error);
        }
    };

    useEffect(() => {
        if (selectedConversation) {
            markConversationAsRead(selectedConversation);
        }
    }, [selectedConversation, messages.length]);

    const handleDeleteMessage = async (id: string) => {
        try {
            const res = await fetch(`/api/messages?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setMessages(prev => prev.filter(m => m.id !== id));
                toast.success("Mesaj silindi");
            } else {
                throw new Error("Silme işlemi başarısız");
            }
        } catch (error) {
            toast.error("Mesaj silinemedi");
        }
    };

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !selectedConversation) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const { url } = await res.json();
                await handleSendMessage(selectedConversation, {
                    content: `Belge gönderildi: ${file.name}`,
                    fileUrl: url,
                    fileName: file.name
                });
                toast.success("Dosya başarıyla gönderildi");
            } else {
                toast.error("Dosya yüklenemedi");
            }
        } catch (error) {
            toast.error("Dosya yükleme hatası");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // Process conversations
    const conversations = messages.reduce((acc, msg) => {
        const otherId = msg.sender.id === session?.user?.id ? msg.receiver.id : msg.sender.id;
        if (!acc[otherId]) {
            acc[otherId] = {
                participant: msg.sender.id === session?.user?.id ? msg.receiver : msg.sender,
                messages: [],
                lastMessage: msg,
            };
        }
        acc[otherId].messages.push(msg);
        if (new Date(msg.createdAt) > new Date(acc[otherId].lastMessage.createdAt)) {
            acc[otherId].lastMessage = msg;
        }
        if (!msg.isRead && msg.receiver.id === session?.user?.id) {
            acc[otherId].unreadCount = (acc[otherId].unreadCount || 0) + 1;
        }
        return acc;
    }, {} as Record<string, any>);

    // Ensure selected contact has a conversation entry even if no messages
    if (selectedConversation && !conversations[selectedConversation]) {
        const contact = contacts.find(c => c.id === selectedConversation) ||
            (primaryContact?.id === selectedConversation ? primaryContact : null);

        if (contact) {
            conversations[selectedConversation] = {
                participant: contact,
                messages: [],
                lastMessage: { content: "Yeni bir iletişim başlatın", createdAt: new Date().toISOString() },
                isSuggested: true
            };
        }
    }

    // If student/agent has a primary contact but no messages, inject it as a placeholder if not already done
    if (primaryContact && !conversations[primaryContact.id]) {
        conversations[primaryContact.id] = {
            participant: primaryContact,
            messages: [],
            lastMessage: { content: "Advisor'ınızla iletişime geçin", createdAt: new Date().toISOString() },
            isSuggested: true
        };
    }

    const filteredConversations = Object.values(conversations).filter((conv: any) =>
        (conv.participant?.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (conv.participant?.email || "").toLowerCase().includes(search.toLowerCase())
    ).sort((a: any, b: any) => {
        const dateA = new Date(a.lastMessage?.createdAt || 0).getTime();
        const dateB = new Date(b.lastMessage?.createdAt || 0).getTime();
        return dateB - dateA;
    });

    const activeConversation = selectedConversation
        ? conversations[selectedConversation]
        : null;

    const isAdminPrivileged = session?.user?.role === "ADMIN" || session?.user?.role === "CEO" || session?.user?.role === "ADVISOR";

    if (loading) {
        return (
            <div className="flex h-[75vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-zinc-100 border-t-primary rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Gelen Kutusu Yükleniyor</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[75vh] flex flex-col gap-8 pb-4">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div>
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <MessageSquare size={12} />
                        Merkezi Mesajlaşma Hub'ı
                    </div>
                    <h1 className="text-3xl font-serif italic text-secondary mb-2">İletişim Paneli</h1>
                </div>
                {isAdminPrivileged && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowUserSearch(true)}
                        className="btn-primary py-3 px-6 flex items-center gap-2"
                    >
                        <Sparkles size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Yeni Mesaj Başlat</span>
                    </motion.button>
                )}
            </div>

            <div className="flex-1 flex gap-8 overflow-hidden">
                {/* Contacts Panel */}
                <div className="w-80 flex flex-col gap-6 h-full overflow-hidden">
                    <div className="premium-card p-1 flex items-center gap-3">
                        <div className="pl-3 text-zinc-400">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Kişi veya email ara..."
                            className="bg-transparent border-none outline-none w-full py-2.5 text-xs font-bold text-secondary placeholder:text-zinc-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="premium-card flex-1 overflow-y-auto custom-scrollbar">
                        <div className="p-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Konuşmalarım</h3>
                        </div>
                        <div className="">
                            {filteredConversations.length === 0 ? (
                                <div className="p-10 text-center opacity-30">
                                    <MessageSquare size={32} className="mx-auto mb-2 text-zinc-400" />
                                    <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed text-zinc-500">Sohbet bulunamadı</p>
                                </div>
                            ) : (
                                filteredConversations.map((conv: any) => (
                                    <motion.div
                                        key={conv.participant.id}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedConversation(conv.participant.id)}
                                        className={`group relative p-4 flex items-center gap-4 cursor-pointer transition-all border-l-4 ${selectedConversation === conv.participant.id
                                            ? "bg-zinc-50 border-l-primary"
                                            : "border-l-transparent hover:bg-zinc-50/50"
                                            }`}
                                    >
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center font-black text-secondary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                                {conv.participant?.name?.charAt(0) || conv.participant?.email?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                            {!conv.isSuggested && (
                                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-lg border-4 border-white shadow-sm ${conv.unreadCount > 0 ? 'bg-red-500' : 'bg-accent'}`} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <p className={`text-sm font-black tracking-tight truncate ${selectedConversation === conv.participant?.id ? "text-primary" : "text-secondary"} ${conv.unreadCount > 0 ? "text-primary" : ""}`}>
                                                    {conv.participant?.name || "Anonim"}
                                                </p>
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest whitespace-nowrap pl-2">
                                                        {conv.isSuggested ? (conv.participant.role === 'ADVISOR' ? "DANIŞMAN" : "YENİ") : new Date(conv.lastMessage.createdAt).toLocaleDateString("tr", { day: 'numeric', month: 'short' })}
                                                    </span>
                                                    {conv.unreadCount > 0 && (
                                                        <span className="bg-accent text-white text-[8px] font-black px-1.5 py-0.5 rounded-full animate-bounce">
                                                            {conv.unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className={`text-[10px] truncate tracking-tight pr-2 ${conv.unreadCount > 0 ? "text-secondary font-bold" : (conv.isSuggested ? "text-primary font-bold italic" : "text-zinc-500")}`}>
                                                {conv.lastMessage.content}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Message Center */}
                <div className="flex-1 premium-card flex flex-col overflow-hidden">
                    {!activeConversation ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                            <div className="w-24 h-24 rounded-[40px] bg-zinc-50 flex items-center justify-center text-zinc-300 mb-6 animate-pulse">
                                <MessageSquare size={40} />
                            </div>
                            <h3 className="text-xl font-serif italic text-secondary mb-2">Güvenli İletişim Hattı</h3>
                            <p className="text-xs text-zinc-500 font-medium max-w-xs leading-relaxed">
                                Devam etmek için soldaki listeden bir sohbet seçin veya yeni bir iletişim başlatın.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Chat Header */}
                            <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/30">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-sm">
                                        {activeConversation.participant.name?.charAt(0) || "U"}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black tracking-tight text-secondary">
                                            {activeConversation.participant.name || "Bilinmiyor"}
                                        </p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{activeConversation.participant.role}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="p-2.5 rounded-xl hover:bg-zinc-100 text-secondary transition-all active:scale-95">
                                        <Search size={18} />
                                    </button>
                                    <button className="p-2.5 rounded-xl hover:bg-zinc-100 text-secondary transition-all active:scale-95">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Chat Viewport */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6 bg-zinc-50/10">
                                {activeConversation.messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center opacity-40 py-20">
                                        <Sparkles size={40} className="mb-4 text-primary" />
                                        <p className="text-sm font-black text-primary uppercase tracking-widest">Bu görüşme yeni başlatıldı</p>
                                        <p className="text-xs font-bold text-zinc-500 mt-2">Mesaj veya belge göndererek iletişimi açabilirsiniz.</p>
                                    </div>
                                ) : (
                                    <AnimatePresence mode="popLayout">
                                        {activeConversation.messages
                                            .sort((a: Message, b: Message) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                                            .map((msg: Message) => {
                                                const isOwn = msg.sender.id === session?.user?.id;
                                                return (
                                                    <motion.div
                                                        key={msg.id}
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                                                    >
                                                        <div className={`group relative max-w-[70%] flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
                                                            <div className={`p-4 rounded-2xl text-sm font-bold leading-relaxed shadow-sm ${isOwn
                                                                ? "bg-primary text-white rounded-tr-none"
                                                                : "bg-white text-secondary rounded-tl-none border border-zinc-100"
                                                                }`}>
                                                                {msg.fileUrl ? (
                                                                    <div className="flex flex-col gap-3">
                                                                        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                                                                            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                                                                                <FileText size={20} className={isOwn ? "text-white" : "text-secondary"} />
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className={`text-xs font-black truncate ${isOwn ? "text-white" : "text-secondary"}`}>{msg.fileName}</p>
                                                                                <p className="text-[9px] font-bold opacity-60">BELGE</p>
                                                                            </div>
                                                                            <a
                                                                                href={msg.fileUrl}
                                                                                download={msg.fileName}
                                                                                className={`p-2 rounded-lg hover:bg-white/20 transition-all ${isOwn ? "text-white" : "text-secondary"}`}
                                                                            >
                                                                                <Download size={18} />
                                                                            </a>
                                                                        </div>
                                                                        {msg.content && <p className="text-xs">{msg.content}</p>}
                                                                    </div>
                                                                ) : msg.content}
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-2 px-1">
                                                                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest tabular-nums">
                                                                    {new Date(msg.createdAt).toLocaleTimeString("tr", { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                                {isOwn && (
                                                                    <div className="flex items-center gap-2">
                                                                        <CheckCircle2 size={10} className={msg.isRead ? "text-accent" : "text-zinc-300"} />
                                                                        <button
                                                                            onClick={() => handleDeleteMessage(msg.id)}
                                                                            className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-red-500 transition-all"
                                                                            title="Mesajı Sil"
                                                                        >
                                                                            <Trash2 size={12} />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                    </AnimatePresence>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input Area */}
                            <div className="p-6 border-t border-zinc-100 bg-zinc-50/20 backdrop-blur-md">
                                <div className="relative flex items-end gap-4 p-2 pl-4 rounded-[24px] bg-white border border-zinc-100 shadow-xl">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <button
                                        onClick={handleFileSelect}
                                        disabled={uploading}
                                        className="mb-2 p-2 rounded-xl text-zinc-400 hover:text-primary transition-all disabled:opacity-50"
                                    >
                                        {uploading ? <Loader2 size={20} className="animate-spin" /> : <Paperclip size={20} />}
                                    </button>
                                    <textarea
                                        rows={1}
                                        placeholder={uploading ? "Dosya yükleniyor..." : "Mesajınızı detaylandırın..."}
                                        className="flex-1 py-3 px-2 bg-transparent border-none outline-none resize-none text-sm font-bold placeholder:text-zinc-400 text-secondary h-full max-h-32 disabled:opacity-50"
                                        value={newMessage}
                                        disabled={uploading}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage(activeConversation.participant.id, { content: newMessage });
                                                setNewMessage("");
                                            }
                                        }}
                                    />
                                    <button className="mb-2 p-2 rounded-xl text-zinc-400 hover:text-primary transition-all">
                                        <Smile size={20} />
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={uploading || (!newMessage.trim() && !uploading)}
                                        onClick={() => {
                                            handleSendMessage(activeConversation.participant.id, { content: newMessage });
                                            setNewMessage("");
                                        }}
                                        className="btn-primary px-6 py-3 rounded-2xl flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <span className="text-xs font-black uppercase tracking-widest pr-1">Gönder</span>
                                        <Send size={18} />
                                    </motion.button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* User Search Modal */}
            <AnimatePresence>
                {showUserSearch && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowUserSearch(false)}
                            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden p-8 border border-zinc-100"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-serif italic text-secondary">Yeni Bir Sohbet Başlat</h3>
                                <button onClick={() => setShowUserSearch(false)} className="text-[10px] font-black uppercase tracking-widest text-zinc-400">KAPAT</button>
                            </div>

                            <div className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="İsim veya rol ara..."
                                    className="w-full bg-zinc-50 border border-zinc-200 p-4 pl-12 rounded-2xl outline-none focus:border-primary text-sm font-bold text-secondary"
                                    autoFocus
                                    value={userSearchQuery}
                                    onChange={(e) => setUserSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="max-h-[400px] overflow-y-auto space-y-2 custom-scrollbar">
                                {contacts.filter(user =>
                                    (user.name || "").toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                                    (user.role || "").toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                                    (user.email || "").toLowerCase().includes(userSearchQuery.toLowerCase())
                                ).map((user) => (
                                    <button
                                        key={user.id}
                                        onClick={() => {
                                            setSelectedConversation(user.id);
                                            setShowUserSearch(false);
                                            setUserSearchQuery("");
                                        }}
                                        className="w-full p-4 flex items-center gap-4 hover:bg-zinc-50 rounded-2xl transition-all text-left border border-transparent hover:border-zinc-200 group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center font-black text-secondary group-hover:bg-primary group-hover:text-white">
                                            {user.name?.charAt(0) || user.email?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-secondary">{user.name || "İsimsiz Kullanıcı"}</p>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{user.role}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
