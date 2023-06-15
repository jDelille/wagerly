import { create } from 'zustand';

type NotLoggedInModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useNotLoggedInModal = create<NotLoggedInModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useNotLoggedInModal;
