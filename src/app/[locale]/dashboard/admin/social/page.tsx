"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Plus,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit,
  Save,
  Table,
  Upload,
  Download,
  FileSpreadsheet,
  FileUp,
  Image as ImageIcon,
  Send,
  Loader2,
  Settings2,
  Trash2
} from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";

export default function SocialAutomationPage() {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [timeframe, setTimeframe] = useState("WEEKLY"); // WEEKLY or MONTHLY
  const [visualSuggestions, setVisualSuggestions] = useState("");
  const [defaultPostingTime, setDefaultPostingTime] = useState("18:00");
  const [planMode, setPlanMode] = useState("AI"); // AI or MANUAL
  const [manualPosts, setManualPosts] = useState<any[]>([]);
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [aiStatus, setAiStatus] = useState({ ollama: false, imageApi: false });
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["INSTAGRAM"]);
  const [visualStyle, setVisualStyle] = useState("REALISTIC");

  const [activeTab, setActiveTab] = useState("PLANNING");
  const [editingPost, setEditingPost] = useState<any>(null);
  const [generatingHashtags, setGeneratingHashtags] = useState(false);
  const [defaultHashtags, setDefaultHashtags] = useState("");
  const [advancedImagePrompt, setAdvancedImagePrompt] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  // 1. Fetch Data and AI Status
  useEffect(() => {
    fetchData();
    const interval = setInterval(checkAiStatus, 30000); // Check every 30s
    checkAiStatus();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (planMode === "MANUAL" && manualPosts.length === 0) {
      const count = timeframe === "WEEKLY" ? 7 : 30;
      const today = new Date();
      setManualPosts(Array.from({ length: count }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + (i + 1));
        return {
          date: d.toISOString().split('T')[0],
          time: defaultPostingTime || "18:00",
          topic: "",
          visual_hint: "",
          platform: "INSTAGRAM"
        };
      }));
    }
  }, [planMode, timeframe]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/social");
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setRoadmaps(data);
      } else {
        console.error(`Social API Error [Status: ${res.status}]:`, data);
        setRoadmaps([]);
        const errorMsg = data?.error || data?.message || `Sunucu hatası (${res.status})`;
        toast.error(errorMsg, {
          description: data?.details || "Veritabanı bağlantısı veya yetkilendirme hatası olabilir."
        });
      }
      
      const settingsRes = await fetch("/api/admin/social?action=GET_SETTINGS");
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        if (settingsData && typeof settingsData === 'object') {
          if (settingsData.defaultHashtags) setDefaultHashtags(settingsData.defaultHashtags);
          if (settingsData.advancedImagePrompt) setAdvancedImagePrompt(settingsData.advancedImagePrompt);
        }
      }
    } catch (e) {
      console.error("Fetch data error:", e);
      toast.error("Veriler yüklenirken hata oluştu");
      setRoadmaps([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      await fetch("/api/admin/social", {
        method: "POST",
        body: JSON.stringify({ 
          action: "SAVE_SETTINGS", 
          defaultHashtags, 
          advancedImagePrompt 
        })
      });
      toast.success("Ayarlar başarıyla kaydedildi");
    } catch (e) {
      toast.error("Ayarlar kaydedilemedi");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleApprove = async (postId: string) => {
    try {
      const res = await fetch("/api/admin/social", {
        method: "POST",
        body: JSON.stringify({ action: "APPROVE_POST", postId })
      });
      if (res.ok) {
        toast.success("Post onaylandı ve paylaşıldı!");
        fetchData();
      }
    } catch (e) {
      toast.error("Onay hatası");
    }
  };

  const handleUpdatePost = async () => {
    try {
      const res = await fetch("/api/admin/social", {
        method: "POST",
        body: JSON.stringify({
          action: "UPDATE_POST",
          postId: editingPost.id,
          content: editingPost.content,
          imageUrl: editingPost.imageUrl,
          imagePrompt: editingPost.imagePrompt,
          platform: editingPost.platform // Need to make sure backend updates platform if we change it here
        })
      });
      if (res.ok) {
        toast.success("Değişiklikler kaydedildi.");
        setEditingPost(null);
        fetchData();
      }
    } catch (e) {
      toast.error("Güncelleme hatası");
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Bu içeriği silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch("/api/admin/social", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE_POST", postId })
      });
      if (res.ok) {
        toast.success("İçerik başarıyla silindi!");
        setEditingPost(null);
        fetchData();
      } else {
        toast.error("Silme işlemi başarısız.");
      }
    } catch (e) {
      toast.error("Silme işlemi başarısız.");
    }
  };

  const handleGenerateHashtags = async () => {
    if (!editingPost?.content) return toast.error("İçerik bulunamadı.");
    setGeneratingHashtags(true);
    try {
      const res = await fetch("/api/admin/social", {
        method: "POST",
        body: JSON.stringify({ action: "GENERATE_HASHTAGS", content: editingPost.content })
      });
      const data = await res.json();
      if (data.hashtags) {
        setEditingPost({ ...editingPost, content: editingPost.content + "\n\n" + data.hashtags });
        toast.success("Hashtagler eklendi!");
      } else {
        throw new Error(data.error || "Bilinmeyen hata");
      }
    } catch (e: any) {
      toast.error("Hashtag üretim hatası: " + e.message);
    } finally {
      setGeneratingHashtags(false);
    }
  };

  const pendingApprovals = roadmaps.flatMap(r => r.posts || []).filter(p => p.status === "PENDING_APPROVAL");

  const handleExcelUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

        const newPosts = data.slice(1).map((row: any) => ({
          date: row[0] ? (typeof row[0] === 'number' ? new Date((row[0] - (25567 + 1)) * 86400 * 1000).toISOString().split('T')[0] : row[0]) : "",
          time: row[1] || "18:00",
          platform: (row[2] || "INSTAGRAM").toUpperCase(),
          topic: row[3] || "",
          visual_hint: row[4] || ""
        })).filter(p => p.topic);

        if (newPosts.length > 0) {
          setManualPosts(newPosts);
          toast.success(`${newPosts.length} içerik Excel'den yüklendi!`);
        }
      } catch (err) {
        toast.error("Excel dosyası okunamadı. Lütfen taslağı kullanın.");
      }
    };
    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["Tarih", "Saat", "Platform", "Konu/Başlık", "Görsel Notu"],
      ["2026-04-26", "18:00", "INSTAGRAM", "Almanya'da Mühendislik", "Üniversite binası"],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Planlama");
    XLSX.writeFile(wb, "Star_Social_Planlama_Taslak.xlsx");
  };

  const checkAiStatus = async () => {
    try {
      const res = await fetch("/api/admin/social?status=true");
      const data = await res.json();
      setAiStatus(data);
    } catch (e) {
      setAiStatus({ ollama: false, imageApi: false });
    }
  };

  // 2. Actions
  const handleGenerateRoadmap = async () => {
    if (planMode === "AI" && !topic) return toast.error("Lütfen bir konu giriniz");
    if (planMode === "MANUAL" && manualPosts.every(p => !p.topic)) return toast.error("En az bir gün için konu/başlık giriniz");

    // Warn but don't block if status check says offline (only for AI mode)
    if (planMode === "AI" && !aiStatus.ollama) {
      toast.error("Ollama servisi çevrimdışı görünüyor, yine de deneniyor...");
    }

    setGenerating(true);
    try {
      const res = await fetch("/api/admin/social", {
        method: "POST",
        body: JSON.stringify(
          planMode === "AI"
            ? {
              action: "GENERATE_ROADMAP",
              topic,
              timeframe,
              visualSuggestions,
              defaultPostingTime
            }
            : {
              action: "SAVE_MANUAL_ROADMAP",
              topic: topic || "Manuel Plan",
              posts: manualPosts,
              defaultPostingTime
            }
        )
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setRoadmaps([data, ...roadmaps]);
      setTopic("");
      setVisualSuggestions("");
      toast.success("Yol haritası başarıyla oluşturuldu!");
    } catch (e: any) {
      toast.error(`Hata: ${e.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateContent = async (postId: string) => {
    toast.info("İçerik ve görsel üretiliyor, bu işlem 1-2 dakika sürebilir...");
    try {
      const res = await fetch("/api/admin/social", {
        method: "POST",
        body: JSON.stringify({ action: "GENERATE_CONTENT", postId })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Update local state
      fetchData();
      toast.success("İçerik başarıyla üretildi!");
    } catch (e: any) {
      toast.error(`Üretim hatası: ${e.message}`);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "INSTAGRAM": return <Instagram size={18} className="text-pink-500" />;
      case "FACEBOOK": return <Facebook size={18} className="text-blue-600" />;
      case "LINKEDIN": return <Linkedin size={18} className="text-blue-700" />;
      case "TWITTER": return <Twitter size={18} className="text-sky-500" />;
      default: return <Sparkles size={18} className="text-amber-500" />;
    }
  };

  return (
    <>
    <div className="space-y-8 pb-10 max-w-[1400px] mx-auto">
      {/* Header & AI Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-primary">Social AI Automation</h1>
          <p className="text-sm font-bold text-zinc-500">Yapay zeka ile sosyal medya stratejinizi yönetin</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="group relative">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider cursor-help ${aiStatus.ollama ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-red-50 border-red-200 text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full ${aiStatus.ollama ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              AI: {aiStatus.ollama ? 'ONLINE' : 'OFFLINE'}
            </div>
            {!aiStatus.ollama && (
              <div className="absolute top-full mt-2 right-0 w-64 p-4 bg-zinc-900 text-white text-[10px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-2xl border border-zinc-800">
                <p className="font-black text-rose-400 mb-1 tracking-widest">NASIL ÇÖZÜLÜR?</p>
                <p className="font-bold leading-relaxed">Cloud AI (OpenRouter) bağlantı hatası. Çözmek için:<br />1. .env dosyasındaki OPENROUTER_API_KEY değerini kontrol edin.<br />2. İnternet bağlantınızı kontrol edin.</p>
              </div>
            )}
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${aiStatus.imageApi ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-red-50 border-red-200 text-red-600'}`}>
            <div className={`w-2 h-2 rounded-full ${aiStatus.imageApi ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            IMAGE: {aiStatus.imageApi ? 'ONLINE' : 'OFFLINE'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-zinc-100 rounded-2xl w-fit flex-wrap">
        <button
          onClick={() => setActiveTab("PLANNING")}
          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'PLANNING' ? 'bg-white text-primary shadow-sm' : 'text-zinc-400'}`}
        >
          <Table size={14} />
          Planlama Merkezi
        </button>
        <button
          onClick={() => setActiveTab("CALENDAR")}
          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'CALENDAR' ? 'bg-white text-primary shadow-sm' : 'text-zinc-400'}`}
        >
          <Calendar size={14} />
          Takvim Görünümü
        </button>
        <button
          onClick={() => setActiveTab("APPROVALS")}
          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 relative ${activeTab === 'APPROVALS' ? 'bg-white text-primary shadow-sm' : 'text-zinc-400'}`}
        >
          <CheckCircle2 size={14} />
          Onay Bekleyenler
          {pendingApprovals.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
              {pendingApprovals.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("SETTINGS")}
          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'SETTINGS' ? 'bg-white text-primary shadow-sm' : 'text-zinc-400'}`}
        >
          <Settings2 size={14} />
          Ayarlar
        </button>
      </div>

      {activeTab === "PLANNING" && (
        <div className="space-y-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card p-6 md:p-8"
          >
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 mb-8 bg-zinc-50/50 p-6 rounded-3xl border border-zinc-100">
                {/* Planning Mode Toggle */}
                <div className="w-full md:w-80 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Planlama Yöntemi</label>
                  <div className="flex p-1 bg-zinc-100 rounded-2xl h-[54px]">
                    <button
                      onClick={() => setPlanMode("AI")}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${planMode === 'AI' ? 'bg-white shadow-sm text-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                      <Sparkles size={14} className={planMode === 'AI' ? 'text-primary' : 'text-zinc-400'} />
                      Yapay Zeka
                    </button>
                    <button
                      onClick={() => setPlanMode("MANUAL")}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${planMode === 'MANUAL' ? 'bg-white shadow-sm text-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                      <Table size={14} className={planMode === 'MANUAL' ? 'text-primary' : 'text-zinc-400'} />
                      Manuel
                    </button>
                    <button
                      onClick={() => setPlanMode("INSTANT")}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${planMode === 'INSTANT' ? 'bg-white shadow-sm text-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                      <Send size={14} className={planMode === 'INSTANT' ? 'text-primary' : 'text-zinc-400'} />
                      Anlık
                    </button>
                  </div>
                </div>

                {/* Timeframe Selection */}
                <div className="w-full md:w-48 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Planlama Süresi</label>
                  <div className="flex p-1 bg-zinc-100 rounded-2xl h-[54px]">
                    <button
                      onClick={() => setTimeframe("WEEKLY")}
                      className={`flex-1 flex items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${timeframe === 'WEEKLY' ? 'bg-white shadow-sm text-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                      Haftalık
                    </button>
                    <button
                      onClick={() => setTimeframe("MONTHLY")}
                      className={`flex-1 flex items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${timeframe === 'MONTHLY' ? 'bg-white shadow-sm text-primary' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                      Aylık
                    </button>
                  </div>
                </div>

                {/* Posting Time */}
                <div className="w-32 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Yayın Saati</label>
                  <div className="relative">
                    <input
                      type="time"
                      className="w-full bg-zinc-50 border-zinc-100 rounded-2xl h-[54px] px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      value={defaultPostingTime}
                      onChange={(e) => setDefaultPostingTime(e.target.value)}
                      disabled={generating}
                    />
                  </div>
                </div>
              </div>

              {planMode === 'INSTANT' ? (
                <div className="max-w-2xl mx-auto space-y-6 py-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary mb-4">
                      <Send size={32} />
                    </div>
                    <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight">Hızlı Gönderi Oluştur</h2>
                    <p className="text-zinc-500 text-sm font-medium">Takvime bağlı kalmadan, hemen şimdi paylaşılacak tek bir içerik hazırlayın.</p>
                  </div>

                  <div className="premium-card p-6 space-y-6 border-zinc-100">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">İçerik Konusu</label>
                      <input
                        type="text"
                        placeholder="Örn: Bugün ofiste neler oldu?"
                        className="w-full bg-zinc-50 border-none rounded-2xl h-14 px-6 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Platformlar</label>
                        <div className="flex gap-2">
                          {[
                            { id: 'INSTAGRAM', icon: <Instagram size={14} />, color: 'hover:text-pink-500' },
                            { id: 'LINKEDIN', icon: <Linkedin size={14} />, color: 'hover:text-blue-700' },
                            { id: 'TWITTER', icon: <Twitter size={14} />, color: 'hover:text-sky-500' },
                            { id: 'FACEBOOK', icon: <Facebook size={14} />, color: 'hover:text-blue-600' }
                          ].map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                if (selectedPlatforms.includes(p.id)) {
                                  if (selectedPlatforms.length > 1) {
                                    setSelectedPlatforms(selectedPlatforms.filter(id => id !== p.id));
                                  }
                                } else {
                                  setSelectedPlatforms([...selectedPlatforms, p.id]);
                                }
                              }}
                              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${selectedPlatforms.includes(p.id) ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-zinc-50 text-zinc-400 ' + p.color}`}
                              title={p.id}
                            >
                              {p.icon}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Görsel Tarzı</label>
                        <select 
                          className="w-full bg-zinc-50 border-none rounded-2xl h-14 px-6 text-[10px] font-black uppercase tracking-widest outline-none"
                          value={visualStyle}
                          onChange={(e) => setVisualStyle(e.target.value)}
                        >
                          <option value="REALISTIC">Gerçekçi (Photo)</option>
                          <option value="MINIMAL">Minimalist</option>
                          <option value="ILLUSTRATION">İllüstrasyon</option>
                          <option value="3D_RENDER">3D Render</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        setGenerating(true);
                        try {
                          const res = await fetch("/api/admin/social", {
                            method: "POST",
                            body: JSON.stringify({
                              action: "SAVE_MANUAL_ROADMAP",
                              topic: "Hızlı Gönderi: " + topic,
                              posts: selectedPlatforms.map(platform => ({
                                date: new Date().toISOString().split('T')[0],
                                time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                                platform: platform,
                                topic: topic,
                                visual_hint: `${topic} in ${visualStyle} style`
                              }))
                            })
                          });
                          const data = await res.json();
                          if (data.error) throw new Error(data.error);

                          if (data.posts && data.posts.length > 0) {
                            // Generate content for all created posts SEQUENTIALLY to avoid timeouts/rate limits
                            for (const p of data.posts) {
                              try {
                                await fetch("/api/admin/social", {
                                  method: "POST",
                                  body: JSON.stringify({ action: "GENERATE_CONTENT", postId: p.id })
                                });
                              } catch (err) {
                                console.error(`Failed to generate content for post ${p.id}:`, err);
                              }
                            }
                          }

                          fetchData();
                          toast.success("Hızlı gönderi oluşturuldu!");
                          setTopic("");
                        } catch (e: any) {
                          toast.error(e.message);
                        } finally {
                          setGenerating(false);
                        }
                      }}
                      disabled={generating || !topic}
                      className="w-full bg-primary text-white h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 justify-center"
                    >
                      {generating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                      İÇERİĞİ ŞİMDİ ÜRET VE HAZIRLA
                    </button>
                  </div>
                </div>
              ) : planMode === 'AI' ? (
                <div className="flex flex-col md:flex-row gap-6 items-end">
                  <div className="flex-[2] space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Ana Konu</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Hangi konuda içerik üretmek istersiniz? (Örn: Almanya'da Mühendislik Eğitimi)"
                        className="w-full bg-zinc-50 border-zinc-100 rounded-2xl py-4 px-6 text-sm font-bold placeholder:text-zinc-300 focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-12"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        disabled={generating}
                      />
                      <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Genel Görsel Tercihi (Opsiyonel)</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Görsellerde neler olmalı?"
                        className="w-full bg-zinc-50 border-zinc-100 rounded-2xl py-4 px-6 text-sm font-bold placeholder:text-zinc-300 focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-12"
                        value={visualSuggestions}
                        onChange={(e) => setVisualSuggestions(e.target.value)}
                        disabled={generating}
                      />
                      <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateRoadmap}
                    disabled={generating || !topic}
                    className="bg-primary text-white px-8 h-[54px] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 min-w-[220px] justify-center"
                  >
                    {generating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                    YOL HARİTASI OLUŞTUR
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                        <Table size={14} />
                        Planlama Tablosu
                      </h3>
                      <p className="text-[10px] font-bold text-zinc-400">Excel formatında veri girişi yapabilir veya tabloyu manuel doldurabilirsiniz.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={downloadTemplate}
                        className="flex items-center gap-2 px-4 h-10 rounded-xl bg-white border border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary transition-all shadow-sm"
                      >
                        <Download size={14} />
                        Taslağı İndir
                      </button>
                      <label className="flex items-center gap-2 px-4 h-10 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-primary/20 transition-all border border-primary/10 shadow-sm">
                        <Upload size={14} />
                        Excel'den Yükle
                        <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleExcelUpload} />
                      </label>
                    </div>
                  </div>

                  <div className="premium-card overflow-hidden border-zinc-100">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-zinc-50/50 border-b border-zinc-100">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Tarih</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Saat</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Platform</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">İçerik Konusu / Başlık</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Görsel Notu / Senaryo</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                          {manualPosts.map((post, idx) => (
                            <tr key={idx} className="hover:bg-zinc-50/30 transition-all group">
                              <td className="px-6 py-3">
                                <input
                                  type="date"
                                  className="bg-transparent text-xs font-bold outline-none focus:text-primary transition-colors"
                                  value={post.date}
                                  onChange={(e) => {
                                    const newPosts = [...manualPosts];
                                    newPosts[idx].date = e.target.value;
                                    setManualPosts(newPosts);
                                  }}
                                />
                              </td>
                              <td className="px-6 py-3">
                                <input
                                  type="time"
                                  className="bg-transparent text-xs font-bold outline-none focus:text-primary transition-colors"
                                  value={post.time}
                                  onChange={(e) => {
                                    const newPosts = [...manualPosts];
                                    newPosts[idx].time = e.target.value;
                                    setManualPosts(newPosts);
                                  }}
                                />
                              </td>
                              <td className="px-6 py-3">
                                <select
                                  className="bg-zinc-100/50 border-none rounded-lg text-[10px] font-black uppercase px-2 py-1 outline-none group-hover:bg-white transition-colors shadow-sm"
                                  value={post.platform}
                                  onChange={(e) => {
                                    const newPosts = [...manualPosts];
                                    newPosts[idx].platform = e.target.value;
                                    setManualPosts(newPosts);
                                  }}
                                >
                                  <option value="INSTAGRAM">Instagram</option>
                                  <option value="LINKEDIN">LinkedIn</option>
                                  <option value="TWITTER">Twitter</option>
                                  <option value="ALL">Hepsi</option>
                                </select>
                              </td>
                              <td className="px-6 py-3">
                                <input
                                  type="text"
                                  placeholder="Konu giriniz..."
                                  className="w-full bg-transparent text-xs font-bold outline-none placeholder:text-zinc-200 focus:placeholder:opacity-0"
                                  value={post.topic}
                                  onChange={(e) => {
                                    const newPosts = [...manualPosts];
                                    newPosts[idx].topic = e.target.value;
                                    setManualPosts(newPosts);
                                  }}
                                />
                              </td>
                              <td className="px-6 py-3">
                                <input
                                  type="text"
                                  placeholder="Görsel detayı..."
                                  className="w-full bg-transparent text-[10px] font-medium text-zinc-500 outline-none placeholder:text-zinc-200"
                                  value={post.visual_hint}
                                  onChange={(e) => {
                                    const newPosts = [...manualPosts];
                                    newPosts[idx].visual_hint = e.target.value;
                                    setManualPosts(newPosts);
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
                      <AlertCircle size={14} className="text-zinc-300" />
                      Boş bırakılan satırlar plana dahil edilmeyecektir.
                    </div>
                    <button
                      onClick={handleGenerateRoadmap}
                      disabled={generating || manualPosts.every(p => !p.topic)}
                      className="bg-primary text-white px-10 h-[60px] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 min-w-[260px] justify-center"
                    >
                      {generating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                      PLANI KAYDET VE YAYINA BAŞLA
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Roadmaps Display */}
          <div className="space-y-10">
            <AnimatePresence>
              {roadmaps.map((roadmap) => (
                <motion.div
                  key={roadmap.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between px-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 text-primary rounded-xl mt-1">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-primary uppercase tracking-tight">{roadmap.topic}</h3>
                        <p className="text-[10px] font-bold text-zinc-400 mb-2">Oluşturuldu: {new Date(roadmap.createdAt).toLocaleDateString('tr-TR')}</p>
                        {roadmap.strategy && roadmap.strategy !== "Manuel Planlama" && (
                          <div className="mt-2 p-3 bg-zinc-50 border border-zinc-100 rounded-2xl max-w-2xl relative">
                            <div className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                              <Sparkles size={10} />
                              Ajans Strateji Notu
                            </div>
                            <p className="text-[11px] font-bold text-zinc-500 leading-relaxed italic">{roadmap.strategy}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roadmap.posts.map((post: any) => (
                      <motion.div
                        key={post.id}
                        whileHover={{ y: -5 }}
                        className="premium-card overflow-hidden group border-transparent hover:border-primary/20 transition-all"
                      >
                        <div className="aspect-square bg-zinc-100 relative flex items-center justify-center overflow-hidden">
                          {post.imageUrl ? (
                            <img 
                              src={post.imageUrl} 
                              alt="AI Content" 
                              className="w-full h-full object-cover transition-opacity duration-500"
                              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                              onError={(e) => {
                                e.currentTarget.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(post.imagePrompt || post.topic)}?width=1080&height=1350&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
                              }}
                              style={{ opacity: 0 }}
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-zinc-400">
                              <ImageIcon size={32} strokeWidth={1.5} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Görsel Bekleniyor</span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3 flex gap-2">
                            <div className="bg-white/90 backdrop-blur shadow-sm p-2 rounded-xl">
                              {getPlatformIcon(post.platform)}
                            </div>
                            {post.imageUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleGenerateContent(post.id);
                                }}
                                className="bg-white/90 backdrop-blur shadow-sm p-2 rounded-xl text-zinc-400 hover:text-primary transition-all"
                                title="Görseli Yenile"
                              >
                                <RefreshCw size={14} className={generating ? 'animate-spin' : ''} />
                              </button>
                            )}
                          </div>

                          <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm ${post.status === 'POSTED' ? 'bg-emerald-500 text-white' :
                              post.status === 'PENDING_APPROVAL' ? 'bg-amber-500 text-white' :
                                'bg-zinc-800 text-white'
                            }`}>
                            {post.status}
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <p className="text-xs font-bold text-primary line-clamp-3 min-h-[45px]">
                            {post.content}
                          </p>

                          {post.imagePrompt && (
                            <div className="flex gap-2 items-start p-2 bg-primary/5 rounded-lg border border-primary/10">
                              <ImageIcon size={14} className="text-primary/60 shrink-0 mt-0.5" />
                              <p className="text-[10px] font-medium text-primary/70 italic leading-tight">
                                {post.imagePrompt}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-zinc-50">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
                              <Clock size={12} />
                              {new Date(post.scheduledAt).toLocaleDateString('tr-TR')} - {new Date(post.scheduledAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                            </div>

                            <div className="flex gap-2">
                              {post.status === 'DRAFT' && (
                                <button
                                  onClick={() => handleGenerateContent(post.id)}
                                  className="p-2 rounded-xl bg-zinc-50 text-zinc-400 hover:bg-primary/5 hover:text-primary transition-all"
                                  title="İçeriği Üret"
                                >
                                  <RefreshCw size={16} />
                                </button>
                              )}
                              <button 
                                onClick={() => setEditingPost(post)}
                                className="p-2 rounded-xl bg-zinc-50 text-zinc-400 hover:bg-primary/5 hover:text-primary transition-all"
                                title="Düzenle"
                              >
                                <Edit size={16} />
                              </button>
                              {post.status === 'PENDING_APPROVAL' && (
                                <button
                                  onClick={() => setActiveTab("APPROVALS")}
                                  className="p-2 rounded-xl bg-amber-500 text-white hover:scale-110 transition-all shadow-lg shadow-amber-500/20"
                                >
                                  <Send size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {activeTab === "APPROVALS" && (
        <div className="space-y-6">
          {pendingApprovals.length === 0 ? (
            <div className="premium-card p-20 text-center space-y-4 border-zinc-100">
              <div className="w-20 h-20 bg-zinc-50 rounded-3xl flex items-center justify-center mx-auto text-zinc-200">
                <CheckCircle2 size={40} />
              </div>
              <div>
                <h3 className="text-xl font-black text-zinc-900 uppercase">Bekleyen Onay Yok</h3>
                <p className="text-zinc-400 font-medium">Tüm içerikler güncel veya paylaşılmış durumda.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {pendingApprovals.map((post) => (
                <motion.div
                  key={post.id}
                  layoutId={post.id}
                  className="premium-card overflow-hidden border-zinc-100 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all flex flex-col md:flex-row h-full"
                >
                  <div className="w-full md:w-64 bg-zinc-50 border-r border-zinc-100 relative group aspect-square md:aspect-auto flex items-center justify-center overflow-hidden">
                    {post.imageUrl ? (
                      <img 
                        src={post.imageUrl} 
                        alt="AI Generated" 
                        className="w-full h-full object-cover transition-opacity duration-500"
                        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                        style={{ opacity: 0 }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 gap-2">
                        <ImageIcon size={32} />
                        <span className="text-[10px] font-black uppercase">Görsel Yok</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="bg-white text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
                      >
                        <Edit size={14} /> Düzenle
                      </button>
                      <button
                        onClick={() => handleGenerateContent(post.id)}
                        className="bg-white text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
                      >
                        <RefreshCw size={14} className={generating ? 'animate-spin' : ''} /> Yenile
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(post.platform)}
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                            {post.platform} • {new Date(post.scheduledAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <div className="px-2 py-1 bg-amber-50 rounded text-[8px] font-black text-amber-600 uppercase border border-amber-100">
                          Onay Bekliyor
                        </div>
                      </div>

                      <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100/50">
                        <p className="text-sm font-bold text-zinc-800 leading-relaxed italic line-clamp-4">
                          "{post.content}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        onClick={() => handleApprove(post.id)}
                        className="flex-1 bg-primary text-white h-12 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={14} /> Onayla ve Paylaş
                      </button>
                      <button
                        onClick={() => setEditingPost(post)}
                        className="w-12 h-12 rounded-xl border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-primary transition-all"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "SETTINGS" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl mx-auto">
          <div className="premium-card p-8 border-zinc-100">
            <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-6 flex items-center gap-3">
              <Settings2 className="text-primary" /> Hashtag Bankası ve Ayarlar
            </h2>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Varsayılan Hashtagler</label>
              <p className="text-[10px] font-bold text-zinc-500">
                AI post üretirken veya özel hashtag üretimi yaparken bu kelimeleri her zaman temel olarak alacaktır. Lütfen aralarında boşluk bırakarak yazın (Örn: #mentorcc #yurtdisiegitim).
              </p>
              <textarea
                rows={5}
                className="w-full bg-zinc-50 border-none rounded-2xl p-6 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                placeholder="#mentorcc #yurtdisiegitim #eğitimdanışmanlığı"
                value={defaultHashtags}
                onChange={(e) => setDefaultHashtags(e.target.value)}
              />

              <div className="space-y-4 pt-6 border-t border-zinc-100">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Görsel Kalite Parametreleri (Advanced)</label>
                <p className="text-[10px] font-bold text-zinc-500">
                  Her görsel üretilirken sonuna otomatik olarak eklenecek profesyonel fotoğrafçılık ve kalite komutlarıdır. 
                </p>
                <textarea
                  rows={4}
                  className="w-full bg-zinc-50 border-none rounded-2xl p-6 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-mono"
                  value={advancedImagePrompt}
                  onChange={(e) => setAdvancedImagePrompt(e.target.value)}
                />
              </div>

              <button
                onClick={handleSaveSettings}
                disabled={savingSettings}
                className="w-full bg-primary text-white h-[54px] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
              >
                {savingSettings ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                AYARLARI KAYDET
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {activeTab === "CALENDAR" && (
        <div className="premium-card p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
              {format(new Date(), 'MMMM yyyy', { locale: tr })}
            </h2>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">Paylaşıldı</span>
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">Onay Bekliyor</span>
              <span className="px-2 py-1 bg-zinc-100 text-zinc-700 rounded text-[10px] font-bold">Taslak</span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
              <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-400 py-2">
                {day}
              </div>
            ))}
            
            {eachDayOfInterval({ 
              start: startOfWeek(startOfMonth(new Date()), { weekStartsOn: 1 }), 
              end: endOfWeek(endOfMonth(new Date()), { weekStartsOn: 1 }) 
            }).map((day, i) => {
              const dayPosts = roadmaps.flatMap(r => r.posts || []).filter(p => isSameDay(new Date(p.scheduledAt), day));
              const isCurrentMonth = isSameMonth(day, new Date());
              const isToday = isSameDay(day, new Date());
              
              return (
                <div 
                  key={i} 
                  className={`min-h-[100px] p-2 rounded-2xl border ${isCurrentMonth ? 'bg-white border-zinc-100' : 'bg-zinc-50 border-transparent opacity-50'} ${isToday ? 'ring-2 ring-primary/20' : ''}`}
                >
                  <div className={`text-xs font-bold mb-2 ${isToday ? 'text-primary' : 'text-zinc-500'}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayPosts.map(post => (
                      <div 
                        key={post.id}
                        onClick={() => setEditingPost(post)}
                        className={`text-[9px] font-bold p-1.5 rounded-lg truncate cursor-pointer hover:opacity-80 transition-opacity ${
                          post.status === 'POSTED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          post.status === 'PENDING_APPROVAL' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-zinc-50 text-zinc-700 border border-zinc-200'
                        }`}
                      >
                        {post.platform} - {new Date(post.scheduledAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Editing Modal */}
      <AnimatePresence>
        {editingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <div className="w-full md:w-1/2 bg-zinc-100 flex flex-col p-8">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Görsel Önizleme</label>
                <div className="flex-1 rounded-3xl overflow-hidden shadow-inner bg-white flex items-center justify-center border border-zinc-200 relative group">
                  {editingPost.imageUrl ? (
                    <>
                      <img 
                        src={editingPost.imageUrl} 
                        alt="Edit" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="animate-spin text-primary" size={32} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Görsel Hazırlanıyor...</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Görsel Özeti (Prompt)</label>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2 text-xs font-bold"
                        value={editingPost.imagePrompt || ""}
                        onChange={(e) => setEditingPost({ ...editingPost, imagePrompt: e.target.value })}
                      />
                      <button 
                        disabled={generating || !editingPost.imagePrompt}
                        onClick={async () => {
                          if (!editingPost.imagePrompt) return;
                          setGenerating(true);
                          setEditingPost({ ...editingPost, imageUrl: '' }); // Show loader during generation
                          try {
                            const res = await fetch("/api/admin/social", {
                              method: "POST",
                              body: JSON.stringify({ 
                                action: "GENERATE_IMAGE_ONLY", 
                                prompt: editingPost.imagePrompt,
                                postId: editingPost.id 
                              })
                            });
                            const data = await res.json();
                            if (data.imageUrl) {
                              setEditingPost({ ...editingPost, imageUrl: data.imageUrl });
                              toast.success("Premium görsel başarıyla üretildi!");
                              fetchData();
                            } else {
                              throw new Error(data.error || "Görsel üretilemedi");
                            }
                          } catch (err: any) {
                            toast.error("Hata: " + err.message);
                          } finally {
                            setGenerating(false);
                          }
                        }}
                        className="bg-primary text-white px-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-primary/20 disabled:opacity-50"
                      >
                        {generating ? <Loader2 className="animate-spin" size={14} /> : <RefreshCw size={14} />}
                        GÖRSELİ YENİLE (PREMIUM)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Görsel URL (Manuel Değiştir)</label>
                    <input
                      type="text"
                      className="w-full mt-2 bg-white border border-zinc-200 rounded-xl px-4 py-2 text-xs font-bold"
                      value={editingPost.imageUrl || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, imageUrl: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black text-zinc-900 uppercase">İçeriği Düzenle</h3>
                  <button onClick={() => setEditingPost(null)} className="text-zinc-400 hover:text-zinc-900">✕</button>
                </div>

                <div className="flex-1 space-y-4">
                  {/* Platform Tabs */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Hedef Platform</label>
                    <div className="flex gap-2">
                      {['INSTAGRAM', 'LINKEDIN', 'TWITTER', 'FACEBOOK'].map(platform => (
                        <button
                          key={platform}
                          onClick={() => setEditingPost({ ...editingPost, platform })}
                          className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border transition-all ${
                            editingPost.platform === platform 
                              ? 'bg-zinc-900 text-white border-zinc-900' 
                              : 'bg-white text-zinc-400 border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          {getPlatformIcon(platform)}
                          <span className="hidden sm:inline">{platform}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Yazı / Caption</label>
                      <button 
                        onClick={handleGenerateHashtags}
                        disabled={generatingHashtags}
                        className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 hover:text-primary/80 transition-colors bg-primary/10 px-2 py-1 rounded-lg"
                      >
                        {generatingHashtags ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        Hashtag Üret (AI)
                      </button>
                    </div>
                    <textarea
                      className="w-full h-52 bg-zinc-50 border-none rounded-3xl p-6 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all leading-relaxed"
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleDeletePost(editingPost.id)}
                    className="flex-[0.2] bg-red-50 text-red-500 h-14 rounded-2xl flex items-center justify-center hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={handleUpdatePost}
                    className="flex-[0.8] bg-zinc-900 text-white h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={16} /> Değişiklikleri Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
