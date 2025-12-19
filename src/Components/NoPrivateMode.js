import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrivateModeWarning.css";
import Footer from "./Footer";
import "./Voting-system.css";

const NoPrivateMode = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <h1>Private Browsing Recommended</h1>

        <div className="security-box">
          <p className="text-small">
           <strong>Security Feature:</strong><br/>
          For your security and privacy, please use your browser's private (incognito)
          browsing mode when using the voting platform. This ensures that your session is
          protected and your browsing data is not retained.
          </p>
        </div>

        <div className="study-modal" style={{ marginTop: "2rem", position: "static", transform: "none", maxWidth: "600px", margin: "2rem auto" }}>
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