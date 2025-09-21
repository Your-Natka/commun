import { useEffect, useState } from "react";
import RegisterForm from "./components/RegisterForm";

const ws = new WebSocket("ws://localhost:8000/ws/1");

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  
  useEffect(() => {
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data).text]);
    };
  }, []);
  
  const sendMessage = () => {
    ws.send(JSON.stringify({ type: "message", to: 2, text: "Hello!" }));
  };

  return (
    <div className="p-4">
      <button className="bg-blue-500 text-white p-2 rounded" onClick={sendMessage}>
        Send
      </button>
      <RegisterForm />
      <div className="mt-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="border p-2 my-1">{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
