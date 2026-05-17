"use server";

import { CONTRACT_TEMPLATES, OFFER_TEMPLATES } from "@/lib/templates";

export async function getContractTemplateHtml(templateKey: string, data: any) {
    const template = CONTRACT_TEMPLATES[templateKey];
    if (!template) return null;
    return template.content(data);
}

export async function getOfferTemplateHtml(templateKey: string, data: any) {
    const template = OFFER_TEMPLATES[templateKey];
    if (!template) return null;
    return template.content(data);
}

export async function getTemplateList() {
    return {
        contracts: Object.keys(CONTRACT_TEMPLATES).map(key => ({
            key,
            title: CONTRACT_TEMPLATES[key].title
        })),
        offers: Object.keys(OFFER_TEMPLATES).map(key => ({
            key,
            title: OFFER_TEMPLATES[key].title
        }))
    };
}
