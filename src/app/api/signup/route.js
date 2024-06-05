import { connectToDb } from "@/lib/dbConnection";
import { UserModel } from "@/lib/models/userModel";
const bcrypt = require("bcryptjs");
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    if (!name || !email || !password || !confirmPassword) {
      throw new Error("please fill up all credentials")
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords doesn't match")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await connectToDb();
    const alreadyExists = await UserModel.findOne({ email });
    if (alreadyExists) {
      throw new Error("user already exits")
    }
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword, 
    });
    await newUser.save();
    return NextResponse.json({
        success: true,
        msg: `user ${name} with email ${email} has been created successfully`,
      })
  } catch (error) {
    return NextResponse.json({success: false, msg: `
    Something went wrong: ${error.message}`},{status: 400})
  }
};
