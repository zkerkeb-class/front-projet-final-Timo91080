import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../hooks/useNotification';
import "./Profil.css";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function Profil() {
  const { t } = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const { success, error: notifyError } = useNotification();
  
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editPasswordConfirm, setEditPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirection si pas connecté
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Pour la suppression du compte
  const handleDelete = async () => {
    if (!window.confirm("Supprimer votre compte ? Cette action est irréversible.")) return;
    
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/auth/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        localStorage.removeItem("token");
        success("Compte supprimé.");
        setTimeout(() => navigate("/"), 1500);
      } else {
        notifyError("Erreur lors de la suppression.");
      }
    } catch {
      notifyError("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour modifier username/email
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUsername.trim()) {
      notifyError("Le nom d'utilisateur ne peut pas être vide.");
      return;
    }
    
    setLoading(true);
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
        notifyError(data.msg || "Erreur lors de la mise à jour.");
        return;
      }
      success("Profil mis à jour !");
      setEditUsername("");
      setEditEmail("");
      // Recharger la page pour mettre à jour le contexte
      window.location.reload();
    } catch {
      notifyError("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour modifier le mot de passe
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification que les mots de passe correspondent
    if (editPassword !== editPasswordConfirm) {
      notifyError("Les mots de passe ne correspondent pas.");
      return;
    }
    
    // Vérification de la longueur minimale
    if (editPassword.length < 6) {
      notifyError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    
    setLoading(true);
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
        notifyError(data.msg || "Erreur lors de la mise à jour du mot de passe.");
        return;
      }
      success("Mot de passe mis à jour !");
      setEditPassword("");
      setEditPasswordConfirm("");
    } catch {
      notifyError("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <Loader text="Chargement..." />;
  if (!user) return null;

  return (
    <div className="animate-fade-in"> 
      <Navbar />
      <div className="profil-fullpage">
        <div className="profil-header animate-slide-in-up">
          <div className="profil-avatar">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || "User"}&background=ffd600&color=101549&size=256`}
              alt="avatar"
            />
          </div>
          <div className="profil-header-info">
            <h1>{user?.username}</h1>
            {user?.createdAt && (
              <div className="profil-date">
                Membre depuis le {new Date(user.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="profil-content">
          <div className="profil-section animate-slide-in-left">
            <h2>Mes informations</h2>
            <ul>
              <li><strong>Nom d'utilisateur :</strong> {user?.username}</li>
              <li>
                <strong>Favoris :</strong>{" "}
                <Link to="/favoris" style={{ color: "var(--primary-color)", fontWeight: "bold", textDecoration: "underline" }}>
                  Accéder à mes favoris
                </Link>
              </li>
              {user?.createdAt && (
                <li><strong>Date d'inscription :</strong> {new Date(user.createdAt).toLocaleDateString()}</li>
              )}
            </ul>
          </div>

          <div className="profil-section animate-slide-in-right">
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
                  disabled={loading}
                />
              </div>
              <button type="submit" className="profil-btn hover-scale" disabled={loading}>
                {loading ? "Chargement..." : "Mettre à jour"}
              </button>
            </form>
          </div>

          <div className="profil-section animate-slide-in-left">
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
                  required
                  disabled={loading}
                />
              </div>
              <div className="profil-form-group">
                <label htmlFor="passwordConfirm">Confirmer le mot de passe:</label>
                <input
                  type="password"
                  id="passwordConfirm"
                  value={editPasswordConfirm}
                  onChange={e => setEditPasswordConfirm(e.target.value)}
                  placeholder="Confirmer le mot de passe"
                  className={
                    editPasswordConfirm.length > 0
                      ? editPassword === editPasswordConfirm
                        ? "password-match"
                        : "password-mismatch"
                      : ""
                  }
                  required
                  disabled={loading}
                />
              </div>
              <button type="submit" className="profil-btn hover-scale" disabled={loading}>
                {loading ? "Chargement..." : "Changer le mot de passe"}
              </button>
            </form>
          </div>

          <div className="profil-section animate-slide-in-right">
            <h2>Mes actions</h2>
            <button 
              className="profil-btn danger hover-scale" 
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Chargement..." : "Supprimer mon compte"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}