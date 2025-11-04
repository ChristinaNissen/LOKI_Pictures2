import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./VisualSelection_Card.css";
import ProcessBar from "./ProcessBar.js";
import VoteContext from "../Contexts/VoteContext";
import { saveCorrectSelections, getVisualRepresentation, saveBallotSelections } from '../API/Voter.js'; // import getVisualRepresentation

const staticCard = {
  numberOfEmojis: 6,
  emojiRef: "😊",
  colorRef: "#0000ff",
  config: {
    columns: 2,
    rows: 3,
    positions: [
      [0, 0], [1, 0],
      [0, 1], [1, 1],
      [0, 2], [1, 2]
    ]
  }
};

const randomEmojis = [
  "🌟", "🍀", "🔥", "🎈", "🌸", "⚡", "🍎", "🍌", "🍇", "🍉",
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉",
  "😌","😍","🥰","😘","😗","😙","😚","😋","😛","😜","🤪","😝","🤑",
  "🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬",
  "🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵",
  "🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","☹️",
  "😮","😯","😲","😳","🥺","😦","😧","😨","😰","😥","😢","😭","😱",
  "😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","🤬","😈","👿",
  "💀","☠️","🤡","👹","👺","👻","👽","👾","🤖","👋","🤚","🖐️","✋",
  "🖖","👌","🤌","🤏","✌️","🤞","🫰","🤟","🤘","🤙","🫵","🫱","🫲",
  "🫳","🫴","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾",
  "🦵","🦶","👂","🦻","👃","🧠","🦷","🦴","👀","👁️","👅","👄","🫦",
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐻‍❄️","🐨","🐯","🦁","🐮",
  "🐷","🐽","🐸","🐵","🙈","🙉","🙊","🐒","🐔","🐧","🐦","🐤","🐣",
  "🐥","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🪱","🐛","🦋",
  "🐌","🐞","🐜","🪰","🪲","🪳","🦟","🦗","🕷️","🕸️","🦂","🐢","🐍",
  "🦎","🦖","🦕","🐙","🦑","🦐","🦞","🦀","🐡","🐠","🐟","🐬","🐳",
  "🐋","🦈","🐊","🐅","🐆","🦓","🦍","🦧","🐘","🦣","🦛","🦏","🐪",
  "🐫","🦒","🦘","🦬","🐃","🐂","🐄","🐎","🐖","🐏","🐑","🦙","🐐",
  "🦌","🐕","🐩","🦮","🐕‍🦺","🐈","🐈‍⬛","🪶","🐓","🦃","🦤","🦚",
  "🦜","🦢","🦩","🕊️","🐇","🦝","🦨","🦡","🦫","🦦","🦥","🐁","🐀",
  "🐿️","🦔","🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈",
  "🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️",
  "🫑","🌽","🥕","🫒","🧄","🧅","🥔","🍠","🥐","🥯","🍞","🥖","🥨",
  "🥞","🧇","🧀","🍖","🍗","🥩","🥓","🍔","🍟","🍕","🌭","🥪","🌮",
  "🌯","🫔","🥙","🧆","🥚","🍳","🥘","🍲","🫕","🥣","🥗","🍿","🧈",
  "🧂","🥫","🍱","🍘","🍙","🍚","🍛","🍜","🍝","🍠","🍢","🍣","🍤",
  "🍥","🥮","🍡","🥟","🥠","🥡","🦪","🍦","🍧","🍨","🍩","🍪","🎂",
  "🍰","🧁","🥧","🍫","🍬","🍭","🍮","🍯","🍼","🥛","☕","🫖","🍵",
  "🍶","🍾","🍷","🍸","🍹","🍺","🍻","🥂","🥃","🫗","🥤","🧋","🧃",
  "🧉","🧊","⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🪀","🏓",
  "🏸","🥅","🏒","🏑","🥍","🏏","🪃","🥌","🛷","⛸️","🥊","🥋","🥇",
  "🥈","🥉","🏆","🎽","🎿","🛼","🛹","🛶","⛵","🚤","🛥️","🛳️","⛴️",
  "🚢","✈️","🛩️","🛫","🛬","🪂","💺","🚁","🚟","🚠","🚡","🛰️","🚀",
  "🛸","⌚","📱","📲","💻","⌨️","🖥️","🖨️","🖱️","🖲️","🕹️","🗜️",
  "💽","💾","💿","📀","📼","📷","📸","📹","🎥","📽️","🎞️","📞","☎️",
  "📟","📠","📺","📻","🎙️","🎚️","🎛️","⏱️","⏲️","⏰","🕰️","⌛",
  "⏳","📡","🔋","🔌","💡","🔦","🕯️","🪔","🧯","🛢️","💸","💵","💴",
  "💶","💷","🪙","💰","💳","🧾","💎","⚖️","🔧","🔨","⚒️","🛠️","⛏️",
  "🔩","⚙️","🗜️","⚗️","🧪","🧫","🧬","🔬","🔭","📡","💉","💊","🩸",
  "🩹","🩺","🚪","🛏️","🛋️","🪑","🚽","🚿","🛁","🪒","🧴","🧷","🧹",
  "🧺","🧻","🪣","🧼","🪥","🧽","🧯","🛒","🚬","⚰️","🪦","⚱️","🏺",
  "🇺🇸","🇬🇧","🇨🇦","🇦🇺","🇫🇷","🇩🇪","🇮🇹","🇪🇸","🇯🇵","🇨🇳","🇰🇷","🇧🇷",
  "🇮🇳","🇷🇺","🇿🇦"
];

