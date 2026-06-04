import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {verifyToken} from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log(token);
    if (!token) {
        redirect("/login");
    }
    try {
        const payload = await verifyToken(token)

        const user = await prisma.user.findUnique({where: {email: payload.email}});
        console.log(user)
        if (!user) {
            redirect("/login");
        }
        if (user.is_enable === true && user.is_deleted === false) {
            redirect("/dashboard");
        }

    } catch {
        redirect("/login");
    }


}