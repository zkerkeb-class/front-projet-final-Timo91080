import React, { useEffect, useState } from "react";
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

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("Tous");

  useEffect(() => {
    fetch("http://localhost:3000/api/articles/mock") // adapte l’URL selon ta route
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  const filteredArticles = articles.filter(article =>
    (selectedCat === "Tous" || article.category === selectedCat) &&
    (article.title.toLowerCase().includes(search.toLowerCase()) ||
     article.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Par exemple : les 3 premiers en colonne, le reste en ligne
  const columnArticles = filteredArticles.slice(0, 3);
  const rowArticles = filteredArticles.slice(3);

  const categories = ["Tous", "Ligue 1", "Mercato", "International"];

  return (
    <div> 
    <div className="Home">
      <Navbar />
      
       <div className='Actufoot'>
        <div className="Actutitre">Tout sur le foot</div>
         </div>

        <div className="login-section">
  <span className="login-text">
    Connecte-toi pour commenter, sauvegarder tes articles et profiter de toutes les fonctionnalités !
  </span>
  <button className="login-btn">Se connecter</button>
</div>

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

<div className="articles-row">
  {rowArticles.map(article => (
    <ArticleCard key={article.link} {...article} variant="compact" />
  ))}
</div>

         <div className="ActuDesc">
        <div className="desc">Retrouvez les dernières actualités du football, les résultats des matchs, les classements et bien plus encore.</div>
           </div>

<div className="articles-column">
  {columnArticles.map(article => (
    <ArticleCard key={article.link} {...article} variant="wide" />
  ))}
</div>

   
   </div>
    </div>
  );
}
