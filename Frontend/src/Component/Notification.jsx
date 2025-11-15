/**
 * ไฟล์ที่จัดเก็บส่วนประกอบ: การแจ้งเตือนเล็ก
*/
import './Style/Notification.css'

export function Notification ({inset = 'auto auto 0px 0px', width = '128px', height = '48px'})
{
    return <>
      <div className="component-notification" style={{ inset: inset, width: width, height: height }}>
          
      </div>
    </>   
}