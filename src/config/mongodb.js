/* eslint-disable quotes */
import { MongoClient } from "mongodb";

import { env } from "./environment";

let db = null;

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
  });
  await client.connect();

  db = client.db(env.DATABASE_NAME);
};

export const getDB = () => {
  if (!db) throw new Error("Chưa kết nối Database");
  return db;
};
