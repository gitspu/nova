import { useEffect, useReducer, useRef, useState } from "react";
import { auth } from '../../Script/Api'
import icon from '../../Script/Icon'
import { Modal, Button, Div, Main, P, Section, Td, Img,  Checkbox, H1, Hr, Span, Input, Table, Tr, THead, TBody, Header, Label, MenuBar } from "../../Component/Common";


// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

export default Start;

function Start ({menu})
{
    return <StartResolve menu={menu}/>
}
function StartResolve ({menu})
{
    const mounted = useRef (false);
    const visible = menu[0] == 3;

    const map = useRef (new auth.DataMap ().init ());
    const mapInfo = useRef ([ new auth.DataMapInfo() ]);

    const statusInterval = useRef (null);
    const [forceUpdateIdx, forceUpdate] = useReducer (x => x + 1);
    const [statusText, setStatusText] = useState ('');
    const [searchText, setSearchText] = useState ('');

    const [newShow, setNewShow] = useState (false);
    const newData = useRef ({
        username: '',
        password: '',
        role: '',
        status: ''
    });
    const [editShow, setEditShow] = useState (false);
    const editData = useRef (0);

    function onLoadDataset ()
    {
        map.current = auth.getMap ();

        console.log (map.current);
    }
    function onLoadUI ()
    {
        mapInfo.current.splice (0, mapInfo.current.length);
        mapInfo.current.push ( ... map.current.item.map ((value => auth.getMapInfo (value))))

        forceUpdate ();
    }

    function onRenderTable ()
    {
        return mapInfo.current.map ((value, index) =>
        {
            let access = Number (value.access);
            let username = String (value.name);
            let role = 'ไม่รู้จัก';
            let status = 'ไม่ทราบ';

            if (searchText != "")
            {
                if (String(username).toLowerCase().startsWith (searchText.toLowerCase()) == false && 
                    String(username).toLowerCase().includes (searchText.toLowerCase()) == false &&
                    String(access).toLowerCase().startsWith (searchText.toLowerCase()) == false &&
                    String(access).toLowerCase().includes (searchText.toLowerCase()) == false)
                    return;
            }

            switch (Number (value.role))
            {
                case auth.ROLE_USER:      role = 'ผู้ใช้'; break;
                case auth.ROLE_EMPLOYER:  role = 'องค์กร'; break;
                case auth.ROLE_ADMIN:     role = 'ผู้ดูแล'; break;
                case auth.ROLE_TESTER:    role = 'ผู้ทดสอบ'; break;
                case auth.ROLE_DEVELOPER: role = 'ผู้พัฒนา'; break;
            }
            switch (Number (value.status))
            {
                case auth.STATUS_ACTIVE:    status = 'เปิดใช้งาน'; break;
                case auth.STATUS_INACTIVE:  status = 'ปิดใช้งาน'; break;
                case auth.STATUS_SUSPENDED: status = 'ถูกระงับ'; break;
            }
            return <>
              <Tr key={index} onClick={() => onClickEdit (access)}>
                <Td>{String(access)}</Td>
                <Td>{String(username)}</Td>
                <Td>{String(role)}</Td>
                <Td>{String(status)}</Td>
              </Tr>
            </>
        });
    }

    function onClickNew ()
    {
        setNewShow (true);
    }
    function onClickEdit (which)
    {
        editData.current = which;
        setEditShow (true);
    }
    function onClickRefresh ()
    {
        onLoadDataset ();
        onLoadUI ();

        setStatusText ('ข้อมูลถูกดึงเรียบร้อยแล้ว');

        clearInterval (statusInterval.current);
        statusInterval.current = setInterval (() =>
        {
            setStatusText ('');
        },
        2500);
    }

    useEffect (() =>
    {
        if (mounted == null)
            return;
        if (mounted.current)
            return;

        mounted.current = true;

        onLoadDataset ();
        onLoadUI ();

        return () => 
        { 
          mounted.current = false;
        }
    },
    []);

    return <>
      <Div style={{ display: visible ? 'block' : 'none' }}>
        <Header className='mb-3' >
            <H1 $style='primary'>บัญชี</H1>
            <P $style='secondary'>จัดการข้อมูลต่าง ๆ ของบัญชีผู้ใช้ในระบบซึ่งรวมไปถึง ข้อมูลการยืนยันตัวตน, ข้อมูลโปรไฟล์, และอื่น ๆ ที่เจาะจงเกี่ยวกับข้อมูลผู้ใช้งาน</P>
            <Div className="mt-2 mb-2">
              <Hr/>
            </Div>
        </Header>
        <Main className='mb-3'>
          <Section className="mb-2">
            {statusText != "" && (
              <Div style={{ 
                backgroundColor: 'var(--app-bg-2)',
                border: 'var(--app-bg-border-2)',
                borderRadius: 'var(--app-bg-radius-2)',
                padding: '8px',
                width: '100%'
              }}>
                <Img className='me-2' src={icon.infoCircle}/>
                <Label>{statusText}</Label>
              </Div>
            )}
          </Section>
          <Section>
            <Span>
              <Button className='me-1 mb-2' onClick={onClickNew}>
                <Img src={icon.plusCircle}/>
                <Span>เพิ่มบัญชี</Span>
              </Button>
              <Button className='me-1 mb-2' onClick={onClickRefresh}>
                <Img src={icon.arrowClockwise}/>
                <Span>โหลดข้อมูลใหม่</Span>
              </Button>
            </Span>
            <Input type='search' placeholder='ค้นหาบัญชีด้วย ชื่อ (บัญชี) หรือ รหัสประจำตัว'
                  className='w-100 mb-2'
                  autoFocus={true} autoComplete='off'
                  value={searchText} onChange={(event) => setSearchText (event.target.value)}>
            </Input>
          </Section>
          <Section>
            <Table $clickable={true}>
              <THead>
                <Tr>
                  <Td>ไอดีบัญชี</Td>
                  <Td>ชื่อบัญชี</Td>
                  <Td>บทบาท</Td>
                  <Td>สถานะ</Td>
                </Tr>
              </THead>
              <TBody key={forceUpdateIdx}>
                {onRenderTable ()}
              </TBody>
            </Table>
          </Section>
        </Main>
        <Div style={{ 
          display: visible ? 'block' : 'none',
          position: 'fixed', zIndex: 1000,
          inset: '0', margin: '0', padding: '0',
          width: '100%', maxWidth: '100%', 
          height: '100%', maxHeight: '100%',
          pointerEvents: 'none'
        }}>
          <ModalNew ref={newData} show={[newShow, setNewShow]}/>
          <ModalEdit ref={editData} show={[editShow, setEditShow]}/>
        </Div>
      </Div>
    </>
}

