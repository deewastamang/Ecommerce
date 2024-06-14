import { connectToDb } from "@/lib/dbConnection";
import { UserModel } from "@/lib/models/userModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDb();
    const allUsers = await UserModel.find({}).lean();
    return NextResponse.json({
        success: true,
        msg: `users has been fetched successfully`,
        data: allUsers
      })
  } catch (error) {
    return NextResponse.json({success: false, msg: `
    Something went wrong: ${error.message}`},{status: 400})
  }
};
