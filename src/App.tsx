import { useState } from 'react';
import './App.css';
import Toast from './components/Toast';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-500">
        Hello, Tailwind CSS 4.0!
      </h1>
    </div>
    <div className="p-4 space-y-4">
</div>
    </>
  );
}

export default App;
