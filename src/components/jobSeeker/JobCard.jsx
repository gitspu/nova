import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { MapPin } from "lucide-react";

// JobCard (การ์ดงานแต่ละรายการ)
const JobCard = ({ data, isActive, onClick, isSaved }) => {
  return (
    <Card
      // ใช้ border-primary (Mint Green)
      className={`mb-3 shadow-sm transition-all ${
        isActive ? "border-primary border-4 border-start bg-light" : ""
      }`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="p-3">
        <Row>
          <Col xs={9}>
            <div className="d-flex align-items-start justify-content-between">
              <h6
                className={`fw-bold mb-1 ${
                  // ใช้ text-primary (Mint Green)
                  isActive ? "text-primary" : "text-dark"
                }`}
                style={{ fontSize: "1.1rem" }}
              >
                {data.title}
              </h6>
            </div>

            <div className="text-dark mb-2 fw-medium">{data.company}</div>

            <div className="d-flex gap-2 mb-2">
              {data.isNew && (
                <Badge
                  bg="light"
                  // ใช้ text-success (Teal)
                  text="success"
                  // ใช้ border-success (Teal)
                  className="border border-success rounded-pill fw-normal px-2"
                >
                  ใหม่
                </Badge>
              )}
              {isSaved && (
                <Badge
                  // ใช้ bg-danger (Teal)
                  bg="danger"
                  className="rounded-pill"
                >
                  บันทึกแล้ว
                </Badge>
              )}
            </div>

            <div className="text-secondary small mb-2 d-flex align-items-center gap-1">
              <MapPin size={14} /> {data.location}
            </div>

            {/* ส่วนสรุปย่อ (Snippet) */}
            <div
              className="text-muted small"
              style={{ fontSize: "0.85rem", lineHeight: "1.4" }}
            >
              {data.snippet}
            </div>

            <div className="text-muted mt-2" style={{ fontSize: "0.75rem" }}>
              {data.posted} • {data.salary}
            </div>
          </Col>

          {/* Logo บริษัท */}
          <Col
            xs={3}
            className="text-end d-flex flex-column justify-content-between align-items-end"
          >
            <img
              src={data.logoUrl}
              alt="logo"
              className="rounded-1 border p-1"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
                backgroundColor: "white",
              }}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default JobCard;