import { MongoClient } from "mongodb";
import { getEnv } from "@/lib/env";

let client;
let clientPromise;

export async function getDb() {
  if (!clientPromise) {
    const { mongodbUri } = getEnv();
    client = new MongoClient(mongodbUri);
    clientPromise = client.connect().catch((error) => {
      clientPromise = undefined;
      throw error;
    });
  }

  const connected = await clientPromise;
  return connected.db();
}
