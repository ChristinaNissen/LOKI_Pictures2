import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ProcessBar from "./ProcessBar.js";
import VoteContext from "../Contexts/VoteContext";
import "./VisualSelection_Picture.css";
import { saveCorrectSelections, getVisualRepresentation, saveBallotSelections } from '../API/Voter.js'; // import getVisualRepresentation

// Import your images
import img1 from "../Images/alligator.jpg";
import img2 from "../Images/alpaca.jpg";
import img3 from "../Images/apple.jpg";
import img4 from "../Images/Apples.png";
import img5 from "../Images/aquarium.jpg";
import img6 from "../Images/avocado.jpg";
import img7 from "../Images/balloon.jpg";
import img8 from "../Images/banana.jpg";
import img9 from "../Images/basketball.jpg";
import img10 from "../Images/bear.jpg";
import img11 from "../Images/beard.jpg";
import img12 from "../Images/bouquet.jpg";
import img13 from "../Images/bow.jpg";
import img14 from "../Images/bowl.jpg";
import img15 from "../Images/broccoli.jpg";
import img16 from "../Images/bubble.jpg";
import img17 from "../Images/butterfly.jpg";
import img18 from "../Images/calf.jpg";
import img19 from "../Images/camera.jpg";
import img20 from "../Images/carousel.jpg";
import img21 from "../Images/carrot.jpg";
import img22 from "../Images/cat.jpg";
import img23 from "../Images/champagne.jpg";
import img24 from "../Images/cheeseburger.jpg";
import img25 from "../Images/christmas_tree.jpg";
import img26 from "../Images/coffee.jpg";
import img27 from "../Images/cucumber.jpg";
import img28 from "../Images/cushion.jpg";
import img29 from "../Images/dart.jpg";
import img30 from "../Images/deodorant.jpg";
import img31 from "../Images/dice.jpg";
import img32 from "../Images/dog.jpg";
import img33 from "../Images/dolphin.jpg";
import img34 from "../Images/dough.jpg";
import img35 from "../Images/dough_01b.jpg";
import img36 from "../Images/eagle.jpg";
import img37 from "../Images/ear.jpg";
import img38 from "../Images/earring.jpg";
import img39 from "../Images/egg.jpg";
import img40 from "../Images/elephant.jpg";
import img41 from "../Images/envelope_04s.jpg";
import img42 from "../Images/eye.jpg";
import img43 from "../Images/face.jpg";
import img44 from "../Images/feather.jpg";
import img45 from "../Images/finger.jpg";
import img46 from "../Images/fire.jpg";
import img47 from "../Images/fireworks.jpg";
import img48 from "../Images/foot.jpg";
import img49 from "../Images/fox.jpg";
import img50 from "../Images/frog.jpg";
import img51 from "../Images/garlic.jpg";
import img52 from "../Images/gift.jpg";
import img53 from "../Images/gingerbread_man.jpg";
import img54 from "../Images/giraffe.jpg";
import img55 from "../Images/girl.jpg";
import img56 from "../Images/globe.jpg";
import img57 from "../Images/gorilla.jpg";
import img58 from "../Images/hand.jpg";
import img59 from "../Images/highlighter_01b.jpg";
import img60 from "../Images/honey.jpg";
import img61 from "../Images/hoodie_01b.jpg";
import img62 from "../Images/horse.jpg";
import img63 from "../Images/hotair_balloon.jpg";
import img64 from "../Images/hourglass.jpg";
import img65 from "../Images/ice_cream.jpg";
import img66 from "../Images/iceskate.jpg";
import img67 from "../Images/inhaler_02s.jpg";
import img68 from "../Images/ink_01b.jpg";
import img69 from "../Images/insole_04s.jpg";
import img70 from "../Images/iron_01b.jpg";
import img71 from "../Images/jacket_02s.jpg";
import img72 from "../Images/jalapeno_01b.jpg";
import img73 from "../Images/jam.jpg";
import img74 from "../Images/javelin.jpg";
import img75 from "../Images/jelly_bean_01b.jpg";
import img76 from "../Images/jetski.jpg";
import img77 from "../Images/juice_03s.jpg";
import img78 from "../Images/kangaroo_01b.jpg";
import img79 from "../Images/kayak.jpg";
import img80 from "../Images/ketchup_01b.jpg";
import img81 from "../Images/key.jpg";
import img82 from "../Images/key_01b.jpg";
import img83 from "../Images/keyboard_01s.jpg";
import img84 from "../Images/kimono.jpg";
import img85 from "../Images/ladybug.jpg";
import img86 from "../Images/lamb.jpg";
import img87 from "../Images/lantern_01b.jpg";
import img88 from "../Images/lasagna_03s.jpg";
import img89 from "../Images/lego_01b.jpg";
import img90 from "../Images/lemon_01b.jpg";
import img91 from "../Images/limousine_01s.jpg";

