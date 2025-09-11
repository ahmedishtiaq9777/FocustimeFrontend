import React, { createContext, useState, useEffect, useContext } from "react";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, settoken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      settoken(token); // In real apps, validate or decode token
    }
  }, []);

  const login = async (data) => {
    console.log("data", data);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    settoken(data.token);
    setUser(data.user);
    console.log("login done");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    settoken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
