import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    // Retrieve the token from localStorage on initial load
    return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  });
  const [username, setUsername] = useState(() => {
    // Retrieve the username from localStorage on initial load
    return typeof window !== 'undefined' ? localStorage.getItem('username') : null;
  });
  const router = useRouter();

  useEffect(() => {
    // Persist authToken to localStorage whenever it changes
    localStorage.setItem('authToken', authToken);
  }, [authToken]);

  useEffect(() => {
    // Persist username to localStorage whenever it changes
    localStorage.setItem('username', username);
  }, [username]);

  const login = (jwt) => {
    setAuthToken(jwt.token);
    setUsername(jwt.username);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setAuthToken(null);
    setUsername('');
    router.push('/SignIn');
  };

  return (
    <AuthContext.Provider value={{ authToken, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
