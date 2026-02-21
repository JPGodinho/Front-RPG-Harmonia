import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatarDataFirestore(timestamp: { seconds: number; nanos: number }) {
  if (!timestamp || !timestamp.seconds) return "Data desconhecida";
  
  // Multiplica por 1000 pois JS usa milissegundos
  const date = new Date(timestamp.seconds * 1000);
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}