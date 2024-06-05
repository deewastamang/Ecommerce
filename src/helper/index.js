import bcrypt from "bcryptjs";
import { connectToDb } from "@/lib/dbConnection";
import { UserModel } from "@/lib/models/userModel";

export const login = async (credentials) => {
  let customErrorMsg = "";  //i guess we can't retrun our custom error messge in response to client side, so using this process
  try {
    await connectToDb();
    const checkUser = await UserModel.findOne({ email: credentials.email });
    if (!checkUser) {
      customErrorMsg = "No user found";
      throw new Error(); // just to get off from try block
    }
    const checkPassword = await bcrypt.compare(
      credentials.password,
      checkUser.password
    );
    if (!checkPassword) {
      customErrorMsg = "Invalid password";
      throw new Error();
    }
    return checkUser;
  } catch (error) {
    throw new Error(customErrorMsg);
  }
};


export const calculatePercentage = (oldPrice, price) => {
    return !!parseFloat(price) && !!parseFloat(oldPrice) ? (100 - (oldPrice/price)*100).toFixed(0) : 0
}

export const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // To use 12-hour format with AM/PM
    timeZoneName: 'short' // Include timezone
  };
  return date.toLocaleString('ne-NP', options)
}
