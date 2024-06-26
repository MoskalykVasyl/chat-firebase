import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs, getDoc, query, where, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {dispatch} = useContext(ChatContext)

  

  const {currentUser} = useContext(AuthContext);
 
  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  useEffect(()=>{
    const handleSearch = async () => {
      const q = query(
        collection(db, 'users'),
        where('displayName', '==', username)
      );
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (error) {
        setErr(true);
      }
    };

    handleSearch();

    if(username.length === 0){ setUser(null)}

  }, [username])


  const handleSelect = async (user) => {
    // check whether the group(chats in firestore) exist,if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

        try {
          const res = await getDoc(doc(db, "chats", combinedId));

          if(!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), {messages:[]});

            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [combinedId +".userInfo"]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
              },
              [combinedId + ".date"]: serverTimestamp()
            });

            await updateDoc(doc(db, "userChats", user.uid), {
              [combinedId +".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
              },
              [combinedId + ".date"]: serverTimestamp()
            });
          }
        } catch (error) {}
    dispatch({type: "CHANGE_USER", payload:user})

    setUser(null);
    setUsername('');
  };

  
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          value={username}
          onChange={handleChange}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat"  onClick={()=>handleSelect(user)}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
