'use server'
import {cookies} from "next/headers";
import prisma from "@/lib/prisma";
import {verifyToken} from "@/lib/auth";

export async function todoList() {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    if (!token) {
        return null
    }


    const user = await verifyToken(token);

    const todos = await prisma.todos.findMany({where: {user_id: user.id}});

    return (
        <>
            ${
            todos.map((todo) => {
                    <div>{}</div>
                }
            )
        }
        </>
    )
}