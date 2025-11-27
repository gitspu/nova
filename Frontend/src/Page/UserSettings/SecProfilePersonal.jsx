
import { useRef, useState, useEffect } from "react";
import { Button, Div, H1, H2, Header, Hr, Img, Input, Label, Main, P, Section, VisOpt } from "../../Component/Common";
import api from "../../Script/Api";
import styled from "styled-components";

// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

export default Start;

/**
 * จุดเริ่มต้นของการแสดงผลเพจ
*/
function Start ({ref = [], visible = true, onChange })
{
    const mounted = useRef (false);

    const [ready, setReady] = useState (false);
    const [icon, setIcon] = useState (null); 
    const [background, setBackground] = useState (null);

    const [nickname, setNickname] = useState ('');
    const [nicknameVis, setNicknameVis] = useState (0);

    const [firstName, setFirstName] = useState ('');
    const [firstNameVis, setFirstNameVis] = useState (0);

    const [middleName, setMiddleName] = useState ('');
    const [middleNameVis, setMiddleNameVis] = useState (0);

    const [lastName, setLastName] = useState ('');
    const [lastNameVis, setLastNameVis] = useState (0);

    const [status, setStatus] = useState ('');
    const [statusVis, setStatusVis] = useState (0);

    const [bio, setBio] = useState ('');
    const [bioVis, setBioVis] = useState (0);

    const [location, setLocation] = useState ('');
    const [locationVis, setLocationVis] = useState (0);

    const [birthday, setBirthday] = useState ('');
    const [birthdayVis, setBirthdayVis] = useState (0);

    const onLoad = () =>
    {
        const block = ref != null ? ref.current : null;

        if (block == null)
            return;

        setIcon (api.decodeContent (block.icon));
        setBackground (api.decodeContent (block.background));

        setNickname (block.nickname.value);
        setNicknameVis (block.nickname.visibility);

        setFirstName (block.firstName.value);
        setFirstNameVis (block.firstName.visibility);

        setMiddleName (block.middleName.value);
        setMiddleNameVis (block.middleName.visibility);

        setLastName (block.lastName.value);
        setLastNameVis (block.lastName.visibility);

        setStatus (block.status.value);
        setStatusVis (block.status.visibility);

        setBio (block.bio.value);
        setBioVis (block.bio.visibility);

        setLocation (block.location.value);
        setLocationVis (block.location.visibility);

        setBirthday (`${block.birthday.value.getFullYear()}-${String(block.birthday.value.getMonth()).padStart(2, '0')}-${String(block.birthday.value.getDate()).padStart(2, '0')}`);
        setBirthdayVis (block.birthday.visibility);

        setReady (true);
    };

    const onSave = (() =>
    {
        const block = ref != null ? ref.current : null;

        if (block == null)
            return;
        if (ready == false)
            return;

        block.icon = api.encodeContent (icon);
        block.background = api.encodeContent (background);

        block.nickname.value = nickname;
        block.nickname.visibility = nicknameVis;

        block.firstName.value = firstName;
        block.firstName.visibility = firstNameVis;

        block.middleName.value = middleName;
        block.middleName.visibility = middleNameVis;

        block.lastName.value = lastName;
        block.lastName.visibility = lastNameVis;

        block.status.value = status;
        block.status.visibility = statusVis;

        block.bio.value = bio;
        block.bio.visibility = bioVis;

        block.location.value = location;
        block.location.visibility = locationVis;

        block.birthday.value = new Date(birthday);
        block.birthday.visibility = birthdayVis;

        if (onChange != null)
            onChange ();
    });

    const onChangeIcon = (event) =>
    {
        event.preventDefault ();

        const target = event.target;
        const file = target.files[0];
        const reader = new FileReader ();

        if (file == null) { return; }
        
        reader.onloadend = function ()
        {
            setIcon (reader.result);
        }
        reader.readAsDataURL (file);
    }
    const onChangeBackground = (event) =>
    {
        event.preventDefault ();

        const target = event.target;
        const file = target.files[0];
        const reader = new FileReader ();

        if (file == null) { return; }
        
        reader.onloadend = function ()
        {
            setBackground (reader.result);
        }
        reader.readAsDataURL (file);
    }
  
    useEffect (() =>
    {
        if (mounted.current)
            return;

        mounted.current = true;
        onLoad ();

        return () => { mounted.current = false; }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    useEffect (() =>
    {
        if (mounted.current == false)
            return;

        onSave ();
    });

    return <>
      <Div className={visible ? 'd-block' : 'd-none'}>
        <Header className="mb-3">
            <H2 $variant='primary'>ข้อมูลส่วนตัว</H2>
        </Header>
        <Main className="mb-3">
           <ClassImage>
              <Img src={background} alt="" width='100%' height='100%'/>
              <Img src={icon} alt="" width='128px' height='128px'/>
            </ClassImage>
            <ClassImageUpload>
                <input id='upload-icon' type='file' accept='image/*' className='d-none' onChange={(e) => onChangeIcon (e)}/>
                <input id='upload-background' type='file' accept='image/*' className='d-none' onChange={(e) => onChangeBackground (e)}/>
                <Button>
                  <Label htmlFor='upload-icon'>เปลี่ยนรูปโปรไฟล์</Label>
                </Button>
                <Button>
                  <Label htmlFor='upload-background'>เปลี่ยนรูปพื้นหลัง</Label>
                </Button>
            </ClassImageUpload>

            <ClassInput>
              <P>ชื่อเล่น</P>
              <Input type="text" 
                    value={nickname} 
                    onChange={(event) => setNickname(event.target.value)}>
              </Input>
              <VisOpt state={[nicknameVis, setNicknameVis]}/>
            </ClassInput>
            <ClassInput>
              <P>ชื่อจริง</P>
              <Input type="text" 
                    value={firstName} 
                    onChange={(event) => setFirstName(event.target.value)}>
              </Input>
              <VisOpt state={[firstNameVis, setFirstNameVis]}/>
            </ClassInput>
            <ClassInput>
              <P>ชื่อกลาง</P>
              <Input type="text" 
                    value={middleName} 
                    onChange={(event) => setMiddleName(event.target.value)}>
              </Input>
              <VisOpt state={[middleNameVis, setMiddleNameVis]}/>
            </ClassInput>
            <ClassInput>
              <P>นามสกุล</P>
              <Input type="text" 
                    value={lastName} 
                    onChange={(event) => setLastName(event.target.value)}>
              </Input>
              <VisOpt state={[lastNameVis, setLastNameVis]}/>
            </ClassInput>

            <ClassInput>
              <P>สถานะ</P>
              <Input type="text" 
                    value={status} 
                    onChange={(event) => setStatus(event.target.value)}>
              </Input>

              <VisOpt state={[statusVis, setStatusVis]}/>
            </ClassInput>
            <ClassInput className='class-input'>
              <P>แนะนำตัว</P>
              <Input type="text" 
                    value={bio} 
                    onChange={(event) => setBio(event.target.value)}>
              </Input>
              <VisOpt state={[bioVis, setBioVis]}/>
            </ClassInput>
            <ClassInput>
              <P>ที่อยู่</P>
              <Input type="text" 
                    value={location} 
                    onChange={(event) => setLocation(event.target.value)}>
              </Input>
              <VisOpt state={[locationVis, setLocationVis]}/>
            </ClassInput>
            <ClassInput>
              <P>วันเกิด</P>
              <Input type="date" 
                    value={birthday} 
                    onChange={(event) => setBirthday(event.target.value)}>
              </Input>
              <VisOpt state={[birthdayVis, setBirthdayVis]}/>
            </ClassInput>
        </Main>
      </Div>
    </>;
}

const ClassImage = styled.div `

    height: 256px;
    position: relative;

    & > img:nth-child(1)
    {
        position: absolute; inset: 0px;
        outline: var(--app-bg-border-2);
        border: none;
        border-radius: 24px;
        background-color: var(--bg-secondary);

        object-fit: cover;
    }
    & > img:nth-child(2)
    {
        position: absolute; inset: 0px;
        outline: var(--app-bg-border-3);
        background-color: white;
        border-radius: 100%;
        margin: auto;

        object-fit: cover;
    }
`;
const ClassImageUpload = styled.div `
    display: flex; flex-direction: row;
    align-items: center; justify-content: center;
    gap: 12px;

    margin-top: var(--app-spacing-2);
    margin-bottom: var(--app-spacing-2);
`;

const ClassInput = styled.div `

    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    align-items: center;
    gap: 4px;

    margin-bottom: 4px;

    & > p,
    & > label
    {
        min-width: 128px;
        width: 256px;
        flex-grow: 1;
    }
    & > input
    {
      width: 100%;
      flex-grow: 2;
    }
`;