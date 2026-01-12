import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(); // fake login sets ADMIN by default
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Fake Login</button>;
}
