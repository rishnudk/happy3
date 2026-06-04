import bcrypt from "bcrypt"
import { IAuthRepository } from "../interfaces/IAuthRepository"
import { ConflictError, UnauthorizedError, AppError } from "../utils/errors"
import { LoginDTO } from "../dtos/login.dto"
import { RegisterDTO } from "../dtos/register.dto"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt"

export class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async register(data: RegisterDTO) {
    const existingUser = await this.authRepository.findByUsername(data.username)

    if (existingUser) {
      throw new ConflictError("Username already taken")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
    })

    const accessToken = generateAccessToken(user.id.toString())
    const refreshToken = generateRefreshToken(user.id.toString())
    await this.authRepository.updateRefreshToken(user.id, refreshToken)

    return { user, accessToken, refreshToken }
  }

  async login(data: LoginDTO) {
    const user = await this.authRepository.findByUsername(data.username)

    if (!user) {
      throw new UnauthorizedError("Invalid credentials")
    }

    const isMatch = await bcrypt.compare(data.password, user.password)

    if (!isMatch) {
      throw new UnauthorizedError("Invalid credentials")
    }

    const accessToken = generateAccessToken(user.id.toString())
    const refreshToken = generateRefreshToken(user.id.toString())
    await this.authRepository.updateRefreshToken(user.id, refreshToken)

    return { user, accessToken, refreshToken }
  }

  async refresh(token: string) {
    if (!token) throw new UnauthorizedError("No refresh token provided")

    const decoded = verifyRefreshToken(token)
    const user = await this.authRepository.findById(parseInt(decoded.id))

    if (!user || user.refreshToken !== token) {
      throw new UnauthorizedError("Invalid refresh token")
    }

    const newAccessToken = generateAccessToken(user.id.toString())
    const newRefreshToken = generateRefreshToken(user.id.toString())
    await this.authRepository.updateRefreshToken(user.id, newRefreshToken)

    return { user, accessToken: newAccessToken, refreshToken: newRefreshToken }
  }

  async logout(userId: number) {
    await this.authRepository.updateRefreshToken(userId, null)
  }
}

