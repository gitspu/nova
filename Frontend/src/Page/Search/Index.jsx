import { useState, useEffect, useRef } from "react";

import { Filter } from "lucide-react";

import styled from "styled-components";
import icon from "../../Script/Icon";

import 
{
    Toast,
    ToastContainer,
} 
from "react-bootstrap";

import 
{ 
  Br,
  Button,
    Div, H1, H2, Img, Input, MenuBar, P, Span, TagBar 
} 
from "../../Component/Common.jsx";

import 
{ 
    PostList, 
    PostDetail, 
    PostPlaceholder 
} 
from "../../Component/Job.jsx";


import { auth } from "../../Script/Api.js";
import nav from '../../Script/Navigator.js'


// --- MOCK DATA ---
// ข้อมูลงานจำลอง
const SAMPLE = [
  {
    id: 1,
    title: "Chief Operating Officer (COO)",
    company: "Bangchak Corporation PLC",
    location: "พระโขนง, กรุงเทพฯ",
    type: "Full-time",
    salary: "฿150k - ฿250k /เดือน",
    posted: "12 วันที่ผ่านมา",
    isNew: true,
    category: "Management",
    logoUrl: "https://placehold.co/50x50/1e40af/ffffff?text=BCP",
    snippet:
      "Lead global operations, optimize asset performance, and drive strategic initiatives for sustainable growth.",
  },
  {
    id: 2,
    title: "Senior Project Manager",
    company: "SCG Logistics Management",
    location: "บางซื่อ, กรุงเทพฯ",
    type: "Full-time",
    salary: "ตามโครงสร้างบริษัท",
    posted: "วันนี้",
    isNew: true,
    category: "Management",
    logoUrl: "https://placehold.co/50x50/065f46/ffffff?text=SCG",
    snippet:
      "Manage logistics projects, ensuring timely delivery and cost efficiency using agile methodologies.",
  },
  {
    id: 3,
    title: "Marketing Director",
    company: "Central Group",
    location: "ปทุมวัน, กรุงเทพฯ",
    type: "Contract",
    salary: "฿80k - ฿120k /เดือน",
    posted: "3 วันที่ผ่านมา",
    isNew: false,
    category: "Marketing",
    logoUrl: "https://placehold.co/50x50/be123c/ffffff?text=CG",
    snippet:
      "Oversee marketing campaigns, brand positioning, and digital transformation strategies.",
  },
  {
    id: 4,
    title: "UX/UI Designer",
    company: "Kasikorn Business-Technology",
    location: "สามย่าน, กรุงเทพฯ",
    type: "Full-time",
    salary: "฿50k - ฿85k /เดือน",
    posted: "1 วันที่ผ่านมา",
    isNew: true,
    category: "IT & Digital",
    logoUrl: "https://placehold.co/50x50/059669/ffffff?text=KBTG",
    snippet:
      "Design intuitive user experiences for mobile banking applications reaching millions of users.",
  },
  {
    id: 6,
    title: "Frontend Developer",
    company: "LINE MAN Wongnai",
    location: "สาทร, กรุงเทพฯ",
    type: "Full-time",
    salary: "฿45k - ฿70k /เดือน",
    posted: "3 วันที่ผ่านมา",
    isNew: true,
    category: "IT & Digital",
    logoUrl: "https://placehold.co/50x50/3b82f6/ffffff?text=LMW",
    snippet: "Develop UI/UX features using React, Next.js, and TailwindCSS.",
  },
];

