import { create } from 'zustand';

// Zustand 스토어 타입 정의
interface ModalStore {
  modalCount: number;
  openModal: () => void;
  closeModal: () => void;
}

// Zustand 스토어 생성
const useModalStore = create<ModalStore>((set) => ({
  modalCount: 0,
  openModal: () =>
    set((state) => {
      const newCount = state.modalCount + 1;
      if (newCount > 0) {
        document.body.classList.add('stop-scroll');
      }
      return { modalCount: newCount };
    }),
  closeModal: () =>
    set((state) => {
      const newCount = Math.max(state.modalCount - 1, 0);
      if (newCount === 0) {
        document.body.classList.remove('stop-scroll');
      }
      return { modalCount: newCount };
    }),
}));

export default useModalStore;
