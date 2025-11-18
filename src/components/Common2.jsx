/**
 * 
 * ไฟล์ที่จัดเก็บส่วนประกอบที่ใช้กันทั่วไปในเว็บไซต์
 * 
*/
import './Style/Common2.css'

/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 1)
*/
export function H1 ({value = '', className = '', style = {}})
{ 
    return <h1 className={['h1', className].join(' ')} style={style}>{value}</h1>
}
/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 2)
*/
export function H2 ({value = '', className = '', style = {}}) 
{ 
    return <h2 className={['h2', className].join(' ')} style={style}>{value}</h2>
}
/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 3)
*/
export function H3 ({value = '', className = '', style = {}}) 
{ 
    return <h3 className={['h3', className].join(' ')} style={style}>{value}</h3>
}
/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 4)
*/
export function H4 ({value = '', className = '', style = {}}) 
{ 
    return <h4 className={['h4', className].join(' ')} style={style}>{value}</h4>
}
/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 5)
*/
export function H5 ({value = '', className = '', style = {}}) 
{ 
    return <h4 className={['h5', className].join(' ')} style={style}>{value}</h4>
}
/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 6)
*/
export function H6 ({value = '', className = '', style = {}}) 
{ 
    return <h6 className={['h6', className].join(' ')} style={style}>{value}</h6>
}
/**
 * ส่วนประกอบ สำหรับข้อความทั่วไป
*/
export function P ({value = '', className = '', style= {}}) 
{ 
    return <p className={['p', className].join(' ')} style={style}>{value}</p>
}
/**
 * ส่วนประกอบ สำหรับป้าย
*/
export function Label ({value = '', htmlFor = null, className = '', style= {}}) 
{ 
    return <label className={['label', className].join(' ')} htmlFor={htmlFor} style={style}>{value}</label>
}
/**
 * ส่วนประกอบ สำหรับที่ป้อน
*/
export function Input ({
    value = [], 
    type = 'text', 
    placeholder = '', 
    id = '', 

    onKeydown = () => {},
    onChange = () => {},

    className = '', 
    style= {}}) 
{
    return <>
      <input
        value={handleValue()} 
        type={type} 
        placeholder={placeholder} 
        id={id} 
        
        onChange={(event) => handleChange(event)}
        onKeyDown={(event) => handleKeydown(event)}

        className={['input', className].join(' ')} 
        style={style} 
      />
    </>

    function handleValue ()
    {
        if (value != null && value.length >= 1)
            return value[0];

        return "";
    }
    function handleChange (event)
    {
        if (value != null && value.length >= 2) 
            value[1] (event.target.value);

        if (onChange != null) {
            onChange (event.target.value);
        }
    }
    function handleKeydown (event)
    {
        if (onKeydown != null) {
            onKeydown (event);
        }
    }
}
export function Button ({
    type = 'button',
    text = '',

    onClick = () => {},

    disabled = false,
    className = null,
    style = {},
})
{
    return <>
      <button 
        type={type} 
        onClick={(event) => onClick(event)}
        className={['button', className].join (' ')}
        disabled={disabled}
        style={style}>{text}</button>
    </>
}
export function ButtonLabel ({
    type = 'button',
    icon = null,
    text = '',
    htmlFor = null,
    disabled = false,

    onClick = () => {},

    className = null,
    style = {},
})
{

    return <>
      <button type={type}
              onClick={(event) => handleClick(event)} 
              className={["button-label", className].join(' ')} 
              style={style} 
              disabled={disabled}>
        <label htmlFor={htmlFor} onClick={(event) => handleClick(event)}>
            {icon != null ? <img src={icon}/> : <></>}
            {text}
        </label>
      </button>
    </>

    function handleClick (event)
    {
        if (onClick != null)
            onClick (event);
    }
}
export function Br ()
{
    return <br className='br'/>
}
export function Hr ()
{
    return <hr className='hr'/>
}