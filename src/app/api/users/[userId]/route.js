import { connectToDb } from "@/lib/dbConnection";
import { UserModel } from "@/lib/models/userModel";
import { NextResponse } from "next/server";

export const GET = async (req, {params}) => {
  try {
    await connectToDb();
    const _id = params.userId;

    const findUser = await UserModel.findOne({_id});
    if(!findUser) {
      throw new Error("User not found");
    }

    return NextResponse.json({
        success: true,
        msg: "User fetched successfully",
        data: findUser,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: `
      Something went wrong: ${error.message}`,
      },
      { status: 400 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    await connectToDb();
    const reqBody = await req.json();
    const _id = params.userId;

    const updatedUser = await UserModel.findOneAndUpdate(
      {
        _id,
      },
      reqBody,
      { new: true }
    );

    if(!updatedUser) {
        throw new Error("User doesn't exists in database");
    }
    return NextResponse.json({
        success: true,
        msg: "User has been updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: `
      Something went wrong: ${error.message}`,
      },
      { status: 400 }
    );
  }
};
