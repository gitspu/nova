import Information from "./Informations";
import AddInformations from "./AddInformations";
import { useState } from "react";
import {
  PersonFill,
  EnvelopeFill,
  CameraFill,
  PencilFill,
  CheckLg,
  XLg,
} from "react-bootstrap-icons";

const Profile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const [profile, setProfile] = useState({
    name: "ชื่อ - นามสกุล",
    email: "อีเมล@example.com",
    image: null,
    coverImage: null,
  });

  const [isHoveringCover, setIsHoveringCover] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, image: imageURL }));
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, coverImage: imageURL }));
    }
  };

  const handleSave = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <style>{`
        .hover-shadow {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
          transform: translateY(-2px);
        }
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .profile-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }
        .camera-overlay {
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .btn-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          background: linear-gradient(135deg, #5568d3 0%, #653a8b 100%);
          transform: translateY(-1px);
          box-shadow: 0 0.5rem 1rem rgba(102, 126, 234, 0.4);
        }
      `}</style>

      <div
        className="min-vh-100 bg-light py-4"
        style={{
          background: "linear-gradient(to bottom right, #f8f9fa, #e9ecef)",
        }}
      >
        <div className="container">
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 fw-bold text-dark d-flex align-items-center gap-2">
              <PersonFill className="text-primary" size={32} />
              โปรไฟล์
            </h1>
          </div>

          <main className="row g-4">
            <aside className="col-lg-4">
              {/* Profile Card */}
              <div className="card border-0 shadow-lg mb-4 overflow-hidden">
                {/* Header Background - Editable Cover */}
                <label
                  htmlFor="uploadCover"
                  style={{
                    cursor: "pointer",
                    display: "block",
                    position: "relative",
                  }}
                  onMouseEnter={() => setIsHoveringCover(true)}
                  onMouseLeave={() => setIsHoveringCover(false)}
                >
                  <div
                    className="position-relative overflow-hidden"
                    style={{ height: "140px" }}
                  >
                    {profile.coverImage ? (
                      <img
                        src={profile.coverImage}
                        alt="cover"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div className="profile-gradient w-100 h-100"></div>
                    )}

                    {/* Dark overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.1)",
                      }}
                    ></div>

                    {/* Camera Overlay for Cover */}
                    <div
                      className="camera-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-2"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        opacity: isHoveringCover ? 1 : 0,
                      }}
                    >
                      <CameraFill className="text-white" size={32} />
                      <span className="text-white fw-medium small">
                        เปลี่ยนรูป
                      </span>
                    </div>
                  </div>
                </label>
                <input
                  id="uploadCover"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleCoverImageChange}
                />

                <div className="card-body px-4 pb-4">
                  {/* Profile Picture */}
                  <label
                    htmlFor="uploadProfile"
                    style={{ cursor: "pointer", display: "block" }}
                    onMouseEnter={() => setIsHoveringImage(true)}
                    onMouseLeave={() => setIsHoveringImage(false)}
                  >
                    <div
                      className="position-relative d-inline-block"
                      style={{ marginTop: "-64px" }}
                    >
                      <div
                        className="rounded-circle overflow-hidden border border-4 border-white shadow-lg"
                        style={{
                          width: "128px",
                          height: "128px",
                          transition: "transform 0.3s ease",
                          transform: isHoveringImage
                            ? "scale(1.05)"
                            : "scale(1)",
                        }}
                      >
                        {profile.image ? (
                          <img
                            src={profile.image}
                            alt="profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div className="gradient-bg w-100 h-100 d-flex align-items-center justify-content-center">
                            <PersonFill className="text-white" size={48} />
                          </div>
                        )}
                      </div>

                      {/* Camera Overlay */}
                      <div
                        className="camera-overlay position-absolute top-0 start-0 w-100 h-100 rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          opacity: isHoveringImage ? 1 : 0,
                        }}
                      >
                        <CameraFill className="text-white" size={32} />
                      </div>
                    </div>
                  </label>

                  <input
                    id="uploadProfile"
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageChange}
                  />

                  {/* Profile Info */}
                  <div className="text-center mt-4">
                    <h2 className="h5 fw-bold text-dark mb-1">
                      {profile.name}
                    </h2>
                    <p className="text-muted d-flex align-items-center justify-content-center gap-2 mb-4">
                      <EnvelopeFill size={16} />
                      {profile.email}
                    </p>

                    <button
                      className="btn btn-gradient text-white w-100 py-2 fw-medium d-flex align-items-center justify-content-center gap-2"
                      onClick={() => setShowEditModal(true)}
                    >
                      <PencilFill size={18} />
                      แก้ไขโปรไฟล์
                    </button>
                  </div>
                </div>
              </div>

              <Information />
            </aside>

            <section className="col-lg-8">
              <AddInformations />
            </section>
          </main>

          {/* Modal */}
          {showEditModal && (
            <div
              className="modal d-block"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onClick={() => setShowEditModal(false)}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-content border-0 shadow-lg rounded-3">
                  {/* Modal Header */}
                  <div className="modal-header border-bottom">
                    <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                      <PencilFill className="text-primary" size={20} />
                      แก้ไขโปรไฟล์
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowEditModal(false)}
                    ></button>
                  </div>

                  {/* Modal Body */}
                  <div className="modal-body p-4">
                    <div className="mb-3">
                      <label className="form-label fw-medium d-flex align-items-center gap-2">
                        <PersonFill size={16} />
                        ชื่อ - นามสกุล
                      </label>
                      <input
                        type="text"
                        className="form-control py-2"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium d-flex align-items-center gap-2">
                        <EnvelopeFill size={16} />
                        อีเมล
                      </label>
                      <input
                        type="email"
                        className="form-control py-2"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="modal-footer bg-light border-top">
                    <button
                      className="btn btn-secondary d-flex align-items-center gap-2"
                      onClick={() => setShowEditModal(false)}
                    >
                      <XLg size={16} />
                      ยกเลิก
                    </button>
                    <button
                      className="btn btn-gradient text-white d-flex align-items-center gap-2"
                      onClick={handleSave}
                    >
                      <CheckLg size={16} />
                      บันทึก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
