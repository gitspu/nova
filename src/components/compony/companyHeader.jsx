import React from "react";
import { Container, Button } from "react-bootstrap";
import { Briefcase } from "lucide-react";

// Header (ส่วนหัวสำหรับผู้ประกอบการ)
const companyHeader = ({ onToggleView, view }) => {
  return (
    // bg-primary คือ Mint Green
    <div className="bg-primary text-white py-4 shadow-lg">
      <Container className="position-relative px-lg-5">
        <div className="d-flex justify-content-between align-items-center">
           <h2 className="fw-bold h3 mb-0 text-white">Create Post Jobs</h2>
           <Button 
              variant="outline-light" 
              className="fw-bold rounded-pill px-4" 
              onClick={onToggleView}
           >
             <Briefcase size={18} className="me-2 mb-1"/> 
             {view === "history" ? "ลงประกาศงานใหม่" : "ประวัติการโพสต์งาน"}
           </Button>
        </div>
      </Container>
    </div>
  );
};

export default companyHeader;