/**
 * 
 * โค็ดระบบสำหรับการดีงข้อมูล ปรับเปลี่ยนข้อมูล การหางาน
 * ระบบนี้ใช้กับองค์กรเป็นหลัก
 * 
*/
'use strict';

export class DataProfile
{
    icon        = "";
    background  = "";
    name        = "";
    location    = "";

    description = "";
    gallery = [{
        type: 0,
        value: ""
    }];

    contactWebsite     = "";
    contactFacebook    = "";
    contactLine        = "";
    contactPhone       = "";

    init ()
    {
        this.gallery.splice (0, 1);
        return this;
    }
}

export class DataPost
{
    created     = new Date(undefined);
    modified    = new Date(undefined);

    time        = 0;
    position    = 0;

    title       = "";
    location    = "";
    salaryMin   = 0;
    salaryMax   = 0;

    description = "";
    requirement = "";
}

export async function getProfile ()
{

}
export async function getPost ()
{

}