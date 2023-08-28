import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* just a reminder that we can also use upsert for both post and patch method if the user not exist it will create one and if exist it will update it. */
export async function PATCH(req, { params }) {
    try {
        const { id } = params
        const { firstName, lastName } = await req.json();
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                firstName: firstName,
                lastName: lastName,
            }

        })
        if (id !== user.id) return NextResponse.json({ msg: "Incorrect ID provided" }, { status: 400 })
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 })
    }
}