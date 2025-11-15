import React, { useEffect, useState } from "react";

import * as api   from "../Script/Api";
import * as icon  from '../Script/Icon'

import { Input, Button, ButtonLabel } from "../Component/Common2";
import {PostContainer, PostHead, PostBody, PostAction, PostBodyText, PostBodyImage, PostBodyVideo, PostBodyAudio} from '../Component/ProfilePost'

import './Style/Home.css'

/**
 * หน้าเว็บสำหรับ: หน้าแรก
*/
export function Home ({inset})
{
    return <>
      <div className="page-home" style={{ inset: inset }}>
        <DivMain/>
        <DivNavigation/>
        <DivSidebar/>
      </div>
    </>


    function ElementLeft ()
    {
        return <div className="left mt-4 ms-4">
          <div>
            <Button type='list-vertical' icon={icon.house} text='หน้าหลัก'/>
            <Button type='list-vertical' icon={icon.sticky} text='บันทึกโพสต์'/>
            <Button type='list-vertical' icon={icon.people} text='กลุ่ม'/>
            <Button type='list-vertical' icon={icon.newspaper} text='ข่าวสาร'/>
            <Button type='list-vertical' icon={icon.calendar} text='กิจกรรม'/>
          </div>
        </div>
    }
    function ElementRight ()
    {
        return <div className="right mt-4 me-4">
          <div className="trending-news">
            <label className="h4">กำลังมาแรง</label>
            <div>
              <div>
                <label className="fw-bold text-dark">#ReactJS hits 100k commits</label>
                <label className="text-muted small">Trending in Software • 5k posts</label>
              </div>
              <div>
                <label className="fw-bold text-dark">AI Summit announces new date</label>
                <label className="text-muted small">Trending in Tech • 2k posts</label>
              </div>
            </div>
            <div>
              <label>เพิ่มเติม</label>
            </div>
          </div>
        </div>
    }
    function ElementMain ()
    {
        const [newText, setNewText]  = useState ("");
        const [newUpload, setNewUpload] = useState ([]);
        const [newUploadData, setNewUploadData] = useState ([]);

        const [postList, setPostList] = useState ([]);

        useEffect (() => {
            doRefresh ();
        });

        return <>
          <div className='main'>
            <div className="main-inner mt-4 ms-4 me-4">
              <div className="position-relative mb-2">
                  <input className='w-100' type='text' placeholder='เริ่มโพสต์' value={newText} onChange={(e) => setNewText (e.target.value)}/>
                  <Button className='position-absolute top-0 bottom-0 left-0' style={{ display: (newText.length != 0 || newUpload.length != 0) ? 'block' : 'none', right: '0px'}} icon={icon.send} click={(event) => onNewClick(event)}/>
              </div>
              <div className="mb-2">
                {newUpload}
              </div>
              <div className="d-flex flex-grow-1 w-100 mb-2">
                <span>
                  <input type="file" id="post-upload-image" accept="image/*" className="d-none" onChange={(event) => onNewUploadImage(event)}/>
                  <input type="file" id="post-upload-video" accept="video/*" className="d-none" onChange={(event) => onNewUploadVideo(event)}/>
                </span>
                <Button htmlFor='post-upload-image' className='flex-grow-1' layout='horizontal' icon={icon.image} text='รูปภาพ'/>
                <Button htmlFor='post-upload-video' className='flex-grow-1' layout='horizontal' icon={icon.fileEarmarkPlay} text='วิดีโอ'/>
                <Button className='flex-grow-1' layout='horizontal' icon={icon.calendar} text='เหตุการณ์'/>
                <Button className='flex-grow-1' layout='horizontal' icon={icon.backquoteLeft} text='บทความ'/>
              </div>
              <div className="d-flex flex-column gap-2">
                {postList}
              </div>
            </div>
          </div>
        </>;
        
        function onNewClick (event)
        {
            event.preventDefault ();

            const basic = api.auth.getBasic ();
            const personal = api.profile.getPersonal ();

            let title = [personal.firstName.value, personal.middleName.value, personal.lastName.value].join (' ');

            if (title == "") title = personal.nickname.value;
            if (title == "") title = basic.name;

            let subtitle = "เมื่อสักครู่นี้";
            let icon = personal.icon;

            setPostList ([
              <PostContainer key={0}>
                <PostHead icon={api.decodeContent (icon)} title={title} subtitle={subtitle}/>
                <PostBody>
                  {newText.length != 0 ? <PostBodyText key={1} value={newText}/> : <></>}
                  {newUploadData.map ((upload, index) => 
                  {
                      switch (upload.type)
                      {
                        case 2: return <PostBodyImage key={1 + index} value={api.decodeContent(upload.data)}/>
                        case 3: return <PostBodyVideo key={1 + index} value={api.decodeContent(upload.data)}/>
                      }
                      return <></>
                  })}
                </PostBody>
                <PostAction/>
              </PostContainer>,
              ... postList.map ((value, index) => 
              {
                  return React.cloneElement (value, {
                    key: 1 + index
                  });
              })
            ]);
            setNewText ("");
            setNewUpload ([]);
            setNewUploadData ([]);
        }
        function onNewUploadImage (event)
        {
            event.preventDefault ();

            const target = event.target;
            const file = target.files[0];

            if (file == null) { return; }

            var reader = new FileReader ();

            reader.onloadend = function ()
            {
                setNewUpload (newUpload.concat (<button key={newUpload.length} className="me-1 mb-1">{file.name}</button>));
                setNewUploadData (newUploadData.concat ({
                    type: 2,
                    data: api.encodeContent (reader.result)
                }))
            }
            reader.readAsDataURL (file);
        }
        function onNewUploadVideo (event)
        {
            event.preventDefault ();

            const target = event.target;
            const file = target.files[0];

            if (file == null) { return; }

            var reader = new FileReader ();

            reader.onloadend = function ()
            {
                setNewUpload (newUpload.concat (<button key={newUpload.length} className="me-1 mb-1">{file.name}</button>));
                setNewUploadData (newUploadData.concat ({
                    type: 3,
                    data: api.encodeContent (reader.result)
                }))
            }
            reader.readAsDataURL (file);

        }

        function doRefresh ()
        {
            console.log ("Feed Refreshed");
        }
    }
}


