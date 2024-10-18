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
      <div className='flex w-full justify-between items-center px-4 py-1.5 bg-[#121212]'>
          <div className="flex gap-1 items-center ">
              <div className="">
                  <BsReplyFill size={26} />
              </div>
              <div className="px-2">
                  <p className='font-semibold text-sm text-white'>Reply to {ReplyData.ReplyToName}</p>
                  <p className='text-sm font-light w-56 overflow-hidden  inset-0 bg-gradient-to-r from-transparent via-transparent to-[#121212] opacity-50 pointer-events-none'>{ReplyData.ReplyToText}</p>
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