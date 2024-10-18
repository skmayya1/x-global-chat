import { VscSend } from "react-icons/vsc";

const GlobalChat = () => {
  return (
    <div className="h-screen w-full flex relative">
      <div className="flex w-full absolute bottom-2">
        <input type="text" name="message"
          className="outline-none border border-gray-600 w-[85%] px-4 py-4 rounded-lg" />
        <button>
          <VscSend className="text-3xl" />
        </button>
      </div>
      </div>
  )
}

export default GlobalChat