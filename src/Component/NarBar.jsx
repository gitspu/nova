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
        return <div className='component-navbar'>{children}</div>
    }
    function Container ({children})
    {
        return <div className='component-navbar-inner ps-5 pe-5 gap-3'>
            {children}
        </div>
    }
    function Logo ()
    {
        return <>
            <img width={40} height={40}></img>
        </>
    }
    function Search ()
    {
        return <div className='d-flex flex-grow-1 justify-content-center'>
            <input className='ps-4 pe-4 pt-2 pb-2 border-1 rounded-5' type='text' placeholder='ค้นหางาน' style={{width: '100%', maxWidth: '512px'}}></input>
        </div>    
    }
    function Menu ()
    {
        return <ToggleBar type='horizontal' state={getPage} setState={setPage}>
            <ToggleBarItem value={0} click={() => navigate("/")} text='หน้าแรก' icon={IconHouse}/>
            <ToggleBarItem value={1} click={() => navigate("/connection")} text='เครือข่าย' icon={IconPeople}/>
            <ToggleBarItem value={2} click={() => navigate("/job")} text='งาน' icon={IconBriefcase}/>
        </ToggleBar>
    }
    function Profile ()
    {
        return <ProfileCard>
            <ProfileCardContext/>
        </ProfileCard>
    }
}
