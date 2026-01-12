import { useAuth } from "../auth/AuthContext";

export default function RoleGuard({ allowedRoles, children }) {
  const { user } = useAuth();
  if (!user) return null;
  if (!allowedRoles.includes(user.role)) return null;
  return children;
}
