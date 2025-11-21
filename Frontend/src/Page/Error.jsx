import './Style/Error.css'

const Root = () =>
{
    let title = '';
    let message = '';

    title = '😥';
    message = 'มีอะไรบางอย่างทำงานไม่ถูกต้อง';

    return (
        <div className='page-error'>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}
export default Root;