import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    const userId = session.user.id;
    const {group} = JSON.parse(req.body);
    const {id} = req.query;

    if (id && typeof id !== 'string') {
        return res.status(400).json({error: 'Invalid group id'});
    }

    if (group && typeof group !== 'string') {
        return res.status(400).json({error: 'Invalid group'});
    }


    try {
        prisma.group.delete({
            where: {userId: userId, id: id || group?.id}
        })
    } catch (error) {
        console.error('Error deleting group:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}