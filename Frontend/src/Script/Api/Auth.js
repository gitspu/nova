/**
 * ไฟล์โค็ดสำหรับ: ระบบยืนยันตัวตน
*/
import * as util from './Util'
import * as test from './TestConfig'
import      sample from '../ApiMock/Auth.json'

export class DataBasic
{
    /** ชื่อบัญชี */
    name = "";
};
export class DataSecurity
{
    challengeDirect = '';
    challengeFacebook = '';

    /** รหัสผ่านบัญชี (ไม่มีข้อมูลถ้าสิทธิ์ไม้ถึง) */
    password = '';
    /** รหัสผ่านเก่า (ใช้เมื่อเปลี่ยนรหัสผ่านเท่านั้น, ไม่มีผลกับบัญชีสิทธิ์ขั้นสูง) */
    setPasswordOld = '';
    /** รหัสผ่านใหม่ */
    setPasswordNew = '';
}
export class DataRestricted
{
    /** บทบาทบัญชี */
    role = 0;
    /** สถานะบัญชี */
    status = 0;
}
export class DataConfig
{
    /** เปิดการใช้งาน การสมัครสมาชิก */
    enableCreation = true;
    /** เปิดการใช้งาน การเข้าสู่ระบบ */
    enableLogin = true;
    /** เปิดการใช้งาร การลบบัญชี */
    enableDeletion = true;
}

export class ErrorState         extends Error {};
export class ErrorServer        extends Error {};
export class ErrorArgument      extends Error {};
export class ErrorConfig        extends Error {};
export class ErrorCredential    extends Error {};

const MSG_ERROR_INIT        = 'ระบบยืนยันได้ทำงานอยู่แล้วในตอนนี้';
const MSG_ERROR_DEINIT      = 'ระบบยืนยันตัวตนต้องเริ่มทำงานก่อน';
const MSG_ERROR_LOGGED      = 'ระบบยืนยันตัวตนได้ทำการเข้าสู่ระบบเป็นที่เรียบร้อยแล้ว';
const MSG_ERROR_UNLOGGED    = 'ระบบยังไม่ได้ทำการเข้าสู่ระบบ';
const MSG_ERROR_CONFIG      = 'ไม่สามารถเข้าสู่ระบบได้ เนื่องจากการตั้งค่าระบบ';
const MSG_ERROR_EXPIRED     = 'รหัสเซสชั่นหมดอายุหรือไม่ถูกต้อง';
const MSG_ERROR_SERVER      = 'เซิฟเวอร์ไม่สามารถประมวลข้อมูลได้'
const MSG_ERROR_INPUT_ID    = 'รหัสระบุตัวตนมีข้อมูลที่ไม่ถูกต้อง';
const MSG_ERROR_INPUT_PWD   = 'รหัสผ่านมีข้อมูลที่ไม่ถูกต้อง';
const MSG_ERROR_INPUT_CRED  = 'รหัสระบุตัวตน หรือ รหัสผ่าน ไม่ถูกต้อง';
const MSG_ERROR_INPUT_CRED_USED  = 'รหัสระบุตัวตนนี้ถูกใช้งานไปแล้ว';
const MSG_ERROR_PERMISSION  = 'สิทธิ์เข้าสู่ระบบของคุณไม่เพียงพอ';
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
        throw new ErrorState (MSG_ERROR_INIT);

    state.init = true;
    state.session = null;
    state.sessionExpired = null;

    state.name = null;
    state.status = null;
    state.role = null;
    state.access = null;

    try { loginSession (); }
    catch (ex)
    {
        console.warn (ex);
    }
}

