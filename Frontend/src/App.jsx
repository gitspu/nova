/*
    ส่วนประกอบจาก React
*/
import { StrictMode, useEffect, useRef, useState }                 from 'react'
import { ErrorBoundary }                        from "react-error-boundary";
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { createRoot }                           from 'react-dom/client';
/*
    ส่วนประกอบ Boostrap
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
/*
    ธีมของแอป
*/
import './App.css'
/*
    ตกแต่ง CSS
*/
import styled from 'styled-components';
/*
    นำเข้าระบบ (script/logic)
*/
import api              from "./Script/Api"
import nav              from "./Script/Navigator"
import icon             from "./Script/Icon"
/*
    นำเข้าหน้าเว็บ (page)
*/
import Auth             from "./Page/Auth/Index"
import Console          from "./Page/Console/Index"
import Error            from "./Page/Error"
import EmployerProfile  from "./Page/EmployerProfile/Index"
import EmployerSettings from "./Page/EmployerSettings/Index"
import UserProfile      from "./Page/UserProfile/Index"
import UserSearch       from "./Page/Search/Profile"
import UserSettings     from "./Page/UserSettings/Index"
import Search           from './Page/Search/Index'



import { Button, Div, Img, NavBar, P, Span } from './Component/Common';




/**
 *  ส่วนประกอบหลักที่ react ต้องใช้แสดงผล
 */
