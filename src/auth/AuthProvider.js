import axios from "axios";
import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const contextValue = {
    user,
    login() {
     
           setUser({  id:1 })
      // aqui se haria lo de la api
            },
    logout() {
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
