import { Plus } from "react-bootstrap-icons";

import * as auth from "../Script/Authentication";
import * as profile from "../Script/Profile";

export function Profile ()
{

    const block = profile.getPersonal ();

    let icon = block.icon != null && block.icon != undefined ? `data:image/jepg;base64, ${block.icon}` : null;
    let background = block.background != null && block.background != undefined ? `data:image/jepg;base64, ${block.background}` : null;

    let name = [block.firstName.value, block.middleName.value, block.lastName.value].join (' ');
    let email = "อีเมล@example.com";

    let nickname = block.nickname.value;
    let birthday = block.birthday.value.toLocaleDateString();
    let location = block.location.value;
    let editable = true;

    if (name == "") {
        name = auth.getName ();
    }

    return <Container>
        <Title/>

        <main className="row">
        <aside className="col-lg-4">
          {/* การ์ดโปรไฟล์ */}
          <div className="card text-center mb-4 border-1 shadow-sm">
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

              <h2 className="card-title h5 mt-3 mb-1">{name}</h2>
              <p className="card-text text-muted mb-3">{email}</p>

              {
                editable ? 
                <button className="btn btn-light w-100 fw-bold" style={{ backgroundColor: "#d9d9d9d9" }}>แก้ไขโปรไฟล์</button> : 
                <></>
              }
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
                <span className="fw-bold"></span>
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
                  <h3 className="card-title h5 mb-3">ความสนใจ</h3>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="badge bg-light text-dark rounded-pill px-3 py-2 fw-normal">
                      อ่านหนังสือ
                    </span>
                    <span className="badge bg-light text-dark rounded-pill px-3 py-2 fw-normal">
                      ท่องเที่ยว
                    </span>
                    <span className="badge bg-light text-dark rounded-pill px-3 py-2 fw-normal">
                      ถ่ายรูป
                    </span>
                  </div>
                  {
                    editable ?
                    <button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><Plus className="me-1" /> เพิ่ม</button> :
                    <></>
                  }
                </div>
              </div>
            </div>

            {/* ทักษะ */}
            <div className="col-md-6">
              <div className="card mb-4 border-1 shadow-sm h-100">
                <div className="card-body">
                  <h3 className="card-title h5 mb-3">ทักษะ</h3>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="badge bg-light text-dark rounded-pill px-3 py-2 fw-normal">
                      ทำอาหาร
                    </span>
                    <span className="badge bg-light text-dark rounded-pill px-3 py-2 fw-normal">
                      วาดรูป
                    </span>
                  </div>
                  {
                    editable ?
                    <button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><Plus className="me-1" /> เพิ่ม</button> :
                    <></>
                  }
                </div>
              </div>
            </div>

            {/* การศึกษา */}
            <div className="col-md-6">
              <div className="card mb-4 border-1 shadow-sm h-100">
                <div className="card-body">
                  <h3 className="card-title h5 mb-3">การศึกษา</h3>
                  <div className="d-flex flex-wrap gap-2 mb-3"></div>
                  {
                    editable ?
                    <button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><Plus className="me-1" /> เพิ่ม</button> :
                    <></>
                  }
                </div>
              </div>
            </div>

            {/* ประสบการณ์ */}
            <div className="col-md-6">
              <div className="card mb-4 border-1 shadow-sm h-100">
                <div className="card-body">
                  <h3 className="card-title h5 mb-3">ประสบการณ์</h3>
                  <div className="d-flex flex-wrap gap-2 mb-3"></div>
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
        return <div className="container">{children}</div>
    }
    function Title ()
    {
        return <h3 className="mt-4 mb-4">โปรไฟล์</h3>
    }
}