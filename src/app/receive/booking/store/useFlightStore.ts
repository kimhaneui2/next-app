import { create } from 'zustand';

interface flightFormStore {
  flightFormValues: { [key: string]: any };
  setflightFormValues: (values: { [key: string]: any }) => void;
  updateflightFormValues: (updatedValues: { [key: string]: any }) => void;
}

export const useflightFormStore = create<flightFormStore>((set) => ({
  flightFormValues: {},

  setflightFormValues: (values) => set(() => ({ flightFormValues: values })),

  updateflightFormValues: (updatedValues) =>
    set((state) => ({
      flightFormValues: {
        ...state.flightFormValues,
        ...updatedValues,
      },
    })),
}));
