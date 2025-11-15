/**
 * 
 * หน้าต่างผู้ดูแลระบบ (เรียกอีกกว่าหน้าต่าง Administrator)
 * 
*/
import { useEffect, useState } from "react"

import {ConsoleDashboard} from "./ConsoleDashboard"
import {ConsoleAuthentication} from "./ConsoleAuthentication"
import {ConsoleAccount} from "./ConsoleAccount"
import {ConsoleTestAPI} from "./ConsoleTestAPI"
import {ConsoleTestUI} from "./ConsoleTestUI"

import * as api from '../Script/Api'
import * as navigator from '../Script/Navigator'

import './Style/Console.css'

export function Console ()
{
    //                                 //
    // ------------------------------- //
    //              STATE              //
    // ------------------------------- //
    //                                 //
    const accessible = api.auth.isLogged () && [
        api.auth.ROLE_ADMIN, 
        api.auth.ROLE_TESTER, 
        api.auth.ROLE_DEVELOPER
    ].indexOf (api.auth.getRole()) != -1;
    
    const [state, setState] = useState ({
        navigation: 1
    });

    //                                 //
    // ------------------------------- //
    //              EFFECT             //
    // ------------------------------- //
    //                                 //
    useEffect (() => 
    {
        if (accessible == false) {
            navigator.auth ();
            return;
        }
        document.title = "NOVA Console";  
    }, 
    [accessible]);


    //                                 //
    // ------------------------------- //
    //           RENDERING             //
    // ------------------------------- //
    //                                 //
    if (accessible == false) 
        return <></>
    else
        return <>
            <ConsoleHead state={[state, setState]}/>
            <ConsoleMenu state={[state, setState]}/>
            <ConsoleBody state={[state, setState]}/>
        </>
}

function ConsoleHead ({state})
{
    return <>
        <div className="page-console-header">
            <label>NOVA Console</label>
        </div>
    </>
}
function ConsoleMenu ({state})
{
    return <>
        <div className="page-console-menu">
        </div>
    </>
}
function ConsoleBody ({state})
{
    return <>
        <div className="page-console-body">
            {Number(state[0].navigation) == 1 ? <ConsoleDashboard/> : <></>}
            {Number(state[0].navigation) == 2 ? <ConsoleAuthentication/> : <></>}
            {Number(state[0].navigation) == 3 ? <ConsoleAccount/> : <></>}
            {Number(state[0].navigation) == 4 ? <ConsoleTestAPI/> : <></>}
            {Number(state[0].navigation) == 5 ? <ConsoleTestUI/> : <></>}
        </div>
    </>
}

