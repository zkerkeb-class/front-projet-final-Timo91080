import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { useNotification } from '../hooks/useNotification';
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/Loader";
import { FaRegStar, FaTrash } from "react-icons/fa";
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

export default function Favoris() {
  const { t, i18n } = useTranslation();
  const { user, favorites } = useAuth();
  const { toggleFavorite } = useFavorites();
  const { success, error } = useNotification();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [articleToRemove, setArticleToRemove] = useState<string | null>(null);

  // MODIFIÉ : Charger les articles avec la langue
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const currentLang = i18n.language;
        const response = await fetch(`http://localhost:3000/api/auth/articles/mock?lang=${currentLang}`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        } else {
          error("Erreur lors du chargement des articles");
        }
      } catch (err) {
        console.error("Erreur:", err);
        error("Erreur de connexion");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [error, i18n.language]); // Recharger quand la langue change

  const favoriteArticles = articles.filter(article => 
    favorites.includes(article.link)
  );

  const handleToggleFavorite = async (link: string) => {
    try {
      const message = await toggleFavorite(link);
      success(message);
    } catch (err) {
      error(err instanceof Error ? err.message : 'Erreur');
    }
  };

  const confirmRemoveFavorite = (link: string) => {
    setArticleToRemove(link);
    setShowModal(true);
  };

  const handleConfirmRemove = async () => {
    if (articleToRemove) {
      await handleToggleFavorite(articleToRemove);
      setShowModal(false);
      setArticleToRemove(null);
    }
  };

  const handleCancelRemove = () => {
    setShowModal(false);
    setArticleToRemove(null);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <Loader text="Chargement des favoris..." />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Navbar />
      <div className="favoris-page">
        <div className="favoris-header animate-slide-in-up">
          <h1 className="favoris-title">Mes favoris</h1>
          <p className="favoris-subtitle">
            {favoriteArticles.length} {favoriteArticles.length <= 1 ? 'article' : 'articles'}
          </p>
        </div>

        <div className="favoris-content">
          {favoriteArticles.length === 0 ? (
            <div className="favoris-empty animate-scale-in">
              <FaRegStar size={64} color="#ccc" />
              <p>Aucun article en favori pour le moment.</p>
            </div>
          ) : (
            <div className="favoris-grid">
              {favoriteArticles.map((article, index) => (
                <ArticleCard
                  key={article.link}
                  {...article}
                  variant="wide"
                  isLoggedIn={!!user}
                  favorites={favorites}
                  onToggleFavorite={() => confirmRemoveFavorite(article.link)}
                  className="card-entrance hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                  icon={<FaTrash className="trash-icon" />}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal de confirmation pour suppression */}
        {showModal && (
          <>
            <div className="favoris-modal-overlay" onClick={handleCancelRemove}></div>
            <div className="favoris-modal animate-scale-in">
              <div className="modal-content">
                <p>Voulez-vous vraiment retirer cet article de vos favoris ?</p>
                <div className="modal-buttons">
                  <button 
                    className="modal-btn confirm hover-scale" 
                    onClick={handleConfirmRemove}
                  >
                    Oui, supprimer
                  </button>
                  <button 
                    className="modal-btn cancel hover-scale" 
                    onClick={handleCancelRemove}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}