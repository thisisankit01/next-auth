import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB successfully Connected");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection Error. Please make sure MongoDB is running. " + err
      );
    });
  } catch (err) {
    console.error(err);
  }
}