function generateDistinctColors(n) {
  const colors = [];
  for (let i = 0; i < n; i++) {
    const hue = Math.round((360 / n) * i);
    colors.push(`hsl(${hue}, 70%, 55%)`);
  }
  return colors;
}

function getEmojiGridConfig(n) {
  switch (n) {
    case 1:
      return { columns: 1, rows: 1, positions: [[0, 0]] };
    case 2:
      return { columns: 1, rows: 2, positions: [[0, 0], [0, 1]] };
    case 3:
      return { columns: 1, rows: 3, positions: [[0, 0], [0, 1], [0, 2]] };
    case 4:
      return { columns: 2, rows: 2, positions: [[0, 0], [1, 0], [0, 1], [1, 1]] };
    case 5:
      return {
        columns: 3,
        rows: 3,
        positions: [
          [0, 0], [2, 0],
          [1, 1],
          [0, 2], [2, 2]
        ]
      };
    case 6:
      return {
        columns: 2,
        rows: 3,
        positions: [
          [0, 0], [1, 0],
          [0, 1], [1, 1],
          [0, 2], [1, 2]
        ]
      };
    case 7:
      return {
        columns: 2,
        rows: 5,
        positions: [
          [0, 0], [1, 0],
          [0.5, 1],
          [0, 2], [1, 2],
          [0, 3], [1, 3]
        ]
      };
    case 8:
      return {
        columns: 2,
        rows: 6,
        positions: [
          [0, 0], [1, 0],
          [0.5, 1],
          [0, 2], [1, 2],
          [0.5, 3],
          [0, 4], [1, 4]
        ]
      };
    case 9:
      return {
        columns: 3,
        rows: 3,
        positions: [
          [0, 0], [1, 0], [2, 0],
          [0, 1], [1, 1], [2, 1],
          [0, 2], [1, 2], [2, 2]
        ]
      };
    case 10:
      return {
        columns: 2,
        rows: 7,
        positions: [
          [0, 0], [1, 0],
          [0.5, 1],
          [0, 2], [1, 2],
          [0, 3], [1, 3],
          [0.5, 4],
          [0, 5], [1, 5]
        ]
      };
    default:
      const columns = Math.ceil(Math.sqrt(n));
      const rows = Math.ceil(n / columns);
      const positions = [];
      let count = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          if (count < n) {
            positions.push([x, y]);
            count++;
          }
        }
      }
      return { columns, rows, positions };
  }
}

