// src/pages/AccountProfilePage.tsx
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

import ReorderIcon from "@icons/reorder.svg?react";
import Button from "../components/ui/Button/Button";
import LabeledInput from "../components/ui/LabeledInput";
import LabeledTextArea from "../components/ui/LabeledTextArea";

import { useMyInfo, useUpdateUser } from "@src/hooks/useUser";
import api from "../api/client"; // presigned URL 요청용 axios 인스턴스

type FormState = {
  nickname: string;
  intro: string;
  email: string;
  realname: string;
  birth: string;
  preview: string | null; // 프로필 이미지 URL(또는 임시 미리보기)
};

const EMPTY_FORM: FormState = {
  nickname: "",
  intro: "",
  email: "",
  realname: "",
  birth: "",
  preview: null,
};

// 1) presigned URL 요청: GET /images/presigned-url?fileName=...
// - 서버 응답: { code, message, data: string }  (data = presigned PUT URL)
async function requestProfilePresignedUrl(fileName: string): Promise<string> {
  const res = await api.get<{
    code: number;
    message: string;
    data: string;
  }>("/images/presigned-url", {
    params: { fileName },
  });

  return res.data.data; // presigned PUT URL
}

// 2) S3에 실제 이미지 업로드 (PUT)
async function uploadFileToS3(uploadUrl: string, file: File) {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!res.ok) {
    throw new Error("S3 업로드에 실패했습니다.");
  }
}

// 3) presigned PUT URL → 최종 이미지 URL
function extractFileUrlFromPresigned(presignedUrl: string): string {
  return presignedUrl.split("?")[0];
}

export default function AccountProfilePage() {
  const nav = useNavigate();

  const { data, isLoading, error } = useMyInfo();
  const me = data?.data;

  const { mutate: updateUser, isPending } = useUpdateUser();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [original, setOriginal] = useState<FormState>(EMPTY_FORM);

  // 새로 선택한 파일 (있으면 presigned 업로드 대상)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 최초 로딩 시 내 정보로 폼 채우기
  useEffect(() => {
    if (!me) return;

    const next: FormState = {
      nickname: me.nickname,
      intro: me.introduction || "",
      email: me.email,
      realname: me.name || "",
      birth: me.birthDate || "",
      preview: me.profilePicture || null,
    };

    setForm(next);
    setOriginal(next);
  }, [me]);

  const fileRef = useRef<HTMLInputElement>(null);

  const pickFile = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // 이전 blob URL 정리
    if (form.preview && form.preview.startsWith("blob:")) {
      URL.revokeObjectURL(form.preview);
    }

    const url = URL.createObjectURL(f);

    setSelectedFile(f);
    setForm((prev) => ({ ...prev, preview: url }));
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const onCancel = useCallback(() => {
    // 원래 값으로 롤백
    setForm(original);
    setSelectedFile(null);
  }, [original]);

  const onSave = useCallback(async () => {
    if (!form.email || !form.nickname) {
      alert("이메일과 닉네임은 필수입니다.");
      return;
    }

    try {
      setIsUploading(true);

      let profilePictureUrlToSave: string | undefined =
        form.preview || undefined;

      // 새 파일이 선택된 경우에만 presigned 업로드 수행
      if (selectedFile) {
        const presignedUrl = await requestProfilePresignedUrl(
          selectedFile.name
        );

        await uploadFileToS3(presignedUrl, selectedFile);

        profilePictureUrlToSave = extractFileUrlFromPresigned(presignedUrl);
      }

      updateUser(
        {
          email: form.email,
          nickname: form.nickname,
          profilePicture: profilePictureUrlToSave,
          birthDate: form.birth || undefined,
          name: form.realname || undefined,
          introduction: form.intro || undefined,
        },
        {
          onSuccess: () => {
            nav("/me");
          },
          onError: () => {
            alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
          },
          onSettled: () => {
            setIsUploading(false);
          },
        }
      );
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      alert("프로필 이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }, [form, nav, updateUser, selectedFile]);

  const isBusy = isPending || isUploading;

  if (isLoading && !me) {
    return <div className="p-4">내 정보를 불러오는 중입니다...</div>;
  }

  if (error || !me) {
    return (
      <div className="p-4">
        내 정보를 불러오지 못했어요. 다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="page-shell">
      {/* 헤더 */}
      <header className="w-full border-b border-[var(--Gray96)] bg-white/90 backdrop-blur-[2px]">
        <div className="page-header-inner h-12 sm:h-14">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="메뉴 열기"
              className="btn-reset inline-flex h-6 w-6 items-center justify-center"
            >
              <ReorderIcon className="h-6 w-6" />
            </button>
            <div className="logo-text select-none">GITLOG</div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="pillNeutral"
              onClick={onCancel}
              className="text-[var(--Negative)]"
              disabled={isBusy}
            >
              취소하기
            </Button>
            <Button
              type="button"
              variant="pillNeutral"
              onClick={onSave}
              className="text-[var(--Black)]"
              disabled={isBusy}
            >
              {isBusy ? "저장 중..." : "저장하기"}
            </Button>
          </div>
        </div>
      </header>

      {/* 프로필 영역 (닉네임, 한 줄 소개, 프로필 이미지) */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="page-inner">
          <div className="h-16" />
        </div>

        <div className="page-inner flex flex-col items-start gap-3">
          <button
            type="button"
            onClick={pickFile}
            className="flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full bg-[var(--Black)]"
            aria-label="프로필 이미지 변경"
            disabled={isBusy}
          >
            {form.preview ? (
              <img
                src={form.preview}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="logo-text text-[36px] leading-[28px] text-[var(--White)]">
                G
              </span>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
            disabled={isBusy}
          />

          {/* 닉네임 */}
          <input
            name="nickname"
            type="text"
            value={form.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            className="h-10 w-full rounded-[4px] border border-[var(--Gray90)] px-4 text-[24px] font-medium leading-[38.4px] text-[var(--Black)] placeholder-[var(--Gray-78,#C8C8C8)]"
            disabled={isBusy}
          />

          {/* 한 줄 소개 */}
          <input
            name="intro"
            type="text"
            value={form.intro}
            onChange={handleChange}
            placeholder="한 줄 소개"
            className="h-10 w-full rounded-[4px] border border-[var(--Gray90)] px-4 text-[14px] font-light leading-[22.4px] text-[var(--Gray20)] placeholder-[var(--Gray-78,#C8C8C8)]"
            disabled={isBusy}
          />
        </div>

        <div className="page-inner h-5 max-h-5" />
      </section>

      {/* 상세 정보 수정 영역 */}
      <main className="w-full flex-1">
        <div className="page-inner page-main flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <LabeledInput
              label="메일"
              name="email"
              type="email"
              placeholder="이메일"
              value={form.email}
              onChange={handleChange}
              disabled={isBusy}
            />

            <LabeledInput
              label="이름"
              name="realname"
              type="text"
              placeholder="이름"
              value={form.realname}
              onChange={handleChange}
              disabled={isBusy}
            />

            <LabeledInput
              label="생년월일"
              name="birth"
              type="text"
              placeholder="YYYY - MM - DD"
              value={form.birth}
              onChange={handleChange}
              disabled={isBusy}
            />

            <LabeledTextArea
              label="소개"
              name="intro"
              value={form.intro}
              placeholder="한 줄 소개 또는 소개글"
              rows={2}
              onChange={handleChange}
              disabled={isBusy}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
