import React, { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";

const PaginationTest = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="mt-10 flex flex-col items-center gap-8 p-10">
      <div>
        <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default PaginationTest;
