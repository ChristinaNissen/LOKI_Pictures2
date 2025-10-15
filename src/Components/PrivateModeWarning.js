import React from "react";
import { useNavigate } from "react-router-dom";

const PrivateModeWarning = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to login after the user has confirmed
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Private Browsing Recommended</h1>
      <p>
        For enhanced security and privacy, please use a private (incognito/inPrivate) window.
      </p>
      <p>
        Open a private browsing window and then click the button below to continue to login.
      </p>
      <button className="button" onClick={handleContinue}>
        I have opened a private window - Continue to Login
      </button>
    </div>
  );
};

export default PrivateModeWarning;