import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./BallotConfirmation.css";
import ProcessBar from "./ProcessBar.js"; 
import VoteContext from "../Contexts/VoteContext";


const staticCard = {
  numberOfEmojis: 6,
  emojiRef: "😊",
  colorRef: "#3887e7", // blue background
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

const randomWords = ["sheep", "tree", "moon", "star", "river", "cloud"];
const randomEmojis = [
  // Existing ones from your code
  "🌟", "🍀", "🔥", "🎈", "🌸", "⚡", "🍎", "🍌", "🍇", "🍉",
  // Smileys & Emotion
  "😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","☹️","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😥","😢","😭","😱","😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","🤬","😈","👿","💀","☠️","🤡","👹","👺","👻","👽","👾","🤖",
  // People & Body
  "👋","🤚","🖐️","✋","🖖","👌","🤌","🤏","✌️","🤞","🫰","🤟","🤘","🤙","🫵","🫱","🫲","🫳","🫴","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦵","🦶","👂","🦻","👃","🧠","🦷","🦴","👀","👁️","👅","👄","🫦",
  // Animals & Nature
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐻‍❄️","🐨","🐯","🦁","🐮","🐷","🐽","🐸","🐵","🙈","🙉","🙊","🐒","🐔","🐧","🐦","🐤","🐣","🐥","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🪱","🐛","🦋","🐌","🐞","🐜","🪰","🪲","🪳","🦟","🦗","🕷️","🕸️","🦂","🐢","🐍","🦎","🦖","🦕","🐙","🦑","🦐","🦞","🦀","🐡","🐠","🐟","🐬","🐳","🐋","🦈","🐊","🐅","🐆","🦓","🦍","🦧","🐘","🦣","🦛","🦏","🐪","🐫","🦒","🦘","🦬","🐃","🐂","🐄","🐎","🐖","🐏","🐑","🦙","🐐","🦌","🐕","🐩","🦮","🐕‍🦺","🐈","🐈‍⬛","🪶","🐓","🦃","🦤","🦚","🦜","🦢","🦩","🕊️","🐇","🦝","🦨","🦡","🦫","🦦","🦥","🐁","🐀","🐿️","🦔",
  // Food & Drink
  "🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️","🫑","🌽","🥕","🫒","🧄","🧅","🥔","🍠","🥐","🥯","🍞","🥖","🥨","🥞","🧇","🧀","🍖","🍗","🥩","🥓","🍔","🍟","🍕","🌭","🥪","🌮","🌯","🫔","🥙","🧆","🥚","🍳","🥘","🍲","🫕","🥣","🥗","🍿","🧈","🧂","🥫","🍱","🍘","🍙","🍚","🍛","🍜","🍝","🍠","🍢","🍣","🍤","🍥","🥮","🍡","🥟","🥠","🥡","🦪","🍦","🍧","🍨","🍩","🍪","🎂","🍰","🧁","🥧","🍫","🍬","🍭","🍮","🍯","🍼","🥛","☕","🫖","🍵","🍶","🍾","🍷","🍸","🍹","🍺","🍻","🥂","🥃","🫗","🥤","🧋","🧃","🧉","🧊",
  // Activities
  "⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🪀","🏓","🏸","🥅","🏒","🏑","🥍","🏏","🪃","🥌","🛷","⛸️","🥊","🥋","🥇","🥈","🥉","🏆","🎽","🎿","🛼","🛹","🛶","⛵","🚤","🛥️","🛳️","⛴️","🚢","✈️","🛩️","🛫","🛬","🪂","💺","🚁","🚟","🚠","🚡","🛰️","🚀","🛸",
  // Objects & Symbols
  "⌚","📱","📲","💻","⌨️","🖥️","🖨️","🖱️","🖲️","🕹️","🗜️","💽","💾","💿","📀","📼","📷","📸","📹","🎥","📽️","🎞️","📞","☎️","📟","📠","📺","📻","🎙️","🎚️","🎛️","⏱️","⏲️","⏰","🕰️","⌛","⏳","📡","🔋","🔌","💡","🔦","🕯️","🪔","🧯","🛢️","💸","💵","💴","💶","💷","🪙","💰","💳","🧾","💎","⚖️","🔧","🔨","⚒️","🛠️","⛏️","🔩","⚙️","🗜️","⚗️","🧪","🧫","🧬","🔬","🔭","📡","💉","💊","🩸","🩹","🩺","🚪","🛏️","🛋️","🪑","🚽","🚿","🛁","🪒","🧴","🧷","🧹","🧺","🧻","🪣","🧼","🪥","🧽","🧯","🛒","🚬","⚰️","🪦","⚱️","🏺",
  // Flags (a few examples)
  "🇺🇸","🇬🇧","🇨🇦","🇦🇺","🇫🇷","🇩🇪","🇮🇹","🇪🇸","🇯🇵","🇨🇳","🇰🇷","🇧🇷","🇮🇳","🇷🇺","🇿🇦"
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
  // Returns { columns, rows, positions } for 1–10
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
          [0, 0], [2, 0], // top corners
          [1, 1],         // center
          [0, 2], [2, 2]  // bottom corners
        ]
      };
    case 6:
      // 6-card pattern: 2 columns, 3 rows
      return {
        columns: 2,
        rows: 3,
        positions: [
          [0, 0], [1, 0], // top row
          [0, 1], [1, 1], // middle row
          [0, 2], [1, 2]  // bottom row
        ]
      };
    case 7:
      // 7-card pattern: 2 (top), 1 (centered), 2 (middle), 2 (bottom)
      return {
        columns: 2,
        rows: 5,
        positions: [
          [0, 0], [1, 0],     // top row (2)
          [0.5, 1],           // second row (centered)
          [0, 2], [1, 2],     // third row (2)
          [0, 3], [1, 3]      // fourth row (2)
        ]
      };
    case 8:
      // 8-card pattern: 2 (top), 1 (centered), 2 (middle), 1 (centered), 2 (bottom)
      return {
        columns: 2,
        rows: 6,
        positions: [
          [0, 0], [1, 0],     // top row (2)
          [0.5, 1],           // second row (centered)
          [0, 2], [1, 2],     // third row (2)
          [0.5, 3],           // fourth row (centered)
          [0, 4], [1, 4]      // fifth row (2)
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
      // 10-card pattern: 2 (top), 1 (centered), 2, 2, 1 (centered), 2 (bottom)
      return {
        columns: 2,
        rows: 7,
        positions: [
          [0, 0], [1, 0],       // top row (2)
          [0.5, 1],             // second row (centered)
          [0, 2], [1, 2],       // third row (2)
          [0, 3], [1, 3],       // fourth row (2)
          [0.5, 4],             // fifth row (centered)
          [0, 5], [1, 5]        // bottom row (2)
        ]
      };
    default:
      // fallback to a square grid
      const columns = Math.ceil(Math.sqrt(n));
      const rows = Math.ceil(n / columns);
      const positions = [];
      let count = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          if (count++ < n) positions.push([x, y]);
        }
      }
      return { columns, rows, positions };
  }
}

