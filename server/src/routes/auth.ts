import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import LoginService from "@/src/services/auth/LoginService";

export const authRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
  const loginService = new LoginService(server.jwt);

  server.post("/login", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const { email, password } = request.body as { email: string; password: string };

    const token = await loginService.authenticate(email, password);

    reply.send({ token });
  });
};
