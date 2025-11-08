/**
 * ไฟล์โค็ดสำหรับ: ระบบโปรไฟล์ (เวอร์ชั่นมุมมองของ)
*/

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
    /** ข้อความในโพสต์นั้น */
    text = "";
    /** ข้อมูลสื่อ (ถ้ามี) */
    media = 
    [{
        /** ประเภทสื่อ*/ type: "",
        /** ข้อมูลสื่อ*/ value: "",
    }];

    constructor () { this.media = []; }
};

export class ErrorState extends Error {};
export class ErrorServer extends Error {};
export class ErrorArgument extends Error {};
export class ErrorAuth extends Error {};

/**
 * ขอข้อมูลส่วนตัว จากโปรไฟล์ของผู้ใช้ดังกล่าว (ต้องระบุว่าผู้ใช้ไหน)
*/
export function getPersonal (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    return new DataPersonal ();
}
export function getContact (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    return new DataContact ();
}
export function getInterest (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    return new DataInterest ();
}
export function getSkill (which = NaN)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    return new DataSkill ();
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
export function getPost (which)
{
    if (isNaN (which))
        throw new ErrorArgument ("Profile identifier isn't specified or valid");

    return new DataPost ();
}