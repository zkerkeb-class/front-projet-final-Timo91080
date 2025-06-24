import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSearch, FaStar, FaRegStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
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

type HomeProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  favorites: string[];
  setFavorites: (fav: string[]) => void;
};

export default function Home({
  isLoggedIn,
  setIsLoggedIn,
  favorites,
  setFavorites
}: HomeProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("Tous");
  const [notif, setNotif] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/articles/mock")
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isLoggedIn && token) {
      fetch("http://localhost:3000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setFavorites(data.favorites || []));
    }
  }, [isLoggedIn, setFavorites]);

  const filteredArticles = articles.filter(article =>
    (selectedCat === "Tous" || article.category === selectedCat) &&
    (article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase()))
  );

  const columnArticles = filteredArticles.slice(0, 3);
  const rowArticles = filteredArticles.slice(3);

  const categories = ["Tous", "Ligue 1", "Mercato", "International"];

  const handleToggleFavorite = async (link: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const isFav = favorites.includes(link);
    const url = `http://localhost:3000/api/auth/favorites/${isFav ? "remove" : "add"}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ articleLink: link }),
    });
    const data = await res.json();
    setFavorites(data.favorites || []);
    setNotif(isFav ? "Article retiré des favoris !" : "Article ajouté aux favoris !");
    setTimeout(() => setNotif(null), 2500);
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

  // Pour afficher 3 articles centrés sur carouselIndex
  const getCarouselArticles = () => {
    if (rowArticles.length === 0) return [];
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (carouselIndex + i + rowArticles.length) % rowArticles.length;
      result.push({ ...rowArticles[idx], isCenter: i === 0 });
    }
    return result;
  };

  // Masquer le carrousel si recherche ou filtre actif
  const isFiltering = search.trim().length > 0 || selectedCat !== "Tous";

  return (
    <div>
      <div className="Home">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* Notification */}
        {notif && (
          <div
            style={{
              position: "fixed",
              top: 24,
              right: 24,
              background: "#101549",
              color: "#fff",
              padding: "1rem 2rem",
              borderRadius: 12,
              boxShadow: "0 2px 12px #0005",
              zIndex: 9999,
              fontWeight: "bold",
              fontSize: "1rem",
              letterSpacing: "1px",
            }}
          >
            {notif}
          </div>
        )}

        <div className='Actufoot'>
          <div className="Actutitre">Tout sur le foot</div>
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
              placeholder="Rechercher un article..."
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
              Bienvenue sur FootActu ! Tu peux maintenant commenter, sauvegarder tes articles et profiter de toutes les fonctionnalités.
            </span>
          ) : (
            <>
              <span className="login-text">
                Connecte-toi pour commenter, sauvegarder tes articles et profiter de toutes les fonctionnalités !
              </span>
              {!isLoggedIn && (
                <button className="login-btn" onClick={() => navigate("/login")}>
                  <FaSignInAlt style={{ marginRight: 8, verticalAlign: "middle" }} />
                  Se connecter
                </button>
              )}
            </>
          )}
        </div>

        {/* Actualités (carrousel) MASQUÉ si recherche ou filtre */}
        {!isFiltering && (
          <>
            <h2 className="section-title">Actualités</h2>
            <div className="carousel-container">
              <button className="carousel-arrow left" onClick={handlePrev}>
                <FaArrowLeft />
              </button>
              <div className="carousel-slide-multi">
                {getCarouselArticles().map((article, idx) => (
                  <ArticleCard
                    key={article.link}
                    {...article}
                    variant="compact"
                    isLoggedIn={isLoggedIn}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    className={`actualite-card ${article.isCenter ? "carousel-center" : "carousel-side"}`}
                    icon={favorites.includes(article.link) ? <FaStar className="fav-star" /> : <FaRegStar className="fav-star" />}
                  />
                ))}
              </div>
              <button className="carousel-arrow right" onClick={handleNext}>
                <FaArrowRight />
              </button>
            </div>
          </>
        )}

        <div className="ActuDesc">
          <div className="desc">Retrouvez les dernières actualités du football, les résultats des matchs, les classements et bien plus encore.</div>
        </div>

        <h2 className="section-title">À la une</h2>
        <div className="articles-column">
          {columnArticles.map(article => (
            <ArticleCard
              key={article.link}
              {...article}
              variant="wide"
              isLoggedIn={isLoggedIn}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              icon={favorites.includes(article.link) ? <FaStar className="fav-star" /> : <FaRegStar className="fav-star" />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