const BallotConfirmation = ({ type = "card", ballotNumber = 12345, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSelectedYes } = useContext(VoteContext);

  // Retrieve candidate name from navigation state; fallback if not set.
  const votedCandidate = location.state?.votedCandidate || "Candidate Unknown";

  const now = new Date();
  const dateTime = now.toLocaleString();

  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = ["Voted Before", "Visual Selection", "Voting", "Confirmation"];
  const steps = userSelectedYes ? stepsYes : stepsNo;
  const currentStep = userSelectedYes ? 4 : 3;

  const randomColors = generateDistinctColors(20);
  const emojiRef = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
  const colorRef = randomColors[Math.floor(Math.random() * randomColors.length)];
  const wordRef = randomWords[Math.floor(Math.random() * randomWords.length)];
  const numberOfEmojis = Math.floor(Math.random() * 10) + 1; // 1 to 10
  const config = getEmojiGridConfig(numberOfEmojis);


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
            Card 
          </h1>
          <div
    className="instruction-list"
    style={{ maxWidth: "800px", margin: "0 auto 20px auto", textAlign: "left", paddingLeft: "35px" }}
  >
    <ul>
      <li>
        You need to <strong>remember</strong> this card if you want to update your vote later in the election.
      </li>
      <li>
        You should <strong>not share</strong> your card with anyone, and you should <strong>not save</strong> it anywhere.
      </li>
    </ul>
  </div>
          <div className="confirmation-visual">
            {type === "card" && (
              <div
                className="confirmation-card"
                style={{
                  backgroundColor: staticCard.colorRef,
                  position: "relative"
                }}
              >
                <span className="card-corner card-corner-top-left">
                  {staticCard.numberOfEmojis}
                </span>
                <span className="card-corner card-corner-bottom-right">
                  {staticCard.numberOfEmojis}
                </span>
                <div className="emoji-area">
                  <div
                    className="confirmation-emoji-grid"
                    style={{
                      gridTemplateColumns: `repeat(${staticCard.config.columns}, 1fr)`,
                      gridTemplateRows: `repeat(${staticCard.config.rows}, 1fr)`
                    }}
                  >
                    {staticCard.config.positions.map(([x, y], i) => (
                      <span
                        key={i}
                        className="confirmation-emoji"
                        style={{
                          fontSize: "45px",
                          gridColumn: x + 1,
                          gridRow: y + 1,
                          justifySelf: "center"
                        }}
                      >
                        {staticCard.emojiRef}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="confirmation-info">
              <div className="confirmation-datetime">{dateTime}</div>
              <div className="confirmation-candidate"> {votedCandidate}</div>
            </div>
          </div>
        </div>
         <button className="button" style={{ marginTop: 40 }} onClick={handleLogout}>
            Logout
         </button>
      </main>
      <Footer />
    </div>
  );
};

export default BallotConfirmation;

