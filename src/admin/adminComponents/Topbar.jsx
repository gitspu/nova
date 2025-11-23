import { Navbar, Container, Form } from "react-bootstrap";

/**
 * แถบด้านบนสำหรับ Admin Dashboard
 * ประกอบด้วย brand name และ search bar
 */
function Topbar() {
  return (
    <Navbar bg="white" className="border-bottom" sticky="top">
      <Container fluid>
        <Navbar.Brand className="fw-semibold">Admin Dashboard</Navbar.Brand>

        <Form className="ms-auto" role="search" aria-label="Quick search">
          <Form.Control size="sm" type="search" placeholder="Search..." />
        </Form>
      </Container>
    </Navbar>
  );
}

export default Topbar;
