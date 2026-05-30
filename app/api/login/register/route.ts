import {NextRequest, NextResponse} from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {

    const body = await req.json()

    const user = await prisma.user.create({
        data: {
            username: body.username,
            password: body.password,
            real_name: body.real_name,
            email: body.email,
            avatar: "https://github.com/lyke-dev.png",
        },
    })

    return NextResponse.json(user)
}