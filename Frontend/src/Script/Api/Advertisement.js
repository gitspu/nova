/**
 * 
 * โค็ดระบบสำหรับการดีงข้อมูล ปรับเปลี่ยนข้อมูล โฆษณา
 * 
*/
'use strict';

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


export class GetPersonalization
{
    /** รหัสปรับแต่งความชอบ */
    id = 0;
}
export class GetMedia
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
export function getArray ()
{

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

function __dbFetch (path) {}
function __dbRead () {}
function __dbWrite () {}