import React from 'react'
import { FaTrash } from "react-icons/fa"; // Ajoute cet import
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
  icon?: React.ReactNode; // Ajouté pour le nouvel icône
};

export default function ArticleCard({ title, link, pubDate, source, description, image, variant, isLoggedIn, favorites, onToggleFavorite, className, icon }: ArticleCardProps) {
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
      {isLoggedIn && icon && (
        <button
          className="fav-btn"
          title={
            React.isValidElement(icon) && icon.type === FaTrash
              ? "Retirer des favoris"
              : "Ajouter/Retirer des favoris"
          }
          onClick={() => onToggleFavorite(link)}
        >
          {icon}
        </button>
      )}
    </div>
  )
}
