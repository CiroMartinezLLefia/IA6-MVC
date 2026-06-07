"use server";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createComment(
  camperModelId: string,
  content: string
): Promise<{ success?: boolean; error?: string }> {
  const session = await auth();
  
  if (!session || !session.user || !(session.user as any).id) {
    return { error: "Has d'iniciar sessió per poder publicar comentaris." };
  }

  const trimmedContent = content.trim();
  if (!trimmedContent) {
    return { error: "El comentari no pot estar buit." };
  }

  try {
    await prisma.comment.create({
      data: {
        content: trimmedContent,
        userId: (session.user as any).id,
        camperModelId,
      },
    });

    revalidatePath(`/models/${camperModelId}`);
    return { success: true };
  } catch (error) {
    console.error("Error en crear comentari:", error);
    return { error: "S'ha produït un error al servidor. Si us plau, torna-ho a provar." };
  }
}
