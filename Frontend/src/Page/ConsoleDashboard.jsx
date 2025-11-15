
import './Style/ConsoleDashboard.css'

export function ConsoleDashboard ()
{
    return <>
      <Header/>
      <Grid>
        <GridText title="เข้าสู่ระบบ" value="0"/>
        <GridText title="สมัครสมาชิก" value="0"/>
      </Grid>
    </>
}

function Header ()
{
    return <>
      <div>
        <h1>แดชบอร์ด</h1>
        <p>มุมมองภาพรวมของระบบ สถานะการทำงานต่าง ๆ</p>
      </div>
    </>
}
function Grid ({children})
{
    return <>
      <div>{children}</div>
    </>
}
function GridText ({title = "", value = ""})
{
    return <>
      <label>{value}</label>
      <label>{title}</label>
    </>
}