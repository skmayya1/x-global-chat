import { VscSend } from "react-icons/vsc";

const GlobalChat = () => {
  return (
    <div className="h-screen w-full flex relative">
      <div className="flex w-full absolute bottom-2 items-center justify-center">
        <input type="text" name="message"
          className="outline-none border border-gray-600 w-[85%] px-4 py-3 rounded-lg text-lg"  />
        <button className="bg-white p-2 rounded-full flex ite">
          <VscSend className="text-3xl" />
        </button>
      </div>
      </div>
  )
}

export default GlobalChat