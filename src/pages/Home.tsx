import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSearch, FaStar, FaRegStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { useNotification } from '../hooks/useNotification';
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import "./Home.css";

const VISIBLE_CARDS = 3;

type Article = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  image?: string;
  category: string;
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const { isLoggedIn } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { success, error } = useNotification();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState(t('categories.all'));
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();

  // MODIFIÉ : Ajouter la langue dans la requête
  useEffect(() => {
    const currentLang = i18n.language;
    fetch(`http://localhost:3000/api/auth/articles/mock?lang=${currentLang}`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error("Erreur lors du chargement des articles:", err));
  }, [i18n.language]); // Recharger quand la langue change

  // Mettre à jour la catégorie sélectionnée quand la langue change
  useEffect(() => {
    setSelectedCat(t('categories.all'));
  }, [t]);

  const filteredArticles = articles.filter(article =>
    (selectedCat === t('categories.all') || article.category === selectedCat) &&
    (article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase()))
  );

  const columnArticles = filteredArticles.slice(0, 3);
  const rowArticles = filteredArticles.slice(3);

  const categories = [
    t('categories.all'),
    t('categories.ligue1'),
    t('categories.mercato'), 
    t('categories.international')
  ];

  const handleToggleFavorite = async (link: string) => {
    try {
      const message = await toggleFavorite(link);
      success(message);
    } catch (err) {
      error(err instanceof Error ? err.message : 'Erreur');
    }
  };

  // Carrousel automatique
  useEffect(() => {
    if (rowArticles.length <= 1) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % rowArticles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [rowArticles.length]);

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + rowArticles.length) % rowArticles.length);
  };
  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % rowArticles.length);
  };

  const getCarouselArticles = () => {
    if (rowArticles.length === 0) return [];
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (carouselIndex + i + rowArticles.length) % rowArticles.length;
      result.push({ ...rowArticles[idx], isCenter: i === 0 });
    }
    return result;
  };

  const isFiltering = search.trim().length > 0 || selectedCat !== t('categories.all');

  return (
    <div>
      <div className="Home animate-fade-in">
        <Navbar />

        <div className='Actufoot'>
          <div className="Actutitre">{t('home.title')}</div>
        </div>

        <div className="sub-navbar">
          <div className="search-bar" style={{ position: "relative" }}>
            <FaSearch
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#b7b1b1",
                fontSize: "1rem",
                pointerEvents: "none"
              }}
            />
            <input
              type="text"
              placeholder={t('home.search_placeholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 32 }}
            />
          </div>
          <div className="categories-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={selectedCat === cat ? "cat-btn active" : "cat-btn"}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="login-section">
          {isLoggedIn ? (
            <span className="login-text">
              {t('home.welcome_text')}
            </span>
          ) : (
            <>
              <span className="login-text">
                {t('home.login_text')}
              </span>
              <button className="login-btn hover-scale" onClick={() => navigate("/login")}>
                <FaSignInAlt style={{ marginRight: 8, verticalAlign: "middle" }} />
                {t('navbar.login')}
              </button>
            </>
          )}
        </div>

        {!isFiltering && (
          <>
            <h2 className="section-title">{t('home.news')}</h2>
            <div className="carousel-container">
              <button className="carousel-arrow left hover-scale" onClick={handlePrev}>
                <FaArrowLeft />
              </button>
              <div className="carousel-slide-multi">
                {getCarouselArticles().map((article) => (
                  <ArticleCard
                    key={article.link}
                    {...article}
                    variant="compact"
                    isLoggedIn={isLoggedIn}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    className={`actualite-card card-entrance ${article.isCenter ? "carousel-center" : "carousel-side"}`}
                    icon={favorites.includes(article.link) ? <FaStar className="fav-star" /> : <FaRegStar className="fav-star" />}
                  />
                ))}
              </div>
              <button className="carousel-arrow right hover-scale" onClick={handleNext}>
                <FaArrowRight />
              </button>
            </div>
          </>
        )}

        <div className="ActuDesc">
          <div className="desc">{t('home.description')}</div>
        </div>

        <h2 className="section-title">{t('home.featured')}</h2>
        <div className="articles-column">
          {columnArticles.map((article, index) => (
            <ArticleCard
              key={article.link}
              {...article}
              variant="wide"
              isLoggedIn={isLoggedIn}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              className={`card-entrance hover-lift`}
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              icon={favorites.includes(article.link) ? <FaStar className="fav-star" /> : <FaRegStar className="fav-star" />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
