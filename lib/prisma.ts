import {PrismaClient} from "./generated/prisma/client"
import {PrismaPg} from "@prisma/adapter-pg";
import {env} from "prisma/config";



const DATABASE_URL =
    `postgresql://` +
    `${env("DB_USER")}:` +
    `${env("DB_PASSWORD")}@` +
    `${env("DB_HOST")}:` +
    `${env("DB_PORT")}/` +
    `${env("DB_NAME")}`;
// 创建连接池（推荐）
// const pool = new Pool({
//     connectionString: (DATABASE_URL)!,
//     max: 10,
//     idleTimeoutMillis: 30000,
// })


const adapter = new PrismaPg(DATABASE_URL);

const prisma = new PrismaClient({adapter})
export default prisma