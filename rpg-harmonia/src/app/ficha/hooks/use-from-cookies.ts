'use server'
import { cookies } from "next/headers";

export const getUserType = async () => {
    const cookieStore = await cookies();
    const userType = cookieStore.get('user_type')?.value;

    return userType;
}