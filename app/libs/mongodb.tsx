import mongoose, { Mongoose } from "mongoose"; // Removed unused Connection import

// Extend NodeJS.Global to include mongoose property
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Use let instead of var
let cached = global.mongoose as
  | { conn: Mongoose | null; promise: Promise<Mongoose> | null }
  | undefined;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
