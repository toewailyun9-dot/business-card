"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

export interface CustomerFormData {
  name: string;
  phone: string;
  photo?: string;
  jobTitle?: string;
  company?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  website?: string;
  bio?: string;
  status?: "ACTIVE" | "INACTIVE";
  template?: "PROFESSIONAL" | "LUXURY" | "CLASSIC" | "CREATOR" | "FRIENDLY";
  socialLinks?: Array<{ platform: string; url: string }>;
}

export async function createCustomer(data: CustomerFormData) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  if (!data.name || !data.phone) {
    return { success: false, error: "Full Name and Phone are required." };
  }

  try {
    // Generate unique slug for QR Card
    let slug = generateSlug(8);
    let attempts = 0;
    while (attempts < 5) {
      const existing = await prisma.qrCard.findUnique({ where: { slug } });
      if (!existing) break;
      slug = generateSlug(8);
      attempts++;
    }

    const filteredSocials = (data.socialLinks || []).filter(
      (link) => link.url && link.url.trim().length > 0
    );

    const customer = await prisma.customer.create({
      data: {
        userId: user.id,
        name: data.name.trim(),
        phone: data.phone.trim(),
        photo: data.photo || null,
        jobTitle: data.jobTitle || null,
        company: data.company || null,
        email: data.email || null,
        address: data.address || null,
        mapUrl: data.mapUrl || null,
        website: data.website || null,
        bio: data.bio || null,
        status: data.status || "ACTIVE",
        socialLinks: {
          create: filteredSocials.map((s) => ({
            platform: s.platform,
            url: s.url.trim(),
          })),
        },
        qrCard: {
          create: {
            slug,
            status: "ACTIVE",
            template: data.template || "PROFESSIONAL",
          },
        },
      },
      include: {
        qrCard: true,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/customers");
    return { success: true, customerId: customer.id, slug: customer.qrCard?.slug };
  } catch (err: unknown) {
    console.error("Create customer error:", err);
    return { success: false, error: "Failed to create customer record" };
  }
}

export async function updateCustomer(customerId: string, data: CustomerFormData) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Security: Verify customer belongs to current user
  const existing = await prisma.customer.findFirst({
    where: {
      id: customerId,
      userId: user.id,
    },
  });

  if (!existing) {
    return { success: false, error: "Customer not found or unauthorized" };
  }

  try {
    const filteredSocials = (data.socialLinks || []).filter(
      (link) => link.url && link.url.trim().length > 0
    );

    // Delete existing social links and recreate
    await prisma.socialLink.deleteMany({
      where: { customerId },
    });

    await prisma.customer.update({
      where: { id: customerId },
      data: {
        name: data.name.trim(),
        phone: data.phone.trim(),
        photo: data.photo || null,
        jobTitle: data.jobTitle || null,
        company: data.company || null,
        email: data.email || null,
        address: data.address || null,
        mapUrl: data.mapUrl || null,
        website: data.website || null,
        bio: data.bio || null,
        status: data.status || existing.status,
        qrCard: data.template
          ? {
              update: {
                template: data.template,
              },
            }
          : undefined,
        socialLinks: {
          create: filteredSocials.map((s) => ({
            platform: s.platform,
            url: s.url.trim(),
          })),
        },
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/customers");
    revalidatePath(`/dashboard/customers/${customerId}`);
    return { success: true };
  } catch (err: unknown) {
    console.error("Update customer error:", err);
    return { success: false, error: "Failed to update customer" };
  }
}

export async function toggleCustomerStatus(customerId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const customer = await prisma.customer.findFirst({
    where: { id: customerId, userId: user.id },
    include: { qrCard: true },
  });

  if (!customer) {
    return { success: false, error: "Customer not found" };
  }

  const newStatus = customer.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  await prisma.customer.update({
    where: { id: customerId },
    data: {
      status: newStatus,
      qrCard: customer.qrCard
        ? {
            update: {
              status: newStatus,
            },
          }
        : undefined,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/customers");
  revalidatePath(`/dashboard/customers/${customerId}`);
  return { success: true, newStatus };
}

export async function deleteCustomer(customerId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const customer = await prisma.customer.findFirst({
    where: { id: customerId, userId: user.id },
  });

  if (!customer) {
    return { success: false, error: "Customer not found" };
  }

  await prisma.customer.delete({
    where: { id: customerId },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/customers");
  return { success: true };
}
