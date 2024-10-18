import { useContext, useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import SocketContext from "../Context/SocketProvider";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Message from "../Components/Message";

const GlobalChat = () => {
  const [message, setmessage] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { memberCount, sendMessage, data = [] } = useContext(SocketContext) || {}; // Default to empty array
  const { user, isLoading } = useKindeAuth();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const SubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendMessage) {
      sendMessage(message);
    }
    setmessage('');
  };
  
  if (isLoading) return <div>Loading...</div>;

  const ReplyHandler = (name: string) => {
    console.log("Replying to:", name);
  }

  return (
    <div className="h-screen w-full flex flex-col relative">
      <div className="h-3 border-b border-zinc-800 w-full text-white flex items-center justify-center flex-col gap-0.5 py-10">
        <h1 className="font-mono text-lg">GLOBAL CHAT</h1>
        <span className="text-xs font-mono font-extralight border border-green-400 text-green-400 bg-green-400 bg-opacity-50 rounded-full px-1.5 py-0.5 scale-90">
          members: {memberCount}
        </span>
      </div>
      <div className="overflow-auto h-full w-full flex flex-col justify-end px-1.5">
        {data.map((msg, index) => (
          <Message key={index} msg={msg} id={user?.id || ''} ReplyHandler={ReplyHandler } />
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={SubmitHandler} className="flex w-full py-2 items-center justify-center gap-2">
        <input
          onChange={(e) => setmessage(e.target.value)}
          value={message}
          placeholder="Type your message here"
          type="text"
          name="message"
          className="outline-none border border-zinc-600 w-[85%] px-4 py-3 rounded-full text-lg" />
        <button hidden={!message.length} type="submit" className="bg-white p-2.5 rounded-full flex items-center justify-center">
          <VscSend color="black" className="text-3xl" />
        </button>
      </form>
    </div>
  );
};

export default GlobalChat;
