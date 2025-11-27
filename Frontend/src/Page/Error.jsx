import { Button, Code, Div, H1, P, Span } from '../Component/Common'
import styled from 'styled-components'

const Background = styled.div `
  position: absolute;
  inset: 0;
  overflow: hidden;
  overflow-y: auto;

  background-color: var(--app-bg-1);
`;
const Viewport = styled.div `

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  align-items: center;
  gap: var(--app-spacing-1);

  margin: var(--app-spacing-1);
`;

const CodeBlock = styled(Code) `
  color: var(--app-text-caution);
  white-space: pre-wrap;
`

const Root = ({error, resetErrorBoundary }) =>
{
    let title = '';
    let message = '';

    title = '😥';
    message = 'มีอะไรบางอย่างทำงานไม่ถูกต้อง โปรดทำการลองรีเฟรชหน้าเพจใหม่อีกครั้ง';

    return (
      <Background>
        <Viewport>
          <H1>{title}</H1>
          <P>{message}</P>
          {
            error != null ? 
            <Span>
              <CodeBlock>{String (error['stack'] != undefined ? error.stack : error)}</CodeBlock>
            </Span>
            : <></>
          }
          <Button onClick={resetErrorBoundary}>ลองใหม่อีกครั้ง</Button>
        </Viewport>
      </Background>
    );
}
export default Root;