/**
 * 
 * โค็ดระบบสำหรับการดีงข้อมูล ปรับเปลี่ยนข้อมูล การหางาน
 * ระบบนี้ใช้กับองค์กรเป็นหลัก
 * 
*/
"use strict";

import * as util from './Util'
import * as profile from './Profile'
import * as test from './TestConfig'
import * as auth from './Auth'
import      sample from './../Sample/ProfileEmployer.json'
import { analytics } from '../Api';

export class DataProfile
{
    icon        = "";
    background  = "";
    name        = "";
    location    = "";

    description = "";
    gallery = [{
        type: 0,
        value: ""
    }];

    contactWebsite     = "";
    contactFacebook    = "";
    contactLine        = "";
    contactPhone       = "";

    init ()
    {
        this.gallery.splice (0, 1);
        return this;
    }
}

export class DataPost
{
    created     = new Date(undefined);
    modified    = new Date(undefined);

    category    = 0;

    time        = 0;
    position    = 0;

    workTime    = 0;
    workDuration = 0;

    title       = "";
    location    = "";
    minSalary   = 0;
    maxSalary   = 0;

    brief       = "";
    description = "";
    requirement = "";
}

export const WORK_TIME_FULL = 1;
export const WORK_TIME_PART = 2;
export const WORK_TIME_CONTRACT = 3;

export const CATEGORY_IT_DIGITAL = 1;
export const CATEGORY_MARKETING = 2;
export const CATEGORY_MANAGEMENT = 3;

export class ErrorState extends Error {};
export class ErrorServer extends Error {};
export class ErrorArgument extends Error {};
export class ErrorAuth extends Error {};

const MSG_ERROR_INIT = 'ระบบโปรไฟล์องค์กรได้ทำงานอยู่แล้วในตอนนี้';
const MSG_ERROR_DEINIT = 'ระบบโปรไฟล์องค์กรต้องเริ่มทำงานก่อน';
const MSG_ERROR_AUTH = 'ระบบโปรไฟล์องค์กรต้องการให้คุณเข้าสู่ระบบก่อน';
const MSG_ERROR_AUTH_PERMISSION = 'สิทธิ์เข้าสู่ระบบของคุณไม่เพียงพอ';
const MSG_ERROR_AUTH_INVALID = 'สถานะเข้าสู่ระบบของคุณไม่ถูกต้อง';
const MSG_ERROR_SERVER      = 'เซิฟเวอร์ไม่สามารถประมวลข้อมูลได้'
const MSG_ERROR_NOT_FOUND   = 'ไม่พบข้อมูลโปรไฟล์ดังกล่าว';
const MSG_ERROR_NOT_FOUND_2 = 'ไม่พบข้อมูลบล็อกนั้น ๆ จากโปรไฟล์ดังกล่าว';
const MSG_ERROR_CREATED     = 'ข้อมูลโปรไฟล์องค์กรมีอยู่ในระบบแล้ว';

/**
 * เริ่มต้นการทำงานระบบโปรไฟล์องค์กร
*/
export async function init ()
{
    //
    // ระบบเริ่มทำงานแล้ว
    //
    if (__init) 
        throw new ErrorState (MSG_ERROR_INIT);

    __init = true;
}

/**
 * การทำสร้างพิ้นที่เก็บข้อมูลสำหรับโปรไฟล์นั้น ๆ
 */
export async function create (which = NaN)
{
    if (__init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (auth.isLogged () == false) throw new ErrorState (MSG_ERROR_AUTH);

    which = await __seIndex (which); 
            await __seValidate (which, true, false);

    const dbRoot        = await __dbLoad ();
    const dbCollection  = util.jsonRead (dbRoot, 'item');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbCollection == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (Object.hasOwn (dbCollection, which)) 
    {
        throw new ErrorState (MSG_ERROR_CREATED);
    }
    Object.defineProperty (dbCollection, which, 
    {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {}
    });

    dbCollection[which]["profile"] =
    {
        ... new DataProfile ()
    }
    dbCollection[which]["post"] = 
    {
        item: []
    };
    await __dbSaveAsync (dbRoot);
}

/**
 * ทำการสร้างโพสต์งานลงในระบบ
*/
export async function createPost (data = null, which = NaN)
{
    if ((data instanceof DataPost) == false)
        throw new ErrorArgument ("Invalid Datatype");

    which = await __seIndex (which); 
            await __seValidate (which, true, false);

    const dbRoot = await __dbLoad ();
    const dbPost = util.jsonRead (dbRoot, `item/${which}/post/item`);
    const index = dbPost.length;

    dbPost.push (data);

    await __dbSaveAsync (dbRoot);

    util.ignore (() => analytics.increment ("jobPost"));

    return Number (index);
}
/**
 * ทำการลบโพสต์งานออกจากระบบ
*/
export async function deletePost (index = NaN, which = NaN)
{

}

export async function getProfile (which = NaN)
{
    which = await __seIndex (which);
            await __seValidate (which, false, false);

    const dbRoot = await profile.__dbLoadAsync ();
    const dbItem = util.jsonRead (dbRoot, `item/${which}`);

    if (dbRoot == null)
        throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbItem == null)
        throw new ErrorArgument (MSG_ERROR_NOT_FOUND + " -- " + which);

    const ixPersonal = dbItem["personal"];
    const result = new DataProfile ();

    result.background = ixPersonal.background;
    result.icon = ixPersonal.icon;
    result.description = ixPersonal.bio.value;
    result.name = ixPersonal.nickname.value;

    return result;
}
export async function getPost (index = NaN, which = NaN)
{
    if (isNaN (index))
        throw new ErrorArgument ("Index cannot be NaN");

    const dbRoot = await __getSectionRaw (which, "post", false, false);
    const dbItem = util.jsonRead (dbRoot, `item`);
    const ixData = dbItem[index];

    if (dbRoot == null)
        throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbItem == null) 
        throw new ErrorArgument ("Out of Bounds: " + index);

    const result = new DataPost ();

    util.objectDeserialize (result, ixData);

    return result;
}

