import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";
import { config } from "dotenv";


const EnvSchema = z.object({
    NODE_ENV: z.string().default("development"),
    BETTER_AUTH_URL: z.string().url().default("http://localhost:9000")
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
    EnvSchema.parse(process.env);
} catch (error) {
    if (error instanceof ZodError) {
        let message = "Missing required values in .env:\n";
        error.issues.forEach((issue) => {
            message += issue.path[0] + "\n";
        });
        const e = new Error(message);
        e.stack = "";
        throw e;
    } else {
        console.error(error);
    }
}

export default EnvSchema.parse(process.env);