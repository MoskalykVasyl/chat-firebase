import React from 'react'

const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user'/>
      </div>
      <div className="userChat">
        <img src="https://i.pinimg.com/564x/3b/40/7b/3b407b6d7f43c189f86c90fbb752294c.jpg" alt="" />
        <div className="userChatInfo">
          <span>Dany</span>
        </div>
      </div>
    </div>
  )
}

export default Search