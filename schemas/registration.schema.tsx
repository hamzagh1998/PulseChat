import z from "zod";

export const registrationSchema = z.object({
  name: z.string().min(3).max(20),
  phoneNumber: z.string().min(8).max(28),
  verificationCode: z.string().min(6).max(6),
});

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;
