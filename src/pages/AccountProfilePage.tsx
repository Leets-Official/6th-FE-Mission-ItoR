// src/pages/AccountProfilePage.tsx
import React, {
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

import ReorderIcon from "@icons/reorder.svg?react";
import Button from "@ui/Button/Button";
import Toast from "@ui/Toast";

import { useMyInfo, useUpdateUser } from "@src/hooks/useUser";
import {
  requestPresignedUrl,
  uploadFileToS3,
  extractFileUrlFromPresigned,
} from "@src/lib/imageUpload";
import ProfileImageUploader from "@src/components/account/ProfileImageUploader";
import AccountProfileForm, {
  AccountProfileFormState,
} from "@src/components/account/AccountProfileForm";

type FormState = AccountProfileFormState & {
  preview: string | null;
};

const EMPTY_FORM: FormState = {
  nickname: "",
  intro: "",
  email: "",
  realname: "",
  birth: "",
  preview: null,
};

export default function AccountProfilePage() {
  const nav = useNavigate();

  const { data, isLoading, error } = useMyInfo();
  const me = data?.data;

  const { mutate: updateUser, isPending } = useUpdateUser();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [original, setOriginal] = useState<FormState>(EMPTY_FORM);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    variant: "positive" | "negative";
  } | null>(null);

  const showToast = useCallback(
    (message: string, variant: "positive" | "negative" = "negative") => {
      setToast({ message, variant });
      setTimeout(() => {
        setToast((current) => {
          if (!current || current.message !== message) return current;
          return null;
        });
      }, 2000);
    },
    []
  );

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

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleImageChange = useCallback(
    (file: File | null, previewUrl: string | null) => {
      setSelectedFile(file);
      setForm((prev) => ({
        ...prev,
        preview: previewUrl,
      }));
    },
    []
  );

  const onCancel = useCallback(() => {
    setForm(original);
    setSelectedFile(null);
  }, [original]);

  const onSave = useCallback(async () => {
    if (!form.email || !form.nickname) {
      showToast("이메일과 닉네임은 필수입니다.", "negative");
      return;
    }

    try {
      setIsUploading(true);

      let profilePictureUrlToSave: string | undefined =
        form.preview || undefined;

      if (selectedFile) {
        const presignedUrl = await requestPresignedUrl(
          selectedFile.name
        );

        await uploadFileToS3(presignedUrl, selectedFile);

        profilePictureUrlToSave = extractFileUrlFromPresigned(
          presignedUrl
        );
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
            showToast("프로필이 수정되었습니다.", "positive");
            nav("/me");
          },
          onError: () => {
            showToast(
              "정보 수정에 실패했습니다. 다시 시도해주세요.",
              "negative"
            );
          },
          onSettled: () => {
            setIsUploading(false);
          },
        }
      );
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      showToast(
        "프로필 이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.",
        "negative"
      );
    }
  }, [form, nav, updateUser, selectedFile, showToast]);

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
    <div className="flex min-h-dvh w-full flex-col bg-white">
      {toast && (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
          <Toast variant={toast.variant}>{toast.message}</Toast>
        </div>
      )}

      {/* 헤더: 레이아웃 그대로 유지 */}
      <header className="w-full border-b border-[var(--Gray96)] bg-white/90 backdrop-blur-[2px]">
        <div className="mx-auto flex h-[56px] w-full max-w-[1366px] items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="메뉴 열기"
              className="inline-flex h-6 w-6 items-center justify-center"
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

      {/* 상단 영역: 프로필 요약 + 이미지 업로더 */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px]">
          <div className="mx-auto h-16 max-w-[688px] px-4" />

          <div className="mx-auto flex w-full max-w-[688px] flex-col items-start gap-4 px-4 py-3">
            <ProfileImageUploader
              nickname={form.nickname}
              preview={form.preview}
              disabled={isBusy}
              onChange={handleImageChange}
            />

            <div className="flex flex-col items-start gap-1">
              <span className="text-[20px] font-medium leading-[32px] text-[var(--Black)]">
                {form.nickname || "닉네임"}
              </span>
              <span className="text-[14px] font-light leading-[22.4px] tracking-[-0.07px] text-[var(--Gray20)]">
                {form.intro || "한 줄 소개를 입력해보세요."}
              </span>
            </div>
          </div>

          <div className="mx-auto h-10 max-h-10 max-w-[688px] px-4" />
        </div>
      </section>

      {/* 본문 폼: 분리된 컴포넌트 사용 */}
      <main className="w-full flex-1">
        <AccountProfileForm
          form={{
            email: form.email,
            nickname: form.nickname,
            intro: form.intro,
            realname: form.realname,
            birth: form.birth,
          }}
          disabled={isBusy}
          onChange={handleFormChange}
        />
      </main>
    </div>
  );
}
