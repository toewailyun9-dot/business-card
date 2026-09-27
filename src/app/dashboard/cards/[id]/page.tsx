import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QrCardStudio } from "@/components/qr-card/qr-card-studio";

export const metadata = {
  title: "QR Code Studio | QR Business Card Platform",
};

export default async function CardStudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) return null;

  const { id } = await params;

  const qrCard = await prisma.qrCard.findUnique({
    where: { id },
    include: {
      customer: {
        select: {
          id: true,
          userId: true,
          name: true,
          jobTitle: true,
          company: true,
          phone: true,
          email: true,
        },
      },
    },
  });

  if (!qrCard || qrCard.customer.userId !== user.id) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return <QrCardStudio card={qrCard} baseUrl={baseUrl} />;
}
