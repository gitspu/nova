import Portfolio from "../../Component/comViewProfile/Portfolio";
import ProfileInfo from "../../Component/comViewProfile/ProfileInfo";
import { useState } from "react";

import defaultResumePic from "../../Asset/resumepicture/resume_1.jpg";

const ViewProfile = () => {
  // ตั้ง useState ของ resume
  const [pic, setPic] = useState(defaultResumePic);

  return (
    <div style={{ position: 'absolute', inset: 0, top: '56px', overflow: 'auto' }}>
      <div
        className="d-flex m-5 justify-content-center align-items-start gap-3"
        style={{ 

        }}
      >
        <div>
          <ProfileInfo setPic={setPic} />
        </div>

        <div className="" style={{ position: "sticky", top: "0rem" }}>
          <Portfolio portfolioPicture={pic} />
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
