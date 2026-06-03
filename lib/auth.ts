import {SignJWT, jwtVerify} from "jose";

const secret = new TextEncoder().encode(process.env.SECRET);


type user = {
    id: string;
    email: string;

}

export async function createToken(user: user) {
    return await new SignJWT(user).setProtectedHeader({
        alg: 'HS256',
    }).setIssuedAt().setExpirationTime("7d").sign(secret);
}

export async function verifyToken(token: string) {
    const {payload} = await jwtVerify(token, secret);

    return payload;
}