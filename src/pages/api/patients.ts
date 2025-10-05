// app/api/patients/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  const patients = await prisma.patient.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(patients);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, age, symptoms } = body;

  if (!name || !age || !symptoms) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const newPatient = await prisma.patient.create({
    data: { name, age: Number(age), symptoms },
  });

  return NextResponse.json(newPatient, { status: 201 });
}
