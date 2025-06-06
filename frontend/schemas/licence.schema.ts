import { z } from "zod";

export const createLicenceSchema = z.object({
  firstname: z
    .string({ required_error: "Le prénom est obligatoire" })
    .min(1, { message: "Le prénom est obligatoire" }),
  lastname: z
    .string({ required_error: "Le nom de famille est obligatoire" })
    .min(1, { message: "Le nom de famille est obligatoire" }),
  birthdate: z.string({
    required_error: "La date de naissance est obligatoire",
  }),
  zipcode: z
    .string({ required_error: "Le code postal est obligatoire" })
    .min(1),
  address: z
    .string({ required_error: "L'adresse est obligatoire" })
    .min(1, { message: "L'adresse est obligatoire" }),
  email: z
    .string({ required_error: "L'email est obligatoire" })
    .email({ message: "L'email est invalide" }),
  phone: z
    .string({ required_error: "Le numéro de téléphone est obligatoire" })
    .min(1),
});

export type CreateLicenceSchema = z.infer<typeof createLicenceSchema>;
