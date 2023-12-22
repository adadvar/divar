import { me } from "@/public/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const localAuth = typeof window !== "undefined" && localStorage.getItem("auth");
const localMe = typeof window !== "undefined" && localStorage.getItem("me");

interface GlobalState {
  token: string;
  me: me;
  isLoading: boolean;
  message: object;
  typeDialog: string;
  setIsLoading: (isLoading: boolean) => void;
  setTypeDialog: (typeDialog: string) => void;
}

export const useGlobal = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        token: localAuth ? JSON.parse(localAuth).access_token : "",
        me: JSON.parse(localMe || "{}"),
        isLoading: false,
        message: {},
        typeDialog: "",
        setIsLoading: (isLoading: boolean) => set({ isLoading }),
        setTypeDialog: (typeDialog: string) => set({ typeDialog }),
      }),
      {
        name: 'global',
        skipHydration: true
      },
    ),
  )
);
