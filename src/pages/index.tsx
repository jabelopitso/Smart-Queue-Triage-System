import PatientForm from "@/components/PatientForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Patient Check-In</h1>
      <PatientForm onSubmit={() => {}} />
    </div>
  );
}
