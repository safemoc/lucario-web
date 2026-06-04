import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import prisma from "@/lib/prisma";

const secret = new TextEncoder().encode(process.env.SECRET);


type UserPayload = {
    id: string;
    email: string;

}

export async function createToken(user: UserPayload) {
    return await new SignJWT(user).setProtectedHeader({
        alg: 'HS256',
    }).setIssuedAt().setExpirationTime("7d").sign(secret);
}

export async function verifyToken(token: string): Promise<UserPayload> {
    const {payload} = await jwtVerify<UserPayload>(token, secret);
    return payload;
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        return null;
    }
    const user = await verifyToken(token);
    return prisma.user.findUnique({where: {id: user.id}});
}