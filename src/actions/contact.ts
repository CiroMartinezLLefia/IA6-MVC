"use server";
import { prisma } from "@/db/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "El nom ha de tenir almenys 2 caràcters."),
  email: z.string().email("Correu electrònic no vàlid."),
  message: z.string().min(10, "El missatge ha de tenir almenys 10 caràcters."),
});

export interface ContactFormState {
  success?: boolean;
  error?: boolean;
  message?: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export async function submitContactRequest(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Validació
  const validation = contactSchema.safeParse({ name, email, message });
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return {
      error: true,
      errors: {
        name: errors.name?.[0] || "",
        email: errors.email?.[0] || "",
        message: errors.message?.[0] || "",
      },
    };
  }

  try {
    await prisma.contactRequest.create({
      data: {
        name,
        email,
        message,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error en desar contacte:", error);
    return {
      error: true,
      message: "S'ha produït un error al servidor. Si us plau, torna-ho a provar més tard.",
    };
  }
}
