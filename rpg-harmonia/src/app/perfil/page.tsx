import { getUserProperties } from "./actions";
import PerfilMain from "./components/PerfilMain"

export default async function PerfilPage({}) {
    const user = await getUserProperties();

    return (
        <PerfilMain user={user} />
    )
}
