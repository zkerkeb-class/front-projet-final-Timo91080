import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Profil.css";
import Navbar from "../components/Navbar";

type User = {
  username: string;
  email: string;
  avatar?: string;
  createdAt?: string;
};

export default function Profil() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:3000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.username) {
          setUser(data);
          setFavorites(data.favorites || []);
        } else setError("Impossible de charger le profil.");
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur serveur.");
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:3000/api/articles/mock")
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  // Pour la suppression du compte (optionnel)
  const handleDelete = async () => {
    if (!window.confirm("Supprimer votre compte ? Cette action est irréversible.")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/auth/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        localStorage.removeItem("token");
        setSuccess("Compte supprimé.");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError("Erreur lors de la suppression.");
      }
    } catch {
      setError("Erreur serveur.");
    }
  };

  // Fonction pour modifier username/email
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: editUsername || undefined,
          email: editEmail || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEditError(data.msg || "Erreur lors de la mise à jour.");
        return;
      }
      setEditSuccess("Profil mis à jour !");
      setUser(data.user);
      setEditUsername("");
      setEditEmail("");
    } catch {
      setEditError("Erreur serveur.");
    }
  };

  // Fonction pour modifier le mot de passe
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/auth/me/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: editPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEditError(data.msg || "Erreur lors de la mise à jour du mot de passe.");
        return;
      }
      setEditSuccess("Mot de passe mis à jour !");
      setEditPassword("");
    } catch {
      setEditError("Erreur serveur.");
    }
  };

  if (loading) return <div className="profil-fullpage">Chargement...</div>;

  return (

  <div> 
   <Navbar isLoggedIn={!!user} setIsLoggedIn={() => {}} />
    <div className="profil-fullpage">
       
      <div className="profil-header">
        <div className="profil-avatar">
          <img
            src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.username || "User") + "&background=ffd600&color=101549&size=256"}
            alt="avatar"
          />
        </div>
        <div className="profil-header-info">
          <h1>{user?.username}</h1>
          {/* Email retiré */}
          {user?.createdAt && (
            <div className="profil-date">Membre depuis le {new Date(user.createdAt).toLocaleDateString()}</div>
          )}
        </div>
      </div>

      <div className="profil-content">
        <div className="profil-section">
          <h2>Mes informations</h2>
          <ul>
            <li><strong>Nom d'utilisateur :</strong> {user?.username}</li>
            <li>
              <strong>Favoris :</strong>{" "}
              <Link to="/favoris" style={{ color: "#101549", fontWeight: "bold", textDecoration: "underline" }}>
                Accéder à mes favoris
              </Link>
            </li>
            {user?.createdAt && (
              <li><strong>Date d'inscription :</strong> {new Date(user.createdAt).toLocaleDateString()}</li>
            )}
          </ul>
        </div>

        <div className="profil-section">
          <h2>Modifier mes informations</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="profil-form-group">
              <label htmlFor="username">Nom d'utilisateur:</label>
              <input
                type="text"
                id="username"
                value={editUsername}
                onChange={e => setEditUsername(e.target.value)}
                placeholder="Nouveau nom d'utilisateur"
              />
            </div>
            {/* Champ email retiré */}
            <button type="submit" className="profil-btn">
              Mettre à jour
            </button>
          </form>
        </div>

        <div className="profil-section">
          <h2>Modifier mon mot de passe</h2>
          <form onSubmit={handlePasswordUpdate}>
            <div className="profil-form-group">
              <label htmlFor="password">Nouveau mot de passe:</label>
              <input
                type="password"
                id="password"
                value={editPassword}
                onChange={e => setEditPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
              />
            </div>
            <button type="submit" className="profil-btn">
              Changer le mot de passe
            </button>
          </form>
        </div>

        <div className="profil-section">
          <h2>Mes actions</h2>
          <button className="profil-btn danger" onClick={handleDelete}>
            Supprimer mon compte
          </button>
        </div>

        {/* Section favoris retirée */}

        {/* Tu peux ajouter ici d'autres sections : commentaires, etc. */}
      </div>

      {error && <div className="profil-error">{error}</div>}
      {success && <div className="profil-success">{success}</div>}
      {editError && <div className="profil-error">{editError}</div>}
      {editSuccess && <div className="profil-success">{editSuccess}</div>}
    </div>
    </div>
  );
}