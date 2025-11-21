import profilesDatas from "./profilesDatas";
import { Badge } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ProfileInfo = ({ setPic }) => {
  // console.log(profilesDatas);
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        {/* checkbox filter dropdown */}
        <DropdownButton id="dropdown-basic-button" title="Filter">
          <Dropdown.Item
            as="div"
            onClick={(stay) => stay.stopPropagation()}
            className="d-flex align-items-center gap-2"
          >
            <input type="checkbox" />
            job
          </Dropdown.Item>
        </DropdownButton>
        {/* checkbox filter dropdown */}
      </div>

      {/* Wrapper ให้รายการเรียงลง */}
      <div className="d-flex flex-column gap-3">
        {/*  Card  */}
        {profilesDatas.map((profileData, id) => (
          <div
            key={id}
            className="d-flex gap-3 p-3 border rounded bg-light"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPic("https://www.smartmathpro.com/wp-content/uploads/2025/10/Template-Portfolio-Education.webp");
            }}
          >
            <div
              className="bg-secondary rounded-circle"
              style={{ width: "100px", height: "100px" }}
            ></div>
            <div>
              <div className="fw-bold fs-4">
                {profileData.name}&nbsp;{profileData.surname}
              </div>

              <div className="fs-5">
                ทักษะ&nbsp;
                <Badge bg="success" className="mt-1">
                  {profileData.job}
                </Badge>
                <div className="fs-5">
                  ประสบการณ์&nbsp;{profileData.experience}&nbsp;ปี
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*  Card  */}
    </div>
  );
};

export default ProfileInfo;
