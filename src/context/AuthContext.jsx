import { createContext, useState } from "react";

export const AuthContext = createContext(null)

function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    const signup =(email, password) => {
        let users = JSON.parse(localStorage.getItem('users') || '[]');

        if (!Array.isArray(users)) {
    users = [];
  }

        const newUser = { email, password};
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
    }

    const login = () => {

    }

    return ( 
        <AuthContext.Provider value={ {signup}}>
            {children}
        </AuthContext.Provider>
     );
}

export default AuthProvider;