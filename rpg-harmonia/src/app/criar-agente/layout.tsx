 import { SidebarTrigger } from "@/components/ui/sidebar";
 import { HeaderRoot } from "@/components/header/HeaderRoot";
 import { HeaderBackButton } from "@/components/header/HeaderButtons";

 export default function CriarAgenteLayout({ children }: { children: React.ReactNode }) {
   return (
     <>
       <HeaderRoot
         left={<SidebarTrigger className="-ml-1" />}
         right={<HeaderBackButton />}
       >
         <span className="text-xl font-normal text-white">Novo Agente</span>
       </HeaderRoot>
       <div className="h-px w-full bg-harmonia-purple shadow-[0_0_8px_#E300FF] mb-6" />
       <main className="pb-20">{children}</main>
     </>
   );
 }