function DivNavigation ({inset})
{
    return <>
      <div className='navigation' style={{ inset: inset }}>
        <div>
            <Button type='list-vertical' icon={icon.house} text='หน้าหลัก'/>
            <Button type='list-vertical' icon={icon.sticky} text='บันทึกโพสต์'/>
            <Button type='list-vertical' icon={icon.people} text='กลุ่ม'/>
            <Button type='list-vertical' icon={icon.newspaper} text='ข่าวสาร'/>
            <Button type='list-vertical' icon={icon.calendar} text='กิจกรรม'/>
        </div>
      </div>
    </>

    function onNavigate (event)
    {
        event.preventDefault ();
    }
}
function DivMain ({inset})
{

    return <>
      <div className='main' style={{ inset: inset }}>
        <SectionUpload/>
        <SectionPost/>
      </div>
    </>

    function SectionUpload ()
    {
        const [text, setText] = useState ('');
        const [upload, setUpload] = useState ([]);
        const [uploadData, setUploadData] = useState ([]);

        return <>
          {/* ช่องสำหรับพิพม์ข้อความ และ ปุ่มกดสร้างโพสต์ */}
          <div className='new-text'>
            <Input type='text' placeholder="เริ่มโพสต์" value={[text, setText]} onKeydown={onKeydown}/>
            <Button type='submit' onClick={onSubmit} text="สร้าง" disabled={text.length == 0 && upload.length == 0}/>
          </div>
          {/* รายการไฟล์ที่อัพโหลด */}
          <div className="new-upload-list">
            {upload}
          </div>
          {/* ซ่อนไว้ (สำหรับเลือกไฟล์) */}
          <div className="new-upload-logic">
              <input className='d-none' id='new-upload-image' accept="image/*" type='file' onChange={(event) => onNewImage(event)}/>
              <input className='d-none' id='new-upload-video' accept="video/*" type='file' onChange={(event) => onNewVideo(event)}/>
            </div>
          {/* เมนูสำหรับอัพโหลดเพิ่มเติม (รูป, วิดีโอ, etc) */}
          <div className="new-upload">
            <ButtonLabel text='รูปภาพ' icon={icon.image} htmlFor='new-upload-image'/>
            <ButtonLabel text='วิดีโอ' icon={icon.fileEarmarkPlay} htmlFor='new-upload-video'/>
            <ButtonLabel text='เหตุการณ์' icon={icon.calendar}/>
            <ButtonLabel text='บทความ' icon={icon.backquoteLeft}/>
          </div>
        </>

        /**
         * คำสั่งที่ถูกเรียกเมื่อผู้ใช้ต้องการเสร็จสิ้นการแก้ไข และต้องการนำโพสต์เข้าสู่ระบบ
        */
        function onSubmit (event)
        {
            event.preventDefault ();

            const data = new api.profile.DataPost ();

            data.created = new Date();
            data.modified = new Date(undefined);

            if (text != '') 
            {
                data.media.push ({
                    type: 1,
                    value: text
                });
            }

            for (const up of uploadData)
            {
                data.media.push (up);
            }

            api.profile.createPost (data);

            setText ('');
            setUpload ([]);
            setUploadData ([]);
        }
        /**
         * คำสั่งที่ถูกเรียกเมื่อผู้ใช้กำลังป้อนข้อความในช่องสร้างโพสต์
         * ระบบจะตรวจจับปุ่ม ENTER เพื่อใช้สำหรับส่งโพสต์
        */
        function onKeydown (event)
        {
            if  (event.key == 'Enter')
            {
                event.preventDefault ();

                onSubmit (event);
                return;
            }
        }
        /**
         * คำสั่งที่ถูกเรียกเมื่อผู้ใช้นำรูปภาพแทรกให้กับโพสต์ที่กำลังสร้าง
        */
        function onNewImage (event)
        {
            event.preventDefault ();

            const reader = new FileReader ();
            const target = event.target;
            const file = target.files[0];

            // การเลือกอาจถูกยกเลิก
            if (file == null) { 
              return; 
            }

            event.target.value = "";

            reader.onloadend = function ()
            {
                setUpload (upload.concat (<div key={upload.length}>
                  <img src={icon.image}></img>
                  <label>{file.name}</label>
                </div>));
                setUploadData (uploadData.concat ({
                    type: 2,
                    value: api.encodeContent (reader.result)
                }))
            }
            reader.readAsDataURL (file);          
        }
        /**
         * คำสั่งที่ถูกเรียกเมื่อผู้ใช้นำวิดีโิแทรกให้กับโพสต์ที่กำลังสร้าง
        */
        function onNewVideo (event)
        {
            event.preventDefault ();

            const reader = new FileReader ();
            const target = event.target;
            const file = target.files[0];

            // การเลือกอาจถูกยกเลิก
            if (file == null) { 
              return; 
            }

            event.target.value = "";

            reader.onloadend = function ()
            {
                setUpload (upload.concat (<div key={upload.length}>
                  <img src={icon.fileEarmarkPlay}></img>
                  <label>{file.name}</label>
                </div>));
                setUploadData (uploadData.concat ({
                    type: 3,
                    value: api.encodeContent (reader.result)
                }))
            }
            reader.readAsDataURL (file);   
        }
        /**
         * คำสั่งสำหรับลบรายการที่อัพโหลดเข้าสู่ระบบ
        */
        function onRemoveUpload (event)
        {
            event.preventDefault ();
        }
    }
    function SectionPost ()
    {
        const [post, setPost] = useState ([]);

        useEffect (() =>
        {
            doRefresh ();
        }, 
        []);

        return <>
          <div className="post">
            {/* รายการโพสต์ */}
            {post}
          </div>
        </>

        function doRefresh ()
        {
            try
            {
                const newPost = [];
                const newItem = api.feed.get ();
                
                for (let index = 0; index < newItem.item.length; index ++)
                {
                    let icon = "";
                    let title = "";
                    let subtitle = "";
    
                    const item = newItem.item[index];
                    const personal = api.profileOf.getPersonal (item.profile);
                    const post = api.profileOf.getPost (item.profile, item.post);

                    icon = personal.icon;
                    title = [personal.firstName, personal.middleName, personal.lastName].join (' ').trimEnd ();

                    if (title == "") title = personal.nickname;
                    if (title == "") title = "ชื่อถูกซ่อน";

                    subtitle = post.created.toLocaleDateString ();

                    newPost.push (<PostContainer key={index}>
                      <PostHead title={title} subtitle={subtitle} icon={api.decodeContent (icon)}/>
                      <PostBody>
                        {post.media.map ((value) => 
                        {
                            if (value.type == 1)
                            {
                                return <PostBodyText value={value.value}/>
                            }
                            if (value.type == 2)
                            {
                                return <PostBodyImage value={api.decodeContent (value.value)}/>
                            }
                            if (value.type == 3)
                            {
                                return <PostBodyVideo value={api.decodeContent (value.value)}/>
                            }
                            if (value.type == 4)
                            {
                                return <PostBodyAudio value={api.decodeContent (value.value)}/>
                            }
                            return <></>;
                        })}
                      </PostBody>
                      <PostAction/>
                    </PostContainer>)
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
    }
}
function DivSidebar ({inset})
{
    return <>
      <div className="sidebar" style={{ inset: inset }}>
        <div>
        </div>
      </div>
    </>
}