import { useEffect, useState } from 'react';
import './App.css';

function App() {

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
  }, [])

  return (
    <><h1>get 테스트</h1><div>
      {messageTest(massage)}
    </div></>
  );
}

export default App;
