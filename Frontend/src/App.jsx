import { StrictMode, useState } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import 
{
  Chart as ChartJS,

  ArcElement,
  BarElement,

  LinearScale,
  CategoryScale,

  Tooltip,
  Legend,
  PointElement,
  LineElement,
} 
from "chart.js";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css'

/*
    นำเข้าระบบ (script/logic)
*/
import api       from './Script/Api'
import nav       from './Script/Navigator'
import icon      from './Script/Icon';
/*
    นำเข้าหน้าเว็บ (page)
*/
import Auth       from './Page/Auth/Index';
import Console    from './Page/Console/Index'
import Error      from './Page/Error'

import UserProfile from './Page/UserProfile/Index'
import UserSettings from './Page/UserSettings/Index'

import EmployerProfile from './Page/EmployerProfile/Index'
import EmployerSettings from './Page/EmployerSettings/Index';

import Search from './Page/Search/Index'
import { Button, Img, NavBar, P, Span } from './Component/Common';

/**
 *  ส่วนประกอบหลักที่ react ต้องใช้แสดงผล
 */
export function App ()
{
    /*
      เริ่มต้นการทำงานแต่ละระบบ
    */
    api.init ();
    /*
      เริ่มต้น ChartJS
    */
    ChartJS.register (
        ArcElement, BarElement, PointElement, LineElement,
        CategoryScale, LinearScale, 
        Tooltip, Legend
    );
   
    function Overlay ()
    {
        const [contextShow, setContextShow] = useState (false);


        function onContextProfile (event)
        {
             if (event != null)
            {
                event.preventDefault ();
                event.stopPropagation ();
            }
            nav.userProfile ();
        }
        function onContextSettings (event)
        {
             if (event != null)
            {
                event.preventDefault ();
                event.stopPropagation ();
            }
            if (api.auth.isRole (api.auth.ROLE_EMPLOYER)) 
            {
                return;
            }
            else
            {
                nav.userSettings ();
                return;
            }
        }
        function onContextConsole (event)
        {
            if (event != null)
            {
                event.preventDefault ();
                event.stopPropagation ();
            }
            nav.console ();
        }
        function onContextLogout (event)
        {
            if (event != null)
            {
                event.preventDefault ();
                event.stopPropagation ();
            }
            try { api.auth.logout (); }
            finally { nav.auth ('/', undefined); }
        }

        return <>
          <NavBar style={{
            borderWidth: `0px 0px ${(window.location.pathname === '/' ? '0px' : '2px')} 0px`
          }}>
            <NavBar.Branding onClick={() => window.location.pathname = '/'}/>
            <NavBar.Flex grow={1} justify={'center'}>
              <P className='me-4'>หน้าหลัก</P>
              <P className='me-4'>โปรไฟล์</P>
            </NavBar.Flex>
            {api.auth.isLogged () ? <NavBar.Profile onClick={() => setContextShow (!contextShow)}>
              <NavBar.ContextMenu className={contextShow ? 'd-block' : "d-none"}>
                <Button $align="left" onClick={onContextProfile}>
                  <Img src={icon.person}/>
                  <Span>โปรไฟล์</Span>
                </Button>
                <Button $align="left" onClick={onContextSettings}>
                  <Img src={icon.gear}/>
                  <Span>การตั้งค่า</Span>
                </Button>
                {api.auth.getRole () == api.auth.ROLE_ADMIN || api.auth.getRole () == api.auth.ROLE_DEVELOPER ? <>
                  <Button $align="left" $variant='warning' onClick={onContextConsole}>
                    <Img src={icon.gear}/>
                    <Span>แผงควบคุมระบบ</Span>
                  </Button>
                </> : <></>}
                <Button $align="left" $variant='caution' onClick={onContextLogout}>
                  <Img src={icon.arrowLeft}/>
                  <Span>ออกจากระบบ</Span>
                </Button>
              </NavBar.ContextMenu>
            </NavBar.Profile> : <NavBar.Login/>}
          </NavBar>
          <Outlet/>
        </>
    }

    return (
      <StrictMode>
        <ErrorBoundary FallbackComponent={Error}>
          <BrowserRouter>
            <Routes>
              <Route element={null} ErrorBoundary={<Error/>} Component={Overlay}>
                <Route path='/' element={<Search/>} index={true}/>

                <Route path='/user-profile' element={<UserProfile/>}/>
                <Route path='/user-settings' element={<UserSettings/>}/>

                <Route path='/employer-profile' element={<EmployerProfile/>}/>
                <Route path='/employer-settings' element={<EmployerSettings/>}/>
              </Route>
              <Route element={null} ErrorBoundary={<Error/>}>
                <Route path='/console'  element={<Console/>}/>
                <Route path='/auth'     element={<Auth/>}/>
                <Route path='*' element={<Error/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </StrictMode>
    );
}
/*
    ให้ react ประมวลและแสดงหน้าเว็บ
*/
const root = document.getElementById ("app");
const react = createRoot (root);

react.render (<App/>);