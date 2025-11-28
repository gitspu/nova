/**
 * ไฟล์โค็ดสำหรับ: ระบบยืนยันตัวตน
*/
import * as util from './Util'
import * as test from './TestConfig'
import * as tracker from './Analytics'
import      sample from '../Sample/Auth.json'

/**
 * โครงสร้างข้อมูลพื้นฐานที่ทุกคนในระบบสามารถเข้าถึงได้
*/
export class DataBasic
{
    /** 
     * ชื่อผู้ใช้บัญชี 
    */
    name = "";
};
/**
 * โครงสร้างข้อมูลความปลอดภัยของบัญชี
 * เข้าถึงได้แค่เจ้าของบัญชีกับผู้ดูแลระบบเท่านั้น
*/
export class DataSecurity
{
    /**
     * รหัสประจำตัวที่ใช้เข้าสู่ระบบรูปแบบโดยตรง (ถ้าไม่ใช่สิทธิ์ผู้ดูแลระบบ, ช่องนี้จะเป็นค่าว่างเปล่า)
     * ช่องนี้จะเป็นค่าว่างเปล่าถ้าเข้าสู้ระบบด้วยวิธีการอื่น
    */
    identifier = '';
    /** 
     * รหัสผ่านบัญชีที่ใช้เข้าสู่ระบบรูปแบบโดยตรง (ถ้าไม่ใช่สิทธิ์ผู้ดูแลระบบ, ช่องนี้จะเป็นค่าว่างเปล่า)
     * ช่องนี้จะเป็นค่าว่างเปล่าถ้าเข้าสู้ระบบด้วยวิธีการอื่น
    */
    password = '';
    /** 
     * ทำการเปลี่ยนรหัสผ่านใหม่: รหัสผ่านเก่า (ถ้าไม่ต้องการให้เว้นวางเปล่าไว้)
     * ใช้เมื่อเปลี่ยนรหัสผ่านเท่านั้น (ไม่มีผลกับบัญชีสิทธิ์ขั้นสูง) 
    */
    setPasswordOld = '';
    /** 
     * ทำการเปลี่ยนรหัสผ่านใหม่: รหัสผ่านใหม่ (ถ้าไม่ต้องการให้เว้นวางเปล่าไว้)
     * ใช้เมื่อเปลี่ยนรหัสผ่านเท่านั้น (ไม่มีผลกับบัญชีสิทธิ์ขั้นสูง) 
    */
    setPasswordNew = '';
}

/**
 * โครงสร้างรวมการตั้งค่าของเซิฟเวอร์
*/
export class ServerConfig
{
    /** 
     * เปิดการใช้งานคุณสมบัติ: การสมัครสมาชิก 
    */
    enableCreation = true;
    /** 
     * เปิดการใช้งานคุณสมบัติ: การเข้าสู่ระบบ 
    */
    enableLogin = true;
    /** 
     * เปิดการใช้งานคุณสมบัติ: การลบบัญชี 
    */
    enableDeletion = true;
}
export class ServerMap
{
    item = [''];

    init ()
    {
        this.item.splice (0, 1);

        return this;
    }
}
export class ServerMapInfo
{
    name = "";
    email = "";
    role = ROLE_UNKNOWN;
    status = STATUS_UNKNOWN;
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
const MSG_ERROR_INPUT_ROLE   = 'บทบาทไม่ถูกต้อง';
const MSG_ERROR_INPUT_CRED  = 'รหัสระบุตัวตน หรือ รหัสผ่าน ไม่ถูกต้อง';
const MSG_ERROR_INPUT_CRED_USED  = 'รหัสระบุตัวตนนี้ถูกใช้งานไปแล้ว';
const MSG_ERROR_PERMISSION  = 'สิทธิ์เข้าสู่ระบบของคุณไม่เพียงพอ';
const MSG_ERROR_DATATYPE    = 'ประเภทข้อมูลนั้นไม่ถูกต้อง';

/**
 * เริ่มต้นระบบยืนยันตัวตน
 * 
 * ข้อผิดพลาด:

 *  @see ErrorState เรียกคำสั่งนี้ในขณะระบบทำงานแล้ว
 *  @see ErrorServer ฝั่งเซิฟเวอร์ทำงานผิดพลาด
*/
export async function init ()
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

