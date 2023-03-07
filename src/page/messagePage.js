import { useEffect, useState } from 'react';
import MessageHeader from '../compoment/messageHeader';
import MessageInput from '../compoment/messageInput';

function MessagePage() {
    const [massage, setMassage] = useState([]);

    async function getMessage() {
        try {
          let response = await fetch(`/message`);
          const message = await response.json();
          return message;
        } catch (error) {
          console.log(error);
        }
      }
    
      function messageTest(tmp) {
        const result = tmp.map((item) => {
          return (
            <div>{item.content}</div>
          )
        })
        return result;
      }
    
      async function init() {
        const messages = await getMessage();
        setMassage(messages);
    }
    
      useEffect(() => {
        init();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <body>
            <MessageHeader/>
            
            <div>
                <div>
                {messageTest(massage)}
                </div>
            </div>

            <MessageInput/>
        </body>

    )
}
  
  export default MessagePage;