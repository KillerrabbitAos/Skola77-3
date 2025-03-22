import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import {upsertUserTheme, getUserTheme} from './helpers';


export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);

    console.log('Session:', session);  // Add this log to check session data

    if (!session?.user || !session.user.id) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const userId = session.user.id;

    try {
        const body = await request.json();
        const { theme } = body;

        if (!theme) {
            return NextResponse.json({error: 'Missing required field: theme'}, {status: 400});
        }

        const success = await upsertUserTheme(userId, theme);

        if (success) {
            return NextResponse.json({message: 'Theme updated successfully'});
        } else {
            return NextResponse.json({error: 'Failed to update theme'}, {status: 500});
        }
    } catch (error) {
        console.error('Error updating user theme:', error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user.id) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const userId = session.user.id;

    try {
        const theme = await getUserTheme(userId);
        return NextResponse.json({theme});
    } catch (error) {
        console.error('Error serving user theme:', error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}