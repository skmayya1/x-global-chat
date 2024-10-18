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
        <div className={`chat chat-${msg.kinderId === id ? 'end' : 'start'}`}>
            {
                msg.kinderId !== id ? 
                    <div className="flex items-center gap-2">
                        <img src={msg.picture} alt={msg.sender_name} className="w-8 h-8 rounded-full" />
                        <div className="text-base bg-zinc-800 p-2 rounded-lg text-white flex gap-1">
                            <p className="">{msg.sender_name}</p>
                                <p className="self-center">{msg.message}</p>
                                <p className="text-xs self-end font-extralight">{formatTime(msg.created_at)}</p>
                            </div>
                    </div>
                    : 
                    <div className="text-base  bg-zinc-800 p-2 rounded-lg text-white flex gap-1">
                        <p className="self-center">{msg.message}</p>
                        <p className="text-xs self-end font-extralight">{formatTime(msg.created_at)}</p>
                    </div>
            }
    </div>
  ) 
}

export default Message