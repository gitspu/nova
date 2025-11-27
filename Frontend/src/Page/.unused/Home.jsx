/**
 * หน้าเว็บสำหรับ: หน้าแรก
*/
import React, { Activity, useEffect, useRef, useState } from "react";

import api from "../Script/Api";
import nav from '../Script/Navigator'
import icon from '../Script/Icon'

import Profile from '../Component/Profile'
import Menu from '../Component/MeunBar'

import './Style/Home.css'

const MENU_FEED       = 1; /* เมนูฟีด */
const MENU_SAVED_POST = 2; /* เมนูโพสต์ที่บันทึก */
const MENU_NEWS       = 3; /* เมนูข่าวสาร */
const MENU_EVENT      = 4; /* เมนูกิจกรรม */

/**
 * การแสดงผลเมนูฟีด 
*/
const MenuFeed = ({stateMenu}) =>
{
    const mounted = useRef (false);
    const post = useRef ([]);

    const [menu] = stateMenu;
    const [postIncremental, setPostIncremental] = useState (0);

    /**
     * ส่วนแสดงผล: โพสต์ใหม่
    */
    const DivNew = ({refPost, stateIncremental}) => 
    {
        const auth = api.auth;
        const profile = api.profile;
        const feed = api.feed;

        const post = refPost.current;
        const [incrmental, setIncremental] = stateIncremental;

        const [text, setText] = useState ('');
        const [upload, setUpload] = useState ([]);
        const [disabled, setDisabled] = useState (false);


        /**
         * คำสั่งที่ถูกเรียกเมื่อผู้ใช้ต้องการเสร็จสิ้นการแก้ไข และต้องการนำโพสต์เข้าสู่ระบบ
        */
        const onSubmit = (event) =>
        {
            event.preventDefault ();

            const data = new profile.DataPost ();

            data.created = new Date ();
            data.modified = new Date (undefined);

            if (text.length != 0) 
            {
                //
                // ดันข้อมูลข้อความเข้าไป
                //
                data.media.push ({
                    type:   Number (profile.MEDIA_TEXT),
                    value:  String (text)
                });
            }
            //
            // ดันข้อมูลอัพโหลดเข้าไป
            //
            for (const item of upload)
            {
                data.media.push (item);
            } 

            //
            // สร้างโพสต์นำเข้าระบบ
            //
            const postId = profile.createPost (data);
            //
            // ล้างข้อมูลโพสต์
            //
            setText ('');
            setUpload ([]);
            //
            // แทรกข้อมูลโพสต์ ทำให้โพสต์ที่สร้างขึ้นอยู่ด้านบนสุด
            //
            post.unshift ({
                type: feed.TYPE_NORMAL,
                owner: auth.getAccess (),
                index: postId
            });
            //
            // การเพิ่มตัวเลขจะทำให้ React ประมวณผล UI ใหม่อีกครั้ง
            //
            setIncremental (incrmental + 1);
        }
        /**
         * คำสั่งที่ถูกเรียกเมื่อผู้ใช้กำลังป้อนข้อความในช่องสร้างโพสต์
         * ระบบจะตรวจจับปุ่ม ENTER เพื่อใช้สำหรับส่งโพสต์
        */
        const onKeyDown = (event) =>
        {
            if  (event.key == 'Enter')
            {
                event.preventDefault ();
                event.stopPropagation ();

                onSubmit (event);
                return;
            }
        }
        /**
         * คำสั่งที่ถูกเรียกเมื่อผู้ใช้นำไฟล์ที่ต้องการแทรกให้กับโพสต์ที่กำลังสร้าง
        */
        const onUploadCreated = (event, type) =>
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
            setDisabled (true);

            reader.onerror = () =>
            {
                setDisabled (false);
            }
            reader.onloadend = () =>
            {
                setUpload (upload.concat (
                {
                    name: file.name,
                    type: type,
                    value: api.encodeContent (reader.result)
                }));
                setDisabled (false);
            }
            reader.readAsDataURL (file);
        }
        /**
         * คำสั่งที่ถูกเรียกเมื่อผู้ใช้ลบไฟล์ที่อัพโหลด
        */
        const onUploadDeleted = (event, index) =>
        {
            event.preventDefault ();
            event.stopPropagation ();

            setDisabled (true);
            setUpload (upload.filter ((value, key) => Number (key) !== Number (index)));
            setDisabled (false);      
        };

        return (
          <>
            <div className='new-text'>
              <input type='text' placeholder="เริ่มโพสต์" 
                     value={text} 
                     onChange={(event) => setText (event.target.value)} 
                     onKeyDown={onKeyDown}/>
              <button className='button-primary button-outlined' 
                      onClick={onSubmit} 
                      disabled={disabled || (text.length == 0 && upload.length == 0)}>
                <img src={icon.arrowRight}/>
              </button>
            </div>
            <div className='new-upload-list'>
              {upload.map ((value, index) => 
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
                      <button className="button-caution button-outlined" onClick={(event) => onUploadDeleted (event, key)}>
                        <label>
                          <img src={icon.xCircle}/>
                        </label>
                      </button>
                    </div>
                  );
              })}
            </div>
            <div className='new-upload-logic'>
              <input className='d-none' id='new-upload-image' accept="image/*" type='file' onChange={(event) => onUploadCreated (event, 2)}/>
              <input className='d-none' id='new-upload-video' accept="video/*" type='file' onChange={(event) => onUploadCreated (event, 3)}/>
            </div>
            <div className='new-upload'>
              <button className='button-primary' disabled={disabled}>
                <label htmlFor='new-upload-image'>
                  <img src={icon.arrowRight}/>
                  <span>รูปภาพ</span>
                </label>
              </button>
              <button className='button-primary' disabled={disabled}>
                <label htmlFor='new-upload-video'>
                  <img src={icon.fileEarmarkPlay}/>
                  <span>วิดีโอ</span>
                </label>
              </button>
              <button className='button-primary' disabled={disabled}>
                <label>
                  <img src={icon.calendar}/>
                  <span>เหตุการณ์</span>
                </label>
              </button>
              <button className='button-primary' disabled={disabled}>
                <label>
                  <img src={icon.backquoteLeft}/>
                  <span>บทความ</span>
                </label>
              </button>
            </div>
          </>
        );
    }
    /**
     * ส่วนแสดงผล: โพสต์ฟีด
    */
    const DivPost = ({refPost, stateIncremental}) => 
    {
        const post = refPost.current;
        const [postIncremental] = stateIncremental; 
        const [children, setChildren] = useState ([]); 

        //
        // ทำงานทุกครั้งที่ข้อมูลโพสต์มีการเปลี่ยนแปลง
        //
        useEffect (() =>
        {
            setChildren ([]);

            const newChildren = post.map ((value, index) =>
            {
                const auth = api.auth;
                const profile = api.profile;
                const profileOf = api.profileOf;
                const feed = api.feed;

                const dBasic     = auth.getBasic (value.owner);
                const dPersonal  = profileOf.getPersonal (value.owner);
                const dJob       = profileOf.getJob (value.owner);
                const dPost      = profileOf.getPost (value.owner, value.index);

                let icon = "";
                let title = "";
                let subtitle = "";

                icon = dPersonal.icon;
                title = [dPersonal.firstName, dPersonal.middleName, dPersonal.lastName].join (' ').trimEnd ();

                if (title == "") title = dPersonal.nickname;
                if (title == "") title = dBasic.name;
                if (title == "") title = "ชื่อถูกซ่อน";

                switch (value.type)
                {
                    case feed.TYPE_NORMAL:
                      subtitle = `${
                        (dJob.item.length) > 0 ?
                        (dJob.item[dJob.item.length - 1]).position : ''
                      }`;
                      if (subtitle != '')
                          subtitle += ` • ${dPost.created.toLocaleDateString ()}`
                      break;
                    case feed.TYPE_SPONSORED:
                      subtitle = 'ได้รับการสนับสนุน';
                      break;
                }

            
                const onClickProfile = () =>
                {
                    nav.profile (value.owner);
                }

                return (
                  <Profile.Post key={index}>
                  <Profile.Post.Head title={title} subtitle={subtitle} icon={api.decodeContent (icon)} onClick={onClickProfile}/>
                  <Profile.Post.Body>
                    {dPost.media.map ((value, index) => 
                    {
                        switch (value.type)
                        {
                            case profile.MEDIA_TEXT: 
                                return (<Profile.Post.Body.Text key={index} value={value.value}/>);
                            case profile.MEDIA_IMAGE: 
                                return (<Profile.Post.Body.Image key={index} value={api.decodeContent (value.value)}/>);
                            case profile.MEDIA_VIDEO: 
                                return (<Profile.Post.Body.Video key={index} value={api.decodeContent (value.value)}/>);
                            case profile.MEDIA_AUDIO: 
                                return (<Profile.Post.Body.Audio key={index} value={api.decodeContent (value.value)}/>);
                            default: 
                                return <span key={index}></span>
                        }
                    })}
                    </Profile.Post.Body>
                    <Profile.Post.Action>
                      <Profile.Post.Action.Like/>
                      <Profile.Post.Action.Comment/>
                      <Profile.Post.Action.Share/>
                      <Profile.Post.Action.Send/>
                    </Profile.Post.Action>
                  </Profile.Post>
                );
            });
            setChildren (newChildren);
            console.log ("Feed rendering finished");
        }, 
        [postIncremental, post]);

        return (
          <div className='post'>
            {children.length == 0 ? <p>กำลังโหลดโพสต์ กรุณารอสักครู่ ... </p> : <></>}
            {children}
          </div>
        );
    }

    //
    // ทำงานแค่ครั้งเดียว ตอนที่หน้าเว็บถูกโหลดขึ้นมา
    //
    useEffect (() =>
    {
        if (mounted.current)
            return;

        mounted.current = true;

        //
        // โหลดฟีดโพสต์
        //
        const feed = api.feed;
        const feedFetch = feed.getBody ();

        for (const item of feedFetch.item)
        {
            post.current.push ({
                type:   Number (item.type),
                owner:  Number (item.owner),
                index:  Number (item.index),
            });
        }
        setPostIncremental (postIncremental + 1);
        console.log ("Initial feed loaded");

        return () => { mounted.current = false; }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return (
      <Activity mode={menu == MENU_FEED ? 'visible' : 'hidden'}>
        <div className='feed'>
          <DivNew refPost={post} stateIncremental={[postIncremental, setPostIncremental]}/>
          <DivPost refPost={post} stateIncremental={[postIncremental, setPostIncremental]}/>
        </div>
      </Activity>
    );
}
/**
 * การแสดงผลเนื้อหาโพสต์ที่บันทึกไว้
*/
const MenuSaved = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    return (
      <div className={menu == MENU_SAVED_POST ? 'd-block' : 'd-none'}>
        <h1 className='text-h1 text-bold'>โพสต์บันทึก</h1>
      </div>
    );
}
/**
 * การแสดงผลเนื้อหาข่าวสาร
*/
const MenuNews = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    return (
      <div className={menu == MENU_NEWS ? 'd-block' : 'd-none'}>
        <h1 className='text-h1 text-bold'>ข่าวสาร</h1>
      </div>
    );
}
/**
 * กาารแสดงผลเนื้อหากิจกรรม
*/
const MenuEvent = ({stateMenu}) =>
{
    const [menu] = stateMenu;

    return (
      <div className={menu == MENU_EVENT ? 'd-block' : 'd-none'}>
        <h1 className='text-h1 text-bold'>กิจกรรม</h1>
      </div>
    );
}

