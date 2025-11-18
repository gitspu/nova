/**
 * หน้าเว็บสำหรับ: หน้าแรก
*/
import React, { Activity, useEffect, useRef, useState } from "react";

import api from "../Script/Api";
import icon from '../Script/Icon'

import { Input, Button, ButtonLabel } from "../Component/Common2"

import Post from '../Component/ProfilePost'
import Menu from '../Component/MeunBar'

import './Style/Home.css'

const MENU_FEED       = 1;
const MENU_SAVED_POST = 2;
const MENU_NEWS       = 3;
const MENU_EVENT      = 4;

const SectionMainFeed = () =>
{
    const [newText, setNewText] = useState ('');
    const [newUpload, setNewUpload] = useState ([]);
    const [newUploadDisabled, setNewUploadDisabled] = useState (false);
    
    const initialized = useRef (false);
    const [post, setPost] = useState ([]);

    /**
     * คำสั่งที่ถูกเรียกเมื่อผู้ใช้ต้องการเสร็จสิ้นการแก้ไข และต้องการนำโพสต์เข้าสู่ระบบ
    */
    const onNewSubmit = (event) =>
    {
        event.preventDefault ();

        const data = new api.profile.DataPost ();

        data.created = new Date();
        data.modified = new Date(undefined);

        if (newText != '') 
        {
            data.media.push ({
                type: 1,
                value: newText
            });
        }

        for (const up of newUpload)
        {
            data.media.push (up);
        } 

        api.profile.createPost (data);

        setNewText ('');
        setNewUpload ([]);
    }
    /**
     * คำสั่งที่ถูกเรียกเมื่อผู้ใช้กำลังป้อนข้อความในช่องสร้างโพสต์
     * ระบบจะตรวจจับปุ่ม ENTER เพื่อใช้สำหรับส่งโพสต์
    */
    const onNewKeydown = (event) =>
    {
        if  (event.key == 'Enter')
        {
            event.preventDefault ();
            event.stopPropagation ();

            onNewSubmit (event);
            return;
        }
    }
    /**
     * คำสั่งที่ถูกเรียกเมื่อผู้ใช้นำไฟล์ที่ต้องการแทรกให้กับโพสต์ที่กำลังสร้าง
    */
    const onNewUploadCreated = (event, type) =>
    {
        event.preventDefault ();
        event.stopPropagation ();

        const reader = new FileReader ();
        const target = event.target;
        const file = target.files[0];

        event.target.value = "";
        
        // การเลือกอาจถูกยกเลิก
        if (file == null) 
        { 
            return; 
        }
        setNewUploadDisabled (true);

        reader.onerror = () =>
        {
            setNewUploadDisabled (false);
        }
        reader.onloadend = () =>
        {
            setNewUpload (newUpload.concat (
            {
                name: file.name,
                type: type,
                value: api.encodeContent (reader.result)
            }));
            setNewUploadDisabled (false);
        }
        reader.readAsDataURL (file);
    }
    /**
     * คำสั่งที่ถูกเรียกเมื่อผู้ใช้ลบไฟล์ที่อัพโหลด
    */
    const onNewUploadDeleted = (event, index) =>
    {
        event.preventDefault ();
        event.stopPropagation ();

        console.log (index, newUpload.length);

        setNewUploadDisabled (true);
        setNewUpload (newUpload.filter ((value, key) => Number (key) !== Number (index)));
        setNewUploadDisabled (false);      
    };

    function runPostGenerate (profileId = 0, postId = 0)
    {
        const basic     = api.auth.getBasic (profileId);
        const personal  = api.profileOf.getPersonal (profileId);
        const postItem  = api.profileOf.getPost (profileId, postId);

        let icon = "";
        let title = "";
        let subtitle = "";

        icon = personal.icon;
        title = [personal.firstName, personal.middleName, personal.lastName].join (' ').trimEnd ();

        if (title == "") title = personal.nickname;
        if (title == "") title = basic.name;
        if (title == "") title = "ชื่อถูกซ่อน";

        subtitle = postItem.created.toLocaleDateString ();

        return (
          <Post key={`${profileId}-${postId}`}>
          <Post.Head title={title} subtitle={subtitle} icon={api.decodeContent (icon)} access={profileId}/>
          <Post.Body>
            {postItem.media.map ((value, index) => 
            {
                switch (value.type)
                {
                    case 1: return (<Post.Body.Text key={index} value={value.value}/>);
                    case 2: return (<Post.Body.Image key={index} value={api.decodeContent (value.value)}/>);
                    case 3: return (<Post.Body.Video key={index} value={api.decodeContent (value.value)}/>);
                    case 4: return (<Post.Body.Audio key={index} value={api.decodeContent (value.value)}/>);
                    default: return <span key={index}></span>
                }
            })}
          </Post.Body>
          <Post.Action>
            <Post.Action.Like/>
            <Post.Action.Comment/>
            <Post.Action.Share/>
            <Post.Action.Send/>
          </Post.Action>
        </Post>
        );
    }
    function runPostRefresh ()
    {
        try
        {
            const newPost = [];
            const newItem = api.feed.get ();
            
            for (let index = 0; index < newItem.item.length; index ++)
            {
                const item = newItem.item[index];

                newPost.push (runPostGenerate (item.profile, item.post));
            }
            setPost (newPost);
        }
        catch (ex)
        {
            setPost (<p>
              เกิดข้อผิดพลาดในขณะโหลดข้อมูล<br/>
              {String (ex)}
            </p>)
        }
    }
    useEffect (() =>
    {
        if (initialized.current)
          return;

        runPostRefresh ();

        initialized.current = true;
    });

    return (
      <>
        {/* ช่องสำหรับพิพม์ข้อความ และ ปุ่มกดสร้างโพสต์ */}
        <div className='new-text'>
          <Input type='text' placeholder="เริ่มโพสต์" value={[newText, setNewText]} onKeydown={onNewKeydown}/>
          <button className='button-primary button-outlined' onClick={onNewSubmit} disabled={newUploadDisabled || (newText.length == 0 && newUpload.length == 0)}>
            <img src={icon.arrowRight}/>
          </button>
          {/* <Button type='submit' onClick={onNewSubmit} text="สร้าง" disabled={newText.length == 0 && newUpload.length == 0}/> */}
        </div>
        {/* รายการไฟล์ที่อัพโหลด */}
        <div className='new-upload-list'>
          {newUpload.map ((value, index) => 
          {
              const key = Number (index);
              const name = String (value.name);
              const type = Number (value.type);

              const image = type == 2 ? icon.image : 
                            type == 3 ? icon.fileEarmarkPlay : icon.transparent;

              return (
                <div key={key}>
                  <img src={image}></img>
                  <label>{name}</label>
                  <button className="button-caution button-outlined" onClick={(event) => onNewUploadDeleted(event, key)}>
                    <label>
                      <img src={icon.xCircle}/>
                    </label>
                  </button>
                </div>
              );
          })}
        </div>
        {/* ซ่อนไว้ (สำหรับเลือกไฟล์) */}
        <div className='new-upload-logic'>
            <input className='d-none' id='new-upload-image' accept="image/*" type='file' onChange={(event) => onNewUploadCreated(event, 2)}/>
            <input className='d-none' id='new-upload-video' accept="video/*" type='file' onChange={(event) => onNewUploadCreated(event, 3)}/>
          </div>
        {/* เมนูสำหรับอัพโหลดเพิ่มเติม (รูป, วิดีโอ, etc) */}
        <div className='new-upload'>
          <button className='button-primary' disabled={newUploadDisabled}>
            <label htmlFor='new-upload-image'>
              <img src={icon.arrowRight}/>
              <span>รูปภาพ</span>
            </label>
          </button>
          <button className='button-primary' disabled={newUploadDisabled}>
            <label htmlFor='new-upload-video'>
              <img src={icon.fileEarmarkPlay}/>
              <span>วิดีโอ</span>
            </label>
          </button>
          <button className='button-primary' disabled={newUploadDisabled}>
            <label>
              <img src={icon.calendar}/>
              <span>เหตุการณ์</span>
            </label>
          </button>
          <button className='button-primary' disabled={newUploadDisabled}>
            <label>
              <img src={icon.backquoteLeft}/>
              <span>บทความ</span>
            </label>
          </button>
        </div>
        {/* รายการโพสต์ */}
        <div className='post'>
          {post}
        </div>
      </>
    );
}
const SectionMainSaved = () =>
{
    return (
      <>
        <h1 className='text-h1 text-bold'>โพสต์บันทึก</h1>
      </>
    )
}
const SectionMainNews = () =>
{
    return (
      <>
        <h1 className='text-h1 text-bold'>ข่าวสาร</h1>
      </>
    )
}
const SectionMainEvent = () =>
{
    return (
      <>
        <h1 className='text-h1 text-bold'>กิจกรรม</h1>
      </>
    )
}
const SectionMain = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    return (
      <div className='main'>
        <Activity mode={menu == MENU_FEED ? 'visible' : 'hidden'}>
          <SectionMainFeed/>
        </Activity>
        <Activity mode={menu == MENU_SAVED_POST ? 'visible' : 'hidden'}>
          <SectionMainSaved/>
        </Activity>
        <Activity mode={menu == MENU_NEWS ? 'visible' : 'hidden'}>
          <SectionMainNews/>
        </Activity>
        <Activity mode={menu == MENU_EVENT ? 'visible' : 'hidden'}>
          <SectionMainEvent/>
        </Activity>
      </div>
    )
}

