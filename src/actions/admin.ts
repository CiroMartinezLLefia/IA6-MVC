"use server";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const session = await auth();
  if (!session || !session.user) return false;
  const role = (session.user as any).role;
  return role === "ADMIN";
}

export async function updateUserRole(
  userId: string,
  newRole: "USER" | "EDITOR" | "ADMIN"
): Promise<{ success?: boolean; error?: string }> {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return { error: "No tens permís d'administrador per realitzar aquesta acció." };
  }

  try {
    const session = await auth();
    if ((session?.user as any)?.id === userId) {
      return { error: "No et pots canviar el rol a tu mateix per motius de seguretat." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    revalidatePath("/backoffice/users");
    return { success: true };
  } catch (error) {
    console.error("Error en actualitzar rol de l'usuari:", error);
    return { error: "Error al modificar el rol de l'usuari." };
  }
}

export async function toggleContactRequestStatus(
  id: string,
  currentStatus: string
): Promise<{ success?: boolean; error?: string }> {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return { error: "No tens permís d'administrador per realitzar aquesta acció." };
  }

  const newStatus = currentStatus === "PENDING" ? "RESOLVED" : "PENDING";

  try {
    await prisma.contactRequest.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath("/backoffice/contacts");
    return { success: true };
  } catch (error) {
    console.error("Error en canviar estat de contacte:", error);
    return { error: "Error en canviar l'estat de la consulta." };
  }
}
