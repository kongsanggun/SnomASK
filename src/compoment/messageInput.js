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
    <div class="mt-6 w-100 h-auto flex flex-row items-start bg-sky-50">
      <div class="my-6 w-[70vw] mx-[15vw] h-auto flex flex-row justify-between">
        <input type="text" name={input} value={input} onChange={inputOnChange} placeholder="메시지를 입력하세요" className="w-[78%] p-4 h-16 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-sky-500 focus:border-sky-500"/>
        <button onClick={messageSubmit} className="ml-10 h-16 text-gray-100 bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-light rounded-lg text-md px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">전송하기</button>
      </div>
    </div>
  )
}

export default MessageInput;
