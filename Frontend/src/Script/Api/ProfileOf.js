/**
 * ไฟล์โค็ดสำหรับ: ระบบโปรไฟล์ (เวอร์ชั่นมุมมองของ)
*/
import * as auth from './Auth'
import * as profile from './Profile'
import * as util from './Util'

import * as test from './TestConfig'
import      sample from './../Sample/Profile.json'

/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลการติดต่อ
*/
export class DataContact
{
    /** เว็บไซต์ (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    website = "";
    /** อีเมล (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    email = "";
    /** เบอร์โทรศัพท์ (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    phone = "";
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลการศึกษา
*/
export class DataEducation
{
    item = [""];
    text = "";
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลความสนใจ
*/
export class DataInterest
{
    /** รายการแท็กความสนใจ (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    item = [""];

    constructor () { this.item = []; }
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลการทำงาน
*/
export class DataJob
{
    /** ประวัติการทำงาน */
    history = "";
    /** รายการงาน */
    item = 
    [{
        /** ชื่อองค์กร/บริษัท */
        entity: "",
        /** ชื่องาน */
        position: "",
        /** วันแรกที่เริ่มงาน */
        start: new Date(undefined),
        /** วันสุดท้ายที่ทำงาน */
        end: new Date(undefined),
    }];
    constructor () { this.item = []; }
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลด้านภาษา
*/
export class DataLanguage
{
    item = [""];
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลส่วนตัว
*/
export class DataPersonal
{
    /** การมองเห็น */
    visibility = profile.VISIBILITY_PUBLIC;
    /** แชร์ */
    shared = false;
    /** ภาพพื้นหลังของโปรไฟล์ */ 
    background = "";
    /** ภาพไอคอนโปรไฟล์ */
    icon = "";
    /** สถานะของโปรไฟล์ (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    status = "";
    /** ชื่อจริง (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    firstName = "";
    /** ชื่อกลาง (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    middleName = "";
    /** นามสกุล (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    lastName = "";
    /** ชื่อเล่น (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    nickname = "";
    /** สรรพนาม (เป็น PRONOUN_UNSPECIFIED ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    pronoun = 0;
    /** แนะนำตัวเอง (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    bio = "";
    /** วันเกิด (เป็น NaN (Invalid Date) ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    birthday = new Date(undefined);
    /** สถานที่อยู่ (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    location = "";
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลทักษะ
*/
export class DataSkill
{
    /** รายการแท็กทักษะ (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    item = [""];

    constructor () { this.item = []; }
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลทางสังคม
*/
export class DataSocial
{
    /** เว็บไซต์ (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    website = "";
    /** เฟสบุ๊ค (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    facebook = "";
    /** ยูทูป (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    youtube = "";
    /** Twitter (หรือ X) (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    twitter = "";
    /** Reddit (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    reddit = "";
    /** Discord (ว่างเปล่า ถ้าข้อมูลเป็นส่วนตัว/ไม่ได้กำหนด) */
    discord = "";
};

/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลโพสต์ (หนึ่งรายการ)
*/
export class DataPost
{
    /** วันที่โพสต์นี้ถูกสร้าง */
    created = new Date(undefined);
    /** วันที่โพสต์นี้ถูกแก้ไข (ถ้ามี) */
    modified = new Date(undefined);
    /** ข้อมูลสื่อ (ถ้ามี) */
    media = 
    [{
        /** ประเภทสื่อ*/ type: 0,
        /** ข้อมูลสื่อ*/ value: "",
    }];

