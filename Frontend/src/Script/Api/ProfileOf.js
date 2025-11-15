/**
 * ไฟล์โค็ดสำหรับ: ระบบโปรไฟล์ (เวอร์ชั่นมุมมองของ)
*/
import * as profile from './Profile'
import * as test from './TestConfig'

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
    /** รายการงาน */
    item = 
    [{
        /** ชื่องาน */
        name: "",
        /** ชื่อองค์กร/บริษัท */
        entity: "",
        /** วันแรกที่เริ่มงาน */
        start: new Date(undefined),
        /** วันสุดท้ายที่ทำงาน */
        end: new Date(undefined),
    }];
    constructor () { this.item = []; }
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลส่วนตัว
*/
export class DataPersonal
{
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
        /** ประเภทสื่อ*/ type: "",
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
    color = "";
    /**
     * รหัสรูปแบบธีม (เป็นตัวเลข)
    */
    layout = 0;
};

export class ErrorState extends Error {};
export class ErrorServer extends Error {};
export class ErrorArgument extends Error {};
export class ErrorAuth extends Error {};

/**
 * เริ่มต้นการทำงานระบบโปรไฟล์ (มุมมอง)
 * ข้อผิดพลาด
 *  @see ErrorState เรียกคำสั่งนี้ในขณะที่ระบบเริ่มทำงานแล้ว
 *  @see ErrorServer เซิฟเวอร์ทำงานผิพลาด
*/
export function init ()
{
    if (state.init)
        throw new ErrorState ("Profile Viewer system is already been initialized");

    state.init = true;
}
/**
 * ขอข้อมูลส่วนตัว จากโปรไฟล์ของผู้ใช้ดังกล่าว (ต้องระบุว่าผู้ใช้ไหน)
*/
export function getPersonal (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    const result = new DataPersonal ();
    const block = getBlock (which, "personal");
  
    result.background = block.background;
    result.icon = block.icon;
    result.firstName = block.firstName.visibility == profile.VISIBILITY_PUBLIC ? block.firstName.value : "";
    result.middleName = block.middleName.visibility == profile.VISIBILITY_PUBLIC ? block.middleName.value : "";
    result.lastName = block.lastName.visibility == profile.VISIBILITY_PUBLIC ? block.lastName.value : "";
    result.nickname = block.nickname.visibility == profile.VISIBILITY_PUBLIC ? block.nickname.value : "";
    result.pronoun = block.pronoun.visibility == profile.VISIBILITY_PUBLIC ? block.nickname.value : "";
    result.bio = block.bio.visibility == profile.VISIBILITY_PUBLIC ? block.bio.value : "";
    result.birthday = block.birthday.visibility == profile.VISIBILITY_PUBLIC ? new Date(block.birthday.value) : "";
    result.location = block.location.visibility == profile.VISIBILITY_PUBLIC ? block.location.value : "";

    return result;
}
export function getContact (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    const result = new DataContact ();
    const block = getBlock (which, "contact");

    result.website = block.website.visibility == profile.VISIBILITY_PUBLIC ? block.website.value : "";
    result.email = block.email.visibility == profile.VISIBILITY_PUBLIC ? block.email.value : "";
    result.phone = block.phone.visibility == profile.VISIBILITY_PUBLIC ? block.phone.value : "";

    return result;
}
export function getInterest (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    const result = new DataInterest ();
    const block = getBlock (which, "interest");

    if (block.visibility == profile.VISIBILITY_PUBLIC)
    {
        result.item = block.item;
    }
    return result;
}
export function getSkill (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    const result = new DataSkill ();
    const block = getBlock (which, "skill");

    if (block.visibility == profile.VISIBILITY_PUBLIC)
    {
        result.item = block.item;
    }
    return result;
}
export function getEducation (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    return new DataEducation ();
}
export function getSocial (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    return new DataSocial ();
}
export function getJob (which)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    return new DataJob ();
}
export function getPost (which = NaN, index = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");
    if (isNaN (index))
        throw new ErrorArgument ("Post index isn't specified or valid");

    const result = new DataPost ();
    const block = getBlock (which, "post");
    const blockItem = block["item"];

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
export function getTheme (which)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    return new DataTheme ();
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
const key = "DbProfile";


function getBlock (which, name)
{
    if (state.init == false)
        throw new ErrorState ("Profile Viewer system must be initialized");

    const json = loadJson ();
    const itemList = json["item"];

    if (itemList[String(which)] == null) 
        throw new ErrorArgument ("No specified profile was found: " + which);

    return itemList[String(which)][String(name)];
}
function loadJson ()
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