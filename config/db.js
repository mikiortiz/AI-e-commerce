const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 MongoDB conectado (AI)");
  } catch (err) {
    console.error("🔴 Error Mongo:", err.message);
    process.exit(1);
  }
};
