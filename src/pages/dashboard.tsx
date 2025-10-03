import { useEffect, useState } from "react";
import QueueList from "@/components/QueueList";

interface Patient {
  _id: string;
  name: string;
  symptoms: string;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
    const interval = setInterval(fetchPatients, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/patients", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchPatients();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>
      <QueueList patients={patients} onStatusChange={updateStatus} />
    </div>
  );
}
