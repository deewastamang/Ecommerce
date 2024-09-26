

import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/dbConnection";
import { UserModel } from "@/lib/models/userModel";

export const GET = async () => {
  try {
    await connectToDb();
    const userCount = await UserModel.countDocuments();
    if(userCount === 0) {
        return NextResponse.json({success: true, msg: "No any user currently", data: []})
    }
    return NextResponse.json({
      msg: "user count fetched successfully",
      success: true,
      data: userCount,
    });a
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: `product count loading error: ${error.message}`,
      },
      {
        status: 400,
      }
    );
  }
};