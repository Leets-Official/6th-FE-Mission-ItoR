// src/pages/text-test.tsx
import React from "react";
import TextField from "@/components/Text/TextFiled";
import SmallButton from "@/components/Button/SmallButton";

export default function TextTest() {
    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="flex flex-col items-center space-y-4 max-w-md mt-[22px] gap-[12px]">
                <TextField placeholder="Text filed" size="lg" variant="default" />
                <TextField placeholder="Text filed" size="lg" variant="input" />
                <TextField placeholder="Text filed" size="lg" variant="active" />
                <TextField placeholder="Text filed" size="lg" variant="disabled" disabled />
            </div>
            <div className="flex flex-col items-center space-y-4 max-w-md mt-[22px] gap-[12px]">
                <TextField placeholder="Text filed" size="md" variant="default" />
                <TextField placeholder="Text filed" size="md" variant="input" />
                <TextField placeholder="Text filed" size="md" variant="active" />
                <TextField placeholder="Text filed" size="md" variant="disabled" disabled />
            </div>
            <div className="flex flex-col items-center space-y-4 max-w-md mt-[22px] gap-[12px]">
                <TextField placeholder="Text filed" size="sm" variant="default" />
                <TextField placeholder="Text filed" size="sm" variant="input" />
                <TextField placeholder="Text filed" size="sm" variant="active" />
                <TextField placeholder="Text filed" size="sm" variant="disabled" disabled />
            </div>
        </div>
    );
}
