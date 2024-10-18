import { VscSend } from "react-icons/vsc";

const GlobalChat = () => {
  return (
    <div className="h-screen w-full flex relative">
      <div className="flex w-full absolute bottom-2 items-center justify-center gap-2">
        <input type="text" name="message"
          className="outline-none border border-gray-600 w-[85%] px-4 py-3 rounded-full text-lg"  />
        <button className="bg-white p-2.5 rounded-full flex items-center justify-center">
          <VscSend color="black" className="text-3xl" />
        </button>
      </div>
      </div>
  )
}

export default GlobalChat