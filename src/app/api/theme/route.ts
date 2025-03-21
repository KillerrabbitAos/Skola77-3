import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

async function upsertUserTheme(userId: string, theme: string): Promise<boolean> {
    try {
        await prisma.userPreference.upsert({
            where: { userId: userId },
            update: { theme: theme },
            create: { userId: userId, theme: theme }, // Create a new record if it doesn't exist
        });
        return true;
    } catch (error) {
        console.error('Error updating user theme:', error);
        return false;
    }
}

async function getUserTheme(userId: string): Promise<string | null> {
    try {
        const userPreference = await prisma.userPreference.findUnique({
            where: {userId: userId},
            select: {theme: true},
        });

        return userPreference?.theme || null;
    } catch (error) {
        console.error('Error retrieving user theme:', error);
        return null;
    }
}

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