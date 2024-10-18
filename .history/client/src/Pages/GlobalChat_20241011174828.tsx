import { VscSend } from "react-icons/vsc";

const GlobalChat = () => {
  return (
      <div className="h-screen w-full flex relative">
      <input type="text" name="message"
        className="absolute bottom-3 outline-none border border-gray-600 w-[85%] px-4 py-4 rounded-lg" />
      <button>
        <VscSend className="absolute bottom-3 right-3 text-3xl" />
      </button>
      </div>
  )
}

export default GlobalChat