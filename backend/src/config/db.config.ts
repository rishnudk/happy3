import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logger"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const connectDB = async () => {
  try {
    await prisma.$connect()
    logger.info("Connected to PostgreSQL with Prisma")
  } catch (error) {
    logger.error(error, "Database connection error:")
    process.exit(1)
  }
}

export { prisma, connectDB }
