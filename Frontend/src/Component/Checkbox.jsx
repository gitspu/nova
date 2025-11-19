/**
 * 
 * ไฟล์ที่จัดเก็บส่วนประกอบ รายการเลือก
 * 
*/
import './Style/Checkbox.css'

/**
 * ส่วนประกอบสำหรับการแสดงตัวเลือก พร้อมคำอธิบายประกอบ
*/
const Root = ({
    state /* [get, update] */, 
    name /* ชื่อหัวข้อ */ = "", 
    description /* คำอธิบายเพิ่มเติม */ = "",
    className,
    onChange}) => {

    function getState () 
    {
        if (Array.isArray (state) == false)
            return false;

        if (state.length < 1)
            return false;

        return state[0];
    }
    function setState (event) 
    {
        if (Array.isArray (state) == false)
            return;

        if (state.length < 2)
            return;

        state[1] (!state[0]);

        if (typeof onChange == 'function')
            onChange (event);
    }


    return (
      <div className={['checkbox', className].join(' ')}>
          <input className='field' type='checkbox' checked={getState()} onChange={(e) => setState(e)}/>
          <label className='name'>{name}</label>
          <p className='description'>{description}</p>
      </div>
    );
}
export default Root;