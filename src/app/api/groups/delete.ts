import {NextResponse} from 'next/server';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const userId = session.user.id;

    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || typeof id !== 'string') {
        return NextResponse.json({error: 'invalid groups id'}, {status: 400})
    }
    try {
        await prisma.group.delete({
            where: {userId: userId, id}
        });
    } catch (error) {
        console.error('Error deleting group:', error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
    return NextResponse.json({message: 'Group deleted'}, {status: 200});
}