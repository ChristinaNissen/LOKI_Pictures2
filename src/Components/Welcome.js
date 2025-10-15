import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Welcome.css";
import "./Voting-system.css";
import votingIllustration from "../Assets/landingpage_banner.png";

const accordionData = [
	{
		title: "Ensure You're in a Private Environment",
		content:
			"Make sure you are alone and in a secure environment before starting the voting process.",
	},
	{
		title: "Get to Know our Anti-Coercion Measures",
		content:
			"Our system includes measures to prevent coercion and ensure your vote is confidential.",
	},
	{
		title: "Authentication Requirements",
		content:
			"You will need your NemID/MitID or another approved authentication method to log in.",
	},
	{
		title: "System Requirements",
		content:
			"Please use an updated browser and ensure your internet connection is stable.",
	},
	{
		title: "Need Help?",
		content: "Visit our Help section or contact support for assistance.",
	},
];

const Welcome = () => {
	const [openIndex, setOpenIndex] = useState(null);
	const navigate = useNavigate();

	const toggleAccordion = (idx) => {
		setOpenIndex(openIndex === idx ? null : idx);
	};

	return (
		<div className="page-wrapper">
			<Navbar />
			<main className="welcome-main">
				<h1>Welcome to Denmark's Online Voting Portal</h1>
				<div className="text-main">
					Your secure platform for participating in democratic decision-making
				</div>
				<button
					className="button"
					onClick={() => navigate("/private-mode")}
				>
					Login to Vote
				</button>
				<div className="welcome-illustration">
					<img
						src={votingIllustration}
						alt="Voting illustration"
						style={{ width: "100%", borderRadius: "8px" }}
					/>
				</div>
				<section className="card" style={{ width: "500px" }}>
					<h2>Before You Vote:</h2>
					<div className="accordion">
						{accordionData.map((item, idx) => (
							<div key={idx} className="accordion-item">
								<button
									className="accordion-title"
									onClick={() => toggleAccordion(idx)}
									aria-expanded={openIndex === idx}
								>
									{item.title}
									<span className="accordion-arrow">
										{openIndex === idx ? "▲" : "▼"}
									</span>
								</button>
								{openIndex === idx && (
									<div className="accordion-content">{item.content}</div>
								)}
							</div>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Welcome;
