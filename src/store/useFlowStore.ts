import { create } from 'zustand';

type TabType = 'nodes' | 'add';

interface FlowStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void
}

export const useFlowStore = create<FlowStore>((set) => ({
  activeTab: 'add',
  setActiveTab: (tab) => set({ activeTab: tab }),
  selectedId: null,
  setSelectedId: (id) => set({selectedId: id})
}));