import './../assets/css/NavBar.css'
import {ToggleBar, ToggleBarItem} from './Common'
import {ProfileCard, ProfileHead} from './Profile'

import IconHouse from './icon/House.svg'
import IconPeople from './icon/People.svg'
import IconBriefcase from './icon/Briefcase.svg'
import IconChat from './icon/Chat.svg'
import IconBell from './icon/Bell.svg'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function NavBar ({page})
{
    const navigate = useNavigate ();
    const getPage = page != null ? page[0] : null;
    const setPage = page != null ? page[1] : null;

    useEffect (() =>
    {
        switch (getPage)
        {
            case 0: navigate ("/");
            case 1: navigate ("/connection");
            case 2: navigate ("/job");
            case 3: navigate ("/message");
            case 4: navigate ("/notification");
        }
    },
    [page]);

    return <div className="position-fixed bg-light w-100" style={{ height: '56px'}}>
        <div className='d-flex w-100 h-100 align-items-center justify-content-center'>
            <div style={{margin: '0px 48px'}}>
                <img width={48} height={48}></img>
            </div>
            <div style={{flexGrow: 1}}>
                <input className='ps-4 pe-4 pt-2 pb-2 border-1 rounded-5' type='text' placeholder='ค้นหางาน' style={{width: '100%', maxWidth: '512px'}}></input>
            </div>
            <ToggleBar type='horizontal' state={getPage} setState={setPage}>
                <ToggleBarItem value={0} text='หน้าแรก' icon={IconHouse}/>
                <ToggleBarItem value={1} text='เครือข่าย' icon={IconPeople}/>
                <ToggleBarItem value={2} text='งาน' icon={IconBriefcase}/>
                <ToggleBarItem value={3} text='ข้อความ' icon={IconChat}/>
                <ToggleBarItem value={4} text='แจ้งเตือน' icon={IconBell}/>
            </ToggleBar>
            <div style={{margin: '0px 48px'}}>
                <ProfileCard/>
            </div>
        </div>
    </div>
}