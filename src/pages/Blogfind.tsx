import React from "react";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import Toast from "@/components/Toast";
import PostList from "@/components/PostList";
import { useBlogfind } from "@/hooks/useBlogfind";
import { S } from "@/styles/Blogfind.styles";

const Blogfind: React.FC = () => {
  const {
    showToast,
    currentPage,
    data,
    isLoading,
    isError,
    handlePageChange,
  } = useBlogfind();

  if (isLoading) {
    return (
      <div className={`${S.loadingOrError} text-gray-600`}>
        게시글을 불러오는 중입니다...
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`${S.loadingOrError} text-red-500`}>
        게시글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className={S.container}>
      <Header variant="write" />

      {showToast && (
        <Toast variant="success" message="삭제가 완료되었습니다!" />
      )}

      <PostList posts={data?.posts || []} />

      <div className={S.paginationContainer}>
        <Pagination
          totalPages={data?.pageMax ?? 1}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Blogfind;

