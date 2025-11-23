import { Component } from "react";

/**
 * ErrorBoundary Component
 * จัดการ error ที่เกิดขึ้นใน child components
 * ป้องกันไม่ให้แอปพลิเคชันทั้งหมดล่ม และแสดง fallback UI แทน
 */
class ErrorBoundary extends Component {
  // สถานะสำหรับติดตามว่ามี error เกิดขึ้นหรือไม่
  state = {
    hasError: false,
    error: null,
  };

  /**
   * อัปเดต state เมื่อมี error เกิดขึ้น
   * เรียกใช้โดย React เมื่อ child component โยน error
   */
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  }

  /**
   * บันทึก error details สำหรับ debugging
   * เรียกใช้หลังจาก getDerivedStateFromError
   */
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary จับ error ได้:", error, errorInfo);
  }

  render() {
    // ถ้ามี error เกิดขึ้น แสดง fallback UI
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16 }}>
          <h4>เกิดข้อผิดพลาดบางอย่าง</h4>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {String(this.state.error)}
          </pre>
        </div>
      );
    }

    // ถ้าไม่มี error แสดง children ตามปกติ
    return this.props.children;
  }
}

export default ErrorBoundary;
