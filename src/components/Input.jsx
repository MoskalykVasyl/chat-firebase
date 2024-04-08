import React, { useContext, useState } from 'react';
import Img from '../image/addPhoto.svg';
import Clip from '../image/clip.svg';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {
  arrayUnion,
  updateDoc,
  doc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(()=>{
        getDownloadURL(storageRef).then(async (downloadURL) => {
                  await updateDoc(doc(db, 'chats', data.chatId), {
                    messages: arrayUnion({
                      id: uuid(),
                      text,
                      senderId: currentUser.uid,
                      date: Timestamp.now(),
                      img: downloadURL,
                    }),
                  });
                });
              }
            );
          } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            });
          }
      

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessages']: { text },
      [data.chatId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessages']: { text },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setImg(null);
    setText('');
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Clip} alt="file" />
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="img" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
