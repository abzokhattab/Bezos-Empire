import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bezos-test";

const dbConnection = async () => {
  try {
    const config: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(uri, config);
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};

export default dbConnection;
