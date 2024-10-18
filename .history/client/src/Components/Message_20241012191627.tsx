import { MessageData } from "../Context/SocketProvider";

interface MessageProps {
    msg: MessageData;
    id: string;
}

const Message: React.FC<MessageProps> = ({ msg, id }) => {
    console.log(msg.kinderId);
    
    const colors = ["text-red-500", "text-blue-500", "text-green-500", "text-purple-500", "text-pink-500", "text-yellow-500", "text-teal-500"];

    const getColorClass = (name: string) => {
        const index = name.length % colors.length; // Simple way to get an index
        return colors[index];
    };

    const senderColor = getColorClass(msg.sender_name);

    function formatTime(createdAt: string): string {
        const date = new Date(createdAt);
        if (isNaN(date.getTime())) {
            return "Invalid Date"; // Handle invalid date
        }
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
                    // Other user's messages
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-11 w-11 rounded-full overflow-hidden">
                            <img className="h-full w-full bg-cover" src={msg.picture} alt={msg.sender_name} />
                        </div>
                        <div className="bg-zinc-800 rounded-lg px-2 py-1">
                            <div className={`font-semibold text-sm ${senderColor}`}>{msg.sender_name}</div>
                            <div className="flex gap-3">
                                <div className="self-center font-medium">{msg.message}</div>
                                <div className="self-end text-xs font-extralight">{formatTime(msg.created_at)}</div>
                            </div>
                        </div>
                    </div>
                    :
                    // Current user's messages
                    <div className="flex gap-3 bg-zinc-800 rounded-lg px-2 py-1">
                        <div className="self-center font-medium">{msg.message}</div>
                        <div className="self-end text-xs font-extralight">{formatTime(msg.created_at)}</div>
                    </div>
            }
        </div>
    );
}

export default Message;
