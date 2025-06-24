import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaUser, FaHome } from "react-icons/fa";
import './Navbar.css'

// Déclare le type des props
type NavbarProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export default function Navbar({ isLoggedIn, setIsLoggedIn }: NavbarProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Fermer le modal si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    }
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    // Optionnel : récupère l'email de l'utilisateur connecté (si tu l'as stocké)
    const email = localStorage.getItem("userEmail");
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="TopNavbar">
      <div className="navbar-titre">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Foot-Journal</Link>
        
      </div>
      <div className="navbar-links">
        <Link className="navbar-link" to="/">
          <FaHome style={{ marginRight: 6, verticalAlign: "middle" }} />
   
        </Link>

        {isLoggedIn && (
          <>
            <span
              className="navbar-link"
              style={{ position: "relative" }}
              onClick={() => setShowModal(v => !v)}
            >
              <FaUser style={{ marginRight: 6, verticalAlign: "middle" }} />
            
              {showModal && (
                <div ref={modalRef} className="profil-modal">
                  <button
                    className="profil-modal-btn"
                    onClick={() => {
                      setShowModal(false);
                      navigate("/profil");
                    }}
                  >
                    Profil
                  </button>
                  <button
                    className="profil-modal-btn"
                    onClick={() => {
                      setShowModal(false);
                      navigate("/favoris");
                    }}
                  >
                    Favoris
                  </button>
                </div>
              )}
            </span>
            <button className="navbar-link logout-icon-btn" onClick={handleLogout} title="Déconnexion">
              {/* Icône SVG de déconnexion */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </>
        )}
        <button
          className="navbar-link"
          title={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}
