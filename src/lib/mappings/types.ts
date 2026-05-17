import { Category } from "@prisma/client";

export interface ServiceCategory {
    slug?: string;
    title: string;
    title_en?: string;
    title_de?: string;
    desc: string;
    desc_en?: string;
    desc_de?: string;
    iconKey: string;
    image?: string;
}

export interface ServiceMapValue {
    category: Category;
    title: string;
    title_en?: string;
    title_de?: string;
    desc: string;
    desc_en?: string;
    desc_de?: string;
    categories?: ServiceCategory[];
}

export interface HighSchoolCategoryValue {
    title: string;
    title_en?: string;
    title_de?: string;
    desc: string;
    desc_en?: string;
    desc_de?: string;
    image: string;
    details?: {
        heroImage: string;
        intro: string;
        intro_en?: string;
        intro_de?: string;
        stats: { value: string; label: string; label_en?: string; label_de?: string }[];
        costEstimates?: { region: string; usdPerYear: number; local: string }[];
        ageRange?: string;
        acceptanceRate?: string;
        dataSources?: { label: string; url: string }[];
        features: string[];
        features_en?: string[];
        features_de?: string[];
        matchKeyword: string;
        advantages?: { title: string; desc: string }[];
        advantages_en?: { title: string; desc: string }[];
        advantages_de?: { title: string; desc: string }[];
        process?: { title: string; desc: string }[];
        process_en?: { title: string; desc: string }[];
        process_de?: { title: string; desc: string }[];
        faq?: { q: string; a: string }[];
        faq_en?: { q: string; a: string }[];
        faq_de?: { q: string; a: string }[];
    };
}

export interface ExamDetailStructure {
    title: string;
    title_en?: string;
    title_de?: string;
    desc: string;
    desc_en?: string;
    desc_de?: string;
}

export interface ExamMapValue {
    title: string;
    title_en?: string;
    title_de?: string;
    desc: string;
    desc_en?: string;
    desc_de?: string;
    image: string;
    details?: {
        heroImage: string;
        intro: string;
        intro_en?: string;
        intro_de?: string;
        structure: ExamDetailStructure[];
        scoring: string;
        scoring_en?: string;
        scoring_de?: string;
        features: string[];
        features_en?: string[];
        features_de?: string[];
    };
}

export interface UniversityServiceDetail {
    overview: string;
    overview_en?: string;
    overview_de?: string;
    advantages: { title: string; desc: string }[];
    advantages_en?: { title: string; desc: string }[];
    advantages_de?: { title: string; desc: string }[];
    process: { title: string; desc: string }[];
    process_en?: { title: string; desc: string }[];
    process_de?: { title: string; desc: string }[];
    faq: { q: string; a: string }[];
    faq_en?: { q: string; a: string }[];
    faq_de?: { q: string; a: string }[];
    structure?: string;
    structure_en?: string;
    structure_de?: string;
    scoring?: string;
    scoring_en?: string;
    scoring_de?: string;
    universities?: { 
        name: string; 
        slug: string;
        ranking?: string; 
        worldRanking?: string;
        annualTuition?: string;
        detailedDescription?: string;
        highlights?: string[]; 
        departments: string[]; 
    }[];
    universities_en?: { 
        name: string; 
        slug: string;
        ranking?: string; 
        worldRanking?: string;
        annualTuition?: string;
        detailedDescription?: string;
        highlights?: string[]; 
        departments: string[]; 
    }[];
    universities_de?: { 
        name: string; 
        slug: string;
        ranking?: string; 
        worldRanking?: string;
        annualTuition?: string;
        detailedDescription?: string;
        highlights?: string[]; 
        departments: string[]; 
    }[];
}

export interface CountryMapValue {
    title: string;
    title_en?: string;
    title_de?: string;
    image: string;
}
