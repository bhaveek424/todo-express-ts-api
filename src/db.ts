import { MongoClient } from 'mongodb';

const {
  MONGO_URI = 'mongodb+srv://bhaveek:1212@cluster0.k51sbrs.mongodb.net/crud',
} = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
