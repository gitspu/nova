import React from "react";
import './../assets/css/Common.css'

/**
 * ส่วนประกอบสำหรับการแสดงตัวเลือก พร้อมคำอธิบายประกอบ
*/
export function ToggleBox ({value, setValue, name = "", description = ""})
{
    function get ()
    {
        return value != null ? value : false;
    }
    function set (which)
    {
        if (setValue != null)
            setValue (which);
    }

    return <div className='component-togglebox'>
        <input className='field' type='checkbox' value={get()} onChange={(e) => set(e.target.value)}/>
        <label className='name'>{name}</label>
        <p className='description'>{description}</p>
    </div> 
}

export function ToggleBar ({state, setState, type, children, style})
{
    const classValue = type === "horizontal" ? "component-togglebar-horizontal" : 
                       type === "vertical" ? "component-togglebar-vertical" : 
                       "component-togglebar";

    return <div className={classValue} style={style}>
        {children.map ((value, index) => 
        {
            if (value.type.name == "ToggleBarSeparator") 
            {
                return React.cloneElement (value, {
                    key: index,
                    type: type,
                });
            }

            return React.cloneElement (value, {
                key: index,
                click: (val) => { if (setState != null) { setState(val); }},  
                className: (state == value.props.value) ? "toggled" : "normal"
            });
        })}
    </div>
}
export function ToggleBarItem ({icon, text, value, click, className})
{
    function toggle ()
    {
        click (value);
    }
    return <button className={className} onClick={() => toggle()}>
        {icon != null ?
            <img className="position-absolute w-100 h-100 p-1 pb-3" style={{}} src={icon}></img> : ""
        }
        <label>{text}</label>
    </button>
}
export function ToggleBarSeparator ({type, text})
{
    return <p>{text}</p>
}