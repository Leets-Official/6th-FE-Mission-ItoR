import React from "react";
import TextField from "@/components/Text/TextField";
import { Link } from "react-router-dom";
import TextFieldSet from "@/components/Text/TextFieldSet";

export default function TextTest() {
  return (
    <div className="bg-brand-white flex min-h-screen flex-col items-center justify-center gap-8 p-8">
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

      <div className="mt-4 rounded-lg">
        <div className="flex flex-col gap-6">
          <TextFieldSet title="제목" />
          <TextFieldSet title="제목" helperText="주의 문구" />
        </div>
      </div>

      <div>
        <Link to="/">
          <button className="bg-brand-blue rounded-md px-4 py-2 font-medium text-white hover:bg-blue-500">
            홈으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
}
