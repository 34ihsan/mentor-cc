
"use client";

import { createApplicationByAgencyAction } from "@/app/actions/agency-actions";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
    Loader2, 
    Zap, 
    CheckCircle2, 
    AlertCircle 
} from "lucide-react";
import { toast } from "sonner";

export default function CreateApplicationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const searchParams = useSearchParams();
    const programId = searchParams.get("programId");
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        if (!programId) {
            router.push(`/dashboard/agency/students/${id}/applications/new`);
            return;
        }

        const create = async () => {
            try {
                const result = await createApplicationByAgencyAction(id, programId);
                if (result.success) {
                    setStatus('success');
                    toast.success("Başvuru başarıyla oluşturuldu!");
                    setTimeout(() => {
                        router.push(`/dashboard/agency/students/${id}`);
                    }, 2000);
                } else {
                    setStatus('error');
                    toast.error(result.error || "Bir hata oluştu");
                }
            } catch (error) {
                setStatus('error');
                toast.error("İşlem başarısız");
            }
        };

        create();
    }, [id, programId, router]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
            {status === 'loading' && (
                <>
                    <div className="relative">
                        <Loader2 size={80} className="text-[var(--primary)] animate-spin opacity-20" />
                        <Zap size={40} className="absolute inset-0 m-auto text-[var(--primary)] animate-pulse" />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">İşlem Gerçekleştiriliyor</h2>
                        <p className="text-slate-500 font-bold text-sm">Başvuru kaydı oluşturuluyor, lütfen bekleyin...</p>
                    </div>
                </>
            )}

            {status === 'success' && (
                <>
                    <div className="w-24 h-24 rounded-[40px] bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                        <CheckCircle2 size={48} />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">BAŞARILI!</h2>
                        <p className="text-slate-500 font-bold text-sm">Başvuru dosyası hazırlandı, yönlendiriliyorsunuz.</p>
                    </div>
                </>
            )}

            {status === 'error' && (
                <>
                    <div className="w-24 h-24 rounded-[40px] bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-500/20">
                        <AlertCircle size={48} />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">HATA OLUŞTU</h2>
                        <p className="text-slate-500 font-bold text-sm">İşlem sırasında bir sorunla karşılaşıldı.</p>
                    </div>
                </>
            )}
        </div>
    );
}
