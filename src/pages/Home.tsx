import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import "./Home.css";

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
};

export default function Home({ isLoggedIn, setIsLoggedIn }: HomeProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("Tous");
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/articles/mock") // adapte l’URL selon ta route
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  useEffect(() => {
    // Charger les favoris de l'utilisateur connecté
    const token = localStorage.getItem("token");
    if (isLoggedIn && token) {
      fetch("http://localhost:3000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setFavorites(data.favorites || []));
    }
  }, [isLoggedIn]);

  const filteredArticles = articles.filter(article =>
    (selectedCat === "Tous" || article.category === selectedCat) &&
    (article.title.toLowerCase().includes(search.toLowerCase()) ||
     article.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Par exemple : les 3 premiers en colonne, le reste en ligne
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
  };

  return (
    <div> 
    <div className="Home">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
       <div className='Actufoot'>
        <div className="Actutitre">Tout sur le foot</div>
         </div>

        <div className="sub-navbar">
  <div className="search-bar">
    <input
      type="text"
      placeholder="Rechercher un article..."
      value={search}
      onChange={e => setSearch(e.target.value)}
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
          Se connecter
        </button>
      )}
    </>
  )}
</div>

<h2 className="section-title">Actualités</h2>
<div className="articles-row">
  {rowArticles.map(article => (
    <ArticleCard
      key={article.link}
      {...article}
      variant="compact"
      isLoggedIn={isLoggedIn}
      favorites={favorites}
      onToggleFavorite={handleToggleFavorite}
      // Ajoute une prop custom pour cibler le style
      className="actualite-card"
    />
  ))}
</div>

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
    />
  ))}
</div>

   
   </div>
    </div>
  );
}
