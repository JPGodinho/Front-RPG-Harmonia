"use client";
import { Menu, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-harmonia-bg text-white p-6">
      
      <header className="flex flex-col gap-4 mb-10">
        
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <Menu size={28} className="text-harmonia-purple" />
            </button>
            
            <h1 className="text-2xl">
              Olá <strong className="font-bold">Matheus</strong>
            </h1>
          </div>

          <button 
            onClick={() => router.push('/')} 
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
            title="Sair da conta"
          >
            <span className="hidden sm:inline">Sair</span>
            <LogOut size={20} />
          </button>

        </div>
        
        <div className="h-0.5 w-full bg-harmonia-purple shadow-[0_0_10px_#E300FF]" />
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl text-gray-300">Seus agentes</h2>
          <button 
              type="button" 
              className="bg-white text-black font-bold h-10 rounded-lg min-w-fit px-5 hover:bg-gray-200 transition-transform active:scale-95"
              onClick={() => {
                router.push('/criar-agente');
              }}
            >
              Criar Agente
            </button>
        </div>
        <div className="border border-gray-600 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-harmonia-purple transition-colors cursor-pointer bg-[#2A2A2A]">
          
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black overflow-hidden shrink-0">
            <User size={40} />
          </div>

          <div className="flex-1 grid grid-cols-2 gap-y-4 gap-x-8 w-full">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Personagem</span>
              <span className="text-lg font-bold">Bernardo Melo</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Campanha</span>
              <span className="text-lg font-bold uppercase">HARMONIA</span>
            </div>

            <div className="col-span-2 text-sm text-gray-400 mt-1">
              Criado em: <span className="text-gray-200">25 dezembro 2025</span>
            </div>
          </div>

          <button 
            onClick={() => router.push('/ficha')}
            className="bg-harmonia-purple hover:bg-harmonia-purple-glow text-white font-bold py-2 px-6 rounded-lg shadow-[0_0_15px_rgba(227,0,255,0.4)] transition-all active:scale-95 shrink-0"
          >
            Selecionar
          </button>

        </div>
      </section>
    </main>
  );
}