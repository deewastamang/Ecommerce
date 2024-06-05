import { NextResponse } from "next/server";
import { UserOrderModel } from "@/lib/models/userOrderModel";
import { connectToDb } from "@/lib/dbConnection";

export const GET = async (req) => {
  try {
    await connectToDb();
    const user = await UserOrderModel.findOne({})
    return NextResponse.json({
      msg: "Wishlist fetched successfully",
      success: true,
      data: user?.wishlist,
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
      const { email, wishlist: newWish } = reqBody;
  
      const checkUserRegistry = await UserOrderModel.findOne({ email });
  
      if (checkUserRegistry) {
        // Update existing wishlist by adding new items
        const existingWishlist = checkUserRegistry.wishlist || [];
  
        // Merge existing and new items, checking for duplicates
        const mergedWishlist = newWish.reduce((acc, wish) => {
          const existingWish = acc.find(wsh => wsh._id.toString() === wish._id.toString());
          if (existingWish) {
            // Optionally update quantity or other properties here
            return acc;
          } else {
            acc.push(wish);
          }
          return acc;
        }, [...existingWishlist]);
  
        checkUserRegistry.wishlist = mergedWishlist;
        await checkUserRegistry.save();
  
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
  
