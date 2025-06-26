import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          
          {/* Section principale */}
          <div className="footer-section footer-main">
            <h3 className="footer-logo">{t('footer.logo')}</h3>
            <p className="footer-description">
              {t('footer.description')}
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-section">
            <h4>{t('footer.navigation')}</h4>
            <ul className="footer-links">
              <li><a href="/">{t('footer.links.home')}</a></li>
              <li><a href="/actualites">{t('footer.links.news')}</a></li>
              <li><a href="/ligue1">{t('footer.links.ligue1')}</a></li>
              <li><a href="/international">{t('footer.links.international')}</a></li>
              <li><a href="/mercato">{t('footer.links.mercato')}</a></li>
            </ul>
          </div>

          {/* Compte */}
          <div className="footer-section">
            <h4>{t('footer.account')}</h4>
            <ul className="footer-links">
              <li><a href="/login">{t('footer.links.login')}</a></li>
              <li><a href="/register">{t('footer.links.register')}</a></li>
              <li><a href="/profil">{t('footer.links.profile')}</a></li>
              <li><a href="/favoris">{t('footer.links.favorites')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4>{t('footer.contact')}</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <FaEnvelope />
                <span>contact@foot-journal.fr</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

        </div>

        {/* Barre de copyright */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>&copy; {new Date().getFullYear()} {t('footer.logo')}. {t('footer.copyright')}</span>
          </div>
          <div className="footer-legal">
            <a href="/mentions-legales">{t('footer.links.legal')}</a>
            <a href="/politique-confidentialite">{t('footer.links.privacy')}</a>
            <a href="/cgu">{t('footer.links.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}