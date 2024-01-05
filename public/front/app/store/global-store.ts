import { auth, category, city, me } from "@/public/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GlobalState {

  // isLoading: boolean;
  // isSuccess: boolean
  // isError: boolean
  // message: any;
  typeDialog: string;
  seletedCityId: number;
  selectedCities: city[];
  cities: city[];
  categories: category[];
  // setIsLoading: (isLoading: boolean) => void;
  // setIsSuccess: (isSuccess: boolean) => void;
  // setIsError: (isError: boolean) => void;
  // setMessage: (message: object) => void;
  setTypeDialog: (typeDialog: string) => void;
  setSeletedCityId: (seletedCity: number) => void;
  clearSelectedCities: () => void;
  addSeletedCities: (selectedCities: city) => void;
  deleteSeletedCities: (selectedCities: city) => void;
  setCities: (cities: city[]) => void;
  setCategories: (categories: category[]) => void;
}

interface AuthState {
  auth: any;
  me: any;
  setAuth: (auth: any) => void;
  setMe: (me: me) => void;
}

export const useGlobal = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        // isLoading: false,
        // isSuccess: false,
        // isError: false,
        // message: {},
        typeDialog: "",
        seletedCityId: 0,
        selectedCities: [],
        cities: [],
        categories: [],
        // setIsLoading: (isLoading: boolean) => set({ isLoading }),
        // setIsSuccess: (isSuccess: boolean) => set({ isSuccess }),
        // setIsError: (isError: boolean) => set({ isError }),
        // setMessage: (message: object) => set({ message }),
        setTypeDialog: (typeDialog: string) => set({ typeDialog }),
        clearSelectedCities: () => set({ selectedCities: [] }),
        setSeletedCityId: (seletedCityId: number) => set({ seletedCityId }),
        addSeletedCities: (city: city) => set((state) => ({ selectedCities: [...state.selectedCities, city] })),
        deleteSeletedCities: (city: city) => set((state) => ({
          selectedCities: state.selectedCities.filter((c) => c.id !== city.id),
        })),
        setCities: (cities: city[]) => set({ cities }),
        setCategories: (categories: category[]) => set({ categories }),
      }),
      {
        name: 'global',
        skipHydration: true
      },
    )
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
        name: 'auth',
        skipHydration: true
      },
    )
  )
)
