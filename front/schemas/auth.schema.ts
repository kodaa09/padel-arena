import { z } from "zod";

export const signupSchema = z.object({
  firstname: z
    .string({ required_error: "Le prénom est obligatoire" })
    .min(3, { message: "Le prénom est obligatoire" }),
  lastname: z
    .string({ required_error: "Le nom de famille est obligatoire" })
    .min(3, { message: "Le nom de famille est obligatoire" }),
  email: z
    .string({ required_error: "L'email est obligatoire" })
    .email("Email invalide"),
  password: z
    .string({ required_error: "Le mot de passe est obligatoire" })
    .min(4, { message: "Le mot de passe doit contenir au moins 4 caractères" }),
  licence: z.boolean().optional(),
  licenseNumber: z.string().optional(),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "L'email est obligatoire" })
    .email("Email invalide"),
  password: z
    .string({ required_error: "Le mot de passe est obligatoire" })
    .min(4, { message: "Le mot de passe doit contenir au moins 4 caractères" }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
