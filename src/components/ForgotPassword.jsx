import React, { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../Firebase";

const ForgotPassword = () => {
  const auth = getAuth(app);
  const emailRef = useRef();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [lastSentEmail, setLastSentEmail] = useState("");

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    
    const email = emailRef.current.value;

    if (!email) {
      alert("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      
      setEmailSent(true);
      setLastSentEmail(email);
      alert("✅ Password reset email sent! Check your Inbox or Spam.");
      
    } catch (error) {
      console.error("Password reset error:", error);
      
      // Handle specific error cases
      if (error.code === "auth/user-not-found") {
        alert("❌ No account found with this email address");
      } else if (error.code === "auth/invalid-email") {
        alert("❌ Invalid email address");
      } else if (error.code === "auth/too-many-requests") {
        alert("❌ Too many requests. Please try again later.");
      } else {
        alert("❌ Failed to send reset email: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!lastSentEmail) return;
    
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, lastSentEmail);
      alert("✅ New password reset email sent!");
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        alert("❌ Please wait a few minutes before requesting another email");
      } else {
        alert("❌ Failed to resend email: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestNew = () => {
    setEmailSent(false);
    setLastSentEmail("");
    emailRef.current.value = "";
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>

        {!emailSent ? (
          <form onSubmit={handleSendResetEmail}>
            <p className="info-text">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <div className="input-group">
              <input
                type="email"
                ref={emailRef}
                placeholder="Enter your email"
                required
              />
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="switch-auth">
              Remember your password? <NavLink to="/login">Login</NavLink>
            </p>
          </form>
        ) : (
          <div className="success-message">
            <h3 style={{color: '#4CAF50', marginBottom: '1rem'}}>✅ Email Sent!</h3>
            
            <p className="info-text" style={{marginBottom: '1rem'}}>
              We've sent a password reset link to <strong>{lastSentEmail}</strong>
            </p>

            <div style={{background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
              <p style={{fontSize: '0.9rem', margin: '0.5rem 0'}}>
                <strong>Next Steps:</strong>
              </p>
              <ol style={{fontSize: '0.9rem', paddingLeft: '1.2rem', margin: '0.5rem 0'}}>
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the reset link in the email</li>
                <li>Enter your new password</li>
                <li>The link expires in 1 hour</li>
              </ol>
            </div>

            <div style={{marginTop: '1.5rem'}}>
              <p className="info-text" style={{marginBottom: '0.8rem'}}>
                Didn't receive the email?
              </p>
              
              <button 
                onClick={handleResendEmail}
                className="login-btn"
                disabled={loading}
                style={{marginBottom: '0.5rem'}}
              >
                {loading ? "Sending..." : "Resend Email"}
              </button>

              <button 
                onClick={handleRequestNew}
                className="login-btn"
                style={{background: '#666'}}
              >
                Try Different Email
              </button>
            </div>

            <p className="switch-auth" style={{marginTop: '1.5rem'}}>
              <NavLink to="/login">Back to Login</NavLink>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;