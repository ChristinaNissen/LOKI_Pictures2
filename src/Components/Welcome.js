import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import "./Welcome.css";
import votingIllustration from "../Assets/landingpage_banner.png";
import overviewImg from "../Assets/Overview_Picture.png";

const infoData = [
	{
		title: "Vote in a Private and Safe Setting",
		content:
			"Please ensure you are alone and cannot be observed or influenced while voting. A private environment helps protect the secrecy of your vote and freedom to vote according to your own choice.",
	},
	{
		title: "Technical Requirements",
		content:
			"For a secure and reliable voting experience, use a modern web browser (such as the latest version of Chrome, Firefox, Safari, or Edge) and a stable internet connection.",
	},
	{
		title: "Protection Against Coercion",
		content:
			"This voting system is designed to protect your vote from coercion or undue influence. Your selections remain confidential, and no one can verify how you voted in the election.",
	},
	{
		title: "Need Assistance?",
		content: (
			<>
				If you experience any issues while voting or have questions, please visit the <Link to="/help" style={{ textDecoration: "underline" }}>Help</Link> section or contact voter support for assistance.
			</>
		),
	},
];

const Welcome = () => {
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="page-wrapper">
			<main className="welcome-main">
				<h1>Welcome to The Online Voting System</h1>
				<div className="text-main text-welcome-main">
					Your secure platform for participating in democratic decision-making
				</div>
				{/* Move the visual overview below the welcome illustration and before the info card, and match width to info card */}
				<div className="welcome-illustration">
					<img
						src={votingIllustration}
						alt="Voting illustration"
						style={{ width: "100%", borderRadius: "8px" }}
					/>
				</div>
				{/* Add a separate card for the steps above the info card */}
					<section className="card" style={{ maxWidth: "800px", marginBottom: "36px" }}>
					<div className="info-list">
						<h2 className="before-vote-heading">How to vote online</h2>
						<div className="info-item" style={{ padding: 0, border: 'none', textAlign: 'left' }}>
							<img src={overviewImg} alt="Voting process overview" style={{ width: '100%', borderRadius: '10px', display: 'block', marginBottom: '10px' }} />
						</div>
					</div>
				</section>


				<section className="card" style={{ maxWidth: "800px" }}>
					<div className="info-list">
						<h2 className="before-vote-heading">Before You Vote</h2>
						{infoData.map((item, idx) => (
							<div key={idx} className="info-item">
								<h3>{item.title}</h3>
								<p>{item.content}</p>
							</div>
						))}
					</div>
				</section>
			
				<button
				style={{ marginTop: "32px" }}
					className="button"
					onClick={() => navigate("/private-mode")}
				>
					Login to Vote
				</button>
			</main>
			<Footer />
		</div>
	);
};

export default Welcome;
