import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import LoginService from "@/src/services/auth/LoginService";

export const authRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
  const loginService = new LoginService(server.jwt);

  server.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as { email: string; password: string };

    const token = await loginService.authenticate(email, password);

    reply.setCookie("token", token, {
      httpOnly: true,
      maxAge: 3600, // 1 hour
      sameSite: "lax",
      path: "/",
    });

    reply.send({ token });
  });

  server.post("/logout", { preHandler: [server.check_auth] }, async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    reply.clearCookie("token");

    reply.send({ message: "Logged out successfully" });
  });
};
