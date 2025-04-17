'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// Define user roles
export type UserRole = "owner" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  gymId?: string;
}

export interface Gym {
  id: string;
  name: string;
  address: string;
  ownerId: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  gymId: string;
  membershipType: string;
  joinDate: string;
}

// Define the BMI details type
export interface BmiDetails {
  bmi?: number;
  idealWeight?: string;
  message?: string;
}

interface mealItem {
  foodItem: string,
  quantity: string
}

interface DietDetails {
  breakfast?: [mealItem]
  lunch?: [mealItem]
  evening?: [mealItem]
  dinner?: [mealItem]
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    gymDetails?: { name: string; address: string },
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  addMember: (memberData: Omit<Member, "id">) => Promise<void>;
  getGymMembers: (gymId: string) => Promise<void>;
  getBmi: (
    weight: number,
    age: number,
    height: number,
    gender: string
  ) => Promise<BmiDetails>;

  getDiet: (
    goal: string,
    activityLevel: string,
    dietPreference: string,
  ) => Promise<DietDetails>;
  currentGym: Gym | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility functions for localStorage with expiry
function setWithExpiry(key: string, value: any, ttl: number) {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentGym, setCurrentGym] = useState<Gym | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const TTL = 3600000; // 1 hour in milliseconds

  useEffect(() => {
    const storedUser = getWithExpiry("user");
    if (storedUser) {
      setUser(storedUser);

      if (storedUser.role === "owner" && storedUser.gymId) {
        const gym = {
          id: "gym-1",
          name: "FitZone Gym",
          address: "123 Fitness Street, Gym City",
          ownerId: "owner-1",
        };
        setCurrentGym(gym);
        if (gym) setWithExpiry("currentGym", gym, TTL);
      }
    }

    const storedGym = getWithExpiry("currentGym");
    if (storedGym) {
      setCurrentGym(storedGym);
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Login failed");
      }

      const { user, gym } = await res.json();
      setUser(user);
      setCurrentGym(gym || null);
      setWithExpiry("user", user, TTL);
      if (gym) setWithExpiry("currentGym", gym, TTL);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    gymDetails?: { name: string; address: string },
  ) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, gymDetails }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Signup failed");
      }

      const { user, gym } = await res.json();
      setUser(user);
      setCurrentGym(gym || null);
      setWithExpiry("user", user, TTL);
      if (gym) setWithExpiry("currentGym", gym, TTL);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const addMember = async (memberData: Omit<Member, "id">) => {
    try {
      const res = await fetch("/api/add-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberData }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Add member failed");
      }

      const { user, gym } = await res.json();
      setUser(user);
      setCurrentGym(gym || null);
      setWithExpiry("user", user, TTL);
      if (gym) setWithExpiry("currentGym", gym, TTL);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const getGymMembers = async (gymId: string) => {
    try {
      const res = await fetch("/api/get-gym-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gymId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Get members failed");
      }

      const { user, gym } = await res.json();
      setUser(user);
      setCurrentGym(gym || null);
      setWithExpiry("user", user, TTL);
      if (gym) setWithExpiry("currentGym", gym, TTL);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const getBmi = async (
    weight: number,
    age: number,
    height: number,
    gender: string,
  ): Promise<BmiDetails> => {
    if (!weight || !age || !height || !gender) {
      alert("Please fill in all fields.");
      return { bmi: 0, idealWeight: "0", message: "Please fill all fields" };
    }

    try {
      const res = await fetch("/api/bmi-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, age, height, gender }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch BMI data.");
      }

      const { data } = await res.json();
      return {
        bmi: data.bmi,
        idealWeight: data.idealWeight,
        message: data.message,
      };
    } catch (error) {
      console.error("Error:", error);
      return { bmi: 0, idealWeight: "0", message: "Error fetching BMI data" };
    }
  };

  const getDiet = async (
    goal: string,
    activityLevel: string,
    dietPreference: string
  ): Promise<DietDetails> => {
    if (!goal || !activityLevel || !dietPreference) {
      alert("Please fill in all fields.");
      return { 
        breakfast: [{ foodItem: "", quantity: "" }],
        lunch: [{ foodItem: "", quantity: "" }],
        evening: [{ foodItem: "", quantity: "" }],
        dinner: [{ foodItem: "", quantity: "" }]
      };
    }
  
    try {
      const res = await fetch("/api/get-diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, activityLevel, dietPreference }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch diet data.");
      }
  
      const { data } = await res.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return { 
        breakfast: [{ foodItem: "", quantity: "" }],
        lunch: [{ foodItem: "", quantity: "" }],
        evening: [{ foodItem: "", quantity: "" }],
        dinner: [{ foodItem: "", quantity: "" }]
      };
    }
  }
  

  const logout = () => {
    setUser(null);
    setCurrentGym(null);
    localStorage.removeItem("user");
    localStorage.removeItem("currentGym");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
        addMember,
        getGymMembers,
        currentGym,
        getBmi,
        getDiet
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
