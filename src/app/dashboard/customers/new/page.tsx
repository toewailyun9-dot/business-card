import { CustomerForm } from "@/components/customers/customer-form";

export const metadata = {
  title: "New Customer Card | QR Business Card Platform",
};

export default function NewCustomerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Create New Customer</h1>
        <p className="text-xs text-[#64748B] mt-1">
          Add a new customer profile and immediately generate an exclusive dynamic QR business card
        </p>
      </div>
      <CustomerForm />
    </div>
  );
}
