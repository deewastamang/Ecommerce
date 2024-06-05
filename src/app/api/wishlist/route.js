import { NextResponse } from "next/server";
import { UserOrderModel } from "@/lib/models/userOrderModel";
import { connectToDb } from "@/lib/dbConnection";

export const GET = async (req) => {
  try {
    await connectToDb();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
      throw new Error("Send user id in search parameter");
    }
    const orderData = await UserOrderModel.findOne({ userId });
    if (!orderData) {
      return NextResponse.json({
        success: true,
        msg: "No any wishlist currently", data: [],
      });
    }
    return NextResponse.json({
      msg: "Wishlist fetched successfully",
      success: true,
      data: orderData?.wishlist,
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
    const { userId, wishlist: newWish } = reqBody;
    if(!userId) {
      throw new Error("Please send user id in body")
    }

    const checkUserDataExists = await UserOrderModel.findOne({ userId });

    if (checkUserDataExists) {
      // Update existing wishlist by adding new items
      const existingWishlist = checkUserDataExists.wishlist || [];

      const mergedWishlist = [...existingWishlist, newWish].reduce(
        (acc, wish) => {
          const existingWish = acc.find(
            (wsh) => wsh._id.toString() === wish._id.toString()
          );
          if (existingWish) {
            return acc;
          } else {
            acc.push(wish);
          }
          return acc;
        },
        []
      );

      checkUserDataExists.wishlist = mergedWishlist;
      await checkUserDataExists.save();

      return NextResponse.json({
        msg: "Wishlist has been updated successfully",
        success: true,
      });
    } else {
      // Create new user wishlist
      const newUserWish = new UserOrderModel(reqBody);
      await newUserWish.save();

      return NextResponse.json({
        msg: "Wishlist has been created successfully",
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

export const DELETE = async (req) => {
  try {
    await connectToDb();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const wishId = url.searchParams.get("wishId");

    if(!userId && !wishId) {
      throw new Error("Please send user id and product id in search parameter")
    }

    const orderData = await UserOrderModel.findOne({ userId });
    if (!orderData) {
      throw new Error("No any product in wishlist to delete")
    }

    // Check if the wish exists in the user's wishlist
    const wishIndex = orderData.wishlist.findIndex(
      (wish) => wish._id.toString() === wishId
    );
    if (wishIndex === -1) {
      throw new Error("Wish not found in the user's wishlist");
    }

    // Remove the wish from the wishlist
    orderData.wishlist.splice(wishIndex, 1);

    // Save the updated user
    await orderData.save();

    return NextResponse.json({
      success: true,
      msg: "Wish deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: `Wish deletion error: ${error.message}`,
      },
      {
        status: 400,
      }
    );
  }
};
