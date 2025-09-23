import TextCard from "../components/common/TextCard";

export default function TextCardTestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-900 p-8">
      {/* 1번째 스타일 */}
      <TextCard
        variant="primary"
        title="32 Title one line"
        subtitle="subtitle one line"
      />

      {/* 2번째 스타일 */}
      <TextCard
        variant="secondary"
        title="16 Title one line"
        subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      />

      {/* 3번째 스타일 */}
      <TextCard variant="body">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </TextCard>
    </div>
  );
}
