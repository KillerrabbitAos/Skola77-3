import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    const userId = session.user.id;

    const group = JSON.parse(req.body);

    const {id} = group;

    if (typeof id !== 'string') {
        return res.status(400).json({error: 'Invalid groups id'});
    }

    try {
        if (!id){
            prisma.group.create({
                data: group
            })
        }
        prisma.group.update({
            where: {id: id, userId: userId},
            data: group
        })
    } catch (error) {
        console.error('Error updating group:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}