function generateRandomCard() {
  const numberOfEmojis = Math.floor(Math.random() * 10) + 1;
  const emojiRef = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
  const colorObj = COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)];
  const colorRef = colorObj.hex;
  const colorName = colorObj.name;
  const config = getEmojiGridConfig(numberOfEmojis);
  return { numberOfEmojis, emojiRef, colorRef, config };
}

const PAGE_SIZE = 39;
function getInitialCards() {
  // Generate 49 random cards
  const randomCards = Array.from({ length: 49 }, generateRandomCard);

  // Insert staticCard at a random position
  const insertIndex = Math.floor(Math.random() * 50);
  randomCards.splice(insertIndex, 0, staticCard);

  return randomCards; // Now always 50 cards, staticCard included
}

function getColorNameFromHSL(hsl) {
  // hsl is a string like "hsl(120, 70%, 55%)"
  const hue = parseInt(hsl.match(/\d+/)[0], 10);
  if (hue >= 0 && hue < 30) return "Red";
  if (hue >= 30 && hue < 60) return "Orange";
  if (hue >= 60 && hue < 90) return "Yellow";
  if (hue >= 90 && hue < 150) return "Green";
  if (hue >= 150 && hue < 210) return "Cyan";
  if (hue >= 210 && hue < 270) return "Blue";
  if (hue >= 270 && hue < 330) return "Purple";
  return "Red";
}

