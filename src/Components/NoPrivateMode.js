import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PrivateModeWarning.css";
import Footer from "./Footer";
import "./Voting-system.css";

const NoPrivateMode = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <h1>Private Browsing Recommended</h1>

        <div className="security-box">
          <p className="text-small">
            <strong>Why use private browsing?</strong><br/>
Private (incognito) mode helps protect your voting privacy by ensuring your session and activity are not saved on your device. The voting system itself never reveals whether you have voted before or how you have voted. However, your browser may otherwise keep traces such as history, cookies, or cached data, which could show that you accessed the voting platform.
<br></br>
<br></br>
Using private browsing helps prevent others from discovering whether you have participated in online voting, even if they have access to your device. This is especially important for protecting you against coercion or unwanted scrutiny, and helps ensure your vote remains confidential.<br /><br />
            <a href="/help#incognito-mode" className="faq-link">Read more in the FAQ</a>
          </p>
        </div>

        <div className="study-modal study-modal-static">
          <p>
            For the purposes of this study, please do not use private browsing or open the login in a new window or tab.<br /><br />
            To ensure your interaction is properly registered, simply click the login button below to proceed.
          </p>
          <div className="study-modal-actions">
            <button style={{ fontWeight: "bold" }} className="study-button" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NoPrivateMode;