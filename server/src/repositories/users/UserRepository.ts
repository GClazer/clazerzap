import { User } from "@/generated/prisma/index.d";
import { prismaClient } from "@/src/database/prismaClient";

export default class UserRepository {
  async get(): Promise<User[]> {
    return await prismaClient.user.findMany();
  }

  async find(id: number): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: { email },
    });
  }

  async create({ email, password }: { email: string; password: string }): Promise<User> {
    return await prismaClient.user.create({
      data: {
        email,
        password,
      },
    });
  }

  async update({ id, email, password, updated_at }: { id: number; email?: string; password?: string; updated_at: Date }): Promise<User> {
    return await prismaClient.user.update({
      where: { id },
      data: {
        email,
        password,
        updated_at,
      },
    });
  }

  async delete(id: number): Promise<User> {
    return await prismaClient.user.delete({
      where: { id },
    });
  }
}
