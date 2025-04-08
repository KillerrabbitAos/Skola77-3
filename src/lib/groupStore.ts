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

interface GroupsState {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  clearGroups: () => void;
}

export const useGroupsStore = create<GroupsState>((set) => ({
  groups: [],
  setGroups: (groups) => set({ groups }),
  clearGroups: () => set({ groups: [] }),
}));
