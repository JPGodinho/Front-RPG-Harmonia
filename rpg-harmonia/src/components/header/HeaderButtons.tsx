"use client";
import { Menu, LogOut, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  return (
    <Link 
      href="/" 
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
      title="Sair da conta"
    >
      <span className="hidden sm:inline">Sair</span>
      <LogOut size={20} />
    </Link>
  );
}