import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../Firebase";

function Signup() {
  const [step, setStep] = useState(1);
  const [generatedCode, setGeneratedCode] = useState("");


  const [form, setForm] = useState({
    name: "",
    dob: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: ""
  });

  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getDatabase(app);

  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // ======================

  // STEP 1: CHECK EMAIL
  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    try {
      const methods = await fetchSignInMethodsForEmail(auth, form.email);

      if (methods.length > 0) {
        alert("⚠️ You already have an account. Please login.");
        navigate("/login");
        return;
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);

      alert("Verification code : " + code);
      setStep(2);

    } catch (err) {
      alert(err.message);
    }
  };

  // STEP 2: VERIFY CODE
  const handleCheckCode = (e) => {
    e.preventDefault();

    if (form.code === generatedCode) {
      setStep(3);
    } else {
      alert("❌ Wrong verification code");
    }
  };

  // STEP 3: CREATE ACCOUNT
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCred.user.uid;

      await set(ref(db, "users/" + uid + "/profile"), {
        name: form.name,
        dob: form.dob,
        mobile: form.mobile,
        email: form.email,
        createdAt: Date.now()
      });

      // alert("✅ Account created!");
      navigate("/");

    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("You already have an account. Please login instead.");
        navigate("/login");
      } else {
        alert(err.message);
      }
    };
    
    
    
    // catch (err) {
    //   alert(err.message + "\n\nYou are already a registered user.");
    // }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleVerifyEmail}>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="dob" type="date" onChange={handleChange} required />
            <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <button className="login-btn">Verify Email</button>
            <p className="switch-auth">Already have account? <NavLink to="/login">Login</NavLink></p>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleCheckCode}>
            <p className="info-text">
              Enter the verification code sent to your email
            </p>
            <input name="code" placeholder="Enter code" onChange={handleChange} required />
            <button className="login-btn">Verify Code</button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleSignUp}>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
            <button className="login-btn">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
