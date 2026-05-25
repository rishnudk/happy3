import bcrypt from "bcrypt"
import authRepository from "../repositories/auth.repository"

import {LoginDTO} from "../dtos/login.dto"
import {RegisterDTO} from "../dtos/register.dto"
import {generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/jwt"

class AuthService {
  async register(data: RegisterDTO) {
    const existingUser = await authRepository.findByUsername(data.username)

    if (existingUser) {
      throw new Error("Username already taken")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await authRepository.createUser({
      ...data,
      password: hashedPassword,
    })

    const accessToken = generateAccessToken(user.id.toString())
    const refreshToken = generateRefreshToken(user.id.toString())
    await authRepository.updateRefreshToken(user.id, refreshToken)

    return { user, accessToken, refreshToken }
  }

  async login(data: LoginDTO) {
    const user = await authRepository.findByUsername(data.username)

    if (!user) {
      throw new Error("Invalid credentials")
    }

    const isMatch = await bcrypt.compare(data.password, user.password)

    if (!isMatch) {
      throw new Error("Invalid credentials")
    }

    const accessToken = generateAccessToken(user.id.toString())
    const refreshToken = generateRefreshToken(user.id.toString())
    await authRepository.updateRefreshToken(user.id, refreshToken)

    return { user, accessToken, refreshToken }
  }

  async refresh(token: string) {
    if (!token) throw new Error("No refresh token provided")

    const decoded = verifyRefreshToken(token)
    const user = await authRepository.findById(parseInt(decoded.id))

    if (!user || user.refreshToken !== token) {
      throw new Error("Invalid refresh token")
    }

    const newAccessToken = generateAccessToken(user.id.toString())
    const newRefreshToken = generateRefreshToken(user.id.toString())
    await authRepository.updateRefreshToken(user.id, newRefreshToken)

    return { user, accessToken: newAccessToken, refreshToken: newRefreshToken }
  }

  async logout(userId: number) {
    await authRepository.updateRefreshToken(userId, null)
  }
}

export default new AuthService()
