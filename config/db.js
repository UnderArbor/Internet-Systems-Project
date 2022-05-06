const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MongoURI");

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URL || db;

  try {
    mongoose.connect(mongoURI);
    var connection = mongoose.connection;
    connection.on("error", console.error.bind(console, "connection error:"));

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
