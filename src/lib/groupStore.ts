import { create } from 'zustand';
import { Group } from '@prisma/client';

interface GroupState {
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group) => void;
  clearSelectedGroup: () => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  selectedGroup: null,
  setSelectedGroup: (group) => set({ selectedGroup: group }),
  clearSelectedGroup: () => set({ selectedGroup: null }),
}));
