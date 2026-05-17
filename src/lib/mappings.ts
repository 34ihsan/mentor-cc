import { Category } from "@prisma/client";
import { 
    ServiceCategory, 
    ServiceMapValue, 
    HighSchoolCategoryValue, 
    ExamDetailStructure, 
    ExamMapValue,
    UniversityServiceDetail
} from "./mappings/types";

export type { 
    ServiceCategory, 
    ServiceMapValue, 
    HighSchoolCategoryValue, 
    ExamDetailStructure, 
    ExamMapValue,
    UniversityServiceDetail
};

// Re-exports from modular files
export { serviceMap } from "./mappings/services";
export { countryMap } from "./mappings/countries";
export { examMap } from "./mappings/exams";
export { highSchoolCategoryMap } from "./mappings/highschool";
export { categoryRequirements, countryServiceRequirements } from "./mappings/requirements";
