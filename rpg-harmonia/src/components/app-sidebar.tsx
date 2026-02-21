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
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "teste m",
    email: "",
    avatar: ""
  }, 
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

export function AppSidebar({...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
