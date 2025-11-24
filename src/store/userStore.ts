import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  user: {
    nickname: string;
    introduction: string;
    profilePicture: string;
  } | null;
  login: (
    nickname: string,
    introduction: string,
    profilePicture: string,
  ) => void;
  logout: () => void;
  setUserProfile: (
    nickname: string,
    introduction: string,
    profilePicture: string,
  ) => void;
  setProfilePicture: (profilePicture: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"), // Initialize based on localStorage
  user: localStorage.getItem("accessToken")
    ? {
        nickname: localStorage.getItem("nickname") || "",
        introduction: localStorage.getItem("introduction") || "",
        profilePicture: localStorage.getItem("profilePicture") || "",
      }
    : null,

  login: (nickname, introduction, profilePicture) => {
    set({
      isLoggedIn: true,
      user: { nickname, introduction, profilePicture },
    });
    // Assuming localStorage is updated elsewhere upon successful login
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("introduction");
    localStorage.removeItem("profilePicture");
    set({ isLoggedIn: false, user: null });
  },
  setUserProfile: (nickname, introduction, profilePicture) => {
    set((state) => ({
      user: state.user
        ? { ...state.user, nickname, introduction, profilePicture }
        : { nickname, introduction, profilePicture },
    }));
  },
  setProfilePicture: (profilePicture) => {
    set((state) => ({
      user: state.user ? { ...state.user, profilePicture } : null, // Handle case where user might be null
    }));
  },
}));
