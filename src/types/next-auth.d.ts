import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string; // add this line to ensure the session user has an 'id' field
        } & DefaultSession["user"];
    }
}
