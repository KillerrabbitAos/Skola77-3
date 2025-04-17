import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const group = await request.json();
    const id = group?.id

    if (!group) {
        return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    try {
        if (!id) {
            await prisma.request.create({
                data: group
            });
        }
        await prisma.request.update({
            where: { id: id, userId: userId },
            data: group
        });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error updating group:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}