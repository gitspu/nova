/**
 * ไฟล์โค็ดสำหรับ: ระบบยืนยันตัวตน
*/
import * as util from './Util'
import * as test from './TestConfig'
import      mock from './../ApiMock/Authentication.json'

export class ErrorState extends Error {};
export class ErrorServer extends Error {};
export class ErrorArgument extends Error {};
export class ErrorConfig extends Error {};
export class ErrorCredential extends Error {};

export class DataBasic
{
    /* ชื่อบัญชี */
    name = "";
};

/**
 * เริ่มต้นระบบยืนยันตัวตน
 * 
 * ข้อผิดพลาด:
 *  @see ErrorState เรียกคำสั่งนี้ในขณะระบบทำงานแล้ว
 *  @see ErrorServer ฝั่งเซิฟเวอร์ทำงานผิดพลาด
*/
export function init ()
{
    if (state.init)
        throw new ErrorState ("Authentication system is already been initialized");

    let localSession        = null;
    let localSessionExpired = null;

    let authName = null;
    let authRole = 0;
    let authStatus = 0;
    let authAccess = 0;

    if (typeof localStorage != "undefined") 
    {
        localSession        = localStorage.getItem ("AuthSession");
        localSessionExpired = localStorage.getItem ("AuthSessionExpired");
    }
    if (localSession != null)
    {
        const json      = loadJson ();
        const dbConfig  = json["config"];
        const dbAccess  = json["access"];
        const dbSession = json["challenge"]["session"];

        if (Object.hasOwn (dbSession, localSession) && dbConfig["enableLogin"] == true)
        {
            const element = dbSession[localSession];
            const access = element["access"];
            const expired = element["expired"];

            if (expired != null && new Date(expired) < new Date(localSessionExpired))
            {
                if (typeof localStorage != "undefined") 
                {
                    localStorage.removeItem ("AuthSession");
                    localStorage.removeItem ("AuthSessionExpired");
                }
                localSession = null;
                localSessionExpired = null;

                console.warn ("Authentication: The session is expired");
            }
            else
            {
                const block = dbAccess[access];

                authName = block.name;
                authRole = block.role;
                authStatus = block.status;
                authAccess = access;

                console.log ("Authentication: Automatically Logged");
            }
        }
        else
        {
            if (typeof localStorage != "undefined") 
            {
                localStorage.removeItem ("AuthSession");
                localStorage.removeItem ("AuthSessionExpired");
            }
            localSession = null;
            localSessionExpired = null;

            console.warn ("Authentication: The session is expired or invalid");
        }
    }

    state.session = localSession;
    state.sessionExpired = localSessionExpired;

    state.name    = authName;
    state.role    = authRole;
    state.status  = authStatus;
    state.access  = authAccess;
    state.init    = true;
}