/**
 * การแสดผลเนื้อหาหลัก
*/
const SectionMain = ({stateMenu}) =>
{
    return (
      <div className='main'>
        <MenuFeed stateMenu={stateMenu}/>
        <MenuSaved stateMenu={stateMenu}/>
        <MenuNews stateMenu={stateMenu}/>
        <MenuEvent stateMenu={stateMenu}/>
      </div>
    )
}

/**
 * การแสดงผลส่วนทางด้านซ่าย: เมนูนำทาง
 * ถ้าหน้าจอผู่ใช้ที่ขนาดเล็ก หน้าต่างนี้เป็นรูปแบบเต็มจอที่สามารถเรียกได้ผ่านปุ่มกด
*/
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
/**
 * การแสดงผลส่วนทางด้านขวา
*/
const SectionSidebar = () =>
{
    return (
      <div className='sidebar'>
        <div>
          <label className='fw-bold text-dark'>#ReactJS hits 100k commits</label>
          <label className='text-muted small'>Trending in Software • 5k posts</label>
        </div>
        <div>
          <label className='fw-bold text-dark'>AI Summit announces new date</label>
          <label className='text-muted small'>Trending in Tech • 2k posts</label>
        </div>
      </div>
    );
}

/**
 * พิ้นหลักในการแสดงผลหน้าหลัก
*/
const Root = () =>
{
    //
    // ตัวเลือกเมนูที่กำลังเลือกอยู่
    //
    const [menu, setMenu] = useState (1);

    //
    // แสดงผล
    //
    return (
      <div className='page-home'>
        <SectionMain stateMenu={[menu, setMenu]}/>
        <SectionNavigation stateMenu={[menu, setMenu]}/>
        <SectionSidebar stateMenu={[menu, setMenu]}/>
      </div>
    )
}
export default Root;