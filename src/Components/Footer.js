import React from "react";
import "./Footer.css";
import Logo from "../Assets/logo.jpg";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h4>LEGAL</h4>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Cookie Policy</li>
          <li>Accessibility Statement</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>SUPPORT</h4>
        <ul>
          <li>Report a Problem</li>
          <li>Contact Support</li>
          <li>FAQ</li>
          <li>Help Center</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>ABOUT</h4>
        <ul>
          <li>About the Election</li>
          <li>Security Measures</li>
          <li>Voting Process</li>
          <li>Accessibility</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>CONTACT</h4>
        <ul>
          <li>Election Commission</li>
          <li>123 Main Street<br/>City, Postal Code</li>
          <li>Phone: +X XXX XXX XXXX</li>
          <li>contact@election.gov</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-logo">
        <img
          src={Logo}
          alt="Agency Logo"
        />
        <span>AGENCY FOR ONLINE VOTING</span>
        <span className="footer-portal">Official Election Portal</span>
      </div>
      <div className="footer-copyright">
        © 2025 National Election Commission. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;