/**
 * ทำการสร้างรหัสยืนยันตัวตน
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
    if (identifier == null || typeof identifier != 'string') throw new ErrorArgument (MSG_ERROR_INPUT_ID);
    if (password == null || typeof password != 'string') throw new ErrorArgument (MSG_ERROR_INPUT_PWD);

    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    const dbRoot    = __dbLoad ();
    const dbConfig  = util.jsonRead (dbRoot, 'config');
    const dbAccess  = util.jsonRead (dbRoot, 'access');
    const dbDirect  = util.jsonRead (dbRoot, 'challenge/direct');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbConfig == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbDirect == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (!isLogged () || !(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
    {
        if (Boolean (dbConfig["enableCreation"]) == false)
        {
            throw new ErrorConfig (MSG_ERROR_CONFIG);
        }
    }
    
    if (Object.hasOwn (dbDirect, identifier))
        throw new ErrorCredential (MSG_ERROR_INPUT_CRED_USED);

    //
    // สร้างรหัสเข้าถึงที่ไม่ซ้ำกันกับผู้อื่น
    //
    const newAccess  = util.uniqueID (dbAccess);

    dbDirect[identifier] = 
    {
        password: password,
        access: newAccess
    };
    dbAccess[newAccess] =
    {
        name: identifier,
        status: STATUS_ACTIVE,
        role: ROLE_USER,
    };

    __dbSave (dbRoot);
}
/**
 * ทำการสร้างรหัสยืนยันตัวตน จากรหัสที่ได้รับจาก Facebook
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
    if (identifier == null || typeof identifier != 'string') throw new ErrorArgument (MSG_ERROR_INPUT_ID);
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    const dbRoot        = __dbLoad ();
    const dbConfig      = util.jsonRead (dbRoot, 'config');
    const dbAccess      = util.jsonRead (dbRoot, 'access');
    const dbFacebook    = util.jsonRead (dbRoot, 'challenge/facebook');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbConfig == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbFacebook == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (!isLogged () || !(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
    {
        if (Boolean (dbConfig["enableCreation"]) == false)
        {
            throw new ErrorConfig (MSG_ERROR_CONFIG);
        }
    }

    if (Object.hasOwn (dbFacebook, identifier))
        throw new ErrorCredential (MSG_ERROR_INPUT_CRED_USED);

    //
    // สร้างรหัสเข้าถึงที่ไม่ซ้ำกันกับผู้อื่น
    //
    const newAccess  = util.uniqueID (dbAccess);

    dbFacebook[identifier] = 
    {
        access: newAccess
    };
    dbAccess[newAccess] =
    {
        name: identifier,
        status: STATUS_ACTIVE,
        role: ROLE_USER,
    };

    __dbSave (dbRoot);
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
    if (identifier == null || typeof identifier != 'string') throw new ErrorArgument (MSG_ERROR_INPUT_ID);
    if (password == null || typeof password != 'string') throw new ErrorArgument (MSG_ERROR_INPUT_PWD);

    if (state.init == false)
        throw new ErrorState (MSG_ERROR_DEINIT);

    if (state.session != null)
        throw new ErrorState (MSG_ERROR_LOGGED);

    //
    // ข้อมูลจัดเก็บ
    //
    const dbRoot    = __dbLoad ();
    const dbConfig  = util.jsonRead (dbRoot, 'config');
    const dbDirect  = util.jsonRead (dbRoot, 'challenge/direct');
    const dbSession = util.jsonRead (dbRoot, 'challenge/session');
    const dbAccess  = util.jsonRead (dbRoot, 'access');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbConfig == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbDirect == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbSession == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);

    const ixDir         = util.jsonRead (dbDirect, identifier);
    const ixDirPwd      = util.jsonRead (ixDir, 'password');
    const ixDirAccess   = util.jsonRead (ixDir, 'access');
    const ixAccess      = util.jsonRead (dbAccess, ixDirAccess);

    if (ixDir == null) throw new ErrorCredential (MSG_ERROR_INPUT_CRED);
    if (ixDirPwd == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (ixDirAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (ixAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (Number (ixAccess.role) != ROLE_ADMIN && Number (ixAccess.role) != ROLE_DEVELOPER)
    {
        if (typeof dbConfig["enableLogin"] != 'boolean' || dbConfig["enableLogin"] == false)
            throw new ErrorConfig (MSG_ERROR_CONFIG);
    }

    if (ixDirPwd != password)
        throw new ErrorCredential ("The credential provided is invalid");

    const newSession = util.uniqueUUID (dbSession);

    dbSession[newSession] =
    {
        modified: new Date(),
        expired: null,
        access: ixDir.access
    };

    __dbSave (dbRoot);

    //
    // บันทึกรหัสประจำตัว
    //
    if (typeof localStorage != "undefined") 
    {
        localStorage.setItem ("AuthSession", newSession);
        localStorage.setItem ("AuthSessionExpire", null);
    }

    state.session = String (newSession);
    state.sessionExpired = new Date(undefined);

    state.name    = String (ixAccess.name);
    state.status  = Number (ixAccess.status);
    state.role    = Number (ixAccess.role);
    state.access  = Number (ixDir.access);
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
    if (identifier == null || typeof identifier != 'string')
        throw new ErrorArgument (MSG_ERROR_INPUT_ID);

    if (state.init == false)
        throw new ErrorState (MSG_ERROR_DEINIT);

    if (state.session != null)
        throw new ErrorState (MSG_ERROR_LOGGED);

    //
    // ข้อมูลจัดเก็บ
    //
    const dbRoot        = __dbLoad ();
    const dbConfig      = util.jsonRead (dbRoot, 'config');
    const dbFacebook    = util.jsonRead (dbRoot, 'challenge/facebook');
    const dbSession     = util.jsonRead (dbRoot, 'challenge/session');
    const dbAccess      = util.jsonRead (dbRoot, 'access');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbConfig == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbFacebook == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbSession == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);

    const ixFb          = util.jsonRead (dbFacebook, identifier);
    const ixFbAccess    = util.jsonRead (ixFb, 'access');
    const ixAccess = util.jsonRead (dbAccess, ixFbAccess);
    
    if (ixFb == null) throw new ErrorCredential (MSG_ERROR_INPUT_ID);
    if (ixFbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (ixAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (Number (ixAccess.role) != ROLE_ADMIN && Number (ixAccess.role) != ROLE_DEVELOPER)
    {
        if (typeof dbConfig["enableLogin"] != 'boolean' || dbConfig["enableLogin"] == false)
            throw new ErrorConfig (MSG_ERROR_CONFIG);
    }

    const newSession = util.uniqueUUID (dbSession);

    dbSession[newSession] =
    {
        modified: new Date(),
        expired: null,
        access: ixFb.access
    };

    __dbSave (dbRoot);

    //
    // บันทึกรหัสประจำตัว
    //
    if (typeof localStorage != "undefined") 
    {
        localStorage.setItem ("AuthSession", newSession);
        localStorage.setItem ("AuthSessionExpire", null);
    }

    state.session = String (newSession);
    state.sessionExpired = new Date(undefined);

    state.name    = String (ixAccess.name);
    state.status  = Number (ixAccess.status);
    state.role    = Number (ixAccess.role);
    state.access  = Number (ixFb.access);
}
/**
 * ทำการเข้าสู่ระบบ จากรหัสเซสชั่นที่มีอยู่ใน LocalStorage
 * โดยปกติแล้วคุณไม่จำเป็นต้องเรียกคำสั่งนี้ เนื่องจากมันถูกเรียกเองโดยเริ่มต้นอยู่แล้ว
 * 
 * ข้อผิดพลาด:
 *  @see ErrorState เรียกคำสั่งนี้ในขณะระบบยังไม่ได้ทำงาน
 *  @see ErrorConfig เซิฟเวอร์ปิดคุณสมบัติการเข้าสู่ระบบ
 *  @see ErrorServer ฝั่งเซิฟเวอร์ทำงานผิดพลาด
 *  @see ErrorCredential รหัสเซสชั่นไม่ถูกต้อง
*/
export function loginSession ()
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session != null) throw new ErrorState (MSG_ERROR_LOGGED);

    if (typeof localStorage === 'undefined')
        return;
    
    const id    = localStorage.getItem ("AuthSession");
    const exp   = localStorage.getItem ("AuthSessionExpire");

    if (id == null || typeof id != 'string')
        return;

    const sJson = __dbLoad ();
    const sConfig = sJson ["config"];
    const sChallenge = sJson ["challenge"]["session"];
    const sAccess = sJson ["access"];

    if (Object.hasOwn (sChallenge, id))
    {
        const access = Number (sChallenge[id].access);
        const accessInfo = sAccess[access];

        if ((Boolean (sConfig["enableLogin"]) == false) && 
            (Number (accessInfo.role) != ROLE_ADMIN || Number (accessInfo.role != ROLE_DEVELOPER)))
        {
            // บางที่บัญชีสิทธิ์ขั้นสูงอาจสามารถข้ามตั้งค่านี้ได้
            throw new ErrorConfig (MSG_ERROR_CONFIG);
        }
        if (sChallenge[id].expired != null)
        {
            const serverTime = new Date(sChallenge[id].expired);
            const currentTime = new Date ();

            if (currentTime.geTime () > serverTime.getTime ())
            {
                localStorage.removeItem ("AuthSession");
                localStorage.removeItem ("AuthSessionExpire");

                throw new ErrorCredential (MSG_ERROR_EXPIRED);
            }
        }

        state.name = String (accessInfo.name);
        state.role = Number (accessInfo.role);
        state.status = Number (accessInfo.status);
        state.access = Number (access);
        state.session = String (id);
        state.sessionExpired = (exp != null) ? new Date(exp) : new Date(undefined);
    }
    else
    {
        if (Boolean (sConfig["enableLogin"]) == false)
        {
            throw new ErrorConfig (MSG_ERROR_CONFIG);
        }
        localStorage.removeItem ("AuthSession");
        localStorage.removeItem ("AuthSessionExpire");

        throw new ErrorCredential (MSG_ERROR_EXPIRED);
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
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorCredential (MSG_ERROR_UNLOGGED);

    try
    {
        const dbRoot    = __dbLoad ();
        const dbSession = util.jsonRead (dbRoot, 'challenge/session');
            
        if (dbSession != null)
        {
            dbSession[state.session] = undefined;
            __dbSave (dbRoot);
        }
    }
    finally
    {
        //
        // รีเซ็ตข้อมูล client
        //
        state.session = null;
        state.sessionExpired = null;
    
        state.name = null;
        state.role = 0;
        state.status = 0;
        state.access = 0;

        //
        // ลบข้อมูล LocalStorage
        //
        if (typeof localStorage !== 'undefined')
        {
            localStorage.removeItem ("AuthSession");
            localStorage.removeItem ("AuthSessionExpire");
        }
    }
}
/**
 * รับข้อมูลพื้นฐานของบัญชี
*/
export function getBasic (which = NaN)
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorState (MSG_ERROR_UNLOGGED);

    if (isNaN (which))
    {
        which = state.access;
    }
    // else
    // {
    //     if (!(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
    //     {
    //         throw new ErrorState (MSG_ERROR_PERMISSION);
    //     }
    // }

    const dbRoot    = __dbLoad ();
    const dbAccess  = util.jsonRead (dbRoot, 'access');
    const ixAccess  = util.jsonRead (dbAccess, which);

    if (ixAccess == null)
        throw new ErrorArgument (`No authentication basic data was found: ${which}`);
    
    const result = new DataBasic ();
    //
    result.name = ixAccess.name;
    //
    return result;
}
/**
 * รับข้อมูลเกี่ยวกับความปลอดภัย
*/
export function getSecurity (which = NaN)
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorState (MSG_ERROR_UNLOGGED);

    if (isNaN (which))
    {
        which = state.access;
    }
    else
    {
        if (!(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
        {
            throw new ErrorState (MSG_ERROR_PERMISSION);
        }
    }

    const dbRoot    = __dbLoad ();
    const dbAccess  = util.jsonRead (dbRoot, 'access');
    const ixAccess  = util.jsonRead (dbAccess, which);

    if (ixAccess == null)
        throw new ErrorArgument (`No authentication security data was found: ${which}`);
    
    const result = new DataSecurity ();
    //
    result.password = '1234';
    //
    return result;
}
/**
 * รับข้อมูลที่ถูกจำกัดไว้เฉพาะผู้มีสิทธิ์ระดับสูงเท่านั้น
*/
export function getRestricted (which = NaN)
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorState (MSG_ERROR_UNLOGGED);

    if (isNaN (which))
    {
        which = state.access;
    }
    else
    {
        if (!(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
        {
            throw new ErrorState (MSG_ERROR_PERMISSION);
        }
    }

    const dbRoot    = __dbLoad ();
    const dbAccess  = util.jsonRead (dbRoot, 'access');
    const ixAccess  = util.jsonRead (dbAccess, which);

    if (ixAccess == null)
        throw new ErrorArgument (`No authentication restricted data was found: ${which}`);
    
    const result = new DataRestricted ();
    //
    result.role = Number (ixAccess.role);
    result.status = Number (ixAccess.status);
    //
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
export function isLogged () 
{ 
    return state.role != 0 && 
           state.session != null && (isExpired() == false) && 
           state.access != 0; 
}
/*
 * ตรวจสอบว่าสถานะผู้ใช้เป็น สถานะใช้งาน
*/
export function isActive () 
{ 
    return state.status == STATUS_ACTIVE; 
}

export function isExpired () 
{
    if (state.sessionExpired == null || state.sessionExpired == "null") {
        return false;
    }
    if (isNaN (state.sessionExpired.getTime ())) {
        return false;
    }
    return state.sessionExpired.getTime () < new Date().getTime ();
}
export function isRole (which)
{
    return Number(state.role) === Number(which);
}
export function isInit ()
{
    return state.init;
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
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorState (MSG_ERROR_UNLOGGED);

    if (!(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
    {
        throw new ErrorState (MSG_ERROR_PERMISSION);
    }
    const dbRoot    = __dbLoad ();
    const dbConfig  = util.jsonRead (dbRoot, 'config');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbConfig == null) throw new ErrorServer (MSG_ERROR_SERVER);

    const result = new DataConfig ();
    //
    result.enableCreation = Boolean (dbConfig['enableCreation']);
    result.enableLogin = Boolean (dbConfig['enableLogin']);
    result.enableDeletion = Boolean (dbConfig['enableDeletion']);
    //
    return result;
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

    const json = __dbLoad ();
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
        throw new ErrorState ("Insufficient authentication permission");

    const json = __dbLoad ();
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

export function __dbLoad ()
{
    if (test.remote)
    {
        const request = new XMLHttpRequest ();
        const address = '100.100.1.1:3000';

        request.open ('GET', `http://${address}/api/auth`, false);
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

    const readText = localStorage.getItem ("DbAuth");
    const readObject = (readText != null) ? JSON.parse (readText) : sample;

    return readObject;
}
export function __dbSave (data)
{
    if (data == null) throw new Error ('The content must not be null');
    if (typeof data !== 'object') throw new Error ('The content must be an object');

    if (test.remote)
    {
        const json    = JSON.stringify (data);
        const request = new XMLHttpRequest ();
        const address = '100.100.1.1:3000';

        request.open ('PUT', `http://${address}/api/auth`, false);
        request.send (json);

        if (request.status !== 200)
        {
            console.error (request.statusText);
            return;
        }
        return;
    }

    if (typeof localStorage === 'undefined')
    {
        // LocalStorage ใช้งานไม่ได้
        return;
    }
    localStorage.setItem ("DbAuth", JSON.stringify (data));
}
