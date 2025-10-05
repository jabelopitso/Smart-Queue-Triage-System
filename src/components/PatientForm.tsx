// src/components/PatientForm.tsx
"use client";

import { useState } from "react";

type PatientFormProps = {
  onPatientAdded: () => void;
};

export default function PatientForm({ onPatientAdded }: PatientFormProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !symptoms) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, symptoms }),
      });

      if (!res.ok) throw new Error("Failed to add patient");

      setName("");
      setAge("");
      setSymptoms("");
      onPatientAdded();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 rounded-xl shadow-lg w-full max-w-md text-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add Patient</h2>
      {error && <p className="text-red-200 mb-2 text-center">{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-white bg-transparent p-2 mb-2 w-full rounded placeholder-white"
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        className="border border-white bg-transparent p-2 mb-2 w-full rounded placeholder-white"
      />

      <input
        type="text"
        placeholder="Symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="border border-white bg-transparent p-2 mb-4 w-full rounded placeholder-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-white text-blue-600 font-bold py-2 px-4 w-full rounded hover:bg-gray-100 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Patient"}
      </button>
    </form>
  );
}
