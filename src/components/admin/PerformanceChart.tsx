"use client";

import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

interface PerformanceChartProps {
    data: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md border border-zinc-100 p-4 rounded-2xl shadow-xl shadow-zinc-900/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
                <p className="text-sm font-black text-primary">
                    {payload[0].value} Başvuru
                </p>
            </div>
        );
    }
    return null;
};

export default function PerformanceChart({ data }: PerformanceChartProps) {
    // Sample data if none provided (for WOW effect)
    const chartData = data?.length > 0 ? data : [
        { name: 'Ocak', value: 45 },
        { name: 'Şubat', value: 52 },
        { name: 'Mart', value: 48 },
        { name: 'Nisan', value: 61 },
        { name: 'Mayıs', value: 55 },
        { name: 'Haziran', value: 67 },
    ];

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#003366" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#003366" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#A1A1AA' }}
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#A1A1AA' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#003366" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                        animationDuration={2000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
