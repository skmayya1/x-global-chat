import { useState } from "react";
import { VscSend } from "react-icons/vsc";

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
    <div className="h-screen w-full flex relative">
      <div className="h-10 w-full "></div>
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
          className="outline-none border border-gray-600 w-[85%] px-4 py-3 rounded-full text-lg"  />
        <button type="submit" className="bg-white p-2.5 rounded-full flex items-center justify-center">
          <VscSend color="black" className="text-3xl" />
        </button>
      </form>
      </div>
  )
}

export default GlobalChat