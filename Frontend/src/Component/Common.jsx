import React from "react";
import * as icon from './../Script/Icon';

import "./Style/Common.css"

/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 1)
*/
export function H1 ({value = '', className = '', style = {}}) { 
    return <h1 className={['h1', className].join(' ')} style={style}>{value}</h1>
}
/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 2)
*/
export function H2 ({value = '', className = '', style = {}}) { 
    return <h2 className={['h2', className].join(' ')} style={style}>{value}</h2>
}
/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 3)
*/
export function H3 ({value = '', className = '', style = {}}) { 
    return <h3 className={['h3', className].join(' ')} style={style}>{value}</h3>
}
/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 4)
*/
export function H4 ({value = '', className = '', style = {}}) { 
    return <h4 className={['h4', className].join(' ')} style={style}>{value}</h4>
}
/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 5)
*/
export function H5 ({value = '', className = '', style = {}}) { 
    return <h4 className={['h5', className].join(' ')} style={style}>{value}</h4>
}
/**
 * ส่วนประกอบ สำหรับหัวเรื่อง (ระดับที่ 6)
*/
export function H6 ({value = '', className = '', style = {}}) { 
    return <h6 className={['h6', className].join(' ')} style={style}>{value}</h6>
}
/**
 * ส่วนประกอบ สำหรับข้อความทั่วไป
*/
export function Paragraph ({value = '', className = '', style= {}}) { 
    return <p className={['p', className].join(' ')} style={style}>{value}</p>
}
/**
 * ส่วนประกอบ สำหรับป้าย
*/
export function Label ({value = '', htmlFor = null, className = '', style= {}}) { 
    return <label htmlFor={htmlFor} className={['app-label', className].join(' ')} style={style}>{value}</label>
}
/**
 * ส่วนประกอบ สำหรับที่ป้อน
*/
export function Input ({value = [], id = '', placeholder = '', className = '', style= {}}) 
{
    return <input className={['input', className].join(' ')} id={id} placeholder={placeholder} style={style} value={(value != null && value.length >= 1) ? value[0] : ""} onChange={(event) => 
    {
        event.preventDefault ();

        if (value != null && value.length >= 2) 
        {
            value[1] (event.target.value);
        }
    }}/>
}

/**
 * ส่วนประกอบ รายการที่สามารถเลือกได้เพียงคำตอบเดียว
*/
export function RadioGroup ()
{
}
/**
 * ส่วนประกอบ รายการที่สามารถเลือกได้หลายคำตอบ
*/
export function CheckboxGroup ()
{
    // (Button Text)
    // (Button Text, Outlined)
    // (Button Text + Icon)
    // (Button Text + Icon, Outlined)
}

export function ButtonGroup ({children = []})
{
    return <>
      {children.map ((value, index) => 
      {
          return React.cloneElement (value, {
              key: index  
          });
      })}
    </>
}

/**
 * ส่วนประกอบ สำหรับปุ่มกด
*/
export function Button ({
    layout /* ประเภทปุ่ม */,
    icon /* รูปภาพสำหรับปุ่มกด */, 
    text /* ข้อความสำหรับปุ่มกด */,
    click /* คำสั่งเมื่อปุ่มถูกกด */,
    
    type /* ประเภทปุ่ม*/,
    htmlFor /* ปุ่มนี้สำหรับ */,
    style /* กำหนด css เพิ่มเติม */,
    className /* กำหนดคลาสเพิ่มเติม */
})
{
    let classImpl = "component-button";

    if (layout != null)
    {
        for (const item of String(layout).split (' '))
        {
            classImpl = [classImpl, `component-button ${item}`].join (' ');    
        }
    }
    classImpl = [classImpl, className].join (' ');

    return <>
        <button className={classImpl} style={style}>
            <label
                htmlFor={htmlFor}
                onClick={(event) => onClick(event)}>
                {icon != null ? <img src={icon}/> : <></>}
                {text}
            </label>
        </button>
    </>

    function onClick (event)
    {        
        if (click != null) {
            click (event);
        }
    }
}