/**
 * ทำการสร้างรหัสยืนยันตัวตน หลังจากนั้นจะเข้าสู่ระบบโดยอัตโนมัติ
 * 
 * ข้อผิดพลาด:
 *  @see ErrorArgument ข้อมูลที่ป้อนไม่ถูกต้อง
 *  @see ErrorState เรียกคำสั่งนี้ในขณะระบบยังไม่ได้ทำงาน
 *  @see ErrorConfig เซิฟเวอร์ปิดคุณสมบัติการสร้าง
 *  @see ErrorServer ฝั่งเซิฟเวอร์ทำงานผิดพลาด
 *  @see ErrorCredential รหัสประจำตัวซ้ำกัน
*/
export function create (identifier, password)
{
    if (identifier == null || 
        password == null)
        throw new ErrorArgument ("The identifier or password is null");
    if (typeof identifier != "string" || 
        typeof password != "string")
        throw new ErrorArgument ("The identifier or password must be string");

    if (state.init == false)
        throw new ErrorState ("Authentication system must be initialized");

    const json = loadJson ();
    const dbConfig = json["config"];
    const dbAccess = json["access"];
    const dbDirect = json["challenge"]["direct"];
    const dbSession = json["challenge"]["session"];

    if (dbConfig["enableCreation"] == false)
        throw new ErrorConfig ("Server disabled feature: authentication creation");

    if (Object.hasOwn (dbDirect, identifier))
        throw new ErrorCredential ("The identifier is already been used");

    // สร้างรหัสเข้าถึงที่ไม่ซ้ำกันกับผู้อื่น
    const newAccess  = util.generateId (dbAccess);
    const newSession = util.generateUUID (dbSession);

    dbDirect[identifier] = 
    {
        password: password,
        access: newAccess
    };
    dbSession[newSession] =
    {
        modified: new Date().toUTCString(),
        expired: null,
        access: newAccess
    };
    dbAccess[newAccess] =
    {
        name: identifier,
        status: 1,
        role: 1,
    };

    saveJson (json);

    state.session = newSession;
    state.sessionExpired = null;

    state.name    = identifier;
    state.status  = 1;
    state.role    = 1;
    state.access  = newAccess;

    // บันทึกรหัสประจำตัว
    if (typeof localStorage != "undefined") 
    {
        localStorage.setItem ("AuthSession", state.session);
        localStorage.setItem ("AuthSessionExpired", state.sessionExpired);
    }
}
/**
 * ทำการสร้างรหัสยืนยันตัวตน จากรหัสที่ได้รับจาก Facebook
 * หลังจากนั้นจะเข้าสู่ระบบโดยอัตโนมัติ
 * 
 * ข้อผิดพลาด:
 *  @see ErrorArgument ข้อมูลที่ป้อนไม่ถูกต้อง
 *  @see ErrorState เรียกคำสั่งนี้ในขณะระบบยังไม่ได้ทำงาน
 *  @see ErrorConfig เซิฟเวอร์ปิดคุณสมบัติการสร้าง
 *  @see ErrorServer ฝั่งเซิฟเวอร์ทำงานผิดพลาด
 *  @see ErrorCredential รหัสประจำตัวซ้ำกัน
*/
export function createFacebook (identifier)
{
    if (identifier == null)
        throw new ErrorArgument ("The identifier is null");
    if (typeof identifier != "string")
        throw new ErrorArgument ("The identifier or password must be string");

    if (state.init == false)
        throw new ErrorState ("Authentication system must be initialized");

    const json = loadJson ();
    const dbConfig = json["config"];
    const dbAccess = json["access"];
    const dbFacebook = json["challenge"]["facebook"];
    const dbSession = json["challenge"]["session"];

    if (dbConfig["enableCreation"] == false)
        throw new ErrorConfig ("Server disabled feature: authentication creation");

    if (Object.hasOwn (dbFacebook, identifier))
        throw new ErrorCredential ("The identifier is already been used");

    // สร้างรหัสเข้าถึงที่ไม่ซ้ำกันกับผู้อื่น
    const newAccess  = util.generateId (dbAccess);
    const newSession = util.generateUUID (dbSession);

    dbFacebook[identifier] = 
    {
        access: newAccess
    };
    dbSession[newSession] =
    {
        modified: new Date().toUTCString(),
        expired: null,
        access: newAccess
    };
    dbAccess[newAccess] =
    {
        name: identifier,
        status: 1,
        role: 1,
    };

    saveJson (json);

    state.session = newSession;
    state.sessionExpired = null;

    state.name    = identifier;
    state.status  = 1;
    state.role    = 1;
    state.access  = newAccess;

    // บันทึกรหัสประจำตัว
    if (typeof localStorage != "undefined") 
    {
        localStorage.setItem ("AuthSession", state.session);
        localStorage.setItem ("AuthSessionExpired", state.sessionExpired);
    }
}
/**
 * ทำการเข้าสู่ระบบ จากรหัสประจำตัวที่อยู่มี
 * ข้อผิดพลาด:
 *  @see ErrorArgument ข้อมูลที่ป้อนไม่ถูกต้อง
 *  @see ErrorState เรียกคำสั่งนี้ในขณะระบบยังไม่ได้ทำงาน
 *  @see ErrorConfig เซิฟเวอร์ปิดคุณสมบัติการเข้าสู่ระบบ
 *  @see ErrorServer ฝั่งเซิฟเวอร์ทำงานผิดพลาด
 *  @see ErrorCredential รหัสประจำตัวไม่ถูกต้อง
*/
export function login (identifier, password)
{
     if (identifier == null || password == null)
        throw new ErrorArgument ("The identifier or password is null");
    if (typeof identifier != "string" || typeof password != "string")
        throw new ErrorArgument ("The identifier or password must be string");

    if (state.init == false)
        throw new ErrorState ("Authentication system must be initialized");

    
    // ข้อมูลจัดเก็บ
    const json = loadJson ();
    const dbConfig = json["config"];
    const dbDirect = json["challenge"]["direct"];
    const dbSession = json["challenge"]["session"];
    const dbAccess = json["access"]

    if (dbConfig["enableLogin"] == false)
        throw new ErrorConfig ("Server disabled feature: authentication login");

    const ixDirect = dbDirect[identifier];

    if (ixDirect == null || ixDirect["password"] != password)
        throw new ErrorCredential ("The credential provided is invalid");

    const ixAccess = dbAccess[ixDirect["access"]];
    const newSession = util.generateUUID (dbSession);

    dbSession[newSession] =
    {
        modified: new Date(),
        expired: null,
        access: ixDirect.access
    };

    saveJson (json);

    state.session = newSession;
    state.sessionExpired = null;

    state.name    = ixAccess.name;
    state.status  = ixAccess.status;
    state.role    = ixAccess.role;
    state.access  = ixDirect.access;

    // บันทึกรหัสประจำตัว
    if (typeof localStorage != "undefined") 
    {
        localStorage.setItem ("AuthSession", state.session);
        localStorage.setItem ("AuthSessionExpired", state.sessionExpired);
    }
}
/**
 * ทำการเข้าสู่ระบบ จากรหัสประจำตัวที่อยู่มี
 * ข้อผิดพลาด:
 *  @see ErrorArgument ข้อมูลที่ป้อนไม่ถูกต้อง
 *  @see ErrorState เรียกคำสั่งนี้ในขณะระบบยังไม่ได้ทำงาน
 *  @see ErrorConfig เซิฟเวอร์ปิดคุณสมบัติการเข้าสู่ระบบ
 *  @see ErrorServer ฝั่งเซิฟเวอร์ทำงานผิดพลาด
 *  @see ErrorCredential รหัสประจำตัวไม่ถูกต้อง
*/
export function loginFacebook (identifier)
{
     if (identifier == null)
        throw new ErrorArgument ("The identifier or password is null");
    if (typeof identifier != "string")
        throw new ErrorArgument ("The identifier or password must be string");

    if (state.init == false)
        throw new ErrorState ("Authentication system must be initialized");

    
    // ข้อมูลจัดเก็บ
    const json = loadJson ();
    const dbConfig = json["config"];
    const dbFacebook = json["challenge"]["facebook"];
    const dbSession = json["challenge"]["session"];
    const dbAccess = json["access"]

    if (dbConfig["enableLogin"] == false)
        throw new ErrorConfig ("Server disabled feature: authentication login");

    const ixFacebook = dbFacebook[identifier];

    if (ixFacebook == null)
        throw new ErrorCredential ("The credential provided is invalid");

    const ixAccess = dbAccess[ixFacebook["access"]];
    const newSession = util.generateUUID (dbSession);

    dbSession[newSession] =
    {
        modified: new Date(),
        expired: null,
        access: ixFacebook.access
    };

    saveJson (json);

    state.session = newSession;
    state.sessionExpired = null;

    state.name    = ixAccess.name;
    state.status  = ixAccess.status;
    state.role    = ixAccess.role;
    state.access  = ixFacebook.access;

    // บันทึกรหัสประจำตัว
    if (typeof localStorage != "undefined") 
    {
        localStorage.setItem ("AuthSession", state.session);
        localStorage.setItem ("AuthSessionExpired", state.sessionExpired);
    }
}
/**
 * ทำการนำผู้ใช้ออกจากระบบ
 * ข้อผิดพลาด:
 *  @see ErrorState เรียกคำสั่งนี้ในขณะระบบยังไม่ได้ทำงาน
 *  @see ErrorServer ฝั่งเซิฟเวอร์ทำงานผิดพลาด
 *  @see ErrorCredential ผู้ใช้ไม่ได้เข้าสู่ระบบ
*/
export function logout ()
{
    if (state.init == false)
        throw new ErrorState ("Authentication system must be initialized");
    if (state.session == null)
        throw new ErrorCredential ("Authentication must be logged before logout");

    const json = loadJson ();
    const dbSession = json["challenge"]["session"];
        
    dbSession[state.session] = undefined;

    saveJson (json);

    // รีเซ็ตข้อมูล client
    state.session = null;
    state.sessionExpired = null;

    state.name = null;
    state.role = 0;
    state.status = 0;
    state.access = 0;
}
/**
 * รับข้อมูลพื้นฐานของบัญชี
*/
export function getBasic (which = NaN)
{
    if (state.init == false)
        throw new ErrorState ("Authentication system must be initialized");
    if (state.session == null)
        throw new ErrorCredential ("Authentication must be logged before logout");

    if (isNaN (which)) {
        which = state.access;
    }

    const json = loadJson ();
    const database = json["access"];
    const block = database[which];

    if (block == null)
        throw new ErrorArgument ("No auth data was found");
    
    const result = new DataBasic ();

    result.name = block.name;

    return result;
}