export default function Start () 
{
    // --- States (สถานะต่างๆ) ---

    const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
    const [selected, setSelected] = useState(0);
    const [search, setSearch] = useState("");
    const [searchTag, setSearchTag] = useState ([1]);
    const [filter, setFilter] = useState (1);
    const [saved, setSaved] = useState([]);

    const mounted = useRef (false);
    const dataset = useRef (SAMPLE);

    //
    // โหลดข้อมูลจาก API
    //
    function onRefreshData ()
    {

    }
    //
    // นำข้อมูลที่ได้จาก API มาประมวลผลเป็น UI
    //
    function onRefreshUI ()
    {

    }
    //
    // เมื่อต้องการแสดงผลรายการ
    //
    function onRenderList ()
    {
        const children = dataset.current.filter ((value) => 
        {
            //
            // กรองตามที่บันทึกไว้
            //
            if (filter == 2 && !saved.includes(value.id)) {
                return false;
            }
            //
            // กรองตามการค้นหา
            //
            if (search != '')
            {
                const m1 = value.title.toLowerCase ().startsWith (search.toLowerCase ()) ||
                          value.title.toLowerCase ().includes (search.toLowerCase ());
                const m2 = value.company.toLowerCase ().startsWith (search.toLowerCase ()) ||
                          value.company.toLowerCase ().startsWith (search.toLowerCase ());

                if (!m1 && !m2)
                    return false;
            }
            return true;
        })
        .map ((value, index) =>
        {
            return <>
              <PostList
                key={index}
                data={value}
                isActive={selected === value.id}
                isSaved={saved.includes(value.id)}
                onClick={(event) => onJobSelect(event, value.id)}
              />
            </>;
        });
        if (children.length == 0)
        {
            function onLogin ()
            {
                nav.auth (window.location.pathname, undefined);
                return;
            }

            return <>
              <Div className="d-flex flex-column flex-grow-1 p-4 bg-white rounded-3 shadow-sm">
                <Div className="mb-4 d-flex justify-content-center">
                  <Div className="bg-light rounded-circle p-4">
                    <Img src={filter == 1 ? icon.inbox : icon.heart} width={48} height={48}/>
                  </Div>
                </Div>
                <Div className="mb-4 w-100">
                  <H2 $variant="primary" $align="center">
                    {filter == 1 && <>ไม่พบงานที่คุณค้นหา</>}
                    {filter == 2 && <>ในนี้ไม่มีอะไรเลยนะ</>}
                  </H2>
                  <P $variant="secondary" $align="center">
                    {filter == 1 && <>ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นดูนะ</>}
                    {filter == 2 && <>เมื่อคุณบันทึกโพสต์ไว้ โพสต์เหล่านั่นจะปรากฏให้คุณตรงนี้<br/>ลองเริ่มบันทึกโพสต์เลย</>}
                    {(filter == 2 && !auth.isLogged ()) && <>
                      <Br/>
                      <Br/>
                      <Span>(คุณต้องเข้าสู่ระบบก่อนจึงสามารถบันทึกได้)</Span>
                    </>}
                  </P>
                </Div>

                {filter === 1 && (
                  <Button onClick={() => { setFilter(1); setSearch (""); }}>
                    ล้างตัวกรอง
                  </Button>
                )}
                {filter === 2 && (
                  <Button className="mb-1" onClick={() => setFilter (1)}>
                    กลับไปดูงานทั้งหมด
                  </Button>
                )}
                {(filter === 2 && !auth.isLogged ()) && (
                  <Button className="mb-1" onClick={onLogin}>
                    <Img src={icon.unlock}/>
                    <Span>เข้าสู่ระบบ</Span>
                  </Button>
                )}
              </Div>
            </>;
        }
        return children;
    }

    //
    // เมื่อต้องการเลือกดูงานดังกล่าว
    //
    function onJobSelect (event, id)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setSelected (id);
    }
    //
    // เมื่อต้องการบันทึกงานดังกล่าว
    //
    function onJobSave (event, id)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }

        if (auth.isLogged () == false)
        {
            setToast ({
                show: true,
                msg: "คุณต้องเข้าสู่ระบบก่อนจึงสามารถบันทึกได้",
                type: "secondary",
            });
            return;
        }

        if (saved.includes(id)) 
        {
            setSaved(saved.filter((saved) => saved !== id));
            setToast ({
                show: true,
                msg: "ลบออกจากรายการบันทึกแล้ว",
                type: "secondary",
            });
        } 
        else 
        {
            setSaved ([...saved, id]);
            setToast ({ show: true, msg: "บันทึกงานเรียบร้อยแล้ว!", type: "success" });
        }
    }
    function onJobShare (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        const baseline = window.location.hostname;
        const extension = "/employer-profile?id=1234";

        navigator.clipboard.writeText (`${baseline}${extension}`).then (() =>
        {
            setToast ({ show: true, msg: "คัดลอกลิงค์แชร์เรียบร้อยแล้ว", type: "success" });
        })
        .catch (() =>
        {
          setToast ({ show: true, msg: "ไม่สามารถคัดลอกลิงค์แชร์ได้", type: "danger" });
        });
    }

    //
    // ทำงานเพียงแค่ครั้งเดียวเท่านั้น
    //
    useEffect (() => 
    {
        if (mounted == null)
            return;
        if (mounted.current)
            return;

        mounted.current = true;

        onRefreshData ();
        onRefreshUI ();

        return () => { mounted.current = false; }
    }, 
    []);

    useEffect (() =>
    {
        if (mounted == null)
            return;
        if (mounted.current == false)
            return;

        if (searchTag.includes (1) && searchTag.length > 1)
        {
            setSearchTag (searchTag.filter (x => x !== 1));
        }
    },
    [searchTag]);

    // --- Render (การแสดงผล) ---

    return <>
      <Viewport>
        <ViewportInner>

          <Head>
            <HeadFilter>
              <Div className="w-50">
                <Div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                  <Input className="w-50" placeholder="ค้นหางาน"
                        value={search}
                        onChange={(event) => setSearch (event.target.value)}
                  />

                  <Img src={icon.briefcase} height={24}/>
                  <Input className="w-25 " placeholder="ค้นหางาน"
                        value="นักพัฒนาซอฟแวร์"
                        readOnly={true}
                  />
                  <Img src={icon.geoAlt} height={24}/>
                  <Input className="w-25 " placeholder="ค้นหางาน"
                        value="กรุงเทพมหานคร"
                        readOnly={true}
                  />
                </Div>
                </Div>
              <TagBar state={[searchTag, setSearchTag]}>
                <TagBar.Child state={1} text='ทั้งหมด' onClick={() => setSearchTag ([1])}/>
                <TagBar.Child state={2} text='IT & Digital'/>
                <TagBar.Child state={3} text='Marketing'/>
                <TagBar.Child state={4} text='Management'/>
              </TagBar>
            </HeadFilter>
          </Head>
          <Body>
            {/* พื้นที่เลือกรายการสมัครงาน */}
            <BodyList>
              {/* พื้นที่คงที่ไม่ขยับ */}
              <Div>
                {/* เมนู */}
                <Div>  
                  {/* รายเลือกมุมมอง (สลับดูงานทั้งหมด/งานที่บันทึก) */}
                  <Div >
                    <MenuBar direction='horizontal' state={[filter, setFilter]} className="p-1 rounded-3 shadow-sm mb-3 d-flex">
                      <MenuBar.Child className="flex-grow-1" state={1} icon={icon.listTask} text={`งานทั้งหมด (${dataset.current.length})`}/>
                      {auth.isRole (auth.ROLE_EMPLOYER) ? 
                        (<MenuBar.Child className="flex-grow-1" state={3} icon={icon.sticky} text={`โพสต์ฉัน`}/>) :
                        (<MenuBar.Child className="flex-grow-1" state={2} icon={icon.heart} text={`บันทึกไว้ ${saved.length > 0 ? `(${saved.length})` : ``}`}/>)
                      }
                    </MenuBar>
                  </Div>
                </Div>
                {/* หัวข้อรายการงาน */}
                <Div className="d-flex justify-content-between align-items-center mb-3 px-1">
                  <Div className="d-flex gap-2">
                    {/* <Span className="fw-bold text-dark">
                      {filter === 2 ? "รายการที่บันทึก" : "ผลการค้นหา"} (
                      {filteredJobs.length})
                    </Span> */}
                  </Div>
                  <Div className="text-muted small d-flex align-items-center">
                    <Filter size={14} className="me-1" /> เรียงตาม: เกี่ยวข้อง
                  </Div>
                </Div>
              </Div>
              {/* รายการสมัคร */}
              <Div className="h-100 overflow-y-auto">
                <Div className="overflow-y">
                  {onRenderList ()}
                </Div>           
              </Div>
            </BodyList>
            {/* งานที่เลือกไว้ */}
            <BodySelected>
              {selected == 0 && <PostPlaceholder/>}
              {selected != 0 && 
                <PostDetail
                  job={dataset.current[selected]}
                  save={[saved.includes (selected), () => onJobSave (null, selected)]}
                  share={() => onJobShare (null, selected)}
                />
              }
            </BodySelected>
          </Body>
          {/* Toast Notification (แจ้งเตือน) */}
          <ToastContainer position="bottom-center" className="p-3" style={{ zIndex: 9999 }}>
            <Toast
              onClose={() => setToast({ ...toast, show: false })}
              show={toast.show}
              bg={toast.type === "success" ? "success" : "secondary"}
              delay={2500}
              autohide
              className="text-white fw-bold shadow-sm">
              <Toast.Body>{toast.msg}</Toast.Body>
            </Toast>
          </ToastContainer>
        </ViewportInner>
      </Viewport>
    </>
};

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
const Head = styled.div `
    position: absolute;
    inset: 0% 0% auto 0%;
    width: 100%;
    height: 144px;


    background-color: var(--app-bg-2);
    border:           var(--app-bg-border-2);
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
`;
const HeadFilter = styled.div `

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    align-items: center;
    justify-content: center;
`;

const Body = styled.div `
    position: absolute;
    inset: 144px 0% 0% 0%;
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: hidden;

    justify-content: center;
    gap: 48px;
`;
const BodyList = styled.div `

    width: 25%;
    padding: 24px 24px 0px 24px;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;
const BodySelected = styled.div `
    width: 50%;
    padding: 24px 24px 24px 24px;
`;