
import IconEmojiSmile from './icon/EmojiSmile.svg'
import { Plus } from "react-bootstrap-icons";

import * as auth from './../api/authentication'
import * as authUI from './Auth';
import * as profile from './../api/profile'

import './../assets/css/Profile.css'
import { useNavigate } from "react-router-dom";


const Profile = () => {
  return (
    <div className="container">
      <h1 className="h3 mb-4">โปรไฟล์</h1>

      <main className="row">
        <aside className="col-lg-4">
          {/* การ์ดโปรไฟล์ */}
          <div className="card text-center mb-4 border-1 shadow-sm">
            {/* รูปภาพโปรไฟล์ */}
            <div
              style={{ height: "140px", backgroundColor: "#d9d9d9d9" }}
              className="card-img-top"
            ></div>

            <div className="card-body">
              <div
                className="rounded-circle mx-auto bg-secondary-subtle"
                style={{
                  width: "120px",
                  height: "120px",
                  marginTop: "-60px",
                  border: "4px solid white",
                }}
              ></div>

              <h2 className="card-title h5 mt-3 mb-1">ชื่อ - นามสกุล</h2>
              <p className="card-text text-muted mb-3">อีเมล@example.com</p>
              <button
                className="btn btn-light w-100 fw-bold"
                style={{ backgroundColor: "#d9d9d9d9" }}
              >
                แก้ไขโปรไฟล์
              </button>
            </div>
          </div>

          {/* ข้อมูลส่วนตัว */}
          <div className="card mb-4 border-1 shadow-sm">
            <div className="card-body">
              <h3 className="card-title h5 mb-3">ข้อมูลส่วนตัว</h3>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">ชื่อเล่น</span>
                <span className="fw-bold"></span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">วันเกิด</span>
                <span className="fw-bold">00/00/0000</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">ที่อยู่</span>
                <span className="fw-bold">กรุงเทพมหานคร</span>
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
                  <button
                    className="btn w-100 border-2 border-dashed fw-bold"
                    style={{ backgroundColor: "#d9d9d9" }}
                  >
                    <Plus className="me-1" /> เพิ่ม
                  </button>
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
                  <button
                    className="btn w-100 border-2 border-dashed fw-bold"
                    style={{ backgroundColor: "#d9d9d9" }}
                  >
                    <Plus className="me-1" /> เพิ่ม
                  </button>
                </div>
              </div>
            </div>

            {/* การศึกษา */}
            <div className="col-md-6">
              <div className="card mb-4 border-1 shadow-sm h-100">
                <div className="card-body">
                  <h3 className="card-title h5 mb-3">การศึกษา</h3>
                  <div className="d-flex flex-wrap gap-2 mb-3"></div>
                  <button
                    className="btn w-100 border-2 border-dashed fw-bold"
                    style={{ backgroundColor: "#d9d9d9" }}
                  >
                    <Plus className="me-1" /> เพิ่ม
                  </button>
                </div>
              </div>
            </div>

            {/* ประสบการณ์ */}
            <div className="col-md-6">
              <div className="card mb-4 border-1 shadow-sm h-100">
                <div className="card-body">
                  <h3 className="card-title h5 mb-3">ประสบการณ์</h3>
                  <div className="d-flex flex-wrap gap-2 mb-3"></div>
                  <button
                    className="btn w-100 border-2 border-dashed fw-bold"
                    style={{ backgroundColor: "#d9d9d9" }}
                  >
                    <Plus className="me-1" /> เพิ่ม
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export function ProfileHead ()
{
    const navigate = useNavigate ();
    function logout ()
    {
      alert ("Logged Out");
     
      if (auth.isLogged ()) {
          auth.logout ();
      }
      navigate ("/");
    }
    return <div>
        <img src="" width={48} height={48} onClick={() => logout()}></img>
    </div>
}
export function ProfileCard ()
{
    const navigate = useNavigate ();
    function logout ()
    {
        if (auth.isLogged ()) 
        {
            auth.logout ();
            authUI.navigate ();
        }
        else
        {
            authUI.navigate ();
        }
    }
   
    let src = IconEmojiSmile;
    let name = auth.isLogged () ? "" : "เข้าสู่ระบบ";
    let status = "";

    if (auth.isLogged () && auth.isActive ())
    {
        try
        {
            const data = profile.getPersonal ();

            if (data.icon != "") {
                src = `data:image/jpeg;base64, ${data.icon}`
            }
            if (data.firstName != "") {
                name += data.firstName.value + " ";
            }
            if (data.middleName != "") {
                name += data.middleName.value + " ";
            }
            if (data.lastName != "") {
                name += data.lastName.value + " ";
            }

            name = name.trimEnd ();

            if (name == "" || name == null) {
                name = auth.getName ();
            }

            status = data.status.value;
        }
        catch (ex)
        {
            name = auth.getName ();
            console.error ("Profile: Unable to fetch personal data, scope: ProfileCard");
        }
    }

    return <div className="d-flex border rounded-2" style={{ width: '192px', height: '48px'}} onClick={() => logout()}>
        <div className="" style={{minWidth: '48px'}}>
          <img src={src} height='100%' className="p-1 rounded-circle"></img>
        </div>
        <div className="flex-grow-1 align-content-center">
          <p className="p-0 m-0 ms-2 text-primary">{name}</p>
          <p className="p-0 m-0 ms-2 text-secondary" style={{fontSize: '0.75rem'}}>{status}</p>
        </div>
    </div>
}

export default Profile;
