import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ProcessBar from "./ProcessBar.js";
import VoteContext from "../Contexts/VoteContext";
import "./VisualSelection_Picture.css";
import { saveCorrectSelections, getVisualRepresentation, saveBallotSelections } from '../API/Voter.js'; // import getVisualRepresentation

// Import your images
import img4 from "../Images/alligator.jpg";
import img5 from "../Images/alpaca.jpg";
import img6 from "../Images/Apples.png";
import img7 from "../Images/aquarium.jpg";
import img8 from "../Images/baby.jpg";
import img9 from "../Images/bacon.jpg";
import img10 from "../Images/ball.jpg";
import img11 from "../Images/balloon.jpg";
import img12 from "../Images/banana.jpg";
import img13 from "../Images/basketball.jpg";
import img14 from "../Images/beachball.jpg";
import img15 from "../Images/bead.jpg";
import img16 from "../Images/beanie.jpg";
import img17 from "../Images/bear.jpg";
import img18 from "../Images/beer.jpg";
import img19 from "../Images/bat.jpg";
import img20 from "../Images/bee.jpg";
import img21 from "../Images/beetle.jpg";
import img22 from "../Images/bell_pepper.jpg";
import img23 from "../Images/berry.jpg";
import img24 from "../Images/birthday.jpg";
import img25 from "../Images/bouquet.jpg";
import img26 from "../Images/bow.jpg";
import img27 from "../Images/bowl.jpg";
import img28 from "../Images/broccoli.jpg";
import img29 from "../Images/butterfly.jpg";
import img30 from "../Images/calf.jpg";
import img31 from "../Images/camera.jpg";
import img32 from "../Images/candle.jpg";
import img33 from "../Images/candy_cane.jpg";
import img34 from "../Images/candy.jpg";
import img35 from "../Images/carousel.jpg";
import img36 from "../Images/carriage.jpg";
import img37 from "../Images/carrot.jpg";
import img38 from "../Images/cat.jpg";
import img39 from "../Images/caviar.jpg";
import img40 from "../Images/cereal.jpg";
import img41 from "../Images/champagne.jpg";
import img42 from "../Images/cheeseburger.jpg";
import img43 from "../Images/chick.jpg";
import img44 from "../Images/chicken.jpg";
import img45 from "../Images/chips.jpg";
import img46 from "../Images/christmas_tree.jpg";
import img47 from "../Images/cobra.jpg";
import img48 from "../Images/coffee.jpg";
import img49 from "../Images/confetti.jpg";
import img50 from "../Images/crab.jpg";
import img51 from "../Images/crow.jpg";
import img52 from "../Images/crepe.jpg";
import img53 from "../Images/cucumber.jpg";
import img54 from "../Images/cushion.jpg";
import img55 from "../Images/dart.jpg";
import img56 from "../Images/deodorant.jpg";
import img57 from "../Images/dice.jpg";
import img58 from "../Images/dog.jpg";
import img59 from "../Images/dolphin.jpg";
import img60 from "../Images/dough.jpg";
import img61 from "../Images/eagle.jpg";
import img62 from "../Images/egg.jpg";
import img63 from "../Images/ear.jpg";
import img64 from "../Images/earring.jpg";
import img65 from "../Images/elephant.jpg";
import img66 from "../Images/eye.jpg";
import img67 from "../Images/face.jpg";
import img68 from "../Images/feather.jpg";
import img69 from "../Images/finger.jpg";
import img70 from "../Images/fire.jpg";
import img71 from "../Images/fireworks.jpg";
import img72 from "../Images/foot.jpg";
import img73 from "../Images/fox.jpg";
import img74 from "../Images/frog.jpg";
import img75 from "../Images/garlic.jpg";
import img76 from "../Images/gift.jpg";
import img77 from "../Images/gingerbread_man.jpg";
import img78 from "../Images/giraffe.jpg";
import img79 from "../Images/girl.jpg";
import img80 from "../Images/globe.jpg";
import img81 from "../Images/gorilla.jpg";
import img82 from "../Images/hand.jpg";
import img83 from "../Images/honey.jpg";
import img84 from "../Images/hotair_balloon.jpg";
import img85 from "../Images/hourglass.jpg";
import img86 from "../Images/ice_cream.jpg";
import img87 from "../Images/iceskate.jpg";
import img88 from "../Images/jam.jpg";
import img89 from "../Images/javelin.jpg";
import img90 from "../Images/jetski.jpg";
import img91 from "../Images/kayak.jpg";
import img92 from "../Images/key.jpg";
import img93 from "../Images/kimono.jpg";
import img94 from "../Images/ladybug.jpg";
import img95 from "../Images/lamb.jpg";

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
  img94, img95
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

