/**
 * ไฟล์โค็ดสำหรับ: ระบบยืนยันตัวตน
*/
import * as generator     from './Generator'

export class ErrorState extends Error {};
export class ErrorServer extends Error {};
export class ErrorArgument extends Error {};
export class ErrorConfig extends Error {};
export class ErrorCredential extends Error {};

/**
 * เริ่มต้นระบบยืนยันตัวตน
 * 
 * ข้อผิดพลาด:
 *  @see ErrorState เรียกคำสั่งนี้ในขณะระบบทำงานแล้ว
 *  @see ErrorServer ฝั่งเซิฟเวอร์ทำงานผิดพลาด
*/
export function init ()
{
    if (stateClient.init)
        throw new ErrorState ("Authentication system is already been initialized");

    try
    {
        stateLoad ();
        stateSave ();
    }
    catch (ex)
    {
        throw new ErrorServer(ex);
    }
    try
    {
        let localSession        = null;
        let localSessionExpired = null;

        let authName = null;
        let authRole = 0;
        let authStatus = 0;
        let authAccess = 0;

        if (typeof localStorage != "undefined") {
            localSession        = localStorage.getItem ("AuthSession");
            localSessionExpired = localStorage.getItem ("AuthSessionExpired");
        }
        if (localSession != null)
        {
            if (Object.hasOwn (stateServer.challenge.session, localSession))
            {
                const element = stateServer.challenge.session[localSession];
                const access = element.access;
                const expired = element.expired;

                if (expired != null && new Date(expired) < new Date(localSessionExpired))
                {
                    if (typeof localStorage != "undefined") {
                        localStorage.removeItem ("AuthSession");
                        localStorage.removeItem ("AuthSessionExpired");
                    }
                    localSession = null;
                    localSessionExpired = null;

                    console.warn ("Authentication: The session is expired");
                }
                else
                {
                    const block = stateServer.access[access];

                    authName = block.name;
                    authRole = block.role;
                    authStatus = block.status;
                    authAccess = access;

                    console.log ("Authentication: Automatically Logged");
                }
            }
            else
            {
                if (typeof localStorage != "undefined") {
                    localStorage.removeItem ("AuthSession");
                    localStorage.removeItem ("AuthSessionExpired");
                }
                localSession = null;
                localSessionExpired = null;

                console.warn ("Authentication: The session is expired or invalid");
            }
        }

        stateClient.session = localSession;
        stateClient.sessionExpired = localSessionExpired;

        stateClient.name    = authName;
        stateClient.role    = authRole;
        stateClient.status  = authStatus;
        stateClient.access  = authAccess;
        stateClient.init    = true;
    }
    catch (ex)
    {
        console.error (ex);
        throw ex;
    }
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
        typeof identifier != "string")
        throw new ErrorArgument ("The identifier or password must be string");

    if (stateClient.init == false)
        throw new ErrorState ("Authentication system must be initialized");
    if (stateServer.config.enableCreation == false)
        throw new ErrorConfig ("Server disabled feature: authentication creation");
    if (Object.hasOwn (stateServer.challenge.direct, identifier))
        throw new ErrorCredential ("The identifier is already been used");

    // สร้างรหัสเข้าถึงที่ไม่ซ้ำกันกับผู้อื่น
    const newAccess     = generator.generateId (stateServer.access);
    const newSession    = generator.generateUUID (stateServer.challenge.session);    

    try
    {
        // ข้อมูลจัดเก็บ
        const dbDirect      = stateServer.challenge.direct;
        const dbSession     = stateServer.challenge.session;
        const dbAccess      = stateServer.access;
        // เขียนข้อมูล
        dbDirect[identifier] = 
        {
            password: password,
            access: newAccess
        };
        dbSession[newSession] =
        {
            modified: new Date(),
            expired: null,
            access: newAccess
        };
        dbAccess[newAccess] =
        {
            name: identifier,
            status: 1,
            role: 1,
        };
        // บันทึกข้อมูล
        stateSave ();
    }
    catch (ex)
    {
        throw new ErrorServer (ex);
    }
    try
    {
        stateClient.session = newAccess;
        stateClient.sessionExpired = null;

        stateClient.name    = identifier;
        stateClient.status  = 1;
        stateClient.role    = 1;
        stateClient.access  = newAccess;
    }
    catch (ex)
    {
        console.error (ex);
        throw ex;
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
    if (typeof identifier != "string" || typeof identifier != "string")
        throw new ErrorArgument ("The identifier or password must be string");

    if (stateClient.init == false)
        throw new ErrorState ("Authentication system must be initialized");
    if (stateServer.config.enableLogin == false)
        throw new ErrorConfig ("Server disabled feature: authentication login");
    

    // ข้อมูลจัดเก็บ
    const dbDirect = stateServer.challenge.direct;
    const dbSession = stateServer.challenge.session;
    const dbAccess = stateServer.access;
    // อ่านข้อมูล
    const ixDirect = dbDirect[identifier];
    
    if (ixDirect == null || ixDirect.password != password)
        throw new ErrorCredential ("The credential provided is invalid");
    
    const ixAccess = dbAccess[ixDirect.access];
    const newSession = generator.generateUUID (dbSession);

    try
    {
        // เขียนข้อมูล
        dbSession[newSession] =
        {
            modified: new Date(),
            expired: null,
            access: ixDirect.access
        };
        // บันทึกข้อมูล
        stateSave ();
    }
    catch (ex)
    {
        console.error (ex);
        throw new ErrorServer (ex);
    }
    try
    {
        stateClient.session = newSession;
        stateClient.sessionExpired = null;

        stateClient.name    = ixAccess.name;
        stateClient.status  = ixAccess.status;
        stateClient.role    = ixAccess.role;
        stateClient.access  = ixDirect.access;

        // บันทึกรหัสประจำตัว
        if (typeof localStorage != "undefined") {
            localStorage.setItem ("AuthSession", stateClient.session);
            localStorage.setItem ("AuthSessionExpired", stateClient.sessionExpired);
        }
    }
    catch (ex)
    {
        console.error (ex);
        throw ex;
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
    if (stateClient.init == false)
        throw new ErrorState ("Authentication system must be initialized");
    if (stateClient.session == null)
        throw new ErrorCredential ("Authentication must be logged before logout");

    try
    {
        // นำข้อมูล session ออกจากเซิฟเวอร์ แล้วบันทึก
        stateServer.challenge.session[stateClient.session] = undefined;
        stateSave ();
    }
    catch (ex)
    {
        console.error (ex);
        throw new ErrorServer (ex);
    }
    try
    {
        // รีเซ็ตข้อมูล client
        stateClient.session = null;
        stateClient.sessionExpired = null;

        stateClient.name = null;
        stateClient.role = 0;
        stateClient.status = 0;
        stateClient.access = 0;
    }
    catch (ex)
    {
        console.error (ex);
        throw ex;
    }
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
export function getName          () { return stateClient.name; }
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
export function getRole          () { return stateClient.role; }
/**
 * รับค่าสถานะของผู้ใช้
 * ค่าที่เป็นไปได้:
 *  @see STATUS_UNKNOWN ไม่ทราบสถานะ
 *  @see STATUS_ACTIVE สถานะปกติ
 *  @see STATUS_INACTIVE สถานะปิดใช้งาน (โดยผู้ใช้)
 *  @see STATUS_SUSPENDED สถานะถูกระงับ (โดยผู้ดูแลระบบ)
*/
export function getStatus        () { return stateClient.status; }
/**
 * รับข้อมูลเข้าถึงข้อมูลภายใน (สำหรับใช้ภายในระบบ API เท่านั้น)
 * ! อย่าใช้ค่านี้ !
*/
export function getAccess        () { return stateClient.access; }
/**
 * รับรหัสเข้าถึงบริการ (สำคัญมาก ๆ ต่อระบบและผู้ใช้) (โดยปกติจะเป็น null ถ้าผู้ใช้ยังไม่ได้เข้าสู่ระบบ)
*/
export function getSession       () { return stateClient.session; }
/**
 * รับเวลาที่รหัสเข้าถึงบริการจะหมดอายุ (โดยปกติจะเป็น null ถ้าไม่มีวันหมดอายุ)
*/
export function getSessionExpire () { return structuredClone (stateClient.sessionExpire); }
/**
 * ตรวจสอบว่าผู้ใช้ได้เข้าสู่ระบบแล้วหรือยัง
*/
export function isLogged () { return stateClient.role != 0 && stateClient.session != null && (isExpired() == false) && stateClient.access != 0; }
/*
 * ตรวจสอบว่าสถานะผู้ใช้เป็น สถานะใช้งาน
*/
export function isActive () { return stateClient.status == 1; }

export function isExpired () 
{
    if (stateClient.sessionExpired == null || stateClient.sessionExpired == "null") {
        return false;
    }
    return stateClient.sessionExpired.getTime () < new Date().getTime ();
}
//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          INTERNAL                          || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

export const prototype =
{
    init: false,

    session: "",
    sessionExpired: new Date(0),

    name: "",
    role: 0,
    status: 0,
    access: 0,
};
export const prototypeServer =
{
    config:
    {
        enableCreation: true,
        enableDeletion: true,
        enableLogin: true,
    },
    challenge:
    {
        direct: 
        {
            "iKla": 
            {
                password: "user",
                access: 24077
            },
            "Tess":
            {
                password: "admin",
                access: 49905,
            }
        },
        session:
        {
            "04d7d31c-cb67-4cbb-9b2e-34af37596400":
            {
                modified: new Date(),
                expired: null,

                access: 24077
            },
            "a0dc1c3e-7163-4e57-8d8e-fca29849eaea":
            {
                modified: new Date(),
                expired: null,

                access: 49905
            }
        }
    },
    access:
    {
        24077:
        {
            name: "Its Jeremie",
            status: 1,
            role: 1,
        },
        49905:
        {
            name: "Tess",
            status: 1,
            role: 5,
        }
    }
};

export let stateClient  = structuredClone (prototype);
export let stateServer  = structuredClone (prototypeServer);

function stateLoad ()
{
    if (typeof localStorage != "undefined")
    {
        const json = localStorage.getItem ("DbAuth");
        const obj = json != null ? JSON.parse (json) : prototypeServer;

        stateServer = obj;
    }
}
function stateSave ()
{
    if (typeof localStorage != "undefined")
        localStorage.setItem ("DbAuth", JSON.stringify (stateServer));
}