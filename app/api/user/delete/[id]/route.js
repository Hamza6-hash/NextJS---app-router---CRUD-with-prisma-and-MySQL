import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
    try {

        const { id } = params
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({ msg: "User Deleted Successfully..." }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 })
    }
}