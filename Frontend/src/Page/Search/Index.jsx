/**
 * 
 * หน้าต่างสำหรับการค้นหางาน และ อาจสร้างโพสต์งานได้เช่นกัน
 * 
*/
"use strict";
"use client";

/**
 * 
 * ส่วนประกอบจาก React
 * 
*/
import { useState, useEffect, useRef } from "react";
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
    Container,
    Row,
    Col,
    Toast,
    ToastContainer,
    Card,
    Form,
} 
from "react-bootstrap";
/**
 * 
 * อื่น ๆ
 * 
*/
import { Filter, ArrowLeft, UploadCloud } from "lucide-react";
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

/**
 * 
 * พื้นที่หลักการแสดงผลหน้าการค้นหางาน (หน้านี้แหละ)
 * 
*/
export default function Start () 
{
    const auth = api.auth;
    const feed = api.feed;
    const profile = api.profile;
    const profileEm = api.profileEm;

    // --- States (สถานะต่างๆ) ---

    const [toast, setToast] = useState({ show: false, msg: "", type: "success", delay: 2500 });
    const [selected, setSelected] = useState (-1);
    const [search, setSearch] = useState("");
    const [searchTag, setSearchTag] = useState ([0]);
    const [filter, setFilter] = useState (1);
    const [load, setLoad] = useState (1);
    const [showNew, setShowNew] = useState (false);


    const mounted = useRef (false);

    const list = useRef (new feed.DataPostJob ());
    const listOwner = useRef ([]);
    const listInfo = useRef ([]);
    const saved = useRef (new profile.DataPostSaved ().init ());
    const personal = useRef (new profile.DataPersonal ());

    /**
     * โหลดข้อมูลจาก API
    */
    function onRefreshData ()
    {
        function onThenIndex (value)
        {
            list.current = value;
        }
        async function onThenOwner ()
        {
            const feedData = list.current;
            const children = new Array (0);

            for (const key of feedData.item)
            {
                children.push (await profileEm.getProfile (key.owner));
            }
            listOwner.current = children;
        }
        async function onThenInfo ()
        {
            const feedData = list.current;
            const children = new Array (0);

            for (const key of feedData.item)
            {
                children.push (await profileEm.getPost (key.index, key.owner));
            }
            listInfo.current = children;
        }
        async function onThenSession ()
        {
            if (auth.isLogged () && auth.isActive ())
            {
                saved.current = await profile.getPostSaved ();
                personal.current = await profile.getPersonal ();
            }
        }
        function onThenFinalize ()
        {
            setLoad (2);
        }
        function onError (exception)
        {
            console.error (exception);
            setLoad (3); 
        }
        return feed.getPostJob ()
          .then (onThenIndex)
          .then (onThenOwner)
          .then (onThenInfo)
          .then (onThenSession)
          .then (onThenFinalize)
          .catch (onError);
    }
    function onLookup ()
    {
        const url = new URL (window.location.toString ());
        const urlSearch = url.searchParams;

        const lookupOwner = urlSearch.get ("lookup_owner");
        const lookupId = urlSearch.get ("lookup_index");


        if (lookupOwner == null || lookupId == null) 
        {
            console.info ("No search parameters found, ignored");
            return;
        }

        let indexOf = -1;

        for (const key in list.current.item)
        {
            const entry = list.current.item[key];
            console.log (entry);

            if (entry.owner != lookupOwner) continue;
            if (entry.index != lookupId) continue;

            indexOf = key;

            break;
        }
        if (indexOf == -1)
        {
            setToast ({
                show: true,
                msg: "ขออภัย เราไม่สามารถไปยังลิงค์แชร์ของที่โพสต์งานได้",
                type: "secondary",
            });
            return;
        }
        setSelected (indexOf);
        setToast ({
            show: true,
            msg: "เรานำคุณไปยังลิงค์แชร์โพสต์ที่ต้องการแล้ว",
            type: "success",
        });
    }
    
    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: บันทึกโพสต์งานที่กำลังเลือกอยู่
    */
    function onClickJobSave (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }

        if (auth.isLogged () == false)
        {
            //
            // แม้ว่าจะสามารถเก็บได้ก็จริง แต่ข้อมูลก็หายอยู่ดีเมื่อเว็บไซต์ถูกปิดหรือโหลดใหม่
            // ดังนั้นการเข้าสู่ระบบจึงเป็นทางเลือกที่ดีกว่า
            //
            setToast ({
                show: true,
                msg: "คุณต้องเข้าสู่ระบบก่อนจึงสามารถบันทึกได้",
                type: "secondary",
            });
            return;
        }

        const owner = Number (list.current.item[selected].owner);
        const index = Number (list.current.item[selected].index);
        let indexOf = -1;

        for (const key in saved.current.item)
        {
            const entry = saved.current.item[key];

            if (entry.owner != owner) continue;
            if (entry.index != index) continue;

            indexOf = key;

            break;
        }

        if (indexOf == -1) 
        {
            //
            // นำข้อมูลเข้าระบบ UI
            //
            saved.current.item.push ({
                type: 2,
                owner: owner,
                index: index,
            })
            setToast ({ show: true, msg: "บันทึกงานเรียบร้อยแล้ว!", type: "success" });
            //
            // บันทึกข้อมูลโพสต์ลงใน API
            //      
            profile.setPostSaved (saved.current);
        } 
        else 
        {
            //
            // นำข้อมูลออกจากระบบ UI
            //
            saved.current.item.splice (indexOf, 1);
            
            setToast ({
                show: true,
                msg: "ลบออกจากรายการบันทึกแล้ว",
                type: "secondary",
            });
            //
            // บันทึกข้อมูลโพสต์ลงใน API
            //
            profile.setPostSaved (saved.current);
        }
    }
    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: แชร์โพสต์ที่กำลังเลือกดูอยู่
    */
    function onClickJobShare (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        const owner = Number (list.current.item[selected].owner);
        const index = Number (list.current.item[selected].index);
        const url = window.location.hostname;
        const pathname = `${nav.LINK_HOME}?lookup_owner=${owner}&lookup_index=${index}`;

        try
        {
            //
            // วางคลิปบอร์ด (ลิงค์) ให้กับผู้ใช้
            //
            navigator.clipboard.writeText (`${url}${pathname}`)
                .then (() => setToast ({ show: true, msg: "คัดลอกลิงค์แชร์เรียบร้อยแล้ว", type: "success" }))
                .catch (() => setToast ({ show: true, msg: "ขออภัย เราไม่สามารถคัดลอกลิงค์แชร์ได้", type: "danger" }));
        }
        catch (ex)
        {
            console.error (ex);

            //
            // ปกติแล้วไม่น่าจะเกิดขึ้น
            //
            setToast ({ show: true, msg: "ขออภัย เราไม่สามารถคัดลอกลิงค์แชร์ได้", type: "danger" })
        }
    }
    function isSaved (which)
    {
        const owner = Number (list.current.item[which].owner);
        const index = Number (list.current.item[which].index);
        let indexOf = -1;

        for (const key in saved.current.item)
        {
            const entry = saved.current.item[key];

            if (entry.type != 2) continue;
            if (entry.owner != owner) continue;
            if (entry.index != index) continue;

            indexOf = entry;

            break;
        }
        return indexOf != -1;
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

        //
        // เตรียมโหลดข้อมูลจาก API
        //
        onRefreshData ().then (() => onLookup ());

        return () => { mounted.current = false; }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    //
    // ทำงานทุกครั้งเมื่อแท็กค้นหามีการเปลี่ยนแปลง
    //
    useEffect (() =>
    {
        if (mounted == null)
            return;
        if (mounted.current == false)
            return;

        //
        // เราต้องการให้แท็กทั้งหมดนั้นแตกต่างจากอันอื่น
        //
        if (searchTag.includes (0) && searchTag.length > 1)
        {
            setSearchTag (searchTag.filter (x => x !== 0));
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
                  <Img src={icon.search} height={24}/>
                  <Input className="w-50" placeholder="ค้นหางาน"
                        value={search}
                        onChange={(event) => setSearch (event.target.value)}
                  />

                  {/* <Img src={icon.briefcase} height={24}/>
                  <Input className="w-25 " placeholder="ค้นหางาน"
                        value="นักพัฒนาซอฟแวร์"
                        readOnly={true}
                  />
                  <Img src={icon.geoAlt} height={24}/>
                  <Input className="w-25 " placeholder="ค้นหางาน"
                        value="กรุงเทพมหานคร"
                        readOnly={true}
                  /> */}
                </Div>
                </Div>
              <TagBar state={[searchTag, setSearchTag]}>
                <TagBar.Child state={0} text='ทั้งหมด' onClick={() => setSearchTag ([0])}/>
                <TagBar.Child state={profileEm.CATEGORY_IT_DIGITAL} onClick={() => setSearchTag ([1])} text='IT & Digital'/>
                <TagBar.Child state={profileEm.CATEGORY_MARKETING}  onClick={() => setSearchTag ([2])} text='Marketing'/>
                <TagBar.Child state={profileEm.CATEGORY_MANAGEMENT}  onClick={() => setSearchTag ([3])} text='Management'/>
              </TagBar>
            </HeadFilter>
          </Head>
          <Body>
            <JobList
              sLoad={[load, setLoad]}
              sSelected={[selected, setSelected]}
              sSearch={[search, setSearch]}
              sSearchTag={[searchTag, setSearchTag]}
              sFilter={[filter, setFilter]}
              rList={list}
              rListOwner={listOwner}
              rListInfo={listInfo}
              rSaved={saved}
              rPersonal={personal}
              cNew={() => setShowNew (true)}>
            </JobList>
            
            {/* งานที่เลือกไว้ */}
            <BodySelected>
              {selected == -1 ? 
                <PostPlaceholder/> :
                <PostDetail
                  oOwner={listOwner.current.at (selected)}
                  oData={listInfo.current.at (selected)}
                  sSave={auth.isRole (auth.ROLE_EMPLOYER) ? [null, null] : [isSaved(selected), () => onClickJobSave ()]}
                  sShare={[false, () => onClickJobShare ()]}
                  
                />
              }
            </BodySelected>
          </Body>
          <NewPost sShowNew={[showNew, setShowNew]} cPosted={() =>
          {
              setToast ({ show: true, msg: "สร้างโพสต์งานเรียบร้อยแล้ว", type: "success" });
              onRefreshData ();
          }} 
          rPersonal={personal}/>

          {/* Toast Notification (แจ้งเตือน) */}
          <ToastContainer position="bottom-center" className="p-3" style={{ zIndex: 9999 }}>
            <Toast
              onClose={() => setToast({ ...toast, show: false })}
              show={toast.show}
              bg={toast.type === "success" ? "success" : "secondary"}
              delay={toast.delay}
              autohide
              className="text-white fw-bold shadow-sm">
              <Toast.Body>{toast.msg}</Toast.Body>
            </Toast>
          </ToastContainer>
        </ViewportInner>
      </Viewport>
    </>
};

function JobList ({sLoad, sSelected, sSearch, sSearchTag, sFilter, rList, rListOwner, rListInfo, rSaved, cNew })
{
    const auth = api.auth;

    const list = rList.current;
    const listOwner = rListOwner.current;
    const listInfo = rListInfo.current;

    const saved = rSaved.current;

    const [load] = sLoad;
    const [selected, setSelected] = sSelected;
    const [search, setSearch] = sSearch;
    const [searchTag, setSearchTag] = sSearchTag;
    const [filter, setFilter] = sFilter;

    const myPostCount = useRef ({ num: 0 });

    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: เริ่มกระบวณเข้าสู่ระบบ
    */
    function onClickLogin (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        //
        // นำพาไปยังหน้าเข้าสู่ระบบ
        //
        nav.auth (window.location.pathname, undefined);
    }
    /**
     * คำสั่งปุ่มกดทำงานเมื่อต้องการ: เลือกโพสต์ที่ต้องการดู (เป็นรายละเอียด)
    */
    function onClickChild (event, which)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setSelected (which);
    }
    /**
     * เมื่อต้องการแสดงผลรายการ
    */
    function onRenderList ()
    {
        const children = [];

        myPostCount.current.num = 0;

        for (let index = 0; index < list.item.length; index ++)
        {
            const itemHead = list.item[index];
            const itemOwner = listOwner[index];
            const itemValue = listInfo[index];

            if (itemHead.owner == auth.getAccess ())
                myPostCount.current.num += 1;


            //
            // กรองตามที่บันทึกไว้
            //
            let indexOf = -1;

            for (const key in saved.item)
            {
                const entry = saved.item[key];

                if (entry.type != 2) continue;
                if (entry.owner != itemHead.owner) continue;
                if (entry.index != itemHead.index) continue;

                indexOf = key;

                break;
            }
            if (filter == 2 && indexOf == -1) 
            {
                continue;
            }
            //
            // กรองตามแท็ก
            //
            if (searchTag != 0 && searchTag != itemValue.category)
            {
                continue;
            }


            //
            // กรองตามการค้นหา
            //
            if (search != '')
            {
                const m1 =  itemValue.title.toLowerCase ().startsWith (search.toLowerCase ()) ||
                            itemValue.title.toLowerCase ().includes (search.toLowerCase ());
                const m2 =  itemOwner.name.toLowerCase ().startsWith (search.toLowerCase ()) ||
                            itemOwner.name.toLowerCase ().startsWith (search.toLowerCase ());

                if (!m1 && !m2)
                    continue;
            }

            //
            // กรองตามโพสต์ของฉัน
            //
            if (filter == 3)
            {
                if (itemHead.owner != auth.getAccess ())
                    continue;
            }

            //
            // แสดงผลรายการ
            //
            children.push (
              <PostList key={index} 
                  oOwner={itemOwner}
                  oData={itemValue}
                  sActive={[selected === index, () => setSelected (index)]}
                  sSaved={[indexOf != -1]}>
              </PostList>
            );
        }
        //
        // บางครั้งรายการอาจว่างเปล่า สาเหตุก็อาจจะข้อมูลว่าง
        // หรือคำค้นหานั้นไม่ตรงกับข้อมูลใด ๆ
        //
        if (children.length == 0)
        {
            if (filter == 1 && search == "" && searchTag == 0)
                return <></>;

            return <>
              <Div className="d-flex flex-column flex-grow-1 p-4 bg-white rounded-3 shadow-sm">
                <Div className="mb-4 d-flex justify-content-center">
                  <Div className="bg-light rounded-circle p-4">
                    <Img src={filter == 1 ? icon.inbox : filter == 2 ? icon.heart : icon.briefcase} width={48} height={48}/>
                  </Div>
                </Div>
                <Div className="mb-4 w-100">
                  <H2 $variant="primary" $align="center">
                    {filter == 1 && <>ไม่พบงานที่คุณค้นหา</>}
                    {filter == 2 && <>ในนี้ไม่มีอะไรเลยนะ</>}
                    {filter == 3 && <>ในนี้ไม่มีอะไรเลยนะ</>}
                  </H2>
                  <P $variant="secondary" $align="center">
                    {filter == 1 && <>ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นดูนะ</>}
                    {filter == 2 && <>เมื่อคุณบันทึกโพสต์ไว้ โพสต์เหล่านั่นจะปรากฏให้คุณตรงนี้ ลองเริ่มบันทึกโพสต์เลย</>}
                    {(filter == 2 && !auth.isLogged ()) && <>
                      <Br/>
                      <Br/>
                      <Span>(คุณต้องเข้าสู่ระบบก่อนจึงสามารถบันทึกได้)</Span>
                    </>}
                    {filter == 3 && <>โพสต์งานของคุณที่คุณเคยสร้างจะปรากฏให้คุณเห็นตรงนี้<Br/>ลองเริ่มสร้างโพสต์เลย</>}
                  </P>
                </Div>

                {filter === 1 && (
                  <Button onClick={() => { setFilter(1); setSearch (""); setSearchTag ([0]); }}>
                    ล้างตัวกรอง
                  </Button>
                )}
                {filter === 2 && (
                  <Button className="mb-1" onClick={() => setFilter (1)}>
                    กลับไปดูงานทั้งหมด
                  </Button>
                )}
                {(filter === 2 && !auth.isLogged ()) && (
                  <Button className="mb-1" onClick={onClickLogin}>
                    <Img src={icon.unlock}/>
                    <Span>เข้าสู่ระบบ</Span>
                  </Button>
                )}
              </Div>
            </>;
        }
        return children;
    }

    return <>
      {/* พื้นที่เลือกรายการสมัครงาน */}
      <BodyList>
        {/* พื้นที่คงที่ไม่ขยับ */}
        <Div>
          {/* เมนู */}
          <Div>  
            {/* รายเลือกมุมมอง (สลับดูงานทั้งหมด/งานที่บันทึก) */}
            <Div className="d-flex gap-2">
              <MenuBar direction='horizontal' state={[filter, setFilter]} className="p-1 rounded-3 shadow-sm mb-3 d-flex">
                <MenuBar.Child className="flex-grow-1" state={1} icon={icon.listTask} text={`งานทั้งหมด (${list.item.length})`}/>
                {auth.isRole (auth.ROLE_EMPLOYER) ? 
                  (<MenuBar.Child className="flex-grow-1" state={3} icon={icon.sticky} text={`โพสต์ของฉัน (${myPostCount.current.num})`}/>) :
                  (<MenuBar.Child className="flex-grow-1" state={2} icon={icon.heart} text={`บันทึกไว้ ${saved.item.length > 0 ? `(${saved.item.length})` : ``}`}/>)
                }
              </MenuBar>
              {
                  auth.isRole (auth.ROLE_EMPLOYER) &&
                  <Button style={{ width: '48px',height: '48px', padding: '8px'}} onClick={() => cNew (true)}>
                    <Img src={icon.plusCircle} height={24}/>
                  </Button>
              }
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
            {
              load == 1 &&
              <Div className="d-flex flex-column flex-grow-1 p-4 bg-white rounded-3 shadow-sm">
                <Div className="mb-4 d-flex justify-content-center">
                  <Div className="bg-light rounded-circle p-4">
                    <Img src={filter == 1 ? icon.inbox : icon.heart} width={48} height={48}/>
                  </Div>
                </Div>
                <Div className="mb-4 w-100">
                  <H2 $align="center">กำลังโหลด</H2>
                </Div>
              </Div>
            }
            {
              load == 2 &&
              <>
                {onRenderList ()}
              </>
            }
            {
              load == 3 &&
              <Div className="d-flex flex-column flex-grow-1 p-4 bg-white rounded-3 shadow-sm">
                <Div className="mb-4 d-flex justify-content-center">
                  <Div className="bg-light rounded-circle p-4">
                    <Img src={icon.exclamation} width={48} height={48}/>
                  </Div>
                </Div>
                <Div className="mb-4 w-100">
                  <H2 $align="center">เกิดข้อผิดพลาด</H2>
                  <P $align="center" $variant="secondary">เราไม่สามารถโหลดข้อมูลโพสต์งานได้</P>
                </Div>
              </Div>
            }
          </Div>           
        </Div>
      </BodyList>
    </>
}
function JobDetail ()
{

}

function NewPost ({sShowNew, cPosted, rPersonal })
{
    const profileEm = api.profileEm;
    const [showNew, setShowNew] = sShowNew; 

    const [jobData, setJobData] = useState(
    {
        title: "", 
        company: rPersonal.current.nickname.value, 
        logoUrl: "https://placehold.co/80x80/ea580c/ffffff?text=BCP", 
        location: "กรุงเทพฯ",
        type: 1, 
        category: 1, 
        salary: "50000-80000", 
        description: "* กำหนดกลยุทธ์ด้านการดำเนินงาน\n* บริหารจัดการทีม", 
        qualifications: "* ปริญญาตรี\n* ประสบการณ์ 5 ปี"
    });
    const [validated, setValidated] = useState (false);
    const [disabled, setDisabled] = useState (false);

    useEffect (() =>
    {
        setJobData ({ ... jobData, company:  rPersonal.current.nickname.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showNew]);

    const handleSubmit = (event) => 
    {
        event.preventDefault();

        if (event.currentTarget.checkValidity() === false) 
        {
            event.stopPropagation();
            setValidated(true);
            return;
        }
      
      const post = new profileEm. DataPost ();

      post.title = jobData.title;
      post.workTime = jobData.type;
      post.location = jobData.location;
      post.description = jobData.description;
      post.requirement = jobData.qualifications;
      post.category = jobData.category;
      post.created = new Date ();


      if (jobData.salary == "")
      {
          post.minSalary = 0;
          post.maxSalary = 0;
      }
      else
      {
          const split = jobData.salary.split ('-');

          if (split.length != 2)
          {
              alert ("กรุณาป้อนเงินเดือนให้ถูกต้อง");
              return;
          }
          const min = parseInt (split[0]);
          const max = parseInt (split[1]);

          if (isNaN (min) || isNaN (max))
          {
              alert ("กรุณาป้อนเงินเดือนให้ถูกต้อง");
              return
          }
          post.minSalary = min;
          post.maxSalary = max;
      }
      setDisabled (true);

      profileEm.createPost (post).then (() =>
      {
          setDisabled (false);
          setShowNew (false);
          cPosted ();
      })
      .catch ((ex) =>
      {
          console.log (ex);

          setDisabled (false);
          alert ("เกิดข้อผิดพลาดบางอย่างในขณะที่สร้างโพสต์");
      });
  };

  const handleChange = (e) => setJobData({ ...jobData, [e.target.name]: e.target.value });
    return <>
    <Div style={{ 
      position: 'fixed', inset: 0,
      pointerEvents: showNew ? 'all' : 'none',
      display: showNew ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
    }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
              <div className="mb-4">
                  <Button $variant="outlined" disabled={disabled} onClick={() => setShowNew (false)}>
                      <ArrowLeft size={18} className="me-1"/>
                      <Span>ย้อนกลับ</Span>
                  </Button>
              </div>
            <Card className="border-0 shadow-lg rounded-4 p-4">
              <div className="text-center mb-4">
                  {/* text-primary คือ Mint Green */}
                  <UploadCloud size={48} className="text-primary mb-2" />
                  <h3 className="fw-bold">ลงประกาศงานใหม่</h3>
              </div>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>ตำแหน่งงาน</Form.Label>
                    <Form.Control required name="title" disabled={disabled} value={jobData.title} onChange={handleChange} placeholder="เช่น UX/UI Designer" />
                  </Form.Group>
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>บริษัท</Form.Label>
                    {/* กำหนดให้เป็นบริษัทเดียวกับ Mock data */}
                    <Form.Control required name="company" value={jobData.company} onChange={handleChange} readOnly disabled /> 
                  </Form.Group>
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>สถานที่</Form.Label>
                    <Form.Control name="location" disabled={disabled} value={jobData.location} onChange={handleChange} placeholder="เช่น สีลม, กรุงเทพฯ" />
                  </Form.Group>
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>เงินเดือน</Form.Label>
                    <Form.Control name="salary" disabled={disabled} value={jobData.salary} onChange={handleChange} placeholder="เช่น 30k - 50k" />
                  </Form.Group>
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>หมวดหมู่</Form.Label>
                    <Form.Select name="category" disabled={disabled} value={jobData.category} onChange={handleChange}>
                      <option value={profileEm.CATEGORY_IT_DIGITAL}>IT & Digital</option>
                      <option value={profileEm.CATEGORY_MARKETING}>Marketing</option>
                      <option value={profileEm.CATEGORY_MANAGEMENT}>Management</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>เวลางาน</Form.Label>
                    <Form.Select name="type" disabled={disabled} value={jobData.type} onChange={handleChange}>
                      <option value={profileEm.WORK_TIME_FULL}>เต็มเวลา</option>
                      <option value={profileEm.WORK_TIME_PART}>พาร์ทไทม์</option>
                      <option value={profileEm.WORK_TIME_CONTRACT}>ตามเงื่อนไขสัญญา</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="12" className="mb-3">
                    <Form.Label>รายละเอียดงาน (ขึ้นบรรทัดใหม่ด้วย * เพื่อทำเป็นข้อๆ)</Form.Label>
                    <Form.Control required as="textarea" rows={4} name="description" value={jobData.description} onChange={handleChange} placeholder="รายละเอียดงาน..." />
                  </Form.Group>
                  <Form.Group as={Col} md="12" className="mb-3">
                    <Form.Label>คุณสมบัติ</Form.Label>
                    <Form.Control as="textarea" rows={3} name="qualifications" value={jobData.qualifications} onChange={handleChange} placeholder="คุณสมบัติผู้สมัคร..." />
                  </Form.Group>
                </Row>
                <div className="d-grid mt-3">
                  {/* variant="primary" คือ Mint Green */}
                  <Button type="submit" variant="primary" size="lg" disabled={disabled}>โพสต์งานทันที</Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Div>
    </>
}

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
`;

const BodySelected = styled.div `

    width: 768px;

    padding: 24px 0px 24px 0px;
`;