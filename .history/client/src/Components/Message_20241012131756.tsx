import { MessageData } from "../Context/SocketProvider"

interface MessageProps { 
    msg: MessageData,
    id : string
}

const Message : React.FC<MessageProps> = ({msg , id}) => {
    return (
        <div className={`chat chat-${msg.kinderId === id ? 'end' : 'start'}`}>
        <div className={`flex `}></div>    
    </div>
  )
}

export default Message