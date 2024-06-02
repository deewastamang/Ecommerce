import { connectToDb } from "@/lib/dbConnection";
import { ProductModel } from "@/lib/models/productModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const _id = params.productId;
    const singleProduct = await ProductModel.findOne({ _id });
    if (!singleProduct) {
      throw new Error("Product not found");
    }
    return NextResponse.json({
      success: true,
      msg: "Product fetched successfully",
      data: singleProduct,
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

export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();
    const _id = params.productId;
    const checkProductExistence = await ProductModel.findOne({ _id });
    if (!checkProductExistence) {
      throw new Error("Product not found");
    }
    const foo = await ProductModel.deleteOne({ _id }); // output of foo: { acknowledged: true, deletedCount: 1 }
    return NextResponse.json({
      success: true,
      msg: "Product deleted successfully",
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

export const PUT = async (req, { params }) => {
  try {
    await connectToDb();
    const reqBody = await req.json();
    const _id = params.productId;
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id },
      reqBody,
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error("Product doesn't exists in database");
    }
    return NextResponse.json({
      success: true,
      msg: "Product updated successfully",
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
