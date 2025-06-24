import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import { FaTrash } from "react-icons/fa";
import "./Favoris.css";

type Article = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  image?: string;
  category: string;
};

type FavorisProps = {
  favorites: string[];
  setFavorites: (fav: string[]) => void;
};

export default function Favoris({ favorites, setFavorites }: FavorisProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmLink, setConfirmLink] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/articles/mock")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  const favorisArticles = articles.filter((article) =>
    favorites.includes(article.link)
  );

  // Fonction pour retirer un favori
  const handleRemoveFavorite = async (link: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("http://localhost:3000/api/auth/favorites/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ articleLink: link }),
    });
    const data = await res.json();
    setFavorites(data.favorites || []);
    setConfirmLink(null);
  };

  return (
    <div>
      <Navbar
        isLoggedIn={!!localStorage.getItem("token")}
        setIsLoggedIn={() => {}}
      />
      <div className="favoris-page">
        <h1 className="favoris-title">Mes favoris</h1>
        <div className="border-bottom"></div>
        {loading ? (
          <div className="favoris-loading">Chargement...</div>
        ) : favorisArticles.length === 0 ? (
          <div className="favoris-empty">
            Aucun article en favori pour le moment.
          </div>
        ) : (
          <div className="favoris-list">
            {favorisArticles.map((article) => (
              <ArticleCard
                key={article.link}
                {...article}
                variant="wide"
                isLoggedIn={true}
                favorites={favorites}
                onToggleFavorite={() => setConfirmLink(article.link)}
                icon={<FaTrash />}
              />
            ))}
          </div>
        )}
        {/* Modal de confirmation */}
        {confirmLink && (
          <div className="favoris-modal-bg">
            <div className="favoris-modal">
              <p>Voulez-vous vraiment retirer cet article des favoris ?</p>
              <div className="favoris-modal-actions">
                <button className="favoris-modal-btn danger" onClick={() => handleRemoveFavorite(confirmLink)}>
                  Oui
                </button>
                <button className="favoris-modal-btn" onClick={() => setConfirmLink(null)}>
                  Non
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}