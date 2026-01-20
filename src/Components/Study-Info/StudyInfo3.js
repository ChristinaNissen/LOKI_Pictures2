import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./study-info.css";
import Instructions from "../../Assets/Instructions_e-voting.pdf";
import { downloadFile } from "../../util";

const StudyInfo3 = () => {
  const [checked, setChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChangeCheckbox = () => setChecked((prev) => !prev);

   const downloadInstructions = (e) => {
      e.preventDefault();
      e.stopPropagation();
      downloadFile(Instructions, "General-Election-2023.pdf");
    };
  
  const handleStart = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      navigate("/welcome");
    }, 500);
  };

  const startDisabled = !checked || isSubmitting;

  return (
    <div className="study-center-bg">
        <div className="inner-box-info padding-top-info-page" style={{ maxWidth: "35rem" }}>

        <h1>Before you start</h1>
                  <hr className="step-divider" />

        <form onSubmit={handleStart}>
          {/* Step 1 */}
          <div className="step-row">
            <div className="step-number">1</div>
            <div className="step-content">
              <p>
                All candidates are fictional. In this second part of the study, we ask you to <strong>update your vote</strong> in the same election from the first part. You can choose the same candidate as before or a different one.
              </p>
              <label className="check-box blue-bg-highlight">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleChangeCheckbox}
                  className="blue-bg-highlight"
                />
                I understand and will update my vote
              </label>
            </div>
          </div>

          <hr className="step-divider" />

          {/* Step 2 */}
          <div className="step-row">
            <div className="step-number">2</div>
            <div className="step-content">
                         
                Please download the instructions which you need to follow to complete the General Election 2025.
         
              
                In a real election you would get these instructions as a physical or digital letter by the election authorities.
            
              <p className="text-margin-top">
                <span className="blue-bg-highlight">
                  Make sure that you can access the letter throughout the study.
                </span>
              </p>
              <button
                type="button"
                onClick={downloadInstructions}
                className="study-button"
              >
                Download
              </button>
            </div>
          </div>

          <hr className="step-divider" />

          <div style={{ paddingTop: "1rem" }}>
            <button
              id="submit-pid"
              type="submit"
              className="study-button"
              disabled={startDisabled}
            >
              {isSubmitting ? "Loading..." : "Start"}
            </button>
          </div>
        </form>
        </div>
      </div>
  );
};

export default StudyInfo3;
