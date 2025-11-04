import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ProcessBar from "./ProcessBar.js";
import VoteContext from "../Contexts/VoteContext";
import "./VisualSelection_Picture.css";
import { saveCorrectSelections, getVisualRepresentation, saveBallotSelections } from '../API/Voter.js';

// Import your images
import img4 from "../Words/Actress.png";
import img5 from "../Words/Airport.png";
import img6 from "../Words/Ankle.png";
import img7 from "../Words/Arm.png";
import img8 from "../Words/Apple.png";
import img9 from "../Words/Army.png";
import img10 from "../Words/Baby.png";
import img11 from "../Words/Asia.png";
import img12 from "../Words/Bacon.png";
import img13 from "../Words/Basement.png";
import img14 from "../Words/Beef.png";
import img15 from "../Words/Bison.png";
import img16 from "../Words/Boyfriend.png";
import img17 from "../Words/Breast.png";
import img18 from "../Words/Brother.png";
import img19 from "../Words/Champagne.png";
import img20 from "../Words/Chauffeur.png";
import img21 from "../Words/Child.png";
import img22 from "../Words/Cod.png";
import img23 from "../Words/College.png";
import img24 from "../Words/Colonel.png";
import img25 from "../Words/Convict.png";
import img26 from "../Words/Cousin.png";
import img27 from "../Words/Cowboy.png";
import img28 from "../Words/Crevice.png";
import img29 from "../Words/Crib.png";
import img30 from "../Words/Crown.png";
import img31 from "../Words/Daughter.png";
import img32 from "../Words/Dentist.png";
import img33 from "../Words/Dolphin.png";
import img34 from "../Words/Dorm.png";
import img35 from "../Words/Dress.png";
import img36 from "../Words/Egypt.png";
import img37 from "../Words/Europe.png";
import img38 from "../Words/Farmer.png";
import img39 from "../Words/Female.png";
import img40 from "../Words/Fireman.png";
import img41 from "../Words/Fox.png";
import img42 from "../Words/France.png";
import img43 from "../Words/Friar.png";
import img44 from "../Words/Friend.png";
import img45 from "../Words/Garden.png";
import img46 from "../Words/Gazelle.png";
import img47 from "../Words/Girl.png";
import img48 from "../Words/Grizzly.png";
import img49 from "../Words/Horse.png";
import img50 from "../Words/Husband.png";
import img51 from "../Words/Igloo.png";
import img52 from "../Words/Infant.png";
import img53 from "../Words/Inmate.png";
import img54 from "../Words/Japan.png";
import img55 from "../Words/Ketchup.png";
import img56 from "../Words/Knife.png";
import img57 from "../Words/Lady.png";
import img58 from "../Words/Lake.png";
import img59 from "../Words/Leg.png";
import img60 from "../Words/Leopard.png";
import img61 from "../Words/Lily.png";
import img62 from "../Words/Lion.png";
import img63 from "../Words/London.png";
import img64 from "../Words/Lover.png";
import img65 from "../Words/Mailman.png";
import img66 from "../Words/Meat.png";
import img67 from "../Words/Nurse.png";
import img68 from "../Words/Orange.png";
import img69 from "../Words/Ox.png";
import img70 from "../Words/Oyster.png";
import img71 from "../Words/Palace.png";
import img72 from "../Words/Parent.png";
import img73 from "../Words/Police.png";
import img74 from "../Words/Preacher.png";
import img75 from "../Words/Prince.png";
import img76 from "../Words/Princess.png";
import img77 from "../Words/Puppy.png";
import img78 from "../Words/Queen.png";
import img79 from "../Words/Rifle.png";
import img80 from "../Words/Scalpel.png";
import img81 from "../Words/Sheriff.png";
import img82 from "../Words/Sibling.png";
import img83 from "../Words/Sister.png";
import img84 from "../Words/Skirt.png";
import img85 from "../Words/Sphinx.png";
import img86 from "../Words/Spouse.png";
import img87 from "../Words/Stallion.png";
import img88 from "../Words/Student.png";
import img89 from "../Words/Teacher.png";
import img90 from "../Words/Thief.png";
import img91 from "../Words/Uncle.png";
import img92 from "../Words/Vagrant.png";
import img93 from "../Words/Waitress.png";
import img94 from "../Words/Wife.png";
import img95 from "../Words/Woman.png";
import img96 from "../Words/Zebra.png";
import img97 from "../Words/Wrist.png";

