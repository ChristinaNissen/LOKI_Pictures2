import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ProcessBar from "./ProcessBar.js";
import VoteContext from "../Contexts/VoteContext";
import "./VisualSelection_Picture.css";
import { saveCorrectSelections, getVisualRepresentation, saveBallotSelections } from '../API/Voter.js'; // import getVisualRepresentation


// Dynamically import all images from the Images folder
const importAllImages = (r) => r.keys().map(r);
const imageContext = require.context('../Images', false, /\.(jpg|jpeg|png|gif)$/);
const allImagesRaw = importAllImages(imageContext);

// Helper function: Fisher-Yates shuffle
const shuffleArray = (array) => {
  const newArr = array.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Filter to keep only one image per unique base name (without _01b, _02s suffixes)
const getCleanBaseName = (imgSrc) => {
  const filename = imgSrc.split('/').pop().split('.')[0];
  // Remove suffixes like _01b, _02s, etc.
  return filename.replace(/_\d+[a-z]?$/i, '').toLowerCase();
};

const uniqueImages = new Map();
allImagesRaw.forEach(img => {
  const baseName = getCleanBaseName(img);
  if (!uniqueImages.has(baseName)) {
    uniqueImages.set(baseName, img);
  }
});

let allImagesFiltered = Array.from(uniqueImages.values());

// Ensure alpaca is in the list
const alpacaImage = allImagesFiltered.find(img => getCleanBaseName(img) === 'alpaca');

// Shuffle all images first
allImagesFiltered = shuffleArray(allImagesFiltered);

// Limit to 500 images
let allImages = allImagesFiltered.slice(0, 500);

// Ensure alpaca is among the 500
if (alpacaImage && !allImages.includes(alpacaImage)) {
  // Replace a random image with alpaca
  const randomIdx = Math.floor(Math.random() * allImages.length);
  allImages[randomIdx] = alpacaImage;
}

console.log('Total unique images loaded:', allImages.length);

const PAGE_SIZE = 42;


const VisualSelectionPicture = () => {
  const { userSelectedYes } = useContext(VoteContext);
  const navigate = useNavigate();

  const [items] = useState(() => shuffleArray(allImages));
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // modal state
  const [visualRepresentation, setVisualRepresentation] = useState(null);


  // Close modal if all words are removed
  useEffect(() => {
    if (showConfirm && selected.length === 0) {
      setShowConfirm(false);
    }
  }, [selected, showConfirm]);

  // Add these states at the top of your component
  const [search, setSearch] = useState("");
  const [letterFilter, setLetterFilter] = useState("");
  

  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = [
    "Voted Before",
    "Identification of Previous Ballots",
    "Voting",
    "Confirmation"
  ];
  const steps = userSelectedYes ? stepsYes : stepsNo;
  const currentStep = userSelectedYes ? 2 : 0;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch the visual representation when the component mounts
  useEffect(() => {
    const fetchVisual = async () => {
      const visual = await getVisualRepresentation();
      setVisualRepresentation(visual);
    };
    fetchVisual();
  }, []);


  const handleSelect = (idx) => {
    setSelected(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleNext = () => {
    if (selected.length > 0) {
      setShowConfirm(true);
    } else {
      setShowError(true);
    }
  };

  const getBaseName = (filename) => {
    // Extracts the base name before any dot or hash, e.g., "banana" from "banana.5f884f2a6ae015edf182.png"
    return filename.split('/').pop().split('.')[0];
  };

  const getDisplayName = (filename) => {
    // Extracts the display name without suffixes like _01b, _02s, etc.
    // e.g., "hoodie_01b" becomes "hoodie", "envelope_04s" becomes "envelope"
    const baseName = filename.split('/').pop().split('.')[0];
    // Remove pattern: underscore followed by digits and optional letters (e.g., _01b, _02s, _04s)
    const cleanName = baseName.replace(/_\d+[a-z]?$/i, '');
    // Replace remaining underscores with spaces and capitalize first letter of each word
    return cleanName.replace(/_/g, ' ');
  };

  const confirmSelection = async () => {
    // Get base names for selected images
    const selectedBaseNames = selected.map(idx => {
      const src = filteredItems[idx];
      if (!src || typeof src !== 'string') return '';
      return getBaseName(src);
    }).filter(Boolean);

    // Handle visualRepresentation - for pictures, look for image_visual key
    let visualBaseName = '';
    if (visualRepresentation && typeof visualRepresentation === "object") {
      // Check for image_visual key specifically for pictures
      if (visualRepresentation.image_visual) {
        visualBaseName = getBaseName(visualRepresentation.image_visual);
      } else if (visualRepresentation.picture) {
        visualBaseName = getBaseName(visualRepresentation.picture);
      } else {
        // Fallback: get first value
        const firstValue = Object.values(visualRepresentation)[0];
        if (firstValue && typeof firstValue === 'string') {
          visualBaseName = getBaseName(firstValue);
        }
      }
    } else if (typeof visualRepresentation === "string") {
      visualBaseName = getBaseName(visualRepresentation);
    }

    // Check for EXACT match: selected must contain only the visual representation, nothing more
    const isCorrect = selectedBaseNames.length === 1 && selectedBaseNames[0] === visualBaseName;

    console.log("Selected base names:", selectedBaseNames);
    console.log("Visual base name:", visualBaseName);
    console.log("Is correct:", isCorrect);

    try {
      // Save only the file names (not base names) for ballot selections
      await saveBallotSelections(selected.map(idx => {
        const src = filteredItems[idx];
        if (!src || typeof src !== 'string') return '';
        return src.split('/').pop();
      }).filter(Boolean));
      // Use the calculated isCorrect value directly instead of the state
      await saveCorrectSelections(Boolean(isCorrect));
      console.log("Saved to DB! isCorrect:", isCorrect);
      navigate("/voting", { state: { userSelectedYes } });
    } catch (error) {
      console.error("Error saving ballot selections:", error);
    }
  };

  const closeError = () => setShowError(false);

  // Reset page to 0 when filters change
  useEffect(() => {
    setPage(0);
  }, [search, letterFilter]);

  // Filter items based on search and letter filter
  const filteredItems = items.filter((imgSrc) => {
    const label = imgSrc.split('/').pop().split('.')[0].replace(/_/g, ' ');
    const matchesSearch = search === "" || label.toLowerCase().includes(search.toLowerCase());
    const matchesLetter = letterFilter === "" || label.toLowerCase().startsWith(letterFilter.toLowerCase());
    return matchesSearch && matchesLetter;
  });

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const pagedItems = filteredItems.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />
        <div className="intro-container intro-selection">
          <h1 className="intro-heading">Identification of Previously Cast Ballots</h1>
          <div className="text-main text-main-confirmation text-main-selection">
            Please select all pictures below that you have seen when casting your previous ballots.
          </div>
          <div className="security-box-selection">
             <p className="text-small">
              <strong>Why is this step needed?</strong><br />
              This feature verifies your identity, ensuring that only you can update your vote by recognising the pictures shown to you after your previous voting session(s).<br /><br />
              This feature also protects against coercion. If you are pressured to vote a certain way, you can intentionally select the wrong pictures to prevent your vote from being updated, without revealing your true voting history.<br /><br />
              If you cannot remember your picture(s), you can always vote in person at your local polling station.<br /><br />
              <a href="/help#ballot-verification-security" className="faq-link">Read more in the FAQ</a>
            </p>
          </div>
        </div>
        <div className="card-wide">
          <h1 className="card-heading-select" style={{ width: "100%", textAlign: "left", margin: "0 0 10px 40px" }}>
            Select your pictures
          </h1>
          <div className="instruction-list" style={{ maxWidth: "800px", margin: "0 auto 20px auto", textAlign: "left", paddingLeft: "35px" }}>
            <ul>
              <li>You must select <strong>all</strong> the pictures below that you have seen when casting your previous ballots. This includes pictures from both valid and invalid ballots.</li>
              <li>The system will not reveal if your selection is correct for security reasons.</li>
              <li>Only the correct selection will ensure that your vote gets updated and counted into the results.</li>
              <li>If you are unsure or cannot remember your pictures, please contact election officials at your polling station.</li>
            </ul>
          </div>
          <div className="filter-card">
  <div className="filter-headline">Find your pictures</div>
  <div className="filter-instructions">
    Use the search box or click a letter to filter by the first letter of the word representing the item in the picture (e.g., A for Apple, B for Baby).
  </div>
  <div className="filter-controls">
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        id="word-search"
        type="text"
        className="word-filter-input"
        placeholder="Search for your word..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search for your word"
      />
    </div>
    <div className="letter-buttons">
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => (
        <button
          key={letter}
          className={
            "word-filter-letter" +
            (letterFilter === letter.toLowerCase() ? " active" : "")
          }
          aria-pressed={letterFilter === letter.toLowerCase()}
          onClick={e => {
            if (letterFilter === letter.toLowerCase()) {
              setLetterFilter("");
              e.currentTarget.blur(); // Remove focus so yellow style disappears
            } else {
              setLetterFilter(letter.toLowerCase());
            }
          }}
          type="button"
        >
          {letter}
        </button>
      ))}
      {letterFilter && (
        <button
          className="clear-btn"
          onClick={() => setLetterFilter("")}
          type="button"
        >
          Clear
        </button>
      )}
    </div>
  </div>
</div>

        <div className="selected-scroll-wrapper">
            <div className="selected-count-inside">
              {selected.length} selected
            </div>
            
           <div className="page-counter-badge">
              Showing {page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, filteredItems.length)} of {filteredItems.length} pictures
            </div>
          </div>

          {/* Wrap the grid with a container */}
          <div className="visual-selection-grid-container">
            <div className="pictures-scroll-container">
            <div className="visual-select-grid-pictures">
              {filteredItems.length === 0 ? (
                <p className="no-pictures-message">No pictures found. Try adjusting your search.</p>
              ) : (
                pagedItems.map((imgSrc, idx) => {
                  const globalIdx = page * PAGE_SIZE + idx;
                  return (
                    <div
                      key={globalIdx}
                      className={`visual-selection-picture${selected.includes(globalIdx) ? " selected" : ""}`}
                      onClick={() => handleSelect(globalIdx)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="picture-img-wrapper">
                        <img src={imgSrc} alt={`visual-${globalIdx}`} />
                      </div>
                      <div className="picture-label">
                        {getDisplayName(imgSrc)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          </div>
          {/* Navigation buttons below */}
          <div className="pagination-buttons" >
            <button className="button" onClick={() => setPage(page - 1)} disabled={page === 0} aria-label="Previous page">
              ←
            </button>
              <span className="page-counter">
              Page {page + 1} of {totalPages}
            </span>
            <button className="button" onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} aria-label="Next page">
              →
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button onClick={handleNext} className="button confirm-selection-button">
            Confirm selection
          </button>
        </div>
        {showError && (
          <div className="error-overlay">
            <div className="error-message">
              <p>Please select at least one item</p>
              <button onClick={closeError} className="button">
                Close
              </button>
            </div>
          </div>
        )}
        {showConfirm && (
          <div className="modal-backdrop-picture">
            <div className="modal-picture">
            <p style={{fontSize: "18px", fontWeight: "bold"}}>
                Please review your selected picture{selected.length > 1 ? "s" : ""} below.
              </p>
               <p style={{fontSize: "16px", marginTop: "8px", marginBottom: "16px"}}>
                Please verify that your selection is correct. Once confirmed, you will not receive feedback on whether this selection is correct.
              </p>
              <div className="selected-pictures-preview-picture">
                {selected.map(idx => {
                  const imgSrc = filteredItems[idx];
                  if (!imgSrc) return null; // Safety check
                  const label = getDisplayName(imgSrc);
                  return (
                    <div key={idx} className="preview-item-picture" style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                      <button
                        onClick={() => {
                          setSelected(prev => prev.filter(i => i !== idx));
                        }}
                        style={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: "1px solid #ccc",
                          background: "#f3f4f6",
                          color: "#666",
                          fontSize: "16px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 0,
                          lineHeight: 1,
                          zIndex: 10,
                        }}
                        title="Remove this picture"
                      >
                        ×
                      </button>
                      <img src={imgSrc} alt={`preview-${idx}`} />
                      <div className="picture-label" style={{ marginTop: 8, fontWeight: "bold", textAlign: "center" }}>
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="modal-actions-picture">
                <button className="button" onClick={confirmSelection}>
                  Confirm selection
                </button>
                <button className="button-secondary" onClick={() => setShowConfirm(false)}>
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

export default VisualSelectionPicture;