export function isInit ()
{
    return __init;
}

let __init = false;

/**
 * ยืนยันความถูกต้องในการเข้าถึงข้อมูล
*/
async function __seIndex (which)
{
    if (isNaN (which) && (!auth.isLogged () || !auth.isActive ()))
        throw new ErrorState (MSG_ERROR_AUTH);

    if (isNaN (which))
        return auth.getAccess ();

    return which;
}
async function __seValidate (which, requireLogged, requirePrivilege)
{
    if (requireLogged == false)
        return;

    const dbRoot    = await auth.__dbLoadAsync ();
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

    if (which == auth.getAccess ()) 
        return;

    if (requirePrivilege == false)
        return;

    if (dbAccess[ixSession.access].role != auth.ROLE_ADMIN && 
        dbAccess[ixSession.access].role != auth.ROLE_DEVELOPER)
    {
        return new ErrorState (MSG_ERROR_AUTH_PERMISSION);
    }
}

async function __getSectionRaw (which, name, requireLogged, requirePrivilege)
{
    if (__init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    which = await __seIndex (which);
            await __seValidate (which, requireLogged, requirePrivilege);

    const dbRoot        = await __dbLoad ();
    const dbCollection  = util.jsonRead (dbRoot, 'item');
    const dbTarget      = util.jsonRead (dbCollection, which);
    const dbTargetSec   = util.jsonRead (dbTarget, name);

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbCollection == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (dbTarget == null) throw new ErrorState (MSG_ERROR_NOT_FOUND);
    if (dbTargetSec == null) throw new ErrorState (MSG_ERROR_NOT_FOUND_2); 

    return dbTargetSec;
}
async function __setSectionAsync (structure, which, name)
{
    if (__init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    which = await __seIndex (which);
            await __seValidate (which);

    const dbRoot        = await __dbLoad ();
    const dbCollection  = util.jsonRead (dbRoot, 'item');
    const dbTarget      = util.jsonRead (dbCollection, which);
    const dbTargetSec   = util.jsonRead (dbTarget, name);

    if (dbRoot == null)         throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbCollection == null)   throw new ErrorServer (MSG_ERROR_SERVER);

    if (dbTarget == null)       throw new ErrorState (MSG_ERROR_NOT_FOUND);
    if (dbTargetSec == null)    throw new ErrorState (MSG_ERROR_NOT_FOUND_2); 

    util.objectSerialize (structure, dbTargetSec);

    await __dbSaveAsync (dbRoot);
}
async function __setSectionRawAsync (structure, which, name)
{
    if (__init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    which = await __seIndex (which);
            await __seValidate (which);

    const dbRoot        = await __dbLoad ();
    const dbCollection  = util.jsonRead (dbRoot, 'item');
    const dbTarget      = util.jsonRead (dbCollection, which);
    let dbTargetSec   = util.jsonRead (dbTarget, name);

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbCollection == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (dbTarget == null) throw new ErrorState (MSG_ERROR_NOT_FOUND);
    if (dbTargetSec == null) throw new ErrorState (MSG_ERROR_NOT_FOUND_2); 

    dbTargetSec = structure;

    await __dbSaveAsync (dbRoot);
}

export let __dbCache = {};
export let __dbCacheAge = new Date (undefined);


async function __dbLoad ()
{
    if (test.REMOTE_ENABLED)
    {
        if (test.CACHING_ENABLED)
        {
            if (!util.timeLonger (__dbCacheAge, test.CACHING_AGE))
                return Promise.resolve (__dbCache);
        }
        return fetch (`http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/profile-employer`, {
            method: "GET",
        })
        .then ((response) => response.json ())
        .then ((json) => 
        {
            __dbCache = json;
            __dbCacheAge = new Date((new Date ()).getTime () + test.CACHING_AGE);
            return json;
        });
    }
    else
    {
        if (typeof localStorage === 'undefined')
        {
            // LocalStorage ใช้งานไม่ได้
            return sample;
        }
        const readText = localStorage.getItem ("DbProifleEmployer");
        const readObject = (readText != null) ? JSON.parse (readText) : sample;

        return Promise.resolve (readObject); 
    }
}
export async function __dbSaveAsync (content)
{
    if (test.REMOTE_ENABLED)
    {
        return fetch (`http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/profile-employer`, {
            method: "PUT",
            body: JSON.stringify (content)
        })
        .then ((response) =>
        {
            if (response.ok && test.CACHING_ENABLED)
            {
                __dbCache = content;
                __dbCacheAge = new Date ((new Date ()).getTime () + test.CACHING_AGE);
            }
        });
    }
    else
    {
        if (typeof localStorage === 'undefined')
        {
            // LocalStorage ใช้งานไม่ได้
            return;
        }
        localStorage.setItem ("DbProifleEmployer", JSON.stringify (content));
    }
}