const SectionNavigation = ({stateMenu}) =>
{
    return (
      <div className='navigation'>
        <div>
          <Menu direction='vertical' state={stateMenu}>
            <Menu.Child state={MENU_FEED} icon={icon.house} text='หน้าหลัก'/>
            <Menu.Child state={MENU_SAVED_POST} icon={icon.sticky} text='โพสต์บันทึก'/>
            <Menu.Child state={MENU_NEWS} icon={icon.newspaper} text='ข่าวสาร'/>
            <Menu.Child state={MENU_EVENT} icon={icon.calendar} text='กิจกรรม'/>
          </Menu>
        </div>
      </div>
    );
}
const SectionSidebar = () =>
{
    return (
      <div className='sidebar'>
        <div>
          <label className="fw-bold text-dark">#ReactJS hits 100k commits</label>
          <label className="text-muted small">Trending in Software • 5k posts</label>
        </div>
        <div>
          <label className="fw-bold text-dark">AI Summit announces new date</label>
          <label className="text-muted small">Trending in Tech • 2k posts</label>
        </div>
      </div>
    );
}

const Root = () =>
{
    const [menu, setMenu] = useState (1);

    return (
      <div className='page-home'>
        <SectionMain stateMenu={[menu, setMenu]}/>
        <SectionNavigation stateMenu={[menu, setMenu]}/>
        <SectionSidebar/>
      </div>
    )
}
export default Root;