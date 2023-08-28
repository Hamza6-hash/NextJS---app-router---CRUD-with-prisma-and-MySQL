import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { firstName, lastName, email, password } = await req.json();
        if (!firstName || !lastName || !email || !password) return NextResponse.json(
            {
                msg: "No empty fields are allowed"
            },
            {
                status: 400
            })

        const isUserExist = await prisma.user.findFirst({ where: { email: email } })
        if (isUserExist) return NextResponse.json({ msg: "User exist" }, { status: 409 })

        const hashpass = await bcrypt.hash(password, 10);
        const savedUser = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashpass
            }
        });

        return NextResponse.json(savedUser, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 })
    }
}
