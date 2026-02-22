import { HeaderFicha } from "./components/HeaderFicha";

export default function FichaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <HeaderFicha />
      <main className="mt-4">
        {children}
      </main>
    </div>
  );
}