import { NextResponse } from "next/server";
import { UserOrderModel } from "@/lib/models/userOrderModel";
import { connectToDb } from "@/lib/dbConnection";

export const GET = async (req) => {
  try {
    await connectToDb();
    // with search query
    // const url = new URL(req.url);
    // const email = url.searchParams.get("email");
    // if (!email) {
    //   throw new Error("Email not registered");
    // }
    // const user = await UserOrderModel.find({ email });
    // if(!user) {
    //     throw new Error("User not found")
    // }
    const user = await UserOrderModel.findOne({})
    return NextResponse.json({
      msg: "Orders fetched successfully",
      success: true,
      data: user,
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
    const checkExistingUserOrder = await UserOrderModel.findOne({ email: reqBody.email });

    if (checkExistingUserOrder) {
      // Update existing order by adding new order
      const existingOrders = checkExistingUserOrder.orders;
      const newOrders = reqBody.orders;

      // Merge existing and new orders, updating quantities for duplicate orders
      const mergedOrders = [...existingOrders, ...newOrders].reduce((acc, order) => {
        const existingOrder = acc.find(ord => ord._id.toString() === order._id.toString());
        if (existingOrder) {
          existingOrder.quantity += order.quantity;
        } else {
          acc.push(order);
        }
        return acc;
      }, []);

      checkExistingUserOrder.orders = mergedOrders;
      await checkExistingUserOrder.save();

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
