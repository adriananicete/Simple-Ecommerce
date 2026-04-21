import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('currentUserEmail') ? { email: localStorage.getItem('currentUserEmail')} : null );

  const signup = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!Array.isArray(users)) {
      users = [];
    }

    if(users.some(e => e.email === email)) {
      return {success: false, error: 'Email already exists'}
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem('currentUserEmail', email)

    setUser({email})

    return {success: true, message: 'sign up successfully'}
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user =  users.find(u => u.email === email && u.password === password)

    if(!user) {
      return { success: false, error: 'Invalid email or password'}
    }

    localStorage.setItem('currentUserEmail', email);
    setUser({email});

    return { success: true, message: 'login successfully'};
  };

  const logout = () => {
    localStorage.removeItem('currentUserItem');
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signup, user, logout, login }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;


export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};