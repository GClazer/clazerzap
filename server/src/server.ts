import { fastify, FastifyInstance, FastifyRequest } from "fastify";
import { userRoutes } from "@/src/routes/users";
import { authRoutes } from "@/src/routes/auth";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import auth from "@fastify/auth";

const server: FastifyInstance = fastify();

server.register(jwt, { secret: process.env.SECRET_JWT_KEY });
server.register(cors, { origin: "*" });
server.register(auth);

server.decorate("check_auth", async (request: FastifyRequest) => await request.jwtVerify());

server.register(authRoutes);
server.register(userRoutes);

server.listen({
  port: 3333,
});
