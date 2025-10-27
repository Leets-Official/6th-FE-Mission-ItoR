import Toast from "../Toast";

const TestToast = () => {
  return (
    <div className="flex flex-col gap-3 p-6">
      <p className="text-lg font-semibold text-gray-700">Toast Component Test</p>
      
      <Toast variant="success" message="저장되었습니다!" />
      <Toast variant="warning" message="내용을 입력해주세요!" />
    </div>
  );
};

export default TestToast;