const allImages = [
  img4, img5, img6, img7, img8, img9, img10, img11, img12, img13,
  img14, img15, img16, img17, img18, img19, img20, img21, img22, img23,
  img24, img25, img26, img27, img28, img29, img30, img31, img32, img33,
  img34, img35, img36, img37, img38, img39, img40, img41, img42, img43,
  img44, img45, img46, img47, img48, img49, img50, img51, img52, img53,
  img54, img55, img56, img57, img58, img59, img60, img61, img62, img63,
  img64, img65, img66, img67, img68, img69, img70, img71, img72, img73,
  img74, img75, img76, img77, img78, img79, img80, img81, img82, img83,
  img84, img85, img86, img87, img88, img89, img90, img91, img92, img93,
  img94, img95, img96, img97
];

const PAGE_SIZE = 40;

// Helper function: Fisher-Yates shuffle
const shuffleArray = (array) => {
  const newArr = array.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const VisualSelectionWord = () => {
  const { userSelectedYes } = useContext(VoteContext);
  const navigate = useNavigate();

  // Shuffle the images to randomize order
  let shuffledImages = shuffleArray(allImages);

  // Take the first 50 but ensure img82 is included.
  let initialImages = shuffledImages.slice(0, 48);
  if (!initialImages.includes(img82)) {
    const randomIdx = Math.floor(Math.random() * initialImages.length);
    initialImages[randomIdx] = img82;
    // Optionally, reshuffle the subset to further randomize order:
    initialImages = shuffleArray(initialImages);
  }

  const [items, setItems] = useState(initialImages);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // modal state

  // New state for visual representation and correctness
  const [visualRepresentation, setVisualRepresentation] = useState(null);
  const [isCorrectSelection, setIsCorrectSelection] = useState(null);

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

  // Fetch the visual representation when the component mounts
  useEffect(() => {
    const fetchVisual = async () => {
      const visual = await getVisualRepresentation();
      setVisualRepresentation(visual);
    };
    fetchVisual();
  }, []);

  // Dynamically add new images every minute; images appended are taken sequentially from allImages.
   useEffect(() => {
     const intervalId = setInterval(() => {
       setItems(prevItems => {
         // Use the image path string for uniqueness
         const displayed = new Set(prevItems);
         const remainingImages = allImages.filter(img => !displayed.has(img));
         if (remainingImages.length === 0) {
           clearInterval(intervalId);
           return prevItems;
         }
         // Shuffle remaining images
         for (let i = remainingImages.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [remainingImages[i], remainingImages[j]] = [remainingImages[j], remainingImages[i]];
         }
         const count = Math.min(10, remainingImages.length);
         const newItems = remainingImages.slice(0, count);
         return [...prevItems, ...newItems];
       });
     }, 60000);
     return () => clearInterval(intervalId);
   }, []);
 

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const pagedItems = items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Compute filtered items
  const filteredItems = items.filter(word => {
    const base = word
      .split('/').pop().split('.')[0].replace(/_/g, ' ').toLowerCase();
    const matchesSearch = search === "" || base.includes(search.toLowerCase());
    const matchesLetter = letterFilter === "" || base.startsWith(letterFilter.toLowerCase());
    return matchesSearch && matchesLetter;
  });

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
    // Extracts the base name before any dot or hash, e.g., "Sibling" from "Sibling.5f884f2a6ae015edf182.png"
    return filename.split('/').pop().split('.')[0];
  };

  const confirmSelection = async () => {
    // Get base names for selected images
    const selectedBaseNames = selected.map(idx => {
      const src = items[idx];
      return getBaseName(src);
    });

    // Handle visualRepresentation as object or array
    let visualBaseNames = [];
    if (Array.isArray(visualRepresentation)) {
      visualBaseNames = visualRepresentation.map(v =>
        typeof v === "string" ? getBaseName(v) : ""
      );
    } else if (visualRepresentation && typeof visualRepresentation === "object") {
      // If it's an object like { word: "/static/media/Sibling.5f884f2a6ae015edf182.png" }
      visualBaseNames = Object.values(visualRepresentation).map(getBaseName);
    }

    // Compare arrays of base names (order and length must match)
    let isCorrect = false;
    if (visualBaseNames.length === selectedBaseNames.length) {
      isCorrect = visualBaseNames.every((name, i) => name === selectedBaseNames[i]);
    }

    setIsCorrectSelection(isCorrect);

    try {
      await saveBallotSelections(selected.map(idx => items[idx].split('/').pop())); // Save full file names
      await saveCorrectSelections(Boolean(isCorrectSelection));
      console.log("Saved to DB!");
      navigate("/voting");
    } catch (error) {
      console.error("Error saving ballot selections:", error);
    }
  };

  const closeError = () => setShowError(false);

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />
        <div className="intro-container">
          <h1>Identification of Previously Cast Ballots</h1>
          <div className="text-main">
            Please select all words below that you have seen when casting your previous ballots.
          </div>
          <div className="security-box">
            <p className="text-small">
              <strong>Security Feature:</strong>
              <br />
              This part of the voting system makes sure you can vote freely without any outside pressure.
              Only you can update your vote so that your privacy is protected.
            </p>
          </div>
        </div>
        <div className="card" style={{ maxWidth: 1000, width: "100%", margin: "0 auto" }}>
          <div className="selected-count-inside">
            {selected.length} selected
          </div>
          <h1 style={{ width: "100%", textAlign: "left", margin: "0 0 10px 55px" }}>
            Select your words
          </h1>
          <div className="instruction-list" style={{ maxWidth: "800px", margin: "0 auto 0px auto", textAlign:"left" }}>
            <ul>
              <li>You need to select all the words below that you have seen when casting your previous ballots.</li>
              <li>The system will not reveal if your selection is correct for security reasons.</li>
              <li>Only the correct selection will ensure that your vote gets updated and counted into the results.</li>
              <li>If you are unsure or cannot remember your words, please contact election officials at your polling station.</li>
            </ul>
          </div>
          <div className="filter-card">
  <div className="filter-headline">Find your words</div>
  <div className="filter-instructions">
    Use the search box or click a letter to filter the list below to find your words.
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
<hr className="filter-divider-visual" />
          <div className="visual-select-grid-pictures">
            {filteredItems.map((imgSrc, idx) => {
              const globalIdx = page * PAGE_SIZE + idx;
              return (
                <div
                  key={globalIdx}
                  className={`visual-selection-picture${selected.includes(globalIdx) ? " selected" : ""}`}
                  onClick={() => handleSelect(globalIdx)}
                  style={{
                    cursor: "pointer",
                    width: 180,
                    height: 140,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    margin: "0 auto"
                  }}
                >
                  <div
                    className="picture-img-wrapper"
                    style={{
                      width: "100%",
                      height: 90,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fff"
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={`visual-${globalIdx}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        background: "#fff"
                      }}
                    />
                  </div>
                  <div className="picture-label" style={{ marginTop: 8, fontWeight: "bold", textAlign: "center" }}>
                    {imgSrc.split('/').pop().split('.')[0].replace(/_/g, ' ')}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
            <button className="button" onClick={() => setPage(page - 1)} disabled={page === 0}>
              Previous
            </button>
            <button className="button" onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1}>
              Next
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
          <button onClick={handleNext} className="button">
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
              <h2>
                Please review your chosen picture{selected.length > 1 ? "s" : ""} below.
                <br /> Do you wish to proceed?
              </h2>
              <div className="selected-pictures-preview-picture"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "16px",
                  justifyContent: "center",
                  alignItems: "start",
                  marginBottom: 20,
                  width: "100%",
                  padding: "8px 0",
                  maxHeight: "50vh",
                  overflowY: "auto"
                }}
              >
                {selected.map(idx => {
                  const imgSrc = items[idx];
                  const label = imgSrc.split('/').pop().split('.')[0].replace(/_/g, ' ');
                  return (
                    <div
                      key={idx}
                      className="preview-item-picture"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: 180,
                        height: 180,
                        border: "2px solid #c1bfbfff",
                        borderRadius: 4,
                        background: "#fff",
                        boxSizing: "border-box",
                        margin: 4,
                        padding: 0
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: 110,
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 0
                        }}
                      >
                        <img
                          src={imgSrc}
                          alt={`preview-${idx}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block"
                          }}
                        />
                      </div>
                      <div
                        className="picture-label"
                        style={{
                          marginTop: 2,
                          marginBottom: 0,
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "1.1rem",
                          color: "#222",
                          textTransform: "capitalize",
                          width: "100%",
                          lineHeight: 1.1,
                          minHeight: 28,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="modal-actions-picture">
                <button className="button" onClick={confirmSelection}>
                  Yes, proceed
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

export default VisualSelectionWord;
