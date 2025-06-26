import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../hooks/useNotification';
import "./Login.css"; // Réutilise le même CSS

export default function Register() {
  const { t } = useTranslation();
  const { login, isLoggedIn } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirection si déjà connecté
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      error(t('auth.fill_all_fields') || "Veuillez remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      error(t('profile.password_mismatch') || "Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 6) {
      error(t('profile.password_too_short') || "Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        error(data.msg || t('auth.register_error') || "Erreur lors de l'inscription");
        return;
      }
      
      login(data.token, data.user);
      success(t('auth.register_success') || "Inscription réussie !");
      navigate("/login");
    } catch {
      error(t('common.server_error') || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page animate-fade-in">
      <div className="login-left animate-slide-in-left">
        <div className="login-left-title">{t('auth.welcome_title')}</div>
        <div className="login-left-desc">
          {t('auth.welcome_desc')}
          <br />
          {t('home.login_text')}
        </div>
      </div>
      <div className="login-right animate-slide-in-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{t('auth.register_title')}</h2>
          <input
            type="text"
            placeholder={t('auth.username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="email"
            placeholder={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="password"
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="password"
            placeholder={t('auth.confirm_password')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading} className="hover-scale">
            {loading ? t('common.loading') : t('auth.register_button')}
          </button>
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            Déjà un compte ?{" "}
            <Link to="/login" style={{ color: "var(--primary-color)" }}>
              {t('auth.login_button')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}