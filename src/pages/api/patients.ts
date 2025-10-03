import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

type Patient = {
  _id?: ObjectId;
  name: string;
  symptoms: string;
  status: string;
  createdAt: Date;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("smart-triage");
  const collection = db.collection<Patient>("patients");

  if (req.method === "POST") {
    const { name, symptoms } = req.body;
    if (!name || !symptoms) return res.status(400).json({ message: "Name and symptoms required" });

    await collection.insertOne({ name, symptoms, status: "waiting", createdAt: new Date() });
    return res.status(201).json({ message: "Patient added" });
  }

  if (req.method === "GET") {
    const patients = await collection.find().sort({ createdAt: 1 }).toArray();
    return res.status(200).json(patients);
  }

  if (req.method === "PUT") {
    const { id, status } = req.body;
    if (!id || !status) return res.status(400).json({ message: "ID and status required" });

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
    return res.status(200).json({ message: "Status updated" });
  }

  res.status(405).json({ message: "Method not allowed" });
}
