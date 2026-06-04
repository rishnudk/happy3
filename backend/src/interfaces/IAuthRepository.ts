import { RegisterDTO } from "../dtos/register.dto";
import { User, Role } from "@prisma/client";

export interface IAuthRepository {
  findByUsername(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  createUser(data: RegisterDTO & { password?: string }): Promise<User>;
  updateRefreshToken(id: number, refreshToken: string | null): Promise<User>;
  updateRole(id: number, role: Role): Promise<User>;
}
