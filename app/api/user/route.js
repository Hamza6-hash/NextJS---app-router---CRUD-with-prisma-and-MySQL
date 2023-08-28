import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 })
    }
}