import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { latitude, longitude } = await request.json();

        if (typeof latitude !== "number" || typeof longitude !== "number") {
            return NextResponse.json({ error: "Valid latitude and longitude are required" }, { status: 400 });
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: { location: `${latitude},${longitude}` },
        });

        return NextResponse.json({ message: "Location updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}