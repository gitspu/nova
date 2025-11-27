import icon from '../../Script/Icon'

import 
{ 
    Div,
    P,
    Button,
    Img,
    Span,
    Header,
    Main,
    Footer,
    A,
} 
from "../../Component/Common";
import { loginFacebook, RESOLVE_CREATED, RESOLVE_LOGGED } from '../../Script/Auth';

// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

/**
 * 
 * พื้นที่สำหรับการแสดงหน้าหลัก
 * 
*/
export default function Start ({view, status, blocking, callback})
{
    const [getView, setView] = view;
    const [getStatus, setStatus] = status;
    const [getBlocking, setBlocking] = blocking;

    const visible = getView == 1;

    function onClickLogin (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setStatus ("");
        setView (2);
    }
    function onClickLoginFb (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setBlocking (true);
        setStatus ("");
        loginFacebook ().then ((type) =>
        {
            if (callback == null)
                return;

            switch (type)
            {
                case RESOLVE_LOGGED: callback.onLogged (); break;
                case RESOLVE_CREATED: callback.onRegistered(); break;
            }
        }).catch ((message) =>
        {
            setBlocking (false);
            setStatus (message);
        });
    }
    return <>
      <Div style={{
          display: visible ? 'flex' : 'none',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%'
      }}>
        <Header>
          <P className='mb-4'>ยินดีต้อนรับเรามาเริ่มต้นกันเลย เลือกวิธีการเข้าสู่ระบบของคุณ</P>
        </Header>
        <Main>
          <Button $variant='primary' $align='left' className='w-100 mb-1' disabled={getBlocking}
                  onClick={onClickLogin}>
            <Img src={icon.arrowRight}/>
            <Span>เข้าสู่ระบบ</Span>
          </Button>
          <Button $variant='secondary' $align='left' className='w-100 mb-1' disabled={getBlocking}
                  onClick={onClickLoginFb}>
            <Img src={icon.facebook}/>
            <Span>เข้าสู่ระบบด้วย Facebook</Span>
          </Button>
          {/* <Button $variant='secondary' $align='left' className='w-100 mb-1' disabled={getBlocking}
                  onClick={onClickLoginFb}>
            <Img src={icon.google}/>
            <Span>เข้าสู่ระบบด้วย Google</Span>
          </Button> */}
        </Main>
        <Div className='mt-4 mb-4'>
            <P $variant='caution'>{status}</P>
        </Div>
        <Div className='flex-grow-1'/>
        <Footer>
          <P $align='center'><A>เงื่อนไขการให้บริการ</A> | <A>นโยบายความเป็นส่วนตัว</A></P>
        </Footer>
      </Div>
    </>
}