import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // fake user initially null
  const [user, setUser] = useState(null);

  const login = () => {
    // for testing, login sets fake user
    setUser({ email: "test@test.com", role: "ADMIN" });
  };

  const logout = () => {
    setUser(null); // CLEAR user
    // optional: also clear token from localStorage if you plan to persist login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
