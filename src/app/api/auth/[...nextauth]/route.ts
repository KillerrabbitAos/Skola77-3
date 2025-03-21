import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
    ],
    callbacks: {
        async session({ session, token }) {
            console.log("Session callback:", { session, token });

            if (session.user) {
                if (typeof token?.id === "string") {
                    session.user.id = token.id;
                } else {
                    console.error("Token id is not a string or is undefined.");
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            console.log("JWT callback:", { token, user });

            if (user) {
                token.id = user.id;
            } else {
                console.error("User id is not a string or is undefined.");
            }

            return token;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };