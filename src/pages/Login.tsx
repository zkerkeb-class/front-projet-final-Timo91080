import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

type LoginProps = {
  setIsLoggedIn: (value: boolean) => void;
};

export default function Login({ setIsLoggedIn }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Erreur lors de la connexion.");
        return;
      }
      setSuccess("Connexion réussie !");
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setTimeout(() => navigate("/"), 1500); // Redirection après 1,5s
    } catch (err) {
      setError("Erreur serveur.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-title">Bienvenue sur Foot-Journal</div>
        <div className="login-left-desc">
          Explore toutes les fonctionnalités de ton journal sportif préféré.
          <br />
          Connecte-toi pour commenter, sauvegarder tes articles et plus encore !
        </div>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Connexion</h2>
          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Se connecter</button>
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            Pas encore de compte ?{" "}
            <Link to="/register" style={{ color: "#101549" }}>
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}