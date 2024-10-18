const GlobalChat = () => {
  return (
      <div className="h-screen w-full flex relative">
      <input type="text" name="message"
        className="absolute bottom-5 outline-none border border-gray-600 w-[85%] px-4 py-4 rounded-lg"/>
      </div>
  )
}

export default GlobalChat