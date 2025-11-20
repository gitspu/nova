// src/pages/DashboardPage.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/comDashboard/SideBar.jsx';
import NavbarTop from '../components/navbarTop.jsx'; 

function DashboardPage() {
  return (
    // ใช้ div ครอบอีกชั้นเพื่อให้ NavbarTop อยู่ด้านบนสุด
    <div className='vh-100'> 

      {/* 1. วาง NavbarTop ไว้ด้านบนสุดของ Layout */}
      <NavbarTop /> 

      {/* 2. div นี้คือส่วนที่เหลือของหน้า (SideBar + Main Content) */}
      <div className="d-flex bg-light flex-grow-1" style={{ height: 'calc(100% - 56px)' }}> 
        {/* *ใช้ style เพื่อคำนวณความสูงที่เหลือหลังจาก Navbar (สมมติ Navbar สูง 56px)* */}
        
        {/* ส่วน Sidebar จะอยู่ทางซ้ายเสมอ */}
        <SideBar />
        
        {/* ส่วนเนื้อหาหลัก */}
        {/* ลบ 'p-5' และ 'vh-100' ออกจาก div หลัก แล้วใช้พื้นที่ที่เหลือ */}
        <main className="bg-white rounded-end-4 shadow-sm p-3 flex-grow-1 overflow-auto"> 
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default DashboardPage;