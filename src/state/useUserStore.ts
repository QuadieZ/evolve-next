import { ProfileData } from "@/types";
import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    sessionToken: string | null;
    setSessionToken: (sessionToken: string) => void;
    sessionTokenRequestedTime: Date | null;
    setSessionTokenRequestedTime: (sessionTokenRequestedTime: Date) => void;
    userProfile: ProfileData | null;
}

export const useUserStore = create(persist<UserState>((set, get) => ({
    sessionToken: null,
    setSessionToken: (sessionToken: string) => set({ sessionToken }),
    sessionTokenRequestedTime: null,
    setSessionTokenRequestedTime: (sessionTokenRequestedTime: Date) => set({ sessionTokenRequestedTime }),
    userProfile: null,
    setUserProfile: (userProfile: ProfileData) => set(produce((state) => state.userProfile = userProfile)),
}), {
    name: "user-storage",
    getStorage: () => localStorage,
}))