// src/pages/text-test.tsx
import React from "react";
import TextField from "@/components/Text/TextField";
import SmallButton from "@/components/SmallButton/SmallButton";

export default function TextTest() {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="mt-[22px] flex max-w-md flex-col items-center gap-[12px] space-y-4">
        <TextField placeholder="Text filed" size="lg" variant="default" />
        <TextField placeholder="Text filed" size="lg" variant="input" />
        <TextField placeholder="Text filed" size="lg" variant="active" />
        <TextField placeholder="Text filed" size="lg" variant="disabled" disabled />
      </div>
      <div className="mt-[22px] flex max-w-md flex-col items-center gap-[12px] space-y-4">
        <TextField placeholder="Text filed" size="md" variant="default" />
        <TextField placeholder="Text filed" size="md" variant="input" />
        <TextField placeholder="Text filed" size="md" variant="active" />
        <TextField placeholder="Text filed" size="md" variant="disabled" disabled />
      </div>
      <div className="mt-[22px] flex max-w-md flex-col items-center gap-[12px] space-y-4">
        <TextField placeholder="Text filed" size="sm" variant="default" />
        <TextField placeholder="Text filed" size="sm" variant="input" />
        <TextField placeholder="Text filed" size="sm" variant="active" />
        <TextField placeholder="Text filed" size="sm" variant="disabled" disabled />
      </div>
    </div>
  );
}
