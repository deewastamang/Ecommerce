import { NextResponse } from "next/server";
import { UserOrderModel } from "@/lib/models/userOrderModel";
import { connectToDb } from "@/lib/dbConnection";

export const GET = async (req) => {
  try {
    await connectToDb();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
      throw new Error("Send userId in search parameter");
    }
    const orderData = await UserOrderModel.findOne({ userId });
    if(!orderData) {
        return NextResponse.json({success: true, msg: "No any orders currently", data: []})
    }
    return NextResponse.json({
      msg: "orderData fetched successfully",
      success: true,
      data: orderData,
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
    const checkUserExists = await UserOrderModel.findOne({ userId: reqBody.userId });

    if (checkUserExists) {
      // Update existing order by adding new order
      const existingOrders = checkUserExists.orders;
      const newOrders = reqBody.orders;

      // Merge existing and new orders, updating quantities for duplicate orders
      const mergedOrders = [...existingOrders, ...newOrders].reduce((acc, order) => {
        const existingOrder = acc.find(product => product._id.toString() === order._id.toString());
        if (existingOrder) {
          existingOrder.quantity += order.quantity;
        } else {
          acc.push(order);
        }
        return acc;
      }, []);

      checkUserExists.orders = mergedOrders;
      await checkUserExists.save();

      return NextResponse.json({
        msg: "Orders have been updated successfully",
        success: true,
      });
    } else {
      // Create new order
      const newOrder = new UserOrderModel(reqBody);
      await newOrder.save();

      return NextResponse.json({
        msg: "Orders have been created successfully",
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: `Error occurred: ${error.message}`,
      },
      {
        status: 400,
      }
    );
  }
};

//for bulk delete
export const DELETE = async (req) => {
  try {
    await connectToDb();
    const reqBody = await req.json();
    if(reqBody.length === 0) {
      throw new Error("Please send some order data to delete")
    }
    const foo = await UserOrderModel.deleteMany({ _id: {$in: reqBody} }); // output of foo: { acknowledged: true, deletedCount: 1 }
    return NextResponse.json({
      success: true,
      msg: "Order Data have been deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: `Order Data loading error: ${error.message}`,
      },
      {
        status: 400,
      }
    );
  }
};
