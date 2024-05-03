// prisma.js or db.js
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    // Ensure only one Prisma instance in dev
    // @ts-ignore
    if (!global.prisma) {
        // @ts-ignore
        global.prisma = new PrismaClient()
    }
    // @ts-ignore
    prisma = global.prisma
}

export default prisma
