import { auth, category, city, me } from "@/public/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { FormElementInstance } from "../ui/admin/dashboard/formBuilder/formElements";

interface GlobalState {

  selectedCities: city[];
  setSeletedCities: (selectedCities: city[]) => void;
  cities: city[];
  setCities: (cities: city[]) => void;
  categories: category[];
  setCategories: (categories: category[]) => void;
}

interface AuthState {
  auth: any;
  setAuth: (auth: any) => void;
  me: any;
  setMe: (me: any) => void;
}

interface tmpState {
  typeDialog: string;
  setTypeDialog: (typeDialog: string) => void;
  hoveredCatId: number;
  setHoveredCat: (hoveredCatId: number) => void;
  showProfileMenu: boolean;
  setShowProfileMenu: (showProfileMenu: boolean) => void;
  res: any;
  setRes: (res: any) => void;
  parentCityId: number;
  setParentCityId: (parentCityId: number) => void;
  tmpSelectedCities: city[];
  setTmpSeletedCities: (tmpSelectedCities: city[]) => void;
  clearTmpSelectedCities: () => void;
  addTmpSeletedCities: (tmpSelectedCities: city) => void;
  deleteTmpSeletedCities: (tmpSelectedCities: city) => void;
  ProfMenuOpen: boolean;
  setProfMenuOpen: (isProfileMenuOpen: boolean) => void;
  designerElements: FormElementInstance[];
  addDesignerElement: (index: number, element: FormElementInstance) => void;
  removeDesignerElement: (id: string) => void;
  selectedDesignerElements: FormElementInstance | null;
  setSelectedDesignerElements: (selectedDesignerElements: FormElementInstance | null) => void;
  setDesignerElements: (designerElements: FormElementInstance[]) => void;
  updateDesingerElement: (id: string, element: FormElementInstance) => void;
}

export const useTmp = create<tmpState>()(
  devtools(
    (set) => ({
      typeDialog: "",
      setTypeDialog: (typeDialog: string) => set({ typeDialog }),
      hoveredCatId: 0,
      setHoveredCat: (hoveredCatId: number) => set({ hoveredCatId }),
      showProfileMenu: false,
      setShowProfileMenu: (showProfileMenu: boolean) => set({ showProfileMenu }),
      res: {},
      setRes: (res: any) => set({ res }),
      ProfMenuOpen: false,
      setProfMenuOpen: (ProfMenuOpen: boolean) => set({ ProfMenuOpen }),
      parentCityId: 0,
      setParentCityId: (parentCityId: number) => set({ parentCityId }),
      tmpSelectedCities: [],
      setTmpSeletedCities: (tmpSelectedCities: city[]) => set({ tmpSelectedCities }),
      clearTmpSelectedCities: () => set({ tmpSelectedCities: [] }),
      addTmpSeletedCities: (city: city) => set((state) => ({ tmpSelectedCities: [...state.tmpSelectedCities, city] })),
      deleteTmpSeletedCities: (city: city) => set((state) => ({
        tmpSelectedCities: state.tmpSelectedCities.filter((c) => c.id !== city.id),
      })),
      designerElements: [],
      addDesignerElement: (index: number, element: FormElementInstance) => set((state) => {
        const designerElements = [...state.designerElements];
        designerElements.splice(index, 0, element);
        return { designerElements };
      }),
      removeDesignerElement: (id: string) => set((state) => ({
        designerElements: state.designerElements.filter((c) => c.id !== id),
      })),
      selectedDesignerElements: null,
      setSelectedDesignerElements: (selectedDesignerElements: FormElementInstance | null) => set({ selectedDesignerElements }),
      setDesignerElements: (designerElements: FormElementInstance[]) => set({ designerElements }),
      updateDesingerElement: (id: string, element: FormElementInstance) => set((state) => ({
        designerElements: state.designerElements.map((el) => {
          if (el.id === id) {
            return { ...el, ...element };
          }
          return el;
        }),
      })),


    })
  )
)

export const useGlobal = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        selectedCities: [],
        setSeletedCities: (selectedCities: city[]) => set({ selectedCities }),
        cities: [],
        setCities: (cities: city[]) => set({ cities }),
        categories: [],
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
        setAuth: (auth: any) => set({ auth }),
        me: {},
        setMe: (me: any) => set({ me }),
      }),
      {
        name: 'auth',
        skipHydration: true
      },
    )
  )
)

