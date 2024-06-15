
import { connectToDb } from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import { UserOrderModel } from "@/lib/models/userOrderModel";



export const PUT = async (req, { params }) => {
    try {
      await connectToDb();
      const reqBody = await req.json();
      const _id = params.orderId;
      const updatedOrderData = await UserOrderModel.findOneAndUpdate(
        { _id },
        reqBody,
        { new: true }
      );
      if (!updatedOrderData) {
        throw new Error("Order Data doesn't exists in the database");
      }
      return NextResponse.json({
        success: true,
        msg: `Order Data of user ${reqBody.userEmail} is updated successfully`,
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
      const _id = params.orderId;
      const checkExistence = await UserOrderModel.findOne({ _id });
      if (!checkExistence) {
        throw new Error("Order data not found");
      }
      const foo = await UserOrderModel.deleteOne({ _id }); // output of foo: { acknowledged: true, deletedCount: 1 }
      return NextResponse.json({
        success: true,
        msg: "Order Data has been deleted successfully",
      });
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          msg: `Order data loading error: ${error.message}`,
        },
        {
          status: 400,
        }
      );
    }
  };