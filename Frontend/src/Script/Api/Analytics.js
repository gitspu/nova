/**
 * 
 * โค็ดระบบสำหรับการดีงข้อมูลวิเคราะห์ระบบ
 * 
*/
import * as auth from './Auth'
import * as util from './Util';
import * as test from './TestConfig'
import sample from '../Sample/Analytics.json'

export const ACTIVITY_INCREMENT = 1;
export const ACTIVITY_DECREMENT = 2;
export const ACTIVITY_CLEAR = 3;

export class ErrorState         extends Error {};
export class ErrorServer        extends Error {};
export class ErrorAuth          extends Error {};

const MSG_ERROR_INIT = 'ระบบวิเคราะห์ได้เริ่มต้นการทำงานแล้ว';
const MSG_ERROR_DEINIT = 'ระบบวิเคราะห์ยังไม่ได้เริ่มทำงาน';
const MSG_ERROR_SERVER = 'เซิฟเวอร์ไม่สามารถประมวลข้อมูลได้'
const MSG_ERROR_AUTH_PERMISSION = 'สิทธิ์เข้าสู่ระบบของคุณไม่เพียงพอ';
const MSG_ERROR_AUTH_INVALID = 'สถานะเข้าสู่ระบบของคุณไม่ถูกต้อง';

/**
 * เริ่มต้นการทำงานระบบวิเคราะห์ข้อมูล
*/
export function init ()
{
    if (__init) throw new ErrorState (MSG_ERROR_INIT);

    __init = true;
}
/**
 * หยุดการทำงานระบบโฆษณา
*/
export function deinit ()
{
    if (__init == false) throw new ErrorState (MSG_ERROR_DEINIT);

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
 * เพิ่มจำนวนตัวเลข
*/
export function increment (key)
{
    if (! __init) throw new ErrorState (MSG_ERROR_DEINIT);

    const dbRoot = __dbLoad ();
    const dbItem = util.jsonRead (dbRoot, 'item');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbItem == null) throw new ErrorServer (MSG_ERROR_SERVER);

    dbItem.push ({
        key: key,
        type: ACTIVITY_INCREMENT,
        time: new Date().toUTCString ()
    });

    __dbSave (dbRoot);
}
/**
 * ลดจำนวนตัวเลข
*/
export function decrement (key)
{
    if (! __init) throw new ErrorState (MSG_ERROR_DEINIT);

    const dbRoot = __dbLoad ();
    const dbItem = util.jsonRead (dbRoot, 'item');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbItem == null) throw new ErrorServer (MSG_ERROR_SERVER);

    dbItem.push ({
        key: key,
        type: ACTIVITY_DECREMENT,
        time: new Date().toUTCString ()
    });
    __dbSave (dbRoot);
}
/**
 * รีเซ็ตชุดข้อมูล
*/
export function clear (key)
{
    if (! __init) throw new ErrorState (MSG_ERROR_DEINIT);

    const dbRoot = __dbLoad ();
    const dbItem = util.jsonRead (dbRoot, 'item');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbItem == null) throw new ErrorServer (MSG_ERROR_SERVER);

    dbItem.push ({
        key: key,
        type: ACTIVITY_CLEAR,
        time: new Date().toUTCString ()
    });
    __dbSave (dbRoot);
}
export function retrieve ()
{
    if (! __init) throw new ErrorState (MSG_ERROR_DEINIT);

    __seValidate ();

    const dbRoot = __dbLoad ();
    const dbItem = util.jsonRead (dbRoot, 'item');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbItem == null) throw new ErrorServer (MSG_ERROR_SERVER);

    return Array (... dbItem).map ((value) =>
    {
        return {
            key: String (value.key),
            type: Number (value.type),
            time: new Date (value.time),
        }
    });
}
export function capture (block, name, scale, range)
{
    let min = 0;
    let max = 0;
    let total = 0;
    const chunk = [];

    if (block == null || name == null ||
        scale == null || range == null
    )
    {
        return {
            min: min,
            max: max,
            total: total,
            item: chunk
        };
    }

    if (Number (scale) > Number (range))
        scale = range;

    let index = Number (block.length - 1);
    let remain = Math.ceil (Number (range) / Number (scale));
    let snapshot = 0;
    let snapshotInitialized = false;

    let dateNow = new Date ();
    let dateOffset = dateNow;

    while (true)
    {
        if (index < 0) {
            break;
        }
        if (remain == 0) {
            break;
        }

        const item = block[index];
        const key = String (item['key']);
        const type = Number (item['type']);
        const time = new Date(item['time']);

        if (key == null) continue;
        if (type == null) continue;
        if (time == null) continue;

        if (Array.isArray (name))
        {
            if (name.includes (key) === false) 
            {
                index -= 1;
                continue;
            }
        }
        else
        {
            if (name !== key) 
            {
                index -= 1;
                continue;
            }
        }

        if (Number (dateOffset.getTime () - time.getTime ()) >= Number (scale))
        {
            chunk.push (snapshot);

            if (min > snapshot)
                min = snapshot;
            if (max < snapshot)
                max = snapshot;
      
            index -= 1;
            remain -= 1;
            dateOffset = new Date (Number (dateNow.getTime ()) - (Number (scale) * chunk.length));
            
            snapshot = 0;
            snapshotInitialized = false;
            
            continue;
        }
        else
        {
            switch (type)
            {
                case ACTIVITY_INCREMENT: snapshot += 1; total += 1; break;
                case ACTIVITY_DECREMENT: snapshot -= 1; total -= 1; break;
                case ACTIVITY_CLEAR: snapshot = 0; total = 0; break;
            }
            snapshotInitialized = true;
            index -= 1;
            continue;
        }
    }
    if (snapshotInitialized)
    {
        if (chunk.length == 0)
        {
            min = 0;
            max = snapshot;
            total = snapshot;
        }
        chunk.push (snapshot);
        remain -= 1;
    }
    while (remain != 0)
    {
        remain -= 1;
        
        chunk.push (0);
        continue;
    }
    return {
        min: min,
        max: max,
        total: total,
        item: chunk
    };
}

export function isInit ()
{
    return __init;
}

// ==================================================================================================== //
//                                                                                                      //
// INTERNAL                                                                                             //
//                                                                                                      //
// ==================================================================================================== //

let __init = false;

/**
 * โหลดฐานข้อมูลโฆษณา (กระบวณการนี้ใช้ทรัพยากรค่อยข้างสูง)
*/
function __dbLoad () 
{
    if (test.REMOTE_ENABLED)
    {
        const request = new XMLHttpRequest ();

        // ใช้ติดตาม
        // console.trace ();

        request.open ('GET', `http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/analytics`, false);
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

    const readText = localStorage.getItem ("DbAnalytics");
    const readObject = (readText != null) ? JSON.parse (readText) : sample;

    return readObject;
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

        request.open ('PUT', `http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/analytics`, false);
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
    localStorage.setItem ("DbAnalytics", JSON.stringify (data));
}
function __seValidate ()
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

    if (dbAccess[ixSession.access].role != auth.ROLE_ADMIN && 
        dbAccess[ixSession.access].role != auth.ROLE_DEVELOPER)
    {
        return new ErrorState (MSG_ERROR_AUTH_PERMISSION);
    }
}