export function App ()
{
    const mounted = useRef (false);
    const navigate = useNavigate ();

    const [view, setView] = useState (0);
    const [err, setErr] = useState (null);

    useEffect (() =>
    {
        if (mounted == null) 
            return;
        if (mounted.current)
            return;

        /*
          เริ่มต้นการทำงานแต่ละระบบ
        */
        nav.init (navigate);
        api.init ()
            .then (() => setView (1))
            .catch ((except) => 
            {
                console.error (except);

                setView (2);
                setErr (except);
            });

        return () => { mounted.current = false; }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return <>
      <StrictMode>
        
        {
          view == 0 &&
          <SplashViewport>
            <SplashImage src={icon.people}/>
            <SplashTitle>NOVA</SplashTitle>
            <SplashText>เริ่มต้นอนาคตเพียงแค่ปลายนิ้ว</SplashText>
          </SplashViewport>
        }
        {view == 1 &&
          <ErrorBoundary FallbackComponent={Error}>
            <Routes>
                <Route element={null} ErrorBoundary={<Error/>} Component={AppOverlay}>
                  <Route path='/' element={<Search/>} index={true}/>
                  <Route path='/user-profile' element={<UserProfile/>}/>
                  <Route path='/user-search' element={<UserSearch/>}/>
                  <Route path='/user-settings' element={<UserSettings/>}/>
                  <Route path='/employer-profile' element={<EmployerProfile/>}/>
                  <Route path='/employer-enrollment' element={<EmployerProfile/>}/>
                  <Route path='/employer-settings' element={<EmployerSettings/>}/>
                </Route>
                <Route element={null} ErrorBoundary={<Error/>} Component={AppStandalone}>
                  <Route path='/console' element={<Console/>}/>
                  <Route path='/auth' element={<Auth/>}/>
                  <Route path='*' element={<Error/>}/>
                </Route>
              </Routes>
          </ErrorBoundary>
        }
        {
          view == 2 &&
          <Error error={err} resetErrorBoundary={() => location.reload ()}/>
        }
      </StrictMode>
    </>
}
/**
 * ตัวแสดงผลหลักของแอปที่มีเมนูนำทางและ Outlet
 */
export function AppOverlay ()
{
    const auth = api.auth;
    const navigate = nav;
    const [showContext, setShowContext] = useState (false);

    /**
     * นำทางไปยังหน้าโปรไฟล์
    */
    function onClickProfile (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setShowContext (false);

        navigate.userProfile ();
        return;
    }
    /**
     * นำทางไปยังหน้าตั้งค่า
    */
    function onClickSettings (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setShowContext (false);

        switch (auth.getRole ())
        {
            case auth.ROLE_EMPLOYER: break;
            default:
                navigate.userSettings ();
                break;
        }
    }
    /**
     * นำทางไปยังหน้าแผงควบคุมระบบ
    */
    function onContextConsole (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        } 
        setShowContext (false);

        nav.console ();
        return;
    }
    /**
     * ทำการออกจากระบบ และพาไปยังหน้าเข้าสู่ระบบ
    */
    function onContextLogout (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setShowContext (false);

        try 
        { 
            auth.logout (); 
        }
        finally 
        { 
            navigate.auth ('/', undefined); 
        }
    }

    return <>
      <NavBar style={{
        borderWidth: `0px 0px ${(window.location.pathname === '/' ? '0px' : '2px')} 0px`
      }}>
        <NavBar.Branding onClick={() => nav.home ()}/>
        <NavBar.Flex grow={1} justify={'center'}>
          <Button $variant='outlined' onClick={() => nav.home ()} className='me-4'>
            <Img src={icon.briefcase}/>
            <Span>ค้นหางาน</Span>
          </Button>
          <Button $variant='outlined' onClick={() => nav.userSearch ()} className='me-4'>
            <Img src={icon.people}/>
            <Span>ค้นหาโปรไฟล์</Span>
          </Button>
          
          <Button $variant='outlined' onClick={() => nav.userProfile ()} className='me-4'>
            <Img src={icon.person}/>
            <Span>โปรไฟล์ของฉัน</Span>
          </Button>
            {/* {
              (auth.isRole (auth.ROLE_EMPLOYER) || auth.isRole (auth.ROLE_DEVELOPER)) &&
              <Button $variant='outlined' onClick={() => nav.employerEnrollment ()} className='me-4'>
                <Img src={icon.briefcase}/>
                <Span>รายการสมัครงาน</Span>
              </Button>
            } */}

        </NavBar.Flex>
        {auth.isLogged () ? <NavBar.Profile onClick={() => setShowContext (!showContext)}>
          <NavBar.ContextMenu className={showContext ? 'd-block' : "d-none"}>
            <Button 
              $align="left"
              $variant="primary"
              onClick={onClickProfile}>
              <Img src={icon.person}/>
              <Span>โปรไฟล์</Span>
            </Button>
            {/* <Button 
              $align="left"
              $variant="primary"
              onClick={onClickSettings}>
              <Img src={icon.gear}/>
              <Span>การตั้งค่า</Span>
            </Button> */}
            {
              (auth.isRole (auth.ROLE_ADMIN) || auth.isRole (auth.ROLE_DEVELOPER)) &&
              <Button 
                $align="left" 
                $variant='warning' 
                onClick={onContextConsole}>
                <Img src={icon.gear}/>
                <Span>แผงควบคุมระบบ</Span>
              </Button>
            }
            <Button 
              $align="left" 
              $variant='caution' 
              onClick={onContextLogout}>
              <Img src={icon.arrowLeft}/>
              <Span>ออกจากระบบ</Span>
            </Button>
          </NavBar.ContextMenu>
        </NavBar.Profile> : <NavBar.Login/>}
      </NavBar>
      <Outlet/>
    </>
}
/**
 * ตัวแสดงผลที่ทำงานได้โดยไม่ต้องพึ่งพาเมนูนำทาง
 */
export function AppStandalone ()
{
    return <>
      <Outlet/>
    </>
}

const SplashViewport = styled.div `

    pointer-events: all;
    position: absolute;
    inset: 0px;

    background-color: var(--app-bg-1);

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 24px;

    align-items: center;
    justify-content: center;

`;
const SplashImage = styled.img `

    width:  96px;
    height: 96px;

    margin: 0px;
    padding: 0px;
`;
const SplashTitle = styled.label `

    font-size: 2rem;
    font-weight: bold;
    color: var(--app-text-1);

    margin: 0px;
    padding: 0px;

`;
const SplashText = styled.label `

    font-size: 1rem;
    font-weight: bold;
    color: var(--app-text-2);

    margin: 0px;
    padding: 0px;
`;

/*
    ให้ react ประมวลและแสดงหน้าเว็บ
*/
const root = document.getElementById ("app");
const react = createRoot (root);

react.render (<BrowserRouter>
  <App/>
</BrowserRouter>);