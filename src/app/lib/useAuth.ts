// src/lib/useAuth.ts
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export interface Permission {
    resource: string;
    actions: string[];
  }
  
  interface Role {
    _id: string;
    name: string;
    description: string;
    permissions: Permission[];
    __v: number;
    createdAt: string;
    updatedAt: string;
  }
  
  interface User {
    userId: string;
    role: Role;
    iat: number;
    exp: number;
  }

// Helper function to get the token from local storage or cookies
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  }
  return null;
};

export const useAuth = () => {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    console.log("Token from storage:", token); // Add this log to check if token exists
    if (token) {
      try {
        const decoded: User = jwtDecode(token); // Decode the JWT
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        setUser(null);
      }
    } else {
      console.log("No token found");
    }
    setLoading(false);
  }, []);

  return { user, loading };
};
