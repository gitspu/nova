import * as icon from '../Script/Icon'

import './Style/ProfilePost.css'

const Root = ({children}) =>
{
    return (
      <div className='profile-post'>
          {children}
      </div>
    );
}
Root.Head = ({icon, title, subtitle, onClick }) =>
{
    return (
      <div className='head'>
        <img className='image' src={icon} alt='' onClick={onClick}/>
        <div className='text'>
          <label className='title' onClick={onClick}>{title}</label>
          <label className='subtitle'>{subtitle}</label>
        </div>
      </div>
    );
}
Root.Body = ({children}) =>
{
    return (
      <div className="body">
        {children}
      </div>
    );
}
Root.Body.Text = ({value}) => 
{
    return (
      <p className="text">
        {value}
      </p>
    );
}
Root.Body.Image = ({value}) =>
{
    return (
      <img className="image" src={value}/>
    );
}
Root.Body.Video = ({value}) =>
{
    return (
      <video className="video" src={value} controls={true} controlsList='nodownload'/>
    );
}
Root.Body.Audio = ({value}) =>
{
    return (
      <audio className="audio" src={value} controls={true}/>
    );
}
Root.Action = ({children}) =>
{
    return (
      <div className='action'>
        {children}
      </div>
    );
}
Root.Action.Like = () => 
{
    return (
      <button className='button-primary button-outlined'>
        <label>
          <img src={icon.thumbUp} alt=''/>
          <span>ถูกใจ</span>
        </label>
      </button>
    );
}
Root.Action.Comment = () => 
{
    return (
      <button className='button-primary button-outlined'>
        <label>
          <img src={icon.chatSquare} alt=''/>
          <span>ความคิดเห็น</span>
        </label>
      </button>
    );
}
Root.Action.Share = () => 
{
    return (
      <button className='button-primary button-outlined'>
        <label>
          <img src={icon.share} alt=''/>
          <span>แชร์</span>
        </label>
      </button>
    );
}
Root.Action.Send = () => 
{
    return (
      <button className='button-primary button-outlined'>
        <label>
          <img src={icon.send} alt=''/>
          <span>ส่ง</span>
        </label>
      </button>
    );
}

export default Root;