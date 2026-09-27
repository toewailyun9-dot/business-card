import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CustomersClientView } from "@/components/customers/customers-client-view";

export const metadata = {
  title: "Customers Directory | QR Business Card Platform",
};

export default async function CustomersPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const customers = await prisma.customer.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      qrCard: {
        include: {
          scans: {
            select: { id: true },
          },
        },
      },
    },
  });

  return <CustomersClientView initialCustomers={customers} />;
}
