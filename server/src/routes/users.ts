import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import UserService from "../services/users/UserService";

export const userRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
  const userService = new UserService();

  server.addHook("preHandler", server.check_auth);

  server.get("/users", async () => {
    return await userService.get();
  });

  server.post("/users", async (request: FastifyRequest) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    return await userService.create({
      email,
      password,
    });
  });

  server.put("/users/:id", async (request: FastifyRequest) => {
    const { id, email, password } = request.body as {
      id: number;
      email?: string;
      password?: string;
    };

    return await userService.update({
      id,
      email,
      password,
    });
  });

  server.delete("/users/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
        required: ["id"],
      },
    },
    handler: async (request: FastifyRequest) => {
      const { id } = request.params as { id: number };

      return await userService.delete(id);
    },
  });
};
