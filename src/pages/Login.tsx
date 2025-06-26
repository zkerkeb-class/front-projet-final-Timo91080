import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../hooks/useNotification';
import "./Login.css";

export default function Login() {
  const { t } = useTranslation();
  const { login, isLoggedIn } = useAuth();
  const { success, error } = useNotification();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirection si déjà connecté
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      error(t('auth.fill_all_fields') || "Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        error(data.msg || t('auth.login_error') || "Erreur de connexion");
        return;
      }
      
      login(data.token, data.user);
      success(t('auth.login_success') || "Connexion réussie !");
      navigate("/");
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
          <h2>{t('auth.login_title')}</h2>
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
          <button type="submit" disabled={loading} className="hover-scale">
            {loading ? t('common.loading') : t('auth.login_button')}
          </button>
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            {t('auth.no_account')}{" "}
            <Link to="/register" style={{ color: "var(--primary-color)" }}>
              {t('auth.create_account')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}