

// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

import { Div, H1, Header, Hr, Main, P, Span, Button, Img } from "../../Component/Common";
import icon from '../../Script/Icon'

export default Start;

function Start ({menu})
{
    return <StartResolve menu={menu}/>
}
function StartResolve ({menu})
{
    const visible = menu[0] == 4;

    function onClickNew () {}
    function onClickRefresh () {}

    return <>
      <Div style={{ display: visible ? 'block' : 'none' }}>
        <Header className='mb-3'>
          <H1 $style='primary'>โฆษณา</H1>
          <P $style='secondary'>จัดการวิธีการแสดงผล เพิ่มและลบข้อมูลต่าง ๆ ที่เกี่ยวข้องการโฆษณา</P>
          <Div className="mt-2 mb-2">
            <Hr/>
          </Div>
        </Header>
        <Main className='mb-3'>
          <Span>
            <Button className='me-1 mb-2' onClick={onClickNew}>
              <Img src={icon.plusCircle}/>
              <Span>เพิ่มโฆษณา</Span>
            </Button>
            <Button className='me-1 mb-2' onClick={onClickRefresh}>
              <Img src={icon.arrowClockwise}/>
              <Span>โหลดข้อมูลใหม่</Span>
            </Button>
          </Span>
        </Main>
      </Div>
    </>
}