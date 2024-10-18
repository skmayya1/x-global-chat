import { MessageData } from "../Context/SocketProvider"

interface MessageProps { 
    msg: MessageData,
    id : string
}

const Message : React.FC<MessageProps> = ({msg , id}) => {
    return (
        <div className={`chat chat-${msg.kinderId === id ? 'end' : 'start'}`}>
            {
                msg.kinderId !== id && (
                    <div className="flex items-center gap-2">
                        <img src={msg.picture} alt={msg.sender_name} className="w-8 h-8 rounded-full" />
                        <span className="text-xs text-gray-400">{msg.sender_name}</span>
                    </div>
                )
            }
    </div>
  )
}

export default Message