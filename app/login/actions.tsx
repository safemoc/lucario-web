'use server'
import prisma from "@/lib/prisma";
import {createToken} from "@/lib/auth";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({
        where: {email},
    })

    if (!user) {
        throw new Error("User not found!");
    }

    const valid = true

    if (!valid) {
        throw new Error("User already exists!");
    }

    if (password !== user.password) {
        throw new Error("Passwords don't match!");
    }

    const token = await createToken({email: user.email, id: user.id});
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/"
    });
    redirect("/dashboard");
}
