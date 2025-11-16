// src/api/image/imageApi.ts
import axios from "axios";

// 프리사인 URL 발급: GET /images/presigned-url?fileName=xxx
export async function getPresignedUrl(fileName: string): Promise<string> {
  const res = await axios.get("https://blog.leets.land/images/presigned-url", {
  params: { fileName },
  });

  return res.data.data;
}

// 파일을 프리사인 URL로 업로드하고, 최종 사용할 이미지 URL을 반환
export async function uploadImageToPresignedUrl(file: File): Promise<string> {
  const presignedUrl = await getPresignedUrl(file.name);

  // S3 presigned URL로 직접 업로드 
  await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
  });

  const urlWithoutQuery = presignedUrl.split("?")[0];
  return urlWithoutQuery;
}
