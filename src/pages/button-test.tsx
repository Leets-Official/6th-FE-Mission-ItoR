import React from "react";
import Button from "@/components/Button/Button";
import SmallButton from "@/components/SmallButton/SmallButton";
import CreateIcon from "@/assets/create.svg?react";
import { Link } from "react-router-dom";

export default function ButtonDemo() {
  const icon = <CreateIcon className="h-6 w-6 fill-current" />;
  const smallIcon = <CreateIcon className="h-4 w-4 fill-current" />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#efefef] p-8">
      <div className="flex max-w-md flex-col items-center space-y-6">
        <Button label="깃로그 시작하기" variant="primaryOutline" leftIcon={icon} />
        <Button label="깃로그 시작하기" variant="secondaryOutline" leftIcon={icon} />
        <Button label="깃로그 시작하기" variant="tertiary" leftIcon={icon} />
        <Button label="깃로그 시작하기" variant="neutral" leftIcon={icon} />
        <Button label="깃로그 시작하기" variant="disabled" leftIcon={icon} disabled />
        <Button label="깃로그 시작하기" variant="inverse" leftIcon={icon} />
        <Button label="깃로그 시작하기" variant="inverseMuted" leftIcon={icon} />
      </div>

      <div className="mt-[22px] mb-[22px] flex max-w-md flex-col items-center space-y-4">
        <SmallButton label="깃로그 시작하기" variant="secondaryOutline" leftIcon={smallIcon} />
        <SmallButton label="깃로그 시작하기" variant="disabled" leftIcon={smallIcon} disabled />
      </div>

      <Link to="/">
        <button className="bg-brand-blue rounded-md px-4 py-2 font-medium text-white hover:bg-blue-500">
          홈으로 돌아가기
        </button>
      </Link>
    </div>
  );
}
