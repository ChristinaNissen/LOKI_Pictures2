import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./BallotConfirmation.css";
import word from "../Words/Sibling.png";
import ProcessBar from "./ProcessBar.js"; 
import { useLocation } from "react-router-dom";
import VoteContext from "../Contexts/VoteContext";
import { useContext } from "react";

function BallotConfirmation_Word(setIsLoggedIn) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSelectedYes } = useContext(VoteContext);

  // Retrieve candidate name from navigation state; fallback if not set.
  const votedCandidate = location.state?.votedCandidate || "Candidate Unknown";

  const now = new Date();
  const dateTime = now.toLocaleString();

  // Define the steps for each flow:
  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = ["Voted Before", "Visual Selection", "Voting", "Confirmation"];

  // Determine which steps array and current step to use.
  // For "No": currentStep is 3.
  // For "Yes": currentStep is 4.
  const steps = userSelectedYes ?  stepsYes :stepsNo;
  const currentStep = userSelectedYes ? 4 : 3;

   const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/welcome"); // Navigate to welcome page on logout
  };


  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />

          <div className="intro-container">
          <h1>Confirmation</h1>
          <div className="text-main">
            You have cast your ballot succesfully! Below is a visual presentation of your cast ballot. 
          </div>
          <div className="security-box">
            <p className="text-small">
              <strong>Security Feature:</strong><br/>
              This part of the voting system ensures that you can vote freely without any outside pressure.        
            </p>
          </div>
        </div>



        <div className="card-wide">
         <h1 style={{ width: "100%", textAlign: "left", margin: "0 0 10px 40px" }}>
            Word 
          </h1>

            <div
    className="instruction-list"
    style={{ maxWidth: "800px", margin: "0 auto 20px auto", textAlign: "left", paddingLeft: "35px" }}
  >
    <ul>
      <li>
        You need to <strong>remember</strong> this word if you want to update your vote later in the election.
      </li>
      <li>
        You should <strong>not share</strong> your word with anyone, and you should <strong>not save</strong> it anywhere.
      </li>
    </ul>
  </div>
          <img
            src={word}
            alt="Visual ballot"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              marginTop: "0px",
              borderColor: "#c1bfbfff",
              borderWidth: "2px",
              borderStyle: "solid"
            }}
          />
       

            <div className="confirmation-info">
                 <div style={{fontWeight: "bold", fontSize: "1.5rem", marginTop: "10px"}}>
            Sibling
          </div>
              <div className="confirmation-datetime">{dateTime}</div>
              <div className="confirmation-candidate"> {votedCandidate}</div>
            </div>
        
        </div>
        

        <button className="button" style={{ marginTop: 40 }} onClick={() => navigate("/studyinfo2")}>
          Logout
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default BallotConfirmation_Word;

