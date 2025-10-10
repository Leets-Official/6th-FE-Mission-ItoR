import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ButtonTestPage from './pages/test/ButtonTestPage'
import ToastTestPage from './pages/test/ToastTestPage'
import MenuTestPage from './pages/test/MenuTestPage'
import TextCardTestPage from './pages/test/TextCardTestPage'
import ConfirmModalTestPage from './pages/test/ConfirmModalTestPage'
import HeaderTestPage from './pages/test/HeaderTestPage'
import DropdownTestPage from './pages/test/DropdownTestPage'
import TextFiledTestPage from './pages/test/TextFiledTestPage'
import TextFiledSetTestPage from './pages/test/TextFiledSetTestPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<div>홈 화면</div>} />
        <Route path='/test/button' element={<ButtonTestPage />} />
        <Route path='/test/toast' element={<ToastTestPage />} />
        <Route path='/test/menu' element={<MenuTestPage />} />
        <Route path='/test/textcard' element={<TextCardTestPage />} />
        <Route path='/test/confirmmodal' element={<ConfirmModalTestPage />} />
        <Route path='/test/header' element={<HeaderTestPage />} />
        <Route path='/test/dropdown' element={<DropdownTestPage />} />
        <Route path='/test/textfiled' element={<TextFiledTestPage />} />
        <Route path='/test/textfiledset' element={<TextFiledSetTestPage />} />
      </Routes>
    </Router>
  )
}

export default App
