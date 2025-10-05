// src/components/QueueList.tsx
"use client";

import { useEffect, useState } from "react";

type Patient = {
  id: number;
  name: string;
  age: number;
  symptoms: string;
  createdAt: string;
};

export default function QueueList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/patients");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearQueue = async () => {
    if (!confirm("Are you sure you want to clear the queue?")) return;
    await fetch("/api/patients", { method: "DELETE" });
    fetchPatients();
  };

  // Auto-refresh every 5 seconds
  useEffect(() => {
    fetchPatients();
    const interval = setInterval(fetchPatients, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Patient Queue</h2>
        <button
          onClick={clearQueue}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : patients.length === 0 ? (
        <p className="text-gray-600">No patients in the queue.</p>
      ) : (
        <ul className="space-y-4">
          {patients.map((p, idx) => (
            <li
              key={p.id}
              className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-xl shadow-lg text-white flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg">{p.name}</p>
                <p className="text-sm opacity-90">
                  Age: {p.age} | Symptoms: {p.symptoms}
                </p>
              </div>
              <span className="text-white font-bold text-xl">#{idx + 1}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