/**
 * ปุ่มกดที่เน้นแสดงรูปภาพแทนข้อความ
*/
export function ButtonOld ({
    layout /* ประเภทปุ่มกดเช่น horizontal หรือ vertical */,
    theme /* ธีมของปุ่มกด */,
    type /* ประเภทปุ่ม */,
    icon /* รูปภาพสำหรับปุ่มกด */, 
    text /* ข้อความสำหรับปุ่มกด */,
    click /* คำสั่งเมื่อปุ่มถูกกด */,

    style /* กำหนด css เพิ่มเติม */,
    className /* กำหนดคลาสเพิ่มเติม */
})
{
    // จำเป็นต้องระบุประเภท (style)
    // ซึ่งมี horizontal (แนวนอน) และ vertical (แนวตั้ง)

    if (layout == "") {
        throw new Error ('Type style is required');
    }

    if (layout == null)
    {
        return <>
            <button>{text}</button>
        </>
    }
    if (layout == "horizontal-outlined")
    {
        return <>
            <button className={`component-button-horizontal component-button-horizontal-outlined component-button-theme-${theme}`} type={type} onClick={click}>
                {icon != null ? <img src={icon} alt=''></img> : <></>}
                {text != null ? <label>{text}</label> : <></>}
            </button>
        </>
    }
    if (layout == "vertical-outlined")
    {
        return <>
            <button className={`component-button-vertical component-button-vertical-outlined component-button-theme-${theme}`} type={type} onClick={click}>
                {icon != null ? <img src={icon} alt=''></img> : <></>}
                {text != null ? <label>{text}</label> : <></>}
            </button>
        </>
    }
    if (layout == "horizontal")
    {
        return <>
            <button className={`component-button-horizontal component-button-theme-${theme} ${className}`} 
                    style={style}
                    type={type} onClick={click}>
                {icon != null ? <img src={icon} alt=''></img> : <></>}
                {text != null ? <label>{text}</label> : <></>}
            </button>
        </>
    }
    if (layout == "vertical")
    {
        return <>
            <button className={`component-button-vertical $component-button-theme-${theme} ${className}`} 
                    style={style}
                    type={type} onClick={click}>
                {icon != null ? <img src={icon} alt=''></img> : <></>}
                {text != null ? <label>{text}</label> : <></>}
            </button>
        </>
    }
    throw new Error ('Type style is invalid');
}

/**
 * ส่วนประกอบสำหรับการแสดงตัวเลือก พร้อมคำอธิบายประกอบ
*/
export function Checkbox ({
    state /* [get, update] */, 
    name /* ชื่อหัวข้อ */ = "", 
    description /* คำอธิบายเพิ่มเติม */ = ""
}) {

    function getState () {
        return state != null ? state[0] : false;
    }
    function setState (which) {
        if (state != null) state[1](which);
    }

    return <div className='component-checkbox'>
        <input className='field' type='checkbox' value={getState()} onChange={(e) => setState(e.target.value)}/>
        <label className='name'>{name}</label>
        <p className='description'>{description}</p>
    </div> 
}

export function VisibilityOption ({
    state /* สถานะ [get, set] */,
    click /* ตอนปุ่มถูกกด */,

    style /* กำหนด css เพิ่มเติม */,
    className /* กำหนดคลาสเพิ่มเติม */ 
})
{
    const outClass = ["component-common-visopt", className].join (' ');
    const outGet = state != null ? state[0] : null;
    const outSet = state != null ? state[1] : null;

    return <div className={outClass} style={style}>
        <button title="ทุกคน" onClick={(event) => onClick(event, 2)} className={outGet == 2 ? "active" : "normal"}>
            <img src={icon.people}></img>
        </button>
        <button title="เพื่อน และ ผู้จ้าง" onClick={(event) => onClick(event, 3)} className={outGet == 3 ? "active" : "normal"}>
            <img src={icon.person}></img>
        </button>
        <button title="เฉพาะฉัน" onClick={(event) => onClick(event, 4)} className={outGet == 4 ? "active" : "normal"}>
            <img src={icon.ban}></img>
        </button>
    </div>

    function onClick (event, which)
    {
        event.preventDefault ();

        if (outSet != null)
            outSet (which);

        if (click != null)
            click (which);
    }
}

