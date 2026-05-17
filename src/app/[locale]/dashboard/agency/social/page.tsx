'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Calendar,
  Sparkles,
  Info,
  Check,
  X,
  AlertCircle,
  Loader2,
  ExternalLink,
  ChevronRight,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface Post {
  id: string;
  platform: string;
  content: string;
  imageUrl: string | null;
  scheduledAt: string;
  status: string;
}

export default function AgencySocialPortal() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/social');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // Find all posts across roadmaps that are PENDING_APPROVAL
        const allPosts: Post[] = [];
        data.forEach((roadmap: any) => {
          roadmap.posts.forEach((post: any) => {
            if (post.status === 'PENDING_APPROVAL') {
              allPosts.push(post);
            }
          });
        });
        setPosts(allPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('İçerikler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (postId: string) => {
    setApprovingId(postId);
    try {
      const res = await fetch('/api/admin/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'APPROVE_POST', postId })
      });

      if (res.ok) {
        toast.success('İçerik onaylandı ve yayın sırasına alındı!');
        setPosts(posts.filter(p => p.id !== postId));
        if (viewingPost?.id === postId) setViewingPost(null);
      } else {
        toast.error('Onaylama sırasında bir hata oluştu');
      }
    } catch (error) {
      toast.error('Bağlantı hatası');
    } finally {
      setApprovingId(null);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toUpperCase()) {
      case 'INSTAGRAM': return <Instagram className="text-pink-500" size={18} />;
      case 'FACEBOOK': return <Facebook className="text-blue-600" size={18} />;
      case 'TWITTER': return <Twitter className="text-sky-500" size={18} />;
      case 'LINKEDIN': return <Linkedin className="text-blue-700" size={18} />;
      default: return <Sparkles className="text-amber-500" size={18} />;
    }
  };

  return (
    <div className="space-y-10 pb-20 max-w-[1400px] mx-auto p-6 md:p-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight uppercase">
            İçerik <span className="text-primary italic">Onay Portalı</span>
          </h1>
          <p className="text-zinc-500 font-medium max-w-lg">
            Mentor Career sosyal medya stratejisi kapsamında hazırlanan içerikleri buradan inceleyebilir ve onaylayabilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-zinc-400">
                AI
              </div>
            ))}
          </div>
          <div className="px-3 border-l border-zinc-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Status</span>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live System
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-xs font-black uppercase tracking-widest text-zinc-400">İçerikler Hazırlanıyor...</p>
        </div>
      ) : posts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="premium-card p-20 text-center space-y-6 border-zinc-100 bg-white"
        >
          <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-emerald-500 shadow-xl shadow-emerald-500/10">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-zinc-900 uppercase">Tebrikler!</h3>
            <p className="text-zinc-400 font-medium max-w-sm mx-auto">
              Onay bekleyen içerik bulunmuyor. Yeni içerikler üretildiğinde burada görünecektir.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="group premium-card overflow-hidden border-zinc-100 bg-white hover:shadow-2xl hover:shadow-zinc-200/50 transition-all flex flex-col"
              >
                {/* Image Preview */}
                <div 
                  className="aspect-square bg-zinc-50 relative overflow-hidden cursor-pointer"
                  onClick={() => setViewingPost(post)}
                >
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt="AI Content" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                      <Sparkles size={40} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="bg-white/20 backdrop-blur-md text-white p-3 rounded-2xl hover:bg-white/30 transition-all">
                      <Eye size={20} />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2 rounded-xl border border-white/20 flex items-center gap-2 shadow-xl">
                    {getPlatformIcon(post.platform)}
                    <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-900">
                      {post.platform}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Calendar size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {new Date(post.scheduledAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Clock size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {new Date(post.scheduledAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="bg-zinc-50/80 p-4 rounded-2xl border border-zinc-100 relative group/content">
                    <p className="text-sm font-bold text-zinc-800 leading-relaxed italic line-clamp-4">
                      "{post.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 mt-auto">
                    <button
                      onClick={() => handleApprove(post.id)}
                      disabled={approvingId === post.id}
                      className="flex-1 bg-zinc-900 text-white h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-zinc-900/10 disabled:opacity-50"
                    >
                      {approvingId === post.id ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                      YAYINI ONAYLA
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Viewing Modal */}
      <AnimatePresence>
        {viewingPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingPost(null)}
              className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh]"
            >
              <div className="w-full md:w-1/2 bg-zinc-100 flex items-center justify-center relative overflow-hidden">
                {viewingPost.imageUrl ? (
                  <img src={viewingPost.imageUrl} alt="AI Content" className="w-full h-full object-cover" />
                ) : (
                  <Sparkles size={60} className="text-zinc-300" />
                )}
                <button 
                  onClick={() => setViewingPost(null)}
                  className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-all md:hidden"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-8 md:p-12 flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-primary">
                      {getPlatformIcon(viewingPost.platform)}
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase text-zinc-900">{viewingPost.platform} Gönderisi</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Onay Bekliyor</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setViewingPost(null)}
                    className="w-12 h-12 rounded-2xl bg-zinc-50 text-zinc-400 flex items-center justify-center hover:bg-zinc-100 hover:text-zinc-900 transition-all hidden md:flex"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-8 flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Planlanan Tarih</span>
                      <p className="text-sm font-black text-zinc-900">{new Date(viewingPost.scheduledAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Yayın Saati</span>
                      <p className="text-sm font-black text-zinc-900">{new Date(viewingPost.scheduledAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Post Açıklaması (Caption)</label>
                    <div className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 relative shadow-inner">
                      <p className="text-zinc-800 font-bold leading-relaxed whitespace-pre-wrap">
                        {viewingPost.content}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-10 flex gap-4">
                  <button
                    onClick={() => handleApprove(viewingPost.id)}
                    disabled={approvingId === viewingPost.id}
                    className="flex-1 bg-primary text-white h-16 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 disabled:opacity-50"
                  >
                    {approvingId === viewingPost.id ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                    ŞİMDİ ONAYLA VE PLANLA
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .premium-card {
          border-radius: 2.5rem;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
}
