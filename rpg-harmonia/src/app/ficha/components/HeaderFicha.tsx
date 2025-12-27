"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, LogOut } from "lucide-react";

export function HeaderFicha() {
  const router = useRouter();

  const handleLogout = () => {
    // A mesma lógica de logout
    document.cookie = "auth_token=; path=/; max-age=0";
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("idUsuario");
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between mb-6 pt-2">
      
      {/* Botão Voltar (Vai para o Dashboard) */}
      <Link 
        href="/dashboard"
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-gray-800 flex items-center justify-center group-hover:border-gray-600 transition-colors">
          <ChevronLeft size={18} />
        </div>
        <span className="text-sm font-bold uppercase tracking-wider hidden md:inline">Voltar ao Painel</span>
      </Link>

      {/* Botão Sair */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group"
        title="Desconectar"
      >
        <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">Sair</span>
        <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-gray-800 flex items-center justify-center group-hover:border-red-900 group-hover:bg-red-900/10 transition-colors">
          <LogOut size={16} />
        </div>
      </button>

    </header>
  );
}