/**
 * 
 * โค็ดระบบสำหรับการดีงข้อมูล ปรับเปลี่ยนข้อมูล โฆษณา
 * 
*/
import auth     from './Auth'
import test     from './TestConfig'
import sample   from '../ApiMock/Advertisement.json'

const ERROR_INIT = 'The advertisement system must be initialized';
const ERROR_DEINIT = 'The advertisement system must be deinitialized';

let __init = false;

/**
 * เริ่มต้นการทำงานระบบโฆษณา
*/
export function init ()
{
    if (__init) 
        throw new Error (ERROR_DEINIT);

    __init = true;
}
/**
 * หยุดการทำงานระบบโฆษณา
*/
export function deinit ()
{
    if (__init == false) 
        throw new Error (ERROR_INIT);

    try
    {
        // ....
    }
    finally
    {
        __init = false;
    }
}


export function getConfig () {}
export function getMedia () {}
export function getPersonalization () {}

export function setConfig () {}
export function setMedia () {}
export function setPersonalization () {}

export function addMedia () {}
export function removeMedia () {}


export class DataMedia
{
    /** รายการโฆษณา */
    item = [{
        /** หัวข้อ */ title: '',
        /** คำอธิบาย */ description: '',
        /** สื่อ (เช่น รูป) */ media: '',
    }];
}
/**
 * ดึงบล็อกข้อมูลจากเซิร์ฟเวอร์
*/
export function get (block = [].slice(0, 0))
{
    if (__init == false) 
        throw new Error (ERROR_INIT);

    if (block == null || block.length == 0) 
        return;
}
/**
 * เขียนบล็อกข้อมูลเข้าไปยังเซิร์ฟเวอร์
*/
export function set (block = [])
{
    if (block == null || block.length == 0) return;
}


//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          INTERNAL                          || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

function __dbLoad () 
{
    if (test.remote)
    {
        const request = new XMLHttpRequest ();

        // ใช้ติดตาม
        // console.trace ();

        request.open ('GET', 'http://100.100.1.1:3000/api/ads', false);
        request.send ();

        if (request.status != 200)
        {
            console.error (request.statusText);
            return sample;
        }
        return JSON.parse (request.responseText);
    }
    if (typeof localStorage === 'undefined')
    {
        // LocalStorage ใช้งานไม่ได้
        return sample;
    }

    const readText = localStorage.getItem ("DbAds");
    const readObject = (readText != null) ? JSON.parse (readText) : sample;

    return readObject;
}
function __dbSave (data) 
{
    if (data == null) throw new Error ('The content must not be null');
    if (typeof data !== 'object') throw new Error ('The content must be an object');

    if (test.remote)
    {
        const request = new XMLHttpRequest ();

        request.open ('PUT', 'http://100.100.1.1:3000/api/ads', false);
        request.send (JSON.stringify(data));

        if (request.status != 200)
        {
            console.error (request.statusText);
        }
        return;
    }
    if (typeof localStorage === 'undefined')
    {
        // LocalStorage ใช้งานไม่ได้
        return;
    }
    localStorage.setItem ("DbAds", JSON.stringify (data));
}