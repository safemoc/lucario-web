import {PrismaClient} from "./generated/prisma/client"
import {PrismaPg} from "@prisma/adapter-pg";
import {env} from "prisma/config";
import {Pool} from "pg";


const DATABASE_URL =
    `postgresql://` +
    `${env("DB_USER")}:` +
    `${env("DB_PASSWORD")}@` +
    `${env("DB_HOST")}:` +
    `${env("DB_PORT")}/` +
    `${env("DB_NAME")}`;

const pool = new Pool({
    connectionString: DATABASE_URL,
    max: Number(env("DB_MAX_CONNECT")),
    min: Number(env("DB_MIN_CONNECT")),
})


const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({adapter})
export default prisma