"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ScrollToContactProps {
    className?: string;
    text?: string;
}

export default function ScrollToContact({
    className = "w-full py-4 bg-gold text-navy rounded-xl font-bold hover:bg-gold-lt transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold/10",
    text = "Detaylı Bilgi Al"
}: ScrollToContactProps) {
    const handleClick = () => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <button
            onClick={handleClick}
            className={className}
        >
            {text} <ArrowRight className="w-4 h-4" />
        </button>
    );
}
