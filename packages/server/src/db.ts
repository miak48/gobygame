import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e: Error) => {
    console.error(`Connection error: ${process.env.MONGODB_URI}`, e.message);
  });

export const db = mongoose.connection;

