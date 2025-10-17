// src/pages/TestPage.tsx
import React, { useState } from "react";
import TextFieldSet from "../TextFieldSet";

const TestTextFieldSet: React.FC = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="p-8 flex flex-col gap-6">
      <TextFieldSet
        label="제목"
        value={username}
        onChange={setUsername}
        placeholder="Text field"
      />
    </div>
  );
};

export default TestTextFieldSet;
