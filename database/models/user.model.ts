import { UserTypes } from "@/enums";
import { model, models, Schema } from "mongoose";

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
    required: true,
  },
  image : {
    type: String,
  },
  address : {
    type: String,
  },
  phone : {
    type: String,
  },
  userType: {
    type: String,
    default: UserTypes.USER,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


export const User = models?.User || model("User", userSchema);