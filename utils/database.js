import mongoose from "mongoose";
import { MONGODB_URI } from "./secrets";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is already connected");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDb connected");
  } catch (error) {
    console.log("🚀  ~ error:", error);
  }
};
