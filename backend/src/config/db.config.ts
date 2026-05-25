import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

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
    console.log("Connected to PostgreSQL with Prisma")
  } catch (error) {
    console.error("Database connection error:", error)
    process.exit(1)
  }
}

export { prisma, connectDB }
