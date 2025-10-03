import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, symptoms }),
    });
    setName("");
    setSymptoms("");
    alert("Patient checked in!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Patient Check-In</h1>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Describe symptoms"
          className="w-full p-2 border rounded mb-4"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Check In</button>
      </form>
    </div>
  );
}
