/**
 * 
 * โค็ดระบบสำหรับการดีงข้อมูล ปรับเปลี่ยนข้อมูล โฆษณา
 * 
*/
'use strict';

import * as auth from './Auth'
import * as util from './Util'
import * as test from './TestConfig'
import sample   from '../Sample/Advertisement.json'

/**
 * โครงสร้างข้อมูลที่เก็บการตั้งค่าระบบโฆษณา
*/
export class DataConfig
{
    /**
     * เปิดใช้งานคุณสมบัติโฆษณา
    */
    enabled = true;
}
/**
 * โครงสร้างข้อมูลที่เก็บเนื้อหาโฆษณาแต่ละรายการเอาไว้
*/
export class DataContent
{
    /** 
     * หัวข้อโฆษณา 
    */
    title = '';
    /** 
     * คำอธิบายเกี่ยวกับโฆษณานี้ 
    */
    description = '';
    /**
     * สื่อข้อมูล (เช่น รูปภาพ) 
    */
    media = '';
}
/**
 * โครงสร้างข้อมูลที่รหัสโฆษณาแต่ละรายการเอไาว้
*/
export class DataMap
{
    /** รายการรหัสโฆษณา */
    item = [0];
}

export class ErrorState         extends Error {};
export class ErrorServer        extends Error {};
export class ErrorArgument      extends Error {};
export class ErrorConfig        extends Error {};

const MSG_ERROR_INIT = 'ระบบโฆษณาได้เริ่มต้นการทำงานแล้ว';
const MSG_ERROR_DEINIT = 'ระบบโฆษณายังไม่ได้เริ่มทำงาน';
const MSG_ERROR_SERVER      = 'เซิฟเวอร์ไม่สามารถประมวลข้อมูลได้'
const MSG_ERROR_PERMISSION  = 'สิทธิ์เข้าสู่ระบบของคุณไม่เพียงพอ';
const MSG_ERROR_AUTH = 'ระบบโปรไฟล์ต้องการให้คุณเข้าสู่ระบบก่อน';
const MSG_ERROR_AUTH_PERMISSION = 'สิทธิ์เข้าสู่ระบบของคุณไม่เพียงพอ';
const MSG_ERROR_AUTH_INVALID = 'สถานะเข้าสู่ระบบของคุณไม่ถูกต้อง';
const MSG_ERROR_DATATYPE    = 'ประเภทข้อมูลนั้นไม่ถูกต้อง';

/**
 * เริ่มต้นการทำงานระบบโฆษณา
*/
export function init ()
{
    if (__init) throw new Error (MSG_ERROR_INIT);

    __init = true;
}
/**
 * หยุดการทำงานระบบโฆษณา
*/
export function deinit ()
{
    if (__init == false) throw new Error (MSG_ERROR_DEINIT);

    try
    {
        // ....
    }
    finally
    {
        __init = false;
    }
}

