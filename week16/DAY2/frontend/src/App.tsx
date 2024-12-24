import { useEffect, useRef, useState, FC } from 'react';

const App: FC = () => {
  const [messages, setMessages] = useState<string[]>(["hi", "hello"]);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const ws: WebSocket = new WebSocket("ws://localhost:8080");
    fetch("ws://localhost:8080");

    ws.onmessage = (event: MessageEvent) => {
      setMessages(m => [...m, event.data]);
    }

    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }));
    }

    return () => {
      ws.close();
    }

  }, []);

  return (
    <div className='h-screen bg-black'>
      <br /><br /><br />
      <div className='h-[85vh]'>
        {messages.map((message: string, index: number) => 
          <div key={index} className='bg-white text-black p-3 rounded-xl w-1/3 my-3'>{message}</div>
        )}
      </div>
      <div className='w-full bg-white flex'>
        <input id="message" ref={inputRef} className="flex-1 p-4" />
        <button
          onClick={() => {
            const message: string | undefined = inputRef.current?.value;
            if (wsRef.current && message) {
              wsRef.current.send(JSON.stringify({
                type: "chat",
                payload: {
                  message: message
                }
              }));
            }
          }}
          className='bg-purple-600 text-white p-4'>
          Send message
        </button>
      </div>
    </div>
  );
}

export default App;