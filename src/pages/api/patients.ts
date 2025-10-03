import clientPromise from "@/lib/db";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("smart-triage");
  const collection = db.collection("patients");

  if (req.method === "PUT") {
  const { id, status } = req.body;
  const { ObjectId } = require("mongodb");
  if (!id || !status) return res.status(400).json({ message: "ID and status required" });

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return res.status(200).json({ message: "Status updated" });
}


  if (req.method === "GET") {
    const patients = await collection.find().sort({ createdAt: 1 }).toArray();
    return res.status(200).json(patients);
  }

  res.status(405).json({ message: "Method not allowed" });
}
