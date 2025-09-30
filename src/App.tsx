import { useState } from 'react'
import './App.css'
import Toast from './components/Toast';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        <Toast type="success" message="저장되었습니다!" />
        <Toast type="warning" message="오류가 발생했습니다!" />
      </p>
    </>
  )
}

export default App
