import { Div, Img, Input, Label, P, Span, Form, Button } from '../../Component/Common';
import icon from '../../Script/Icon'

// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

export default function Start ({view, username, status})
{
    const [getView, setView] = view;
    const [getUsername, setUsername] = username;
    const [getStatus, setStatus] = status;

    function onClickBack (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }

        setView (2);
        setStatus ('');
    }
    function onClickSubmit (event)
    {
        if (event != null)
        {
            event.preventDefault ();
            event.stopPropagation ();
        }
        setStatus ('ขออภัย ระบบไม่พร้อมใช้งานในขณะนี้');
    }
    return <>
      <Div className={getView == 4 ? 'd-block' : 'd-none'}>
        <Div className='mb-2'>
            <Button $align='left' $variant='outlined' className='mb-3 button-primary button-outlined text-align-left' onClick={onClickBack}>
              <Img src={icon.arrowLeftCircle}/>
              <Span>ย้อนกลับ</Span>
            </Button>
        </Div>
        <Form action='#'>
            <Div className='mb-1'>
              <Label className='w-100 fw-bold mb-2'>ชื่อผู้ใช้</Label>
              <Input className='w-100' type='text' autoComplete='username webauthn' autoFocus={true}
                    value={getUsername} onChange={(event) => setUsername (event.target.value)}>       
              </Input>
            </Div>
            <Div className='mt-4 mb-4'>
              <P $variant="caution">{getStatus}</P>
            </Div>
            <Button className='w-100 mb-3 button-primary' onClick={onClickSubmit}>ดำเนินการต่อ</Button>
        </Form>
      </Div>
    </>
}