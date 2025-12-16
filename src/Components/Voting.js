import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./Voting.css";
import ProcessBar from "./ProcessBar";
import VoteContext from "../Contexts/VoteContext";
import { saveVote, getCandidate, getBooleanSelection } from '../API/Voter.js';
import getCurrentUser from "../API/Voter.js";



const candidates = [
  { id: 1, name: "Alice T. Smith", party: "Party A" },
  { id: 2, name: "Mark Jones", party: "Party B" },
  { id: 3, name: "Martin Taylor", party: "Party C" },
  { id: 4, name: "Ann K. Brown", party: "Party D" },
  { id: 5, name: "Sofia Lee", party: "Party E" },
  { id: 6, name: "John Doe", party: "Party F" },
  { id: 7, name: "Emma White", party: "Party G" },
  { id: 8, name: "Lucas Green", party: "Party H" },
];

const Voting = () => {
  const { userSelectedYes } = useContext(VoteContext);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const voter = getCurrentUser();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      setError("Please select a candidate");
      return;
    }
    setError("");
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    const candidateName = candidates.find((c) => c.id === selected)?.name;
    
    try {
      // Get the existing candidate from the database
      const existingCandidate = await getCandidate();
      
      // If candidate is empty, just save the new vote
      if (!existingCandidate || existingCandidate === "") {
        await saveVote(candidateName);
        navigate("/confirmation", { state: { votedCandidate: candidateName } });
      } else {
        // If candidate exists, check if correct selections is true
        const correctSelections = await getBooleanSelection();
        
        if (correctSelections === true) {
          // Update the vote if correct selections is true
          await saveVote(candidateName);
          navigate("/confirmation", { state: { votedCandidate: candidateName } });
        } else {
          // Keep existing candidate, don't update
          navigate("/confirmation", { state: { votedCandidate: existingCandidate } });
        }
      }
    } catch (error) {
      console.error("Error handling vote confirmation:", error);
      // Fallback: save the vote anyway
      await saveVote(candidateName);
      navigate("/confirmation", { state: { votedCandidate: candidateName } });
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const selectedCandidate = candidates.find((c) => c.id === selected);

  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = [
    "Voted Before",
    "Identification of Previous Ballots",
    "Voting",
    "Confirmation",
  ];
  const steps = userSelectedYes ? stepsYes : stepsNo;
  const currentStep = userSelectedYes ? 3 : 2;

  console.log("Voting: userSelectedYes =", userSelectedYes);
  console.log("Voting: steps =", steps, "Length:", steps.length);
  console.log("Voting: currentStep =", currentStep);

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />

        <h1> Voting</h1>
        <div className="text-main">
          Please select your preferred candidate below.
        </div>
        <div className="card-wide">
          <h1 className="ballot-title">
            Ballot
          </h1>
          <form id="votingForm" className="voting-form" onSubmit={handleSubmit}>
            {candidates.map((c, idx) => (
              <div
                className={`ballot-row ${
                  selected === c.id ? "selected" : ""
                }${idx !== candidates.length - 1 ? " ballot-row-border" : ""}`}
                key={c.id}
              >
                <input
                  type="radio"
                  name="ballot"
                  value={c.id}
                  checked={selected === c.id}
                  onChange={() => setSelected(c.id)}
                  className= "input-ballot"
                  style={{ accentColor: "var(--primary-yellow)" }}
                />
                <span className="ballot-candidate">{c.name}</span>
                <span className="ballot-party">{c.party}</span>
              </div>
            ))}
          </form>
        </div>
        <div className="button-wrapper">
          <button
            type="submit"
            className="button next-button-voting"
            form="votingForm"
          >
            Cast vote
          </button>
        </div>
        {error && (
          <div className="error-overlay">
            <div className="error-message">
              <p>{error}</p>
              <button className="button" onClick={() => setError("")}>
                Close
              </button>
            </div>
          </div>
        )}

        {showConfirm && (
          <div className="modal-backdrop-voting">
            <div className="modal-voting">
              <p className="modal-voting-text">
                Are you sure you want to cast your vote for{" "}
                <strong>{selectedCandidate?.name}</strong>?
              </p>
              <div className="modal-actions-voting">
                <button className="button modal-voting-button" onClick={handleConfirm}>
                  Yes, cast vote
                </button>
                <button
                  className="button-secondary modal-voting-button"
                  onClick={handleCancel}
                >
                  Cancel
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

export default Voting;
