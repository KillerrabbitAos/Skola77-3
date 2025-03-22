import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function upsertUserTheme(userId: string, theme: string): Promise<boolean> {
    try {
        await prisma.userPreference.upsert({
            where: { userId: userId },
            update: { theme: theme },
            create: { userId: userId, theme: theme },
        });
        return true;
    } catch (error) {
        console.error('Error updating user theme:', error);
        return false;
    }
}

async function getUserTheme(userId: string): Promise<string | null> {
    try {
        const userPreference = await prisma.userPreference.findUnique({
            where: {userId: userId},
            select: {theme: true},
        });

        return userPreference?.theme || null;
    } catch (error) {
        console.error('Error retrieving user theme:', error);
        return null;
    }
}

export {upsertUserTheme, getUserTheme};