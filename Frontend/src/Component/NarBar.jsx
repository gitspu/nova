/**
 * ไฟล์ที่จัดเก็บส่วนประกอบ: เมนูนำทาง
*/
import * as api from './../Script/Api'
import * as icon from './../Script/Icon'

import './Style/NavBar.css'

/**
 * 
 * เมนูนำทางไปยังส่วนต่าง ๆ ของระบบแพลตฟอร์ม
 * 
*/
export function NavBar ({inset = "0px 0px 0px 0px", width = "100%", height = "48px", children = []})
{
    return <>
      <div className='component-navbar' style={{ inset: inset, width: width, height: height }}>
        <div>{children}</div>
      </div>
    </>
}
/**
 * 
 * ส่วนประกอบ สำหรับหัวเรื่องบนเมนูนำทาง
 * 
*/
export function NavBarTitle ({value = ""})
{
    return <>
      <label className='component-navbar-title h2'>{value}</label>
    </>
}
/**
 * 
 * ส่วนประกอบ สำหรับแสดงโลโก้เว็บไซต์
 * 
*/
export function NavBarLogo ()
{
    return <>
      <img className='component-navbar-logo'/>
    </>
}
/**
 * 
 * ส่วนประกอบ สำหรับแสดงช่องค้นหา
 * 
*/
export function NavBarSearch ({placeholder, value, width = '50%'})
{
    return <>
      <input className='component-navbar-search' placeholder={placeholder}
             style={{ width: width }}
             value={value != null ? value[0] : ""}
             onChange={(event) => 
             { 
                event.preventDefault();

                if (value != null) 
                    value[1](event.target.value);
             }}/>
    </>
}
/**
 * 
 * ส่วนประกอบ สำหรับขยายพื้นที่เพื่อส่วนประกอบอื่น ๆ
 * 
*/
export function NavBarWiden ({children, justify})
{
    return <>
      <div className='component-navbar-widen' style={{ justifyContent: justify }}>{children}</div>
    </>
}
/**
 * ส่วนประกอบ สำหรับปุ่มกดเรียกเมนู
*/
export function NavBarMenu ()
{
  return <>
    <button className='component-navbar-menu'>
      <img src={icon.list}/>
    </button>
  </>
}
/**
 * ส่วนประกอบ สำหรับแสดงรูปโปรไฟล์พร้อมชื่อ (ตามที่กำหนด)
*/
export function NavBarProfile ({
    onClick = () => {},
    style = {} /* กำหนด css ให้กับส่วนประกอบ */, 
    className = "" /* กำหนดคลาสให้กับส่วนประกอบ */, 
    // children /* รายการย่อยในตัวแม่ */
})
{
    let profileName = null;
    let profileIcon = icon.emojiSmile;
    let logged = api.auth.isLogged ();

    //
    // ดึงข้อมูลโปรไฟล์ (ถ้ามี)
    //

    try
    {
        const personal = api.profile.getPersonal ();

        profileIcon = api.decodeContent (personal.icon);
        profileName = [personal.firstName.value,
                       personal.middleName.value,
                       personal.lastName.value,
        ].join (' ').trimEnd ();

        if (profileIcon == icon.transparent)
        {
            profileIcon = icon.emojiSmile;
        }
    }
    catch (ex)
    {
        console.error (ex);
        logged = false;
    }

    //
    // แสดผลส่วนประกอบ
    //
    if (logged)
    {
        return <>
          <button className={["component-navbar-profile", className].join (' ')} style={style} onClick={(event) => onClick(event)}>
            <img src={profileIcon}></img>
            <label>{profileName}</label>
          </button>
        </>
    }
    else
    {
        return <>
          <button className={["component-navbar-profile", className].join (' ')}>
            <label>เข้าสู่ระบบ</label>
          </button>
        </>
    }
}