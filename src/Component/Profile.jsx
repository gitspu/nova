import { BoxArrowLeft, BoxArrowRight, Gear, GearWideConnected } from 'react-bootstrap-icons';
import * as auth from '../Script/Authentication'
import * as profile from '../Script/Profile'
import './Style/Profile.css'
import { useState } from 'react';

export function ProfileHead ()
{
    return <div>
        <img src="" width={48} height={48}></img>
    </div>
}
/**
 * ส่วนประกอบ สำหรับแสดงรูปโปรไฟล์พร้อมชื่อ (ตามที่กำหนด)
*/
export function ProfileCard ({showBorder = true, showIcon = true, showName = true, className = "", children})
{
    let profileName = null;
    let profileIcon = "";
    let viewportClass = ["h-100", className].join (' ');
    let containerClass = ["w-100", "h-100", "p-1" , "d-flex", "align-items-center", "gap-3", showBorder ? "border border-1 rounded" : ""].join (' ');
    const [open, setOpen] = useState (false);

    if (auth.isLogged() && auth.isActive())
    {
        try
        {
            const info = profile.getPersonal ();

            if (info.icon != null || info.icon != "") {
                profileIcon = `data:image/jepg;base64, ${info.icon}`;
            }
            profileName = [info.firstName.value, info.middleName.value, info.lastName.value].join (' ');

            if (profileName == "") {
                profileName = auth.getName ();
            }
        }
        catch { ; }
    }
    return <Viewport>
        <Container>
            {showIcon ? <img className='h-100 flex-1 rounded-circle' src={profileIcon}></img> : <></>}
            {showName ? <label className='flex-2'>{profileName}</label> : <></>}
        </Container>
        <Context>
            <ContextItem text='โปรไฟล์'/>
            <ContextItem text='การตั้งค่า'/>
            <ContextItem text='ออกจากระบบ'/>
        </Context>
    </Viewport>

    function Viewport ({children})
    {
        return <button className={viewportClass} style={{minWidth: 192, height: '48px'}}>{children}</button>
    }
    function Container ({children})
    {
        return <div className={containerClass} onClick={() => setOpen(!open)}>{children}</div>
    }
    function Context ({children})
    {
        return <div className='w-100 border border-1'>{children}</div>
    }
    function ContextItem ({icon, text})
    {
        if (open == false) {
            return <></>
        }
        return <button className='w-100'>
            <img src={icon} alt=''></img>
            <label>{text}</label>
        </button>
    }
}
export function ProfileCardContext ()
{
    return 
}