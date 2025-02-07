const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
      throw new Error("❌ MONGODB_URI is not defined in .env file!");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
