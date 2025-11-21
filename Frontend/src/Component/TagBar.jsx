/**
 * 
 * ไฟล์ที่จัดเก็บส่วนประกอบ: รายการเลือกแท็ก
 * 
*/
import React from 'react'
import './Style/TagBar.css'

const Child = ({icon, text, className, onClick}) =>
{
    return (
      <button className={className} onClick={onClick}>
        {icon != null ? <img src={icon}/> : <></>}
        {text != null ? <span>{text}</span> : <></>}
      </button>
    )
}
const Separator = () =>
{
    return (
      <div></div>
    )
}
// eslint-disable-next-line no-unused-vars
const Condition = ({state, children}) =>
{
    return <>{children}</>;
}
const Root = ({state, className, children}) =>
{
    const typeChild = (<Child/>).type;
    const typeSeparator = (<Separator/>).type;
    const typeCondition = (<Condition/>).type;

    const getState = () =>
    {
        if (Array.isArray (state) == false) return [];
        if (state == null || state.length < 1) return [];

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
                className: [getState ().includes (root.props.state) ? 'active' : 'normal', root.props.className].join (' '),
                onClick: (event) => 
                {
                    const value = root.props.state;
                    const callback = root.props.onClick;
                    const resultOld = getState ();
                    const result = resultOld.includes (value) ? resultOld.filter(x => x != value) : [ ... resultOld, value];

                    setState (result);

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
        if (root.type == undefined)
        {
            return;
        }
        throw new Error ('Children contain invalid element: ');
    }

    return (
      <div className={['tag-bar', className].join (' ')}>
        {children.map (iterate)}
      </div>
    )
}
Root.Child = Child;
Root.Separator = Separator;

export default Root;