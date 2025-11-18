/**
 * โค็ดสำหรับระบบนำทางไปในทุก ๆ ที่ตามต้องการ
*/

const HOME = "/";
const PROFILE = "/profile";

const AUTH = "/auth";
const ADMIN = "/admin";

/**
 * นำทางไปสู่หน้าหลัก
*/
export function home ()
{
    window.location.href = HOME;
}
/**
 * นำทางไปสู่หน้าเข้าสู่ระบบ
 * 
 * @param redirect หลังจากเข้าสู่ระบบ ให้นำผู้ใช้ไปยังหน้าอะไร (เริ่มต้นคือหน้าปัจจุบัน)
*/
export function auth ({redirectLogin, redirectRegister} = {
    redirectLogin: window.location.toString (),
    redirectRegister: window.location.toString (),
})
{
    if (redirectLogin == null) throw new Error ('Login Redirect link is invalid');
    if (redirectRegister == null) throw new Error ('Register redirect link is invalid');

    window.location.href = `${AUTH}?context=${btoa(JSON.stringify({
        redirectLogin: redirectLogin,
        redirectRegister: redirectRegister,
    }))}`;
}
/**
 * นำทางไปสู่หน้าแผงควบคุมระบบ
*/
export function admin ()
{
    window.location.href = ADMIN;
}