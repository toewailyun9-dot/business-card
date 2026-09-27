import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PublicCardView } from "@/components/public-card/public-card-view";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const qrCard = await prisma.qrCard.findUnique({
    where: { slug },
    include: {
      customer: true,
    },
  });

  if (!qrCard || !qrCard.customer) {
    return {
      title: "Digital Business Card Not Found",
    };
  }

  const { customer } = qrCard;
  const title = `${customer.name} | ${customer.jobTitle || customer.company || "Digital Business Card"}`;
  const description =
    customer.bio ||
    `Digital Business Card for ${customer.name}${customer.company ? ` at ${customer.company}` : ""}. Scan or save contact directly.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
  };
}

export default async function PublicCardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const qrCard = await prisma.qrCard.findUnique({
    where: { slug },
    include: {
      customer: {
        include: {
          socialLinks: true,
        },
      },
    },
  });

  if (!qrCard || !qrCard.customer) {
    notFound();
  }

  // Record scan in background (analytics)
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "unknown";
    
    // Don't block page render if DB scan log fails
    await prisma.scan.create({
      data: {
        qrCardId: qrCard.id,
        userAgent: userAgent.slice(0, 255),
      },
    });
  } catch (err) {
    console.error("Scan logging error:", err);
  }

  return <PublicCardView qrCard={qrCard} customer={qrCard.customer} />;
}
