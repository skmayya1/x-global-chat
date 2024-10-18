import React from 'react'

const Reply = ({ data }: {
    data: {
        ReplyToId: string;
        ReplyToName: string;
        ReplyToText: string;
}}) => {
  return (
    <div>Reply</div>
  )
}

export default Reply