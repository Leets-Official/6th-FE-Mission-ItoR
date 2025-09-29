// src/App.tsx
import TextBox from "@ui/TextBox";

export default function App() {
  return (
    <div className="min-h-dvh bg-gray-100 p-8">
      <div className="mx-auto max-w-[720px] space-y-4">
        {/* 1번 */}
        <TextBox
          tbStyle="primary"
          title="32 Title one line"
          description="subtitle one line"
        />

        {/* 2번 (한 줄 말줄임) */}
        <TextBox
          tbStyle="compact"
          title="16 Title one line"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  "
        />

        {/* 3번 */}
        <TextBox tbStyle="single" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  " />
      </div>
    </div>
  );
}
