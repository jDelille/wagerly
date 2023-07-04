import { create } from 'zustand';

type SpecialtiesModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useSpecialtiesModal = create<SpecialtiesModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useSpecialtiesModal;
