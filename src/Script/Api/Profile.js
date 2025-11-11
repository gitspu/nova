/**
 * ไฟล์โค็ดสำหรับ: ระบบโปรไฟล์
*/
import * as util from './Util'
import * as auth from './Authentication'
import      mock from './../ApiMock/Profile.json'

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
        /** ชื่องาน */
        name: "",
        /** ชื่อองค์กร/บริษัท */
        entity: "",
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
    /** ข้อความในโพสต์นั้น */
    text = "";
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

export class ErrorState extends Error {};
export class ErrorServer extends Error {};
export class ErrorArgument extends Error {};
export class ErrorAuth extends Error {};

/**
 * เริ่มต้นการทำงานระบบโปรไฟล์
 * ข้อผิดพลาด
 *  @see ErrorState เรียกคำสั่งนี้ในขณะที่ระบบเริ่มทำงานแล้ว
 *  @see ErrorServer เซิฟเวอร์ทำงานผิพลาด
*/
export function init ()
{
    if (state.init)
        throw new ErrorState ("Profile system is already been initialized");

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
    if (state.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");

    if (isFinite (which) && auth.getRole () < auth.ROLE_ADMIN)
        throw new ErrorAuth ("Insufficient permission");

    if (isNaN (which)) {
        which = auth.getAccess ();
    }

    const json = loadJson ();
    const itemList = json["item"];

    if (itemList == null) throw new ErrorServer ("Server contains inproper JSON data");
    if (itemList[String(which)] != null) throw new ErrorState ("Profile is already been created");

    itemList[String(which)] = {};

    saveJson (json);

    const newContact    = new DataContact ();
    const newEducation  = new DataEducation ();
    const newInterest   = new DataInterest ();
    const newJob        = new DataJob ();
    const newPersonal   = new DataPersonal ();
    const newSkill      = new DataSkill ();
    const newSocial     = new DataSocial ();

    //
    // ล้างข้อมูล prototype ออก
    //
    newInterest.item = [];
    newSkill.item = [];

    setContact (newContact);
    setEducation (newEducation);
    setInterest (newInterest);
    setJob (newJob);
    setPersonal (newPersonal);
    setSkill (newSkill);
    setSocial (newSocial);
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
    const result = new DataContact (); getBlock (result, which, "contact");
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
    const result = new DataEducation (); getBlock (result, which, "education");
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
    const result = new DataInterest (); getBlock (result, which, "interest");
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
    const result = new DataJob (); getBlock (result, which, "job");
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
    const result = new DataPersonal (); getBlock (result, which, "personal");
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
    const item = getBlockRaw (which, "post")["item"][index];

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
    const item = getBlockRaw (which, "post");

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
    const result = new DataSkill (); getBlock (result, which, "skill");
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
    const result = new DataSocial (); getBlock (result, which, "social");
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
        throw new ErrorArgument ("Invalid data");

    setBlock (data, which, "contact");
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
        throw new ErrorArgument ("Invalid data");

    setBlock (data, which, "education");
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
        throw new ErrorArgument ("Invalid data");

    setBlock (data, which, "interest");
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
        throw new ErrorArgument ("Invalid data");

    setBlock (data, which, "job");
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
        throw new ErrorArgument ("Invalid data");

    setBlock (data, which, "personal");
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
        throw new ErrorArgument ("Invalid data");

    setBlock (data, which, "skill");
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
        throw new ErrorArgument ("Invalid data");

    setBlock (data, which, "social");
}

export const VISIBILITY_UNKNOWN     = 0;
export const VISIBILITY_DEFAULT     = 1;
export const VISIBILITY_PUBLIC      = 2;
export const VISIBILITY_PRIVATE     = 3;
export const VISIBILITY_FRIEND      = 4;

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

    const json = loadJson ();
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
const key = "DbProfile";

function getBlock (structure, which, name)
{
    util.objectDeserialize (structure, getBlockRaw (which, name));
}
function getBlockRaw (which, name)
{
    if (state.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");
    
    if (isFinite (which) && (auth.getRole() != auth.ROLE_ADMIN || auth.getRole() != auth.ROLE_DEVELOPER))
        throw new ErrorAuth ("Insufficient permission");

    if (isNaN (which)) {
        which = auth.getAccess ();
    }

    const json = loadJson ();
    const itemList = json["item"];

    if (itemList[String(which)] == null) 
        throw new ErrorArgument ("No specified profile was found: ");

    return itemList[String(which)][String(name)];
}
function setBlock (structure, which, name)
{
    if (state.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");
    
    if (isFinite (which) && (auth.getRole() != auth.ROLE_ADMIN || auth.getRole() != auth.ROLE_DEVELOPER))
        throw new ErrorAuth ("Insufficient permission");

    if (isNaN (which)) {
        which = auth.getAccess ();
    }

    const json = loadJson ();
    const itemList = json["item"];
    const itemBlock = itemList[String(which)][name] = {};

    if (itemList[String(which)] == null) 
        throw new ErrorArgument ("No specified profile was found");

    util.objectSerialize (structure, itemBlock);
    saveJson (json);
}

function loadJson ()
{
    let raw = localStorage.getItem (key);

    if (raw == null) 
        return mock;

    return JSON.parse (raw);
}
function saveJson (data)
{
    localStorage.setItem (key, JSON.stringify (data));
}
