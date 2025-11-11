class ErrorState extends Error {};
class ErrorAuth extends Error {};

class DataHead
{
    /**
     * จำนวนข้อมูลทั้งหมดที่มีให้จากการเรียก getItem() หนึ่งครั้ง
    */
    count = 0;
};
class DataItem
{
    
}

/**
 * เริ่มต้นระบบแสดงฟีด
*/
export async function init ()
{
    if (state.init)
        throw new ErrorState ("Feed system is already been initialized");

    try
    {
        state.init = true;
    }
    catch (ex)
    {
        state.init = false;
        throw ex;
    }
}
/**
 * รับข้อมูลส่วนหัว ใช้สำหรับเตรียมพร้อมในการแสดงฟีด
*/
export function getHead ()
{
    if (state.init)
        throw new ErrorState ("Feed system must be initialized");

    const json = JSON.parse ("");
    const template =
    {
        count: 0
    };

    return Object.assign ({}, template, json);
}
/**
 * รับข้อมูลราฟีด แต่ละรายการ
*/
export function getItem ()
{
    if (state.init)
        throw new ErrorState ("Feed system must be initialized");

    const json = JSON.parse ("");
    const template = 
    {
        created: new Date (),
        modified: new Date (),
        scope: 0,
        media: [{
            type: 0,
            value: "",
        }],
    };

    return Object.assign ({}, template, json);
}


const prototype =
{
    state:
    {
        init: false,
    },
    head:
    {

    },
    item:
    {
        
    }
};

//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          INTERNAL                          || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

const state = structuredClone (prototype.state);
const head = structuredClone (prototype.head);
const item = structuredClone (prototype.item);
