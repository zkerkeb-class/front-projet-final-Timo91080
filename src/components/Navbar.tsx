import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'

// Déclare le type des props
type NavbarProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export default function Navbar({ isLoggedIn, setIsLoggedIn }: NavbarProps) {
  const navigate = useNavigate();

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
        <Link className="navbar-link" to="/">Accueil</Link>

        {/* Ajoute d'autres liens ici si besoin */}
        {isLoggedIn && (
          <>
            <Link className="navbar-link" to="/profil">Mon profil</Link>
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
      </div>
    </nav>
  );
}
