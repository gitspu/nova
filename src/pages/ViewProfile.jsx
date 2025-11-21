import Portfolio from "../components/comViewProfile/Portfolio";
import ProfileInfo from "../components/comViewProfile/ProfileInfo";
import { useState } from "react";
import NavbarTop from "../components/navbarTop";


// CHANGE TO FEEDPROFILE
const ViewProfile = () => {
  const [pic,setPic] = useState(null)
  return (
    <div>
        <NavbarTop/>
        {/* ปรับให้อยู่ตรงกลาง */}
      <div
        className="d-flex m-5 justify-content-center align-items-start gap-3"
        style={{ minHeight: "100vh" }}
      >
        {/* LEFT */}
        <div>
          <ProfileInfo setPic={setPic}/>
        </div>

        {/* RIGHT */}
        <div
          className=""
          style={{ position: "sticky", top: "20px" }}
        >
          <Portfolio portfolioPicture={pic}/>

        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
