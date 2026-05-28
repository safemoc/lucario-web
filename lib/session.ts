import 'server-only';
import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)
export type SessionPayload = {
    userId: string,
    role?: string,
    email: string,
}

export async function createSession(payload: SessionPayload) {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 60 * 24 * 7)
}

export async function getSession(): Promise<SessionPayload | null> {
    const token = (await cookies()).get('session')?.value
    if (!token) return null
    try {
        const {payload} = await jwtVerify(token, secret, {algorithms: ['HS256']})
        return payload as SessionPayload

    } catch {
        return null
    }
}


export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}