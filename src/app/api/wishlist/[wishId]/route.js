
import { NextResponse } from "next/server";
import { UserOrderModel } from "@/lib/models/userOrderModel";
import { connectToDb } from "@/lib/dbConnection";


export const DELETE = async (req, { params }) => {
    try {
      await connectToDb();
      const wishId = params.wishId;
  
      // Find the user
      const user = await UserOrderModel.findOne();
      if (!user) {
        throw new Error("User not found");
      }
  
      // Check if the wish exists in the user's wishlist
      const wishIndex = user.wishlist.findIndex(wish => wish._id.toString() === wishId);
      if (wishIndex === -1) {
        throw new Error("Wish not found in the user's wishlist");
      }
  
      // Remove the wish from the wishlist
      user.wishlist.splice(wishIndex, 1);
  
      // Save the updated user
      await user.save();
  
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

// export const DELETE = async (req, {params}) => {
//     try {
//       await connectToDb();
//       const _id = params.wishId;
//       const userExists = await UserOrderModel.findOne();
//       if (!userExists) {
//         throw new Error("User not found");
//       }
//       const foo = await UserOrderModel.deleteOne({_id }); // output of foo: { acknowledged: true, deletedCount: 1 }
//       return NextResponse.json({
//         success: true,
//         msg: "Wish deleted successfully",
//       });
//     } catch (error) {
//       return NextResponse.json(
//         {
//           success: false,
//           msg: `Wish loading error: ${error.message}`,
//         },
//         {
//           status: 400,
//         }
//       );
//     }
//   };