"use client";

import { useState } from "react";
import { 
    Share2, 
    MessageCircle, 
    Facebook, 
    Linkedin, 
    Twitter, 
    Mail, 
    Link2,
    Check,
    Instagram
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface SocialShareProps {
    title: string;
    url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareData = {
        title: title,
        url: typeof window !== 'undefined' ? `${window.location.origin}${url}` : url
    };

    const links = [
        {
            name: "WhatsApp",
            icon: <MessageCircle size={16} />,
            href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.title)}%20${encodeURIComponent(shareData.url)}`,
            color: "hover:bg-[#25D366] hover:text-white"
        },
        {
            name: "SMS",
            icon: <MessageCircle size={16} />,
            href: `sms:?body=${encodeURIComponent(shareData.title)}%20${encodeURIComponent(shareData.url)}`,
            color: "hover:bg-zinc-900 hover:text-white"
        },
        {
            name: "X",
            icon: <Twitter size={16} />,
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}`,
            color: "hover:bg-black hover:text-white"
        },
        {
            name: "LinkedIn",
            icon: <Linkedin size={16} />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
            color: "hover:bg-[#0077B5] hover:text-white"
        },
        {
            name: "Facebook",
            icon: <Facebook size={16} />,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
            color: "hover:bg-[#1877F2] hover:text-white"
        },
        {
            name: "Instagram",
            icon: <Instagram size={16} />,
            href: `https://www.instagram.com/`, // Instagram does not support direct sharing via URL
            color: "hover:bg-[#E4405F] hover:text-white"
        },
        {
            name: "E-posta",
            icon: <Mail size={16} />,
            href: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.url)}`,
            color: "hover:bg-zinc-100 hover:text-zinc-900"
        }
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareData.url);
            setCopied(true);
            toast.success("Bağlantı kopyalandı");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Kopyalanamadı");
        }
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 text-zinc-900 font-bold text-[10px] uppercase tracking-widest hover:text-zinc-500 transition-all group"
            >
                <Share2 size={16} className={`transition-transform ${isOpen ? 'rotate-12' : 'group-hover:rotate-12'}`} />
                Paylaş
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop to close */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40"
                        />
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full right-0 mb-4 p-2 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 flex items-center gap-1 z-50 whitespace-nowrap"
                        >
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 text-zinc-400 ${link.color}`}
                                    title={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                            
                            <div className="w-px h-6 bg-zinc-100 mx-1" />
                            
                            <button
                                onClick={copyToClipboard}
                                className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
                                title="Bağlantıyı Kopyala"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Link2 size={16} />}
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
