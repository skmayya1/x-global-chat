
interface MessageProps { 
    msg: msg[],
    id : string
}
interface msg {
    message: string;
    socketId: string;
    kinderId: string;
    sender_name: string;
    picture: string;
    created_at: string;
}
const Message : = () => {
  return (
    <div className="">
          
    </div>
  )
}

export default Message