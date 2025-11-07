/**
 * โค็ดสำหรับระบบนำทางไปในทุก ๆ ที่ตามต้องการ
*/

const HOME = "/";
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
export function auth (redirect = window.location.href)
{
    window.location.href = `${AUTH}?context=${btoa(JSON.stringify({
        redirect: redirect
    }))}`;
}
/**
 * นำทางไปสู่หน้าแผงควบคุมระบบ
*/
export function admin ()
{
    window.location.href = ADMIN;
}