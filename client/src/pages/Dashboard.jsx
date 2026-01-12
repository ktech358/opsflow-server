import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
