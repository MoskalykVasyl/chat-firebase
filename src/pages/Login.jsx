import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Moskalyk chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" defaultValue='test2@gmail.com' />
          <input type="password" placeholder="Password" defaultValue='userrjkz0678570646'/>
          <button>Sign in</button>
          {err && <p>Something wrong!</p>}
        </form>
        <p>If you haven't an account. <Link to='/register'>Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
