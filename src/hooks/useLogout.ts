import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => setIsLogoutModalOpen(true);

  const handleConfirmLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.clear();

    setIsLogoutModalOpen(false);
    navigate("/blog", { replace: true });
  };

  const handleCloseLogoutModal = () => setIsLogoutModalOpen(false);

  return {
    isLogoutModalOpen,
    handleLogoutClick,
    handleConfirmLogout,
    handleCloseLogoutModal,
  };
}
