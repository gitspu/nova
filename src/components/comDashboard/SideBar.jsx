// src/components/comDashboard/SideBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// icons
import { MdHomeFilled } from "react-icons/md";

function SideBar() {
  return (
    <Container
      fluid
      className="d-flex flex-column rounded-start-4 shadow-sm p-3 bg-light-subtle"
      style={{ width: "250px" }}
    >
      {/* โลโก้ */}
      <div className="mb-3">
        <h2
          className="fw-bold ms-4"
          style={{
            color: "#1ABC9C",
          }}
        >
          LOGO
        </h2>
      </div>

      {/* เมนู */}
      <Nav className="flex-column">
        {[
          { to: "dashboard", label: "Dashboard", icon: <MdHomeFilled /> },
          { to: "b", label: "B" },
          { to: "c", label: "C" },
          { to: "d", label: "D" },
          { to: "e", label: "E" },
        ].map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `fs-5 mb-2 p-3 py-2 rounded-1 d-flex align-items-center text-decoration-none ${
                isActive ? "active-link" : "text-muted"
              }`
            }
            style={({ isActive }) =>
              isActive ? { backgroundColor: "#E0ECEA", color: "#66CDAA" } : {}
            }
          >
            {/* ปรับขนาดไอคอน */}
            {icon && (
              <span
                className="d-flex align-items-center"
                style={{ fontSize: "1.5rem", color: "inherit" }}
              >
                {icon}
              </span>
            )}
            <span className="ms-2" style={{ color: "inherit" }}>
              {label}
            </span>
          </NavLink>
        ))}
      </Nav>
    </Container>
  );
}

export default SideBar;
