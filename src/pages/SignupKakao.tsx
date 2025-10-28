import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import KakaoIcon from "@/assets/svgs/kakao.svg?react";
import Profile from "@/assets/svgs/Profile.svg?react";
import { useSearchParams } from "react-router-dom";
import { useRegisterOAuthMutation } from "@/hooks/auth/useRegisterOAuthMutation";

// 백엔드가 카카오 인증 시작을 해주는 주소 (필요 시 재로그인)
const KAKAO_AUTH_URL = "https://blog.leets.land/auth/kakao";

// 백엔드 스펙에 맞는 DTO 키: email, nickname, profilePicture, birthDate, name, introduction, kakaoId
type FormState = {
  email: string;
  name: string;
  birth: string;        // -> birthDate 로 매핑
  nickname: string;
  intro: string;        // -> introduction 로 매핑
  profileImg: string;   // -> profilePicture 로 매핑 (URL 또는 dataURL)
  kakaoId?: string;     // 숫자 문자열일 수 있으니 string으로 받고 전송 시 number 변환
};

const SignupKakao: React.FC = () => {
  const [params] = useSearchParams();
  const [form, setForm] = useState<FormState>({
    email: "",
    name: "",
    birth: "",
    nickname: "",
    intro: "",
    profileImg: "",
    kakaoId: undefined,
  });

  // URL 쿼리로 넘어온 값들(있으면 자동 채움)
  const prefills = useMemo(() => {
    return {
      email: params.get("email") ?? "",
      name: params.get("name") ?? "",
      nickname: params.get("nickname") ?? "",
      profilePicture: params.get("profilePicture") ?? "",
      kakaoId: params.get("kakaoId") ?? undefined,
    };
  }, [params]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      email: prefills.email || prev.email,
      name: prefills.name || prev.name,
      nickname: prefills.nickname || prev.nickname,
      profileImg: prefills.profilePicture || prev.profileImg,
      kakaoId: prefills.kakaoId || prev.kakaoId,
    }));
  }, [prefills]);

  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const { mutate, isPending } = useRegisterOAuthMutation();

  const onSubmit = () => {
    if (!form.email.trim()) return alert("이메일을 입력해 주세요.");
    if (!form.nickname.trim()) return alert("닉네임을 입력해 주세요.");
    if (form.nickname.length > 20) return alert("닉네임은 최대 20자입니다.");
    if (form.intro.length > 30) return alert("한 줄 소개는 최대 30자입니다.");
    if (!form.kakaoId) return alert("카카오 인증에 실패했습니다. 다시 시도해 주세요.");

    // 백엔드 요구 키로 매핑
    const payload = {
      email: form.email,
      nickname: form.nickname,
      profilePicture: form.profileImg,     // URL 또는 dataURL
      birthDate: form.birth,               // "YYYY.MM.DD" 형식이면 백엔드 포맷에 맞춰 전달
      name: form.name,
      introduction: form.intro,
      kakaoId: Number(form.kakaoId),       // 숫자 변환
    };

    mutate(payload);
  };

  const fields: ReadonlyArray<{
    key: keyof FormState;
    label: string;
    placeholder: string;
    helper?: string;
  }> = [
    { key: "email", label: "이메일", placeholder: "이메일" },
    { key: "name", label: "이름", placeholder: "이름" },
    { key: "birth", label: "생년월일", placeholder: "YYYY.MM.DD" },
    { key: "nickname", label: "닉네임", placeholder: "닉네임", helper: "* 20자 이내" },
    { key: "intro", label: "한 줄 소개", placeholder: "한 줄 소개" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header variant="write" />

      <div className="w-full h-[114px] flex flex-col justify-center border-b border-gray-300 bg-gray-50 px-[430px]">
        <h1 className="text-[32px] font-medium text-gray-900">회원가입</h1>
        <p className="text-[14px] text-gray-600 mt-1">가입을 위해 회원님의 정보를 입력해주세요.</p>
      </div>

      <div className="flex flex-col mt-[30px] px-[430px] w-full">
        <p className="text-[14px] text-gray-400 mb-5">프로필 사진</p>

        {/* 프로필 사진 */}
        <div className="flex flex-col items-start w-[688px] mb-[40px] gap-4">
          {form.profileImg ? (
            <img
              src={form.profileImg}
              alt="프로필"
              className="w-[88px] h-[88px] rounded-full object-cover"
            />
          ) : (
            <Profile className="w-[88px] h-[88px]" />
          )}

          <label className="border border-gray-300 text-gray-600 text-[12px] px-3 py-1 rounded-[2px] cursor-pointer hover:bg-gray-50 transition">
            프로필 사진 추가
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  if (typeof reader.result === "string") {
                    handleChange("profileImg", reader.result);
                  }
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>
        </div>

        <div className="flex flex-col w-[688px] gap-2 mb-6">
          <p className="text-[14px] text-gray-800 font-medium">소셜 로그인</p>
          <button
            type="button"
            onClick={() => window.location.assign(KAKAO_AUTH_URL)}
            className="flex items-center justify-start gap-2 w-full h-[46px] rounded-md bg-gray-100 text-gray-900 font-medium border border-gray-300 hover:bg-gray-200 transition pl-4"
          >
            <KakaoIcon className="w-[18px] h-[18px]" />
            <span className="text-[#909090]">카카오 로그인</span>
          </button>
        </div>

        {/* 입력 폼 */}
        <div className="flex flex-col gap-4 w-[688px]">
          {fields.map(({ key, label, placeholder, helper }) => (
            <div key={key as string}>
              <TextFieldSet
                label={label}
                value={form[key] as string}
                onChange={(v) => handleChange(key, v)}
                placeholder={placeholder}
              />
              {helper && <p className="text-[#909090] text-[12px] mt-1">{helper}</p>}
            </div>
          ))}

          {form.kakaoId && (
            <p className="text-[12px] text-gray-400">kakaoId: {form.kakaoId}</p>
          )}
        </div>

        {/* 완료 버튼 */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isPending}
          className="w-[688px] h-[46px] mt-[40px] border border-blue-400 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition disabled:opacity-50"
        >
          {isPending ? "가입 중..." : "회원가입 완료"}
        </button>
      </div>
    </div>
  );
};

export default SignupKakao;
