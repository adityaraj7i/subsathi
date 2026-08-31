import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('subsathi_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('subsathi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('subsathi_user');
    }
  }, [user]);

  const login = (emailOrPhone, name = 'Customer') => {
    const newUser = {
      id: 'usr_' + Date.now(),
      name: name || emailOrPhone.split('@')[0],
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@user.subsathi.com`,
      phone: emailOrPhone.startsWith('98') || emailOrPhone.startsWith('97') ? emailOrPhone : '+977-98XXXXXXXX',
      joinedAt: new Date().toISOString()
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
