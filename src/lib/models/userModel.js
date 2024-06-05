import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  permissions: {
    type: [String],
    enum: ["products.read", "products.all", "products.create", "products.update", "products.delete"],
    default: ["products.read"],
  },
},{timestamps: true});

const UserModel = mongoose.models?.users || mongoose.model("users", userSchema);

export {UserModel}