    try 
    {
        // พยายามล็อคอิน 
        await loginSession (); 
    }
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
export async function create (identifier, password, email, role, status)
{
    if (identifier == null || typeof identifier != 'string') throw new ErrorArgument (MSG_ERROR_INPUT_ID);
    if (password == null || typeof password != 'string') throw new ErrorArgument (MSG_ERROR_INPUT_PWD);
    if (role == null || typeof role != 'number') throw new ErrorArgument (MSG_ERROR_INPUT_ROLE);

    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    const dbRoot    = await __dbLoadAsync ();
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
        email: email,
        status: status,
        role: role,
    };
    await __dbSaveAsync (dbRoot);

    //
    // วิเคราะห์ข้อมูล
    //
    util.ignore (() => tracker.increment ('authRegister'));
    //
    // คืนข้อมูล
    //
    return newAccess;
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
export async function createFacebook (identifier)
{
    if (identifier == null || typeof identifier != 'string') throw new ErrorArgument (MSG_ERROR_INPUT_ID);
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    const dbRoot        = await __dbLoadAsync ();
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
        email: "",
    };

    await __dbSaveAsync (dbRoot);

    //
    // วิเคราะห์ข้อมูล
    //
    util.ignore (() => tracker.increment ('authRegisterFacebook'));
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
export async function login (identifier, password)
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
    const dbRoot    = await __dbLoadAsync ();
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

    await __dbSaveAsync (dbRoot);

