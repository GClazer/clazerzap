import "dotenv/config";

import { fastify, FastifyInstance, FastifyRequest } from "fastify";
import { userRoutes } from "@/src/routes/users";
import { authRoutes } from "@/src/routes/auth";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import auth from "@fastify/auth";
import cookie from "@fastify/cookie";
import csrf from "@fastify/csrf-protection";

const server: FastifyInstance = fastify();

server.register(jwt, {
  secret: process.env.SECRET_JWT_KEY,
  cookie: { cookieName: "token" },
});

server.register(cors, {
  origin: "http://127.0.0.1:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

server.register(cookie, { secret: process.env.SECRET_COOKIE_KEY });

server.register(csrf, { cookieOpts: { signed: true } });

server.register(auth);

server.decorate("check_auth", async (request: FastifyRequest) => await request.jwtVerify());

server.register(authRoutes);
server.register(userRoutes);

server.listen({ port: 3333 });
