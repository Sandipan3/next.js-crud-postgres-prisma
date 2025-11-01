import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = parseInt((await params).id);

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { status: "success", message: "User fetched successfully", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = parseInt((await params).id);
    //const body = await req.json()

    const { name, email } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, name },
    });
    return NextResponse.json(
      {
        status: "success",
        message: "User updated successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to update user",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = parseInt((await params).id);

    const deletedUser = await prisma.user.delete({ where: { id } });
    return NextResponse.json(
      {
        status: "success",
        message: "User deleted successfully",
        user: deletedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to delete user",
      },
      { status: 500 }
    );
  }
};
