import './Style/ProfilePost.css'
import { ButtonOld } from "./Common";
import * as icon from '../Script/Icon'
import { ButtonLabel } from './Common2';

export function PostContainer ({children})
{
    return <div className="component-profilepost">{children}</div>
}
export function PostHead ({
    icon = null, 
    title = "", 
    subtitle = ""
})
{
    return <div className="head">
        <img className='head-image' src={icon} alt=''/>
        <div>
            <label className='head-title'>{title}</label>
            <label className='head-subtitle'>{subtitle}</label>
        </div>
    </div>
}
export function PostBody ({children})
{
    return <div className="body">{children}</div>
}
export function PostBodyText ({value})
{
    return <p className="body-text">{value}</p>
}
export function PostBodyImage ({value})
{
    return <img className="body-image" src={value}/>
}
export function PostBodyAudio ({value})
{
    return <audio className="body-audio" src={value} controls={true}/>
}
export function PostBodyVideo ({value})
{
    return <video className="body-video" src={value} controls={true} controlsList='nodownload'/>
}
export function PostAction ()
{
    return <div className="action">
        <ButtonLabel icon={icon.thumbUp} text='ถูกใจ'/>
        <ButtonLabel icon={icon.chatSquare} text='ความคิดเห็น'/>
        <ButtonLabel icon={icon.share} text='แชร์'/>
        <ButtonLabel icon={icon.send} text='ส่ง'/>
    </div>
}