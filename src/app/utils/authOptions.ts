import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    debug: true,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Custom Login",
            credentials: {
                email: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("No credentials provided");
                }

                const { email, password } = credentials;

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (user && user.password === password) {
                    return { id: user.id, name: user.name, email: user.email };
                }

                throw new Error("Invalid username or password");
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            console.log("JWT callback BEFORE:", { token, user, account });

            if (account && user) {
                token.id = user.id ?? account.providerAccountId;
                token.email = user.email;
            }

            console.log("JWT callback AFTER:", token);
            return token;
        },
        async session({ session, token }) {
            console.log("Session callback BEFORE:", { session, token });

            if (!token || !token.id) {
                console.error("Token is missing in session callback!");
                return session;
            }

            session.user.id = String(token.id);

            console.log("Session callback AFTER:", session);
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
};