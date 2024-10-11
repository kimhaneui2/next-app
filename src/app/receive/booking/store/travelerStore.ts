import { create } from 'zustand';

interface bookerFormStore {
  bookerFormValues: { [key: string]: any };
  setBookerFormValues: (values: { [key: string]: any }) => void;
  updateBookerFormValues: (updatedValues: { [key: string]: any }) => void;
}

export const useBookerFormStore = create<bookerFormStore>((set) => ({
  bookerFormValues: {},

  setBookerFormValues: (values) => set(() => ({ bookerFormValues: values })),

  updateBookerFormValues: (updatedValues) =>
    set((state) => ({
      bookerFormValues: {
        ...state.bookerFormValues,
        ...updatedValues,
      },
    })),
}));
interface FormStore {
  travelersFormValues: any[]; // travelersFormValues is now an array
  setTravelersFormValues: (values: any[]) => void;
  updateTravelersFormValues: (updatedValues: any[]) => void;
}

// Create the zustand store
export const useTravelersFormStore = create<FormStore>((set) => ({
  travelersFormValues: [], // Initial state is an empty array

  setTravelersFormValues: (values) =>
    set(() => ({ travelersFormValues: values })),
  updateTravelersFormValues: (updatedValues) =>
    set(() => ({
      travelersFormValues: updatedValues, // Replace with the new array
    })),
}));
