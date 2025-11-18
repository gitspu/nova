
import { Activity, useState } from 'react';
import icon from '../Script/Icon'
import './Style/Job.css'

const VIEW_SELECTION = 1;
const VIEW_CONTENT   = 2;

const Selection = ({stateView, statePost, stateSearch}) =>
{
    console.log (stateSearch);


    const [view, setView] = stateView;
    const [post, setPost] = statePost;
    const [search] = [null, null];


    const renderRecommend = () =>
    {
        const result = [];
        const sample = [
          {
              icon: '',
              title: 'Information',
              description: 'Very Good Description'
          },
          {
              icon: '',
              title: 'Lorem ipsum dolor sit amet',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et.'
          },
          {
              icon: '',
              title: 'Lorem ipsum dolor sit amet',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et.'
          },
          {
              icon: '',
              title: 'Lorem ipsum dolor sit amet',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et.'
          },
          {
              icon: '',
              title: 'Lorem ipsum dolor sit amet',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et.'
          }
        ];

        sample.map ((value, index) =>
        {
            if (search != null && search != '')
            {
                if (value.title.toLowerCase().startsWith (search.toLowerCase()) == false || value.title.toLowerCase().includes (search.toLowerCase()) == false) return <></>
            }
            result.push (<ListItem key={index} icon={null} title={value.title} description={value.description}/>)
        });
        return result;
    }


    return (
      <Container>
          <Title/>
          <Filter>
              <FilterItem text="ประเภทงาน"/>
              <FilterItem text="รายได้"/>
              <FilterItem text="แนะนำ"/>
          </Filter>
          <List>
              <ListTitle text="งานที่เหมาะกับคุณ"/>
              {renderRecommend()}
              <ListTitle text="เปิดรับสมัครอยู่"/>
              <ListItem icon={null} title="Lorem ipsum dolor sit amet" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et."/>
              <ListItem icon={null} title="Lorem ipsum dolor sit amet" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et."/>
              <ListItem icon={null} title="Lorem ipsum dolor sit amet" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et."/>
          </List>
      </Container>
    );

    function Container ({children})
    {
        return <div className='selection'  style={{ animationName: view == VIEW_SELECTION ? 'selection-enter' : 'selection-exit' }}>{children}</div>
    }
    function Title ()
    {
        return <h1 className="text-h1 text-bold mt-4 mb-4">ค้นหางาน</h1>
    }

    function Filter ({children})
    {
        return <div className='filter mt-4 mb-4'>{children}</div>
    }
    function FilterItem ({text})
    {
        return <button className='filter-item'>{text}</button>
    }

    function List ({children})
    {
        return <div className="list container-sm">{children}</div>
    }
    function ListItem ({icon, title, description})
    {
        return <button className='list-item button-primary button-outlined' onClick={() => setView(VIEW_CONTENT)}>
            <img className='image' src={icon} alt=""></img>
            <h5 className='title'>{title}</h5>
            <p className='description'>{description}</p>
        </button>
    }
    function ListTitle ({text})
    {
        return <h2 className="text-bold h4 mt-4 mb-4">{text}</h2>
    }
}
const Content = ({stateView, statePost}) =>
{
    const [view, setView] = stateView;
    const [post, setPost] = statePost;

    return (
      <div className='content' style={{ animationName: view == VIEW_CONTENT ? 'content-enter' : 'content-exit' }}>
        <div>
          <button className='mt-3 mb-3 button-primary button-outlined text-align-left' onClick={() => setView (VIEW_SELECTION)}>
            <label>
              <img src={icon.arrowLeftCircle}/>
              <span>ย้อนกลับ</span>
            </label>
          </button>
        </div>
        <div className='mb-2'>
          <img className='me-2' src={null} alt='' width={48} height={48}/>
          <label className='text-h3 text-bold'>[COMPANY NAME]</label>
        </div>
        <div className='mb-2'>
          <h2 className="text-h2 text-secondary text-normal m-0 mb-2">ข้อมูลงาน</h2>
        </div>
        <div className='my-3'>
          <h3 className='text-h2 text-bold'>เกี่ยวกับงาน</h3>
          <hr/>
          <p className='text-p'>[JOB DESCRIPTION]</p>
        </div>
        <div className='my-3'>
          <h3 className='text-h2 text-bold'>คุณสมบัติ</h3>
          <hr/>
          <p className='text-p'>[REQUIREMENT]</p>
        </div>
        <div className='my-3'>
          <h3 className='text-h2 text-bold'>ติดต่อ</h3>
          <hr/>
          <p className='text-p'>[CONTACT]</p>
        </div>
        <div>
          <button className='button-primary'>สมัครงาน</button>
        </div>
      </div>
    );
}

const Root = () =>
{
    const [view, setView] = useState (VIEW_SELECTION);
    const [post, setPost] = useState (0);

    return (
      <div className='page-job'>
        <Selection 
            stateView={[view, setView]}
            statePost={[post, setPost]}>
        </Selection>
        <Content
            stateView={[view, setView]}
            statePost={[post, setPost]}>
        </Content>
      </div>
    )
}

export default Root;
