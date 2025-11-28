import {auth, profile, profileEm, encodeContent } from './Api'

export const RESOLVE_LOGGED = 1;
export const RESOLVE_CREATED = 2;

export default
{
    RESOLVE_LOGGED,
    RESOLVE_CREATED,

    create: async function (
        username = "", 
        password = "", 
        passwordConfirm = "", 
        email = "", 
        role = auth.ROLE_USER, 
        status = auth.STATUS_ACTIVE,
    )
    {
        const emailExpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (username == "")                         return Promise.reject ("โปรดป้อนรหัสประจำตัว");
        if (password == "")                         return Promise.reject ("โปรดป้อนรหัสผ่าน");
        if (passwordConfirm == "")                  return Promise.reject ("โปรดป้อนรหัสผ่านยืนยัน");
        if (password != passwordConfirm)            return Promise.reject ("รหัสผ่านของคุณไม่ตรงกัน");
       //  if (password.length < 8)                    return Promise.reject ("รหัสผ่านของคุณต้องยาวอย่างน้อย 8 ตัวอักษร");
        if (email == "")                            return Promise.reject ("โปรดป้อนอีเมล");

        if (emailExpression.test (email) == false) return Promise.reject ("รูปแบบอีเมลที่คุณป้อนไม่ถูกต้อง");

        return auth.create (username, password, email, role, status)
                .then (() => auth.login (username, password))
                .then (() => profile.create ())
                .then (() => profileEm.create ())
                .then (async () => 
                {
                    const contact    = new profile.DataContact ();
                    const personal     = new profile.DataPersonal ();
                
                    contact.email.value = email;
                    contact.email.visibility = profile.VISIBILITY_PUBLIC;

                    personal.nickname.value = username;
                    personal.nickname.visibility = profile.VISIBILITY_PUBLIC;
                    
                    await profile.setContact (contact);
                    await profile.setPersonal (personal);

                    return RESOLVE_CREATED;
                })
                .catch ((except) =>
                {
                if (except instanceof auth.ErrorCredential)
                    return "ขออภัย รหัสประจำตัวนี้ถูกใช้ไปแล้ว โปรดใช้รหัสอื่น";

                if (except instanceof auth.ErrorConfig)
                    return "ขออภัย คุณไม่สมัครสมาชิกได้ในขณะนี้";

                if (except instanceof auth.ErrorServer)
                    return "ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้";

                console.error (except);
            });
                  
    },

    login: async function login (username = "", password = "")
    {
        return new Promise ((resolve, reject) =>
        {
            if (username == "" && password == "")
                return reject ("โปรดป้อนรหัสประจำตัว และ รหัสผ่าน");

            if (username == "")
                return reject  ("โปรดป้อนรหัสประจำตัว");

            if (password == "")
                return reject  ("โปรดป้อนรหัสผ่าน");

            auth.login (username, password).then (() =>
            {
                if (auth.isLogged ()) 
                {
                    return resolve (RESOLVE_LOGGED);
                }
            })
            .catch ((except) =>
            {
                console.error (except);
    
                if (except instanceof auth.ErrorCredential) 
                {
                    reject ("ขออภัย รหัสประจำตัวหรือรหัสผ่านของคุณนั้นไม่ถูกต้อง");
                    return;
                }
    
                if (except instanceof auth.ErrorConfig) 
                {
                    reject ("ขออภัย คุณไม่สามารถเข้าสู่ระบบได้ในขณะนี้");
                    return;
                }
    
                if (except instanceof auth.ErrorServer) 
                {
                    reject ("ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้");
                    return;
                }
    
                reject ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                return;
            });
        });

    },
    loginFacebook: function loginFacebook ()
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
        
                    
                    const newBasic = new auth.DataBasic ();
                    const newContact  = new profile.DataContact ();
                    const newPersonal = new profile.DataPersonal ();

        
                    if (email != null)    { newContact.email.set(email, profile.VISIBILITY_PUBLIC); }
                    if (birthday != null) { newPersonal.birthday.set(birthday, profile.VISIBILITY_PUBLIC); }
                    if (username != null) { newPersonal.nickname.set(username, profile.VISIBILITY_PUBLIC); }
                    
                    switch (usernameSplit.length)
                    {
                        case 2:
                            newBasic.name = `${usernameSplit[0]} ${usernameSplit[1]}`;
                            newPersonal.firstName.set (usernameSplit[0],  profile.VISIBILITY_PUBLIC);
                            newPersonal.lastName.set (usernameSplit[1],   profile.VISIBILITY_PUBLIC);
                            break;
                        case 3:
                            newBasic.name = `${usernameSplit[0]} ${usernameSplit[1]} ${usernameSplit[2]}`;
                            newPersonal.firstName.set (usernameSplit[0],  profile.VISIBILITY_PUBLIC);
                            newPersonal.middleName.set (usernameSplit[1], profile.VISIBILITY_PUBLIC);
                            newPersonal.lastName.set (usernameSplit[2],   profile.VISIBILITY_PUBLIC);
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


                    auth.createFacebook (userId)
                        .then (() => auth.loginFacebook (userId))
                        .then (() => profile.create ())
                        .then (() => profileEm.create ())
                        .then (async () => 
                        {
                            await auth.setBasic (NaN, newBasic);
                            await profile.setContact (newContact);
                            await profile.setPersonal (newPersonal);
                        })
                        .then (() =>
                        {
                            if (auth.isLogged ())
                            {
                                resolve (RESOLVE_CREATED);
                            }
                        })
                        .catch ((except) =>
                        {
                            console.warn (except);

                            reject ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                        });
                });
            }
            function onLogin (info)
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
                    auth.loginFacebook (info.authResponse.userID).then (() => 
                    {
                        if (auth.isLogged ())
                        {
                            resolve (RESOLVE_LOGGED);
                        }
                    })
                    .catch ((except) =>
                    {
                        console.error (except);

                        //
                        // สร้างบัญชีใหม่
                        //
                        if (except instanceof auth.ErrorCredential)
                        {
                            onRegister (info.authResponse.userID);
                            return;
                        }
                        //
                        // คงเป็นข้อผิดพลาด
                        //
                        if (except instanceof auth.ErrorConfig)
                        {
                            reject ("ขออภัย คุณไม่สามารถเข้าสู่ระบบได้ในขณะนี้");
                            return;
                        }
                        if (except instanceof auth.ErrorServer)
                        {
                            reject ("ขออภัย ระบบปลายทางไม่สามารถประมวลผลได้");
                            return;
                        }
                        reject ("ขออภัย เกิดข้อผิดพลาดบางอย่าง");
                        return;
                    });
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
}