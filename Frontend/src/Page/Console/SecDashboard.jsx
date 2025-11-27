
// ==================================================================================================== //
//                                                                                                      //
// ENTRY POINT                                                                                          //
//                                                                                                      //
// ==================================================================================================== //

import { useEffect, useRef, useState } from "react";
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';

// import { Line } from 'react-chartjs-2'
import 
{ 
  H1, H2, 
  Header, Hr, Div, Main, P, Section, Span, Button, MenuBar, 
  Label,
  Img
} 
from "../../Component/Common";

import 
{
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} 
from 'recharts';

import icon from '../../Script/Icon'
import api from '../../Script/Api'
import styled from "styled-components";

export default Start;

function Start ({menu})
{
    return <StartResolve menu={menu}/>
}
function StartResolve ({menu})
{
    const SCALE_DAILY = 3600000;
    const SCALE_WEEKLY = 86400000;
    const SCALE_MONTHY = 2592000000;

    const mounted = useRef (false);
    const dataset = useRef (null);
    const visible = menu[0] == 1;

    const statusInterval = useRef (null);
    const [statusText, setStatusText] = useState ('');

    const [scale, setScale] = useState (SCALE_DAILY);
    const [range, setRange] = useState (SCALE_DAILY * 24);
    
    const [textLogin, setTextLogin] = useState ('-');
    const [textRegister, setTextRegister] = useState ('-');
    const [textPost, setTextPost] = useState ('-');
    const [textResume, setTextResume] = useState ('-');

    const [chartUsage, setChartUsage] = useState ([]);
    const [chartGrowth, setChartGrowth] = useState ([]);
    const [chartRole, setChartRole] = useState ([]);



    function onChangeScale (type)
    {
        switch (type)
        {
            case "daily":
                setRange (SCALE_DAILY * 24);
                setScale (SCALE_DAILY);
                break;
            case "weekly":
                setRange (SCALE_WEEKLY * 7);
                setScale (SCALE_WEEKLY);
                break;
            case "monthly":
                setRange (SCALE_MONTHY * 12);
                setScale (SCALE_MONTHY);
                break;
        }
    }
    function onLoadData ()
    {
        const analytics = api.analytics;
        const data = analytics.retrieve ();

        dataset.current = data;
    }
    function onLoadUI ()
    {
        if (dataset.current == null)
            return;

        const analytics = api.analytics;
        
        //
        // จับบบ ๆ และกรองข้อมูล
        //
        const captureLogin = analytics.capture (dataset.current, 
            ['authLogin', 'authLoginSession', 'authLoginFacebook' ], 
            scale, range
        );
        const captureRegister = analytics.capture (
            dataset.current, 
            ['authRegister', 'authRegisterFacebook' ], 
            scale, range
        );
        const capturePost = analytics.capture (
            dataset.current,
            ['jobPost'],
            scale, range
        );
        const captureResume = analytics.capture (
            dataset.current,
            ['jobResume'],
            scale, range
        );
        const thaiMonth = 
        [
          'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
          'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ]
        .reverse ();

        function renderText ()
        {
            setTextLogin (captureLogin.total);
            setTextRegister (captureRegister.total);
            setTextPost (capturePost.total);
            setTextResume (captureResume.total);
        }
        function renderGraphUsage ()
        {
            const usage = [];
            const now = new Date ();

            for (let index = 0; index < Math.ceil (range / scale); index ++)
            {
                let snapshot = "";

                switch (scale)
                {
                    case SCALE_DAILY: snapshot =  (new Date (now.getTime () - (scale * index)).toLocaleTimeString ()); break;
                    case SCALE_WEEKLY: snapshot = (new Date (now.getTime () - (scale * index)).toLocaleDateString ()); break;
                    case SCALE_MONTHY: snapshot = (thaiMonth[index]); break;
                }

                usage.push ({
                    snapshot: snapshot,
                    login: captureLogin.item[index],
                    register: captureRegister.item[index],
                    post: capturePost.item[index],
                    resume: captureResume.item[index],
                });
            }

            //
            // ข้อมูลใหม่ที่สุดจะอยู่อันดับแรกเสมอ ดังนั้นจึงต้องกลับหัวข้อมูล
            //
            setChartUsage (usage.reverse ());
        }
        function renderGraphGrowth ()
        {
            const growth = [];
            const now = new Date ();
            const start = Math.ceil (range / scale) - 1;

            let relativeLogin     = parseFloat (1 + captureLogin.item[start]);
            let relativeRegister  = parseFloat (1 + captureRegister.item[start]);
            let relativePost      = parseFloat (1 + capturePost.item[start]);
            let relativeResume    = parseFloat (1 + captureResume.item[start]);

            for (let index = start; index >= 0; index --)
            {
                let snapshot = "";

                switch (scale)
                {
                    case SCALE_DAILY: snapshot =  (new Date (now.getTime () - (scale * index)).toLocaleTimeString ()); break;
                    case SCALE_WEEKLY: snapshot = (new Date (now.getTime () - (scale * index)).toLocaleDateString ()); break;
                    case SCALE_MONTHY: snapshot = (thaiMonth[index]); break;
                }

                const currentLogin    = parseFloat (1 + captureLogin.item[index]);
                const currentRegister = parseFloat (1 + captureRegister.item[index]);
                const currentPost     = parseFloat (1 + capturePost.item[index]);
                const currentResume   = parseFloat (1 + captureResume.item[index]);

                const ratioLogin      = Math.max (0, 1 - (relativeLogin / currentLogin));
                const ratioRegister   = Math.max (0, 1 - (relativeRegister / currentRegister));
                const ratioPost       = Math.max (0, 1 - (relativePost / currentPost));
                const ratioResume     = Math.max (0, 1 - (relativeResume / currentResume));

                console.log (`${relativeLogin}/${currentLogin} = ${ratioLogin}`);

                relativeLogin         = relativeLogin + ratioLogin;
                relativeRegister      = relativeRegister + ratioRegister;
                relativePost          = relativePost + ratioPost;
                relativeResume        = relativeResume + ratioResume;

                const resultLogin     = Math.max(0, relativeLogin - 1);
                const resultRegister  = Math.max(0, relativeRegister - 1);
                const resultPost      = Math.max(0, relativePost - 1);
                const resultResume    = Math.max(0, relativeResume - 1);
                
                growth.push (
                {
                    snapshot: snapshot,
                    login: resultLogin.toFixed (2),
                    register: resultRegister.toFixed (2),
                    post: resultPost.toFixed (2),
                    resume: resultResume.toFixed (2),
                });
            }
            setChartGrowth (growth);
        }
        function renderGraphRole ()
        {
            const role = [];



            setChartRole (role);
        }

        renderText ();
        renderGraphUsage ();
        renderGraphGrowth ();
        renderGraphRole ();
    }
    function onRefresh ()
    {
        onLoadData ();
        onLoadUI ();

        setStatusText ('ข้อมูลถูกดึงใหม่เรียบร้อยแล้ว');

        clearInterval (statusInterval.current);
        statusInterval.current = setInterval (() =>
        {
            setStatusText ('');
        },
        5000);
    }

    useEffect (() =>
    {
        if (mounted.current)
            return;

        onLoadData ();
        onLoadUI ();

        return () => {
            mounted.current = false;
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    useEffect (() =>
    {
        onLoadUI ();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scale, range]);


    return <>
      <Div style={{ display: visible ? 'block' : 'none' }}>
        <Header className='mb-3'>
          <H1 $style='primary'>แดชบอร์ด</H1>
          <P $style='secondary'>ยินดีต้อนรับสู่หน้าต่างแผงควบคุมระบบ</P>
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
            <Button className='me-1 mb-2' onClick={onRefresh}>
              <Img src={icon.download}/>
              <Span>ส่งออกข้อมูล</Span>
            </Button>
            <Button className='me-1 mb-2' onClick={onRefresh}>
              <Img src={icon.arrowClockwise}/>
              <Span>โหลดข้อมูลใหม่</Span>
            </Button>
          </Section>
          <Section className='mb-2'>
            <MenuBar state={[scale, () => {}]} direction='horizontal' className='d-flex gap-2 justify-content-center'>
              <MenuBar.Child className='w-100' icon={icon.calendar} onClick={() => onChangeScale ('daily')} state={SCALE_DAILY} text='รายวัน'/>
              <MenuBar.Child className='w-100' icon={icon.calendar} onClick={() => onChangeScale ('weekly')} state={SCALE_WEEKLY} text='รายสัปดาห์'/>
              <MenuBar.Child className='w-100' icon={icon.calendar} onClick={() => onChangeScale ('monthly')} state={SCALE_MONTHY} text='รายเดือน'/>
            </MenuBar>
          </Section>
          <Section className='mb-2 d-flex justify-content-center'>
            <Text head='จำนวนเข้าสู่ระบบ' value={textLogin}/>
            <Text head='จำนวนสมัครสมาชิก' value={textRegister}/>
            <Text head='จำนวนโพสต์งาน' value={textPost}/>
            <Text head='จำนวนเรซูเม่' value={textResume}/>
          </Section>
          <Section className="mb-2">
            <Div className="mb-2">
              <Label $size="h2" $weight="bold">สถิติการใช้งาน</Label>
              <P $variant="secondary">แสดงข้อมูล 6 เดือนล่าสุด</P>
            </Div>
            <Div>
              <ChartLineUsage value={chartUsage}/>
            </Div>
          </Section>
          <Section>

          </Section>
          <Section className="mb-2">
            <Div className="mb-2">
              <Label $size="h2" $weight="bold">สถิติการเติบโต</Label>
              <P $variant="secondary">แสดงข้อมูล 6 เดือนล่าสุด</P>
            </Div>
            <Div>
              <ChartLineGrowth value={chartGrowth}/>
            </Div>
          </Section>
          <Section>
            <Div className="mb-2">
              <Label $size="h2" $weight="bold">ประเภทผู้ใช้งาน</Label>
              <P $variant="secondary">จำนวนผู้ใช้แต่ละประเภท</P>
            </Div>
            <Div>
              <ChartBar value={chartRole}/>
            </Div>
          </Section>
          <Section>
            <Div>
              <Div className="mb-2">
                <Label $size="h2" $weight="bold">งานยอดนิยม 5 อันดับ</Label>
                <P $variant="secondary">ตำแหน่งที่มีผู้สมัครมากที่สุด</P>
              </Div>
            </Div>
          </Section>
          <Section>
            <Div>
              <Div className="mb-2">
                <Label $size="h2" $weight="bold">เรซูเม่ยอดนิยม 5 อันดับ</Label>
                <P $variant="secondary">เรซูเม่ที่ดูมากที่สุด</P>
              </Div>
            </Div>
            <Div>

            </Div>
          </Section>
        </Main>
      </Div>
    </>;
}

// ==================================================================================================== //
//                                                                                                      //
// COMPONENT                                                                                            //
//                                                                                                      //
// ==================================================================================================== //

const TextBG = styled.div `
    width: 192px;
    height: 96px;
    display: inline-block;
    margin: var(--app-spacing-3);
    padding: var(--app-spacing-3);
    background-color: var(--app-bg-2);
    border: var(--app-bg-border-2);
    border-radius: var(--app-bg-radius-2);

    @media (max-width: 512px)
    {
        width: 96px;
        height: auto;
    }
`;
const TextHead = styled.label `
    font-size: var(--app-size-text);
    font-weight: bold;
    color: var(--app-text-1);
`;
const TextValue = styled.label `
    font-size: var(--app-size-h1);
    font-weight: bold;
    color: var(--app-text-2);
    text-align: center;
    width: 100%;
`;
const Text = ({head, value}) =>
{
    return <>
      <TextBG>
        <TextHead>{head}</TextHead>
        <Hr/>
        <TextValue>{value}</TextValue>
      </TextBG>
    </>;
}
const ChartLineUsage = ({value}) =>
{
    return <>
      <ResponsiveContainer width="100%" height={256}>
        <LineChart data={value}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="snapshot" 
            tick={{ fontSize: 12 }}
            stroke="#6c757d"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#6c757d"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e0e0e0',
              borderRadius: '8px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '16px' }}
          />
          <Line 
            type="monotone" 
            dataKey="login" 
            stroke="#0d6efd" 
            strokeWidth={3}
            name="เข้าสู่ระบบ" 
            dot={{ fill: '#0d6efd', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="register" 
            stroke="#fd790dff" 
            strokeWidth={3}
            name="สมัครสมาชิก" 
            dot={{ fill: '#fd790dff', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="post" 
            stroke="#bfab2bff" 
            strokeWidth={3}
            name="โพสต์งาน" 
            dot={{ fill: '#bfab2bff', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="resume" 
            stroke="#198754" 
            strokeWidth={3}
            name="เรซูเม่" 
            dot={{ fill: '#198754', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
}
const ChartLineGrowth = ({value}) =>
{
    return <>
      <ResponsiveContainer width="100%" height={256}>
        <LineChart data={value}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="snapshot" 
            tick={{ fontSize: 12 }}
            stroke="#6c757d"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#6c757d"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e0e0e0',
              borderRadius: '8px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '16px' }}
          />
          <Line 
            type="monotone" 
            dataKey="login" 
            stroke="#0d6efd" 
            strokeWidth={3}
            name="เข้าสู่ระบบ" 
            dot={{ fill: '#0d6efd', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="register" 
            stroke="#fd790dff" 
            strokeWidth={3}
            name="สมัครสมาชิก" 
            dot={{ fill: '#fd790dff', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="post" 
            stroke="#bfab2bff" 
            strokeWidth={3}
            name="โพสต์งาน" 
            dot={{ fill: '#bfab2bff', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="resume" 
            stroke="#198754" 
            strokeWidth={3}
            name="เรซูเม่" 
            dot={{ fill: '#198754', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
}
const ChartLine = ({value}) =>
{
    return <>
      <ResponsiveContainer width="100%" height={256}>
        <LineChart data={value}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            stroke="#6c757d"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#6c757d"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e0e0e0',
              borderRadius: '8px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
          />
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="#0d6efd" 
            strokeWidth={3}
            name="ผู้ใช้ใหม่" 
            dot={{ fill: '#0d6efd', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="resumes" 
            stroke="#198754" 
            strokeWidth={3}
            name="เรซูเม่ใหม่" 
            dot={{ fill: '#198754', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="jobs" 
            stroke="#0dcaf0" 
            strokeWidth={3}
            name="งานใหม่" 
            dot={{ fill: '#0dcaf0', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
}
const ChartBar = ({value}) =>
{
    return <>
      <ResponsiveContainer width="100%" height={256}>
        <BarChart data={value}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="type" 
            tick={{ fontSize: 12 }}
            stroke="#6c757d"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#6c757d"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e0e0e0',
              borderRadius: '8px'
            }}
          />
          <Bar 
            dataKey="count" 
            fill="#0d6efd" 
            radius={[8, 8, 0, 0]}
            name="จำนวน"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
}