import React, { createContext, useState, useMemo } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const logIn = (data) => {
    setUser(data);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const authContextProviderValue = useMemo(() => ({
    loggedIn: !!user?.token,
    user,
    logIn,
    logOut,
    getAuthHeader: () => (user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
  }), [user]);

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
