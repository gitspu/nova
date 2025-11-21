/**
 * ไฟล์ที่จัดเก็บส่วนประกอบ: เมนูนำทาง
*/
import './Style/NavBar.css'

import icon from '../Script/Icon'

/**
 * 
 * ส่วนประกอบ สำหรับว่างพื้นที่หลักให้กับเมนูนำทาง (navigation bar)
 * 
*/
const Root = ({inset, width, height, children}) => 
{
    return (
      <div className='navbar' style={{ 
        inset: inset, 
        width: width, 
        height: height 
      }}>
        <div>
          {children}
        </div>
      </div>
    );
}
/**
 * 
 * ส่วนประกอบที่แสดงโลโก้แบรนด์ หรือ ชื่อผลิตภัณฑ์
 * 
*/
Root.Branding = ({image = icon.people, text = 'NOVA', onClick = null }) =>
{
    return (
      <button className='branding button-primary button-outlined' onClick={onClick}>
        <label>
          <img src={image}/>
          <span className='text-h2'>{text}</span>
        </label>
      </button>
    );
}
/**
 * 
 * ส่วนประกอบที่แสดงช่องค้นหา
 * 
*/
Root.Search = ({placeholder, value, onChange }) =>
{
    const [rawGetValue, rawSetValue] = (value != null) ? value : [null, null];

    const getValue = () =>
    {
        if (typeof rawGetValue == 'string')
            return rawGetValue;
          
        return '';
    }
    const setValue = (event) =>
    {
        if (typeof rawSetValue == 'function')
            rawSetValue (event.target.value);

        if (typeof onChange == 'function')
            onChange (event);
    }

    return (
      <div className='search'>
        <input type='search' placeholder={placeholder} value={getValue()} onChange={(event) => setValue(event)}/>
      </div>
    );
}
/**
 * 
 * ส่วนประกอบที่แสดงรายการย่อย
 * 
*/
Root.Menu = ({className, onClick}) =>
{
  return (
      <button className={['profile button-primary button-outlined', className].join (' ')} onClick={onClick}>
        <img src={icon.list}/>
      </button>
    );
}
/**
 * 
 * ส่วนประกอบที่แสดงรูปโปรไฟล์ (สามารถกดได้)
 * 
*/
Root.Profile = ({image = icon.emojiSmile, className, onClick }) =>
{
    return (
      <button className={['profile button-primary button-outlined', className].join (' ')} onClick={onClick}>
        <img src={image}/>
      </button>
    );
}
/**
 * 
 * ส่วนประกอบที้ใช้ขยายพื้นที่ให้กับองค์ประกอบย่อย
 * 
*/
Root.Flex = ({justify, grow, children}) =>
{
    return (
      <div className='flex' style={{ justifyContent: justify, flexGrow: grow }}>
          {children}
      </div>
    );
}
/**
 * 
 * ส่วนประกอบสำหรับเมนูบริบท
 * 
*/
Root.ContextMenu = ({className, children}) =>
{
    return (
      <div className={['context-menu', className].join (' ')}>
        {children}
      </div>
    );
}

/**
 * 
 * ส่งออกส่วนประกอบหลัก และ ส่วนประกอบย่อย
 * 
*/
export default Root;