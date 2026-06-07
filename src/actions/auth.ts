"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export interface LoginFormState {
  error?: string;
  success?: boolean;
}

export async function loginWithCredentials(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Si us plau, omple tots els camps." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Correu o contrasenya incorrectes." };
        default:
          return { error: "S'ha produït un error en iniciar sessió." };
      }
    }
    // Next.js redirection throws an error, we must rethrow it to let the redirect work
    throw error;
  }
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
