import { prisma } from "../config/db.config"
import { Role } from "@prisma/client"
import { RegisterDTO } from "../dtos/register.dto"
import { IAuthRepository } from "../interfaces/IAuthRepository"

export class AuthRepository implements IAuthRepository {
  async findByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    })
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  async createUser(data: RegisterDTO) {
    return prisma.user.create({
      data,
    })
  }

  async updateRefreshToken(id: number, refreshToken: string | null) {
    return prisma.user.update({
      where: { id },
      data: { refreshToken },
    })
  }

  async updateRole(id: number, role: Role) {
    return prisma.user.update({
      where: { id },
      data: { role },
    })
  }
}
