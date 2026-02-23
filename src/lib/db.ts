import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const config = {
  url: (process.env.TURSO_DATABASE_URL || "file:local.db").trim(),
  authToken: process.env.TURSO_AUTH_TOKEN?.trim(),
}

const adapter = new PrismaLibSql(config)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