const VisualSelectionPicture = () => {
  const { userSelectedYes } = useContext(VoteContext);
  const navigate = useNavigate();

  // Shuffle the images to randomize order
  let shuffledImages = shuffleArray(allImages);

  // Take the first 50 but ensure img5 is included.
  let initialImages = shuffledImages.slice(0, 50);
  if (!initialImages.includes(img5)) {
    const randomIdx = Math.floor(Math.random() * initialImages.length);
    initialImages[randomIdx] = img5;
    // Optionally, reshuffle the subset to further randomize order:
    initialImages = shuffleArray(initialImages);
  }

  const [items, setItems] = useState(initialImages);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // modal state
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
      // If it's an object like { picture: "/static/media/banana.5f884f2a6ae015edf182.png" }
      visualBaseNames = Object.values(visualRepresentation).map(getBaseName);
    }

    // Compare arrays of base names (order and length must match)
    let isCorrect = false;
    if (visualBaseNames.length === selectedBaseNames.length) {
      isCorrect = visualBaseNames.every((name, i) => name === selectedBaseNames[i]);
    }

    setIsCorrectSelection(isCorrect);

    try {
      // Save only the file names (not base names) for ballot selections
      await saveBallotSelections(selected.map(idx => items[idx].split('/').pop()));
      await saveCorrectSelections(Boolean(isCorrectSelection));
      console.log("Saved to DB!");
      navigate("/voting", { state: { userSelectedYes } });
    } catch (error) {
      console.error("Error saving ballot selections:", error);
    }
  };

  const closeError = () => setShowError(false);

  // Filter items based on the current letter filter
  const filteredItems = items.filter((imgSrc) => {
    const label = imgSrc.split('/').pop().split('.')[0].replace(/_/g, ' ');
    return label.toLowerCase().startsWith(letterFilter.toLowerCase());
  });

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />
        <div className="intro-container">
          <h1>Identification of Previously Cast Ballots</h1>
          <div className="text-main">
            Please select all pictures below that you have seen when casting your previous ballots.
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
        <div className="card" style={{ maxWidth: 1000, width: "100%", position: "relative" }}>
          <div className="selected-count-inside">
            {selected.length} selected
          </div>
          <h1 style={{ width: "100%", textAlign: "left", margin: "0 0 10px 55px" }}>
            Select your pictures
          </h1>
          <div className="instruction-list" style={{ maxWidth: "800px", margin: "0 auto 0px auto", textAlign:"left" }}>
            <ul>
              <li>You need to select all the pictures below that you have seen when casting your previous ballots.</li>
              <li>The system will not reveal if your selection is correct for security reasons.</li>
              <li>Only the correct selection will ensure that your vote gets updated and counted into the results.</li>
              <li>If you are unsure or cannot remember your pictures, please contact election officials at your polling station.</li>
            </ul>
          </div>
          <div className="filter-card">
  <div className="filter-headline">Find your pictures</div>
  <div className="filter-instructions">
    Use the search box or click a letter to filter the list below to find your pictures.
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
<hr className="filter-divider-visual" style={{ width: "95%" }} />
          
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
                      {imgSrc.split('/').pop().split('.')[0].replace(/_/g, ' ')}
                    </div>
                  </div>
                );
              })
            )}
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
              <div className="selected-pictures-preview-picture">
                {selected.map(idx => {
                  const imgSrc = items[idx];
                  const label = imgSrc.split('/').pop().split('.')[0].replace(/_/g, ' ');
                  return (
                    <div key={idx} className="preview-item-picture" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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

export default VisualSelectionPicture;
