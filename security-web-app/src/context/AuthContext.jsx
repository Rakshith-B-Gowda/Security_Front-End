import React, { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => sessionStorage.getItem('token'));

  // Store token in sessionStorage
  const setToken = (jwtToken) => {
    if (jwtToken) {
      sessionStorage.setItem('token', jwtToken);
      setTokenState(jwtToken);
    } else {
      sessionStorage.removeItem('token');
      setTokenState(null);
    }
  };

  const login = (jwtToken) => setToken(jwtToken);
  const logout = () => setToken(null);

  const value = useMemo(() => ({ token, login, logout }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
