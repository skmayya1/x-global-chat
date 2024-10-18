import React from 'react'

const Reply = ({ data }: {
    data: {
        ReplyToId: string;
        ReplyToName: string;
        ReplyToText: string;
    },setReplyData: React.Dispatch<React.SetStateAction<{
}) => {
  return (
    <div>Reply</div>
  )
}

export default Reply