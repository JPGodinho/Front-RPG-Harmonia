import { getUserProperties } from "./actions";
import PerfilMain from "./components/PerfilMain"

export default async function PerfilPage({}) {
    const user = await getUserProperties();

    return (
        <div className="md:flex md:flex-col md:items-center w-full">
            <PerfilMain user={user} />
        </div>
    )
}
