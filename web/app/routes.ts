import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/profile/:id", "routes/profile.tsx"),
  route("/login", "routes/auth/login.tsx"),
] satisfies RouteConfig;
