import mongoose, { Mongoose } from "mongoose";

interface MongooseConnection {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const MONGODB_URI = process.env.MONGODB_URL;

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    connection: null,
    promise: null,
  };
}

export const DbConnection = async () => {
  if (!MONGODB_URI) throw new Error("MONGODB_URL is not defined");
  if (cached.connection) return cached.connection;

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName : "IjazPoultrySoftware",
    });

  cached.connection = await cached.promise;
  return cached.connection;
};
