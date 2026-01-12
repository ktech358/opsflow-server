import { useEffect, useState } from "react";
import api from "../api/axios";
import RoleGuard from "../components/RoleGuard";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  // fetch requests from backend
  useEffect(() => {
    api.get("/requests")
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, []);

  // handle status update
  const handleStatusUpdate = (id) => {
    api.put(`/requests/${id}/status`, { status: "IN_PROGRESS" })
      .then(res => {
        // update state locally
        setRequests(prev => prev.map(r => r.id === id ? res.data : r));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Requests</h2>

      {requests.map(req => (
        <div key={req.id} style={{ border: "1px solid #ccc", padding: 8, margin: 4 }}>
          <p><b>{req.title}</b></p>
          <p>Status: {req.status}</p>

          <RoleGuard allowedRoles={["ADMIN", "USER"]}>
            <button onClick={() => handleStatusUpdate(req.id)}>
              Update Status
            </button>
          </RoleGuard>
        </div>
      ))}
    </div>
  );
}
