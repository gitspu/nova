/**
 * 
 * ไฟล์ที่จัดเก็บส่วนประกอบ การตั้งค่ามองเห็น
 * 
*/
import { Activity } from "react";

import api from '../Script/Api'
import icon from '../Script/Icon'

import './Style/VisOpt.css'

const Root = ({
    state = [], 
    showPublic = true, 
    showFriend = false,
    showEmployer = false,
    showPrivate = true,
    onChange = () => {},
}) =>
{
    function getValue (which)
    {
        if (Array.isArray (state) && state.length >= 1)
        {
            return state[0] == which ? 'active' : 'normal'; 
        }
        return 'normal';
    }
    function setValue (which)
    {
        if (Array.isArray (state) && state.length >= 2)
        {
            state[1] (which);
        }
        if (typeof onChange == 'function')
        {
            onChange (which);
        }
    }

    const VALUE_PUBLIC    = api.profile.VISIBILITY_PUBLIC;
    const VALUE_EMPLOYER  = api.profile.VISIBILITY_FRIEND;
    const VALUE_FRIEND    = api.profile.VISIBILITY_FRIEND;
    const VALUE_PRIVATE   = api.profile.VISIBILITY_PRIVATE;

    return (
      <div className='visopt'>
        <Activity mode={showPublic ? 'visible' : 'hidden'}>
          <button title="มองเห็นได้ทุกคน" 
                  className={getValue (VALUE_PUBLIC)} 
                  onClick={() => setValue (VALUE_PUBLIC)}>
            <img src={icon.people}></img>
          </button>
        </Activity>
        <Activity mode={showEmployer ? 'visible' : 'hidden'}>
          <button title="มองเห็นได้เฉพาะนางจ้าง" 
                  className={getValue (VALUE_EMPLOYER)}
                  onClick={() => setValue (VALUE_EMPLOYER)}>
            <img src={icon.plusCircle}></img>
          </button>
        </Activity>
        <Activity mode={showFriend ? 'visible' : 'hidden'}>
          <button title="มองเห็นได้เฉพาะเพื่อน" 
                  className={getValue (VALUE_FRIEND)}
                  onClick={() => setValue (VALUE_FRIEND)}>
            <img src={icon.people}></img>
          </button>
        </Activity>
        <Activity mode={showPrivate ? 'visible' : 'hidden'}>
          <button title="ปิดการมองเห็น"
                  className={getValue (VALUE_PRIVATE)}
                  onClick={() => setValue (VALUE_PRIVATE)}>
            <img src={icon.person}></img>
          </button>
        </Activity>
      </div>
    );
}
export default Root;