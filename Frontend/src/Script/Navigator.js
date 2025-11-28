/**
 * โค็ดสำหรับระบบนำทางไปในทุก ๆ ที่ตามต้องการ
*/


export const LINK_HOME = '/';
export const LINK_AUTH = '/auth';
export const LINK_CONSOLE = '/console';

export const LINK_USER_PROFILE = '/user-profile';
export const LINK_USER_SEARCH = "/user-search";

export const LINK_EMPLOYER_PROFILE = '/employer-profile';
export const LINK_EMPLOYER_ENROLLMENT = '/employer-enrollment';
export const LINK_USER_SETTINGS = '/user-settings';

let reactNavigator = null;

export function init (reactNavigatorObject)
{
    reactNavigator = reactNavigatorObject;
}

/**
 * ตรวจสอบเส้นทาง
*/
export function is (value)
{
    return window.location.pathname.startsWith (value);
}
/**
 * นำทางไปสู่หน้าเข้าสู่ระบบ
 * 
 * @param redirect หลังจากเข้าสู่ระบบ ให้นำผู้ใช้ไปยังหน้าอะไร (เริ่มต้นคือหน้าปัจจุบัน)
*/
export function auth (redirectLogin, redirectRegister)
{
    if (is (LINK_AUTH)) 
        return;

    if (redirectLogin == undefined) redirectLogin = '/';
    if (redirectRegister == undefined) redirectRegister = '/';

    if (redirectLogin == null || !redirectLogin.startsWith ('/')) throw new Error ('Login Redirect link is invalid: ' + redirectLogin);
    if (redirectRegister == null || !redirectRegister.startsWith ('/')) throw new Error ('Register redirect link is invalid: ' + redirectRegister);

    
    window.location.href = `${LINK_AUTH}?context=${btoa(JSON.stringify({
        redirectLogin: redirectLogin,
        redirectRegister: redirectRegister,
    }))}`;
}
/**
 * นำทางไปสู่หน้าแผงควบคุมระบบ
*/
export function console ()
{
    if (is (LINK_CONSOLE)) 
        return;

    window.location.href = LINK_CONSOLE;
}
/**
 * นำทางไปสู่หน้าหลัก
*/
export function home ()
{
    if (window.location.pathname == '' || window.location.pathname == LINK_HOME) 
        return;

    if (typeof reactNavigator == "function")
    {
        reactNavigator (LINK_HOME);
        return;
    }
    window.location.href = LINK_HOME;
}
/**
 * นำทางไปสู่หน้าโปรไฟล์
*/
export function userProfile (which = NaN)
{
    if (is (LINK_USER_PROFILE)) 
        return;

    if (typeof reactNavigator == "function")
    {
        reactNavigator (`${LINK_USER_PROFILE}` + (isFinite (which) ? `?id=${which}` : ``));
        return;
    }
    window.location.href = (`${LINK_USER_PROFILE}` + (isFinite (which) ? `?id=${which}` : ``));
}
/**
 * นำทางไปสู่หน้าค้นหาโปรไฟล์
*/
export function userSearch ()
{
    if (is (LINK_USER_SEARCH)) 
        return;

    if (typeof reactNavigator == "function")
    {
        reactNavigator (LINK_USER_SEARCH);
        return;
    }
    window.location.href = (LINK_USER_SEARCH);
}
/**
 * นำทางไปสู่หน้าตั้งค่า
*/
export function userSettings (to = undefined)
{
    if (is (LINK_USER_SETTINGS)) 
        return;

    if (typeof reactNavigator == "function")
    {
        reactNavigator (`${LINK_USER_SETTINGS}` + (to != undefined ? `?to=${to}` : ``));
        return;
    }
    window.location.href = `${LINK_USER_SETTINGS}` + (to != undefined ? `?to=${to}` : ``);
}
/**
 * นำทางไปสู่หน้าโปรไฟล์
*/
export function employerProfile (which = NaN)
{
    if (is (LINK_USER_PROFILE)) 
        return;

    if (typeof reactNavigator == "function")
    {
        reactNavigator (`${LINK_EMPLOYER_PROFILE}` + (isFinite (which) ? `?id=${which}` : ``));
        return;
    }
    window.location.href = (`${LINK_EMPLOYER_PROFILE}` + (isFinite (which) ? `?id=${which}` : ``));
}
/**
 * นำทางไปสู่หน้าโปรไฟล์
*/
export function employerEnrollment ()
{
    if (is (LINK_EMPLOYER_ENROLLMENT)) 
        return;

    if (typeof reactNavigator == "function")
    {
        reactNavigator (LINK_EMPLOYER_ENROLLMENT);
        return;
    }
    window.location.href = (LINK_EMPLOYER_ENROLLMENT);
}

export default
{
    LINK_AUTH,
    LINK_CONSOLE,
    LINK_HOME,
    LINK_PROFILE: LINK_USER_PROFILE,
    LINK_PROFILE_SEARCH: LINK_USER_SEARCH,
    LINK_SETTINGS: LINK_USER_SETTINGS,

    init,
    is,
    auth,
    console,
    employerProfile,
    employerEnrollment,
    home,
    userProfile,
    userSearch,
    userSettings,
}