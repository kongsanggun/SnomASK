import { useEffect, useState, useCallback } from 'react';
import MessageHeader from '../compoment/messageHeader';

// TODO : 나중에 컴포먼트 별로 분리할 예정 데이터 import export 이슈가 있음

function MessagePage() {
    const [massage, setMassage] = useState([]);
    const [types, setTypes] = useState('');
    const [input, setinput] = useState('');
    const [terget, setTarget] = useState('');

    const inputOnChange = useCallback(e => {
      setinput(e.target.value);
    },[]);
  
    async function getMessage() {
        try {
          let response = await fetch(`/message`);
          const message = await response.json();
          return message;
        } catch (error) {
          console.log(error);
        }
    }

    async function messageSubmit(e) {
      if (terget === '' || input === null) {
        alert("메시지를 먼저 클릭하세요!");
        return;
      }

      try {
        let response = await fetch(`/message/response`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestId : types,
            content : input
          }),
        })

        // TODO : 나중에는 새로고침 말고 리로드 하는 방식으로 바꿀 예정
        window.location.reload();
        return;
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

    function reqmes(reqm) {

      return(
          <div className="bg-gray-200 rounded-md h-10 px-5 w-auto max-w-md flex items-center"> {reqm} </div>
      )
    }

    function resmes(resm) {
      return(
          <div className="bg-gray-400 rounded-md h-10 px-5 w-auto max-w-md flex items-center"> {resm} </div>
      )
    }

    function messages(tmp) {
      const result = tmp.map((item) => {
          if (item.type === "MEQ") {
              return (
                  <div className="my-6 h-10 w-full text-right flex justify-end">
                      {reqmes(item.content)}
                  </div>
                )
          }
          if (item.type === "REQ") {
            return (
                <div className="my-6 h-10 w-full text-left flex justify-start border border-red-30">
                    {resmes(item.content)}
                </div>
              )
          }
          return (
              <div className="my-6 h-10 w-full text-left flex justify-start" onClick={() => {setTypes(item.request_id); setTarget(item.content)}}>
                  {resmes(item.content)}
              </div>
            )
      })
      return result;
    }
      
    return (
        <div>
            <MessageHeader/>
            <div className="px-6 my-10 border-zinc-800 min-h-[600px] h-auto w-full rounded-sm">
                {messages(massage)}
            </div>
            <div class="mb-6 w-100 px-6 h-auto flex flex-row items-start">
              <div className="w-3/4 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md"> {terget} </div>
              <input type="text" name={input} value={input} onChange={inputOnChange} placeholder="답변을 입력하세요" className="w-3/4 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
              <button onClick={messageSubmit} className="ml-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">답변 전송</button>
            </div>
        </div>
    )
}
  
  export default MessagePage;