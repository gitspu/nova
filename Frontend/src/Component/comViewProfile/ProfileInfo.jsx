import { useState, useMemo } from "react";
import profilesDatas from "./profilesDatas";
import { Badge, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Import รูปภาพ Resume
const resumeImages = import.meta.glob(
  "/src/Asset/resumepicture/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const resumePathMap = Object.keys(resumeImages).reduce((acc, path) => {
  const fileName = path.split("/").pop();
  acc[fileName] = resumeImages[path].default;
  return acc;
}, {});

// Import รูปภาพ Profile Picture
const profileImages = import.meta.glob(
  "/src/asset/profilepicture/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const profilePathMap = Object.keys(profileImages).reduce((acc, path) => {
  const fileName = path.split("/").pop();
  acc[fileName] = profileImages[path].default;
  return acc;
}, {});

const ProfileInfo = ({ setPic }) => {
  const [selectedId, setSelectedId] = useState(profilesDatas[0]?.id || null);

  // ดึง job จาก data
  const allJobs = useMemo(() => {
    return [...new Set(profilesDatas.map((p) => p.job))];
  }, []);

  // state สำหรับ checkbox ที่กำลังเลือก
  const [tempSelected, setTempSelected] = useState([]);

  // state สำหรับ filter
  const [activeFilter, setActiveFilter] = useState([]);

  // toggle checkbox
  const toggleJob = (job) => {
    setTempSelected((prev) =>
      prev.includes(job) ? prev.filter((j) => j !== job) : [...prev, job]
    );
  };

  // Apply filter
  const applyFilter = () => {
    setActiveFilter(tempSelected);
  };

  // Clear filter
  const clearFilter = () => {
    setTempSelected([]);
    setActiveFilter([]);
  };

  // Filter profiles
  const filteredProfiles =
    activeFilter.length === 0
      ? profilesDatas
      : profilesDatas.filter((p) => activeFilter.includes(p.job));

  return (
    <div className="border rounded p-3 bg-white">
      {/*======================================= FILTER DROPDOWN =======================================*/}
      <div className="d-flex justify-content-between mb-3">
        <DropdownButton id="dropdown-basic-button" title="ทักษะ" variant="success">
          {allJobs.map((job) => (
            <Dropdown.Item
              key={job}
              as="div"
              onClick={(e) => e.stopPropagation()}
              className="d-flex align-items-center gap-2"
            >
              <input
                type="checkbox"
                checked={tempSelected.includes(job)}
                onChange={() => toggleJob(job)}
              />
              {job}
            </Dropdown.Item>
          ))}

          <Dropdown.Divider />

          <div className="px-3 pb-2 d-flex gap-2">
            <Button variant="primary" size="sm" onClick={applyFilter}>
              ยืนยัน
            </Button>

            <Button variant="secondary" size="sm" onClick={clearFilter}>
              ล้าง
            </Button>
          </div>
        </DropdownButton>
      </div>
      {/*======================================= FILTER DROPDOWN =======================================*/}

      {/*========================================= CARD LIST ===========================================*/}
      <div
        className="d-flex flex-column gap-3"
        style={{
          cursor: "pointer",
          minWidth: "430px",
          maxWidth: "450px",
        }}
      >
        {filteredProfiles.map((profileData) => {
          const isSelected = profileData.id === selectedId;
          const currentProfilePic =
            profilePathMap[profileData.profilePicFileName];

          return (
            <div
              key={profileData.id}
              // ไฮไลท์ Card ที่เลือก
              className={`d-flex gap-3 p-3 border rounded bg-light ${
                isSelected ? "border-primary border-3" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedId(profileData.id);

                // อัปเดตรูป Resume
                const imagePath = resumePathMap[profileData.resumeFileName];
                if (imagePath) {
                  setPic(imagePath);
                } else {
                  console.error(
                    `ไม่มีรูป Resume : ${profileData.resumeFileName}`
                  );
                }
              }}
            >
              {/*===================================== Profile Picture =====================================*/}
              <div
                className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center bg-secondary text-white" // ผมไม่รู้ว่าทำไมมันไม่เป็นสีขาว
                style={{
                  width: "100px",
                  height: "100px",
                  flexShrink: 0,
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                }}
              >
                {currentProfilePic ? (
                  <img
                    src={currentProfilePic}
                    alt={`${profileData.name} profile`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span>{profileData.name?.[0] || "?"}</span>
                )}
              </div>

              <div>
                <div className="fw-bold fs-4">
                  {profileData.name} {profileData.surname}
                </div>

                <div className="fs-5">
                  ความสามารถ&nbsp;
                  <Badge bg="success" className="mt-1">
                    {profileData.job}
                  </Badge>
                  <div className="fs-5">
                    ประสบการณ์&nbsp;{profileData.experience}&nbsp;ปี
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/*========================================= CARD LIST ===========================================*/}
    </div>
  );
};

export default ProfileInfo;
