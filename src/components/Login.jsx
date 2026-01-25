import React, { useRef } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../Firebase';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Login = () => {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log("Logged in UID:", user.uid);
        // alert("Login successful!");
        navigate("/", { replace: true });
        emailRef.current.value = "";
        passwordRef.current.value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className="auth-container">
  <div className="auth-card">
    <h2>Login</h2>

    <form onSubmit={handleLogin}>
      <div className="input-group">
        <input
          type="email"
          ref={emailRef}
          placeholder="Enter Email"
          required
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          ref={passwordRef}
          placeholder="Enter Password"
          required
        />
      </div>

      <div className="forgot-row">
        <NavLink to="/forgot-password">Forgot Password?</NavLink>
      </div>

      <button type="submit" className="login-btn">
        Login
      </button>
    </form>

    <p className="switch-auth">
      Don’t have an account? <NavLink to="/signup">Sign Up</NavLink>
    </p>
  </div>
</div>

  );
};

export default Login;
