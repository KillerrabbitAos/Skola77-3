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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