const allImages = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
  img31, img32, img33, img34, img35, img36, img37, img38, img39, img40,
  img41, img42, img43, img44, img45, img46, img47, img48, img49, img50,
  img51, img52, img53, img54, img55, img56, img57, img58, img59, img60,
  img61, img62, img63, img64, img65, img66, img67, img68, img69, img70,
  img71, img72, img73, img74, img75, img76, img77, img78, img79, img80,
  img81, img82, img83, img84, img85, img86, img87, img88, img89, img90,
  img91
];

const PAGE_SIZE = 39;

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

  // Helper function to get the starting letter of an image
  const getImageLetter = (imgSrc) => {
    const filename = imgSrc.split('/').pop().split('.')[0];
    return filename.charAt(0).toLowerCase();
  };

  // Group images by starting letter for better distribution
  const groupByLetter = () => {
    const groups = {};
    allImages.forEach(img => {
      const letter = getImageLetter(img);
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(img);
    });
    return groups;
  };

  // Create initial images with balanced distribution
  const createBalancedInitialImages = () => {
    const letterGroups = groupByLetter();
    const letters = Object.keys(letterGroups);
    
    // Shuffle images within each letter group
    Object.keys(letterGroups).forEach(letter => {
      letterGroups[letter] = shuffleArray(letterGroups[letter]);
    });
    
    // Take up to 2 images from each letter to create first page (39 images)
    const firstPage = [];
    const remaining = [];
    
    // First round: take 1 image from each letter
    letters.forEach(letter => {
      if (letterGroups[letter].length > 0) {
        firstPage.push(letterGroups[letter].shift());
      }
    });
    
    // Second round: take another image from letters that have more
    letters.forEach(letter => {
      if (letterGroups[letter].length > 0 && firstPage.length < 39) {
        firstPage.push(letterGroups[letter].shift());
      }
    });
    
    // If we still need more images to reach 39, keep adding
    while (firstPage.length < 39) {
      for (let letter of letters) {
        if (letterGroups[letter].length > 0 && firstPage.length < 39) {
          firstPage.push(letterGroups[letter].shift());
        }
      }
    }
    
    // Collect remaining images
    letters.forEach(letter => {
      remaining.push(...letterGroups[letter]);
    });
    
    // Ensure alpaca is in first page
    if (!firstPage.includes(img2)) {
      const alpacaInRemaining = remaining.indexOf(img2);
      if (alpacaInRemaining >= 0) {
        // Swap alpaca with a random image in first page
        const randomIdx = Math.floor(Math.random() * firstPage.length);
        const temp = firstPage[randomIdx];
        firstPage[randomIdx] = img2;
        remaining[alpacaInRemaining] = temp;
      } else {
        // Replace a random image in first page with alpaca
        const randomIdx = Math.floor(Math.random() * firstPage.length);
        firstPage[randomIdx] = img2;
      }
    }
    
    // Shuffle first page to randomize positions
    const shuffledFirstPage = shuffleArray(firstPage);
    
    // Shuffle remaining and take first 9 for second page
    const shuffledRemaining = shuffleArray(remaining);
    
    return [...shuffledFirstPage, ...shuffledRemaining.slice(0, 9)];
  };

  const [items, setItems] = useState(createBalancedInitialImages());
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
            
            <p className="scroll-instruction-text">
              Scroll through the pictures and use the "Next page" button below to see more.
            </p>
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
          <div className="pagination-buttons" style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "16px" }}>
            <button className="button" onClick={() => setPage(page - 1)} disabled={page === 0}>
              ← Previous page
            </button>
            <button className="button" onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1}>
              Next page →
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

