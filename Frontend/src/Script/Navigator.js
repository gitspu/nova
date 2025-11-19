/**
 * โค็ดสำหรับระบบนำทางไปในทุก ๆ ที่ตามต้องการ
*/


export const LINK_HOME = '/';
export const LINK_AUTH = '/auth';
export const LINK_ADMIN = '/admin';
export const LINK_PROFILE = '/profile';
export const LINK_CONSOLE = '/console';

/**
 * ตรวจสอบเส้นทาง
*/
export function is (value)
{
    return window.location.pathname.startsWith (value);
}
/**
 * นำทางไปสู่หน้าหลัก
*/
export function home ()
{
    window.location.href = LINK_HOME;
}
/**
 * นำทางไปสู่หน้าเข้าสู่ระบบ
 * 
 * @param redirect หลังจากเข้าสู่ระบบ ให้นำผู้ใช้ไปยังหน้าอะไร (เริ่มต้นคือหน้าปัจจุบัน)
*/
export function auth ({redirectLogin, redirectRegister} = {
    redirectLogin: window.location.pathname,
    redirectRegister: window.location.pathname,
})
{
    if (redirectLogin == null || !redirectLogin.startsWith ('/')) throw new Error ('Login Redirect link is invalid');
    if (redirectRegister == null || !redirectRegister.startsWith ('/')) throw new Error ('Register redirect link is invalid');

    window.location.href = `${LINK_AUTH}?context=${btoa(JSON.stringify({
        redirectLogin: redirectLogin,
        redirectRegister: redirectRegister,
    }))}`;
}
/**
 * นำทางไปสู่หน้าแผงควบคุมระบบ
*/
export function admin ()
{
    window.location.href = LINK_ADMIN;
}

export default
{
    LINK_HOME,
    LINK_AUTH,
    LINK_ADMIN,
    LINK_PROFILE,
    LINK_CONSOLE,

    home,
    auth,
}