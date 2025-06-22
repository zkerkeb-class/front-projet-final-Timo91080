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
        <Link to="/" style={{ color: "#ffd600", textDecoration: "none" }}>Foot-Journal</Link>
      </div>
      <div className="navbar-links">
        <Link className="navbar-link" to="/">Accueil</Link>

        {/* Ajoute d'autres liens ici si besoin */}
        {isLoggedIn && (
          <>
            <Link className="navbar-link" to="/profil">Mon profil</Link>
            <button className="navbar-link" onClick={handleLogout}>Déconnexion</button>
          </>
        )}
      </div>
    </nav>
  );
}
