import { create } from 'zustand';
import { Request } from '@prisma/client';

interface GroupState {
  selectedGroup: Request | null;
  setSelectedGroup: (group: Request) => void;
  clearSelectedGroup: () => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  selectedGroup: null,
  setSelectedGroup: (group) => set({ selectedGroup: group }),
  clearSelectedGroup: () => set({ selectedGroup: null }),
}));

interface GroupsState {
  groups: Request[];
  setGroups: (groups: Request[]) => void;
  clearGroups: () => void;
}

export const useGroupsStore = create<GroupsState>((set) => ({
  groups: [],
  setGroups: (groups) => set({ groups }),
  clearGroups: () => set({ groups: [] }),
}));