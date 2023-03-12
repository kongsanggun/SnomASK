import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageHeader from '../compoment/messageHeader';

function LoginPage() { 
    const navigate = useNavigate();

    const [input, setinput] = useState('');

    const inputOnChange = useCallback(e => {
      setinput(e.target.value);
    },[]);

    async function login(e) {
        if (input === null) {
            alert("비밀번호를 입력하세요!");
            return;
        }

        try {
            let response = await fetch(`/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                password : input
              }),
            })

            if (response.status === 400 || response.status === 403 || response.status === 404) throw new Error('404 is unacceptable for me!');
            let resJSON = await response.json();
            if (!response.ok) {
              throw Error(resJSON.message);
            }
    
            localStorage.setItem('token', resJSON.token);
            navigate('/snom');
      
          } catch (e) {
            alert("로그인 실패");
          }
    }

    useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <MessageHeader/>
            <div className="mx-[15vw] mt-6 mb-10 h-auto w-[70vw] flex justify-between">
              <div> 로그인 페이지입니다. </div>
              <button className="h-8 text-gray-100 bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-light rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> {navigate('/');}}> 돌아가기 </button>
            </div>
            <div className='mt-6 w-100 h-auto flex flex-row items-start bg-sky-50'>
              <div class="my-6 w-[70vw] mx-[15vw] h-auto flex flex-row justify-between">
                <input type="password" name={input} value={input} onChange={inputOnChange} placeholder="비밀번호를 입력하세요" className="w-3/4 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
                <button onClick={login} className="ml-10 h-16 text-gray-100 bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-light rounded-lg text-md px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">로그인</button>
              </div>
            </div>
        </div>

    )
}
  
export default LoginPage;