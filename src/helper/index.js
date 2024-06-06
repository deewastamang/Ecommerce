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
  
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, '0');

  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format
  const formattedHours = String(hours).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
  
  return `${formattedDate} ${formattedTime} UTC`;
}