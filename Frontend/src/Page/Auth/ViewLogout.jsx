import { Button, H1, P } from "../../Component/Common";
import { auth } from "../../Script/Api";

export default function Start ({view})
{
    const [getView, setView] = view;

    const onClickLogout = (event) =>
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }

        try { auth.logout (); }
        finally { location.reload (); }
    }
    const onClickCancel = (event) =>
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        history.back ();
    }

    return <>
        <div className={getView == 5 ? 'd-block' : 'd-none'}>
            <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
            <div className='mb-3'>
                <H1 className="mb-3">คุณได้ทำการเข้าสู่ระบบเรียบร้อยแล้ว</H1>
                <P>หากคุณต้องการที่จะออกจากระบบ ให้กดปุ่มด้านล่าง</P>
            </div>
            <div className='mb-3'>
                <Button $variant='caution' onClick={onClickLogout}>ออกจากระบบ</Button>
                <Button $variant='primary' className="ms-1" onClick={onClickCancel}>ยกเลิก</Button>
            </div>
            </div>
        </div>
    </>
}