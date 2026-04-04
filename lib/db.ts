import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/random_db_uri";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cachedClient = (global as any).mongoose;

if (!cachedClient) {
  cachedClient = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDb() {
  if (cachedClient.conn) {
    return cachedClient.conn;
  }

  if (!cachedClient.promise) {
    const opts = {
      bufferCommands: false,
    };

    cachedClient.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB via connectDb()");
      return mongoose;
    });
  }

  try {
    cachedClient.conn = await cachedClient.promise;
  } catch (e) {
    cachedClient.promise = null;
    throw e;
  }

  return cachedClient.conn;
}
