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

        const locationQuery = `ST_SetSRID(ST_MakePoint($1, $2), 4326)`;

        await prisma.$executeRaw`
            UPDATE "User"
            SET "location" = ${locationQuery}
            WHERE "id" = ${session.user.id}
            AND "location" IS DISTINCT FROM ${locationQuery}
        `;

        return NextResponse.json({ message: "Location updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}