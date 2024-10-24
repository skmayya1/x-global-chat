import { useContext } from "react";
import SocketContext, { MessageData } from "../Context/SocketProvider";
import { BsReply } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";


interface MessageProps {
    msg: MessageData;
    id: string;
    ReplyHandler: (name: string, id: string, text: string) => void;
}

const Message: React.FC<MessageProps> = ({ msg, id, ReplyHandler  }) => {

    const colors = ["text-red-500", "text-blue-500", "text-green-500", "text-purple-500", "text-pink-500"];

    const getColorClass = (name: string) => {
        const index = name.length % colors.length;
        return colors[index];
    };

    const { DeleteHandler } = useContext(SocketContext) || {};

    const senderColor = getColorClass(msg.sender_name);

    function formatTime(createdAt: string): string {
        const date = new Date(createdAt);
        if (isNaN(date.getTime())) {
            console.log("Invalid date format:", createdAt);
            return "Invalid Date";
        }
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
        return `${hours}:${formattedMinutes} ${ampm}`;
    }

    return (
        <div className={`chat group ${msg.kinderId === id ? 'chat-end' : 'chat-start'} `}>
            {
                msg.kinderId !== id ?
                    <div id={msg.mID} className="flex items-center justify-center gap-2">
                        <div className="h-11 w-11 self-start rounded-full overflow-hidden">
                            <img className="h-full w-full bg-cover" src={msg.picture} alt={msg.sender_name} />
                        </div>
                        <div className="bg-zinc-800 rounded-lg max-w-[32vh] px-2 py-1 overflow-hidden">
                            <div className={`text-xs ${senderColor}`}>{msg.sender_name}</div>
                            {msg.ReplyToId &&
                                <div className="bg-zinc-700 min-h-14 min-w-[28vw] mb-1 border-l-2 rounded-lg flex flex-col items-start p-2 overflow-hidden">
                                    <div className="text-sm text-white font-base">{msg.ReplyToNAme?.split(' ')[0]}</div>
                                    <div className="text-sm w-full whitespace-pre-wrap break-words">{msg.ReplyToText}</div>
                                </div>
                            }
                            <div className="flex gap-3 w-full justify-between">
                                <div className="self-center max-w-[20vh] whitespace-pre-wrap break-words font-medium">{msg.text}</div>
                                <div className="self-end text-xs font-extralight">{formatTime(msg.createdAt)}</div>
                            </div>
                        </div>
                        <button onClick={() => ReplyHandler(msg.sender_name, msg.mID, msg.text)} className="p-1 flex items-center justify-center rounded-full active:scale-125 scale-0 group-hover:scale-100">
                            <BsReply color="gray" size={22} />
                        </button>
                    </div>
                    :
                    <div className="flex gap-1  relative"> {/* Added 'relative' for positioning */}
                        <div onClick={
                            () => {
                                if (DeleteHandler) {
                                    DeleteHandler(msg.mID)
                                }
                            }
                        }
                            className="absolute -left-8 p-1 scale-0 group-hover:scale-100 transition-transform duration-150 h-fit w-fit rounded-full hover:bg-zinc-900">
                            <MdDeleteOutline color="red" />
                        </div>
                        <div className="bg-zinc-800 rounded-lg max-w-[32vh] px-2 py-1 overflow-hidden mb-1">
                            {msg.ReplyToId && (
                                <div className="bg-zinc-700 min-h-14 min-w-[28vw] mb-1 border-l-2 rounded-lg flex flex-col items-start p-2 overflow-hidden">
                                    <div className="text-sm text-white font-base">{msg.ReplyToNAme?.split(' ')[0]}</div>
                                    <div className="text-sm w-full overflow-hidden whitespace-pre-wrap break-words text-ellipsis line-clamp-2">
                                        {msg.ReplyToText}
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-3 w-full justify-between">
                                <div className="self-center max-w-[20vh] whitespace-pre-wrap break-words font-medium">{msg.text}</div>
                                <div className="self-end text-xs font-extralight">{formatTime(msg.createdAt)}</div>
                            </div>
                        </div>
                    </div>

            }
        </div>
    );
};

export default Message;
