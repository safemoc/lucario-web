import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        }
    );
    if (user?.password === body.password) {
        return NextResponse.json(user
        )
    }

}