import {
  PersonFill,
  TelephoneFill,
  GeoAltFill,
  CalendarEvent,
  GearFill,
} from "react-bootstrap-icons";
const Information = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="h5 mb-0 text-dark fw-semibold">ข้อมูลส่วนตัว</h3>
        <GearFill className="text-muted" size={18} />
      </div>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
          <span className="text-muted small d-flex align-items-center gap-2">
            <PersonFill size={16} />
            ชื่อเล่น
          </span>
          <span className="fw-medium text-dark">-</span>
        </div>
        <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
          <span className="text-muted small d-flex align-items-center gap-2">
            <CalendarEvent size={16} />
            วันเกิด
          </span>
          <span className="fw-medium text-dark">00/00/0000</span>
        </div>
        <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
          <span className="text-muted small d-flex align-items-center gap-2">
            <GeoAltFill size={16} />
            ที่อยู่
          </span>
          <span className="fw-medium text-dark">กรุงเทพมหานคร</span>
        </div>
        <div className="d-flex align-items-center justify-content-between py-2">
          <span className="text-muted small d-flex align-items-center gap-2">
            <TelephoneFill size={16} />
            ติดต่อ
          </span>
          <span className="fw-medium text-dark">-</span>
        </div>
      </div>
    </div>
  );
};

export default Information;
