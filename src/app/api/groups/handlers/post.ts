import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const {name} = await req.json();

    if (!name) {
        return NextResponse.json({error: 'Invalid groups data'})
    }


    if (name && typeof name !== 'string') {
        return NextResponse.json({ error: 'Invalid groups name' }, { status: 400 });
    }

    try {
        const group = await prisma.group.create({
            data: {
                name: name,
                userId: userId,
            },
        });
        return NextResponse.json(group);
    } catch (error) {
        console.error('Error creating group:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}