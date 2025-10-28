import React from "react";
// Import: Components หลักจาก React Bootstrap
import { Card, ListGroup, Button } from "react-bootstrap";
// Import: Icons สำหรับเมนูและข้อมูลโปรไฟล์
import {
  BookmarkFill, // Saved Posts
  BoxArrowRight, // Logout
  PeopleFill, // Groups
  Newspaper, // Newsletters
  CalendarEvent, // Events
  GeoAltFill, // Location
} from "react-bootstrap-icons";
// Import: Link สำหรับการทำ Client-side Routing ไปหน้าโปรไฟล์
import { Link } from "react-router-dom";

// Component: LeftSidebar - แสดงข้อมูลโปรไฟล์และเมนูนำทางด้านซ้าย
const LeftSidebar = () => {
  // Handler: จัดการการคลิกปุ่มเพิ่มประสบการณ์
  const handleAddExperience = () => {
    // Logic: ควรเรียกใช้ Modal เพื่อกรอกข้อมูลประสบการณ์
    console.log("Action: Open Add Experience Form");
    alert("Placeholder: Experience form will open here.");
  };

  return (
    // Layout Container: กำหนดให้ Component 'sticky' อยู่ด้านบนของ Viewport
    <div className="sticky-top d-grid gap-3" style={{ top: "20px" }}>
      {/* Card 1: User Profile and Logout Section */}
      <Card className="custom-card">
        <div className="text-center p-3">
          {/* Link Area: ข้อมูลที่คลิกได้เพื่อนำไปหน้า Profile */}
          <Link to="/profile" className="text-decoration-none d-block">
            {/* Image: รูป Avatar ของผู้ใช้ **(ส่วนที่เพิ่มกลับมา)** */}
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Profile"
              className="profile-avatar img-fluid"
            />
            {/* User Avatar, Name, Job Title, and Location */}
            <Card.Title className="fw-bold text-dark mt-2 mb-0">
              Name Surname
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Job Title / Tagline
            </Card.Subtitle>
            <div className="text-muted small mb-3">
              <GeoAltFill className="me-1" /> Bangkok, Thailand
            </div>
          </Link>

          {/* Action Button: ปุ่มสำหรับเพิ่มประสบการณ์/ทักษะ */}
          <Button
            className="btn-dashed"
            variant="outline-secondary"
            onClick={handleAddExperience}
          >
            + ประสบการณ์
          </Button>
        </div>

        {/* ListGroup: Logout Link (แยกออกมาจากเมนูหลัก) */}
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            className="custom-list-item text-danger fw-bold"
          >
            <BoxArrowRight className="me-2" />
            **Logout**
          </ListGroup.Item>
        </ListGroup>
      </Card>

      {/* Card 2: Main Navigation Links */}
      <Card className="custom-card">
        <ListGroup variant="flush">
          {/* Menu Item: Saved Posts */}
          <ListGroup.Item action className="custom-list-item fw-bold">
            <BookmarkFill className="me-2" />
            **Saved Posts**
          </ListGroup.Item>
          {/* Menu Item: Groups */}
          <ListGroup.Item action className="custom-list-item fw-bold">
            <PeopleFill className="me-2" />
            **Groups**
          </ListGroup.Item>
          {/* Menu Item: Newsletters */}
          <ListGroup.Item action className="custom-list-item fw-bold">
            <Newspaper className="me-2" />
            **Newsletters**
          </ListGroup.Item>
          {/* Menu Item: Events */}
          <ListGroup.Item action className="custom-list-item fw-bold">
            <CalendarEvent className="me-2" />
            **Events**
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default LeftSidebar;
