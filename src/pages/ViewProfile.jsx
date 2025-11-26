import Portfolio from "../components/comViewProfile/Portfolio";
import ProfileInfo from "../components/comViewProfile/ProfileInfo";
import { useState } from "react";
import NavbarTop from "../components/navbarTop";

import defaultResumePic from "../assets/resumepicture/resume_1.jpg";

const ViewProfile = () => {
  // ตั้ง useState ของ resume
  const [pic, setPic] = useState(defaultResumePic);

  return (
    <div>
      <NavbarTop />
      <div
        className="d-flex m-5 justify-content-center align-items-start gap-3"
        style={{ minHeight: "100vh" }}
      >
        <div>
          <ProfileInfo setPic={setPic} />
        </div>

        <div className="" style={{ position: "sticky", top: "6.5rem" }}>
          <Portfolio portfolioPicture={pic} />
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