    //
    // วิเคราะห์ข้อมูล
    //
    util.ignore (() => tracker.increment ('authLogin'));

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
export async function loginFacebook (identifier)
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
    const dbRoot        = await __dbLoadAsync ();
    const dbConfig      = util.jsonRead (dbRoot, "config");
    const dbFacebook    = util.jsonRead (dbRoot, "challenge/facebook");
    const dbSession     = util.jsonRead (dbRoot, "challenge/session");
    const dbAccess      = util.jsonRead (dbRoot, "access");

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbConfig == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbFacebook == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbSession == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);

    const ixFb          = util.jsonRead (dbFacebook, identifier);
    const ixFbAccess    = util.jsonRead (ixFb, 'access');
    const ixAccess      = util.jsonRead (dbAccess, ixFbAccess);
    
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

    await __dbSaveAsync (dbRoot);
    //
    // วิเคราะห์ข้อมูล
    //
    util.ignore (() => tracker.increment ('authLoginFacebook'));

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
export async function loginSession ()
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session != null) throw new ErrorState (MSG_ERROR_LOGGED);

    if (typeof localStorage === 'undefined')
        return;
    
    const id    = localStorage.getItem ("AuthSession");
    const exp   = localStorage.getItem ("AuthSessionExpire");

    if (id == null || typeof id != 'string')
        return;

    const dbRoot        = await __dbLoadAsync ();
    const dbConfig      = util.jsonRead (dbRoot, "config");
    const dbChallenge   = util.jsonRead (dbRoot, "challenge/session");
    const dbAccess      = util.jsonRead (dbRoot, "access");

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbConfig == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbChallenge == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);

    if (Object.hasOwn (dbChallenge, id))
    {
        const access = Number (dbChallenge[id].access);
        const accessInfo = dbAccess[access];
        
        if ((Boolean (dbConfig["enableLogin"]) == false) && 
            (Number (accessInfo.role) != ROLE_ADMIN && Number (accessInfo.role != ROLE_DEVELOPER)))
        {
            // บางที่บัญชีสิทธิ์ขั้นสูงอาจสามารถข้ามตั้งค่านี้ได้
            throw new ErrorConfig (MSG_ERROR_CONFIG);
        }
        if (dbChallenge[id].expired != null)
        {
            const serverTime = new Date(dbChallenge[id].expired);
            const currentTime = new Date ();

            if (currentTime.geTime () > serverTime.getTime ())
            {
                localStorage.removeItem ("AuthSession");
                localStorage.removeItem ("AuthSessionExpire");

                throw new ErrorCredential (MSG_ERROR_EXPIRED);
            }
        }

        //
        // วิเคราะห์ข้อมูล
        //
        util.ignore (() => tracker.increment ('authLoginSession'));

        state.name = String (accessInfo.name);
        state.role = Number (accessInfo.role);
        state.status = Number (accessInfo.status);
        state.access = Number (access);
        state.session = String (id);
        state.sessionExpired = (exp != null) ? new Date(exp) : new Date(undefined);
    }
    else
    {
        if (Boolean (dbConfig["enableLogin"]) == false)
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
export async function logout ()
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorCredential (MSG_ERROR_UNLOGGED);

    try
    {
        const dbRoot    = await __dbLoadAsync ();
        const dbSession = util.jsonRead (dbRoot, 'challenge/session');
            
        if (dbSession != null)
        {
            dbSession[state.session] = undefined;
            await __dbSaveAsync (dbRoot);
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
export async function getBasic (which = NaN)
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);

    if (isNaN (which) && !isLogged ())
    {
        throw new ErrorArgument (MSG_ERROR_INPUT_ID);
    }
    if (isNaN (which))
    {
        which = state.access;
    }

    const dbRoot    = await __dbLoadAsync ();
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
export async function getSecurity (which = NaN)
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

    const dbRoot    = await __dbLoadAsync ();
    const dbAccess  = util.jsonRead (dbRoot, "access");
    const dbDirect  = util.jsonRead (dbRoot, `challenge/direct`);

    const ixAccess  = util.jsonRead (dbAccess, which);

    if (ixAccess == null)
        throw new ErrorArgument (`No authentication security data was found: ${which}`);
    
    const result = new DataSecurity ();
    //

    for (const key of Object.keys (dbDirect))
    {
        const value = dbDirect[key];
        
        if (value.access !== which)
            continue;

        result.identifier = key;

        if (isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER))
        {
            result.password = value.password;
        }
    }
    //
    return result;
}
/**
 * ปรับเปลี่ยนข้อมูลพื้นฐานของบัญชี
*/
export async function setBasic (which = NaN, value)
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
    const dbRoot    = await __dbLoadAsync ();
    const dbAccess  = util.jsonRead (dbRoot, 'access');
    const ixAccess  = util.jsonRead (dbAccess, which);

    if (ixAccess == null)
        throw new ErrorArgument (`No authentication basic data was found: ${which}`);

    ixAccess.name = String (value.name);

    await __dbSaveAsync (dbRoot);
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
    return state.role == which;
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
export async function getServerConfig ()
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorState (MSG_ERROR_UNLOGGED);

    if (!(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
    {
        throw new ErrorState (MSG_ERROR_PERMISSION);
    }
    const dbRoot    = await __dbLoadAsync ();
    const dbConfig  = util.jsonRead (dbRoot, 'config');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbConfig == null) throw new ErrorServer (MSG_ERROR_SERVER);

    const result = new ServerConfig ();
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
export async function getServerMap ()
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorState (MSG_ERROR_UNLOGGED);

    if (!(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
    {
        throw new ErrorState (MSG_ERROR_PERMISSION);
    }
    const result = new ServerMap ().init ();

    const dbRoot = await __dbLoadAsync ();
    const dbAccess = util.jsonRead (dbRoot, 'access');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);

    result.item = [];

    for (const key of Object.keys (dbAccess)) 
    {
        result.item.push (String (key));
    }
    return result;
}
/**
 * รับข้อมูลการเข้าถึง จากตำแหน่งดัชนีที่ระบุ (คำสั่งนี้ต้องมีสิทธิ์ขั้นสูง)
*/
export async function getServerMapInfo (key)
{
    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorState (MSG_ERROR_UNLOGGED);

    if (!(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
    {
        throw new ErrorState (MSG_ERROR_PERMISSION);
    }
    const result = new ServerMapInfo ();

    const dbRoot = await __dbLoadAsync ();
    const dbAccess = util.jsonRead (dbRoot, 'access');
    const ixAccess = util.jsonRead (dbAccess, key);

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (ixAccess == null) throw new ErrorServer (MSG_ERROR_INPUT_CRED);

    result.name     = String (ixAccess['name']);
    result.email    = String (ixAccess['email']);
    result.role     = Number (ixAccess['role']);
    result.status   = Number (ixAccess['status']);
    result.access   = Number (key);

    if (result.name == undefined)
        result.name = "";

    if (result.email == undefined)
        result.email = "";

    return result;
}
/**
 * ปรับเปลี่ยนการตั้งค่าการเข้าสู่ระบบ (คำสั่งนี้ต้องมีสิทธิ์ขั้นสูง)
*/
export async function setServerConfig (value)
{
    if (!(value instanceof ServerConfig))
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorState (MSG_ERROR_UNLOGGED);

    if (!(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
    {
        throw new ErrorState (MSG_ERROR_PERMISSION);
    }
    const dbRoot = await __dbLoadAsync ();

    dbRoot["config"] = {
        enableCreation: Boolean (value.enableCreation),
        enableLogin: Boolean (value.enableLogin),
        enableDeletion: Boolean (value.enableDeletion),
    };

    await __dbSaveAsync (dbRoot);
}
export async function setServerMapInfo (key, value)
{
    if (!(value instanceof ServerMapInfo))
        throw new ErrorArgument (MSG_ERROR_DATATYPE);

    if (state.init == false) throw new ErrorState (MSG_ERROR_DEINIT);
    if (state.session == null) throw new ErrorState (MSG_ERROR_UNLOGGED);

    if (!(isRole (ROLE_ADMIN) || isRole (ROLE_DEVELOPER)))
    {
        throw new ErrorState (MSG_ERROR_PERMISSION);
    }
    const dbRoot = await __dbLoadAsync ();
    const dbAccess = util.jsonRead (dbRoot, 'access');

    dbAccess[key] = {
        name: value.name,
        email: value.email,
        role: value.role,
        status: value.status
    };

    await __dbSaveAsync (dbRoot);
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

const MSG_ERROR_AUTH = 'ระบบอาจต้องการให้คุณเข้าสู่ระบบก่อน';
const MSG_ERROR_AUTH_PERMISSION = 'สิทธิ์เข้าสู่ระบบของคุณไม่เพียงพอ';
const MSG_ERROR_AUTH_INVALID = 'สถานะเข้าสู่ระบบของคุณไม่ถูกต้อง';

export let __dbCache = {};
export let __dbCacheAge = new Date (undefined);

/**
 * ทำการดึงข้อมูล JSON จากเซิฟเวอร์
*/
export async function __dbLoadAsync ()
{
    if (test.REMOTE_ENABLED)
    {
        if (test.CACHING_ENABLED)
        {
            if (!util.timeLonger (__dbCacheAge, test.CACHING_AGE))
                return Promise.resolve (__dbCache);
        }
        return fetch (`http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/auth`, {
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
        const readText = localStorage.getItem ("DbAuth");
        const readObject = (readText != null) ? JSON.parse (readText) : sample;

        return Promise.resolve (readObject); 
    }
}
/**
 * ทำการบันทึกข้อมูล JSON
*/
export async function __dbSaveAsync (content)
{
    if (test.REMOTE_ENABLED)
    {
        return fetch (`http://${test.REMOTE_ADDRESS}:${test.REMOTE_PORT}/api/auth`, {
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
        localStorage.setItem ("DbAuth", JSON.stringify (content));
    }
}

export const SEC_MODE_FREE = 1;
export const SEC_MODE_NORMAL = 2;
export const SEC_MODE_PRIVILEGED = 3;

export async function __secValidate (which = NaN , mode = SEC_MODE_NORMAL)
{
    if (mode == SEC_MODE_FREE)
        return;
    
    const dbRoot    = await __dbLoadAsync ();
    const dbSession = util.jsonRead (dbRoot, 'challenge/session');
    const dbAccess  = util.jsonRead (dbRoot, 'access');

    if (dbRoot == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbSession == null) throw new ErrorServer (MSG_ERROR_SERVER);
    if (dbAccess == null) throw new ErrorServer (MSG_ERROR_SERVER);

    const ixSession = util.jsonRead (dbSession, state.session);

    if (ixSession == null) 
        throw new ErrorState (MSG_ERROR_AUTH_INVALID)

    if (ixSession.access != state.access)
        return new ErrorState (MSG_ERROR_AUTH_INVALID);

    if (dbAccess[ixSession.access] == null)
        return new ErrorState (MSG_ERROR_AUTH_INVALID);

    if (mode === SEC_MODE_PRIVILEGED && (
            dbAccess[ixSession.access].role != ROLE_ADMIN) &&
            dbAccess[ixSession.access].role != ROLE_DEVELOPER)
    {
        return new ErrorState (MSG_ERROR_AUTH_PERMISSION);
    }

    if (which === state.access) 
        return;


    if (dbAccess[ixSession.access].role != ROLE_ADMIN && 
        dbAccess[ixSession.access].role != ROLE_DEVELOPER)
    {
        return new ErrorState (MSG_ERROR_AUTH_PERMISSION);
    }
}