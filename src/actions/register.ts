"use server";
import { prisma } from "@/db/prisma";
import { z } from "zod";
import * as bcrypt from "bcryptjs";

const registerSchema = z
  .object({
    name: z.string().min(2, "El nom ha de tenir almenys 2 caràcters."),
    email: z.string().email("Correu electrònic no vàlid."),
    password: z.string().min(6, "La contrasenya ha de tenir almenys 6 caràcters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les contrasenyes no coincideixen.",
    path: ["confirmPassword"],
  });

export interface RegisterFormState {
  success?: boolean;
  error?: boolean;
  message?: string;
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
}

export async function registerUser(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validació
  const validation = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return {
      error: true,
      errors: {
        name: errors.name?.[0] || "",
        email: errors.email?.[0] || "",
        password: errors.password?.[0] || "",
        confirmPassword: errors.confirmPassword?.[0] || "",
      },
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        error: true,
        errors: {
          email: "Aquest correu electrònic ja està registrat.",
        },
      };
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error en registrar usuari:", error);
    return {
      error: true,
      message: "S'ha produït un error al servidor. Si us plau, torna-ho a provar.",
    };
  }
}
