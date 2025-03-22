import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function getGroups(userId: string): Promise<Array<object> | null> {
    try {
        const groups = await prisma.group.findMany({
            where: {userId: userId},
        });

        return groups as Array<object> || null
    } catch (error) {
        console.error('Error retrieving user theme:', error);
        return null;
    }
}