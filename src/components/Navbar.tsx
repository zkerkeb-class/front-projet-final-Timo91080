import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaUser, FaHome, FaGlobe } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css'

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isLoggedIn, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const langModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
      if (langModalRef.current && !langModalRef.current.contains(event.target as Node)) {
        setShowLangModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setShowLangModal(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="TopNavbar animate-slide-in-up">
      <div className="navbar-titre">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Foot-Journal
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link className="navbar-link hover-scale" to="/">
          <FaHome style={{ marginRight: 6, verticalAlign: "middle" }} />
          {t('navbar.home')}
        </Link>

        {isLoggedIn && (
          <span
            className="navbar-link hover-scale"
            style={{ position: "relative" }}
            onClick={() => setShowModal(v => !v)}
          >
            <FaUser style={{ marginRight: 6, verticalAlign: "middle" }} />
            {showModal && (
              <div ref={modalRef} className="profil-modal animate-scale-in">
                <button
                  className="profil-modal-btn"
                  onClick={() => {
                    setShowModal(false);
                    navigate("/profil");
                  }}
                >
                  {t('navbar.profile')}
                </button>
                <button
                  className="profil-modal-btn"
                  onClick={() => {
                    setShowModal(false);
                    navigate("/favoris");
                  }}
                >
                  {t('navbar.favorites')}
                </button>
              </div>
            )}
          </span>
        )}

        <span
          className="navbar-link hover-scale"
          style={{ position: "relative" }}
          onClick={() => setShowLangModal(v => !v)}
        >
          <FaGlobe style={{ marginRight: 6, verticalAlign: "middle" }} />
          {showLangModal && (
            <div ref={langModalRef} className="profil-modal animate-scale-in">
              <button
                className="profil-modal-btn"
                onClick={() => changeLanguage('fr')}
              >
                🇫🇷 Français
              </button>
              <button
                className="profil-modal-btn"
                onClick={() => changeLanguage('en')}
              >
                🇺🇸 English
              </button>
            </div>
          )}
        </span>

        <button
          className="navbar-link hover-scale"
          title={theme === "dark" ? "Mode clair" : "Mode sombre"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {isLoggedIn && (
          <button 
            className="navbar-link logout-icon-btn hover-scale" 
            onClick={handleLogout} 
            title={t('navbar.logout')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
}