// ==================================================================================================== //
//                                                                                                      //
// COMPONENT                                                                                            //
//                                                                                                      //
// ==================================================================================================== //

function ModalNew ({show, ref})
{
    const memory = ref.current;
    const [getShow, setShow] = show;
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [role, setRole] = useState (auth.ROLE_USER);
    const [status, setStatus] = useState (auth.STATUS_ACTIVE);

    return <>
      <Modal show={getShow}>
        <Modal.Header>
          <Div className='d-flex'>
            <Div className="flex-grow-1">
              <Label $size='h1'>เพิ่มบัญชี</Label>
              <P>กรุณาป้อนข้อมูลเบื้องต้น</P>
            </Div>
            <Div>
              <Button onClick={() => setShow (false)}>
                <Img src={icon.xCircle}/>
              </Button>
            </Div>
          </Div>
          <Div className="mt-2 mb-2">
            <Hr/>
          </Div>
        </Modal.Header>
        <Modal.Body>
          <Div className='mb-2'>
            <P className='mb-2'>ชื่อผู้ใช้</P>
            <Input className='w-100' type='text' autoComplete='off'
                   value={username} onChange={(event) => setUsername (event.target.value)}>
            </Input>
          </Div>
          <Div className='mb-2'>
            <P className='mb-2'>รหัสผ่าน</P>
            <Input className='w-100' type='text' autoComplete='off'
                  value={password} onChange={(event) => setPassword (event.target.value)}>
            </Input>
          </Div>
          <Div className='mb-2'>
            <P className='mb-2'>บทบาท</P>
            <MenuBar state={[role, setRole]} direction='horizontal'>
              <MenuBar.Child state={auth.ROLE_USER} icon={icon.person} text='ผู้ใช้'></MenuBar.Child>
              <MenuBar.Child state={auth.ROLE_EMPLOYER} icon={icon.people} text='องค์กร'></MenuBar.Child>
              <MenuBar.Child state={auth.ROLE_ADMIN} icon={icon.personGear} text='ผู้ดูแลระบบ'></MenuBar.Child>
              <MenuBar.Child state={auth.ROLE_TESTER} icon={icon.personGear} text='ผู้ทดสอบ'></MenuBar.Child>
              <MenuBar.Child state={auth.ROLE_DEVELOPER} icon={icon.personGear} text='ผู้พัฒนาระบบ'></MenuBar.Child>
            </MenuBar>
          </Div>
          <Div>
            <P className='mb-2'>สถานะ</P>
            <MenuBar state={[status, setStatus]} direction='horizontal'>
              <MenuBar.Child state={auth.STATUS_ACTIVE} icon={icon.checkCircle} text='เปิดใช้งาน'></MenuBar.Child>
              <MenuBar.Child state={auth.STATUS_INACTIVE} icon={icon.xCircle} text='ปิดใช้งาน'></MenuBar.Child>
              <MenuBar.Child state={auth.STATUS_SUSPENDED} icon={icon.ban} text='ถูกระงับ'></MenuBar.Child>
            </MenuBar>
          </Div>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
}
function ModalEdit ({show, ref})
{
    const memory = ref.current;
    const [getShow, setShow] = show;

    return <>
      <Modal show={getShow}>
        <Modal.Header>
          <Div className='d-flex'>
            <Div className="flex-grow-1">
              <Label $size='h1'>แก้ไขบัญชี</Label>
            </Div>
            <Div>
              <Button onClick={() => setShow (false)}>ปิด</Button>
            </Div>
          </Div>
          <Div className="mt-2 mb-2">
            <Hr/>
          </Div>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
}