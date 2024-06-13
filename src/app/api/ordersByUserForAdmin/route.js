import { NextResponse } from "next/server";
import { UserOrderModel } from "@/lib/models/userOrderModel";
import { connectToDb } from "@/lib/dbConnection";

export const GET = async () => {
  try {
    await connectToDb();
    const allOrders = await UserOrderModel.find({}).lean();

    if (!allOrders || allOrders.length === 0) {
      return NextResponse.json({
        success: true,
        msg: "No any orders currently",
        data: [],
      });
    }
    return NextResponse.json({
      msg: "orderData fetched successfully",
      success: true,
      data: allOrders,
    });
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

export const POST = async (req) => {
  try {
    await connectToDb();
    const reqBody = await req.json();
    const checkUserExists = await UserOrderModel.findOne({
      userId: reqBody.userId,
    });

    if (checkUserExists) {
      // Update existing order by adding new order
      const existingOrders = checkUserExists.orders;
      const newOrders = reqBody.orders;

      // Merge existing and new orders, updating quantities for duplicate orders
      const mergedOrders = [...existingOrders, ...newOrders].reduce(
        (acc, order) => {
          const existingOrder = acc.find(
            (product) => product._id.toString() === order._id.toString()
          );
          if (existingOrder) {
            existingOrder.quantity += order.quantity;
          } else {
            acc.push(order);
          }
          return acc;
        },
        []
      );

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
