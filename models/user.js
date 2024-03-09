import { Schema, model, models } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  userName: {
    type: String,
    required: [true, "userName is required"],
    unique: [true, "userName must be unique"],
  },
  image: String,
});
const User = models.User || model("User", userSchema);
//Short hand
//email userName image
export default User;
