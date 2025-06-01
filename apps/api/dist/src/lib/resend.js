import { Resend } from "resend";
import env from "../env.js";
const resend = new Resend(env.RESEND_API_KEY);
export async function sendEmail({ to, subject, text }) {
    try {
        const response = await resend.emails.send({
            from: env.RESEND_FROM,
            to,
            subject,
            text,
        });
        return response;
    }
    catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
}
