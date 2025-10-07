import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  uid: string;
  name: string;
  email: string;
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  gender?: 'male' | 'female' | 'other';
  bmr?: number; // calculated
}

interface FoodItem {
  id: string;
  name: string;
  unit: string; // g, ml, etc.
  pricePerUnit: number;
  caloriesPerUnit: number;
  isFavorite: boolean;
}

interface MealEntry {
  id: string;
  date: string;
  foodItems: { foodId: string; quantity: number }[];
  totalCost: number;
  totalCalories: number;
}

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
}

interface AppState {
  user: User | null;
  foodItems: FoodItem[];
  mealEntries: MealEntry[];
  weightEntries: WeightEntry[];
  setUser: (user: User | null) => void;
  addFoodItem: (item: FoodItem) => void;
  updateFoodItem: (id: string, updates: Partial<FoodItem>) => void;
  deleteFoodItem: (id: string) => void;
  addMealEntry: (entry: MealEntry) => void;
  addWeightEntry: (entry: WeightEntry) => void;
  calculateBMR: (user: User) => number;
}

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      foodItems: [],
      mealEntries: [],
      weightEntries: [],
      setUser: (user) => set({ user }),
      addFoodItem: (item) => set((state) => ({ foodItems: [...state.foodItems, item] })),
      updateFoodItem: (id, updates) =>
        set((state) => ({
          foodItems: state.foodItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),
      deleteFoodItem: (id) =>
        set((state) => ({
          foodItems: state.foodItems.filter((item) => item.id !== id),
        })),
      addMealEntry: (entry) => set((state) => ({ mealEntries: [...state.mealEntries, entry] })),
      addWeightEntry: (entry) => set((state) => ({ weightEntries: [...state.weightEntries, entry] })),
      calculateBMR: (user) => {
        if (!user.age || !user.height || !user.weight || !user.gender) return 0;
        // Mifflin-St Jeor Equation
        const bmr =
          user.gender === 'male'
            ? 10 * user.weight + 6.25 * user.height - 5 * user.age + 5
            : 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
        return Math.round(bmr);
      },
    }),
    {
      name: 'foodtrack-storage',
    }
  )
);

export default useAppStore;