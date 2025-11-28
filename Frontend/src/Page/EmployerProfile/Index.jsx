/**
 * 
 * หน้าต่างสำหรับการดูรายการสมัครงาน (มุมมององค์กร)
 * ใช้เพื่อรับงาน หรือ ปฎิเสธ
 * 
*/
"use strict";
"use client";

/**
 * 
 * ส่วนประกอบจาก React
 * 
*/
import { useState, useEffect, useRef, useMemo } from "react";
/**
 * 
 * ส่วนประกอบทั้วไป
 * 
*/
import 
{ 
    Br,
    Button,
    Div, 
    H1, 
    H2, 
    Img, 
    Input, 
    Label, 
    MenuBar, 
    P, 
    Span, 
    TagBar 
} 
from "../../Component/Common.jsx";
/**
 * 
 * ส่วนประกอบใช้ร่วมกัน
 * 
*/
import 
{ 
    PostList, 
    PostDetail, 
    PostPlaceholder 
} 
from "../../Component/Job.jsx";
/**
 * 
 * เชื่อมต่อกับ Bootstrap
 * 
*/
import 
{
    Toast,
    ToastContainer,
    Badge
} 
from "react-bootstrap";

import
{
}
from "react-bootstrap-icons"
/**
 * 
 * อื่น ๆ
 * 
*/
import { Filter } from "lucide-react";
/**
 * 
 * ตกแต่ง CSS
 * 
*/
import styled from "styled-components";
/**
 * 
 * เชื่อมต่อกับ Logic
 * 
*/
import api  from "../../Script/Api.js";
import nav  from '../../Script/Navigator.js'
import icon from "../../Script/Icon";


import profilesDatas from "./profilesDatas";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Import รูปภาพ Resume
const resumeImages = import.meta.glob(
  "/src/assets/resumepicture/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const resumePathMap = Object.keys(resumeImages).reduce((acc, path) => {
  const fileName = path.split("/").pop();
  acc[fileName] = resumeImages[path].default;
  return acc;
}, {});

// Import รูปภาพ Profile Picture
const profileImages = import.meta.glob(
  "/src/assets/profilepicture/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const profilePathMap = Object.keys(profileImages).reduce((acc, path) => {
  const fileName = path.split("/").pop();
  acc[fileName] = profileImages[path].default;
  return acc;
}, {});

