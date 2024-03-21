import React from 'react'
import Add from '../image/addPhoto.svg'



const Register = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className="logo">Homely chat</span>
            <span className="title">Register</span>
            <form>
                <input type="text" placeholder='Nickname' />
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password' />
                <input style={{display:'none'}} type="file" id='file' />
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
            </form>
            <p>You already have an account. Login</p>
        </div>
    </div>
  )
}

export default Register