"use client"

import * as React from "react"
import {
  FormIcon,
  List,
  MapIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = { 
  navMain: [
    {
      title: "Ações",
      url: "#",
      icon: List,
      isActive: true,
      items: [
        {
          title: "Lista de agentes",
          url: "/dashboard",
          icon: FormIcon,
        },
        {
          title: "Minhas Campanhas",
          url: "#",
          icon: MapIcon,
        }
      ],
    },
  ]
}

export function AppSidebar({
  username,
  ...props
}: React.ComponentProps<typeof Sidebar> & { username: string }) {

  const user = {
    name: username,
    email: "",
    avatar: "",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
