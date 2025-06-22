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
};

export default function ArticleCard({ title, link, pubDate, source, description, image, variant, isLoggedIn, favorites, onToggleFavorite }: ArticleCardProps) {
  const isFavorite = favorites.includes(link);

  return (
    <div className={`article-card ${variant === "wide" ? "article-card-wide" : "article-card-compact"}`}>
      {image && (
        <div className="article-image-container">
          <img src={image} alt={title} className="article-image" />
        </div>
      )}
      <div className="article-container"> 
        <h2 className="article-title">
          <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
        </h2>
        <div className="article-meta">
          <span>{source}</span> | <span>{new Date(pubDate).toLocaleDateString()}</span>
        </div>
        <p className="article-desc">{description}</p>
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


