/**
 * 
 * หน้าต่างสำหรับการค้นหาโปรไฟล์
 * 
*/
"use strict";
"use client";

/**
 * 
 * ส่วนประกอบจาก React
 * 
*/
import { useState, useEffect, useRef, useMemo, useReducer } from "react";
/**
 * 
 * ส่วนประกอบทั้วไป
 * 
*/
import 
{ 
    Br,
    Button,
    Checkbox,
    Div, 
    H1, 
    H2, 
    Img, 
    Input, 
    Label, 
    Li, 
    MenuBar, 
    P, 
    Section, 
    Span, 
    TagBar, 
    Ul
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
    Badge,
    Dropdown,
    DropdownButton
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
/*

    นำเข้าข้อมูล Mockup

*/
import Mockup from '../../Component/comViewProfile/profilesDatas.jsx'
/*
    Mock Image
*/
const MockupResume = import.meta.glob (
  "/src/Asset/resumepicture/*.{png,jpg,jpeg,webp}",
  {
      eager: true
  }
)
const MockupResumeMap = Object.keys(MockupResume).reduce((acc, path) => 
{
    const fileName = path.split("/").pop();
    acc[fileName] = MockupResume[path].default;
    return acc;
}, 
{});

export default function Start ()
{    
  const [selected, setSelected] = useState ("");
  const [filterUpdate, forceFilterUpdate] = useState (0);
  const filter = useRef ([]);
  const mounted = useRef (false);

    useEffect (() =>
    {
        if (mounted == null)
            return;
        if (mounted.current)
            return;

        return () =>
        {
            mounted.current = false;
        }
    },
    []);
    function onFilterToggle (which)
    {
        if (filter.current.includes (which))
        {
            filter.current = (filter.current.filter (x => x !== which));
            console.log ("Filter removed: " + which, filter.current);
        }
        else
        {
            filter.current = ([ ... filter.current, which ]); 
            console.log ("Filter added: " + which, filter.current);
        }
        forceFilterUpdate (filterUpdate + 1);
    }
    function onRenderFilterDropdown ()
    {
        const item = [...new Set (Mockup.map((p) => p.job))];
        const result = item.map ((value, index) =>
        {
            return <Dropdown.Item key={index}>
              <Checkbox title={value} state={[filter.current.indexOf (value) != -1, () => onFilterToggle (value)]}/>
            </Dropdown.Item>
        });
        return result;
    }
    function onRenderList ()
    {
        const children = [];

        if (Mockup == null)
            return children;

        for (let index = 0; index < Mockup.length; index++)
        {
            const value = Mockup[index];

            let name = value.name;
            let surname = value.surname;
            let job = value.job;
            let file = value.resumeFileName;

            if (filter.current.length > 0 && filter.current.includes (job) == false)
            {
                continue;
            }

            children.push (
              <ListButton key={index} className={selected == file ? "active" : ""} onClick={() => setSelected (file)} style={{ marginBottom: '4px', overflowY: 'auto' }}>
                <Label>{name.substring (0, 1)}</Label>
                <ListButtonText>
                  <Label $variant="primary" $size="h2" $weight="bold">{name} {surname}</Label>
                  <Div style={{ textAlign: 'left' }}>
                    <Label>ทักษะ</Label>
                    <Label $variant="secondary" style={{
                      background: 'var(--app-bg-2)',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      margin: '0px 8px',
                    }}>{job}</Label>
                  </Div>
                  {/* <P $variant="secondary">EXP</P> */}
                </ListButtonText>
              </ListButton>
            );
        }
        return children;
    }
    function onRenderSelected ()
    {
        let image = MockupResumeMap [selected];

        return <>
          <Div style={{ 
            width: '100%', height: '100%', 
            border: 'var(--app-bg-border-2)',
            borderRadius: 'var(--app-bg-radius-2)',
            borderStyle: 'dashed',
            display: (selected == "") ? 'flex' : 'none',
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
            display: (selected != "") ? 'flex' : 'none',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Img src={image} width={"100%"} height={"100%"}/>
          </Div>
        </>
    }

    
      
    return <>
      <Viewport>
        <ViewportInner>
          <Body>
            <BodyList>
              <Span className="mb-4 d-flex gap-1">
                <Label $size="h2">รายการแชร์โปรไฟล์</Label>
                <Div className="flex-grow-1"></Div>

                <DropdownButton id="dropdown-basic-button" title="ทักษะ" variant="success" key={filterUpdate}>
                  {onRenderFilterDropdown ()}
                </DropdownButton>
                {/* <DropdownButton id="dropdown-basic-button" title="ประสบการณ์">
                  <Dropdown.Item>ช่วง 1-3 ปี</Dropdown.Item>
                  <Dropdown.Item>ช่วง 5-10 ปี</Dropdown.Item>
                  <Dropdown.Item>ช่วง 10 ปีขึ้นไป</Dropdown.Item>
                </DropdownButton>
                 */}
              </Span>
              <Div>
                {onRenderList ()}
              </Div>
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

const StylePostDetail = styled.div `
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    /* background-color: var(--app-bg-2); */
    border: var(--app-bg-border-2);
    border-radius: var(--app-bg-radius-2);
`;
const StylePostDetailBanner = styled.img `

    position: absolute;

    width: 100%;
    height: 192px;

    border: none;
    outline: none;
    object-fit: cover;

    background-color: var(--app-bg-2);
`;
const StylePostDetailHeading = styled.div `
  
    padding: 0px 24px;
    position: absolute;
    inset: calc(192px - 48px) 0px auto 0px;

    height: 96px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    & img
    {
        border: 2px solid white;
        border-radius: 100%;
        object-fit: cover;
    }
`;
const StylePostDetailContent = styled.div `

    position: absolute;
    padding: 0px 24px;
    inset: calc(192px + 64px) 0px 0px 0px;
    overflow-y: auto;
`;

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
    max-height: 120px;

    background-color: white;
    border: 2px solid grey;
    border-radius: var(--app-button-1-radius);
    overflow: hidden;

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

    & > label
    {
        font-size: 2.5rem;
        font-weight: bold;

        text-align: center;

        background-color: var(--app-bg-2);
        border-radius: 100%;
        color: var(--app-text-2);

        margin: 0px 24px;
        width: 64px;
        height: 64px;
    }
`;
const ListButtonText = styled.div `

    height: 100%;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    justify-content: center;

    & > p
    {
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;