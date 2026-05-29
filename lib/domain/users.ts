import prisma from "@/lib/prisma";

type User = {
    name: string;
    email: string;
    password: string;
}

export function registerUser({name, email, password}: User) {
    return prisma.user.create({
        data: {
            username: name,
            password: password,
            real_name: "Lyke",
            email: email,
            avatar: "https://github.com/lyke-dev.png",
        },
    });
}