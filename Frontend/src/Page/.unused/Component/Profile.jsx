import icon from '../Script/Icon'

import './Style/Profile.css'

const Post = ({children}) =>
{
    return (
      <div className='profile-post'>
          {children}
      </div>
    );
}
const PostHead = ({icon, title, subtitle, onClick }) =>
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
const PostBody = ({children}) =>
{
    return (
      <div className="body">
        {children}
      </div>
    );
}
const PostBodyText = ({value}) => 
{
    return (
      <p className="text">
        {value}
      </p>
    );
}
const PostBodyImage = ({value}) =>
{
    return (
      <img className="image" src={value}/>
    );
}
const PostBodyVideo = ({value}) =>
{
    return (
      <video className="video" src={value} controls={true} controlsList='nodownload'/>
    );
}
const PostBodyAudio = ({value}) =>
{
    return (
      <audio className="audio" src={value} controls={true}/>
    );
}
const PostAction = ({children}) =>
{
    return (
      <div className='action'>
        {children}
      </div>
    );
}
const PostActionLike = () => 
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
const PostActionComment = () => 
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
const PostActionShare = () => 
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
const PostActionSend = () => 
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

const Root = ({children}) => { return (<>{children}</>)}

Root.Post = Post;
Root.Post.Head = PostHead;
Root.Post.Body = PostBody;
Root.Post.Body.Text = PostBodyText;
Root.Post.Body.Image = PostBodyImage;
Root.Post.Body.Video = PostBodyVideo;
Root.Post.Body.Audio = PostBodyAudio;
Root.Post.Action = PostAction;
Root.Post.Action.Like = PostActionLike;
Root.Post.Action.Comment = PostActionComment;
Root.Post.Action.Share = PostActionShare;
Root.Post.Action.Send = PostActionSend;

export default Root;