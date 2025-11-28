import * as test from './TestConfig'
import * as util from './Util'

import sampleProfile from "../Sample/Profile.json";
import sampleEmployer from "../Sample/ProfileEmployer.json"
import { profile } from '../Api';

/**
 * โครงสร้างที่เก็บข้อมูลส่วนหัว สำหรับเตรียมพร้อมในการเรียกข้อมูล
*/
export class DataHeader
{
    /** จำนวนข้อมูลที่ถูกแบ่งไว้ในทุกเรียกข้อมูลส่วนเนื้อหา (ยังไม่ใช้ตอนนี้) */
    chunk = 10;
};
/**
 * โครงสร้างที่เก็บข้อมูลรายการโพสต์ ที่ได้จากการเรียกคำสั่ง
*/
export class DataPostProfile
{
    /** รายการโพสต์ */
    item = 
    [{
        owner: 0,
        index: 0
    }]

    constructor ()
    {
        this.item = [];
    }
};
/**
 * โครงสร้างที่เก็บข้อมูลรายการโพสต์ ที่ได้จากการเรียกคำสั่ง
*/
export class DataPostJob
{
    /** รายการโพสต์ */
    item = 
    [{
        owner: 0,
        index: 0
    }]

    constructor ()
    {
        this.item = [];
    }
};

/**
 * เป็นประเภทโพสต์ที่ระบบไม่รู้จัก
*/
export const TYPE_UNKNOWN = 0;
/**
 * เป็นประเภทโพสต์ทั่วไปที่เกิดจากผู้ใช้
*/
export const TYPE_NORMAL = 1;
/**
 * เป็นประเภทโพสต์แบบโฆษณา
*/
export const TYPE_SPONSORED = 2;

export class ErrorState extends Error {};
export class ErrorServer extends Error {};
export class ErrorArgument extends Error {};

const MSG_ERROR_INIT = 'ระบบฟีดได้เริ่มต้นทำงานแล้ว';
const MSG_ERROR_DEINIT = 'ระบบฟีดยังไม่ได้เริ่มต้นทำงาน';
const MSG_ERROR_SERVER = 'เซิฟเวอร์ไม่สามารถประมวลข้อมูลได้'

/**
 * เริ่มต้นการทำงานระบบฟีด
*/
export async function init ()
{
    //
    // ระบบเริ่มทำงานแล้ว
    //
    if (state.init) 
        throw new ErrorState (MSG_ERROR_INIT);

    state.init = true;
}
/**
 * รับข้อมูลรายการโพสต์
*/
export async function getPostProfile (start = NaN, end = NaN)
{
    if (state.init == false)
        throw new ErrorState (MSG_ERROR_DEINIT);

    const dbRoot = await __dbLoadProfile ();
    const dbProfile = util.jsonRead (dbRoot, "item");
    const result = new DataPostProfile ();

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbProfile == null) throw new ErrorServer (MSG_ERROR_SERVER);

    //
    // ดึงโพสต์จากโปรไฟล์ของผู้ใช้เข้ามา
    //
    for (const key of util.shuffle (Object.keys (dbProfile)))
    {
        const ixRoot = dbProfile[key];
        const ixPost = util.jsonRead (ixRoot, 'post/item');

        // ไม่น่าจะเกิดขึ้น แต่ก็ ...
        if (ixRoot == null) continue;
        if (ixPost == null) continue;

        // สลับข้อมูล
        util.shuffle (ixPost);

        for (let index = 0; index < ixPost.length; index ++)
        {
            result.item.push ({
                owner: Number (key),
                index: Number (index),
            });
        }
    }
    //
    // สลับอีกครั้ง
    //
    util.shuffle (result.item);
    //
    // ส่งข้อมูลกลับ
    //
    return result;
}
/**
 * รับข้อมูลการการโพสต์
*/
export async function getPostJob (start = NaN, end = NaN)
{
    if (state.init == false)
        throw new ErrorState (MSG_ERROR_DEINIT);

    const dbRoot = await __dbLoadProfileEmployer ();
    const dbItem = util.jsonRead (dbRoot, "item");
    const result = new DataPostJob ();

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbItem == null) throw new ErrorServer (MSG_ERROR_SERVER);

    //
    // ดึงโพสต์จากโปรไฟล์ของผู้ใช้เข้ามา
    //
    for (const key of util.shuffle (Object.keys (dbItem)))
    {
        const ixRoot = dbItem[key];
        const ixPost = util.jsonRead (ixRoot, 'post/item');

        // ไม่น่าจะเกิดขึ้น แต่ก็ ...
        if (ixRoot == null) continue;
        if (ixPost == null) continue;

        // สลับข้อมูล
        util.shuffle (ixPost);

        for (let index = 0; index < ixPost.length; index ++)
        {
            result.item.push ({
                owner: Number (key),
                index: Number (index),
            });
        }
    }
    //
    // สลับอีกครั้ง
    //
    util.shuffle (result.item);
    //
    // นำโพสต์ใหม่อยู่บนสุด
    //
    try 
    {
        result.item = result.item.sort ((a, b) =>
        {
            const itemA = dbRoot["item"][a.owner]["post"]["item"][a.index];
            const itemB = dbRoot["item"][b.owner]["post"]["item"][b.index];

            const dateA = new Date (itemA);
            const dateB = new Date (itemB);

            console.log (itemA, itemB);

            if (dateA.getTime () > dateB.getTime ())
                return 1;
            if (dateA.getTime () < dateB.getTime ())
                return -1;

            return 0;
        });
    }
    catch (ex)
    {
        console.error (ex);
    }
    //
    // ส่งข้อมูลกลับ
    //
    return result;
}

/**
 * รับค่าสถานะการทำงานของระบบ
*/
export function isInit ()
{
    return state.init;
}


//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          INTERNAL                          || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

export const state =
{
    init: false,
};

function __dbLoadProfile ()
{
    if (test.REMOTE_ENABLED)
    {
        return fetch (`http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/profile`, {
            method: "GET"  
        })
        .then ((response) => response.json ());
    }
    if (typeof localStorage === 'undefined')
    {
        // LocalStorage ใช้งานไม่ได้
        return sampleProfile;
    }

    const readText = localStorage.getItem ("DbProfile");
    const readObject = (readText != null) ? JSON.parse (readText) : sampleProfile;

    return Promise.resolve (readObject);
}
function __dbLoadProfileEmployer ()
{
    if (test.REMOTE_ENABLED)
    {
        return fetch (`http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/profile-employer`, {
            method: "GET"  
        })
        .then ((response) => response.json ());
    }
    if (typeof localStorage === 'undefined')
    {
        // LocalStorage ใช้งานไม่ได้
        return sampleEmployer;
    }

    const readText = localStorage.getItem ("DbProfileEmployer");
    const readObject = (readText != null) ? JSON.parse (readText) : sampleEmployer;

    return readObject;
}
