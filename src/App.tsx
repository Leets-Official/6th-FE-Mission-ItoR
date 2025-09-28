import Dropdown from "@ui/Dropdown";

function App() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-100 p-10">
      <Dropdown
  trigger={<div className="px-3 py-2 rounded border bg-white">열기</div>}
  items={[
    { id: "m1", label: "menu 1", onSelect: () => console.log("menu 1") },
    { id: "m2", label: "menu 2", onSelect: () => console.log("menu 2") },
    { id: "m3", label: "menu 3", disabled: true },
  ]}
  position="right"
  showArrow={true}
  caretOffsetX={20}
/>
    </div>
  );
}

export default App;
