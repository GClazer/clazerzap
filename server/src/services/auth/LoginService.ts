import bcrypt from "bcrypt";
import UserService from "../users/UserService";
import { JWT } from "@fastify/jwt";
import { UnauthorizedError } from "@/src/errors/UnauthorizedError";

const userService = new UserService();

export default class LoginService {
  constructor(private readonly jwt: JWT) {}

  async authenticate(email: string, password: string): Promise<string | null> {
    const user = await userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError("Invalid credentials");
    }

    return this.jwt.sign({ user_id: user.id });
  }
}
