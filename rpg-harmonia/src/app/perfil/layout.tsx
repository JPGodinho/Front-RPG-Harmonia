import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar';
import { HeaderRoot } from '@/components/header/HeaderRoot';

export default async function PerfilLayout({ children } :  Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <>
        <HeaderRoot left={<SidebarTrigger className="-ml-1" />}>
            <h1>Seu Perfil</h1>
        </HeaderRoot>
        <main>{children}</main>
        </>
    )
}
