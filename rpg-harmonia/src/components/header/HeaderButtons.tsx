"use client";
import { Menu, LogOut, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import router from "next/dist/shared/lib/router/router";

export function HeaderBackButton() {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.back()} 
      className="hover:bg-white/10 p-2 rounded-full transition-colors text-harmonia-purple"
      title="Voltar"
    >
      <ChevronLeft size={28} /> 
    </button>
  );
}

export function HeaderMenuButton({ onClick }: { onClick?: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className="hover:bg-white/10 p-2 rounded-full transition-colors text-harmonia-purple"
      title="Abrir Menu"
    >
      <Menu size={28} />
    </button>
  );
}


export function HeaderLogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    // A mesma lógica de logout
    document.cookie = "auth_token=; path=/; max-age=0";
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("idUsuario");
    router.push("/login");
  };
  return (
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
  );
}