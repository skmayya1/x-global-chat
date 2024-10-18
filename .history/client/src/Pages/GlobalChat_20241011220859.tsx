import { useContext, useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import SocketContext from "../Context/SocketProvider";

const GlobalChat = () => {
  const [message, setMessage] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { memberCount, sendMessage, data, socketID } = useContext(SocketContext) || {};

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendMessage) {
      sendMessage(message);
    }
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      <header className="flex flex-col items-center justify-center py-4 border-b border-zinc-800">
        <h1 className="font-mono text-lg">GLOBAL CHAT</h1>
        <span className="text-xs font-mono font-extralight border border-green-400 text-green-400 bg-green-400 bg-opacity-50 rounded-full px-1.5 py-0.5 mt-1">
          Members: {memberCount}
        </span>
      </header>
      <main className="flex-grow overflow-auto p-4">
        {data?.map((msg, index) => (
          <div key={index} className={`chat ${msg.socketId === socketID ? 'chatend' : 'start'} mb-2`}>
            <div className={`chat-bubble ${msg.socketId === socketID ? 'bg-blue-500' : 'bg-gray-700'} p-3 rounded-lg max-w-[75%]`}>
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>
      <form onSubmit={submitHandler} className="flex w-full py-2 items-center justify-center gap-2 p-4 bg-gray-800 rounded-lg">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Type your message here..."
          type="text"
          name="message"
          className="outline-none border border-zinc-600 w-full px-4 py-3 rounded-full text-lg bg-gray-900 text-white"
        />
        <button type="submit" className="bg-green-500 p-2.5 rounded-full flex items-center justify-center hover:bg-green-400 transition duration-200">
          <VscSend color="white" className="text-3xl" />
        </button>
      </form>
    </div>
  );
}

export default GlobalChat;
