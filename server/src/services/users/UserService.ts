import { User } from "@/generated/prisma";
import UserRepository from "@/src/repositories/users/UserRepository";
import bcrypt from "bcrypt";

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async get(): Promise<User[]> {
    return await this.userRepository.get();
  }

  async find(id: number): Promise<User | null> {
    return await this.userRepository.find(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async create({ email, password }: { email: string; password: string }): Promise<User> {
    password = await bcrypt.hash(password, 10);

    return await this.userRepository.create({ email, password });
  }

  async update({ id, email, password }: { id: number; email?: string; password?: string }): Promise<User> {
    const data = {
      id,
      updated_at: new Date(),
    };

    if (email) {
      data["email"] = email;
    }

    if (password) {
      data["password"] = await bcrypt.hash(password, 10);
    }

    return await this.userRepository.update({
      ...data,
    });
  }

  async delete(id: number): Promise<User> {
    return await this.userRepository.delete(id);
  }
}
