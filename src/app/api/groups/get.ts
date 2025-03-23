import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

    if (id && typeof id !== "string") {
        return NextResponse.json({ error: "Invalid groups id" }, { status: 400 });
    }

    if (id) {
        try {
            const group = await prisma.group.findUnique({
                where: { id: id, userId: userId },
            });

            return NextResponse.json(group);
        } catch (error) {
            console.error("Error retrieving groups:", error);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }

    try {
        const groups = await prisma.group.findMany({
            where: { userId: userId },
        });

        return NextResponse.json({ groups });
    } catch (error) {
        console.error("Error retrieving groups:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}