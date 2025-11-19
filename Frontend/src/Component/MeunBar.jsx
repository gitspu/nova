/**
 * 
 * ไฟล์ที่จัดเก็บส่วนประกอบ รายการเมนู
 * 
*/
import React, { Fragment } from 'react';
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
// eslint-disable-next-line no-unused-vars
const Condition = ({state, children}) =>
{
    return <>{children}</>;
}
const Root = ({direction = 'horizontal', state, className, children }) =>
{
    const typeChild = (<Child/>).type;
    const typeSeparator = (<Separator/>).type;
    const typeCondition = (<Condition/>).type;

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
    const iterate = (root, index) =>
    {
        if (root.type === typeCondition)
        {
            if (root.props.state)
                return React.Children.map (root.props.children, iterate);

            return;
        }
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
    }



    return (
        <div className={['menu-bar', className].join (' ')}>
            <div className={direction}>
                {children.map (iterate)}
            </div>
        </div>
    )
}

Root.Child = Child;
Root.Separator = Separator;
Root.Condition = Condition;

export default Root;