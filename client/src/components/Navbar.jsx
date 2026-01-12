import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import RoleGuard from "./RoleGuard";

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null; // hide navbar if not logged in

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/dashboard">Dashboard</Link>{" | "}
      <Link to="/requests">Requests</Link>{" | "}

      <RoleGuard allowedRoles={["ADMIN"]}>
        <Link to="/audit-logs">Audit Logs</Link>{" | "}
      </RoleGuard>

      <button onClick={logout}>Logout</button>
    </nav>
  );
}
