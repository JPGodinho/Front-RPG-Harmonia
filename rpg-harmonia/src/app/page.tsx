import { redirect } from "next/navigation";

export default function RootPage() {
  // Assim que acessar a raiz "/", redireciona para o painel
  redirect("/dashboard");
}