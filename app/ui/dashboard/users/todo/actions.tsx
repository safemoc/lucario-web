'use server'
import {getCurrentUser} from "@/lib/auth";
import prisma from "@/lib/prisma";
import {Priority} from '@/lib/generated/prisma/client';   // ← 关键在这里导入
type props = {
    title: string,
    description: string,
    priority: Priority,
    due_at?: Date
}

async function addTodo({title, description, priority, due_at}: props) {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized')
    }
    const todo = await prisma.todos.create({
        data: {
            user_id: user.id,
            title,
            description,
            priority,
            due_at
        }
    })

    if (!todo) {
        return null
    }

    return todo
}