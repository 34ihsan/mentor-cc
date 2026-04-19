import { z } from "zod";

// --- Form Validation Schemas ---

export const SEOActionSchema = z.object({
  title: z.string().min(10).max(200),
  content: z.string().min(100),
  keyword: z.string().min(2).max(50),
});

export const HarvesterSchema = z.object({
  url: z.string().url("Geçerli bir URL giriniz"),
  id: z.string().uuid().optional(),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, "İsim çok kısa"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
});

export const ExcelImportSchema = z.object({
  // Filename is usually not sent via JSON, but we can validate metadata if needed
  type: z.string().regex(/application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/),
});
