'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Filter, Globe, School, SlidersHorizontal, ArrowRight } from "lucide-react";
import UniversityCard from "@/components/public/UniversityCard";

interface Institution {
    id: string;
    name: string;
    slug: string;
    image: string;
    rank?: string;
    city?: string;
    countryId: string;
    country?: { name: string };
}

interface Country {
    id: string;
    name: string;
}

interface Props {
    initialInstitutions: Institution[];
    countries: Country[];
}

export default function InstitutionsClient({ initialInstitutions, countries }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("ALL");
    const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>(initialInstitutions);

    useEffect(() => {
        let filtered = initialInstitutions;

        if (searchQuery) {
            filtered = filtered.filter(inst =>
                inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (inst.city && inst.city.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (selectedCountry !== "ALL") {
            filtered = filtered.filter(inst => inst.countryId === selectedCountry);
        }

        setFilteredInstitutions(filtered);
    }, [searchQuery, selectedCountry, initialInstitutions]);

    return (
        <div className="bg-zinc-50/30 min-h-screen">
            {/* Filter Section */}
            <section className="relative z-30 pt-12 pb-24 container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                    className="bg-white/70 backdrop-blur-3xl p-10 md:p-14 border border-zinc-100 shadow-premium rounded-[3.5rem]"
                >
                    <div className="flex flex-col lg:flex-row gap-10 items-end">
                        <div className="flex-1 space-y-5 w-full">
                            <div className="flex items-center gap-3 ml-2">
                                <Search size={14} className="text-secondary" />
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Search Institutions</label>
                            </div>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search by name or city..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-zinc-50 border border-zinc-100 p-7 pl-14 rounded-3xl outline-none focus:border-secondary/30 transition-all font-serif italic text-primary placeholder:text-zinc-300 text-lg shadow-inner"
                                />
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-secondary rounded-full" />
                            </div>
                        </div>

                        <div className="w-full lg:w-80 space-y-5">
                            <div className="flex items-center gap-3 ml-2">
                                <Globe size={14} className="text-secondary" />
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Global Coverage</label>
                            </div>
                            <div className="relative group">
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="w-full bg-zinc-50 border border-zinc-100 p-7 px-8 pr-12 rounded-3xl outline-none focus:border-secondary/30 transition-all font-black text-primary appearance-none cursor-pointer text-[12px] uppercase tracking-[0.2em] shadow-inner"
                                >
                                    <option value="ALL">All Nations</option>
                                    {countries.map(country => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <SlidersHorizontal size={16} className="text-zinc-300" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto">
                            <div className="bg-zinc-950 p-8 flex items-center justify-center gap-6 text-white min-w-[200px] shadow-2xl rounded-3xl group transition-all duration-1000 border border-zinc-800">
                                <div className="text-4xl font-serif font-bold text-secondary italic tracking-tighter group-hover:scale-110 transition-transform duration-700">{filteredInstitutions.length}</div>
                                <div className="text-[9px] font-black uppercase tracking-[0.4em] leading-tight opacity-50">Global<br />Partners</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Institutions Grid */}
            <section className="pb-40 container mx-auto px-6">
                <AnimatePresence mode="popLayout">
                    {filteredInstitutions.length > 0 ? (
                        <motion.div 
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14"
                        >
                            {filteredInstitutions.map((inst, idx) => (
                                <motion.div
                                    key={inst.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.65, 0, 0.35, 1] }}
                                >
                                    <UniversityCard
                                        name={inst.name}
                                        slug={inst.slug}
                                        image={inst.image}
                                        rank={inst.rank}
                                        city={inst.city || "Global"}
                                        country={inst.country?.name || "Global"}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-48 text-center rounded-[4rem] border-2 border-dashed border-zinc-100 bg-white shadow-premium"
                        >
                            <div className="w-24 h-24 bg-zinc-50 border border-zinc-100 rounded-full flex items-center justify-center mx-auto mb-10 text-secondary/30">
                                <Sparkles size={40} strokeWidth={1} />
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-primary mb-6 italic tracking-tight">Refine Your Vision</h3>
                            <p className="text-zinc-400 font-serif italic text-lg max-w-md mx-auto leading-relaxed">We couldn't find institutions matching your current parameters. Try adjusting your search criteria.</p>
                            <button 
                                onClick={() => { setSearchQuery(""); setSelectedCountry("ALL"); }}
                                className="mt-12 btn-primary !py-5 !px-12 text-[10px] tracking-[0.4em] gap-4"
                            >
                                <Filter size={14} /> Reset Filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <div className="fixed top-1/2 left-0 w-64 h-64 bg-secondary/3 blur-[120px] pointer-events-none -translate-x-1/2" />
        </div>
    );
}
