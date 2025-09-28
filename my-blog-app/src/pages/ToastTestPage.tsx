import Toast from "../components/common/Toast";
import { WarningIcon } from "../assets/icons/WarningIcon";
import { CheckIcon } from "../assets/icons/CheckIcon";

export default function ToastTestPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Toast Test</h1>

      <div className="flex justify-center items-center gap-4">
        <Toast type="negative" message="내용을 입력해주세요" icon={<WarningIcon />} />
        <Toast type="positive" message="저장되었습니다!" icon={<CheckIcon />} />
      </div>
    </div>
  );
}