/**
 * รับข้อมูลการตั้งค่าของระบบโฆษณา (คำสั่งนี้ต้องใช้สิทธิ์ขั้นสูง)
*/
export function getConfig () 
{
    // สถานะ
    if (! __init) throw new ErrorState (MSG_ERROR_DEINIT);

    // ใช้ได้แค่เฉพาะสิทธิ์ขั้นสูง
    __seValidate (true);

    const dbRoot = __dbLoad ();
    const dbConfig = util.jsonRead (dbRoot, 'config');
    const result = new DataConfig (); 

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbConfig == null) throw new ErrorServer (MSG_ERROR_SERVER);
    
    result.enabled = Boolean (dbConfig.enabled);

    return result;
}
/**
 * รับข้อมูลโฆษณาตามที่อยู่ดังกล่าว
*/
export function getContent (id = NaN) 
{
    if (! __init) throw new ErrorState (MSG_ERROR_DEINIT);
}
/**
 * รับข้อมูลที่อยู่ในโฆษณาแต่ละรายการ (คำสั่งนี้ต้องใช้สิทธิ์ขั้นสูง)
*/
export function getMap ()
{
    // สถานะ
    if (! __init) throw new ErrorState (MSG_ERROR_DEINIT);
    
    // ใช้ได้แค่เฉพาะสิทธิ์ขั้นสูง
    __seValidate (true);

    const dbRoot = __dbLoad ();
    const dbItem = util.jsonRead (dbRoot, 'item');
    const result = new DataMap ();

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbItem == null) throw new ErrorServer (MSG_ERROR_SERVER);

    //
    // ลบข้อมูลแม่แบบออก
    //
    result.item.splice (0, 1);

    for (const item of Object.keys (dbItem))
    {
        result.item.push (Number (item));
    }
    return result;
}
/**
 * เปลี่ยนแปลงการตั้งค่าของระบบโฆษณา (คำสั่งนี้ต้องใช้สิทธิ์ขั้นสูง)
*/
export function setConfig (value) 
{
    // สถานะ
    if (! __init) throw new ErrorState (MSG_ERROR_DEINIT);
    if (! (value instanceof DataConfig)) throw new ErrorArgument (MSG_ERROR_DATATYPE);

    //
    // ใช้ได้แค่เฉพาะสิทธิ์ขั้นสูง
    //
    __seValidate (true);

    const dbRoot = __dbLoad ();
    const dbConfig = util.jsonRead (dbRoot, 'config');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbConfig == null) throw new ErrorServer (MSG_ERROR_SERVER);

    dbConfig.enabled = Boolean (value.enabled);

    //
    // บันทึกข้อมูล
    //
    __dbSave (dbRoot);
}
/**
 * เปลี่ยนแปลงเนื้อหาของโฆษณา (คำสั่งนี้ต้องใช้สิทธิ์ขั้นสูง)
*/
export function setContent (id, value) 
{

}
/**
 * เพิ่มเนื้อหาโฆษณาเข้าไปในระบบ
*/
export function addContent () 
{
    return 0;
}
/**
 * นำเนื้อหาโฆษณาดังกล่าวออกจากระบบ
*/
export function removeContent (id) 
{

}

//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          INTERNAL                          || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

let __init = false;

/**
 * ยืนยันสิทธิ์การเข้าถึงซึ่งรวมไปถึงการเข้าสู่ระบบและสิทธิ์ที่ตนเองมี
*/
function __seValidate (restricted = false)
{
    const dbRoot    = auth.__dbLoad ();
    const dbSession = util.jsonRead (dbRoot, 'challenge/session');
    const dbAccess  = util.jsonRead (dbRoot, 'access');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbSession == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);

    const ixSession = util.jsonRead (dbSession, auth.getSession ());

    if (ixSession == null) 
        throw new ErrorState (MSG_ERROR_AUTH_INVALID)

    if (ixSession.access != auth.getAccess ())
        return new ErrorState (MSG_ERROR_AUTH_INVALID);

    if (dbAccess[ixSession.access] == null)
        return new ErrorState (MSG_ERROR_AUTH_INVALID);

    if (restricted == false) 
        return;

    if (dbAccess[ixSession.access].role != auth.ROLE_ADMIN && 
        dbAccess[ixSession.access].role != auth.ROLE_DEVELOPER)
    {
        return new ErrorState (MSG_ERROR_AUTH_PERMISSION);
    }
}
/**
 * โหลดฐานข้อมูลโฆษณา (กระบวณการนี้ใช้ทรัพยากรค่อยข้างสูง)
*/
function __dbLoad () 
{
    if (test.REMOTE_ENABLED)
    {
        const request = new XMLHttpRequest ();

        request.open ('GET', `http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/ads`, false);
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
/**
 * โหลดฐานข้อมูลโฆษณา (กระบวณการนี้ใช้ทรัพยากรค่อยข้างสูง)
*/
async function __dbLoadAsync ()
{
    if (test.REMOTE_ENABLED)
    {
        return fetch (`http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/ads`, {
            method: 'GET'
        })
        .then ((response) => response.json ());
    }
    if (typeof localStorage === 'undefined')
    {
        // LocalStorage ใช้งานไม่ได้
        return sample;
    }

    const readText = localStorage.getItem ("DbAds");
    const readObject = (readText != null) ? JSON.parse (readText) : sample;

    return Promise.resolve (readObject);
}
/**
 * บันทึกข้อมูลโฆษณาลงไปยังฐานข้อมูล (กระบวณการนี้ใช้ทรัพยากรค่อยข้างสูง)
*/
function __dbSave (data) 
{
    if (data == null) throw new Error ('The content must not be null');
    if (typeof data !== 'object') throw new Error ('The content must be an object');

    if (test.REMOTE_ENABLED)
    {
        const request = new XMLHttpRequest ();

        request.open ('PUT', `http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/ads`, false);
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