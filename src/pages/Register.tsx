import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!username || !email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Erreur lors de l'inscription.");
        return;
      }
      setSuccess("Inscription réussie ! Redirection...");
      setUsername("");
      setEmail("");
      setPassword("");
      // Redirection après 2 secondes
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Erreur serveur.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-title">Créer un compte Foot-Journal</div>
        <div className="login-left-desc">
          Rejoins la communauté Foot-Journal pour commenter, sauvegarder tes articles et profiter de toutes les fonctionnalités !
        </div>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Inscription</h2>
          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}