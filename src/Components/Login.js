import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import "./Login.css";
import "./Voting-system.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // install with: npm install react-icons
import { addVoter, loginVoter } from '../API/Voter.js'; // Adjust path as needed


const Login = ({ setIsLoggedIn }) => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userIDError, setUserIDError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showStudyModal, setShowStudyModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Secret salt for hashing - in production, this should be in an environment variable
  const SECRET_SALT = "voting_system_secret_2024";

  // Function to hash the UserID using SHA-256
  const hashUserID = async (prolificID) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(prolificID + SECRET_SALT);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  // Function to hash the Password using SHA-256
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + SECRET_SALT);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  let hasError = false;

  if (!userID.trim()) {
    setUserIDError("Please enter your user ID");
    hasError = true;
  } else {
    setUserIDError("");
  }

  if (!password.trim()) {
    setPasswordError("Please enter your password");
    hasError = true;
  } else {
    setPasswordError("");
  }

  if (!hasError) {
    try {
      // Hash the UserID and Password before sending to API
      const hashedUserID = await hashUserID(userID);
      const hashedPassword = await hashPassword(password);
      
      // Try to log in first
      await loginVoter(hashedUserID, hashedPassword);
      setIsLoggedIn(true);
      navigate("/votedbefore");
    } catch (error) {
      console.log("Login error code:", error.code, "message:", error.message);
      // If login fails, try to sign up
      // Parse error code 101 = Invalid username/password
      // Parse error code 404 or message includes "not found" = endpoint or user not found
      if (
        error.code === 101 ||
        error.code === 404 ||
        error.message.includes("Invalid username/password") ||
        error.message.includes("user not found") ||
        error.message.includes("Not Found")
      ) {
        try {
          // Hash the UserID and Password before creating account
          const hashedUserID = await hashUserID(userID);
          const hashedPassword = await hashPassword(password);
          // Generate a random 4-digit number
          const random4Digit = Math.floor(1000 + Math.random() * 9000).toString();
          await addVoter(hashedUserID, hashedPassword, random4Digit);
          // User is automatically logged in after successful signup
          setIsLoggedIn(true);
          navigate("/votedbefore");
        } catch (signupError) {
          console.log("Signup error:", signupError);
          if (signupError.message.includes("Account already exists") || signupError.code === 202) {
            setUserIDError("This user ID is already taken. Please choose another.");
          } else {
            setPasswordError("Login failed. Please try again.");
          }
        }
      } else {
        setPasswordError("Login failed. Please try again.");
      }
    }
  }
};

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <h1>Login to your account</h1>
        <div className="text-main login-text">
          Please enter your details below to access the online voting system.
        </div>
        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="userID">ProlificID</label>
            <input
              id="userID"
              type="text"
              placeholder ="Enter Prolific ID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              onFocus={() => {
                if (!hasShownModal) {
                  setShowStudyModal(true);
                  setHasShownModal(true);
                }
              }}
              className="login-input"
              autoComplete="username"
            />
            {userIDError && <div className="login-error">{userIDError}</div>}

            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
            <input
              id="password"
              className="login-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder = "Enter password"
              autoComplete="current-password"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
            {passwordError && <div className="login-error">{passwordError}</div>}

            <button type="submit" className="button button-login">
              Login
            </button>
          </form>
        </div>

        {showStudyModal && (
          <div className="study-modal-backdrop" onClick={() => setShowStudyModal(false)}>
            <div className="study-modal" onClick={(e) => e.stopPropagation()}>
              <h2>Study Information</h2>
              <p>
                Since this is a research study, please use your <strong>Prolific ID</strong> for both the ID and Password fields.<br /><br />
                In a real election, this login would require actual credentials for security purposes.
              </p>
              <div className="study-modal-actions">
                <button className="study-button" onClick={() => setShowStudyModal(false)}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Login;