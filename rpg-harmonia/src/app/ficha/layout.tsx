import { HeaderFicha } from "./components/HeaderFicha";

export default function FichaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-harmonia-bg text-white">
      
      <div className="max-w-4xl mx-auto p-4 md:px-8">
        
        <HeaderFicha />
        
        <main className="mt-4">
          {children}
        </main>

      </div>
    </div>
  );
}