import { useState } from "react";
import Pagination from "@ui/Pagenation";

function App() {
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-dvh flex items-center justify-center p-10 bg-gray-100">
      <Pagination page={page} totalPages={5} onChange={setPage} />
    </div>
  );
}

export default App;
