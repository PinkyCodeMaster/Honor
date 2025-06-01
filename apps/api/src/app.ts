import categories from "@/routes/categories/categories.index";
import configureOpenAPI from "@/lib/configure-open-api";
import tasks from "@/routes/tasks/tasks.index";
import createApp from "@/lib/create-app";
import index from "@/routes/index.route";
import { auth } from "@/lib/auth";
import { cors } from "hono/cors";
import env from "./env";

const app = createApp();

const allowedOrigins = env.ORIGIN_CORS.split(",").map(origin => origin.trim());

app.use("*", cors({
  origin: (origin: string | undefined, _c) => {
    if (!origin) return null;
    return allowedOrigins.includes(origin) ? origin : null;
  },
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
}));

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));
configureOpenAPI(app);

const routes = [
  index,
  tasks,
  categories
] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
