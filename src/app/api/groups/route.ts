import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import {getGroups} from "@/app/api/helpers/getGroups";


export async function GET(){
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const userId = session.user.id;

    try {
        const groups = await getGroups(userId);
        return NextResponse.json({groups});
    } catch (error) {
        console.error('Error serving user theme:', error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}