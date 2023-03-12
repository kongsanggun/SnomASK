import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageHeader from '../compoment/messageHeader';

// TODO : 나중에 컴포먼트 별로 분리할 예정 데이터 import export 이슈가 있음

function MessagePage() {
  const navigate = useNavigate();

  const [massage, setMassage] = useState([]);
  const [types, setTypes] = useState('');
  const [input, setinput] = useState('');
  const [terget, setTarget] = useState('');

  const inputOnChange = useCallback((e) => {
    setinput(e.target.value);
  }, []);

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
      alert('메시지를 먼저 클릭하세요!');
      return;
    }

    try {
      let response = await fetch(`/message/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          requestId: types,
          content: input,
        }),
      });

      // TODO : 나중에는 새로고침 말고 리로드 하는 방식으로 바꿀 예정
      window.location.reload();
      return;
    } catch (error) {
      console.log(error);
    }
  }

  function findToken() {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }
  }

  async function init() {
    findToken();
    const messages = await getMessage();
    setMassage(messages);
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reqmes(reqm) {
    return(
        <div className="bg-sky-100 rounded-md h-10 px-5 w-auto max-w-md flex items-center border-2 border-sky-400 font-light"> {reqm} </div>
    )
}

function resmes(item) {
    if (item.type === "REQ") {
        return (
            <div className="bg-red-100 rounded-md h-10 px-5 w-auto max-w-md flex items-center border-2 border-red-400 font-light"> 
                {item.content}
            </div>
          )
    }
    return(
        <div className="bg-white rounded-md h-10 px-5 w-auto max-w-md flex items-center border-2 border-gray-400 font-light"> 
            {item.content} 
        </div>
    )
}

  function messages(tmp) {
    const result = tmp.map((item) => {
      if (item.type === 'MEQ') {
        return (
          <div className="my-6 flex h-10 w-full justify-end text-right">
            {reqmes(item.content)}
          </div>
        );
      }
      return (
        <div
          className="my-6 flex h-10 w-full justify-start text-left"
          onClick={() => {
            setTypes(item.request_id);
            setTarget(item.content);
          }}
        >
          {resmes(item)}
        </div>
      );
    });
    return result;
  }

  return (
    <div>
      <MessageHeader />
      <div className="mx-[15vw] mb-10 h-auto max-h-[95vh] min-h-[600px] w-[70vw]">
        {messages(massage)}
      </div>
      <div class="mt-6 w-100 h-auto flex flex-col items-start bg-sky-50">
        <div class="mt-6 mb-2 w-[70vw] mx-[15vw] h-[100%] flex flex-row justify-between">
          <div className="sm:text-md w-[100%] rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900" placeholder="답변">
            {terget === '' ? "답변할 질문" : terget}
          </div>
        </div>
        <div class="mb-6 w-[70vw] mx-[15vw] h-auto flex flex-row justify-between">
          <input type="text" name={input} value={input} onChange={inputOnChange} placeholder="메시지를 입력하세요" className="w-[78%] p-4 h-16 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-sky-500 focus:border-sky-500"/>
          <button onClick={messageSubmit} className="ml-10 h-16 text-gray-100 bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-light rounded-lg text-md px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">답변전송</button>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
