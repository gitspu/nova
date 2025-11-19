/**
 * 
 * ไฟล์ที่จัดเก็บส่วนประกอบ กล่องข้อความ
 * 
*/
import './Style/Modal.css'

const Root = ({show, children}) =>
{
    return (
        <div className='modal' style={{ animationName: (show ? 'modal-show' : 'modal-hide') }}>
            <div className='inner'>{children}</div>
        </div>
    )
}

export default Root;