import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export async function createGroupForUser(userId: string, name: string) {
    const group = await prisma.group.create({
        data: {
            name: name,
            userId: userId
        }
    })
    return group?.id
}