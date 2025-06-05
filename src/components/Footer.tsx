import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-title">Foot-Journal © {new Date().getFullYear()}</span>
        <span className="footer-links">
          <a href="#">Mentions légales</a> | <a href="#">Contact</a> | <a href="#">À propos</a>
        </span>
      </div>
    </footer>
  );
}