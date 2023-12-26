import { auth, me } from "@/public/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GlobalState {

  isLoading: boolean;
  isSuccess: boolean
  isError: boolean
  message: any;
  typeDialog: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setIsError: (isError: boolean) => void;
  setTypeDialog: (typeDialog: string) => void;

  setMessage: (message: object) => void;
}

interface AuthState {
  auth: any;
  me: any;
  selectedCategory: string;
  setAuth: (auth: any) => void;
  setMe: (me: me) => void;
  setSelectedCategory: (setSelectedCategory: string) => void;
}

export const useGlobal = create<GlobalState>()(
  devtools(
    (set) => ({
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: {},
      typeDialog: "",
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setIsSuccess: (isSuccess: boolean) => set({ isSuccess }),
      setIsError: (isError: boolean) => set({ isError }),
      setTypeDialog: (typeDialog: string) => set({ typeDialog }),

      setMessage: (message: object) => set({ message }),
    }),

  ),
)


export const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        auth: {},
        me: {},
        selectedCategory: '',
        setAuth: (auth: any) => set({ auth }),
        setMe: (me: any) => set({ me }),
        setSelectedCategory: (selectedCategory: string) => set({ selectedCategory })
      }),
      {
        name: 'global',
        skipHydration: true
      },
    )
  )
)
