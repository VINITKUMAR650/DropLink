import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma




<<<<<<< HEAD



=======
>>>>>>> 5bf4f332082fa7a0c2c3c4d5e340d6a1a6169b51
