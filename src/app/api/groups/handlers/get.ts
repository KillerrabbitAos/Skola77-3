import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = session.user.id;

    if (id) {
        try {
            const group = await prisma.request.findUnique({
                where: { id: id, userId: userId },
            });

            return NextResponse.json(group);
        } catch (error) {
            console.error("Error retrieving groups:", error);
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        }
    }
    const query = searchParams.get("q");
    if (query) {
        try {
            const groups = await prisma.request.findMany({
                where: {
                    userId: userId,
                    name: {
                        contains: query || undefined,
                        mode: "insensitive",
                    },
                },
            });
            return NextResponse.json(groups);
        } catch (error) {
            console.error("Error retrieving groups:", error);
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        }
    }

    try {
        const groups = await prisma.request.findMany({
            where: { userId: userId },
        });

        return NextResponse.json({ groups });
    } catch (error) {
        console.error("Error retrieving groups:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
