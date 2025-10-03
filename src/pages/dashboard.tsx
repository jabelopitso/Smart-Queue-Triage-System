import { useEffect, useState } from "react";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
    const interval = setInterval(fetchPatients, 5000); // auto refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/api/patients`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchPatients();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>
      <div className="grid gap-4">
        {patients.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-bold">{p.name}</p>
              <p>{p.symptoms}</p>
              <p className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</p>
              <p className="text-sm font-semibold">Status: {p.status}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => updateStatus(p._id, "in progress")}>In Progress</button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => updateStatus(p._id, "seen")}>Seen</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
