'use client'
import { useEffect, useState } from "react";
import { getUserProperties } from "./actions";
import PerfilMain from "./components/PerfilMain"
import { UserType } from "@/lib/types";

export default function PerfilPage({}) {
    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        const buscarDadosUsuario = async () => {
            const user = await getUserProperties();
            if (user) setUser(user);
        }
        buscarDadosUsuario();
    },[])

    return (
        <div className="md:flex md:flex-col md:items-center w-full">
            <PerfilMain user={user} />
        </div>
    )
}
