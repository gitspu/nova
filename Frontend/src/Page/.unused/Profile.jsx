import api from '../Script/Api'
import icon from '../Script/Icon'
import navigator from '../Script/Navigator'

import './Style/Profile.css'


const NotFound = () =>
{
    return (
       <div className='page-profile'>
        <div className='not-found'>
          <h1 className='text-h1 text-bold'>🤤 เอ้ ๆ แปลกจัง ๆ</h1>
          <br/>
          <p>ลิงค์โปรไฟล์นี้ไม่ถูกต้อง หรือ ไม่มีอยู่ในระบบ</p>
          <br/>
          <button className='button-primary' onClick={() => navigator.home ()}>
            กลับหน้าแรก
          </button>
        </div>
      </div>
    );
}
const NotAvailable = ({ message = ''}) =>
{
    return (
      <div className='page-profile'>
        <div className='not-available'>
          <h1 className='text-h1 text-bold'>😭 ระบบเกิดข้อขัดข้อง</h1>
          <br/>
          <p>นี้คือรายละเอียดทางเทคนิค (ถ้าคุณต้องการ)</p>
          <p>{String(message)}</p>
          <br/>
          <button className='button-primary' onClick={() => navigator.home ()}>
            กลับหน้าแรก
          </button>
        </div>
      </div>
    );
};
const ThemeMinimal = ({state}) =>
{
    let basic      = new api.auth.DataBasic ();
    // let contact    = new API.profileOf.DataContact ();
    // let education  = new API.profileOf.DataEducation ();
    let interest   = new api.profileOf.DataInterest ();
    // let job        = new API.profileOf.DataJob ();
    let personal   = new api.profileOf.DataPersonal ();
    let skill      = new api.profileOf.DataSkill ();
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
        navigator.settings (2);
    }

    return (
      <div className='w-100 h-100 d-flex justify-content-center'>
        <div className="position-absolute container">
          <h1 className="mt-4 mb-4">โปรไฟล์</h1>
          <main className="row">
            <aside className="col-lg-4">
              {/* การ์ดโปรไฟล์ */}
              <div className="card text-center mb-4 border-1 shadow-sm">
                {/* รูปภาพโปรไฟล์ */}
                <img src={showBackground} style={{ height: "140px", backgroundColor: "#d9d9d9d9" }} className="card-img-top"></img>
                <div className="card-body"> 
                  <img src={showIcon} 
                      className="rounded-circle mx-auto bg-secondary-subtle"
                      style={{ width: "120px", height: "120px", marginTop: "-60px", border: "4px solid white",}}/>

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
                      { editable ?
                        (<button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><img src={icon.Plus} className="me-1"/> เพิ่ม</button>) :
                        (<></>)
                      }
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
                      { editable ? (<button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><img src={icon.Plus} className="me-1"/> เพิ่ม</button>) : <></> }
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
                      { editable ? (<button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><img src={icon.Plus} className="me-1"/> เพิ่ม</button>) : (<></>) }
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
                      { editable ? (<button className="btn w-100 border-2 border-dashed fw-bold" style={{ backgroundColor: "#d9d9d9" }}><img src={icon.Plus} className="me-1"/> เพิ่ม</button>) : <></> }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
}
const ThemeLavender = ({state}) =>
{
    let basic      = new api.auth.DataBasic ();
    let contact    = new api.profileOf.DataContact ();
    // let education  = new API.profileOf.DataEducation ();
    // let interest   = new api.profileOf.DataInterest ();
    // let job        = new API.profileOf.DataJob ();
    let personal   = new api.profileOf.DataPersonal ();
    // let skill      = new api.profileOf.DataSkill ();
    // let social     = new API.profileOf.DataSocial ();
    // let theme      = new API.profileOf.DataTheme ();
    let editable   = Boolean (state.editable);

    basic       = state.basic;
    contact     = state.contact;
    // education   = state.education;
    // interest    = state.interest;
    // job         = state.job;
    personal    = state.personal;
    // skill       = state.skill;
    // social      = state.social;
    // theme       = state.theme;

    // let showBackground = api.decodeContent (personal.background);
    let showIcon       = api.decodeContent (personal.icon);
    let showName       = [personal.firstName, personal.middleName, personal.lastName].join (' ').trimEnd ();
    let showNickname   = personal.nickname;
    let showPronoun    = "";
    let showAge        = "";
    let showBirthday   = "";
    let showLocation   = personal.location;
    let showBio        = personal.bio;

    let showWebsite    = contact.website;
    let showEmail      = contact.email;
    let showPhone      = contact.phone;

    if (showName == "") showName = personal.nickname;
    if (showName == "") showName = basic.name;
    if (showName == "") showName = "ชื่อถูกซ่อน";

    if (showWebsite == "") showWebsite = "-";
    if (showEmail == "") showEmail = "-";
    if (showPhone == "") showPhone = "-";
    
    if (showNickname == "") showNickname = "ไม่ระบุ/ซ่อน";

    if (isFinite (personal.birthday.getTime ()))  
    {
        showAge = String (new Date().getFullYear() - personal.birthday.getFullYear());
        showBirthday = personal.birthday.toLocaleDateString ();
    }
    else
    {  
        showBirthday = "ไม่ระบุ/ซ่อน";
    }
    switch (personal.pronoun)
    {
        case api.profile.PRONOUN_HE: showPronoun = "กระผม"; break;
        case api.profile.PRONOUN_SHE: showPronoun = "ดิฉัน"; break;
        case api.profile.PRONOUN_THEY: showPronoun = "พวกเขา"; break;
        case api.profile.PRONOUN_OTHER: showPronoun = "อื่น ๆ"; break;
    }

    const onEdit = () =>
    {
        navigator.settings (2);
    }

    return (
      <div className='page-profile'>
        <div className='theme-lavender'>
          <header>
            <h1 className='text-h1 text-bold'>โปรไฟล์</h1>
          </header>
          <main>
            <div className='intro'>
              <img className='intro-icon' src={showIcon} alt=''/>
              <h2 className='intro-name h2'>{showName}</h2>
              <p className='intro-bio'>{showBio}</p>
              
              {editable ? (<button className='button-primary' onClick={onEdit}>ปรับแต่งโปรไฟล์</button>) : (<></>)}

              <div className='intro-block'>
                <h3 className='text-h3 text-bold'>เกี่ยวกับ</h3>
                <hr/>

                <label className='intro-block-text'>
                  <img src={icon.newspaper} alt=''/>
                  <span>ชื่อเล่น</span>
                  <span>{showNickname}</span>
                </label>
                {showPronoun != "" ? (<label className='intro-block-text'>
                    <img src={icon.newspaper} alt=''/>
                    <span>สรรพนาม</span>
                    <span>{showPronoun}</span>
                  </label>) : (<></>)
                }     
                {showAge != "" ? (<label className='intro-block-text'>
                    <img src={icon.newspaper} alt=''/>
                    <span>อายุ</span>
                    <span>{showAge}</span>
                  </label>) : (<></>)
                }

                <label className='intro-block-text'>
                  <img src={icon.newspaper} alt=''/>
                  <span>วันเกิด</span>
                  <span>{showBirthday}</span>
                </label>
                <label className='intro-block-text'>
                  <img src={icon.newspaper} alt=''/>
                  <span>ที่อยู่</span>
                  <span>{showLocation}</span>
                </label>
              </div>
              <div className='intro-block'>
                <h3 className='text-h3 text-bold'>ติดต่อ</h3>
                <hr/>

                <label className='intro-block-text'>
                  <img src={icon.newspaper} alt=''/>
                  <span>เว็บไซต์</span>
                  <span>{showWebsite}</span>
                </label>
                <label className='intro-block-text'>
                  <img src={icon.newspaper} alt=''/>
                  <span>อีเมล</span>
                  <span>{showEmail}</span>
                </label>
                <label className='intro-block-text'>
                  <img src={icon.newspaper} alt=''/>
                  <span>เบอร์โทร</span>
                  <span>{showPhone}</span>
                </label>
              </div>
            </div>
            <div className='content'>
              <div>
                <h2>การทำงาน</h2>
                <hr/>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
};
const ThemeTomorrow = () =>
{

}

const Root = () => 
{
    //
    // มองหาข้อมูลโปรไฟล์ที่ต้องการ
    //
    const url = new URL (window.location.toString ());
    const search = url.searchParams;
    let id = search.get ("id");

    if (id == null || id == "")
    {
        // ลิงค์อาจไม่ถูกต้อง
        id = api.auth.getAccess ();
    }
    // ลองดึงข้อมูลโปรไฟล์
    const state = 
    {
        basic:      new api.auth.DataBasic (),
        contact:    new api.profileOf.DataContact (),
        education:  new api.profileOf.DataEducation (),
        interest:   new api.profileOf.DataInterest (),
        job:        new api.profileOf.DataJob (),
        personal:   new api.profileOf.DataPersonal (),
        skill:      new api.profileOf.DataSkill (),
        social:     new api.profileOf.DataSocial (),
        theme:      new api.profileOf.DataTheme (),

        editable:  (id == api.auth.getAccess ())
    };

    try
    {
        state.basic     = api.auth.getBasic (id);
        state.contact   = api.profileOf.getContact (id);
        state.education = api.profileOf.getEducation (id);
        state.interest  = api.profileOf.getInterest (id);
        state.job       = api.profileOf.getJob (id);
        state.personal  = api.profileOf.getPersonal (id);
        state.skill     = api.profileOf.getSkill (id);
        state.social    = api.profileOf.getSocial (id);
        state.theme     = api.profileOf.getTheme (id);
    }
    catch (exception)
    {
        console.error (exception);

        if (exception instanceof api.auth.ErrorArgument || 
            exception instanceof api.profileOf.ErrorArgument)
        {
            return (<NotFound/>);
        }
        return (<NotAvailable message={exception}/>);
    }

    switch (state.theme.profileLayout)
    {
        case 0:
        case 1:
      default:    return <ThemeMinimal state={state}/>
        case 2:   return <ThemeLavender state={state}/>
    }
};

export default Root;