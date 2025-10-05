// src/pages/index.tsx
import PatientForm from "../components/PatientForm";
import QueueList from "../components/QueueList";
import { useState } from "react";

export default function Home() {
  const [refreshQueue, setRefreshQueue] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 pb-10">
      <PatientForm onPatientAdded={() => setRefreshQueue((prev) => !prev)} />
      <QueueList key={refreshQueue ? "refresh1" : "refresh2"} />
    </main>
  );
}
