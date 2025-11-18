/**
 * 
 * ไฟล์ที่จัดเก็บส่วนประกอบ รายการเมนู
 * 
*/
import React from 'react';
import './Style/MenuBar.css'

const Child = ({
    // ใช้แต่จากแหล่งที่อื่น
    // eslint-disable-next-line no-unused-vars
    state = null, 
    icon, 
    text, 
    onClick,

    style,
    className,
}) =>
{
    return (
        <button onClick={onClick} style={style} className={className}>
            <img src={icon}/>
            <span>{text}</span>
        </button>
    )
}
const Separator = () =>
{
    return (
        <br/>
    );
}
const Root = ({direction = 'horizontal', state, children }) =>
{
    const getState = () =>
    {
        if (Array.isArray (state) == false) return null;
        if (state == null || state.length < 1) return null;

        return state[0];
    }
    const setState = (value) =>
    {
        if (Array.isArray (state) == false) return;
        if (state == null || state.length < 2) return;

        state[1](value);
    }

    const typeChild = (<Child/>).type;
    const typeSeparator = (<Separator/>).type;

    return (
        <div className='menu-bar'>
            <div className={direction}>
                {children.map ((root, index) => 
                {
                    if (root.type === typeChild)
                    {
                        return React.cloneElement (root, 
                        {
                            key: index,
                            className: getState () == root.props.state ? 'active' : 'normal',
                            onClick: (event) => 
                            {
                                const value = root.props.state;
                                const callback = root.props.onClick;

                                setState (value);

                                if (typeof callback == 'function')
                                    callback (event);
                            }
                        });
                    }
                    if (root.type === typeSeparator)
                    {
                        return React.cloneElement (root, 
                        {
                            key: index
                        });
                    }
                    throw new Error ('Children contain invalid element');
                })}
            </div>
        </div>
    )
}

Root.Child = Child;
Root.Separator = Separator;

export default Root;