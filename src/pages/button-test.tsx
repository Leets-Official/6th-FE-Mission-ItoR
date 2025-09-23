import React from "react";
import Button from "@/components/Button/Button";
import SmallButton from "@/components/Button/SmallButton";
import CreateIcon from "@/assets/create.svg?react";
import { Link } from "react-router-dom";

export default function ButtonDemo() {
    const icon = <CreateIcon className="w-6 h-6 fill-current" />;
    const smallIcon = <CreateIcon className="w-4 h-4 fill-current" />;

    return (
        <div className="min-h-screen bg-[#efefef] flex flex-col items-center justify-center p-8">
            <div className="flex flex-col items-center space-y-6 max-w-md">
                <Button label="깃로그 시작하기" variant="primaryOutline" leftIcon={icon} />
                <Button label="깃로그 시작하기" variant="secondaryOutline" leftIcon={icon} />
                <Button label="깃로그 시작하기" variant="tertiary" leftIcon={icon} />
                <Button label="깃로그 시작하기" variant="neutral" leftIcon={icon} />
                <Button label="깃로그 시작하기" variant="disabled" leftIcon={icon} />
                <Button label="깃로그 시작하기" variant="inverse" leftIcon={icon} />
                <Button label="깃로그 시작하기" variant="inverseMuted" leftIcon={icon} />
            </div>

            <div className="flex flex-col items-center space-y-4 max-w-md mt-[22px] ">
                <SmallButton
                    label="깃로그 시작하기"
                    variant="secondaryOutline"
                    leftIcon={smallIcon}
                />
                <SmallButton
                    label="깃로그 시작하기"
                    variant="disabled"
                    leftIcon={smallIcon}
                    disabled
                />
            </div>

            <Link to="/" className="mt-[22px]">
                <button className="underline text-blue-600 hover:text-blue-800">
                    홈으로 돌아가기
                </button>
            </Link>
        </div>
    );
}
