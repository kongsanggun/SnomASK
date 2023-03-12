import { useEffect, useState } from 'react';
import MessageHeader from '../compoment/messageHeader';
import Messages from '../compoment/messages';
import NoMessage from '../compoment/noMessage'
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
    
      async function init() {
        const messages = await getMessage();
        setMassage(messages);
    }
    
      useEffect(() => {
        init();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <div>
            <MessageHeader/>
            { massage.length === 0 ? <NoMessage/> : <Messages Data={massage}/> }
            <MessageInput/>
        </div>

    )
}
  
export default MessagePage;