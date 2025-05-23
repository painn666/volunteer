"use client";
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { getUser } from "./requests";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("response");

        const response = await getUser();
        if (response.status !== 200) {
          throw new Error("Failed to fetch user data");
        }
        console.log(response);
        setIsLogged(true);
        setUserData(response.data);
      } catch (err) {}
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userData, isLogged, setIsLogged, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
