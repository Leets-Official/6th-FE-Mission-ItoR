import api from "./index";
import { useAuthStore } from "@/store/useAuthStore";

const authHeader = () => {
  const token = useAuthStore.getState().accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchMyInfo = async () => {
  const res = await api.get("/users/me", { headers: authHeader() });
  return res.data;
};

export const updateUserInfo = async (payload: {
  email?: string;
  nickname?: string;
  profilePicture?: string;
  birthDate?: string;
  name?: string;
  introduction?: string;
}) => {
  const res = await api.patch("/users", payload, { headers: authHeader() });
  return res.data;
};
