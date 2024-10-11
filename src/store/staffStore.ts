import { create } from 'zustand';

interface UserStore {
  staffList: any[];
  setResultList: (result: any[]) => void;
  resetStaffList: () => void;
}

const useStaffStore = create<UserStore>((set) => ({
  staffList: [],
  setResultList: (result) => set({ staffList: result }),
  resetStaffList: () => set({ staffList: [] }),
}));

export default useStaffStore;
