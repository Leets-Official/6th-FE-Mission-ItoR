import Modal from "../Modal";
import React from "react";

const TestModal = () => {
  return (
    <>
      <p>Modal Component</p>
      <div className="p-6 flex flex-col gap-4">
      <Modal 
        titleLine1="Title line one" 
        titleLine2="Title line two" 
        description="설명문 예시입니다." 
      />
      <Modal 
        titleLine1="Title line one" 
        titleLine2="Title line two" 
      />
    </div>
    </>
  )
}

export default TestModal;