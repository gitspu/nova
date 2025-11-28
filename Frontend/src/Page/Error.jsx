/**
 * 
 * หน้าต่างแสดงข้อผิดพลาดของระบบ
 * 
*/
"use strict";
"use client";

/**
 * ส่วนประกอบทั้วไป
*/
import { Button, Code, H1, P, Span } from '../Component/Common'
/**
 * ตกแต่ง CSS
*/
import styled from 'styled-components'

/**
 * เริ่มต้นการแสดงผลหน้าต่าง ข้อผิดพลาด
*/
export default function Start ({error, resetErrorBoundary})
{
    let title = '';
    let message = '';

    title = '😥';
    message = 'มีอะไรบางอย่างทำงานไม่ถูกต้อง โปรดทำการลองรีเฟรชหน้าเพจใหม่อีกครั้ง';

    return <>
      <Background>
        <Viewport>
          <H1>{title}</H1>
          <P>{message}</P>
          {
            error != null && 
            <Span>
              <CodeBlock>{String (error['stack'] != undefined ? error.stack : error)}</CodeBlock>
            </Span>
          }
          <Button onClick={resetErrorBoundary}>ลองใหม่อีกครั้ง</Button>
        </Viewport>
      </Background>
    </>;
}

/**
 * พื้นหลังสุดของหน้าต่าง
*/
const Background = styled.div `

    position: absolute;
    inset: 0;
    overflow: hidden;
    overflow-y: auto;
  
    background-color: var(--app-bg-1);

`;
/**
 * พื้นที่ตรงกลางสำหรับการวางข้อความ
*/
const Viewport = styled.div `

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    align-items: center;
    gap: var(--app-spacing-1);

    margin: var(--app-spacing-1);

`;
/**
 * กล่องโค็ดข้อความสำหรับรายละเอียดความผิดพลาด
*/
const CodeBlock = styled(Code) `

    color: var(--app-text-caution);
    white-space: pre-wrap;

`;