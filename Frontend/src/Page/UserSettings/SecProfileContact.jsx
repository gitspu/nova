
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
export function Start ({ref, visible = true})
{
    const mounted = useRef (false);

    const [ready,      setReady]      = useState (false);
    const [email,      setEmail]      = useState ("");
    const [emailVis,   setEmailVis]   = useState (0);
    const [website,    setWebsite]    = useState ("");        
    const [websiteVis, setWebsiteVis] = useState (0);
    const [phone,      setPhone]      = useState ("");
    const [phoneVis,   setPhoneVis]   = useState (0);

    const onLoad = () =>
    {
        const block = ref == null ? null : ref.current;

        if (block == null)
            return;

        setEmail (block.email.value);
        setEmailVis (block.email.visibility);
        setWebsite (block.website.value);
        setWebsiteVis (block.website.visibility);
        setPhone (block.phone.value);
        setPhoneVis (block.phone.visibility);
        setReady (true);
    }
    const onSave = () =>
    {
        const block = ref == null ? null : ref.current;

        if (block == null)
            return;
        if (ready == false)
            return;

        block.email.value = email;
        block.email.visibility = emailVis;
        block.website.value = website;
        block.website.visibility = websiteVis;
        block.phone.value = phone;
        block.phone.visibility = phoneVis;
    }
    useEffect (() => 
    { 
        if (mounted.current)
            return;

        mounted.current = true;
        onLoad(); 

        return () =>
        {
            mounted.current = false;
        }
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
            <H2 $variant='primary'>ข้อมูลติดต่อ</H2>
        </Header>
        <Main className="mb-3">
          <ClassInput>
            <P>อีเมล</P>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
            <VisOpt state={[emailVis, setEmailVis]}/>
          </ClassInput>
          <ClassInput>
            <P>เว็บไซต์</P>
            <Input type="text" value={website} onChange={(e) => setWebsite(e.target.value)}></Input>
            <VisOpt state={[websiteVis, setWebsiteVis]}/>
          </ClassInput>
          <ClassInput>
            <P>เบอร์โทรศัพท์</P>
            <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}></Input>
            <VisOpt state={[phoneVis, setPhoneVis]}/>
          </ClassInput>
        </Main>
      </Div>
    </>
}

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