import React from "react";
import TextFieldSet from "./TextFieldSet";
import KakaoIcon from "@/assets/svgs/kakao.svg?react";
import { S } from "@/styles/ProfileFind.styles";

type Field = {
  key: string;
  label: string;
  placeholder: string;
  type: string;
};

interface ProfileFormProps {
  form: Record<string, any>;
  setForm: (form: any) => void;
  isEditing: boolean;
  isKakaoUser: boolean;
  fields: readonly Field[];
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  form,
  setForm,
  isEditing,
  isKakaoUser,
  fields,
}) => {
  return (
    <div className={S.formContainer}>
      <div className={S.formInner}>
        {isKakaoUser && (
          <TextFieldSet
            label="소셜로그인"
            value="카카오 로그인"
            disabled={true}
            icon={<KakaoIcon className="w-5 h-5" />}
            inputClassName={S.socialLoginInput}
            className={S.socialLoginSet}
            size="sm"
          />
        )}
        {fields.map(({ key, label, placeholder, type }) => (
          <TextFieldSet
            key={key}
            label={label}
            value={form[key]}
            placeholder={placeholder}
            onChange={(value) => setForm({ ...form, [key]: value })}
            disabled={!isEditing}
            type={type}
            className={S.fieldSet}
            inputClassName={S.fieldInput}
            size="sm"
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileForm;