export default function Start ()
{
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

    
    function onRenderList ()
    {
        return filteredProfiles.map ((value, index) =>
        {
          return <ListButton key={index} className={index === selectedId ? "active" : ""} onClick={() => setSelectedId (index)}>
            <Img src={icon.emojiSmile}/>
            <ListButtonText>
              <Label $variant="primary" $size="h2" $weight="bold">Username</Label>
              <P $variant="secondary">JOB</P>
              <P $variant="secondary">EXP</P>
            </ListButtonText>
          </ListButton>
        });
        return filteredProfiles.map((profileData) => 
        {
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
                  // setPic(imagePath);
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
        });
    }
    function onRenderSelected ()
    {
        return <>
          <Div style={{ 
            width: '100%', height: '100%', 
            border: 'var(--app-bg-border-2)',
            borderRadius: 'var(--app-bg-radius-2)',
            borderStyle: 'dashed',
            display: 'none',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Img src={icon.briefcase} height={48} className="m-4"/>
            <H1>เลือกผู้สมัครเพื่อดูรายละเอียด</H1>
            <P $variant="secondary">คลิกที่การ์ดผู้สมัครทางด้านซ้ายเพื่อดูข้อมูลเพิ่มเติม</P>
          </Div>
          <Div style={{
            width: '100%', height: '100%', 
            border: 'var(--app-bg-border-2)',
            borderRadius: 'var(--app-bg-radius-2)',
            borderStyle: 'dashed',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Div style={{
                width: '210mm',
                height: '297mm',
                overflow: 'auto',
            }}>
              <Img src={icon.chat} width={'100%'} height={'100%'}/>
            </Div>
          </Div>
        </>
    }

      
    return <>
      <Viewport>
        <ViewportInner>
          <Body>
            <BodyList>
              <Span className="mb-4 d-flex gap-1">
                <Label $size="h2">รายการผู้สมัคร</Label>
                <Div className="flex-grow-1"></Div>
                <DropdownButton id="dropdown-basic-button" title="ทักษะ">
                  <Dropdown.Item>
                    <input type="checkbox"/>
                    <span className="ms-2">ทั่วไป</span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox"/>
                    <span className="ms-2">ทั่วไป</span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox"/>
                    <span className="ms-2">ทั่วไป</span>
                  </Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="ประสบการณ์">
                  <Dropdown.Item>ช่วง 1-3 ปี</Dropdown.Item>
                  <Dropdown.Item>ช่วง 5-10 ปี</Dropdown.Item>
                  <Dropdown.Item>ช่วง 10 ปีขึ้นไป</Dropdown.Item>
                </DropdownButton>
              </Span>
            </BodyList>
            <BodySelected>
                {onRenderSelected ()}
            </BodySelected>
          </Body>
        </ViewportInner>
      </Viewport>
    </>;
}

// export function StartOld({ setPic })
// {

//   return (
//     <div className="border rounded p-3 bg-white">
//       {/*======================================= FILTER DROPDOWN =======================================*/}
//       <div className="d-flex justify-content-between mb-3">
//         <DropdownButton id="dropdown-basic-button" title="ทักษะ">
//           {allJobs.map((job) => (
//             <Dropdown.Item
//               key={job}
//               as="div"
//               onClick={(e) => e.stopPropagation()}
//               className="d-flex align-items-center gap-2"
//             >
//               <input
//                 type="checkbox"
//                 checked={tempSelected.includes(job)}
//                 onChange={() => toggleJob(job)}
//               />
//               {job}
//             </Dropdown.Item>
//           ))}

//           <Dropdown.Divider />

//           <div className="px-3 pb-2 d-flex gap-2">
//             <Button variant="primary" size="sm" onClick={applyFilter}>
//               ยืนยัน
//             </Button>

//             <Button variant="secondary" size="sm" onClick={clearFilter}>
//               ล้าง
//             </Button>
//           </div>
//         </DropdownButton>
//       </div>
//       {/*======================================= FILTER DROPDOWN =======================================*/}

//       {/*========================================= CARD LIST ===========================================*/}
//       <div
//         className="d-flex flex-column gap-3"
//         style={{
//           cursor: "pointer",
//           minWidth: "430px",
//           maxWidth: "450px",
//         }}
//       >
        
//       </div>
//       {/*========================================= CARD LIST ===========================================*/}
//     </div>
//   );
// };

// ==================================================================================================== //
//                                                                                                      //
// COMPONENT                                                                                            //
//                                                                                                      //
// ==================================================================================================== //

const Viewport = styled.div `
    position: absolute;
    inset: 0;

    top: 56px;

    background-color: var(--app-bg-1);
`;
const ViewportInner = styled.div `
    position: relative;
    width: 100%;
    height: 100%;
`;

const Body = styled.div `
    position: absolute;
    inset: 0% 0% 0% 0%;
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: hidden;

    padding: 0px 15%;

    justify-content: center;
    gap: 24px;
`;
const BodyList = styled.div `

    width: 512px;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    padding: 24px 0px 0px 0px;

    & > div
    {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        overflow-y: scroll;
    }
    & > div > *
    {
        margin-bottom: 4px;
    }
`;

const BodySelected = styled.div `

    width: 768px;

    padding: 24px 0px 24px 0px;
`;

// ------

const ListButton = styled.button `

    width: 100%;
    min-height: 120px;

    background-color: white;
    border: 2px solid grey;
    border-radius: var(--app-button-1-radius);

    &:enabled:hover, &:enabled:focus
    {
          background-color: rgb(248, 248, 248);
          border: 2px solid #266341;
    }
    &:enabled:active
    {
          background-color: rgb(226, 226, 226);
          border: 2px solid #5d907f;
    }
    &.active:enabled
    {
          background-color: #d2f1e7ff;
          border: 2px solid #5d907f;
    }
    &.active:enabled:hover, &.active:enabled:active
    {
          background-color: #d2f1e7ff;
          border: 2px solid #5d907f;
    }
    &.active:enabled:active
    {
          background-color: #d2f1e7ff;
          border: 2px solid #427463;
    }

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    align-items: center;

    & > img
    {
        margin: 0px 24px;
        width: 64px;
        height: 64px;
    }
`;
const ListButtonText = styled.div `

    height: 100%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    justify-content: center;
`;