import React from 'react'
import { HiMiniXMark } from "react-icons/hi2";


interface ReplyProps {
    ReplyData: {
        ReplyToId: string;
        ReplyToName: string;
        ReplyToText: string;
    }
    setReplyData: React.Dispatch<React.SetStateAction<{
        ReplyToId: string;
        ReplyToName: string;
        ReplyToText: string;
    }>>
}   

const Reply : React.FC<ReplyProps> = ({ ReplyData, setReplyData }) => {
  return (
      <div className='flex w-full justify-between items-center px-4 py-1'>
          <div className=""></div>
          <button className=""><HiMiniXMark/></button>
    </div>
  )
}

export default Reply