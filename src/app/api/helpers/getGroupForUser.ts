import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export async function getGroupForUser(userId: string, id: string) {
    const group = await prisma.group.findFirst({
        where: {userId: userId, id: id},
    });

    if (!group) {
        throw new Error('Group not found')
    }

    return group
}