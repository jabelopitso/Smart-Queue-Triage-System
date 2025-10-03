interface Patient {
  _id: string;
  name: string;
  symptoms: string;
  status: string;
  createdAt: string;
}

interface QueueListProps {
  patients: Patient[];
  onStatusChange: (id: string, status: string) => void;
}

export default function QueueList({ patients, onStatusChange }: QueueListProps) {
  return (
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
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => onStatusChange(p._id, "in progress")}
            >
              In Progress
            </button>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
              onClick={() => onStatusChange(p._id, "seen")}
            >
              Seen
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
