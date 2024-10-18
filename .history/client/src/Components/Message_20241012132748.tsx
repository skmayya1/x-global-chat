import { MessageData } from "../Context/SocketProvider"

interface MessageProps { 
    msg: MessageData,
    id : string
}

const Message : React.FC<MessageProps> = ({msg , id}) => {
    return (
        <div className={`chat chat-${msg.kinderId === id ? 'end' : 'start'}`}>
            {
                msg.kinderId !== id ? 
                    <div className="flex items-center gap-2">
                        <img src={msg.picture} alt={msg.sender_name} className="w-8 h-8 rounded-full" />
                        <div className="">
                            <p className="text-xs text-gray-400">{msg.sender_name}</p>
                            <p className="text-sm">{msg.message}</p>
                        </div>
                    </div>
                    : 
                    <div className="text-base bg-zinc-800 p-2 rounded-lg text-white">
                        <p className=" ">{msg.message}</p>
                    </div>
            }
    </div>
  )
}

export default Message