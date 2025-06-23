import React from 'react'
import './ArticleCard.css'

type ArticleProps = {
  title: string
  link: string
  pubDate: string
  source: string
  description: string
  image?: string
  variant?: "wide" | "compact"
}

type ArticleCardProps = ArticleProps & {
  isLoggedIn: boolean;
  favorites: string[];
  onToggleFavorite: (link: string) => void;
  className?: string; // Ajoute cette ligne
};

export default function ArticleCard({ title, link, pubDate, source, description, image, variant, isLoggedIn, favorites, onToggleFavorite, className }: ArticleCardProps) {
  const isFavorite = favorites.includes(link);

  return (
    <div className={`article-card ${variant === "wide" ? "article-card-wide" : "article-card-compact"} ${className || ""}`}>
      {image && (
        <div className="article-image-container">
          <img src={image} alt={title} className="article-image" />
        </div>
      )}
      <div className="article-container"> 
        <div className="article-title">
          <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
        </div>
        <div className="article-meta">
          <span>{source}</span> | <span>{new Date(pubDate).toLocaleDateString()}</span>
        </div>
        <div className="article-desc">{description}</div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="acceder-btn"
        >
          Accéder à l'article
        </a>
      </div>
      {isLoggedIn && (
        <button
          className={`fav-btn${isFavorite ? " active" : ""}`}
          onClick={() => onToggleFavorite(link)}
          title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      )}
    </div>
  )
}
