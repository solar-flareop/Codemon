const mongoose = require("mongoose");
const connectDB = async (url) => {
  try {
    console.log("Connected to DB");
    return await mongoose.connect(url);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectDB;
