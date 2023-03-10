import { useCallback, useState } from "react";

function MessageInput() {

  const [input, setinput] = useState('')

  const inputOnChange = useCallback(e => {
    setinput(e.target.value);
  },[]);

  async function messageSubmit(e) {
    if(input === '' || input === null) {
      alert('메시지를 입력하세요!');
      return;
    }

    try {
      let response = await fetch(`/message/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content : input
        }),
      });

      // TODO : 나중에는 새로고침 말고 리로드 하는 방식으로 바꿀 예정
      window.location.reload();
      return;
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div class="mb-6 w-100 px-6 h-auto flex flex-row items-start">
        <input type="text" name={input} value={input} onChange={inputOnChange} placeholder="메시지를 입력하세요" className="w-3/4 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
        <button onClick={messageSubmit} className="ml-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
  )
}

export default MessageInput;
