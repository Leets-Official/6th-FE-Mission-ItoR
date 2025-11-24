import { create } from "zustand";

interface UserProfile {
  nickname: string;
  introduction: string;
  profilePicture: string;
}

interface LoginPayload extends UserProfile {
  accessToken: string;
  refreshToken: string;
}

interface UserState {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (payload: LoginPayload) => void;
  logout: () => void;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  setProfilePicture: (profilePicture: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  user: localStorage.getItem("accessToken")
    ? {
        nickname: localStorage.getItem("nickname") || "",
        introduction: localStorage.getItem("introduction") || "",
        profilePicture: localStorage.getItem("profilePicture") || "",
      }
    : null,

  login: (payload) => {
    localStorage.setItem("accessToken", payload.accessToken);
    localStorage.setItem("refreshToken", payload.refreshToken);
    localStorage.setItem("nickname", payload.nickname);
    localStorage.setItem("introduction", payload.introduction || "");
    localStorage.setItem("profilePicture", payload.profilePicture || "");
    set({
      isLoggedIn: true,
      user: {
        nickname: payload.nickname,
        introduction: payload.introduction,
        profilePicture: payload.profilePicture,
      },
    });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("introduction");
    localStorage.removeItem("profilePicture");
    set({ isLoggedIn: false, user: null });
  },
  setUserProfile: (profile) => {
    if (profile.nickname !== undefined) localStorage.setItem("nickname", profile.nickname);
    if (profile.introduction !== undefined) localStorage.setItem("introduction", profile.introduction);
    if (profile.profilePicture !== undefined) localStorage.setItem("profilePicture", profile.profilePicture);
    set((state) => ({
      user: state.user ? { ...state.user, ...profile } : null,
    }));
  },
  setProfilePicture: (profilePicture) => {
    localStorage.setItem("profilePicture", profilePicture || "");
    set((state) => ({
      user: state.user ? { ...state.user, profilePicture } : null,
    }));
  },
}));