/**
 * ส่วนประกอบสำหรับการแสดงรายการที่สามารถเลือกได้
*/
export function ToggleBar ({
    type /* horizontal หรือ vertical */, 
    state /* [get, update] */, 
    children /* องค์ประกอบ JSX: ToggleBarItem หรือ ToggleBarSeparator */,
    className = "" /* string กำหนดคลาสให้กับตัวแม่ */, 
    style = {} /* css กำหนดให้กับตัวแม่ */,
})
{
    // จำเป็นต้องระบุประเภท (type)
    // ซึ่งมี horizontal (แนวนอน) และ vertical (แนวตั้ง)

    if (type == null || type == "") {
        throw new Error ('Type attribute is required');
    }
    if (type != "horizontal" && type != "vertical")
        throw new Error ('Type attribute is invalid');

    // ส่วนประกอบทำงาน แต่ไม่มีสมบูรณ์
    // ผู้ใช้ต้องระบุคุณสมบัติให้ครบ

    if (state == null || state.length != 2)
        console.warn ("Component/ToggleBar: The component specified is incomplete, missing state attribute");
    if (children == null)
        console.warn ("Component/ToggleBar: The component contains null children, which shouldn't be occurred");


    // แสดผลให้กับ React
    return <Viewport>
        <Children/>
    </Viewport>

    /**
     * พื้นที่หลักของส่วนประกอบ
    */
    function Viewport ({children})
    {
        return <div className={`component-togglebar-${type} ${className}`} style={style}>
            {children}
        </div>
    }
    /**
     * พื้นลูกที่อยู่ภายใต้แม่ (พื้นที่หลัก)
    */
    function Children ()
    {
        return children.map ((value, index) =>
        {
            if (value.type.name == "ToggleBarItem")
            {
                return React.cloneElement (value, 
                {
                    key: index,

                    __type: type,
                    __className: (state != null ? (state[0] == value.props.value) : false) ? "toggled" : "normal",
                    __click: (param) => { if (state != null) { state[1](param); } },
                });
            }
            if (value.type.name == "ToggleBarSeparator")
            {
                return React.cloneElement (value, 
                {
                    key: index,

                    __type: type,
                });
            }
            throw new Error ('Children contain invalid element');
        });
    }
}
/**
 * ส่วนประกอบ รายการแสดงผลให้กับ ToggleBar
*/
export function ToggleBarItem ({
    icon /* ลิงค์ไปยังรูปภาพ */, 
    text /* ข้อความ */, 
    value /* ค่าที่จะส่งคืนให้กับ state (ของตัวแม่) */,
    click /* กำหนดระบบเมื่อผู้ใช้กดปุ่ม */, 
    className = "" /* กำหนดคลาสให้ตัวรายการ */, 
    style = {} /* กำหนด css ให้ตัวรายการ */,
    
    __type /* ประเภท (ใช้ภายในเท่านั้น/ห้ามใช้เอง) */,
    __click /* กำหนดระบบเมื่อผู้ใช้กดปุ่ม (ใช้ภายในเท่านั้น/ห้ามใช้เอง) */, 
    __className /* กำหนดคลาสให้ตัวรายการ (ใช้ภายในเท่านั้น/ห้ามใช้เอง)*/,
})
{
    function onClickEvent ()
    {
        if (__click != null) __click (value);
        if (click != null) click (value);
    }

    return <Parent>
        <Child/>
    </Parent>

    function Parent ({children})
    {
        return <button className={`${__className} ${className}`} style={style} onClick={() => onClickEvent()}>
            {children}
        </button>
    }
    function Child ()
    {
        if (__type == "horizontal")
        {
            return <img src={icon} alt=""></img>
        }
        if (__type == "vertical")
        {
            return <>
                <img src={icon} alt=""></img>
                <label>{text}</label>
            </>
        }
    }
}
/**
 * ส่วนประกอบ เว้นพื้นที่ว่างเพื่อแสดงความแตกต่างของหมวดหมู่
 * สามารถระบุข้อความหรือรูปภาพได้
 * 
 * ส่วนประกอบนี้จะไม่แสดงข้อความหรือรูปภาพ
 * เมื่อ ToggleBox มีค่า type เป็น horizontal
*/
export function ToggleBarSeparator ({
    icon /* ลิงค์รูปภาพ */,
    text /* ข้อความ */,

    __type /* กำหนดประเภทของส่วนประกอบ (ใช้ภายในเท่านั้น/ห้ามใช้เอง) */,
})
{
    if (__type == "horizontal")
    {
        return <div></div>
    }
    if (__type == "vertical")
    {
        return <div className="pt-2 pb-2">
            <img src={icon} alt=''></img>
            <label>{text}</label>
        </div>
    }
    throw new Error ('Type attribute is invalid');
}