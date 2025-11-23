import * as test from './TestConfig'
import * as util from './Util'

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
export class DataBody
{
    /** รายการโพสต์ */
    item = 
    [{
        type: TYPE_UNKNOWN,
        owner: 0,
        index: 0
    }]
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
export function init ()
{
    if (state.init) throw new ErrorState (MSG_ERROR_INIT);

    state.init = false;
    state.generation.splice (0, 1);

    const dbRoot = __dbLoad ();
    const dbProfile = util.jsonRead (dbRoot, 'item');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbProfile == null) throw new ErrorServer (MSG_ERROR_SERVER);

    try
    {
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
                state.generation.push (
                {
                    type: TYPE_NORMAL,
                    owner: Number (key),
                    index: Number (index),
                });
            }
        }
        //
        // ดึงข้อมูลโฆษณา (เร็ว ๆ นี้)
        //


        //
        // สลับอีกครั้ง
        //
        util.shuffle (state.generation);
    }
    finally
    {
        state.init = true;
    }
}
/**
 * รับข้อมูลรายการโพสต์
*/
export function getBody ()
{
    const result = new DataBody ();
    const collection = state.generation;

    result.item.splice (0, 1);
    result.item.push (... collection.map ((item) =>
    {
        return {
            type:  item.type,
            owner: item.owner,
            index: item.index,
        };
    }));
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
    generation: [{
        type: TYPE_UNKNOWN,
        owner: 0,
        index: 0
    }]
};
const key = "DbProfile";

function __dbLoad ()
{
    if (test.remote)
    {
        const request = new XMLHttpRequest ();

        request.open ('GET', 'http://100.100.1.1:3000/api/profile', false);
        request.send ();

        if (request.status != 200)
        {
            console.error (request.statusText);
            return {};
        }
        return JSON.parse (request.responseText);
    }
    let raw = localStorage.getItem (key);

    if (raw == null) 
        return {};

    return JSON.parse (raw);
}
