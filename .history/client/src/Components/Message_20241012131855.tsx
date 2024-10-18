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
                        
                    </div>
                )
            }
    </div>
  )
}

export default Message