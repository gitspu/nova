import api from '../../Script/Api'
import nav from '../../Script/Navigator'
import icon from '../../Script/Icon'
import { auth, profileOf } from '../../Script/Api'
import { Button, Img } from '../../Component/Common';

export default function Start ({id, state})
{
    let basic      = new auth.DataBasic ();
    // let contact    = new API.profileOf.DataContact ();
    // let education  = new API.profileOf.DataEducation ();
    let interest   = new profileOf.DataInterest ();
    // let job        = new API.profileOf.DataJob ();
    let personal   = new profileOf.DataPersonal ();
    let skill      = new profileOf.DataSkill ();
    // let social     = new API.profileOf.DataSocial ();
    // let theme      = new API.profileOf.DataTheme ();
    let editable   = Boolean (state.editable);

    basic       = state.basic;
    // contact     = state.contact;
    // education   = state.education;
    interest    = state.interest;
    // job         = state.job;
    personal    = state.personal;
    skill       = state.skill;
    // social      = state.social;
    // theme       = state.theme;

    let showBackground = api.decodeContent (personal.background);
    let showIcon       = api.decodeContent (personal.icon);
    let showName       = [personal.firstName, personal.middleName, personal.lastName].join (' ').trimEnd ();
    let showNickname   = personal.nickname;
    let showStatus     = personal.status;
    let showBirthday   = "";
    let showLocation   = personal.location;
    let showContact    = "";

    if (showName == "") showName = personal.nickname;
    if (showName == "") showName = basic.name;
    if (showName == "") showName = "ชื่อถูกซ่อน";

    
    if (showNickname == "") showNickname = "ไม่ระบุ/ซ่อน";

    if (isFinite (personal.birthday.getTime ())) 
      showBirthday = personal.birthday.toLocaleDateString ();
    else 
      showBirthday = "ไม่ระบุ/ซ่อน";

    const onEdit = () =>
    {
        nav.userSettings (2);
    }
    const onShare = () =>
    {
        const baseline = window.location.hostname;
        const extension = `/user-profile?id=${id}`;

        navigator.clipboard.writeText (`${baseline}${extension}`).then (() =>
        {
            // setToast ({ show: true, msg: "คัดลอกลิงค์แชร์เรียบร้อยแล้ว", type: "success" });
        });
    }

    return (
      <div style={{ position: 'absolute', inset: '0px', top: '56px' }}>
        <div className='w-100 h-100 d-flex justify-content-center'>
          <div className="position-absolute container">
            <div className='d-flex align-items-center'>
              <h1 className="mt-4 mb-4">โปรไฟล์</h1>
              <div className='flex-grow-1'></div>
              <div>
                <Button $variant='outlined' style={{  width: '40px', height: '40px', padding: 0}} onClick={onShare}>
                  <Img src={icon.share} height={24}/>
                </Button>
              </div>
            </div>
            <main className="row">
              <aside className="col-lg-4">
                {/* การ์ดโปรไฟล์ */}
                <div className="card text-center mb-4 border-1 shadow-sm">
                  {/* รูปภาพโปรไฟล์ */}
                  <img src={showBackground} style={{ height: "140px", backgroundColor: "#d9d9d9d9", objectFit: 'cover' }} className="card-img-top"></img>
                  <div className="card-body"> 
                    <img src={showIcon} 
                        className="rounded-circle mx-auto bg-secondary-subtle"
                        style={{ width: "120px", height: "120px", marginTop: "-60px", border: "4px solid white", objectFit: 'cover' }}/>

                    <h2 className="card-title h2 mt-3 mb-1">{showName}</h2>
                    <p className="card-text text-muted mb-3">{showStatus}</p>
                    { editable ? (<button className="btn btn-light w-100 fw-bold" style={{ backgroundColor: "#d9d9d9d9" }} onClick={onEdit}>แก้ไขโปรไฟล์</button>) : (<></>) }
                  </div>
                </div>
                {/* ข้อมูลส่วนตัว */}
                <div className="card mb-4 border-1 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title h5 mb-3">ข้อมูลส่วนตัว</h3>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">ชื่อเล่น</span>
                      <span className="fw-bold">{showNickname}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">วันเกิด</span>
                      <span className="fw-bold">{showBirthday}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">ที่อยู่</span>
                      <span className="fw-bold">{showLocation}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">ติดต่อ</span>
                      <span className="fw-bold">{showContact}</span>
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
      </div>
    );
}