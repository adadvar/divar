import { auth, city, me } from "@/public/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GlobalState {

  isLoading: boolean;
  isSuccess: boolean
  isError: boolean
  message: any;
  typeDialog: string;
  seletedCityId: number;
  selectedCities: city[];
  setIsLoading: (isLoading: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setIsError: (isError: boolean) => void;
  setTypeDialog: (typeDialog: string) => void;
  setMessage: (message: object) => void;
  setSeletedCityId: (seletedCity: number) => void;
  addSeletedCities: (selectedCities: city) => void;
  deleteSeletedCities: (selectedCities: city) => void;
}

interface AuthState {
  auth: any;
  me: any;
  setAuth: (auth: any) => void;
  setMe: (me: me) => void;
}

export const useGlobal = create<GlobalState>()(
  devtools(
    (set) => ({
      isLoading: false,
      isSuccess: false,
      isError: false,
      message: {},
      typeDialog: "",
      seletedCityId: 0,
      selectedCities: [],
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setIsSuccess: (isSuccess: boolean) => set({ isSuccess }),
      setIsError: (isError: boolean) => set({ isError }),
      setTypeDialog: (typeDialog: string) => set({ typeDialog }),
      setMessage: (message: object) => set({ message }),
      setSeletedCityId: (seletedCityId: number) => set({ seletedCityId }),
      addSeletedCities: (city: city) => set((state) => ({ selectedCities: [...state.selectedCities, city] })),
      deleteSeletedCities: (city: city) => set((state) => ({
        selectedCities: state.selectedCities.filter((c) => c.id !== city.id),
      })),
    }),

  ),
)


export const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        auth: {},
        me: {},
        setAuth: (auth: any) => set({ auth }),
        setMe: (me: any) => set({ me }),
      }),
      {
        name: 'global',
        skipHydration: true
      },
    )
  )
)
