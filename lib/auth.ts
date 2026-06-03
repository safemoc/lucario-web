import {SignJWT, jwtVerify} from "jose";

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
