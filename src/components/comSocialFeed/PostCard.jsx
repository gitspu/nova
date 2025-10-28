import React from "react";
// Import: Components หลักจาก React Bootstrap
import { Card, Button, Row, Col } from "react-bootstrap";
// Import: Icons สำหรับ Action Buttons
import {
  HandThumbsUp, // Like
  ChatText, // Comment
  Share, // Share
  Send, // Send
  PersonCircle, // Profile Avatar
} from "react-bootstrap-icons";

// Component: PostCard - แสดงผลโพสต์แต่ละรายการในหน้า Feed
const PostCard = () => {
  return (
    // Card Container: โพสต์แต่ละอัน
    <Card className="custom-card mb-4">
      {/* Card Header: ส่วนหัวของโพสต์ (ข้อมูลผู้ใช้) */}
      <Card.Header className="d-flex align-items-center bg-white border-0 p-3">
        {/* User Avatar */}
        <PersonCircle size={40} className="me-3 text-primary" />
        <div>
          {/* User Name */}
          <Card.Title className="mb-0 fs-6 fw-bold">**User Name**</Card.Title>
          {/* Metadata: ตำแหน่งงานและเวลาโพสต์ */}
          <Card.Subtitle className="text-muted small">
            Job Title • 1h ago
          </Card.Subtitle>
        </div>
      </Card.Header>

      {/* Card Body: ส่วนเนื้อหาโพสต์ */}
      <Card.Body className="pt-0 pb-2">
        {/* Post Text: เนื้อหาข้อความของโพสต์ */}
        <Card.Text className="text-dark">
          ตัวอย่างเนื้อหาโพสต์ #SmartPersona
        </Card.Text>

        {/* Post Media: รูปภาพ/วิดีโอ (Placeholder) */}
        <img
          src="https://via.placeholder.com/600x300/e0e0e0/555555?text=Post+Content"
          alt="Post Content"
          className="img-fluid rounded-3 mt-2"
        />
      </Card.Body>

      {/* Card Footer: Action Buttons (Like, Comment, Share, Send) */}
      <Card.Footer className="bg-white border-top border-light p-3">
        {/* Row: จัดเรียงปุ่มเป็น 4 คอลัมน์ (Col) */}
        <Row className="text-center">
          {/* Action: Like */}
          <Col>
            <Button variant="light" className="w-100 post-action-btn">
              <HandThumbsUp className="me-1" /> **Like**
            </Button>
          </Col>
          {/* Action: Comment */}
          <Col>
            <Button variant="light" className="w-100 post-action-btn">
              <ChatText className="me-1" /> **Comment**
            </Button>
          </Col>
          {/* Action: Share */}
          <Col>
            <Button variant="light" className="w-100 post-action-btn">
              <Share className="me-1" /> **Share**
            </Button>
          </Col>
          {/* Action: Send (Direct Message) */}
          <Col>
            <Button variant="light" className="w-100 post-action-btn">
              <Send className="me-1" /> **Send**
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