export const ROLE_UNKNOWN   = 0;
export const ROLE_USER      = 1;
export const ROLE_EMPLOYER  = 2;
export const ROLE_ADMIN     = 3;
export const ROLE_TESTER    = 4;
export const ROLE_DEVELOPER = 5;

export const STATUS_UNKNOWN     = 0;
export const STATUS_ACTIVE      = 1;
export const STATUS_INACTIVE    = 2;
export const STATUS_SUSPENDED   = 3;

/**
 * ถึงข้อมูลชื่อผู้ใช้งาน (ไม่เกี่ยวข้องกับระบบโปรไฟล์)
*/
export function getName          () { return state.name; }
/**
 * รับค่าตำแหน่งบทบาทของผู้ใช้
 * ค่าที่เป็นไปได้:
 *  @see ROLE_UNKNOWN ไม่ทราบบทบาท
 *  @see ROLE_USER ตำแหน่งผู้ใช้
 *  @see ROLE_EMPLOYER ตำแหน่งผู้จ้างงาน
 *  @see ROLE_ADMIN ตำแหน่งผู้ดูแล
 *  @see ROLE_TESTER ตำแหน่งที่ทดสอบระบบ
 *  @see ROLE_DEVELOPER ตำแหน่งผู้พัฒนาระบบ
*/
export function getRole          () { return state.role; }
/**
 * รับค่าสถานะของผู้ใช้
 * ค่าที่เป็นไปได้:
 *  @see STATUS_UNKNOWN ไม่ทราบสถานะ
 *  @see STATUS_ACTIVE สถานะปกติ
 *  @see STATUS_INACTIVE สถานะปิดใช้งาน (โดยผู้ใช้)
 *  @see STATUS_SUSPENDED สถานะถูกระงับ (โดยผู้ดูแลระบบ)
*/
export function getStatus        () { return state.status; }
/**
 * รับข้อมูลเข้าถึงข้อมูลภายใน (สำหรับใช้ภายในระบบ API เท่านั้น)
 * ! อย่าใช้ค่านี้ !
*/
export function getAccess        () { return state.access; }
/**
 * รับรหัสเข้าถึงบริการ (สำคัญมาก ๆ ต่อระบบและผู้ใช้) (โดยปกติจะเป็น null ถ้าผู้ใช้ยังไม่ได้เข้าสู่ระบบ)
*/
export function getSession       () { return state.session; }
/**
 * รับเวลาที่รหัสเข้าถึงบริการจะหมดอายุ (โดยปกติจะเป็น null ถ้าไม่มีวันหมดอายุ)
*/
export function getSessionExpire () { return structuredClone (state.sessionExpire); }
/**
 * ตรวจสอบว่าผู้ใช้ได้เข้าสู่ระบบแล้วหรือยัง
*/
export function isLogged () { return state.role != 0 && state.session != null && (isExpired() == false) && state.access != 0; }
/*
 * ตรวจสอบว่าสถานะผู้ใช้เป็น สถานะใช้งาน
*/
export function isActive () { return state.status == 1; }