const COLOR_LIST = [
  { name: "Red", hex: "#ff0000" },
  { name: "Blue", hex: "#0000ff" },
  { name: "Green", hex: "#28d328ff" },
  { name: "Orange", hex: "#ffa500" },
  { name: "Yellow", hex: "#fefe43ff" },
  { name: "Purple", hex: "#800080" },
  { name: "Brown", hex: "#a52a2a" },
  { name: "Gray", hex: "#808080" },
  { name: "Pink", hex: "#ffc0cb" },
  { name: "Olive", hex: "#808000" },
  { name: "Maroon", hex: "#800000" },
  { name: "Violet", hex: "#ee82ee" },
  { name: "Charcoal", hex: "#36454f" },
  { name: "Magenta", hex: "#ff00ff" },
  { name: "Bronze", hex: "#cd7f32" },
  { name: "Cream", hex: "#fffdd0" },
  { name: "Tan", hex: "#d2b48c" },
  { name: "Teal", hex: "#008080" },
  { name: "Mustard", hex: "#ffdb58" },
  { name: "Navy Blue", hex: "#000080" },
  { name: "Coral", hex: "#ff7f50" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Lavender", hex: "#e6e6fa" },
  { name: "Mauve", hex: "#e0b0ff" },
  { name: "Cyan", hex: "#e0f7fa" },
  { name: "Peach", hex: "#ffe5b4" },
  { name: "Rust", hex: "#b7410e" },
  { name: "Indigo", hex: "#4b0082" },
  { name: "Ruby", hex: "#e0115f" },
  { name: "Lime Green", hex: "#32cd32" },
  { name: "Salmon", hex: "#fa8072" },
  { name: "Azure", hex: "#007fff" },
  { name: "Beige", hex: "#f5f5dc" },
  { name: "Copper Rose", hex: "#996666" },
  { name: "Turquoise", hex: "#40e0d0" },
  { name: "Aqua", hex: "#00ffff" },
  { name: "Mint", hex: "#3eb489" },
  { name: "Sky Blue", hex: "#87ceeb" },
  { name: "Crimson", hex: "#dc143c" },
  { name: "Saffron", hex: "#f4c430" },
  { name: "Lemon Yellow", hex: "#fff44f" },
  { name: "Grapevine", hex: "#43254f" },
  { name: "Fuschia", hex: "#ff00ff" },
  { name: "Amber", hex: "#ffbf00" },
  { name: "Sea Green", hex: "#2e8b57" },
  { name: "Dark Green", hex: "#006400" },
  { name: "Pearl", hex: "#eae0c8" },
  { name: "Ivory", hex: "#fffff0" },
  { name: "Tangerine", hex: "#f28500" },
  { name: "Garnet", hex: "#733635" },
  { name: "Cherry Red", hex: "#de3163" },
  { name: "Emerald", hex: "#50c878" },
  { name: "Brunette", hex: "#664238" },
  { name: "Sapphire", hex: "#0f52ba" },
  { name: "Lilac", hex: "#c8a2c8" },
  { name: "Rosewood", hex: "#65000b" },
  { name: "Arctic Blue", hex: "#0000ff" },
  { name: "Ash", hex: "#808080" },
  { name: "Mocha", hex: "#C0A392" },
  { name: "Coffee Brown", hex: "#6f4e37" },
  { name: "Umber", hex: "#635147" }
];

const blackTextColors = [
  "Ivory",
  "Beige",
  "Pearl",
  "Yellow",
  "Cream",
  "Lavender",
  "Lemon Yellow",
  "Cyan",
  "Peach"
];

const VisualSelection = () => {
  const navigate = useNavigate();
  const { userSelectedYes } = useContext(VoteContext);

  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = ["Voted Before", "Identification of Previous Ballots", "Voting", "Confirmation"];
  const steps = userSelectedYes ? stepsYes : stepsNo;
  const currentStep = userSelectedYes ? 2 : 0;

  const [cards, setCards] = useState(() => getInitialCards());
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // new modal state
  const [visualRepresentation, setVisualRepresentation] = useState(null);
  const [isCorrectSelection, setIsCorrectSelection] = useState(null);

  useEffect(() => {
  const interval = setInterval(() => {
    setCards(prevCards => {
      const remaining = 94 - prevCards.length;
      if (remaining <= 0) {
        clearInterval(interval);
        return prevCards;
      }
      const count = Math.min(10, remaining);
      return [...prevCards, ...Array.from({ length: count }, generateRandomCard)];
    });
  }, 60000);
  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    // Fetch the visual representation when the component mounts
    const fetchVisual = async () => {
      const visual = await getVisualRepresentation();
      setVisualRepresentation(visual);
    };
    fetchVisual();
  }, []);

  const totalPages = Math.ceil(cards.length / PAGE_SIZE);
  const pagedCards = cards.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSelect = (idx) => {
    setSelected(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  // Instead of navigating immediately, show the confirmation modal
  const handleNext = async (e) => {
    if (selected.length > 0) {
      e.preventDefault();
      await saveBallotSelections(selected);
      setShowConfirm(true);
    } else {
      setShowError(true);
    }
  };


  // When user confirms, navigate to voting
  const confirmSelection = async () => {
    // Gather selected card features (number, emoji, colorRef as hex)
    const selectedCardFeatures = selected.map(idx => {
      const card = cards[idx];
      return {
        numberOfEmojis: card.numberOfEmojis,
        emojiRef: card.emojiRef,
        colorRef: card.colorRef // Store as hex
      };
    });

    // Compare with visualRepresentation (assuming it's an array or object)
    let isCorrect = false;
    if (visualRepresentation) {
      if (Array.isArray(visualRepresentation)) {
        isCorrect =
          visualRepresentation.length === selectedCardFeatures.length &&
          visualRepresentation.every((v, i) =>
            v.numberOfEmojis === selectedCardFeatures[i].numberOfEmojis &&
            v.emojiRef === selectedCardFeatures[i].emojiRef &&
            v.colorRef === selectedCardFeatures[i].colorRef
          );
      } else {
        isCorrect =
          selectedCardFeatures.length === 1 &&
          selectedCardFeatures[0].numberOfEmojis === visualRepresentation.numberOfEmojis &&
          selectedCardFeatures[0].emojiRef === visualRepresentation.emojiRef &&
          selectedCardFeatures[0].colorRef === visualRepresentation.colorRef;
      }
    }

    setIsCorrectSelection(isCorrect);

    try {
      await saveBallotSelections(selectedCardFeatures); // Now stores colorRef as hex
      await saveCorrectSelections(Boolean(isCorrectSelection));
      navigate("/voting", { state: { userSelectedYes: true } });
    } catch (error) {
      console.error("Error saving card selections:", error);
    }
  };

  const closeError = () => setShowError(false);


  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />
        <div className="intro-container">
          <h1>Identification of previously cast ballots</h1>
          <div className="text-main" style={{ maxWidth: "800px", textAlign: "center" }}>
            Please select all cards below that you have seen when casting your previous ballots.
          </div>
          <div className="security-box">
            <p className="text-small">
              <strong>Security Feature:</strong><br/>
              This part of the voting system makes sure you can vote freely without any outside pressure.
              Only you can update your vote so that your privacy is protected.
            </p>
          </div>
          {/*
          <div className="text-main" style={{maxWidth: "800px", textAlign: "left"}}>
            You need to select <strong>all</strong> the cards below that you have seen when casting your previous ballots.
            The system will not reveal if your selection is correct for security reasons.
            Only the correct selection will ensure that your vote is counted.
            If you are unsure or cannot remember your cards, please contact election officials at your polling station.
          </div>*/}
          
        </div>
        <div className="card" style={{ maxWidth: 1000, width: "100%", position: "relative"}}>
          <div className="selected-count-inside">
            {selected.length} card{selected.length === 1 ? "" : "s"} selected
          </div>
          <h1 style={{ width: "100%", textAlign: "left", margin: "0 0 10px 55px" }}>
            Select your cards
          </h1>
          <div className="instruction-list" style={{ maxWidth: "800px", margin: "0 auto 20px auto", textAlign: "left" }}>
            <ul>
              <li>You need to select all the cards below that you have seen when casting your previous ballots.</li>
              <li>The system will not reveal if your selection is correct for security reasons.</li>
              <li>Only the correct selection will ensure that your vote gets updated and counted into the results.</li>
              <li>If you are unsure or cannot remember your cards, please contact election officials at your polling station.</li>
            </ul>
          </div>
          {/* Wrap the grid with a container */}
          <div className="visual-selection-grid-container">
            <div className="visual-selection-grid" style={{ marginTop: "20px" }}>
              {pagedCards.map((card, idx) => {
                const globalIdx = page * PAGE_SIZE + idx;
                // Find the color object for this card
                const colorObj = COLOR_LIST.find(c => c.hex.toLowerCase() === card.colorRef.toLowerCase()) || { name: "Color", hex: card.colorRef };
                const emojiNames = {
                  "😊": "smiling face",
                  "🐑": "sheep",
                  "⭐": "star",
                  // ...add all emojis you use
                };
                const emojiName = emojiNames[card.emojiRef] || "emoji";
                const cardLabel = `${colorObj.name} card with ${card.numberOfEmojis} ${card.emojiRef} ${emojiName}${card.numberOfEmojis > 1 ? "s" : ""}`;
                const numberTextColor = blackTextColors.includes(colorObj.name) ? "#000" : "#fff";
                return (
                  <div className="visual-selection-card-container" key={globalIdx}>
                    <div
                      className={`confirmation-card visual-selection-item${selected.includes(globalIdx) ? " selected" : ""}`}
                      style={{
                        backgroundColor: card.colorRef,
                        position: "relative",
                        cursor: "pointer"
                      }}
                      onClick={() => handleSelect(globalIdx)}
                    >
                      <span
                        className="card-corner card-corner-top-left"
                        style={{ color: numberTextColor }}
                      >
                        {card.numberOfEmojis}
                      </span>
                      <span
                        className="card-corner card-corner-bottom-right"
                        style={{ color: numberTextColor }}
                      >
                        {card.numberOfEmojis}
                      </span>
                      <div className="emoji-area">
                        <div
                          className="confirmation-emoji-grid"
                          style={{
                            gridTemplateColumns: `repeat(${card.config.columns}, 1fr)`,
                            gridTemplateRows: `repeat(${card.config.rows}, 1fr)`
                          }}
                        >
                          {card.config.positions.map(([x, y], i) => {
                            let fontSize;
                            switch (card.numberOfEmojis) {
                              case 1: fontSize = "80px"; break;
                              case 2:
                              case 3:
                              case 4:
                              case 5:
                              case 6:
                              case 7:
                              case 8:
                              case 9: fontSize = "45px"; break;
                              case 10: fontSize = "32px"; break;
                              default: fontSize = "36px";
                            }
                            return (
                              <span
                                key={i}
                                className="confirmation-emoji"
                                style={{
                                  fontSize,
                                  gridColumn: x % 1 === 0 ? x + 1 : "1 / span 2",
                                  gridRow: y + 1,
                                  justifySelf: "center"
                                }}
                              >
                                {card.emojiRef}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="card-label">
                      {cardLabel}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Navigation buttons below */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
            <button className="button" onClick={() => setPage(page - 1)} disabled={page === 0}>
              Previous
            </button>
            <button className="button" onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1}>
              Next
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <button onClick={handleNext} className="button">
            Confirm selection
          </button>
        </div>
        {showError && (
          <div className="error-overlay">
            <div className="error-message">
              <p>Please select at least one card</p>
              <button onClick={closeError} className="button">
                Close
              </button>
            </div>
          </div>
        )}
        {showConfirm && (
          <div className="modal-backdrop">
            <div className="modal" style={{
  display: "flex",
  flexDirection: "column",
  maxHeight: "90vh",
  maxWidth: "90vw",
  width: "900px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
  padding: "24px 32px",
  overflow: "hidden"
}}>
  <h2 style={{ marginBottom: 16 }}>
    Please review your chosen card{selected.length > 1 ? "s" : ""} below.<br />
    Do you wish to proceed?
  </h2>
  <div className="selected-cards-preview" style={{
    flex: "1 1 auto",
    overflowY: "auto",
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 24,
    maxHeight: "50vh"
  }}>
    {selected.map(idx => {
                  const card = cards[idx];
                  const colorObj = COLOR_LIST.find(c => c.hex.toLowerCase() === card.colorRef.toLowerCase()) || { name: "Color", hex: card.colorRef };
                  const emojiNames = {
                    "😊": "smiling face",
                    "🐑": "sheep",
                    "⭐": "star",
                    // ...add all emojis you use
                  };
                  const emojiName = emojiNames[card.emojiRef] || "emoji";
                  const cardLabel = `${colorObj.name} card with ${card.numberOfEmojis} ${card.emojiRef} ${emojiName}${card.numberOfEmojis > 1 ? "s" : ""}`;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "4px"
                      }}
                    >
                      <div
                        className="confirmation-card preview-item"
                        style={{
                          backgroundColor: card.colorRef,
                          position: "relative"
                        }}
                      >
                        <span className="card-corner card-corner-top-left">{card.numberOfEmojis}</span>
                        <span className="card-corner card-corner-bottom-right">{card.numberOfEmojis}</span>
                        <div className="emoji-area">
                          <div
                            className="confirmation-emoji-grid"
                            style={{
                              gridTemplateColumns: `repeat(${card.config.columns}, 1fr)`,
                              gridTemplateRows: `repeat(${card.config.rows}, 1fr)`
                            }}
                          >
                            {card.config.positions.map(([x, y], i) => (
                              <span
                                key={i}
                                className="confirmation-emoji"
                                style={{
                                  fontSize: "30px", // smaller for preview
                                  gridColumn: x % 1 === 0 ? x + 1 : "1 / span 2",
                                  gridRow: y + 1,
                                  justifySelf: "center"
                                }}
                              >
                                {card.emojiRef}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="card-label" style={{ marginTop: 8, fontWeight: "bold", textAlign: "center" }}>
                        {cardLabel}
                      </div>
                    </div>
                  );
                })}
  </div>
  <div className="modal-actions" style={{
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    marginTop: "5px",
    marginBottom: "20px"
  }}>
    <button 
      className="button" 
      onClick={confirmSelection}>
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

export default VisualSelection;