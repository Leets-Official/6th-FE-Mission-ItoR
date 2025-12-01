// src/lib/imageUpload.ts
import api from "@src/api/client";

type PresignedUrlResponse = {
  code: number;
  message: string;
  data: string;
};

export async function requestPresignedUrl(fileName: string): Promise<string> {
  const res = await api.get<PresignedUrlResponse>("/images/presigned-url", {
    params: { fileName },
  });
  return res.data.data;
}

export async function uploadFileToS3(uploadUrl: string, file: File): Promise<void> {
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

export function extractFileUrlFromPresigned(presignedUrl: string): string {
  return presignedUrl.split("?")[0];
}
