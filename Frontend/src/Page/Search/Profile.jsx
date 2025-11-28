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

export default function Start ()
{    
    const profile = api.profile;
    const [selected, setSelected] = useState (0);
    const mounted = useRef (false);
    const dataset = useRef (null);
    const [update, forceUpdate] = useReducer (x => x +1);

    useEffect (() =>
    {
        if (mounted == null)
            return;
        if (mounted.current)
            return;

        profile.__dbLoadAsync ().then ((x) =>
        {
            dataset.current = x;
            forceUpdate ();
        });

        return () =>
        {
            mounted.current = false;
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    function onRenderList ()
    {
        const children = [];

        if (dataset.current == null)
            return children;

        const dbRoot = dataset.current;
        const dbItem = dbRoot ["item"];
        const keyList = Object.keys (dbItem);

        for (const key of keyList)
        {
            const value = dbItem[key];

            let shared = value.personal.shared;

            if (shared == false)
                continue;

            let icon = api.decodeContent (value.personal.icon);
            let name = value.personal.nickname.value;
            let job = value.job.history;

            children.push (
              <ListButton key={key} className={selected == key ? "active" : ""} onClick={() => setSelected (key)} style={{ marginBottom: '4px', overflowY: 'auto' }}>
                <Img src={icon} style={{ borderRadius: '4px', objectFit: 'cover' }}/>
                <ListButtonText>
                  <Label $variant="primary" $size="h2" $weight="bold">{name}</Label>
                  <P $variant="secondary">{job}</P>
                  {/* <P $variant="secondary">EXP</P> */}
                </ListButtonText>
              </ListButton>
          );
        }

        return children;
    }
    function onRenderSelected ()
    {
        const current = dataset.current != null ? (selected != 0 ? dataset.current.item[selected] : null) : null;
        let logo = "";
        let name = "";
        let job = "";
        let education = "";
        let skill = [];

        if (current != null)
        {
            logo = api.decodeContent (current.personal.icon);
            name = current.personal.nickname.value;
            job = current.job.history;
            education = current.education.text;

            let index = 0;
            
            for (const tag of current.skill.item)
            {
                skill.push (<Li key={index}>{tag}</Li>)
                index += 1;
            }
        }
        if (logo == "" || logo == icon.transparent)
            logo = icon.profile;

        if (job == "" || job == null)
            job = "ผู้ใช้ไม่ได้ระบุประวัติการทำงาน";
        if (education == "" || education == null)
            education = "ผู้ใช้ไม่ได้ระบุข้อมูลการศึกษา";

        if (skill.length == 0)
            skill = <P>ผู้ใช้ไม่ได้ระบุข้อมูลทักษะ</P>
    
        return <>
          <Div style={{ 
            width: '100%', height: '100%', 
            border: 'var(--app-bg-border-2)',
            borderRadius: 'var(--app-bg-radius-2)',
            borderStyle: 'dashed',
            display: (selected == 0) ? 'flex' : 'none',
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
            display: (selected != 0) ? 'flex' : 'none',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <StylePostDetail className="shadow-lg border-0">
              <StylePostDetailBanner src={null}/>
              <StylePostDetailHeading>
                {/* โลโก้บริษัท */}
                <Img src={logo} alt={name} width={96} height={96}/>
              </StylePostDetailHeading>
              <StylePostDetailContent>
                <Section className="mb-2">
                  <H1 className="mb-1" $variant='primary' $size='h1'>{String (name)}</H1>
                </Section>
                <Section>
                  <H2 className="mb-4">ประวัติการทำงาน</H2>
                  <P className="mt-4 mb-4 ms-4 me-4">{job}</P>
                </Section>
                <Section>
                  <H2 className="mb-4">การศึกษา</H2>
                  <P className="mt-4 mb-4 ms-4 me-4">{education}</P>
                </Section>
                <Section>
                  <H2 className="mb-4">ทักษะ</H2>
                  <Ul className="mb-4 ms-4 me-4">
                    {skill}
                  </Ul>
                </Section>
              </StylePostDetailContent>
            </StylePostDetail>
          </Div>
        </>
    }

      
    return <>
      <Viewport key={forceUpdate}>
        <ViewportInner>
          <Body>
            <BodyList>
              <Span className="mb-4 d-flex gap-1">
                <Label $size="h2">รายการแชร์โปรไฟล์</Label>
                <Div className="flex-grow-1"></Div>

                {/* <DropdownButton id="dropdown-basic-button" title="ทักษะ">
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

    & > img
    {
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