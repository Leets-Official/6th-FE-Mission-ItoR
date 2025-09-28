import TextField from "@ui/TextFiled";

function App() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-10 p-10 bg-gray-100">
      {/* Large (32 medium) 4가지 */}
      <div className="space-y-4">
        <TextField
          placeholder="Text filed"
          size="lg"
          tfStyle="placeholder"
        />
        <TextField
          placeholder="Text filed"
          size="lg"
          tfStyle="default"
        />
        <TextField
          placeholder="Text filed"
          size="lg"
          tfStyle="emphasis"
        />
        <TextField
          placeholder="Text filed"
          size="lg"
          tfStyle="disabled"
          disabled
        />
      </div>

      {/* Small (14 light) 4가지 */}
      <div className="space-y-4">
        <TextField
          placeholder="Text filed"
          size="sm"
          tfStyle="placeholder"
        />
        <TextField
          placeholder="Text filed"
          size="sm"
          tfStyle="default"
        />
        <TextField
          placeholder="Text filed"
          size="sm"
          tfStyle="emphasis"
        />
        <TextField
          placeholder="Text filed"
          size="sm"
          tfStyle="disabled"
          disabled
        />
      </div>
    </div>
  );
}

export default App;
