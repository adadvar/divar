import { auth, category, city, me } from "@/public/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GlobalState {

  selectedCities: city[];
  cities: city[];
  categories: category[];
  setSeletedCities: (selectedCities: city[]) => void;
  setCities: (cities: city[]) => void;
  setCategories: (categories: category[]) => void;
}

interface AuthState {
  auth: any;
  me: any;
  setAuth: (auth: any) => void;
  setMe: (me: me) => void;
}

interface tmpState {
  typeDialog: string;
  hoveredCatId: number;
  showProfileMenu: boolean;
  res: any;
  parentCityId: number;
  tmpSelectedCities: city[];
  ProfMenuOpen: boolean;
  setTypeDialog: (typeDialog: string) => void;
  setHoveredCat: (hoveredCatId: number) => void;
  setShowProfileMenu: (showProfileMenu: boolean) => void;
  setRes: (res: any) => void;
  setParentCityId: (parentCityId: number) => void;
  setTmpSeletedCities: (tmpSelectedCities: city[]) => void;
  clearTmpSelectedCities: () => void;
  addTmpSeletedCities: (tmpSelectedCities: city) => void;
  deleteTmpSeletedCities: (tmpSelectedCities: city) => void;
  setProfMenuOpen: (isProfileMenuOpen: boolean) => void;
}

export const useTmp = create<tmpState>()(
  devtools(
    (set) => ({
      typeDialog: "",
      hoveredCatId: 0,
      showProfileMenu: false,
      res: {},
      ProfMenuOpen: false,
      parentCityId: 0,
      tmpSelectedCities: [],
      setTypeDialog: (typeDialog: string) => set({ typeDialog }),
      setHoveredCat: (hoveredCatId: number) => set({ hoveredCatId }),
      setShowProfileMenu: (showProfileMenu: boolean) => set({ showProfileMenu }),
      setRes: (res: any) => set({ res }),
      setTmpSeletedCities: (tmpSelectedCities: city[]) => set({ tmpSelectedCities }),
      clearTmpSelectedCities: () => set({ tmpSelectedCities: [] }),
      setParentCityId: (parentCityId: number) => set({ parentCityId }),
      addTmpSeletedCities: (city: city) => set((state) => ({ tmpSelectedCities: [...state.tmpSelectedCities, city] })),
      deleteTmpSeletedCities: (city: city) => set((state) => ({
        tmpSelectedCities: state.tmpSelectedCities.filter((c) => c.id !== city.id),
      })),
      setProfMenuOpen: (ProfMenuOpen: boolean) => set({ ProfMenuOpen })
    })
  )
)

export const useGlobal = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        selectedCities: [],
        cities: [],
        categories: [],
        setSeletedCities: (selectedCities: city[]) => set({ selectedCities }),
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

