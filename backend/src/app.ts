import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.route"

const app = express()
console.log("CORS:", process.env.CORS_ORIGINS)
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : []

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("CORS policy: This origin is not allowed"), false)
      }
    },
    credentials: true,
  }),
)

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth", authRouter)

export default app
