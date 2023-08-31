const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`not connected : ${error}`);
  }
};

module.exports = connectDb;