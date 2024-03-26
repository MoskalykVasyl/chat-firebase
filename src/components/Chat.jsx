import React from 'react'
import Call from '../image/call.svg'
import More from '../image/settings.svg'
import Messages from './Messages'
import Input from './Input'

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Dany</span>
        <div className="chatIcons">
          <img src={Call} alt="call" />
          <img src={More} alt="more" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat