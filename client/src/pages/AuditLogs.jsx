import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/audit-logs")
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Audit Logs</h2>
      {logs.map(log => (
        <p key={log.id}>{log.action} by {log.user.email}</p>
      ))}
    </div>
  );
}
