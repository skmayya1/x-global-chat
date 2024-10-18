import { MessageData } from "../Context/SocketProvider"

interface MessageProps { 
    msg: MessageData,
    id : string
}

const Message : React.FC<MessageProps> = ({msg , id}) => {
    return (
    <div className={`chat chat-${msg.kinderId}`}></div>
  )
}

export default Message