import React from 'react'
import { HiMiniXMark } from "react-icons/hi2";
import { BsReplyFill } from "react-icons/bs";


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
      <div className='flex w-full justify-between items-center px-4 py-1.5'>
          <div className="felx gap-1 items-center">
              <BsReplyFill size={22} />
              <div className="">
                  <p className='font-semibold text-sm'>Reply to {ReplyData.ReplyToName}</p>
              </div>
          </div>
          <button onClick={() => {
              setReplyData({
                  ReplyToId: '',
                  ReplyToName: '',
                  ReplyToText: ''
              })}}
              className=""><HiMiniXMark size={22} /></button>
    </div>
  )
}

export default Reply