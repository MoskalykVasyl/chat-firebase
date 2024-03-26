import React from 'react'
import Img from '../image/addPhoto.svg'
import Clip from '../image/clip.svg'

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' />
      <div className="send">
        <img src={Clip} alt="file" />
        <input type="file" style={{display:'none'}} id='file' />
        <label htmlFor="file">
          <img src={Img} alt="img" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input