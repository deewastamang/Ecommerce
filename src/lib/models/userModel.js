import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userLocation = new Schema({
  longitude: {
    type: Number,
    default: null,
  },
  latitude: {
    type: Number,
    default: null,
  },
  address: {
    type: {
      city: {
        type: String,
      },
      city_district: {
        type: String,
      },
      country: {
        type: String,
      },
      country_code: {
        type: String,
      },
      county: {
        type: String,
      },
      municipality: {
        type: String,
      },
      postcode: {
        type: Number,
      },
      road: {
        type: String,
      },
      state: {
        type: String,
      },
      suburb: {
        type: String,
      },
    },
  },
});

const userSchema = new Schema(
  {
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
      enum: [
        "products.read",
        "products.all",
        "products.create",
        "products.update",
        "products.delete",
      ],
      default: ["products.read"],
    },
    location: {
      type: userLocation,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models?.users || mongoose.model("users", userSchema);

export { UserModel };
