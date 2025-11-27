import {auth, profile, encodeContent } from './Api'

export const RESOLVE_LOGGED = 1;
export const RESOLVE_CREATED = 2;


export async function create (username = "", password = "", passwordConfirm = "", email = "", role = 1)
{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username == "") return Promise.reject ("โปรดป้อนรหัสประจำตัว");
    if (password == "") return Promise.reject ("โปรดป้อนรหัสผ่าน");
    if (passwordConfirm == "") return Promise.reject ("โปรดป้อนรหัสผ่านยืนยัน");
    if (password != passwordConfirm) return Promise.reject ("รหัสผ่านของคุณไม่ตรงกัน");
    if (email == "") return Promise.reject ("โปรดป้อนอีเมล");


    if (emailRegex.test (email) == false)
    {
        return Promise.reject ("รูปแบบอีเมลที่คุณป้อนไม่ถูกต้อง");
    }

    try
    {
        const newContact = new profile.DataContact ();
        const newPersonal = new profile.DataPersonal ();
        
        newContact.email = email;
        newPersonal.nickname.value = username;
        
        auth.create (username, password, role);
        auth.login (username, password);
        profile.create ();
        profile.setContact (newContact);
        profile.setPersonal (newPersonal);

        return Promise.resolve (RESOLVE_CREATED);
    }
    catch (ex)
    {
        if (ex instanceof auth.ErrorCredential)
        {
            return Promise.reject ("ขออภัย รหัสประจำตัวนี้ถูกใช้ไปแล้ว โปรดใช้รหัสอื่น");
        }
        if (ex instanceof auth.ErrorConfig)
        {
            return Promise.reject ("ขออภัย คุณไม่สมัครสมาชิกได้ในขณะนี้");
        }
        if (ex instanceof auth.ErrorServer)
        {
            return Promise.reject ("ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้");
        }
        console.error (ex);

        return Promise.reject ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
    }
}

