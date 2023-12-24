import { auth, me } from "@/public/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const localAuth = typeof window !== "undefined" && localStorage.getItem("auth");
const localMe = typeof window !== "undefined" && localStorage.getItem("me");

interface GlobalState {
  auth: auth;
  me: me;
  isLoading: boolean;
  isSuccess: boolean
  isError: boolean
  message: object;
  typeDialog: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setIsError: (isError: boolean) => void;
  setTypeDialog: (typeDialog: string) => void;
  setAuth: (auth: auth) => void;
  setMe: (me: me) => void;
}

export const useGlobal = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        auth: { access_token: '', expires_in: 0, access_type: '', refresh_token: '' },
        me: JSON.parse(localMe || "{}"),
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: {},
        typeDialog: "",
        setIsLoading: (isLoading: boolean) => set({ isLoading }),
        setIsSuccess: (isSuccess: boolean) => set({ isSuccess }),
        setIsError: (isError: boolean) => set({ isError }),
        setTypeDialog: (typeDialog: string) => set({ typeDialog }),
        setAuth: (auth: auth) => set({ auth }),
        setMe: (me: me) => set({ me }),
      }),
      {
        name: 'global',
        skipHydration: true
      },
    ),
  )
);
