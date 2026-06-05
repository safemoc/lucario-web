'use server'
import {getCurrentUser} from "@/lib/auth";
import prisma from "@/lib/prisma";
import {Priority, TodoStatus} from '@/lib/generated/prisma/client';
import {Todos} from "@/lib/generated/prisma/client";
import {revalidatePath} from "next/cache";


type TodoProps = {
    title: string,
    description: string,
    priority: Priority,
    due_at?: Date
    status: TodoStatus,
}

export async function addTodo({title, description, priority, due_at}: TodoProps) {
    const user = await getCurrentUser();


    const todo = await prisma.todos.create({
        data: {
            user_id: user!.id,
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

export async function addTodoAction(formData: FormData) {
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || "";
    const priority = (formData.get("priority") as Priority) || Priority.MEDIUM;

    await addTodo({
        title,
        description,
        priority,
        status: TodoStatus.PENDING,
    });

    revalidatePath("/dashboard/user");
}


export async function delTodo(todoId: Todos["id"]) {
    const user = await getCurrentUser();
    if (
        !await prisma.todos.findFirst({
            where: {
                user_id: user!.id,
                id: todoId
            }
        })) {
        return prisma.todos.update({
                where: {
                    id: todoId
                }, data: {is_deleted: true}
            }
        );
    } else {
        return null
    }

}


export async function updateTodo(todoId: Todos["id"], {title, description, priority, due_at, status}: TodoProps) {
    const user = await getCurrentUser();
    if (!await prisma.todos.findFirst({where: {user_id: user!.id}})) {
        return prisma.todos.update({where: {id: todoId}, data: {title, description, priority, due_at, status}})
    } else {
        return null
    }
}


export async function allTodo() {
    const user = await getCurrentUser();
    return prisma.todos.findMany({where: {user_id: user!.id, status: TodoStatus.PENDING}})
}