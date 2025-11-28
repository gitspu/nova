/**
 * เรียกคำสั่งตามที่กำหนดไว้ แต่ไม่สนใจข้อผิดพลาดที่อาจจะเกิดขึ้น
 * 
 * @param callback คำสั่งที่ต้องการเรียก
 * @param fallback ค่าข้อมูล ในกรณีที่เกิดข้อผิดพลาด
*/
export function ignore (callback, fallback = null)
{
    try { return callback (); }
    catch (ex) 
    { 
        console.warn ('Ignored exception:', ex); 
        return fallback; 
    }
}
/**
 * สลับตำแหน่งการวางข้อมูลที่มีอยู่ใน Array
*/
export function shuffle (array)
{
    if (array == null)
    {
        return null;
    }
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) 
    {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
}

/**
 * อ่านบล็อกข้อมูลดังกล่าวที่อยู่ใน JSON ถ้าไม่สำเร็จจะคืนค่าเป็น null
*/
export function jsonRead (object, path, def = null)
{
    if (object == null || object == undefined) return def;
    if (path == null || path == undefined) return def;

    if (typeof object != 'object') return def;
    if (typeof path != 'string' && typeof path != 'number') return def;

    let last = object;
    let item = String (path).split ('/');

    for (let index = 0; index < item.length; index++)
    {
        last = last[String (item[index])];

        if (index == (item.length - 1))
        {
            return last;
        }
        if (last == undefined || last == null)
        {
            return def;
        }
        if (typeof last != 'object')
        {
            return def;
        }
        continue;
    }
    return def;
}
/**
 * สร้างค่ารหัส (ตัวเลข) ที่ไม่ซ้ำกันกับพื้นที่ของข้อมูล
*/
export function uniqueID (space)
{
    while (true)
    {
        const min = 1;
        const max = Number.MAX_SAFE_INTEGER;
        const id = Math.floor (Math.random () * (max - min + 1)) + min;

        if (space != null && space[id] != null) {
            continue;
        }
        return id;
    }
}
/**
 * สร้างค่ารหัส (UUID) ที่ไม่ซ้ำกันกับพื้นที่ของข้อมูล
*/
export function uniqueUUID (space)
{
    while (true)
    {
        const uuid = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );

        if (space != null && space[uuid] != null) {
            continue;
        }
        return uuid;
    }
}
/**
 * ตรวจสอบเวลาว่านานกว่า ...
 */
export function timeLonger (dateObject, milliseconds)
{
    const now = new Date ();
    const subject = new Date (dateObject);

    if (isNaN (dateObject.getTime ())) {
        return true;
    }

    return (now.getTime () - subject.getTime ()) > milliseconds;
}

export function objectSerialize (baseObject, rawObject)
{
    for (const key of Object.keys (baseObject))
    {
        if (typeof baseObject[key] == "string") 
        {
            rawObject[key] = String (baseObject[key]);
            continue;
        }
        if (typeof baseObject[key] == "number") 
        {
            rawObject[key] = Number (baseObject[key]);
            continue;
        }
        if (typeof baseObject[key] == "boolean") 
        {
            rawObject[key] = Boolean (baseObject[key]);
            continue;
        }
        if (typeof baseObject[key] == "object")
        {            
            if (baseObject[key] == null)
            {
                rawObject[key] = null;
                continue;
            }
            if (baseObject[key] instanceof Date)
            {
                rawObject[key] = baseObject[key].toUTCString ();
                continue;
            }
            if (Array.isArray (baseObject[key]))
            {
                rawObject[key] = [];

                for (const value of baseObject[key])
                {
                    if (typeof value == "object")
                    {
                        const clone = {}; objectSerialize (value, clone);
    
                        rawObject[key].push (clone);
                        continue;
                    }
                    rawObject[key].push (value);
                }
                continue;
            }

            rawObject[key] = {};
            objectSerialize (baseObject[key], rawObject[key]);
            continue;
        }
    }
}

export function objectDeserialize (baseObject, rawObject)
{    
    for (const key of Object.keys (baseObject))
    {
        if (typeof baseObject[key] == "string")
        {
            if (rawObject == null || rawObject[key] == null || rawObject[key] == undefined) 
            {
                continue;
            }
            baseObject[key] = String (rawObject[key]);
            continue;
        }
        if (typeof baseObject[key] == "number")
        {
            if (rawObject == null || rawObject[key] == null || rawObject[key] == undefined) 
            {
                continue;
            }
            baseObject[key] = Number (rawObject[key]);
            continue;
        }
        if (typeof baseObject[key] == "boolean")
        {
            if (rawObject == null || rawObject[key] == null || rawObject[key] == undefined) 
            {
                continue;
            }
            baseObject[key] = Boolean (rawObject[key]);
            continue;
        }
        if (typeof baseObject[key] == "object")
        {
            if (baseObject[key] instanceof Date)
            {
                if (rawObject == null || rawObject[key] == null || rawObject[key] == "") 
                {
                    baseObject[key] = new Date(undefined);
                    continue;
                }
                baseObject[key] = new Date (rawObject[key]);
                continue;
            }
            if (Array.isArray (baseObject[key]))
            {
                const prototype = baseObject[key].at(0);

                baseObject[key] = [];

                if (prototype == null)
                {
                    console.warn (`Deserializer: Array is missing the prototype, deserialization won't work properly`, rawObject[key]);

                    if (rawObject == null || rawObject[key] == null || rawObject[key] == undefined) 
                    {
                        continue;
                    }
                    for (const value of rawObject[key])
                    {
                        baseObject[key].push (value);
                    }
                }
                else
                {
                    if (rawObject == null || rawObject[key] == null || rawObject[key] == undefined) 
                    {
                        continue;
                    }
                    for (const value of rawObject[key])
                    {
                        if (typeof value == "object")
                        {
                            const clone = structuredClone (prototype);
    
                            objectDeserialize (clone, value);
    
                            baseObject[key].push (clone);
                        }
                        else
                        {
                            baseObject[key].push (value);
                        }
                    }
                }
                continue;
            }
            if (rawObject == null || rawObject[key] == null || rawObject[key] == undefined) 
            {
                continue;
            }
            objectDeserialize (baseObject[key], rawObject[key]);
            continue;
        }
    }
}