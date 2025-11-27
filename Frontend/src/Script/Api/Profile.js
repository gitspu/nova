/**
 * ไฟล์โค็ดสำหรับ: ระบบโปรไฟล์
*/
import * as util from './Util'
import * as test from './TestConfig'
import * as auth from './Auth'
import      sample from './../Sample/Profile.json'

/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลการติดต่อ
*/
export class DataContact
{
    /* เว็บไซต์ */
    website = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = "", visibility = 0) { this.value = value; this.visibility = visibility; }
    }
    /* อีเมล */
    email = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = "", visibility = 0) { this.value = value; this.visibility = visibility; }
    }
    /* เบอร์โทรศัพท์ */
    phone = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = "", visibility = 0) { this.value = value; this.visibility = visibility; }
    }
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
    /** ตั้งค่าการมองเห็น */
    visibility = VISIBILITY_PUBLIC;
    /** รายการแท็กความสนใจ */
    item = [""];
    /** ตั้งค่าข้อมูล */
    set (value = [], visibility = 0) { this.value = value; this.visibility = visibility; }
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลการทำงาน
*/
export class DataJob
{
    /** รายการงาน */
    item = 
    [{
        /** ชื่อองค์กร/บริษัท */
        entity: "",
        /** ชื่องาน */
        position: "",
        /** การมองเห็น */
        visibility: VISIBILITY_PUBLIC,
        /** วันแรกที่เริ่มงาน */
        start: new Date(undefined),
        /** วันสุดท้ายที่ทำงาน */
        end: new Date(undefined),
    }];
    /** ตั้งค่าข้อมูล */
    set (value = []) { this.value = value; }
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
    /** สถานะโปรไฟล์ */
    status = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = "", visibility = 0) { this.value = value; this.visibility = visibility; }
    }
    /** ชื่อจริง */
    firstName = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = "", visibility = 0) { this.value = value; this.visibility = visibility; }
    }
    /** ชื่อกลาง */
    middleName = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = "", visibility = 0) { this.value = value; this.visibility = visibility; }
    }
    /** นามสกุล */
    lastName = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = "", visibility = 0) { this.value = value; this.visibility = visibility; }
    }
    /** ชื่อเล่น */
    nickname = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = "", visibility = 0) { this.value = value; this.visibility = visibility; }
    }
    /** สรรพนาม */
    pronoun = {
        /** ค่าที่เก็บ */   value: PRONOUN_UNSPECIFIED,
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = 0, visibility = 0) { this.value = value; this.visibility = visibility; }
    }
    /** แนะนำตัวเอง */
    bio = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = "", visibility = 0) { this.value = value; this.visibility = visibility; }
    }
    /** วันเกิด */
    birthday = {
        /** ค่าที่เก็บ */   value: new Date(undefined),
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = new Date(), visibility = 0) { this.value = value; this.visibility = visibility; }
    }
    /** สถานที่อยู่ */
    location = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
        /** ตั้งค่าข้อมูล */
        set (value = "", visibility = 0) { this.value = value; this.visibility = visibility; }
    }
}
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลทักษะ
*/
export class DataSkill
{
    /** ตั้งค่าการมองเห็น */
    visibility = VISIBILITY_PUBLIC;
    /** รายการแท็กทักษะ */
    item = [""];
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลทางสังคม
*/
export class DataSocial
{
    /** เว็บไซต์ */
    website = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
    }
    /** เฟสบุ๊ค */
    facebook = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
    }
    /** ยูทูป */
    youtube = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
    }
    /** Twitter (หรือ X) */
    twitter = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
    }
    /** Reddit (เว็บสนทนา) */
    reddit = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
    }
    /** Discord (คุยและแชท) */
    discord = {
        /** ค่าที่เก็บ */   value: "",
        /** การมองเห็น */ visibility: VISIBILITY_PUBLIC,
    }
};
/**
 * บล็อกสำหรับพื้นที่จัดเก็บข้อมูลการปรับแต่งธีม
*/
export class DataTheme
{
    /**
     * รหัสสี (ฐานสิหก)
    */
    profileColor = "";
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

const MSG_ERROR_INIT = 'ระบบโปรไฟล์ได้ทำงานอยู่แล้วในตอนนี้';
const MSG_ERROR_DEINIT = 'ระบบโปรไฟล์ต้องเริ่มทำงานก่อน';
const MSG_ERROR_AUTH = 'ระบบโปรไฟล์ต้องการให้คุณเข้าสู่ระบบก่อน';
const MSG_ERROR_AUTH_PERMISSION = 'สิทธิ์เข้าสู่ระบบของคุณไม่เพียงพอ';
const MSG_ERROR_AUTH_INVALID = 'สถานะเข้าสู่ระบบของคุณไม่ถูกต้อง';
const MSG_ERROR_SERVER      = 'เซิฟเวอร์ไม่สามารถประมวลข้อมูลได้'
const MSG_ERROR_CREATED     = 'ข้อมูลโปรไฟล์มีอยู่ในระบบแล้ว';
const MSG_ERROR_NOT_FOUND   = 'ไม่พบข้อมูลโปรไฟล์ดังกล่าว';
const MSG_ERROR_NOT_FOUND_2 = 'ไม่พบข้อมูลบล็อกนั้น ๆ จากโปรไฟล์ดังกล่าว';
const MSG_ERROR_DATATYPE    = 'ประเภทข้อมูลนั้นไม่ถูกต้อง';
/**
 * เริ่มต้นการทำงานระบบโปรไฟล์
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
 * ทำการสร้างข้อมูลโปรไฟล์ (ให้ตัวเองหรือผู้อื่น (จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น))
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth การเข้าสู่ระบบไม่สมบูรณ์
 *  @see ErrorState ระบบโปรไฟล์ไม่ทำงาน หรือ มีข้อมูลโปรไฟล์อยู่แล้ว
*/
export function create (which = NaN)
{

    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    which = __seIndex (which); 
            __seValidate (which);

    const dbRoot        = __dbLoad ();
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

    const newContact    = new DataContact ();
    const newEducation  = new DataEducation ();
    const newInterest   = new DataInterest ();
    const newJob        = new DataJob ();
    const newPersonal   = new DataPersonal ();
    const newSkill      = new DataSkill ();
    const newSocial     = new DataSocial ();
    const newTheme      = new DataTheme ();

    //
    // ล้างข้อมูล prototype ออก
    //
    newInterest.item = [];
    newSkill.item = [];

    dbCollection[which]['contact'] = { ... newContact };
    dbCollection[which]['education'] = { ... newEducation };
    dbCollection[which]['interest'] = { ... newInterest };
    dbCollection[which]['job'] = { ... newJob };
    dbCollection[which]['personal'] = { ... newPersonal };
    dbCollection[which]['post'] = { item: [] };
    dbCollection[which]['skill'] = { ... newSkill };
    dbCollection[which]['social'] = { ... newSocial };
    dbCollection[which]['theme'] = { ... newTheme };

    __dbSave (dbRoot);
}
/**
 * ขอข้อมูลติดต่อ จากโปรไฟล์ของผู้ใช้ดังกล่าว (ถ้าไม่ระบุจะเป็นดึงของตัวเอง, จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น)
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
 *  @see ErrorArgument ไม่พบข้อมูลโปรไฟล์ดังกล่าว (ถ้าระบุรหัสผู้ใช้)
*/
export function getContact (which = NaN)
{
    const result = new DataContact (); __getSection (result, which, "contact");
    return result;
}
/**
 * ขอข้อมูลการศึกษา จากโปรไฟล์ของผู้ใช้ดังกล่าว (ถ้าไม่ระบุจะเป็นดึงของตัวเอง, จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น)
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
 *  @see ErrorArgument ไม่พบข้อมูลโปรไฟล์ดังกล่าว (ถ้าระบุรหัสผู้ใช้)
*/
export function getEducation (which = NaN)
{
    const result = new DataEducation (); __getSection (result, which, "education");
    return result;
}
/**
 * ขอข้อมูลความสนใจ จากโปรไฟล์ของผู้ใช้ดังกล่าว (ถ้าไม่ระบุจะเป็นดึงของตัวเอง, จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น)
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
 *  @see ErrorArgument ไม่พบข้อมูลโปรไฟล์ดังกล่าว (ถ้าระบุรหัสผู้ใช้)
*/
export function getInterest (which = NaN)
{
    const result = new DataInterest (); __getSection (result, which, "interest");
    return result;
}
/**
 * ขอข้อมูลส่วนตัว จากโปรไฟล์ของผู้ใช้ดังกล่าว (ถ้าไม่ระบุจะเป็นดึงของตัวเอง, จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น)
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
 *  @see ErrorArgument ไม่พบข้อมูลโปรไฟล์ดังกล่าว (ถ้าระบุรหัสผู้ใช้)
*/
export function getJob (which = NaN)
{
    const result = new DataJob (); __getSection (result, which, "job");
    return result;
}
/**
 * ขอข้อมูลส่วนตัว จากโปรไฟล์ของผู้ใช้ดังกล่าว (ถ้าไม่ระบุจะเป็นดึงของตัวเอง, จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น)
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
 *  @see ErrorArgument ไม่พบข้อมูลโปรไฟล์ดังกล่าว (ถ้าระบุรหัสผู้ใช้)
*/
export function getPersonal (which = NaN)
{
    const result = new DataPersonal (); __getSection (result, which, "personal");
    return result;
}
/**
 * ขอข้อมูลโพสต์ จากโปรไฟล์ของผู้ใช้ดังกล่าว (ถ้าไม่ระบุจะเป็นดึงของตัวเอง, จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น)
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
 *  @see ErrorArgument ไม่พบข้อมูลโปรไฟล์ดังกล่าว (ถ้าระบุรหัสผู้ใช้)
*/
export function getPost (index = NaN, which = NaN)
{
    const item = __getSectionRaw (which, "post")["item"][index];

    if (item == null)
        throw new ErrorArgument ("Out of Bounds");

    const result = new DataPost ();

    util.objectDeserialize (result, item);

    return result;
}
/**
 * ขอข้อมูลจำนวนโพสต์ทั้งหมดที่มีในโปรไฟล์ (ถ้าไม่ระบุจะเป็นดึงของตัวเอง, จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น)
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
 *  @see ErrorArgument ไม่พบข้อมูลโปรไฟล์ดังกล่าว (ถ้าระบุรหัสผู้ใช้)
*/
export function getPostHead (which = NaN)
{
    const item = __getSectionRaw (which, "post");

    const prototype = 
    {
        count: item["item"].length
    };
    return prototype;
}
/**
 * ขอข้อมูลทักษะ จากโปรไฟล์ของผู้ใช้ดังกล่าว (ถ้าไม่ระบุจะเป็นดึงของตัวเอง, จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น)
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
 *  @see ErrorArgument ไม่พบข้อมูลโปรไฟล์ดังกล่าว (ถ้าระบุรหัสผู้ใช้)
*/
export function getSkill (which = NaN)
{
    const result = new DataSkill (); __getSection (result, which, "skill");
    return result;
}
/**
 * ขอข้อมูลส่วนตัว จากโปรไฟล์ของผู้ใช้ดังกล่าว (ถ้าไม่ระบุจะเป็นดึงของตัวเอง, จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น)
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
 *  @see ErrorArgument ไม่พบข้อมูลโปรไฟล์ดังกล่าว (ถ้าระบุรหัสผู้ใช้)
*/
export function getSocial (which = NaN)
{
    const result = new DataSocial (); __getSection (result, which, "social");
    return result;
}
/**
 * ขอข้อมูลธีม จากโปรไฟล์ของผู้ใช้ดังกล่าว (ถ้าไม่ระบุจะเป็นดึงของตัวเอง, จำเป็นต้องมีสิทธิ์ขั้นสูงสำหรับการดึงข้อมูลผู้ใช้อื่น)
 * 
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
 *  @see ErrorArgument ไม่พบข้อมูลโปรไฟล์ดังกล่าว (ถ้าระบุรหัสผู้ใช้)
*/
export function getTheme (which = NaN)
{
    const result = new DataTheme (); __getSection (result, which, "theme");
    return result;
}
/**
 * อัพเดทข้อมูลติดต่อ ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setContact (data, which = NaN)
{
    if ((data instanceof DataContact) == false)
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    __setSection (data, which, "contact");
}
/**
 * อัพเดทข้อมูลการศึกษา ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setEducation (data, which = NaN)
{
    if ((data instanceof DataEducation) == false)
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    __setSection (data, which, "education");
}
/**
 * อัพเดทข้อมูลความสนใจ ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setInterest (data, which = NaN)
{
    if ((data instanceof DataInterest) == false)
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    __setSection (data, which, "interest");
}
/**
 * อัพเดทข้อมูลงาน ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setJob (data, which = NaN)
{
    if ((data instanceof DataJob) == false)
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    __setSection (data, which, "job");
}
/**
 * อัพเดทข้อมูลส่วนตัว ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setPersonal (data, which = NaN)
{
    if ((data instanceof DataPersonal) == false)
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    __setSection (data, which, "personal");
}
/**
 * อัพเดทข้อมูลทักษะ ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setSkill (data, which = NaN)
{
    if ((data instanceof DataSkill) == false)
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    __setSection (data, which, "skill");
}
/**
 * อัพเดทข้อมูลสังคม ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setSocial (data, which = NaN)
{
    if ((data instanceof DataSocial) == false)
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    __setSection (data, which, "social");
}
/**
 * อัพเดทข้อมูลธีม ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setTheme (data, which = NaN)
{
    if ((data instanceof DataTheme) == false)
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    __setSection (data, which, "theme");
}
export function createPost (data, which = NaN)
{
    if ((data instanceof DataPost) == false)
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    const block = __getSectionRaw (which, "post");
    const blockItem = block["item"];
    const index = blockItem.length;

    blockItem.push (data);

    __setSection (block, which, "post");

    return Number (index);
}

export function isInit ()
{
    return state.init;
}

export const VISIBILITY_UNKNOWN     = 0;
export const VISIBILITY_DEFAULT     = 1;
export const VISIBILITY_PUBLIC      = 2;
export const VISIBILITY_PRIVATE     = 3;
export const VISIBILITY_FRIEND      = 4;

export const MEDIA_TEXT             = 1;
export const MEDIA_IMAGE            = 2;
export const MEDIA_VIDEO            = 3;
export const MEDIA_AUDIO            = 4;

export const GENDER_UNKNOWN         = 0;
export const GENDER_UNSPECIFIED     = 1;
export const GENDER_MALE            = 2;
export const GENDER_FEMALE          = 3;
export const GENDER_NON_BINARY      = 4;
export const GENDER_OTHER           = 5;

export const PRONOUN_UNKNOWN        = 0;
export const PRONOUN_UNSPECIFIED    = 1;
export const PRONOUN_HE             = 2;
export const PRONOUN_SHE            = 3;
export const PRONOUN_THEY           = 4;
export const PRONOUN_OTHER          = 5;


//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          PRIVILEGED                        || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

/**
 * รับดัชนีตำแหน่งของข้อมูลโปรไฟล์ (คำสั่งนี้ต้องมีสิทธิ์ขั้นสูง)
*/
export function getMap ()
{
    if (state.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");
    
    if (auth.getRole () < auth.ROLE_ADMIN)
        throw new ErrorAuth ("Insufficient permission");

    const result = [""]; result.splice (0, 1);

    const json = __dbLoad ();
    const itemList = json["item"];

    for (const key of Object.keys (itemList)) {
        result.push (String (key));
    }

    return result;
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

function __getSection (structure, which, name)
{
    util.objectDeserialize (structure, __getSectionRaw (which, name));
}
function __getSectionRaw (which, name)
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    which = __seIndex (which);
            __seValidate (which);

    const dbRoot        = __dbLoad ();
    const dbCollection  = util.jsonRead (dbRoot, 'item');
    const dbTarget      = util.jsonRead (dbCollection, which);
    const dbTargetSec   = util.jsonRead (dbTarget, name);

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbCollection == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (dbTarget == null) throw new ErrorState (MSG_ERROR_NOT_FOUND);
    if (dbTargetSec == null) throw new ErrorState (MSG_ERROR_NOT_FOUND_2); 

    return dbTargetSec;
}
function __setSection (structure, which, name)
{
     if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    which = __seIndex (which);
            __seValidate (which);

    const dbRoot        = __dbLoad ();
    const dbCollection  = util.jsonRead (dbRoot, 'item');
    const dbTarget      = util.jsonRead (dbCollection, which);
    const dbTargetSec   = util.jsonRead (dbTarget, name);

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbCollection == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (dbTarget == null) throw new ErrorState (MSG_ERROR_NOT_FOUND);
    if (dbTargetSec == null) throw new ErrorState (MSG_ERROR_NOT_FOUND_2); 

    util.objectSerialize (structure, dbTargetSec);

    __dbSave (dbRoot);
}
function __setSectionRaw (structure, which, name)
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    which = __seIndex (which);
            __seValidate (which);

    const dbRoot        = __dbLoad ();
    const dbCollection  = util.jsonRead (dbRoot, 'item');
    const dbTarget      = util.jsonRead (dbCollection, which);
    let dbTargetSec   = util.jsonRead (dbTarget, name);

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbCollection == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (dbTarget == null) throw new ErrorState (MSG_ERROR_NOT_FOUND);
    if (dbTargetSec == null) throw new ErrorState (MSG_ERROR_NOT_FOUND_2); 

    dbTargetSec = structure;

    __dbSave (dbRoot);
}

function __seIndex (which)
{
    if (!auth.isLogged () || !auth.isActive ())
        throw new ErrorState (MSG_ERROR_AUTH);

    if (isNaN (which))
        return auth.getAccess ();

    return which;
}
function __seValidate (which)
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

    if (which == auth.getAccess ()) 
        return;

    if (dbAccess[ixSession.access].role != auth.ROLE_ADMIN && 
        dbAccess[ixSession.access].role != auth.ROLE_DEVELOPER)
    {
        return new ErrorState (MSG_ERROR_AUTH_PERMISSION);
    }
}

function __dbLoad ()
{
    if (test.REMOTE_ENABLED)
    {
        const request = new XMLHttpRequest ();

        // ใช้ติดตาม
        // console.trace ();

        request.open ('GET', `http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/profile`, false);
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

    const readText = localStorage.getItem ("DbProfile");
    const readObject = (readText != null) ? JSON.parse (readText) : sample;

    return readObject;
}
function __dbSave (data)
{
    if (data == null) throw new Error ('The content must not be null');
    if (typeof data !== 'object') throw new Error ('The content must be an object');

    if (test.REMOTE_ENABLED)
    {
        const request = new XMLHttpRequest ();

        request.open ('PUT', `http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/profile`, false);
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
    localStorage.setItem ("DbProfile", JSON.stringify (data));
}
