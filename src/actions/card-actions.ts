"use server";

import { revalidatePath } from "next/cache";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function toggleCardStatus(cardId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const card = await prisma.qrCard.findUnique({
    where: { id: cardId },
    include: { customer: true },
  });

  if (!card || card.customer.userId !== user.id) {
    return { success: false, error: "Card not found or unauthorized" };
  }

  const newStatus = card.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  await prisma.qrCard.update({
    where: { id: cardId },
    data: { status: newStatus },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/customers");
  revalidatePath(`/dashboard/cards/${cardId}`);
  return { success: true, status: newStatus };
}

export async function updateCardTemplate(
  cardId: string,
  template: "PROFESSIONAL" | "LUXURY" | "CLASSIC" | "CREATOR" | "FRIENDLY"
) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const card = await prisma.qrCard.findUnique({
    where: { id: cardId },
    include: { customer: true },
  });

  if (!card || card.customer.userId !== user.id) {
    return { success: false, error: "Card not found or unauthorized" };
  }

  await prisma.qrCard.update({
    where: { id: cardId },
    data: { template },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/customers");
  revalidatePath(`/dashboard/cards/${cardId}`);
  revalidatePath(`/card/${card.slug}`);
  return { success: true, template };
}

export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 400,
      margin: 2,
      color: {
        dark: "#1e1b4b", // deep indigo / sleek modern dark
        light: "#ffffff",
      },
    });
  } catch (err) {
    console.error("QR generation error:", err);
    return "";
  }
}
