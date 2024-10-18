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
                    <img src={msg.picture} alt={msg.sender_name} className="rounded-full w-8 h-8" />
                )
            }
    </div>
  )
}

export default Message