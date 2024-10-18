import { useContext, useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import SocketContext, { MessageData } from "../Context/SocketProvider";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Message from "../Components/Message";
import Reply from "../Components/Reply";
import { FaXTwitter } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

const GlobalChat = () => {
  const [message, setMessage] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { memberCount, sendMessage, data = [] } = useContext(SocketContext) || {};
  const { user, isLoading } = useKindeAuth();
  const [replyData, setReplyData] = useState<{
    ReplyToId: string;
    ReplyToName: string;
    ReplyToText: string;
  }>({
    ReplyToId: '',
    ReplyToName: '',
    ReplyToText: ''
  });

  // Scroll to the top or bottom of the chat container
  const scrollToPosition = (position: "top" | "bottom", smooth: boolean = true) => {
    const behavior = smooth ? 'smooth' : 'auto';
    if (chatContainerRef.current) {
      if (position === "top") {
        chatContainerRef.current.scrollTo({ top: 0, behavior });
      } else {
        chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior });
      }
    }
  };

  // Automatically scroll to bottom when messages change
  useEffect(() => {
    scrollToPosition("bottom");
  }, [data]);

  // Auto-focus on the input field when reply data changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [replyData]);

  // Handle form submission for sending messages
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !sendMessage) return;

    sendMessage(message, replyData.ReplyToId, replyData.ReplyToName, replyData.ReplyToText);
    setMessage('');
    setReplyData({ ReplyToId: '', ReplyToName: '', ReplyToText: '' });
    inputRef.current?.focus();
  };

  // Handle setting the reply data when replying to a message
  const handleReply = (name: string, mID: string, text: string) => {
    setReplyData({ ReplyToId: mID, ReplyToName: name, ReplyToText: text });
    inputRef.current?.focus();
  };

  // Format date for message grouping
  const formatDate = (createdAt: string): string => {
    const date = new Date(createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  // Group messages by date
  const groupedMessages: { [key: string]: MessageData[] } = data.reduce((acc, msg) => {
    const dateKey = formatDate(msg.createdAt);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(msg);
    return acc;
  }, {} as { [key: string]: MessageData[] });

  return (
    <div className="h-screen w-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-around gap-10 border-b border-zinc-800">
        <CiLogout />
        <div className="text-white flex items-center justify-center flex-col gap-0.5 py-10">
          <h1 className="font-mono text-lg">GLOBAL CHAT</h1>
          <span className="text-xs font-mono font-extralight border border-green-400 text-green-400 bg-green-400 bg-opacity-50 rounded-full px-1.5 py-0.5">
            members: {memberCount}
          </span>
        </div>
        <div className="rounded-full">
          {user?.picture && (
            <img src={user.picture} alt="profile" className="h-10 w-10 rounded-full" />
          )}
        </div>
      </div>

      {/* Chat Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full absolute">Loading...</div>
      ) : (
          <div  className="flex flex-col h-full w-full bg-black justify-between">

          <div

            className="overflow-y-scroll self-auto h-full w-full px-1.5 flex flex-col-reverse"
          >
            {Object.entries(groupedMessages).map(([date, messages]) => (
              <div key={date} className="mb-2">
                <div className="flex justify-center mb-2">
                  <div className="bg-zinc-900 text-gray-300 text-sm rounded-full px-3 py-1">
                    {date}
                  </div>
                </div>
                {messages.map((msg, index) => (
                  <Message key={index} msg={msg} id={user?.id || ''} ReplyHandler={handleReply} />
                ))}
              </div>
            ))}
            <div className="flex items-center justify-center w-full my-5 gap-2 text-sm">
              Developed By <button className="bg-zinc-950 underline flex items-center gap-1 font-semibold"><a href="https://x.com/Skmayya1">@Skmayya1</a><FaXTwitter size={15} /></button>
            </div>
          </div>

          {/* Reply Component */}
          {replyData.ReplyToId && <Reply ReplyData={replyData} setReplyData={setReplyData} />}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="fixed bottom-0 flex w-full py-1 items-center justify-center border-t border-zinc-800 gap-2 bg-[#121212]">
            <input
              ref={inputRef}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Message"
              type="text"
              name="message"
              className="outline-none bg-transparent w-[85%] px-4 py-3 rounded-full text-lg"
            />
            <button type="submit" className="p-2.5 rounded-full flex items-center justify-center">
              <VscSend color="white" className="text-3xl" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GlobalChat;
