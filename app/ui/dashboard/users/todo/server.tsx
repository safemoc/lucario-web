'use server'
import {cookies} from "next/headers";
import prisma from "@/lib/prisma";

export async function todosData() {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    if (!token) {
        return null
    }
    todos = await prisma.todos.find({})
}