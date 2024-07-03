import { NextResponse } from "next/server";
import { ProductModel } from "@/lib/models/productModel";
import { connectToDb } from "@/lib/dbConnection";

export const GET = async () => {
  try {
    await connectToDb();
    const featuredProducts = await ProductModel.find({featured: true,});
    return NextResponse.json({
      msg: "Featured Products fetched successfully",
      success: true,
      data: featuredProducts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: `Featured product loading error: ${error.message}`,
      },
      {
        status: 400,
      }
    );
  }
};