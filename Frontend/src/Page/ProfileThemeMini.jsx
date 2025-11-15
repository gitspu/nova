import { Plus } from "react-bootstrap-icons";

import * as api from "../Script/Api";

export function ProfileThemeMini ({inset, state})
{
    let contact    = new api.profileOf.DataContact ();
    let education  = new api.profileOf.DataEducation ();
    let interest   = new api.profileOf.DataInterest ();
    let job        = new api.profileOf.DataJob ();
    let personal   = new api.profileOf.DataPersonal ();
    let skill      = new api.profileOf.DataSkill ();
    let social     = new api.profileOf.DataSocial ();
    let theme      = new api.profileOf.DataTheme ();
    let editable   = Boolean (state.editable);


    contact     = state.contact;
    education   = state.education;
    interest    = state.interest;
    job         = state.job;
    personal    = state.personal;
    skill       = state.skill;
    social      = state.social;
    theme       = state.theme;

    
    return <Container>
        <Title/>

        <main className="row">
        <aside className="col-lg-4">
          {/* การ์ดโปรไฟล์ */} <BlockOverview/>
          {/* ข้อมูลส่วนตัว */} <BlockPersonal/>
        </aside>

        <div className="col-lg-8">
          <div className="row g-3">
            {/* ความสนใจ */} <BlockInterest/>
            {/* ทักษะ */} <BlockSkill/>
            {/* การศึกษา */} <BlockEducation/>
            {/* ประสบการณ์ */}
            <div className="col-md-6">
              <div className="card mb-4 border-1 shadow-sm h-100">
                <div className="card-body">
                  <h3 className="card-title h3 mb-3">ประสบการณ์</h3>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <p>ไม่มีการระบุข้อมูลประสบการณ์</p>
                  </div>
                  {
                    editable ?
                    <button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><Plus className="me-1" /> เพิ่ม</button> :
                    <></>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>

    function Container ({children}) 
    { 
        return <div className="position-absolute container" style={{ inset: inset }}>{children}</div>
    }
    function Title ()
    {
        return <h1 className="mt-4 mb-4">โปรไฟล์</h1>
    }

    function BlockOverview ()
    {
        let icon = null;
        let background = null;

        let name = "";
        let status = "";

        if (personal.icon != "") icon = api.decodeContent (personal.icon);
        if (personal.background != "") background = api.decodeContent (personal.background);

        name = [personal.firstName.value, personal.middleName.value, personal.lastName.value].join (' ').trimEnd ();

        if (name == "") name = personal.nickname;
        if (name == "") name = "ชื่อถูกซ่อน";

        status = personal.status.value;

        return <div className="card text-center mb-4 border-1 shadow-sm">
          {/* รูปภาพโปรไฟล์ */}
          <img
            src={background}
            style={{ height: "140px", backgroundColor: "#d9d9d9d9" }}
            className="card-img-top"
          ></img>

          <div className="card-body">
            <img
              src={icon}
              className="rounded-circle mx-auto bg-secondary-subtle"
              style={{
                width: "120px",
                height: "120px",
                marginTop: "-60px",
                border: "4px solid white",
              }}
            ></img>

            <h2 className="card-title h2 mt-3 mb-1">{name}</h2>
            <p className="card-text text-muted mb-3">{status}</p>

            {
              editable ? 
              <button className="btn btn-light w-100 fw-bold" style={{ backgroundColor: "#d9d9d9d9" }}>แก้ไขโปรไฟล์</button> : 
              <></>
            }
          </div>
        </div>
    }

    function BlockPersonal ()
    {
        let nickname = "";
        let birthday = "";
        let location = "";
        let contact = "";

        nickname = personal.nickname;
        birthday = personal.birthday.toLocaleDateString ();
        location = personal.location;

        if (nickname == "") nickname = "ไม่มีข้อมูล/ซ่อน";
        if (birthday == "Invalid Date") nickname = "ไม่มีข้อมูล/ซ่อน";

        return <div className="card mb-4 border-1 shadow-sm">
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
    }
    function BlockInterest ()
    {
        return <div className="col-md-6">
          <div className="card mb-4 border-1 shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title h2 mb-3">ความสนใจ</h3>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {interest.item.map ((value, index) => 
                {
                    return <span key={index} className="badge bg-light text-dark rounded-pill px-3 py-2 fw-normal">
                        {String(value)}
                    </span>
                })}
                {interest.item.length == 0 ?
                    <p>ไม่มีการระบุข้อมูลความสนใจ</p> : <></>
                }
              </div>
              {
                editable ?
                <button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><Plus className="me-1" /> เพิ่ม</button> :
                <></>
              }
            </div>
          </div>
        </div>
    }
    function BlockSkill ()
    {
        return <div className="col-md-6">
          <div className="card mb-4 border-1 shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title h3 mb-3">ทักษะ</h3>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {skill.item.map ((value) => 
                {
                    return <span className="badge bg-light text-dark rounded-pill px-3 py-2 fw-normal">
                        {String(value)}
                    </span>
                })}
                {skill.item.length == 0 ?
                    <p>ไม่มีการระบุข้อมูลทักษะ</p> : <></>
                }
              </div>
              {
                editable ?
                <button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><Plus className="me-1" /> เพิ่ม</button> :
                <></>
              }
            </div>
          </div>
        </div>
    }
    function BlockEducation ()
    {
        return <div className="col-md-6">
          <div className="card mb-4 border-1 shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title h3 mb-3">การศึกษา</h3>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <p>ไม่มีการระบุข้อมูลการศึกษา</p>
              </div>
                {
                    editable ?
                    <button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><Plus className="me-1" /> เพิ่ม</button> :
                    <></>
                }
            </div>
          </div>
        </div>
    }
}