import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./VisualSelection_Card.css";
import ProcessBar from "./ProcessBar.js";
import VoteContext from "../Contexts/VoteContext";

const staticCard = {
  numberOfEmojis: 6,
  emojiRef: "😊",
  colorRef: "#3887e7",
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
  const colorRef = generateDistinctColors(20)[Math.floor(Math.random() * 20)];
  const config = getEmojiGridConfig(numberOfEmojis);
  return { numberOfEmojis, emojiRef, colorRef, config };
}

const PAGE_SIZE = 39;
function getInitialCards() {
  const randomCards = Array.from({ length: 91 }, generateRandomCard);
  const insertIndex = Math.floor(Math.random() * PAGE_SIZE);
  randomCards.splice(insertIndex, 0, staticCard);
  return randomCards;
}

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

  useEffect(() => {
    const interval = setInterval(() => {
      const randomCount = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
      setCards(prevCards => [
        ...prevCards,
        ...Array.from({ length: randomCount }, generateRandomCard)
      ]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const totalPages = Math.ceil(cards.length / PAGE_SIZE);
  const pagedCards = cards.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSelect = (idx) => {
    setSelected(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  // Instead of navigating immediately, show the confirmation modal
  const handleNext = () => {
    if (selected.length > 0) {
      setShowConfirm(true);
    } else {
      setShowError(true);
    }
  };

  const closeError = () => setShowError(false);
  
  // When user confirms, navigate to voting
  const confirmSelection = () => {
    navigate("/voting", { state: { userSelectedYes: true } });
  };

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
        <div className="card" style={{ maxWidth: 1000, width: "100%", position: "relative" }}>
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
            <div className="visual-selection-grid">
              {pagedCards.map((card, idx) => {
                const globalIdx = page * PAGE_SIZE + idx;
                return (
                  <div
                    key={globalIdx}
                    className={`confirmation-card visual-selection-item${selected.includes(globalIdx) ? " selected" : ""}`}
                    style={{
                      backgroundColor: card.colorRef,
                      position: "relative",
                      cursor: "pointer"
                    }}
                    onClick={() => handleSelect(globalIdx)}
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
            <div className="modal">
              <h2> Please review your chosen card(s) below. <br /> Do you wish to proceed?</h2>
              <div className="selected-cards-preview">
                {selected.map(idx => {
                  const card = cards[idx];
                  return (
                    <div
                      key={idx}
                      className="confirmation-card preview-item"
                      style={{
                        backgroundColor: card.colorRef,
                        position: "relative",
                        margin: "4px"
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
                  );
                })}
              </div>
              <div className="modal-actions" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap:"16px", marginTop: "5px", marginBottom: "20px" }}>
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