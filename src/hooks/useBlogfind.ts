// src/hooks/useBlogfind.ts
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllPosts } from "@/hooks/usePosts";

export const useBlogfind = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useAllPosts(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (location.state?.showToast) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        navigate(location.pathname, { replace: true, state: {} });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, navigate]);

  return {
    showToast,
    currentPage,
    data,
    isLoading,
    isError,
    handlePageChange,
  };
};
