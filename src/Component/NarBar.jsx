import {ToggleBar, ToggleBarItem} from './Common'
import {ProfileCard, ProfileCardContext, ProfileHead} from './Profile'
import './Style/NavBar.css'

import IconHouse        from './../Asset/Icon/House.svg'
import IconPeople       from './../Asset/Icon/People.svg'
import IconBriefcase    from './../Asset/Icon/Briefcase.svg'
import IconChat         from './../Asset/Icon/Chat.svg'
import IconBell         from './../Asset/Icon/Bell.svg'
import { useNavigate } from 'react-router-dom'

export function NavBar ({page})
{
    const navigate = useNavigate ();
    const getPage = page != null ? page[0] : null;
    const setPage = page != null ? page[1] : null;

    return <Viewport>
        <Container>
            <Logo/>
            <Search/>
            <Menu/>
            <Profile/>
        </Container>
    </Viewport>

    function Viewport ({children})
    {
        return <div className='position-absolute top-0 bottom-0 left-0 right-0 w-100'
                    style={{ height: '56px', maxHeight: '56px'}}>
            {children}
        </div>
    }
    function Container ({children})
    {
        return <div className='position-absolute top-0 bottom-auto left-0 right-0 w-100 h-100
                               d-flex align-items-center justify-content-center ps-5 pe-5'>
            {children}
        </div>
    }
    function Logo ()
    {
        return <div>
            <img width={48} height={48}></img>
        </div>
    }
    function Search ()
    {
        return <div className='ms-3 me-3' style={{flexGrow: 1}}>
            <input className='ps-4 pe-4 pt-2 pb-2 border-1 rounded-5' type='text' placeholder='ค้นหางาน' style={{width: '100%', maxWidth: '512px'}}></input>
        </div>    
    }
    function Menu ()
    {
        return <ToggleBar type='horizontal' state={getPage} setState={setPage}>
            <ToggleBarItem value={0} click={() => navigate("/")} text='หน้าแรก' icon={IconHouse}/>
            <ToggleBarItem value={1} click={() => navigate("/connection")} text='เครือข่าย' icon={IconPeople}/>
            <ToggleBarItem value={2} click={() => navigate("/job")} text='งาน' icon={IconBriefcase}/>
            <ToggleBarItem value={3} click={() => navigate("/message")} text='ข้อความ' icon={IconChat}/>
            <ToggleBarItem value={4} click={() => navigate("/notification")} text='แจ้งเตือน' icon={IconBell}/>
        </ToggleBar>
    }
    function Profile ()
    {
        return <ProfileCard>
            <ProfileCardContext/>
        </ProfileCard>
    }
}
