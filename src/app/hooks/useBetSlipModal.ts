import { create } from 'zustand';

type BetSlipModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useBetSlipModal = create<BetSlipModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useBetSlipModal;
