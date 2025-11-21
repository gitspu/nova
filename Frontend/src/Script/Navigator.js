/**
 * โค็ดสำหรับระบบนำทางไปในทุก ๆ ที่ตามต้องการ
*/


export const LINK_HOME = '/';
export const LINK_AUTH = '/auth';
export const LINK_CONSOLE = '/console';
export const LINK_PROFILE = '/profile';
export const LINK_SETTINGS = '/settings';

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
export function auth (redirectLogin = window.location.pathname, redirectRegister = window.location.pathname)
{
    if (is (LINK_AUTH)) 
        return;

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

    window.location.href = LINK_HOME;
}
/**
 * นำทางไปสู่หน้าโปรไฟล์
*/
export function profile (which = NaN)
{
    if (is (LINK_PROFILE)) 
        return;

    window.location.href = (`${LINK_PROFILE}` + (isFinite (which) ? `?id=${which}` : ``));
}
/**
 * นำทางไปสู่หน้าตั้งค่า
*/
export function settings (to = undefined)
{
    if (is (LINK_SETTINGS)) 
        return;

    window.location.href = `${LINK_SETTINGS}` + (to != undefined ? `?to=${to}` : ``);
}

export default
{
    LINK_AUTH,
    LINK_CONSOLE,
    LINK_HOME,
    LINK_PROFILE,
    LINK_SETTINGS,

    is,
    auth,
    console,
    home,
    profile,
    settings,
}