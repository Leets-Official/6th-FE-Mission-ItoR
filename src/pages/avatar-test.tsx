import React from "react";
import Avatar from "../components/Avatar/Avatar";
import { Link } from "react-router-dom";

const AvatarTest: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-3xl p-5 text-center">
        <div className="mb-10">
          <h3 className="mb-4 text-lg font-semibold">기본 이미지 (src 없이)</h3>
          <div className="flex justify-center">
            <Avatar size="md" alt="Default avatar" />
          </div>
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-lg font-semibold">다양한 크기 비교</h3>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Avatar size="xs" />
            <Avatar size="sm" />
            <Avatar size="md" />
            <Avatar size="lg" />
            <Avatar size="xl" />
          </div>
        </div>

        <Link to="/">
          <button className="bg-brand-blue rounded-md px-4 py-2 font-medium text-white hover:bg-blue-500">
            홈으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AvatarTest;
