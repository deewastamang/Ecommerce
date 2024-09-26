
import { NextResponse } from "next/server";
import { UserOrderModel } from "@/lib/models/userOrderModel";
import { connectToDb } from "@/lib/dbConnection";

export const GET = async () => {
  try {
    await connectToDb();
    const orderCount = await UserOrderModel.countDocuments();
    if(orderCount === 0) {
        return NextResponse.json({success: true, msg: "No any orders currently", data: []})
    }
    return NextResponse.json({
      msg: "order count fetched successfully",
      success: true,
      data: orderCount,
    });a
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: `order count loading error: ${error.message}`,
      },
      {
        status: 400,
      }
    );
  }
};