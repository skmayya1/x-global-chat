const GlobalChat = () => {
  return (
      <div className="h-screen w-full flex relative">
      <input type="text" name="message"
        className="absolute bottom-0 outline-none border border-gray-600 w-[80%] px-4 py-4"/>
      </div>
  )
}

export default GlobalChat