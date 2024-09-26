

import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/dbConnection";
import { ProductModel } from "@/lib/models/productModel";

export const GET = async () => {
  try {
    await connectToDb();
    const productCount = await ProductModel.countDocuments();
    if(productCount === 0) {
        return NextResponse.json({success: true, msg: "No any product currently", data: []})
    }
    return NextResponse.json({
      msg: "product count fetched successfully",
      success: true,
      data: productCount,
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