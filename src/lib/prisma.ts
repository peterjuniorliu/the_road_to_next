import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env["DATABASE_URL"];
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaPool?: Pool;
};

const prisma = connectionString
  ? (() => {
      const pool =
        globalForPrisma.prismaPool ?? new Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      const client = globalForPrisma.prisma ?? new PrismaClient({ adapter });

      if (process.env.NODE_ENV !== "production") {
        globalForPrisma.prisma = client;
        globalForPrisma.prismaPool = pool;
      }

      return client;
    })()
  : (new Proxy(
      {},
      {
        get() {
          throw new Error("DATABASE_URL is not set");
        },
      }
    ) as PrismaClient);

export default prisma;