import React from "react";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";

const DropdownTest = () => {
  return (
    <div className="flex min-h-screen items-center justify-center gap-12 bg-gray-50">
      <DropdownMenu
        trigger={
          <button className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600">
            Dropdown 열기
          </button>
        }
        items={[
          { label: "menu 1", onClick: () => alert("clicked 1") },
          { label: "menu 2", onClick: () => alert("clicked 2") },
        ]}
        position="right"
      />
    </div>
  );
};

export default DropdownTest;
