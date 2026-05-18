import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi giriniz.",
  }),
  password: z.string().min(1, {
    message: "Şifre gereklidir.",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi giriniz.",
  }),
  password: z.string()
    .min(8, { message: "Şifre en az 8 karakter olmalıdır." })
    .regex(/[A-Z]/, { message: "Şifre en az bir büyük harf içermelidir." })
    .regex(/[a-z]/, { message: "Şifre en az bir küçük harf içermelidir." })
    .regex(/[0-9]/, { message: "Şifre en az bir rakam içermelidir." }),
  name: z.string().min(2, {
    message: "İsim en az 2 karakter olmalıdır.",
  }),
  role: z.enum(["STUDENT", "AGENCY_MANAGER"]).default("STUDENT"),
  phone: z.string().optional().nullable().or(z.literal("")),
  companyName: z.string().optional().nullable().or(z.literal("")),
  captchaToken: z.string().optional(), // Token from reCAPTCHA
});

export const ContactSchema = z.object({
  name: z.string().min(2, {
    message: "İsim en az 2 karakter olmalıdır.",
  }),
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi giriniz.",
  }),
  phone: z.string().optional(),
  service: z.string().min(1, {
    message: "Lütfen bir hizmet seçiniz.",
  }),
  message: z.string().min(10, {
    message: "Mesaj en az 10 karakter olmalıdır.",
  }),
  captchaToken: z.string().optional(),
});
