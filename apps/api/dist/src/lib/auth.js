import { username, admin, openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { sendEmail } from "./resend.js";
import Stripe from "stripe";
import env from "../env.js";
import db from "../db/index.js";
const origin = "http://localhost:3000";
const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2025-05-28.basil", maxNetworkRetries: 3 });
const allowedOrigins = env.ORIGIN_CORS.split(",").map(origin => origin.trim());
export const auth = betterAuth({
    trustedOrigins: (request) => {
        const origin = request.headers.get("origin");
        if (!origin)
            return [];
        return allowedOrigins.includes(origin) ? [origin] : [];
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: [
                "google",
                "microsoft",
                "facebook",
                "discord",
                "email-password",
                "twitter",
                "apple",
            ],
            allowDifferentEmails: true,
        },
    },
    database: drizzleAdapter(db, {
        provider: "sqlite",
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, token }) => {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click to reset: ${origin}/reset-password?token=${token}`,
            });
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        requireEmailVerification: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            await sendEmail({
                to: user.email,
                subject: "Verify your email",
                text: `Verify your account: ${origin}/verify-email?token=${token}`,
            });
        },
    },
    rateLimit: {
        enabled: true,
        window: 10,
        max: 100,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },
    user: {
        deleteUser: {
            enabled: true,
            sendDeleteAccountVerification: async ({ user, token }) => {
                await sendEmail({
                    to: user.email,
                    subject: "Verify account deletion",
                    text: `Click to confirm: ${origin}/delete-account?token=${token}`,
                });
            },
        },
    },
    plugins: [
        nextCookies(),
        openAPI(),
        username(),
        admin({
            adminUserIds: ['1D3dFHRdkgiCL5BmUkQ1AVhlvf1aJg8j',]
        }),
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
            createCustomerOnSignUp: true,
            onCustomerCreate: async ({ customer, stripeCustomer, user }) => {
                console.log(`Created Stripe customer ${stripeCustomer.id} for user ${user.id}`);
            },
            subscription: {
                enabled: true,
                plans: [
                    {
                        name: "starter",
                        priceId: "price_starter_123",
                        annualDiscountPriceId: "price_starter_annual_123",
                        group: "individual",
                        limits: {
                            products: 10,
                        },
                    },
                    {
                        name: "pro",
                        priceId: "price_pro_456",
                        annualDiscountPriceId: "price_pro_annual_456",
                        group: "individual",
                        limits: {
                            products: 25,
                        },
                    },
                    {
                        name: "business",
                        priceId: "price_business_789",
                        annualDiscountPriceId: "price_business_annual_789",
                        group: "professional",
                        limits: {
                            products: -1,
                        },
                    },
                ],
            },
        }),
    ],
});
