import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const codeRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [step, setStep] = useState(1);
  const [generatedCode, setGeneratedCode] = useState("");

  const navigate = useNavigate();

  // STEP 1 → Send Code
  const handleSendCode = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    if (!email) {
      alert("Enter email first");
      return;
    }

    // Generate fake OTP (demo)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    alert("Verification code : " + code);

    setStep(2);
  };

  // STEP 2 → Verify Code
  const handleVerifyCode = (e) => {
    e.preventDefault();

    if (codeRef.current.value === generatedCode) {
      setStep(3);
    } else {
      alert("❌ Wrong verification code");
    }
  };

  // STEP 3 → Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("❌ Passwords do not match");
      return;
    }

    alert("✅ Password reset successful!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter your email"
              required
            />
            <button className="login-btn">Verify Email</button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <p className="info-text">
              Enter the verification code sent to your email
            </p>
            <input
              type="text"
              ref={codeRef}
              placeholder="Enter verification code"
              required
            />
            <button className="login-btn">Verify Code</button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Enter new password"
              required
            />
            <input
              type="password"
              ref={confirmPasswordRef}
              placeholder="Confirm new password"
              required
            />
            <button className="login-btn">Update Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
