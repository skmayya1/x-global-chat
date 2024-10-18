import { MessageData } from "../Context/SocketProvider"

interface MessageProps { 
    msg: MessageData,
    id : string
}

const Message: React.FC<MessageProps> = ({ msg, id }) => {
    function formatTime(createdAt: string): string {
        const date = new Date(createdAt);
        let hours: number = date.getHours();
        const minutes: number = date.getMinutes();
        const ampm: string = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        const formattedMinutes: string = minutes < 10 ? `0${minutes}` : minutes.toString();
        return `${hours}:${formattedMinutes} ${ampm}`;
    }
    return (
        <div className={`chat ${msg.kinderId === id ? 'chat-end' : 'chat-start'}`}>
            {
                msg.kinderId !== id ?
                    // other     users mssgs
                    <div className="">
                        <div className="">{msg.message}</div>
                        <div className="">{formatTime(msg.created_at)}</div>
                    </div>
                    :
                    // cur users mssgs
                    <div className="flex gap-1 ">
                        <div className=""        >            </div>
                        <div className="">{formatTime(msg.created_at)}</div>
                    </div>
            }
    </div>
  ) 
}

export default Message