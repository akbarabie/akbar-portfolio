import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Payload lengkap termasuk honeypot. Dipisah dari schema di atas supaya
// error honeypot gak pernah bocor jadi pesan error yang user lihat —
// kalau ini terisi, kita diam-diam anggap spam, bukan invalid form.
export const contactPayloadSchema = contactFormSchema.extend({
  website: z.string().optional(),
});