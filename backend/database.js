const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB have been connected");
  } catch (error) {
    console.log(error);
    console.log("Hubo un error");
    process.exit(1);
  }
};
module.exports = connectDB;
