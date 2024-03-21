import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Homely chat</span>
      <div className="user">
        <img src="https://i.pinimg.com/564x/24/c1/e8/24c1e83c25b4f8c51249472b605c6311.jpg" alt="" />
        <span>Sarah</span>
        <button>logout</button>
      </div>
    </div>
  )
}

export default Navbar