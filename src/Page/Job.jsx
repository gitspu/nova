
import './Style/Job.css'

export function Job ()
{
    return <Container>
        <Title/>
        <Filter>
            <FilterItem text="ประเภทงาน"/>
            <FilterItem text="รายได้"/>
            <FilterItem text="แนะนำ"/>
        </Filter>
        <List>
            <ListTitle text="งานที่เหมาะกับคุณ"/>
            <ListItem icon={null} title="Information" description="Very Good Description"/>
            <ListItem icon={null} title="Lorem ipsum dolor sit amet" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et."/>
            <ListItem icon={null} title="Lorem ipsum dolor sit amet" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et."/>
            <ListTitle text="เปิดรับสมัครอยู่"/>
            <ListItem icon={null} title="Lorem ipsum dolor sit amet" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et."/>
            <ListItem icon={null} title="Lorem ipsum dolor sit amet" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et."/>
            <ListItem icon={null} title="Lorem ipsum dolor sit amet" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque risus est, sed lobortis velit scelerisque et."/>
        </List>
    </Container>

    function Container ({children})
    {
        return <div className="page-job container">{children}</div>
    }
    function Title ()
    {
        return <h3 className="mt-4 mb-4">ค้นหางาน</h3>
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
        return <button className='list-item'>
            <img className='image' src={icon} alt=""></img>
            <h5 className='title'>{title}</h5>
            <p className='description'>{description}</p>
        </button>
    }
    function ListTitle ({text})
    {
        return <h5 className="mt-4 mb-4">{text}</h5>
    }
}