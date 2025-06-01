import categories from "./routes/categories/categories.index.js";
import configureOpenAPI from "./lib/configure-open-api.js";
import tasks from "./routes/tasks/tasks.index.js";
import createApp from "./lib/create-app.js";
import index from "./routes/index.route.js";
import { auth } from "./lib/auth.js";
import { cors } from "hono/cors";
import env from "./env.js";
const app = createApp();
const allowedOrigins = env.ORIGIN_CORS.split(",").map(origin => origin.trim());
app.use("*", cors({
    origin: (origin, _c) => {
        if (!origin)
            return null;
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
];
routes.forEach((route) => {
    app.route("/", route);
});
export default app;
