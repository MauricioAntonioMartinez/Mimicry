import mongoose from "mongoose";

export const connectDatabase = () =>
  mongoose
    .connect(process.env.MONGODB_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to the database"))
    .catch((err) => {
      console.log(err.message);
      console.log("Cannot Connect to the database");
    });
