"use server";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function checkAuth() {
  const session = await auth();
  if (!session || !session.user) return null;
  const role = (session.user as any).role;
  if (role !== "ADMIN" && role !== "EDITOR") return null;
  return session;
}

export async function createCamperModel(formData: FormData) {
  const authSession = await checkAuth();
  if (!authSession) {
    return { error: "No tens permís per realitzar aquesta acció." };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const pricePerDay = parseFloat(formData.get("pricePerDay") as string);
  const passengers = parseInt(formData.get("passengers") as string);
  const beds = parseInt(formData.get("beds") as string);
  const engine = formData.get("engine") as string;
  const transmission = formData.get("transmission") as string;
  const imageUrl = formData.get("imageUrl") as string || "/images/hero-camper.jpg";

  if (!name || !description || isNaN(pricePerDay) || isNaN(passengers) || isNaN(beds) || !engine || !transmission) {
    return { error: "Si us plau, omple tots els camps obligatoris amb valors vàlids." };
  }

  try {
    await prisma.camperModel.create({
      data: {
        name,
        description,
        pricePerDay,
        passengers,
        beds,
        engine,
        transmission,
        imageUrl,
      },
    });
    revalidatePath("/");
    revalidatePath("/backoffice/models");
    return { success: true };
  } catch (error) {
    console.error("Error en crear camper:", error);
    return { error: "Error en desar el model." };
  }
}

export async function updateCamperModel(id: string, formData: FormData) {
  const authSession = await checkAuth();
  if (!authSession) {
    return { error: "No tens permís per realitzar aquesta acció." };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const pricePerDay = parseFloat(formData.get("pricePerDay") as string);
  const passengers = parseInt(formData.get("passengers") as string);
  const beds = parseInt(formData.get("beds") as string);
  const engine = formData.get("engine") as string;
  const transmission = formData.get("transmission") as string;
  const imageUrl = formData.get("imageUrl") as string || "/images/hero-camper.jpg";

  if (!name || !description || isNaN(pricePerDay) || isNaN(passengers) || isNaN(beds) || !engine || !transmission) {
    return { error: "Si us plau, omple tots els camps obligatoris amb valors vàlids." };
  }

  try {
    await prisma.camperModel.update({
      where: { id },
      data: {
        name,
        description,
        pricePerDay,
        passengers,
        beds,
        engine,
        transmission,
        imageUrl,
      },
    });
    revalidatePath("/");
    revalidatePath(`/models/${id}`);
    revalidatePath("/backoffice/models");
    return { success: true };
  } catch (error) {
    console.error("Error en modificar camper:", error);
    return { error: "Error en modificar el model." };
  }
}

export async function deleteCamperModel(id: string) {
  const authSession = await checkAuth();
  if (!authSession) {
    return { error: "No tens permís per realitzar aquesta acció." };
  }

  try {
    await prisma.camperModel.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/backoffice/models");
    return { success: true };
  } catch (error) {
    console.error("Error en eliminar camper:", error);
    return { error: "Error en eliminar el model." };
  }
}
