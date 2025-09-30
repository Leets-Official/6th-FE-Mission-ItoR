import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ButtonTestPage from './pages/ButtonTestPage'
import ToastTestPage from './pages/ToastTestPage'
import MenuTestPage from './pages/MenuTestPage'
import TextCardTestPage from './pages/TextCardTestPage'
import ConfirmModalTestPage from './pages/ConfirmModalTestPage'
import HeaderTestPage from './pages/HeaderTestPage'
import DropdownTestPage from './pages/DropdownTestPage'
import TextFieldTestPage from './pages/TextFiledTestPage'
import TextFieldSetTestPage from './pages/TextFiledSetTestPage'

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
        <Route path='/test/textfield' element={<TextFieldTestPage />} />
        <Route path='/test/textfieldset' element={<TextFieldSetTestPage />} />
      </Routes>
    </Router>
  )
}

export default App
