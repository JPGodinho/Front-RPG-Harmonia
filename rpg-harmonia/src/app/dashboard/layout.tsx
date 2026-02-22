import { DashboardHeader } from "./components/DashboardHeader";
import { getUsernameFromCookies } from "@/hooks/use-getUsername";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const nomeUsuario = await getUsernameFromCookies();

  return (
    <>
      <DashboardHeader nomeUsuario={nomeUsuario} />
      <main>{children}</main>
    </>
      
  );
}