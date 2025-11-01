import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//return NextResponse.json(data, { status: 200 });

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "No users found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Users fetched successfully",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { status: "error", message: "Email is required" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({ data: { email, name } });

    return NextResponse.json(
      {
        status: "success",
        message: "User created successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create user",
      },
      { status: 500 }
    );
  }
};
