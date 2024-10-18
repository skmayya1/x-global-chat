import { useState } from "react";
import { VscSend } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";


const GlobalChat = () => {
  const [message, setmessage] = useState<string>('');
  const [messages, setmessages] = useState<string[]>([]
  )
  const SubmitHandler = (e: React.FormEvent) => { 
    e.preventDefault();
    setmessages([...messages, message]);
    setmessage('');
  }
  return (
    <div className="h-screen w-full flex flex-col relative">
      <div className="h-16 border-b border-zinc-800 w-full text-white flex items-center justify-center flex-col gap-1">
        <h1 className="font-mono text-xl">GLOBAL CHAT</h1>
        <span className=" right-5 text-xs font-mono font-extralight border border-green-400 text-green-400 bg-green-400 bg-opacity-50 rounded-full px-2 py-0.5">
          members: 5
        </span>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="text-white p-2 m-2 rounded-full">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={SubmitHandler}
        className="flex w-full absolute bottom-2 items-center justify-center gap-2">
        <input
          onChange={(e) => setmessage(e.target.value)}
          value={message}
          placeholder="Type your message here"
          type="text"
          name="message"
          className="outline-none border border-zinc-600 w-[85%] px-4 py-3 rounded-full text-lg"  />
        <button type="submit" className="bg-white p-2.5 rounded-full flex items-center justify-center">
          <VscSend color="black" className="text-3xl" />
        </button>
      </form>
      </div>
  )
}

export default GlobalChat