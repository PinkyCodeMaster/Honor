import { Resend } from "resend";
import env from "@/env";

const resend = new Resend(env.RESEND_API_KEY);


type SendEmailParams = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: SendEmailParams) {
 
  try {
    const response = await resend.emails.send({
      from: env.RESEND_FROM,
      to,
      subject,
      text,
    });

    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
