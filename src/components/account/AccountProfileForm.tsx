// src/components/account/AccountProfileForm.tsx
import React from "react";
import LabeledInput from "@src/components/ui/LabeledInput";
import LabeledTextArea from "@src/components/ui/LabeledTextArea";

export type AccountProfileFormState = {
  email: string;
  nickname: string;
  intro: string;
  realname: string;
  birth: string;
};

type Props = {
  form: AccountProfileFormState;
  disabled: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function AccountProfileForm({
  form,
  disabled,
  onChange,
}: Props) {
  return (
    <div className="mx-auto flex w-full max-w-[688px] flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-4">
        <LabeledInput
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일"
          value={form.email}
          onChange={onChange}
          disabled
        />

        <LabeledInput
          label="닉네임"
          name="nickname"
          type="text"
          placeholder="닉네임"
          value={form.nickname}
          onChange={onChange}
          disabled={disabled}
        />
        <p className="text-[12px] font-light leading-[19.2px] text-[var(--Gray-78,#C8C8C8)]">
          * 20글자 이내로 입력해주세요.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <LabeledInput
          label="이름"
          name="realname"
          type="text"
          placeholder="이름"
          value={form.realname}
          onChange={onChange}
          disabled={disabled}
        />

        <LabeledInput
          label="생년월일"
          name="birth"
          type="text"
          placeholder="YYYY-MM-DD"
          value={form.birth}
          onChange={onChange}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-4">
        <LabeledTextArea
          label="소개"
          name="intro"
          value={form.intro}
          placeholder="한 줄 소개 또는 소개글"
          rows={2}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
