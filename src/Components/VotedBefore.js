import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VoteContext from "../Contexts/VoteContext";
import ProcessBar from "./ProcessBar";
import Footer from "./Footer";
import "./Voting-system.css";
import "./VotedBefore.css";

const VotedBefore = () => {
  const navigate = useNavigate();
  const { setUserSelectedYes } = useContext(VoteContext);
  const [selected, setSelected] = useState(null); // null means none selected yet
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelect = (value) => {
    if (selected === value) {
      setSelected(null); // unselect if clicked again
    } else {
      setSelected(value);
    }
  };

  const handleNext = () => {
     if (selected === null) {
      setShowError(true);
      return;
    }
    if (selected === true) {
      setUserSelectedYes(true);
      navigate("/selection");
    } else if (selected === false) {
      setUserSelectedYes(false);
      navigate("/voting");
    }
  };

  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = ["Voted Before", "Identification of Previous Ballots", "Voting", "Confirmation"];

  return (
    <div className="page-wrapper">
      <main className="welcome-main" >
        <ProcessBar steps={selected ? stepsYes : stepsNo} currentStep={1} />
        <h1 className="voted-before-h1">Have you voted before in this election?</h1>
        <div className="text-main text-voted-before" style={{ marginBottom: "1px" }}>
          Please select below whether you have voted in this election before or not.
        </div>
        <div className="security-box">
          <p className="text-small">
            <strong>Why is this step needed?</strong><br />
            This step is essential for your security and the integrity of the election. When voting from home or outside a controlled environment, there is a risk that someone could try to influence or pressure you to vote in a certain way. <br></br><br></br>To protect against such coercion attacks, this system is designed to ensure that your vote remains private and free from outside influence. As part of this protection, you are asked to verify whether you have voted before in this election. This helps safeguard your right to vote independently and securely, even outside a polling station.<br /><br />
            <a href="/help#what-is-coercion" className="faq-link">Read more in the FAQ</a>
          </p>
        </div>
        <div className="card-wide voted-before" style={{ padding: "40px 20px" }}>
          <div className="box-container">
            <div
              className={`yellow-box ${selected === false ? "selected" : ""}`}
              onClick={() => handleSelect(false)}
            >
              <p className="text-small">
                <strong>No</strong>
                <br />
                This is my first time voting in this election
              </p>
            </div>

             <div
              className={`yellow-box ${selected === true ? "selected" : ""}`}
              onClick={() => handleSelect(true)}
            >
              <p className="text-small">
                <strong>Yes</strong>
                <br />
                I have voted before in this election
              </p>
            </div>
          </div>
        </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <button className="button next-voted-before" onClick={handleNext}>
            Next
          </button>
           </div>



        {showError && (
          <div className="error-overlay">
            <div className="error-message">
              <p>Please select an option</p>
              <button className="button" onClick={() => setShowError(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VotedBefore;

