import { NextAuthOptions, User, DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        role?: string;
    }
    interface Session {
        user: {
            id: string;
            role?: string;
        } & DefaultSession["user"];
    }
}
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    debug: true,
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Login",
            credentials: {
                email: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("No credentials provided");
                }

                const { email, password } = credentials;

                if (!password || !email) {
                    throw new Error("Please enter your email and password");
                }

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (user && user.password === password) {
                    return { id: user.id, name: user.name, email: user.email, role: user.role ?? undefined };
                }

                throw new Error("Invalid username or password");
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {

            if (account && account.provider === "google") {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email ?? undefined },
                });

                console.log("DB User:", dbUser);

                if (dbUser) {
                    token.role = user.role ?? null;
                }

                if (dbUser) {
                    token.id = dbUser.id;
                    token.role = dbUser.role; 
                }
            }

            if (account && user) {
                token.id = user.id ?? account.providerAccountId;
                token.email = user.email;
                token.role = user.role;
            }

            return token;
        },
        async session({ session, token }) {

            if (!token || !token.id) {
                console.error("Token is missing in session callback!");
                return session;
            }

            session.user.id = String(token.id);
            session.user.role = token.role as string | undefined;

            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
};