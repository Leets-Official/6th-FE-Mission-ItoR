// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { Pencil } from "lucide-react";
import Button from "./components/Button";
import Toast from "./components/Toast"; 
import Modal from "./components/Modal";
import Header from './components/Header';
import PaginationLeft from './components/PaginationLeft';
import PaginationRight from './components/PaginationRight';
import Pagination from './components/Pagination';

function App() {
  return (
    <>
      <p>Header Component</p>
      <div className="flex flex-col gap-6 p-6">
        <Header variant="write" />
        <Header variant="detail" />
        <Header variant="edit" />
      </div>

      <p>Button Component</p>
      <div className="flex flex-col gap-3 p-6">
        <Button variant="blueBorder" icon={<Pencil />}>깃로그 시작하기</Button>
        <Button variant="grayBorder" icon={<Pencil />}>깃로그 시작하기</Button>
        <Button variant="whiteGrayIcon" icon={<Pencil />}>깃로그 시작하기</Button>
        <Button variant="lightGray" icon={<Pencil />}>깃로그 시작하기</Button>
        <Button variant="grayBorderLightBg" icon={<Pencil />}>깃로그 시작하기</Button>
        <Button variant="blackWhite" icon={<Pencil />}>깃로그 시작하기</Button>
        <Button variant="blackGray" icon={<Pencil />}>깃로그 시작하기</Button>
      </div>

      <p>Toast Component</p>
      <div className="flex flex-col gap-3 p-6">
        <Toast variant="success" />
        <Toast variant="warning" />
      </div>  
      <p>Modal Component</p>
      <div className="p-6 flex flex-col gap-4">
      <Modal 
        titleLine1="Title line one" 
        titleLine2="Title line two" 
        description="설명문 예시입니다." 
      />
      <Modal 
        titleLine1="Title line one" 
        titleLine2="Title line two" 
      />
    </div>

    <p>Pagination Component</p>
    <div className="flex gap-2">
      <PaginationLeft variant="grayBlack" />
      <Pagination variant="blueBlue" />
      <PaginationRight variant="blueBlue" />
      <PaginationLeft variant="grayGray" />
      <PaginationRight variant="grayGray" />
      
    </div>
    </>
  )
}

export default App
