import React from 'react'

const Login = () => {
  return (
    <div className='formContainer'>
    <div className='formWrapper'>
        <span className="logo">Homely chat</span>
        <span className="title">Login</span>
        <form>
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <button>Sign in</button>
        </form>
        <p>If you haven't an account. Login</p>
    </div>
</div>
  )
}

export default Login