export function isExpired () 
{
    if (state.sessionExpired == null || state.sessionExpired == "null") {
        return false;
    }
    return state.sessionExpired.getTime () < new Date().getTime ();
}

//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          PRIVILEGED                        || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

/**
 * รับตั้งค่าการทำงานของระบบ (คำสั่งนี้ต้องมีสิทธิ์ขั้นสูง)
*/
export function getConfigInfo ()
{
    if (state.init == false)
        throw new ErrorState ("Authentication system must be initialized");

    if (isLogged () == false || isActive () == false)
        throw new ErrorState ("Authentication must be logged and active");
    
    if (getRole () < ROLE_ADMIN)
        throw new ErrorState ("Insufficient permission");

    return loadJson()["config"];
}
/**
 * รับดัชนีตำแหน่งของข้อมูลโปรไฟล์ (คำสั่งนี้ต้องมีสิทธิ์ขั้นสูง)
*/
export function getAccessKeyList ()
{
    if (state.init == false)
        throw new ErrorState ("Authentication system must be initialized");

    if (isLogged () == false || isActive () == false)
        throw new ErrorState ("Authentication must be logged and active");
    
    if (getRole () < ROLE_ADMIN)
        throw new ErrorState ("Insufficient permission");

    const result = [""]; result.splice (0, 1);

    const json = loadJson ();
    const itemList = json["access"];

    for (const key of Object.keys (itemList)) {
        result.push (String (key));
    }

    return result;
}
/**
 * รับข้อมูลการเข้าถึง จากตำแหน่งดัชนีที่ระบุ (คำสั่งนี้ต้องมีสิทธิ์ขั้นสูง)
*/
export function getAccessKeyInfo (key)
{
    if (state.init == false)
        throw new ErrorState ("Authentication system must be initialized");

    if (isLogged () == false || isActive () == false)
        throw new ErrorState ("Authentication must be logged and active");
    
    if (getRole () < ROLE_ADMIN)
        throw new ErrorState ("Insufficient permission");

    const json = loadJson ();
    const itemList = json["access"];

    return itemList[key];
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
    session: "",
    sessionExpired: new Date(0),

    name: "",
    role: 0,
    status: 0,
    access: 0,
};
const key = "DbAuth";

function loadJson ()
{
    if (test.remote)
    {
        const request = new XMLHttpRequest ();

        request.open ('GET', 'http://100.100.1.1:3000/api/auth', false);
        request.send ();

        if (request.status != 200)
        {
            console.error (request.statusText);
            return mock;
        }
        return JSON.parse (request.responseText);
    }
    let raw = localStorage.getItem (key);

    if (raw == null) 
        return mock;

    return JSON.parse (raw);
}
function saveJson (data)
{
    if (test.remote)
    {
        const request = new XMLHttpRequest ();

        request.open ('PUT', 'http://100.100.1.1:3000/api/auth', false);
        request.send (JSON.stringify(data));

        if (request.status != 200)
        {
            console.error (request.statusText);
        }
        return;
    }
    localStorage.setItem (key, JSON.stringify (data));
}
