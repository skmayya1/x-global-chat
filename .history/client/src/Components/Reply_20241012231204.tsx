import React from 'react'

interface ReplyProps {
    data: {
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

const Reply = ({ data }: {
    data: {
        ReplyToId: string;
        ReplyToName: string;
        ReplyToText: string;
    },setReplyData: React.Dispatch<React.SetStateAction<{
        ReplyToId: string;
        ReplyToName: string;
        ReplyToText: string;
    }>>
}) => {
  return (
    <div>Reply</div>
  )
}

export default Reply