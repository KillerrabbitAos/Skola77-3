import type { NextApiRequest, NextApiResponse } from 'next';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import {createGroupForUser} from "@/app/api/helpers/createGroupForUser";
import {getGroupForUser} from "@/app/api/helpers/getGroupForUser";

export async function POST(req: NextApiRequest, res: NextApiResponse){
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const userId = session.user.id;

    const {groupName} = JSON.parse(req.body);

    try {
        const newGroup_id = createGroupForUser(userId, groupName)
        res.status(200).json(newGroup_id)
    } catch (error) {
        res.status(500).json({error: "Failed to create group" + error})
    }
}

export async function GET(req: NextApiRequest, res: NextApiResponse){
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const userId = session.user.id;

    const groupId = req.query.id;

    if (!groupId) return res.status(400).json({error: "Missing required field: groupId"})
    if (typeof groupId !== "string") return res.status(400).json({error: "Invalid groupId"})
    if (groupId.length > 255) return res.status(400).json({error: "groupId too long"})
    try {
        const newGroup_id = getGroupForUser(userId, groupId)
        res.status(200).json(newGroup_id)
    } catch (error) {
        res.status(500).json({error: "Failed to get group" + error})
    }
}