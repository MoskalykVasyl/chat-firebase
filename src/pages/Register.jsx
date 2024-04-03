import React, { useState } from 'react';
import Add from '../image/addPhoto.svg';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import {debounce} from 'lodash'

const Register = () => {
  const [err, setErr] = useState(false);
  const [password, setPassword] = useState('');
  const [errPass, setErrPass] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create userChats for user
            await setDoc(doc(db, "userChats", res.user.uid), {});
            // navigate to Home page
            navigate('/')

          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
    } catch (err) {
      setErr(true);
    }
  };

  const chechPass = debounce(() =>{
    console.log('checking password')
    console.log(errPass);
    if (password.length  < 5) {
      setErrPass(true);
    }
    else {
      setErrPass(false);
    }
  }, 1000)

  const  handlePassword =(e)=>{
    setPassword(e.target.value);
    chechPass();
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Homely chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nickname" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" onChange={handlePassword} value={password} />
          {errPass && <span style={{color:"red"}}>Min password length ( renges form 6 to 30)</span>}
          <input style={{ display: 'none' }} type="file" id="file"  />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something wrong!</span>}
        </form>
        <p>If have you already an account. <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
