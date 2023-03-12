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
            로그인 페이지입니다.
            <button onClick={()=> {navigate('/');}}> 돌아가기 </button>
            <div class="mb-6 w-100 px-6 h-auto flex flex-row items-start">
              <input type="text" name={input} value={input} onChange={inputOnChange} placeholder="비밀번호를 입력하세요" className="w-3/4 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
              <button onClick={login} className="ml-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">로그인</button>
            </div>
        </div>

    )
}
  
export default LoginPage;