import { MongoClient } from "mongodb";

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

const uri = process.env.MONGODB_URI;

if (process.env.NODE_ENV === "development") {
  // Use global to avoid multiple connections in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
