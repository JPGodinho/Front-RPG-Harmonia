import { DashboardHeader } from "./components/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-harmonia-bg text-white p-4 md:p-8">
      <DashboardHeader />
      <main>{children}</main>
    </div>
  );
}