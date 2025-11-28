/**
 * 
 * องค์ประกอบย่อยสำหรับการแสดงโปรไฟล์ของผู้ใช้ (ผู้หางาน)
 * เวอร์ชั่นที่ 2 (ธีมเริ่มต้นแบบปัจจุบัน)
 * 
*/
"use strict";
"use client";

/**
 * 
 * ส่วนประกอบจาก React
 * 
*/
import React, { useReducer, useState } from 'react';
/**
 * 
 * เชื่อมต่อกับ Bootstrap
 * 
*/
import 
{
    Toast,
    ToastContainer,
} 
from "react-bootstrap";

/**
 * 
 * เชื่อมต่อกับ Logic
 * 
*/
import api from '../../Script/Api'
import nav from '../../Script/Navigator'
import icon from '../../Script/Icon'
import { Div, H1, H2, Img, Input, Label, P, Span, Button, TextArea, Br, Hr } from '../../Component/Common';
import { Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import styled from 'styled-components';

/**
 * 
 * จุดเริ่มต้นของการแสดงผลองค์ประกอบ
 * 
*/
export default function Start ({oId, oLoading, rData})
{
    const auth = api.auth;
    const profile = api.profile;
    const profileOf = api.profileOf;

    /* eslint-disable no-unused-vars */

    let rBasic      = new auth.DataBasic ();
    let rContact    = new profileOf.DataContact ();
    let rEducation  = new profileOf.DataEducation ();
    let rInterest   = new profileOf.DataInterest ();
    let rJob        = new profileOf.DataJob ();
    let rLanguage   = new profileOf.DataLanguage ();
    let rPersonal   = new profileOf.DataPersonal ();
    let rSkill      = new profileOf.DataSkill ();
    let rSocial     = new profileOf.DataSocial ();
    let rTheme      = new profileOf.DataTheme ();
    let rEditable   = Boolean (rData.current.editable);

    rBasic       = rData.current.basic;
    rContact     = rData.current.contact;
    rEducation   = rData.current.education;
    rInterest    = rData.current.interest;
    rJob         = rData.current.job;
    rLanguage    = rData.current.language;
    rPersonal    = rData.current.personal;
    rSkill       = rData.current.skill;
    rSocial      = rData.current.social;
    rTheme       = rData.current.theme;


    const [forceUpdateIdx, forceUpdate] = useState (0);
    const [toast, setToast] = useState ({ show: false, msg: "", type: "success" });

    function onSaveVisibility (value)
    {
        let personal = new profile.DataPersonal ();

        console.log (`Switched: ${rPersonal.visibility} to ${value}`);

        profile.getPersonal ()
          .then ((x) => personal = x)
          .then (() => personal.visibility = value)
          .then (() => profile.setPersonal (personal))
          .then (() => { rPersonal.visibility = value; forceUpdate(forceUpdateIdx + 1); console.log ("DONE"); })
          .catch (() => alert ("ขออภัย ไม่สามารถเปลี่ยนระดับโปรไฟล์ได้"));
    }
    function onSaveHeader ()
    {
        let contact = new profile.DataContact ();
        let personal = new profile.DataPersonal ();

        return Promise.all ([
            profile.getContact ().then ((x) => contact = x),
            profile.getPersonal ().then ((x) => personal= x),
        ])
        .then (() =>
        {
            personal.icon = rPersonal.icon;
            personal.nickname.value = rPersonal.nickname;
            personal.nickname.visibility = profile.VISIBILITY_PUBLIC;

            personal.location.value = rPersonal.location;
            personal.location.visibility = profile.VISIBILITY_PUBLIC;

            contact.email.value = rContact.email;
            contact.email.visibility = profile.VISIBILITY_PUBLIC;

        })
        .then (() => profile.setContact (contact))
        .then (() => profile.setPersonal (personal));
    }
    function onSaveBio (data)
    {
        let personal = new profile.DataPersonal ();

        return profile.getPersonal ()
          .then ((x) => personal = x)
          .then (() => 
          {
              personal.bio.value = data;
              personal.bio.visibility = profile.VISIBILITY_PUBLIC;
          })
          .then (() => profile.setPersonal (personal))
          .then (() =>
          {
              rPersonal.bio = data;
              forceUpdate (forceUpdateIdx + 1);
          });
    }
    function onSaveJob (data)
    {
        let job = new profile.DataJob ();

        return profile.getJob ()
          .then ((x) => job = x)
          .then (() => 
          {
              job.history = data;
          })
          .then (() => profile.setJob (job))
          .then (() =>
          {
              rJob.history = data;
              forceUpdate (forceUpdateIdx + 1);
          });
    }
    function onSaveEdu (data)
    {
        let edu = new profile.DataEducation ();

        return profile.getEducation ()
          .then ((x) => edu = x)
          .then (() => 
          {
              edu.text = data;
          })
          .then (() => profile.setEducation (edu))
          .then (() =>
          {
              rEducation.text = data;
              forceUpdate (forceUpdateIdx + 1);
          })
          .catch (() => alert ("ขออภัย ไม่สามารถอัพเดทข้อมูลได้"));
    }
    function onSaveSkill (data)
    {
        let skill = new profile.DataSkill ();

        return profile.getSkill ()
          .then ((x) => skill = x)
          .then (() => 
          {
              skill.item = data;
              skill.visibility = profile.VISIBILITY_PUBLIC;
          })
          .then (() => profile.setSkill (skill))
          .then (() =>
          {
              rSkill.item = data;
              forceUpdate (forceUpdateIdx + 1);
          })
          .catch (() => alert ("ขออภัย ไม่สามารถอัพเดทข้อมูลได้"));
    }
    function onSaveLanguage (data)
    {
        let lang = new profile.DataLanguage ();

        return profile.getLanguage ()
          .then ((x) => lang = x)
          .then (() => 
          {
              lang.item = data;
              lang.visibility = profile.VISIBILITY_PUBLIC;
          })
          .then (() => profile.setLanguage (lang))
          .then (() =>
          {
              rLanguage.item = data;
              forceUpdate (forceUpdateIdx + 1);
          })
          .catch (() => alert ("ขออภัย ไม่สามารถอัพเดทข้อมูลได้"));
    }

    return <>
      <Div key={forceUpdateIdx} style={{ 
        position: 'absolute', 
        inset: '56px 0px 0px 0px', 
        overflowY: 'scroll',
        backgroundColor: 'var(--app-bg-1)',
      }}>

        <Div style={{ opacity: oLoading ? '0.5' : '1.0' }}>
  
          <Header oEditable={rEditable} oId={oId} rContact={rContact} rPersonal={rPersonal} cSave={onSaveHeader} sToast={[toast, setToast]}/>

            {/* เนื้อหาหลัก */}
            <Div className="container py-4">
              <Row>
                <Col lg={8}>                
                  <Div className='d-flex flex-column gap-1'>
                    {/* 1. ข้อมูลส่วนตัวโดยสรุป */}
                    <SectionEditable 
                      title='ข้อมูลส่วนตัวโดยสรุป' 
                      placeholder='เพิ่มข้อมูลส่วนตัวโดยสรุปในโปรไฟล์ของคุณ เพื่อแนะนำตัว'
                      data={[rPersonal.bio, (value) => onSaveBio (value)]}
                      datatype="string"
                      editable={rEditable}
                    />
                    {/* 2. ประวัติการทำงาน */}
                    <SectionEditable 
                      title='ประวัติการทำงาน' 
                      placeholder='เพิ่มข้อมูลของคุณเพื่อให้ผู้ประกอบการทราบถึงประสบการณ์และทำให้โปรไฟล์ของคุณโดดเด่นมากขึ้น'
                      data={[rJob.history, (value) => onSaveJob (value)]}
                      datatype="string"
                      editable={rEditable}
                    />
                    {/* 3. ข้อมูลการศึกษา */}
                    <SectionEditable 
                      title='ข้อมูลการศึกษา' 
                      placeholder='แจ้งผู้ประกอบการที่เกี่ยวข้องกับข้อมูลการศึกษาของคุณ'
                      data={[rEducation.text, (value) => onSaveEdu (value)]}
                      datatype="string"
                      editable={rEditable}
                    />
                    {/* 4. ทักษะ */}
                    <SectionEditable 
                      title='ทักษะ' 
                      placeholder='แจ้งผู้ประกอบการที่เกี่ยวข้องกับข้อมูลการศึกษาของคุณ'
                      data={[rSkill.item, (value) => onSaveSkill (value)]}
                      datatype="tag"
                      editable={rEditable}
                    />
                    {/* 5. ภาษา */}
                    <SectionEditable 
                      title='ภาษา' 
                      placeholder='เพิ่มภาษาเพื่อดึงดูดผู้สมัครและผู้ประกอบการให้มากขึ้น'
                      data={[rLanguage.item, (value) => onSaveLanguage (value)]}
                      datatype="tag"
                      editable={rEditable}
                    />
                  </Div>
                </Col>
                <Col>
                  <Div>
                    <P className='mb-1'>ระดับการเปิดโปรไฟล์</P>
                    <P key={forceUpdateIdx} className='mb-4' $weight='bold' style={{ color: 
                        rPersonal.visibility == profile.VISIBILITY_PUBLIC ? 'green' :
                        rPersonal.visibility == profile.VISIBILITY_RESTRICTED ? 'darkcyan' :
                        rPersonal.visibility == profile.VISIBILITY_PRIVATE ? 'red' : 'var(--ap-text-1)'
                     }}>
                      {
                        rPersonal.visibility == profile.VISIBILITY_PUBLIC ? 'สาธารณะ' :
                        rPersonal.visibility == profile.VISIBILITY_RESTRICTED ? 'จำกัด' :
                        rPersonal.visibility == profile.VISIBILITY_PRIVATE ? 'ส่วนตัว' : ''
                      }
                    </P>
                  </Div>
                  <Div className={rEditable ? 'd-block' : 'd-none'}>
                    <DropdownButton title="เปลี่ยนระดับ" variant="success" className='x-dropdown-full'>
                      <Dropdown.Item onClick={() => onSaveVisibility (profile.VISIBILITY_PUBLIC)}>สาธารณะ</Dropdown.Item>
                      <Dropdown.Item onClick={() => onSaveVisibility (profile.VISIBILITY_RESTRICTED)}>จำกัด</Dropdown.Item>
                      <Dropdown.Item onClick={() => onSaveVisibility (profile.VISIBILITY_PRIVATE)}>ส่วนตัว</Dropdown.Item>
                    </DropdownButton>
                  </Div>
                  <Div>
                    <Hr className='w-100 mt-4 mb-4'/>
                  </Div>
                  <Div>
                    <P><strong>สาธารณะ:</strong> ทุกคนสามารถค้นหาและดูโปรไฟล์ของคุณ</P>
                    <P><strong>จำกัด:</strong> เฉพาะผู้ใช้ที่ลงทะเบียนและมีบัญชีเท่านั้นที่ดูได้</P>
                    <P><strong>ส่วนตัว:</strong> มีเพียงคุณเท่านั้นที่สามารถดูโปรไฟล์นี้ได้</P>
                  </Div>
                </Col>
              </Row>
            </Div>
        </Div>
      </Div>
      {/* Toast Notification (แจ้งเตือน) */}
      <ToastContainer position="bottom-center" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          bg={toast.type === "success" ? "success" : "secondary"}
          delay={2500}
          autohide
          className="text-white fw-bold shadow-sm">
          <Toast.Body>{toast.msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
}

export function Header ({oEditable, oId, rPersonal, rContact, cSave, sToast })
{
    const [edit, setEdit] = useState (false);
    const [image, setImage] = useState (api.decodeContent (rPersonal.icon));
    const [username, setUsername] = useState (rPersonal.nickname);
    const [location, setLocation] = useState (rPersonal.location);
    const [email, setEmail] = useState (rContact.email);
    const [disabled, setDisabled] = useState (false);
    const [updateIdx, update] = useReducer (x => x + 1);
    const [toast, setToast] = sToast;

    function onIconChange (event)
    {
        event.preventDefault ();

        const target = event.target;
        const file = target.files[0];
        const reader = new FileReader ();

        if (file == null) { return; }

        setDisabled (true);
        
        reader.onloadend = function ()
        {
            setImage (reader.result);
            setDisabled (false);
            update ();
            return;
        }
        reader.readAsDataURL (file);
    }

    function onClickSave (event)
    {
        rPersonal.icon = api.encodeContent (image);
        rPersonal.nickname = username;
        rPersonal.location = location;
        rContact.email = email;

        setDisabled (true);
        cSave ().then (() =>
        {
            setEdit (false);  
            setDisabled (false);
        })
        .catch ((except) =>
        {
            console.error (except);
            alert ("เกิดข้อผิดพลาดในขณะที่บันทึกข้อมูลของคุณ");

            setEdit (true);  
            setDisabled (false);
        });
    }
    function onClickDiscard (event)
    {
        setImage (api.decodeContent (rPersonal.icon));
        setUsername (rPersonal.nickname);
        setLocation (rPersonal.location);
        setEmail (rContact.email);

        setEdit (false);
    }
    function onClickEdit (event)
    {
        setEdit (true);
    }
    function onClickShare ()
    {
        const url = window.location.hostname;
        const pathname = `/user-profile?id=${oId}`;

        try
        {
            //
            // วางคลิปบอร์ด (ลิงค์) ให้กับผู้ใช้
            //
            navigator.clipboard.writeText (`${url}${pathname}`)
                .then (() => setToast ({ show: true, msg: "คัดลอกลิงค์แชร์เรียบร้อยแล้ว", type: "success" }))
                .catch (() => setToast ({ show: true, msg: "ขออภัย เราไม่สามารถคัดลอกลิงค์แชร์ได้", type: "danger" }));
        }
        catch (ex)
        {
            console.error (ex);

            //
            // ปกติแล้วไม่น่าจะเกิดขึ้น
            //
            setToast ({ show: true, msg: "ขออภัย เราไม่สามารถคัดลอกลิงค์แชร์ได้", type: "danger" })
        }
    }
    return <>
      {/* ส่วนหัว: เปลี่ยนสีพื้นหลังเป็นเขียวอ่อนและลบเส้นขอบสีชมพู */}
      <Div key={updateIdx} className='p-4 mb-4 shadow-sm' style={{
        /* เปลี่ยนเป็นสีดำ */
        backgroundColor: '#C8E6C9', 
        color: 'black',
        height: '204px'
      }}>
        <Container >
          <Div className='d-flex gap-4'>
            <Div className='position-relative'>
              <Img src={image} width={96} height={96} style={{
                  backgroundColor: 'darkgrey',
                  outline: 'var(--app-bg-border-2)',
                  border: 'none',
                  borderRadius: '100%',
                  objectFit: 'cover'
              }}/>
              <Input 
                type='file' 
                id='profile-upload' 
                accept='image/*'
                className='d-none'
                onChange={onIconChange}>
              </Input>
              <Div style={{
                position: 'absolute',
                inset: '0',
                lineHeight: '96px',
                width: '96px', height: '96px'
              }}>
                <Label 
                  htmlFor='profile-upload'
                  style={{ 
                    cursor: 'pointer',
                    textAlign: 'center',
                    display: edit ? 'block' : 'none',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  {(image != "" && image != null) ? "" : "เลือกรูป"}
                </Label>
              </Div>
            </Div>
            <Div className={edit ? 'd-none' : 'd-block'}>
              <H1 className='mb-2'>{(username == "") ? "ไม่ระบุชื่อ" : username}</H1>
              <Div className='mb-1'>
                <Img src={icon.location} width={24} className='me-2'/>
                <Label>{(location == "") ? "ไม่ระบุที่อยู่" : location}</Label>
              </Div>
              <Div className='mb-2'>
                <Img src={icon.briefcase} width={24} className='me-2'/>
                <Label>{(email == "") ? "ไม่ระบุอีเมล" : email}</Label>
              </Div>
              <Div>
                {
                  oEditable && <Button className='me-1' onClick={onClickEdit} style={{ width: '96px' }}>
                    <Img src={icon.pencil}/>
                    <Span>แก้ไข</Span>
                  </Button>
                }
                <Button onClick={onClickShare} style={{ width: '96px' }}>
                  <Img src={icon.share}/>
                  <Span>แชร์</Span>
                </Button>

              </Div>
            </Div>
            <Div style={{
              visibility: edit ? 'visible' : 'collapse',
              pointerEvents: edit ? 'all' : 'none',
              backgroundColor: 'var(--app-bg-3)',
              border: 'var(--app-bg-border-2)',
              borderRadius: 'var(--app-bg-radius-3)',
              padding: 'var(--app-spacing-2)',
              width: '324px',
              minHeight: '256px',
              zIndex: 100,
              position: 'absolute',
              marginLeft: '128px',
            }}>
              <H2 className='mb-4'>แก้ไขข้อมูลส่วนตัว</H2>
              <Div className='mb-2'>
                <P className='mb-1'>ชื่อ</P>
                <Input className='w-100' value={username} onChange={(event) => setUsername (event.target.value)} disabled={disabled}/>
              </Div>
              <Div className='mb-2'>
                <P className='mb-1'>ที่อยู่</P>
                <Input className='w-100' value={location} onChange={(event) => setLocation (event.target.value)} disabled={disabled}/>
              </Div>
              <Div className='mb-2'>
                <P className='mb-1'>อีเมล</P>
                <Input className='w-100' value={email} onChange={(event) => setEmail (event.target.value)} disabled={disabled}/>
              </Div>
              <Div className='mt-4 d-flex justify-content-end gap-2'>
                <Button $variant="caution" onClick={onClickDiscard} disabled={disabled}>ยกเลิก</Button>
                <Button $variant="primary" onClick={onClickSave} disabled={disabled}>บันทึก</Button>
              </Div>
            </Div>
          </Div>
        </Container>
      </Div>
    </>
}

function SectionEditable ({title, placeholder, data, datatype, editable })
{
    let [content, setContent] = data != null ? data : [null, () => {}];

    const [last, setLast] = useState (content);
    const [value, setValue] = useState (content);
    const [edit, setEdit] = useState (false);
    const [disabled, setDisabled] = useState (false);
    const [, forceUpdate] = useReducer (x => x + 1);

    function onClickCancel ()
    {
        setValue (last);
        setEdit (false);
    }
    function onClickEdit ()
    {
        if (datatype == "tag" && isEmpty ())
            setValue ([""]);

        setEdit (true);
    }
    function onClickSave ()
    {
        setDisabled (true);

        setContent (value).then (() =>
        {
            setLast (value);
            setDisabled (false);
            setEdit (false);
        })
        .catch ((except) =>
        {
            console.error (except);
            alert ("เกิดข้อผิดพลาดในขณะที่บันทึกข้อมูลของคุณ");

            setDisabled (false);
        });
    }

    function renderString ()
    {
        if (edit == false)
            return <P>{value}</P>

        return <>
          <TextArea type='text' 
                  placeholder={placeholder} 
                  className='w-100'
                  value={value}
                  onChange={(event) => setValue (event.target.value)}
                  disabled={disabled}
                  style={{ height: '256px' }}>
          </TextArea>
        </>
    }
    function renderArray ()
    {
        if (value == null)
            return <></>;

        function add ()
        {
            setValue ([... value, ""]);
        }
        function remove (index)
        {
            setValue (value.filter ((value, target) => target !== index));
        }


        return <>
          <Div>   
            <Div className='d-flex gap-1' style={{ flexWrap: 'wrap' }}>
              {value.map ((data, index) => 
              {
                  return <Div key={index} className={`d-flex align-items-center`}>
                    <TagButton key={index} value={data} placeholder='ชื่อแท็ก' onChange={(event) => {
                      value[index] = event.target.value;

                      setValue (structuredClone (value));
                    }} 
                    disabled={disabled} readOnly={!edit}/>
                    {edit &&
                      <Button disabled={disabled} className='ms-2' $variant='outlined' style={{ padding: 0}} onClick={() => remove(index)}>
                        <Img style={{ padding: '8px' }} src={icon.xCircle} height={32}/>
                      </Button>
                    }
                  </Div>
              })}
            </Div>         
            {edit && <>
              <Div className='mt-2 mb-2'>
                <Button disabled={disabled} $variant="outlined" style={{ padding: '4px 24px 4px 12px' }} onClick={() => add()}>
                  <Img src={icon.plusCircle} height={32}/>
                  <Span>เพิ่ม</Span>
                </Button>
              </Div>
            </>}
          </Div>
        </>
    }
    function isEmpty ()
    {
        if (value == null)
            return true;

        switch (datatype)
        {
            case "string": return value.length == 0;
            case "tag": return value.length == 0;
        }
        return true;
    }

    return <>
      <Div style={{
        backgroundColor: 'var(--app-bg-2)',
        border: 'var(--app-bg-border-2)',
        borderRadius: 'var(--app-bg-radius-2)',
        padding: 'var(--app-spacing-2)'
      }}>
        <H2 className='mb-2'>{title}</H2>
        <Div className='mt-2 mb-2'>
          { (!edit && isEmpty ()) && <P>{placeholder}</P> }
          {(datatype == "string") && renderString ()}
          {(datatype == "tag") && renderArray ()}
        </Div>
        { (!edit && editable) && (
          <>
            <Button disabled={disabled} className='me-2' $variant="primary" style={{ width: '96px' }} onClick={onClickEdit}>
              {isEmpty () ? (
                <>
                  <Img src={icon.plusCircle}/>
                  <Span>เพิ่ม</Span>
                </>
              ) : (<>
                  <Img src={icon.pencil}/>
                  <Span>แก้ไข  </Span>
              </>)}
            </Button>
          </>
        )}
        { (edit && editable) && (
          <>
            <Button disabled={disabled} className='me-2' $variant="primary" style={{ width: '96px' }} onClick={onClickSave}>เรียบร้อย</Button>
            <Button disabled={disabled} className='me-2' $variant="caution" style={{ width: '96px' }} onClick={onClickCancel}>ยกเลิก</Button>
          </>
        )}
      </Div>
    </> 
}

const TagButton = styled.input `

  background-color: #72cbafff;
  border: var(--app-bg-border-2);
  border-radius: var(--app-bg-radius-2);
  outline: none;
  color: var(--app-text-1);
  padding: 4px 12px;

  min-width: 96px;
`;