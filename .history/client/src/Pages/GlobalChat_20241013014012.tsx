import { useContext, useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import SocketContext from "../Context/SocketProvider";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Message from "../Components/Message";
import Reply from "../Components/Reply";

const GlobalChat = () => {
  const [message, setmessage] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const { memberCount, sendMessage, data = [] } = useContext(SocketContext) || {};
  const { user, isLoading } = useKindeAuth();
  const [ReplyData, setReplyData] = useState<{
    ReplyToId: string;
    ReplyToName: string;
    ReplyToText: string;
  }>({
    ReplyToId: '',
    ReplyToName: '',
    ReplyToText: ''
  });
  const [PrevMsgerID, setPrevMsgerID] = useState<string | null>(null)
  const [namereq, setnamereq] = useState<boolean>(true)
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    input.current?.focus();
  } ,[ReplyData]);

  const SubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages
    if (sendMessage) {
      sendMessage(message, ReplyData.ReplyToId, ReplyData.ReplyToName, ReplyData.ReplyToText);
    }
    setmessage('');
    setReplyData({
      ReplyToId: '',
      ReplyToName: '',
      ReplyToText: ''
    });
    input.current?.focus();
  };

  if (isLoading) return <div>Loading...</div>;

  const ReplyHandler = (name: string, mID: string, text: string) => {
    setReplyData({
      ReplyToId: mID,
      ReplyToName: name,
      ReplyToText: text,
    });
    input.current?.focus();
  };

  return (
    <div className="h-screen w-full flex flex-col relative">
      <div className="h-3 border-b border-zinc-800 w-full text-white flex items-center justify-center flex-col gap-0.5 py-10">
        <h1 className="font-mono text-lg">GLOBAL CHAT</h1>
        <span className="text-xs font-mono font-extralight border border-green-400 text-green-400 bg-green-400 bg-opacity-50 rounded-full px-1.5 py-0.5 scale-90">
          members: {memberCount}
        </span>
      </div>
      <div className="overflow-y-scroll h-full w-full flex flex-col  px-1.5">
        {data.map((msg, index) => (
          setnamereq(Prev)
          <Message key={index} msg={msg} id={user?.id || ''} ReplyHandler={ReplyHandler} namereq={namereq} />
        ))}
        <div ref={chatEndRef} /> {/* This is the reference for scrolling */}
      </div>

      {ReplyData.ReplyToId && (
        <Reply ReplyData={ReplyData} setReplyData={setReplyData} />
      )}

      <form onSubmit={SubmitHandler} className="flex w-full py-1 items-center justify-center border-t border-zinc-800 gap-2 bg-[#121212]">
        <input
          ref={input}
          onChange={(e) => setmessage(e.target.value)}
          value={message}
          placeholder="Message "
          type="text"
          name="message"
          className="outline-none bg-transparent w-[85%] px-4 py-3 rounded-full text-lg"
        />
        <button type="submit" className="p-2.5 rounded-full flex items-center justify-center">
          <VscSend color="white" className="text-3xl" />
        </button>
      </form>
    </div>
  );
};

export default GlobalChat;