    constructor () { this.media = []; }
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลการปรับแต่งธีม
*/
export class DataTheme
{
    /**
     * รหัสสี (ฐานสิหก)
    */
    profileColor = '';
    /**
     * รหัสรูปแบบธีม (เป็นตัวเลข)
    */
    profileLayout = 0;
    /**
     * รหัสสี (ฐานสิหก)
    */
    resumeColor = '';
    /**
     * รหัสรูปแบบธีม (เป็นตัวเลข)
    */
    resumeLayout = 0;
};

export class ErrorState extends Error {};
export class ErrorServer extends Error {};
export class ErrorArgument extends Error {};
export class ErrorAuth extends Error {};

const MSG_ERROR_INIT = 'ระบบโปรไฟล์มุมมองได้เริ่มทำงานแล้ว';
const MSG_ERROR_DEINIT = 'ระบบโปรไฟล์มุมมองยังไม่ได้เริ่มทำงาน';
const MSG_ERROR_ID = 'รหัสดัชนีโปรไฟล์ที่ระบุไม่ถูกต้อง';
const MSG_ERROR_EMPTY = 'ไม่พบข้อมูลโปรไฟล์ดังกล่าว';
const MSG_ERROR_SERVER = 'เซิฟเวอร์ไม่สามารถประมวลข้อมูลได้'

/**
 * เริ่มต้นการทำงานระบบโปรไฟล์ (มุมมอง)
 * ข้อผิดพลาด
 *  @see ErrorState เรียกคำสั่งนี้ในขณะที่ระบบเริ่มทำงานแล้ว
 *  @see ErrorServer เซิฟเวอร์ทำงานผิพลาด
*/
export function init ()
{
    if (state.init) throw new ErrorState (MSG_ERROR_INIT);

    state.init = true;
}
/**
 * ขอข้อมูลส่วนตัว จากโปรไฟล์ของผู้ใช้ดังกล่าว (ต้องระบุว่าผู้ใช้ไหน)
*/
export async function getPersonal (which = NaN)
{
    const result = new DataPersonal ();
    const block = await __getSectionAsync (which, 'personal');

    result.visibility = block.visibility;
    result.shared = Boolean (block.shared);
    result.background = block.background;  
    result.icon = block.icon;

    result.firstName    = String (__dbReadVisValue (block, 'firstName', ''));
    result.middleName   = String (__dbReadVisValue (block, 'middleName', ''));
    result.lastName     = String (__dbReadVisValue (block, 'lastName', ''));
    result.nickname     = String (__dbReadVisValue (block, 'nickname', ''));
    result.pronoun      = String (__dbReadVisValue (block, 'pronoun', profile.PRONOUN_UNKNOWN));
    result.bio          = String (__dbReadVisValue (block, 'bio', ''));
    result.birthday     = new Date (__dbReadVisValue (block, 'birthday', undefined));
    result.location     = String (__dbReadVisValue (block, 'location', ''));

    return result;
}
export async function getContact (which = NaN)
{
    const result = new DataContact ();
    const block = await __getSectionAsync (which, "contact");

    result.website = String (__dbReadVisValue (block, 'website', ''));
    result.email   = String (__dbReadVisValue (block, 'email', ''));
    result.phone   = String (__dbReadVisValue (block, 'phone', ''));

    return result;
}
export async function getInterest (which = NaN)
{
    const result = new DataInterest ();
    const block = await __getSectionAsync (which, 'interest');

    const visibility = Number (util.jsonRead (block, 'visibility', profile.VISIBILITY_UNKNOWN));
    const item = new Array (... block.item);

    if (visibility != profile.VISIBILITY_PUBLIC) 
    {
        result.item = [];
        return result;
    }

    result.item = item.map ((value) =>
    {
        return String (value);
    });
    return result;
}
export async function getSkill (which = NaN)
{
    const result = new DataSkill ();
    const block = await __getSectionAsync (which, 'skill');

    const visibility = Number (util.jsonRead (block, 'visibility', profile.VISIBILITY_UNKNOWN));
    const item = new Array (... block.item);

    if (visibility != profile.VISIBILITY_PUBLIC) 
    {
        result.item = [];
        return result;
    }
    
    result.item = item.map ((value) =>
    {
        return String (value);
    });
    return result;
}
export async function getEducation (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    const result = new DataEducation ();
    const block = await __getSectionAsync (which, 'education');

    result.text = util.jsonRead (block, 'text', "");

    if (block.item != null) 
    {
        result.item = block.item;
    }
    else
    {
        result.item = [];
    }

    return result;
}
export async function getSocial (which = NaN)
{
    const result = new DataSocial ();
    const block = await __getSectionAsync (which, 'social');

    result.website      = String (__dbReadVisValue (block, 'website', ''));
    result.facebook     = String (__dbReadVisValue (block, 'facebook', ''));
    result.youtube      = String (__dbReadVisValue (block, 'youtube', ''));
    result.twitter      = String (__dbReadVisValue (block, 'twitter', ''));
    result.reddit       = String (__dbReadVisValue (block, 'reddit', ''));
    result.discord      = String (__dbReadVisValue (block, 'discord', ''));

    return result;
}
export async function getJob (which)
{
    const result = new DataJob ();
    const block = await __getSectionAsync (which, 'job');

    const visibility = Number (util.jsonRead (block, 'visibility', profile.VISIBILITY_UNKNOWN));
    const item = new Array (... block.item);

    if (visibility != profile.VISIBILITY_PUBLIC) 
    {
        result.item = [];
        return result;
    }

    result.history = util.jsonRead (block, "history", "");
    result.item = item.map ((value) =>
    {
        const entity    = String (util.jsonRead (value, 'entity', ''));
        const position  = String (util.jsonRead (value, 'position', ''));
        const visible   = Number (util.jsonRead (value, 'visibility', profile.VISIBILITY_UNKNOWN));
        const start     = new Date (util.jsonRead (value, 'start', undefined));
        const end       = new Date (util.jsonRead (value, 'end', undefined));

        if (visible != profile.VISIBILITY_PUBLIC)
            return;

        return {
            entity: entity,
            position: position,
            start: start,
            end: end
        };
    });
    return result;
}
export async function getLanguage (which = NaN)
{
    const result = new DataLanguage ();
    const block = await __getSectionAsync (which, 'language');

    if (block.item != null)
    {
        result.item = block.item;
    }
    else
    {
        result.item = [];
    }
    return result;
}
export async function getPost (which = NaN, index = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");
    if (isNaN (index))
        throw new ErrorArgument ("Post index isn't specified or valid");

    const result = new DataPost ();
    const block  = await __getSectionAsync (which, 'post');
    const blockItem = util.jsonRead (block, 'item');

    if (blockItem.length > index || index < 0)
    {
        const item = blockItem [index];

        result.visibility = item.visibility;
        result.created = new Date(item.created);
        result.modified = new Date(item.modified);
        result.media = item.media;

        return result;
    }
    throw new ErrorArgument (`Data Out of Bounds (${index}/${blockItem.length})`);

}
export async function getTheme (which)
{
    const result = new DataTheme ();
    const block  = await __getSectionAsync (which, 'theme');

    result.profileColor = util.jsonRead (block, 'profileColor', '');
    result.profileLayout = util.jsonRead (block, 'profileLayout', 0);

    result.resumeColor = util.jsonRead (block, 'resumeColor');
    result.resumeLayout = util.jsonRead (block, 'resumeLayout', 0);

    return result;
}

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
//        

export const state =
{
    init: false,
};

async function __getSectionAsync (which, name)
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (isNaN (which)) {
        which = auth.getAccess ();
    }

    const dbRoot    = await __dbLoadAsync ();
    const dbItem    = util.jsonRead (dbRoot, 'item');
    const ixItem    = util.jsonRead (dbItem, which);
    const ixBlock   = util.jsonRead (ixItem, name);

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbItem == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (ixItem == null) throw new ErrorArgument (MSG_ERROR_ID);
    if (ixBlock == null) throw new ErrorArgument (MSG_ERROR_EMPTY);

    return ixBlock;
}

function __dbLoadAsync ()
{
    return profile.__dbLoadAsync ();
}
function __dbReadVisValue (object, key, fallback = null)
{
    const value = util.jsonRead (object, `${key}/value`);
    const visibility = util.jsonRead (object, `${key}/visibility`);

    if (value == null || visibility == null)
        return fallback;

    if (visibility != profile.VISIBILITY_PUBLIC)
        return fallback;

    return value;
}