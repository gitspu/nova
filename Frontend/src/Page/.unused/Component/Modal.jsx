/**
 * 
 * ไฟล์ที่จัดเก็บส่วนประกอบ กล่องข้อความ
 * 
*/
import './Style/Modal.css'

const Root = ({show, style, children}) =>
{
    return (
        <div className='modal' style={{ animationName: (show ? 'modal-show' : 'modal-hide') }}>
            <div className='inner' style={style}>{children}</div>
        </div>
    )
}
const Header = ({children}) =>
{
    return <div>{children}</div>
}
const Body = ({children}) =>
{
    return <div>{children}</div>
}
const Footer = ({children}) =>
{
    return <div>{children}</div>
}

Root.Header = Header;
Root.Body = Body;
Root.Footer = Footer;

export default Root;