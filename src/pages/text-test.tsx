import React from "react";
import TextField from "@/components/Text/TextField";

export default function TextTest() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#efefef] p-8">
      {/* Large */}
      <div className="flex max-w-md flex-col items-center gap-4">
        <TextField placeholder="Text field" size="lg" variant="default" />
        <TextField placeholder="Text field" size="lg" variant="input" />
        <TextField placeholder="Text field" size="lg" variant="active" />
        <TextField placeholder="Text field" size="lg" variant="disabled" disabled />
      </div>

      {/* Medium */}
      <div className="flex max-w-md flex-col items-center gap-4">
        <TextField placeholder="Text field" size="md" variant="default" />
        <TextField placeholder="Text field" size="md" variant="input" />
        <TextField placeholder="Text field" size="md" variant="active" />
        <TextField placeholder="Text field" size="md" variant="disabled" disabled />
      </div>

      {/* Small */}
      <div className="flex max-w-md flex-col items-center gap-4">
        <TextField placeholder="Text field" size="sm" variant="default" />
        <TextField placeholder="Text field" size="sm" variant="input" />
        <TextField placeholder="Text field" size="sm" variant="active" />
        <TextField placeholder="Text field" size="sm" variant="disabled" disabled />
      </div>
    </div>
  );
}
