import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom'; 

const NavbarTop = () => { // 💡 เปลี่ยนชื่อฟังก์ชันเป็น PascalCase ตามหลักการตั้งชื่อ Component
    const mintGreenHex = '#98FF98';
    
    return (
        // ❌ ลบ <div> ออก เพื่อให้โค้ดสะอาดขึ้น (Navbar สามารถเป็น Root Element ได้)
        <Navbar 
            style={{ backgroundColor: mintGreenHex }} 
            data-bs-theme="light"
            expand="lg" // 🌟 เพิ่ม expand เพื่อให้มี Hamburger Menu บนหน้าจอมือถือ
            sticky="top" // 🌟 ทำให้ Navbar ติดอยู่ด้านบนเมื่อ Scroll
        >
            <Container fluid> {/* 🌟 ใช้ fluid เพื่อให้ Navbar กว้างเต็มจอ */}
                
                {/* 1. Brand/Logo (ลิงก์ไปยังหน้าหลัก) */}
                <Navbar.Brand as={Link} to="/">
                    **NOVA**
                </Navbar.Brand>
                
                {/* 2. Hamburger Menu Toggle สำหรับมือถือ */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* 3. ส่วน Link ตรงกลาง (className="me-auto") */}
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to=""> {/* ลิงก์ไปยัง Layout Resume */}
                            สร้างโปรไฟล์
                        </Nav.Link>
                        <Nav.Link as={NavLink} to=""> {/* ลิงก์ไปยัง SocialFeed */}
                            ค้นหางาน
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/viewprofile"> {/* ลิงก์ไปยัง Profile */}
                            ค้นหาโปรไฟล์
                        </Nav.Link>
                    </Nav>

                    {/* 4. ส่วน Link ขวา (สำหรับ Profile/Logout) */}
                    <Nav>
                         <Nav.Link as={NavLink} to="/">
                            เข้าสู่ระบบ/สมัคร
                        </Nav.Link>
                        {/* 💡 ถ้าผู้ใช้ Login แล้ว อาจจะเปลี่ยนเป็นลิงก์ไปที่ Profile */}
                        {/* <Nav.Link as={NavLink} to="/profile">
                            <i className="bi bi-person-circle"></i> ชื่อผู้ใช้
                        </Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default NavbarTop; 