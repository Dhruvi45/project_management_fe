"use client";
import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Ensure this import is correct
import { useRouter } from "next/navigation"; // Correct import for Next.js v13+

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
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded: User = jwtDecode(token); // Decode the JWT
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        setUser(null);
        router.push("/login"); // Redirect to login if token is invalid
      }
    } else {
      console.log("No token found");
      router.push("/login"); // Redirect to login if token is missing
    }
    setLoading(false);
  }, [router]);

  return { user, loading };
};
