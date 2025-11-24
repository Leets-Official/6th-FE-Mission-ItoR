// src/api/image/imageApi.ts
import api from "@src/api/client";

type PresignedResponse = {
  code: number | string;
  message: string;
  data: string; // presigned PUT URL
};

/**
 * 프리사인 URL 발급: GET /images/presigned-url?fileName=xxx
 */
export async function getPresignedUrl(fileName: string): Promise<string> {
  const res = await api.get<PresignedResponse>("/images/presigned-url", {
    params: { fileName },
  });

  return res.data.data; // presigned PUT URL
}

/**
 * 파일을 프리사인 URL로 업로드하고,
 * 최종 사용할 이미지 URL(S3 GET용 URL)을 반환
 */
export async function uploadImageToPresignedUrl(
  file: File
): Promise<string> {
  // 1) presigned PUT URL 발급
  const presignedUrl = await getPresignedUrl(file.name);

  // 2) S3 presigned URL로 직접 업로드 (PUT)
  const res = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
  });

  if (!res.ok) {
    throw new Error("이미지 업로드에 실패했습니다.");
  }

  // 3) 최종 이미지 URL은 보통 쿼리스트링 제거한 형태를 사용
  const urlWithoutQuery = presignedUrl.split("?")[0];
  return urlWithoutQuery;
}
