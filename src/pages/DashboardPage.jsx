// src/pages/DashboardPage.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/comDashboard/SideBar.jsx';

function DashboardPage() {
  return (
    // <--- "d-flex" ที่ div หลักเพื่อให้ SideBar และ main อยู่ข้างกัน
    <div className="d-flex p-5 bg-light vh-100">
      {/* ส่วน Sidebar จะอยู่ทางซ้ายเสมอ */}
      <SideBar />
      
      {/* ส่วนเนื้อหาหลัก จะเปลี่ยนไปตาม Nested Route ที่เลือก */}
      {/* <--- "flex-grow-1" เพื่อให้ main ยืดเต็มพื้นที่ว่างด้านขวา */}
      <main className="bg-white rounded-end-4 shadow-sm p-3 flex-grow-1">
        <Outlet />
      </main>
      
    </div>
  );
}

export default DashboardPage;