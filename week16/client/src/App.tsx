import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  const sendMessage = () => {
    if (!socket) return;

    const message = inputRef?.current?.value;
    console.log(message);
    
    //@ts-ignore
    socket.send(message)
  }

  useEffect(() => {
    fetch("http://localhost:3000/users");
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (e) => {
      alert(e.data);
    }
  }, [])


  return (
    <div className="">
      <input type="text" ref={inputRef} placeholder='Enter your message' />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
