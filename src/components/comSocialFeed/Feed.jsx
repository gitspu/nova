import React from "react";
// Import: Components หลักจาก React Bootstrap
import { Card, Form, InputGroup, Button } from "react-bootstrap";
// Import: Icons สำหรับปุ่มสร้างโพสต์
import {
  Image, // Photo
  PlayBtn, // Video
  CalendarDate, // Event
  PencilSquare, // Article
  Send, // Send Button
} from "react-bootstrap-icons";
// Import: Component สำหรับแสดงโพสต์แต่ละรายการ
import PostCard from "./PostCard";

// Component: Feed - แสดงส่วนหลักของฟีด (กล่องสร้างโพสต์ + รายการโพสต์)
const Feed = () => {
  return (
    <div>
      {/* Card 1: Create Post Area (กล่องสำหรับสร้างโพสต์ใหม่) */}
      <Card className="feed-card p-3 mb-4">
        {/* Row 1: Avatar และ Input Field */}
        <div className="d-flex align-items-center mb-3">
          {/* User Avatar */}
          <img
            src="https://via.placeholder.com/50/6c5ce7/FFFFFF?text=P"
            alt="User Avatar"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          {/* Input Group: ช่องกรอกข้อความโพสต์ */}
          <InputGroup>
            <Form.Control
              placeholder="Start a post"
              className="post-input-box"
            />
          </InputGroup>
        </div>

        {/* Row 2: Action Buttons และปุ่ม Send */}
        <div className="d-flex justify-content-between border-top pt-2">
          {/* Action Buttons: Photo, Video, Event, Article */}
          <div className="d-flex gap-1">
            <Button variant="light">
              <Image className="me-2 text-info" /> **Photo**
            </Button>
            <Button variant="light">
              <PlayBtn className="me-2 text-success" /> **Video**
            </Button>
            <Button variant="light">
              <CalendarDate className="me-2 text-warning" /> **Event**
            </Button>
            <Button variant="light">
              <PencilSquare className="me-2 text-danger" /> **Article**
            </Button>
          </div>

          {/* Send Button: ปุ่มสำหรับส่งโพสต์ */}
          <Button
            variant="dark"
            className="rounded-pill px-4 fw-bold align-self-center"
          >
            Send <Send className="ms-1" />
          </Button>
        </div>
      </Card>

      {/* Feed Divider: ส่วนแสดงตัวกรอง/การเรียงลำดับโพสต์ */}
      <div className="text-center my-3 border-bottom pb-2">
        <span className="text-muted small fw-bold">
          Sort by: <span className="text-primary">Top</span>
        </span>
      </div>

      {/* Post List: แสดงรายการโพสต์ที่ดึงมาจาก PostCard Component */}
      <PostCard />
      <PostCard />
      <PostCard />
      {/* หมายเหตุ: ในแอปพลิเคชันจริง ส่วนนี้ควรใช้ map() loop เพื่อแสดงรายการโพสต์จาก State/API */}
    </div>
  );
};

export default Feed;
