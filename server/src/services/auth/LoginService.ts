import bcrypt from "bcrypt";
import UserService from "../users/UserService";
import { JWT } from "@fastify/jwt";

const userService = new UserService();

export default class LoginService {
  constructor(private readonly jwt: JWT) {}

  async authenticate(email: string, password: string): Promise<string | null> {
    const user = await userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    return this.jwt.sign({ user_id: user.id });
  }
}
