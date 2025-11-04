import React from "react";
// นำเข้า Components หลักจาก React Bootstrap สำหรับการจัดเลย์เอาต์
import { Container, Row, Col, Navbar } from "react-bootstrap";

// นำเข้า Components ที่ใช้แสดงผลส่วนต่างๆ ของ Social Feed
import LeftSidebar from "../components/comSocialFeed/LeftSidebar"; // แถบด้านซ้าย
import Feed from "../components/comSocialFeed/Feed"; // ส่วนหลัก (Feed)
import RightSidebar from "../components/comSocialFeed/RightSidebar"; // แถบด้านขวา

// นำเข้าไฟล์ CSS เฉพาะสำหรับหน้านี้
import "../assets/css/SocialFeed.css";

//  Component หลัก: SocialFeed
const SocialFeed = () => {
  return (
    <>
      {/* Container fluid: กำหนดให้ Container มีความกว้างเต็มหน้าจอ (100%)
        pt-4 px-5: เพิ่ม Padding ด้านบน (p) ขนาด 4 และ Padding ซ้ายขวา (x) ขนาด 5 
      */}
      <Container fluid className="pt-4 px-5">
        {/* Row: แถวหลักสำหรับจัดวาง 3 คอลัมน์ (Sidebar ซ้าย, Feed กลาง, Sidebar ขวา) */}
        <Row>
          {/* Col md={2}: คอลัมน์ขนาด 2 สำหรับหน้าจอขนาดกลาง (md) ขึ้นไป
            d-none d-lg-block: ซ่อนคอลัมน์นี้ในทุกขนาดหน้าจอ 
            ยกเว้นจะแสดงผลในหน้าจอขนาดใหญ่ (lg) ขึ้นไปเท่านั้น (Left Sidebar จะหายไปในจอเล็กและกลาง)
          */}
          <Col md={2} className="d-none d-lg-block">
            <LeftSidebar /> {/* แสดง Left Sidebar */}
          </Col>

          {/* Col xs={12} lg={7}: คอลัมน์หลักสำหรับ Feed
            xs={12}: ในหน้าจอขนาดเล็กที่สุด (xs) และกลาง (md) จะใช้ความกว้างเต็ม 12 คอลัมน์
            lg={7}: ในหน้าจอขนาดใหญ่ (lg) ขึ้นไป จะใช้ความกว้าง 7 คอลัมน์ 
          */}
          <Col xs={12} lg={7}>
            <Feed /> {/* แสดง Feed หลัก */}
          </Col>

          {/* Col md={3}: คอลัมน์ขนาด 3 สำหรับหน้าจอขนาดกลาง (md) ขึ้นไป
            d-none d-md-block: ซ่อนคอลัมน์นี้ในหน้าจอขนาดเล็ก (xs) 
            และจะแสดงผลในหน้าจอขนาดกลาง (md) ขึ้นไปเท่านั้น
          */}
          <Col md={3} className="d-none d-md-block">
            <RightSidebar /> {/* แสดง Right Sidebar */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SocialFeed; // ส่งออก Component ให้สามารถนำไปใช้ในที่อื่นได้
