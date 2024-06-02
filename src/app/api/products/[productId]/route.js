
import { connectToDb } from "@/lib/dbConnection";
import { ProductModel } from "@/lib/models/productModel";
import { NextResponse } from "next/server";

export const GET = async (req,{params}) => {
    try {
        await connectToDb();
        const _id = params.productId;
        const singleProduct = await ProductModel.findOne({_id})
        if(!singleProduct) {
            return NextResponse.json({success: false, msg: "Product not found"})
        }
        return NextResponse.json({success: true, msg: "Product founded successfully", data: singleProduct})
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
}

export const DELETE = async (req,{params}) => {
    try {
        await connectToDb();
        const _id = params.productId;
        const checkProductExistence = await ProductModel.findOne({_id})
        if(!checkProductExistence) {
            return NextResponse.json({success: false, msg: "Product not found"})
        }
        const foo = await ProductModel.deleteOne({_id});  // output of foo: { acknowledged: true, deletedCount: 1 }
        return NextResponse.json({success: true, msg: "Product deleted successfully"})
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
}

