import { masterServiceDetails } from "@/data/master-service-details";
import { summerSchoolServiceDetails } from "@/data/summer-school-service-details";
import { languageSchoolServiceDetails } from "@/data/language-school-service-details";
import { universityServiceDetails } from "@/data/university-service-details";
import { examsServiceDetails } from "@/data/exams-service-details";

export const getActiveCountriesForService = (serviceSlug: string): string[] => {
    switch (serviceSlug) {
        case 'yurtdisi-universite':
            return Object.entries(universityServiceDetails)
                .filter(([_, data]) => (data as any).universities && (data as any).universities.length > 0)
                .map(([slug]) => slug);
        case 'yurtdisi-yuksek-lisans':
            return Object.entries(masterServiceDetails)
                .filter(([_, data]) => (data as any).universities && (data as any).universities.length > 0)
                .map(([slug]) => slug);
        case 'yurtdisi-yaz-okullari':
            return Object.entries(summerSchoolServiceDetails)
                .filter(([_, data]) => (data as any).universities && (data as any).universities.length > 0)
                .map(([slug]) => slug);
        case 'yurtdisi-dil-okullari':
            return Object.entries(languageSchoolServiceDetails)
                .filter(([_, data]) => (data as any).universities && (data as any).universities.length > 0)
                .map(([slug]) => slug);
        case 'sinavlar':
            return Object.keys(examsServiceDetails);
        default:
            return [];
    }
};
