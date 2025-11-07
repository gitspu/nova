
import * as auth from './Authentication'

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
    if (stateClient.client.init)
        throw new ErrorState ("Profile system is already been initialized");

    try
    {
        stateLoad ();
        stateSave ();
    }
    catch (ex)
    {
        throw new ErrorServer (ex);
    }
    try
    {
        stateClient.client.init = true;
    }
    catch (ex)
    {
        console.error (ex);
        throw ex;
    }
}
/**
 * ทำการสร้างข้อมูลโปรไฟล์ (สามารถกำหนดข้อมูลต้นแบบได้)
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth การเข้าสู่ระบบไม่สมบูรณ์
 *  @see ErrorState ระบบโปรไฟล์ไม่ทำงาน หรือ มีข้อมูลโปรไฟล์อยู่แล้ว
*/
export function create ()
{
    if (stateClient.client.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");


    const access = auth.getAccess();
    const profile = stateServer.item[access];

    if (profile != null)
        throw new ErrorState ("Profile is already been created");

    try
    {
        stateServer.item[access] = Object.assign ({}, prototypeServer.item[0], 
        {
            personal: prototypeServer.personal,
            social: prototypeServer.social,
            job: prototypeServer.social
        });
        stateSave ();
    }
    catch (ex)
    {
        throw new ErrorServer (ex);
    }
}
/**
 * ดึงข้อมูลส่วนตัว จากโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function getPersonal ()
{
    if (stateClient.client.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");

    const access = auth.getAccess();
    const profile = stateServer.item[access];

    if (profile == null || profile["social"] == null)
        throw new ErrorState ("Profile data isn't exist or incomplete");

    const personal = stateServer.item[access].personal;

    return {
        icon:           String (personal.icon),
        status: {
            value:      String (personal.status.value),
            visibility: Number (personal.status.visibility),
        },
        firstName: {
            value:      String (personal.firstName.value),
            visibility: Number (personal.firstName.visibility),
        },
        middleName: {
            value:      String (personal.middleName.value),
            visibility: Number (personal.middleName.visibility),
        },
        lastName: {
            value:      String (personal.lastName.value),
            visibility: Number (personal.lastName.visibility),
        },
        pronoun: {
            value:      String (personal.pronoun.value),
            visibility: Number (personal.pronoun.visibility),
        },
        bio: {
            value:      String (personal.bio.value),
            visibility: Number (personal.bio.visibility),
        },
        birthday: {
            value:      new Date (personal.birthday.value),
            visibility: Number (personal.birthday.visibility),
        },
        location: {
            value:      String (personal.location.value),
            visibility: String (personal.location.visibility),
        }
    }
}
/**
 * ดึงข้อมูลสังคม จากระบบโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function getSocial ()
{
    if (stateClient.client.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");

    const access = auth.getAccess();
    const profile = stateServer.item[access];

    if (profile == null || profile["social"] == null)
        throw new ErrorState ("Profile data isn't exist or incomplete");

    const social = profile.social;

    return {
        website: {
            value:      String (social.website.value),
            visibility: Number (social.website.visibility),
        },
        facebook: {
            value:      String (social.facebook.value),
            visibility: Number (social.facebook.visibility),
        },
        youtube: {
            value:      String (social.youtube.value),
            visibility: Number (social.youtube.visibility),
        },
        twitter: {
            value:      String (social.twitter.value),
            visibility: Number (social.twitter.visibility),
        },
        reddit: {
            value:      String (social.reddit.value),
            visibility: Number (social.reddit.visibility),
        },
        discord: {
            value:      String (social.discord.value),
            visibility: Number (social.discord.visibility),
        }
    };
}
/**
 * ดึงข้อมูลงาน จากระบบโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function getJob ()
{
    if (stateClient.client.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");

    const access = auth.getAccess();
    const profile = stateServer.item[access];

    if (profile == null || profile["job"] == null)
        throw new ErrorState ("Profile data isn't exist or incomplete");

    const job = profile.job;
    const result = 
    {
        item: job.item.map ((value) => 
        {
            return {
                name:           String (value.name),
                description:    String (value.description),
                visibility:     Number (value.visibility),
                start:          new Date(value.start),
                end:            new Date(value.end),
            }
        })
    };
    return result;
}
/**
 * ดึงข้อมูลโพสต์ จากระบบโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function getPost ()
{
    if (stateClient.client.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");

    const access = auth.getAccess();
    const profile = stateServer.item[access];

    if (profile == null || profile["post"] == null)
        throw new ErrorState ("Profile data isn't exist");

    const post = profile.post;
    const result = 
    {
        item: post.item.map ((value) => 
        {
            return {
                created:        new Date (value.created),
                visibility:     Number (value.visibility),
                text:           String (value.text),
                image:          String (value.image),
            }
        })
    };
    return result;
}
/**
 * อัพเดทข้อมูลส่วนตัว ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setPersonal (content)
{
    if (content == null)
        throw new ErrorArgument ("The content must not be null");

    if (stateClient.client.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");

    const access = auth.getAccess();
    const profile = stateServer.item[access];

    if (profile == null || profile["personal"] == null)
        throw new ErrorState ("Profile data isn't exist or incomplete");

    profile["personal"] = 
    {
        icon:           String (content.icon),
        status: {
            value:      String (content.status.value),
            visibility: Number (content.status.visibility),
            modified:   new Date().toUTCString()
        },
        firstName: {
            value:      String (content.firstName.value),
            visibility: Number (content.firstName.visibility),
            modified:   new Date().toUTCString()
        },
        middleName: {
            value:      String (content.middleName.value),
            visibility: Number (content.middleName.visibility),
            modified:   new Date().toUTCString()
        },
        lastName: {
            value:      String (content.lastName.value),
            visibility: Number (content.lastName.visibility),
            modified:   new Date().toUTCString()
        },
        pronoun: {
            value:      String (content.pronoun.value),
            visibility: Number (content.pronoun.visibility),
            modified:   new Date().toUTCString()
        },
        bio: {
            value:      String (content.bio.value),
            visibility: Number (content.bio.visibility),
            modified:   new Date().toUTCString()
        },
        birthday: {
            value:      content.birthday.value.toUTCString(),
            visibility: Number (content.birthday.visibility),
            modified:   new Date().toUTCString()
        },
        location: {
            value:      String (content.location.value),
            visibility: Number (content.location.visibility),
            modified:   new Date().toUTCString()
        }
    };
    stateSave ();
    return;
}
/**
 * อัพเดทข้อมูลสังคม ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setSocial (content)
{
    if (content == null)
        throw new ErrorArgument ("The content must not be null");

    if (stateClient.client.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");

    const access = auth.getAccess();
    const profile = stateServer.item[access];

    if (profile == null || profile["social"] == null)
        throw new ErrorState ("Profile data isn't exist or incomplete");

    profile["social"] = 
    {
        website: {
            value:      String (content.website.value),
            visibility: Number (content.website.visibility),
            modified:   new Date().toUTCString()
        },
        facebook: {
            value:      String (content.facebook.value),
            visibility: Number (content.facebook.visibility),
            modified:   new Date().toUTCString ()
        },
        youtube: {
            value:      String (content.youtube.value),
            visibility: Number (content.youtube.visibility),
            modified:   new Date().toUTCString()
        },
        twitter: {
            value:      String (content.twitter.value),
            visibility: Number (content.twitter.visibility),
            modified:   new Date().toUTCString()
        },
        reddit: {
            value:      String (content.reddit.value),
            visibility: Number (content.reddit.visibility),
            modified:   new Date().toUTCString()
        },
        discord: {
            value:      String (content.reddit.value),
            visibility: Number (content.reddit.visibility),
            modified:   new Date().toUTCString()
        }
    };
    stateSave ();
    return;
}
/**
 * อัพเดทข้อมูลงาน ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/
export function setJob (content)
{
    if (content == null)
        throw new ErrorArgument ("The content must not be null");

    if (stateClient.client.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");

    const access = auth.getAccess();
    const profile = stateServer.item[access];

    if (profile == null || profile["job"] == null)
        throw new ErrorState ("Profile data isn't exist or incomplete");

    profile["job"] = 
    {
        modified: new Date().toUTCString(),
        item: content.item.map((value) => 
        {
            return {
                name:           String (value.name),
                description:    String (value.description),
                visibility:     Number (value.visibility),
                start:          value.start.toUTCString(),
                end:            value.end.toUTCString(),
            };
        }),
    };
    stateSave ();
    return;
}
/**
 * อัพเดทข้อมูลโพสต์ ลงในข้อมลโปรไฟล์
 * ข้อผิดพลาดที่เป็นไปได้
 *  @see ErrorArgument ข้อมูลที่ป้อนให้คำสั่งไม่ถูกต้อง
 *  @see ErrorAuth ยังไม่ได้เข้าสู่ระบบ
 *  @see ErrorState ระบบโปรไฟล์ยังไม่เริ่มทำงาน หรือ ไม่มีข้อมูล
*/

export function setPost (content)
{
    if (content == null)
        throw new ErrorArgument ("The content must not be null");

    if (stateClient.client.init == false)
        throw new ErrorState ("Profile system must be initialized");

    if (auth.isLogged () == false || auth.isActive () == false)
        throw new ErrorAuth ("Authentication must be logged and active");

    const access = auth.getAccess();
    const profile = stateServer.item[access];

    if (profile == null || profile["post"] == null)
        throw new ErrorState ("Profile data isn't exist or incomplete");

    profile["post"] = 
    {
        modified: new Date().toUTCString(),
        item: content.item.map((value) => 
        {
            return {
                created:        value.created.toUTCString(),
                visibility:     Number (value.visibility),
                text:           String (value.text),
                image:          String (value.image),
            };
        }),
    };
    stateSave ();
    return;
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
    client:
    {
        init: false,
    },
    personal: 
    {
        firstName: 
        {
            value: "",
            visibility: 0,
        },
        middleName:
        {
            value: "",
            visibility: 0,
        },
        lastName:
        {
            value: "",
            visibility: 0,
        },
        pronoun:
        {
            value: 0,
            visibility: 0,
        },
        bio:
        {
            value: "",
            visibility: 0,
        },
        birthday:
        {
            value: new Date(0),
            visibility: 0,
        },
        location:
        {
            value: "",
            visibility: 0,
        }
    },
    social:
    {
        website:
        {
            value: "",
            visibility: 0,
        },
        facebook:
        {
            value: "",
            visibility: 0,
        },
        youtube:
        {
            value: "",
            visibility: 0,
        },
        twitter:
        {
            value: "",
            visibility: 0,
        },
        reddit:
        {
            value: "",
            visibility: 0,
        },
        discord:
        {
            value: "",
            visibility: 0,
        }
    },
    job:
    {
        item:
        [{
            name: "",
            description: "",
            visibility: 0,

            start: new Date(0),
            end: new Date(0),
        }]
    },
    post: 
    {
        item: [{
            creatd: new Date(0),
            modified: new Date(0),
            visibility: 0,
            text: "",
            image: "",
        }]
    }
};
export const prototypeServer =
{
    format: 1,
    item: 
    {
        0:
        {
            personal:
            {
                firstName: 
                {
                    value: "",
                    visibility: 2,
                    modified: new Date(0),
                },
                middleName: 
                {
                    value: "",
                    visibility: 2,
                    modified: new Date(0),
                },
                lastName: 
                {
                    value: "",
                    visibility: 2,
                    modified: new Date(0),
                },
                pronoun: 
                {
                    value: 0,
                    visibility: 2,
                    modified: new Date(0),
                },
                bio:
                {
                    value: "",
                    visibility: 2,
                    modified: new Date(0),
                },
                birthday:
                {
                    value: new Date(""),
                    visibility: 2,
                    modified: new Date(0),
                },
                location:
                {
                    value: "",
                    visibility: 2,
                    modified: new Date(0),
                }
            },
            social:
            {
                website:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                facebook:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                youtube:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                twitter:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                reddit:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                discord:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                }
            },
            job: 
            {
                item: [],
                modified: new Date(0)
            },
            post: 
            {
                modified: new Date(0),
                item: [],
            }
        },
        24077: 
        {
            personal:
            {
                icon: "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",
                status:
                {
                    value: "Great",
                    visibility: 2,
                    modified: new Date()
                },
                firstName: 
                {
                    value: "Hiren",
                    visibility: 2,
                    modified: new Date(),
                },
                middleName: 
                {
                    value: "St.",
                    visibility: 2,
                    modified: new Date(),
                },
                lastName: 
                {
                    value: "John",
                    visibility: 2,
                    modified: new Date(),
                },
                pronoun: 
                {
                    value: 1,
                    visibility: 2,
                    modified: new Date(),
                },
                bio:
                {
                    value: "The Dumbest Guy on The Planet",
                    visibility: 2,
                    modified: new Date(),
                },
                birthday:
                {
                    value: new Date("2002-04-28T14:30:00"),
                    visibility: 2,
                    modified: new Date(),
                },
                location:
                {
                    value: "Earth",
                    visibility: 2,
                    modified: new Date(),
                }
            },
            social:
            {
                website:
                {
                    value: "https://ikla.net",
                    visibility: 2,
                    modified: new Date(),
                },
                facebook:
                {
                    value: "https://facebook.com",
                    visibility: 2,
                    modified: new Date(),
                },
                youtube:
                {
                    value: "https://youtube.com/@iKla",
                    visibility: 2,
                    modified: new Date(),
                },
                twitter:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                reddit:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                discord:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                }
            },
            job:
            {
                item: [{
                    name: "Freelance",
                    description: "I'm doing for myself",
                    visibility: 2,

                    start: new Date(),
                    end: new Date(),
                }],
                modified: new Date()
            },
            post:
            {
                modified: new Date(),
                item: 
                [{
                    visibility: 2,
                    created: new Date(),
                    text: "The first post on the platform!",
                    image: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
                },
                {
                    visibility: 2,
                    created: new Date(),
                    text: "The second post on the platform",
                    image: ""
                }]
            }
        },
        49905: 
        {
            personal:
            {
                icon: "",
                status:
                {
                    value: "Good",
                    visibility: 2,
                    modified: new Date()
                },
                firstName: 
                {
                    value: "Tess",
                    visibility: 2,
                    modified: new Date(),
                },
                middleName: 
                {
                    value: "",
                    visibility: 2,
                    modified: new Date(0),
                },
                lastName: 
                {
                    value: "Tester",
                    visibility: 2,
                    modified: new Date(),
                },
                pronoun: 
                {
                    value: 1,
                    visibility: 2,
                    modified: new Date(),
                },
                bio:
                {
                    value: "The most powerful user on the platform",
                    visibility: 2,
                    modified: new Date(),
                },
                birthday:
                {
                    value: new Date("1997-11-06T11:12:00"),
                    visibility: 2,
                    modified: new Date(),
                },
                location:
                {
                    value: "Universe",
                    visibility: 2,
                    modified: new Date(),
                }
            },
            social:
            {
                website:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                facebook:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                youtube:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                twitter:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                reddit:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                },
                discord:
                {
                    value: "",
                    visibility: 0,
                    modified: new Date(0),
                }
            },
            job:
            {
                item: [],
                modified: new Date(0)
            },
            post:
            {
                modified: new Date(),
                item: []
            }
        },
    }
};

export let stateClient = structuredClone (prototype);
export let stateServer = structuredClone (prototypeServer);


function stateLoad ()
{
    if (typeof localStorage != "undefined")
    {
        const json = localStorage.getItem ("DbProfile");
        const obj = json != null ? JSON.parse (json) : prototypeServer;

        stateServer = obj;
    }
}
function stateSave ()
{
    if (typeof localStorage != "undefined")
        localStorage.setItem ("DbProfile", JSON.stringify (stateServer));
}