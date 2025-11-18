import {
  BriefcaseFill,
  MortarboardFill,
  AwardFill,
  GearFill,
} from "react-bootstrap-icons";
const AddInformations = () => {
  return (
    <div className="row g-4">
      {/* Work Experience Card */}
      <div className="col-md-6">
        <div className="card border shadow-sm h-100 hover-shadow transition">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className="p-2 bg-primary bg-opacity-10 rounded">
                  <BriefcaseFill className="text-primary" size={20} />
                </div>
                <h5 className="card-title mb-0 fw-semibold">ประวัติการทำงาน</h5>
              </div>
              <button className="btn btn-link text-warning text-decoration-none p-0 fw-medium">
                + เพิ่ม
              </button>
            </div>
            <p className="card-text text-muted small mb-0">
              เพิ่มประสบการณ์การทำงานของคุณ
            </p>
          </div>
        </div>
      </div>

      {/* Education Card */}
      <div className="col-md-6">
        <div className="card border shadow-sm h-100 hover-shadow transition">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className="p-2 bg-success bg-opacity-10 rounded">
                  <MortarboardFill className="text-success" size={20} />
                </div>
                <h5 className="card-title mb-0 fw-semibold">ข้อมูลการศึกษา</h5>
              </div>
              <button  className="btn btn-link text-warning text-decoration-none p-0 fw-medium">
                + เพิ่ม
              </button>
            </div>
            <p className="card-text text-muted small mb-0">
              เพิ่มประวัติการศึกษาของคุณ
            </p>
          </div>
        </div>
      </div>

      {/* Certification Card */}
      <div className="col-md-6">
        <div className="card border shadow-sm h-100 hover-shadow transition">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="p-2"
                  style={{
                    backgroundColor: "rgba(111, 66, 193, 0.1)",
                    borderRadius: "0.375rem",
                  }}
                >
                  <AwardFill style={{ color: "#6f42c1" }} size={20} />
                </div>
                <h5 className="card-title mb-0 fw-semibold">ใบประกาศนียบัตร</h5>
              </div>
              <button
                className="btn btn-link text-warning text-decoration-none p-0 fw-medium"
              >
                + เพิ่ม
              </button>
            </div>
            <p className="card-text text-muted small mb-0">
              เพิ่มใบอนุญาตหรือใบประกาศนียบัตร
            </p>
          </div>
        </div>
      </div>

      {/* Skills Card */}
      <div className="col-md-6">
        <div className="card border shadow-sm h-100 hover-shadow transition">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className="p-2 bg-warning bg-opacity-10 rounded">
                  <GearFill className="text-warning" size={20} />
                </div>
                <h5 className="card-title mb-0 fw-semibold">ทักษะ</h5>
              </div>
              <button className="btn btn-link text-warning text-decoration-none p-0 fw-medium">
                + เพิ่ม
              </button>
            </div>
            <p className="card-text text-muted small mb-0">
              เพิ่มทักษะและความสามารถของคุณ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInformations;
