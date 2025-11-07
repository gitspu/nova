
/**
 * เริ่มต้นระบบการเชื่อมต่อความสัมพันธ์
*/
export async function init ()
{

}
/**
 * เพิ่มความสัมพันธ์กับบุคคลดังกล่าว (กำหนดด้วย identifier)
*/
export async function add (identifier)
{
}
/**
 * ลบความสัมพันธ์กับบุคคลดังกล่าว (กำหนดด้วย identifier)  
*/
export async function remove (identifier)
{

}

/**
 * ยอมรับการเชื่อมความสัมพันธ์
*/
export async function accept (identifier)
{

}
/**
 * ปฎิเสธการเชื่อมความสัมพันธ์
*/
export async function decline (identifier)
{
    
}

/**
 * ตรวจสอบว่าบุคคลนั้นอยู่ในรายการความสัมพันธ์หรือไม่
*/
export function contain (identifier)
{
    
}
/**
 * ตรวจสอบว่าบุคคลนั้นอยู่ในสถานะกำลังรอการ ยอมรับ หรือ ปฎิเสธ
*/
export function pending (identifier)
{

}

/**
 * ทำซ้ำรายการความสัมพันธ์ที่ยอมรับแล้ว
*/
export function list (callback)
{

}
/**
 * ทำซ้ำรายการความสัมพันธ์ที่กำลังรอการ ยอมรับ หรือ ปฎิเสธ
*/
export function listPending (callback)
{

}

//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          INTERNAL                          || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

