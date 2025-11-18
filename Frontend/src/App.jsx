import { Activity, StrictMode, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css'

/*
    นำเข้าระบบ (script/logic)
*/
import * as api       from './Script/Api'
import * as navigator from './Script/Navigator'
/*
    นำเข้าหน้าเว็บ (page)
*/
import {Admin}    from './Page/Admin';
import Auth       from './Page/Auth';
import {Console}  from './Page/Console'
import Home       from './Page/Home'
import Profile    from './Page/Profile'
import Job        from './Page/Job'
import {Settings} from './Page/Settings'
import NavBar     from './Component/NavBar'
// import {NavBar, NavBarLogo, NavBarProfile, NavBarSearch, NavBarTitle, NavBarWiden, NavBarMenu}   from './Component/NarBar';
import {Notification} from './Component/Notification';

/**
 *  ส่วนประกอบหลักที่ react ต้องใช้แสดงผล
 */
export function App ()
{
    // if (api.auth.isLogged () == false || api.auth.isActive ()   == false)
    // {
    //     navigator.auth ();
    //     return;
    // }
    const Overlay = () =>
    {
        return (
          <>
            <div className='header'>
              <NavBar height={56} width='100%'>
                <NavBar.Flex justify='start' grow={1}>
                  <NavBar.Branding/>
                </NavBar.Flex>
                <NavBar.Flex justify='center' grow={2}>
                  <NavBar.Search placeholder='ค้นหางาน'/>
                </NavBar.Flex>
                <NavBar.Flex justify='end' grow={1}>
                  <NavBar.Profile/>
                </NavBar.Flex>
              </NavBar>
            </div>
            <div className='body'>
              <Outlet/>
            </div>
          </>
        );
    }

    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Overlay/>}>
            <Route path="/"         element={<Home/>}/>
            <Route path="/profile"  element={<Profile/>}/>
            <Route path="/job"      element={<Job/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Route>
          <Route element={null}>
            <Route path="/auth"     element={<Auth/>}/>
            <Route path="/console"  element={<Console/>}/>
            <Route path="/admin"    element={<Admin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
}
/**
 * เส้นทางหลักที่ผู้ใช้จะถูกนำไป
 * เส้นทางนี้จะมี NavBar (ระบบนำทางที่อยู่ด้านบน)
 * และ Outlet ที่แสดงผลตามบริบท
*/
export function AppMain ()
{

}
/**
 * 
*/
export function AppStandalone ()
{

}

/*
    เริ่มต้นการทำงานแต่ละระบบ
*/
api.init ();

/*
    ให้ react ประมวลและแสดงหน้าเว็บ
*/
const root = document.getElementById ("app");
const react = createRoot (root);

react.render (
  <StrictMode>
    <App/>
  </StrictMode>
);

// /**
//  *  ส่วนประกอบหลักที่ react ต้องใช้แสดงผล
//  */
// export function App ()
// {
//     const searchRef = useRef ([]);


//     const MainRoute = ({inset}) =>
//     {
//         const navigate = useNavigate ('');
//         const navigateLast = useRef ('');
//         const [searchText, setSearchText] = useState ('');

//         searchRef.current = [searchText, setSearchText];


//         if (api.auth.isLogged () == false || api.auth.isActive ()   == false)
//         {
//             navigator.auth ();
//             return;
//         }

        
//         function onSearch (event)
//         {
//             const search = event.target.value;

//             searchRef.current = null;
//             searchRef.current = [searchText, setSearchText];
            
//             if (search.length != 0 && window.location.pathname != '/job')
//             {
//                 console.log ('Entered: job search mode');

//                 navigateLast.current = window.location.pathname;
//                 navigate ('/job');
//             }
//             if (search.length == 0 && window.location.pathname == '/job')
//             {
//                 console.log ('Exited: job search mode');

//                 navigate (navigateLast.current);
//             }
//         }

//         return <>
//           <NavBar inset={inset} height={56} width='100%'>
//             <NavBar.Flex justify='start' grow={1}>
//               <NavBar.Branding/>
//             </NavBar.Flex>
//             <NavBar.Flex justify='center' grow={2}>
//               <NavBar.Search placeholder='ค้นหางาน' onChange={onSearch} value={[searchText, setSearchText]}/>
//             </NavBar.Flex>
//             <NavBar.Flex justify='end' grow={1}>
//               <NavBar.Profile/>
//             </NavBar.Flex>
//           </NavBar>
//           <Notification/>
//           <Outlet/>
//         </>
//     }

//     const SystemRoute = () =>
//     {
//         return <>
//           <Outlet/>
//         </>;
//     }
    
//     return <BrowserRouter>
//       <Routes>
//         <Route element={<MainRoute inset='var(--app-inset-navigation)'/>}>
//           <Route path="/"         element={<Home      inset='var(--app-inset-outlet)'/>}/>
//           <Route path="/profile"  element={<Profile   inset='var(--app-inset-outlet)'/>}/>
//           <Route path="/job"      element={<Job       inset='var(--app-inset-outlet)' search={searchRef}/>}/>
//           <Route path="/settings" element={<Settings  inset='var(--app-inset-outlet)'/>}/>
//         </Route>
//         <Route element={<SystemRoute/>}>
//           <Route path="/auth"     element={<Auth/>}/>
//           <Route path="/console"  element={<Console/>}/>
//           <Route path="/admin"    element={<Admin/>}/>
//         </Route>
//       </Routes>
//     </BrowserRouter>
// }