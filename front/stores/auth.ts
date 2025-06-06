import { create } from "zustand";
import { AuthResponse, LoginData, User } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isInitialized: false,

  initializeAuth: async () => {
    if (get().isInitialized) return;

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data.data });
      }
    } catch (error) {
      console.log("Pas d'utilisateur connecté");
    } finally {
      set({ isInitialized: true });
    }
  },

  login: async (loginData: LoginData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();

    if (data.status === "success") {
      set({ user: data.data });
    }

    return data;
  },

  logout: async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Erreur lors de la déconnexion");
    } finally {
      set({ user: null });
    }
  },
}));

type AuthStore = {
  user: User | null;
  isInitialized: boolean;
  login: (loginData: LoginData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
};

export default useAuthStore;
