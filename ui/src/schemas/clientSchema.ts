import { z } from "zod";

export const clientSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email inválido"),
    phone: z.string().min(11, "Telefone deve ter 11 dígitos").regex(/^\d{11}$/, "Telefone deve conter exatamente 11 números"),
    city: z.string().min(3, "A cidade deve ter pelo menos 3 caracteres"),
});

export type ClientFormData = z.infer<typeof clientSchema>;
