import api from '../../Script/Api'
import nav from '../../Script/Navigator'
import icon from '../../Script/Icon'
import { auth, profileOf } from '../../Script/Api'
import { Button, Img } from '../../Component/Common';
import styled from 'styled-components';

export default function Start ({oId, oLoading, rData})
{
    /* eslint-disable no-unused-vars */

    let rBasic      = new auth.DataBasic ();
    let rContact    = new profileOf.DataContact ();
    let rEducation  = new profileOf.DataEducation ();
    let rInterest   = new profileOf.DataInterest ();
    let rJob        = new profileOf.DataJob ();
    let rPersonal   = new profileOf.DataPersonal ();
    let rSkill      = new profileOf.DataSkill ();
    let rSocial     = new profileOf.DataSocial ();
    let rTheme      = new profileOf.DataTheme ();
    let rEditable   = Boolean (rData.current.editable);

    rBasic       = rData.current.basic;
    rContact     = rData.current.contact;
    rEducation   = rData.current.education;
    rInterest    = rData.current.interest;
    rJob         = rData.current.job;
    rPersonal    = rData.current.personal;
    rSkill       = rData.current.skill;
    rSocial      = rData.current.social;
    rTheme       = rData.current.theme;

    let imageBG   = "";
    let imageIcon = "";
    let fullname  = "";
    let nickname  = "";
    let status    = "";
    let birthday  = "";
    let location  = "";
    let contact   = "";

    if (oLoading == false)
    {
        imageBG   = api.decodeContent (rPersonal.background);
        imageIcon = api.decodeContent (rPersonal.icon);

        fullname  = [rPersonal.firstName, rPersonal.middleName, rPersonal.lastName].join (' ').trimEnd ();
        nickname  = rPersonal.nickname;
        status    = rPersonal.status;
        birthday  = "";
        location  = rPersonal.location;
        contact   = "";

        if (fullname == "") fullname = rPersonal.nickname;
        if (fullname == "") fullname = rBasic.name;
        if (fullname == "") fullname = "ชื่อถูกซ่อน";

        if (nickname == "") nickname = "ไม่ระบุ/ซ่อน";

        if (isFinite (rPersonal.birthday.getTime ()))  
          birthday = rPersonal.birthday.toLocaleDateString ();
        else 
          birthday = "ไม่ระบุ/ซ่อน";
    }

    function onClickEdit ()
    {
        nav.userSettings (2);
    }
    function onClickShare ()
    {
        const baseline = window.location.hostname;
        const extension = `/user-profile?id=${oId}`;

        navigator.clipboard.writeText (`${baseline}${extension}`).then (() =>
        {
            // setToast ({ show: true, msg: "คัดลอกลิงค์แชร์เรียบร้อยแล้ว", type: "success" });
        });
    }

    return (
      <Viewport>
        <ViewportInner style={{ opacity: oLoading ? "0.5" : "1.0" }}>
            <div className='w-100 h-100 d-flex justify-content-center'>
              <div className="position-absolute container">
                <div className='d-flex align-items-center'>
                  <h1 className="mt-4 mb-4">โปรไฟล์</h1>
                  <div className='flex-grow-1'></div>
                  <div>
                    <Button $variant='outlined' style={{  width: '40px', height: '40px', padding: 0}} onClick={onClickShare}>
                      <Img src={icon.share} height={24}/>
                    </Button>
                  </div>
                </div>
                <main className="row">
                  <aside className="col-lg-4">
                    {/* การ์ดโปรไฟล์ */}
                    <div className="card text-center mb-4 border-1 shadow-sm">
                      {/* รูปภาพโปรไฟล์ */}
                      <img src={imageBG} style={{ height: "140px", backgroundColor: "#d9d9d9d9", objectFit: 'cover' }} className="card-img-top"></img>
                      <div className="card-body"> 
                        <img src={imageIcon} 
                            className="rounded-circle mx-auto bg-secondary-subtle"
                            style={{ width: "120px", height: "120px", marginTop: "-60px", border: "4px solid white", objectFit: 'cover' }}/>

                        <h2 className="card-title h2 mt-3 mb-1">{fullname}</h2>
                        <p className="card-text text-muted mb-3">{status}</p>
                        { rEditable ? (<button className="btn btn-light w-100 fw-bold" style={{ backgroundColor: "#d9d9d9d9" }} onClick={onClickEdit}>แก้ไขโปรไฟล์</button>) : (<></>) }
                      </div>
                    </div>
                    {/* ข้อมูลส่วนตัว */}
                    <div className="card mb-4 border-1 shadow-sm">
                      <div className="card-body">
                        <h3 className="card-title h5 mb-3">ข้อมูลส่วนตัว</h3>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">ชื่อเล่น</span>
                          <span className="fw-bold">{nickname}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">วันเกิด</span>
                          <span className="fw-bold">{birthday}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">ที่อยู่</span>
                          <span className="fw-bold">{location}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">ติดต่อ</span>
                          <span className="fw-bold">{contact}</span>
                        </div>
                      </div>
                    </div>
                  </aside>

                  <div className="col-lg-8">
                    <div className="row g-3">
                      {/* ความสนใจ */}
                      <div className="col-md-6">
                        <div className="card mb-4 border-1 shadow-sm h-100">
                          <div className="card-body">
                            <h3 className="card-title h2 mb-3">ความสนใจ</h3>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              {rInterest.item.map ((value, index) => 
                              {
                                  return <span key={index} className="badge bg-light text-dark rounded-pill px-3 py-2 fw-normal">
                                      {String(value)}
                                  </span>
                              })}
                              {rInterest.item.length == 0 ?
                                  <p>ไม่มีการระบุข้อมูลความสนใจ</p> : <></>
                              }
                            </div>
                            {/* { editable ?
                              (<button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><img src={icon.Plus} className="me-1"/> เพิ่ม</button>) :
                              (<></>)
                            } */}
                          </div>
                        </div>
                      </div>
                      {/* ทักษะ */}
                      <div className="col-md-6">
                        <div className="card mb-4 border-1 shadow-sm h-100">
                          <div className="card-body">
                            <h3 className="card-title h3 mb-3">ทักษะ</h3>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              {rSkill.item.map ((value) => 
                              {
                                  return <span className="badge bg-light text-dark rounded-pill px-3 py-2 fw-normal">
                                      {String(value)}
                                  </span>
                              })}
                              {rSkill.item.length == 0 ?
                                  <p>ไม่มีการระบุข้อมูลทักษะ</p> : <></>
                              }
                            </div>
                            {/* { editable ? (<button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><img src={icon.Plus} className="me-1"/> เพิ่ม</button>) : <></> } */}
                          </div>
                        </div>
                      </div>
                      {/* การศึกษา */}
                      <div className="col-md-6">
                        <div className="card mb-4 border-1 shadow-sm h-100">
                          <div className="card-body">
                            <h3 className="card-title h3 mb-3">การศึกษา</h3>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              <p>ไม่มีการระบุข้อมูลการศึกษา</p>
                            </div>
                            {/* { editable ? (<button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><img src={icon.Plus} className="me-1"/> เพิ่ม</button>) : (<></>) } */}
                          </div>
                        </div>
                      </div>
                      {/* ประสบการณ์ */}
                      <div className="col-md-6">
                        <div className="card mb-4 border-1 shadow-sm h-100">
                          <div className="card-body">
                            <h3 className="card-title h3 mb-3">ประสบการณ์</h3>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              <p>ไม่มีการระบุข้อมูลประสบการณ์</p>
                            </div>
                            {/* { editable ? (<button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><img src={icon.Plus} className="me-1"/> เพิ่ม</button>) : <></> } */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
        </ViewportInner>
      </Viewport>
    );
}

const Viewport = styled.div `

    position: absolute;
    inset: 0;
    top: 56px;

    background-color: var(--app-bg-1);
`;
const ViewportInner = styled.div `

    width: 100%;
    height: 100%;
`;