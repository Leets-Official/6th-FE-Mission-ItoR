import { createBrowserRouter } from 'react-router-dom'
import ButtonTestPage from '../pages/test/ButtonTestPage'
import ToastTestPage from '../pages/test/ToastTestPage'
import MenuTestPage from '../pages/test/MenuTestPage'
import TextCardTestPage from '../pages/test/TextCardTestPage'
import ConfirmModalTestPage from '../pages/test/ConfirmModalTestPage'
import HeaderTestPage from '../pages/test/HeaderTestPage'
import DropdownTestPage from '../pages/test/DropdownTestPage'
import TextFiledTestPage from '../pages/test/TextFiledTestPage'
import TextFiledSetTestPage from '../pages/test/TextFiledSetTestPage'

const router = createBrowserRouter([
  { path: '/', element: <div>홈 화면</div> },
  { path: '/test/button', element: <ButtonTestPage /> },
  { path: '/test/toast', element: <ToastTestPage /> },
  { path: '/test/menu', element: <MenuTestPage /> },
  { path: '/test/textcard', element: <TextCardTestPage /> },
  { path: '/test/confirmmodal', element: <ConfirmModalTestPage /> },
  { path: '/test/header', element: <HeaderTestPage /> },
  { path: '/test/dropdown', element: <DropdownTestPage /> },
  { path: '/test/textfiled', element: <TextFiledTestPage /> },
  { path: '/test/textfiledset', element: <TextFiledSetTestPage /> },
])

export default router
