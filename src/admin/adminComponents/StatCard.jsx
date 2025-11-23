import { Card } from "react-bootstrap";

/**
 * แสดงสถิติในรูปแบบการ์ด
 *
 * @param {Component} icon - Icon component
 * @param {string} title - หัวข้อสถิติ
 * @param {number|string} value - ค่าสถิติ
 * @param {string} color - สีของ icon (default: "primary")
 * @param {string} footer - ข้อความเพิ่มเติมด้านล่าง (optional)
 */
export default function StatCard({
  icon: Icon,
  title,
  value,
  color = "primary",
  footer,
}) {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <div className="text-muted small">{title}</div>
          <div className="h5 mb-0">{value}</div>
          {footer && <div className="text-muted small">{footer}</div>}
        </div>

        {Icon && (
          <div className={`text-${color}`}>
            <Icon size={28} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