export async function login (username = "", password = "")
{
    if (username == "" && password == "")
    {
        return Promise.reject ("โปรดป้อนรหัสประจำตัว และ รหัสผ่าน");
    }
    if (username == "")
    {
        return Promise.reject  ("โปรดป้อนรหัสประจำตัว");
    }
    if (password == "")
    {
        return Promise.reject  ("โปรดป้อนรหัสผ่าน");
    }
    try
    {
        auth.login (username, password);

        if (auth.isLogged ()) 
        {
            return Promise.resolve (RESOLVE_LOGGED);
        }
    }
    catch (ex)
    {
        console.warn (ex);

        if (ex instanceof auth.ErrorCredential)
        {
            return Promise.reject ("ขออภัย รหัสประจำตัวหรือรหัสผ่านของคุณนั้นไม่ถูกต้อง");
        }
        if (ex instanceof auth.ErrorConfig)
        {
            return Promise.reject ("ขออภัย คุณไม่สามารถเข้าสู่ระบบได้ในขณะนี้");
        }
        if (ex instanceof auth.ErrorServer)
        {
            return Promise.reject ("ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้");
        }

        return Promise.reject ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
    }
}
export async function loginFacebook ()
{
    return new Promise ((resolve, reject) =>
    {

        //
        // โค็ดบรรทัดต่อไปนี้นั้นลึกลับ เพราะ React ไม่มีโค็ดสำหรับเชื่อมต่อกับ Facebook
        //
        const onRegister = (userId = '') =>
        {
            //
            // ดึงข้อมูลโปรไฟล์ของ Facebook
            //
            // eslint-disable-next-line no-undef
            FB.api ('/me', { fields: 'id,name,email,birthday,picture' }, async (me) =>
            {
                if (me == null)
                {
                    reject ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                    return;
                }
    
                //
                // ประมวลข้อมูล
                //
                const email     = String (me.email);
                const birthday  = String (me.birthday);
                const username  = String (me.name);
                const usernameSplit = username.split (' ');
                const icon      = me.picture != null ? 
                                    me.picture.data != null ?
                                    String (me.picture.data.url) : null : null;
    
                const newContact  = new profile.DataContact ();
                const newPersonal = new profile.DataPersonal ();
    
                if (email != null)    { newContact.email.set(email, profile.VISIBILITY_PRIVATE); }
                if (birthday != null) { newPersonal.birthday.set(birthday, profile.VISIBILITY_PRIVATE); }
                if (username != null) { newPersonal.nickname.set(username, profile.VISIBILITY_PRIVATE); }
                
                switch (usernameSplit.length)
                {
                    case 2:
                        newPersonal.firstName.set (usernameSplit[0],  profile.VISIBILITY_PRIVATE);
                        newPersonal.lastName.set (usernameSplit[1],   profile.VISIBILITY_PRIVATE);
                        break;
                    case 3:
                        newPersonal.firstName.set (usernameSplit[0],  profile.VISIBILITY_PRIVATE);
                        newPersonal.middleName.set (usernameSplit[1], profile.VISIBILITY_PRIVATE);
                        newPersonal.lastName.set (usernameSplit[2],   profile.VISIBILITY_PRIVATE);
                        break;
                }
    
                //
                // ดึงข้อมูลรูปภาพโปรไฟล์
                //
                if (icon != null)
                {
                    const request = await fetch (icon);
    
                    if (request.ok)
                    {
                        const blob = await request.blob ();
                        const data = await new Promise ((resolve, reject) => 
                        {
                            const reader = new FileReader ();
                        
                            reader.onloadend = function () { resolve (reader.result); }
                            reader.onerror = function () { reject (); }
                        
                            reader.readAsDataURL (blob);
                        });
                        newPersonal.icon = encodeContent (data);
                    }
                    else
                    {
                        console.warn ("Authentication: Cannot fetch profile image: " + request.statusText);
                    }
                }
                try
                {
                    auth.createFacebook (userId);
                    auth.loginFacebook (userId);
                    profile.create ();
                    profile.setContact (newContact);
                    profile.setPersonal (newPersonal);
    
                    if (auth.isLogged ())
                    {
                        resolve (RESOLVE_CREATED);
                    }
                }
                catch (ex)
                {
                    console.error (ex);
    
                    reject ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                    return;
                }
            });
        }
        const onLogin = (info) =>
        {
            if (info.status == "not_authorized")
            {
                reject ("คุณได้ยกเลิกการเข้าสู่ระบบ");
                return;
            }
            if (info.status == "unknown") 
            {
                reject ("การเข้าสู่ระบบถูกขัดจังหวะ");
                return;
            }
            if (info.status == "connected")
            {
                //
                // ลองพยายามเข้าสู่ระบบก่อน ถ้ามีข้อมูลแล้ว
                //
                try
                {
                    auth.loginFacebook (info.authResponse.userID);
    
                    if (auth.isLogged ())
                    {
                        resolve (RESOLVE_LOGGED);
                    }
                }
                catch (ex)
                {
                    //
                    // สร้างบัญชีใหม่
                    //
                    if (ex instanceof auth.ErrorCredential)
                    {
                        onRegister (info.authResponse.userID);
                        return;
                    }
                    //
                    // คงเป็นข้อผิดพลาด
                    //
                    if (ex instanceof auth.ErrorConfig)
                    {
                        reject ("ขออภัย คุณไม่สามารถเข้าสู่ระบบได้ในขณะนี้");
                        return;
                    }
                    if (ex instanceof auth.ErrorServer)
                    {
                        reject ("ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้");
                        return;
                    }
                    console.error (ex);
    
                    reject ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                    return;
                }
            }
        }
    
        // eslint-disable-next-line no-undef
        try { FB.login (onLogin); }
        catch (ex)
        {
            console.error (ex);
            
            return reject ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
        }
    });
}