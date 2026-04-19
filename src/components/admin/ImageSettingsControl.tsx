
import {
    Layout,
    Maximize,
    Minimize,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Monitor,
    Smartphone,
    Square
} from "lucide-react";

export interface ImageSettings {
    size: 'cover' | 'contain' | 'original';
    position: 'center' | 'top' | 'bottom' | 'left' | 'right';
    aspectRatio: 'auto' | '21/9' | '16/9' | '4/3' | '1/1';
    height: 'auto' | 'small' | 'medium' | 'large' | 'screen';
    textColor?: 'white' | 'black' | 'blue' | 'yellow';
    textPosition?: 'left' | 'center' | 'right';
    textVerticalAlign?: 'top' | 'center' | 'bottom';
    overlayOpacity?: number; // 0 to 100
    overlayColor?: string;
}

export const defaultImageSettings: ImageSettings = {
    size: 'cover',
    position: 'center',
    aspectRatio: '16/9',
    height: 'medium',
    textColor: 'white',
    textPosition: 'center',
    textVerticalAlign: 'center'
};

interface Props {
    settings: ImageSettings;
    onChange: (settings: ImageSettings) => void;
    label?: string;
}

export default function ImageSettingsControl({ settings, onChange, label = "Görsel Yerleşim Ayarları" }: Props) {

    const update = (key: keyof ImageSettings, value: any) => {
        onChange({ ...settings, [key]: value });
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black">
                <Layout size={14} />
                {label}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Size Mode */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black uppercase tracking-widest">Dolgu Modu</label>
                    <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={() => update('size', 'cover')}
                            className={`flex-1 p-2 rounded-lg flex items-center justify-center transition-all ${settings.size === 'cover' ? 'bg-[var(--primary)] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Tam Kapla (Cover)"
                        >
                            <Maximize size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => update('size', 'contain')}
                            className={`flex-1 p-2 rounded-lg flex items-center justify-center transition-all ${settings.size === 'contain' ? 'bg-[var(--primary)] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Sığdır (Contain)"
                        >
                            <Minimize size={16} />
                        </button>
                    </div>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black uppercase tracking-widest">En/Boy Oranı</label>
                    <select
                        value={settings.aspectRatio}
                        onChange={(e) => update('aspectRatio', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none focus:border-[var(--primary)] text-black h-[38px]"
                    >
                        <option value="auto">Otomatik</option>
                        <option value="21/9">Sinematik (21:9)</option>
                        <option value="16/9">Geniş (16:9)</option>
                        <option value="4/3">Standart (4:3)</option>
                        <option value="1/1">Kare (1:1)</option>
                    </select>
                </div>

                {/* Vertical Height */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black uppercase tracking-widest">Yükseklik</label>
                    <div className="relative">
                        <select
                            value={settings.height}
                            onChange={(e) => update('height', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none focus:border-[var(--primary)] text-black h-[38px]"
                        >
                            <option value="auto">İçeriğe Göre</option>
                            <option value="small">Küçük (30vh)</option>
                            <option value="medium">Orta (50vh)</option>
                            <option value="large">Büyük (70vh)</option>
                            <option value="screen">Tam Ekran (100vh)</option>
                        </select>
                    </div>
                </div>

                {/* Position */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black uppercase tracking-widest">Odak Noktası</label>
                    <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                        <button type="button" onClick={() => update('position', 'left')} className={`flex-1 p-2 rounded-lg flex items-center justify-center ${settings.position === 'left' ? 'bg-[var(--primary)] text-white' : 'text-slate-400'}`}><AlignLeft size={16} /></button>
                        <button type="button" onClick={() => update('position', 'center')} className={`flex-1 p-2 rounded-lg flex items-center justify-center ${settings.position === 'center' ? 'bg-[var(--primary)] text-white' : 'text-slate-400'}`}><AlignCenter size={16} /></button>
                        <button type="button" onClick={() => update('position', 'right')} className={`flex-1 p-2 rounded-lg flex items-center justify-center ${settings.position === 'right' ? 'bg-[var(--primary)] text-white' : 'text-slate-400'}`}><AlignRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Text Settings Section */}
            <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black mb-4">
                    <AlignJustify size={14} />
                    Yazı Ayarları
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Text Color */}
                    <div className="space-y-2 col-span-2 lg:col-span-1">
                        <label className="text-[10px] font-bold text-black uppercase tracking-widest">Yazı Rengi</label>
                        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                            {[
                                { val: 'white', label: 'Beyaz', bg: 'bg-white', text: 'text-slate-900' },
                                { val: 'black', label: 'Siyah', bg: 'bg-black', text: 'text-white' },
                                { val: 'blue', label: 'Mavi', bg: 'bg-blue-600', text: 'text-white' },
                                { val: 'yellow', label: 'Sarı', bg: 'bg-amber-500', text: 'text-white' }
                            ].map((color) => (
                                <button
                                    key={color.val}
                                    type="button"
                                    onClick={() => update('textColor', color.val)}
                                    className={`flex-1 p-2 rounded-lg flex items-center justify-center gap-2 transition-all ${settings.textColor === color.val ? 'ring-2 ring-[var(--primary)] ring-offset-2' : 'hover:bg-slate-50'}`}
                                    title={color.label}
                                >
                                    <div className={`w-4 h-4 rounded-full border border-slate-200 ${color.bg}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Text Position (Horizontal) */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black uppercase tracking-widest">Yatay Konum</label>
                        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                            <button type="button" onClick={() => update('textPosition', 'left')} className={`flex-1 p-2 rounded-lg flex items-center justify-center ${settings.textPosition === 'left' ? 'bg-[var(--primary)] text-white' : 'text-slate-400'}`}><AlignLeft size={16} /></button>
                            <button type="button" onClick={() => update('textPosition', 'center')} className={`flex-1 p-2 rounded-lg flex items-center justify-center ${settings.textPosition === 'center' || !settings.textPosition ? 'bg-[var(--primary)] text-white' : 'text-slate-400'}`}><AlignCenter size={16} /></button>
                            <button type="button" onClick={() => update('textPosition', 'right')} className={`flex-1 p-2 rounded-lg flex items-center justify-center ${settings.textPosition === 'right' ? 'bg-[var(--primary)] text-white' : 'text-slate-400'}`}><AlignRight size={16} /></button>
                        </div>
                    </div>

                    {/* Text Position (Vertical) */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black uppercase tracking-widest">Dikey Konum</label>
                        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 h-[38px] items-center">
                            <button type="button" onClick={() => update('textVerticalAlign', 'top')} className={`flex-1 p-2 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase ${settings.textVerticalAlign === 'top' ? 'bg-[var(--primary)] text-white' : 'text-slate-400'}`}>Üst</button>
                            <button type="button" onClick={() => update('textVerticalAlign', 'center')} className={`flex-1 p-2 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase ${settings.textVerticalAlign === 'center' || !settings.textVerticalAlign ? 'bg-[var(--primary)] text-white' : 'text-slate-400'}`}>Orta</button>
                            <button type="button" onClick={() => update('textVerticalAlign', 'bottom')} className={`flex-1 p-2 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase ${settings.textVerticalAlign === 'bottom' ? 'bg-[var(--primary)] text-white' : 'text-slate-400'}`}>Alt</button>
                        </div>
                    </div>

                    {/* Overlay Settings */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black uppercase tracking-widest">Overlay Rengi</label>
                        <div className="flex items-center gap-3">
                            <input 
                                type="color" 
                                value={settings.overlayColor || "#0B1751"} 
                                onChange={(e) => update('overlayColor', e.target.value)}
                                className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 overflow-hidden" 
                            />
                            <span className="text-[10px] font-mono text-black">{settings.overlayColor || "#0B1751"}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-black uppercase tracking-widest">Overlay Opaklığı (%{settings.overlayOpacity || 50})</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={settings.overlayOpacity || 50} 
                            onChange={(e) => update('overlayOpacity', parseInt(e.target.value))}
                            className="w-full accent-[var(--primary)]" 
                        />
                    </div>
                </div>
            </div>

            {/* Visual Preview Hint */}
            <div className="text-[10px] text-slate-400 font-medium text-center pt-2 border-t border-slate-200 dark:border-slate-800/50">
                Seçilen ayarlar: {settings.size === 'cover' ? 'Kapsa' : 'Sığdır'} • {settings.aspectRatio} Oran • {settings.position.toUpperCase()} Hizala
            </div>
        </div>
    );
}
