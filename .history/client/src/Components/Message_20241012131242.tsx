import { MessageData } from "../Context/SocketProvider"

interface MessageProps { 
    msg: MessageData,
    id : string
}

const Message : React.FC<MessageProps> = ({msg , id}) => {
    return (
      {}
  )
}

export default Message