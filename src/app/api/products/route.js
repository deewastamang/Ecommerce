import { NextResponse } from "next/server";
import { ProductModel } from "@/lib/models/productModel";
import { connectToDb } from "@/lib/dbConnection";

export const GET = async () => {
  try {
    // in case of find product by search parameter
    // const url = new URL(req.url);
    // const _id = url.searchParams.get("_id");
    // if(_id) {
    //   const singleProduct = await ProductModel.find({_id});
    //   return NextResponse.json({
    //     msg: "single product fetched successfully",
    //     success: true,
    //     data: singleProduct
    //   })
    // }
    await connectToDb();
    const products = await ProductModel.find({});
    return NextResponse.json({
      msg: "Product fetched successfully",
      success: true,
      data: products,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: `product loading error: ${error.message}`,
      },
      {
        status: 400,
      }
    );
  }
};

export const POST = async (req) => {
  try {
    await connectToDb();
    const reqBody = await req.json();
    const newProduct = new ProductModel(reqBody)
    await newProduct.save();
    return NextResponse.json({
      msg: "Product created successfully",
      success: true,
      data: reqBody,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: `product loading error: ${error.message}`,
      },
      {
        status: 400,
      }
    );
  }
};
